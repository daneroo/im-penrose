b.style.margin=0,X=b.clientWidth,Y=window.innerHeight-4,c.width=X,c.height=Y,a.translate(X/2,Y/2),a.scale(30,-30),function(){function n(n,o){n.forEach(o)}function o(o,i){a.beginPath(),a.moveTo(o[0].x,o[0].y),n([1,3,2],function(n){a.lineTo(o[n].x,o[n].y)}),a.globalAlpha=.5,a.fillStyle=f[i%5],a.fill()}function i(n,o,i,t){var a=u[n],y=u[i],f={x:(o+c[n])*u[n].x,y:(o+c[n])*u[n].y},x={x:(t+c[i])*u[i].x,y:(t+c[i])*u[i].y},r=-a.y/a.x,h=-r*f.y+f.x,l=-y.x/y.y,e=-l*x.x+x.y,s=(l*h+e)/(1-l*r),p=r*s+h;return{x:p,y:s}}function t(t,a,y,f){var x,h,l,s,p,b=Array(r),g=i(t,a,y,f),v=[],A=[a-1,a],d=[f-1,f];for(h=0;r>h;h++)l=u[h],l.x||(s=l.y,l.y=l.x,l.x=s),x=-l.y/l.x,b[h]=e.floor((g.x-x*g.y)/(-x*l.y+l.x)-c[h]);n(A,function(o){n(d,function(n){for(b[t]=o,b[y]=n,p={x:0,y:0},h=0;r>h;h++)p.x+=b[h]*u[h].x,p.y+=b[h]*u[h].y;v.push(p)})}),o(v,t,y)}var y,f=["#b80","#D38","#77C","#3AA","#8A0","#D51","#39D","#E33"],x=[],r=5,u=[],c=[],h=[],l=[],e=Math;for(y=0;r>y;y++){var s=90+y*(360/r),p=s*e.PI/180;x.push(s),u.push({x:-e.sin(p),y:e.cos(p)}),c.push(e.random())}for(y=-5;5>=y;y++)h.push(y);for(y=0;r>y;y++)l.push(y);n(l,function(o){n(l,function(i){i!==o&&n(h,function(a){n(h,function(n){t(o,a,i,n)})})})})}();