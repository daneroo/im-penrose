// var b = document.body;
// var c = document.getElementsByTagName('canvas')[0];
// var a = c.getContext('2d');
// setup
b.style.margin=0;
X=b.clientWidth,Y=window.innerHeight-4;
c.width=X;c.height=Y;
a.translate(X/2,Y/2);
a.scale(30,-30)

// from solarized accents: http://ethanschoonover.com/solarized
// var solarized = {
//   yellow:'#b58900',
//   orange:'#CB4B16',
//   red:'#DC322F',
//   magenta:'#D33682',
//   violet:'#6C71C4',
//   blue:'#268BD2',
//   cyan:'#2AA198',
//   green:'#859900'
// }; 
// var pColor=[solarized.yellow,solarized.magenta,solarized.violet,solarized.cyan,solarized.green,solarized.orange,solarized.blue,solarized.red];
var pColor=['#b58900','#D33682','#6C71C4','#2AA198','#859900','#CB4B16','#268BD2','#DC322F'],
eDeg=[], eDim = 5, e = [], // basis vectors
g=[];
for (i=0;i<eDim;i++) {
  g.push(Math.random());
  deg=90+i*(360/eDim);
  rad=deg*Math.PI/180;
  eDeg.push(deg);
  e.push({x:-Math.sin(rad),y:Math.cos(rad)})
}

  // function drawSegment(p1,p2,clr,thick,opa){
  //   a.beginPath();
  //   a.moveTo(p1.x,p1.y);
  //   a.lineTo(p2.x,p2.y);
  //   a.strokeStyle=clr||'gray';
  //   a.lineWidth=thick||0.05
  //   a.globalAlpha = opa||1;
  //   a.stroke();
  //   // console.log('segment',p1,p2);
  // }

  function drawRhomb(rh,i0,i1){
    // var angle = ((eDeg[i0]-eDeg[i1])+360)%360;
    // console.log('angle',angle,i0,i1); // 360/eDim*[1,2,..,eDim-1]
    // var colorSegs=true;
    // if (colorSegs){
    //   var c0=pColor[i0];
    //   var c1=pColor[i1];
    //   drawSegment(rh[0],rh[1],c1,.02);
    //   drawSegment(rh[2],rh[3],c1,.02);
    //   drawSegment(rh[0],rh[2],c0,.02);
    //   drawSegment(rh[1],rh[3],c0,.02);
    // }

    // actual rhomb
    // var fill=(angle===72||angle===288)?solarized.blue:'none';
    // note the order
    a.beginPath();
    a.moveTo(rh[0].x,rh[0].y);
    a.lineTo(rh[1].x,rh[1].y);
    a.lineTo(rh[3].x,rh[3].y);
    a.lineTo(rh[2].x,rh[2].y);

    a.globalAlpha=.3;

    a.fillStyle=pColor[(i0+0*i1)%eDim];
    a.fill();

    a.strokeStyle='#268BD2'//solarized.blue;
    a.lineWidth=.02;
    // a.globalAlpha=.5;
    a.stroke();

  }
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
    rh=[],A,C,i,p;
    for (i=0;i<eDim;i++){
      if (e[i].x!==0){
        A= -e[i].y/e[i].x;
        n[i] = (intr.x-A*intr.y)/(-A*e[i].y+e[i].x) -g[i];
      }
      if (e[i].y!==0){
        C = -e[i].x/e[i].y;
        n[i] = (intr.y-C*intr.x)/(-C*e[i].x+e[i].y) -g[i];
      }
      n[i] = Math.floor(n[i]);
    }

    n0s=[n0-1,n0];
    n1s=[n1-1,n1];
    n0s.forEach(function(ni0){
      n1s.forEach(function(ni1){
        var nn = n.slice(0);
        nn[i0]=ni0;
        nn[i1]=ni1;
        p = { x:0, y:0 };
        for (i=0;i<eDim;i++) {
          p.x+= nn[i]*e[i].x;
          p.y+= nn[i]*e[i].y;
        }
        rh.push(p);
      });
    });
    drawRhomb(rh,i0,i1);
  }
  var rr=[]; for (var i=-5;i<=5;i++)rr.push(i);
  var ii=[]; for (var i=0;i<eDim;i++)ii.push(i);
  ii.forEach(function(i0){
    ii.forEach(function(i1){
      if (i1!==i0){
        rr.forEach(function(n0){
          rr.forEach(function(n1){
              // if (Math.abs(n0)+Math.abs(n1)<5){}
              intersectAndRhomb(i0,n0, i1,n1);
            });
        });
      } 
    });
  });

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

