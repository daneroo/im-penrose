import React from 'react'
import { Link } from 'gatsby'
import { Styled } from 'theme-ui'

const EventList = ({ meetups }) => (
  <>
    <Styled.h1>All Meetups</Styled.h1>
    <Styled.ul>
      {meetups.map(meetup => (
        <Styled.li key={meetup.id}>
          <strong>
            <Link to={meetup.slug}>{meetup.name}</Link>
          </strong>
          <br />
          At {meetup.location} on &nbsp;
          {new Date(meetup.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'long',
            hour12: false
          })}
        </Styled.li>
      ))}
    </Styled.ul>
  </>
)

export default EventList