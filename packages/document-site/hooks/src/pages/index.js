import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import { cold } from 'react-hot-loader'
import useWindowSize from '../components/useWindowSize'

const IndexPage = () => {
  const size = useWindowSize()

  return (
    <Layout>
      <h1>Hello hooks!</h1>
      <Link to='/d3page/'>Go to D3 page</Link>

      <p>This widows is {size.width}px x {size.height}px <br />
        which I know from <em>useWindowSize</em> hook</p>
    </Layout>
  )
}

cold(IndexPage)
export default IndexPage
