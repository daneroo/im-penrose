import React from 'react'
import { request } from 'graphql-request'
import useSWR from 'swr'
import useBuildTime from '../hooks/useBuildTime'

const externalUrl = 'https://fizzbuzzclock.n.imetrical.com/graphql' // .stamp
const fetcher = query => request(externalUrl, query)

const msgQy = `query recentMessages {
  messages {
    id
    stamp
    text
  }
}
`

const colorForText = (text) => {
  if (text === 'fizz') return '#f00'
  if (text === 'buzz') return '#00f'
  if (text === 'fizzbuzz') return '#f0f'
  return ''
}

const Message = ({ message }) => {
  const { stamp, text } = message

  return (
    <div>{stamp}: <span style={{ color: colorForText(text) }}>{text}</span></div>
  )
}

const MessageList = ({ messages }) => (
  <div>{messages.map(message => <Message key={message.id} message={message} />)}</div>
)

// exported component (Live)
export default () => {
  const { buildTime } = useBuildTime()

  const { data, error } = useSWR(msgQy, fetcher, {
    refreshInterval: 1000,
    dedupingInterval: 1000
  })

  let color, content
  if (error) {
    color = 'red'
    content = ['Error', 'Failed to Fecth Time'] // error.message
  } else if (!data) {
    color = 'blue'
    content = ['Fetching', '...']
  } else {
    color = 'green'
    // content = ['Recent Messages', <pre>{JSON.stringify(data.messages, null, 2)}</pre>]
    content = ['Recent Messages', <MessageList messages={data.messages} />]
  }

  return <div style={{
    fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
    marginBottom: '1em',
    display: 'grid',
    gridTemplateColumns: '10em 1fr'

  }}>
    <div>Fetched from:</div><div><a href={externalUrl} target="_blank" rel="noopener noreferrer">{externalUrl}</a></div>
    <div style={{ color }}>{content[0]}:</div><div>{content[1]}</div>
    <div style={{ color: 'grey' }}>Build time:</div><div>{buildTime}</div>
  </div>
}

