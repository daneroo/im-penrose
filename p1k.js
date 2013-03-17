// var b = document.body;
// var c = document.getElementsByTagName('canvas')[0];
// var a = c.getContext('2d');
// setup
b.style.margin=0;
X=b.clientWidth,Y=window.innerHeight-4;
c.width=X;c.height=Y;
a.translate(X/2,Y/2);
a.scale(20,-20);

(function(){
  // function fff(z,f){z.forEach(f);}
  // var pColor=['#b58900','#D33682','#6C71C4','#2AA198','#859900','#CB4B16','#268BD2','#DC322F'],
  // var pColor=['#b80','#D38','#77C','#3AA','#8A0','#D51','#39D','#E33'],
  // since  I am %5'ing now
  var pColor=['#b80','#D38','#77C','#3AA','#8A0'],
  // eDeg=[],
  eDim = 5, e = [], // basis vectors
// rr=[],ii=[],
i0,i1,n0,n1,
g=[],i,M=Math,rad;
for (i=eDim;i-->0;) { // for (i=0;i<eDim;i++) {
  // var deg=90+i*(360/eDim),
  // rad=deg*M.PI/180;
  rad=M.PI*(.5+2*i/eDim);
  e.push({x:-M.sin(rad),y:M.cos(rad)})
  g.push(M.random());
}

// main loop
for (i0=eDim;i0-->0;)
  for (i1=eDim;i1-->0;)
    if (i1-i0)
      for (n0=9;n0-->-8;)
        for (n1=9;n1-->-8;)
          intersectAndRhomb(i0,n0, i1,n1);
//
function intersect(i0,n0,i1,n1){
    // intersect e0_n0 && e1_n1
    var e0 = e[i0],
    e1 = e[i1],
    n0g0e0 = {x:(n0+g[i0])*e[i0].x, y:(n0+g[i0])*e[i0].y},
    n1g1e1 = {x:(n1+g[i1])*e[i1].x, y:(n1+g[i1])*e[i1].y},
    A = -e0.y/e0.x,
    B = -A*n0g0e0.y + n0g0e0.x,
    C = -e1.x/e1.y,
    D = -C*n1g1e1.x + n1g1e1.y,
    y = ( C*B + D ) / (1-C*A),
    x = A*y + B;
    return {x:x,y:y};
  }

  function intersectAndRhomb(i0,n0,i1,n1){
    var n=Array(eDim),//[null,null,null,null,null];
    intr = intersect(i0,n0,i1,n1),
    ni0,ni1,
    rh=[],A,i,ei,s,p;
    for (i=0;i<eDim;i++){
      ei=e[i];
      if (!ei.x){ s=ei.y;ei.y=ei.x;ei.x=s}
      A= -ei.y/ei.x;
      n[i] = M.floor((intr.x-A*intr.y)/(-A*ei.y+ei.x)-g[i]);
    }

    for (ni0=n0+1;ni0-->n0-1;) {
      for (ni1=n1+1;ni1-->n1-1;) {
        // not sure: was working against a copy of nn ?!
        // var nn = n;//n.slice(0);
        n[i0]=ni0;
        n[i1]=ni1;
        p = { x:0, y:0 };
        for (i=eDim;i-->0;) {
          p.x+= n[i]*e[i].x;
          p.y+= n[i]*e[i].y;
        }
        rh.push(p);
      }
    }

  // drawRhomb(rh,i0,i1);
  a.beginPath();     // path: 0,1,3,2
  a.moveTo(rh[0].x,rh[0].y);
  [1,3,2].forEach(function(j){
    a.lineTo(rh[j].x,rh[j].y);
  })
  a.globalAlpha=0.5;
  a.fillStyle=pColor[(i0)%5];
  a.fill();
}


// function drawRhomb(rh,i0,i1){
//   a.beginPath();     // path: 0,1,3,2
//   a.moveTo(rh[0].x,rh[0].y);
//   fff([1,3,2],function(j){
//     a.lineTo(rh[j].x,rh[j].y);
//   })
//   // stroke
//   // a.globalAlpha=1;
//   // Can be ommited...
//   // a.strokeStyle='#39d';//#39D'//solarized.blue;
//   // a.lineWidth=.02;
//   // a.stroke();

//   // fill
//   a.globalAlpha=0.5;
//   // a.fillStyle=pColor[(i0+i1)%eDim];
//   // a.fillStyle=pColor[(i0)%eDim];
//   a.fillStyle=pColor[(i0)%5];
//   // a.fillStyle=(i0+i1)&1?'#fff':'#000';
//   a.fill();
// }

// function drawPoint(p,clr,thick,opa){
//   a.beginPath();
//   a.arc(p.x,p.y,thick||0.05,0,6.29,false);
//   a.fillStyle=clr||'gray';
//   a.globalAlpha = opa||1;
//   a.fill();
// }
// function projectCube(){
//   var cube=[-1,0,1];
//   cube.forEach(function(n0){
//     cube.forEach(function(n1){
//       cube.forEach(function(n2){
//         cube.forEach(function(n3){
//           cube.forEach(function(n4){
//             var n = [n0,n1,n2,n3,n4];
//             var p = { x:0, y:0 };
//             for (var i=0;i<eDim;i++) {
//               p.x+= n[i]*e[i].x;
//               p.y+= n[i]*e[i].y;
//             }
//             drawPoint(p,'red',0.06,0.25);
//           });
//         });
//       });
//     });
//   });
// }
// projectCube();

}());

