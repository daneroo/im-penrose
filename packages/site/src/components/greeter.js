import React from 'react'

export default ({ user }) => {
  if (user) {
    return <p>Hello, {user}!</p>;
  }
  return <p>Hello, Stranger.</p>;
}
