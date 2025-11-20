var ut=Object.defineProperty;var gt=(e,t,r)=>t in e?ut(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var m=(e,t,r)=>(gt(e,typeof t!="symbol"?t+"":t,r),r);import{c as pt,j as l}from"./vendor-mui-Cc1TuOMr.js";import{r as g,a as B,u as mt,L as k,O as ft}from"./vendor-react-CQ9jITQR.js";import{f as bt,d as b}from"./vendor-styled-F-HTyTPr.js";import{c as o}from"./index-D6LdA2ZN.js";import{D as yt,L as q,M as xt}from"./vendor-antd-Ct-O66bz.js";import"./vendor-query-DLAcIdav.js";import"./vendor-date-CdyaOyHe.js";const Z=g.createContext({}),kt={aliceblue:"9ehhb",antiquewhite:"9sgk7",aqua:"1ekf",aquamarine:"4zsno",azure:"9eiv3",beige:"9lhp8",bisque:"9zg04",black:"0",blanchedalmond:"9zhe5",blue:"73",blueviolet:"5e31e",brown:"6g016",burlywood:"8ouiv",cadetblue:"3qba8",chartreuse:"4zshs",chocolate:"87k0u",coral:"9yvyo",cornflowerblue:"3xael",cornsilk:"9zjz0",crimson:"8l4xo",cyan:"1ekf",darkblue:"3v",darkcyan:"rkb",darkgoldenrod:"776yz",darkgray:"6mbhl",darkgreen:"jr4",darkgrey:"6mbhl",darkkhaki:"7ehkb",darkmagenta:"5f91n",darkolivegreen:"3bzfz",darkorange:"9yygw",darkorchid:"5z6x8",darkred:"5f8xs",darksalmon:"9441m",darkseagreen:"5lwgf",darkslateblue:"2th1n",darkslategray:"1ugcv",darkslategrey:"1ugcv",darkturquoise:"14up",darkviolet:"5rw7n",deeppink:"9yavn",deepskyblue:"11xb",dimgray:"442g9",dimgrey:"442g9",dodgerblue:"16xof",firebrick:"6y7tu",floralwhite:"9zkds",forestgreen:"1cisi",fuchsia:"9y70f",gainsboro:"8m8kc",ghostwhite:"9pq0v",goldenrod:"8j4f4",gold:"9zda8",gray:"50i2o",green:"pa8",greenyellow:"6senj",grey:"50i2o",honeydew:"9eiuo",hotpink:"9yrp0",indianred:"80gnw",indigo:"2xcoy",ivory:"9zldc",khaki:"9edu4",lavenderblush:"9ziet",lavender:"90c8q",lawngreen:"4vk74",lemonchiffon:"9zkct",lightblue:"6s73a",lightcoral:"9dtog",lightcyan:"8s1rz",lightgoldenrodyellow:"9sjiq",lightgray:"89jo3",lightgreen:"5nkwg",lightgrey:"89jo3",lightpink:"9z6wx",lightsalmon:"9z2ii",lightseagreen:"19xgq",lightskyblue:"5arju",lightslategray:"4nwk9",lightslategrey:"4nwk9",lightsteelblue:"6wau6",lightyellow:"9zlcw",lime:"1edc",limegreen:"1zcxe",linen:"9shk6",magenta:"9y70f",maroon:"4zsow",mediumaquamarine:"40eju",mediumblue:"5p",mediumorchid:"79qkz",mediumpurple:"5r3rv",mediumseagreen:"2d9ip",mediumslateblue:"4tcku",mediumspringgreen:"1di2",mediumturquoise:"2uabw",mediumvioletred:"7rn9h",midnightblue:"z980",mintcream:"9ljp6",mistyrose:"9zg0x",moccasin:"9zfzp",navajowhite:"9zest",navy:"3k",oldlace:"9wq92",olive:"50hz4",olivedrab:"472ub",orange:"9z3eo",orangered:"9ykg0",orchid:"8iu3a",palegoldenrod:"9bl4a",palegreen:"5yw0o",paleturquoise:"6v4ku",palevioletred:"8k8lv",papayawhip:"9zi6t",peachpuff:"9ze0p",peru:"80oqn",pink:"9z8wb",plum:"8nba5",powderblue:"6wgdi",purple:"4zssg",rebeccapurple:"3zk49",red:"9y6tc",rosybrown:"7cv4f",royalblue:"2jvtt",saddlebrown:"5fmkz",salmon:"9rvci",sandybrown:"9jn1c",seagreen:"1tdnb",seashell:"9zje6",sienna:"6973h",silver:"7ir40",skyblue:"5arjf",slateblue:"45e4t",slategray:"4e100",slategrey:"4e100",snow:"9zke2",springgreen:"1egv",steelblue:"2r1kk",tan:"87yx8",teal:"pds",thistle:"8ggk8",tomato:"9yqfb",turquoise:"2j4r4",violet:"9b10u",wheat:"9ld4j",white:"9zldr",whitesmoke:"9lhpx",yellow:"9zl6o",yellowgreen:"61fzm"},p=Math.round;function _(e,t){const r=e.replace(/^[^(]*\((.*)/,"$1").replace(/\).*/,"").match(/\d*\.?\d+%?/g)||[],n=r.map(i=>parseFloat(i));for(let i=0;i<3;i+=1)n[i]=t(n[i]||0,r[i]||"",i);return r[3]?n[3]=r[3].includes("%")?n[3]/100:n[3]:n[3]=1,n}const D=(e,t,r)=>r===0?e:e/100;function v(e,t){const r=t||255;return e>r?r:e<0?0:e}class ${constructor(t){m(this,"isValid",!0);m(this,"r",0);m(this,"g",0);m(this,"b",0);m(this,"a",1);m(this,"_h");m(this,"_s");m(this,"_l");m(this,"_v");m(this,"_max");m(this,"_min");m(this,"_brightness");function r(n){return n[0]in t&&n[1]in t&&n[2]in t}if(t)if(typeof t=="string"){let i=function(a){return n.startsWith(a)};const n=t.trim();if(/^#?[A-F\d]{3,8}$/i.test(n))this.fromHexString(n);else if(i("rgb"))this.fromRgbString(n);else if(i("hsl"))this.fromHslString(n);else if(i("hsv")||i("hsb"))this.fromHsvString(n);else{const a=kt[n.toLowerCase()];a&&this.fromHexString(parseInt(a,36).toString(16).padStart(6,"0"))}}else if(t instanceof $)this.r=t.r,this.g=t.g,this.b=t.b,this.a=t.a,this._h=t._h,this._s=t._s,this._l=t._l,this._v=t._v;else if(r("rgb"))this.r=v(t.r),this.g=v(t.g),this.b=v(t.b),this.a=typeof t.a=="number"?v(t.a,1):1;else if(r("hsl"))this.fromHsl(t);else if(r("hsv"))this.fromHsv(t);else throw new Error("@ant-design/fast-color: unsupported input "+JSON.stringify(t))}setR(t){return this._sc("r",t)}setG(t){return this._sc("g",t)}setB(t){return this._sc("b",t)}setA(t){return this._sc("a",t,1)}setHue(t){const r=this.toHsv();return r.h=t,this._c(r)}getLuminance(){function t(a){const s=a/255;return s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4)}const r=t(this.r),n=t(this.g),i=t(this.b);return .2126*r+.7152*n+.0722*i}getHue(){if(typeof this._h>"u"){const t=this.getMax()-this.getMin();t===0?this._h=0:this._h=p(60*(this.r===this.getMax()?(this.g-this.b)/t+(this.g<this.b?6:0):this.g===this.getMax()?(this.b-this.r)/t+2:(this.r-this.g)/t+4))}return this._h}getSaturation(){if(typeof this._s>"u"){const t=this.getMax()-this.getMin();t===0?this._s=0:this._s=t/this.getMax()}return this._s}getLightness(){return typeof this._l>"u"&&(this._l=(this.getMax()+this.getMin())/510),this._l}getValue(){return typeof this._v>"u"&&(this._v=this.getMax()/255),this._v}getBrightness(){return typeof this._brightness>"u"&&(this._brightness=(this.r*299+this.g*587+this.b*114)/1e3),this._brightness}darken(t=10){const r=this.getHue(),n=this.getSaturation();let i=this.getLightness()-t/100;return i<0&&(i=0),this._c({h:r,s:n,l:i,a:this.a})}lighten(t=10){const r=this.getHue(),n=this.getSaturation();let i=this.getLightness()+t/100;return i>1&&(i=1),this._c({h:r,s:n,l:i,a:this.a})}mix(t,r=50){const n=this._c(t),i=r/100,a=c=>(n[c]-this[c])*i+this[c],s={r:p(a("r")),g:p(a("g")),b:p(a("b")),a:p(a("a")*100)/100};return this._c(s)}tint(t=10){return this.mix({r:255,g:255,b:255,a:1},t)}shade(t=10){return this.mix({r:0,g:0,b:0,a:1},t)}onBackground(t){const r=this._c(t),n=this.a+r.a*(1-this.a),i=a=>p((this[a]*this.a+r[a]*r.a*(1-this.a))/n);return this._c({r:i("r"),g:i("g"),b:i("b"),a:n})}isDark(){return this.getBrightness()<128}isLight(){return this.getBrightness()>=128}equals(t){return this.r===t.r&&this.g===t.g&&this.b===t.b&&this.a===t.a}clone(){return this._c(this)}toHexString(){let t="#";const r=(this.r||0).toString(16);t+=r.length===2?r:"0"+r;const n=(this.g||0).toString(16);t+=n.length===2?n:"0"+n;const i=(this.b||0).toString(16);if(t+=i.length===2?i:"0"+i,typeof this.a=="number"&&this.a>=0&&this.a<1){const a=p(this.a*255).toString(16);t+=a.length===2?a:"0"+a}return t}toHsl(){return{h:this.getHue(),s:this.getSaturation(),l:this.getLightness(),a:this.a}}toHslString(){const t=this.getHue(),r=p(this.getSaturation()*100),n=p(this.getLightness()*100);return this.a!==1?`hsla(${t},${r}%,${n}%,${this.a})`:`hsl(${t},${r}%,${n}%)`}toHsv(){return{h:this.getHue(),s:this.getSaturation(),v:this.getValue(),a:this.a}}toRgb(){return{r:this.r,g:this.g,b:this.b,a:this.a}}toRgbString(){return this.a!==1?`rgba(${this.r},${this.g},${this.b},${this.a})`:`rgb(${this.r},${this.g},${this.b})`}toString(){return this.toRgbString()}_sc(t,r,n){const i=this.clone();return i[t]=v(r,n),i}_c(t){return new this.constructor(t)}getMax(){return typeof this._max>"u"&&(this._max=Math.max(this.r,this.g,this.b)),this._max}getMin(){return typeof this._min>"u"&&(this._min=Math.min(this.r,this.g,this.b)),this._min}fromHexString(t){const r=t.replace("#","");function n(i,a){return parseInt(r[i]+r[a||i],16)}r.length<6?(this.r=n(0),this.g=n(1),this.b=n(2),this.a=r[3]?n(3)/255:1):(this.r=n(0,1),this.g=n(2,3),this.b=n(4,5),this.a=r[6]?n(6,7)/255:1)}fromHsl({h:t,s:r,l:n,a:i}){if(this._h=t%360,this._s=r,this._l=n,this.a=typeof i=="number"?i:1,r<=0){const y=p(n*255);this.r=y,this.g=y,this.b=y}let a=0,s=0,c=0;const d=t/60,u=(1-Math.abs(2*n-1))*r,h=u*(1-Math.abs(d%2-1));d>=0&&d<1?(a=u,s=h):d>=1&&d<2?(a=h,s=u):d>=2&&d<3?(s=u,c=h):d>=3&&d<4?(s=h,c=u):d>=4&&d<5?(a=h,c=u):d>=5&&d<6&&(a=u,c=h);const f=n-u/2;this.r=p((a+f)*255),this.g=p((s+f)*255),this.b=p((c+f)*255)}fromHsv({h:t,s:r,v:n,a:i}){this._h=t%360,this._s=r,this._v=n,this.a=typeof i=="number"?i:1;const a=p(n*255);if(this.r=a,this.g=a,this.b=a,r<=0)return;const s=t/60,c=Math.floor(s),d=s-c,u=p(n*(1-r)*255),h=p(n*(1-r*d)*255),f=p(n*(1-r*(1-d))*255);switch(c){case 0:this.g=f,this.b=u;break;case 1:this.r=h,this.b=u;break;case 2:this.r=u,this.b=f;break;case 3:this.r=u,this.g=h;break;case 4:this.r=f,this.g=u;break;case 5:default:this.g=u,this.b=h;break}}fromHsvString(t){const r=_(t,D);this.fromHsv({h:r[0],s:r[1],v:r[2],a:r[3]})}fromHslString(t){const r=_(t,D);this.fromHsl({h:r[0],s:r[1],l:r[2],a:r[3]})}fromRgbString(t){const r=_(t,(n,i)=>i.includes("%")?p(n/100*255):n);this.r=r[0],this.g=r[1],this.b=r[2],this.a=r[3]}}const j=2,F=.16,$t=.05,wt=.05,vt=.15,tt=5,et=4,St=[{index:7,amount:15},{index:6,amount:25},{index:5,amount:30},{index:5,amount:45},{index:5,amount:65},{index:5,amount:85},{index:4,amount:90},{index:3,amount:95},{index:2,amount:97},{index:1,amount:98}];function W(e,t,r){let n;return Math.round(e.h)>=60&&Math.round(e.h)<=240?n=r?Math.round(e.h)-j*t:Math.round(e.h)+j*t:n=r?Math.round(e.h)+j*t:Math.round(e.h)-j*t,n<0?n+=360:n>=360&&(n-=360),n}function Q(e,t,r){if(e.h===0&&e.s===0)return e.s;let n;return r?n=e.s-F*t:t===et?n=e.s+F:n=e.s+$t*t,n>1&&(n=1),r&&t===tt&&n>.1&&(n=.1),n<.06&&(n=.06),Math.round(n*100)/100}function G(e,t,r){let n;return r?n=e.v+wt*t:n=e.v-vt*t,n=Math.max(0,Math.min(1,n)),Math.round(n*100)/100}function jt(e,t={}){const r=[],n=new $(e),i=n.toHsv();for(let a=tt;a>0;a-=1){const s=new $({h:W(i,a,!0),s:Q(i,a,!0),v:G(i,a,!0)});r.push(s)}r.push(n);for(let a=1;a<=et;a+=1){const s=new $({h:W(i,a),s:Q(i,a),v:G(i,a)});r.push(s)}return t.theme==="dark"?St.map(({index:a,amount:s})=>new $(t.backgroundColor||"#141414").mix(r[a],s).toHexString()):r.map(a=>a.toHexString())}const M=["#e6f4ff","#bae0ff","#91caff","#69b1ff","#4096ff","#1677ff","#0958d9","#003eb3","#002c8c","#001d66"];M.primary=M[5];function zt(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function Ct(e,t){if(!e)return!1;if(e.contains)return e.contains(t);let r=t;for(;r;){if(r===e)return!0;r=r.parentNode}return!1}const K="data-rc-order",Y="data-rc-priority",_t="rc-util-key",H=new Map;function rt({mark:e}={}){return e?e.startsWith("data-")?e:`data-${e}`:_t}function A(e){return e.attachTo?e.attachTo:document.querySelector("head")||document.body}function Mt(e){return e==="queue"?"prependQueue":e?"prepend":"append"}function V(e){return Array.from((H.get(e)||e).children).filter(t=>t.tagName==="STYLE")}function nt(e,t={}){if(!zt())return null;const{csp:r,prepend:n,priority:i=0}=t,a=Mt(n),s=a==="prependQueue",c=document.createElement("style");c.setAttribute(K,a),s&&i&&c.setAttribute(Y,`${i}`),r!=null&&r.nonce&&(c.nonce=r==null?void 0:r.nonce),c.innerHTML=e;const d=A(t),{firstChild:u}=d;if(n){if(s){const h=(t.styles||V(d)).filter(f=>{if(!["prepend","prependQueue"].includes(f.getAttribute(K)))return!1;const y=Number(f.getAttribute(Y)||0);return i>=y});if(h.length)return d.insertBefore(c,h[h.length-1].nextSibling),c}d.insertBefore(c,u)}else d.appendChild(c);return c}function Ht(e,t={}){let{styles:r}=t;return r||(r=V(A(t))),r.find(n=>n.getAttribute(rt(t))===e)}function Ot(e,t){const r=H.get(e);if(!r||!Ct(document,r)){const n=nt("",t),{parentNode:i}=n;H.set(e,i),e.removeChild(n)}}function Rt(e,t,r={}){var d,u,h;const n=A(r),i=V(n),a={...r,styles:i};Ot(n,a);const s=Ht(t,a);if(s)return(d=a.csp)!=null&&d.nonce&&s.nonce!==((u=a.csp)==null?void 0:u.nonce)&&(s.nonce=(h=a.csp)==null?void 0:h.nonce),s.innerHTML!==e&&(s.innerHTML=e),s;const c=nt(e,a);return c.setAttribute(rt(a),t),c}function ot(e){var t;return(t=e==null?void 0:e.getRootNode)==null?void 0:t.call(e)}function Lt(e){return ot(e)instanceof ShadowRoot}function Tt(e){return Lt(e)?ot(e):null}let O={};const It=e=>{};function Et(e,t){}function Nt(e,t){}function Pt(){O={}}function it(e,t,r){!t&&!O[r]&&(e(!1,r),O[r]=!0)}function z(e,t){it(Et,e,t)}function qt(e,t){it(Nt,e,t)}z.preMessage=It;z.resetWarned=Pt;z.noteOnce=qt;function At(e){return e.replace(/-(.)/g,(t,r)=>r.toUpperCase())}function Vt(e,t){z(e,`[@ant-design/icons] ${t}`)}function U(e){return typeof e=="object"&&typeof e.name=="string"&&typeof e.theme=="string"&&(typeof e.icon=="object"||typeof e.icon=="function")}function J(e={}){return Object.keys(e).reduce((t,r)=>{const n=e[r];switch(r){case"class":t.className=n,delete t.class;break;default:delete t[r],t[At(r)]=n}return t},{})}function R(e,t,r){return r?B.createElement(e.tag,{key:t,...J(e.attrs),...r},(e.children||[]).map((n,i)=>R(n,`${t}-${e.tag}-${i}`))):B.createElement(e.tag,{key:t,...J(e.attrs)},(e.children||[]).map((n,i)=>R(n,`${t}-${e.tag}-${i}`)))}function at(e){return jt(e)[0]}function st(e){return e?Array.isArray(e)?e:[e]:[]}const Bt=`
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
  vertical-align: inherit;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,Dt=e=>{const{csp:t,prefixCls:r,layer:n}=g.useContext(Z);let i=Bt;r&&(i=i.replace(/anticon/g,r)),n&&(i=`@layer ${n} {
${i}
}`),g.useEffect(()=>{const a=e.current,s=Tt(a);Rt(i,"@ant-design-icons",{prepend:!n,csp:t,attachTo:s})},[])},S={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function Ft({primaryColor:e,secondaryColor:t}){S.primaryColor=e,S.secondaryColor=t||at(e),S.calculated=!!t}function Wt(){return{...S}}const w=e=>{const{icon:t,className:r,onClick:n,style:i,primaryColor:a,secondaryColor:s,...c}=e,d=g.useRef(null);let u=S;if(a&&(u={primaryColor:a,secondaryColor:s||at(a)}),Dt(d),Vt(U(t),`icon should be icon definiton, but got ${t}`),!U(t))return null;let h=t;return h&&typeof h.icon=="function"&&(h={...h,icon:h.icon(u.primaryColor,u.secondaryColor)}),R(h.icon,`svg-${h.name}`,{className:r,onClick:n,style:i,"data-icon":h.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",...c,ref:d})};w.displayName="IconReact";w.getTwoToneColors=Wt;w.setTwoToneColors=Ft;function ct(e){const[t,r]=st(e);return w.setTwoToneColors({primaryColor:t,secondaryColor:r})}function Qt(){const e=w.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor}function L(){return L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},L.apply(this,arguments)}ct(M.primary);const x=g.forwardRef((e,t)=>{const{className:r,icon:n,spin:i,rotate:a,tabIndex:s,onClick:c,twoToneColor:d,...u}=e,{prefixCls:h="anticon",rootClassName:f}=g.useContext(Z),y=pt(f,h,{[`${h}-${n.name}`]:!!n.name,[`${h}-spin`]:!!i||n.name==="loading"},r);let C=s;C===void 0&&c&&(C=-1);const lt=a?{msTransform:`rotate(${a}deg)`,transform:`rotate(${a}deg)`}:void 0,[dt,ht]=st(d);return g.createElement("span",L({role:"img","aria-label":n.name},u,{ref:t,tabIndex:C,onClick:c,className:y}),g.createElement(w,{icon:n,primaryColor:dt,secondaryColor:ht,style:lt}))});x.getTwoToneColor=Qt;x.setTwoToneColor=ct;var Gt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M917.7 148.8l-42.4-42.4c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-76.1 76.1a199.27 199.27 0 00-112.1-34.3c-51.2 0-102.4 19.5-141.5 58.6L432.3 308.7a8.03 8.03 0 000 11.3L704 591.7c1.6 1.6 3.6 2.3 5.7 2.3 2 0 4.1-.8 5.7-2.3l101.9-101.9c68.9-69 77-175.7 24.3-253.5l76.1-76.1c3.1-3.2 3.1-8.3 0-11.4zM769.1 441.7l-59.4 59.4-186.8-186.8 59.4-59.4c24.9-24.9 58.1-38.7 93.4-38.7 35.3 0 68.4 13.7 93.4 38.7 24.9 24.9 38.7 58.1 38.7 93.4 0 35.3-13.8 68.4-38.7 93.4zm-190.2 105a8.03 8.03 0 00-11.3 0L501 613.3 410.7 523l66.7-66.7c3.1-3.1 3.1-8.2 0-11.3L441 408.6a8.03 8.03 0 00-11.3 0L363 475.3l-43-43a7.85 7.85 0 00-5.7-2.3c-2 0-4.1.8-5.7 2.3L206.8 534.2c-68.9 69-77 175.7-24.3 253.5l-76.1 76.1a8.03 8.03 0 000 11.3l42.4 42.4c1.6 1.6 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3l76.1-76.1c33.7 22.9 72.9 34.3 112.1 34.3 51.2 0 102.4-19.5 141.5-58.6l101.9-101.9c3.1-3.1 3.1-8.2 0-11.3l-43-43 66.7-66.7c3.1-3.1 3.1-8.2 0-11.3l-36.6-36.2zM441.7 769.1a131.32 131.32 0 01-93.4 38.7c-35.3 0-68.4-13.7-93.4-38.7a131.32 131.32 0 01-38.7-93.4c0-35.3 13.7-68.4 38.7-93.4l59.4-59.4 186.8 186.8-59.4 59.4z"}}]},name:"api",theme:"outlined"};function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},T.apply(this,arguments)}const Kt=(e,t)=>g.createElement(x,T({},e,{ref:t,icon:Gt})),Yt=g.forwardRef(Kt);var Ut={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-600 72h560v208H232V136zm560 480H232V408h560v208zm0 272H232V680h560v208zM304 240a40 40 0 1080 0 40 40 0 10-80 0zm0 272a40 40 0 1080 0 40 40 0 10-80 0zm0 272a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"database",theme:"outlined"};function I(){return I=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},I.apply(this,arguments)}const Jt=(e,t)=>g.createElement(x,I({},e,{ref:t,icon:Ut})),X=g.forwardRef(Jt);function E(){return E=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},E.apply(this,arguments)}const Xt=(e,t)=>g.createElement(x,E({},e,{ref:t,icon:yt})),Zt=g.forwardRef(Xt);var te={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 472a40 40 0 1080 0 40 40 0 10-80 0zm367 352.9L696.3 352V178H768v-68H256v68h71.7v174L145 824.9c-2.8 7.4-4.3 15.2-4.3 23.1 0 35.3 28.7 64 64 64h614.6c7.9 0 15.7-1.5 23.1-4.3 33-12.7 49.4-49.8 36.6-82.8zM395.7 364.7V180h232.6v184.7L719.2 600c-20.7-5.3-42.1-8-63.9-8-61.2 0-119.2 21.5-165.3 60a188.78 188.78 0 01-121.3 43.9c-32.7 0-64.1-8.3-91.8-23.7l118.8-307.5zM210.5 844l41.7-107.8c35.7 18.1 75.4 27.8 116.6 27.8 61.2 0 119.2-21.5 165.3-60 33.9-28.2 76.3-43.9 121.3-43.9 35 0 68.4 9.5 97.6 27.1L813.5 844h-603z"}}]},name:"experiment",theme:"outlined"};function N(){return N=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},N.apply(this,arguments)}const ee=(e,t)=>g.createElement(x,N({},e,{ref:t,icon:te})),re=g.forwardRef(ee);var ne={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"}}]},name:"home",theme:"outlined"};function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},P.apply(this,arguments)}const oe=(e,t)=>g.createElement(x,P({},e,{ref:t,icon:ne})),ie=g.forwardRef(oe),ae=bt`
  /* ===== Form 表單樣式 ===== */
  .ant-form {
    .ant-form-item-label > label {
      color: ${o.text.inverse} ;
      font-weight: 500;
      font-size: 14px;
    }

    .ant-form-item-required::before {
      color: ${o.functional.error} ;
    }

    .ant-form-item-explain-error {
      color: ${o.functional.error};
    }
  }

  /* ===== Drawer 抽屜樣式 ===== */
  .ant-drawer {
    .ant-form-item-label > label {
      color: ${o.text.inverse} ;
      font-weight: 500;
    }

    .ant-form-item {
      margin-bottom: 20px;
    }
  }

  /* ===== Input 輸入框樣式 ===== */
  .ant-input,
  .ant-input-number,
  .ant-picker {
    background: ${o.background.primary} !important;
    border: 1px solid ${o.border.primary} !important;
    color: #ffffff !important;
    font-weight: 500;
    border-radius: 6px;
    transition: all 0.3s;

    &:hover {
      border-color: ${o.accent.primary} !important;
      background: ${o.background.primary} !important;
    }

    &:focus,
    &.ant-input-focused,
    &.ant-picker-focused {
      border-color: ${o.accent.primary} !important;
      box-shadow: 0 0 0 2px ${o.accent.primary}20 !important;
      background: ${o.background.primary} !important;
    }

    &:active {
      border-color: ${o.accent.primary} !important;
      background: ${o.background.primary} !important;
    }

    &::placeholder {
      color: #b0b0b0;
    }

    &:disabled {
      background: ${o.background.secondary} !important;
      color: ${o.text.secondary};
      border-color: ${o.border.primary} !important;
      opacity: 0.6;
    }
  }

  /* Input Number 容器 */
  .ant-input-number {
    &:hover,
    &:focus,
    &.ant-input-number-focused {
      border-color: ${o.accent.primary} !important;
      box-shadow: 0 0 0 2px ${o.accent.primary}20 !important;
    }
  }

  /* Input Number 內部輸入框 */
  .ant-input-number-input {
    background: transparent;
    color: #ffffff !important;
    font-weight: 500;
  }

  /* Input Number 操作按鈕 */
  .ant-input-number-handler-wrap {
    background: ${o.background.secondary};
    border-left: 1px solid ${o.border.primary};

    .ant-input-number-handler {
      border-color: ${o.border.primary};
      color: ${o.text.secondary};

      &:hover {
        color: ${o.accent.primary};
      }

      &:active {
        background: ${o.accent.primary}20;
      }
    }
  }

  /* ===== Select 下拉選單樣式 ===== */
  .ant-select {
    .ant-select-selector {
      background: ${o.background.primary} !important;
      border: 1px solid ${o.border.primary} !important;
      color: ${o.text.inverse};
      border-radius: 6px;
      transition: all 0.3s;
    }

    .ant-select-arrow {
      color: ${o.text.secondary};
    }

    &:hover .ant-select-selector {
      border-color: ${o.accent.primary} !important;
    }

    &.ant-select-focused .ant-select-selector,
    &.ant-select-open .ant-select-selector {
      border-color: ${o.accent.primary} !important;
      box-shadow: 0 0 0 2px ${o.accent.primary}20 !important;
    }

    .ant-select-selection-placeholder {
      color: ${o.text.secondary};
    }

    .ant-select-selection-item {
      color: #ffffff !important;
      font-weight: 500;
    }
  }

  /* Select 下拉選單面板 */
  .ant-select-dropdown {
    background: ${o.background.secondary};
    border: 1px solid ${o.accent.primary}40;
    border-radius: 8px;
    box-shadow: 0 4px 12px ${o.accent.primary}30;

    .ant-select-item {
      color: ${o.text.inverse};

      &:hover {
        background: ${o.accent.primary}20;
      }

      &.ant-select-item-option-selected {
        background: ${o.accent.primary};
        color: ${o.background.primary};
        font-weight: 600;
      }
    }
  }

  /* ===== DatePicker 日期選擇器樣式 ===== */
  .ant-picker-dropdown {
    .ant-picker-panel-container {
      background: ${o.background.secondary};
      border: 1px solid ${o.accent.primary}40;
      border-radius: 8px;
      box-shadow: 0 4px 12px ${o.accent.primary}30;
    }

    .ant-picker-header {
      color: ${o.accent.primary};
      border-bottom: 1px solid ${o.border.primary};

      button {
        color: ${o.text.inverse};

        &:hover {
          color: ${o.accent.primary};
        }
      }
    }

    .ant-picker-content {
      th {
        color: ${o.text.secondary};
      }

      .ant-picker-cell {
        color: ${o.text.inverse};

        &:hover .ant-picker-cell-inner {
          background: ${o.accent.primary}20;
        }

        &.ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
          background: ${o.accent.primary};
          color: ${o.background.primary};
        }

        &.ant-picker-cell-today .ant-picker-cell-inner::before {
          border-color: ${o.accent.primary};
        }
      }
    }

    .ant-picker-footer {
      border-top: 1px solid ${o.border.primary};
      background: ${o.background.primary};

      .ant-picker-now-btn {
        color: ${o.accent.primary};

        &:hover {
          color: ${o.accent.primary};
          filter: brightness(1.2);
        }
      }
    }
  }

  /* ===== Checkbox 核取方塊樣式 ===== */
  .ant-checkbox-wrapper {
    color: ${o.text.inverse};

    .ant-checkbox {
      .ant-checkbox-inner {
        background: ${o.background.primary};
        border-color: ${o.border.primary};
      }

      &:hover .ant-checkbox-inner {
        border-color: ${o.accent.primary};
      }

      &.ant-checkbox-checked .ant-checkbox-inner {
        background: ${o.accent.primary};
        border-color: ${o.accent.primary};
      }
    }
  }

  /* ===== Radio 單選按鈕樣式 ===== */
  .ant-radio-wrapper {
    color: ${o.text.inverse};

    .ant-radio {
      .ant-radio-inner {
        background: ${o.background.primary};
        border-color: ${o.border.primary};
      }

      &:hover .ant-radio-inner {
        border-color: ${o.accent.primary};
      }

      &.ant-radio-checked .ant-radio-inner {
        border-color: ${o.accent.primary};
        background: ${o.background.primary};

        &::after {
          background: ${o.accent.primary};
        }
      }
    }
  }

  /* ===== TextArea 文字區域樣式 ===== */
  .ant-input-textarea {
    .ant-input {
      background: ${o.background.primary};
      color: ${o.text.inverse};
      border-radius: 6px;
    }
  }

  /* ===== Button 按鈕樣式 (在表單中) ===== */
  .ant-btn-primary {
    background: ${o.accent.primary};
    border-color: ${o.accent.primary};
    color: ${o.background.primary};
    font-weight: 500;

    &:hover {
      background: ${o.accent.primary};
      border-color: ${o.accent.primary};
      filter: brightness(1.1);
    }

    &:active {
      filter: brightness(0.9);
    }
  }

  /* ===== Scrollbar 美化 ===== */
  .ant-select-dropdown,
  .ant-picker-dropdown {
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      background: ${o.background.primary};
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${o.accent.primary}40;
      border-radius: 3px;

      &:hover {
        background: ${o.accent.primary}60;
      }
    }
  }
`,{Sider:se,Content:ce}=q,le=b(q)`
  min-height: 100vh;
  background: ${o.background.primary};
`,de=b(se)`
  &.ant-layout-sider {
    background: ${o.background.secondary};
    border-right: 1px solid ${o.accent.primary}40;

    .ant-layout-sider-trigger {
      background: ${o.background.secondary};
      border-top: 1px solid ${o.accent.primary}40;
      color: ${o.accent.primary};
      transition: all 0.3s;

      &:hover {
        background: ${o.accent.primary}20;
        color: ${o.accent.primary};
      }
    }
  }
`,he=b.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${o.accent.primary}40;
  padding: 0 16px;
  background: ${o.background.primary};
  overflow: hidden;
  white-space: nowrap;
