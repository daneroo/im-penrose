import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from "react-apollo";
import { Query , Subscription} from "react-apollo";

import {GET_MESSAGES_QUERY,ON_NEW_MESSAGE_SUBSCRIPTION} from './queries';


const endpoint = "https://api.qcic.n.imetrical.com/graphql"

const httpLink = new HttpLink({
  uri: endpoint,
  credentials: 'same-origin'
})
const wsLink = new WebSocketLink({
  uri: endpoint.replace(/^http/, 'ws'),
  options: {
    reconnect: true
  }
})
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
)
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    link
  ]),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div>Gatsby.js - GraphQL - D3.js</div>
          </header>
        </div>
        <Messages></Messages>
        <NewMessage></NewMessage>
      </ApolloProvider>
    );
  }
}

const MessageList = ({title,messages}) => {
  return (<div>
    <h4>{title}:</h4>
    <pre>{messages.map(r => JSON.stringify(r)).join('\n')}</pre>
  </div>)

}
export default App;

const Messages = () => (
  <Query
    query={GET_MESSAGES_QUERY}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return <MessageList title="Messages" messages={data.messages}/>
    }}
  </Query>
);

const NewMessage = ({ data }) => (
  <Subscription subscription={ON_NEW_MESSAGE_SUBSCRIPTION}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      const {newMessage} = data
      return <MessageList title="Incoming Message" messages={[newMessage]}/>
    }}
  </Subscription>
);