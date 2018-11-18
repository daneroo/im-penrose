import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import { cold } from 'react-hot-loader'
import { Barchart, BarchartWithHook } from '../components/Barchart'
import { Recaman, RecamanWithHook } from '../components/Recaman'
import { DonutChart, DonutChartWithHook } from '../components/DonutChart'
import speciesData from '../components/speciesData'
import '../components/d3styles.css'

const border = { border: '1px solid grey' }

const D3Page = () => (
  <Layout>
    <h1>D3 with hooks</h1>
    <Link to='/'>Go back to the homepage</Link>

    <h2>These are the d3 with hooks example</h2>
    <svg width='600' height='400' style={border}>
      <DonutChartWithHook data={speciesData} x={0} y={0} width={600} height={200} />
      <BarchartWithHook x={0} y={200} width={300} height={200} />
      <BarchartWithHook x={300} y={200} width={300} height={200} />
      <RecamanWithHook x={0} y={0} width={600} height={400} />
    </svg>

    <h2>These are the d3 without hooks example</h2>
    <svg width='600' height='400' style={border}>
      <DonutChart data={speciesData} x={0} y={0} width={600} height={200} />
      <Barchart x={0} y={200} width={300} height={200} />
      <Barchart x={300} y={200} width={300} height={200} />
      <Recaman x={0} y={0} width={600} height={400} />
    </svg>

  </Layout>
)

cold(D3Page)
cold(Barchart)
cold(BarchartWithHook)
cold(Recaman)
cold(RecamanWithHook)
cold(DonutChartWithHook)
cold(DonutChart)

export default D3Page
