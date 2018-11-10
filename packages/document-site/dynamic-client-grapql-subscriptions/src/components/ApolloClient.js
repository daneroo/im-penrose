// Importing `isomorphic-unfetch` due to `apollo-link-http` raising
// a warning of not having `fetch` globally available.
// @see https://github.com/apollographql/apollo-link/issues/493
import 'isomorphic-unfetch'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

const endpoint = 'https://api.qcic.n.imetrical.com/graphql'

export function newClient () {
  if (!process.browser) return

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
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        }
        if (networkError) console.log(`[Network error]: ${networkError}`)
      }),
      link
    ]),
    cache: new InMemoryCache()
  })

  return client
}
