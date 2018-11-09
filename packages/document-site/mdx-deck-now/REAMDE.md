# Slides with mdx-deck

This uses `mdx-deck` and deploys to zeit/now

- It uses the `@now/static-build` builder instead of `@now/mdx-deck` to allow the use of cumston components (a.k.a `CodeSurfer`).
  - Also, need to prevent `puppeteer from downloading Chromium` (for size constraints)

```
"build": {
  "env": {
    "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD": "true"
  }
},
```

- We use yarn instead of npm, because upstream builder uses yarn, and it causes conflicts/warnings

```
npx yarn install
npx yarn start  # for dev
npx yarn now-build # for prod build -> ./dist/
now # to deploy
```

- there is an issue with `Appear` and `CodeSurfer`, so I build with `--no-html` option. _(see package.json)_

```
{
  ...
  "scripts": {
    "now-build": "mdx-deck build --no-html index.mdx"
  }
}
```