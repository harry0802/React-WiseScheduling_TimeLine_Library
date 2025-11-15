import{r as p,E as Xe,D as Ke,F,Q as Se,H as _e,I as eo,S as Zt,U as Er,j as a,m as le,z as We,V as ia,W as la,X as Io,P as Rr,Y as nn,Z as Ft,_ as to,$ as Hr,a0 as ca,a1 as Yr,a2 as Ot,a3 as Or,a4 as be,a5 as da,a6 as ua,a7 as an,a8 as pa,a9 as Jt,aa as fa,ab as ha,ac as ma,ad as Co,ae as Ie,af as sn,ag as ln,c as ne,R as ro,a as J,ah as cn,B as oo,b as Q,d as T,C as Yt,ai as Vr,A as rr,aj as ga,ak as Do,al as Nt,G as z,T as Ae,am as no,an as dn,ao as xa,l as un}from"./index-CBdAkR7r.js";import{p as ba,C as Sa,A as va,c as Ur,e as Ta,f as ya,g as Ea,h as wa,i as Ia,a as Ca,b as Da,d as Ra,u as Oa,t as Aa,z as L,n as Ma,S as pn,M as Be,j as ja,D as fn,k as hn,l as ka,m as Pa,F as Fa,o as mn,T as Na}from"./moment-DMIOaRI2.js";const gn=e=>{const t=p.useRef({});return p.useEffect(()=>{t.current=e}),t.current};function La(e){return Ke("MuiCollapse",e)}Xe("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const $a=e=>{const{orientation:t,classes:r}=e,o={root:["root",`${t}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${t}`],wrapperInner:["wrapperInner",`${t}`]};return We(o,La,r)},za=F("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.orientation],r.state==="entered"&&t.entered,r.state==="exited"&&!r.in&&r.collapsedSize==="0px"&&t.hidden]}})(Se(({theme:e})=>({height:0,overflow:"hidden",transition:e.transitions.create("height"),variants:[{props:{orientation:"horizontal"},style:{height:"auto",width:0,transition:e.transitions.create("width")}},{props:{state:"entered"},style:{height:"auto",overflow:"visible"}},{props:{state:"entered",orientation:"horizontal"},style:{width:"auto"}},{props:({ownerState:t})=>t.state==="exited"&&!t.in&&t.collapsedSize==="0px",style:{visibility:"hidden"}}]}))),Ba=F("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(e,t)=>t.wrapper})({display:"flex",width:"100%",variants:[{props:{orientation:"horizontal"},style:{width:"auto",height:"100%"}}]}),_a=F("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(e,t)=>t.wrapperInner})({width:"100%",variants:[{props:{orientation:"horizontal"},style:{width:"auto",height:"100%"}}]}),Gr=p.forwardRef(function(t,r){const o=_e({props:t,name:"MuiCollapse"}),{addEndListener:n,children:s,className:i,collapsedSize:l="0px",component:c,easing:d,in:u,onEnter:f,onEntered:v,onEntering:b,onExit:y,onExited:m,onExiting:x,orientation:h="vertical",style:w,timeout:I=ia.standard,TransitionComponent:E=la,...D}=o,A={...o,orientation:h,collapsedSize:l},g=$a(A),R=eo(),M=Zt(),O=p.useRef(null),C=p.useRef(),$=typeof l=="number"?`${l}px`:l,P=h==="horizontal",B=P?"width":"height",G=p.useRef(null),Y=Er(r,G),_=N=>Z=>{if(N){const q=G.current;Z===void 0?N(q):N(q,Z)}},ee=()=>O.current?O.current[P?"clientWidth":"clientHeight"]:0,ae=_((N,Z)=>{O.current&&P&&(O.current.style.position="absolute"),N.style[B]=$,f&&f(N,Z)}),K=_((N,Z)=>{const q=ee();O.current&&P&&(O.current.style.position="");const{duration:ve,easing:Pe}=Io({style:w,timeout:I,easing:d},{mode:"enter"});if(I==="auto"){const Fe=R.transitions.getAutoHeightDuration(q);N.style.transitionDuration=`${Fe}ms`,C.current=Fe}else N.style.transitionDuration=typeof ve=="string"?ve:`${ve}ms`;N.style[B]=`${q}px`,N.style.transitionTimingFunction=Pe,b&&b(N,Z)}),te=_((N,Z)=>{N.style[B]="auto",v&&v(N,Z)}),se=_(N=>{N.style[B]=`${ee()}px`,y&&y(N)}),De=_(m),ie=_(N=>{const Z=ee(),{duration:q,easing:ve}=Io({style:w,timeout:I,easing:d},{mode:"exit"});if(I==="auto"){const Pe=R.transitions.getAutoHeightDuration(Z);N.style.transitionDuration=`${Pe}ms`,C.current=Pe}else N.style.transitionDuration=typeof q=="string"?q:`${q}ms`;N.style[B]=$,N.style.transitionTimingFunction=ve,x&&x(N)}),pe=N=>{I==="auto"&&M.start(C.current||0,N),n&&n(G.current,N)};return a.jsx(E,{in:u,onEnter:ae,onEntered:te,onEntering:K,onExit:se,onExited:De,onExiting:ie,addEndListener:pe,nodeRef:G,timeout:I==="auto"?null:I,...D,children:(N,{ownerState:Z,...q})=>a.jsx(za,{as:c,className:le(g.root,i,{entered:g.entered,exited:!u&&$==="0px"&&g.hidden}[N]),style:{[P?"minWidth":"minHeight"]:$,...w},ref:Y,ownerState:{...A,state:N},...q,children:a.jsx(Ba,{ownerState:{...A,state:N},className:g.wrapper,ref:O,children:a.jsx(_a,{ownerState:{...A,state:N},className:g.wrapperInner,children:s})})})})});Gr&&(Gr.muiSupportAuto=!0);const xn=p.createContext({});function Wa(e){return Ke("MuiAccordion",e)}const pr=Xe("MuiAccordion",["root","heading","rounded","expanded","disabled","gutters","region"]),Ha=e=>{const{classes:t,square:r,expanded:o,disabled:n,disableGutters:s}=e;return We({root:["root",!r&&"rounded",o&&"expanded",n&&"disabled",!s&&"gutters"],heading:["heading"],region:["region"]},Wa,t)},Ya=F(Rr,{name:"MuiAccordion",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[{[`& .${pr.region}`]:t.region},t.root,!r.square&&t.rounded,!r.disableGutters&&t.gutters]}})(Se(({theme:e})=>{const t={duration:e.transitions.duration.shortest};return{position:"relative",transition:e.transitions.create(["margin"],t),overflowAnchor:"none","&::before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(e.vars||e).palette.divider,transition:e.transitions.create(["opacity","background-color"],t)},"&:first-of-type":{"&::before":{display:"none"}},[`&.${pr.expanded}`]:{"&::before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&::before":{display:"none"}}},[`&.${pr.disabled}`]:{backgroundColor:(e.vars||e).palette.action.disabledBackground}}}),Se(({theme:e})=>({variants:[{props:t=>!t.square,style:{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(e.vars||e).shape.borderRadius,borderTopRightRadius:(e.vars||e).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(e.vars||e).shape.borderRadius,borderBottomRightRadius:(e.vars||e).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}}},{props:t=>!t.disableGutters,style:{[`&.${pr.expanded}`]:{margin:"16px 0"}}}]}))),Va=F("h3",{name:"MuiAccordion",slot:"Heading",overridesResolver:(e,t)=>t.heading})({all:"unset"}),Ua=p.forwardRef(function(t,r){const o=_e({props:t,name:"MuiAccordion"}),{children:n,className:s,defaultExpanded:i=!1,disabled:l=!1,disableGutters:c=!1,expanded:d,onChange:u,square:f=!1,slots:v={},slotProps:b={},TransitionComponent:y,TransitionProps:m,...x}=o,[h,w]=nn({controlled:d,default:i,name:"Accordion",state:"expanded"}),I=p.useCallback(Y=>{w(!h),u&&u(Y,!h)},[h,u,w]),[E,...D]=p.Children.toArray(n),A=p.useMemo(()=>({expanded:h,disabled:l,disableGutters:c,toggle:I}),[h,l,c,I]),g={...o,square:f,disabled:l,disableGutters:c,expanded:h},R=Ha(g),M={transition:y,...v},O={transition:m,...b},C={slots:M,slotProps:O},[$,P]=Ft("heading",{elementType:Va,externalForwardedProps:C,className:R.heading,ownerState:g}),[B,G]=Ft("transition",{elementType:Gr,externalForwardedProps:C,ownerState:g});return a.jsxs(Ya,{className:le(R.root,s),ref:r,ownerState:g,square:f,...x,children:[a.jsx($,{...P,children:a.jsx(xn.Provider,{value:A,children:E})}),a.jsx(B,{in:h,timeout:"auto",...G,children:a.jsx("div",{"aria-labelledby":E.props.id,id:E.props["aria-controls"],role:"region",className:R.region,children:D})})]})});function Ga(e){return Ke("MuiAccordionDetails",e)}Xe("MuiAccordionDetails",["root"]);const qa=e=>{const{classes:t}=e;return We({root:["root"]},Ga,t)},Qa=F("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(e,t)=>t.root})(Se(({theme:e})=>({padding:e.spacing(1,2,2)}))),Xa=p.forwardRef(function(t,r){const o=_e({props:t,name:"MuiAccordionDetails"}),{className:n,...s}=o,i=o,l=qa(i);return a.jsx(Qa,{className:le(l.root,n),ref:r,ownerState:i,...s})});function Ka(e){return Ke("MuiAccordionSummary",e)}const Lt=Xe("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),Za=e=>{const{classes:t,expanded:r,disabled:o,disableGutters:n}=e;return We({root:["root",r&&"expanded",o&&"disabled",!n&&"gutters"],focusVisible:["focusVisible"],content:["content",r&&"expanded",!n&&"contentGutters"],expandIconWrapper:["expandIconWrapper",r&&"expanded"]},Ka,t)},Ja=F(to,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(e,t)=>t.root})(Se(({theme:e})=>{const t={duration:e.transitions.duration.shortest};return{display:"flex",width:"100%",minHeight:48,padding:e.spacing(0,2),transition:e.transitions.create(["min-height","background-color"],t),[`&.${Lt.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${Lt.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`&:hover:not(.${Lt.disabled})`]:{cursor:"pointer"},variants:[{props:r=>!r.disableGutters,style:{[`&.${Lt.expanded}`]:{minHeight:64}}}]}})),es=F("span",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(e,t)=>t.content})(Se(({theme:e})=>({display:"flex",textAlign:"start",flexGrow:1,margin:"12px 0",variants:[{props:t=>!t.disableGutters,style:{transition:e.transitions.create(["margin"],{duration:e.transitions.duration.shortest}),[`&.${Lt.expanded}`]:{margin:"20px 0"}}}]}))),ts=F("span",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(e,t)=>t.expandIconWrapper})(Se(({theme:e})=>({display:"flex",color:(e.vars||e).palette.action.active,transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),[`&.${Lt.expanded}`]:{transform:"rotate(180deg)"}}))),rs=p.forwardRef(function(t,r){const o=_e({props:t,name:"MuiAccordionSummary"}),{children:n,className:s,expandIcon:i,focusVisibleClassName:l,onClick:c,...d}=o,{disabled:u=!1,disableGutters:f,expanded:v,toggle:b}=p.useContext(xn),y=h=>{b&&b(h),c&&c(h)},m={...o,expanded:v,disabled:u,disableGutters:f},x=Za(m);return a.jsxs(Ja,{focusRipple:!1,disableRipple:!0,disabled:u,"aria-expanded":v,className:le(x.root,s),focusVisibleClassName:le(x.focusVisible,l),onClick:y,ref:r,ownerState:m,...d,children:[a.jsx(es,{className:x.content,ownerState:m,children:n}),i&&a.jsx(ts,{className:x.expandIconWrapper,ownerState:m,children:i})]})});var Ee="top",je="bottom",ke="right",we="left",ao="auto",ar=[Ee,je,ke,we],zt="start",or="end",os="clippingParents",bn="viewport",Qt="popper",ns="reference",Ro=ar.reduce(function(e,t){return e.concat([t+"-"+zt,t+"-"+or])},[]),Sn=[].concat(ar,[ao]).reduce(function(e,t){return e.concat([t,t+"-"+zt,t+"-"+or])},[]),as="beforeRead",ss="read",is="afterRead",ls="beforeMain",cs="main",ds="afterMain",us="beforeWrite",ps="write",fs="afterWrite",hs=[as,ss,is,ls,cs,ds,us,ps,fs];function Qe(e){return e?(e.nodeName||"").toLowerCase():null}function Ce(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function At(e){var t=Ce(e).Element;return e instanceof t||e instanceof Element}function Me(e){var t=Ce(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function so(e){if(typeof ShadowRoot>"u")return!1;var t=Ce(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function ms(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var o=t.styles[r]||{},n=t.attributes[r]||{},s=t.elements[r];!Me(s)||!Qe(s)||(Object.assign(s.style,o),Object.keys(n).forEach(function(i){var l=n[i];l===!1?s.removeAttribute(i):s.setAttribute(i,l===!0?"":l)}))})}function gs(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(o){var n=t.elements[o],s=t.attributes[o]||{},i=Object.keys(t.styles.hasOwnProperty(o)?t.styles[o]:r[o]),l=i.reduce(function(c,d){return c[d]="",c},{});!Me(n)||!Qe(n)||(Object.assign(n.style,l),Object.keys(s).forEach(function(c){n.removeAttribute(c)}))})}}const xs={name:"applyStyles",enabled:!0,phase:"write",fn:ms,effect:gs,requires:["computeStyles"]};function qe(e){return e.split("-")[0]}var Dt=Math.max,wr=Math.min,Bt=Math.round;function qr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function vn(){return!/^((?!chrome|android).)*safari/i.test(qr())}function _t(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var o=e.getBoundingClientRect(),n=1,s=1;t&&Me(e)&&(n=e.offsetWidth>0&&Bt(o.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Bt(o.height)/e.offsetHeight||1);var i=At(e)?Ce(e):window,l=i.visualViewport,c=!vn()&&r,d=(o.left+(c&&l?l.offsetLeft:0))/n,u=(o.top+(c&&l?l.offsetTop:0))/s,f=o.width/n,v=o.height/s;return{width:f,height:v,top:u,right:d+f,bottom:u+v,left:d,x:d,y:u}}function io(e){var t=_t(e),r=e.offsetWidth,o=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-o)<=1&&(o=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:o}}function Tn(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&so(r)){var o=t;do{if(o&&e.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function at(e){return Ce(e).getComputedStyle(e)}function bs(e){return["table","td","th"].indexOf(Qe(e))>=0}function vt(e){return((At(e)?e.ownerDocument:e.document)||window.document).documentElement}function Ar(e){return Qe(e)==="html"?e:e.assignedSlot||e.parentNode||(so(e)?e.host:null)||vt(e)}function Oo(e){return!Me(e)||at(e).position==="fixed"?null:e.offsetParent}function Ss(e){var t=/firefox/i.test(qr()),r=/Trident/i.test(qr());if(r&&Me(e)){var o=at(e);if(o.position==="fixed")return null}var n=Ar(e);for(so(n)&&(n=n.host);Me(n)&&["html","body"].indexOf(Qe(n))<0;){var s=at(n);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return n;n=n.parentNode}return null}function sr(e){for(var t=Ce(e),r=Oo(e);r&&bs(r)&&at(r).position==="static";)r=Oo(r);return r&&(Qe(r)==="html"||Qe(r)==="body"&&at(r).position==="static")?t:r||Ss(e)||t}function lo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function er(e,t,r){return Dt(e,wr(t,r))}function vs(e,t,r){var o=er(e,t,r);return o>r?r:o}function yn(){return{top:0,right:0,bottom:0,left:0}}function En(e){return Object.assign({},yn(),e)}function wn(e,t){return t.reduce(function(r,o){return r[o]=e,r},{})}var Ts=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,En(typeof t!="number"?t:wn(t,ar))};function ys(e){var t,r=e.state,o=e.name,n=e.options,s=r.elements.arrow,i=r.modifiersData.popperOffsets,l=qe(r.placement),c=lo(l),d=[we,ke].indexOf(l)>=0,u=d?"height":"width";if(!(!s||!i)){var f=Ts(n.padding,r),v=io(s),b=c==="y"?Ee:we,y=c==="y"?je:ke,m=r.rects.reference[u]+r.rects.reference[c]-i[c]-r.rects.popper[u],x=i[c]-r.rects.reference[c],h=sr(s),w=h?c==="y"?h.clientHeight||0:h.clientWidth||0:0,I=m/2-x/2,E=f[b],D=w-v[u]-f[y],A=w/2-v[u]/2+I,g=er(E,A,D),R=c;r.modifiersData[o]=(t={},t[R]=g,t.centerOffset=g-A,t)}}function Es(e){var t=e.state,r=e.options,o=r.element,n=o===void 0?"[data-popper-arrow]":o;n!=null&&(typeof n=="string"&&(n=t.elements.popper.querySelector(n),!n)||Tn(t.elements.popper,n)&&(t.elements.arrow=n))}const ws={name:"arrow",enabled:!0,phase:"main",fn:ys,effect:Es,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Wt(e){return e.split("-")[1]}var Is={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Cs(e,t){var r=e.x,o=e.y,n=t.devicePixelRatio||1;return{x:Bt(r*n)/n||0,y:Bt(o*n)/n||0}}function Ao(e){var t,r=e.popper,o=e.popperRect,n=e.placement,s=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,u=e.roundOffsets,f=e.isFixed,v=i.x,b=v===void 0?0:v,y=i.y,m=y===void 0?0:y,x=typeof u=="function"?u({x:b,y:m}):{x:b,y:m};b=x.x,m=x.y;var h=i.hasOwnProperty("x"),w=i.hasOwnProperty("y"),I=we,E=Ee,D=window;if(d){var A=sr(r),g="clientHeight",R="clientWidth";if(A===Ce(r)&&(A=vt(r),at(A).position!=="static"&&l==="absolute"&&(g="scrollHeight",R="scrollWidth")),A=A,n===Ee||(n===we||n===ke)&&s===or){E=je;var M=f&&A===D&&D.visualViewport?D.visualViewport.height:A[g];m-=M-o.height,m*=c?1:-1}if(n===we||(n===Ee||n===je)&&s===or){I=ke;var O=f&&A===D&&D.visualViewport?D.visualViewport.width:A[R];b-=O-o.width,b*=c?1:-1}}var C=Object.assign({position:l},d&&Is),$=u===!0?Cs({x:b,y:m},Ce(r)):{x:b,y:m};if(b=$.x,m=$.y,c){var P;return Object.assign({},C,(P={},P[E]=w?"0":"",P[I]=h?"0":"",P.transform=(D.devicePixelRatio||1)<=1?"translate("+b+"px, "+m+"px)":"translate3d("+b+"px, "+m+"px, 0)",P))}return Object.assign({},C,(t={},t[E]=w?m+"px":"",t[I]=h?b+"px":"",t.transform="",t))}function Ds(e){var t=e.state,r=e.options,o=r.gpuAcceleration,n=o===void 0?!0:o,s=r.adaptive,i=s===void 0?!0:s,l=r.roundOffsets,c=l===void 0?!0:l,d={placement:qe(t.placement),variation:Wt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:n,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ao(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ao(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Rs={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Ds,data:{}};var fr={passive:!0};function Os(e){var t=e.state,r=e.instance,o=e.options,n=o.scroll,s=n===void 0?!0:n,i=o.resize,l=i===void 0?!0:i,c=Ce(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&d.forEach(function(u){u.addEventListener("scroll",r.update,fr)}),l&&c.addEventListener("resize",r.update,fr),function(){s&&d.forEach(function(u){u.removeEventListener("scroll",r.update,fr)}),l&&c.removeEventListener("resize",r.update,fr)}}const As={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Os,data:{}};var Ms={left:"right",right:"left",bottom:"top",top:"bottom"};function yr(e){return e.replace(/left|right|bottom|top/g,function(t){return Ms[t]})}var js={start:"end",end:"start"};function Mo(e){return e.replace(/start|end/g,function(t){return js[t]})}function co(e){var t=Ce(e),r=t.pageXOffset,o=t.pageYOffset;return{scrollLeft:r,scrollTop:o}}function uo(e){return _t(vt(e)).left+co(e).scrollLeft}function ks(e,t){var r=Ce(e),o=vt(e),n=r.visualViewport,s=o.clientWidth,i=o.clientHeight,l=0,c=0;if(n){s=n.width,i=n.height;var d=vn();(d||!d&&t==="fixed")&&(l=n.offsetLeft,c=n.offsetTop)}return{width:s,height:i,x:l+uo(e),y:c}}function Ps(e){var t,r=vt(e),o=co(e),n=(t=e.ownerDocument)==null?void 0:t.body,s=Dt(r.scrollWidth,r.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),i=Dt(r.scrollHeight,r.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0),l=-o.scrollLeft+uo(e),c=-o.scrollTop;return at(n||r).direction==="rtl"&&(l+=Dt(r.clientWidth,n?n.clientWidth:0)-s),{width:s,height:i,x:l,y:c}}function po(e){var t=at(e),r=t.overflow,o=t.overflowX,n=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+n+o)}function In(e){return["html","body","#document"].indexOf(Qe(e))>=0?e.ownerDocument.body:Me(e)&&po(e)?e:In(Ar(e))}function tr(e,t){var r;t===void 0&&(t=[]);var o=In(e),n=o===((r=e.ownerDocument)==null?void 0:r.body),s=Ce(o),i=n?[s].concat(s.visualViewport||[],po(o)?o:[]):o,l=t.concat(i);return n?l:l.concat(tr(Ar(i)))}function Qr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Fs(e,t){var r=_t(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function jo(e,t,r){return t===bn?Qr(ks(e,r)):At(t)?Fs(t,r):Qr(Ps(vt(e)))}function Ns(e){var t=tr(Ar(e)),r=["absolute","fixed"].indexOf(at(e).position)>=0,o=r&&Me(e)?sr(e):e;return At(o)?t.filter(function(n){return At(n)&&Tn(n,o)&&Qe(n)!=="body"}):[]}function Ls(e,t,r,o){var n=t==="clippingParents"?Ns(e):[].concat(t),s=[].concat(n,[r]),i=s[0],l=s.reduce(function(c,d){var u=jo(e,d,o);return c.top=Dt(u.top,c.top),c.right=wr(u.right,c.right),c.bottom=wr(u.bottom,c.bottom),c.left=Dt(u.left,c.left),c},jo(e,i,o));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Cn(e){var t=e.reference,r=e.element,o=e.placement,n=o?qe(o):null,s=o?Wt(o):null,i=t.x+t.width/2-r.width/2,l=t.y+t.height/2-r.height/2,c;switch(n){case Ee:c={x:i,y:t.y-r.height};break;case je:c={x:i,y:t.y+t.height};break;case ke:c={x:t.x+t.width,y:l};break;case we:c={x:t.x-r.width,y:l};break;default:c={x:t.x,y:t.y}}var d=n?lo(n):null;if(d!=null){var u=d==="y"?"height":"width";switch(s){case zt:c[d]=c[d]-(t[u]/2-r[u]/2);break;case or:c[d]=c[d]+(t[u]/2-r[u]/2);break}}return c}function nr(e,t){t===void 0&&(t={});var r=t,o=r.placement,n=o===void 0?e.placement:o,s=r.strategy,i=s===void 0?e.strategy:s,l=r.boundary,c=l===void 0?os:l,d=r.rootBoundary,u=d===void 0?bn:d,f=r.elementContext,v=f===void 0?Qt:f,b=r.altBoundary,y=b===void 0?!1:b,m=r.padding,x=m===void 0?0:m,h=En(typeof x!="number"?x:wn(x,ar)),w=v===Qt?ns:Qt,I=e.rects.popper,E=e.elements[y?w:v],D=Ls(At(E)?E:E.contextElement||vt(e.elements.popper),c,u,i),A=_t(e.elements.reference),g=Cn({reference:A,element:I,strategy:"absolute",placement:n}),R=Qr(Object.assign({},I,g)),M=v===Qt?R:A,O={top:D.top-M.top+h.top,bottom:M.bottom-D.bottom+h.bottom,left:D.left-M.left+h.left,right:M.right-D.right+h.right},C=e.modifiersData.offset;if(v===Qt&&C){var $=C[n];Object.keys(O).forEach(function(P){var B=[ke,je].indexOf(P)>=0?1:-1,G=[Ee,je].indexOf(P)>=0?"y":"x";O[P]+=$[G]*B})}return O}function $s(e,t){t===void 0&&(t={});var r=t,o=r.placement,n=r.boundary,s=r.rootBoundary,i=r.padding,l=r.flipVariations,c=r.allowedAutoPlacements,d=c===void 0?Sn:c,u=Wt(o),f=u?l?Ro:Ro.filter(function(y){return Wt(y)===u}):ar,v=f.filter(function(y){return d.indexOf(y)>=0});v.length===0&&(v=f);var b=v.reduce(function(y,m){return y[m]=nr(e,{placement:m,boundary:n,rootBoundary:s,padding:i})[qe(m)],y},{});return Object.keys(b).sort(function(y,m){return b[y]-b[m]})}function zs(e){if(qe(e)===ao)return[];var t=yr(e);return[Mo(e),t,Mo(t)]}function Bs(e){var t=e.state,r=e.options,o=e.name;if(!t.modifiersData[o]._skip){for(var n=r.mainAxis,s=n===void 0?!0:n,i=r.altAxis,l=i===void 0?!0:i,c=r.fallbackPlacements,d=r.padding,u=r.boundary,f=r.rootBoundary,v=r.altBoundary,b=r.flipVariations,y=b===void 0?!0:b,m=r.allowedAutoPlacements,x=t.options.placement,h=qe(x),w=h===x,I=c||(w||!y?[yr(x)]:zs(x)),E=[x].concat(I).reduce(function(ie,pe){return ie.concat(qe(pe)===ao?$s(t,{placement:pe,boundary:u,rootBoundary:f,padding:d,flipVariations:y,allowedAutoPlacements:m}):pe)},[]),D=t.rects.reference,A=t.rects.popper,g=new Map,R=!0,M=E[0],O=0;O<E.length;O++){var C=E[O],$=qe(C),P=Wt(C)===zt,B=[Ee,je].indexOf($)>=0,G=B?"width":"height",Y=nr(t,{placement:C,boundary:u,rootBoundary:f,altBoundary:v,padding:d}),_=B?P?ke:we:P?je:Ee;D[G]>A[G]&&(_=yr(_));var ee=yr(_),ae=[];if(s&&ae.push(Y[$]<=0),l&&ae.push(Y[_]<=0,Y[ee]<=0),ae.every(function(ie){return ie})){M=C,R=!1;break}g.set(C,ae)}if(R)for(var K=y?3:1,te=function(pe){var N=E.find(function(Z){var q=g.get(Z);if(q)return q.slice(0,pe).every(function(ve){return ve})});if(N)return M=N,"break"},se=K;se>0;se--){var De=te(se);if(De==="break")break}t.placement!==M&&(t.modifiersData[o]._skip=!0,t.placement=M,t.reset=!0)}}const _s={name:"flip",enabled:!0,phase:"main",fn:Bs,requiresIfExists:["offset"],data:{_skip:!1}};function ko(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function Po(e){return[Ee,ke,je,we].some(function(t){return e[t]>=0})}function Ws(e){var t=e.state,r=e.name,o=t.rects.reference,n=t.rects.popper,s=t.modifiersData.preventOverflow,i=nr(t,{elementContext:"reference"}),l=nr(t,{altBoundary:!0}),c=ko(i,o),d=ko(l,n,s),u=Po(c),f=Po(d);t.modifiersData[r]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}const Hs={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Ws};function Ys(e,t,r){var o=qe(e),n=[we,Ee].indexOf(o)>=0?-1:1,s=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,i=s[0],l=s[1];return i=i||0,l=(l||0)*n,[we,ke].indexOf(o)>=0?{x:l,y:i}:{x:i,y:l}}function Vs(e){var t=e.state,r=e.options,o=e.name,n=r.offset,s=n===void 0?[0,0]:n,i=Sn.reduce(function(u,f){return u[f]=Ys(f,t.rects,s),u},{}),l=i[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[o]=i}const Us={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Vs};function Gs(e){var t=e.state,r=e.name;t.modifiersData[r]=Cn({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const qs={name:"popperOffsets",enabled:!0,phase:"read",fn:Gs,data:{}};function Qs(e){return e==="x"?"y":"x"}function Xs(e){var t=e.state,r=e.options,o=e.name,n=r.mainAxis,s=n===void 0?!0:n,i=r.altAxis,l=i===void 0?!1:i,c=r.boundary,d=r.rootBoundary,u=r.altBoundary,f=r.padding,v=r.tether,b=v===void 0?!0:v,y=r.tetherOffset,m=y===void 0?0:y,x=nr(t,{boundary:c,rootBoundary:d,padding:f,altBoundary:u}),h=qe(t.placement),w=Wt(t.placement),I=!w,E=lo(h),D=Qs(E),A=t.modifiersData.popperOffsets,g=t.rects.reference,R=t.rects.popper,M=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,O=typeof M=="number"?{mainAxis:M,altAxis:M}:Object.assign({mainAxis:0,altAxis:0},M),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,$={x:0,y:0};if(A){if(s){var P,B=E==="y"?Ee:we,G=E==="y"?je:ke,Y=E==="y"?"height":"width",_=A[E],ee=_+x[B],ae=_-x[G],K=b?-R[Y]/2:0,te=w===zt?g[Y]:R[Y],se=w===zt?-R[Y]:-g[Y],De=t.elements.arrow,ie=b&&De?io(De):{width:0,height:0},pe=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:yn(),N=pe[B],Z=pe[G],q=er(0,g[Y],ie[Y]),ve=I?g[Y]/2-K-q-N-O.mainAxis:te-q-N-O.mainAxis,Pe=I?-g[Y]/2+K+q+Z+O.mainAxis:se+q+Z+O.mainAxis,Fe=t.elements.arrow&&sr(t.elements.arrow),Te=Fe?E==="y"?Fe.clientTop||0:Fe.clientLeft||0:0,st=(P=C==null?void 0:C[E])!=null?P:0,He=_+ve-st-Te,it=_+Pe-st,lt=er(b?wr(ee,He):ee,_,b?Dt(ae,it):ae);A[E]=lt,$[E]=lt-_}if(l){var ce,ye=E==="x"?Ee:we,ct=E==="x"?je:ke,fe=A[D],Ne=D==="y"?"height":"width",dt=fe+x[ye],ut=fe-x[ct],Tt=[Ee,we].indexOf(h)!==-1,Mt=(ce=C==null?void 0:C[D])!=null?ce:0,jt=Tt?dt:fe-g[Ne]-R[Ne]-Mt+O.altAxis,pt=Tt?fe+g[Ne]+R[Ne]-Mt-O.altAxis:ut,yt=b&&Tt?vs(jt,fe,pt):er(b?jt:dt,fe,b?pt:ut);A[D]=yt,$[D]=yt-fe}t.modifiersData[o]=$}}const Ks={name:"preventOverflow",enabled:!0,phase:"main",fn:Xs,requiresIfExists:["offset"]};function Zs(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Js(e){return e===Ce(e)||!Me(e)?co(e):Zs(e)}function ei(e){var t=e.getBoundingClientRect(),r=Bt(t.width)/e.offsetWidth||1,o=Bt(t.height)/e.offsetHeight||1;return r!==1||o!==1}function ti(e,t,r){r===void 0&&(r=!1);var o=Me(t),n=Me(t)&&ei(t),s=vt(t),i=_t(e,n,r),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(o||!o&&!r)&&((Qe(t)!=="body"||po(s))&&(l=Js(t)),Me(t)?(c=_t(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=uo(s))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function ri(e){var t=new Map,r=new Set,o=[];e.forEach(function(s){t.set(s.name,s)});function n(s){r.add(s.name);var i=[].concat(s.requires||[],s.requiresIfExists||[]);i.forEach(function(l){if(!r.has(l)){var c=t.get(l);c&&n(c)}}),o.push(s)}return e.forEach(function(s){r.has(s.name)||n(s)}),o}function oi(e){var t=ri(e);return hs.reduce(function(r,o){return r.concat(t.filter(function(n){return n.phase===o}))},[])}function ni(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function ai(e){var t=e.reduce(function(r,o){var n=r[o.name];return r[o.name]=n?Object.assign({},n,o,{options:Object.assign({},n.options,o.options),data:Object.assign({},n.data,o.data)}):o,r},{});return Object.keys(t).map(function(r){return t[r]})}var Fo={placement:"bottom",modifiers:[],strategy:"absolute"};function No(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(o){return!(o&&typeof o.getBoundingClientRect=="function")})}function si(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,o=r===void 0?[]:r,n=t.defaultOptions,s=n===void 0?Fo:n;return function(l,c,d){d===void 0&&(d=s);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},Fo,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],v=!1,b={state:u,setOptions:function(h){var w=typeof h=="function"?h(u.options):h;m(),u.options=Object.assign({},s,u.options,w),u.scrollParents={reference:At(l)?tr(l):l.contextElement?tr(l.contextElement):[],popper:tr(c)};var I=oi(ai([].concat(o,u.options.modifiers)));return u.orderedModifiers=I.filter(function(E){return E.enabled}),y(),b.update()},forceUpdate:function(){if(!v){var h=u.elements,w=h.reference,I=h.popper;if(No(w,I)){u.rects={reference:ti(w,sr(I),u.options.strategy==="fixed"),popper:io(I)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(O){return u.modifiersData[O.name]=Object.assign({},O.data)});for(var E=0;E<u.orderedModifiers.length;E++){if(u.reset===!0){u.reset=!1,E=-1;continue}var D=u.orderedModifiers[E],A=D.fn,g=D.options,R=g===void 0?{}:g,M=D.name;typeof A=="function"&&(u=A({state:u,options:R,name:M,instance:b})||u)}}}},update:ni(function(){return new Promise(function(x){b.forceUpdate(),x(u)})}),destroy:function(){m(),v=!0}};if(!No(l,c))return b;b.setOptions(d).then(function(x){!v&&d.onFirstUpdate&&d.onFirstUpdate(x)});function y(){u.orderedModifiers.forEach(function(x){var h=x.name,w=x.options,I=w===void 0?{}:w,E=x.effect;if(typeof E=="function"){var D=E({state:u,name:h,instance:b,options:I}),A=function(){};f.push(D||A)}})}function m(){f.forEach(function(x){return x()}),f=[]}return b}}var ii=[As,qs,Rs,xs,Us,_s,Ks,ws,Hs],li=si({defaultModifiers:ii});function ci(e){return Ke("MuiPopper",e)}Xe("MuiPopper",["root"]);function di(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Xr(e){return typeof e=="function"?e():e}function ui(e){return e.nodeType!==void 0}const pi=e=>{const{classes:t}=e;return We({root:["root"]},ci,t)},fi={},hi=p.forwardRef(function(t,r){const{anchorEl:o,children:n,direction:s,disablePortal:i,modifiers:l,open:c,placement:d,popperOptions:u,popperRef:f,slotProps:v={},slots:b={},TransitionProps:y,ownerState:m,...x}=t,h=p.useRef(null),w=Er(h,r),I=p.useRef(null),E=Er(I,f),D=p.useRef(E);Yr(()=>{D.current=E},[E]),p.useImperativeHandle(f,()=>I.current,[]);const A=di(d,s),[g,R]=p.useState(A),[M,O]=p.useState(Xr(o));p.useEffect(()=>{I.current&&I.current.forceUpdate()}),p.useEffect(()=>{o&&O(Xr(o))},[o]),Yr(()=>{if(!M||!c)return;const G=ee=>{R(ee.placement)};let Y=[{name:"preventOverflow",options:{altBoundary:i}},{name:"flip",options:{altBoundary:i}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{G(ee)}}];l!=null&&(Y=Y.concat(l)),u&&u.modifiers!=null&&(Y=Y.concat(u.modifiers));const _=li(M,h.current,{placement:A,...u,modifiers:Y});return D.current(_),()=>{_.destroy(),D.current(null)}},[M,i,l,c,u,A]);const C={placement:g};y!==null&&(C.TransitionProps=y);const $=pi(t),P=b.root??"div",B=Ot({elementType:P,externalSlotProps:v.root,externalForwardedProps:x,additionalProps:{role:"tooltip",ref:w},ownerState:t,className:$.root});return a.jsx(P,{...B,children:typeof n=="function"?n(C):n})}),mi=p.forwardRef(function(t,r){const{anchorEl:o,children:n,container:s,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:u,placement:f="bottom",popperOptions:v=fi,popperRef:b,style:y,transition:m=!1,slotProps:x={},slots:h={},...w}=t,[I,E]=p.useState(!0),D=()=>{E(!1)},A=()=>{E(!0)};if(!c&&!u&&(!m||I))return null;let g;if(s)g=s;else if(o){const O=Xr(o);g=O&&ui(O)?Hr(O).body:Hr(null).body}const R=!u&&c&&(!m||I)?"none":void 0,M=m?{in:u,onEnter:D,onExited:A}:void 0;return a.jsx(ca,{disablePortal:l,container:g,children:a.jsx(hi,{anchorEl:o,direction:i,disablePortal:l,modifiers:d,ref:r,open:m?!I:u,placement:f,popperOptions:v,popperRef:b,slotProps:x,slots:h,...w,style:{position:"fixed",top:0,left:0,display:R,...y},TransitionProps:M,children:n})})}),gi=F(mi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Dn=p.forwardRef(function(t,r){const o=Or(),n=_e({props:t,name:"MuiPopper"}),{anchorEl:s,component:i,components:l,componentsProps:c,container:d,disablePortal:u,keepMounted:f,modifiers:v,open:b,placement:y,popperOptions:m,popperRef:x,transition:h,slots:w,slotProps:I,...E}=n,D=(w==null?void 0:w.root)??(l==null?void 0:l.Root),A={anchorEl:s,container:d,disablePortal:u,keepMounted:f,modifiers:v,open:b,placement:y,popperOptions:m,popperRef:x,transition:h,...E};return a.jsx(gi,{as:i,direction:o?"rtl":"ltr",slots:{root:D},slotProps:I??c,...A,ref:r})});function xi(e){const{badgeContent:t,invisible:r=!1,max:o=99,showZero:n=!1}=e,s=gn({badgeContent:t,max:o});let i=r;r===!1&&t===0&&!n&&(i=!0);const{badgeContent:l,max:c=o}=i?s:e,d=l&&Number(l)>c?`${c}+`:l;return{badgeContent:l,invisible:i,max:c,displayValue:d}}function bi(e){return Ke("MuiBadge",e)}const ft=Xe("MuiBadge",["root","badge","dot","standard","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft","invisible","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","overlapRectangular","overlapCircular","anchorOriginTopLeftCircular","anchorOriginTopLeftRectangular","anchorOriginTopRightCircular","anchorOriginTopRightRectangular","anchorOriginBottomLeftCircular","anchorOriginBottomLeftRectangular","anchorOriginBottomRightCircular","anchorOriginBottomRightRectangular"]),Fr=10,Nr=4,Si=e=>{const{color:t,anchorOrigin:r,invisible:o,overlap:n,variant:s,classes:i={}}=e,l={root:["root"],badge:["badge",s,o&&"invisible",`anchorOrigin${be(r.vertical)}${be(r.horizontal)}`,`anchorOrigin${be(r.vertical)}${be(r.horizontal)}${be(n)}`,`overlap${be(n)}`,t!=="default"&&`color${be(t)}`]};return We(l,bi,i)},vi=F("span",{name:"MuiBadge",slot:"Root",overridesResolver:(e,t)=>t.root})({position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0}),Ti=F("span",{name:"MuiBadge",slot:"Badge",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.badge,t[r.variant],t[`anchorOrigin${be(r.anchorOrigin.vertical)}${be(r.anchorOrigin.horizontal)}${be(r.overlap)}`],r.color!=="default"&&t[`color${be(r.color)}`],r.invisible&&t.invisible]}})(Se(({theme:e})=>({display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(12),minWidth:Fr*2,lineHeight:1,padding:"0 6px",height:Fr*2,borderRadius:Fr,zIndex:1,transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.enteringScreen}),variants:[...Object.entries(e.palette).filter(da(["contrastText"])).map(([t])=>({props:{color:t},style:{backgroundColor:(e.vars||e).palette[t].main,color:(e.vars||e).palette[t].contrastText}})),{props:{variant:"dot"},style:{borderRadius:Nr,height:Nr*2,minWidth:Nr*2,padding:0}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="rectangular",style:{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${ft.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="rectangular",style:{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${ft.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="rectangular",style:{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${ft.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="rectangular",style:{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${ft.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="circular",style:{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${ft.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="circular",style:{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${ft.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="circular",style:{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${ft.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="circular",style:{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${ft.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}}},{props:{invisible:!0},style:{transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.leavingScreen})}}]})));function Lo(e){return{vertical:(e==null?void 0:e.vertical)??"top",horizontal:(e==null?void 0:e.horizontal)??"right"}}const Xt=p.forwardRef(function(t,r){const o=_e({props:t,name:"MuiBadge"}),{anchorOrigin:n,className:s,classes:i,component:l,components:c={},componentsProps:d={},children:u,overlap:f="rectangular",color:v="default",invisible:b=!1,max:y=99,badgeContent:m,slots:x,slotProps:h,showZero:w=!1,variant:I="standard",...E}=o,{badgeContent:D,invisible:A,max:g,displayValue:R}=xi({max:y,invisible:b,badgeContent:m,showZero:w}),M=gn({anchorOrigin:Lo(n),color:v,overlap:f,variant:I,badgeContent:m}),O=A||D==null&&I!=="dot",{color:C=v,overlap:$=f,anchorOrigin:P,variant:B=I}=O?M:o,G=Lo(P),Y=B!=="dot"?R:void 0,_={...o,badgeContent:D,invisible:O,max:g,displayValue:Y,showZero:w,anchorOrigin:G,color:C,overlap:$,variant:B},ee=Si(_),ae=(x==null?void 0:x.root)??c.Root??vi,K=(x==null?void 0:x.badge)??c.Badge??Ti,te=(h==null?void 0:h.root)??d.root,se=(h==null?void 0:h.badge)??d.badge,De=Ot({elementType:ae,externalSlotProps:te,externalForwardedProps:E,additionalProps:{ref:r,as:l},ownerState:_,className:le(te==null?void 0:te.className,ee.root,s)}),ie=Ot({elementType:K,externalSlotProps:se,ownerState:_,className:le(ee.badge,se==null?void 0:se.className)});return a.jsxs(ae,{...De,children:[u,a.jsx(K,{...ie,children:Y})]})}),yi=e=>{const{alignItems:t,classes:r}=e;return We({root:["root",t==="flex-start"&&"alignItemsFlexStart"]},ba,r)},Ei=F("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.alignItems==="flex-start"&&t.alignItemsFlexStart]}})(Se(({theme:e})=>({minWidth:56,color:(e.vars||e).palette.action.active,flexShrink:0,display:"inline-flex",variants:[{props:{alignItems:"flex-start"},style:{marginTop:8}}]}))),$o=p.forwardRef(function(t,r){const o=_e({props:t,name:"MuiListItemIcon"}),{className:n,...s}=o,i=p.useContext(ua),l={...o,alignItems:i.alignItems},c=yi(l);return a.jsx(Ei,{className:le(c.root,n),ownerState:l,ref:r,...s})});function wi(e){return Ke("MuiTooltip",e)}const re=Xe("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]);function Ii(e){return Math.round(e*1e5)/1e5}const Ci=e=>{const{classes:t,disableInteractive:r,arrow:o,touch:n,placement:s}=e,i={popper:["popper",!r&&"popperInteractive",o&&"popperArrow"],tooltip:["tooltip",o&&"tooltipArrow",n&&"touch",`tooltipPlacement${be(s.split("-")[0])}`],arrow:["arrow"]};return We(i,wi,t)},Di=F(Dn,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.popper,!r.disableInteractive&&t.popperInteractive,r.arrow&&t.popperArrow,!r.open&&t.popperClose]}})(Se(({theme:e})=>({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none",variants:[{props:({ownerState:t})=>!t.disableInteractive,style:{pointerEvents:"auto"}},{props:({open:t})=>!t,style:{pointerEvents:"none"}},{props:({ownerState:t})=>t.arrow,style:{[`&[data-popper-placement*="bottom"] .${re.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${re.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${re.arrow}`]:{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}},[`&[data-popper-placement*="left"] .${re.arrow}`]:{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}}}},{props:({ownerState:t})=>t.arrow&&!t.isRtl,style:{[`&[data-popper-placement*="right"] .${re.arrow}`]:{left:0,marginLeft:"-0.71em"}}},{props:({ownerState:t})=>t.arrow&&!!t.isRtl,style:{[`&[data-popper-placement*="right"] .${re.arrow}`]:{right:0,marginRight:"-0.71em"}}},{props:({ownerState:t})=>t.arrow&&!t.isRtl,style:{[`&[data-popper-placement*="left"] .${re.arrow}`]:{right:0,marginRight:"-0.71em"}}},{props:({ownerState:t})=>t.arrow&&!!t.isRtl,style:{[`&[data-popper-placement*="left"] .${re.arrow}`]:{left:0,marginLeft:"-0.71em"}}}]}))),Ri=F("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.tooltip,r.touch&&t.touch,r.arrow&&t.tooltipArrow,t[`tooltipPlacement${be(r.placement.split("-")[0])}`]]}})(Se(({theme:e})=>({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:an(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium,[`.${re.popper}[data-popper-placement*="left"] &`]:{transformOrigin:"right center"},[`.${re.popper}[data-popper-placement*="right"] &`]:{transformOrigin:"left center"},[`.${re.popper}[data-popper-placement*="top"] &`]:{transformOrigin:"center bottom",marginBottom:"14px"},[`.${re.popper}[data-popper-placement*="bottom"] &`]:{transformOrigin:"center top",marginTop:"14px"},variants:[{props:({ownerState:t})=>t.arrow,style:{position:"relative",margin:0}},{props:({ownerState:t})=>t.touch,style:{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Ii(16/14)}em`,fontWeight:e.typography.fontWeightRegular}},{props:({ownerState:t})=>!t.isRtl,style:{[`.${re.popper}[data-popper-placement*="left"] &`]:{marginRight:"14px"},[`.${re.popper}[data-popper-placement*="right"] &`]:{marginLeft:"14px"}}},{props:({ownerState:t})=>!t.isRtl&&t.touch,style:{[`.${re.popper}[data-popper-placement*="left"] &`]:{marginRight:"24px"},[`.${re.popper}[data-popper-placement*="right"] &`]:{marginLeft:"24px"}}},{props:({ownerState:t})=>!!t.isRtl,style:{[`.${re.popper}[data-popper-placement*="left"] &`]:{marginLeft:"14px"},[`.${re.popper}[data-popper-placement*="right"] &`]:{marginRight:"14px"}}},{props:({ownerState:t})=>!!t.isRtl&&t.touch,style:{[`.${re.popper}[data-popper-placement*="left"] &`]:{marginLeft:"24px"},[`.${re.popper}[data-popper-placement*="right"] &`]:{marginRight:"24px"}}},{props:({ownerState:t})=>t.touch,style:{[`.${re.popper}[data-popper-placement*="top"] &`]:{marginBottom:"24px"}}},{props:({ownerState:t})=>t.touch,style:{[`.${re.popper}[data-popper-placement*="bottom"] &`]:{marginTop:"24px"}}}]}))),Oi=F("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(Se(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:an(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}})));let hr=!1;const zo=new ma;let Kt={x:0,y:0};function mr(e,t){return(r,...o)=>{t&&t(r,...o),e(r,...o)}}const Rn=p.forwardRef(function(t,r){const o=_e({props:t,name:"MuiTooltip"}),{arrow:n=!1,children:s,classes:i,components:l={},componentsProps:c={},describeChild:d=!1,disableFocusListener:u=!1,disableHoverListener:f=!1,disableInteractive:v=!1,disableTouchListener:b=!1,enterDelay:y=100,enterNextDelay:m=0,enterTouchDelay:x=700,followCursor:h=!1,id:w,leaveDelay:I=0,leaveTouchDelay:E=1500,onClose:D,onOpen:A,open:g,placement:R="bottom",PopperComponent:M,PopperProps:O={},slotProps:C={},slots:$={},title:P,TransitionComponent:B,TransitionProps:G,...Y}=o,_=p.isValidElement(s)?s:a.jsx("span",{children:s}),ee=eo(),ae=Or(),[K,te]=p.useState(),[se,De]=p.useState(null),ie=p.useRef(!1),pe=v||h,N=Zt(),Z=Zt(),q=Zt(),ve=Zt(),[Pe,Fe]=nn({controlled:g,default:!1,name:"Tooltip",state:"open"});let Te=Pe;const st=pa(w),He=p.useRef(),it=Jt(()=>{He.current!==void 0&&(document.body.style.WebkitUserSelect=He.current,He.current=void 0),ve.clear()});p.useEffect(()=>it,[it]);const lt=W=>{zo.clear(),hr=!0,Fe(!0),A&&!Te&&A(W)},ce=Jt(W=>{zo.start(800+I,()=>{hr=!1}),Fe(!1),D&&Te&&D(W),N.start(ee.transitions.duration.shortest,()=>{ie.current=!1})}),ye=W=>{ie.current&&W.type!=="touchstart"||(K&&K.removeAttribute("title"),Z.clear(),q.clear(),y||hr&&m?Z.start(hr?m:y,()=>{lt(W)}):lt(W))},ct=W=>{Z.clear(),q.start(I,()=>{ce(W)})},[,fe]=p.useState(!1),Ne=W=>{Co(W.target)||(fe(!1),ct(W))},dt=W=>{K||te(W.currentTarget),Co(W.target)&&(fe(!0),ye(W))},ut=W=>{ie.current=!0;const Le=_.props;Le.onTouchStart&&Le.onTouchStart(W)},Tt=W=>{ut(W),q.clear(),N.clear(),it(),He.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",ve.start(x,()=>{document.body.style.WebkitUserSelect=He.current,ye(W)})},Mt=W=>{_.props.onTouchEnd&&_.props.onTouchEnd(W),it(),q.start(E,()=>{ce(W)})};p.useEffect(()=>{if(!Te)return;function W(Le){Le.key==="Escape"&&ce(Le)}return document.addEventListener("keydown",W),()=>{document.removeEventListener("keydown",W)}},[ce,Te]);const jt=Er(fa(_),te,r);!P&&P!==0&&(Te=!1);const pt=p.useRef(),yt=W=>{const Le=_.props;Le.onMouseMove&&Le.onMouseMove(W),Kt={x:W.clientX,y:W.clientY},pt.current&&pt.current.update()},Ye={},kt=typeof P=="string";d?(Ye.title=!Te&&kt&&!f?P:null,Ye["aria-describedby"]=Te?st:null):(Ye["aria-label"]=kt?P:null,Ye["aria-labelledby"]=Te&&!kt?st:null);const he={...Ye,...Y,..._.props,className:le(Y.className,_.props.className),onTouchStart:ut,ref:jt,...h?{onMouseMove:yt}:{}},Et={};b||(he.onTouchStart=Tt,he.onTouchEnd=Mt),f||(he.onMouseOver=mr(ye,he.onMouseOver),he.onMouseLeave=mr(ct,he.onMouseLeave),pe||(Et.onMouseOver=ye,Et.onMouseLeave=ct)),u||(he.onFocus=mr(dt,he.onFocus),he.onBlur=mr(Ne,he.onBlur),pe||(Et.onFocus=dt,Et.onBlur=Ne));const Ze={...o,isRtl:ae,arrow:n,disableInteractive:pe,placement:R,PopperComponentProp:M,touch:ie.current},ge=typeof C.popper=="function"?C.popper(Ze):C.popper,k=p.useMemo(()=>{var Le,wo;let W=[{name:"arrow",enabled:!!se,options:{element:se,padding:4}}];return(Le=O.popperOptions)!=null&&Le.modifiers&&(W=W.concat(O.popperOptions.modifiers)),(wo=ge==null?void 0:ge.popperOptions)!=null&&wo.modifiers&&(W=W.concat(ge.popperOptions.modifiers)),{...O.popperOptions,...ge==null?void 0:ge.popperOptions,modifiers:W}},[se,O.popperOptions,ge==null?void 0:ge.popperOptions]),j=Ci(Ze),V=typeof C.transition=="function"?C.transition(Ze):C.transition,H={slots:{popper:l.Popper,transition:l.Transition??B,tooltip:l.Tooltip,arrow:l.Arrow,...$},slotProps:{arrow:C.arrow??c.arrow,popper:{...O,...ge??c.popper},tooltip:C.tooltip??c.tooltip,transition:{...G,...V??c.transition}}},[X,Re]=Ft("popper",{elementType:Di,externalForwardedProps:H,ownerState:Ze,className:le(j.popper,O==null?void 0:O.className)}),[Je,wt]=Ft("transition",{elementType:ha,externalForwardedProps:H,ownerState:Ze}),[ur,qt]=Ft("tooltip",{elementType:Ri,className:j.tooltip,externalForwardedProps:H,ownerState:Ze}),[aa,sa]=Ft("arrow",{elementType:Oi,className:j.arrow,externalForwardedProps:H,ownerState:Ze,ref:De});return a.jsxs(p.Fragment,{children:[p.cloneElement(_,he),a.jsx(X,{as:M??Dn,placement:R,anchorEl:h?{getBoundingClientRect:()=>({top:Kt.y,left:Kt.x,right:Kt.x,bottom:Kt.y,width:0,height:0})}:K,popperRef:pt,open:K?Te:!1,id:st,transition:!0,...Et,...Re,popperOptions:k,children:({TransitionProps:W})=>a.jsx(Je,{timeout:ee.transitions.duration.shorter,...W,...wt,children:a.jsxs(ur,{...qt,children:[P,n?a.jsx(aa,{...sa}):null]})})})]})});function Ai(e){return Ke("MuiTab",e)}const Oe=Xe("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper","icon"]),Mi=e=>{const{classes:t,textColor:r,fullWidth:o,wrapped:n,icon:s,label:i,selected:l,disabled:c}=e,d={root:["root",s&&i&&"labelIcon",`textColor${be(r)}`,o&&"fullWidth",n&&"wrapped",l&&"selected",c&&"disabled"],icon:["iconWrapper","icon"]};return We(d,Ai,t)},ji=F(to,{name:"MuiTab",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.label&&r.icon&&t.labelIcon,t[`textColor${be(r.textColor)}`],r.fullWidth&&t.fullWidth,r.wrapped&&t.wrapped,{[`& .${Oe.iconWrapper}`]:t.iconWrapper},{[`& .${Oe.icon}`]:t.icon}]}})(Se(({theme:e})=>({...e.typography.button,maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center",lineHeight:1.25,variants:[{props:({ownerState:t})=>t.label&&(t.iconPosition==="top"||t.iconPosition==="bottom"),style:{flexDirection:"column"}},{props:({ownerState:t})=>t.label&&t.iconPosition!=="top"&&t.iconPosition!=="bottom",style:{flexDirection:"row"}},{props:({ownerState:t})=>t.icon&&t.label,style:{minHeight:72,paddingTop:9,paddingBottom:9}},{props:({ownerState:t,iconPosition:r})=>t.icon&&t.label&&r==="top",style:{[`& > .${Oe.icon}`]:{marginBottom:6}}},{props:({ownerState:t,iconPosition:r})=>t.icon&&t.label&&r==="bottom",style:{[`& > .${Oe.icon}`]:{marginTop:6}}},{props:({ownerState:t,iconPosition:r})=>t.icon&&t.label&&r==="start",style:{[`& > .${Oe.icon}`]:{marginRight:e.spacing(1)}}},{props:({ownerState:t,iconPosition:r})=>t.icon&&t.label&&r==="end",style:{[`& > .${Oe.icon}`]:{marginLeft:e.spacing(1)}}},{props:{textColor:"inherit"},style:{color:"inherit",opacity:.6,[`&.${Oe.selected}`]:{opacity:1},[`&.${Oe.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}}},{props:{textColor:"primary"},style:{color:(e.vars||e).palette.text.secondary,[`&.${Oe.selected}`]:{color:(e.vars||e).palette.primary.main},[`&.${Oe.disabled}`]:{color:(e.vars||e).palette.text.disabled}}},{props:{textColor:"secondary"},style:{color:(e.vars||e).palette.text.secondary,[`&.${Oe.selected}`]:{color:(e.vars||e).palette.secondary.main},[`&.${Oe.disabled}`]:{color:(e.vars||e).palette.text.disabled}}},{props:({ownerState:t})=>t.fullWidth,style:{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"}},{props:({ownerState:t})=>t.wrapped,style:{fontSize:e.typography.pxToRem(12)}}]}))),ki=p.forwardRef(function(t,r){const o=_e({props:t,name:"MuiTab"}),{className:n,disabled:s=!1,disableFocusRipple:i=!1,fullWidth:l,icon:c,iconPosition:d="top",indicator:u,label:f,onChange:v,onClick:b,onFocus:y,selected:m,selectionFollowsFocus:x,textColor:h="inherit",value:w,wrapped:I=!1,...E}=o,D={...o,disabled:s,disableFocusRipple:i,selected:m,icon:!!c,iconPosition:d,label:!!f,fullWidth:l,textColor:h,wrapped:I},A=Mi(D),g=c&&f&&p.isValidElement(c)?p.cloneElement(c,{className:le(A.icon,c.props.className)}):c,R=O=>{!m&&v&&v(O,w),b&&b(O)},M=O=>{x&&!m&&v&&v(O,w),y&&y(O)};return a.jsxs(ji,{focusRipple:!i,className:le(A.root,n),ref:r,role:"tab","aria-selected":m,disabled:s,onClick:R,onFocus:M,ownerState:D,tabIndex:m?0:-1,...E,children:[d==="top"||d==="start"?a.jsxs(p.Fragment,{children:[g,f]}):a.jsxs(p.Fragment,{children:[f,g]}),u]})}),Pi=Ie(a.jsx("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft"),Fi=Ie(a.jsx("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight");function Ni(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}function Li(e,t,r,o={},n=()=>{}){const{ease:s=Ni,duration:i=300}=o;let l=null;const c=t[e];let d=!1;const u=()=>{d=!0},f=v=>{if(d){n(new Error("Animation cancelled"));return}l===null&&(l=v);const b=Math.min(1,(v-l)/i);if(t[e]=s(b)*(r-c)+c,b>=1){requestAnimationFrame(()=>{n(null)});return}requestAnimationFrame(f)};return c===r?(n(new Error("Element already at target position")),u):(requestAnimationFrame(f),u)}const $i={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};function zi(e){const{onChange:t,...r}=e,o=p.useRef(),n=p.useRef(null),s=()=>{o.current=n.current.offsetHeight-n.current.clientHeight};return Yr(()=>{const i=ln(()=>{const c=o.current;s(),c!==o.current&&t(o.current)}),l=sn(n.current);return l.addEventListener("resize",i),()=>{i.clear(),l.removeEventListener("resize",i)}},[t]),p.useEffect(()=>{s(),t(o.current)},[t]),a.jsx("div",{style:$i,...r,ref:n})}function Bi(e){return Ke("MuiTabScrollButton",e)}const _i=Xe("MuiTabScrollButton",["root","vertical","horizontal","disabled"]),Wi=e=>{const{classes:t,orientation:r,disabled:o}=e;return We({root:["root",r,o&&"disabled"]},Bi,t)},Hi=F(to,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.orientation&&t[r.orientation]]}})({width:40,flexShrink:0,opacity:.8,[`&.${_i.disabled}`]:{opacity:0},variants:[{props:{orientation:"vertical"},style:{width:"100%",height:40,"& svg":{transform:"var(--TabScrollButton-svgRotate)"}}}]}),Yi=p.forwardRef(function(t,r){const o=_e({props:t,name:"MuiTabScrollButton"}),{className:n,slots:s={},slotProps:i={},direction:l,orientation:c,disabled:d,...u}=o,f=Or(),v={isRtl:f,...o},b=Wi(v),y=s.StartScrollButtonIcon??Pi,m=s.EndScrollButtonIcon??Fi,x=Ot({elementType:y,externalSlotProps:i.startScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:v}),h=Ot({elementType:m,externalSlotProps:i.endScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:v});return a.jsx(Hi,{component:"div",className:le(b.root,n),ref:r,role:null,ownerState:v,tabIndex:null,...u,style:{...u.style,...c==="vertical"&&{"--TabScrollButton-svgRotate":`rotate(${f?-90:90}deg)`}},children:l==="left"?a.jsx(y,{...x}):a.jsx(m,{...h})})});function Vi(e){return Ke("MuiTabs",e)}const Lr=Xe("MuiTabs",["root","vertical","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"]),Bo=(e,t)=>e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:e.firstChild,_o=(e,t)=>e===t?e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:e.lastChild,gr=(e,t,r)=>{let o=!1,n=r(e,t);for(;n;){if(n===e.firstChild){if(o)return;o=!0}const s=n.disabled||n.getAttribute("aria-disabled")==="true";if(!n.hasAttribute("tabindex")||s)n=r(e,n);else{n.focus();return}}},Ui=e=>{const{vertical:t,fixed:r,hideScrollbar:o,scrollableX:n,scrollableY:s,centered:i,scrollButtonsHideMobile:l,classes:c}=e;return We({root:["root",t&&"vertical"],scroller:["scroller",r&&"fixed",o&&"hideScrollbar",n&&"scrollableX",s&&"scrollableY"],flexContainer:["flexContainer",t&&"flexContainerVertical",i&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",l&&"scrollButtonsHideMobile"],scrollableX:[n&&"scrollableX"],hideScrollbar:[o&&"hideScrollbar"]},Vi,c)},Gi=F("div",{name:"MuiTabs",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[{[`& .${Lr.scrollButtons}`]:t.scrollButtons},{[`& .${Lr.scrollButtons}`]:r.scrollButtonsHideMobile&&t.scrollButtonsHideMobile},t.root,r.vertical&&t.vertical]}})(Se(({theme:e})=>({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex",variants:[{props:({ownerState:t})=>t.vertical,style:{flexDirection:"column"}},{props:({ownerState:t})=>t.scrollButtonsHideMobile,style:{[`& .${Lr.scrollButtons}`]:{[e.breakpoints.down("sm")]:{display:"none"}}}}]}))),qi=F("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.scroller,r.fixed&&t.fixed,r.hideScrollbar&&t.hideScrollbar,r.scrollableX&&t.scrollableX,r.scrollableY&&t.scrollableY]}})({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap",variants:[{props:({ownerState:e})=>e.fixed,style:{overflowX:"hidden",width:"100%"}},{props:({ownerState:e})=>e.hideScrollbar,style:{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}},{props:({ownerState:e})=>e.scrollableX,style:{overflowX:"auto",overflowY:"hidden"}},{props:({ownerState:e})=>e.scrollableY,style:{overflowY:"auto",overflowX:"hidden"}}]}),Qi=F("div",{name:"MuiTabs",slot:"FlexContainer",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.flexContainer,r.vertical&&t.flexContainerVertical,r.centered&&t.centered]}})({display:"flex",variants:[{props:({ownerState:e})=>e.vertical,style:{flexDirection:"column"}},{props:({ownerState:e})=>e.centered,style:{justifyContent:"center"}}]}),Xi=F("span",{name:"MuiTabs",slot:"Indicator",overridesResolver:(e,t)=>t.indicator})(Se(({theme:e})=>({position:"absolute",height:2,bottom:0,width:"100%",transition:e.transitions.create(),variants:[{props:{indicatorColor:"primary"},style:{backgroundColor:(e.vars||e).palette.primary.main}},{props:{indicatorColor:"secondary"},style:{backgroundColor:(e.vars||e).palette.secondary.main}},{props:({ownerState:t})=>t.vertical,style:{height:"100%",width:2,right:0}}]}))),Ki=F(zi)({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),Wo={},Zi=p.forwardRef(function(t,r){const o=_e({props:t,name:"MuiTabs"}),n=eo(),s=Or(),{"aria-label":i,"aria-labelledby":l,action:c,centered:d=!1,children:u,className:f,component:v="div",allowScrollButtonsMobile:b=!1,indicatorColor:y="primary",onChange:m,orientation:x="horizontal",ScrollButtonComponent:h=Yi,scrollButtons:w="auto",selectionFollowsFocus:I,slots:E={},slotProps:D={},TabIndicatorProps:A={},TabScrollButtonProps:g={},textColor:R="primary",value:M,variant:O="standard",visibleScrollbar:C=!1,...$}=o,P=O==="scrollable",B=x==="vertical",G=B?"scrollTop":"scrollLeft",Y=B?"top":"left",_=B?"bottom":"right",ee=B?"clientHeight":"clientWidth",ae=B?"height":"width",K={...o,component:v,allowScrollButtonsMobile:b,indicatorColor:y,orientation:x,vertical:B,scrollButtons:w,textColor:R,variant:O,visibleScrollbar:C,fixed:!P,hideScrollbar:P&&!C,scrollableX:P&&!B,scrollableY:P&&B,centered:d&&!P,scrollButtonsHideMobile:!b},te=Ui(K),se=Ot({elementType:E.StartScrollButtonIcon,externalSlotProps:D.startScrollButtonIcon,ownerState:K}),De=Ot({elementType:E.EndScrollButtonIcon,externalSlotProps:D.endScrollButtonIcon,ownerState:K}),[ie,pe]=p.useState(!1),[N,Z]=p.useState(Wo),[q,ve]=p.useState(!1),[Pe,Fe]=p.useState(!1),[Te,st]=p.useState(!1),[He,it]=p.useState({overflow:"hidden",scrollbarWidth:0}),lt=new Map,ce=p.useRef(null),ye=p.useRef(null),ct=()=>{const k=ce.current;let j;if(k){const H=k.getBoundingClientRect();j={clientWidth:k.clientWidth,scrollLeft:k.scrollLeft,scrollTop:k.scrollTop,scrollWidth:k.scrollWidth,top:H.top,bottom:H.bottom,left:H.left,right:H.right}}let V;if(k&&M!==!1){const H=ye.current.children;if(H.length>0){const X=H[lt.get(M)];V=X?X.getBoundingClientRect():null}}return{tabsMeta:j,tabMeta:V}},fe=Jt(()=>{const{tabsMeta:k,tabMeta:j}=ct();let V=0,H;B?(H="top",j&&k&&(V=j.top-k.top+k.scrollTop)):(H=s?"right":"left",j&&k&&(V=(s?-1:1)*(j[H]-k[H]+k.scrollLeft)));const X={[H]:V,[ae]:j?j[ae]:0};if(typeof N[H]!="number"||typeof N[ae]!="number")Z(X);else{const Re=Math.abs(N[H]-X[H]),Je=Math.abs(N[ae]-X[ae]);(Re>=1||Je>=1)&&Z(X)}}),Ne=(k,{animation:j=!0}={})=>{j?Li(G,ce.current,k,{duration:n.transitions.duration.standard}):ce.current[G]=k},dt=k=>{let j=ce.current[G];B?j+=k:j+=k*(s?-1:1),Ne(j)},ut=()=>{const k=ce.current[ee];let j=0;const V=Array.from(ye.current.children);for(let H=0;H<V.length;H+=1){const X=V[H];if(j+X[ee]>k){H===0&&(j=k);break}j+=X[ee]}return j},Tt=()=>{dt(-1*ut())},Mt=()=>{dt(ut())},jt=p.useCallback(k=>{it({overflow:null,scrollbarWidth:k})},[]),pt=()=>{const k={};k.scrollbarSizeListener=P?a.jsx(Ki,{onChange:jt,className:le(te.scrollableX,te.hideScrollbar)}):null;const V=P&&(w==="auto"&&(q||Pe)||w===!0);return k.scrollButtonStart=V?a.jsx(h,{slots:{StartScrollButtonIcon:E.StartScrollButtonIcon},slotProps:{startScrollButtonIcon:se},orientation:x,direction:s?"right":"left",onClick:Tt,disabled:!q,...g,className:le(te.scrollButtons,g.className)}):null,k.scrollButtonEnd=V?a.jsx(h,{slots:{EndScrollButtonIcon:E.EndScrollButtonIcon},slotProps:{endScrollButtonIcon:De},orientation:x,direction:s?"left":"right",onClick:Mt,disabled:!Pe,...g,className:le(te.scrollButtons,g.className)}):null,k},yt=Jt(k=>{const{tabsMeta:j,tabMeta:V}=ct();if(!(!V||!j)){if(V[Y]<j[Y]){const H=j[G]+(V[Y]-j[Y]);Ne(H,{animation:k})}else if(V[_]>j[_]){const H=j[G]+(V[_]-j[_]);Ne(H,{animation:k})}}}),Ye=Jt(()=>{P&&w!==!1&&st(!Te)});p.useEffect(()=>{const k=ln(()=>{ce.current&&fe()});let j;const V=Re=>{Re.forEach(Je=>{Je.removedNodes.forEach(wt=>{j==null||j.unobserve(wt)}),Je.addedNodes.forEach(wt=>{j==null||j.observe(wt)})}),k(),Ye()},H=sn(ce.current);H.addEventListener("resize",k);let X;return typeof ResizeObserver<"u"&&(j=new ResizeObserver(k),Array.from(ye.current.children).forEach(Re=>{j.observe(Re)})),typeof MutationObserver<"u"&&(X=new MutationObserver(V),X.observe(ye.current,{childList:!0})),()=>{k.clear(),H.removeEventListener("resize",k),X==null||X.disconnect(),j==null||j.disconnect()}},[fe,Ye]),p.useEffect(()=>{const k=Array.from(ye.current.children),j=k.length;if(typeof IntersectionObserver<"u"&&j>0&&P&&w!==!1){const V=k[0],H=k[j-1],X={root:ce.current,threshold:.99},Re=qt=>{ve(!qt[0].isIntersecting)},Je=new IntersectionObserver(Re,X);Je.observe(V);const wt=qt=>{Fe(!qt[0].isIntersecting)},ur=new IntersectionObserver(wt,X);return ur.observe(H),()=>{Je.disconnect(),ur.disconnect()}}},[P,w,Te,u==null?void 0:u.length]),p.useEffect(()=>{pe(!0)},[]),p.useEffect(()=>{fe()}),p.useEffect(()=>{yt(Wo!==N)},[yt,N]),p.useImperativeHandle(c,()=>({updateIndicator:fe,updateScrollButtons:Ye}),[fe,Ye]);const kt=a.jsx(Xi,{...A,className:le(te.indicator,A.className),ownerState:K,style:{...N,...A.style}});let he=0;const Et=p.Children.map(u,k=>{if(!p.isValidElement(k))return null;const j=k.props.value===void 0?he:k.props.value;lt.set(j,he);const V=j===M;return he+=1,p.cloneElement(k,{fullWidth:O==="fullWidth",indicator:V&&!ie&&kt,selected:V,selectionFollowsFocus:I,onChange:m,textColor:R,value:j,...he===1&&M===!1&&!k.props.tabIndex?{tabIndex:0}:{}})}),Ze=k=>{const j=ye.current,V=Hr(j).activeElement;if(V.getAttribute("role")!=="tab")return;let X=x==="horizontal"?"ArrowLeft":"ArrowUp",Re=x==="horizontal"?"ArrowRight":"ArrowDown";switch(x==="horizontal"&&s&&(X="ArrowRight",Re="ArrowLeft"),k.key){case X:k.preventDefault(),gr(j,V,_o);break;case Re:k.preventDefault(),gr(j,V,Bo);break;case"Home":k.preventDefault(),gr(j,null,Bo);break;case"End":k.preventDefault(),gr(j,null,_o);break}},ge=pt();return a.jsxs(Gi,{className:le(te.root,f),ownerState:K,ref:r,as:v,...$,children:[ge.scrollButtonStart,ge.scrollbarSizeListener,a.jsxs(qi,{className:te.scroller,ownerState:K,style:{overflow:He.overflow,[B?`margin${s?"Left":"Right"}`:"marginBottom"]:C?void 0:-He.scrollbarWidth},ref:ce,children:[a.jsx(Qi,{"aria-label":i,"aria-labelledby":l,"aria-orientation":x==="vertical"?"vertical":null,className:te.flexContainer,ownerState:K,onKeyDown:Ze,ref:ye,role:"tablist",children:Et}),ie&&kt]}),ge.scrollButtonEnd]})}),Ji=Ie(a.jsx("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore"),el=Ie(a.jsx("path",{d:"M9 11H7v2h2zm4 0h-2v2h2zm4 0h-2v2h2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V9h14z"}),"DateRange");//! =============== 1. 設定與常量 ===============
const Kr={colors:{primary:{main:"rgba(13% 39% 75% / 1)",light:"rgba(15% 46% 82% / 1)",dark:"rgba(5% 28% 63% / 1)",contrast:"rgba(100% 100% 100% / 1)"},accent:{blue:"rgba(15% 46% 82% / 1)",red:"rgba(83% 18% 18% / 1)",orange:"rgba(96% 49% 0% / 1)",green:"rgba(22% 56% 24% / 1)",grey:"rgba(46% 46% 46% / 1)"},background:{primary:"transparent",hover:"rgba(15% 46% 82% / 0.08)",active:"rgba(15% 46% 82% / 0.12)",panel:"rgba(15% 46% 82% / 0.04)"},text:{primary:"rgba(100% 100% 100% / 1)",secondary:"rgba(100% 100% 100% / 0.85)",disabled:"rgba(100% 100% 100% / 0.6)"},border:{default:"rgba(100% 100% 100% / 0.4)",active:"rgba(15% 46% 82% / 1)",hover:"rgba(15% 46% 82% / 0.8)"}},size:{height:"48px",fontSize:"18px",buttonFontSize:"20px",iconSize:"24px",padding:"0 20px",borderRadius:"8px",minWidth:"120px",gap:"16px"}},tl={mobile:"768px",tablet:"1024px",desktop:"1200px"};//! =============== 2. 類型與介面 ===============
const On=p.createContext(Kr);function Vt(){return p.useContext(On)}//! =============== 3. 核心功能 ===============
const rl=ne.div`
  /* 布局定位 */
  display: flex;
  flex-direction: column;
  width: 100%;

  /* 盒模型 */
  margin-bottom: 20px;
  gap: ${e=>e.theme.size.gap};
`,ol=ne.div`
  /* 布局定位 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  /* 盒模型 */
  gap: ${e=>e.theme.size.gap};

  /* 響應式 */
  @media (max-width: ${tl.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,nl=ne.div`
  /* 布局定位 */
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  /* 盒模型 */
  gap: 12px;
`,al=ne.button`
  /* 布局定位 */
  display: flex;
  align-items: center;
  justify-content: center;

  /* 盒模型 */
  height: ${e=>e.theme.size.height};
  min-width: ${e=>e.theme.size.minWidth};
  padding: ${e=>e.theme.size.padding};
  border-width: 2px;
  border-style: solid;
  border-color: ${e=>e.theme.colors.border.default};
  border-radius: ${e=>e.theme.size.borderRadius};
  box-sizing: border-box;
  gap: 8px;

  /* 視覺樣式 */
  background-color: ${e=>e.theme.colors.background.primary};
  color: ${e=>e.theme.colors.text.primary};
  font-family: "Noto Sans TC", sans-serif;
  font-size: ${e=>e.theme.size.buttonFontSize};
  font-weight: 600;
  line-height: 1.2;

  /* CSS3特效 */
  transition-property: all;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;

  /* 其他屬性 */
  cursor: pointer;

  &:hover {
    /* 布局定位 */
    transform: translateY(-2px);

    /* 視覺樣式 */
    background-color: ${e=>e.theme.colors.background.hover};
    border-color: ${e=>e.theme.colors.border.hover};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    /* 布局定位 */
    transform: translateY(0);

    /* 視覺樣式 */
    background-color: ${e=>e.theme.colors.background.active};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    /* 布局定位 */
    transform: none;

    /* 視覺樣式 */
    opacity: 0.6;
    box-shadow: none;

    /* 其他屬性 */
    cursor: not-allowed;
  }

  svg {
    /* 盒模型 */
    font-size: ${e=>e.theme.size.iconSize};
  }
`,sl=ne.select`
  /* 布局定位 */
  appearance: none;

  /* 盒模型 */
  height: ${e=>e.theme.size.height};
  padding-top: 0;
  padding-right: 40px;
  padding-bottom: 0;
  padding-left: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: ${e=>e.theme.colors.border.default};
  border-radius: ${e=>e.theme.size.borderRadius};
  box-sizing: border-box;

  /* 視覺樣式 */
  background-color: ${e=>e.theme.colors.background.primary};
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 20px;
  color: ${e=>e.theme.colors.text.primary};
  font-family: "Noto Sans TC", sans-serif;
  font-size: ${e=>e.theme.size.fontSize};
  font-weight: 500;

  /* CSS3特效 */
  transition-property: all;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;

  /* 其他屬性 */
  cursor: pointer;

  &:hover {
    /* 視覺樣式 */
    background-color: ${e=>e.theme.colors.background.hover};
    border-color: ${e=>e.theme.colors.border.hover};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    /* 視覺樣式 */
    background-color: ${e=>e.theme.colors.background.hover};
    border-color: ${e=>e.theme.colors.border.active};
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);

    /* 其他屬性 */
    outline: none;
  }

  option {
    /* 盒模型 */
    padding: 12px;

    /* 視覺樣式 */
    background-color: ${e=>e.theme.colors.primary.main};
    color: ${e=>e.theme.colors.text.primary};
    font-size: ${e=>e.theme.size.fontSize};
  }
`,il=ne.input`
  /* 盒模型 */
  height: ${e=>e.theme.size.height};
  padding-top: 0;
  padding-right: 20px;
  padding-bottom: 0;
  padding-left: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: ${e=>e.theme.colors.border.default};
  border-radius: ${e=>e.theme.size.borderRadius};
  box-sizing: border-box;

  /* 視覺樣式 */
  background-color: ${e=>e.theme.colors.background.primary};
  color: ${e=>e.theme.colors.text.primary};
  font-family: "Noto Sans TC", sans-serif;
  font-size: ${e=>e.theme.size.fontSize};
  font-weight: 500;

  /* CSS3特效 */
  transition-property: all;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;

  &:hover {
    /* 視覺樣式 */
    background-color: ${e=>e.theme.colors.background.hover};
    border-color: ${e=>e.theme.colors.border.hover};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    /* 視覺樣式 */
    background-color: ${e=>e.theme.colors.background.hover};
    border-color: ${e=>e.theme.colors.border.active};
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);

    /* 其他屬性 */
    outline: none;
  }

  &::-webkit-calendar-picker-indicator {
    /* 盒模型 */
    width: 20px;
    height: 20px;

    /* CSS3特效 */
    filter: invert(1);
    opacity: 0.8;

    /* 其他屬性 */
    cursor: pointer;

    &:hover {
      /* CSS3特效 */
      opacity: 1;
    }
  }
`,ll=ne(Ua).withConfig({shouldForwardProp:e=>e!=="customTheme"})`
  /* 盒模型 */
  margin-top: 8px !important;
  margin-right: 0 !important;
  margin-bottom: 8px !important;
  margin-left: 0 !important;
  border-width: 2px !important;
  border-style: solid !important;
  border-color: ${e=>{var t;return((t=e.customTheme)==null?void 0:t.colors.border.default)||"rgba(255, 255, 255, 0.4)"}} !important;
  border-radius: ${e=>{var t;return((t=e.customTheme)==null?void 0:t.size.borderRadius)||"8px"}} !important;
  box-shadow: none !important;

  /* 視覺樣式 */
  background: ${e=>{var t;return((t=e.customTheme)==null?void 0:t.colors.background.panel)||"rgba(25, 118, 210, 0.04)"}} !important;

  &:before {
    /* 布局定位 */
    display: none;
  }

  &.Mui-expanded {
    /* 視覺樣式 */
    border-color: ${e=>{var t;return((t=e.customTheme)==null?void 0:t.colors.border.active)||"#1976d2"}} !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  }
`,cl=ne(rs).withConfig({shouldForwardProp:e=>e!=="customTheme"})`
  .MuiAccordionSummary-content {
    /* 盒模型 */
    margin-top: 16px !important;
    margin-right: 0 !important;
    margin-bottom: 16px !important;
    margin-left: 0 !important;

    /* 布局定位 */
    align-items: center;
  }

  .MuiAccordionSummary-expandIconWrapper {
    /* 視覺樣式 */
    color: ${e=>{var t;return((t=e.customTheme)==null?void 0:t.colors.text.primary)||"#ffffff"}} !important;

    svg {
      /* 視覺樣式 */
      font-size: 28px !important;
    }
  }

  &:hover {
    /* 視覺樣式 */
    background-color: ${e=>{var t;return((t=e.customTheme)==null?void 0:t.colors.background.hover)||"rgba(25, 118, 210, 0.08)"}} !important;
  }
`,dl=ne(Xa).withConfig({shouldForwardProp:e=>e!=="customTheme"})`
  /* 盒模型 */
  padding: 20px !important;
`,ul=ne(al)`
  /* 視覺樣式 */
  background-color: ${e=>e.backgroundColor||e.theme.colors.background.primary};
  border-color: ${e=>e.borderColor||e.theme.colors.border.default};

  &:hover {
    /* 視覺樣式 */
    background-color: ${e=>e.hoverBackgroundColor||e.theme.colors.background.hover};
    box-shadow: ${e=>e.hoverBoxShadow||"0 4px 8px rgba(0, 0, 0, 0.2)"};

    /* CSS3特效 */
    opacity: ${e=>e.hoverOpacity||1};
  }
`;function U({children:e,customTheme:t}){const r=t?{...Kr,...t}:Kr;return a.jsx(On.Provider,{value:r,children:a.jsx(rl,{theme:r,children:e})})}U.Row=function({children:t,...r}){const o=Vt();return a.jsx(ol,{theme:o,...r,children:t})};U.ButtonGroup=function({children:t,...r}){const o=Vt();return a.jsx(nl,{theme:o,...r,children:t})};U.Button=function({variant:t="default",active:r=!1,children:o,onClick:n,styleOverrides:s={},getStyles:i,...l}){const c=Vt(),u={...i?i(c,t,r):pl(c,t,r),...s};return a.jsx(ul,{theme:c,onClick:n,...u,...l,children:o})};U.TimeRangeButton=function({value:t,currentValue:r,onChange:o,children:n,icon:s=Sa}){return a.jsxs(U.Button,{active:t===r,onClick:()=>o==null?void 0:o(t),children:[a.jsx(s,{}),n]})};U.Select=function({value:t,onChange:r,children:o,placeholder:n,...s}){const i=Vt();return a.jsxs(sl,{theme:i,value:t,onChange:l=>r==null?void 0:r(l.target.value),...s,children:[n&&a.jsx("option",{value:"",disabled:!0,children:n}),o]})};U.AreaSelect=function({value:t,onChange:r,options:o=[],placeholder:n="選擇區域",renderOption:s}){return a.jsx(U.Select,{value:t,onChange:r,placeholder:n,children:o.map((i,l)=>{if(s)return s(i,l);const c=typeof i=="string"?i:i.value,d=typeof i=="string"?i:i.label;return a.jsx("option",{value:c,children:d},c)})})};U.AddButton=function({onClick:t,children:r="新增狀態",icon:o=va}){return a.jsxs(U.Button,{variant:"primary",onClick:t,children:[a.jsx(o,{}),r]})};U.NowButton=function({onClick:t,children:r="移至現在",icon:o=Ur}){return a.jsxs(U.Button,{variant:"success",onClick:t,children:[a.jsx(o,{}),r]})};U.TimeInput=function({label:t,value:r,onChange:o,type:n="datetime-local"}){const s=Vt();return a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t&&a.jsxs("span",{style:{fontSize:s.size.fontSize,minWidth:"60px",color:s.colors.text.primary,fontFamily:"Noto Sans TC, sans-serif",fontWeight:500},children:[t,"："]}),a.jsx(il,{theme:s,type:n,value:r,onChange:i=>o==null?void 0:o(i.target.value)})]})};U.Panel=function({title:t,expanded:r=!1,onToggle:o,icon:n=el,children:s,info:i,renderHeader:l,renderContent:c}){const d=Vt(),u=(x,h)=>{o==null||o(h)},[f,v]=ro.useState(r),b=o!==void 0,y=b?r:f,m=b?u:(x,h)=>v(h);return a.jsxs(ll,{customTheme:d,expanded:y,onChange:m,disableGutters:!1,children:[a.jsx(cl,{customTheme:d,expandIcon:a.jsx(Ji,{}),"aria-controls":`${t}-content`,id:`${t}-header`,children:l?l({title:t,info:i,Icon:n,theme:d,expanded:y}):a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[a.jsx(n,{style:{fontSize:"28px",color:d.colors.primary.light}}),a.jsx(J,{variant:"h6",sx:{fontSize:"20px",fontWeight:600,color:d.colors.text.primary,fontFamily:'"Noto Sans TC", sans-serif'},children:t}),i&&a.jsxs(J,{variant:"body2",sx:{fontSize:"16px",opacity:.8,color:d.colors.text.secondary,fontFamily:'"Noto Sans TC", sans-serif'},children:["(",i,")"]})]})}),a.jsx(dl,{customTheme:d,children:c?c({children:s,theme:d,expanded:y}):a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:s})})]})};//! =============== 4. 工具函數 ===============
function pl(e,t,r){return r?{backgroundColor:e.colors.primary.light,borderColor:e.colors.primary.light,hoverBackgroundColor:e.colors.primary.light,hoverOpacity:.9}:{primary:{backgroundColor:e.colors.accent.blue,borderColor:e.colors.accent.blue,hoverBackgroundColor:e.colors.accent.blue,hoverOpacity:.9},success:{backgroundColor:e.colors.accent.green,borderColor:e.colors.accent.green,hoverBackgroundColor:e.colors.accent.green,hoverOpacity:.9},warning:{backgroundColor:e.colors.accent.orange,borderColor:e.colors.accent.orange,hoverBackgroundColor:e.colors.accent.orange,hoverOpacity:.9},danger:{backgroundColor:e.colors.accent.red,borderColor:e.colors.accent.red,hoverBackgroundColor:e.colors.accent.red,hoverOpacity:.9}}[t]||{}}const ue={colors:{primary:{main:"#1E3A5F",light:"#1976D2",dark:"#0D47A1",contrast:"#FFFFFF"},accent:{blue:"#1976D2",red:"#F44336",green:"#4CAF50",orange:"#FF9800"},status:{idle:"#757575",running:"#4CAF50",setup:"#FF9800",stopped:"#F44336",maintenance:"#673AB7"},background:{primary:"#FFFFFF",secondary:"#F5F5F5",panel:"#EEEEEE",hover:"#E0E0E0"},text:{primary:"#212121",secondary:"#616161",disabled:"#9E9E9E",contrast:"#FFFFFF"},border:{light:"#E0E0E0",medium:"#9E9E9E",dark:"#616161",active:"#1976D2"}},size:{height:"56px",borderRadius:"8px",spacing:{xs:"6px",sm:"12px",md:"20px",lg:"28px",xl:"36px"},fontSize:{xs:"18px",sm:"20px",md:"22px",lg:"26px",xl:"30px",xxl:"36px",factory:{timeline:{axisLarge:"42px",axisMedium:"32px",axisSmall:"28px",itemTitle:"22px",itemContent:"20px",itemMeta:"18px",machineLabel:"24px"},button:{sm:"18px",md:"20px",lg:"24px"},heading:{h1:"40px",h2:"36px",h3:"32px",h4:"28px",h5:"24px",h6:"20px"}}}},animation:{transition:"all 0.2s ease"},shadows:{sm:"0 2px 4px rgba(0,0,0,0.1)",md:"0 4px 8px rgba(0,0,0,0.1)",lg:"0 8px 16px rgba(0,0,0,0.1)"}};function fl(e){return{製令單:ue.colors.accent.blue,閒置:ue.colors.status.idle,設置中:ue.colors.status.setup,生產中:ue.colors.status.running,停機:ue.colors.status.stopped,維護中:ue.colors.status.maintenance}[e]||ue.colors.text.primary}const fo=F(Ta)(({theme:e})=>({"& .MuiDialog-paper":{borderRadius:"6px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",border:`2px solid ${ue.colors.border.medium}`,overflow:"hidden",maxWidth:"900px",width:"90%"}})),ho=F(ya)(({theme:e})=>({backgroundColor:ue.colors.primary.main,color:ue.colors.primary.contrast,padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"18px",fontWeight:600,"& .MuiIconButton-root":{color:"inherit",padding:"8px",marginLeft:"8px","&:hover":{backgroundColor:"rgba(255, 255, 255, 0.2)"}}}));F(cn)(({color:e})=>({backgroundColor:e||ue.colors.status.idle,color:"#FFFFFF",fontWeight:600,height:"32px",fontSize:"14px",marginLeft:"16px","& .MuiChip-label":{padding:"0 12px"},"& .MuiChip-icon":{fontSize:"18px",marginRight:"6px"}}));const mo=F(Ea)(({theme:e})=>({padding:"24px",backgroundColor:"#FFFFFF"})),go=F(wa)(({theme:e})=>({padding:"16px 24px",borderTop:"2px solid #E0E0E0",backgroundColor:"#F5F5F5"})),An=F(oo)(({theme:e})=>({backgroundColor:"#1976D2",color:"#FFFFFF",padding:"10px 24px",fontSize:"16px",fontWeight:500,height:"48px",boxShadow:"none","&:hover":{backgroundColor:"#1565C0",boxShadow:"0 2px 4px rgba(0,0,0,0.2)"}})),Mr=F(oo)(({theme:e})=>({color:"#424242",padding:"10px 24px",fontSize:"16px",height:"48px",border:"2px solid #9E9E9E","&:hover":{backgroundColor:"#EEEEEE",borderColor:"#757575"}})),hl=F(oo)(({theme:e})=>({color:"#F44336",padding:"10px 24px",fontSize:"16px",height:"48px",border:"2px solid #F44336","&:hover":{backgroundColor:"rgba(244, 67, 54, 0.1)",borderColor:"#D32F2F"}})),ml=F(J)(({theme:e})=>({fontSize:"18px",fontWeight:600,color:"#1E3A5F",marginBottom:"16px",paddingBottom:"8px",borderBottom:"2px solid #1E3A5F"})),gl=F(Q)(({theme:e})=>({marginBottom:"32px",padding:"20px",backgroundColor:"#FFFFFF",borderRadius:"6px",border:"2px solid #E0E0E0"})),xl=F(Zi)(({theme:e})=>({backgroundColor:"#F5F5F5",borderBottom:"2px solid #E0E0E0","& .MuiTab-root":{minHeight:"56px",fontSize:"16px",fontWeight:500,padding:"0 24px"},"& .Mui-selected":{color:"#1976D2",fontWeight:600},"& .MuiTabs-indicator":{backgroundColor:"#1976D2",height:"4px"}})),bl=F(ki)(({theme:e})=>({textTransform:"none",fontSize:"16px",padding:"12px 24px","&.Mui-selected":{backgroundColor:"rgba(25, 118, 210, 0.08)"}}));F(Rr)(({theme:e})=>({padding:"20px",backgroundColor:"#FFFFFF",borderRadius:"6px",boxShadow:"none",border:"2px solid #E0E0E0",margin:"16px 0"}));F(Q)(({theme:e})=>({display:"flex",marginBottom:"12px","&:last-child":{marginBottom:0}}));F(J)(({theme:e})=>({width:"140px",flexShrink:0,color:"#616161",fontSize:"16px",fontWeight:500}));F(J)(({theme:e})=>({flex:1,fontWeight:500,fontSize:"16px",color:"#212121"}));//! =============== 1. 設定與常量 ===============
const Mn="Asia/Taipei",Sl={fullDateTime:"YYYY-MM-DD HH:mm:ss",dateTime:"YYYY-MM-DD HH:mm",date:"YYYY-MM-DD",time:"HH:mm",isoDateTime:"YYYY-MM-DDTHH:mm"};//! =============== 2. 初始化設定 ===============
[Ia,Ca,Da,Ra,Oa,Aa].forEach(e=>T.extend(e));T.tz.setDefault(Mn);//! =============== 3. 核心功能 ===============
const It=(e,t=T())=>{const r=t,o=8,n={hour:{start:r.subtract(3,"hour"),end:r.add(3,"hour")},day:{start:r.subtract(3,"day").hour(o),end:r.add(3,"day").hour(o)},week:{start:r.subtract(2,"week").hour(o),end:r.add(2,"week").hour(o)},month:{start:r.subtract(2,"month").hour(o),end:r.add(2,"month").hour(o)}};return n[e]||n.day},mt=(e,t="")=>{if(!e)return t;try{const r=T(e);return r.isValid()?(r.tz?r.tz(Mn):r.local()).format(Sl.isoDateTime):(console.warn("[formatToFormDateTime] Invalid date:",e),t)}catch(r){return console.error("[formatToFormDateTime] Error:",r,{date:e}),t}},$r=(e,t=new Date)=>{const r=mt(e);return r||mt(t,"")},vl=(e={})=>{var t,r,o,n,s,i,l,c,d,u,f,v;return{planStartTime:mt((e==null?void 0:e.planStartTime)||((t=e==null?void 0:e.orderInfo)==null?void 0:t.planStartTime)||((r=e==null?void 0:e.status)==null?void 0:r.planStartTime)||((o=e==null?void 0:e.status)==null?void 0:o.startTime)),planEndTime:mt((e==null?void 0:e.planEndTime)||((n=e==null?void 0:e.orderInfo)==null?void 0:n.planEndTime)||((s=e==null?void 0:e.status)==null?void 0:s.planEndTime)||((i=e==null?void 0:e.status)==null?void 0:i.endTime)),start:mt((e==null?void 0:e.start)||((l=e==null?void 0:e.status)==null?void 0:l.startTime)),end:mt((e==null?void 0:e.end)||((c=e==null?void 0:e.status)==null?void 0:c.endTime)),product:((d=e==null?void 0:e.status)==null?void 0:d.product)||"",reason:((u=e==null?void 0:e.status)==null?void 0:u.reason)||"",productName:((f=e==null?void 0:e.orderInfo)==null?void 0:f.productName)||"",process:((v=e==null?void 0:e.orderInfo)==null?void 0:v.process)||""}};var Tl={};//! =============== 1. 錯誤類型定義 ===============
const Ut={API:"API_ERROR",VALIDATION:"VALIDATION_ERROR",BUSINESS:"BUSINESS_ERROR",FORM:"FORM_ERROR",STATE_TRANSITION:"STATE_TRANSITION_ERROR",DATE_TIME:"DATE_TIME_ERROR",PERMISSION:"PERMISSION_ERROR",UNKNOWN:"UNKNOWN_ERROR"},Ue={CRITICAL:"CRITICAL",ERROR:"ERROR",WARNING:"WARNING",INFO:"INFO"};//! =============== 2. 錯誤處理工廠函數 ===============
const ir=(e,t={})=>{const{type:r=Ut.UNKNOWN,severity:o=Ue.ERROR,details:n={},name:s="AppError",cause:i=null}=t,l={message:e,name:s,type:r,severity:o,details:n,timestamp:T().format(),cause:i,toUserMessage:()=>e,toLogFormat:()=>({timestamp:l.timestamp,type:l.type,severity:l.severity,message:l.message,details:l.details,stack:new Error(e).stack})};return l},Rt=(e,t={})=>ir(e,{type:Ut.VALIDATION,severity:Ue.ERROR,details:t,name:"ValidationError"}),yl=(e,t={})=>ir(e,{type:Ut.FORM,severity:Ue.ERROR,details:t,name:"FormError"}),gt=(e,t={})=>ir(e,{type:Ut.STATE_TRANSITION,severity:Ue.ERROR,details:t,name:"StateTransitionError"}),$t=(e,t={})=>ir(e,{type:Ut.API,severity:Ue.ERROR,details:t,name:"ApiError"});//! =============== 3. 錯誤處理函數 ===============
const jn=e=>e&&typeof e=="object"&&typeof e.toUserMessage=="function"&&typeof e.type=="string",Ct=e=>{var t;if(jn(e))return e.toUserMessage();if(e.name==="ZodError"){const r=(t=e.errors)==null?void 0:t[0];if(r){const o=r.path.map(n=>({start:"開始時間",end:"結束時間",group:"機台編號",area:"區域",reason:"原因",product:"產品"})[n]||n).join(" > ");return o?`${o}: ${r.message}`:r.message}return"表單驗證失敗"}return console.error("未處理的錯誤類型:",e),"操作失敗，請稍後再試"},El=(e={})=>{const r={...{logLevel:"error",includeStackTrace:!0,shouldLogToConsole:!0,shouldLogToServer:!1,serverEndpoint:"/api/logs"},...e};return(o,n={})=>{const s=jn(o)?o:ir((o==null?void 0:o.message)||"未知錯誤",{type:Ut.UNKNOWN,severity:Ue.ERROR,details:{originalError:o},cause:o});if(r.shouldLogToConsole){const l={...s.toLogFormat(),context:{...n,timestamp:new Date().toISOString(),appVersion:Tl.REACT_APP_VERSION||"未知"}};switch(s.severity){case Ue.CRITICAL:case Ue.ERROR:console.error("錯誤:",l);break;case Ue.WARNING:console.warn("警告:",l);break;case Ue.INFO:default:console.info("提示:",l);break}}return s}},rt=El(),wl=yl,xo={AREAS:["A","B","C","D"],MACHINES_PER_AREA:10,WORK_START_HOUR:8},S={ORDER_CREATED:"製令單",IDLE:"待機中",SETUP:"上模與調機",TESTING:"產品試模",STOPPED:"機台停機"},lr={[S.ORDER_CREATED]:{name:S.ORDER_CREATED,description:"製令單模式",color:"#4caf50",className:"status-producing",canSwitch:!1,canDelete:!1,allowedTransitions:[]},[S.IDLE]:{name:S.IDLE,description:"機台空閒狀態",color:"#9e9e9e",className:"status-idle",canSwitch:!0,canDelete:!0,allowedTransitions:[S.SETUP,S.TESTING,S.STOPPED],checkHistorical:e=>{var t;return!!(e!=null&&e.actualStartTime||(t=e==null?void 0:e.status)!=null&&t.actualStartTime)}},[S.SETUP]:{name:S.SETUP,description:"機台正在進行設定",color:"#ff9800",className:"status-setup",canSwitch:!0,canDelete:!0,allowedTransitions:[S.IDLE]},[S.TESTING]:{name:S.TESTING,description:"進行產品測試",color:"#2196f3",className:"status-testing",canSwitch:!0,canDelete:!0,allowedTransitions:[S.IDLE]},[S.STOPPED]:{name:S.STOPPED,description:"機台暫停運作",color:"#f44336",className:"status-stopped",canSwitch:!0,canDelete:!0,allowedTransitions:[S.IDLE]}},Il=(e,t)=>{if(e===S.ORDER_CREATED)return!1;const r=lr[e];return!r||!r.canSwitch?!1:r.allowedTransitions.includes(t)},jr=(e,t)=>{const r=lr[e];return r!=null&&r.checkHistorical?r.checkHistorical(t):!1},Gt=e=>{var r,o,n;return e?[(r=e==null?void 0:e.status)==null?void 0:r.actualStartTime,(o=e==null?void 0:e.status)==null?void 0:o.actualEndTime,e==null?void 0:e.machineStatusActualStartTime,e==null?void 0:e.machineStatusActualEndTime,(n=e==null?void 0:e.orderInfo)==null?void 0:n.actualEndTime].some(s=>s!=null&&s!==""&&s!=="null"):!1},Cl=e=>{if(!e||Gt(e)||e.timeLineStatus===S.ORDER_CREATED)return!1;const t=e.timeLineStatus;return Al(t,e)},Dl=e=>{if(!e||Gt(e)||e.timeLineStatus===S.ORDER_CREATED)return!1;const t=e.timeLineStatus;return Ol(t,e)},Rl=e=>!(!e||Gt(e)||e.timeLineStatus===S.ORDER_CREATED),Ol=(e,t=null)=>{var r;return t&&jr(e,t)?!1:((r=lr[e])==null?void 0:r.canDelete)??!1},Al=(e,t=null)=>{var r;return t&&jr(e,t)?!1:((r=lr[e])==null?void 0:r.canSwitch)??!1},bo=e=>{var t;return((t=lr[e])==null?void 0:t.className)??""};//! =============== 1. 預設值配置 ===============
const Ml={group:{backups:["machineSN"],defaultValue:"A-1",warningMessage:"缺少機台組，使用預設值: A-1"},start:{backups:["machineStatusPlanStartTime","machineStatusActualStartTime","planOnMachineDate"],defaultValue:()=>T().format(),warningMessage:"缺少開始時間，使用當前時間作為預設值"},planStartTime:{backups:["machineStatusPlanStartTime","start"],defaultValue:()=>T().format(),warningMessage:"缺少預計開始時間，使用當前時間作為預設值"},planEndTime:{backups:["machineStatusPlanEndTime","end"],defaultValue:()=>T().add(1,"hour").format(),warningMessage:"缺少預計結束時間，使用當前時間+1小時作為預設值"},actualStartTime:{backups:["machineStatusActualStartTime"],defaultValue:"",warningMessage:"實際開始時間為選填"},actualEndTime:{backups:["machineStatusActualEndTime"],defaultValue:"",warningMessage:"實際結束時間為選填"}};//! =============== 2. 狀態特定驗證規則 ===============
const jl={[S.TESTING]:{requiredFields:["machineStatusProduct"],errorMessages:{machineStatusProduct:"產品試模狀態必須指定產品"}},[S.STOPPED]:{requiredFields:["machineStatusReason"],errorMessages:{machineStatusReason:"機台停機狀態必須指定原因"}},[S.ORDER_CREATED]:{requiredFields:["productName"],errorMessages:{productName:"製令單必須指定產品名稱"}}};//! =============== 3. 狀態轉換規則 ===============
const zr={[S.ORDER_CREATED]:{canSwitchFrom:!1,errorMessage:"製令單狀態不能被切換"},nonIdleTransitions:{onlyToIdle:!0,errorMessage:"從非待機狀態只能切換回待機狀態"},toIdleRequirements:{requireEndTime:!0,errorMessage:"從非待機狀態切換回待機狀態時，必須設置結束時間"}};//! =============== 2. 數據預處理函數 ===============
function kl(e){if(!e||typeof e!="object"){console.warn("fillDefaultValues: apiItem 為空或非對象類型");return}Object.entries(Ml).forEach(([t,r])=>{var o;if(!e[t]){const n=(o=r.backups)==null?void 0:o.find(s=>e[s]);if(n)e[t]=e[n];else{const s=typeof r.defaultValue=="function"?r.defaultValue():r.defaultValue;e[t]=s,console.warn(r.warningMessage)}}})}function Pl(e){if(!e||typeof e!="object")throw Rt("API 項目數據為空或格式錯誤",{apiItem:typeof e});["group","start"].forEach(r=>{if(!e[r])throw Rt(`${r} 為必填欄位`,{field:r,value:e[r]})})}function Fl(e){if(!e||typeof e!="object")throw Rt("API 項目數據為空或格式錯誤",{apiItem:typeof e});const t=jl[e.timeLineStatus];if(!t){if(!Object.values(S).includes(e.timeLineStatus))throw Rt(`未知的狀態類型: ${e.timeLineStatus}`,{providedStatus:e.timeLineStatus,validStatuses:Object.values(S)});return}t.requiredFields.forEach(r=>{if(!e[r])throw Rt(t.errorMessages[r],{field:r,status:e.timeLineStatus})})}//! =============== 3. 狀態轉換驗證 ===============
function kn(e,t,r){var o;if(!e||!t)throw gt("狀態轉換驗證缺少必要參數",{initialStatus:e,targetStatus:t,itemId:r==null?void 0:r.id});if(e!==t){if(e===S.ORDER_CREATED)throw gt(zr[S.ORDER_CREATED].errorMessage,{initialStatus:e,targetStatus:t,itemId:r==null?void 0:r.id});if(Nl(e,t))throw gt(zr.nonIdleTransitions.errorMessage,{initialStatus:e,targetStatus:t,itemId:r==null?void 0:r.id});if(Ll(e,t,r))throw gt(zr.toIdleRequirements.errorMessage,{initialStatus:e,targetStatus:t,itemId:r==null?void 0:r.id,endTime:(r==null?void 0:r.end)||((o=r==null?void 0:r.status)==null?void 0:o.endTime)})}}function Nl(e,t){return e!==S.IDLE&&t!==S.IDLE}function Ll(e,t,r){var o;return e!==S.IDLE&&t===S.IDLE&&!r.end&&!((o=r.status)!=null&&o.endTime)}//! =============== 4. 時間重疊驗證 ===============
function $l(e,t=null){if(e.timeLineStatus!==S.ORDER_CREATED){if(!e||!e.start||!e.group){console.warn("validateTimeOverlap: 缺少必要的時間或群組資訊");return}try{const r=T(e.start),o=T(e.end),n=o.isValid()?o:T().add(2,"hour");let s=[];if(window.timeline&&window.app&&window.app.timelineData)s=window.app.timelineData.get({filter:function(l){return l.id!==e.id&&l.group===e.group&&l.timeLineStatus!==S.ORDER_CREATED}});else if(t)if(Array.isArray(t)){const l=t.find(c=>c.id===e.group);l&&l.items&&(s=l.items.filter(c=>c.id!==e.id&&c.timeLineStatus!==S.ORDER_CREATED))}else t.filter&&(s=t.filter(l=>l.id!==e.id&&l.group===e.group&&l.timeLineStatus!==S.ORDER_CREATED));if(s.some(l=>{const c=T(l.start),d=T(l.end),u=d.isValid()?d:c.add(2,"hour");return r.isBefore(u)&&n.isAfter(c)||r.isSame(c)||n.isSame(u)}))throw Rt("時間重疊：除了「製令單」外的其他狀態都不允許時間重疊",{itemId:e.id,group:e.group,start:e.start,end:e.end,status:e.timeLineStatus})}catch(r){if(r.type==="VALIDATION_ERROR")throw r;console.error(...oo_tx("4056104611_302_4_302_45_11","檢查時間重疊時發生錯誤，繼續執行:",r))}}}//! =============== 5. Zod 模式驗證 ===============
const Pn=L.object({start:L.string().min(1,"開始時間為必填").refine(e=>T(e).isValid(),"開始時間格式無效"),machineStatusPlanEndTime:L.string().optional().refine(e=>!e||T(e).isValid(),"計劃結束時間格式無效"),machineStatusActualEndTime:L.string().optional().refine(e=>!e||T(e).isValid(),"實際結束時間格式無效")}),xr=Pn.extend({machineSN:L.string().min(1,"機台編號為必填"),productionArea:L.string().min(1,"生產區域為必填"),timeLineStatus:L.string().min(1,"狀態類型為必填"),machineId:L.string().optional()});L.discriminatedUnion("timeLineStatus",[Pn.extend({machineSN:L.string().min(1,"機台編號為必填"),productionArea:L.string().min(1,"生產區域為必填"),timeLineStatus:L.literal(S.ORDER_CREATED),productName:L.string().min(1,"產品名稱為必填"),productSN:L.string().optional(),processName:L.string().optional(),workOrderQuantity:L.string().optional(),productionQuantity:L.string().optional(),planOnMachineDate:L.string().min(1,"計劃上機時間為必填").refine(e=>T(e).isValid(),"計劃上機時間格式無效")}),xr.extend({timeLineStatus:L.literal(S.IDLE)}),xr.extend({timeLineStatus:L.literal(S.SETUP)}),xr.extend({timeLineStatus:L.literal(S.TESTING),machineStatusProduct:L.string().min(1,"產品試模狀態必須指定產品")}),xr.extend({timeLineStatus:L.literal(S.STOPPED),machineStatusReason:L.string().min(1,"機台停機狀態必須指定原因")})]);//! =============== 5. 主要驗證函數 ===============
function Fn(e,t=!1){t||(kl(e),Pl(e),Fl(e))}function Nn(e,t,r=!1){if(r||!t)return;const o=t.timeLineStatus,n=e.timeLineStatus;kn(o,n,e)}//! =============== 1. 基礎輔助判斷函數 ===============
const Ln=e=>!e||!e.timeLineStatus?!1:e.timeLineStatus===S.ORDER_CREATED,$n=e=>!e||!e.orderInfo||!e.orderInfo.orderStatus?!1:e.orderInfo.orderStatus.toLowerCase().trim()==="on-going";function Ho(e,t,r,o="edit",n=!1){if(n&&e===t)return;if(e===t&&o!=="add")throw gt(`已經是「${e}」狀態，無需切換`,{currentStatus:e,newStatus:t,mode:o,itemId:r==null?void 0:r.id});if(o==="add"||n)return;try{const i=(r==null?void 0:r.timeLineStatus)||e;kn(i,t,r)}catch(i){throw gt(i.message,{currentStatus:(r==null?void 0:r.timeLineStatus)||e,newStatus:t,mode:o,itemId:r==null?void 0:r.id,originalError:i})}const s=(r==null?void 0:r.timeLineStatus)||e;if(!Il(s,t))throw gt(`無法從「${s}」切換到「${t}」狀態`,{currentStatus:s,newStatus:t,mode:o,itemId:r==null?void 0:r.id})}function zl(e,t){try{return $l(e,t),!1}catch(r){if(r.type==="VALIDATION_ERROR"&&r.message.includes("時間重疊"))throw new Error(r.message);return console.error("檢查時間重疊時發生錯誤，繼續執行:",r),!1}}//! =============== 3. UI 輔助函數 ===============
const Bl=(e,t,r)=>{var o;return e==="view"||t?!0:r?Gt(r)?!0:e!=="add"&&(r.productionScheduleStatus==="On-going"||r.orderInfo&&((o=r.orderInfo.orderStatus)==null?void 0:o.toLowerCase())==="on-going"):!1},_l=(e,t)=>{if(e)return"處理中...";switch(t){case"add":return"新增狀態";case"edit":return"編輯狀態";default:return"檢視狀態"}},de=[];for(let e=0;e<256;++e)de.push((e+256).toString(16).slice(1));function Wl(e,t=0){return(de[e[t+0]]+de[e[t+1]]+de[e[t+2]]+de[e[t+3]]+"-"+de[e[t+4]]+de[e[t+5]]+"-"+de[e[t+6]]+de[e[t+7]]+"-"+de[e[t+8]]+de[e[t+9]]+"-"+de[e[t+10]]+de[e[t+11]]+de[e[t+12]]+de[e[t+13]]+de[e[t+14]]+de[e[t+15]]).toLowerCase()}let Br;const Hl=new Uint8Array(16);function Yl(){if(!Br){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");Br=crypto.getRandomValues.bind(crypto)}return Br(Hl)}const Vl=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Yo={randomUUID:Vl};function Ul(e,t,r){var n;if(Yo.randomUUID&&!e)return Yo.randomUUID();e=e||{};const o=e.random??((n=e.rng)==null?void 0:n.call(e))??Yl();if(o.length<16)throw new Error("Random bytes length must be >= 16");return o[6]=o[6]&15|64,o[8]=o[8]&63|128,Wl(o)}//! =============== 1. 常量定義 ===============
const Gl="A-1",ql="待機中",Ql="A",Ir="製令單",me="YYYY-MM-DDTHH:mm:ss",Xl={machineStatusId:null,machineStatusPlanStartTime:null,machineStatusPlanEndTime:null,machineStatusActualStartTime:null,machineStatusActualEndTime:null,machineStatusReason:null,machineStatusProduct:null,productionScheduleId:null,planOnMachineDate:null,planFinishDate:null,actualOnMachineDate:null,actualFinishDate:null,postponeTime:null,workOrderSN:null,productSN:null,productName:null,workOrderQuantity:null,productionQuantity:null,processName:null,productionScheduleStatus:null};//! =============== 2. 輔助工具函數 ===============
function xe(e,t=me,r=!0){return e?r?T(e).utc().toISOString():T(e).format(t):null}function Vo(e,t=0){if(e==null)return t;const r=parseInt(e,10);return isNaN(r)?t:r}function Kl(e){var t,r,o,n;return((t=e.orderInfo)==null?void 0:t.productName)&&((r=e.orderInfo)==null?void 0:r.process)&&Ir||((o=e.status)==null?void 0:o.reason)==="機台故障"&&"機台停機"||((n=e.status)==null?void 0:n.product)&&"產品試模"||e.status&&"待機中"||ql}function zn(e,t="internal"){return e?t==="api"&&!e.machineSN&&!e.timeLineStatus?(console.warn("API資料缺少關鍵欄位"),!1):!0:(console.error(`轉換錯誤: ${t}資料為空`),!1)}//! =============== 3. 資料修復與標準化 ===============
function Zl(e){var t,r;return e.start||((t=e.status)==null?void 0:t.startTime)||((r=e.orderInfo)==null?void 0:r.scheduledStartTime)||(console.warn("缺少開始時間信息，使用當前時間"),new Date)}function Jl(e,t){var r,o;return e.end||((r=e.status)==null?void 0:r.endTime)||((o=e.orderInfo)==null?void 0:o.scheduledEndTime)||T(t).add(1,"hour").toDate()}function ec(e,t){const r=Zl(e),o=Jl(e,r),n=e.group||(t==null?void 0:t.group)||Gl;let s=e.timeLineStatus||Kl(e);return{startTime:r,endTime:o,group:n,timeLineStatus:s,isWorkOrder:s===Ir}}//! =============== 4. API轉內部格式 ===============
function tc(e,{startTime:t,endTime:r}){return{id:e.productionScheduleId||"",planStartTime:T(e.planOnMachineDate||t).toDate(),planEndTime:T(e.planFinishDate||r).toDate(),scheduledStartTime:T(e.planOnMachineDate||t).toDate(),scheduledEndTime:T(e.planFinishDate||r).toDate(),actualStartTime:e.actualOnMachineDate?T(e.actualOnMachineDate).toDate():null,actualEndTime:e.actualFinishDate?T(e.actualFinishDate).toDate():null,productId:e.productSN||"",productName:e.productName||"",quantity:Vo(e.workOrderQuantity),completedQty:Vo(e.productionQuantity),process:e.processName||"",orderStatus:e.productionScheduleStatus||"",postponeTime:e.postponeTime||null,workOrderSN:e.workOrderSN||""}}function rc(e,{startTime:t,endTime:r}){const o=e.machineStatusPlanStartTime||t,n=e.machineStatusPlanEndTime||r,s=e.machineStatusActualStartTime,i=e.machineStatusActualEndTime;return{id:e.machineStatusId||"",planStartTime:T(o).toDate(),planEndTime:T(n).toDate(),startTime:t,endTime:r,actualStartTime:s?T(s).toDate():null,actualEndTime:i?T(i).toDate():null,reason:e.machineStatusReason||"",product:e.machineStatusProduct||e.productName||""}}const oc=e=>{if(!zn(e,"api"))return null;const t=e.timeLineStatus==="製令單"?Ir:e.timeLineStatus,r=t===Ir;let o,n;r?(o=e.planOnMachineDate?T(e.planOnMachineDate):T(),n=e.planFinishDate?T(e.planFinishDate):o.add(1,"hour")):(o=T(e.machineStatusActualStartTime||e.machineStatusPlanStartTime),n=e.machineStatusActualEndTime?T(e.machineStatusActualEndTime):e.machineStatusPlanEndTime?T(e.machineStatusPlanEndTime):o.add(1,"hour"));const s={startTime:o,endTime:n},i=tc(e,s),l=rc(e,s),c={id:Ul(),group:e.machineSN,area:e.productionArea,timeLineStatus:t,className:bo(e.timeLineStatus),content:e.timeLineStatus==="製令單"?e.productName:e.timeLineStatus,_originalApiData:e};return r?(c.orderInfo=i,c.status=null,c.planStartTime=i.planStartTime,c.planEndTime=i.planEndTime,c.start=i.actualStartTime??i.planStartTime,c.end=i.actualEndTime??i.planEndTime,c.actualStartTime=i.actualStartTime,c.actualEndTime=i.actualEndTime):(c.status=l,c.orderInfo=null,c.planStartTime=l.planStartTime,c.planEndTime=l.planEndTime,c.start=l.actualStartTime??l.planStartTime,c.end=l.actualEndTime??l.planEndTime,c.actualStartTime=l.actualStartTime,c.actualEndTime=l.actualEndTime),c};//! =============== 5. 內部格式轉API - 工作訂單 ===============
function nc(e,t,r,o){var i,l,c,d,u,f,v,b,y,m,x,h,w,I,E,D;const n=xe(r,me,!0),s=xe(o,me,!0);t.productionScheduleId=((i=e.orderInfo)==null?void 0:i.id)||((l=e._originalApiData)==null?void 0:l.productionScheduleId)||"",t.planOnMachineDate=(c=e.orderInfo)!=null&&c.planStartTime?xe(e.orderInfo.planStartTime,me,!0):(d=e.orderInfo)!=null&&d.scheduledStartTime?xe(e.orderInfo.scheduledStartTime,me,!0):n,t.planFinishDate=(u=e.orderInfo)!=null&&u.planEndTime?xe(e.orderInfo.planEndTime,me,!0):(f=e.orderInfo)!=null&&f.scheduledEndTime?xe(e.orderInfo.scheduledEndTime,me,!0):s,t.actualOnMachineDate=(v=e.orderInfo)!=null&&v.actualStartTime?xe(e.orderInfo.actualStartTime,me,!0):null,t.actualFinishDate=(b=e.orderInfo)!=null&&b.actualEndTime?xe(e.orderInfo.actualEndTime,me,!0):null,t.productSN=((y=e.orderInfo)==null?void 0:y.productId)||"",t.productName=((m=e.orderInfo)==null?void 0:m.productName)||e.content||"",t.workOrderQuantity=((x=e.orderInfo)==null?void 0:x.quantity)!=null?String(e.orderInfo.quantity):"0",t.productionQuantity=((h=e.orderInfo)==null?void 0:h.completedQty)!=null?String(e.orderInfo.completedQty):"0",t.processName=((w=e.orderInfo)==null?void 0:w.process)||"",t.productionScheduleStatus=((I=e.orderInfo)==null?void 0:I.orderStatus)||"",t.postponeTime=xe((E=e.orderInfo)==null?void 0:E.postponeTime,me,!1)||null,t.workOrderSN=((D=e.orderInfo)==null?void 0:D.workOrderSN)||""}//! =============== 6. 內部格式轉API - 機台狀態 ===============
function ac(e,t,r,o){const n=xe(r,me,!0),s=xe(o,me,!0),{status:i,_originalApiData:l}=e;t.machineStatusId=i.id||"",t.status=e.timeLineStatus||"",t.planStartDate=i!=null&&i.planStartTime?xe(i.planStartTime,me,!0):i!=null&&i.startTime?xe(i.startTime,me,!0):n,t.planEndDate=i!=null&&i.planEndTime?xe(i.planEndTime,me,!0):i!=null&&i.endTime?xe(i.endTime,me,!0):s,t.machineStatusReason=(i==null?void 0:i.reason)||null,t.machineStatusProduct=(i==null?void 0:i.product)||null}//! =============== 7. 主要轉換函數 ===============
const Bn=(e,t=null,r=!1)=>{if(!zn(e,"internal"))return null;const{startTime:o,endTime:n,group:s,timeLineStatus:i,isWorkOrder:l}=ec(e,t);t&&!r&&Nn(e,t);const c={...Xl,timeLineStatus:l?"製令單":i,productionArea:e.area||Ql,machineSN:s,machineId:e.machineId||null};return l?nc(e,c,o,n):ac(e,c,o,n),c},_n=(e,t=!1)=>{const r=Bn(e,null,t);return t||Fn(r),r},Wn=(e,t,r=!1)=>{r||Nn(e,t);const o=Bn(e,t,r);return r||Fn(o),o};//! =============== 1. 業務邏輯 Hook ===============
function sc(e,t,r={}){const{onSave:o,onClose:n,groups:s}=r,[i,l]=p.useState((e==null?void 0:e.timeLineStatus)||S.IDLE),[c,d]=p.useState(null),[u,f]=p.useState(!1);p.useEffect(()=>{e!=null&&e.timeLineStatus&&l(e.timeLineStatus)},[e]);//! =============== 2. 錯誤處理函數 ===============
const v=p.useCallback(()=>{d(null)},[]),b=p.useCallback(g=>{const R=Ct(g);d(R),rt(g,{context:"EnhancedDialog",dialogMode:t,statusType:i,itemId:e==null?void 0:e.id})},[t,i,e]);//! =============== 3. 驗證函數 ===============
const y=p.useCallback(g=>{if(g.planStartTime||g.start)g.planStartTime&&!g.start&&(g.start=g.planStartTime);else{const M=$r(new Date);g.planStartTime=M,g.start=M}},[]),m=p.useCallback(g=>{if(t==="add")return;const R=(e==null?void 0:e.timeLineStatus)===g.timeLineStatus;try{Ho((e==null?void 0:e.timeLineStatus)||S.IDLE,g.timeLineStatus,e,t,R)}catch(M){throw gt(M.message,{fromStatus:(e==null?void 0:e.timeLineStatus)||S.IDLE,toStatus:g.timeLineStatus,itemId:e==null?void 0:e.id,isDataOnlyEdit:R})}},[e,t]),x=p.useCallback(g=>{try{zl(g,s)}catch(R){throw Rt(R.message,{field:"timeOverlap",item:g.id,group:g.group})}},[s]);//! =============== 4. 數據轉換函數 ===============
const h=p.useCallback(g=>{var $,P,B,G;const R=i===S.ORDER_CREATED,M=g.planStartTime||g.start,O=g.planEndTime||g.end,C={...e,id:(e==null?void 0:e.id)||"",group:g.group||(e==null?void 0:e.group)||"",area:g.area||(e==null?void 0:e.area)||"",machineId:g.machineId||(e==null?void 0:e.machineId)||null,planStartTime:M,planEndTime:R?e==null?void 0:e.planEndTime:O,start:M,end:R?e==null?void 0:e.end:O,timeLineStatus:g.timeLineStatus||i,content:g.content||(e==null?void 0:e.content)||i};return R?(C.orderInfo={...e==null?void 0:e.orderInfo,productName:g.productName||"",process:g.process??0,planStartTime:M,planEndTime:(($=e==null?void 0:e.orderInfo)==null?void 0:$.planEndTime)||O,scheduledStartTime:M,scheduledEndTime:((P=e==null?void 0:e.orderInfo)==null?void 0:P.scheduledEndTime)||O,actualStartTime:(e==null?void 0:e.actualEndTime)??((B=e==null?void 0:e.orderInfo)==null?void 0:B.actualStartTime)??null,actualEndTime:(e==null?void 0:e.actualEndTime)??((G=e==null?void 0:e.orderInfo)==null?void 0:G.actualEndTime)??null},C.status={}):(C.status={...e==null?void 0:e.status,product:g.product||"",reason:g.reason||"",planStartTime:M,planEndTime:O,startTime:M,endTime:O},C.orderInfo={}),C},[e,i]),w=p.useCallback(g=>{if(t!=="add"&&(e==null?void 0:e.timeLineStatus)!==S.IDLE&&g.timeLineStatus===S.IDLE&&!g.end){const M=new Date;g.end=$r(M),g.status.endTime=$r(M)}return g},[t,e]);//! =============== 5. API 處理函數 ===============
const I=p.useCallback(async g=>{const R=_n(g,!1);await(o==null?void 0:o({internal:g,api:R}))},[o]),E=p.useCallback(async g=>{const R=Wn(g,e,!1);await(o==null?void 0:o({internal:g,api:R}))},[o,e]);//! =============== 6. 主要提交處理 ===============
const D=p.useCallback(async g=>{if(!u)try{v(),f(!0),y(g);let R=h(g);m(R),x(R),R=w(R),t==="add"?await I(R):await E(R),n==null||n()}catch(R){b(R)}finally{f(!1)}},[u,v,b,y,h,m,x,w,I,E,n,t]);//! =============== 7. 狀態切換處理 ===============
const A=p.useCallback(g=>{try{if(v(),t==="add"&&i===g)return;Ho(i,g,e,t),l(g)}catch(R){b(R)}},[v,b,i,e,t]);//! =============== 8. 返回公共 API ===============
return{currentStatus:i,error:c,isSubmitting:u,setCurrentStatus:l,clearError:v,handleSubmit:D,handleStatusChange:A}}const ic=Ie(a.jsx("path",{d:"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9m-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8z"}),"History"),lc=F(Q)(({bgColor:e})=>({display:"inline-flex",alignItems:"center",height:"32px",padding:"0 16px",borderRadius:"16px",backgroundColor:e||"#757575",marginLeft:"16px",border:"1px solid rgba(255, 255, 255, 0.3)"})),cc=F(J)({color:"#FFFFFF",fontSize:"0.85rem",fontWeight:600,lineHeight:1.5,marginLeft:"4px",marginRight:"4px"}),dc=F(Q)({display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFFF",marginRight:"8px","& .MuiSvgIcon-root":{fontSize:"1.2rem"}}),uc=({label:e,color:t,icon:r})=>a.jsxs(lc,{bgColor:t,children:[r&&a.jsx(dc,{children:r}),a.jsx(cc,{children:e})]}),Hn=Ie(a.jsx("path",{d:"m22.7 19-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4"}),"Build"),Yn=Ie(a.jsx("path",{d:"M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z"}),"Warning"),Vn=Ie(a.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"}),"CheckCircle");//! =============== 狀態圖標組件 ===============
function pc({status:e}){switch(e){case S.ORDER_CREATED:return a.jsx(Xt,{color:"primary",variant:"dot",children:a.jsx(Ur,{fontSize:"medium"})});case S.IDLE:return a.jsx(Xt,{color:"default",variant:"dot",children:a.jsx(Ur,{fontSize:"medium"})});case S.SETUP:return a.jsx(Xt,{color:"warning",variant:"dot",children:a.jsx(Hn,{fontSize:"medium"})});case S.STOPPED:return a.jsx(Xt,{color:"error",variant:"dot",children:a.jsx(Yn,{fontSize:"medium"})});default:return a.jsx(Xt,{color:"success",variant:"dot",children:a.jsx(Vn,{fontSize:"medium"})})}}//! =============== 對話框標題組件 ===============
function fc({status:e,isSubmitting:t,mode:r,item:o}){const n=fl(e),s=_l(t,r),i=Gt(o);return a.jsxs(Q,{sx:{display:"flex",alignItems:"center"},children:[a.jsx(J,{variant:"h6",component:"span",sx:{fontWeight:600,fontSize:"18px"},children:s}),t&&a.jsx(Yt,{size:24,sx:{ml:2},color:"inherit"}),i&&a.jsx(cn,{icon:a.jsx(ic,{}),label:"歷史資料",size:"small",color:"warning",variant:"outlined",sx:{ml:2,fontSize:"12px",fontWeight:500}}),a.jsx(uc,{label:e,color:n,icon:a.jsx(pc,{status:e})})]})}const So=Ie(a.jsx("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),hc=Ie(a.jsx("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"}),"MoreVert");//! =============== 對話框操作按鈕組件 ===============
function mc({mode:e,onMenuOpen:t,onClose:r,isSubmitting:o}){const n=e!=="view";return a.jsxs(Q,{children:[n&&a.jsx(Rn,{title:"更多操作",children:a.jsx(Vr,{"aria-label":"更多操作",onClick:t,sx:{color:"inherit",padding:"8px"},children:a.jsx(hc,{fontSize:"medium"})})}),a.jsx(Vr,{"aria-label":"關閉",onClick:r,disabled:o,sx:{color:"inherit",padding:"8px",ml:1},children:a.jsx(So,{fontSize:"medium"})})]})}const vo=Ie(a.jsx("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete"),Un=Ie(a.jsx("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z"}),"Lock");//! =============== 底部操作按鈕組件 ===============
function gc({mode:e,isSubmitting:t,onClose:r,onDelete:o,item:n}){const s=Dl(n),i=Cl(n),l=Gt(n),c=e==="edit"&&!Ln(n)&&!$n(n),d=t?"處理中...":i?"確認":"查看";return a.jsxs(a.Fragment,{children:[c&&a.jsx(hl,{onClick:s?o:void 0,startIcon:s?a.jsx(vo,{}):a.jsx(Un,{}),variant:"outlined",sx:{mr:"auto"},disabled:t||!s,children:s?"刪除":"已封存"}),a.jsx(Mr,{onClick:r,disabled:t,children:"取消"}),a.jsx(An,{type:"submit",form:"status-form",variant:"contained",disabled:t||l&&e==="edit",children:d})]})}//! =============== 錯誤通知組件 ===============
function xc({error:e,onClose:t}){return a.jsx(Ma,{open:!!e,autoHideDuration:3e3,onClose:t,anchorOrigin:{vertical:"top",horizontal:"center"},children:a.jsx(rr,{severity:"error",onClose:t,sx:{fontSize:"16px","& .MuiAlert-icon":{fontSize:"24px"}},children:e})})}//! =============== 狀態變更面板組件 ===============
function bc({status:e,isSubmitting:t,onShowStatusDialog:r,item:o}){return Rl(o)?a.jsxs(Rr,{elevation:0,sx:{mb:3,p:2,display:"flex",alignItems:"center",border:"2px solid #E0E0E0",borderRadius:"6px",backgroundColor:"#F5F5F5"},children:[a.jsx(Mr,{onClick:r,startIcon:a.jsx(pn,{}),disabled:t,sx:{mr:2,fontSize:"16px"},children:"切換狀態"}),a.jsxs(J,{variant:"body1",color:"#424242",fontSize:"16px",fontWeight:500,children:["當前狀態: ",e]}),e!==S.IDLE&&a.jsx(J,{variant:"body2",color:"text.secondary",sx:{ml:2},children:"注意：當前狀態只能切換回待機狀態"})]}):null}//! =============== 對話框菜單組件 ===============
function Sc({anchorEl:e,onClose:t,mode:r,currentStatus:o,isOrder:n,isOnGoing:s,onShowStatusChange:i,onDelete:l}){const c=o!==S.ORDER_CREATED,d=r==="edit",u=d&&c,f=d&&!n,v=u&&f;return a.jsxs(ga,{anchorEl:e,open:!!e,onClose:t,transformOrigin:{horizontal:"right",vertical:"top"},anchorOrigin:{horizontal:"right",vertical:"bottom"},children:[u&&a.jsxs(Be,{onClick:i,children:[a.jsx($o,{children:a.jsx(pn,{fontSize:"small"})}),a.jsx(Do,{primary:"變更狀態",primaryTypographyProps:{fontSize:"16px",fontWeight:500}})]}),v&&a.jsx(Nt,{sx:{my:1}}),f&&a.jsxs(Be,{onClick:l,sx:{color:"error.main"},disabled:s,children:[a.jsx($o,{children:a.jsx(vo,{fontSize:"small",color:s?"disabled":"error"})}),a.jsx(Do,{primary:"刪除項目",primaryTypographyProps:{fontSize:"16px",fontWeight:500}})]})]})}//! =============== 1. 共享驗證規則 ===============
const Gn={start:L.string().min(1,"開始時間為必填").refine(e=>T(e).isValid(),"時間格式錯誤"),end:L.string().optional().or(L.literal("")).refine(e=>!e||T(e).isValid(),"時間格式錯誤"),planStartTime:L.string().min(1,"計劃開始時間為必填").refine(e=>T(e).isValid(),"時間格式錯誤"),planEndTime:L.string().optional().or(L.literal("")).refine(e=>!e||T(e).isValid(),"時間格式錯誤")},qn={group:L.string().min(1,"機台編號為必填"),area:L.string().min(1,"區域為必填")};//! =============== 2. 狀態特定驗證 ===============
function vc(e={}){return L.object({...qn,...e,planStartTime:Gn.planStartTime,planEndTime:L.any().optional(),start:L.any().optional(),end:L.any().optional()})}function kr(e={}){return L.object({...qn,...Gn,...e})}const Tc=vc({productName:L.string().optional(),process:L.string().optional(),quantity:L.coerce.number().optional(),completedQty:L.coerce.number().optional()}),yc=kr({machineId:L.coerce.number().optional()}),Ec=kr({setupInfo:L.string().optional(),reason:L.string().optional()}),wc=kr({product:L.string().optional()}),Ic=kr({product:L.string().optional(),reason:L.string().min(1,"請選擇停機原因")});//! =============== 3. 驗證模式導出 ===============
const Cc={[S.ORDER_CREATED]:Tc,[S.IDLE]:yc,[S.SETUP]:Ec,[S.TESTING]:wc,[S.STOPPED]:Ic};function Pt(e){if(!e)return console.warn("❌ [ZOD] 缺少狀態類型參數，使用空對象驗證"),L.object({});const t=Cc[e];return t||(console.warn(`❌ [ZOD] 未找到狀態 "${e}" 的驗證模式，使用空對象驗證`),L.object({}))}//! =============== 1. 設定與常量 ===============
const br={defaultValues:{id:"",group:"",timeLineStatus:"",content:"",start:"",end:"",planStartTime:"",planEndTime:"",actualStartTime:"",actualEndTime:"",productId:"",productName:"",quantity:0,completedQty:0,process:"",orderStatus:""},timePickerProps:{type:"datetime-local",InputLabelProps:{shrink:!0},inputProps:{}}},Cr={group:{required:"請選擇機台"},start:{required:"請選擇開始時間",validate:{isValid:e=>e?T(e).isValid()||"無效的日期格式":!0,isFuture:e=>e?T(e).isAfter(T())||"開始時間必須在當前時間之後":!0}}},Uo={[S.ORDER_CREATED]:{name:"製令單表單",schema:Pt(S.ORDER_CREATED),defaultValues:{group:"",start:"",planStartTime:"",planEndTime:"",actualStartTime:"",actualEndTime:""}},[S.IDLE]:{name:"待機表單",schema:Pt(S.IDLE),defaultValues:{start:T().format("YYYY-MM-DDTHH:mm"),end:T().add(2,"hour").format("YYYY-MM-DDTHH:mm"),planStartTime:T().format("YYYY-MM-DDTHH:mm"),planEndTime:T().add(1,"hour").format("YYYY-MM-DDTHH:mm"),actualStartTime:"",actualEndTime:"",group:"",area:"",machineId:0}},[S.SETUP]:{name:"上模與調機表單",schema:Pt(S.SETUP),defaultValues:{start:T().format("YYYY-MM-DDTHH:mm"),end:T().add(1,"hour").format("YYYY-MM-DDTHH:mm"),planStartTime:T().format("YYYY-MM-DDTHH:mm"),planEndTime:T().add(1,"hour").format("YYYY-MM-DDTHH:mm"),actualStartTime:"",actualEndTime:"",setupInfo:"",group:"",area:""}},[S.TESTING]:{name:"產品試模表單",schema:Pt(S.TESTING),defaultValues:{start:T().format("YYYY-MM-DDTHH:mm"),end:T().add(1,"hour").format("YYYY-MM-DDTHH:mm"),planStartTime:T().format("YYYY-MM-DDTHH:mm"),planEndTime:T().add(1,"hour").format("YYYY-MM-DDTHH:mm"),actualStartTime:"",actualEndTime:"",product:"",group:"",area:""}},[S.STOPPED]:{name:"機台停機表單",schema:Pt(S.STOPPED),defaultValues:{start:T().format("YYYY-MM-DDTHH:mm"),end:T().add(1,"hour").format("YYYY-MM-DDTHH:mm"),planStartTime:T().format("YYYY-MM-DDTHH:mm"),planEndTime:T().add(1,"hour").format("YYYY-MM-DDTHH:mm"),actualStartTime:"",actualEndTime:"",reason:"",group:"",area:""}}};//! =============== 1. 設定與常量 ===============
const _r={basic:["status","id","group","area","timeLineStatus","machineId"],order:["productName","process","quantity","completedQty","scheduledStartTime","scheduledEndTime","orderStatus","postponeTime","workOrderSN"],time:["start","end","planStartTime","planEndTime","actualStartTime","actualEndTime"],status:["startTime","endTime","reason","product","planStartDate","planEndDate","actualStartDate","actualEndDate"]},Dc={id:"id",group:"group",area:"area",timeLineStatus:"timeLineStatus",machineId:"machineId",start:["status.actualStartTime","orderInfo.actualStartTime","status.startTime","orderInfo.scheduledStartTime","start"],end:["status.actualEndTime","orderInfo.actualEndTime","status.endTime","orderInfo.scheduledEndTime","end"],planStartTime:["status.planStartTime","orderInfo.planStartTime"],planEndTime:["status.planEndTime","orderInfo.planEndTime"],actualStartTime:["status.actualStartTime","orderInfo.actualStartTime"],actualEndTime:["status.actualEndTime","orderInfo.actualEndTime"],productName:"orderInfo.productName",process:"orderInfo.process",quantity:"orderInfo.quantity",completedQty:"orderInfo.completedQty",orderStatus:"orderInfo.orderStatus",postponeTime:"orderInfo.postponeTime",workOrderSN:"orderInfo.workOrderSN",reason:"status.reason",product:"status.product"};//! =============== 2. 核心功能 ===============
function Qn(e){const t=[..._r.basic,..._r.time];return e===S.ORDER_CREATED?[...t,..._r.order]:e===S.TESTING?[...t,"product"]:e===S.STOPPED?[...t,"reason"]:e===S.SETUP?[...t,"setupInfo","reason"]:t}function Zr(e,t,r){if(!t)return null;const o=Dc[e],n=r===S.ORDER_CREATED;return Array.isArray(o)?Rc(o,t,n):o?Oc(o,t,n):t[e]}function Rc(e,t,r){for(const o of e){if(Xn(o,r))continue;const n=Kn(t,o);if(n!=null)return n}return null}function Oc(e,t,r){return Xn(e,r)?null:Kn(t,e)}function Xn(e,t){return t&&e.startsWith("status.")||!t&&e.startsWith("orderInfo.")}function Ac(e,t,r){if(e==="end"&&r===S.ORDER_CREATED){const i=Zr(e,t,r);return console.log("🔍 [processTimeField] 唯讀的 end 欄位原始值:",i),console.log("🔍 [processTimeField] 唯讀的 end 欄位類型:",i?typeof i:"undefined"),i}const o=Zr(e,t,r);return mt(o||!(e==="actualStartTime"||e==="actualEndTime")&&(e==="start"||e==="planStartTime")&&new Date||null)}function Mc(e,t,r){const o={};return e.forEach(n=>{let s;["start","end","planStartTime","planEndTime","actualStartTime","actualEndTime"].includes(n)?s=Ac(n,t,r):(s=Zr(n,t,r),n==="timeLineStatus"&&(s=s||r)),s!==void 0&&(o[n]=s)}),o}function jc(e,t,r){const o=p.useRef(!1),n=p.useRef({});return p.useEffect(()=>{if(!(!e||o.current))try{const s=Qn(t),i=Mc(s,e,t);n.current={...i},Object.entries(i).forEach(([l,c])=>{r(l,c,{shouldValidate:!0,shouldDirty:!1})}),o.current=!0}catch(s){rt(new wl("表單初始化失敗",{status:t,itemId:e==null?void 0:e.id,error:s.message})),console.error("表單初始化錯誤:",s)}},[e,r,t]),{initialized:o.current,initialFields:n.current}}function kc(e,t,r,o){return p.useMemo(()=>e?Object.keys(t).reduce((n,s)=>{const i=r(s),l=o[s];return i!==l&&(n[s]={from:l,to:i}),n},{}):{},[e,t,r,o])}const cr=(e,t)=>{const r=ja(),{register:o,setValue:n,watch:s,control:i,formState:{errors:l,isDirty:c,dirtyFields:d}}=r,u=p.useMemo(()=>Qn(e),[e]),{initialized:f,initialFields:v}=jc(t,e,n),b=kc(c,d,s,v);return{register:o,watch:s,control:i,setValue:n,errors:l,isFieldError:y=>!!l[y],initialized:f,isDirty:c,changedFields:b,fields:u,isFieldRequired:y=>u.includes(y),getFieldValue:s,resetField:(y,m={})=>{const x=v[y]||(y==="start"?mt(new Date):"");n(y,x,{shouldValidate:!0,shouldDirty:!1,...m})}}};//! =============== 4. 工具函數 ===============
const Kn=(e,t)=>{if(!e||!t)return;const r=t.split(".");if(!(r[0]==="orderInfo"&&(!e.orderInfo||e.orderInfo===null))&&!(r[0]==="status"&&(!e.status||e.status===null)))return r.reduce((o,n)=>o&&o[n]!==void 0?o[n]:void 0,e)},Pc=(e,t)=>({id:`${e}${t}`,content:`${e}${t}`,area:e}),Fc=e=>Array.from({length:xo.MACHINES_PER_AREA},(t,r)=>Pc(e,r+1));function Nc(e){if(Array.isArray(e))return e.map(t=>{const{id:r,productionArea:o,machineSN:n}=t;return{id:n,content:n,area:o,originalId:r}})}const Lc=e=>{if(e)return new fn(e)},Ve=F(Q)(({theme:e})=>({padding:e.spacing(2),backgroundColor:"#F5F5F5",border:"2px solid #9E9E9E",borderRadius:e.shape.borderRadius,height:"56px",display:"flex",flexDirection:"column",justifyContent:"center",width:"100%"})),$e=F(J)(({theme:e})=>({color:"#616161",fontSize:"0.85rem",fontWeight:500,marginBottom:e.spacing(.5)})),ze=F(J)(({theme:e})=>({color:"#212121",fontSize:"1rem",fontWeight:400})),Sr=F(J)(({theme:e})=>({fontSize:"1.1rem",fontWeight:600,color:"#424242",marginBottom:e.spacing(1),paddingLeft:e.spacing(1),borderLeft:`4px solid ${e.palette.primary.main}`})),Go=F(Q)(({type:e,theme:t})=>({display:"flex",alignItems:"center",marginRight:t.spacing(3)})),qo=F(Q)(({type:e})=>({width:20,height:20,marginRight:8,borderRadius:4,backgroundColor:e==="editable"?"#FFFFFF":"#F5F5F5",border:e==="editable"?"2px solid #1976D2":"2px solid #9E9E9E"})),$c=F(Q)(({value:e,color:t,theme:r})=>({width:"100%",height:"10px",backgroundColor:"#E0E0E0",borderRadius:"5px",marginTop:r.spacing(.5),overflow:"hidden",position:"relative","&:after":{content:'""',position:"absolute",left:0,top:0,height:"100%",width:`${e||0}%`,backgroundColor:t||"#1976D2",transition:"width 0.5s ease-in-out"}}));function Wr(e){if(!e)return"";try{const t=new Date(e);if(isNaN(t.getTime()))return console.warn("[formatISOToChineseDateTime] 無效的日期格式:",e),"";const r=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=t.getHours(),i=String(t.getMinutes()).padStart(2,"0"),l=s<12?"上午":"下午";let c;s===0?c=12:s<=12?c=s:c=s-12;const d=String(c).padStart(2,"0");return`${r}/${o}/${n} ${l}${d}:${i}`}catch(t){return console.error("[formatISOToChineseDateTime] 時間格式轉換錯誤:",t),""}}const zc=({item:e,disabled:t})=>{var v,b,y;const{register:r,errors:o,watch:n,control:s,initialized:i}=cr(S.ORDER_CREATED,e),l=n("area"),c=l?Fc(l):[];if(!i)return a.jsx(Yt,{});if(!(e!=null&&e.id)||!(e!=null&&e.orderInfo))return null;const d=e.orderInfo.quantity&&e.orderInfo.quantity>0?Math.min(100,Math.round(e.orderInfo.completedQty/e.orderInfo.quantity*100)):0,u=e.orderInfo.orderStatus==="尚未上機"||e.orderInfo.orderStatus==="暫停生產",f=t||!u;return a.jsxs(z,{container:!0,spacing:3,children:[a.jsxs(z,{item:!0,xs:12,children:[a.jsx(rr,{severity:"info",icon:!1,sx:{mb:2,display:"flex",alignItems:"center",backgroundColor:"#E3F2FD","& .MuiAlert-message":{width:"100%"}},children:a.jsxs(Q,{sx:{display:"flex",flexDirection:{xs:"column",sm:"row"},alignItems:{xs:"flex-start",sm:"center"},width:"100%"},children:[a.jsx(J,{variant:"subtitle1",fontWeight:500,sx:{mr:2,mb:{xs:1,sm:0}},children:"欄位說明:"}),a.jsxs(Q,{sx:{display:"flex",flexWrap:"wrap"},children:[a.jsxs(Go,{children:[a.jsx(qo,{type:"readonly"}),a.jsx(J,{variant:"body1",children:"灰框 = 只能查看"})]}),a.jsxs(Go,{children:[a.jsx(qo,{type:"editable"}),a.jsx(J,{variant:"body1",children:"藍框 = 可以編輯"})]})]})]})}),!u&&a.jsxs(rr,{severity:"warning",sx:{mb:2},children:["此製令單目前狀態為「",e.orderInfo.orderStatus,"」，無法編輯。 只有「尚未上機」或「暫停生產」狀態的製令單可以修改區域、機台和預計上機日。"]})]}),a.jsxs(z,{item:!0,xs:12,children:[a.jsx(Sr,{children:"基本資訊"}),a.jsx(Nt,{sx:{mb:2,borderWidth:"1px"}}),a.jsxs(z,{container:!0,spacing:3,children:[a.jsxs(z,{item:!0,xs:12,sm:4,children:[a.jsx($e,{children:"製令單號"}),a.jsx(Ve,{children:a.jsx(ze,{children:e.orderInfo.workOrderSN})})]}),a.jsxs(z,{item:!0,xs:12,sm:4,children:[a.jsx($e,{children:"產品名稱"}),a.jsx(Ve,{children:a.jsx(ze,{children:e.orderInfo.productName})})]}),a.jsxs(z,{item:!0,xs:12,sm:4,children:[a.jsx($e,{children:"製程名稱"}),a.jsx(Ve,{children:a.jsx(ze,{children:e.orderInfo.process})})]}),a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsx(Ae,{fullWidth:!0,...r("area",Cr.area),select:!0,label:"區域",error:!!o.area,helperText:(v=o.area)==null?void 0:v.message,disabled:f,value:n("area")||"",sx:{mt:1,"& .MuiOutlinedInput-root":{"& fieldset":{borderWidth:"2px",borderColor:"#1976D2"},"&:hover fieldset":{borderColor:"#1976D2"}}},children:xo.AREAS.map(m=>a.jsx(Be,{value:m,children:m},m))})}),a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsx(Ae,{fullWidth:!0,...r("group",Cr.group),select:!0,label:"機台編號",error:!!o.group,helperText:(b=o.group)==null?void 0:b.message,disabled:f||!l,value:n("group")||((y=c[0])==null?void 0:y.id)||"",sx:{mt:1,"& .MuiOutlinedInput-root":{"& fieldset":{borderWidth:"2px",borderColor:"#1976D2"},"&:hover fieldset":{borderColor:"#1976D2"}}},children:c.map(m=>a.jsx(Be,{value:m.id,children:m.content},m.id))})})]})]}),a.jsxs(z,{item:!0,xs:12,children:[a.jsx(Sr,{children:"生產數量"}),a.jsx(Nt,{sx:{mb:2,borderWidth:"1px"}}),a.jsxs(z,{container:!0,spacing:3,children:[a.jsxs(z,{item:!0,xs:12,sm:4,children:[a.jsx($e,{children:"製令數量"}),a.jsx(Ve,{children:a.jsx(ze,{children:e.orderInfo.quantity})})]}),a.jsxs(z,{item:!0,xs:12,sm:4,children:[a.jsx($e,{children:"已完成數量"}),a.jsx(Ve,{children:a.jsx(ze,{children:e.orderInfo.completedQty})})]}),a.jsxs(z,{item:!0,xs:12,sm:4,children:[a.jsx($e,{children:"完成率"}),a.jsxs(Ve,{children:[a.jsxs(Q,{sx:{display:"flex",alignItems:"center",mb:.5},children:[a.jsxs(ze,{sx:{fontSize:"1.1rem",fontWeight:500,color:d>=100?"#4CAF50":d>0?"#1976D2":"#757575"},children:[d,"%"]}),a.jsxs(ze,{sx:{ml:1},children:["(",e.orderInfo.completedQty," / ",e.orderInfo.quantity,")"]})]}),a.jsx($c,{value:d,color:d>=100?"#4CAF50":"#1976D2"})]})]})]})]}),a.jsxs(z,{item:!0,xs:12,children:[a.jsx(Sr,{children:"時程安排"}),a.jsx(Nt,{sx:{mb:2,borderWidth:"1px"}}),a.jsxs(z,{container:!0,spacing:3,children:[a.jsxs(z,{item:!0,xs:12,sm:6,children:[a.jsx($e,{children:"預計上機日"}),a.jsx(hn,{name:"planStartTime",control:s,render:({field:m,fieldState:{error:x}})=>a.jsx(Ae,{...m,fullWidth:!0,type:"datetime-local",error:!!x,helperText:(x==null?void 0:x.message)||"",disabled:f,InputLabelProps:{shrink:!0},sx:{"& .MuiOutlinedInput-root":{"& fieldset":{borderWidth:"2px",borderColor:"#1976D2"},"&:hover fieldset":{borderColor:"#1976D2"}},"& .MuiInputBase-root":{height:"56px"}}})})]}),a.jsxs(z,{item:!0,xs:12,sm:6,children:[a.jsx($e,{children:"預計完成日"}),a.jsx(Ve,{children:a.jsx(ze,{children:e.planEndTime?Wr(e.planEndTime):"-"})})]})]})]}),a.jsxs(z,{item:!0,xs:12,children:[a.jsx(Sr,{children:"生產狀態"}),a.jsx(Nt,{sx:{mb:2,borderWidth:"1px"}}),a.jsxs(z,{container:!0,spacing:3,children:[a.jsxs(z,{item:!0,xs:12,sm:6,children:[a.jsx($e,{children:"實際上機日"}),a.jsx(Ve,{children:a.jsx(ze,{children:e.orderInfo.actualStartTime?Wr(e.orderInfo.actualStartTime):"尚未開始"})})]}),a.jsxs(z,{item:!0,xs:12,sm:6,children:[a.jsx($e,{children:"延遲完成日"}),a.jsx(Ve,{children:a.jsx(ze,{children:e.orderInfo.postponeTime?Wr(e.orderInfo.postponeTime):"-"})})]}),a.jsxs(z,{item:!0,xs:12,children:[a.jsx($e,{children:"狀態"}),a.jsx(Ve,{children:a.jsxs(Q,{sx:{display:"flex",alignItems:"center"},children:[a.jsx(Q,{sx:{width:16,height:16,borderRadius:"50%",mr:1.5,bgcolor:e.orderInfo.orderStatus==="進行中"||e.orderInfo.orderStatus.toLowerCase()==="on-going"?"#4CAF50":e.orderInfo.orderStatus==="延遲"?"#F44336":"#1976D2"}}),a.jsx(ze,{sx:{fontSize:"1.1rem"},children:e.orderInfo.orderStatus||"未開始"})]})})]})]})]})]})},Bc=300,xt=(e=Bc)=>new Promise(t=>setTimeout(t,e));//! =============== 1. 欄位名稱定義 ===============
const tt={RUN:"RUN",IDLE:"IDLE",TUNING:"TUNING",TESTING:"TESTING",OFFLINE:"OFFLINE",生產中:"RUN",待機中:"IDLE",上模與調機:"TUNING",產品試模:"TESTING",機台停機:"OFFLINE"},vr=(e=0)=>{const t=new Date;return t.setDate(t.getDate()+e),t.toISOString()},Jr=e=>e[Math.floor(Math.random()*e.length)],_c=()=>{const e=[tt.RUN,tt.IDLE,tt.TUNING,tt.TESTING,tt.OFFLINE];return Jr(e)},Wc=["塑膠杯蓋-A型","汽車零件-B123","電子外殼-C456","玩具配件-D789","容器本體-E001","包裝盒-F002","面板框架-G003","手機外殼-H004","工具握把-I005",null],Hc=["定期保養","模具更換","設備故障","材料短缺","品質調整","計劃性停機",null],Yc=(e,t,r="單")=>{const o=_c(),n=o===tt.RUN,s=o===tt.OFFLINE,i=e.replace(/[A-Z]/g,""),c=(t.charCodeAt(0)-64)*100+parseInt(i);return{machine:{id:c,machineSN:e,productionArea:t,singleOrDoubleColor:r},machineStatusId:c*10+Math.floor(Math.random()*1e3),machineId:c,status:o,planStartDate:vr(-2),planEndDate:vr(3),actualStartDate:vr(-1),actualEndDate:n?null:vr(0),machineStatusProduct:n||o===tt.TUNING?Jr(Wc.filter(d=>d!==null)):null,machineStatusReason:s||o===tt.TUNING?Jr(Hc.filter(d=>d!==null)):null}},Ge=e=>({A:[{sn:"A1",color:"雙"},{sn:"A2",color:"單"},{sn:"A3",color:"單"},{sn:"A4",color:"單"},{sn:"A5",color:"單"},{sn:"A6",color:"單"},{sn:"A7",color:"單"},{sn:"A8",color:"單"},{sn:"A9",color:"單"},{sn:"A10",color:"單"}],B:[{sn:"B1",color:"單"},{sn:"B2",color:"雙"},{sn:"B3",color:"雙"},{sn:"B4",color:"雙"},{sn:"B5",color:"雙"},{sn:"B6",color:"雙"},{sn:"B7",color:"雙"},{sn:"B8",color:"雙"},{sn:"B9",color:"雙"},{sn:"B10",color:"雙"},{sn:"B11",color:"單"}],C:[{sn:"C1",color:"雙"},{sn:"C2",color:"單"},{sn:"C3",color:"單"},{sn:"C4",color:"單"},{sn:"C5",color:"單"},{sn:"C6",color:"單"},{sn:"C7",color:"單"},{sn:"C8",color:"單"},{sn:"C9",color:"單"}],D:[{sn:"D1",color:"單"},{sn:"D2",color:"單"},{sn:"D3",color:"單"},{sn:"D4",color:"單"},{sn:"D5",color:"單"},{sn:"D6",color:"單"},{sn:"D7",color:"單"},{sn:"D8",color:"單"},{sn:"D9",color:"單"}]}[e]||[]).map(o=>Yc(o.sn,e,o.color)),Vc=()=>({A:Ge("A"),B:Ge("B"),C:Ge("C"),D:Ge("D")});Vc();const Uc=no.injectEndpoints({endpoints:e=>({getMachines:e.query({async queryFn(){{await xt();const r=["A","B","C","D"].flatMap(o=>Ge(o).map(s=>s.machine));return console.log("[Mock API] 獲取機台列表:",r.length,"台機器"),console.log("[Mock API] 機台資料前3筆:",r.slice(0,3)),console.log("[Mock API] 返回結構:",{data:r}),{data:r}}},providesTags:["Machine"]}),getMachinesByArea:e.query({async queryFn(t){{await xt();const o=Ge(t).map(n=>n.machine);return console.log(`[Mock API] 獲取區域 ${t} 的機台:`,o.length,"台機器"),{data:o}}},providesTags:(t,r,o)=>[{type:"Machine",id:o}]})})}),{useGetMachinesQuery:Zn,useGetMachinesByAreaQuery:Bu}=Uc,Gc=({register:e,errors:t,disabled:r,title:o="時程安排"})=>{var n,s,i,l;return a.jsxs(a.Fragment,{children:[a.jsxs(z,{item:!0,xs:12,children:[a.jsx(J,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:o}),a.jsxs(z,{container:!0,spacing:2,children:[a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsx(Ae,{fullWidth:!0,...e("planStartTime"),...br.timePickerProps,label:"預計開始時間",error:!!(t!=null&&t.planStartTime),helperText:((n=t==null?void 0:t.planStartTime)==null?void 0:n.message)||"",disabled:r})}),a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsx(Ae,{fullWidth:!0,...e("planEndTime"),...br.timePickerProps,label:"預計結束時間",error:!!(t!=null&&t.planEndTime),helperText:((s=t==null?void 0:t.planEndTime)==null?void 0:s.message)||"",disabled:r})})]})]}),a.jsx(z,{item:!0,xs:12,children:a.jsxs(z,{container:!0,spacing:2,children:[a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsx(Ae,{fullWidth:!0,...e("actualStartTime"),...br.timePickerProps,label:"實際開始時間",error:!!(t!=null&&t.actualStartTime),helperText:((i=t==null?void 0:t.actualStartTime)==null?void 0:i.message)||"",disabled:r})}),a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsx(Ae,{fullWidth:!0,...e("actualEndTime"),...br.timePickerProps,label:"實際結束時間",error:!!(t!=null&&t.actualEndTime),helperText:((l=t==null?void 0:t.actualEndTime)==null?void 0:l.message)||"",disabled:r})})]})})]})},Pr=ro.memo(Gc),qc=({disabled:e,item:t,status:r,mode:o="create"})=>{var O;const{register:n,errors:s,watch:i,setValue:l,isFieldError:c,initialized:d,control:u}=cr(S.IDLE,t),f=Zn(),{isSuccess:v,isLoading:b,data:y}=f;console.log("[Idle] queryResult 完整結構:",f),console.log("[Idle] queryResult.data:",f.data),console.log("[Idle] queryResult.data?.data:",(O=f.data)==null?void 0:O.data);const m=i("area"),x=i("group"),h=o==="edit";console.log("[Idle] 表單模式:",o),console.log('[Idle] watch("area"):',m),console.log('[Idle] watch("group"):',x);const w=p.useMemo(()=>jr(S.IDLE,t),[t]),I=p.useMemo(()=>!v||!y?[]:[...new Set(y.map(C=>C.productionArea))].sort(),[y,v]),E=p.useMemo(()=>!v||!y||!m?[]:y.filter(C=>C.productionArea===m),[y,m,v]);if(!d||b)return a.jsx(Yt,{size:24});if(!t)return null;const D=e||w,A=D,g=D||!m;console.log("[Idle] 機台API狀態:",{isSuccess:v,isLoading:b,machinesDataLength:y==null?void 0:y.length}),console.log("[Idle] machinesData 類型:",Array.isArray(y)?"陣列":typeof y),console.log("[Idle] machinesData 完整:",y),console.log("[Idle] machinesData 前3筆:",y==null?void 0:y.slice(0,3)),console.log("[Idle] machinesData[0] 結構:",y==null?void 0:y[0]),console.log("[Idle] 可用區域:",I),console.log("[Idle] 選擇的區域:",m),console.log("[Idle] 過濾後的機台:",E),console.log("[Idle] item 資料:",t);const R=()=>{var C;return w?"此狀態已開始執行，無法修改":m?E.length===0?"此區域無可用機台":((C=s.group)==null?void 0:C.message)||"":"請先選擇區域"},M=()=>{var C;return w?"此狀態已開始執行，無法修改":((C=s.area)==null?void 0:C.message)||""};return a.jsxs(z,{container:!0,spacing:3,children:[w&&a.jsx(z,{item:!0,xs:12,children:a.jsx(rr,{severity:"info",icon:a.jsx(Un,{}),sx:{mb:2},children:"此狀態已開始執行，成為歷史紀錄，無法修改"})}),a.jsxs(z,{item:!0,xs:12,children:[a.jsxs(J,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:["機台選擇",w?" - 歷史紀錄":""]}),a.jsxs(z,{container:!0,spacing:2,children:[a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsxs(Ae,{fullWidth:!0,...n("area",Cr.area),select:!0,label:"區域",error:c("area"),helperText:M(),disabled:A,value:m||"",children:[a.jsx(Be,{value:"",disabled:!0,children:"請選擇區域"}),I.map(C=>a.jsx(Be,{value:C,children:C},C))]})}),a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsx(hn,{name:"group",control:u,rules:h?{}:Cr.group,render:({field:C})=>a.jsx(Ae,{...C,fullWidth:!0,select:!0,label:"機台編號",error:c("group"),helperText:R(),disabled:g,value:C.value||"",onChange:$=>{const P=y==null?void 0:y.find(B=>B.machineSN===$.target.value);P&&l("machineId",P.id),C.onChange($.target.value)},children:E.length>0?[a.jsx(Be,{value:"",disabled:!0,children:"請選擇機台"},"placeholder"),...E.map($=>a.jsx(Be,{value:$.machineSN,children:$.machineSN},$.id))]:a.jsx(Be,{value:"",disabled:!0,children:m?"此區域無可用機台":"請先選擇區域"})})})})]})]}),a.jsx("input",{type:"hidden",...n("machineId")}),a.jsx(Pr,{register:n,errors:s,disabled:D})]})},Qc=({disabled:e,item:t})=>{var s;const{register:r,errors:o,initialized:n}=cr(S.SETUP,t);return!t||!n?a.jsx(Yt,{}):a.jsxs(z,{container:!0,spacing:2,children:[a.jsx(Pr,{register:r,errors:o,disabled:e}),a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsx(Ae,{fullWidth:!0,...r("reason"),label:"調機說明",multiline:!0,rows:2,error:!!o.reason,helperText:(s=o.reason)==null?void 0:s.message,disabled:e})})]})},Xc=({disabled:e,item:t})=>{var s;const{register:r,errors:o,initialized:n}=cr(S.TESTING,t);return a.jsxs(z,{container:!0,spacing:1,children:[a.jsx(Pr,{register:r,errors:o,disabled:e}),a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsx(Ae,{fullWidth:!0,...r("product"),label:"測試產品",error:!!o.product,helperText:((s=o.product)==null?void 0:s.message)||"",disabled:e})})]})},Kc=({disabled:e,item:t})=>{var d;const{register:r,errors:o,watch:n,initialized:s}=cr(S.STOPPED,t),i=["機台故障","人員不足","等待物料","機台保養","塑料未乾","模具維修","換模換線","異常停機"],l=n("reason"),c=u=>u?i.includes(u)?!0:"請選擇有效的停機原因":"請選擇停機原因";return a.jsxs(z,{container:!0,spacing:2,children:[a.jsx(Pr,{register:r,errors:o,disabled:e}),a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsxs(Ae,{fullWidth:!0,...r("reason",{required:"請選擇停機原因",validate:c}),select:!0,label:"停機原因",error:!!o.reason,helperText:((d=o.reason)==null?void 0:d.message)||"",required:!0,disabled:e,value:l||"",children:[a.jsx(Be,{value:"",disabled:!0,children:"請選擇停機原因"}),i.map(u=>a.jsx(Be,{value:u,children:u},u))]})})]})};//! =============== 1. 表單標題映射 ===============
const Zc={[S.ORDER_CREATED]:"製令單詳細資訊",[S.IDLE]:"待機狀態設定",[S.SETUP]:"設置狀態設定",[S.TESTING]:"測試狀態設定",[S.STOPPED]:"停機狀態設定"},Qo={[S.ORDER_CREATED]:zc,[S.IDLE]:qc,[S.SETUP]:Qc,[S.TESTING]:Xc,[S.STOPPED]:Kc};function Jc(e,t=!0){return t?Zc[e]||"狀態設定":`${e} 狀態設定 (使用默認表單)`}//! =============== 2. 表單控制器 ===============
const ed=({status:e,item:t,disabled:r,onSubmit:o,mode:n="create",isSubmitting:s,onClose:i,groups:l})=>{const[c,d]=p.useState(null),u=jr(e,t),f=e==="製令單"?S.ORDER_CREATED:e,v=!!Uo[f],b=v?f:S.IDLE,y=Uo[b],m=ka({defaultValues:{...(y==null?void 0:y.defaultValues)||{},...t==null?void 0:t.status,group:(t==null?void 0:t.group)||"",area:(t==null?void 0:t.area)||"",...vl(t)},resolver:Pa(Pt(b)),mode:"onChange"}),x=m.formState.errors;p.useEffect(()=>{Object.keys(x).length>0},[x,b]);const h=Qo[b]||Qo[S.IDLE],w=p.useCallback(I=>{d(null);try{const E={...I,...I.quantity!==void 0&&{quantity:Number(I.quantity)},...I.completedQty!==void 0&&{completedQty:Number(I.completedQty)},timeLineStatus:f};console.log(`✅ [表單] ${f} 提交前的最終數據:`,E),o(E)}catch(E){const D=Ct(E);throw d(D),rt(E,{component:"StatusController",status:f,formData:JSON.stringify(I).substring(0,200)}),E}},[f,b,o]);return a.jsx(Fa,{...m,children:a.jsxs("form",{id:"status-form",onSubmit:m.handleSubmit(w),children:[c&&a.jsx(rr,{severity:"error",sx:{mb:2},onClose:()=>d(null),children:c}),a.jsxs(Q,{sx:{mb:3},children:[a.jsx(ml,{children:Jc(b,v)}),a.jsx(gl,{children:s?a.jsx(Q,{sx:{display:"flex",justifyContent:"center",alignItems:"center",height:"200px"},children:a.jsx(Yt,{size:40})}):a.jsx(h,{disabled:r||u,item:t,groups:l,mode:n})})]})]})})},td=p.memo(ed),rd=Ie(a.jsx("path",{d:"M9 1h6v2H9zm10.03 6.39 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M13 14h-2V8h2z"}),"Timer"),od=Ie(a.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-1 14H9V8h2zm4 0h-2V8h2z"}),"PauseCircle"),nd=F(Q)(({active:e,disabled:t,statusColor:r})=>({padding:"24px 16px",borderRadius:"6px",border:`2px solid ${e?r:t?"#E0E0E0":"#9E9E9E"}`,backgroundColor:e?`${r}08`:"#FFFFFF",cursor:t?"not-allowed":"pointer",opacity:t?.7:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"140px",textAlign:"center",boxShadow:e?"0 2px 8px rgba(0,0,0,0.1)":"none","&:hover":{boxShadow:t?"none":"0 4px 8px rgba(0,0,0,0.1)",transform:t?"none":"translateY(-2px)",backgroundColor:e?`${r}12`:"#F5F5F5",borderColor:t?"#E0E0E0":e?r:"#616161"}})),ad=F(Q)(({statusColor:e})=>({display:"flex",alignItems:"center",justifyContent:"center",color:e,marginBottom:"16px","& .MuiSvgIcon-root":{fontSize:"3rem"}})),sd=[{value:S.IDLE,label:"待機中",description:"機台待命狀態",icon:a.jsx(rd,{}),color:"#757575"},{value:S.SETUP,label:"設置中",description:"機台設置與調整",icon:a.jsx(Hn,{}),color:"#FF9800"},{value:S.TESTING,label:"產品試模",description:"進行產品測試",icon:a.jsx(Vn,{}),color:"#4CAF50"},{value:S.STOPPED,label:"機台停機",description:"機台暫停運作",icon:a.jsx(od,{}),color:"#F44336"}],id=({open:e,onClose:t,currentStatus:r,onStatusChange:o,disabled:n,mode:s,item:i})=>{const l=c=>{try{if(r===c)return!0;const d=(i==null?void 0:i.timeLineStatus)||r;return!(d===S.ORDER_CREATED||d!==S.IDLE&&c!==S.IDLE)}catch{return!0}};return a.jsxs(fo,{open:e,onClose:t,maxWidth:"md","aria-labelledby":"status-change-dialog-title",children:[a.jsxs(ho,{id:"status-change-dialog-title",children:[a.jsxs(Q,{sx:{display:"flex",alignItems:"center"},children:["變更機台狀態",n&&a.jsx(Yt,{size:24,sx:{ml:2}})]}),a.jsx(Q,{children:a.jsx(Rn,{title:"關閉",children:a.jsx("span",{children:a.jsx(So,{onClick:t,sx:{cursor:"pointer",fontSize:"24px"}})})})})]}),a.jsxs(mo,{children:[a.jsx(J,{variant:"h6",sx:{mb:3,fontWeight:500,color:"#212121",fontSize:"18px"},children:"請選擇要切換的狀態："}),a.jsx(Nt,{sx:{mb:3,borderWidth:"1px"}}),a.jsx(z,{container:!0,spacing:3,children:sd.map(c=>{const d=r===c.value,u=n||!l(c.value);return a.jsx(z,{item:!0,xs:12,sm:6,children:a.jsx(Q,{sx:{position:"relative"},children:a.jsxs(nd,{active:d,disabled:u,statusColor:c.color,onClick:()=>{!u&&!d&&o(c.value)},children:[a.jsx(ad,{statusColor:c.color,children:c.icon}),a.jsx(J,{variant:"h6",fontWeight:600,color:d?c.color:"#212121",fontSize:"18px",sx:{mb:1},children:c.label}),a.jsx(J,{variant:"body1",color:"#616161",fontSize:"16px",children:c.description}),u&&!d&&a.jsx(Q,{sx:{position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(255,255,255,0.7)",borderRadius:"6px",border:"2px solid #E0E0E0"},children:a.jsx(J,{color:"#616161",fontSize:"16px",fontWeight:500,children:"無法切換到此狀態"})})]})})},c.value)})})]}),a.jsx(go,{children:a.jsx(Mr,{onClick:t,sx:{fontSize:"16px"},children:"關閉"})})]})};//! =============== 現代化主組件 ===============
function ld({open:e,onClose:t,item:r,mode:o="view",onSave:n,onDelete:s,groups:i}){const l=sc(r,o,{onSave:n,onClose:t,groups:i}),[c,d]=p.useState(!1),[u,f]=p.useState(0),[v,b]=p.useState(null),y=p.useId();//! =============== UI 事件處理 ===============
const m=p.useCallback(O=>{b(O.currentTarget)},[]),x=p.useCallback(()=>{b(null)},[]),h=p.useCallback((O,C)=>{f(C)},[]),w=p.useCallback(()=>{d(!0),x()},[x]),I=p.useCallback(O=>{l.handleStatusChange(O),d(!1)},[l]),E=p.useCallback(()=>{r!=null&&r.id&&(s==null||s(r.id)),x()},[r,s,x]);//! =============== 渲染邏輯 ===============
if(!r)return null;const D=l.currentStatus!==S.ORDER_CREATED&&o==="edit",A=o==="add",g=Bl(o,l.isSubmitting,r),R=Ln(r),M=$n(r);//! =============== 組件渲染 ===============
return a.jsxs(a.Fragment,{children:[a.jsxs(fo,{open:e,onClose:l.isSubmitting?void 0:t,maxWidth:"md",fullWidth:!0,disableEscapeKeyDown:l.isSubmitting,keepMounted:!1,"aria-labelledby":y,children:[a.jsxs(ho,{id:y,children:[a.jsx(fc,{status:l.currentStatus,isSubmitting:l.isSubmitting,mode:o,item:r}),a.jsx(mc,{mode:o,onMenuOpen:m,onClose:t,isSubmitting:l.isSubmitting})]}),A&&a.jsx(xl,{value:u,onChange:h,"aria-label":"狀態頁籤",variant:"scrollable",scrollButtons:"auto",children:a.jsx(bl,{label:S.IDLE,value:0})}),a.jsxs(mo,{dividers:!0,children:[D&&a.jsx(bc,{status:l.currentStatus,isSubmitting:l.isSubmitting,onShowStatusDialog:w,item:r}),a.jsx(td,{status:l.currentStatus,item:r,disabled:g,onSubmit:l.handleSubmit,mode:o,isSubmitting:l.isSubmitting,onClose:t,groups:i})]}),a.jsx(go,{children:a.jsx(gc,{mode:o,isSubmitting:l.isSubmitting,onClose:t,onDelete:E,item:r})})]}),a.jsx(id,{open:c,onClose:()=>d(!1),currentStatus:l.currentStatus,onStatusChange:I,disabled:l.isSubmitting,mode:o,item:r}),a.jsx(xc,{error:l.error,onClose:l.clearError}),a.jsx(Sc,{anchorEl:v,onClose:x,mode:o,currentStatus:l.currentStatus,isOrder:R,isOnGoing:M,onShowStatusChange:w,onDelete:E})]})}//! =============== 1. 事件系統 ===============
const cd=()=>{const e={};return{on:(o,n)=>(e[o]||(e[o]=[]),e[o].push(n),()=>{e[o]=e[o].filter(s=>s!==n)}),emit:(o,n)=>{e[o]&&e[o].forEach(s=>{s(n)})}}};//! =============== 2. 對話框管理器 ===============
const dd=()=>{const e=cd();let t={isOpen:!1,mode:"view",item:null,groups:[]},r={isOpen:!1,itemId:null},o=[];const n=m=>{o=m||[]},s=(m,x,h)=>{t={isOpen:!0,mode:x,item:m,groups:h||o},e.emit("itemDialog:update",t)},i=()=>{t={...t,isOpen:!1},e.emit("itemDialog:update",t)},l=m=>e.on("itemDialog:update",m),c=m=>{e.emit("itemDialog:save",m)},d=m=>e.on("itemDialog:save",m),u=m=>{r={isOpen:!0,itemId:m},e.emit("deleteDialog:update",r)},f=()=>{r={...r,isOpen:!1},e.emit("deleteDialog:update",r)};return{setGroups:n,openItemDialog:s,closeItemDialog:i,onItemDialogChange:l,saveItem:c,onSaveItem:d,openDeleteDialog:u,closeDeleteDialog:f,onDeleteDialogChange:m=>e.on("deleteDialog:update",m),confirmDelete:()=>{e.emit("deleteDialog:confirm",r.itemId),f(),i()},onConfirmDelete:m=>e.on("deleteDialog:confirm",m)}};//! =============== 3. 單例實現 ===============
const ud=(()=>{let e;return e||(e=dd()),e})(),{setGroups:Jn,openItemDialog:Xo,closeItemDialog:Ko,onItemDialogChange:pd,saveItem:fd,onSaveItem:hd,openDeleteDialog:ea,closeDeleteDialog:md,onDeleteDialogChange:gd,confirmDelete:xd,onConfirmDelete:bd}=ud;function Sd(){const[e,t]=p.useState({isOpen:!1,mode:"view",item:null,groups:[]});p.useEffect(()=>pd(t),[]);const r=n=>{fd(n),Ko()},o=()=>{var n;(n=e.item)!=null&&n.id&&ea(e.item.status.id)};return!e.isOpen||!e.item?null:dn.createPortal(a.jsx(ld,{open:e.isOpen,onClose:()=>Ko(),item:e.item,mode:e.mode,onSave:r,onDelete:o,groups:e.groups}),document.body)}const vd=({open:e,title:t="刪除確認",content:r="確定要刪除這個項目嗎？",onConfirm:o,onCancel:n,confirmText:s="刪除",cancelText:i="取消"})=>a.jsxs(fo,{open:e,onClose:n,maxWidth:"sm","aria-labelledby":"delete-dialog-title",children:[a.jsxs(ho,{id:"delete-dialog-title",sx:{backgroundColor:ue.colors.accent.red},children:[a.jsx(Q,{sx:{display:"flex",alignItems:"center"},children:t}),a.jsx(Vr,{"aria-label":"關閉",onClick:n,sx:{color:ue.colors.text.contrast},children:a.jsx(So,{})})]}),a.jsxs(mo,{children:[a.jsxs(Q,{sx:{display:"flex",alignItems:"center",backgroundColor:"rgba(244, 67, 54, 0.08)",borderRadius:ue.size.borderRadius,padding:2,marginBottom:2},children:[a.jsx(Yn,{sx:{fontSize:40,color:ue.colors.accent.red,marginRight:2}}),a.jsx(J,{variant:"body1",children:r})]}),a.jsx(J,{variant:"body2",color:"textSecondary",children:"此操作不可撤銷，刪除後的數據無法復原。"})]}),a.jsxs(go,{children:[a.jsx(Mr,{onClick:n,sx:{mr:1},children:i}),a.jsx(An,{onClick:o,variant:"contained",color:"error",startIcon:a.jsx(vo,{}),sx:{backgroundColor:ue.colors.accent.red,"&:hover":{backgroundColor:ue.colors.accent.red,opacity:.9}},children:s})]})]});function Td(){const[e,t]=p.useState({isOpen:!1,itemId:null});return p.useEffect(()=>gd(o=>{t(o)}),[]),e.isOpen?dn.createPortal(a.jsx(vd,{open:e.isOpen,title:"刪除確認",content:"確定要刪除這個生產項目嗎？此操作將會移除所有相關的排程資訊。",onConfirm:()=>xd(),onCancel:()=>md(),confirmText:"刪除",cancelText:"取消"}),document.body):null}function yd(){return a.jsxs(a.Fragment,{children:[a.jsx(Sd,{}),a.jsx(Td,{})]})}const Ed=xa`
  :root {
    --factory-font-family: "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", sans-serif;
    --factory-transition: all 0.2s ease;
  }

  /* 🏭 時間軸樣式 - 工廠老人友善超大字體 */
  .vis-time-axis .vis-text.vis-major {
    font-size: 42px !important;        /* 年份日期超大 - 工廠環境 */
    font-weight: 800;       /* 超粗體 */
    padding: 12px 20px;     /* 大內距 */
    transition: var(--factory-transition);
  }

  .vis-time-axis .vis-text.vis-minor {
    font-size: 32px;        /* 時間標籤大字體 */
    font-weight: 700;       /* 粗體 */
    padding: 10px 16px;     /* 適中內距 */
    transition: var(--factory-transition);
  }

  .vis-time-axis .vis-text {
    font-size: 28px;        /* 一般時間軸文字 */
    font-weight: 600;       /* 半粗體 */
    padding: 10px 16px;     /* 適中內距 */
    font-family: var(--factory-font-family);
  }

  /* 🏷️ 機台標籤 - 最重要，需要最大字體 */
  .vis-labelset .vis-label {
    font-size: 24px;        /* 機台名稱大字體 */
    font-weight: 700;       /* 粗體 */
    padding: 12px 16px;     /* 大內距 */
    line-height: 1.5;       /* 寬鬆行高 */
  }

  .vis-labelset .vis-label:hover {
    background-color: rgba(24, 108, 152, 0.05);
  }

  /* 📦 時間線項目 - 增大以便老人閱讀 */
  .vis-item {
    font-size: 20px;        /* 項目基礎字體 */
    min-height: 56px;       /* 大高度 */
    height: auto;
    line-height: 1.4;       /* 適中行高 */
    border-width: 2px;      /* 粗邊框 */
    border-radius: 8px;     /* 圓角 */
    transition: var(--factory-transition);
    font-family: var(--factory-font-family);
  }

  .vis-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);  /* 增強陰影 */
  }

  .vis-item.vis-selected {
    border-width: 3px;      /* 超粗選中邊框 */
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.3);  /* 選中光環 */
  }

  /* 📝 內容文字 - 工廠環境大字體 */
  .vis-item .vis-item-content,
  .vis-item-content,
  .vis-item .timeline-item-content .content {
    font-size: 20px;        /* 內容文字大字體 */
    font-weight: 600;       /* 半粗體 */
    line-height: 1.4;       /* 適中行高 */
  }

  .vis-item .timeline-item-content .status {
    font-size: 18px;        /* 狀態文字 */
    font-weight: 600;       /* 半粗體 */
  }

  .vis-item .timeline-item-content .order-info .product-name {
    font-size: 22px;        /* 產品名稱突出 */
    font-weight: 700;       /* 粗體 */
  }

  .vis-item .timeline-item-content .time,
  .vis-item .timeline-item-content .process,
  .vis-item .timeline-item-content .order-info .process {
    font-size: 16px;        /* 細節資訊 */
    font-weight: 500;       /* 中等字重 */
    opacity: 0.9;           /* 高可見度 */
  }

  /* 🎯 項目類型 - 統一大字體 */
  .vis-item.vis-box,
  .vis-item.vis-point,
  .vis-item.vis-range {
    font-size: 20px;        /* 統一項目字體 */
    min-height: 56px;       /* 統一高度 */
  }

  .vis-item.vis-background {
    font-size: 18px;        /* 背景項目 */
    opacity: 0.8;           /* 適度透明 */
  }

  /* 🔄 基礎設定 - 工廠友善字體 */
  .vis-timeline {
    font-family: var(--factory-font-family);
    font-size: 18px;        /* 基礎大字體 */
  }

  /* 📱 響應式 - 保持超大字體在不同螢幕 */
  @media (max-width: 1024px) {
    .vis-time-axis .vis-text.vis-major {
      font-size: 36px;      /* 平板版年份 */
      padding: 10px 16px;   
    }

    .vis-time-axis .vis-text.vis-minor {
      font-size: 30px;      /* 平板版時間 */
      padding: 8px 12px;    
    }

    .vis-time-axis .vis-text {
      font-size: 26px;      /* 平板版一般文字 */
      padding: 8px 12px;    
    }

    .vis-labelset .vis-label {
      font-size: 22px;      /* 平板版機台標籤 */
      padding: 10px 14px;   
    }

    .vis-item {
      font-size: 18px;      /* 平板版項目 */
      min-height: 52px;     
    }
  }

  @media (max-width: 768px) {
    .vis-time-axis .vis-text.vis-major {
      font-size: 32px;      /* 手機版年份 */
      padding: 8px 12px;    
    }

    .vis-time-axis .vis-text.vis-minor {
      font-size: 26px;      /* 手機版時間 */
      padding: 6px 10px;    
    }

    .vis-time-axis .vis-text {
      font-size: 24px;      /* 手機版一般文字 */
      padding: 6px 10px;    
    }

    .vis-labelset .vis-label {
      font-size: 20px;      /* 手機版機台標籤 */
      padding: 8px 12px;    
    }

    .vis-item {
      font-size: 16px;      /* 手機版項目 */
      min-height: 48px;     
    }
  }
