import React from 'react'

function delay(millis) {
  return function(value) {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(value)
      }, millis)
    )
  }
}
class Live extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      liveStamp: '',
      buildStamp: new Date().toISOString(),
    }
  }

  componentDidMount() {
    fetch('http://worldclockapi.com/api/json/utc/now')
      // artificial delay to show Loading...
      .then(delay(1000))
      .then(resp => resp.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          liveStamp: result.currentDateTime,
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
    const { error, isLoaded, liveStamp, buildStamp } = this.state

    let live
    if (error) {
      live = <div style={{ color: 'red' }}>Error: {error.message}</div>
    } else if (!isLoaded) {
      live = <div style={{ color: 'blue' }}>Fetching...</div>
    } else {
      live = (
        <div>
          Render time:
          <span style={{ color: 'green' }}>{liveStamp}</span>
        </div>
      )
    }
    return (
      <div style={{ fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif' }}>
        {live}
        <div style={{ color: 'grey' }}>Build time: {buildStamp}</div>
      </div>
    )
  }
}

export default Live
