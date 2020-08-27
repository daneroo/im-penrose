# Gatsby Theme Document - Example Site

Started from Gatsby theme [Document](https://github.com/codebushi/gatsby-theme-document)
 by [Code Bushi](https://codebushi.com/gatsby-starters-and-themes/).
 [Live Demo](https://gatsby-theme-document.netlify.com/)

Deployed to <https://penrose.v.imetrical.com>

## TODO

- Consolidate top level README
- Subdivide (arrows)
- Rewrite ribbons and tiling svg into components
- remove or publish tondo (lerna deps...)

## Theme-ui with custom Font (Tondo)

Made my own typeface package: `../typeface-tondo/`, which is imported directly in `./src/gatsby-plugin-theme-ui/index.js`:

```js
import 'typeface-roboto' // npm i typeface-roboto
import 'typeface-roboto-mono' // npm i typeface-roboto-mono
import '../../../typeface-tondo' // npm i typeface-tondo
...
  fonts: {
    // body: systemFonts,
    body: `"Tondo Regular", sans-serif`,
    // body: '"Roboto", sans-serif',
...
```

## Bootstrapping

It was boostrapped with:

```bash
gatsby new document-site https://github.com/codebushi/gatsby-theme-document-example.git
cd document-site
gatsby develop
```
