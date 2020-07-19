import React, { useState } from 'react'
import { useThemeUI } from 'theme-ui'

function Line ({ angle, off, clr = 'grey', thick = 0.01, opa = 1 }) {
  // const line = 'M-1000,0 L1000,0 Z'
  // <path d={line} ...
  return (
    <polyline
      points='-100,0 100,0'
      opacity={opa}
      strokeWidth={thick}
      stroke={clr}
      transform={`rotate(${angle}) translate(${off.x},${off.y})`}
    />
  )
}

function Segment ({ p1, p2, clr = 'grey', thick = 0.01, opa = 1 }) {
  if (Number.isNaN(p1.x) || Number.isNaN(p1.y) || Number.isNaN(p2.x) || Number.isNaN(p2.y)) {
    return <></>
  }
  return (
    <line
      opacity={opa}
      strokeWidth={thick}
      stroke={clr}
      x1={p1.x}
      y1={p1.y}
      x2={p2.x}
      y2={p2.y}
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
  return range.map(i => {
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

function Check ({ p, isIn }) {
  const { theme: { colors: { primary } } } = useThemeUI()

  const color = isIn ? primary : 'grey'
  return <Point off={p} clr={color} thick={0.2} opa={0.1} />
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

function toPoint ([x, y]) {
  return { x, y }
}
function negPoint ({ x, y }) {
  return { x: -x, y: -y }
}
function DrawSegAndProj (prv, nxt, direction, angleE, theme) {
  const { colors: { primary } } = theme

  const opaStair = 0.3
  const thickStair = 0.05
  const opaProj = 1
  const thickProj = 0.1
  // const color = { horizontal: 'blue', vert: 'magenta' }[direction]
  const color = { horizontal: 'black', vert: primary }[direction]
  // console.log('draw (-|) ', JSON.stringify([prv, nxt]))
  // projection
  const projP = toPoint(projectPointOriginLine([prv.x, prv.y], angleE))
  const projN = toPoint(projectPointOriginLine([nxt.x, nxt.y], angleE))
  // console.log('draw (+|) ', JSON.stringify([projP, projN]))
  // drawSegment(prv, nxt, color, thickStair, opaStair)
  // drawSegment({ x: projP[0], y: projP[1] }, { x: projN[0], y: projN[1] }, color, thickProj, opaProj)
  // drawSegment({ x: -projP[0], y: -projP[1] }, { x: -projN[0], y: -projN[1] }, color, thickProj, opaProj)
  return (
    <>
      <Segment p1={negPoint(prv)} p2={negPoint(nxt)} clr={color} thick={thickStair} opa={opaStair} />
      <Segment p1={prv} p2={nxt} clr={color} thick={thickStair} opa={opaStair} />
      <Segment p1={negPoint(projP)} p2={negPoint(projN)} clr={color} thick={thickProj} opa={opaProj} />
      <Segment p1={projP} p2={projN} clr={color} thick={thickProj} opa={opaProj} />
    </>
  )
}

function check (p, angleE, maxD) {
  const pv = [p.x, p.y]
  const d = distancePointOriginLine(pv, angleE)
  const isIn = (d <= maxD)
  // console.log('in?', isIn, pv, d, maxD)
  return isIn
}

function CheckSteps ({ start, steps, angleE, maxD, theme }) {
  const rad = angleE * Math.PI / 180
  const up = (Math.cos(rad) * Math.sin(rad)) >= 0 ? 1 : -1

  let prv = start
  let nxt = { x: start.x + 1, y: start.y }

  const elementsToDraw = []
  function pp (elements) { elementsToDraw.push(elements) }
  for (var it = 0; it < steps; it++) {
    while (true) {
      const isIn = check(nxt, angleE, maxD)
      if (isIn) {
        pp(DrawSegAndProj(prv, nxt, 'horizontal', angleE, theme))
        prv = nxt
        nxt = { x: nxt.x + 1, y: nxt.y }
      } else {
        nxt = { x: nxt.x - 1, y: nxt.y + up }
        break
      }
    }
    while (true) {
      const isIn = check(nxt, angleE, maxD)
      if (isIn) {
        pp(DrawSegAndProj(prv, nxt, 'vert', angleE, theme))
        prv = nxt
        nxt = { x: nxt.x, y: nxt.y + up }
      } else {
        nxt = { x: nxt.x + 1, y: nxt.y - up }
        break
      }
    }
  }

  return elementsToDraw.map((elt, i) => {
    return <g key={i}>{elt}</g>
  })
}

export default function Quasi2D () {
  const { theme } = useThemeUI()
  const { colors: { primary, secondary } } = theme

  const goldenRatio = (1 + Math.sqrt(5)) / 2
  const angleIrrational = Math.atan(goldenRatio) * 180 / Math.PI
  const angleRational = 30
  const [frameIsGrid, setFrameIsGrid] = useState(true)
  const [scale, setScale] = useState(3)
  // const angleE = 45.001
  // const angleE = Math.atan(3) * 180 / Math.PI
  const [angleE, setAngleE] = useState(angleIrrational)
  const frameAngle = (frameIsGrid ? 0 : -angleE)
  const maxD = eHalfThickness(angleE)

  return (
    <div style={{ border: `1px solid ${secondary}` }}>
      <div>
        <label htmlFor='scale'>scale ({scale})</label>
        <input
          id='scale'
          name='scale'
          type='range'
          min='1' max='5'
          value={scale}
          onChange={(e) => setScale(e.target.value)}
          step='1'
        />
      </div>
      <div>
        <label htmlFor='angleE'>angle θ ({Number(angleE).toFixed(1)})</label>
        <input
          id='angleE'
          name='angleE'
          type='range'
          min='1' max='89'
          value={angleE}
          onChange={(e) => setAngleE(e.target.value)}
          step='1'
        />
        <button onClick={() => setAngleE(angleIrrational)}>𝕀</button>
        <button onClick={() => setAngleE(angleRational)}>ℚ</button>
        <button onClick={() => setAngleE(90 - angleE)}>π - θ</button>
      </div>
      <div>
        <label htmlFor='frame'>frame ({frameIsGrid ? 'Grid' : 'Line'})</label>
        <button id='frame' onClick={() => setFrameIsGrid(!frameIsGrid)}>{frameIsGrid ? 'Line' : 'Grid'}</button>
      </div>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='-10 -10 20 20'>
        <g transform={`scale(${scale / 2},${-scale / 2})`}>
          <g id='rotation' transform={`rotate(${frameAngle})`}>
            <g id='root' stroke='black' fill='none'>
              <Line angle={angleE} off={{ x: 0, y: 0 }} clr={primary} thick={maxD * 2} opa={0.05} />
              {/* <Line angle={angleE} off={{ x: 0, y: 0 }} clr='blue' /> */}
              <Square
                id='square' off={{ x: 0, y: 0 }} clr={secondary}
                thick={0.02}
                transform={`rotate(${angleE}) translate(0,0) rotate(${-angleE})`}
              />
              <Check p={{ x: 0, y: 0 }} isIn={check({ x: 0, y: 0 }, angleE, maxD)} />
              <CheckSteps start={{ x: 0, y: 0 }} angleE={angleE} steps={20} maxD={maxD} theme={theme} />
              <Grid thick={0.01} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