`,ue=b(xt)`
  &.ant-menu {
    background: transparent;
    border-right: none;
    color: ${o.text.inverse};

    .ant-menu-item {
      color: ${o.text.inverse};

      border-radius: 6px;
      transition: all 0.3s;
      font-size: 15px;
      font-weight: 500;

      &:hover {
        background: ${o.accent.primary}20;
        color: ${o.accent.primary} !important;
      }

      &.ant-menu-item-selected {
        background: transparent;
        color: ${o.accent.primary};
        font-weight: 600;

        &::after {
          display: none;
        }

        &:hover {
          background: ${o.accent.primary}20;
        }
      }

      a {
        color: inherit;
      }

      .anticon {
        color: inherit;
        font-size: 18px;
      }
    }
  }
`,ge=b(ce)`
  padding: 24px;
  background: ${o.background.primary};
  min-height: calc(100vh - 64px);
`,pe=b.div`
  background: ${o.background.secondary};
  padding: 16px 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid ${o.accent.primary}40;
  box-shadow: 0 2px 8px ${o.accent.primary}20;
`,me=b.h1`
  color: ${o.accent.primary};
  font-size: 26px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: 0.5px;

  .anticon {
    font-size: 30px;
  }
`,fe=b.div`
  color: ${o.text.inverse};
  font-size: 14px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.8;

  a {
    color: ${o.text.inverse};
    text-decoration: none;
    transition: all 0.3s;
    font-weight: 500;

    &:hover {
      color: ${o.accent.primary};
      opacity: 1;
    }
  }

  .separator {
    color: ${o.text.inverse};
    opacity: 0.4;
  }

  span:last-child {
    color: ${o.accent.primary};
    font-weight: 600;
  }
