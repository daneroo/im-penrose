# Gatsby Theme Document - Example Site

This is an example site using the Gatsby theme [Document](https://github.com/codebushi/gatsby-theme-document)
 by [Code Bushi](https://codebushi.com/gatsby-starters-and-themes/).
 [Live Demo](https://gatsby-theme-document.netlify.com/)

## TODO

- Extend Yarn Workspaces, or move to Lerna
- Theme-ui'ify My own component examples GetJSON/GetGraphQL.
- Figure out Theming modes for Prism

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
