# Dynamic Client

This is just the standard gatsby starter.

It uses `swr` to fecth time from external API (<https://fizzbuzzclock.n.imetrical.com>). Which is done from the client.

The `live` component also exposes build time, which stays fixed after deployment.

## TODO

- All done

## 2018-11-18

- Replace endpoint with fizzbuzzclock.n.imetrical.com (can also use time.qcic.n.imetrical.com)
- Simpler Hook to use fetch directly: using now;s `swr`
- Build time, now properly uses `useStaticQuery`
- Test deploy to now
