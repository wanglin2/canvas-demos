import{_ as M,o as E,a as R,c as b,p as H,b as S,d as r}from"./index-80173bf2.js";const W=""+new URL("../oven.jpeg",import.meta.url).href;const y=a=>(H("data-v-0b17a452"),a=a(),S(),a),L={class:"canvasBox"},k=y(()=>r("div",{id:"imgBox"},[r("img",{id:"img",src:W,alt:""}),r("div",{id:"area"})],-1)),z=y(()=>r("canvas",{id:"canvas"},null,-1)),C=[k,z],j={__name:"ImgMagnifier",setup(a){return E(()=>{const t=document.getElementById("canvas"),s=250,i=250,c=Math.max(window.devicePixelRatio,2);t.width=s*c,t.height=i*c,t.style.width=s+"px",t.style.height=i+"px";const g=t.getContext("2d");g.scale(c,c);const d=document.getElementById("imgBox"),h=d.getBoundingClientRect(),l=h.width,_=document.getElementById("img"),m=document.getElementById("area"),e=50;let p=!1;d.addEventListener("mouseover",()=>{p=!0,m.style.display="block"}),d.addEventListener("mousemove",u=>{if(!p)return;let o=u.clientX-e/2-h.left,n=u.clientY-e/2-h.top;o=Math.max(o,0),o=Math.min(o,l-e),n=Math.max(n,0),n=Math.min(n,l-e),m.style.left=o+"px",m.style.top=n+"px";const v=_.naturalWidth/l,x=_.naturalHeight/l,B=o*v,f=n*x,I=e*v,w=e*x;g.drawImage(_,B,f,I,w,0,0,s,i)}),d.addEventListener("mouseleave",()=>{p=!1,m.style.display="none",g.clearRect(0,0,s,i)})}),(t,s)=>(R(),b("div",L,C))}},V=M(j,[["__scopeId","data-v-0b17a452"]]);export{V as default};