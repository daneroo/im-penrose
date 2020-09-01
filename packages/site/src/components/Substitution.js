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

// Refactored this to it's simplest substitution rule
// But requires a second substitution (see subdivide())
function subdivideStep (triangles) {
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
      // R = B + (C - B) / goldenRatio;
      const R = goldenpoint(B, C)
      return [
        { color: 1, A: R, B: C, C: A },
        // this triangle is further subdivided
        { color: 0, A: B, B: A, C: R }
      ]
    }
  })
}

// Apply the subdivideStep to each triangle
// Further apply a second step, but only for
//  - the color:0 triangle subdivided from a color:1 triangle
function subdivide (triangles, { singleStepColor1 = false } = {}) {
  return triangles.flatMap(function (triangle) {
    function further (t) {
      return (triangle.color === 1 && t.color === 0)
        ? subdivideStep([t])
        : t
    }
    // return subdivideStep([triangle]).flatMap(t => (triangle.color === 0 || t.color === 1 ? t : subdivideStep([t])))
    return subdivideStep([triangle]).flatMap(further)
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
  return Array.from({ length: 10 }).flatMap((_, i) => {
    const B = polarToRect(1, (2 * i - 1) * Math.PI / 10)
    const C = polarToRect(1, (2 * i + 1) * Math.PI / 10)
    if (i % 2 === 0) {
      // Alternate "polarity"
      return [{ color: 0, A, B: C, C: B }]
      // return []
    }
    return [{ color: 0, A, B, C }]
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
  const arrowClr = 'yellow'
  const mid = center(t)
  const ds = [t.A, t.B, t.C].map(
    ({ x: x1, y: y1 }, i, ts) => {
      const { x: x2, y: y2 } = ts[(i + 1) % 3]
      return `M${x1 - mid.x},${y1 - mid.y} L${x2 - mid.x},${y2 - mid.y}`
    }
  )
  const L = ({ x, y, children }) => {
    return (
      <g
        transform={`scale(1,-1)translate(${mid.x},${-mid.y})scale(.6)`}
        style={{ fontSize: '0.1px' }}
        fill={arrowClr}
      >
        <text x={x - mid.x} y={mid.y - y}>{children}</text>
      </g>
    )
  }
  return (
    <>
      <g transform={`translate(${mid.x},${mid.y})scale(.5)`}>
        {ds.map((d, i) => {
          return (
            <path
              key={i} d={d}
              stroke={arrowClr}
              markerEnd='url(#arrow)'
            />)
        })}
      </g>
      {/*
      <circle r={0.05} cx={t.A.x} cy={t.A.y} opacity={0.7} fill='red' />
      <circle r={0.05} cx={t.B.x} cy={t.B.y} opacity={0.7} fill='green' />
      <circle r={0.05} cx={t.C.x} cy={t.C.y} opacity={0.7} fill='blue' />
      */}

      <L {...t.A}>A</L>
      <L {...t.B}>B</L>
      <L {...t.C}>C</L>
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

function Rules ({ triangle, showFurther = false }) {
  const { theme } = useThemeUI()
  const { colors: { primary, secondary } } = theme
  const colors = [primary, secondary]
  const strokeWidth = 0.005

  const [further, setFurther] = useState(true)
  const sub = further ? subdivide : subdivideStep
  const tss = [
    [triangle],
    sub([triangle])
  ]
  return (
    <Grid
      gap={2}
      columns={2}
    >
      {showFurther && (
        <>
          <Box /> {/* empty */}
          <Box>
            <Label>
              <Checkbox defaultChecked={further} onChange={(e) => setFurther(!further)} />
          Further substitution
            </Label>
          </Box>
        </>
      )}

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

export function Rule0 () {
  // A_L (acute Robinson triangle) sides: 1,φ,φ => h = √(φ²-0.5²)
  const h = Math.sqrt(goldenRatio * goldenRatio - 0.5 * 0.5)
  const offY = h / 2 // vertical offset (for centering)
  const A = { x: 0, y: h - offY }
  const B = { x: -0.5, y: 0 - offY }
  const C = { x: 0.5, y: 0 - offY }
  const A_L = { color: 0, A, B, C }
  return <Rules triangle={A_L} />
}
export function Rule1 () {
  // A_S (obtuse Robinson triangle) sides: 1,1,φ => w = √(1-(φ/2)²)
  const w = Math.sqrt(1 * 1 - (goldenRatio / 2) * (goldenRatio / 2))
  const offY = goldenRatio / 2 // vertical offset (for centering)
  const B = { x: 0, y: goldenRatio - offY }
  const C = { x: 0, y: 0 - offY }
  const A = { x: w, y: goldenRatio / 2 - offY }
  const A_S = { color: 1, A, B, C }

  return <Rules triangle={A_S} showFurther />
}

export function Substitute () {
  const { theme } = useThemeUI()
  const { colors: { primary, secondary } } = theme
  const colors = [primary, secondary]

  const [depth, setDepth] = useState(2)
  const triangles = level(depth)
  const strokeWidth = 0.005
  const maxDepth = 7
  const [hasArrows, setHasArrows] = useState(false)
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
