import React, { useState } from 'react'
// import { useThemeUI, Grid, Flex, Radio, Box, Button, Label, Slider } from 'theme-ui'
import { useThemeUI, Grid, Flex, Box, Button, Label, Slider, Checkbox } from 'theme-ui'

const goldenRatio = (1 + Math.sqrt(5)) / 2

// P = A + (B - A) / goldenRatio;
function midpoint (A, B) {
  var P = {
    x: A.x + (B.x - A.x) / goldenRatio,
    y: A.y + (B.y - A.y) / goldenRatio
  }
  return P
}

function subdivide (triangles) {
  var result = []
  triangles.forEach(function (triangle) {
    var color = triangle.color; var A = triangle.A; var B = triangle.B; var C = triangle.C
    if (color === 0) {
      // # Subdivide red triangle
      // P = A + (B - A) / goldenRatio;
      var P = midpoint(A, B)
      result.push({ color: 0, A: C, B: P, C: B }, { color: 1, A: P, B: C, C: A })
    } else {
      // # Subdivide blue triangle
      // Q = B + (A - B) / goldenRatio;
      var Q = midpoint(B, A)
      // R = B + (C - B) / goldenRatio;
      var R = midpoint(B, C)
      result.push({ color: 1, A: R, B: C, C: A }, { color: 1, A: Q, B: R, C: B }, { color: 0, A: R, B: Q, C: A })
    }
  })
  return result
}

function toRect (r, phi) {
  // Return the complex number x with polar coordinates r and phi. Equivalent to r * (math.cos(phi) + math.sin(phi)*1j).
  return {
    x: r * Math.cos(phi),
    y: r * Math.sin(phi)
  }
}

// Create wheel of 10 triangles around the origin
function level0 () {
  // # Create wheel of color0 triangles around the origin
  var triangles = []
  for (var i = 0; i < 10; i++) {
    var B = toRect(1, (2 * i - 1) * Math.PI / 10)
    var C = toRect(1, (2 * i + 1) * Math.PI / 10)
    if (i % 2 === 0) { // # Make sure to mirror every second triangle
      var t = B
      B = C
      C = t
    }
    triangles.push({ color: 0, A: { x: 0, y: 0 }, B: B, C: C })
  }
  return triangles
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

function center (t) {
  const mid3 = [t.A, t.B, t.C].reduce(
    ({ sx, sy }, { x, y }) => {
      return { sx: sx + x, sy: sy + y }
    },
    { sx: 0, sy: 0 }
  )
  return { x: mid3.sx / 3, y: mid3.sy / 3 }
}

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

export default function Subdivide () {
  const { theme } = useThemeUI()
  const { colors: { primary, secondary } } = theme
  const colors = [primary, secondary]
  const arrowClr = 'yellow'

  // const goldenRatio = (1 + Math.sqrt(5)) / 2
  const [depth, setDepth] = useState(1)
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
          <g transform='scale(.99,.99)'>
            <g id='root' stroke='none' fill='none' strokeWidth={strokeWidth}>
              <Tiling triangles={triangles} colors={colors} arrows={hasArrows && depth < 3} />
              {/* <circle r={1} stroke='red' /> */}
            </g>
          </g>
        </g>
      </svg>
    </>
  )
}
