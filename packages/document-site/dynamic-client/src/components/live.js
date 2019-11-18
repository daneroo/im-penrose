import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import fetch from '../libs/fetch'
import useSWR from 'swr'

// const externalUrl = 'https://time.qcic.n.imetrical.com/' // .time
const externalUrl = 'https://fizzbuzzclock.n.imetrical.com/' // .stamp

export default () => {
  const { site } = useStaticQuery(graphql`
    query BuildTime {
      site {
        buildTime
      }
    }
  `)

  const { data, error } = useSWR(externalUrl, fetch)

  let color, content
  if (error) {
    color = 'red'
    content = ['Error', 'Failed to Fecth Time'] // error.message
  } else if (!data) {
    color = 'blue'
    content = ['Fetching', '...']
  } else {
    color = 'green'
    content = ['Render time', data.stamp] // .time for time.qcic.n.imetrical.com
  }

  return <div style={{
    fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
    marginBottom: '1em',
    display: 'grid',
    gridTemplateColumns: '10em 1fr'

  }}>
    <div>Fetched from:</div><div><a href={externalUrl} target="_blank" rel="noopener noreferrer">{externalUrl}</a></div>
    <div style={{ color }}>{content[0]}:</div><div>{content[1]}</div>
    <div style={{ color: 'grey' }}>Build time:</div><div>{site.buildTime}</div>
  </div>
}
