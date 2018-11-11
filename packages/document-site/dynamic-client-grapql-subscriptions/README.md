# Gatsby - GraphQL Subscriptions

This project was bootstrapped with Gatsby.

I removed `gatsby-plugin-offline` because workbox logging was sooo annoying

Dynamic (not at build time/ssr time) GraphQL required:

- conditional browser detection in `src/components/ApolloCLient.js`

## Operations

In the project directory, you can run:

```bash
gatsby develop   # Start development server. Watches files, rebuilds, and hot reloads
gatsby build     # Build a Gatsby project.
gatsby serve     # Serve previously built Gatsby site.
```

## Dependencies

These were added for graphql query/subscriptions.
_The `grapql` package itself is already included in gatsby._

```bash
npm install \
  apollo-cache-inmemory \
  apollo-client \
  apollo-link \
  apollo-link-error \
  apollo-link-http \
  apollo-link-ws \
  isomorphic-unfetch \
  react-apollo \
  subscriptions-transport-ws \
  graphql-tag
```

```json
{
  "dependencies": {
    "apollo-cache-inmemory": "^1.3.9",
    "apollo-client": "^2.4.5",
    "apollo-link": "^1.2.3",
    "apollo-link-error": "^1.1.1",
    "apollo-link-http": "^1.5.5",
    "apollo-link-ws": "^1.0.9",
    "graphql": "^14.0.2",
    "graphql-tag": "^2.10.0",
  }
}
```
