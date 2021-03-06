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

function drawRhomb(rh,i0,i1){
  a.beginPath();     // path: 0,1,3,2
  a.moveTo(rh[0].x,rh[0].y);
  fff([1,3,2],function(j){
  	a.lineTo(rh[j].x,rh[j].y);
  })
  // stroke
  // a.globalAlpha=1;
  // Can be ommited...
  // a.strokeStyle='#39d';//#39D'//solarized.blue;
  // a.lineWidth=.02;
  // a.stroke();

  // fill
  a.globalAlpha=0.5;
  // a.fillStyle=pColor[(i0+i1)%eDim];
  // a.fillStyle=pColor[(i0)%eDim];
  a.fillStyle=pColor[(i0)%5];
  // a.fillStyle=(i0+i1)&1?'#fff':'#000';
  a.fill();
}

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
						drawPoint(p,'red',0.06,0.25);
					});
				});
			});
		});
	});
}
projectCube();
