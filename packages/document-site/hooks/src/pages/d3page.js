import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import { cold } from 'react-hot-loader'
import Barchart from '../components/Barchart'
import Recaman from '../components/Recaman'
import { DonutChart, DonutChartWithHook } from '../components/DonutChart'
import speciesData from '../components/speciesData'
import '../components/d3styles.css'

const D3Page = () => (
  <Layout>
    <h1>D3 with hooks</h1>
    <Link to='/'>Go back to the homepage</Link>
    <h2>This is the d3 with hooks example</h2>
    <svg width='640' height='320'>
      <DonutChartWithHook data={speciesData} x={10} y={0} />
      <Recaman x={100} y={-100} width={640} height={240} />
    </svg>

    <h2>This is the d3 without hooks example</h2>
    <svg width='800' height='600'>
      <DonutChart data={speciesData} />
      <Barchart x={10} y={10} width={300} height={200} />
      <Barchart x={50} y={300} width={400} height={300} />
    </svg>

  </Layout>
)

cold(D3Page)
cold(Barchart)
cold(Recaman)
cold(DonutChartWithHook)

export default D3Page
