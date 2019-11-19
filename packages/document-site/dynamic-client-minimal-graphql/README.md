# Dynamic Client (minimal) GraphQL

This is just the standard gatsby starter.

It uses `swr` to fecth messages from external GraphQL Query Which is done from the client.

Call <https://fizzbuzzclock.n.imetrical.com/graphql> with this query

```graphql
query recentMessages {
  messages {
    id
    stamp
    text
  }
}
```

The `Live` component also exposes build time, which stays fixed after deployment.

## TODO

- All done

## 2018-11-18

- Replace endpoint with fizzbuzzclock.n.imetrical.com
- Simpler Hook to use fetch directly: using now;s `swr`
- Build time, now properly uses `useStaticQuery`
- Test deploy to now
