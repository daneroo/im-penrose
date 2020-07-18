import React, { useState } from 'react'

function Line ({ angle, off, clr = 'grey', thick = 0.01, opa = 1 }) {
  const line = 'M-1000,0 L1000,0'
  return (
    <path
      opacity={opa}
      strokeWidth={thick}
      stroke={clr}
      d={line}
      transform={`rotate(${angle}) translate(${off.x},${off.y})`}
    />
  )
}

function Square ({ id, off, clr = 'grey', thick = 0.01, opa = 1, ...other }) {
  return (
    <rect
      id={id}
      opacity={opa}
      strokeWidth={thick}
      stroke={clr}
      x={off.x - 0.5}
      y={off.y - 0.5}
      width={1}
      height={1}
      {...other}
    />
  )
}

function Point ({ off, clr = 'grey', thick = 0.01, opa = 1 }) {
  return (
    <circle
      opacity={opa}
      stroke='none'
      fill={clr}
      cx={off.x}
      cy={off.y}
      r={thick}
    />
  )
}

function Grid ({ thick = 0.01 }) {
  var range = []; for (var i = 0; i < 50; i++)range.push(i)
  return range.map((_, i) => {
    return (
      <g key={i}>
        <Line angle={0} off={{ x: 0, y: i }} thick={thick} />
        <Line angle={0} off={{ x: 0, y: -i }} thick={thick} />

        <Line angle={90} off={{ x: 0, y: i }} thick={thick} />
        <Line angle={90} off={{ x: 0, y: -i }} thick={thick} />
      </g>
    )
  })
}

function distancePointOriginLine (p, deg) { // point as[], angle of line in degrees
  // http://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  // E's normal n : [cos(angleE),sin(angleE)]
  // cross(-p,n)*n
  // distance = || -p - ( cross(-p,n)*n )  ||
  var rad = deg * Math.PI / 180
  // var n = [-Math.sin(rad),Math.cos(rad)];
  var n = [Math.cos(rad), Math.sin(rad)]
  var cross = -p[0] * n[0] - p[1] * n[1]
  var dv = [-p[0] - cross * n[0], -p[1] - cross * n[1]]
  var d = Math.sqrt(dv[0] * dv[0] + dv[1] * dv[1])
  return d
}

function projectPointOriginLine (p, deg) { // point as [], angle of line in degrees
  // http://en.wikibooks.org/wiki/Linear_Algebra/Orthogonal_Projection_Onto_a_Line
  // E's normal n : [cos(angleE),sin(angleE)]
  // cross(p,n)*n
  // projected = || -p - ( cross(-p,n)*n )  ||
  var rad = deg * Math.PI / 180
  // var n = [-Math.sin(rad),Math.cos(rad)];
  var n = [Math.cos(rad), Math.sin(rad)]
  var cross = p[0] * n[0] + p[1] * n[1]
  var proj = [cross * n[0], cross * n[1]]
  return proj
}

function eHalfThickness (deg) { // .5 <= maxD <= sqrt(2)/2
  // thickness of E is Max of distance from the four (±0.5,±0.5) corners of square to line.
  // two of these pairs are identical -
  // one distance will be below 1, the other above, max is the one >1
  var maxD = 0
  for (var sign = -1; sign <= 1; sign += 2) {
    var p = [sign * 1 / 2, 1 / 2]
    var d = distancePointOriginLine(p, deg)
    // console.log('p,d',p,d);
    // drawLine(90+deg,{x:0,y:0},'green');
    if (d >= 0.5) { // this is the max!
      return d
    }
    maxD = Math.max(d, maxD)
  }
  // should not happen, one of these two >=1
  return maxD
}

export default function Quasi2D () {
  const [offset, setOffset] = useState(0)
  // const angleE = 45.001
  // const angleE = Math.atan(3) * 180 / Math.PI
  const goldenRatio = (1 + Math.sqrt(5)) / 2
  const angleE = -Math.atan(goldenRatio) * 180 / Math.PI

  const maxD = eHalfThickness(angleE)

  function Check ({ p }) {
    const isIn = check(p)
    const color = isIn ? 'red' : 'grey'
    return <Point off={p} clr={color} thick={0.2} opa={0.1} />
  }
  function check (p) {
    const pv = [p.x, p.y]
    const d = distancePointOriginLine(pv, angleE)
    const isIn = (d <= maxD)
    // console.log('in?', isIn, pv, d, maxD)
    return isIn
  }

  return (
    <div style={{ border: '1px solid red' }}>
      <input
        id='offset'
        type='range'
        min='-10' max='10'
        value={offset}
        onChange={(e) => setOffset(e.target.value)}
        step='1'
      />
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='-10 -10 20 20'>
        <g transform='scale(.6,-.6)'>
          <g id='rotation' transform='rotate(0)'>
            <g id='root' stroke='black' fill='none'>
              <Grid thick={0.01} />
              <Line angle={angleE} off={{ x: 0, y: 0 }} clr='red' thick={maxD * 2} opa={0.1} />
              <Line angle={angleE} off={{ x: 0, y: 0 }} clr='red' />
              <Square
                id='square' off={{ x: 0, y: 0 }} clr='blue'
                thick={0.02}
                stroke='red'
                transform={`rotate(${angleE}) translate(${offset},0) rotate(${-angleE})`}
              />
              <Check p={{ x: 0, y: 0 }} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
