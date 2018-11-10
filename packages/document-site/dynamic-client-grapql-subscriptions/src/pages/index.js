import React from 'react'
import { Link } from 'gatsby'
import FecthDate from '../components/fetchDate'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <h2>Dynamic Content from HTTP</h2>
    <Link to='/dyngql/'>Go to Graphql example</Link>
    <p>This is how we get data from the client (browser)</p>
    <p>
      In our component's{' '}
      <span style={{ fontFamily: 'Courier' }}>componentDidMount</span>, we fetch
      from external API, which will not be done by the Gatsby build
    </p>
    <p>Notice how the data is re-fetched when the component is rendered.</p>

    <FecthDate />

  </Layout>
)

export default IndexPage
