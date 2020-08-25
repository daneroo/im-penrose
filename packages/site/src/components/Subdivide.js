import React, { useState, useMemo } from 'react'
// import { useThemeUI, Grid, Flex, Radio, Box, Button, Label, Slider } from 'theme-ui'
import { useThemeUI, Grid, Box, Label, Slider } from 'theme-ui'

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
    console.log('cache miss')
    memoized[key] = triangles
  }
  console.log(memoized[key].length)
  return memoized[key]
}

function Triangle ({ t, colors }) {
  // const d = 'M' + [t.A, t.B, t.C, t.A].map(function (p) { return [p.x, p.y] }).join('L')
  const d = [t.A, t.B, t.C].map(({ x, y }, i) => `${i ? 'L' : 'M'}${x},${y}`) + 'Z'
  const fill = colors[t.color]
  return (
    <path d={d} fill={fill} />
  )
}

function Tiling ({ triangles, colors }) {
  return triangles.map((t, i) => <Triangle key={i} t={t} colors={colors} />)
}

export default function Subdivide () {
  const { theme } = useThemeUI()
  const { colors: { primary, secondary } } = theme
  const colors = [primary, secondary]
  console.log()

  // const goldenRatio = (1 + Math.sqrt(5)) / 2
  const [depth, setDepth] = useState(3)
  const triangles = useMemo(() => level(depth), [depth])
  // const triangles = level(depth)
  const strokeWidth = 0.005

  return (
    <>
      <Grid
        gap={2}
        columns={2}
      >
        <Box>
          <Label htmlFor='scale'>Depth ({depth})</Label>
          <Slider
            name='depth'
            min='0' max='6'
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            step='1'
          />
        </Box>
        <Box>Animate</Box>
      </Grid>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='-1 -1 2 2'>
        <g transform='scale(.99,.99)'>
          <g id='root' stroke='none' fill='none' strokeWidth={strokeWidth}>
            <Tiling triangles={triangles} colors={colors} />
            {/* <circle r={1} stroke='red' /> */}
          </g>
        </g>
      </svg>
    </>
  )
}
