import React from 'react'

const Meetup = ({ name, location, url, date }) => (
  <div>
    <h1>{name} ({location})</h1>
    <p>{new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'long',
      hour12: false
    })}
    </p>
    <p>Website: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
  </div>
)

export default Meetup