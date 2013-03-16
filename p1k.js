// var b = document.body;
// var c = document.getElementsByTagName('canvas')[0];
// var a = c.getContext('2d');
// setup
b.style.margin=0;
X=b.clientWidth,Y=window.innerHeight-4;
c.width=X;c.height=Y;
a.translate(X/2,Y/2);
a.scale(50,-50)

  var eDeg = [];  // angles for basis vectors
  var eDim=5;
  var e = []; // basis vectors
   // translation gamma_i
   // var g=[0.3273951115552336, 0.6228435167577118, 0.5536088130902499, 0.12421905994415283, 0.6411375142633915];
   // var g=[0.5,0.5,0.5,0.5,0.5];
   var g=[];
   for (i=0;i<eDim;i++) {
    g.push(Math.random());
    deg=90+i*(360/eDim);
    rad=toRad(deg)
    eDeg.push(deg);
    e.push({x:-Math.sin(rad),y:Math.cos(rad)})
    // norm(e[i]);
  }

  // eliminate these
  function toRad(deg){return deg*Math.PI/180;}
  // function toDeg(rad){return rad*180/Math.PI;}

  function drawSegment(p1,p2,clr,thick,opa){
    a.beginPath();
    a.moveTo(p1.x,p1.y);
    a.lineTo(p2.x,p2.y);
    a.strokeStyle=clr||'gray';
    a.lineWidth=thick||0.05
    a.globalAlpha = opa||1;
    a.stroke();
    // console.log('segment',p1,p2);
  }

  function drawRhomb(rh,i0,i1){
    var angle = ((eDeg[i0]-eDeg[i1])+360)%360;
    // console.log('angle',angle,i0,i1); // 360/eDim*[1,2,..,eDim-1]
    var thick=0.02;

    // var colorSegs=true;
    // if (colorSegs){
    //   var c0=pColor[i0];
    //   var c1=pColor[i1];
    //   drawSegment(rh[0],rh[1],c1,thick);
    //   drawSegment(rh[2],rh[3],c1,thick);
    //   drawSegment(rh[0],rh[2],c0,thick);
    //   drawSegment(rh[1],rh[3],c0,thick);
    // }
    // actual rhomb
    var opa=0.1;
    // var fill=(angle===72||angle===288)?solarized.blue:'none';
    var fill= pColor[(i0+0*i1)%eDim];
    // var fill='none';
    // var fill= [solarized.blue,'none'][(i0+i1)%2];
    // var fill= (i0<0)?solarized.blue:'none';
    // console.log('fill',angle,fill); // 360/eDim*[1,2,..,eDim-1]
    var stroke=solarized.blue;//fill;//'none';
    thick=0.04;

    // note the order
    a.beginPath();
    a.moveTo(rh[0].x,rh[0].y);
    a.lineTo(rh[1].x,rh[1].y);
    a.lineTo(rh[3].x,rh[3].y);
    a.lineTo(rh[2].x,rh[2].y);
    a.strokeStyle=stroke||'gray';
    a.fillStyle=fill||'gray';
    a.lineWidth=thick||0.05
    a.globalAlpha = opa||0.01;
    a.stroke();
    a.fill();
  }
  function intersect(i0,n0,i1,n1){
    // console.log('intersect',i0,i1);

    // intersect e0_n0 && e1_n1
    var e0 = e[i0];
    var e1 = e[i1];
    var n0g0e0 = {x:(n0+g[i0])*e[i0].x, y:(n0+g[i0])*e[i0].y};
    var n1g1e1 = {x:(n1+g[i1])*e[i1].x, y:(n1+g[i1])*e[i1].y};
    // e0.y * (y-n0g0e0.y) =  -e0.x * (x-n0g0e0.x)
    // isolate x - requires e0.x!=0
    // e0.y * (y-n0g0e0.y) =  -e0.x * (x-n0g0e0.x)
    // -e0.y/e0.x * (y-n0g0e0.y) =   x-n0g0e0.x
    // (-e0.y/e0.x * (y-n0g0e0.y))+n0g0e0.x = x
    // x = (-e0.y/e0.x * (y-n0g0e0.y))+n0g0e0.x

    // e1.y * (y-n1g1e1.y) =  -e1.x * (x-n1g1e1.x)
    // isolate y  - requires e1.y!=0
    // y - n1g1e1.y =  -e1.x/e1.y * (x-n1g1e1.x)
    // y =  -e1.x/e1.y * (x-n1g1e1.x) + n1g1e1.y

    // Simplify:
    // x = (-e0.y/e0.x*(y-n0g0e0.y)) + g0e0.x
    // x = (A*(y-n0g0e0.y)) + n0g0e0.x   with A = -e0.y/e0.x
    // x = (A*y-A*n0g0e0.y) + n0g0e0.x
    // x = A*y - A*n0g0e0.y + n0g0e0.x
    // x = A*y + B   with B = -A*n0g0e0.y + n0g0e0.x

    // y = -e1.x/e1.y * (x-n1g1e1.x) + n1g1e1.y
    // y = C * (x-n1g1e1.x) + n1g1e1.y   with C = -e1.x/e1.y
    // y = C*x - C*n1g1e1.x + n1g1e1.y
    // y = C*x + D   with D = -C*n1g1e1.x + n1g1e1.y

    // Intersection:
    // x = A*y + B
    // y = C*x + D
    // y = C*(A*y + B) + D  <-- substitute x
    // y = C*A*y + C*B + D
    // y * (1-C*A) = C*B + D
    // y  = ( C*B + D ) / (1-C*A)

    var A = -e0.y/e0.x;
    var B = -A*n0g0e0.y + n0g0e0.x;
    var C = -e1.x/e1.y;
    var D = -C*n1g1e1.x + n1g1e1.y;
    // console.log('ABCD',A,B,C,D);
    var y = ( C*B + D ) / (1-C*A);
    // console.log('y',y);    
    var x = A*y + B
    // console.log('x',x);
    
    // return intersection point
    return {x:x,y:y};
  }

  // from solarized accents: http://ethanschoonover.com/solarized
  var solarized = {
    yellow:'#b58900',
    orange:'#CB4B16',
    red:'#DC322F',
    magenta:'#D33682',
    violet:'#6C71C4',
    blue:'#268BD2',
    cyan:'#2AA198',
    green:'#859900'
  }; 
  var pColor=[solarized.yellow,solarized.magenta,solarized.violet,solarized.cyan,solarized.green,solarized.orange,solarized.blue,solarized.red];
  var range=[]; for (var i=-50;i<=50;i++)range.push(i);

  function intersectAndRhomb(i0,n0,i1,n1){
    var intr = intersect(i0,n0,i1,n1);
      // drawPoint(intr,'red',0.05,0.5);


      var n=Array(eDim);//[null,null,null,null,null];
      for (var i=0;i<eDim;i++){
        // x = A*y + B   with A = -e0.y/e0.x, B = -A*n0g0e0.y + n0g0e0.x, e0.x!=0        
        // x-A*y = B = (n0+g0) * (-Ae0.y+e0.x)
        // n0 = (x-A*y)/(-Ae0.y+e0.x) - g0 with A = -e0.y/e0.x, e0.x!=0        
        if (e[i].x!==0){
          var A= -e[i].y/e[i].x;
          n[i] = (intr.x-A*intr.y)/(-A*e[i].y+e[i].x) -g[i];
          // console.log('x-> n['+i+']=',Math.floor(n[i]),n[i]);
        }

        // y = C*x + D   with C = -e1.x/e1.y, D = -C*n1g1e1.x + n1g1e1.y, e0.y!=0
        //    D = -C*(n1+g1)*e1.x + (n1+g1)*e1.y = (n1+g1) * (-C*e1.x+e1.y)
        // y-Cx = D = (n1+g1) * (-C*e1.x + e1.y)
        // n1 = (y-Cx)/(-C*e1.x + e1.y) -g1 with C = -e1.x/e1.y, e0.y!=0
        if (e[i].y!==0){
          var C = -e[i].x/e[i].y;
          n[i] = (intr.y-C*intr.x)/(-C*e[i].x+e[i].y) -g[i];
          // console.log('y-> n['+i+']=',Math.floor(n[i]),n[i]);
        }
        n[i] = Math.floor(n[i]);
      }
      
      n0s=[n0-1,n0];
      n1s=[n1-1,n1];
      var rh=[];
      n0s.forEach(function(ni0){
        n1s.forEach(function(ni1){
          var nn = n.slice(0);
          nn[i0]=ni0;
          nn[i1]=ni1;
          var p = { x:0, y:0 };
          for (var i=0;i<eDim;i++) {
            p.x+= nn[i]*e[i].x;
            p.y+= nn[i]*e[i].y;
          }
          rh.push(p);
          // drawPoint(p,'blue',0.1,0.1);
        });
      });
      drawRhomb(rh,i0,i1);
    }
    // select axis and replica
    // var i0=2,i1=3; // if e0.x==0 -> swap
    // n0, and n1 select the nth reoplica line in e0,e1 translations
    // var n0=-1, n1=0;
    // intersectAndRhomb(i0,n0, i1,n1)
    // var rr = [-2,-1,0,1,2];
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
  
  a.moveTo(0,0);
  a.lineWidth=0.01;
  a.lineTo(10,10);
  a.stroke();

