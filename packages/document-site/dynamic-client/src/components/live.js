import React from 'react'
import fetch from '../libs/fetch'
import useSWR from 'swr'

const buildStamp = new Date().toISOString()

export default () => {

  const { data, error } = useSWR('http://worldclockapi.com/api/json/utc/now', fetch)

  let live
  if (error) {
    live = <div style={{ color: 'red' }}>Error: {JSON.stringify(error)}</div>
  } else if (!data) {
    live = <div style={{ color: 'blue' }}>Fetching...</div>
  } else {
    live = <div style={{ color: 'green' }}>Render time: {data.currentDateTime}</div>
  }

  return <div style={{ fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif', marginBottom: '1em' }}>
    <div>Fetched Time</div>
    <div>
      {live}
      <div style={{ color: 'grey' }}>Build time: {buildStamp}</div>
    </div>
  </div>
}
