function z(){function o(o,r,y,x){var t,f,i,s,c,g,u,b=Array(l),d=[],p=h[o],v=h[y],m={x:(r+n[o])*h[o].x,y:(r+n[o])*h[o].y},w={x:(x+n[y])*h[y].x,y:(x+n[y])*h[y].y},i=-p.y/p.x,z=-i*m.y+m.x,W=-v.x/v.y,X=-W*w.x+w.y,Y=(W*z+X)/(1-W*i),A=i*Y+z,I={x:A,y:Y};for(s=0;l>s;s++)c=h[s],c.x||(g=c.y,c.y=c.x,c.x=g),i=-c.y/c.x,b[s]=e.floor((I.x-i*I.y)/(-i*c.y+c.x)-n[s]);for(t=r+1;t-->r-1;)for(f=x+1;f-->x-1;){for(b[o]=t,b[y]=f,u={x:0,y:0},s=l;s-->0;)u.x+=b[s]*h[s].x,u.y+=b[s]*h[s].y;d.push(u)}a.beginPath(),a.moveTo(d[0].x,d[0].y),[1,3,2].forEach(function(o){a.lineTo(d[o].x,d[o].y)}),a.globalAlpha=.6,a.fillStyle="#00"+e.floor(1+15*(y+o)/l).toString(16),a.fill()}a.restore(),X=b.clientWidth,Y=window.innerHeight-4,c.width=X,c.height=Y,a.translate(X/2,Y/2),a.scale(19,19);var r,y,x,t,f,i,n=[],e=Math,l=3+2*(W++%3),h=[];for(f=l;f-->0;)i=e.PI*(.5+2*f/l),h.push({x:-e.sin(i),y:e.cos(i)}),n.push(e.random());for(r=l;r-->0;)for(y=l;y-->0;)if(y-r)for(x=7;x-->-6;)for(t=7;t-->-6;)o(r,x,y,t)}b.style.margin=0,W=0,z(),setInterval(z,2e3);