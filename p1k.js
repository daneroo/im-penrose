// var b = document.body;
// var c = document.getElementsByTagName('canvas')[0];
// var a = c.getContext('2d');

b.style.margin=0;
// a.save();
// W=0;
function z(){
  a.restore();
  X=b.clientWidth,Y=window.innerHeight-4;
  c.width=X;c.height=Y; // setting width, clears a.clearRect(-X,-Y,2*X,2*Y)
  a.translate(X/2,Y/2);
  a.scale(44,44);
  
  // var eDim = 5,
  var i0,i1,n0,n1,
  // pColor=['#b80','#D38','#77C','#3AA','#8A0'],
  g=[],i,M=Math,rad,
  // eDim = [3,5,7][M.random()*3 | 0],
  // eDim = (+new Date/3 &2) +5, // 5,7
  eDim = 3+2*(Math.random()*3|0),
  // eDim = 3+2*(W++%3),
  e = []; // basis vectors
  
  for (i=eDim;i-->0;) { 
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
          intersectAndRhomb(i0,n0,i1,n1);
//

  function intersectAndRhomb(i0,n0,i1,n1){
    var n=Array(eDim),//[null,null,null,null,null];
    ni0,ni1,
    // intr = intersect(i0,n0,i1,n1),
    rh=[],A,i,ei,s,p,
    e0 = e[i0],
    e1 = e[i1],
    n0g0e0 = {x:(n0+g[i0])*e[i0].x, y:(n0+g[i0])*e[i0].y},
    n1g1e1 = {x:(n1+g[i1])*e[i1].x, y:(n1+g[i1])*e[i1].y},
    A = -e0.y/e0.x,
    B = -A*n0g0e0.y + n0g0e0.x,
    C = -e1.x/e1.y,
    D = -C*n1g1e1.x + n1g1e1.y,
    y = ( C*B + D ) / (1-C*A),
    x = A*y + B,
    intr = {x:x,y:y};


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
  a.globalAlpha=0.6;
  // a.fillStyle=pColor[(i0)%5];
  a.fillStyle='#00'+M.floor(1+15*(i0+i1)/eDim).toString(16);
  a.fill();
}



}
z(); setInterval(z,2000);

