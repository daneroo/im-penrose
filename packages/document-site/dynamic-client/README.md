# Dynamic CLient

This is just the standard gatsby starter.

It uses `swr` to fecth time from external API. Which is done from the client.

The `live` component also exposes build time, which stays fixed after deployment.

## TODO

- All done

## 2018-11-18

- Replace endpoint with time.qcic.n.imetrical.como (can also use fizzbuzzclock.n.imetrical.com)
- Simpler Hook to use fetch directly: using now;s `swr`
- Build time, now properly uses `useStaticQuery`
- Test deploy to now
