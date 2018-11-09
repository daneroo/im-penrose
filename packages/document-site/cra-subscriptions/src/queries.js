import gql from 'graphql-tag'

export const GET_MESSAGES_QUERY = gql`
query getAll {
  messages {
    id
    stamp
    host
    text
  }
}`

export const ON_NEW_MESSAGE_SUBSCRIPTION = gql`
subscription OnNewMessage {
  newMessage {
    id
    stamp
    host
    text
  }
}`

export const MUTATE_MESSAGE = gql`
mutation AddMessage($stamp: String!,$host: String!,$text: String!) {
  addMessage(message: {
    stamp: $stamp
    host: $host,
    text: $text
  }) {
    id
  }
}`