`,et={colors:{header:"#186c98",text:"#ffffff",gridMinor:"#00bbc9",gridMajor:"#00747c",hover:"rgba(25, 118, 210, 0.05)",weekend:"rgba(25, 118, 210, 0.08)",rowAlternate:"rgba(0, 0, 0, 0.02)"},spacing:{base:"1rem",label:"2px 14px"}},wd=ne.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  /* 🎨 科技感漸層背景 */
  background: linear-gradient(
    135deg,
    #0f2027 0%,
    #203a43 25%,
    #2c5364 50%,
    #203a43 75%,
    #0f2027 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;

  /* 添加微妙的網格紋理效果 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    border-radius: 12px;
    pointer-events: none;
    opacity: 0.5;
  }

  /* 漸層動畫 */
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* BaseTimelineContainer 樣式 */
  .vis-timeline {
    border: none;
    font-family: "Noto Sans TC", sans-serif;
    padding: ${et.spacing.base};
    background: rgba(255, 255, 255, 0.95);
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }

  /* TimeAxisStyles 樣式 */
  .vis-panel.vis-top,
  .vis-time-axis.vis-foreground {
    background-color: ${et.colors.header};
  }

  .vis-time-axis .vis-text {
    color: ${et.colors.text} !important;
    padding: 3px 5px;
    font-size: 13px;
  }

  /* 主要刻度樣式 */
  .vis-time-axis .vis-text.vis-major {
    font-weight: bold;
    font-size: 18px;
  }

  /* 次要刻度樣式 */
  .vis-time-axis .vis-text.vis-minor {
    color: rgba(255, 255, 255, 0.8);
  }

  /* 週末樣式 */
  .vis-time-axis .vis-text.vis-saturday,
  .vis-time-axis .vis-text.vis-sunday {
    color: #bbdefb;
    font-weight: bold;
  }

  /* CurrentTimeMarker 樣式 */
  .vis-current-time {
    background-color: #f44336;
    width: 2px;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -4px;
      width: 10px;
      height: 10px;
      background-color: #f44336;
      border-radius: 50%;
    }
  }

  /* TimelineGrid 網格樣式 */
  .vis-grid.vis-minor {
    border-color: rgba(0, 0, 0, 0.05);
    border-left: 1px dashed ${et.colors.gridMinor};
  }

  .vis-grid.vis-major {
    border-left: 2px solid ${et.colors.gridMajor};
  }

  /* 滾動條樣式 */
  .vis-panel.vis-center {
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 3px;
    }
  }

  /* 行樣式 */
  .vis-panel.vis-center .vis-content .vis-itemset .vis-foreground .vis-group {
    transition: background-color 0.2s ease;

    &:nth-child(odd) {
      background-color: ${et.colors.rowAlternate};
    }

    &:hover {
      background-color: ${et.colors.hover};
    }
  }

  /* 週末特殊樣式 */
  .vis-time-axis .vis-grid.vis-saturday,
  .vis-time-axis .vis-grid.vis-sunday {
    background-color: ${et.colors.weekend};
  }

  /* 標籤樣式 */
  .vis-labelset .vis-label {
    padding: ${et.spacing.label};
    min-height: 45px;  /* 🎯 與項目高度保持一致 */
    display: flex;
    align-items: center;  /* 垂直居中對齊 */

    &[data-color] {
      background-color: var(--row-color);
    }
  }

  /* 群組樣式 - 確保與標籤高度一致 */
  .vis-foreground .vis-group {
    min-height: 45px;  /* 🎯 與項目和標籤高度保持一致 */
  }

  /* 項目樣式 (BaseItem) */
  .vis-item {
    min-height: 45px;  /* 🎯 改為 min-height，讓 vis-timeline 控制實際高度 */
    line-height: 1.4;  /* 🔧 改為相對行高，更靈活 */
    border-radius: 4px;
    font-size: 14px;
    padding: 0 8px;
    border-width: 1px;
    transition: color 0.2s ease;

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &.vis-selected {
      box-shadow: 0 0 0 2px #1976d2;
      z-index: 2;
    }

    /* 項目內容結構 */
    .timeline-item-content {
      padding: 4px 8px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      position: relative;

      .content {
        font-weight: bold;
        font-size: 14px;
        line-height: 1.2;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .status {
        font-weight: bold;
        line-height: 1.2;
        margin-bottom: 2px;
      }

      .order-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 2px;

        .product-name {
          font-weight: bold;
          font-size: 14px;
          line-height: 1.2;
        }

        .process {
          font-size: 12px;
          line-height: 1.2;
          opacity: 0.9;
        }
      }

      .time {
        font-size: 12px;
        line-height: 1.2;
        opacity: 0.8;
        position: absolute;
        bottom: 6px;
        left: 8px;
      }
    }
  }

  /* 狀態樣式 (StatusStyles) */
  .vis-item.status-producing {
    background-color: #4caf50;
    border-color: #2e7d32;
    color: white;
  }

  .vis-item.status-idle {
    background-color: #9e9e9e;
    border-color: #757575;
    color: white;
  }

  .vis-item.status-setup {
    background-color: #ff9800;
    border-color: #f57c00;
    color: white;
  }

  .vis-item.status-testing {
    background-color: #2196f3;
    border-color: #1976d2;
    color: white;
  }

  .vis-item.status-stopped {
    background-color: #f44336;
    border-color: #d32f2f;
    color: white;
    font-weight: bold;
  }

  /* 進度顯示樣式 (StatusProgress) */
  .vis-item::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: width 0.3s ease;
    width: var(--progress, 0%);
  }
`;ne.div`
  width: 100%;
  flex-grow: 1;
  min-height: 600px;
`;//! =============== 1. 基礎配置 ===============
const ot={colors:{header:"#186c98",text:"#ffffff",gridMinor:"#00bbc9",gridMajor:"#00747c",hover:"rgba(25, 118, 210, 0.05)",weekend:"rgba(25, 118, 210, 0.08)",rowAlternate:"rgba(0, 0, 0, 0.02)"},spacing:{base:"1rem",label:"2px 14px"}};//! =============== 2. 共用樣式 ===============
const Id=un`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
`,Cd=un`
  .vis-grid {
    &.vis-minor {
      border-color: rgba(0, 0, 0, 0.05);
      border-left: 1px dashed ${ot.colors.gridMinor};
    }

    &.vis-major {
      border-left: 2px solid ${ot.colors.gridMajor};
    }
  }
`;//! =============== 3. 組件實現 ===============
ne.div`
  .vis-timeline {
    border: none;
    font-family: "Noto Sans TC", sans-serif;
    padding: ${ot.spacing.base};
  }

  /* ✨ Header 樣式 */
  .vis-panel.vis-top,
  .vis-time-axis.vis-foreground {
    background-color: ${ot.colors.header};
  }

  .vis-time-axis .vis-text {
    color: ${ot.colors.text} !important;
  }

  /* 💡 中心區域滾動 */
  .vis-panel.vis-center {
    ${Id}
  }
`;ne.div`
  /* ✨ 基礎網格 */
  ${Cd}

  /* 💡 行樣式與互動 */
  .vis-panel.vis-center .vis-content {
    .vis-itemset .vis-foreground .vis-group {
      transition: background-color 0.2s ease;

      &:nth-child(odd) {
        background-color: ${ot.colors.rowAlternate};
      }

      &:hover {
        background-color: ${ot.colors.hover};
      }
    }
  }

  /* ✨ 週末特殊樣式 */
  .vis-time-axis .vis-grid {
    &.vis-saturday,
    &.vis-sunday {
      background-color: ${ot.colors.weekend};
    }
  }

  /* 💡 標籤樣式 */
  .vis-labelset .vis-label {
    padding: ${ot.spacing.label};

    /* ⚠️ 支持動態行顏色 */
    &[data-color] {
      background-color: var(--row-color);
    }
  }
`;ne.div`
  .vis-item {
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 8px;
    border-width: 1px;
    transition: color 0.2s ease;

    /* ✨ Hover 效果 */
    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* ✨ 選中效果 */
    &.vis-selected {
      box-shadow: 0 0 0 2px #1976d2;
      z-index: 2;
    }
  }
`;ne.div`
  /* 生產中 */
  .vis-item.status-producing {
    background-color: #4caf50;
    border-color: #2e7d32;
    color: white;
  }

  /* 待機中 */
  .vis-item.status-idle {
    background-color: #9e9e9e;
    border-color: #757575;
    color: white;
  }

  /* 上模與調機 */
  .vis-item.status-setup {
    background-color: #2196f3;
    border-color: #1976d2;
    color: white;
  }

  /* 產品試模 */
  .vis-item.status-testing {
    background-color: #ff9800;
    border-color: #f57c00;
    color: white;
  }

  /* ⚠️ 機台停機 - 需要特別顯眼 */
  .vis-item.status-stopped {
    background-color: #f44336;
    border-color: #d32f2f;
    color: white;
    font-weight: bold;
  }
`;ne.div`
  .vis-time-axis {
    .vis-text {
      color: #333;
      padding: 3px 5px;
      font-size: 13px;
    }

    /* 主要刻度 */
    .vis-major {
      font-weight: bold;
      font-size: 24px;
    }

    /* 次要刻度 */
    .vis-minor {
      color: #666;
    }

    /* ✨ 週末特殊標示 */
    .vis-saturday,
    .vis-sunday {
      color: #1976d2;
      font-weight: bold;
    }
  }
`;ne.div`
  .vis-current-time {
    background-color: #f44336;
    width: 2px;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -4px;
      width: 10px;
      height: 10px;
      background-color: #f44336;
      border-radius: 50%;
    }
  }
`;ne.div`
  /* 基礎樣式 */
  .vis-item {
    transition: background-color 0.2s ease, border-color 0.2s ease,
      color 0.2s ease;
    cursor: pointer;
    font-size: 18px;
    height: auto;

    .timeline-item-content {
      padding: 4px 8px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      position: relative;

      .content {
        font-weight: bold;
        font-size: 14px;
        line-height: 1.2;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .status {
        font-weight: bold;
        line-height: 1.2;
        margin-bottom: 2px;
      }

      .order-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 2px;

        .product-name {
          font-weight: bold;
          font-size: 14px;
          line-height: 1.2;
        }

        .process {
          font-size: 12px;
          line-height: 1.2;
          opacity: 0.9;
        }
      }

      .time {
        font-size: 12px;
        line-height: 1.2;
        opacity: 0.8;
        position: absolute;
        bottom: 6px;
        left: 8px;
      }

      .progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        transition: width 0.3s ease;
      }
    }
  }

  /* 生產中 */
  .vis-item.status-producing {
    background-color: #4caf50;
    border-color: #2e7d32;
    color: white;

    .progress-bar {
      background-color: rgba(46, 125, 50, 0.6);
    }

    &:hover {
      background-color: #5db761;
      border-color: #4caf50;
      color: white;
    }
  }

  /* 待機中 */
  .vis-item.status-idle {
    background-color: #9e9e9e;
    border-color: #757575;
    color: white;

    .progress-bar {
      background-color: rgba(117, 117, 117, 0.6);
    }
  }

  /* 上模與調機 */
  .vis-item.status-setup {
    background-color: #ff9800;
    border-color: #f57c00;
    color: white;

    .progress-bar {
      background-color: rgba(245, 124, 0, 0.6);
    }

    &:hover {
      background-color: #ffac32;
      border-color: #ff9800;
    }
  }

  /* 產品試模 */
  .vis-item.status-testing {
    background-color: #2196f3;
    border-color: #1976d2;
    color: white;

    .progress-bar {
      background-color: rgba(25, 118, 210, 0.6);
    }

    &:hover {
      background-color: #4dabf5;
      border-color: #2196f3;
      color: white;
    }
  }

  /* 異常與警告 */
  .vis-item.status-stopped {
    background-color: #f44336;
    border-color: #d32f2f;
    color: white;
    font-weight: bold;

    .progress-bar {
      background-color: rgba(211, 47, 47, 0.6);
    }
  }

  /* 衝突警告 */
  .vis-item.status-overlap {
    background-color: #fff3e0;
    border-color: #ff9800;
    color: #e65100;

    .progress-bar {
      background-color: rgba(230, 81, 0, 0.6);
    }
  }
`;ne.div`
  .vis-item {
    /* 完成進度顯示 */
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background-color: rgba(0, 0, 0, 0.2);
      transition: width 0.3s ease;
      width: var(--progress, 0%);
    }
  }
`;ne.div`
  /* 狀態標籤通用樣式 */
  .vis-item .status-label {
    position: absolute;
    right: 4px;
    top: 4px;
    font-size: 12px;
    padding: 2px 4px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;//! =============== 1. 輔助函數 ===============
const bt=(e=0,t=0)=>T().add(e,"day").add(t,"hour").toISOString(),Ht=e=>e[Math.floor(Math.random()*e.length)],oe=(e,t)=>Math.floor(Math.random()*(t-e+1))+e;let Dd=1e4;const dr=()=>Dd++;//! =============== 2. 常量定義 ===============
const To=["塑膠杯蓋-A型","汽車零件-B123","電子外殼-C456","玩具配件-D789","容器本體-E001","包裝盒-F002","面板框架-G003","手機外殼-H004","工具握把-I005","醫療器材-J006"],Rd=["設備故障","模具損壞","原料不足","計劃性維護","電力中斷","品質異常"],Od=["射出成型","吹塑成型","壓鑄成型","熱壓成型"],Ad={A:Array.from({length:10},(e,t)=>`A${t+1}`),B:Array.from({length:11},(e,t)=>`B${t+1}`),C:Array.from({length:9},(e,t)=>`C${t+1}`),D:Array.from({length:9},(e,t)=>`D${t+1}`)};//! =============== 3. 製令單資料生成器 ===============
const Md=(e,t,r,o=!1)=>{const n=dr(),s=oe(8,48),i=oe(100,5e3),l=o?oe(50,i):0,c=bt(r,oe(8,16)),d=T(c).add(s,"hour").toISOString(),u=o?bt(r,oe(8,16)):null,f=o&&oe(1,10)>7?T(u).add(s+oe(-2,5),"hour").toISOString():null;let v;return o?f?v="已完成":v="進行中":v="尚未上機",{timeLineStatus:S.ORDER_CREATED,productionScheduleId:n,productionArea:e,machineSN:t,planOnMachineDate:c,planFinishDate:d,actualOnMachineDate:u,actualFinishDate:f,workOrderSN:`WO-${String(n).padStart(6,"0")}`,productSN:`P-${oe(1e3,9999)}`,productName:Ht(To),processName:Ht(Od),workOrderQuantity:i,productionQuantity:l,productionScheduleStatus:v,postponeTime:o&&oe(1,10)>8?T(d).add(oe(1,5),"day").toISOString():null,createdAt:bt(-30),updatedAt:bt(-1)}};//! =============== 4. 機台狀態資料生成器 ===============
const jd=(e,t,r,o=!1)=>{const n=dr(),s=oe(1,4),i=bt(r,oe(8,16)),l=T(i).add(s,"hour").toISOString(),c=o?i:null,d=o?T(c).add(s,"hour").toISOString():null;return{timeLineStatus:S.IDLE,productionArea:e,machineSN:t,machineStatusId:n,machineStatusPlanStartTime:i,machineStatusPlanEndTime:l,machineStatusActualStartTime:c,machineStatusActualEndTime:d,machineStatusReason:"",machineStatusProduct:""}},kd=(e,t,r,o=!1)=>{const n=dr(),s=oe(2,6),i=bt(r,oe(8,16)),l=T(i).add(s,"hour").toISOString(),c=o?i:null,d=o?T(c).add(s,"hour").toISOString():null;return{timeLineStatus:S.SETUP,productionArea:e,machineSN:t,machineStatusId:n,machineStatusPlanStartTime:i,machineStatusPlanEndTime:l,machineStatusActualStartTime:c,machineStatusActualEndTime:d,machineStatusReason:Ht(["模具更換","參數調整","首件檢驗"]),machineStatusProduct:Ht(To)}},Pd=(e,t,r,o=!1)=>{const n=dr(),s=oe(1,3),i=bt(r,oe(8,16)),l=T(i).add(s,"hour").toISOString(),c=o?i:null,d=o?T(c).add(s,"hour").toISOString():null;return{timeLineStatus:S.TESTING,productionArea:e,machineSN:t,machineStatusId:n,machineStatusPlanStartTime:i,machineStatusPlanEndTime:l,machineStatusActualStartTime:c,machineStatusActualEndTime:d,machineStatusReason:"",machineStatusProduct:Ht(To)}},Fd=(e,t,r,o=!1)=>{const n=dr(),s=oe(1,8),i=bt(r,oe(8,16)),l=T(i).add(s,"hour").toISOString(),c=o?i:null,d=o?T(c).add(s,"hour").toISOString():null;return{timeLineStatus:S.STOPPED,productionArea:e,machineSN:t,machineStatusId:n,machineStatusPlanStartTime:i,machineStatusPlanEndTime:l,machineStatusActualStartTime:c,machineStatusActualEndTime:d,machineStatusReason:Ht(Rd),machineStatusProduct:""}};//! =============== 5. 綜合資料生成器 ===============
const Nd=(e,t)=>{const r=[];let o=-7;const n=oe(8,12);for(let s=0;s<n;s++){const i=o<0,l=oe(1,100);let c;l<=40?c=Md(e,t,o,i):l<=55?c=jd(e,t,o,i):l<=70?c=kd(e,t,o,i):l<=85?c=Pd(e,t,o,i):c=Fd(e,t,o,i),r.push(c),o+=oe(1,2)}return r},St=e=>{const t=Ad[e]||[],r=[];return t.forEach(o=>{const n=Nd(e,o);r.push(...n)}),r},Ld=()=>({A:St("A"),B:St("B"),C:St("C"),D:St("D")}),$d=(e,t,r)=>{if(!t||!r)return e;const o=T(t),n=T(r);return e.filter(s=>{let i,l;return s.timeLineStatus===S.ORDER_CREATED?(i=T(s.actualOnMachineDate||s.planOnMachineDate),l=T(s.actualFinishDate||s.planFinishDate)):(i=T(s.machineStatusActualStartTime||s.machineStatusPlanStartTime),l=T(s.machineStatusActualEndTime||s.machineStatusPlanEndTime)),i.isBefore(n)&&l.isAfter(o)})};Ld();let Tr={A:St("A"),B:St("B"),C:St("C"),D:St("D")};const zd=no.injectEndpoints({endpoints:e=>({getSmartSchedule:e.query({async queryFn({productionArea:t,startTime:r,endTime:o}){{await xt();let n=Tr[t]||[];r&&o&&(n=$d(n,r,o));const s=n.reduce((i,l)=>(i[l.timeLineStatus]=(i[l.timeLineStatus]||0)+1,i),{});return console.log(`[Mock API] 獲取區域 ${t} 的排程:`,n.length,"筆資料",s),{data:{data:n}}}},providesTags:["schedule"]}),changeWorkOrder:e.mutation({async queryFn(t){{await xt();const{productionScheduleId:r,planOnMachineDate:o,machineSN:n}=t;let s=!1;return Object.keys(Tr).forEach(i=>{Tr[i]=Tr[i].map(l=>l.productionScheduleId===r?(s=!0,{...l,planOnMachineDate:o,machineSN:n,updatedAt:new Date().toISOString()}):l)}),console.log(`[Mock API] 更新工單 ${r}:`,s?"成功":"找不到工單"),{data:{success:s,message:s?"工單已更新":"找不到工單"}}}},invalidatesTags:["schedule"]})})}),{useGetSmartScheduleQuery:Bd,useChangeWorkOrderMutation:_d}=zd,Wd={current:"現在",time:"時間",deleteSelected:"刪除選取",editable:{add:"新增",remove:"刪除",updateTime:"調整時間",updateGroup:"調整群組"}},Hd={months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),meridiem:(e,t)=>{const r=e*100+t;return r<600?"凌晨":r<900?"早上":r<1130?"上午":r<1230?"中午":r<1800?"下午":"晚上"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:(e,t)=>{let r=e===12?0:e;return["凌晨","早上","上午"].includes(t)?r:t==="中午"?r>=11?r:r+12:["下午","晚上"].includes(t)?r+12:r}},Zo={hour:{zoomMin:1e3*60*5},day:{zoomMin:1e3*60*15},week:{zoomMin:1e3*60*60},month:{zoomMin:1e3*60*60*12}},Yd={hour:{label:"小時",getWindow:e=>It("hour",e),format:{minorLabels:{minute:"mm",hour:"HH:mm"},majorLabels:{minute:"HH:mm",hour:"MM-DD HH:mm"}}},day:{label:"天",getWindow:e=>It("day",e),format:{minorLabels:{hour:"HH:mm",day:"D日"},majorLabels:{hour:"M月D日",day:"YYYY年M月"}}},week:{label:"週",getWindow:e=>It("week",e),format:{minorLabels:{day:"DD日",week:"第w週"},majorLabels:{day:"MM月",week:"YYYY年"}}},month:{label:"月",getWindow:e=>It("month",e),format:{minorLabels:{day:"DD",month:"MM月"},majorLabels:{day:"MM月",month:"YYYY年"}}}};//! =============== 1. 常量定義 ===============
const ta=2;//! =============== 2. 輔助函數 ===============
function Vd(e){return e.timeLineStatus==="製令單"}function Ud(e){if(!e)return!1;const t=new Date;return e.actualStartTime&&new Date(e.actualStartTime)<t||e.scheduledStartTime&&new Date(e.scheduledStartTime)<t}function Gd(e){return(e==null?void 0:e.startTime)&&new Date(e.startTime)<new Date}function qd(e,t){const r=e.actualStartTime||e.planStartTime||t.start,o=e.actualEndTime||e.planEndTime||t.end;return{startDate:r,endDate:o}}function Qd(e,t){const r=e.startTime||t.start,o=e.endTime||e.startTime&&T(e.startTime).add(ta,"hour").toDate()||t.end;return{startDate:r,endDate:o}}function ra(e){const t=e.start,r=e.end||T(e.start).add(ta,"hour").toDate();return{startDate:t,endDate:r}}//! =============== 3. 主要處理函數 ===============
function Xd(e){var s;const t=Ud(e.orderInfo),r=ra(e),{startDate:o,endDate:n}=e.orderInfo?qd(e.orderInfo,r):r;return(s=e==null?void 0:e.orderInfo)==null||s.orderStatus,{...e,start:o,end:n,editable:t?{updateTime:!1,updateGroup:!1,remove:!1}:{updateTime:!0,updateGroup:!0,remove:!1}}}function Kd(e){const t=Gd(e.status),r=ra(e),{startDate:o,endDate:n}=e.status?Qd(e.status,r):r;return{...e,start:T(o).toDate(),end:T(n).toDate(),editable:t?{updateTime:!1,updateGroup:!1,remove:!1}:{updateTime:!1,updateGroup:!0,remove:!0}}}const Zd=e=>Vd(e)?Xd(e):Kd(e),Jd=e=>{if(!Array.isArray(e))return[];try{return e.map(r=>{const o=oc(r);return Zd(o)})}catch(t){return console.error("轉換排程數據時出錯:",t),[]}},eu=(e,t=null)=>{const r=p.useMemo(()=>{console.log("[useTimelineData] 原始機台列表:",e);const n=e?Nc(e):[];console.log("[useTimelineData] 轉換後的機台列表:",n);const s=Lc(n);return console.log("[useTimelineData] 生成的 groups:",s),s},[e]),o=p.useRef(null);return o.current||(o.current=new fn([])),p.useEffect(()=>{if(console.log("[useTimelineData] 排程列表更新:",t==null?void 0:t.length,"筆"),!(t!=null&&t.length)){const n=o.current.getIds();n.length>0&&o.current.remove(n),console.log("[useTimelineData] 無排程數據，已清空");return}try{console.log("[useTimelineData] 開始轉換排程數據...");const n=Jd(t);console.log("[useTimelineData] 轉換後的數據:",n.length,"筆"),console.log("[useTimelineData] 第一筆轉換後數據:",n[0]);const s=o.current.getIds();s.length>0&&o.current.remove(s),n.length>0&&(o.current.add(n),console.log("[useTimelineData] 已添加",n.length,"筆數據到 DataSet"))}catch(n){console.error("[useTimelineData] 轉換排程數據失敗:",n),console.error("[useTimelineData] 錯誤堆疊:",n.stack)}},[t]),{itemsDataRef:o,groups:r}},tu={width:"100%",minHeight:"600px",margin:{item:{horizontal:10,vertical:10}},groupHeightMode:"auto",orientation:"top",zoomable:!1,moveable:!0,stack:!0,stackSubgroups:!0,verticalScroll:!0,horizontalScroll:!0,showCurrentTime:!0,locale:"zh-TW",snap:null,locales:{"zh-TW":Wd},moment:function(e){return mn(e).locale("zh-tw").utcOffset("+08:00")}},ru={minorLabels:{millisecond:"SSS",second:"s秒",minute:"a h:mm",hour:"a h點",weekday:"M月D日",day:"D日",week:"第w週",month:"M月",year:"YYYY年"},majorLabels:{millisecond:"HH:mm:ss",second:"M月D日 a h:mm",minute:"M月D日 a h:mm",hour:"M月D日 a",weekday:"YYYY年M月",day:"YYYY年M月",week:"YYYY年M月",month:"YYYY年",year:""}},Jo={[S.ORDER_CREATED]:e=>{var t,r;return`${(t=e._originalApiData)==null?void 0:t.productionScheduleStatus}  /  製令單號: ${(r=e.orderInfo)==null?void 0:r.workOrderSN} `||"製令單號未設定"},[S.STOPPED]:e=>{var t;return((t=e.status)==null?void 0:t.reason)||e.machineStatusReason||"停機原因未設定"},[S.TESTING]:e=>{var t;return((t=e.status)==null?void 0:t.product)||e.machineStatusProduct||""},default:e=>""},ou=e=>{const t=e.timeLineStatus;return(Jo[t]||Jo.default)(e)},nu=e=>{const t=e.content||"",r=()=>({IDLE:"status-idle",TUNING:"status-tuning",TESTING:"status-testing",OFFLINE:"status-offline",ORDER_CREATED:"status-order"})[e.timeLineStatus]||"",o=ou(e),n=t||o;return`
    <div class="timeline-item ${r()}" title="${n}">
      <div class="timeline-item-content">${t}</div>
      ${o?`<div class="timeline-item-status">${o}</div>`:""}
    </div>
  `};//! =============== 1. 設定與常量 ===============
const au=1e3*60*60*24*31*12*10;//! =============== 4. 工具函數 ===============
function su(e,t){const r=T(e.start),o=T(e.end),n=T(t.start),s=T(t.end);return r.isBefore(s)&&o.isAfter(n)}function iu(e){return e==="hour"?{timeAxis:{scale:"hour",step:1}}:{}}//! =============== 3. 核心功能 ===============
function lu(e,t){const r=p.useCallback(()=>({...tu,editable:{add:!1,updateTime:!1,updateGroup:!1,remove:!1,overrideItems:!0},selectable:!0,multiselect:!1,format:ru,snap:null,zoomMax:au}),[e]),o=p.useCallback(s=>{const i=It(s);return{...Zo[s],start:i.start.toDate(),end:i.end.toDate(),zoomMin:Zo[s].zoomMin}},[]),n=p.useCallback(()=>({...r(),...o(t),...iu(t),template:nu}),[t,r,o]);return{getBaseOptions:r,getTimeWindowOptions:o,getTimelineOptions:n,hasTimeOverlap:su}}let ht={A:Ge("A"),B:Ge("B"),C:Ge("C"),D:Ge("D")};const cu=no.injectEndpoints({endpoints:e=>({getMachineStatus:e.query({async queryFn(t){{await xt();const r=ht[t]||[];return console.log(`[Mock API] 獲取區域 ${t} 的機台狀態:`,r.length,"台機器"),{data:r}}},providesTags:["MachineStatus"]}),createMachineStatus:e.mutation({async queryFn(t){var r;{await xt();const o={...t,machineStatusId:t.machineStatusId||Date.now()},n=((r=t.machine)==null?void 0:r.productionArea)||"A";return ht[n]=ht[n].map(s=>s.machineId===t.machineId?{...s,...o}:s),console.log("[Mock API] 新增機台狀態:",o),{data:o}}},invalidatesTags:["MachineStatus","schedule"]}),updateMachineStatus:e.mutation({async queryFn(t){var r;{await xt();const o=((r=t.machine)==null?void 0:r.productionArea)||"A";return ht[o]=ht[o].map(n=>n.machineId===t.machineId?{...n,...t}:n),console.log("[Mock API] 更新機台狀態:",t),{data:t}}},invalidatesTags:["MachineStatus","schedule"]}),deleteMachineStatus:e.mutation({async queryFn(t){return await xt(),Object.keys(ht).forEach(r=>{ht[r]=ht[r].map(o=>o.machineStatusId===t?{...o,status:"IDLE",machineStatusProduct:null,machineStatusReason:null}:o)}),console.log("[Mock API] 刪除機台狀態 ID:",t),{data:{success:!0}}},invalidatesTags:["MachineStatus","schedule"]})})}),{useGetMachineStatusQuery:_u,useCreateMachineStatusMutation:du,useUpdateMachineStatusMutation:uu,useDeleteMachineStatusMutation:pu}=cu;function fu(e){return typeof e=="number"||typeof e=="string"&&!isNaN(Number(e))}//! =============== 1. 設定與常量 ===============
const oa=2,en=1,nt={INVALID_STRUCTURE:"項目格式不正確，請檢查資料結構",CANNOT_DELETE_ORDER:"無法刪除製令單，製令單不允許被刪除",TIME_OVERLAP:"時間重疊：除了「製令單」外的其他狀態都不允許時間重疊",SAVE_ORDER_FAILED:"保存製令單失敗",SAVE_STATUS_FAILED:"保存機台狀態失敗",DELETE_FAILED:"刪除項目失敗",START_DATE_TOO_EARLY:"預計上機日不能早於當前時間，請選擇未來的時間",INVALID_INPUT:"輸入資料有誤，請檢查後重試"};//! =============== 2. 類型與介面 ===============
function Dr(e){return(e==null?void 0:e.timeLineStatus)===S.ORDER_CREATED}function hu(e){if(!(e!=null&&e.internal))throw new Error(nt.INVALID_STRUCTURE)}function mu(e){return!Dr(e)}function gu(e,t){var r;return((r=e==null?void 0:e.status)==null?void 0:r.id)&&e.status.id===t}function xu(e){const t=e==null?void 0:e.data,r=t==null?void 0:t.error_reason,o=t==null?void 0:t.message;let n;r==="Invalid_input"?o!=null&&o.includes("New start date is earlier than now")?n=nt.START_DATE_TOO_EARLY:n=nt.INVALID_INPUT:o?n=o:n=e.message||nt.SAVE_ORDER_FAILED;const s=$t(n,{originalError:e,errorData:t,errorReason:r,apiEndpoint:"smart-schedule",timestamp:new Date().toISOString()});return rt(s,{context:"製令單 API 更新",errorReason:r,originalMessage:o}),Ct(s)}function bu(e){return e&&typeof e=="string"&&e.startsWith("ITEM-")}//! =============== 3. 核心功能 ===============
function yo(e){if(Dr(e)&&e.orderInfo){const o=T(e.orderInfo.scheduledStartTime||e.start),n=T(e.orderInfo.scheduledEndTime||e.end||o.add(en,"hour"));return{start:o.toDate(),end:n.toDate()}}if(!Dr(e)&&e.status){const o=T(e.status.startTime||e.start),n=e.status.endTime?T(e.status.endTime):e.end?T(e.end):o.add(oa,"hour");return{start:o.toDate(),end:n.toDate()}}const t=T(e.start||new Date),r=T(e.end||t.add(en,"hour"));return{start:t.toDate(),end:r.toDate()}}function Eo(e,t){return e===S.ORDER_CREATED?t==="尚未上機"?{updateTime:!0,updateGroup:!0,remove:!1}:{updateTime:!1,updateGroup:!1,remove:!0}:{updateTime:!1,updateGroup:!1,remove:!0}}function Su(e){var r,o,n;const t=yo(e);return{...e,className:bo(e.timeLineStatus),start:t.start,end:t.end,area:e.area||((o=(r=e.group)==null?void 0:r.match(/[A-Z]/))==null?void 0:o[0])||"",updateTime:!1,editable:Eo(e.timeLineStatus,(n=e.orderInfo)==null?void 0:n.orderStatus),status:null}}function vu(e){var r,o;const t=yo(e);return{...e,className:bo(e.timeLineStatus),start:t.start,end:t.end,area:e.area||((o=(r=e.group)==null?void 0:r.match(/[A-Z]/))==null?void 0:o[0])||"",updateTime:!1,editable:Eo(e.timeLineStatus,null),orderInfo:null}}function Tu(e,t){const r=T(e.start),o=T(e.end),n=T(t.start),s=T(t.end);return r.isBefore(s)&&o.isAfter(n)||r.isSame(n)||o.isSame(s)}//! =============== 4. 工具函數 ===============
function yu(e){return bu(e)?"add":"update"}function Eu(e){if(!mu(e))throw new Error(nt.CANNOT_DELETE_ORDER)}function tn(e,t){t.current.remove(e),console.log("本地項目刪除完成:",e)}function wu(e,t){t(e.status.id).unwrap().then(()=>{console.log("機台狀態 API 刪除成功")}).catch(r=>{const o=$t("機台狀態 API 刪除失敗",{originalError:r,context:"刪除機台狀態",operation:"deleteMachineStatus",itemId:e.status.id});rt(o,{context:"機台狀態刪除流程",note:"本地已成功刪除，API失敗不影響用戶體驗"})})}function Iu(e,t){if(t.get({filter:function(n){return n.id!==e.id&&n.group===e.group&&n.timeLineStatus!==S.ORDER_CREATED}}).some(n=>Tu(e,n)))throw new Error(nt.TIME_OVERLAP)}function Cu(e,t,r,o){gu(e,t)?(tn(t,r),wu(e,o)):tn(t,r)}//! =============== 5. 主要 Hook 實現 ===============
function Du({itemsDataRef:e,groups:t,timelineRef:r,timeRange:o}){const[n]=_d(),[s]=du(),[i]=uu(),[l]=pu();p.useEffect(()=>{t&&Jn(t)},[t]);const c=p.useCallback(function(h){var w;try{const I=Su(h.internal);h.api?n(h.api).unwrap().then(E=>{console.log("製令單 API 更新成功:",E),e.current.update(I)}).catch(E=>{console.error("製令單 API 更新失敗:",E);const D=xu(E);alert(D)}):e.current.update(I)}catch(I){const E=$t(I.message||nt.SAVE_ORDER_FAILED,{originalError:I,context:"保存製令單",operation:"saveOrderItem"});rt(E,{context:"製令單保存流程",itemId:(w=h==null?void 0:h.internal)==null?void 0:w.id}),alert(Ct(E))}},[e,n]),d=p.useCallback(function(h){try{const w=vu(h.internal);Iu(w,e.current);const I=yu(w.id),E=I==="update";let D;if(h.api)D=h.api;else if(E){const R=e.current.get(w.id);D=Wn(w,R)}else D=_n(w);const A=E?i:s,g=E?"更新":"創建";A(D).unwrap().then(R=>{console.log(`機台狀態 API ${g}成功:`,R),e.current[I](w)}).catch(R=>{const M=$t(`機台狀態 API ${g}失敗`,{originalError:R,context:`${g}機台狀態`,operation:E?"updateMachineStatus":"createMachineStatus",actionName:g});rt(M,{context:"機台狀態保存流程",action:g,isUpdate:E}),alert(Ct(M))})}catch(w){const I=$t(w.message||nt.SAVE_STATUS_FAILED,{originalError:w,context:"保存機台狀態",operation:"saveMachineStatus"});rt(I,{context:"機台狀態保存流程",stage:"數據處理階段"}),alert(Ct(I))}},[e,s,i]),u=p.useCallback(function(h){try{hu(h),Dr(h.internal)?c(h):d(h)}catch(w){console.error("Save item failed:",w),alert(w.message)}},[c,d]),f=p.useCallback(function(h){if(!fu(h)||!e.current){console.warn("無效的刪除參數:",{itemId:h,hasDataRef:!!e.current});return}const w=e.current.get(h);if(!w){console.warn("找不到要刪除的項目:",h);return}try{Eu(w),Cu(w,h,e,l)}catch(I){console.error("Delete item failed:",I),alert(I.message||nt.DELETE_FAILED)}},[e,l]),v=p.useCallback(function(h){if(!(h!=null&&h.length)){alert("請選擇要刪除的項目");return}ea(h)},[]),b=p.useCallback(function(h,w){var I;try{const E=h?T(h):T(),D=E.add(oa,"hour"),g={id:`ITEM-${Date.now()}`,group:"",area:w||"",timeLineStatus:S.IDLE,status:{startTime:E.toDate(),endTime:D.toDate(),reason:"",product:""},orderInfo:null,start:E.toDate(),end:D.toDate(),className:"status-idle",content:"新狀態",isNew:!0};Xo(g,"add",t)}catch(E){const D=$t(E.message||"新增狀態失敗",{originalError:E,context:"新增機台狀態",operation:"handleAddItem",startTime:h,areaCode:w});rt(D,{context:"新增狀態流程",startTime:((I=h==null?void 0:h.toISOString)==null?void 0:I.call(h))||h,areaCode:w}),alert(Ct(D))}},[t]),y=p.useCallback(function(h){h&&Xo(h,"edit",t)},[t]),m=p.useCallback(function(){if(r!=null&&r.current)try{const h=It(o,T());r.current.setWindow(h.start.toDate(),h.end.toDate(),{animation:!0})}catch(h){console.error("Move to current time failed:",h)}},[r,o]);return p.useEffect(()=>{const x=hd(u),h=bd(f);return()=>{x(),h()}},[u,f]),{handleAddItem:b,handleEditItem:y,handleSaveItem:u,openDeleteConfirmation:v,handleMoveToNow:m,getItemTiming:yo,getEditableConfig:Eo}}//! =============== 示例區塊 ===============
function Ru(){const e=p.useCallback(()=>{const f=T(),v=f.subtract(1,"month").startOf("day").toISOString(),b=f.add(1,"month").endOf("day").toISOString();return{startTime:v,endTime:b}},[]),[t,r]=p.useState(()=>e()),o=p.useCallback(f=>{r(v=>({...v,startTime:f}))},[]),n=p.useCallback(f=>{r(v=>({...v,endTime:f}))},[]),s=p.useCallback(()=>{r(e())},[e]),i=p.useCallback(()=>{const f=T();r({startTime:f.startOf("day").toISOString(),endTime:f.endOf("day").toISOString()})},[]),l=p.useCallback(()=>{const f=T();r({startTime:f.startOf("week").toISOString(),endTime:f.endOf("week").toISOString()})},[]),c=p.useCallback(()=>{const f=T();r({startTime:f.startOf("month").toISOString(),endTime:f.endOf("month").toISOString()})},[]),d=p.useMemo(()=>({startTime:t.startTime,endTime:t.endTime,startTimeFormatted:t.startTime?T(t.startTime).format("YYYY-MM-DD HH:mm:ss"):null,endTimeFormatted:t.endTime?T(t.endTime).format("YYYY-MM-DD HH:mm:ss"):null}),[t]),u=p.useMemo(()=>{if(!t.startTime||!t.endTime)return{isValid:!1,duration:0,durationText:""};const f=T(t.startTime),v=T(t.endTime),b=v.diff(f,"day");let y="";if(b===0)y="當天";else if(b<=7)y=`${b} 天`;else if(b<=30){const m=Math.floor(b/7),x=b%7;y=m>0?`${m}週${x>0?` ${x}天`:""}`:`${b} 天`}else{const m=Math.floor(b/30),x=b%30;y=`${m}個月${x>0?` ${x}天`:""}`}return{isValid:f.isBefore(v),duration:b,durationText:y,startText:f.format("YYYY/MM/DD HH:mm"),endText:v.format("YYYY/MM/DD HH:mm")}},[t]);return{timeRange:t,formattedTimeRange:d,timeRangeInfo:u,handleStartTimeChange:o,handleEndTimeChange:n,setTimeRange:r,resetToDefault:s,setToToday:i,setToThisWeek:l,setToThisMonth:c}}//! =============== 2. 類型與介面 ===============
function Ou(){p.useEffect(()=>{T.locale("zh-tw"),mn.updateLocale("zh-tw",Hd)},[])}function Au(e="A",t=null,r=null){//! API 查詢 - 核心數據獲取
const{isSuccess:o,isLoading:n,data:s}=Bd({productionArea:e,startTime:t,endTime:r}),i=p.useMemo(()=>s!=null&&s.data?s.data.filter(l=>l.productionArea===e):[],[s,e]);return{isSuccess:o,isLoading:n,scheduleList:i}}function Mu(e="A"){//! 機台數據獲取 - 系統設備資訊
const{isSuccess:t,isLoading:r,data:o}=Zn(),n=p.useMemo(()=>{console.log("[useAreaMachines] allArea 數據:",o);const s=(o==null?void 0:o.data)||o||[];console.log("[useAreaMachines] machines 陣列:",s);const i=s.filter(l=>l.productionArea===e);return console.log("[useAreaMachines] 過濾後的機台:",i.length,"台"),i},[o,e]);return{isSuccess:t,isLoading:r,allArea:o,filteredMachines:n}}//! =============== 3. 核心功能 ===============
function ju({containerRef:e}){return a.jsx(Rr,{ref:e,elevation:1,sx:{width:"100%",flexGrow:1,minHeight:"600px",border:1,borderColor:"grey.200",borderRadius:1}})}const na=ro.memo(ju);na.displayName="TimelinePaper";function ku({containerRef:e,timelineRef:t,itemsDataRef:r,groups:o,getTimelineOptions:n,handleEditItem:s}){p.useEffect(()=>{if(!e.current||!r.current||!o)return;e.current.innerHTML="";const i=n();//! 創建時間線實例 - 核心功能初始化
t.current=new Na(e.current,r.current,o,i),t.current.on("doubleClick",l=>{if(!l.item)return;const c=r.current.get(l.item);c&&s(c)}),o&&Jn(o);//! 清理函數 - 防止記憶體洩漏
return()=>{t.current&&(t.current.destroy(),t.current=null)}},[e,r,o,n,s])}function Pu(e,t,r){return p.useCallback(()=>{//! 優先策略 - 使用對話框提供的函數
if(r){r();return}if(e.current)try{const o=It(t,T());e.current.setWindow(o.start.toDate(),o.end.toDate(),{animation:!0})}catch(o){console.error("移動到當前時間失敗:",o)}},[t,r,e])}//! =============== 4. 工具函數 ===============
function rn(e){return e?T(e).format("YYYY-MM-DDTHH:mm"):""}function on(e,t){const r=T(e).toISOString();t(r)}function Fu(){return Object.entries(Yd).map(([e,t])=>({value:e,label:t.label}))}function Nu(){return xo.AREAS.map(e=>({value:e,label:`${e}區`}))}function Lu(e,t){return p.useCallback(r=>{const o=T();switch(r){case"today":e(o.startOf("day").toISOString()),t(o.endOf("day").toISOString());break;case"week":e(o.startOf("week").toISOString()),t(o.endOf("week").toISOString());break;case"month":e(o.startOf("month").toISOString()),t(o.endOf("month").toISOString());break;case"default":const n=o.subtract(1,"month").startOf("day").toISOString(),s=o.add(1,"month").endOf("day").toISOString();e(n),t(s);break}},[e,t])}function Wu(){//! 語言初始化 - 確保中文顯示正確
Ou();//! 核心狀態管理 - 組件主要狀態
const e=p.useRef(null),t=p.useRef(null),[r,o]=p.useState("day"),[n,s]=p.useState("A"),[i,l]=p.useState(!1);//! 視圖中心保持狀態 - 時間範圍切換優化
const c=p.useRef(null),d=p.useRef(!1),{timeRange:u,formattedTimeRange:f,handleStartTimeChange:v,handleEndTimeChange:b}=Ru();//! 數據獲取 - API 數據層
const{scheduleList:y}=Au(n,f.startTime,f.endTime),{filteredMachines:m}=Mu(n),{itemsDataRef:x,groups:h}=eu(m,y),{getTimelineOptions:w}=lu(x,r),{handleAddItem:I,handleEditItem:E,handleMoveToNow:D}=Du({itemsDataRef:x,groups:h,timelineRef:t,timeRange:r}),A=Pu(t,r,D),g=Lu(v,b),R=p.useCallback(C=>{try{if(t.current){const $=t.current.getWindow();if($&&$.start&&$.end){const P=new Date(($.start.getTime()+$.end.getTime())/2);c.current=P,d.current=!0}}o(C)}catch($){console.warn("時間範圍切換失敗:",$),o(C)}},[]);ku({containerRef:e,timelineRef:t,itemsDataRef:x,groups:h,getTimelineOptions:w,handleEditItem:E}),p.useEffect(()=>{if(!t.current||!d.current)return;const C=()=>{if(d.current&&c.current)try{t.current.moveTo(c.current,{animation:{duration:300,easingFunction:"easeInOutQuad"}}),d.current=!1,c.current=null}catch($){console.warn("恢復視圖中心失敗:",$),d.current=!1,c.current=null}};return t.current.on("changed",C),()=>{t.current&&t.current.off("changed",C)}},[r]),p.useEffect(()=>()=>{c.current=null,d.current=!1},[]);const M=Fu(),O=Nu();//! 主要渲染邏輯 - 組件 UI 結構
return a.jsxs(a.Fragment,{children:[a.jsx(Ed,{}),a.jsxs(Q,{sx:{width:"100%",p:4},children:[a.jsxs(wd,{children:[a.jsxs(U,{children:[a.jsxs(U.Row,{children:[a.jsx(U.ButtonGroup,{children:M.map(C=>a.jsx(U.TimeRangeButton,{value:C.value,currentValue:r,onChange:R,children:C.label},C.value))}),a.jsxs(U.ButtonGroup,{children:[a.jsx(U.AreaSelect,{value:n,onChange:s,options:O,placeholder:"選擇區域"}),a.jsx(U.NowButton,{onClick:A})]})]}),a.jsx(U.Panel,{title:"時間範圍設定",expanded:i,onToggle:l,info:f.startTime&&f.endTime?`${T(f.startTime).format("MM/DD")} - ${T(f.endTime).format("MM/DD")}`:"預設範圍",children:a.jsxs(U.Row,{children:[a.jsxs(U.ButtonGroup,{children:[a.jsx(U.TimeInput,{label:"開始",value:rn(u.startTime),onChange:C=>on(C,v)}),a.jsx(U.TimeInput,{label:"結束",value:rn(u.endTime),onChange:C=>on(C,b)})]}),a.jsxs(U.ButtonGroup,{children:[a.jsx(U.Button,{onClick:()=>g("today"),children:"今天"}),a.jsx(U.Button,{onClick:()=>g("week"),children:"本週"}),a.jsx(U.Button,{onClick:()=>g("month"),children:"本月"}),a.jsx(U.Button,{onClick:()=>g("default"),children:"預設範圍"})]})]})})]}),a.jsx(na,{containerRef:e})]}),a.jsx(yd,{})]})]})}//! =============== 示例區塊 ===============
export{Wu as default};
