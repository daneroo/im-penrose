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
   for (var i=0;i<eDim;i++) {
    // g.push(0.5);
    g.push(Math.random());
    deg=90+i*(360/eDim);
    // deg=[90+11,90+120-11,90+240+11][i];
    rad=toRad(deg)
    eDeg.push(deg);
    e.push({x:-Math.sin(rad),y:Math.cos(rad)})
    // norm(e[i]);
  }

  // eliminate theese
  function toRad(deg){return deg*Math.PI/180;}
  function toDeg(rad){return rad*180/Math.PI;}
  function drawPoint(p,clr,thick,opa){
    a.beginPath();
    a.arc(p.x,p.y,thick||0.05,0,6.29,false);
    a.fillStyle=clr||'gray';
    a.globalAlpha = opa||1;
    a.fill();
  }

  function projectCube(){
    var cube=[-1,0,1];
    cube.forEach(function(n0){
      cube.forEach(function(n1){
        cube.forEach(function(n2){
          cube.forEach(function(n3){
            cube.forEach(function(n4){
              var n = [n0,n1,n2,n3,n4];
              var p = { x:0, y:0 };
              for (var i=0;i<eDim;i++) {
                p.x+= n[i]*e[i].x;
                p.y+= n[i]*e[i].y;
              }
              drawPoint(p,'green',0.06,0.25);
            });
          });
        });
      });
    });
  }

  
  a.moveTo(0,0);
  a.lineWidth=0.01;
  a.lineTo(10,10);
  a.stroke();

  projectCube();