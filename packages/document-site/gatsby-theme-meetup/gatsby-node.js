const fs = require('fs')

// 1- make sure data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'data'
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

// 2- define the Meetup type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Meetup implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      date: Date! @dateformat
      url: String!
      slug: String!
    }
  `)
}

// 3- Custom resolvers for derived fiels (slug)
exports.createResolvers = ({ createResolvers }) => {
  const basePath = '/'
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    // normalize '/'s could use path.normalize(`${basePath}/${slug}`)
    return `${basePath}/${slug}`.replace(/\/\/+/g, '/')
  }

  createResolvers({
    Meetup: {
      slug: {
        resolve: source => slugify(source.name)
      }
    }
  })
}

// 4- Query for meetups and create pages
exports.createPages = async ({ actions, graphql, reporter }) => {
  const basePath = '/'
  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/meetups.js')
  })

  const result = await graphql(`
    query {
      allMeetup(sort: {fields: date, order: DESC}) {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic('error loading meetups', reporter.errors)
    return
  }

  const meetups = result.data.allMeetup.nodes
  meetups.forEach(meetup => {
    const slug = meetup.slug
    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/meetup.js'),
      context: {
        meetupID: meetup.id
      }
    })
  })
}
