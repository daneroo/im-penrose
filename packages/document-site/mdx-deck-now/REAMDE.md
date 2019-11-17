# Slides with mdx-deck

This uses `mdx-deck` and deploys to zeit/now.

It also uses a pre-release of `CodeSurfer`

You can recreate it easily with:

```bash
npm init code-surfer-deck my-deck-name
```

- It uses the `@now/static-build` for deployment to `zeit/now`

```json
"build": {
  "env": {
    "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD": "true"
  }
},
```

## Operation

```bash
npm install
npm start  # for dev
npm run now-build # for prod build -> ./dist/
now # to deploy
```
