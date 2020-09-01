import React, { useState } from 'react'
// import { useThemeUI, Grid, Flex, Radio, Box, Button, Label, Slider } from 'theme-ui'
import { useThemeUI, Grid, Flex, Box, Button, Label, Slider, Checkbox } from 'theme-ui'

const goldenRatio = (1 + Math.sqrt(5)) / 2

// P = A + (B - A) / goldenRatio;
function goldenpoint (A, B) {
  var P = {
    x: A.x + (B.x - A.x) / goldenRatio,
    y: A.y + (B.y - A.y) / goldenRatio
  }
  return P
}

function subdivide (triangles) {
  return triangles.flatMap(function (triangle) {
    const { color, A, B, C } = triangle
    if (color === 0) {
      // P = A + (B - A) / goldenRatio;
      const P = goldenpoint(A, B)
      return [
        { color: 0, A: C, B: P, C: B },
        { color: 1, A: P, B: C, C: A }
      ]
    } else {
      // Q = B + (A - B) / goldenRatio;
      const Q = goldenpoint(B, A)
      // R = B + (C - B) / goldenRatio;
      const R = goldenpoint(B, C)
      // return [
      //   { color: 1, A: R, B: C, C: A },
      //   { color: 0, A: R, B: A, C: B }
      // ]
      return [
        { color: 1, A: R, B: C, C: A },
        { color: 1, A: Q, B: R, C: B },
        { color: 0, A: R, B: Q, C: A }
      ]
    }
  })
}

function polarToRect (r, phi) {
  // Return the complex number x with polar coordinates r and phi. Equivalent to r * (math.cos(phi) + math.sin(phi)*1j).
  return {
    x: r * Math.cos(phi),
    y: r * Math.sin(phi)
  }
}

// Create wheel of 10 triangles around the origin
// having color:0
// having alternating "polarity"
function level0 () {
  // # Create wheel of color:0 triangles around the origin
  const A = { x: 0, y: 0 }
  return Array.from({ length: 10 }).map((_, i) => {
    const B = polarToRect(1, (2 * i - 1) * Math.PI / 10)
    const C = polarToRect(1, (2 * i + 1) * Math.PI / 10)
    if (i % 2 === 0) {
      // Alternate "polarity"
      return { color: 0, A, B: C, C: B }
    }
    return { color: 0, A, B, C }
  })
}

const memoized = {}
function level (depth) {
  const key = `${depth}`
  if (!(key in memoized)) {
    const triangles = (depth <= 0) ? level0() : subdivide(level(depth - 1))
    memoized[key] = triangles
  }
  return memoized[key]
}

// center: Arithmetic average of A,B,C
function center (t) {
  const mid3 = [t.A, t.B, t.C].reduce(
    ({ sx, sy }, { x, y }) => {
      return { sx: sx + x, sy: sy + y }
    },
    { sx: 0, sy: 0 }
  )
  return { x: mid3.sx / 3, y: mid3.sy / 3 }
}

// Draws three independent arrows A-B,B->C,C->A
// scaled (.6) around center, to fit inside original Triangle
function TriangleWithArrows ({ t, colors, arrows }) {
  const mid = center(t)
  const ds = [t.A, t.B, t.C].map(
    ({ x: x1, y: y1 }, i, ts) => {
      const { x: x2, y: y2 } = ts[(i + 1) % 3]
      return `M${x1 - mid.x},${y1 - mid.y} L${x2 - mid.x},${y2 - mid.y}`
    }
  )
  return (
    <>
      <g transform={`translate(${mid.x},${mid.y})scale(.6.6)`} stroke='yellow'>
        {ds.map((d, i) => {
          return (
            <path
              key={i} d={d} stroke='yellow'
              markerEnd='url(#arrow)'
            />)
        })}
      </g>
      {/*
      <circle r={0.05} cx={t.A.x} cy={t.A.y} opacity={0.7} fill='red' />
      <circle r={0.05} cx={t.B.x} cy={t.B.y} opacity={0.7} fill='green' />
      <circle r={0.05} cx={t.C.x} cy={t.C.y} opacity={0.7} fill='blue' />
      */}

      <text x={t.A.x} y={t.A.y} style={{ fontSize: '0.05px' }} stroke='black'>A</text>
      <text x={t.B.x} y={t.B.y} style={{ fontSize: '0.05px' }} stroke='black'>B</text>
      <text x={t.C.x} y={t.C.y} style={{ fontSize: '0.05px' }} stroke='black'>C</text>
    </>
  )
}

function Triangle ({ t, colors, arrows }) {
  // M {A} L {B} L {C} Z
  const d = [t.A, t.B, t.C].map(({ x, y }, i) => `${i ? 'L' : 'M'}${x},${y}`) + 'Z'
  const fill = colors[t.color]
  return (
    <>
      <path
        d={d} fill={fill}
      />
      {arrows && (
        <TriangleWithArrows {...{ t, colors, arrows }} />
      )}
    </>
  )
}

