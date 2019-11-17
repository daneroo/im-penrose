import React, { Component } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import { Query, Subscription } from 'react-apollo'
import { NoSSRApolloProvider } from '../components/ApolloClient'
import { GET_MESSAGES_QUERY, ON_NEW_MESSAGE_SUBSCRIPTION } from '../components/queries'

// const endpoint = 'https://api.qcic.n.imetrical.com/graphql'
const endpoint = 'https://fizzbuzzclock.n.imetrical.com/graphql'

const DynGQL = () => (
  <Layout>
    <h2>Dynamic Content from GraphQL</h2>
    <Link to='/'>Go back to the homepage</Link>

    <NoSSRApolloProvider endpoint={endpoint}>
      <p>This component performa a GraphQL Query, and a Subscription</p>
      <Messages />
      <NewMessage />
    </NoSSRApolloProvider>

  </Layout>
)
export default DynGQL

class MessageList extends Component {
  componentDidMount () {
    const { subscribeToNewMessages } = this.props
    if (subscribeToNewMessages) {
      subscribeToNewMessages()
    }
    // this.props.data.refetch()
    // // subscribe to new messages
    // if (process.browser) {
    //   this.unsubscribe = this.props.subscribeToNewMessages()
    // }
  }
  render () {
    const { loading, error, title, messages } = this.props
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    return (<div>
      <h4>{title}:</h4>
      <pre>{messages.map(r => JSON.stringify(r)).join('\n')}</pre>
    </div>)
  }
}

const updateQuery = (prev, { subscriptionData }) => {
  const messagesToKeep = 4 // how do I configure this?
  if (!subscriptionData.data) {
    return prev
  }
  const newMessage = subscriptionData.data.newMessage
  // console.log('newMessage', JSON.stringify(newMessage))
  return Object.assign({}, prev, {
    messages: [...prev.messages.slice(-messagesToKeep), newMessage]
  })
}

const Messages = () => (
  <Query
    query={GET_MESSAGES_QUERY}
  >
    {({ loading, error, data, subscribeToMore }) => {
      return (
        <MessageList
          loading={loading}
          error={error}
          title='Messages'
          messages={data.messages}
          subscribeToNewMessages={() => {
            subscribeToMore({
              document: ON_NEW_MESSAGE_SUBSCRIPTION,
              onError: (err) => console.error(err),
              updateQuery
            })
          }}
        />)
    }}
  </Query>
)

const NewMessage = ({ data }) => (
  <Subscription subscription={ON_NEW_MESSAGE_SUBSCRIPTION}>
    {({ loading, error, data }) => {
      const { newMessage } = (data) || {}
      return (
        <MessageList
          loading={loading}
          error={error}
          title='Incoming'
          messages={[newMessage]}
        />)
    }}
  </Subscription>
)
