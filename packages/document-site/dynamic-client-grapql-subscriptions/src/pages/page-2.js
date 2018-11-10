import React from 'react'
import { Link } from 'gatsby'
import Live from '../components/live'

import Layout from '../components/layout'

const SecondPage = () => (
  <Layout>
    <h1>Hi from the second page</h1>
    <Link to='/'>Go back to the homepage</Link>
    <p>Notice how the data is re-fetched when the component is rendered.</p>
    <Live />
  </Layout>
)

export default SecondPage
