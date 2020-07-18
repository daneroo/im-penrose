
//------ Configuration --------
NUM_SUBDIVISIONS = 3;
//-----------------------------


var goldenRatio = (1 + Math.sqrt(5)) / 2;

// P = A + (B - A) / goldenRatio;
function midpoint(A,B){
  var P = {
    x: A.x + (B.x-A.x) / goldenRatio,
    y: A.y + (B.y-A.y) / goldenRatio
  }
  return P;
}
function subdivide(triangles){
  var result = [];
  triangles.forEach(function(triangle){
    var color=triangle.color,A=triangle.A,B=triangle.B,C=triangle.C
    if (color===0){
      // # Subdivide red triangle
      // P = A + (B - A) / goldenRatio;
      var P = midpoint(A,B)
      result.push({color:0, A:C, B:P, C:B}, {color:1, A:P, B:C, C:A});
    } else {
      // # Subdivide blue triangle
      // Q = B + (A - B) / goldenRatio;
      var Q = midpoint(B,A);
      // R = B + (C - B) / goldenRatio;
      var R = midpoint(B,C);
      result.push({color:1, A:R, B:C, C:A}, {color:1, A:Q, B:R, C:B}, {color:0, A:R, B:Q, C:A});
    }
  });
  return result;
}

function toRect(r, phi){
  // Return the complex number x with polar coordinates r and phi. Equivalent to r * (math.cos(phi) + math.sin(phi)*1j).
  return {
    x: r*Math.cos(phi),
    y: r*Math.sin(phi)
  };
}


// # Create wheel of red triangles around the origin
var triangles = [];
for (var i=0;i<10;i++){
  var B = toRect(1, (2*i - 1) * Math.PI / 10);
  var C = toRect(1, (2*i + 1) * Math.PI / 10);
  if (i % 2 === 0){ //# Make sure to mirror every second triangle
    var t=B;
    B=C;
    C=t;
  }
  triangles.push({color:0,A:{x:0,y:0}, B:B, C:C});
}

function dump(msg,trs){
  console.log(msg,'triangle count',trs.length);
  trs.forEach(function(triangle){ console.log('  ',JSON.stringify(triangle))});
}

dump('iteration 0',triangles);
// # Perform subdivisions
for (var i=0;i<NUM_SUBDIVISIONS;i++){
  triangles = subdivide(triangles);
  dump('iteration '+(i+1),triangles);
}

// # Prepare cairo surface
// surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, IMAGE_SIZE[0], IMAGE_SIZE[1])
// cr = cairo.Context(surface)
// cr.translate(IMAGE_SIZE[0] / 2.0, IMAGE_SIZE[1] / 2.0)
// wheelRadius = 1.2 * math.sqrt((IMAGE_SIZE[0] / 2.0) ** 2 + (IMAGE_SIZE[1] / 2.0) ** 2)
// cr.scale(wheelRadius, wheelRadius)
// 
// # Draw red triangles
// for color, A, B, C in triangles:
//     if color == 0:
//         cr.move_to(A.real, A.imag)
//         cr.line_to(B.real, B.imag)
//         cr.line_to(C.real, C.imag)
//         cr.close_path()
// cr.set_source_rgb(1.0, 0.35, 0.35)
// cr.fill()    
// 
// # Draw blue triangles
// for color, A, B, C in triangles:
//     if color == 1:
//         cr.move_to(A.real, A.imag)
//         cr.line_to(B.real, B.imag)
//         cr.line_to(C.real, C.imag)
//         cr.close_path()
// cr.set_source_rgb(0.4, 0.4, 1.0)
// cr.fill()
// 
// # Determine line width from size of first triangle
// color, A, B, C = triangles[0]
// cr.set_line_width(abs(B - A) / 10.0)
// cr.set_line_join(cairo.LINE_JOIN_ROUND)
// 
// # Draw outlines
// for color, A, B, C in triangles:
//     cr.move_to(C.real, C.imag)
//     cr.line_to(A.real, A.imag)
//     cr.line_to(B.real, B.imag)
// cr.set_source_rgb(0.2, 0.2, 0.2)
// cr.stroke()
// 
// # Save to PNG
// surface.write_to_png('penrose.png')
