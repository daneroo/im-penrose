# Gatsby Trials

Restarting these experiments with [gatsby themes](https://www.gatsbyjs.org/docs/themes/)
and will also experiment with yarn workspaces.

- `gatsby-theme-meetup` and `site`: Replicate example in this [egghead course](https://egghead.io/courses/gatsby-theme-authoring)
- `dynamic-client` shows how a gatsby site can pull in dynamic content (from <https://fizzbuzzclock.n.imetrical.com>)
- `dynamic-client-minimal-graphql` shows how a gatsby site can pull in dynamic content with a GraphQL query (from <https://fizzbuzzclock.n.imetrical.com>)
- `mdx-deck-now`: mdx-deck and CodeSurfer (v3-beta) deployed to `zeit/now`

```bash
gatsby new document-site https://github.com/codebushi/gatsby-theme-document-example
cd document-site
gatsby develop
```

## TODO

- Restart `document-site` to track changes and steps.
- Figure out fonts (Tondo) `typefce-XX` for local serving
- Figure out Theming Prism with modes.
- Consolidate examples into a `gatsby-theme-document` based site
- Try [gatsby-theme-document](https://www.gatsbyjs.org/packages/gatsby-theme-document/) by [Code Bushi](https://codebushi.com/gatsby-starters-and-themes/)
- Also check out [Novella](https://github.com/narative/gatsby-theme-novela) by [Code Bushi](https://codebushi.com/gatsby-starters-and-themes/)

## Legacy Below ---

I am using [Gatsby](https://www.gatsbyjs.org/) (v2), and these are minimal examples to de-risk things I need:

- Hooks
- Styling:
  - Integrate Material Design
  - Emotion
  - Typography
- D3
  - with inline data
  - with Dynamic data
- StyleGuidist
- Authentication
- Integrate all examples into one...

Each of these is in it's own repo, and each should start with a minimal app.

```bash
npx gatsby new experimentname
```

## Takeaways

- NoSSR for fetch, GrapQL (with subscription)
- MDX Decks

## References

- [Inter UI font](https://rsms.me/inter/)
- [Design for DarkMode](https://stuffandnonsense.co.uk/blog/redesigning-your-product-and-website-for-dark-mode)
- [Bits - Sharing Components](https://bitsrc.io/)
- [Eghead.io: Markdown in Gatsby](https://egghead.io/lessons/gatsby-format-markdown-files-for-gatsby-js)
- [Swizec's d3Blackbox and useD3](https://swizec.com/blog/announcing-d3blackbox-used3/swizec/8703?__s=ui6bft3mqwotihs8qbnu)
- [Mike's Blog on D3 and React](https://mikewilliamson.wordpress.com/2016/06/03/d3-and-react-3-ways/)
- [Material Design Awards 2018](https://design.google/library/material-design-awards-2018/)
- [Material starter](https://github.com/Vagr9K/gatsby-material-starter)
- [StyleGuidist](https://github.com/styleguidist/react-styleguidist)
- [Gatsby and Hasura GraphQL](https://blog.hasura.io/create-gatsby-sites-using-graphql-on-postgres-603b5dd1e516)
