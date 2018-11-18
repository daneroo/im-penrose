import React from 'react'
import * as d3 from 'd3'
import D3blackbox from 'd3blackbox'

const useD3 = function (render) {
  const refAnchor = React.useRef(null)
  React.useEffect(() => {
    render(refAnchor.current)
  })
  return refAnchor
}

// Recaman sequence animation borrowed from http://blockbuilder.org/johnwalley/25b77d49bbbee7aef480d7598708e039

function recaman (props) {
  console.log({ props })
  const { anchor, width } = props
  var n = 60

  var curr = 0
  var seq = [curr]

  for (let i = 1; i < n; i++) {
    var next = curr - i

    if (next < 0 || seq.includes(next)) {
      curr = curr + i
      seq.push(curr)
    } else {
      curr = next
      seq.push(next)
    }
  }

  // console.log(seq)

  var data = []
  var sign = 1

  for (let i = 0; i < n - 1; i++) {
    var center = (seq[i] + seq[i + 1]) / 2
    var radius = Math.abs(seq[i] - seq[i + 1]) / 2
    var dir = Math.sign(seq[i + 1] - seq[i])
    data.push({ center: center, radius: radius, sign: sign, dir: dir })
    sign = -sign
  }

  // console.log(data)

  var g = d3.select(anchor).append('g')

  var x = d3
    .scaleLinear()
    .range([0, width])
    .domain([0, d3.max(seq)])

  var arc = d3
    .arc()
    .innerRadius(function (d) {
      return x(d.radius)
    })
    .outerRadius(function (d) {
      return x(d.radius)
    })
    .endAngle(function (d) {
      return (
        d.dir * d.sign * (Math.PI / 2) + ((d.sign - 1) * Math.PI) / 2
      )
    })
    .startAngle(function (d) {
      return (
        -d.dir * d.sign * (Math.PI / 2) + ((d.sign - 1) * Math.PI) / 2
      )
    })

  var DURATION = 30

  g.selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', '2')
    .attr('d', arc)
    .attr('transform', function (d) {
      return 'translate(' + x(d.center) + ',240)'
    })
    .attr('stroke-dasharray', function (d) {
      return this.getTotalLength() + ', ' + this.getTotalLength()
    })
    .attr('stroke-dashoffset', function (d) {
      return this.getTotalLength()
    })
    .transition()
    .delay(function (d, i) {
      return i * DURATION
    })
    .duration(DURATION * 2)
    .ease(d3.easeLinear)
    .attr('stroke-dashoffset', 0)
}

export const RecamanWithHook = (props) => {
  const refAnchor = useD3(anchor => recaman({ anchor, ...props }))

  return <g ref={refAnchor} transform={`translate(${props.x}, ${props.y})`} />
}

export const Recaman = D3blackbox(function (anchor, props, state) {
  recaman({ anchor: anchor.current, ...props })
})
