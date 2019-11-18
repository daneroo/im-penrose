import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Live from '../components/live'

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p><Link to="/">Go back to the homepage</Link></p>

    <p>Notice how the data is re-fetched when the component is rendered.</p>
    <Live />
  </Layout>
)

export default SecondPage
