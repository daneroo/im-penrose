import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Meetup from '../components/meetup'

export const query = graphql`
  query($meetupID: String!) {
    meetup(id: { eq: $meetupID }) {
      name
      url
      date
      location
      slug
    }
  }
`

const MeetupTemplate = ({ data: { meetup } }) => (
  <Layout>
    <Meetup {...meetup} />
  </Layout>
)

export default MeetupTemplate
