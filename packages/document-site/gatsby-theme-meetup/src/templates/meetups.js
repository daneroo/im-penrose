import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import MeetupList from '../components/meetup-list'

const MeetupsTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      allMeetup(sort: {fields: date, order: DESC}) {
        nodes {
          id
          name
          date
          location
          url
          slug
        }
      }
    }
  `)
  const meetups = data.allMeetup.nodes
  return (
    <Layout>
      <MeetupList meetups={meetups} />
    </Layout>
  )
}

export default MeetupsTemplate