function Tiling ({ triangles, colors, arrows }) {
  return triangles.map((t, i) => <Triangle key={i} t={t} colors={colors} arrows={arrows} />)
}

function SVGUnit ({ children }) {
  const arrowClr = 'yellow'
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='-1 -1 2 2'>
      <defs>
        <marker
          id='arrow' viewBox='0 0 10 10'
          refX='10' refY='5'
          markerUnits='strokeWidth'
          markerWidth='20' markerHeight='20'
          orient='auto-start-reverse'
        >
          <path d='M 0 0 L 10 5 L 0 10 z' fill={arrowClr} opacity='1' />
        </marker>
      </defs>
      <g transform='scale(1,-1)'>
        {children}
      </g>
    </svg>
  )
}

export function Rules () {
  const { theme } = useThemeUI()
  const { colors: { primary, secondary } } = theme
  const colors = [primary, secondary]
  const strokeWidth = 0.005

  // const A = { x: 0, y: 0 }
  // const B = polarToRect(1, (2 * -3 - 1) * Math.PI / 10) // -7
  // const C = polarToRect(1, (2 * -3 + 1) * Math.PI / 10) // -5
  // const B = polarToRect(1, (-6) * Math.PI / 10)
  // const C = polarToRect(1, (-4) * Math.PI / 10)
  const t0 = (() => {
    const h = Math.sqrt(goldenRatio * goldenRatio - 0.5 * 0.5)
    const A = { x: 0, y: h - h / 2 }
    const B = { x: -0.5, y: 0 - h / 2 }
    const C = { x: 0.5, y: 0 - h / 2 }
    console.log({ A, B, C })
    return { color: 0, A, B, C }
  })()
  const t1 = (() => {
    const h = Math.sqrt(1 / goldenRatio * 1 / goldenRatio - 0.5 * 0.5)
    const B = { x: 0, y: 1 }
    const C = { x: 0, y: 0 }
    const A = { x: h, y: 0.5 }
    console.log({ A, B, C })
    return { color: 1, A, B, C }
  })()

  // const t0 = [{ color: 0, A, B, C }]
  // const t1 = [subdivide([t0])[1]]
  const tss = [
    [t0],
    subdivide([t0]),
    [t1],
    subdivide([t1])
  ]
  return (
    <Grid
      gap={2}
      columns={2}
    >
      {tss.map((ts, i) => {
        return (
          <Box key={i}>
            <SVGUnit>
              <g id='root' stroke='none' fill='none' strokeWidth={strokeWidth}>
                {/* <g transform={`rotate(${-90 - (i < 2 ? 0 : 18)})`}> */}
                {/* <g transform='translate(-1,0)scale(2,2)'> */}
                <g transform='translate(0,0)scale(1,1)'>
                  <Tiling triangles={ts} colors={colors} arrows={true || true} />
                  <rect x={-1} y={-1} width={2} height={2} fill='none' stroke='grey' />
                </g>
              </g>
            </SVGUnit>
          </Box>
        )
      })}
    </Grid>
  )
}
export default function Subdivide () {
  const { theme } = useThemeUI()
  const { colors: { primary, secondary } } = theme
  const colors = [primary, secondary]

  const [depth, setDepth] = useState(0)
  const triangles = level(depth)
  const strokeWidth = 0.005
  const maxDepth = 7
  const [hasArrows, setHasArrows] = useState(true)
  return (
    <>
      <Grid
        gap={2}
        columns={2}
      >
        <Box>
          <Flex sx={{ flexDirection: 'column' }}>
            <Label htmlFor='scale'>Depth ({depth}) - {triangles.length}Δ</Label>
            <Flex mb={3}>
              <Button sx={{ mx: 1 }} onClick={() => setDepth(Math.max(0, depth - 1))}>-</Button>
              <Slider
                name='depth'
                min='0' max={maxDepth}
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                step='1'
              />
              <Button sx={{ mx: 1 }} onClick={() => setDepth(Math.min(maxDepth, depth + 1))}>+</Button>
            </Flex>
          </Flex>
        </Box>
        <Box>
          <Label>
            <Checkbox defaultChecked={hasArrows} onChange={(e) => setHasArrows(!hasArrows)} name='arrows' /> Arrows (depth &lt; 3)
          </Label>
        </Box>
      </Grid>
      <SVGUnit>
        <g transform='scale(.99,.99)'>
          <g id='root' stroke='none' fill='none' strokeWidth={strokeWidth}>
            <Tiling triangles={triangles} colors={colors} arrows={hasArrows && depth < 3} />
            {/* <circle r={1} stroke='red' /> */}
          </g>
        </g>
      </SVGUnit>
    </>
  )
}
