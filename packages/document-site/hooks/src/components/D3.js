import React from 'react'

// Use viewBox directly for now
// aspect ratio, or ...
export const D3 = props => {
  const { viewBox } = props
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio='xMidYMid meet'
      style={props.style}
    >
      {props.children}
    </svg>
  )
}

export default D3
