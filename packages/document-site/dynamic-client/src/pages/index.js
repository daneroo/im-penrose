import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import Live from '../components/live'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>This is Dynamic Content</h1>
    <p><Link to="/page-2/" >Go to page 2</Link></p>

    <p>The render time is fetched with a fetch to an API. (with <a href="https://github.com/zeit/swr" >swr</a>)</p>

    <Live />

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
