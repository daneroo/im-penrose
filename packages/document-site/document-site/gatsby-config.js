module.exports = {
  siteMetadata: {
    title: `Document Theme Example`,
    name: `DocumentThemeBase`,
    siteUrl: `https://gatsby-theme-document.n.imetrical.com`,
    description: `Gatsby Document theme example site`,
    social: [
      {
        name: `github`,
        url: `https://github.com/daneroo/gatsby-trials`
      },
      {
        name: `twitter`,
        url: `https://twitter.com/daneroo`
      }
    ],
    sidebarConfig: {
      forcedNavOrder: ["/components", "/samples"],
      ignoreIndex: true
    }
  },
  plugins: [
    { resolve: `gatsby-theme-document` },
    'gatsby-theme-style-guide'
  ]
};
