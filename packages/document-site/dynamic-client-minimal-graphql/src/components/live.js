import React from 'react'
import { request } from 'graphql-request'


const query = `{
  messages {
    id
    stamp
    host
    text
  }
}`

// const query = `{
//   Movie(title: "Inception") {
//     releaseDate
//     actors {
//       name
//     }
//   }
// }`



class Live extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      result: ''
    }
  }

  componentDidMount() {
    const endpoint =  "https://api.qcic.n.imetrical.com/graphql"
    // const endpoint =  "https://api.graph.cool/simple/v1/movies"
    request(endpoint, query)
      // artificial delay to show Loading...
      .then(result => {
        console.log(JSON.stringify(result))
        this.setState({
          isLoaded: true,
          result,
        })
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error,
        })
      })
  }

  render() {
    const { error, isLoaded, result } = this.state

    if (error) {
      return <div style={{ color: 'red' }}>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div style={{ color: 'blue' }}>Fetching...</div>
    } else {
      return (
        <pre>{JSON.stringify(result,null,2)}</pre>
      )
    }
  }
}

export default Live
