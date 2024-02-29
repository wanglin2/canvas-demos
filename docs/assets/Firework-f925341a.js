import{_ as U,o as V,a as $,c as j,p as W,b as X,d as O}from"./index-80173bf2.js";const Z={linear:function(t,r,e,i){return e*t/i+r},easeInQuad:function(t,r,e,i){return e*(t/=i)*t+r},easeOutQuad:function(t,r,e,i){return-e*(t/=i)*(t-2)+r},easeInOutQuad:function(t,r,e,i){return(t/=i/2)<1?e/2*t*t+r:-e/2*(--t*(t-2)-1)+r},easeInCubic:function(t,r,e,i){return e*(t/=i)*t*t+r},easeOutCubic:function(t,r,e,i){return e*((t=t/i-1)*t*t+1)+r},easeInOutCubic:function(t,r,e,i){return(t/=i/2)<1?e/2*t*t*t+r:e/2*((t-=2)*t*t+2)+r},easeInQuart:function(t,r,e,i){return e*(t/=i)*t*t*t+r},easeOutQuart:function(t,r,e,i){return-e*((t=t/i-1)*t*t*t-1)+r},easeInOutQuart:function(t,r,e,i){return(t/=i/2)<1?e/2*t*t*t*t+r:-e/2*((t-=2)*t*t*t-2)+r},easeInQuint:function(t,r,e,i){return e*(t/=i)*t*t*t*t+r},easeOutQuint:function(t,r,e,i){return e*((t=t/i-1)*t*t*t*t+1)+r},easeInOutQuint:function(t,r,e,i){return(t/=i/2)<1?e/2*t*t*t*t*t+r:e/2*((t-=2)*t*t*t*t+2)+r},easeInSine:function(t,r,e,i){return-e*Math.cos(t/i*(Math.PI/2))+e+r},easeOutSine:function(t,r,e,i){return e*Math.sin(t/i*(Math.PI/2))+r},easeInOutSine:function(t,r,e,i){return-e/2*(Math.cos(Math.PI*t/i)-1)+r},easeInExpo:function(t,r,e,i){return t==0?r:e*Math.pow(2,10*(t/i-1))+r},easeOutExpo:function(t,r,e,i){return t==i?r+e:e*(-Math.pow(2,-10*t/i)+1)+r},easeInOutExpo:function(t,r,e,i){return t==0?r:t==i?r+e:(t/=i/2)<1?e/2*Math.pow(2,10*(t-1))+r:e/2*(-Math.pow(2,-10*--t)+2)+r},easeInCirc:function(t,r,e,i){return-e*(Math.sqrt(1-(t/=i)*t)-1)+r},easeOutCirc:function(t,r,e,i){return e*Math.sqrt(1-(t=t/i-1)*t)+r},easeInOutCirc:function(t,r,e,i){return(t/=i/2)<1?-e/2*(Math.sqrt(1-t*t)-1)+r:e/2*(Math.sqrt(1-(t-=2)*t)+1)+r},easeInElastic:function(t,r,e,i){var h=1.70158,a=0,n=e;if(t==0)return r;if((t/=i)==1)return r+e;if(a||(a=i*.3),n<Math.abs(e)){n=e;var h=a/4}else var h=a/(2*Math.PI)*Math.asin(e/n);return-(n*Math.pow(2,10*(t-=1))*Math.sin((t*i-h)*(2*Math.PI)/a))+r},easeOutElastic:function(t,r,e,i){var h=1.70158,a=0,n=e;if(t==0)return r;if((t/=i)==1)return r+e;if(a||(a=i*.3),n<Math.abs(e)){n=e;var h=a/4}else var h=a/(2*Math.PI)*Math.asin(e/n);return n*Math.pow(2,-10*t)*Math.sin((t*i-h)*(2*Math.PI)/a)+e+r},easeInOutElastic:function(t,r,e,i){var h=1.70158,a=0,n=e;if(t==0)return r;if((t/=i/2)==2)return r+e;if(a||(a=i*(.3*1.5)),n<Math.abs(e)){n=e;var h=a/4}else var h=a/(2*Math.PI)*Math.asin(e/n);return t<1?-.5*(n*Math.pow(2,10*(t-=1))*Math.sin((t*i-h)*(2*Math.PI)/a))+r:n*Math.pow(2,-10*(t-=1))*Math.sin((t*i-h)*(2*Math.PI)/a)*.5+e+r},easeInBack:function(t,r,e,i,a){return a==null&&(a=1.70158),e*(t/=i)*t*((a+1)*t-a)+r},easeOutBack:function(t,r,e,i,a){return a==null&&(a=1.70158),e*((t=t/i-1)*t*((a+1)*t+a)+1)+r},easeInOutBack:function(t,r,e,i,a){return a==null&&(a=1.70158),(t/=i/2)<1?e/2*(t*t*(((a*=1.525)+1)*t-a))+r:e/2*((t-=2)*t*(((a*=1.525)+1)*t+a)+2)+r},easeOutBounce:function(t,r,e,i){return(t/=i)<1/2.75?e*(7.5625*t*t)+r:t<2/2.75?e*(7.5625*(t-=1.5/2.75)*t+.75)+r:t<2.5/2.75?e*(7.5625*(t-=2.25/2.75)*t+.9375)+r:e*(7.5625*(t-=2.625/2.75)*t+.984375)+r}};function k(t){"@babel/helpers - typeof";return k=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},k(t)}var J=/^\s+/,K=/\s+$/;function u(t,r){if(t=t||"",r=r||{},t instanceof u)return t;if(!(this instanceof u))return new u(t,r);var e=Y(t);this._originalInput=t,this._r=e.r,this._g=e.g,this._b=e.b,this._a=e.a,this._roundA=Math.round(100*this._a)/100,this._format=r.format||e.format,this._gradientType=r.gradientType,this._r<1&&(this._r=Math.round(this._r)),this._g<1&&(this._g=Math.round(this._g)),this._b<1&&(this._b=Math.round(this._b)),this._ok=e.ok}u.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var r=this.toRgb();return(r.r*299+r.g*587+r.b*114)/1e3},getLuminance:function(){var r=this.toRgb(),e,i,a,n,h,o;return e=r.r/255,i=r.g/255,a=r.b/255,e<=.03928?n=e/12.92:n=Math.pow((e+.055)/1.055,2.4),i<=.03928?h=i/12.92:h=Math.pow((i+.055)/1.055,2.4),a<=.03928?o=a/12.92:o=Math.pow((a+.055)/1.055,2.4),.2126*n+.7152*h+.0722*o},setAlpha:function(r){return this._a=L(r),this._roundA=Math.round(100*this._a)/100,this},toHsv:function(){var r=F(this._r,this._g,this._b);return{h:r.h*360,s:r.s,v:r.v,a:this._a}},toHsvString:function(){var r=F(this._r,this._g,this._b),e=Math.round(r.h*360),i=Math.round(r.s*100),a=Math.round(r.v*100);return this._a==1?"hsv("+e+", "+i+"%, "+a+"%)":"hsva("+e+", "+i+"%, "+a+"%, "+this._roundA+")"},toHsl:function(){var r=E(this._r,this._g,this._b);return{h:r.h*360,s:r.s,l:r.l,a:this._a}},toHslString:function(){var r=E(this._r,this._g,this._b),e=Math.round(r.h*360),i=Math.round(r.s*100),a=Math.round(r.l*100);return this._a==1?"hsl("+e+", "+i+"%, "+a+"%)":"hsla("+e+", "+i+"%, "+a+"%, "+this._roundA+")"},toHex:function(r){return C(this._r,this._g,this._b,r)},toHexString:function(r){return"#"+this.toHex(r)},toHex8:function(r){return it(this._r,this._g,this._b,this._a,r)},toHex8String:function(r){return"#"+this.toHex8(r)},toRgb:function(){return{r:Math.round(this._r),g:Math.round(this._g),b:Math.round(this._b),a:this._a}},toRgbString:function(){return this._a==1?"rgb("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+")":"rgba("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:Math.round(l(this._r,255)*100)+"%",g:Math.round(l(this._g,255)*100)+"%",b:Math.round(l(this._b,255)*100)+"%",a:this._a}},toPercentageRgbString:function(){return this._a==1?"rgb("+Math.round(l(this._r,255)*100)+"%, "+Math.round(l(this._g,255)*100)+"%, "+Math.round(l(this._b,255)*100)+"%)":"rgba("+Math.round(l(this._r,255)*100)+"%, "+Math.round(l(this._g,255)*100)+"%, "+Math.round(l(this._b,255)*100)+"%, "+this._roundA+")"},toName:function(){return this._a===0?"transparent":this._a<1?!1:bt[C(this._r,this._g,this._b,!0)]||!1},toFilter:function(r){var e="#"+T(this._r,this._g,this._b,this._a),i=e,a=this._gradientType?"GradientType = 1, ":"";if(r){var n=u(r);i="#"+T(n._r,n._g,n._b,n._a)}return"progid:DXImageTransform.Microsoft.gradient("+a+"startColorstr="+e+",endColorstr="+i+")"},toString:function(r){var e=!!r;r=r||this._format;var i=!1,a=this._a<1&&this._a>=0,n=!e&&a&&(r==="hex"||r==="hex6"||r==="hex3"||r==="hex4"||r==="hex8"||r==="name");return n?r==="name"&&this._a===0?this.toName():this.toRgbString():(r==="rgb"&&(i=this.toRgbString()),r==="prgb"&&(i=this.toPercentageRgbString()),(r==="hex"||r==="hex6")&&(i=this.toHexString()),r==="hex3"&&(i=this.toHexString(!0)),r==="hex4"&&(i=this.toHex8String(!0)),r==="hex8"&&(i=this.toHex8String()),r==="name"&&(i=this.toName()),r==="hsl"&&(i=this.toHslString()),r==="hsv"&&(i=this.toHsvString()),i||this.toHexString())},clone:function(){return u(this.toString())},_applyModification:function(r,e){var i=r.apply(null,[this].concat([].slice.call(e)));return this._r=i._r,this._g=i._g,this._b=i._b,this.setAlpha(i._a),this},lighten:function(){return this._applyModification(ht,arguments)},brighten:function(){return this._applyModification(ut,arguments)},darken:function(){return this._applyModification(ot,arguments)},desaturate:function(){return this._applyModification(at,arguments)},saturate:function(){return this._applyModification(nt,arguments)},greyscale:function(){return this._applyModification(st,arguments)},spin:function(){return this._applyModification(ft,arguments)},_applyCombination:function(r,e){return r.apply(null,[this].concat([].slice.call(e)))},analogous:function(){return this._applyCombination(dt,arguments)},complement:function(){return this._applyCombination(ct,arguments)},monochromatic:function(){return this._applyCombination(gt,arguments)},splitcomplement:function(){return this._applyCombination(lt,arguments)},triad:function(){return this._applyCombination(B,[3])},tetrad:function(){return this._applyCombination(B,[4])}};u.fromRatio=function(t,r){if(k(t)=="object"){var e={};for(var i in t)t.hasOwnProperty(i)&&(i==="a"?e[i]=t[i]:e[i]=w(t[i]));t=e}return u(t,r)};function Y(t){var r={r:0,g:0,b:0},e=1,i=null,a=null,n=null,h=!1,o=!1;return typeof t=="string"&&(t=_t(t)),k(t)=="object"&&(y(t.r)&&y(t.g)&&y(t.b)?(r=tt(t.r,t.g,t.b),h=!0,o=String(t.r).substr(-1)==="%"?"prgb":"rgb"):y(t.h)&&y(t.s)&&y(t.v)?(i=w(t.s),a=w(t.v),r=rt(t.h,i,a),h=!0,o="hsv"):y(t.h)&&y(t.s)&&y(t.l)&&(i=w(t.s),n=w(t.l),r=et(t.h,i,n),h=!0,o="hsl"),t.hasOwnProperty("a")&&(e=t.a)),e=L(e),{ok:h,format:t.format||o,r:Math.min(255,Math.max(r.r,0)),g:Math.min(255,Math.max(r.g,0)),b:Math.min(255,Math.max(r.b,0)),a:e}}function tt(t,r,e){return{r:l(t,255)*255,g:l(r,255)*255,b:l(e,255)*255}}function E(t,r,e){t=l(t,255),r=l(r,255),e=l(e,255);var i=Math.max(t,r,e),a=Math.min(t,r,e),n,h,o=(i+a)/2;if(i==a)n=h=0;else{var c=i-a;switch(h=o>.5?c/(2-i-a):c/(i+a),i){case t:n=(r-e)/c+(r<e?6:0);break;case r:n=(e-t)/c+2;break;case e:n=(t-r)/c+4;break}n/=6}return{h:n,s:h,l:o}}function et(t,r,e){var i,a,n;t=l(t,360),r=l(r,100),e=l(e,100);function h(b,x,v){return v<0&&(v+=1),v>1&&(v-=1),v<1/6?b+(x-b)*6*v:v<1/2?x:v<2/3?b+(x-b)*(2/3-v)*6:b}if(r===0)i=a=n=e;else{var o=e<.5?e*(1+r):e+r-e*r,c=2*e-o;i=h(c,o,t+1/3),a=h(c,o,t),n=h(c,o,t-1/3)}return{r:i*255,g:a*255,b:n*255}}function F(t,r,e){t=l(t,255),r=l(r,255),e=l(e,255);var i=Math.max(t,r,e),a=Math.min(t,r,e),n,h,o=i,c=i-a;if(h=i===0?0:c/i,i==a)n=0;else{switch(i){case t:n=(r-e)/c+(r<e?6:0);break;case r:n=(e-t)/c+2;break;case e:n=(t-r)/c+4;break}n/=6}return{h:n,s:h,v:o}}function rt(t,r,e){t=l(t,360)*6,r=l(r,100),e=l(e,100);var i=Math.floor(t),a=t-i,n=e*(1-r),h=e*(1-a*r),o=e*(1-(1-a)*r),c=i%6,b=[e,h,n,n,o,e][c],x=[o,e,e,h,n,n][c],v=[n,n,o,e,e,h][c];return{r:b*255,g:x*255,b:v*255}}function C(t,r,e,i){var a=[_(Math.round(t).toString(16)),_(Math.round(r).toString(16)),_(Math.round(e).toString(16))];return i&&a[0].charAt(0)==a[0].charAt(1)&&a[1].charAt(0)==a[1].charAt(1)&&a[2].charAt(0)==a[2].charAt(1)?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0):a.join("")}function it(t,r,e,i,a){var n=[_(Math.round(t).toString(16)),_(Math.round(r).toString(16)),_(Math.round(e).toString(16)),_(D(i))];return a&&n[0].charAt(0)==n[0].charAt(1)&&n[1].charAt(0)==n[1].charAt(1)&&n[2].charAt(0)==n[2].charAt(1)&&n[3].charAt(0)==n[3].charAt(1)?n[0].charAt(0)+n[1].charAt(0)+n[2].charAt(0)+n[3].charAt(0):n.join("")}function T(t,r,e,i){var a=[_(D(i)),_(Math.round(t).toString(16)),_(Math.round(r).toString(16)),_(Math.round(e).toString(16))];return a.join("")}u.equals=function(t,r){return!t||!r?!1:u(t).toRgbString()==u(r).toRgbString()};u.random=function(){return u.fromRatio({r:Math.random(),g:Math.random(),b:Math.random()})};function at(t,r){r=r===0?0:r||10;var e=u(t).toHsl();return e.s-=r/100,e.s=A(e.s),u(e)}function nt(t,r){r=r===0?0:r||10;var e=u(t).toHsl();return e.s+=r/100,e.s=A(e.s),u(e)}function st(t){return u(t).desaturate(100)}function ht(t,r){r=r===0?0:r||10;var e=u(t).toHsl();return e.l+=r/100,e.l=A(e.l),u(e)}function ut(t,r){r=r===0?0:r||10;var e=u(t).toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(255*-(r/100)))),e.g=Math.max(0,Math.min(255,e.g-Math.round(255*-(r/100)))),e.b=Math.max(0,Math.min(255,e.b-Math.round(255*-(r/100)))),u(e)}function ot(t,r){r=r===0?0:r||10;var e=u(t).toHsl();return e.l-=r/100,e.l=A(e.l),u(e)}function ft(t,r){var e=u(t).toHsl(),i=(e.h+r)%360;return e.h=i<0?360+i:i,u(e)}function ct(t){var r=u(t).toHsl();return r.h=(r.h+180)%360,u(r)}function B(t,r){if(isNaN(r)||r<=0)throw new Error("Argument to polyad must be a positive number");for(var e=u(t).toHsl(),i=[u(t)],a=360/r,n=1;n<r;n++)i.push(u({h:(e.h+n*a)%360,s:e.s,l:e.l}));return i}function lt(t){var r=u(t).toHsl(),e=r.h;return[u(t),u({h:(e+72)%360,s:r.s,l:r.l}),u({h:(e+216)%360,s:r.s,l:r.l})]}function dt(t,r,e){r=r||6,e=e||30;var i=u(t).toHsl(),a=360/e,n=[u(t)];for(i.h=(i.h-(a*r>>1)+720)%360;--r;)i.h=(i.h+a)%360,n.push(u(i));return n}function gt(t,r){r=r||6;for(var e=u(t).toHsv(),i=e.h,a=e.s,n=e.v,h=[],o=1/r;r--;)h.push(u({h:i,s:a,v:n})),n=(n+o)%1;return h}u.mix=function(t,r,e){e=e===0?0:e||50;var i=u(t).toRgb(),a=u(r).toRgb(),n=e/100,h={r:(a.r-i.r)*n+i.r,g:(a.g-i.g)*n+i.g,b:(a.b-i.b)*n+i.b,a:(a.a-i.a)*n+i.a};return u(h)};u.readability=function(t,r){var e=u(t),i=u(r);return(Math.max(e.getLuminance(),i.getLuminance())+.05)/(Math.min(e.getLuminance(),i.getLuminance())+.05)};u.isReadable=function(t,r,e){var i=u.readability(t,r),a,n;switch(n=!1,a=yt(e),a.level+a.size){case"AAsmall":case"AAAlarge":n=i>=4.5;break;case"AAlarge":n=i>=3;break;case"AAAsmall":n=i>=7;break}return n};u.mostReadable=function(t,r,e){var i=null,a=0,n,h,o,c;e=e||{},h=e.includeFallbackColors,o=e.level,c=e.size;for(var b=0;b<r.length;b++)n=u.readability(t,r[b]),n>a&&(a=n,i=u(r[b]));return u.isReadable(t,i,{level:o,size:c})||!h?i:(e.includeFallbackColors=!1,u.mostReadable(t,["#fff","#000"],e))};var I=u.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},bt=u.hexNames=vt(I);function vt(t){var r={};for(var e in t)t.hasOwnProperty(e)&&(r[t[e]]=e);return r}function L(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function l(t,r){pt(t)&&(t="100%");var e=mt(t);return t=Math.min(r,Math.max(0,parseFloat(t))),e&&(t=parseInt(t*r,10)/100),Math.abs(t-r)<1e-6?1:t%r/parseFloat(r)}function A(t){return Math.min(1,Math.max(0,t))}function p(t){return parseInt(t,16)}function pt(t){return typeof t=="string"&&t.indexOf(".")!=-1&&parseFloat(t)===1}function mt(t){return typeof t=="string"&&t.indexOf("%")!=-1}function _(t){return t.length==1?"0"+t:""+t}function w(t){return t<=1&&(t=t*100+"%"),t}function D(t){return Math.round(parseFloat(t)*255).toString(16)}function P(t){return p(t)/255}var m=function(){var t="[-\\+]?\\d+%?",r="[-\\+]?\\d*\\.\\d+%?",e="(?:"+r+")|(?:"+t+")",i="[\\s|\\(]+("+e+")[,|\\s]+("+e+")[,|\\s]+("+e+")\\s*\\)?",a="[\\s|\\(]+("+e+")[,|\\s]+("+e+")[,|\\s]+("+e+")[,|\\s]+("+e+")\\s*\\)?";return{CSS_UNIT:new RegExp(e),rgb:new RegExp("rgb"+i),rgba:new RegExp("rgba"+a),hsl:new RegExp("hsl"+i),hsla:new RegExp("hsla"+a),hsv:new RegExp("hsv"+i),hsva:new RegExp("hsva"+a),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();function y(t){return!!m.CSS_UNIT.exec(t)}function _t(t){t=t.replace(J,"").replace(K,"").toLowerCase();var r=!1;if(I[t])t=I[t],r=!0;else if(t=="transparent")return{r:0,g:0,b:0,a:0,format:"name"};var e;return(e=m.rgb.exec(t))?{r:e[1],g:e[2],b:e[3]}:(e=m.rgba.exec(t))?{r:e[1],g:e[2],b:e[3],a:e[4]}:(e=m.hsl.exec(t))?{h:e[1],s:e[2],l:e[3]}:(e=m.hsla.exec(t))?{h:e[1],s:e[2],l:e[3],a:e[4]}:(e=m.hsv.exec(t))?{h:e[1],s:e[2],v:e[3]}:(e=m.hsva.exec(t))?{h:e[1],s:e[2],v:e[3],a:e[4]}:(e=m.hex8.exec(t))?{r:p(e[1]),g:p(e[2]),b:p(e[3]),a:P(e[4]),format:r?"name":"hex8"}:(e=m.hex6.exec(t))?{r:p(e[1]),g:p(e[2]),b:p(e[3]),format:r?"name":"hex"}:(e=m.hex4.exec(t))?{r:p(e[1]+""+e[1]),g:p(e[2]+""+e[2]),b:p(e[3]+""+e[3]),a:P(e[4]+""+e[4]),format:r?"name":"hex8"}:(e=m.hex3.exec(t))?{r:p(e[1]+""+e[1]),g:p(e[2]+""+e[2]),b:p(e[3]+""+e[3]),format:r?"name":"hex"}:!1}function yt(t){var r,e;return t=t||{level:"AA",size:"small"},r=(t.level||"AA").toUpperCase(),e=(t.size||"small").toLowerCase(),r!=="AA"&&r!=="AAA"&&(r="AA"),e!=="small"&&e!=="large"&&(e="small"),{level:r,size:e}}const N=t=>(W("data-v-762bb889"),t=t(),X(),t),Mt={class:"canvasBox"},xt=N(()=>O("canvas",{id:"canvas"},null,-1)),wt=N(()=>O("button",{id:"launcherBtn"},"发射",-1)),kt=[xt,wt],At={__name:"Firework",setup(t){return V(()=>{const r=document.getElementById("launcherBtn"),e=document.getElementById("canvas"),i=800,a=800,n=Math.max(window.devicePixelRatio,2);e.width=i*n,e.height=a*n,e.style.width=i+"px",e.style.height=a+"px";const h=e.getContext("2d");h.scale(n,n);const o=(g,s)=>Math.random()*(s-g)+g,c=({opacity:g=1,x:s,y:f,radius:d,color:M})=>{h.save(),h.globalAlpha=g,h.beginPath(),h.arc(s,f,d,0,Math.PI*2),h.fillStyle=M,h.fill(),h.restore()},b=(g,s)=>{const f=g.findIndex(d=>d===s);g.splice(f,1)};class x{constructor(s){this.firework=s.firework,this.x=s.x,this.y=s.y,this.color=Math.random()>.2?s.color:"#fff",this.radius=s.radius||2,this.angle=o(0,2*Math.PI),this.speed=s.speed||o(.1,4),this.vx=Math.cos(this.angle)*this.speed,this.vy=Math.sin(this.angle)*this.speed,this.g=s.g||.98,this.time=o(.5,1),this.startTime=0,this.debrisCount=s.debrisCount||3,this.secondBurst=s.secondBurst||!1}start(){this.startTime=Date.now()}update(){const s=(Date.now()-this.startTime)/1e3,f=this.vy-this.g*s;this.x+=this.vx,this.y+=f;const d=s/this.time;let M=d>.7?1-1*d:1;return M<0&&(M=0),c({x:this.x,y:this.y,color:this.color,radius:this.radius,opacity:M}),this.debrisCount>0&&Math.random()>.8&&(this.debrisCount--,this.firework.addDebris({x:this.x+o(-2,2),y:this.y+o(-2,2),color:this.color,radius:.5,g:.1})),{x:this.x,y:this.y,isEnd:d>=1}}}class v{constructor(s){this.firework=s.firework,this.x=s.x,this.y=s.y,this.color=s.color,this.debrisList=[],this.debrisNum=s.debrisNum||o(50,400),this.secondBurst=s.secondBurst||this.debrisNum<=100,this.isFirstBurst=!0}start(s,f={}){const d=s||this.debrisNum;f.x=f.x||this.x,f.y=f.y||this.y,f.secondBurst=this.secondBurst&&this.isFirstBurst;for(let M=0;M<d;M++){const R=new x({firework:this.firework,color:this.color,...f});R.start(),this.debrisList.push(R)}this.isFirstBurst=!1}update(){const s=[...this.debrisList];return s.forEach(f=>{const d=f.update();d.isEnd&&(b(this.debrisList,f),f.secondBurst&&this.start(5,{x:d.x,y:d.y,speed:1}))}),{isEnd:s.length<=0}}}class q{constructor(s={}){this.color=s.color||"#fff",this.opacity=o(.1,.5),this.radius=s.radius||1,this.time=o(.5,1),this.g=s.g||.98,this.x=s.x,this.y=s.y,this.startTime=0}start(){this.startTime=Date.now()}update(){const s=(Date.now()-this.startTime)/1e3;return this.y-=this.g*s,c({opacity:this.opacity,x:this.x,y:this.y,radius:this.radius,color:this.color}),{x:this.x,y:this.y,isEnd:s>this.time}}}class z{constructor(s={}){this.firework=s.firework,this.color=s.color,this.x=s.x||i*o(.2,.8),this.y=s.y||0,this.ty=a*o(.6,.8),this.radius=s.radius||o(2,5),this.duration=s.duration||o(2e3,3500),this.startTime=0}start(){this.startTime=Date.now()}update(){const s=this.x;let f=Z.easeOutCubic(Date.now()-this.startTime,this.y,this.ty-this.y,this.duration);f=Math.min(f,this.ty);let d=1-1*(f/this.ty);return d<0&&(d=0),this.draw(s,f,d),Math.random()>.7&&d>=.1&&this.firework.addDebris({x:s+o(-2,2),y:f}),{x:s,y:f,isEnd:f>=this.ty}}draw(s,f,d){c({opacity:d,x:s,y:f,radius:this.radius,color:this.color}),c({opacity:d,x:s,y:f,radius:this.radius/2,color:"#fff"})}}class G{constructor(s={}){this.color=s.color||u.random().toHexString(),this.launcher=null,this.explosive=null,this.status="waiting",this.debrisList=[]}launch(){this.launcher=new z({firework:this,color:this.color}),this.launcher.start(),this.status="launching"}burst({x:s,y:f}){this.explosive=new v({firework:this,x:s,y:f,color:this.color}),this.explosive.start()}update(){if(this.status==="launching"){const s=this.launcher.update();s.isEnd&&(this.status="bursting",this.burst(s))}else this.status==="bursting"&&this.explosive.update().isEnd&&(this.status="end");this.updateDebris()}addDebris(s={}){const f=new q({...s,color:s.color||this.color});f.start(),this.debrisList.push(f)}updateDebris(){[...this.debrisList].forEach(f=>{f.update().isEnd&&b(this.debrisList,f)})}isEnd(){return this.status==="end"}}const S=[],H=()=>{h.fillStyle="rgba(0,0,0,0.3)",h.fillRect(0,0,i,a),h.save(),h.translate(0,a),h.scale(1,-1),[...S].forEach(s=>{s.update(),s.isEnd()&&b(S,s)}),h.restore(),requestAnimationFrame(H)};H();const Q=()=>{const g=["#ff0043","#14fc56","#1e7fff","#e60aff","#ffbf36","#ffffff"];return g[Math.floor(Math.random()*g.length)]};r.addEventListener("click",()=>{const g=new G({color:Q()});S.push(g),g.launch()})}),(r,e)=>($(),j("div",Mt,kt))}},It=U(At,[["__scopeId","data-v-762bb889"]]);export{It as default};
