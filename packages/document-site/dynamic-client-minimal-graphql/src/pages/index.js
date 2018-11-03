import React from 'react'
import { Link } from 'gatsby'
import Live from '../components/live'

import Layout from '../components/layout'
import Image from '../components/image'

const IndexPage = () => (
  <Layout>
    <h1>This is Dynamic Content</h1>
    <Link to="/page-2/">Go to page 2</Link>
    <p>This is how we get data from the client (browser)</p>
    <p>
      In our component's{' '}
      <span style={{ fontFamily: 'Courier' }}>componentDidMount</span>, we fetch
      from external GraphQL API using 
      <a href="https://github.com/prisma/graphql-request">prisma/graphql-request</a>, 
      which will not be fetched by the Gatsby build
    </p>

    <Live />

    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