`;function je(){const[e,t]=g.useState(!1),r=mt(),n=[{key:"/pig-house-inventory",icon:l.jsx(X,{}),label:l.jsx(k,{to:"/pig-house-inventory",children:"豬舍庫存管理"})},{key:"/sow-breeding-records",icon:l.jsx(re,{}),label:l.jsx(k,{to:"/sow-breeding-records",children:"種豬繁殖記錄"})},{key:"/culling-boar",icon:l.jsx(Zt,{}),label:l.jsx(k,{to:"/culling-boar",children:"公豬淘汰管理"})},{key:"/boargenotype",icon:l.jsx(Yt,{}),label:l.jsx(k,{to:"/boargenotype",children:"公豬基因型管理"})},{key:"/",icon:l.jsx(ie,{}),label:l.jsx(k,{to:"/",children:"返回首頁"})}],a=(()=>{const s=n.find(c=>c.key===r.pathname);return s?{title:s.label.props.children,icon:s.icon}:{title:"養豬場管理系統",icon:l.jsx(X,{})}})();return l.jsxs(l.Fragment,{children:[l.jsx(ae,{}),l.jsxs(le,{children:[l.jsxs(de,{collapsible:!0,collapsed:e,onCollapse:t,breakpoint:"lg",width:250,children:[l.jsxs(he,{children:[!e&&l.jsx("span",{style:{color:o.accent.primary,fontSize:18,fontWeight:700,display:"flex",alignItems:"center",gap:8,letterSpacing:"0.5px"},children:"🐷 養豬場系統"}),e&&l.jsx("span",{style:{fontSize:28},children:"🐷"})]}),l.jsx(ue,{mode:"inline",selectedKeys:[r.pathname],items:n})]}),l.jsx(q,{children:l.jsxs(ge,{children:[l.jsxs(pe,{children:[l.jsxs(me,{children:[a.icon,a.title]}),l.jsxs(fe,{children:[l.jsx(k,{to:"/",children:"首頁"}),l.jsx("span",{className:"separator",children:"/"}),l.jsx("span",{children:"養豬場管理系統"}),l.jsx("span",{className:"separator",children:"/"}),l.jsx("span",{style:{color:o.accent.primary},children:a.title})]})]}),l.jsx(ft,{})]})})]})]})}export{je as default};
