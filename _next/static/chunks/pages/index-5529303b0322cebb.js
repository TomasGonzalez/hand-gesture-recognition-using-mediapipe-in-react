(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(5075)}])},2943:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return p}});var r=e(7568),a=e(828),i=e(9815),u=e(655),c=e(7294),o=e(7135),s=e(5423),f=e(7523),l=e(9743),h={keypointClassifierLabels:["Open","Closed","Pointing"]},p=function(){var n=(0,c.useRef)(null),t=(0,c.useRef)(null),e=(0,c.useRef)(null),p=(0,c.useRef)(null),d=(0,c.useRef)([]),m=(0,l.default)().processLandmark;function y(n){return v.apply(this,arguments)}function v(){return(v=(0,r.Z)(function(n){var t,e,r,c,o,l,y;return(0,u.__generator)(this,function(u){if(p.current){if(n.multiHandLandmarks.length,(t=p.current.getContext("2d")).save(),t.clearRect(0,0,p.current.width,p.current.height),t.drawImage(n.image,0,0,960,540),n.multiHandLandmarks){e=!0,r=!1,c=void 0;try{for(o=function(){var e,r,u,c,o,l,p,v,g,x,_,w,Z=(0,a.Z)(y.value,2),C=Z[0],M=Z[1];m(M,n.image).then(function(n){return d.current[C]=n}),console.log("gesture");var k=M.map(function(n){return n.x}),E=M.map(function(n){return n.y});t.fillStyle="#ff0000",t.font="24px serif",t.fillText(h.keypointClassifierLabels[d.current[C]],960*(e=Math).min.apply(e,(0,i.Z)(k)),540*(r=Math).min.apply(r,(0,i.Z)(E))-15),(0,s.drawRectangle)(t,{xCenter:(u=Math).min.apply(u,(0,i.Z)(k))+((c=Math).max.apply(c,(0,i.Z)(k))-(o=Math).min.apply(o,(0,i.Z)(k)))/2,yCenter:(l=Math).min.apply(l,(0,i.Z)(E))+((p=Math).max.apply(p,(0,i.Z)(E))-(v=Math).min.apply(v,(0,i.Z)(E)))/2,width:(g=Math).max.apply(g,(0,i.Z)(k))-(x=Math).min.apply(x,(0,i.Z)(k)),height:(_=Math).max.apply(_,(0,i.Z)(E))-(w=Math).min.apply(w,(0,i.Z)(E)),rotation:0,rectId:13},{fillColor:"transparent",color:"#ff0000",lineWidth:1}),(0,s.drawConnectors)(t,M,f.HAND_CONNECTIONS,{color:"#00ffff",lineWidth:2}),(0,s.drawLandmarks)(t,M,{color:"#ffff29",lineWidth:1})},l=n.multiHandLandmarks.entries()[Symbol.iterator]();!(e=(y=l.next()).done);e=!0)o()}catch(v){r=!0,c=v}finally{try{e||null==l.return||l.return()}finally{if(r)throw c}}}t.restore()}return[2]})})).apply(this,arguments)}var g=function(){t.current=new f.Hands({locateFile:function(n){return"https://cdn.jsdelivr.net/npm/@mediapipe/hands/".concat(n)}}),t.current.setOptions({maxNumHands:2,modelComplexity:1,minDetectionConfidence:.5,minTrackingConfidence:.5}),t.current.onResults(y)};return(0,c.useEffect)(function(){function a(){return(a=(0,r.Z)(function(){return(0,u.__generator)(this,function(a){return e.current=new o.Camera(n.current,{onFrame:(0,r.Z)(function(){return(0,u.__generator)(this,function(e){switch(e.label){case 0:return[4,t.current.send({image:n.current})];case 1:return e.sent(),[2]}})}),width:960,height:540}),e.current.start(),[2]})})).apply(this,arguments)}(function(){a.apply(this,arguments)})(),g()},[]),{maxVideoHeight:540,maxVideoWidth:960,canvasEl:p,videoElement:n}}},9743:function(n,t,e){"use strict";e.r(t);var r=e(7568),a=e(9815),i=e(655),u=e(7294),c=e(8947),o=e(6486),s=e.n(o),f=function(n,t){var e=n.width,r=n.height,a=[];return Object.values(t).forEach(function(n){var t=Math.min(n.x*e,e-1),i=Math.min(n.y*r,r-1);a.push([t,i])}),a},l=function(n){var t,e=s().cloneDeep(n),r=0,i=0;Object.values(e).forEach(function(n,t){t||(r=parseInt(n[0]),i=parseInt(n[1])),e[t][0]=e[t][0]-r,e[t][1]=e[t][1]-i}),e=s().flatten(e);var u=(t=Math).max.apply(t,(0,a.Z)(e.map(function(n){return Math.abs(n)})));return e=e.map(function(n){return n/u})};t.default=function(){var n,t,e,a=(0,u.useRef)(),o=(n=(0,r.Z)(function(n){var t;return(0,i.__generator)(this,function(t){switch(t.label){case 0:return[4,a.current.execute(c.odF([n])).squeeze().argMax().data()];case 1:return[2,t.sent()]}})}),function(t){return n.apply(this,arguments)}),s=(t=(0,r.Z)(function(n,t){var e,r,a;return(0,i.__generator)(this,function(a){switch(a.label){case 0:return e=f(t,n),r=l(e),[4,o(r)];case 1:return[2,a.sent()[0]]}})}),function(n,e){return t.apply(this,arguments)}),h=(e=(0,r.Z)(function(){return(0,i.__generator)(this,function(n){switch(n.label){case 0:return[4,c.YLj("/tf-models/key-point-classifier/model.json")];case 1:return a.current=n.sent(),[2]}})}),function(){return e.apply(this,arguments)});return(0,u.useEffect)(function(){h()},[]),{processLandmark:s}}},7481:function(n,t,e){"use strict";e.r(t);var r=e(5893);e(7294);var a=e(2943);t.default=function(){var n=(0,a.default)(),t=n.videoElement,e=n.maxVideoWidth,i=n.maxVideoHeight,u=n.canvasEl;return(0,r.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,r.jsx)("video",{style:{display:"none"},className:"video",playsInline:!0,ref:t}),(0,r.jsx)("canvas",{ref:u,width:e,height:i})]})}},5075:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return i}});var r=e(5893);e(7294);var a=e(7481);function i(){return(0,r.jsx)(a.default,{})}},5410:function(){},8628:function(){},1601:function(){},7792:function(){},4977:function(){},5042:function(){}},function(n){n.O(0,[662,864,723,132,974,904,394,554,774,888,179],function(){return n(n.s=8312)}),_N_E=n.O()}]);