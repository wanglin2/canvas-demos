import{_ as n,o as _,a as d,c as r,p as i,b as p,d as l}from"./index-80173bf2.js";const h=s=>(i("data-v-a26eb571"),s=s(),p(),s),m={class:"canvasBox"},v=h(()=>l("canvas",{id:"canvas"},null,-1)),f=[v],x={__name:"Transform",setup(s){return _(()=>{const t=document.getElementById("canvas"),o=500,c=500,a=Math.max(window.devicePixelRatio,2);t.width=o*a,t.height=c*a,t.style.width=o+"px",t.style.height=c+"px";const e=t.getContext("2d");e.scale(a,a),e.transform(1,0,0,1,50,100),e.fillRect(0,0,50,50),e.resetTransform(),e.transform(2,0,0,3,0,0),e.fillRect(0,0,50,50)}),(t,o)=>(d(),r("div",m,f))}},g=n(x,[["__scopeId","data-v-a26eb571"]]);export{g as default};
