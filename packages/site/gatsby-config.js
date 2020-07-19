module.exports = {
  siteMetadata: {
    title: 'Penrose Quasiperiodic Tiling',
    name: 'im-penrose',
    siteUrl: 'https://penrose.n.imetrical.com',
    description: 'Penrose Quasiperiodic Tiling',
    social: [
      {
        name: 'github',
        url: 'https://github.com/daneroo/im-penrose'
      },
      {
        name: 'twitter',
        url: 'https://twitter.com/daneroo'
      }
    ],
    sidebarConfig: {
      forcedNavOrder: ['/components', '/samples'],
      ignoreIndex: true
    }
  },
  plugins: [
    { resolve: 'gatsby-theme-document' },
    'gatsby-theme-style-guide'
  ]
}
