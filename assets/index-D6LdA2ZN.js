var Vi=Object.defineProperty;var Wi=(e,t,r)=>t in e?Vi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ar=(e,t,r)=>(Wi(e,typeof t!="symbol"?t+"":t,r),r);import{P as Ze,j as c,D as Ui,B as ln,I as Qi,C as Hi,L as Yi,e as Xi,f as Zi,g as Ki}from"./vendor-mui-Cc1TuOMr.js";import{c as Ji,r as se,u as Ct,f as $a,N as eo,a as Qt,L as Da,O as Gr,h as to,i as Pt,g as ro,j as no,k as ao}from"./vendor-react-CQ9jITQR.js";import{i as gt,w as un,n as za,f as Ga,c as Na,a as Xe,b as cn,d as Ue,p as Ke,S as Ba,e as Ht,g as Nr,h as Ve,j as fn,k as io,l as oo,m as so,o as qa,q as ir,r as Ia,s as Br,t as Va,u as lo,v as qr,x as uo,y as co,z as dn,A as fo,B as po,C as ho,D as vo,E as ht,F as go,Q as mo,G as yo,P as bo,H as xo}from"./vendor-query-DLAcIdav.js";import{d as de,m as we,f as Wa,o as Co}from"./vendor-styled-F-HTyTPr.js";import{k as Po,l as So}from"./vendor-date-CdyaOyHe.js";import{t as _o,a as wo}from"./vendor-antd-Ct-O66bz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const v of i)if(v.type==="childList")for(const y of v.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&n(y)}).observe(document,{childList:!0,subtree:!0});function r(i){const v={};return i.integrity&&(v.integrity=i.integrity),i.referrerPolicy&&(v.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?v.credentials="include":i.crossOrigin==="anonymous"?v.credentials="omit":v.credentials="same-origin",v}function n(i){if(i.ep)return;i.ep=!0;const v=r(i);fetch(i.href,v)}})();var Ua,pn=Ji;Ua=pn.createRoot,pn.hydrateRoot;const Ao="modulepreload",Lo=function(e){return"/React-WiseScheduling_TimeLine_Library/"+e},hn={},Pe=function(t,r,n){let i=Promise.resolve();return r&&r.length>0&&(document.getElementsByTagName("link"),i=Promise.all(r.map(v=>{if(v=Lo(v),v in hn)return;hn[v]=!0;const y=v.endsWith(".css"),B=y?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${B}`))return;const k=document.createElement("link");if(k.rel=y?"stylesheet":Ao,y||(k.as="script",k.crossOrigin=""),k.href=v,document.head.appendChild(k),y)return new Promise((M,N)=>{k.addEventListener("load",M),k.addEventListener("error",()=>N(new Error(`Unable to preload CSS for ${v}`)))})}))),i.then(()=>t()).catch(v=>{const y=new Event("vite:preloadError",{cancelable:!0});if(y.payload=v,window.dispatchEvent(y),!y.defaultPrevented)throw v})};var jo=class extends Error{constructor(t){super(t[0].message);ar(this,"issues");this.name="SchemaError",this.issues=t}},Qa=(e=>(e.uninitialized="uninitialized",e.pending="pending",e.fulfilled="fulfilled",e.rejected="rejected",e))(Qa||{}),De="uninitialized",Rr="pending",dt="fulfilled",pt="rejected";function vn(e){return{status:e,isUninitialized:e===De,isLoading:e===Rr,isSuccess:e===dt,isError:e===pt}}var gn=gt;function Ir(e,t){if(e===t||!(gn(e)&&gn(t)||Array.isArray(e)&&Array.isArray(t)))return t;const r=Object.keys(t),n=Object.keys(e);let i=r.length===n.length;const v=Array.isArray(t)?[]:{};for(const y of r)v[y]=Ir(e[y],t[y]),i&&(i=e[y]===v[y]);return i?e:v}function Fr(e,t,r){return e.reduce((n,i,v)=>(t(i,v)&&n.push(r(i,v)),n),[]).flat()}function ko(e){return new RegExp("(^|:)//").test(e)}function Oo(){return typeof document>"u"?!0:document.visibilityState!=="hidden"}function Vr(e){return e!=null}function mn(e){return[...(e==null?void 0:e.values())??[]].filter(Vr)}function Eo(){return typeof navigator>"u"||navigator.onLine===void 0?!0:navigator.onLine}var Mo=e=>e.replace(/\/$/,""),Ro=e=>e.replace(/^\//,"");function Fo(e,t){if(!e)return t;if(!t)return e;if(ko(t))return t;const r=e.endsWith("/")||!t.startsWith("?")?"/":"";return e=Mo(e),t=Ro(t),`${e}${r}${t}`}function Yt(e,t,r){return e.has(t)?e.get(t):e.set(t,r(t)).get(t)}var Tr=()=>new Map,yn=(...e)=>fetch(...e),To=e=>e.status>=200&&e.status<=299,$o=e=>/ion\/(vnd\.api\+)?json/.test(e.get("content-type")||"");function bn(e){if(!gt(e))return e;const t={...e};for(const[r,n]of Object.entries(t))n===void 0&&delete t[r];return t}var Do=e=>typeof e=="object"&&(gt(e)||Array.isArray(e)||typeof e.toJSON=="function");function zo({baseUrl:e,prepareHeaders:t=Q=>Q,fetchFn:r=yn,paramsSerializer:n,isJsonContentType:i=$o,jsonContentType:v="application/json",jsonReplacer:y,timeout:B,responseHandler:k,validateStatus:M,...N}={}){return typeof fetch>"u"&&r===yn&&console.warn("Warning: `fetch` is not available. Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments."),async(D,A,b)=>{const{getState:z,extra:L,endpoint:Y,forced:G,type:O}=A;let P,{url:C,headers:F=new Headers(N.headers),params:_=void 0,responseHandler:p=k??"json",validateStatus:d=M??To,timeout:a=B,...u}=typeof D=="string"?{url:D}:D,l,s=A.signal;a&&(l=new AbortController,A.signal.addEventListener("abort",l.abort),s=l.signal);let h={...N,signal:s,...u};F=new Headers(bn(F)),h.headers=await t(F,{getState:z,arg:D,extra:L,endpoint:Y,forced:G,type:O,extraOptions:b})||F;const R=Do(h.body);if(h.body!=null&&!R&&typeof h.body!="string"&&h.headers.delete("content-type"),!h.headers.has("content-type")&&R&&h.headers.set("content-type",v),R&&i(h.headers)&&(h.body=JSON.stringify(h.body,y)),h.headers.has("accept")||(p==="json"?h.headers.set("accept","application/json"):p==="text"&&h.headers.set("accept","text/plain, text/html, */*")),_){const ne=~C.indexOf("?")?"&":"?",ae=n?n(_):new URLSearchParams(bn(_));C+=ne+ae}C=Fo(e,C);const W=new Request(C,h);P={request:new Request(C,h)};let w,g=!1,T=l&&setTimeout(()=>{g=!0,l.abort()},a);try{w=await r(W)}catch(ne){return{error:{status:g?"TIMEOUT_ERROR":"FETCH_ERROR",error:String(ne)},meta:P}}finally{T&&clearTimeout(T),l==null||l.signal.removeEventListener("abort",l.abort)}const U=w.clone();P.response=U;let ee,J="";try{let ne;if(await Promise.all([Q(w,p).then(ae=>ee=ae,ae=>ne=ae),U.text().then(ae=>J=ae,()=>{})]),ne)throw ne}catch(ne){return{error:{status:"PARSING_ERROR",originalStatus:w.status,data:J,error:String(ne)},meta:P}}return d(w,ee)?{data:ee,meta:P}:{error:{status:w.status,data:ee},meta:P}};async function Q(D,A){if(typeof A=="function")return A(D);if(A==="content-type"&&(A=i(D.headers)?"json":"text"),A==="json"){const b=await D.text();return b.length?JSON.parse(b):null}return D.text()}}var xn=class{constructor(e,t=void 0){this.value=e,this.meta=t}},Kt="__rtkq/",Go="online",No="offline",Ha="focused",Wr=Xe(`${Kt}${Ha}`),Ya=Xe(`${Kt}un${Ha}`),Ur=Xe(`${Kt}${Go}`),Xa=Xe(`${Kt}${No}`),St="query",Za="mutation",Ka="infinitequery";function Jt(e){return e.type===St}function Bo(e){return e.type===Za}function er(e){return e.type===Ka}function Xt(e){return Jt(e)||er(e)}function Qr(e,t,r,n,i,v){const y=qo(e)?e(t,r,n,i):e;return y?Fr(y,Vr,B=>v(Ja(B))):[]}function qo(e){return typeof e=="function"}function Ja(e){return typeof e=="string"?{type:e}:e}function Io(e,t){return e.catch(t)}var Ye=(e,t)=>e.endpointDefinitions[t],mt=Symbol("forceQueryFn"),$r=e=>typeof e[mt]=="function";function Vo({serializeQueryArgs:e,queryThunk:t,infiniteQueryThunk:r,mutationThunk:n,api:i,context:v,getInternalState:y}){const B=P=>{var C;return(C=y(P))==null?void 0:C.runningQueries},k=P=>{var C;return(C=y(P))==null?void 0:C.runningMutations},{unsubscribeQueryResult:M,removeMutationResult:N,updateSubscriptionOptions:Q}=i.internalActions;return{buildInitiateQuery:Y,buildInitiateInfiniteQuery:G,buildInitiateMutation:O,getRunningQueryThunk:D,getRunningMutationThunk:A,getRunningQueriesThunk:b,getRunningMutationsThunk:z};function D(P,C){return F=>{var d;const _=Ye(v,P),p=e({queryArgs:C,endpointDefinition:_,endpointName:P});return(d=B(F))==null?void 0:d.get(p)}}function A(P,C){return F=>{var _;return(_=k(F))==null?void 0:_.get(C)}}function b(){return P=>mn(B(P))}function z(){return P=>mn(k(P))}function L(P,C){const F=(_,{subscribe:p=!0,forceRefetch:d,subscriptionOptions:a,[mt]:u,...l}={})=>(s,h)=>{var X;const R=e({queryArgs:_,endpointDefinition:C,endpointName:P});let W;const o={...l,type:St,subscribe:p,forceRefetch:d,subscriptionOptions:a,endpointName:P,originalArgs:_,queryCacheKey:R,[mt]:u};if(Jt(C))W=t(o);else{const{direction:te,initialPageParam:ie}=l;W=r({...o,direction:te,initialPageParam:ie})}const w=i.endpoints[P].select(_),g=s(W),T=w(h()),{requestId:U,abort:ee}=g,J=T.requestId!==U,ne=(X=B(s))==null?void 0:X.get(R),ae=()=>w(h()),ue=Object.assign(u?g.then(ae):J&&!ne?Promise.resolve(T):Promise.all([ne,g]).then(ae),{arg:_,requestId:U,subscriptionOptions:a,queryCacheKey:R,abort:ee,async unwrap(){const te=await ue;if(te.isError)throw te.error;return te.data},refetch:()=>s(F(_,{subscribe:!1,forceRefetch:!0})),unsubscribe(){p&&s(M({queryCacheKey:R,requestId:U}))},updateSubscriptionOptions(te){ue.subscriptionOptions=te,s(Q({endpointName:P,requestId:U,queryCacheKey:R,options:te}))}});if(!ne&&!J&&!u){const te=B(s);te.set(R,ue),ue.then(()=>{te.delete(R)})}return ue};return F}function Y(P,C){return L(P,C)}function G(P,C){return L(P,C)}function O(P){return(C,{track:F=!0,fixedCacheKey:_}={})=>(p,d)=>{const a=n({type:"mutation",endpointName:P,originalArgs:C,track:F,fixedCacheKey:_}),u=p(a),{requestId:l,abort:s,unwrap:h}=u,R=Io(u.unwrap().then(g=>({data:g})),g=>({error:g})),W=()=>{p(N({requestId:l,fixedCacheKey:_}))},o=Object.assign(R,{arg:u.arg,requestId:l,abort:s,unwrap:h,reset:W}),w=k(p);return w.set(l,o),o.then(()=>{w.delete(l)}),_&&(w.set(_,o),o.then(()=>{w.get(_)===o&&w.delete(_)})),o}}}var ei=class extends jo{constructor(e,t,r,n){super(e),this.value=t,this.schemaName=r,this._bqMeta=n}},Be=(e,t)=>Array.isArray(e)?e.includes(t):!!e;async function qe(e,t,r,n){const i=await e["~standard"].validate(t);if(i.issues)throw new ei(i.issues,t,r,n);return i.value}function Cn(e){return e}var Je=(e={})=>({...e,[Ba]:!0});function Wo({reducerPath:e,baseQuery:t,context:{endpointDefinitions:r},serializeQueryArgs:n,api:i,assertTagType:v,selectors:y,onSchemaFailure:B,catchSchemaFailure:k,skipSchemaValidation:M}){const N=(u,l,s,h)=>(R,W)=>{const o=r[u],w=n({queryArgs:l,endpointDefinition:o,endpointName:u});if(R(i.internalActions.queryResultPatched({queryCacheKey:w,patches:s})),!h)return;const g=i.endpoints[u].select(l)(W()),T=Qr(o.providesTags,g.data,void 0,l,{},v);R(i.internalActions.updateProvidedBy([{queryCacheKey:w,providedTags:T}]))};function Q(u,l,s=0){const h=[l,...u];return s&&h.length>s?h.slice(0,-1):h}function D(u,l,s=0){const h=[...u,l];return s&&h.length>s?h.slice(1):h}const A=(u,l,s,h=!0)=>(R,W)=>{const w=i.endpoints[u].select(l)(W()),g={patches:[],inversePatches:[],undo:()=>R(i.util.patchQueryData(u,l,g.inversePatches,h))};if(w.status===De)return g;let T;if("data"in w)if(so(w.data)){const[U,ee,J]=qa(w.data,s);g.patches.push(...ee),g.inversePatches.push(...J),T=U}else T=s(w.data),g.patches.push({op:"replace",path:[],value:T}),g.inversePatches.push({op:"replace",path:[],value:w.data});return g.patches.length===0||R(i.util.patchQueryData(u,l,g.patches,h)),g},b=(u,l,s)=>h=>h(i.endpoints[u].initiate(l,{subscribe:!1,forceRefetch:!0,[mt]:()=>({data:s})})),z=(u,l)=>u.query&&u[l]?u[l]:Cn,L=async(u,{signal:l,abort:s,rejectWithValue:h,fulfillWithValue:R,dispatch:W,getState:o,extra:w})=>{var J,ne;const g=r[u.endpointName],{metaSchema:T,skipSchemaValidation:U=M}=g,ee=u.type===St;try{let ae=Cn;const ue={signal:l,abort:s,dispatch:W,getState:o,extra:w,endpoint:u.endpointName,type:u.type,forced:ee?Y(u,o()):void 0,queryCacheKey:ee?u.queryCacheKey:void 0},X=ee?u[mt]:void 0;let te;const ie=async($,x,E,q)=>{if(x==null&&$.pages.length)return Promise.resolve({data:$});const H={queryArg:u.originalArgs,pageParam:x},K=await le(H),m=q?Q:D;return{data:{pages:m($.pages,K.data,E),pageParams:m($.pageParams,x,E)},meta:K.meta}};async function le($){let x;const{extraOptions:E,argSchema:q,rawResponseSchema:H,responseSchema:K}=g;if(q&&!Be(U,"arg")&&($=await qe(q,$,"argSchema",{})),X?x=X():g.query?(ae=z(g,"transformResponse"),x=await t(g.query($),ue,E)):x=await g.queryFn($,ue,E,f=>t(f,ue,E)),typeof process<"u",x.error)throw new xn(x.error,x.meta);let{data:m}=x;H&&!Be(U,"rawResponse")&&(m=await qe(H,x.data,"rawResponseSchema",x.meta));let V=await ae(m,x.meta,$);return K&&!Be(U,"response")&&(V=await qe(K,V,"responseSchema",x.meta)),{...x,data:V}}if(ee&&"infiniteQueryOptions"in g){const{infiniteQueryOptions:$}=g,{maxPages:x=1/0}=$;let E;const q={pages:[],pageParams:[]},H=(J=y.selectQueryEntry(o(),u.queryCacheKey))==null?void 0:J.data,m=Y(u,o())&&!u.direction||!H?q:H;if("direction"in u&&u.direction&&m.pages.length){const V=u.direction==="backward",S=(V?ti:Dr)($,m,u.originalArgs);E=await ie(m,S,x,V)}else{const{initialPageParam:V=$.initialPageParam}=u,f=(H==null?void 0:H.pageParams)??[],S=f[0]??V,j=f.length;E=await ie(m,S,x),X&&(E={data:E.data.pages[0]});for(let I=1;I<j;I++){const Z=Dr($,E.data,u.originalArgs);E=await ie(E.data,Z,x)}}te=E}else te=await le(u.originalArgs);return T&&!Be(U,"meta")&&te.meta&&(te.meta=await qe(T,te.meta,"metaSchema",te.meta)),R(te.data,Je({fulfilledTimeStamp:Date.now(),baseQueryMeta:te.meta}))}catch(ae){let ue=ae;if(ue instanceof xn){let X=z(g,"transformErrorResponse");const{rawErrorResponseSchema:te,errorResponseSchema:ie}=g;let{value:le,meta:$}=ue;try{te&&!Be(U,"rawErrorResponse")&&(le=await qe(te,le,"rawErrorResponseSchema",$)),T&&!Be(U,"meta")&&($=await qe(T,$,"metaSchema",$));let x=await X(le,$,u.originalArgs);return ie&&!Be(U,"errorResponse")&&(x=await qe(ie,x,"errorResponseSchema",$)),h(x,Je({baseQueryMeta:$}))}catch(x){ue=x}}try{if(ue instanceof ei){const X={endpoint:u.endpointName,arg:u.originalArgs,type:u.type,queryCacheKey:ee?u.queryCacheKey:void 0};(ne=g.onSchemaFailure)==null||ne.call(g,ue,X),B==null||B(ue,X);const{catchSchemaFailure:te=k}=g;if(te)return h(te(ue,X),Je({baseQueryMeta:ue._bqMeta}))}}catch(X){ue=X}throw console.error(ue),ue}};function Y(u,l){const s=y.selectQueryEntry(l,u.queryCacheKey),h=y.selectConfig(l).refetchOnMountOrArgChange,R=s==null?void 0:s.fulfilledTimeStamp,W=u.forceRefetch??(u.subscribe&&h);return W?W===!0||(Number(new Date)-Number(R))/1e3>=W:!1}const G=()=>cn(`${e}/executeQuery`,L,{getPendingMeta({arg:l}){const s=r[l.endpointName];return Je({startedTimeStamp:Date.now(),...er(s)?{direction:l.direction}:{}})},condition(l,{getState:s}){var U;const h=s(),R=y.selectQueryEntry(h,l.queryCacheKey),W=R==null?void 0:R.fulfilledTimeStamp,o=l.originalArgs,w=R==null?void 0:R.originalArgs,g=r[l.endpointName],T=l.direction;return $r(l)?!0:(R==null?void 0:R.status)==="pending"?!1:Y(l,h)||Jt(g)&&((U=g==null?void 0:g.forceRefetch)!=null&&U.call(g,{currentArg:o,previousArg:w,endpointState:R,state:h}))?!0:!(W&&!T)},dispatchConditionRejection:!0}),O=G(),P=G(),C=cn(`${e}/executeMutation`,L,{getPendingMeta(){return Je({startedTimeStamp:Date.now()})}}),F=u=>"force"in u,_=u=>"ifOlderThan"in u,p=(u,l,s={})=>(h,R)=>{const W=F(s)&&s.force,o=_(s)&&s.ifOlderThan,w=(T=!0)=>{const U={forceRefetch:T,subscribe:!1};return i.endpoints[u].initiate(l,U)},g=i.endpoints[u].select(l)(R());if(W)h(w());else if(o){const T=g==null?void 0:g.fulfilledTimeStamp;if(!T){h(w());return}(Number(new Date)-Number(new Date(T)))/1e3>=o&&h(w())}else h(w(!1))};function d(u){return l=>{var s,h;return((h=(s=l==null?void 0:l.meta)==null?void 0:s.arg)==null?void 0:h.endpointName)===u}}function a(u,l){return{matchPending:ir(Ia(u),d(l)),matchFulfilled:ir(Ve(u),d(l)),matchRejected:ir(Br(u),d(l))}}return{queryThunk:O,mutationThunk:C,infiniteQueryThunk:P,prefetch:p,updateQueryData:A,upsertQueryData:b,patchQueryData:N,buildMatchThunkActions:a}}function Dr(e,{pages:t,pageParams:r},n){const i=t.length-1;return e.getNextPageParam(t[i],t,r[i],r,n)}function ti(e,{pages:t,pageParams:r},n){var i;return(i=e.getPreviousPageParam)==null?void 0:i.call(e,t[0],t,r[0],r,n)}function ri(e,t,r,n){return Qr(r[e.meta.arg.endpointName][t],Ve(e)?e.payload:void 0,Nr(e)?e.payload:void 0,e.meta.arg.originalArgs,"baseQueryMeta"in e.meta?e.meta.baseQueryMeta:void 0,n)}function Pn(e){return Va(e)?lo(e):e}function kt(e,t,r){const n=e[t];n&&r(n)}function yt(e){return("arg"in e?e.arg.fixedCacheKey:e.fixedCacheKey)??e.requestId}function Sn(e,t,r){const n=e[yt(t)];n&&r(n)}var Ot={};function Uo({reducerPath:e,queryThunk:t,mutationThunk:r,serializeQueryArgs:n,context:{endpointDefinitions:i,apiUid:v,extractRehydrationInfo:y,hasRehydrationInfo:B},assertTagType:k,config:M}){const N=Xe(`${e}/resetApiState`);function Q(d,a,u,l){var s;d[s=a.queryCacheKey]??(d[s]={status:De,endpointName:a.endpointName}),kt(d,a.queryCacheKey,h=>{h.status=Rr,h.requestId=u&&h.requestId?h.requestId:l.requestId,a.originalArgs!==void 0&&(h.originalArgs=a.originalArgs),h.startedTimeStamp=l.startedTimeStamp;const R=i[l.arg.endpointName];er(R)&&"direction"in a&&(h.direction=a.direction)})}function D(d,a,u,l){kt(d,a.arg.queryCacheKey,s=>{if(s.requestId!==a.requestId&&!l)return;const{merge:h}=i[a.arg.endpointName];if(s.status=dt,h)if(s.data!==void 0){const{fulfilledTimeStamp:R,arg:W,baseQueryMeta:o,requestId:w}=a;let g=qr(s.data,T=>h(T,u,{arg:W.originalArgs,baseQueryMeta:o,fulfilledTimeStamp:R,requestId:w}));s.data=g}else s.data=u;else s.data=i[a.arg.endpointName].structuralSharing??!0?Ir(Va(s.data)?uo(s.data):s.data,u):u;delete s.error,s.fulfilledTimeStamp=a.fulfilledTimeStamp})}const A=Ue({name:`${e}/queries`,initialState:Ot,reducers:{removeQueryResult:{reducer(d,{payload:{queryCacheKey:a}}){delete d[a]},prepare:Ke()},cacheEntriesUpserted:{reducer(d,a){for(const u of a.payload){const{queryDescription:l,value:s}=u;Q(d,l,!0,{arg:l,requestId:a.meta.requestId,startedTimeStamp:a.meta.timestamp}),D(d,{arg:l,requestId:a.meta.requestId,fulfilledTimeStamp:a.meta.timestamp,baseQueryMeta:{}},s,!0)}},prepare:d=>({payload:d.map(l=>{const{endpointName:s,arg:h,value:R}=l,W=i[s];return{queryDescription:{type:St,endpointName:s,originalArgs:l.arg,queryCacheKey:n({queryArgs:h,endpointDefinition:W,endpointName:s})},value:R}}),meta:{[Ba]:!0,requestId:za(),timestamp:Date.now()}})},queryResultPatched:{reducer(d,{payload:{queryCacheKey:a,patches:u}}){kt(d,a,l=>{l.data=fn(l.data,u.concat())})},prepare:Ke()}},extraReducers(d){d.addCase(t.pending,(a,{meta:u,meta:{arg:l}})=>{const s=$r(l);Q(a,l,s,u)}).addCase(t.fulfilled,(a,{meta:u,payload:l})=>{const s=$r(u.arg);D(a,u,l,s)}).addCase(t.rejected,(a,{meta:{condition:u,arg:l,requestId:s},error:h,payload:R})=>{kt(a,l.queryCacheKey,W=>{if(!u){if(W.requestId!==s)return;W.status=pt,W.error=R??h}})}).addMatcher(B,(a,u)=>{const{queries:l}=y(u);for(const[s,h]of Object.entries(l))((h==null?void 0:h.status)===dt||(h==null?void 0:h.status)===pt)&&(a[s]=h)})}}),b=Ue({name:`${e}/mutations`,initialState:Ot,reducers:{removeMutationResult:{reducer(d,{payload:a}){const u=yt(a);u in d&&delete d[u]},prepare:Ke()}},extraReducers(d){d.addCase(r.pending,(a,{meta:u,meta:{requestId:l,arg:s,startedTimeStamp:h}})=>{s.track&&(a[yt(u)]={requestId:l,status:Rr,endpointName:s.endpointName,startedTimeStamp:h})}).addCase(r.fulfilled,(a,{payload:u,meta:l})=>{l.arg.track&&Sn(a,l,s=>{s.requestId===l.requestId&&(s.status=dt,s.data=u,s.fulfilledTimeStamp=l.fulfilledTimeStamp)})}).addCase(r.rejected,(a,{payload:u,error:l,meta:s})=>{s.arg.track&&Sn(a,s,h=>{h.requestId===s.requestId&&(h.status=pt,h.error=u??l)})}).addMatcher(B,(a,u)=>{const{mutations:l}=y(u);for(const[s,h]of Object.entries(l))((h==null?void 0:h.status)===dt||(h==null?void 0:h.status)===pt)&&s!==(h==null?void 0:h.requestId)&&(a[s]=h)})}}),z={tags:{},keys:{}},L=Ue({name:`${e}/invalidation`,initialState:z,reducers:{updateProvidedBy:{reducer(d,a){var u,l,s;for(const{queryCacheKey:h,providedTags:R}of a.payload){Y(d,h);for(const{type:W,id:o}of R){const w=(l=(u=d.tags)[W]??(u[W]={}))[s=o||"__internal_without_id"]??(l[s]=[]);w.includes(h)||w.push(h)}d.keys[h]=R}},prepare:Ke()}},extraReducers(d){d.addCase(A.actions.removeQueryResult,(a,{payload:{queryCacheKey:u}})=>{Y(a,u)}).addMatcher(B,(a,u)=>{var s,h,R;const{provided:l}=y(u);for(const[W,o]of Object.entries(l.tags??{}))for(const[w,g]of Object.entries(o)){const T=(h=(s=a.tags)[W]??(s[W]={}))[R=w||"__internal_without_id"]??(h[R]=[]);for(const U of g)T.includes(U)||T.push(U),a.keys[U]=l.keys[U]}}).addMatcher(Ht(Ve(t),Nr(t)),(a,u)=>{G(a,[u])}).addMatcher(A.actions.cacheEntriesUpserted.match,(a,u)=>{const l=u.payload.map(({queryDescription:s,value:h})=>({type:"UNKNOWN",payload:h,meta:{requestStatus:"fulfilled",requestId:"UNKNOWN",arg:s}}));G(a,l)})}});function Y(d,a){var l;const u=Pn(d.keys[a]??[]);for(const s of u){const h=s.type,R=s.id??"__internal_without_id",W=(l=d.tags[h])==null?void 0:l[R];W&&(d.tags[h][R]=Pn(W).filter(o=>o!==a))}delete d.keys[a]}function G(d,a){const u=a.map(l=>{const s=ri(l,"providesTags",i,k),{queryCacheKey:h}=l.meta.arg;return{queryCacheKey:h,providedTags:s}});L.caseReducers.updateProvidedBy(d,L.actions.updateProvidedBy(u))}const O=Ue({name:`${e}/subscriptions`,initialState:Ot,reducers:{updateSubscriptionOptions(d,a){},unsubscribeQueryResult(d,a){},internal_getRTKQSubscriptions(){}}}),P=Ue({name:`${e}/internalSubscriptions`,initialState:Ot,reducers:{subscriptionsUpdated:{reducer(d,a){return fn(d,a.payload)},prepare:Ke()}}}),C=Ue({name:`${e}/config`,initialState:{online:Eo(),focused:Oo(),middlewareRegistered:!1,...M},reducers:{middlewareRegistered(d,{payload:a}){d.middlewareRegistered=d.middlewareRegistered==="conflict"||v!==a?"conflict":!0}},extraReducers:d=>{d.addCase(Ur,a=>{a.online=!0}).addCase(Xa,a=>{a.online=!1}).addCase(Wr,a=>{a.focused=!0}).addCase(Ya,a=>{a.focused=!1}).addMatcher(B,a=>({...a}))}}),F=io({queries:A.reducer,mutations:b.reducer,provided:L.reducer,subscriptions:P.reducer,config:C.reducer}),_=(d,a)=>F(N.match(a)?void 0:d,a),p={...C.actions,...A.actions,...O.actions,...P.actions,...b.actions,...L.actions,resetApiState:N};return{reducer:_,actions:p}}var ke=Symbol.for("RTKQ/skipToken"),ni={status:De},_n=qr(ni,()=>{}),wn=qr(ni,()=>{});function Qo({serializeQueryArgs:e,reducerPath:t,createSelector:r}){const n=O=>_n,i=O=>wn;return{buildQuerySelector:D,buildInfiniteQuerySelector:A,buildMutationSelector:b,selectInvalidatedBy:z,selectCachedArgsForQuery:L,selectApiState:y,selectQueries:B,selectMutations:M,selectQueryEntry:k,selectConfig:N};function v(O){return{...O,...vn(O.status)}}function y(O){return O[t]}function B(O){var P;return(P=y(O))==null?void 0:P.queries}function k(O,P){var C;return(C=B(O))==null?void 0:C[P]}function M(O){var P;return(P=y(O))==null?void 0:P.mutations}function N(O){var P;return(P=y(O))==null?void 0:P.config}function Q(O,P,C){return F=>{if(F===ke)return r(n,C);const _=e({queryArgs:F,endpointDefinition:P,endpointName:O});return r(d=>k(d,_)??_n,C)}}function D(O,P){return Q(O,P,v)}function A(O,P){const{infiniteQueryOptions:C}=P;function F(_){const p={..._,...vn(_.status)},{isLoading:d,isError:a,direction:u}=p,l=u==="forward",s=u==="backward";return{...p,hasNextPage:Y(C,p.data,p.originalArgs),hasPreviousPage:G(C,p.data,p.originalArgs),isFetchingNextPage:d&&l,isFetchingPreviousPage:d&&s,isFetchNextPageError:a&&l,isFetchPreviousPageError:a&&s}}return Q(O,P,F)}function b(){return O=>{let P;return typeof O=="object"?P=yt(O)??ke:P=O,r(P===ke?i:_=>{var p,d;return((d=(p=y(_))==null?void 0:p.mutations)==null?void 0:d[P])??wn},v)}}function z(O,P){const C=O[t],F=new Set,_=Fr(P,Vr,Ja);for(const p of _){const d=C.provided.tags[p.type];if(!d)continue;let a=(p.id!==void 0?d[p.id]:Object.values(d).flat())??[];for(const u of a)F.add(u)}return Array.from(F.values()).flatMap(p=>{const d=C.queries[p];return d?{queryCacheKey:p,endpointName:d.endpointName,originalArgs:d.originalArgs}:[]})}function L(O,P){return Fr(Object.values(B(O)),C=>(C==null?void 0:C.endpointName)===P&&C.status!==De,C=>C.originalArgs)}function Y(O,P,C){return P?Dr(O,P,C)!=null:!1}function G(O,P,C){return!P||!O.getPreviousPageParam?!1:ti(O,P,C)!=null}}var Qe=WeakMap?new WeakMap:void 0,An=({endpointName:e,queryArgs:t})=>{let r="";const n=Qe==null?void 0:Qe.get(t);if(typeof n=="string")r=n;else{const i=JSON.stringify(t,(v,y)=>(y=typeof y=="bigint"?{$bigint:y.toString()}:y,y=gt(y)?Object.keys(y).sort().reduce((B,k)=>(B[k]=y[k],B),{}):y,y));gt(t)&&(Qe==null||Qe.set(t,i)),r=i}return`${e}(${r})`};function Ho(...e){return function(r){const n=un(M=>{var N;return(N=r.extractRehydrationInfo)==null?void 0:N.call(r,M,{reducerPath:r.reducerPath??"api"})}),i={reducerPath:"api",keepUnusedDataFor:60,refetchOnMountOrArgChange:!1,refetchOnFocus:!1,refetchOnReconnect:!1,invalidationBehavior:"delayed",...r,extractRehydrationInfo:n,serializeQueryArgs(M){let N=An;if("serializeQueryArgs"in M.endpointDefinition){const Q=M.endpointDefinition.serializeQueryArgs;N=D=>{const A=Q(D);return typeof A=="string"?A:An({...D,queryArgs:A})}}else r.serializeQueryArgs&&(N=r.serializeQueryArgs);return N(M)},tagTypes:[...r.tagTypes||[]]},v={endpointDefinitions:{},batch(M){M()},apiUid:za(),extractRehydrationInfo:n,hasRehydrationInfo:un(M=>n(M)!=null)},y={injectEndpoints:k,enhanceEndpoints({addTagTypes:M,endpoints:N}){if(M)for(const Q of M)i.tagTypes.includes(Q)||i.tagTypes.push(Q);if(N)for(const[Q,D]of Object.entries(N))typeof D=="function"?D(Ye(v,Q)):Object.assign(Ye(v,Q)||{},D);return y}},B=e.map(M=>M.init(y,i,v));function k(M){const N=M.endpoints({query:Q=>({...Q,type:St}),mutation:Q=>({...Q,type:Za}),infiniteQuery:Q=>({...Q,type:Ka})});for(const[Q,D]of Object.entries(N)){if(M.overrideExisting!==!0&&Q in v.endpointDefinitions){if(M.overrideExisting==="throw")throw new Error(Ga(39));continue}v.endpointDefinitions[Q]=D;for(const A of B)A.injectEndpoint(Q,D)}return y}return y.injectEndpoints({endpoints:r.endpoints})}}function Te(e,...t){return Object.assign(e,...t)}var Yo=({api:e,queryThunk:t,internalState:r,mwApi:n})=>{const i=`${e.reducerPath}/subscriptions`;let v=null,y=null;const{updateSubscriptionOptions:B,unsubscribeQueryResult:k}=e.internalActions,M=(z,L)=>{if(B.match(L)){const{queryCacheKey:G,requestId:O,options:P}=L.payload,C=z.get(G);return C!=null&&C.has(O)&&C.set(O,P),!0}if(k.match(L)){const{queryCacheKey:G,requestId:O}=L.payload,P=z.get(G);return P&&P.delete(O),!0}if(e.internalActions.removeQueryResult.match(L))return z.delete(L.payload.queryCacheKey),!0;if(t.pending.match(L)){const{meta:{arg:G,requestId:O}}=L,P=Yt(z,G.queryCacheKey,Tr);return G.subscribe&&P.set(O,G.subscriptionOptions??P.get(O)??{}),!0}let Y=!1;if(t.rejected.match(L)){const{meta:{condition:G,arg:O,requestId:P}}=L;if(G&&O.subscribe){const C=Yt(z,O.queryCacheKey,Tr);C.set(P,O.subscriptionOptions??C.get(P)??{}),Y=!0}}return Y},N=()=>r.currentSubscriptions,A={getSubscriptions:N,getSubscriptionCount:z=>{const Y=N().get(z);return(Y==null?void 0:Y.size)??0},isRequestSubscribed:(z,L)=>{var G;const Y=N();return!!((G=Y==null?void 0:Y.get(z))!=null&&G.get(L))}};function b(z){return JSON.parse(JSON.stringify(Object.fromEntries([...z].map(([L,Y])=>[L,Object.fromEntries(Y)]))))}return(z,L)=>{if(v||(v=b(r.currentSubscriptions)),e.util.resetApiState.match(z))return v={},r.currentSubscriptions.clear(),y=null,[!0,!1];if(e.internalActions.internal_getRTKQSubscriptions.match(z))return[!1,A];const Y=M(r.currentSubscriptions,z);let G=!0;if(Y){y||(y=setTimeout(()=>{const C=b(r.currentSubscriptions),[,F]=qa(v,()=>C);L.next(e.internalActions.subscriptionsUpdated(F)),v=C,y=null},500));const O=typeof z.type=="string"&&!!z.type.startsWith(i),P=t.rejected.match(z)&&z.meta.condition&&!!z.meta.arg.subscribe;G=!O&&!P}return[G,!1]}},Xo=2147483647/1e3-1,Zo=({reducerPath:e,api:t,queryThunk:r,context:n,internalState:i,selectors:{selectQueryEntry:v,selectConfig:y},getRunningQueryThunk:B,mwApi:k})=>{const{removeQueryResult:M,unsubscribeQueryResult:N,cacheEntriesUpserted:Q}=t.internalActions,D=Ht(N.match,r.fulfilled,r.rejected,Q.match);function A(O){const P=i.currentSubscriptions.get(O);return P?P.size>0:!1}const b={};function z(O){var P;for(const C of O.values())(P=C==null?void 0:C.abort)==null||P.call(C)}const L=(O,P)=>{const C=P.getState(),F=y(C);if(D(O)){let _;if(Q.match(O))_=O.payload.map(p=>p.queryDescription.queryCacheKey);else{const{queryCacheKey:p}=N.match(O)?O.payload:O.meta.arg;_=[p]}Y(_,P,F)}if(t.util.resetApiState.match(O)){for(const[_,p]of Object.entries(b))p&&clearTimeout(p),delete b[_];z(i.runningQueries),z(i.runningMutations)}if(n.hasRehydrationInfo(O)){const{queries:_}=n.extractRehydrationInfo(O);Y(Object.keys(_),P,F)}};function Y(O,P,C){const F=P.getState();for(const _ of O){const p=v(F,_);p!=null&&p.endpointName&&G(_,p.endpointName,P,C)}}function G(O,P,C,F){const _=Ye(n,P),p=(_==null?void 0:_.keepUnusedDataFor)??F.keepUnusedDataFor;if(p===1/0)return;const d=Math.max(0,Math.min(p,Xo));if(!A(O)){const a=b[O];a&&clearTimeout(a),b[O]=setTimeout(()=>{if(!A(O)){const u=v(C.getState(),O);if(u!=null&&u.endpointName){const l=C.dispatch(B(u.endpointName,u.originalArgs));l==null||l.abort()}C.dispatch(M({queryCacheKey:O}))}delete b[O]},d*1e3)}}return L},Ln=new Error("Promise never resolved before cacheEntryRemoved."),Ko=({api:e,reducerPath:t,context:r,queryThunk:n,mutationThunk:i,internalState:v,selectors:{selectQueryEntry:y,selectApiState:B}})=>{const k=dn(n),M=dn(i),N=Ve(n,i),Q={},{removeQueryResult:D,removeMutationResult:A,cacheEntriesUpserted:b}=e.internalActions;function z(C,F,_){const p=Q[C];p!=null&&p.valueResolved&&(p.valueResolved({data:F,meta:_}),delete p.valueResolved)}function L(C){const F=Q[C];F&&(delete Q[C],F.cacheEntryRemoved())}function Y(C){const{arg:F,requestId:_}=C.meta,{endpointName:p,originalArgs:d}=F;return[p,d,_]}const G=(C,F,_)=>{const p=O(C);function d(a,u,l,s){const h=y(_,u),R=y(F.getState(),u);!h&&R&&P(a,s,u,F,l)}if(n.pending.match(C)){const[a,u,l]=Y(C);d(a,p,l,u)}else if(b.match(C))for(const{queryDescription:a,value:u}of C.payload){const{endpointName:l,originalArgs:s,queryCacheKey:h}=a;d(l,h,C.meta.requestId,s),z(h,u,{})}else if(i.pending.match(C)){if(F.getState()[t].mutations[p]){const[u,l,s]=Y(C);P(u,l,p,F,s)}}else if(N(C))z(p,C.payload,C.meta.baseQueryMeta);else if(D.match(C)||A.match(C))L(p);else if(e.util.resetApiState.match(C))for(const a of Object.keys(Q))L(a)};function O(C){return k(C)?C.meta.arg.queryCacheKey:M(C)?C.meta.arg.fixedCacheKey??C.meta.requestId:D.match(C)?C.payload.queryCacheKey:A.match(C)?yt(C.payload):""}function P(C,F,_,p,d){const a=Ye(r,C),u=a==null?void 0:a.onCacheEntryAdded;if(!u)return;const l={},s=new Promise(g=>{l.cacheEntryRemoved=g}),h=Promise.race([new Promise(g=>{l.valueResolved=g}),s.then(()=>{throw Ln})]);h.catch(()=>{}),Q[_]=l;const R=e.endpoints[C].select(Xt(a)?F:_),W=p.dispatch((g,T,U)=>U),o={...p,getCacheEntry:()=>R(p.getState()),requestId:d,extra:W,updateCachedData:Xt(a)?g=>p.dispatch(e.util.updateQueryData(C,F,g)):void 0,cacheDataLoaded:h,cacheEntryRemoved:s},w=u(F,o);Promise.resolve(w).catch(g=>{if(g!==Ln)throw g})}return G},Jo=({api:e,context:{apiUid:t},reducerPath:r})=>(n,i)=>{e.util.resetApiState.match(n)&&i.dispatch(e.internalActions.middlewareRegistered(t))},es=({reducerPath:e,context:t,context:{endpointDefinitions:r},mutationThunk:n,queryThunk:i,api:v,assertTagType:y,refetchQuery:B,internalState:k})=>{const{removeQueryResult:M}=v.internalActions,N=Ht(Ve(n),Nr(n)),Q=Ht(Ve(i,n),Br(i,n));let D=[],A=0;const b=(Y,G)=>{(i.pending.match(Y)||n.pending.match(Y))&&A++,Q(Y)&&(A=Math.max(0,A-1)),N(Y)?L(ri(Y,"invalidatesTags",r,y),G):Q(Y)?L([],G):v.util.invalidateTags.match(Y)&&L(Qr(Y.payload,void 0,void 0,void 0,void 0,y),G)};function z(){return A>0}function L(Y,G){const O=G.getState(),P=O[e];if(D.push(...Y),P.config.invalidationBehavior==="delayed"&&z())return;const C=D;if(D=[],C.length===0)return;const F=v.util.selectInvalidatedBy(O,C);t.batch(()=>{const _=Array.from(F.values());for(const{queryCacheKey:p}of _){const d=P.queries[p],a=Yt(k.currentSubscriptions,p,Tr);d&&(a.size===0?G.dispatch(M({queryCacheKey:p})):d.status!==De&&G.dispatch(B(d)))}})}return b},ts=({reducerPath:e,queryThunk:t,api:r,refetchQuery:n,internalState:i})=>{const{currentPolls:v,currentSubscriptions:y}=i,B=new Set;let k=null;const M=(L,Y)=>{(r.internalActions.updateSubscriptionOptions.match(L)||r.internalActions.unsubscribeQueryResult.match(L))&&N(L.payload.queryCacheKey,Y),(t.pending.match(L)||t.rejected.match(L)&&L.meta.condition)&&N(L.meta.arg.queryCacheKey,Y),(t.fulfilled.match(L)||t.rejected.match(L)&&!L.meta.condition)&&Q(L.meta.arg,Y),r.util.resetApiState.match(L)&&(b(),k&&(clearTimeout(k),k=null),B.clear())};function N(L,Y){B.add(L),k||(k=setTimeout(()=>{for(const G of B)D({queryCacheKey:G},Y);B.clear(),k=null},0))}function Q({queryCacheKey:L},Y){const G=Y.getState()[e],O=G.queries[L],P=y.get(L);if(!O||O.status===De)return;const{lowestPollingInterval:C,skipPollingIfUnfocused:F}=z(P);if(!Number.isFinite(C))return;const _=v.get(L);_!=null&&_.timeout&&(clearTimeout(_.timeout),_.timeout=void 0);const p=Date.now()+C;v.set(L,{nextPollTimestamp:p,pollingInterval:C,timeout:setTimeout(()=>{(G.config.focused||!F)&&Y.dispatch(n(O)),Q({queryCacheKey:L},Y)},C)})}function D({queryCacheKey:L},Y){const O=Y.getState()[e].queries[L],P=y.get(L);if(!O||O.status===De)return;const{lowestPollingInterval:C}=z(P);if(!Number.isFinite(C)){A(L);return}const F=v.get(L),_=Date.now()+C;(!F||_<F.nextPollTimestamp)&&Q({queryCacheKey:L},Y)}function A(L){const Y=v.get(L);Y!=null&&Y.timeout&&clearTimeout(Y.timeout),v.delete(L)}function b(){for(const L of v.keys())A(L)}function z(L=new Map){let Y=!1,G=Number.POSITIVE_INFINITY;for(const O of L.values())O.pollingInterval&&(G=Math.min(O.pollingInterval,G),Y=O.skipPollingIfUnfocused||Y);return{lowestPollingInterval:G,skipPollingIfUnfocused:Y}}return M},rs=({api:e,context:t,queryThunk:r,mutationThunk:n})=>{const i=Ia(r,n),v=Br(r,n),y=Ve(r,n),B={};return(M,N)=>{var Q,D;if(i(M)){const{requestId:A,arg:{endpointName:b,originalArgs:z}}=M.meta,L=Ye(t,b),Y=L==null?void 0:L.onQueryStarted;if(Y){const G={},O=new Promise((_,p)=>{G.resolve=_,G.reject=p});O.catch(()=>{}),B[A]=G;const P=e.endpoints[b].select(Xt(L)?z:A),C=N.dispatch((_,p,d)=>d),F={...N,getCacheEntry:()=>P(N.getState()),requestId:A,extra:C,updateCachedData:Xt(L)?_=>N.dispatch(e.util.updateQueryData(b,z,_)):void 0,queryFulfilled:O};Y(z,F)}}else if(y(M)){const{requestId:A,baseQueryMeta:b}=M.meta;(Q=B[A])==null||Q.resolve({data:M.payload,meta:b}),delete B[A]}else if(v(M)){const{requestId:A,rejectedWithValue:b,baseQueryMeta:z}=M.meta;(D=B[A])==null||D.reject({error:M.payload??M.error,isUnhandledError:!b,meta:z}),delete B[A]}}},ns=({reducerPath:e,context:t,api:r,refetchQuery:n,internalState:i})=>{const{removeQueryResult:v}=r.internalActions,y=(k,M)=>{Wr.match(k)&&B(M,"refetchOnFocus"),Ur.match(k)&&B(M,"refetchOnReconnect")};function B(k,M){const N=k.getState()[e],Q=N.queries,D=i.currentSubscriptions;t.batch(()=>{for(const A of D.keys()){const b=Q[A],z=D.get(A);if(!z||!b)continue;const L=[...z.values()];(L.some(G=>G[M]===!0)||L.every(G=>G[M]===void 0)&&N.config[M])&&(z.size===0?k.dispatch(v({queryCacheKey:A})):b.status!==De&&k.dispatch(n(b)))}})}return y};function as(e){const{reducerPath:t,queryThunk:r,api:n,context:i,getInternalState:v}=e,{apiUid:y}=i,B={invalidateTags:Xe(`${t}/invalidateTags`)},k=D=>D.type.startsWith(`${t}/`),M=[Jo,Zo,es,ts,Ko,rs];return{middleware:D=>{let A=!1;const b=v(D.dispatch),z={...e,internalState:b,refetchQuery:Q,isThisApiSliceAction:k,mwApi:D},L=M.map(O=>O(z)),Y=Yo(z),G=ns(z);return O=>P=>{if(!co(P))return O(P);A||(A=!0,D.dispatch(n.internalActions.middlewareRegistered(y)));const C={...D,next:O},F=D.getState(),[_,p]=Y(P,C,F);let d;if(_?d=O(P):d=p,D.getState()[t]&&(G(P,C,F),k(P)||i.hasRehydrationInfo(P)))for(const a of L)a(P,C,F);return d}},actions:B};function Q(D){return e.api.endpoints[D.endpointName].initiate(D.originalArgs,{subscribe:!1,forceRefetch:!0})}}var jn=Symbol(),is=({createSelector:e=Na}={})=>({name:jn,init(t,{baseQuery:r,tagTypes:n,reducerPath:i,serializeQueryArgs:v,keepUnusedDataFor:y,refetchOnMountOrArgChange:B,refetchOnFocus:k,refetchOnReconnect:M,invalidationBehavior:N,onSchemaFailure:Q,catchSchemaFailure:D,skipSchemaValidation:A},b){oo();const z=X=>X;Object.assign(t,{reducerPath:i,endpoints:{},internalActions:{onOnline:Ur,onOffline:Xa,onFocus:Wr,onFocusLost:Ya},util:{}});const L=Qo({serializeQueryArgs:v,reducerPath:i,createSelector:e}),{selectInvalidatedBy:Y,selectCachedArgsForQuery:G,buildQuerySelector:O,buildInfiniteQuerySelector:P,buildMutationSelector:C}=L;Te(t.util,{selectInvalidatedBy:Y,selectCachedArgsForQuery:G});const{queryThunk:F,infiniteQueryThunk:_,mutationThunk:p,patchQueryData:d,updateQueryData:a,upsertQueryData:u,prefetch:l,buildMatchThunkActions:s}=Wo({baseQuery:r,reducerPath:i,context:b,api:t,serializeQueryArgs:v,assertTagType:z,selectors:L,onSchemaFailure:Q,catchSchemaFailure:D,skipSchemaValidation:A}),{reducer:h,actions:R}=Uo({context:b,queryThunk:F,infiniteQueryThunk:_,mutationThunk:p,serializeQueryArgs:v,reducerPath:i,assertTagType:z,config:{refetchOnFocus:k,refetchOnReconnect:M,refetchOnMountOrArgChange:B,keepUnusedDataFor:y,reducerPath:i,invalidationBehavior:N}});Te(t.util,{patchQueryData:d,updateQueryData:a,upsertQueryData:u,prefetch:l,resetApiState:R.resetApiState,upsertQueryEntries:R.cacheEntriesUpserted}),Te(t.internalActions,R);const W=new WeakMap,o=X=>Yt(W,X,()=>({currentSubscriptions:new Map,currentPolls:new Map,runningQueries:new Map,runningMutations:new Map})),{buildInitiateQuery:w,buildInitiateInfiniteQuery:g,buildInitiateMutation:T,getRunningMutationThunk:U,getRunningMutationsThunk:ee,getRunningQueriesThunk:J,getRunningQueryThunk:ne}=Vo({queryThunk:F,mutationThunk:p,infiniteQueryThunk:_,api:t,serializeQueryArgs:v,context:b,getInternalState:o});Te(t.util,{getRunningMutationThunk:U,getRunningMutationsThunk:ee,getRunningQueryThunk:ne,getRunningQueriesThunk:J});const{middleware:ae,actions:ue}=as({reducerPath:i,context:b,queryThunk:F,mutationThunk:p,infiniteQueryThunk:_,api:t,assertTagType:z,selectors:L,getRunningQueryThunk:ne,getInternalState:o});return Te(t.util,ue),Te(t,{reducer:h,middleware:ae}),{name:jn,injectEndpoint(X,te){var $;const le=($=t.endpoints)[X]??($[X]={});Jt(te)&&Te(le,{name:X,select:O(X,te),initiate:w(X,te)},s(F,X)),Bo(te)&&Te(le,{name:X,select:C(),initiate:T(X)},s(p,X)),er(te)&&Te(le,{name:X,select:P(X,te),initiate:g(X,te)},s(F,X))}}}});function Et(e){return e.replace(e[0],e[0].toUpperCase())}var os="query",ss="mutation",ls="infinitequery";function us(e){return e.type===os}function cs(e){return e.type===ss}function ai(e){return e.type===ls}function et(e,...t){return Object.assign(e,...t)}var or=Symbol();function sr(e){const t=se.useRef(e),r=se.useMemo(()=>Ir(t.current,e),[e]);return se.useEffect(()=>{t.current!==r&&(t.current=r)},[r]),r}function Mt(e){const t=se.useRef(e);return se.useEffect(()=>{ht(t.current,e)||(t.current=e)},[e]),ht(t.current,e)?t.current:e}var fs=()=>typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",ds=fs(),ps=()=>typeof navigator<"u"&&navigator.product==="ReactNative",hs=ps(),vs=()=>ds||hs?se.useLayoutEffect:se.useEffect,gs=vs(),kn=e=>e.isUninitialized?{...e,isUninitialized:!1,isFetching:!0,isLoading:e.data===void 0,status:Qa.pending}:e;function lr(e,...t){const r={};return t.forEach(n=>{r[n]=e[n]}),r}var ur=["data","status","isLoading","isSuccess","isError","error"];function ms({api:e,moduleOptions:{batch:t,hooks:{useDispatch:r,useSelector:n,useStore:i},unstable__sideEffectsInRender:v,createSelector:y},serializeQueryArgs:B,context:k}){const M=v?F=>F():se.useEffect,N=F=>{var _,p;return(p=(_=F.current)==null?void 0:_.unsubscribe)==null?void 0:p.call(_)},Q=k.endpointDefinitions;return{buildQueryHooks:O,buildInfiniteQueryHooks:P,buildMutationHook:C,usePrefetch:b};function D(F,_,p){if(_!=null&&_.endpointName&&F.isUninitialized){const{endpointName:h}=_,R=Q[h];p!==ke&&B({queryArgs:_.originalArgs,endpointDefinition:R,endpointName:h})===B({queryArgs:p,endpointDefinition:R,endpointName:h})&&(_=void 0)}let d=F.isSuccess?F.data:_==null?void 0:_.data;d===void 0&&(d=F.data);const a=d!==void 0,u=F.isLoading,l=(!_||_.isLoading||_.isUninitialized)&&!a&&u,s=F.isSuccess||a&&(u&&!(_!=null&&_.isError)||F.isUninitialized);return{...F,data:d,currentData:F.data,isFetching:u,isLoading:l,isSuccess:s}}function A(F,_,p){if(_!=null&&_.endpointName&&F.isUninitialized){const{endpointName:h}=_,R=Q[h];p!==ke&&B({queryArgs:_.originalArgs,endpointDefinition:R,endpointName:h})===B({queryArgs:p,endpointDefinition:R,endpointName:h})&&(_=void 0)}let d=F.isSuccess?F.data:_==null?void 0:_.data;d===void 0&&(d=F.data);const a=d!==void 0,u=F.isLoading,l=(!_||_.isLoading||_.isUninitialized)&&!a&&u,s=F.isSuccess||u&&a;return{...F,data:d,currentData:F.data,isFetching:u,isLoading:l,isSuccess:s}}function b(F,_){const p=r(),d=Mt(_);return se.useCallback((a,u)=>p(e.util.prefetch(F,a,{...d,...u})),[F,p,d])}function z(F,_,{refetchOnReconnect:p,refetchOnFocus:d,refetchOnMountOrArgChange:a,skip:u=!1,pollingInterval:l=0,skipPollingIfUnfocused:s=!1,...h}={}){const{initiate:R}=e.endpoints[F],W=r(),o=se.useRef(void 0);if(!o.current){const X=W(e.internalActions.internal_getRTKQSubscriptions());o.current=X}const w=sr(u?ke:_),g=Mt({refetchOnReconnect:p,refetchOnFocus:d,pollingInterval:l,skipPollingIfUnfocused:s}),T=h.initialPageParam,U=Mt(T),ee=se.useRef(void 0);let{queryCacheKey:J,requestId:ne}=ee.current||{},ae=!1;J&&ne&&(ae=o.current.isRequestSubscribed(J,ne));const ue=!ae&&ee.current!==void 0;return M(()=>{ue&&(ee.current=void 0)},[ue]),M(()=>{var ie;const X=ee.current;if(w===ke){X==null||X.unsubscribe(),ee.current=void 0;return}const te=(ie=ee.current)==null?void 0:ie.subscriptionOptions;if(!X||X.arg!==w){X==null||X.unsubscribe();const le=W(R(w,{subscriptionOptions:g,forceRefetch:a,...ai(Q[F])?{initialPageParam:U}:{}}));ee.current=le}else g!==te&&X.updateSubscriptionOptions(g)},[W,R,a,w,g,ue,U,F]),[ee,W,R,g]}function L(F,_){return(d,{skip:a=!1,selectFromResult:u}={})=>{const{select:l}=e.endpoints[F],s=sr(a?ke:d),h=se.useRef(void 0),R=se.useMemo(()=>y([l(s),(T,U)=>U,T=>s],_,{memoizeOptions:{resultEqualityCheck:ht}}),[l,s]),W=se.useMemo(()=>u?y([R],u,{devModeChecks:{identityFunctionCheck:"never"}}):R,[R,u]),o=n(T=>W(T,h.current),ht),w=i(),g=R(w.getState(),h.current);return gs(()=>{h.current=g},[g]),o}}function Y(F){se.useEffect(()=>()=>{N(F),F.current=void 0},[F])}function G(F){if(!F.current)throw new Error(Ga(38));return F.current.refetch()}function O(F){const _=(a,u={})=>{const[l]=z(F,a,u);return Y(l),se.useMemo(()=>({refetch:()=>G(l)}),[l])},p=({refetchOnReconnect:a,refetchOnFocus:u,pollingInterval:l=0,skipPollingIfUnfocused:s=!1}={})=>{const{initiate:h}=e.endpoints[F],R=r(),[W,o]=se.useState(or),w=se.useRef(void 0),g=Mt({refetchOnReconnect:a,refetchOnFocus:u,pollingInterval:l,skipPollingIfUnfocused:s});M(()=>{var ne,ae;const J=(ne=w.current)==null?void 0:ne.subscriptionOptions;g!==J&&((ae=w.current)==null||ae.updateSubscriptionOptions(g))},[g]);const T=se.useRef(g);M(()=>{T.current=g},[g]);const U=se.useCallback(function(J,ne=!1){let ae;return t(()=>{N(w),w.current=ae=R(h(J,{subscriptionOptions:T.current,forceRefetch:!ne})),o(J)}),ae},[R,h]),ee=se.useCallback(()=>{var J,ne;(J=w.current)!=null&&J.queryCacheKey&&R(e.internalActions.removeQueryResult({queryCacheKey:(ne=w.current)==null?void 0:ne.queryCacheKey}))},[R]);return se.useEffect(()=>()=>{N(w)},[]),se.useEffect(()=>{W!==or&&!w.current&&U(W,!0)},[W,U]),se.useMemo(()=>[U,W,{reset:ee}],[U,W,ee])},d=L(F,D);return{useQueryState:d,useQuerySubscription:_,useLazyQuerySubscription:p,useLazyQuery(a){const[u,l,{reset:s}]=p(a),h=d(l,{...a,skip:l===or}),R=se.useMemo(()=>({lastArg:l}),[l]);return se.useMemo(()=>[u,{...h,reset:s},R],[u,h,s,R])},useQuery(a,u){const l=_(a,u),s=d(a,{selectFromResult:a===ke||u!=null&&u.skip?void 0:kn,...u}),h=lr(s,...ur);return se.useDebugValue(h),se.useMemo(()=>({...s,...l}),[s,l])}}}function P(F){const _=(d,a={})=>{const[u,l,s,h]=z(F,d,a),R=se.useRef(h);M(()=>{R.current=h},[h]);const W=se.useCallback(function(g,T){let U;return t(()=>{N(u),u.current=U=l(s(g,{subscriptionOptions:R.current,direction:T}))}),U},[u,l,s]);Y(u);const o=sr(a.skip?ke:d),w=se.useCallback(()=>G(u),[u]);return se.useMemo(()=>({trigger:W,refetch:w,fetchNextPage:()=>W(o,"forward"),fetchPreviousPage:()=>W(o,"backward")}),[w,W,o])},p=L(F,A);return{useInfiniteQueryState:p,useInfiniteQuerySubscription:_,useInfiniteQuery(d,a){const{refetch:u,fetchNextPage:l,fetchPreviousPage:s}=_(d,a),h=p(d,{selectFromResult:d===ke||a!=null&&a.skip?void 0:kn,...a}),R=lr(h,...ur,"hasNextPage","hasPreviousPage");return se.useDebugValue(R),se.useMemo(()=>({...h,fetchNextPage:l,fetchPreviousPage:s,refetch:u}),[h,l,s,u])}}}function C(F){return({selectFromResult:_,fixedCacheKey:p}={})=>{const{select:d,initiate:a}=e.endpoints[F],u=r(),[l,s]=se.useState();se.useEffect(()=>()=>{l!=null&&l.arg.fixedCacheKey||l==null||l.reset()},[l]);const h=se.useCallback(function(J){const ne=u(a(J,{fixedCacheKey:p}));return s(ne),ne},[u,a,p]),{requestId:R}=l||{},W=se.useMemo(()=>d({fixedCacheKey:p,requestId:l==null?void 0:l.requestId}),[p,l,d]),o=se.useMemo(()=>_?y([W],_):W,[_,W]),w=n(o,ht),g=p==null?l==null?void 0:l.arg.originalArgs:void 0,T=se.useCallback(()=>{t(()=>{l&&s(void 0),p&&u(e.internalActions.removeMutationResult({requestId:R,fixedCacheKey:p}))})},[u,p,l,R]),U=lr(w,...ur,"endpointName");se.useDebugValue(U);const ee=se.useMemo(()=>({...w,originalArgs:g,reset:T}),[w,g,T]);return se.useMemo(()=>[h,ee],[h,ee])}}}var ys=Symbol(),bs=({batch:e=fo,hooks:t={useDispatch:po,useSelector:ho,useStore:vo},createSelector:r=Na,unstable__sideEffectsInRender:n=!1,...i}={})=>({name:ys,init(v,{serializeQueryArgs:y},B){const k=v,{buildQueryHooks:M,buildInfiniteQueryHooks:N,buildMutationHook:Q,usePrefetch:D}=ms({api:v,moduleOptions:{batch:e,hooks:t,unstable__sideEffectsInRender:n,createSelector:r},serializeQueryArgs:y,context:B});return et(k,{usePrefetch:D}),et(B,{batch:e}),{injectEndpoint(A,b){if(us(b)){const{useQuery:z,useLazyQuery:L,useLazyQuerySubscription:Y,useQueryState:G,useQuerySubscription:O}=M(A);et(k.endpoints[A],{useQuery:z,useLazyQuery:L,useLazyQuerySubscription:Y,useQueryState:G,useQuerySubscription:O}),v[`use${Et(A)}Query`]=z,v[`useLazy${Et(A)}Query`]=L}if(cs(b)){const z=Q(A);et(k.endpoints[A],{useMutation:z}),v[`use${Et(A)}Mutation`]=z}else if(ai(b)){const{useInfiniteQuery:z,useInfiniteQuerySubscription:L,useInfiniteQueryState:Y}=N(A);et(k.endpoints[A],{useInfiniteQuery:z,useInfiniteQuerySubscription:L,useInfiniteQueryState:Y}),v[`use${Et(A)}InfiniteQuery`]=z}}}}}),xs=Ho(is(),bs()),Cs={BASE_URL:"/React-WiseScheduling_TimeLine_Library/",MODE:"github-pages",DEV:!1,PROD:!0,SSR:!1};const Ps=Cs.VITE_API_BASE_URL||"/api",cr=xs({reducerPath:"wiseSchedulingApi",baseQuery:zo({baseUrl:Ps}),tagTypes:["MachineStatus","Option","schedule"],endpoints:()=>({})}),ye={background:{primary:"#010D15",secondary:"#000000",surface:"#FFFFFF",surfaceAlt:"#EFEFEF"},accent:{primary:"#1593EB",primaryHover:"#0d7acc",primaryLight:"#6fb9f0"},border:{primary:"#1593EB",light:"#E0EBF0",medium:"#EFEFEF",dark:"#010D15"},text:{primary:"#000000",secondary:"#010D15",tertiary:"#6a6a6a",inverse:"#FFFFFF",inverseSecondary:"#E0EBF0",accent:"#1593EB"},functional:{success:"#4caf50",warning:"#ff9800",error:"#f44336",info:"#1593EB"}},$e={xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px",xxl:"48px",xxxl:"64px",section:"48px",component:"24px",element:"16px",inline:"8px"};de.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;de.h1`
  color: #333;
  margin-bottom: 1.5rem;
`;de.h2`
  color: #444;
  margin-bottom: 1rem;
`;de.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #333;
`;de.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;de.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;de.button`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #61dafb;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #21a6c9;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;de.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #61dafb;
    box-shadow: 0 0 0 2px rgba(97, 218, 251, 0.2);
  }
`;de.div`
  display: flex;
  gap: ${e=>e.gap||"1rem"};
  flex-direction: ${e=>e.direction||"row"};
  justify-content: ${e=>e.justify||"flex-start"};
  align-items: ${e=>e.align||"stretch"};
  flex-wrap: ${e=>e.wrap||"nowrap"};

  @media (max-width: 768px) {
    flex-direction: ${e=>e.mobileDirection||e.direction||"column"};
  }
`;const Oe={mobile:"576px",tablet:"768px",desktop:"992px",largeDesktop:"1200px"};//! =============== 1. Styled Components ===============
const Ss=de.label`
  /* Layout & Positioning */
  display: inline-block;

  /* Box Model */
  font-size: ${e=>e.size||"1rem"};

  /* Visual Styles */
  color: ${e=>e.color||"white"};

  /* Other */
  cursor: pointer;

  /* Hidden checkbox for state management */
  input {
    display: none;
  }

  /* SVG container with rotation animation */
  svg {
    height: 3em;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* SVG line styles */
  .line {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition:
      stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  /* Checked state animations */
  input:checked + svg {
    transform: rotate(-45deg);
  }

  input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
`;//! =============== 1. Types & Interfaces ===============
//! =============== 2. Main Component ===============
function ii({size:e,color:t,className:r,checked:n,onChange:i}){return c.jsxs(Ss,{size:e,color:t,className:r,"data-testid":"hamburger-menu",children:[c.jsx("input",{type:"checkbox",checked:n,onChange:i,"aria-label":"Toggle menu"}),c.jsxs("svg",{viewBox:"0 0 32 32",children:[c.jsx("path",{className:"line line-top-bottom",d:"M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"}),c.jsx("path",{className:"line",d:"M7 16 27 16"})]})]})}ii.propTypes={size:Ze.string,color:Ze.string,className:Ze.string,checked:Ze.bool,onChange:Ze.func};//! =============== 1. Setup & Constants ===============
const _s=50,ws=300;//! =============== 2. Types & Interfaces ===============
//! =============== 3. Core Functionality ===============
function As(e,t){const[r,n]=se.useState({top:0,left:0,width:0,height:0}),[i,v]=se.useState(!1),y=se.useCallback(()=>{if(!e.current)return;const B=e.current.querySelector(".active");if(!B){n({top:0,left:0,width:0,height:0});return}const k=B.parentElement,M=k.getBoundingClientRect();n({top:k.offsetTop,left:k.offsetLeft,width:M.width,height:M.height})},[e]);return se.useEffect(()=>{y(),i||setTimeout(()=>v(!0),_s)},[t,y,i]),se.useEffect(()=>(window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)),[y]),{selectorStyle:r,isInitialized:i,updateSelector:y}}//! =============== 4. Utility Functions ===============
const Ls=e=>new Promise(t=>{setTimeout(()=>{e(),t()},ws)});//! =============== 1. Types & Interfaces ===============
//! =============== 2. Constants & Configuration ===============
const Hr=ye.background.primary,On=[{to:"/",label:"首頁",src:"/Icon/hammer.png"},{to:"/timeline",label:"時間軸",src:"/Icon/bow-and-arrow.png"},{to:"/about",label:"關於",src:"/Icon/laser-sword.png"},{to:"/contact",label:"聯絡",src:"/Icon/aircraft.png"}];//! =============== 3. Styled Components ===============
const js=de.nav`
  /* Layout & Positioning */
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  /* Box Model */
  padding: 0;

  /* Visual Styles */
  background: ${Hr};
  border-bottom: 1px solid ${ye.accent.primary}80;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  /* Desktop Layout */
  @media (min-width: ${Oe.desktop}) {
    justify-content: space-between;
  }
`,ks=de.div`
  /* Layout & Positioning */
  display: inline-flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  /* Box Model */
  padding: ${$e.xs} ${$e.sm};
  gap: 4px;

  /* Visual Styles */
  font-size: 1.3rem;
  letter-spacing: 0.02em;

  /* Effects */
  transition: all 0.3s ease;

  /* Other */
  cursor: pointer;
  user-select: none;

  &:hover {
    transform: translateX(-50%) scale(1.05);
  }

  /* Desktop Layout */
  @media (min-width: ${Oe.desktop}) {
    position: static;
    transform: none;

    &:hover {
      transform: scale(1.05);
    }
  }

  .text {
    color: ${ye.text.inverse};
    font-family: 'EDIX', 'Georgia', 'Palatino Linotype', 'Book Antiqua',
      'Times New Roman', serif;
    font-weight: 700;
    font-style: italic;
    letter-spacing: 0.05em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5),
      0 0 1px rgba(255, 255, 255, 0.3);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .mobile-only {
    display: inline;
  }

  .desktop-only {
    display: none;
  }

  .bracket {
    color: ${ye.accent.primary};
    font-family: 'Arial Black', 'Arial', sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    text-shadow: 0 0 12px ${ye.accent.primary}ff,
      0 0 20px ${ye.accent.primary}99, 2px 2px 6px rgba(0, 0, 0, 0.7);
    transform: scale(1.1);
    display: inline-block;
  }

  /* Tablet & Desktop */
  @media (min-width: ${Oe.tablet}) {
    gap: 6px;
    font-size: 1.6rem;

    .mobile-only {
      display: none;
    }

    .desktop-only {
      display: inline;
    }

    .bracket {
      font-size: 1.8rem;
    }
  }
`,Os=de.div`
  /* Layout & Positioning (Mobile First) */
  display: none;
  position: relative;
  overflow: visible;

  /* Desktop Layout - 只在桌面版顯示 */
  @media (min-width: ${Oe.desktop}) {
    display: block;
  }
`,Es=de.ul`
  /* Layout & Positioning (Mobile First) */
  display: flex;
  flex-direction: column;
  position: relative;

  /* Box Model */
  padding: 0;
  margin: 0;

  /* Visual Styles */
  list-style: none;

  /* Desktop Layout */
  @media (min-width: ${Oe.desktop}) {
    flex-direction: row;
  }
`,Ms=de.li`
  /* Layout & Positioning (Mobile First) */
  position: relative;
  float: none;

  /* Visual Styles */
  list-style-type: none;

  /* Other */
  z-index: 2;

  /* Desktop Layout */
  @media (min-width: ${Oe.desktop}) {
    float: left;
  }
`,Rs=de(eo)`
  /* Layout & Positioning (Mobile First) */
  display: flex;
  align-items: center;
  position: relative;

  /* Box Model */
  padding: 12px 30px;
  gap: 10px;

  /* Visual Styles */
  color: ${ye.text.inverseSecondary};
  font-size: 15px;
  text-decoration: none;
  background-color: transparent;

  /* Effects */
  transition: all 0.3s ease;

  img {
    display: block;
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  &:hover {
    color: ${ye.text.inverse};
  }

  &.active {
    color: ${ye.background.primary};
  }

  /* Desktop Layout */
  @media (min-width: ${Oe.desktop}) {
    padding: 20px 20px;
  }
`,Fs=de.div`
  /* Layout & Positioning (Mobile First) */
  display: ${e=>e.$width===0?"none":"inline-block"};
  position: absolute;
  top: ${e=>e.$top}px;
  bottom: auto;
  left: ${e=>e.$left}px;

  /* Box Model */
  width: ${e=>e.$width}px;
  height: ${e=>e.$height}px;
  margin-top: 0;
  margin-left: 10px;

  /* Visual Styles */
  background: ${ye.background.surface};
  border-radius: 0;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  box-shadow: 0 -2px 10px ${ye.accent.primary}40;

  /* Effects */
  transform: none;
  transition: ${e=>e.$isInitialized?"all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)":"none"};

  /* Other */
  z-index: 1;

  /* Desktop Layout */
  @media (min-width: ${Oe.desktop}) {
    bottom: 0;
    top: auto;
    margin-left: 0;
    border-radius: 0;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    transform: translateY(${e=>-e.$top}px);
  }
`,Ts=de.div`
  /* Layout & Positioning (Mobile First) */
  position: absolute;
  top: -25px;
  left: auto;
  right: 10px;

  /* Box Model */
  width: 25px;
  height: 25px;

  /* Visual Styles */
  background: ${ye.background.surface};

  &:before {
    content: '';
    position: absolute;
    top: -25px;
    left: -25px;
    width: 50px;
    height: 50px;
    background: ${Hr};
    border-radius: 50%;
  }

  /* Desktop Layout */
  @media (min-width: ${Oe.desktop}) {
    top: auto;
    bottom: 0;
    left: -25px;
    right: auto;

    &:before {
      top: auto;
      bottom: 0;
    }
  }
`,$s=de.div`
  /* Layout & Positioning (Mobile First) */
  position: absolute;
  bottom: -25px;
  right: 10px;

  /* Box Model */
  width: 25px;
  height: 25px;

  /* Visual Styles */
  background: ${ye.background.surface};

  &:before {
    content: '';
    position: absolute;
    bottom: -25px;
    left: -25px;
    width: 50px;
    height: 50px;
    background: ${Hr};
    border-radius: 50%;
  }

  /* Desktop Layout */
  @media (min-width: ${Oe.desktop}) {
    bottom: 0;
    right: -25px;

    &:before {
      bottom: 0;
      left: auto;
      right: -25px;
    }
  }
`,Ds=de.button`
  /* Layout & Positioning (Mobile First) */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Box Model */
  padding: ${$e.xs} ${$e.sm};
  margin-left: ${$e.xs};

  /* Visual Styles */
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;

  /* Other */
  cursor: pointer;

  /* Desktop Layout - 隱藏漢堡選單 */
  @media (min-width: ${Oe.desktop}) {
    display: none;
  }
`;//! =============== 4. Main Component ===============
function zs(){const e=Ct(),t=$a(),r=se.useRef(null),[n,i]=se.useState(!1),{selectorStyle:v,isInitialized:y,updateSelector:B}=As(r,e.pathname),k=se.useCallback(()=>{i(N=>!N),Ls(B)},[B]),M=se.useCallback(()=>{t("/")},[t]);return c.jsxs(c.Fragment,{children:[c.jsxs(js,{children:[c.jsx(Ds,{children:c.jsx(ii,{size:"1.5rem",color:ye.text.inverse,checked:n,onChange:k})}),c.jsxs(ks,{onClick:M,children:[c.jsx("span",{className:"text mobile-only",children:"H"}),c.jsx("span",{className:"text desktop-only",children:"Harry's"}),c.jsx("span",{className:"bracket",children:"</>"}),c.jsx("span",{className:"text desktop-only",children:"Corner"}),c.jsx("span",{className:"text mobile-only",children:"C"})]}),c.jsx(Os,{children:c.jsxs(Es,{ref:r,children:[c.jsxs(Fs,{$top:v.top,$left:v.left,$width:v.width,$height:v.height,$isInitialized:y,children:[c.jsx(Ts,{}),c.jsx($s,{})]}),On.map(N=>c.jsx(Ms,{children:c.jsxs(Rs,{to:N.to,children:[c.jsx("img",{src:N.src,alt:N.label}),N.label]})},N.to))]})})]}),c.jsxs(Ui,{anchor:"right",open:n,onClose:k,sx:{display:{xs:"block",lg:"none"},"& .MuiDrawer-paper":{width:280,backgroundColor:ye.background.primary,color:ye.text.inverse,borderLeft:`2px solid ${ye.accent.primary}`},"& .MuiBackdrop-root":{backgroundColor:"rgba(0, 0, 0, 0.7)"}},children:[c.jsxs(ln,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:$e.md,borderBottom:`1px solid ${ye.border.light}`},children:[c.jsxs(ln,{sx:{display:"inline-flex",alignItems:"center",gap:"6px",fontSize:"1.3rem",letterSpacing:"0.02em","& .text":{color:ye.text.inverse,fontFamily:'"EDIX", "Georgia", serif',fontWeight:700,fontStyle:"italic",letterSpacing:"0.05em"},"& .bracket":{color:ye.accent.primary,fontFamily:'"Arial Black", "Arial", sans-serif',fontWeight:900,fontSize:"1.5rem",textShadow:`0 0 12px ${ye.accent.primary}ff`}},children:[c.jsx("span",{className:"text",children:"H"}),c.jsx("span",{className:"bracket",children:"</>"})]}),c.jsx(Qi,{onClick:k,sx:{color:ye.text.inverse},children:c.jsx(Hi,{})})]}),c.jsx(Yi,{sx:{padding:$e.sm},children:On.map(N=>c.jsxs(Xi,{onClick:()=>{t(N.to)},sx:{borderRadius:"8px",marginBottom:$e.xs,padding:$e.sm,"&:hover":{backgroundColor:ye.accent.primary+"20"},"&.Mui-selected":{backgroundColor:ye.background.surface,color:ye.background.primary,"&:hover":{backgroundColor:ye.background.surface}}},selected:e.pathname===N.to,children:[c.jsx(Zi,{sx:{minWidth:40},children:c.jsx("img",{src:N.src,alt:N.label,style:{width:24,height:24}})}),c.jsx(Ki,{primary:N.label,primaryTypographyProps:{fontSize:"15px",fontWeight:500}})]},N.to))})]})]})}const Gs=se.memo(zs),Ns=de.div`
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  text-align: center;
  background-color: ${e=>e.theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: ${e=>e.theme.shadows.md};
`,Bs=de.h2`
  color: ${e=>e.theme.colors.error};
  margin-bottom: 1rem;
`,qs=de.p`
  margin-bottom: 1.5rem;
`,Is=de.button`
  padding: 0.5rem 1.5rem;
  background-color: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  margin-right: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${e=>e.theme.colors.primaryDark};
  }
`,Vs=de(Da)`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: ${e=>e.theme.colors.secondary};
  color: white;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background-color: #2a6265;
    text-decoration: none;
  }
`;class oi extends Qt.Component{constructor(r){super(r);ar(this,"handleRetry",()=>{this.setState({hasError:!1,error:null})});this.state={hasError:!1,error:null}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,n){console.error("組件錯誤:",r),console.error("錯誤資訊:",n)}render(){var r;return this.state.hasError?c.jsxs(Ns,{children:[c.jsx(Bs,{children:"組件發生錯誤"}),c.jsx(qs,{children:((r=this.state.error)==null?void 0:r.message)||"頁面載入時發生了問題。"}),c.jsxs("div",{children:[c.jsx(Is,{onClick:this.handleRetry,children:"重新嘗試"}),c.jsx(Vs,{to:"/",children:"返回首頁"})]})]}):this.props.children}}const En=[{id:1,setup:"瞎子最喜歡遇到什麼人？",punchline:"流氓，因為他們喜歡說「給他們一點顏色瞧瞧」",type:"joke"},{id:2,setup:"如何把飲料變大？",punchline:"唸大悲咒",type:"joke"},{id:3,setup:"有一天Y跟X走在路上，突然看到U哭得很傷心，Y就走過去問U說：",punchline:"uniqlo",type:"joke"},{id:4,setup:"泰國神明的坐騎是什麼？",punchline:"傑克，因為太（泰）神奇了傑克",type:"joke"},{id:5,setup:"青春痘長在那裡最不用擔心？",punchline:"別人的臉上",type:"joke"},{id:6,setup:"警察對出車禍的機車騎士說：「請問你叫什麼名字，我通知你家裡的人。」",punchline:"騎士忍著痛說：「不用了……我的家人……知道我的名字。」警察：「…………」",type:"joke"},{id:7,setup:"什麼水果最膽小？",punchline:"木瓜，因為怕怕呀(papaya)～",type:"joke"},{id:8,setup:"佛陀開的店是什麼？",punchline:"photoshop",type:"joke"},{id:9,setup:"披薩為什麼是最誠實的食物？",punchline:"因為他只有四片、六片、八片，沒有七片（欺騙）喔！",type:"joke"},{id:10,setup:"牛牽到北京會變成什麼品牌？",punchline:"New Balance，牛被冷死",type:"joke"},{id:11,setup:"氧氣和二氧化碳誰比較美？",punchline:"氧氣，因為氧氣會助燃，助燃（自然）就是美",type:"joke"},{id:12,setup:"有五隻魚，突然有五隻飛鏢射過去，請問有幾隻魚沒事？",punchline:"三隻。因為三隻魚閃鏢（三隻雨傘標）",type:"joke"},{id:13,setup:"肚子餓打什麼針？",punchline:"田馥甄（填腹針）",type:"joke"},{id:14,setup:"李白怎麼死的？",punchline:"失血（詩寫）過多",type:"joke"},{id:15,setup:"武士怎麼死的？",punchline:"餓死，因為5*4=20",type:"joke"},{id:16,setup:"卓別林死後會變成什麼？",punchline:"草莓，因為死卓別林(strawberry)",type:"joke"},{id:17,setup:"什麼昆蟲最有遠見？",punchline:"螞蟻，因為他們總為蟻后（以後）著想。",type:"joke"},{id:18,setup:"為什麼饒舌歌手都買不到葡萄？",punchline:"因為他們都跟老闆說，我要一串葡萄yo～我要一串葡萄yo～",type:"joke"},{id:19,setup:"地瓜是哪國人？",punchline:"韓國人，因為他是韓籍（台語）",type:"joke"},{id:20,setup:"什麼動物最容易醉？",punchline:"猴子，因為茫起（monkey）",type:"joke"},{id:21,setup:"周武王被砍掉舌頭後會變什麼？",punchline:"羅志祥（亞洲舞王／啞周武王）",type:"joke"},{id:22,setup:"為什麼科學園區裡面常常跌倒？",punchline:"因為那裡很多半導體",type:"joke"},{id:23,setup:"為什麼螃蟹明明沒有感冒卻一直咳嗽？",punchline:"因為牠是甲殼(假咳)類動物",type:"joke"},{id:24,setup:"有次去聽演唱會，原唱一直唱錯，我就糾正原唱，然後鄭元暢（正原唱）就來了。",punchline:"鄭元暢就來了",type:"joke"},{id:25,setup:"十二生肖哪隻動物不會感冒？",punchline:"雞，因為雞掃化痰",type:"joke"},{id:26,setup:"為什麼馬克杯跟玻璃杯打招呼，玻璃杯不理他？",punchline:"因為玻璃杯沒耳朵",type:"joke"},{id:27,setup:"大便跟小便兩個是好朋友，有天大便死了，小便就很難過的說",punchline:"我想大便～",type:"joke"},{id:28,setup:"有一天小明說：「老師，小安他人身攻擊我」",punchline:"老師：「那你可以用當歸反擊啊！」",type:"joke"}],Ws=async()=>{const e=Math.floor(Math.random()*En.length);return Promise.resolve(En[e])},Mn="0.3s",Us="300px";//! =============== 樣式組件 ===============
const Qs=de.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: ${Us};
  background-color: ${e=>e.theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: ${e=>e.theme.shadows.lg};
  padding: 1rem;
  z-index: 1000;
  transition: transform ${Mn} ease,
    opacity ${Mn} ease;
  transform: ${e=>e.$isVisible?"translateY(0)":"translateY(120%)"};
  opacity: ${e=>e.$isVisible?1:0};
  max-height: 80vh;
  overflow-y: auto;
`,Hs=de.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: ${e=>e.theme.colors.text};
  }
`,Ys=de.button`
  background: none;
  border: none;
  color: ${e=>e.theme.colors.lightText};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${e=>e.theme.colors.text};
  }
`,Xs=de.div`
  padding: 0.5rem 0;
`,Zs=de.p`
  margin-bottom: 0.5rem;
  font-weight: 500;
`,Ks=de.p`
  color: ${e=>e.theme.colors.secondary};
  font-weight: bold;
  margin-top: 0.5rem;
`,Js=de.button`
  background-color: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;
  margin-top: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${e=>e.theme.colors.primaryDark};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`,el=de.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  box-shadow: ${e=>e.theme.shadows.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${e=>e.theme.colors.primaryDark};
  }
`,tl=de.p`
  color: ${e=>e.theme.colors.error};
  margin: 0;
  text-align: center;
`,rl=de.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  .dot {
    background-color: ${e=>e.theme.colors.primary};
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin: 0 3px;
    animation: bounce 1.5s infinite ease-in-out;
  }

  .dot:nth-child(1) {
    animation-delay: 0s;
  }
  .dot:nth-child(2) {
    animation-delay: 0.3s;
  }
  .dot:nth-child(3) {
    animation-delay: 0.6s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;//! =============== 圖標組件 ===============
const nl=()=>c.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"24",height:"24",children:c.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}),al=()=>c.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"24",height:"24",children:c.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})});//! =============== 子組件 ===============
const si=se.memo(()=>c.jsxs(rl,{children:[c.jsx("div",{className:"dot"}),c.jsx("div",{className:"dot"}),c.jsx("div",{className:"dot"})]}));si.displayName="Loader";const li=se.memo(({joke:e})=>c.jsxs(c.Fragment,{children:[c.jsx(Zs,{children:e.setup}),c.jsx(Ks,{children:e.punchline})]}));li.displayName="JokeDisplay";const il=()=>{const[e,t]=se.useState(!1),{data:r,isLoading:n,isError:i,refetch:v,isFetching:y}=go({queryKey:["randomJoke"],queryFn:Ws,enabled:e,refetchOnWindowFocus:!1,retry:1,staleTime:1e3*60*5,onError:Q=>{console.error("獲取笑話時出錯:",Q)}}),B=()=>t(!e),k=()=>v(),M=n||y,N=se.useMemo(()=>M?"載入中...":"換個笑話",[M]);return c.jsxs(c.Fragment,{children:[c.jsx(el,{onClick:B,title:"笑話小工具","aria-label":e?"關閉笑話小工具":"開啟笑話小工具",children:e?c.jsx(nl,{}):c.jsx(al,{})}),c.jsxs(Qs,{$isVisible:e,children:[c.jsxs(Hs,{children:[c.jsx("h3",{children:"每日笑話"}),c.jsx(Ys,{onClick:B,"aria-label":"關閉",children:"×"})]}),c.jsx(Xs,{children:M?c.jsx(si,{}):i?c.jsx(tl,{children:"無法載入笑話，請稍後再試"}):r?c.jsx(li,{joke:r}):c.jsx("p",{children:"點擊下方按鈕獲取笑話"})}),c.jsx(Js,{onClick:k,disabled:M,children:N})]})]})};//! =============== 1. Keyframe Animations ===============
const ui=we`
  0%, 10%, 20%, 26%, 28%, 90%, 100% {
    height: 8.25vmax;
    bottom: 0;
    transform-origin: bottom right;
    transform: rotateZ(0);
  }
  5%, 15%, 22%, 24%, 30% {
    height: 8.1vmax;
  }
  32%, 50% {
    height: 8.25vmax;
  }
  55%, 60% {
    bottom: 0.75vmax;
    transform-origin: bottom right;
    transform: rotateZ(0);
  }
  70%, 80% {
    bottom: 0.75vmax;
    transform-origin: bottom right;
    transform: rotateZ(10deg);
  }
`,ol=we`
  0%, 10%, 20%, 26%, 28%, 32%, 100% {
    height: 7.2vmax;
  }
  5%, 15%, 22%, 24%, 30% {
    height: 7.05vmax;
  }
`,sl=we`
  0%, 10%, 20%, 26%, 28%, 82%, 100% {
    transform: rotateZ(-50deg);
  }
  5%, 15%, 22%, 24% {
    transform: rotateZ(-48deg);
  }
  30%, 31% {
    transform: rotateZ(-30deg);
  }
  32%, 80% {
    transform: rotateZ(-60deg);
  }
`,ll=we`
  0%, 10%, 20%, 26%, 28% {
    transform: rotateZ(20deg);
  }
  5%, 15%, 22%, 24% {
    transform: rotateZ(18deg);
  }
  30%, 31% {
    transform: rotateZ(10deg);
  }
  32% {
    transform: rotateZ(25deg);
  }
`,ul=we`
  0%, 10%, 20%, 26%, 28%, 82%, 100% {
    height: 3.75vmax;
  }
  5%, 15%, 22%, 24% {
    height: 3.45vmax;
  }
`,cl=we`
  0%, 10%, 20%, 26%, 28%, 98%, 100% {
    width: 1.875vmax;
  }
  5%, 15%, 22%, 24% {
    width: 1.8vmax;
  }
  34%, 98% {
    width: 1.275vmax;
  }
`,fl=we`
  0%, 10%, 20%, 26%, 28%, 30%, 84%, 100% {
    width: 99%;
  }
  5%, 15%, 22%, 24% {
    width: 101%;
  }
  34%, 81% {
    width: 96%;
  }
`,dl=we`
  0%, 30% {
    width: 0.675vmax;
    height: 0.3vmax;
  }
  32%, 59%, 90%, 100% {
    width: 0.525vmax;
    height: 0.525vmax;
    transform: translateY(0);
  }
  60%, 75% {
    transform: translateY(-0.3vmax);
  }
  80%, 85% {
    transform: translateY(0.15vmax);
  }
`;//! =============== 2. Styled Components ===============
const pl=de.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  padding: 0;
  margin: 0;
`,hl=de.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  isolation: isolate;
`,vl=de.div`
  position: relative;
  width: 22.5vmax;
  height: 8.25vmax;

  &::before {
    content: '';
    position: absolute;
    bottom: -0.75vmax;
    right: -0.15vmax;
    width: 100%;
    height: 1.5vmax;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    z-index: -1000;
    animation: ${fl} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01)
      infinite;
  }
`,gl=de.div`
  position: absolute;
  bottom: 0;
  left: 7.5vmax;
  width: 12vmax;
  height: 3vmax;
`,Yr=de.div`
  position: absolute;
  bottom: 0;
  width: 2vmax;
  height: 2.125vmax;
`,Xr=de.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1.95vmax;
  height: 1.875vmax;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 3.75vmax;
    height: 3.75vmax;
    border-radius: 50%;
  }
`,Zr=de.div`
  position: absolute;
  bottom: 0;
  left: 0.75vmax;
  height: 4.5vmax;
  width: 2.625vmax;
  border-top-left-radius: 1.425vmax;
  border-top-right-radius: 1.425vmax;
  transform-origin: bottom right;
  transform: rotateZ(90deg) translateX(-0.1vmax) translateY(1.5vmax);
  z-index: -1;
`,ml=de(Yr)`
  left: -3vmax;
  z-index: -10;
`,yl=de(Xr)`
  &::before {
    background-color: ${({theme:e})=>e.colors.borderTokens.light};
  }
`,bl=de(Zr)`
  background-image: linear-gradient(
    80deg,
    transparent 20%,
    ${({theme:e})=>{var t;return((t=e.colors.accent)==null?void 0:t.primaryHover)||"#0d7acc"}} 20%
  );
`,xl=de(Yr)`
  z-index: 10;
  left: 0;
`,Cl=de(Xr)`
  &::before {
    background-color: ${({theme:e})=>e.colors.backgroundTokens.surfaceAlt};
  }
`,Pl=de(Zr)`
  background-image: linear-gradient(
    70deg,
    transparent 20%,
    ${({theme:e})=>{var t;return((t=e.colors.accent)==null?void 0:t.primary)||"#1593EB"}} 20%
  );
`,Sl=de(Yr)`
  right: 0;
`,_l=de(Xr)`
  &::before {
    background-color: ${({theme:e})=>e.colors.backgroundTokens.surfaceAlt};
  }
`,wl=de(Zr)`
  background-image: linear-gradient(
    70deg,
    transparent 20%,
    ${({theme:e})=>{var t;return((t=e.colors.accent)==null?void 0:t.primary)||"#1593EB"}} 20%
  );
`,Al=de.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 0.3vmax;
  left: 4.75vmax;
  width: 17.75vmax;
  height: 5.5vmax;
  border-top-left-radius: 2.5vmax;
  border-top-right-radius: 5vmax;
  border-bottom-right-radius: 1.5vmax;
  border-bottom-left-radius: 5vmax;
  background-color: ${({theme:e})=>{var t;return((t=e.colors.accent)==null?void 0:t.primary)||"#1593EB"}};
  z-index: -2;
  animation: ${ol} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
`,Ll=de.div`
  position: absolute;
  right: -3vmax;
  bottom: 0.5vmax;
  height: 1.2vmax;
  width: 4vmax;
  background-color: ${({theme:e})=>{var t;return((t=e.colors.accent)==null?void 0:t.primaryHover)||"#0d7acc"}};
  border-radius: 1.2vmax;
`,jl=de.div`
  position: absolute;
  left: 1.5vmax;
  bottom: 0.5vmax;
  width: 8.75vmax;
  height: 8.25vmax;
  border-top-left-radius: 4.05vmax;
  border-top-right-radius: 4.05vmax;
  border-bottom-right-radius: 3.3vmax;
  border-bottom-left-radius: 3.3vmax;
  background-color: ${({theme:e})=>{var t;return((t=e.colors.accent)==null?void 0:t.primaryLight)||"#6fb9f0"}};
  animation: ${ui} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
`,kl=de.div`
  position: absolute;
  left: 1.5vmax;
  bottom: 0;
  width: 9.75vmax;
  height: 8.25vmax;
  animation: ${ui} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
  z-index: -1;
`,Ol=de.div`
  position: absolute;
  left: -1.5vmax;
  bottom: 0;
  width: 7.5vmax;
  height: 3.75vmax;
  border-top-right-radius: 3vmax;
  border-bottom-right-radius: 3vmax;
  border-bottom-left-radius: 4.5vmax;
  background-color: ${({theme:e})=>e.colors.backgroundTokens.surfaceAlt};
  animation: ${ul} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;

  &::before {
    content: '';
    position: absolute;
    left: -0.1125vmax;
    top: -0.15vmax;
    width: 1.875vmax;
    height: 1.125vmax;
    border-top-right-radius: 3vmax;
    border-bottom-right-radius: 3vmax;
    border-bottom-left-radius: 4.5vmax;
    background-color: ${({theme:e})=>e.colors.backgroundTokens.secondary};
    animation: ${cl} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01)
      infinite;
  }
`,El=de.div`
  position: absolute;
  top: -1.95vmax;
  left: 40%;
  width: 0.75vmax;
  height: 2.4vmax;
  border-radius: 0.525vmax;
  transform-origin: bottom;
  transform: rotateZ(10deg);
  background-color: ${({theme:e})=>e.colors.backgroundTokens.surfaceAlt};
`,Ml=de.div`
  position: relative;
`,ci=de.div`
  position: absolute;
  top: -0.9vmax;
  width: 0.675vmax;
  height: 0.375vmax;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.backgroundTokens.secondary};
  animation: ${dl} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
`,Rl=de(ci)`
  left: 27%;
`,Fl=de(ci)`
  left: 65%;
`,fi=de.div`
  position: absolute;
  width: 5.5vmax;
  height: 2.375vmax;
  border-top-left-radius: 0vmax;
  border-top-right-radius: 0vmax;
  border-bottom-right-radius: 3.3vmax;
  border-bottom-left-radius: 3.3vmax;
  background-color: ${({theme:e})=>{var t;return((t=e.colors.accent)==null?void 0:t.primaryHover)||"#0d7acc"}};
`,Tl=de(fi)`
  top: 1.8vmax;
  left: 6.5vmax;
  transform-origin: bottom left;
  transform: rotateZ(-45deg);
  z-index: -1;
  animation: ${sl} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
`,$l=de(fi)`
  top: 0.8vmax;
  right: 5.5vmax;
  transform-origin: bottom right;
  transform: rotateZ(15deg);
  z-index: -2;
  animation: ${ll} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
`;//! =============== 3. Component ===============
function Dl(){return c.jsx(pl,{children:c.jsx(hl,{children:c.jsxs(vl,{children:[c.jsxs(gl,{children:[c.jsxs(ml,{children:[c.jsx(yl,{}),c.jsx(bl,{})]}),c.jsxs(xl,{children:[c.jsx(Cl,{}),c.jsx(Pl,{})]}),c.jsxs(Sl,{children:[c.jsx(_l,{}),c.jsx(wl,{})]})]}),c.jsx(Al,{children:c.jsx(Ll,{})}),c.jsx(jl,{children:c.jsxs(Ol,{children:[c.jsx(El,{}),c.jsxs(Ml,{children:[c.jsx(Rl,{}),c.jsx(Fl,{})]})]})}),c.jsxs(kl,{children:[c.jsx(Tl,{}),c.jsx($l,{})]})]})})})}const zl=de.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1a1a1a;
`,Gl=de.div`
  flex: 1;
  background-color: #1a1a1a;
`,Nl=de.footer`
  position: relative;
  background-color: #2c2c2c;
  color: #f5f5f5;
  padding: ${e=>e.theme.spacing.md};
  text-align: center;
  border-top: 1px solid #1593eb;
`,Bl=de.div`
  position: absolute;

  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) scale(0.7);
  transform-origin: bottom center;
  z-index: 10;
`;function ql(){const e=Ct(),t=e.pathname,r=e.pathname==="/";return c.jsxs(zl,{children:[c.jsx(Gs,{}),c.jsx(Gl,{children:c.jsx(oi,{resetKey:t,children:c.jsx(Gr,{})})}),c.jsxs(Nl,{children:[c.jsxs("p",{children:["© ",new Date().getFullYear()," TIIP 模具產業高階製造系統 · Crafted with React"]}),r&&c.jsx(Bl,{children:c.jsx(Dl,{})})]}),c.jsx(il,{})]})}const Il=de.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
`,Vl=de.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${e=>e.theme.colors.error};
`,Rn=de.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
`,Wl=de(Da)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${e=>e.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${e=>e.theme.colors.primaryDark};
    text-decoration: none;
  }
`;function Rt(){const e=to(),t=Ct();return console.error("路由錯誤:",e?typeof e=="object"&&e!==null?JSON.stringify(e,Object.getOwnPropertyNames(e)):String(e):"未知錯誤"),console.error("發生錯誤的路徑:",t),c.jsxs(Il,{children:[c.jsx(Vl,{children:"啊喔！"}),c.jsxs(Rn,{children:["抱歉，發生了一些錯誤。",(e==null?void 0:e.status)===404?" 找不到您請求的頁面。":" 請稍後再試。"]}),c.jsx(Rn,{children:c.jsx("i",{children:(e==null?void 0:e.statusText)||(e==null?void 0:e.message)||"未知錯誤"})}),c.jsx(Wl,{to:"/",children:"返回首頁"})]})}//! =============== 1. Keyframe Animations ===============
const fr=we`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`,Ul=we`
  0%, 50%, 100% {
    fill: #17e300;
  }
  25%, 75% {
    fill: #17e300b4;
  }
`,Ql=we`
  0%, 50%, 100% {
    fill: rgb(255, 95, 74);
  }
  25%, 75% {
    fill: rgb(16, 53, 115);
  }
`,Hl=we`
  0% {
    stop-color: #313f8773;
  }
  50% {
    stop-color: #040d3a;
  }
  100% {
    stop-color: #313f8773;
  }
`;//! =============== 2. Styled Components ===============
const Yl=de.div`
  position: fixed;
  inset: 0;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(1, 13, 21, 0.35);
  z-index: 9999;
  zoom: ${e=>e.size||.5};

  .estrobo_animation {
    animation: ${fr} 4s infinite ease-in-out,
      ${Ul} 0.8s infinite;
  }

  .estrobo_animationV2 {
    animation: ${fr} 4s infinite ease-in-out,
      ${Ql} 0.8s infinite;
  }

  #float_server {
    animation: ${fr} 4s infinite ease-in-out;
  }

  #paint13_linear_163_1030 stop {
    animation: ${Hl} 4s infinite alternate;
  }
`;//! =============== 3. Component ===============
function je({size:e}){return c.jsx(Yl,{size:e,"data-testid":"loading-spinner",children:c.jsxs("svg",{id:"svg_svg",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 477 578",height:"578",width:"477",children:[c.jsx("g",{filter:"url(#filter0_i_163_1030)",children:c.jsx("path",{fill:"#E9E9E9",d:"M235.036 304.223C236.949 303.118 240.051 303.118 241.964 304.223L470.072 435.921C473.898 438.13 473.898 441.712 470.072 443.921L247.16 572.619C242.377 575.38 234.623 575.38 229.84 572.619L6.92817 443.921C3.10183 441.712 3.10184 438.13 6.92817 435.921L235.036 304.223Z"})}),c.jsx("path",{stroke:"white",d:"M235.469 304.473C237.143 303.506 239.857 303.506 241.531 304.473L469.639 436.171C473.226 438.242 473.226 441.6 469.639 443.671L246.727 572.369C242.183 574.992 234.817 574.992 230.273 572.369L7.36118 443.671C3.77399 441.6 3.774 438.242 7.36119 436.171L235.469 304.473Z"}),c.jsx("path",{stroke:"white",fill:"#C3CADC",d:"M234.722 321.071C236.396 320.105 239.111 320.105 240.785 321.071L439.477 435.786C443.064 437.857 443.064 441.215 439.477 443.286L240.785 558.001C239.111 558.967 236.396 558.967 234.722 558.001L36.0304 443.286C32.4432 441.215 32.4432 437.857 36.0304 435.786L234.722 321.071Z"}),c.jsx("path",{fill:"#4054B2",d:"M234.521 366.089C236.434 364.985 239.536 364.985 241.449 366.089L406.439 461.346L241.247 556.72C239.333 557.825 236.231 557.825 234.318 556.72L69.3281 461.463L234.521 366.089Z"}),c.jsx("path",{fill:"#30439B",d:"M237.985 364.089L237.984 556.972C236.144 556.941 235.082 556.717 233.13 556.043L69.3283 461.463L237.985 364.089Z"}),c.jsx("path",{fill:"url(#paint0_linear_163_1030)",d:"M36.2146 117.174L237.658 0.435217V368.615C236.541 368.598 235.686 368.977 233.885 370.124L73.1836 463.678L39.2096 444.075C37.0838 442.229 36.285 440.981 36.2146 438.027V117.174Z",id:"layer_pared"}),c.jsx("path",{fill:"url(#paint1_linear_163_1030)",d:"M439.1 116.303L237.657 0.435568V368.616C238.971 368.585 239.822 369.013 241.43 370.135L403.64 462.925L436.128 444.089C437.832 442.715 438.975 441.147 439.1 439.536V116.303Z",id:"layer_pared"}),c.jsx("path",{fill:"#27C6FD",d:"M64.5447 181.554H67.5626V186.835L64.5447 188.344V181.554Z",id:"float_server"}),c.jsx("path",{fill:"#138EB9",d:"M88.3522 374.347L232.415 457.522C234.202 458.405 234.866 458.629 236.335 458.71V468.291C235.356 468.291 234.086 468.212 232.415 467.275L88.3522 384.1C86.3339 382.882 85.496 382.098 85.4707 380.198V370.428L88.3522 374.347Z",id:"float_server"}),c.jsx("path",{fill:"#138EB9",d:"M384.318 374.445L240.254 457.62C238.914 458.385 238.295 458.629 236.335 458.71V468.291C237.315 468.291 238.704 468.211 240.236 467.274L384.318 384.198C386.457 383.091 387.151 382.244 387.258 380.228V370.917C386.768 372.387 386.21 373.295 384.318 374.445Z",id:"float_server"}),c.jsx("path",{stroke:"url(#paint3_linear_163_1030)",fill:"url(#paint2_linear_163_1030)",d:"M240.452 226.082L408.617 323.172C412.703 325.531 412.703 329.355 408.617 331.713L240.452 428.803C238.545 429.904 235.455 429.904 233.548 428.803L65.3832 331.713C61.298 329.355 61.298 325.531 65.3832 323.172L233.548 226.082C235.455 224.982 238.545 224.982 240.452 226.082Z",id:"float_server"}),c.jsx("path",{fill:"#5B6CA2",d:"M408.896 332.123L241.489 428.775C240.013 429.68 238.557 430.033 236.934 430.033V464.518C238.904 464.518 239.366 464.169 241.489 463.233L408.896 366.58C411.372 365.292 412.125 363.262 412.312 361.317C412.312 361.317 412.312 326.583 412.312 327.722C412.312 328.86 411.42 330.514 408.896 332.123Z",id:"float_server"}),c.jsx("path",{fill:"#6879AF",d:"M240.92 429.077L255.155 420.857V432.434L251.511 439.064V457.432L241.489 463.242C240.116 463.858 239.141 464.518 236.934 464.518V430.024C238.695 430.024 239.862 429.701 240.92 429.077Z",id:"float_server"}),c.jsx("path",{fill:"url(#paint4_linear_163_1030)",d:"M65.084 331.984L232.379 428.571C233.882 429.619 235.101 430.005 236.934 430.005V464.523C234.656 464.523 234.285 464.215 232.379 463.214L65.084 366.442C62.4898 365 61.6417 362.992 61.6699 361.29V327.125C61.6899 329.24 62.4474 330.307 65.084 331.984Z",id:"float_server"}),c.jsx("path",{fill:"#20273A",d:"M400.199 361.032C403.195 359.302 405.623 355.096 405.623 351.637C405.623 348.177 403.195 346.775 400.199 348.505C397.203 350.235 394.775 354.441 394.775 357.9C394.775 361.359 397.203 362.762 400.199 361.032Z",id:"float_server"}),c.jsx("path",{fill:"#20273A",d:"M221.404 446.444C224.4 448.174 226.828 446.771 226.828 443.312C226.828 439.853 224.4 435.646 221.404 433.917C218.408 432.187 215.979 433.589 215.979 437.049C215.979 440.508 218.408 444.714 221.404 446.444Z",id:"float_server"}),c.jsx("path",{fill:"#494F76",d:"M102.895 359.589L97.9976 356.762V380.07L102.895 382.897V359.589Z",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M102.895 359.619L98.3394 356.989V379.854L102.895 382.484V359.619Z",id:"float_server"}),c.jsx("path",{fill:"#494F76",d:"M78.9793 345.923L74.0823 343.096V366.37L78.9793 369.198V345.923Z",id:"float_server"}),c.jsx("path",{fill:"#494F76",d:"M86.9512 350.478L82.0542 347.651V370.959L86.9512 373.787V350.478Z",id:"float_server"}),c.jsx("path",{fill:"#494F76",d:"M94.9229 355.034L90.0259 352.206V375.515L94.9229 378.342V355.034Z",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M86.951 350.509L82.3958 347.879V370.743L86.951 373.373V350.509Z",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M94.9227 355.064L90.3674 352.434V375.299L94.9227 377.929V355.064Z",className:"estrobo_animation"}),c.jsx("path",{fill:"#313654",d:"M78.9794 345.954L74.4241 343.324V366.188L78.9794 368.818V345.954Z",className:"estrobo_animation"}),c.jsx("path",{fill:"#333B5F",d:"M221.859 446.444C224.855 448.174 227.284 446.771 227.284 443.312C227.284 439.853 224.855 435.646 221.859 433.917C218.863 432.187 216.435 433.589 216.435 437.049C216.435 440.508 218.863 444.714 221.859 446.444Z",id:"float_server"}),c.jsx("path",{fill:"#333B5F",d:"M399.516 361.032C402.511 359.302 404.94 355.096 404.94 351.637C404.94 348.177 402.511 346.775 399.516 348.505C396.52 350.235 394.091 354.441 394.091 357.9C394.091 361.359 396.52 362.762 399.516 361.032Z",id:"float_server"}),c.jsx("path",{fill:"#27C6FD",d:"M88.3522 317.406L232.415 400.581C234.202 401.464 234.866 401.688 236.335 401.769V411.35C235.356 411.35 234.086 411.271 232.415 410.334L88.3522 327.159C86.3339 325.941 85.496 325.157 85.4707 323.256V313.486L88.3522 317.406Z",id:"float_server"}),c.jsx("path",{fill:"#27C6FD",d:"M384.318 317.504L240.254 400.679C238.914 401.444 238.295 401.688 236.335 401.769V411.35C237.315 411.35 238.704 411.27 240.236 410.333L384.318 327.257C386.457 326.15 387.151 325.303 387.258 323.287V313.976C386.768 315.446 386.21 316.354 384.318 317.504Z",id:"float_server"}),c.jsx("path",{stroke:"url(#paint6_linear_163_1030)",fill:"url(#paint5_linear_163_1030)",d:"M240.452 169.141L408.617 266.231C412.703 268.59 412.703 272.414 408.617 274.772L240.452 371.862C238.545 372.962 235.455 372.962 233.548 371.862L65.3832 274.772C61.298 272.414 61.298 268.59 65.3832 266.231L233.548 169.141C235.455 168.04 238.545 168.04 240.452 169.141Z",id:"float_server"}),c.jsx("path",{fill:"#5B6CA2",d:"M408.896 275.182L241.489 371.834C240.013 372.739 238.557 373.092 236.934 373.092V407.577C238.904 407.577 239.366 407.229 241.489 406.292L408.896 309.64C411.372 308.352 412.125 306.321 412.312 304.376C412.312 304.376 412.312 269.642 412.312 270.781C412.312 271.92 411.42 273.573 408.896 275.182Z",id:"float_server"}),c.jsx("path",{fill:"#6879AF",d:"M240.92 372.135L255.155 363.915V375.493L251.511 382.123V400.491L241.489 406.3C240.116 406.916 239.141 407.577 236.934 407.577V373.083C238.695 373.083 239.862 372.759 240.92 372.135Z",id:"float_server"}),c.jsx("path",{fill:"url(#paint7_linear_163_1030)",d:"M65.084 275.043L232.379 371.63C233.882 372.678 235.101 373.064 236.934 373.064V407.582C234.656 407.582 234.285 407.274 232.379 406.273L65.084 309.501C62.4898 308.059 61.6417 306.051 61.6699 304.349V270.184C61.6899 272.299 62.4474 273.366 65.084 275.043Z",id:"float_server"}),c.jsx("path",{fill:"#20273A",d:"M400.199 304.091C403.195 302.362 405.623 298.155 405.623 294.696C405.623 291.237 403.195 289.835 400.199 291.564C397.203 293.294 394.775 297.5 394.775 300.959C394.775 304.419 397.203 305.821 400.199 304.091Z",id:"float_server"}),c.jsx("path",{fill:"#20273A",d:"M221.404 389.503C224.4 391.232 226.828 389.83 226.828 386.371C226.828 382.912 224.4 378.705 221.404 376.976C218.408 375.246 215.979 376.648 215.979 380.107C215.979 383.567 218.408 387.773 221.404 389.503Z",id:"float_server"}),c.jsx("path",{fill:"#494F76",d:"M102.553 301.281L97.656 298.454V321.762L102.553 324.59V301.281Z",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M102.553 301.312L97.9976 298.682V321.546L102.553 324.176V301.312Z",className:"estrobo_animation"}),c.jsx("path",{fill:"#494F76",d:"M78.6377 287.615L73.7407 284.788V308.063L78.6377 310.89V287.615Z",id:"float_server"}),c.jsx("path",{fill:"#494F76",d:"M86.6094 292.171L81.7124 289.343V312.652L86.6094 315.479V292.171Z",id:"float_server"}),c.jsx("path",{fill:"#494F76",d:"M94.5811 296.726L89.6841 293.899V317.207L94.5811 320.034V296.726Z",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M86.6095 292.201L82.0542 289.571V312.436L86.6095 315.066V292.201Z",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M94.5812 296.756L90.0259 294.126V316.991L94.5812 319.621V296.756Z",className:"estrobo_animationV2"}),c.jsx("path",{fill:"#313654",d:"M78.6376 287.646L74.0823 285.016V307.88L78.6376 310.51V287.646Z",id:"float_server"}),c.jsx("path",{fill:"#333B5F",d:"M221.859 389.503C224.855 391.232 227.284 389.83 227.284 386.371C227.284 382.912 224.855 378.705 221.859 376.976C218.863 375.246 216.435 376.648 216.435 380.107C216.435 383.567 218.863 387.773 221.859 389.503Z",id:"float_server"}),c.jsx("path",{fill:"#333B5F",d:"M399.516 304.091C402.511 302.362 404.94 298.155 404.94 294.696C404.94 291.237 402.511 289.835 399.516 291.564C396.52 293.294 394.091 297.5 394.091 300.959C394.091 304.419 396.52 305.821 399.516 304.091Z",id:"float_server"}),c.jsx("path",{fill:"#27C6FD",d:"M89.4907 214.912L233.554 298.087C235.341 298.97 236.003 299.194 237.474 299.275V308.856C236.494 308.856 235.223 308.777 233.554 307.84L89.4907 224.665C87.4726 223.447 86.6347 222.663 86.6094 220.762V210.993L89.4907 214.912Z",id:"float_server"}),c.jsx("path",{fill:"#27C6FD",d:"M385.457 215.01L241.393 298.185C240.053 298.951 239.434 299.194 237.474 299.275V308.856C238.454 308.856 239.844 308.776 241.375 307.839L385.457 224.763C387.597 223.656 388.29 222.809 388.397 220.793V211.482C387.907 212.953 387.349 213.86 385.457 215.01Z",id:"float_server"}),c.jsx("path",{fill:"url(#paint8_linear_163_1030)",d:"M66.1102 196.477L233.517 293.129C235.593 294.154 236.364 294.416 238.073 294.509V305.642C236.934 305.642 235.458 305.551 233.517 304.463L66.1102 207.81C63.7651 206.394 62.7914 205.483 62.762 203.275V191.922L66.1102 196.477Z",id:"float_server"}),c.jsx("path",{fill:"#5B6CA2",d:"M410.101 196.591L242.694 293.243C241.135 294.132 240.35 294.375 238.073 294.468V305.643C239.211 305.643 240.892 305.55 242.671 304.46L410.101 207.923C412.587 206.638 413.392 205.653 413.517 203.31V192.491C412.948 194.199 412.3 195.254 410.101 196.591Z",id:"float_server"}),c.jsx("path",{stroke:"url(#paint10_linear_163_1030)",fill:"url(#paint9_linear_163_1030)",d:"M241.59 90.5623L409.756 187.652C413.842 190.011 413.842 193.835 409.756 196.194L241.59 293.284C239.684 294.384 236.593 294.384 234.687 293.284L66.5219 196.194C62.4367 193.835 62.4367 190.011 66.5219 187.652L234.687 90.5623C236.593 89.4616 239.684 89.4616 241.59 90.5623Z",id:"float_server"}),c.jsx("path",{fill:"#20273A",d:"M89.0427 195.334C92.0385 197.063 96.8956 197.063 99.8914 195.334C102.887 193.604 102.887 190.8 99.8914 189.07C96.8956 187.341 92.0385 187.341 89.0427 189.07C86.0469 190.8 86.0469 193.604 89.0427 195.334Z",id:"float_server"}),c.jsx("path",{fill:"#20273A",d:"M231.396 111.061C234.391 112.791 239.249 112.791 242.244 111.061C245.24 109.331 245.24 106.527 242.244 104.798C239.249 103.068 234.391 103.068 231.396 104.798C228.4 106.527 228.4 109.331 231.396 111.061Z",id:"float_server"}),c.jsx("path",{fill:"#20273A",d:"M374.887 194.195C377.883 195.925 382.74 195.925 385.736 194.195C388.732 192.465 388.732 189.661 385.736 187.932C382.74 186.202 377.883 186.202 374.887 187.932C371.891 189.661 371.891 192.465 374.887 194.195Z",id:"float_server"}),c.jsx("path",{fill:"#20273A",d:"M231.396 279.607C234.391 281.336 239.249 281.336 242.244 279.607C245.24 277.877 245.24 275.073 242.244 273.343C239.249 271.613 234.391 271.613 231.396 273.343C228.4 275.073 228.4 277.877 231.396 279.607Z",id:"float_server"}),c.jsx("path",{fill:"#333B5F",d:"M232.109 279.607C235.104 281.336 239.962 281.336 242.957 279.607C245.953 277.877 245.953 275.073 242.957 273.343C239.962 271.613 235.104 271.613 232.109 273.343C229.113 275.073 229.113 277.877 232.109 279.607Z",id:"float_server"}),c.jsx("path",{fill:"#333B5F",d:"M89.7563 195.334C92.7521 197.063 97.6092 197.063 100.605 195.334C103.601 193.604 103.601 190.8 100.605 189.07C97.6092 187.341 92.7521 187.341 89.7563 189.07C86.7605 190.8 86.7605 193.604 89.7563 195.334Z",id:"float_server"}),c.jsx("path",{fill:"#333B5F",d:"M232.109 111.061C235.104 112.791 239.962 112.791 242.957 111.061C245.953 109.331 245.953 106.527 242.957 104.798C239.962 103.068 235.104 103.068 232.109 104.798C229.113 106.527 229.113 109.331 232.109 111.061Z",id:"float_server"}),c.jsx("path",{fill:"#333B5F",d:"M375.6 194.195C378.595 195.925 383.453 195.925 386.448 194.195C389.444 192.465 389.444 189.661 386.448 187.932C383.453 186.202 378.595 186.202 375.6 187.932C372.604 189.661 372.604 192.465 375.6 194.195Z",id:"float_server"}),c.jsx("path",{stroke:"#313654",d:"M371.315 166.009L354.094 176.748C351.92 178.337 350.677 179.595 350.677 181.872L351.247 196.108C351.412 198.824 350.734 200.095 347.83 201.802L251.03 257.603C248.955 258.968 247.598 259.356 244.767 259.312L215.727 258.743C212.711 258.605 211.233 259.005 208.894 260.45L193.659 269.072",id:"float_server"}),c.jsx("path",{stroke:"#313654",d:"M345.691 151.204L328.328 161.374C326.154 162.963 324.911 164.221 324.911 166.498L325.481 180.734C325.646 183.45 324.968 184.721 322.064 186.428L225.264 242.229C223.19 243.594 221.832 243.982 219.001 243.938L189.961 243.369C186.946 243.231 185.468 243.631 183.128 245.076L167.124 253.698",id:"float_server"}),c.jsx("path",{stroke:"#313654",d:"M105.482 218.098L122.697 207.363C124.87 205.773 126.111 204.516 126.111 202.24L125.537 188.007C125.371 185.291 126.048 184.02 128.951 182.314L225.715 126.533C227.788 125.17 229.146 124.782 231.976 124.825L261.012 125.398C264.026 125.535 265.503 125.136 267.842 123.691L283.072 115.072",id:"float_server"}),c.jsx("path",{stroke:"#313654",d:"M131.121 232.893L148.482 222.725C150.656 221.136 151.898 219.879 151.898 217.601L151.327 203.367C151.162 200.65 151.839 199.379 154.743 197.673L251.531 141.878C253.605 140.514 254.962 140.126 257.794 140.17L286.832 140.74C289.847 140.878 291.325 140.478 293.664 139.032L309.667 130.412",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M327.961 242.79L301.907 227.748L300.673 228.46L326.727 243.503L327.961 242.79Z",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M354.625 227.426L328.56 212.377L327.326 213.09L353.392 228.139L354.625 227.426Z",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M300.864 258.519L274.707 243.417L273.474 244.129L299.631 259.231L300.864 258.519Z",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M176.498 155.101L150.21 139.924L148.977 140.636L175.264 155.813L176.498 155.101Z",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M193.703 145.191L167.388 129.998L166.154 130.711L192.469 145.903L193.703 145.191Z",id:"float_server"}),c.jsx("path",{fill:"#313654",d:"M158.333 165.69L131.974 150.472L130.74 151.184L157.099 166.402L158.333 165.69Z",id:"float_server"}),c.jsx("path",{fill:"#20273A",d:"M232.079 135.83C234.258 134.573 237.79 134.573 239.969 135.83L329.717 187.647C334.074 190.163 334.074 194.242 329.717 196.757L239.969 248.574C237.79 249.832 234.258 249.832 232.079 248.574L142.33 196.757C137.972 194.242 137.972 190.163 142.33 187.647L232.079 135.83Z",id:"float_server"}),c.jsx("path",{fill:"url(#paint11_linear_163_1030)",d:"M234.357 135.83C236.535 134.573 240.068 134.573 242.246 135.83L331.995 187.647C336.352 190.163 336.352 194.242 331.995 196.757L242.246 248.574C240.068 249.832 236.535 249.832 234.357 248.574L144.608 196.757C140.25 194.242 140.25 190.163 144.608 187.647L234.357 135.83Z",id:"float_server"}),c.jsx("path",{strokeWidth:"3",stroke:"#27C6FD",d:"M380.667 192.117V181.97C380.667 179.719 383.055 178.27 385.052 179.309L409.985 192.282C410.978 192.799 411.601 193.825 411.601 194.943V301.113C411.601 302.642 409.953 303.606 408.62 302.856L399.529 297.742",className:"after_animation",id:"float_server"}),c.jsx("path",{strokeWidth:"3",stroke:"#27C6FD",d:"M94.7234 192.117V180.306C94.7234 179.214 94.1301 178.208 93.1744 177.68L70.5046 165.152C68.5052 164.047 66.0536 165.493 66.0536 167.778V185.326",id:"float_server"}),c.jsx("ellipse",{fill:"#27C6FD",ry:"1.50894",rx:"1.50894",cy:"192.117",cx:"380.667",id:"float_server"}),c.jsx("ellipse",{fill:"#27C6FD",ry:"1.50894",rx:"1.50894",cy:"192.117",cx:"94.7235",id:"float_server"}),c.jsx("ellipse",{fill:"#27C6FD",ry:"1.50894",rx:"1.50894",cy:"297.742",cx:"399.529",id:"float_server"}),c.jsx("ellipse",{fill:"#27C6FD",ry:"1.50894",rx:"1.50894",cy:"383.751",cx:"221.474",id:"float_server"}),c.jsx("ellipse",{fill:"#27C6FD",ry:"1.50894",rx:"1.50894",cy:"439.583",cx:"221.474",id:"float_server"}),c.jsx("path",{strokeWidth:"3",stroke:"#27C6FD",d:"M221.474 383.752L211.746 388.941C210.768 389.462 210.157 390.48 210.157 391.588V444.34C210.157 445.108 210.988 445.589 211.654 445.208L221.474 439.583",id:"float_server"}),c.jsx("path",{fill:"url(#paint13_linear_163_1030)",d:"M237.376 236.074L36 119.684V439.512C36.0957 441.966 36.7214 443.179 39.0056 445.021L200.082 538.547L231.362 556.441C233.801 557.806 235.868 558.222 237.376 558.328V236.074Z",id:"layer_pared"}),c.jsx("defs",{children:c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"556.454",x2:"438.984",y1:"235.918",x1:"237.376",id:"paint13_linear_163_1030",children:[c.jsx("stop",{style:{stopColor:"#4457b3",stopOpacity:0},offset:"10%"}),c.jsx("stop",{style:{stopColor:"#4457b3",stopOpacity:1},offset:"100%"})]})}),c.jsx("path",{fill:"url(#paint13_linear_163_1030)",d:"M237.376 235.918L438.984 119.576V439.398C439.118 441.699 438.452 442.938 435.975 444.906L274.712 538.539L243.397 556.454C240.955 557.821 238.886 558.23 237.376 558.336V235.918Z",className:"animatedStop",id:"layer_pared"}),c.jsxs("defs",{children:[c.jsxs("filter",{colorInterpolationFilters:"sRGB",filterUnits:"userSpaceOnUse",height:"275.295",width:"468.883",y:"303.394",x:"4.05835",id:"filter0_i_163_1030",children:[c.jsx("feFlood",{result:"BackgroundImageFix",floodOpacity:"0"}),c.jsx("feBlend",{result:"shape",in2:"BackgroundImageFix",in:"SourceGraphic",mode:"normal"}),c.jsx("feColorMatrix",{result:"hardAlpha",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",type:"matrix",in:"SourceAlpha"}),c.jsx("feOffset",{dy:"4"}),c.jsx("feGaussianBlur",{stdDeviation:"2"}),c.jsx("feComposite",{k3:"1",k2:"-1",operator:"arithmetic",in2:"hardAlpha"}),c.jsx("feColorMatrix",{values:"0 0 0 0 0.220833 0 0 0 0 0.220833 0 0 0 0 0.220833 0 0 0 1 0",type:"matrix"}),c.jsx("feBlend",{result:"effect1_innerShadow_163_1030",in2:"shape",mode:"normal"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"336.055",x2:"294.366",y1:"60.1113",x1:"135.05",id:"paint0_linear_163_1030",children:[c.jsx("stop",{stopOpacity:"0.01",stopColor:"white",offset:"0.305"}),c.jsx("stop",{stopColor:"#4054B2",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"335.208",x2:"180.935",y1:"59.2405",x1:"340.265",id:"paint1_linear_163_1030",children:[c.jsx("stop",{stopOpacity:"0.01",stopColor:"white",offset:"0.305"}),c.jsx("stop",{stopColor:"#4054B2",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"420.619",x2:"88.5367",y1:"327.152",x1:"412.313",id:"paint2_linear_163_1030",children:[c.jsx("stop",{stopColor:"#313654"}),c.jsx("stop",{stopColor:"#313654",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"211.092",x2:"168.239",y1:"426.799",x1:"236.934",id:"paint3_linear_163_1030",children:[c.jsx("stop",{stopColor:"#7281B8"}),c.jsx("stop",{stopColor:"#333952",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"349.241",x2:"232.379",y1:"349.241",x1:"65.0839",id:"paint4_linear_163_1030",children:[c.jsx("stop",{stopColor:"#7281B8"}),c.jsx("stop",{stopColor:"#5D6EA4",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"363.678",x2:"88.5367",y1:"270.211",x1:"412.313",id:"paint5_linear_163_1030",children:[c.jsx("stop",{stopColor:"#313654"}),c.jsx("stop",{stopColor:"#313654",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"154.15",x2:"168.239",y1:"369.858",x1:"236.934",id:"paint6_linear_163_1030",children:[c.jsx("stop",{stopColor:"#7281B8"}),c.jsx("stop",{stopColor:"#333952",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"292.3",x2:"232.379",y1:"292.3",x1:"65.0839",id:"paint7_linear_163_1030",children:[c.jsx("stop",{stopColor:"#7281B8"}),c.jsx("stop",{stopColor:"#5D6EA4",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"198.899",x2:"238.073",y1:"198.899",x1:"62.762",id:"paint8_linear_163_1030",children:[c.jsx("stop",{stopColor:"#7382B9"}),c.jsx("stop",{stopColor:"#5D6EA4",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"191.599",x2:"67.1602",y1:"191.633",x1:"413.451",id:"paint9_linear_163_1030",children:[c.jsx("stop",{stopColor:"#5F6E99"}),c.jsx("stop",{stopColor:"#465282",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"191.599",x2:"63.6601",y1:"191.599",x1:"417.16",id:"paint10_linear_163_1030",children:[c.jsx("stop",{stopColor:"#7281B8"}),c.jsx("stop",{stopColor:"#333952",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"243.221",x2:"156.734",y1:"191.633",x1:"335.442",id:"paint11_linear_163_1030",children:[c.jsx("stop",{stopColor:"#313654"}),c.jsx("stop",{stopColor:"#313654",offset:"1"})]}),c.jsxs("linearGradient",{gradientUnits:"userSpaceOnUse",y2:"421.983",x2:"-1.9283",y1:"179.292",x1:"138.189",id:"paint12_linear_163_1030",children:[c.jsx("stop",{stopOpacity:"0.01",stopColor:"white",offset:"0.305"}),c.jsx("stop",{stopColor:"#4054B2",offset:"1"})]})]})]})})}var di={},pi={exports:{}};(function(e){function t(r){return r&&r.__esModule?r:{default:r}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(pi);var be=pi.exports,dr={},pr={exports:{}},Fn;function Le(){return Fn||(Fn=1,function(e){function t(r){"@babel/helpers - typeof";return e.exports=t=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},e.exports.__esModule=!0,e.exports.default=e.exports,t(r)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(pr)),pr.exports}const _t=Pt(Po),Ee=Pt(So),Se=Pt(_o);var Kr={},hr={},hi=(e=>(e.transparent="rgba(0,0,0,0)",e.black="#000000",e.silver="#C0C0C0",e.gray="#808080",e.white="#FFFFFF",e.maroon="#800000",e.red="#FF0000",e.purple="#800080",e.fuchsia="#FF00FF",e.green="#008000",e.lime="#00FF00",e.olive="#808000",e.yellow="#FFFF00",e.navy="#000080",e.blue="#0000FF",e.teal="#008080",e.aqua="#00FFFF",e.aliceblue="#f0f8ff",e.antiquewhite="#faebd7",e.aquamarine="#7fffd4",e.azure="#f0ffff",e.beige="#f5f5dc",e.bisque="#ffe4c4",e.blanchedalmond="#ffebcd",e.blueviolet="#8a2be2",e.brown="#a52a2a",e.burlywood="#deb887",e.cadetblue="#5f9ea0",e.chartreuse="#7fff00",e.chocolate="#d2691e",e.coral="#ff7f50",e.cornflowerblue="#6495ed",e.cornsilk="#fff8dc",e.crimson="#dc143c",e.cyan="#00ffff",e.darkblue="#00008b",e.darkcyan="#008b8b",e.darkgoldenrod="#b8860b",e.darkgray="#a9a9a9",e.darkgreen="#006400",e.darkgrey="#a9a9a9",e.darkkhaki="#bdb76b",e.darkmagenta="#8b008b",e.darkolivegreen="#556b2f",e.darkorange="#ff8c00",e.darkorchid="#9932cc",e.darkred="#8b0000",e.darksalmon="#e9967a",e.darkseagreen="#8fbc8f",e.darkslateblue="#483d8b",e.darkslategray="#2f4f4f",e.darkslategrey="#2f4f4f",e.darkturquoise="#00ced1",e.darkviolet="#9400d3",e.deeppink="#ff1493",e.deepskyblue="#00bfff",e.dimgray="#696969",e.dimgrey="#696969",e.dodgerblue="#1e90ff",e.firebrick="#b22222",e.floralwhite="#fffaf0",e.forestgreen="#228b22",e.gainsboro="#dcdcdc",e.ghostwhite="#f8f8ff",e.gold="#ffd700",e.goldenrod="#daa520",e.greenyellow="#adff2f",e.grey="#808080",e.honeydew="#f0fff0",e.hotpink="#ff69b4",e.indianred="#cd5c5c",e.indigo="#4b0082",e.ivory="#fffff0",e.khaki="#f0e68c",e.lavender="#e6e6fa",e.lavenderblush="#fff0f5",e.lawngreen="#7cfc00",e.lemonchiffon="#fffacd",e.lightblue="#add8e6",e.lightcoral="#f08080",e.lightcyan="#e0ffff",e.lightgoldenrodyellow="#fafad2",e.lightgray="#d3d3d3",e.lightgreen="#90ee90",e.lightgrey="#d3d3d3",e.lightpink="#ffb6c1",e.lightsalmon="#ffa07a",e.lightseagreen="#20b2aa",e.lightskyblue="#87cefa",e.lightslategray="#778899",e.lightslategrey="#778899",e.lightsteelblue="#b0c4de",e.lightyellow="#ffffe0",e.limegreen="#32cd32",e.linen="#faf0e6",e.magenta="#ff00ff",e.mediumaquamarine="#66cdaa",e.mediumblue="#0000cd",e.mediumorchid="#ba55d3",e.mediumpurple="#9370db",e.mediumseagreen="#3cb371",e.mediumslateblue="#7b68ee",e.mediumspringgreen="#00fa9a",e.mediumturquoise="#48d1cc",e.mediumvioletred="#c71585",e.midnightblue="#191970",e.mintcream="#f5fffa",e.mistyrose="#ffe4e1",e.moccasin="#ffe4b5",e.navajowhite="#ffdead",e.oldlace="#fdf5e6",e.olivedrab="#6b8e23",e.orange="#ffa500",e.orangered="#ff4500",e.orchid="#da70d6",e.palegoldenrod="#eee8aa",e.palegreen="#98fb98",e.paleturquoise="#afeeee",e.palevioletred="#db7093",e.papayawhip="#ffefd5",e.peachpuff="#ffdab9",e.peru="#cd853f",e.pink="#ffc0cb",e.plum="#dda0dd",e.powderblue="#b0e0e6",e.rosybrown="#bc8f8f",e.royalblue="#4169e1",e.saddlebrown="#8b4513",e.salmon="#fa8072",e.sandybrown="#f4a460",e.seagreen="#2e8b57",e.seashell="#fff5ee",e.sienna="#a0522d",e.skyblue="#87ceeb",e.slateblue="#6a5acd",e.slategray="#708090",e.snow="#fffafa",e.springgreen="#00ff7f",e.steelblue="#4682b4",e.tan="#d2b48c",e.thistle="#d8bfd8",e.tomato="#ff6347",e.turquoise="#40e0d0",e.violet="#ee82ee",e.wheat="#f5deb3",e.whitesmoke="#f5f5f5",e.yellowgreen="#9acd32",e))(hi||{});function tr(e){return typeof e!="string"?!1:(e=e.toLowerCase(),/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(e))}function Xl(e){return typeof e!="string"?!1:(e=e.toLowerCase(),/^(rgb\(|RGB\()/.test(e))}function vi(e){return typeof e!="string"?!1:(e=e.toLowerCase(),/^(rgba|RGBA)/.test(e))}function gi(e){return/^(rgb|rgba|RGB|RGBA)/.test(e)}function Zl(e){return hi[e]}function mi(e){if(tr(e)||gi(e))return e;const t=Zl(e);if(!t)throw new Error(`Color: Invalid Input of ${e}`);return t}function Kl(e){e=e.replace("#",""),e.length===3&&(e=Array.from(e).map(r=>r+r).join(""));const t=e.split("");return new Array(3).fill(0).map((r,n)=>parseInt(`0x${t[n*2]}${t[n*2+1]}`))}function Jl(e){return e.replace(/rgb\(|rgba\(|\)/g,"").split(",").slice(0,3).map(t=>parseInt(t))}function wt(e){const t=mi(e).toLowerCase();return tr(t)?Kl(t):Jl(t)}function yi(e){const t=mi(e);return vi(t)?Number(t.toLowerCase().split(",").slice(-1)[0].replace(/[)|\s]/g,"")):1}function Jr(e){const t=wt(e);return t&&[...t,yi(e)]}function eu(e,t){const r=wt(e);return typeof t=="number"?`rgba(${r.join(",")},${t})`:`rgb(${r.join(",")})`}function tu(e){if(tr(e))return e;const t=wt(e),r=n=>Number(n).toString(16).padStart(2,"0");return`#${t.map(r).join("")}`}function rr(e){if(!Array.isArray(e))throw new Error(`getColorFromRgbValue: ${e} is not an array`);const{length:t}=e;if(t!==3&&t!==4)throw new Error("getColorFromRgbValue: value length should be 3 or 4");return(t===3?"rgb(":"rgba(")+e.join(",")+")"}function ru(e,t=0){let r=Jr(e);return r=r.map((n,i)=>i===3?n:n-Math.ceil(2.55*t)).map(n=>n<0?0:n),rr(r)}function nu(e,t=0){let r=Jr(e);return r=r.map((n,i)=>i===3?n:n+Math.ceil(2.55*t)).map(n=>n>255?255:n),rr(r)}function au(e,t=100){const r=wt(e);return rr([...r,t/100])}const iu=Object.freeze(Object.defineProperty({__proto__:null,darken:ru,fade:au,getColorFromRgbValue:rr,getOpacity:yi,getRgbValue:wt,getRgbaValue:Jr,isHex:tr,isRgb:Xl,isRgbOrRgba:gi,isRgba:vi,lighten:nu,toHex:tu,toRgb:eu},Symbol.toStringTag,{value:"Module"})),At=Pt(iu);var vr={},gr={},mr={exports:{}},yr={exports:{}},Tn;function ou(){return Tn||(Tn=1,function(e){function t(r){if(Array.isArray(r))return r}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(yr)),yr.exports}var br={exports:{}},$n;function su(){return $n||($n=1,function(e){function t(r,n){var i=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(i!=null){var v,y,B,k,M=[],N=!0,Q=!1;try{if(B=(i=i.call(r)).next,n===0){if(Object(i)!==i)return;N=!1}else for(;!(N=(v=B.call(i)).done)&&(M.push(v.value),M.length!==n);N=!0);}catch(D){Q=!0,y=D}finally{try{if(!N&&i.return!=null&&(k=i.return(),Object(k)!==k))return}finally{if(Q)throw y}}return M}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(br)),br.exports}var xr={exports:{}},Cr={exports:{}},Dn;function lu(){return Dn||(Dn=1,function(e){function t(r,n){(n==null||n>r.length)&&(n=r.length);for(var i=0,v=Array(n);i<n;i++)v[i]=r[i];return v}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(Cr)),Cr.exports}var zn;function uu(){return zn||(zn=1,function(e){var t=lu();function r(n,i){if(n){if(typeof n=="string")return t(n,i);var v={}.toString.call(n).slice(8,-1);return v==="Object"&&n.constructor&&(v=n.constructor.name),v==="Map"||v==="Set"?Array.from(n):v==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(v)?t(n,i):void 0}}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports}(xr)),xr.exports}var Pr={exports:{}},Gn;function cu(){return Gn||(Gn=1,function(e){function t(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(Pr)),Pr.exports}var Nn;function Ae(){return Nn||(Nn=1,function(e){var t=ou(),r=su(),n=uu(),i=cu();function v(y,B){return t(y)||r(y,B)||n(y,B)||i()}e.exports=v,e.exports.__esModule=!0,e.exports.default=e.exports}(mr)),mr.exports}var Bn;function fu(){return Bn||(Bn=1,function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),e.bezierCurveToPolyline=Y,e.getBezierCurveLength=G,e.default=void 0;var r=t(Ae()),n=t(Se),i=Math.sqrt,v=Math.pow,y=Math.ceil,B=Math.abs,k=50;function M(P){var C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:5,F=P.length-1,_=P[0],p=P[F][2],d=P.slice(1),a=d.map(function(h,R){var W=R===0?_:d[R-1][2];return N.apply(void 0,[W].concat((0,n.default)(h)))}),u=new Array(F).fill(k),l=b(a,u),s=L(l,a,d,C);return s.segmentPoints.push(p),s}function N(P,C,F,_){return function(p){var d=1-p,a=v(d,3),u=v(d,2),l=v(p,3),s=v(p,2);return[P[0]*a+3*C[0]*p*u+3*F[0]*s*d+_[0]*l,P[1]*a+3*C[1]*p*u+3*F[1]*s*d+_[1]*l]}}function Q(P,C){var F=(0,r.default)(P,2),_=F[0],p=F[1],d=(0,r.default)(C,2),a=d[0],u=d[1];return i(v(_-a,2)+v(p-u,2))}function D(P){return P.reduce(function(C,F){return C+F},0)}function A(P){return P.map(function(C,F){return new Array(C.length-1).fill(0).map(function(_,p){return Q(C[p],C[p+1])})})}function b(P,C){return P.map(function(F,_){var p=1/C[_];return new Array(C[_]).fill("").map(function(d,a){return F(a*p)})})}function z(P,C){return P.map(function(F){return F.map(function(_){return B(_-C)})}).map(function(F){return D(F)}).reduce(function(F,_){return F+_},0)}function L(P,C,F,_){var p=4,d=1,a=function(){var s=P.reduce(function(J,ne){return J+ne.length},0);P.forEach(function(J,ne){return J.push(F[ne][2])});var h=A(P),R=h.reduce(function(J,ne){return J+ne.length},0),W=h.map(function(J){return D(J)}),o=D(W),w=o/R,g=z(h,w);if(g<=_)return"break";s=y(w/_*s*1.1);var T=W.map(function(J){return y(J/o*s)});P=b(C,T),s=P.reduce(function(J,ne){return J+ne.length},0);var U=JSON.parse(JSON.stringify(P));U.forEach(function(J,ne){return J.push(F[ne][2])}),h=A(U),R=h.reduce(function(J,ne){return J+ne.length},0),W=h.map(function(J){return D(J)}),o=D(W),w=o/R;var ee=1/s/10;C.forEach(function(J,ne){for(var ae=T[ne],ue=new Array(ae).fill("").map(function(x,E){return E/T[ne]}),X=0;X<p;X++)for(var te=A([P[ne]])[0],ie=te.map(function(x){return x-w}),le=0,$=0;$<ae;$++){if($===0)return;le+=ie[$-1],ue[$]-=ee*le,ue[$]>1&&(ue[$]=1),ue[$]<0&&(ue[$]=0),P[ne][$]=J(ue[$])}}),p*=4,d++};do{var u=a();if(u==="break")break}while(p<=1025);return P=P.reduce(function(l,s){return l.concat(s)},[]),{segmentPoints:P,cycles:d,rounds:p}}function Y(P){var C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:5;if(!P)return console.error("bezierCurveToPolyline: Missing parameters!"),!1;if(!(P instanceof Array))return console.error("bezierCurveToPolyline: Parameter bezierCurve must be an array!"),!1;if(typeof C!="number")return console.error("bezierCurveToPolyline: Parameter precision must be a number!"),!1;var F=M(P,C),_=F.segmentPoints;return _}function G(P){var C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:5;if(!P)return console.error("getBezierCurveLength: Missing parameters!"),!1;if(!(P instanceof Array))return console.error("getBezierCurveLength: Parameter bezierCurve must be an array!"),!1;if(typeof C!="number")return console.error("getBezierCurveLength: Parameter precision must be a number!"),!1;var F=M(P,C),_=F.segmentPoints,p=A([_])[0],d=D(p);return d}var O=Y;e.default=O}(gr)),gr}var Sr={},qn;function du(){return qn||(qn=1,function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t(Ae()),n=t(Se);function i(M){var N=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,Q=arguments.length>2&&arguments[2]!==void 0?arguments[2]:.25,D=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25;if(!(M instanceof Array))return console.error("polylineToBezierCurve: Parameter polyline must be an array!"),!1;if(M.length<=2)return console.error("polylineToBezierCurve: Converting to a curve requires at least 3 points!"),!1;var A=M[0],b=M.length-1,z=new Array(b).fill(0).map(function(L,Y){return[].concat((0,n.default)(v(M,Y,N,Q,D)),[M[Y+1]])});return N&&y(z,A),z.unshift(M[0]),z}function v(M,N){var Q=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,D=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25,A=arguments.length>4&&arguments[4]!==void 0?arguments[4]:.25,b=M.length;if(!(b<3||N>=b)){var z=N-1;z<0&&(z=Q?b+z:0);var L=N+1;L>=b&&(L=Q?L-b:b-1);var Y=N+2;Y>=b&&(Y=Q?Y-b:b-1);var G=M[z],O=M[N],P=M[L],C=M[Y];return[[O[0]+D*(P[0]-G[0]),O[1]+D*(P[1]-G[1])],[P[0]-A*(C[0]-O[0]),P[1]-A*(C[1]-O[1])]]}}function y(M,N){var Q=M[0],D=M.slice(-1)[0];return M.push([B(D[1],D[2]),B(Q[0],N),N]),M}function B(M,N){var Q=(0,r.default)(M,2),D=Q[0],A=Q[1],b=(0,r.default)(N,2),z=b[0],L=b[1],Y=z-D,G=L-A;return[z+Y,L+G]}var k=i;e.default=k}(Sr)),Sr}var In;function en(){return In||(In=1,function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"bezierCurveToPolyline",{enumerable:!0,get:function(){return r.bezierCurveToPolyline}}),Object.defineProperty(e,"getBezierCurveLength",{enumerable:!0,get:function(){return r.getBezierCurveLength}}),Object.defineProperty(e,"polylineToBezierCurve",{enumerable:!0,get:function(){return n.default}}),e.default=void 0;var r=fu(),n=t(du()),i={bezierCurveToPolyline:r.bezierCurveToPolyline,getBezierCurveLength:r.getBezierCurveLength,polylineToBezierCurve:n.default};e.default=i}(vr)),vr}var _r={},Vn;function _e(){return Vn||(Vn=1,function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),e.deepClone=D,e.eliminateBlur=A,e.checkPointIsInCircle=b,e.getTwoPointDistance=z,e.checkPointIsInPolygon=L,e.checkPointIsInSector=Y,e.checkPointIsNearPolyline=O,e.checkPointIsInRect=P,e.getRotatePointPos=C,e.getScalePointPos=F,e.getTranslatePointPos=_,e.getDistanceBetweenPointAndLine=p,e.getCircleRadianPoint=d,e.getRegularPolygonPoints=a,e.default=void 0;var r=t(Se),n=t(Ae()),i=t(Le()),v=Math.abs,y=Math.sqrt,B=Math.sin,k=Math.cos,M=Math.max,N=Math.min,Q=Math.PI;function D(l){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(!l)return l;var h=JSON.parse,R=JSON.stringify;if(!s)return h(R(l));var W=l instanceof Array?[]:{};if(l&&(0,i.default)(l)==="object")for(var o in l)l.hasOwnProperty(o)&&(l[o]&&(0,i.default)(l[o])==="object"?W[o]=D(l[o],!0):W[o]=l[o]);return W}function A(l){return l.map(function(s){var h=(0,n.default)(s,2),R=h[0],W=h[1];return[parseInt(R)+.5,parseInt(W)+.5]})}function b(l,s,h,R){return z(l,[s,h])<=R}function z(l,s){var h=(0,n.default)(l,2),R=h[0],W=h[1],o=(0,n.default)(s,2),w=o[0],g=o[1],T=v(R-w),U=v(W-g);return y(T*T+U*U)}function L(l,s){for(var h=0,R=(0,n.default)(l,2),W=R[0],o=R[1],w=s.length,g=1,T=s[0];g<=w;g++){var U=s[g%w];if(W>N(T[0],U[0])&&W<=M(T[0],U[0])&&o<=M(T[1],U[1])&&T[0]!==U[0]){var ee=(W-T[0])*(U[1]-T[1])/(U[0]-T[0])+T[1];(T[1]===U[1]||o<=ee)&&h++}T=U}return h%2===1}function Y(l,s,h,R,W,o,w){if(!l||z(l,[s,h])>R)return!1;if(!w){var g=D([o,W]),T=(0,n.default)(g,2);W=T[0],o=T[1]}var U=W>o;if(U){var ee=[o,W];W=ee[0],o=ee[1]}var J=o-W;if(J>=Q*2)return!0;var ne=(0,n.default)(l,2),ae=ne[0],ue=ne[1],X=d(s,h,R,W),te=(0,n.default)(X,2),ie=te[0],le=te[1],$=d(s,h,R,o),x=(0,n.default)($,2),E=x[0],q=x[1],H=[ae-s,ue-h],K=[ie-s,le-h],m=[E-s,q-h],V=J>Q;if(V){var f=D([m,K]),S=(0,n.default)(f,2);K=S[0],m=S[1]}var j=G(K,H)&&!G(m,H);return V&&(j=!j),U&&(j=!j),j}function G(l,s){var h=(0,n.default)(l,2),R=h[0],W=h[1],o=(0,n.default)(s,2),w=o[0],g=o[1];return-W*w+R*g>0}function O(l,s,h){var R=h/2,W=s.map(function(g){var T=(0,n.default)(g,2),U=T[0],ee=T[1];return[U,ee-R]}),o=s.map(function(g){var T=(0,n.default)(g,2),U=T[0],ee=T[1];return[U,ee+R]}),w=[].concat((0,r.default)(W),(0,r.default)(o.reverse()));return L(l,w)}function P(l,s,h,R,W){var o=(0,n.default)(l,2),w=o[0],g=o[1];return!(w<s||g<h||w>s+R||g>h+W)}function C(){var l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,s=arguments.length>1?arguments[1]:void 0,h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[0,0];if(!s)return!1;if(l%360===0)return s;var R=(0,n.default)(s,2),W=R[0],o=R[1],w=(0,n.default)(h,2),g=w[0],T=w[1];return l*=Q/180,[(W-g)*k(l)-(o-T)*B(l)+g,(W-g)*B(l)+(o-T)*k(l)+T]}function F(){var l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[1,1],s=arguments.length>1?arguments[1]:void 0,h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[0,0];if(!s)return!1;if(l===1)return s;var R=(0,n.default)(s,2),W=R[0],o=R[1],w=(0,n.default)(h,2),g=w[0],T=w[1],U=(0,n.default)(l,2),ee=U[0],J=U[1],ne=W-g,ae=o-T;return[ne*ee+g,ae*J+T]}function _(l,s){if(!l||!s)return!1;var h=(0,n.default)(s,2),R=h[0],W=h[1],o=(0,n.default)(l,2),w=o[0],g=o[1];return[R+w,W+g]}function p(l,s,h){if(!l||!s||!h)return!1;var R=(0,n.default)(l,2),W=R[0],o=R[1],w=(0,n.default)(s,2),g=w[0],T=w[1],U=(0,n.default)(h,2),ee=U[0],J=U[1],ne=J-T,ae=g-ee,ue=T*(ee-g)-g*(J-T),X=v(ne*W+ae*o+ue),te=y(ne*ne+ae*ae);return X/te}function d(l,s,h,R){return[l+k(R)*h,s+B(R)*h]}function a(l,s,h,R){var W=arguments.length>4&&arguments[4]!==void 0?arguments[4]:Q*-.5,o=Q*2/R,w=new Array(R).fill("").map(function(g,T){return T*o+W});return w.map(function(g){return d(l,s,h,g)})}var u={deepClone:D,eliminateBlur:A,checkPointIsInCircle:b,checkPointIsInPolygon:L,checkPointIsInSector:Y,checkPointIsNearPolyline:O,getTwoPointDistance:z,getRotatePointPos:C,getScalePointPos:F,getTranslatePointPos:_,getCircleRadianPoint:d,getRegularPolygonPoints:a,getDistanceBetweenPointAndLine:p};e.default=u}(_r)),_r}var wr={},Ar={},Wn;function pu(){return Wn||(Wn=1,function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),e.drawPolylinePath=n,e.drawBezierCurvePath=i,e.default=void 0;var r=t(Se);function n(y,B){var k=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,M=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;if(!y||B.length<2)return!1;k&&y.beginPath(),B.forEach(function(N,Q){return N&&(Q===0?y.moveTo.apply(y,(0,r.default)(N)):y.lineTo.apply(y,(0,r.default)(N)))}),M&&y.closePath()}function i(y,B){var k=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,M=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,N=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!1;if(!y||!B)return!1;M&&y.beginPath(),k&&y.moveTo.apply(y,(0,r.default)(k)),B.forEach(function(Q){return Q&&y.bezierCurveTo.apply(y,(0,r.default)(Q[0]).concat((0,r.default)(Q[1]),(0,r.default)(Q[2])))}),N&&y.closePath()}var v={drawPolylinePath:n,drawBezierCurvePath:i};e.default=v}(Ar)),Ar}var Un;function tn(){return Un||(Un=1,function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),e.extendNewGraph=F,e.default=e.text=e.bezierCurve=e.smoothline=e.polyline=e.regPolygon=e.sector=e.arc=e.ring=e.rect=e.ellipse=e.circle=void 0;var r=t(Se),n=t(Ae()),i=t(en()),v=_e(),y=pu(),B=i.default.polylineToBezierCurve,k=i.default.bezierCurveToPolyline,M={shape:{rx:0,ry:0,r:0},validator:function(p){var d=p.shape,a=d.rx,u=d.ry,l=d.r;return typeof a!="number"||typeof u!="number"||typeof l!="number"?(console.error("Circle shape configuration is abnormal!"),!1):!0},draw:function(p,d){var a=p.ctx,u=d.shape;a.beginPath();var l=u.rx,s=u.ry,h=u.r;a.arc(l,s,h>0?h:.01,0,Math.PI*2),a.fill(),a.stroke(),a.closePath()},hoverCheck:function(p,d){var a=d.shape,u=a.rx,l=a.ry,s=a.r;return(0,v.checkPointIsInCircle)(p,u,l,s)},setGraphCenter:function(p,d){var a=d.shape,u=d.style,l=a.rx,s=a.ry;u.graphCenter=[l,s]},move:function(p,d){var a=p.movementX,u=p.movementY,l=d.shape;this.attr("shape",{rx:l.rx+a,ry:l.ry+u})}};e.circle=M;var N={shape:{rx:0,ry:0,hr:0,vr:0},validator:function(p){var d=p.shape,a=d.rx,u=d.ry,l=d.hr,s=d.vr;return typeof a!="number"||typeof u!="number"||typeof l!="number"||typeof s!="number"?(console.error("Ellipse shape configuration is abnormal!"),!1):!0},draw:function(p,d){var a=p.ctx,u=d.shape;a.beginPath();var l=u.rx,s=u.ry,h=u.hr,R=u.vr;a.ellipse(l,s,h>0?h:.01,R>0?R:.01,0,0,Math.PI*2),a.fill(),a.stroke(),a.closePath()},hoverCheck:function(p,d){var a=d.shape,u=a.rx,l=a.ry,s=a.hr,h=a.vr,R=Math.max(s,h),W=Math.min(s,h),o=Math.sqrt(R*R-W*W),w=[u-o,l],g=[u+o,l],T=(0,v.getTwoPointDistance)(p,w)+(0,v.getTwoPointDistance)(p,g);return T<=2*R},setGraphCenter:function(p,d){var a=d.shape,u=d.style,l=a.rx,s=a.ry;u.graphCenter=[l,s]},move:function(p,d){var a=p.movementX,u=p.movementY,l=d.shape;this.attr("shape",{rx:l.rx+a,ry:l.ry+u})}};e.ellipse=N;var Q={shape:{x:0,y:0,w:0,h:0},validator:function(p){var d=p.shape,a=d.x,u=d.y,l=d.w,s=d.h;return typeof a!="number"||typeof u!="number"||typeof l!="number"||typeof s!="number"?(console.error("Rect shape configuration is abnormal!"),!1):!0},draw:function(p,d){var a=p.ctx,u=d.shape;a.beginPath();var l=u.x,s=u.y,h=u.w,R=u.h;a.rect(l,s,h,R),a.fill(),a.stroke(),a.closePath()},hoverCheck:function(p,d){var a=d.shape,u=a.x,l=a.y,s=a.w,h=a.h;return(0,v.checkPointIsInRect)(p,u,l,s,h)},setGraphCenter:function(p,d){var a=d.shape,u=d.style,l=a.x,s=a.y,h=a.w,R=a.h;u.graphCenter=[l+h/2,s+R/2]},move:function(p,d){var a=p.movementX,u=p.movementY,l=d.shape;this.attr("shape",{x:l.x+a,y:l.y+u})}};e.rect=Q;var D={shape:{rx:0,ry:0,r:0},validator:function(p){var d=p.shape,a=d.rx,u=d.ry,l=d.r;return typeof a!="number"||typeof u!="number"||typeof l!="number"?(console.error("Ring shape configuration is abnormal!"),!1):!0},draw:function(p,d){var a=p.ctx,u=d.shape;a.beginPath();var l=u.rx,s=u.ry,h=u.r;a.arc(l,s,h>0?h:.01,0,Math.PI*2),a.stroke(),a.closePath()},hoverCheck:function(p,d){var a=d.shape,u=d.style,l=a.rx,s=a.ry,h=a.r,R=u.lineWidth,W=R/2,o=h-W,w=h+W,g=(0,v.getTwoPointDistance)(p,[l,s]);return g>=o&&g<=w},setGraphCenter:function(p,d){var a=d.shape,u=d.style,l=a.rx,s=a.ry;u.graphCenter=[l,s]},move:function(p,d){var a=p.movementX,u=p.movementY,l=d.shape;this.attr("shape",{rx:l.rx+a,ry:l.ry+u})}};e.ring=D;var A={shape:{rx:0,ry:0,r:0,startAngle:0,endAngle:0,clockWise:!0},validator:function(p){var d=p.shape,a=["rx","ry","r","startAngle","endAngle"];return a.find(function(u){return typeof d[u]!="number"})?(console.error("Arc shape configuration is abnormal!"),!1):!0},draw:function(p,d){var a=p.ctx,u=d.shape;a.beginPath();var l=u.rx,s=u.ry,h=u.r,R=u.startAngle,W=u.endAngle,o=u.clockWise;a.arc(l,s,h>0?h:.001,R,W,!o),a.stroke(),a.closePath()},hoverCheck:function(p,d){var a=d.shape,u=d.style,l=a.rx,s=a.ry,h=a.r,R=a.startAngle,W=a.endAngle,o=a.clockWise,w=u.lineWidth,g=w/2,T=h-g,U=h+g;return!(0,v.checkPointIsInSector)(p,l,s,T,R,W,o)&&(0,v.checkPointIsInSector)(p,l,s,U,R,W,o)},setGraphCenter:function(p,d){var a=d.shape,u=d.style,l=a.rx,s=a.ry;u.graphCenter=[l,s]},move:function(p,d){var a=p.movementX,u=p.movementY,l=d.shape;this.attr("shape",{rx:l.rx+a,ry:l.ry+u})}};e.arc=A;var b={shape:{rx:0,ry:0,r:0,startAngle:0,endAngle:0,clockWise:!0},validator:function(p){var d=p.shape,a=["rx","ry","r","startAngle","endAngle"];return a.find(function(u){return typeof d[u]!="number"})?(console.error("Sector shape configuration is abnormal!"),!1):!0},draw:function(p,d){var a=p.ctx,u=d.shape;a.beginPath();var l=u.rx,s=u.ry,h=u.r,R=u.startAngle,W=u.endAngle,o=u.clockWise;a.arc(l,s,h>0?h:.01,R,W,!o),a.lineTo(l,s),a.closePath(),a.stroke(),a.fill()},hoverCheck:function(p,d){var a=d.shape,u=a.rx,l=a.ry,s=a.r,h=a.startAngle,R=a.endAngle,W=a.clockWise;return(0,v.checkPointIsInSector)(p,u,l,s,h,R,W)},setGraphCenter:function(p,d){var a=d.shape,u=d.style,l=a.rx,s=a.ry;u.graphCenter=[l,s]},move:function(p,d){var a=p.movementX,u=p.movementY,l=d.shape,s=l.rx,h=l.ry;this.attr("shape",{rx:s+a,ry:h+u})}};e.sector=b;var z={shape:{rx:0,ry:0,r:0,side:0},validator:function(p){var d=p.shape,a=d.side,u=["rx","ry","r","side"];return u.find(function(l){return typeof d[l]!="number"})?(console.error("RegPolygon shape configuration is abnormal!"),!1):a<3?(console.error("RegPolygon at least trigon!"),!1):!0},draw:function(p,d){var a=p.ctx,u=d.shape,l=d.cache;a.beginPath();var s=u.rx,h=u.ry,R=u.r,W=u.side;if(!l.points||l.rx!==s||l.ry!==h||l.r!==R||l.side!==W){var o=(0,v.getRegularPolygonPoints)(s,h,R,W);Object.assign(l,{points:o,rx:s,ry:h,r:R,side:W})}var w=l.points;(0,y.drawPolylinePath)(a,w),a.closePath(),a.stroke(),a.fill()},hoverCheck:function(p,d){var a=d.cache,u=a.points;return(0,v.checkPointIsInPolygon)(p,u)},setGraphCenter:function(p,d){var a=d.shape,u=d.style,l=a.rx,s=a.ry;u.graphCenter=[l,s]},move:function(p,d){var a=p.movementX,u=p.movementY,l=d.shape,s=d.cache,h=l.rx,R=l.ry;s.rx+=a,s.ry+=u,this.attr("shape",{rx:h+a,ry:R+u}),s.points=s.points.map(function(W){var o=(0,n.default)(W,2),w=o[0],g=o[1];return[w+a,g+u]})}};e.regPolygon=z;var L={shape:{points:[],close:!1},validator:function(p){var d=p.shape,a=d.points;return a instanceof Array?!0:(console.error("Polyline points should be an array!"),!1)},draw:function(p,d){var a=p.ctx,u=d.shape,l=d.style.lineWidth;a.beginPath();var s=u.points,h=u.close;l===1&&(s=(0,v.eliminateBlur)(s)),(0,y.drawPolylinePath)(a,s),h&&(a.closePath(),a.fill()),a.stroke()},hoverCheck:function(p,d){var a=d.shape,u=d.style,l=a.points,s=a.close,h=u.lineWidth;return s?(0,v.checkPointIsInPolygon)(p,l):(0,v.checkPointIsNearPolyline)(p,l,h)},setGraphCenter:function(p,d){var a=d.shape,u=d.style,l=a.points;u.graphCenter=l[0]},move:function(p,d){var a=p.movementX,u=p.movementY,l=d.shape,s=l.points,h=s.map(function(R){var W=(0,n.default)(R,2),o=W[0],w=W[1];return[o+a,w+u]});this.attr("shape",{points:h})}};e.polyline=L;var Y={shape:{points:[],close:!1},validator:function(p){var d=p.shape,a=d.points;return a instanceof Array?!0:(console.error("Smoothline points should be an array!"),!1)},draw:function(p,d){var a=p.ctx,u=d.shape,l=d.cache,s=u.points,h=u.close;if(!l.points||l.points.toString()!==s.toString()){var R=B(s,h),W=k(R);Object.assign(l,{points:(0,v.deepClone)(s,!0),bezierCurve:R,hoverPoints:W})}var o=l.bezierCurve;a.beginPath(),(0,y.drawBezierCurvePath)(a,o.slice(1),o[0]),h&&(a.closePath(),a.fill()),a.stroke()},hoverCheck:function(p,d){var a=d.cache,u=d.shape,l=d.style,s=a.hoverPoints,h=u.close,R=l.lineWidth;return h?(0,v.checkPointIsInPolygon)(p,s):(0,v.checkPointIsNearPolyline)(p,s,R)},setGraphCenter:function(p,d){var a=d.shape,u=d.style,l=a.points;u.graphCenter=l[0]},move:function(p,d){var a=p.movementX,u=p.movementY,l=d.shape,s=d.cache,h=l.points,R=h.map(function(T){var U=(0,n.default)(T,2),ee=U[0],J=U[1];return[ee+a,J+u]});s.points=R;var W=(0,n.default)(s.bezierCurve[0],2),o=W[0],w=W[1],g=s.bezierCurve.slice(1);s.bezierCurve=[[o+a,w+u]].concat((0,r.default)(g.map(function(T){return T.map(function(U){var ee=(0,n.default)(U,2),J=ee[0],ne=ee[1];return[J+a,ne+u]})}))),s.hoverPoints=s.hoverPoints.map(function(T){var U=(0,n.default)(T,2),ee=U[0],J=U[1];return[ee+a,J+u]}),this.attr("shape",{points:R})}};e.smoothline=Y;var G={shape:{points:[],close:!1},validator:function(p){var d=p.shape,a=d.points;return a instanceof Array?!0:(console.error("BezierCurve points should be an array!"),!1)},draw:function(p,d){var a=p.ctx,u=d.shape,l=d.cache,s=u.points,h=u.close;if(!l.points||l.points.toString()!==s.toString()){var R=k(s,20);Object.assign(l,{points:(0,v.deepClone)(s,!0),hoverPoints:R})}a.beginPath(),(0,y.drawBezierCurvePath)(a,s.slice(1),s[0]),h&&(a.closePath(),a.fill()),a.stroke()},hoverCheck:function(p,d){var a=d.cache,u=d.shape,l=d.style,s=a.hoverPoints,h=u.close,R=l.lineWidth;return h?(0,v.checkPointIsInPolygon)(p,s):(0,v.checkPointIsNearPolyline)(p,s,R)},setGraphCenter:function(p,d){var a=d.shape,u=d.style,l=a.points;u.graphCenter=l[0]},move:function(p,d){var a=p.movementX,u=p.movementY,l=d.shape,s=d.cache,h=l.points,R=(0,n.default)(h[0],2),W=R[0],o=R[1],w=h.slice(1),g=[[W+a,o+u]].concat((0,r.default)(w.map(function(T){return T.map(function(U){var ee=(0,n.default)(U,2),J=ee[0],ne=ee[1];return[J+a,ne+u]})})));s.points=g,s.hoverPoints=s.hoverPoints.map(function(T){var U=(0,n.default)(T,2),ee=U[0],J=U[1];return[ee+a,J+u]}),this.attr("shape",{points:g})}};e.bezierCurve=G;var O={shape:{content:"",position:[],maxWidth:void 0,rowGap:0},validator:function(p){var d=p.shape,a=d.content,u=d.position,l=d.rowGap;return typeof a!="string"?(console.error("Text content should be a string!"),!1):u instanceof Array?typeof l!="number"?(console.error("Text rowGap should be a number!"),!1):!0:(console.error("Text position should be an array!"),!1)},draw:function(p,d){var a=p.ctx,u=d.shape,l=u.content,s=u.position,h=u.maxWidth,R=u.rowGap,W=a.textBaseline,o=a.font,w=parseInt(o.replace(/\D/g,"")),g=s,T=(0,n.default)(g,2),U=T[0],ee=T[1];l=l.split(`
`);var J=l.length,ne=w+R,ae=J*ne-R,ue=0;W==="middle"&&(ue=ae/2,ee+=w/2),W==="bottom"&&(ue=ae,ee+=w),s=new Array(J).fill(0).map(function(X,te){return[U,ee+te*ne-ue]}),a.beginPath(),l.forEach(function(X,te){a.fillText.apply(a,[X].concat((0,r.default)(s[te]),[h])),a.strokeText.apply(a,[X].concat((0,r.default)(s[te]),[h]))}),a.closePath()},hoverCheck:function(p,d){return d.shape,d.style,!1},setGraphCenter:function(p,d){var a=d.shape,u=d.style,l=a.position;u.graphCenter=(0,r.default)(l)},move:function(p,d){var a=p.movementX,u=p.movementY,l=d.shape,s=(0,n.default)(l.position,2),h=s[0],R=s[1];this.attr("shape",{position:[h+a,R+u]})}};e.text=O;var P=new Map([["circle",M],["ellipse",N],["rect",Q],["ring",D],["arc",A],["sector",b],["regPolygon",z],["polyline",L],["smoothline",Y],["bezierCurve",G],["text",O]]),C=P;e.default=C;function F(_,p){if(!_||!p){console.error("ExtendNewGraph Missing Parameters!");return}if(!p.shape){console.error("Required attribute of shape to extendNewGraph!");return}if(!p.validator){console.error("Required function of validator to extendNewGraph!");return}if(!p.draw){console.error("Required function of draw to extendNewGraph!");return}P.set(_,p)}}(wr)),wr}var Lr={},bi={exports:{}},xi={exports:{}};(function(e){function t(r,n){this.v=r,this.k=n}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(xi);var Ci=xi.exports,Pi={exports:{}},Si={exports:{}};(function(e){function t(r,n,i,v){var y=Object.defineProperty;try{y({},"",{})}catch{y=0}e.exports=t=function(k,M,N,Q){function D(A,b){t(k,A,function(z){return this._invoke(A,b,z)})}M?y?y(k,M,{value:N,enumerable:!Q,configurable:!Q,writable:!Q}):k[M]=N:(D("next",0),D("throw",1),D("return",2))},e.exports.__esModule=!0,e.exports.default=e.exports,t(r,n,i,v)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Si);var _i=Si.exports;(function(e){var t=_i;function r(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var n,i,v=typeof Symbol=="function"?Symbol:{},y=v.iterator||"@@iterator",B=v.toStringTag||"@@toStringTag";function k(L,Y,G,O){var P=Y&&Y.prototype instanceof N?Y:N,C=Object.create(P.prototype);return t(C,"_invoke",function(F,_,p){var d,a,u,l=0,s=p||[],h=!1,R={p:0,n:0,v:n,a:W,f:W.bind(n,4),d:function(w,g){return d=w,a=0,u=n,R.n=g,M}};function W(o,w){for(a=o,u=w,i=0;!h&&l&&!g&&i<s.length;i++){var g,T=s[i],U=R.p,ee=T[2];o>3?(g=ee===w)&&(u=T[(a=T[4])?5:(a=3,3)],T[4]=T[5]=n):T[0]<=U&&((g=o<2&&U<T[1])?(a=0,R.v=w,R.n=T[1]):U<ee&&(g=o<3||T[0]>w||w>ee)&&(T[4]=o,T[5]=w,R.n=ee,a=0))}if(g||o>1)return M;throw h=!0,w}return function(o,w,g){if(l>1)throw TypeError("Generator is already running");for(h&&w===1&&W(w,g),a=w,u=g;(i=a<2?n:u)||!h;){d||(a?a<3?(a>1&&(R.n=-1),W(a,u)):R.n=u:R.v=u);try{if(l=2,d){if(a||(o="next"),i=d[o]){if(!(i=i.call(d,u)))throw TypeError("iterator result is not an object");if(!i.done)return i;u=i.value,a<2&&(a=0)}else a===1&&(i=d.return)&&i.call(d),a<2&&(u=TypeError("The iterator does not provide a '"+o+"' method"),a=1);d=n}else if((i=(h=R.n<0)?u:F.call(_,R))!==M)break}catch(T){d=n,a=1,u=T}finally{l=1}}return{value:i,done:h}}}(L,G,O),!0),C}var M={};function N(){}function Q(){}function D(){}i=Object.getPrototypeOf;var A=[][y]?i(i([][y]())):(t(i={},y,function(){return this}),i),b=D.prototype=N.prototype=Object.create(A);function z(L){return Object.setPrototypeOf?Object.setPrototypeOf(L,D):(L.__proto__=D,t(L,B,"GeneratorFunction")),L.prototype=Object.create(b),L}return Q.prototype=D,t(b,"constructor",D),t(D,"constructor",Q),Q.displayName="GeneratorFunction",t(D,B,"GeneratorFunction"),t(b),t(b,B,"Generator"),t(b,y,function(){return this}),t(b,"toString",function(){return"[object Generator]"}),(e.exports=r=function(){return{w:k,m:z}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports})(Pi);var wi=Pi.exports,Ai={exports:{}},Li={exports:{}},ji={exports:{}};(function(e){var t=Ci,r=_i;function n(i,v){function y(k,M,N,Q){try{var D=i[k](M),A=D.value;return A instanceof t?v.resolve(A.v).then(function(b){y("next",b,N,Q)},function(b){y("throw",b,N,Q)}):v.resolve(A).then(function(b){D.value=b,N(D)},function(b){return y("throw",b,N,Q)})}catch(b){Q(b)}}var B;this.next||(r(n.prototype),r(n.prototype,typeof Symbol=="function"&&Symbol.asyncIterator||"@asyncIterator",function(){return this})),r(this,"_invoke",function(k,M,N){function Q(){return new v(function(D,A){y(k,N,D,A)})}return B=B?B.then(Q,Q):Q()},!0)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports})(ji);var ki=ji.exports;(function(e){var t=wi,r=ki;function n(i,v,y,B,k){return new r(t().w(i,v,y,B),k||Promise)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports})(Li);var Oi=Li.exports;(function(e){var t=Oi;function r(n,i,v,y,B){var k=t(n,i,v,y,B);return k.next().then(function(M){return M.done?M.value:k.next()})}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports})(Ai);var hu=Ai.exports,Ei={exports:{}};(function(e){function t(r){var n=Object(r),i=[];for(var v in n)i.unshift(v);return function y(){for(;i.length;)if((v=i.pop())in n)return y.value=v,y.done=!1,y;return y.done=!0,y}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Ei);var vu=Ei.exports,Mi={exports:{}};(function(e){var t=Le().default;function r(n){if(n!=null){var i=n[typeof Symbol=="function"&&Symbol.iterator||"@@iterator"],v=0;if(i)return i.call(n);if(typeof n.next=="function")return n;if(!isNaN(n.length))return{next:function(){return n&&v>=n.length&&(n=void 0),{value:n&&n[v++],done:!n}}}}throw new TypeError(t(n)+" is not iterable")}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports})(Mi);var gu=Mi.exports;(function(e){var t=Ci,r=wi,n=hu,i=Oi,v=ki,y=vu,B=gu;function k(){var M=r(),N=M.m(k),Q=(Object.getPrototypeOf?Object.getPrototypeOf(N):N.__proto__).constructor;function D(z){var L=typeof z=="function"&&z.constructor;return!!L&&(L===Q||(L.displayName||L.name)==="GeneratorFunction")}var A={throw:1,return:2,break:3,continue:3};function b(z){var L,Y;return function(G){L||(L={stop:function(){return Y(G.a,2)},catch:function(){return G.v},abrupt:function(P,C){return Y(G.a,A[P],C)},delegateYield:function(P,C,F){return L.resultName=C,Y(G.d,B(P),F)},finish:function(P){return Y(G.f,P)}},Y=function(P,C,F){G.p=L.prev,G.n=L.next;try{return P(C,F)}finally{L.next=G.n}}),L.resultName&&(L[L.resultName]=G.v,L.resultName=void 0),L.sent=G.v,L.next=G.n;try{return z.call(this,L)}finally{G.p=L.prev,G.n=L.next}}}return(e.exports=k=function(){return{wrap:function(Y,G,O,P){return M.w(b(Y),G,O,P&&P.reverse())},isGeneratorFunction:D,mark:M.m,awrap:function(Y,G){return new t(Y,G)},AsyncIterator:v,async:function(Y,G,O,P,C){return(D(G)?i:n)(b(Y),G,O,P,C)},keys:y,values:B}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=k,e.exports.__esModule=!0,e.exports.default=e.exports})(bi);var mu=bi.exports,Ut=mu(),yu=Ut;try{regeneratorRuntime=Ut}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=Ut:Function("r","regeneratorRuntime = r")(Ut)}const bu=Pt(wo);var jr={},Qn;function xu(){return Qn||(Qn=1,function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t(Se),n=t(_t),i=At,v=_e(),y=function A(b){(0,n.default)(this,A),this.colorProcessor(b);var z={fill:[0,0,0,1],stroke:[0,0,0,0],opacity:1,lineCap:null,lineJoin:null,lineDash:null,lineDashOffset:null,shadowBlur:0,shadowColor:[0,0,0,0],shadowOffsetX:0,shadowOffsetY:0,lineWidth:0,graphCenter:null,scale:null,rotate:null,translate:null,hoverCursor:"pointer",fontStyle:"normal",fontVarient:"normal",fontWeight:"normal",fontSize:10,fontFamily:"Arial",textAlign:"center",textBaseline:"middle",gradientColor:null,gradientType:"linear",gradientParams:null,gradientWith:"stroke",gradientStops:"auto",colors:null};Object.assign(this,z,b)};e.default=y,y.prototype.colorProcessor=function(A){var b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,z=b?i.getColorFromRgbValue:i.getRgbaValue,L=["fill","stroke","shadowColor"],Y=Object.keys(A),G=Y.filter(function(F){return L.find(function(_){return _===F})});G.forEach(function(F){return A[F]=z(A[F])});var O=A.gradientColor,P=A.colors;if(O&&(A.gradientColor=O.map(function(F){return z(F)})),P){var C=Object.keys(P);C.forEach(function(F){return P[F]=z(P[F])})}},y.prototype.initStyle=function(A){B(A,this),M(A,this),N(A,this)};function B(A,b){A.save();var z=b.graphCenter,L=b.rotate,Y=b.scale,G=b.translate;z instanceof Array&&(A.translate.apply(A,(0,r.default)(z)),L&&A.rotate(L*Math.PI/180),Y instanceof Array&&A.scale.apply(A,(0,r.default)(Y)),G&&A.translate.apply(A,(0,r.default)(G)),A.translate(-z[0],-z[1]))}var k=["lineCap","lineJoin","lineDashOffset","shadowOffsetX","shadowOffsetY","lineWidth","textAlign","textBaseline"];function M(A,b){var z=b.fill,L=b.stroke,Y=b.shadowColor,G=b.opacity;k.forEach(function(a){(a||typeof a=="number")&&(A[a]=b[a])}),z=(0,r.default)(z),L=(0,r.default)(L),Y=(0,r.default)(Y),z[3]*=G,L[3]*=G,Y[3]*=G,A.fillStyle=(0,i.getColorFromRgbValue)(z),A.strokeStyle=(0,i.getColorFromRgbValue)(L),A.shadowColor=(0,i.getColorFromRgbValue)(Y);var O=b.lineDash,P=b.shadowBlur;O&&(O=O.map(function(a){return a>=0?a:0}),A.setLineDash(O)),typeof P=="number"&&(A.shadowBlur=P>0?P:.001);var C=b.fontStyle,F=b.fontVarient,_=b.fontWeight,p=b.fontSize,d=b.fontFamily;A.font=C+" "+F+" "+_+" "+p+"px "+d}function N(A,b){if(Q(b)){var z=b.gradientColor,L=b.gradientParams,Y=b.gradientType,G=b.gradientWith,O=b.gradientStops,P=b.opacity;z=z.map(function(F){var _=F[3]*P,p=(0,r.default)(F);return p[3]=_,p}),z=z.map(function(F){return(0,i.getColorFromRgbValue)(F)}),O==="auto"&&(O=D(z));var C=A["create".concat(Y.slice(0,1).toUpperCase()+Y.slice(1),"Gradient")].apply(A,(0,r.default)(L));O.forEach(function(F,_){return C.addColorStop(F,z[_])}),A["".concat(G,"Style")]=C}}function Q(A){var b=A.gradientColor,z=A.gradientParams,L=A.gradientType,Y=A.gradientWith,G=A.gradientStops;if(!b||!z)return!1;if(b.length===1)return console.warn("The gradient needs to provide at least two colors"),!1;if(L!=="linear"&&L!=="radial")return console.warn("GradientType only supports linear or radial, current value is "+L),!1;var O=z.length;return L==="linear"&&O!==4||L==="radial"&&O!==6?(console.warn("The expected length of gradientParams is "+(L==="linear"?"4":"6")),!1):Y!=="fill"&&Y!=="stroke"?(console.warn("GradientWith only supports fill or stroke, current value is "+Y),!1):G!=="auto"&&!(G instanceof Array)?(console.warn("gradientStops only supports 'auto' or Number Array ([0, .5, 1]), current value is "+G),!1):!0}function D(A){var b=1/(A.length-1);return A.map(function(z,L){return b*L})}y.prototype.restoreTransform=function(A){A.restore()},y.prototype.update=function(A){this.colorProcessor(A),Object.assign(this,A)},y.prototype.getStyle=function(){var A=(0,v.deepClone)(this,!0);return this.colorProcessor(A,!0),A}}(jr)),jr}var kr={},Or={},Hn;function Cu(){return Hn||(Hn=1,function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.easeInOutBounce=e.easeOutBounce=e.easeInBounce=e.easeInOutElastic=e.easeOutElastic=e.easeInElastic=e.easeInOutBack=e.easeOutBack=e.easeInBack=e.easeInOutQuint=e.easeOutQuint=e.easeInQuint=e.easeInOutQuart=e.easeOutQuart=e.easeInQuart=e.easeInOutCubic=e.easeOutCubic=e.easeInCubic=e.easeInOutQuad=e.easeOutQuad=e.easeInQuad=e.easeInOutSine=e.easeOutSine=e.easeInSine=e.linear=void 0;var t=[[[0,1],"",[.33,.67]],[[1,0],[.67,.33]]];e.linear=t;var r=[[[0,1]],[[.538,.564],[.169,.912],[.88,.196]],[[1,0]]];e.easeInSine=r;var n=[[[0,1]],[[.444,.448],[.169,.736],[.718,.16]],[[1,0]]];e.easeOutSine=n;var i=[[[0,1]],[[.5,.5],[.2,1],[.8,0]],[[1,0]]];e.easeInOutSine=i;var v=[[[0,1]],[[.55,.584],[.231,.904],[.868,.264]],[[1,0]]];e.easeInQuad=v;var y=[[[0,1]],[[.413,.428],[.065,.816],[.76,.04]],[[1,0]]];e.easeOutQuad=y;var B=[[[0,1]],[[.5,.5],[.3,.9],[.7,.1]],[[1,0]]];e.easeInOutQuad=B;var k=[[[0,1]],[[.679,.688],[.366,.992],[.992,.384]],[[1,0]]];e.easeInCubic=k;var M=[[[0,1]],[[.321,.312],[.008,.616],[.634,.008]],[[1,0]]];e.easeOutCubic=M;var N=[[[0,1]],[[.5,.5],[.3,1],[.7,0]],[[1,0]]];e.easeInOutCubic=N;var Q=[[[0,1]],[[.812,.74],[.611,.988],[1.013,.492]],[[1,0]]];e.easeInQuart=Q;var D=[[[0,1]],[[.152,.244],[.001,.448],[.285,-.02]],[[1,0]]];e.easeOutQuart=D;var A=[[[0,1]],[[.5,.5],[.4,1],[.6,0]],[[1,0]]];e.easeInOutQuart=A;var b=[[[0,1]],[[.857,.856],[.714,1],[1,.712]],[[1,0]]];e.easeInQuint=b;var z=[[[0,1]],[[.108,.2],[.001,.4],[.214,-.012]],[[1,0]]];e.easeOutQuint=z;var L=[[[0,1]],[[.5,.5],[.5,1],[.5,0]],[[1,0]]];e.easeInOutQuint=L;var Y=[[[0,1]],[[.667,.896],[.38,1.184],[.955,.616]],[[1,0]]];e.easeInBack=Y;var G=[[[0,1]],[[.335,.028],[.061,.22],[.631,-.18]],[[1,0]]];e.easeOutBack=G;var O=[[[0,1]],[[.5,.5],[.4,1.4],[.6,-.4]],[[1,0]]];e.easeInOutBack=O;var P=[[[0,1]],[[.474,.964],[.382,.988],[.557,.952]],[[.619,1.076],[.565,1.088],[.669,1.08]],[[.77,.916],[.712,.924],[.847,.904]],[[.911,1.304],[.872,1.316],[.961,1.34]],[[1,0]]];e.easeInElastic=P;var C=[[[0,1]],[[.073,-.32],[.034,-.328],[.104,-.344]],[[.191,.092],[.11,.06],[.256,.08]],[[.31,-.076],[.26,-.068],[.357,-.076]],[[.432,.032],[.362,.028],[.683,-.004]],[[1,0]]];e.easeOutElastic=C;var F=[[[0,1]],[[.21,.94],[.167,.884],[.252,.98]],[[.299,1.104],[.256,1.092],[.347,1.108]],[[.5,.496],[.451,.672],[.548,.324]],[[.696,-.108],[.652,-.112],[.741,-.124]],[[.805,.064],[.756,.012],[.866,.096]],[[1,0]]];e.easeInOutElastic=F;var _=[[[0,1]],[[.148,1],[.075,.868],[.193,.848]],[[.326,1],[.276,.836],[.405,.712]],[[.6,1],[.511,.708],[.671,.348]],[[1,0]]];e.easeInBounce=_;var p=[[[0,1]],[[.357,.004],[.27,.592],[.376,.252]],[[.604,-.004],[.548,.312],[.669,.184]],[[.82,0],[.749,.184],[.905,.132]],[[1,0]]];e.easeOutBounce=p;var d=[[[0,1]],[[.102,1],[.05,.864],[.117,.86]],[[.216,.996],[.208,.844],[.227,.808]],[[.347,.996],[.343,.8],[.48,.292]],[[.635,.004],[.511,.676],[.656,.208]],[[.787,0],[.76,.2],[.795,.144]],[[.905,-.004],[.899,.164],[.944,.144]],[[1,0]]];e.easeInOutBounce=d;var a=new Map([["linear",t],["easeInSine",r],["easeOutSine",n],["easeInOutSine",i],["easeInQuad",v],["easeOutQuad",y],["easeInOutQuad",B],["easeInCubic",k],["easeOutCubic",M],["easeInOutCubic",N],["easeInQuart",Q],["easeOutQuart",D],["easeInOutQuart",A],["easeInQuint",b],["easeOutQuint",z],["easeInOutQuint",L],["easeInBack",Y],["easeOutBack",G],["easeInOutBack",O],["easeInElastic",P],["easeOutElastic",C],["easeInOutElastic",F],["easeInBounce",_],["easeOutBounce",p],["easeInOutBounce",d]]);e.default=a}(Or)),Or}var Yn;function Pu(){return Yn||(Yn=1,function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),e.transition=y,e.injectNewCurve=O,e.default=void 0;var r=t(Ae()),n=t(Le()),i=t(Cu()),v="linear";function y(C){var F=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null,_=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null,p=arguments.length>3&&arguments[3]!==void 0?arguments[3]:30,d=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!1;if(!B.apply(void 0,arguments))return!1;try{var a=k(C),u=M(a,p);return!d||typeof _=="number"?b(F,_,u):G(F,_,u)}catch{return console.warn("Transition parameter may be abnormal!"),[_]}}function B(C){var F=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,_=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,p=arguments.length>3&&arguments[3]!==void 0?arguments[3]:30;if(!C||F===!1||_===!1||!p)return console.error("transition: Missing Parameters!"),!1;if((0,n.default)(F)!==(0,n.default)(_))return console.error("transition: Inconsistent Status Types!"),!1;var d=(0,n.default)(_);return d==="string"||d==="boolean"||!C.length?(console.error("transition: Unsupported Data Type of State!"),!1):(!i.default.has(C)&&!(C instanceof Array)&&console.warn("transition: Transition curve not found, default curve will be used!"),!0)}function k(C){var F="";return i.default.has(C)?F=i.default.get(C):C instanceof Array?F=C:F=i.default.get(v),F}function M(C,F){var _=1/(F-1),p=new Array(F).fill(0).map(function(a,u){return u*_}),d=p.map(function(a){return N(C,a)});return d}function N(C,F){var _=Q(C,F),p=D(_,F);return A(_,p)}function Q(C,F){var _=C.length-1,p="",d="";C.findIndex(function(h,R){if(R!==_){p=h,d=C[R+1];var W=p[0][0],o=d[0][0];return F>=W&&F<o}});var a=p[0],u=p[2]||p[0],l=d[1]||d[0],s=d[0];return[a,u,l,s]}function D(C,F){var _=C[0][0],p=C[3][0],d=p-_,a=F-_;return a/d}function A(C,F){var _=(0,r.default)(C,4),p=(0,r.default)(_[0],2),d=p[1],a=(0,r.default)(_[1],2),u=a[1],l=(0,r.default)(_[2],2),s=l[1],h=(0,r.default)(_[3],2),R=h[1],W=Math.pow,o=1-F,w=d*W(o,3),g=3*u*F*W(o,2),T=3*s*W(F,2)*o,U=R*W(F,3);return 1-(w+g+T+U)}function b(C,F,_){var p="object";return typeof C=="number"&&(p="number"),C instanceof Array&&(p="array"),p==="number"?z(C,F,_):p==="array"?L(C,F,_):p==="object"?Y(C,F,_):_.map(function(d){return F})}function z(C,F,_){var p=F-C;return _.map(function(d){return C+p*d})}function L(C,F,_){var p=F.map(function(d,a){return typeof d!="number"?!1:d-C[a]});return _.map(function(d){return p.map(function(a,u){return a===!1?F[u]:C[u]+a*d})})}function Y(C,F,_){var p=Object.keys(F),d=p.map(function(l){return C[l]}),a=p.map(function(l){return F[l]}),u=L(d,a,_);return u.map(function(l){var s={};return l.forEach(function(h,R){return s[p[R]]=h}),s})}function G(C,F,_){var p=b(C,F,_),d=function(s){var h=C[s],R=F[s];if((0,n.default)(R)!=="object")return"continue";var W=G(h,R,_);p.forEach(function(o,w){return o[s]=W[w]})};for(var a in F)var u=d(a);return p}function O(C,F){if(!C||!F){console.error("InjectNewCurve Missing Parameters!");return}i.default.set(C,F)}var P=y;e.default=P}(kr)),kr}var Xn;function Su(){return Xn||(Xn=1,function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t(yu),n=t(bu),i=t(Le()),v=t(Se),y=t(_t),B=t(xu()),k=t(Pu()),M=_e(),N=function D(A,b){(0,y.default)(this,D),b=(0,M.deepClone)(b,!0);var z={visible:!0,drag:!1,hover:!1,index:1,animationDelay:0,animationFrame:30,animationCurve:"linear",animationPause:!1,hoverRect:null,mouseEnter:null,mouseOuter:null,click:null},L={status:"static",animationRoot:[],animationKeys:[],animationFrameState:[],cache:{}};b.shape||(b.shape={}),b.style||(b.style={});var Y=Object.assign({},A.shape,b.shape);Object.assign(z,b,L),Object.assign(this,A,z),this.shape=Y,this.style=new B.default(b.style),this.addedProcessor()};e.default=N,N.prototype.addedProcessor=function(){typeof this.setGraphCenter=="function"&&this.setGraphCenter(null,this),typeof this.added=="function"&&this.added(this)},N.prototype.drawProcessor=function(D,A){var b=D.ctx;A.style.initStyle(b),typeof this.beforeDraw=="function"&&this.beforeDraw(this,D),A.draw(D,A),typeof this.drawed=="function"&&this.drawed(this,D),A.style.restoreTransform(b)},N.prototype.hoverCheckProcessor=function(D,A){var b=A.hoverRect,z=A.style,L=A.hoverCheck,Y=z.graphCenter,G=z.rotate,O=z.scale,P=z.translate;return Y&&(G&&(D=(0,M.getRotatePointPos)(-G,D,Y)),O&&(D=(0,M.getScalePointPos)(O.map(function(C){return 1/C}),D,Y)),P&&(D=(0,M.getTranslatePointPos)(P.map(function(C){return C*-1}),D))),b?M.checkPointIsInRect.apply(void 0,[D].concat((0,v.default)(b))):L(D,this)},N.prototype.moveProcessor=function(D){this.move(D,this),typeof this.beforeMove=="function"&&this.beforeMove(D,this),typeof this.setGraphCenter=="function"&&this.setGraphCenter(D,this),typeof this.moved=="function"&&this.moved(D,this)},N.prototype.attr=function(D){var A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:void 0;if(!D||A===void 0)return!1;var b=(0,i.default)(this[D])==="object";b&&(A=(0,M.deepClone)(A,!0));var z=this.render;D==="style"?this.style.update(A):b?Object.assign(this[D],A):this[D]=A,D==="index"&&z.sortGraphsByIndex(),z.drawAllGraph()},N.prototype.animation=function(){var D=(0,n.default)(r.default.mark(function A(b,z){var L,Y,G,O,P,C,F,_,p,d=arguments;return r.default.wrap(function(u){for(;;)switch(u.prev=u.next){case 0:if(L=d.length>2&&d[2]!==void 0?d[2]:!1,!(b!=="shape"&&b!=="style")){u.next=4;break}return console.error("Only supported shape and style animation!"),u.abrupt("return");case 4:if(z=(0,M.deepClone)(z,!0),b==="style"&&this.style.colorProcessor(z),Y=this[b],G=Object.keys(z),O={},G.forEach(function(l){return O[l]=Y[l]}),P=this.animationFrame,C=this.animationCurve,F=this.animationDelay,_=(0,k.default)(C,O,z,P,!0),this.animationRoot.push(Y),this.animationKeys.push(G),this.animationFrameState.push(_),!L){u.next=17;break}return u.abrupt("return");case 17:if(!(F>0)){u.next=20;break}return u.next=20,Q(F);case 20:return p=this.render,u.abrupt("return",new Promise(function(){var l=(0,n.default)(r.default.mark(function s(h){return r.default.wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return W.next=2,p.launchAnimation();case 2:h();case 3:case"end":return W.stop()}},s)}));return function(s){return l.apply(this,arguments)}}()));case 22:case"end":return u.stop()}},A,this)}));return function(A,b){return D.apply(this,arguments)}}(),N.prototype.turnNextAnimationFrame=function(D){var A=this.animationDelay,b=this.animationRoot,z=this.animationKeys,L=this.animationFrameState,Y=this.animationPause;Y||Date.now()-D<A||(b.forEach(function(G,O){z[O].forEach(function(P){G[P]=L[O][0][P]})}),L.forEach(function(G,O){G.shift();var P=G.length===0;P&&(b[O]=null),P&&(z[O]=null)}),this.animationFrameState=L.filter(function(G){return G.length}),this.animationRoot=b.filter(function(G){return G}),this.animationKeys=z.filter(function(G){return G}))},N.prototype.animationEnd=function(){var D=this.animationFrameState,A=this.animationKeys,b=this.animationRoot,z=this.render;return b.forEach(function(L,Y){var G=A[Y],O=D[Y].pop();G.forEach(function(P){return L[P]=O[P]})}),this.animationFrameState=[],this.animationKeys=[],this.animationRoot=[],z.drawAllGraph()},N.prototype.pauseAnimation=function(){this.attr("animationPause",!0)},N.prototype.playAnimation=function(){var D=this.render;return this.attr("animationPause",!1),new Promise(function(){var A=(0,n.default)(r.default.mark(function b(z){return r.default.wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,D.launchAnimation();case 2:z();case 3:case"end":return Y.stop()}},b)}));return function(b){return A.apply(this,arguments)}}())},N.prototype.delProcessor=function(D){var A=this,b=D.graphs,z=b.findIndex(function(L){return L===A});z!==-1&&(typeof this.beforeDelete=="function"&&this.beforeDelete(this),b.splice(z,1,null),typeof this.deleted=="function"&&this.deleted(this))};function Q(D){return new Promise(function(A){setTimeout(A,D)})}}(Lr)),Lr}var Zn;function _u(){return Zn||(Zn=1,function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t(Ee),n=t(Se),i=t(_t),v=t(At),y=t(en()),B=_e(),k=t(tn()),M=t(Su());function N(G,O){var P=Object.keys(G);if(Object.getOwnPropertySymbols){var C=Object.getOwnPropertySymbols(G);O&&(C=C.filter(function(F){return Object.getOwnPropertyDescriptor(G,F).enumerable})),P.push.apply(P,C)}return P}function Q(G){for(var O=1;O<arguments.length;O++){var P=arguments[O]!=null?arguments[O]:{};O%2?N(P,!0).forEach(function(C){(0,r.default)(G,C,P[C])}):Object.getOwnPropertyDescriptors?Object.defineProperties(G,Object.getOwnPropertyDescriptors(P)):N(P).forEach(function(C){Object.defineProperty(G,C,Object.getOwnPropertyDescriptor(P,C))})}return G}var D=function G(O){if((0,i.default)(this,G),!O){console.error("CRender Missing parameters!");return}var P=O.getContext("2d"),C=O.clientWidth,F=O.clientHeight,_=[C,F];O.setAttribute("width",C),O.setAttribute("height",F),this.ctx=P,this.area=_,this.animationStatus=!1,this.graphs=[],this.color=v.default,this.bezierCurve=y.default,O.addEventListener("mousedown",z.bind(this)),O.addEventListener("mousemove",L.bind(this)),O.addEventListener("mouseup",Y.bind(this))};e.default=D,D.prototype.clearArea=function(){var G,O=this.area;(G=this.ctx).clearRect.apply(G,[0,0].concat((0,n.default)(O)))},D.prototype.add=function(){var G=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},O=G.name;if(!O){console.error("add Missing parameters!");return}var P=k.default.get(O);if(!P){console.warn("No corresponding graph configuration found!");return}var C=new M.default(P,G);if(C.validator(C))return C.render=this,this.graphs.push(C),this.sortGraphsByIndex(),this.drawAllGraph(),C},D.prototype.sortGraphsByIndex=function(){var G=this.graphs;G.sort(function(O,P){if(O.index>P.index)return 1;if(O.index===P.index)return 0;if(O.index<P.index)return-1})},D.prototype.delGraph=function(G){typeof G.delProcessor=="function"&&(G.delProcessor(this),this.graphs=this.graphs.filter(function(O){return O}),this.drawAllGraph())},D.prototype.delAllGraph=function(){var G=this;this.graphs.forEach(function(O){return O.delProcessor(G)}),this.graphs=this.graphs.filter(function(O){return O}),this.drawAllGraph()},D.prototype.drawAllGraph=function(){var G=this;this.clearArea(),this.graphs.filter(function(O){return O&&O.visible}).forEach(function(O){return O.drawProcessor(G,O)})},D.prototype.launchAnimation=function(){var G=this,O=this.animationStatus;if(!O)return this.animationStatus=!0,new Promise(function(P){A.call(G,function(){G.animationStatus=!1,P()},Date.now())})};function A(G,O){var P=this.graphs;if(!b(P)){G();return}P.forEach(function(C){return C.turnNextAnimationFrame(O)}),this.drawAllGraph(),requestAnimationFrame(A.bind(this,G,O))}function b(G){return G.find(function(O){return!O.animationPause&&O.animationFrameState.length})}function z(G){var O=this.graphs,P=O.find(function(C){return C.status==="hover"});P&&(P.status="active")}function L(G){var O=G.offsetX,P=G.offsetY,C=[O,P],F=this.graphs,_=F.find(function(s){return s.status==="active"||s.status==="drag"});if(_){if(!_.drag)return;if(typeof _.move!="function"){console.error("No move method is provided, cannot be dragged!");return}_.moveProcessor(G),_.status="drag";return}var p=F.find(function(s){return s.status==="hover"}),d=F.filter(function(s){return s.hover&&(typeof s.hoverCheck=="function"||s.hoverRect)}),a=d.find(function(s){return s.hoverCheckProcessor(C,s)});a?document.body.style.cursor=a.style.hoverCursor:document.body.style.cursor="default";var u=!1,l=!1;if(p&&(u=typeof p.mouseOuter=="function"),a&&(l=typeof a.mouseEnter=="function"),!(!a&&!p)){if(!a&&p){u&&p.mouseOuter(G,p),p.status="static";return}if(!(a&&a===p)){if(a&&!p){l&&a.mouseEnter(G,a),a.status="hover";return}a&&p&&a!==p&&(u&&p.mouseOuter(G,p),p.status="static",l&&a.mouseEnter(G,a),a.status="hover")}}}function Y(G){var O=this.graphs,P=O.find(function(F){return F.status==="active"}),C=O.find(function(F){return F.status==="drag"});P&&typeof P.click=="function"&&P.click(G,P),O.forEach(function(F){return F&&(F.status="static")}),P&&(P.status="hover"),C&&(C.status="hover")}D.prototype.clone=function(G){var O=G.style.getStyle(),P=Q({},G,{style:O});return delete P.render,P=(0,B.deepClone)(P,!0),this.add(P)}}(hr)),hr}(function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"CRender",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(e,"extendNewGraph",{enumerable:!0,get:function(){return n.extendNewGraph}}),e.default=void 0;var r=t(_u()),n=tn(),i=r.default;e.default=i})(Kr);var xe={},Ri=be;Object.defineProperty(xe,"__esModule",{value:!0});xe.filterNonNumber=$i;var Fi=xe.deepMerge=rn;xe.mulAdd=nn;xe.mergeSameStackData=wu;xe.getTwoPointDistance=vt;xe.getLinearGradientColor=Au;var Kn=xe.getPolylineLength=Lu;xe.getPointToLineDistance=ju;xe.initNeedSeries=ku;xe.radianToAngle=Ou;var Zt=Ri(Se),Jn=Ri(Le()),Ti=_e();function $i(e){return e.filter(function(t){return typeof t=="number"})}function rn(e,t){for(var r in t){if(e[r]&&(0,Jn.default)(e[r])==="object"){rn(e[r],t[r]);continue}if((0,Jn.default)(t[r])==="object"){e[r]=(0,Ti.deepClone)(t[r],!0);continue}e[r]=t[r]}return e}function nn(e){return e=$i(e),e.reduce(function(t,r){return t+r},0)}function wu(e,t){var r=e.stack;if(!r)return(0,Zt.default)(e.data);var n=t.filter(function(B){var k=B.stack;return k===r}),i=n.findIndex(function(B){var k=B.data;return k===e.data}),v=n.splice(0,i+1).map(function(B){var k=B.data;return k}),y=v[0].length;return new Array(y).fill(0).map(function(B,k){return nn(v.map(function(M){return M[k]}))})}function vt(e,t){var r=Math.abs(e[0]-t[0]),n=Math.abs(e[1]-t[1]);return Math.sqrt(r*r+n*n)}function Au(e,t,r,n){if(!(!e||!t||!r||!n.length)){var i=n;typeof i=="string"&&(i=[n,n]);var v=e.createLinearGradient.apply(e,(0,Zt.default)(t).concat((0,Zt.default)(r))),y=1/(i.length-1);return i.forEach(function(B,k){return v.addColorStop(y*k,B)}),v}}function Lu(e){var t=new Array(e.length-1).fill(0).map(function(n,i){return[e[i],e[i+1]]}),r=t.map(function(n){return vt.apply(void 0,(0,Zt.default)(n))});return nn(r)}function ju(e,t,r){var n=vt(e,t),i=vt(e,r),v=vt(t,r);return .5*Math.sqrt((n+i+v)*(n+i-v)*(n+v-i)*(i+v-n))/v}function ku(e,t,r){return e=e.filter(function(n){var i=n.type;return i===r}),e=e.map(function(n){return rn((0,Ti.deepClone)(t,!0),n)}),e.filter(function(n){var i=n.show;return i})}function Ou(e){return e/Math.PI*180}var Di=be,Eu=Di(Ee),ea=Di(Se),nr=Kr,Mu=tn(),bt=_e(),Ru=At,Fu=xe;function ta(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function ra(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?ta(Object(r),!0).forEach(function(n){(0,Eu.default)(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ta(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}var Tu={shape:{rx:0,ry:0,ir:0,or:0,startAngle:0,endAngle:0,clockWise:!0},validator:function(t){var r=t.shape,n=["rx","ry","ir","or","startAngle","endAngle"];return n.find(function(i){return typeof r[i]!="number"})?(console.error("Pie shape configuration is abnormal!"),!1):!0},draw:function(t,r){var n=t.ctx,i=r.shape;n.beginPath();var v=i.rx,y=i.ry,B=i.ir,k=i.or,M=i.startAngle,N=i.endAngle,Q=i.clockWise;v=parseInt(v)+.5,y=parseInt(y)+.5,n.arc(v,y,B>0?B:0,M,N,!Q);var D=(0,bt.getCircleRadianPoint)(v,y,k,N).map(function(b){return parseInt(b)+.5}),A=(0,bt.getCircleRadianPoint)(v,y,B,M).map(function(b){return parseInt(b)+.5});n.lineTo.apply(n,(0,ea.default)(D)),n.arc(v,y,k>0?k:0,N,M,Q),n.lineTo.apply(n,(0,ea.default)(A)),n.closePath(),n.stroke(),n.fill()}},$u={shape:{rx:0,ry:0,r:0,startAngle:0,endAngle:0,gradientStartAngle:null,gradientEndAngle:null},validator:function(t){var r=t.shape,n=["rx","ry","r","startAngle","endAngle"];return n.find(function(i){return typeof r[i]!="number"})?(console.error("AgArc shape configuration is abnormal!"),!1):!0},draw:function(t,r){var n=t.ctx,i=r.shape,v=r.style,y=v.gradient;y=y.map(function(_){return(0,Ru.getColorFromRgbValue)(_)}),y.length===1&&(y=[y[0],y[0]]);var B=y.length-1,k=i.gradientStartAngle,M=i.gradientEndAngle,N=i.startAngle,Q=i.endAngle,D=i.r,A=i.rx,b=i.ry;k===null&&(k=N),M===null&&(M=Q);var z=(M-k)/B;z===Math.PI*2&&(z=Math.PI*2-.001);for(var L=0;L<B;L++){n.beginPath();var Y=(0,bt.getCircleRadianPoint)(A,b,D,N+z*L),G=(0,bt.getCircleRadianPoint)(A,b,D,N+z*(L+1)),O=(0,Fu.getLinearGradientColor)(n,Y,G,[y[L],y[L+1]]),P=N+z*L,C=N+z*(L+1),F=!1;if(C>Q&&(C=Q,F=!0),n.arc(A,b,D,P,C),n.strokeStyle=O,n.stroke(),F)break}}},Du={shape:{number:[],content:"",position:[0,0],toFixed:0,rowGap:0,formatter:null},validator:function(t){var r=t.shape,n=r.number,i=r.content,v=r.position;return!(n instanceof Array)||typeof i!="string"||!(v instanceof Array)?(console.error("NumberText shape configuration is abnormal!"),!1):!0},draw:function(t,r){var n=t.ctx,i=r.shape,v=i.number,y=i.content,B=i.toFixed,k=i.rowGap,M=i.formatter,N=y.split("{nt}"),Q="";N.forEach(function(D,A){var b=v[A];typeof b!="number"&&(b=""),typeof b=="number"&&(b=b.toFixed(B),typeof M=="function"&&(b=M(b))),Q+=D+(b||"")}),Mu.text.draw({ctx:n},{shape:ra(ra({},i),{},{content:Q,rowGap:k})})}},zu={shape:{x:0,y:0,w:0,h:0},validator:function(t){var r=t.shape,n=r.x,i=r.y,v=r.w,y=r.h;return typeof n!="number"||typeof i!="number"||typeof v!="number"||typeof y!="number"?(console.error("lineIcon shape configuration is abnormal!"),!1):!0},draw:function(t,r){var n=t.ctx,i=r.shape;n.beginPath();var v=i.x,y=i.y,B=i.w,k=i.h,M=k/2;n.strokeStyle=n.fillStyle,n.moveTo(v,y+M),n.lineTo(v+B,y+M),n.lineWidth=1,n.stroke(),n.beginPath();var N=M-5*2;N<=0&&(N=3),n.arc(v+B/2,y+M,N,0,Math.PI*2),n.lineWidth=5,n.stroke(),n.fillStyle="#fff",n.fill()},hoverCheck:function(t,r){var n=r.shape,i=n.x,v=n.y,y=n.w,B=n.h;return(0,bt.checkPointIsInRect)(t,i,v,y,B)},setGraphCenter:function(t,r){var n=r.shape,i=r.style,v=n.x,y=n.y,B=n.w,k=n.h;i.graphCenter=[v+B/2,y+k/2]}};(0,nr.extendNewGraph)("pie",Tu);(0,nr.extendNewGraph)("agArc",$u);(0,nr.extendNewGraph)("numberText",Du);(0,nr.extendNewGraph)("lineIcon",zu);var Er={},Ft={},Mr={},tt={},na;function Gu(){if(na)return tt;na=1,Object.defineProperty(tt,"__esModule",{value:!0}),tt.colorConfig=void 0;var e=["#37a2da","#32c5e9","#67e0e3","#9fe6b8","#ffdb5c","#ff9f7f","#fb7293","#e062ae","#e690d1","#e7bcf3","#9d96f5","#8378ea","#96bfff"];return tt.colorConfig=e,tt}var rt={},aa;function Nu(){if(aa)return rt;aa=1,Object.defineProperty(rt,"__esModule",{value:!0}),rt.gridConfig=void 0;var e={left:"10%",right:"10%",top:60,bottom:60,style:{fill:"rgba(0, 0, 0, 0)"},rLevel:-30,animationCurve:"easeOutCubic",animationFrame:30};return rt.gridConfig=e,rt}var Ie={},ia;function Bu(){if(ia)return Ie;ia=1,Object.defineProperty(Ie,"__esModule",{value:!0}),Ie.yAxisConfig=Ie.xAxisConfig=void 0;var e={name:"",show:!0,position:"bottom",nameGap:15,nameLocation:"end",nameTextStyle:{fill:"#333",fontSize:10},min:"20%",max:"20%",interval:null,minInterval:null,maxInterval:null,boundaryGap:null,splitNumber:5,axisLine:{show:!0,style:{stroke:"#333",lineWidth:1}},axisTick:{show:!0,style:{stroke:"#333",lineWidth:1}},axisLabel:{show:!0,formatter:null,style:{fill:"#333",fontSize:10,rotate:0}},splitLine:{show:!1,style:{stroke:"#d4d4d4",lineWidth:1}},rLevel:-20,animationCurve:"easeOutCubic",animationFrame:50};Ie.xAxisConfig=e;var t={name:"",show:!0,position:"left",nameGap:15,nameLocation:"end",nameTextStyle:{fill:"#333",fontSize:10},min:"20%",max:"20%",interval:null,minInterval:null,maxInterval:null,boundaryGap:null,splitNumber:5,axisLine:{show:!0,style:{stroke:"#333",lineWidth:1}},axisTick:{show:!0,style:{stroke:"#333",lineWidth:1}},axisLabel:{show:!0,formatter:null,style:{fill:"#333",fontSize:10,rotate:0}},splitLine:{show:!0,style:{stroke:"#d4d4d4",lineWidth:1}},rLevel:-20,animationCurve:"easeOutCubic",animationFrame:50};return Ie.yAxisConfig=t,Ie}var nt={},oa;function qu(){if(oa)return nt;oa=1,Object.defineProperty(nt,"__esModule",{value:!0}),nt.titleConfig=void 0;var e={show:!0,text:"",offset:[0,-20],style:{fill:"#333",fontSize:17,fontWeight:"bold",textAlign:"center",textBaseline:"bottom"},rLevel:20,animationCurve:"easeOutCubic",animationFrame:50};return nt.titleConfig=e,nt}var at={},sa;function Iu(){if(sa)return at;sa=1,Object.defineProperty(at,"__esModule",{value:!0}),at.lineConfig=void 0;var e={show:!0,name:"",stack:"",smooth:!1,xAxisIndex:0,yAxisIndex:0,data:[],lineStyle:{lineWidth:1},linePoint:{show:!0,radius:2,style:{fill:"#fff",lineWidth:1}},lineArea:{show:!1,gradient:[],style:{opacity:.5}},label:{show:!1,position:"top",offset:[0,-10],formatter:null,style:{fontSize:10}},rLevel:10,animationCurve:"easeOutCubic",animationFrame:50};return at.lineConfig=e,at}var it={},la;function Vu(){if(la)return it;la=1,Object.defineProperty(it,"__esModule",{value:!0}),it.barConfig=void 0;var e={show:!0,name:"",stack:"",shapeType:"normal",echelonOffset:10,barWidth:"auto",barGap:"30%",barCategoryGap:"20%",xAxisIndex:0,yAxisIndex:0,data:[],backgroundBar:{show:!1,width:"auto",style:{fill:"rgba(200, 200, 200, .4)"}},label:{show:!1,position:"top",offset:[0,-10],formatter:null,style:{fontSize:10}},gradient:{color:[],local:!0},barStyle:{},independentColor:!1,independentColors:[],rLevel:0,animationCurve:"easeOutCubic",animationFrame:50};return it.barConfig=e,it}var ot={},ua;function zi(){if(ua)return ot;ua=1,Object.defineProperty(ot,"__esModule",{value:!0}),ot.pieConfig=void 0;var e={show:!0,name:"",radius:"50%",center:["50%","50%"],startAngle:-Math.PI/2,roseType:!1,roseSort:!0,roseIncrement:"auto",data:[],insideLabel:{show:!1,formatter:"{percent}%",style:{fontSize:10,fill:"#fff",textAlign:"center",textBaseline:"middle"}},outsideLabel:{show:!0,formatter:"{name}",style:{fontSize:11},labelLineBendGap:"20%",labelLineEndLength:50,labelLineStyle:{lineWidth:1}},pieStyle:{},percentToFixed:0,rLevel:10,animationDelayGap:60,animationCurve:"easeOutCubic",startAnimationCurve:"easeOutBack",animationFrame:50};return ot.pieConfig=e,ot}var st={},ca;function Wu(){if(ca)return st;ca=1,Object.defineProperty(st,"__esModule",{value:!0}),st.radarAxisConfig=void 0;var e={show:!0,center:["50%","50%"],radius:"65%",startAngle:-Math.PI/2,splitNum:5,polygon:!1,axisLabel:{show:!0,labelGap:15,color:[],style:{fill:"#333"}},axisLine:{show:!0,color:[],style:{stroke:"#999",lineWidth:1}},splitLine:{show:!0,color:[],style:{stroke:"#d4d4d4",lineWidth:1}},splitArea:{show:!1,color:["#f5f5f5","#e6e6e6"],style:{}},rLevel:-10,animationCurve:"easeOutCubic",animationFrane:50};return st.radarAxisConfig=e,st}var lt={},fa;function Uu(){if(fa)return lt;fa=1,Object.defineProperty(lt,"__esModule",{value:!0}),lt.radarConfig=void 0;var e={show:!0,name:"",data:[],radarStyle:{lineWidth:1},point:{show:!0,radius:2,style:{fill:"#fff"}},label:{show:!0,offset:[0,0],labelGap:5,formatter:null,style:{fontSize:10}},rLevel:10,animationCurve:"easeOutCubic",animationFrane:50};return lt.radarConfig=e,lt}var ut={},da;function Gi(){if(da)return ut;da=1,Object.defineProperty(ut,"__esModule",{value:!0}),ut.gaugeConfig=void 0;var e={show:!0,name:"",radius:"60%",center:["50%","50%"],startAngle:-(Math.PI/4)*5,endAngle:Math.PI/4,min:0,max:100,splitNum:5,arcLineWidth:15,data:[],dataItemStyle:{},axisTick:{show:!0,tickLength:6,style:{stroke:"#999",lineWidth:1}},axisLabel:{show:!0,data:[],formatter:null,labelGap:5,style:{}},pointer:{show:!0,valueIndex:0,style:{scale:[1,1],fill:"#fb7293"}},details:{show:!1,formatter:null,offset:[0,0],valueToFixed:0,position:"center",style:{fontSize:20,fontWeight:"bold",textAlign:"center",textBaseline:"middle"}},backgroundArc:{show:!0,style:{stroke:"#e0e0e0"}},rLevel:10,animationCurve:"easeOutCubic",animationFrame:50};return ut.gaugeConfig=e,ut}var ct={},pa;function Qu(){if(pa)return ct;pa=1,Object.defineProperty(ct,"__esModule",{value:!0}),ct.legendConfig=void 0;var e={show:!0,orient:"horizontal",left:"auto",right:"auto",top:"auto",bottom:"auto",itemGap:10,iconWidth:25,iconHeight:10,selectAble:!0,data:[],textStyle:{fontFamily:"Arial",fontSize:13,fill:"#000"},iconStyle:{},textUnselectedStyle:{fontFamily:"Arial",fontSize:13,fill:"#999"},iconUnselectedStyle:{fill:"#999"},rLevel:20,animationCurve:"easeOutCubic",animationFrame:50};return ct.legendConfig=e,ct}var ha;function Re(){return ha||(ha=1,function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.changeDefaultConfig=b,Object.defineProperty(e,"colorConfig",{enumerable:!0,get:function(){return t.colorConfig}}),Object.defineProperty(e,"gridConfig",{enumerable:!0,get:function(){return r.gridConfig}}),Object.defineProperty(e,"xAxisConfig",{enumerable:!0,get:function(){return n.xAxisConfig}}),Object.defineProperty(e,"yAxisConfig",{enumerable:!0,get:function(){return n.yAxisConfig}}),Object.defineProperty(e,"titleConfig",{enumerable:!0,get:function(){return i.titleConfig}}),Object.defineProperty(e,"lineConfig",{enumerable:!0,get:function(){return v.lineConfig}}),Object.defineProperty(e,"barConfig",{enumerable:!0,get:function(){return y.barConfig}}),Object.defineProperty(e,"pieConfig",{enumerable:!0,get:function(){return B.pieConfig}}),Object.defineProperty(e,"radarAxisConfig",{enumerable:!0,get:function(){return k.radarAxisConfig}}),Object.defineProperty(e,"radarConfig",{enumerable:!0,get:function(){return M.radarConfig}}),Object.defineProperty(e,"gaugeConfig",{enumerable:!0,get:function(){return N.gaugeConfig}}),Object.defineProperty(e,"legendConfig",{enumerable:!0,get:function(){return Q.legendConfig}}),e.keys=void 0;var t=Gu(),r=Nu(),n=Bu(),i=qu(),v=Iu(),y=Vu(),B=zi(),k=Wu(),M=Uu(),N=Gi(),Q=Qu(),D=xe,A={colorConfig:t.colorConfig,gridConfig:r.gridConfig,xAxisConfig:n.xAxisConfig,yAxisConfig:n.yAxisConfig,titleConfig:i.titleConfig,lineConfig:v.lineConfig,barConfig:y.barConfig,pieConfig:B.pieConfig,radarAxisConfig:k.radarAxisConfig,radarConfig:M.radarConfig,gaugeConfig:N.gaugeConfig,legendConfig:Q.legendConfig};function b(L,Y){if(!A["".concat(L,"Config")]){console.warn("Change default config Error - Invalid key!");return}(0,D.deepMerge)(A["".concat(L,"Config")],Y)}var z=["color","title","legend","xAxis","yAxis","grid","radarAxis","line","bar","pie","radar","gauge"];e.keys=z}(Mr)),Mr}var va;function Hu(){if(va)return Ft;va=1,Object.defineProperty(Ft,"__esModule",{value:!0}),Ft.mergeColor=n;var e=Re(),t=_e(),r=xe;function n(i){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},y=(0,t.deepClone)(e.colorConfig,!0),B=v.color,k=v.series;if(k||(k=[]),B||(B=[]),v.color=B=(0,r.deepMerge)(y,B),!!k.length){var M=B.length;k.forEach(function(A,b){A.color||(A.color=B[b%M])});var N=k.filter(function(A){var b=A.type;return b==="pie"});N.forEach(function(A){return A.data.forEach(function(b,z){return b.color=B[z%M]})});var Q=k.filter(function(A){var b=A.type;return b==="gauge"});Q.forEach(function(A){return A.data.forEach(function(b,z){return b.color=B[z%M]})});var D=k.filter(function(A){var b=A.type,z=A.independentColor;return b==="bar"&&z});D.forEach(function(A){A.independentColors||(A.independentColors=B)})}}return Ft}var Tt={},He={},ga;function Fe(){if(ga)return He;ga=1;var e=be;Object.defineProperty(He,"__esModule",{value:!0}),He.doUpdate=N,He.Updater=void 0;var t=e(Se),r=e(Le()),n=e(_t),i=function Q(D,A){(0,n.default)(this,Q);var b=D.chart,z=D.key,L=D.getGraphConfig;if(typeof L!="function"){console.warn("Updater need function getGraphConfig!");return}b[z]||(this.graphs=b[z]=[]),Object.assign(this,D),this.update(A)};He.Updater=i,i.prototype.update=function(Q){var D=this,A=this.graphs,b=this.beforeUpdate;if(v(this,Q),!!Q.length){var z=(0,r.default)(b);Q.forEach(function(L,Y){z==="function"&&b(A,L,Y,D);var G=A[Y];G?y(G,L,Y,D):k(A,L,Y,D)})}};function v(Q,D){var A=Q.graphs,b=Q.chart.render,z=A.length,L=D.length;if(z>L){var Y=A.splice(L);Y.forEach(function(G){return G.forEach(function(O){return b.delGraph(O)})})}}function y(Q,D,A,b){var z=b.getGraphConfig,L=b.chart.render,Y=b.beforeChange,G=z(D,b);B(Q,G,L),Q.forEach(function(O,P){var C=G[P];typeof Y=="function"&&Y(O,C),M(O,C)})}function B(Q,D,A){var b=Q.length,z=D.length;if(z>b){var L=Q.slice(-1)[0],Y=z-b,G=new Array(Y).fill(0).map(function(P){return A.clone(L)});Q.push.apply(Q,(0,t.default)(G))}else if(z<b){var O=Q.splice(z);O.forEach(function(P){return A.delGraph(P)})}}function k(Q,D,A,b){var z=b.getGraphConfig,L=b.getStartGraphConfig,Y=b.chart,G=Y.render,O=null;typeof L=="function"&&(O=L(D,b));var P=z(D,b);if(P.length){O?(Q[A]=O.map(function(F){return G.add(F)}),Q[A].forEach(function(F,_){var p=P[_];M(F,p)})):Q[A]=P.map(function(F){return G.add(F)});var C=b.afterAddGraph;typeof C=="function"&&C(Q[A])}}function M(Q,D){var A=Object.keys(D);A.forEach(function(b){b==="shape"||b==="style"?Q.animation(b,D[b],!0):Q[b]=D[b]})}function N(){var Q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},D=Q.chart,A=Q.series,b=Q.key,z=Q.getGraphConfig,L=Q.getStartGraphConfig,Y=Q.beforeChange,G=Q.beforeUpdate,O=Q.afterAddGraph;D[b]?D[b].update(A):D[b]=new i({chart:D,key:b,getGraphConfig:z,getStartGraphConfig:L,beforeChange:Y,beforeUpdate:G,afterAddGraph:O},A)}return He}var ma;function Yu(){if(ma)return Tt;ma=1;var e=be;Object.defineProperty(Tt,"__esModule",{value:!0}),Tt.title=y;var t=e(Ae()),r=Fe(),n=_e(),i=Re(),v=xe;function y(N){var Q=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},D=[];Q.title&&(D[0]=(0,v.deepMerge)((0,n.deepClone)(i.titleConfig,!0),Q.title)),(0,r.doUpdate)({chart:N,series:D,key:"title",getGraphConfig:B})}function B(N,Q){var D=i.titleConfig.animationCurve,A=i.titleConfig.animationFrame,b=i.titleConfig.rLevel,z=k(N,Q),L=M(N);return[{name:"text",index:b,visible:N.show,animationCurve:D,animationFrame:A,shape:z,style:L}]}function k(N,Q){var D=N.offset,A=N.text,b=Q.chart.gridArea,z=b.x,L=b.y,Y=b.w,G=(0,t.default)(D,2),O=G[0],P=G[1];return{content:A,position:[z+Y/2+O,L+P]}}function M(N){var Q=N.style;return Q}return Tt}var $t={},ya;function Xu(){if(ya)return $t;ya=1;var e=be;Object.defineProperty($t,"__esModule",{value:!0}),$t.grid=M;var t=e(Ae()),r=e(Ee),n=Fe(),i=_e(),v=Re(),y=xe;function B(b,z){var L=Object.keys(b);if(Object.getOwnPropertySymbols){var Y=Object.getOwnPropertySymbols(b);z&&(Y=Y.filter(function(G){return Object.getOwnPropertyDescriptor(b,G).enumerable})),L.push.apply(L,Y)}return L}function k(b){for(var z=1;z<arguments.length;z++){var L=arguments[z]!=null?arguments[z]:{};z%2?B(Object(L),!0).forEach(function(Y){(0,r.default)(b,Y,L[Y])}):Object.getOwnPropertyDescriptors?Object.defineProperties(b,Object.getOwnPropertyDescriptors(L)):B(Object(L)).forEach(function(Y){Object.defineProperty(b,Y,Object.getOwnPropertyDescriptor(L,Y))})}return b}function M(b){var z=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=z.grid;L=(0,y.deepMerge)((0,i.deepClone)(v.gridConfig,!0),L||{}),(0,n.doUpdate)({chart:b,series:[L],key:"grid",getGraphConfig:N})}function N(b,z){var L=b.animationCurve,Y=b.animationFrame,G=b.rLevel,O=Q(b,z),P=A(b);return z.chart.gridArea=k({},O),[{name:"rect",index:G,animationCurve:L,animationFrame:Y,shape:O,style:P}]}function Q(b,z){var L=(0,t.default)(z.chart.render.area,2),Y=L[0],G=L[1],O=D(b.left,Y),P=D(b.right,Y),C=D(b.top,G),F=D(b.bottom,G),_=Y-O-P,p=G-C-F;return{x:O,y:C,w:_,h:p}}function D(b,z){return typeof b=="number"?b:typeof b!="string"?0:z*parseInt(b)/100}function A(b){var z=b.style;return z}return $t}var Dt={},ba;function Zu(){if(ba)return Dt;ba=1;var e=be;Object.defineProperty(Dt,"__esModule",{value:!0}),Dt.axis=b;var t=e(Le()),r=e(Ae()),n=e(Ee),i=e(Se),v=Fe(),y=Re(),B=xe,k=_e();function M(f,S){var j=Object.keys(f);if(Object.getOwnPropertySymbols){var I=Object.getOwnPropertySymbols(f);S&&(I=I.filter(function(Z){return Object.getOwnPropertyDescriptor(f,Z).enumerable})),j.push.apply(j,I)}return j}function N(f){for(var S=1;S<arguments.length;S++){var j=arguments[S]!=null?arguments[S]:{};S%2?M(Object(j),!0).forEach(function(I){(0,n.default)(f,I,j[I])}):Object.getOwnPropertyDescriptors?Object.defineProperties(f,Object.getOwnPropertyDescriptors(j)):M(Object(j)).forEach(function(I){Object.defineProperty(f,I,Object.getOwnPropertyDescriptor(j,I))})}return f}var Q={xAxisConfig:y.xAxisConfig,yAxisConfig:y.yAxisConfig},D=Math.abs,A=Math.pow;function b(f){var S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},j=S.xAxis,I=S.yAxis,Z=S.series,re=[];j&&I&&Z&&(re=z(j,I),re=L(re),re=re.filter(function(oe){var ce=oe.show;return ce}),re=Y(re),re=G(re,Z),re=R(re),re=W(re,f),re=o(re),re=g(re),re=T(re,f)),(0,v.doUpdate)({chart:f,series:re,key:"axisLine",getGraphConfig:U}),(0,v.doUpdate)({chart:f,series:re,key:"axisTick",getGraphConfig:ne}),(0,v.doUpdate)({chart:f,series:re,key:"axisLabel",getGraphConfig:X}),(0,v.doUpdate)({chart:f,series:re,key:"axisName",getGraphConfig:x}),(0,v.doUpdate)({chart:f,series:re,key:"splitLine",getGraphConfig:K}),f.axisData=re}function z(f,S){var j=[],I=[];if(f instanceof Array){var Z;(Z=j).push.apply(Z,(0,i.default)(f))}else j.push(f);if(S instanceof Array){var re;(re=I).push.apply(re,(0,i.default)(S))}else I.push(S);return j.splice(2),I.splice(2),j=j.map(function(oe,ce){return N(N({},oe),{},{index:ce,axis:"x"})}),I=I.map(function(oe,ce){return N(N({},oe),{},{index:ce,axis:"y"})}),[].concat((0,i.default)(j),(0,i.default)(I))}function L(f){var S=f.filter(function(I){var Z=I.axis;return Z==="x"}),j=f.filter(function(I){var Z=I.axis;return Z==="y"});return S=S.map(function(I){return(0,B.deepMerge)((0,k.deepClone)(y.xAxisConfig),I)}),j=j.map(function(I){return(0,B.deepMerge)((0,k.deepClone)(y.yAxisConfig),I)}),[].concat((0,i.default)(S),(0,i.default)(j))}function Y(f){var S=f.filter(function(I){var Z=I.data;return Z==="value"}),j=f.filter(function(I){var Z=I.data;return Z!=="value"});return S.forEach(function(I){typeof I.boundaryGap!="boolean"&&(I.boundaryGap=!1)}),j.forEach(function(I){typeof I.boundaryGap!="boolean"&&(I.boundaryGap=!0)}),[].concat((0,i.default)(S),(0,i.default)(j))}function G(f,S){var j=f.filter(function(Z){var re=Z.data;return re==="value"}),I=f.filter(function(Z){var re=Z.data;return re instanceof Array});return j=O(j,S),I=s(I),[].concat((0,i.default)(j),(0,i.default)(I))}function O(f,S){return f.map(function(j){var I=P(j,S),Z=_(j,I),re=(0,r.default)(Z,2),oe=re[0],ce=re[1],fe=h(oe,ce,j),he=j.axisLabel.formatter,ve=[];return oe<0&&ce>0?ve=a(oe,ce,fe):ve=u(oe,ce,fe),ve=ve.map(function(ge){return parseFloat(ge.toFixed(2))}),N(N({},j),{},{maxValue:ve.slice(-1)[0],minValue:ve[0],label:l(ve,he)})})}function P(f,S){if(S=S.filter(function(oe){var ce=oe.show,fe=oe.type;return!(ce===!1||fe==="pie")}),S.length===0)return[0,0];var j=f.index,I=f.axis;S=F(S);var Z=I+"Axis",re=S.filter(function(oe){return oe[Z]===j});return re.length||(re=S),C(re)}function C(f){if(f){var S=Math.min.apply(Math,(0,i.default)(f.map(function(I){var Z=I.data;return Math.min.apply(Math,(0,i.default)((0,B.filterNonNumber)(Z)))}))),j=Math.max.apply(Math,(0,i.default)(f.map(function(I){var Z=I.data;return Math.max.apply(Math,(0,i.default)((0,B.filterNonNumber)(Z)))})));return[S,j]}}function F(f){var S=(0,k.deepClone)(f,!0);return f.forEach(function(j,I){var Z=(0,B.mergeSameStackData)(j,f);S[I].data=Z}),S}function _(f,S){var j=f.min,I=f.max,Z=f.axis,re=(0,r.default)(S,2),oe=re[0],ce=re[1],fe=(0,t.default)(j),he=(0,t.default)(I);if(d(j)||(j=Q[Z+"AxisConfig"].min,fe="string"),d(I)||(I=Q[Z+"AxisConfig"].max,he="string"),fe==="string"){j=parseInt(oe-D(oe*parseFloat(j)/100));var ve=p(j);j=parseFloat((j/ve-.1).toFixed(1))*ve}if(he==="string"){I=parseInt(ce+D(ce*parseFloat(I)/100));var ge=p(I);I=parseFloat((I/ge+.1).toFixed(1))*ge}return[j,I]}function p(f){var S=D(f).toString(),j=S.length,I=S.replace(/0*$/g,"").indexOf("0"),Z=j-1;return I!==-1&&(Z-=I),A(10,Z)}function d(f){var S=(0,t.default)(f),j=S==="string"&&/^\d+%$/.test(f),I=S==="number";return j||I}function a(f,S,j){var I=[],Z=[],re=0,oe=0;do I.push(re-=j);while(re>f);do Z.push(oe+=j);while(oe<S);return[].concat((0,i.default)(I.reverse()),[0],(0,i.default)(Z))}function u(f,S,j){var I=[f],Z=f;do I.push(Z+=j);while(Z<S);return I}function l(f,S){return S&&(typeof S=="string"&&(f=f.map(function(j){return S.replace("{value}",j)})),typeof S=="function"&&(f=f.map(function(j,I){return S({value:j,index:I})}))),f}function s(f){return f.map(function(S){var j=S.data,I=S.axisLabel.formatter;return N(N({},S),{},{label:l(j,I)})})}function h(f,S,j){var I=j.interval,Z=j.minInterval,re=j.maxInterval,oe=j.splitNumber,ce=j.axis,fe=Q[ce+"AxisConfig"];if(typeof I!="number"&&(I=fe.interval),typeof Z!="number"&&(Z=fe.minInterval),typeof re!="number"&&(re=fe.maxInterval),typeof oe!="number"&&(oe=fe.splitNumber),typeof I=="number")return I;var he=parseInt((S-f)/(oe-1));return he.toString().length>1&&(he=parseInt(he.toString().replace(/\d$/,"0"))),he===0&&(he=1),typeof Z=="number"&&he<Z?Z:typeof re=="number"&&he>re?re:he}function R(f){var S=f.filter(function(I){var Z=I.axis;return Z==="x"}),j=f.filter(function(I){var Z=I.axis;return Z==="y"});return S[0]&&!S[0].position&&(S[0].position=y.xAxisConfig.position),S[1]&&!S[1].position&&(S[1].position=S[0].position==="bottom"?"top":"bottom"),j[0]&&!j[0].position&&(j[0].position=y.yAxisConfig.position),j[1]&&!j[1].position&&(j[1].position=j[0].position==="left"?"right":"left"),[].concat((0,i.default)(S),(0,i.default)(j))}function W(f,S){var j=S.gridArea,I=j.x,Z=j.y,re=j.w,oe=j.h;return f=f.map(function(ce){var fe=ce.position,he=[];return fe==="left"?he=[[I,Z],[I,Z+oe]].reverse():fe==="right"?he=[[I+re,Z],[I+re,Z+oe]].reverse():fe==="top"?he=[[I,Z],[I+re,Z]]:fe==="bottom"&&(he=[[I,Z+oe],[I+re,Z+oe]]),N(N({},ce),{},{linePosition:he})}),f}function o(f,S){return f.map(function(j){var I=j.axis,Z=j.linePosition,re=j.position,oe=j.label,ce=j.boundaryGap;typeof ce!="boolean"&&(ce=Q[I+"AxisConfig"].boundaryGap);var fe=oe.length,he=(0,r.default)(Z,2),ve=(0,r.default)(he[0],2),ge=ve[0],Ce=ve[1],ze=(0,r.default)(he[1],2),Ne=ze[0],Ge=ze[1],qi=I==="x"?Ne-ge:Ge-Ce,Lt=qi/(ce?fe:fe-1),sn=new Array(fe).fill(0).map(function(ud,jt){return I==="x"?[ge+Lt*(ce?jt+.5:jt),Ce]:[ge,Ce+Lt*(ce?jt+.5:jt)]}),Ii=w(I,ce,re,sn,Lt);return N(N({},j),{},{tickPosition:sn,tickLinePosition:Ii,tickGap:Lt})})}function w(f,S,j,I,Z){var re=f==="x"?1:0,oe=5;f==="x"&&j==="top"&&(oe=-5),f==="y"&&j==="left"&&(oe=-5);var ce=I.map(function(fe){var he=(0,k.deepClone)(fe);return he[re]+=oe,[(0,k.deepClone)(fe),he]});return S&&(re=f==="x"?0:1,oe=Z/2,ce.forEach(function(fe){var he=(0,r.default)(fe,2),ve=he[0],ge=he[1];ve[re]+=oe,ge[re]+=oe})),ce}function g(f,S){return f.map(function(j){var I=j.nameGap,Z=j.nameLocation,re=j.position,oe=j.linePosition,ce=(0,r.default)(oe,2),fe=ce[0],he=ce[1],ve=(0,i.default)(fe);Z==="end"&&(ve=(0,i.default)(he)),Z==="center"&&(ve[0]=(fe[0]+he[0])/2,ve[1]=(fe[1]+he[1])/2);var ge=0;re==="top"&&Z==="center"&&(ge=1),re==="bottom"&&Z==="center"&&(ge=1),re==="left"&&Z!=="center"&&(ge=1),re==="right"&&Z!=="center"&&(ge=1);var Ce=I;return re==="top"&&Z!=="end"&&(Ce*=-1),re==="left"&&Z!=="start"&&(Ce*=-1),re==="bottom"&&Z==="start"&&(Ce*=-1),re==="right"&&Z==="end"&&(Ce*=-1),ve[ge]+=Ce,N(N({},j),{},{namePosition:ve})})}function T(f,S){var j=S.gridArea,I=j.w,Z=j.h;return f.map(function(re){var oe=re.tickLinePosition,ce=re.position,fe=re.boundaryGap,he=0,ve=I;(ce==="top"||ce==="bottom")&&(he=1),(ce==="top"||ce==="bottom")&&(ve=Z),(ce==="right"||ce==="bottom")&&(ve*=-1);var ge=oe.map(function(Ce){var ze=(0,r.default)(Ce,1),Ne=ze[0],Ge=(0,i.default)(Ne);return Ge[he]+=ve,[(0,i.default)(Ne),Ge]});return fe||ge.shift(),N(N({},re),{},{splitLinePosition:ge})})}function U(f){var S=f.animationCurve,j=f.animationFrame,I=f.rLevel;return[{name:"polyline",index:I,visible:f.axisLine.show,animationCurve:S,animationFrame:j,shape:ee(f),style:J(f)}]}function ee(f){var S=f.linePosition;return{points:S}}function J(f){return f.axisLine.style}function ne(f){var S=f.animationCurve,j=f.animationFrame,I=f.rLevel,Z=ae(f),re=ue(f);return Z.map(function(oe){return{name:"polyline",index:I,visible:f.axisTick.show,animationCurve:S,animationFrame:j,shape:oe,style:re}})}function ae(f){var S=f.tickLinePosition;return S.map(function(j){return{points:j}})}function ue(f){return f.axisTick.style}function X(f){var S=f.animationCurve,j=f.animationFrame,I=f.rLevel,Z=te(f),re=le(f,Z);return Z.map(function(oe,ce){return{name:"text",index:I,visible:f.axisLabel.show,animationCurve:S,animationFrame:j,shape:oe,style:re[ce],setGraphCenter:function(){}}})}function te(f){var S=f.label,j=f.tickPosition,I=f.position;return j.map(function(Z,re){return{position:ie(Z,I),content:S[re].toString()}})}function ie(f,S){var j=0,I=10;return(S==="top"||S==="bottom")&&(j=1),(S==="top"||S==="left")&&(I=-10),f=(0,k.deepClone)(f),f[j]+=I,f}function le(f,S){var j=f.position,I=f.axisLabel.style,Z=$(j);I=(0,B.deepMerge)(Z,I);var re=S.map(function(oe){var ce=oe.position;return N(N({},I),{},{graphCenter:ce})});return re}function $(f){if(f==="left")return{textAlign:"right",textBaseline:"middle"};if(f==="right")return{textAlign:"left",textBaseline:"middle"};if(f==="top")return{textAlign:"center",textBaseline:"bottom"};if(f==="bottom")return{textAlign:"center",textBaseline:"top"}}function x(f){var S=f.animationCurve,j=f.animationFrame,I=f.rLevel;return[{name:"text",index:I,animationCurve:S,animationFrame:j,shape:E(f),style:q(f)}]}function E(f){var S=f.name,j=f.namePosition;return{content:S,position:j}}function q(f){var S=f.nameLocation,j=f.position,I=f.nameTextStyle,Z=H(j,S);return(0,B.deepMerge)(Z,I)}function H(f,S){if(f==="top"&&S==="start"||f==="bottom"&&S==="start"||f==="left"&&S==="center")return{textAlign:"right",textBaseline:"middle"};if(f==="top"&&S==="end"||f==="bottom"&&S==="end"||f==="right"&&S==="center")return{textAlign:"left",textBaseline:"middle"};if(f==="top"&&S==="center"||f==="left"&&S==="end"||f==="right"&&S==="end")return{textAlign:"center",textBaseline:"bottom"};if(f==="bottom"&&S==="center"||f==="left"&&S==="start"||f==="right"&&S==="start")return{textAlign:"center",textBaseline:"top"}}function K(f){var S=f.animationCurve,j=f.animationFrame,I=f.rLevel,Z=m(f),re=V(f);return Z.map(function(oe){return{name:"polyline",index:I,visible:f.splitLine.show,animationCurve:S,animationFrame:j,shape:oe,style:re}})}function m(f){var S=f.splitLinePosition;return S.map(function(j){return{points:j}})}function V(f){return f.splitLine.style}return Dt}var zt={},xa;function Ku(){if(xa)return zt;xa=1;var e=be;Object.defineProperty(zt,"__esModule",{value:!0}),zt.line=A;var t=e(Le()),r=e(Ae()),n=e(Se),i=e(Ee),v=Fe(),y=Re(),B=e(en()),k=xe;function M(X,te){var ie=Object.keys(X);if(Object.getOwnPropertySymbols){var le=Object.getOwnPropertySymbols(X);te&&(le=le.filter(function($){return Object.getOwnPropertyDescriptor(X,$).enumerable})),ie.push.apply(ie,le)}return ie}function N(X){for(var te=1;te<arguments.length;te++){var ie=arguments[te]!=null?arguments[te]:{};te%2?M(Object(ie),!0).forEach(function(le){(0,i.default)(X,le,ie[le])}):Object.getOwnPropertyDescriptors?Object.defineProperties(X,Object.getOwnPropertyDescriptors(ie)):M(Object(ie)).forEach(function(le){Object.defineProperty(X,le,Object.getOwnPropertyDescriptor(ie,le))})}return X}var Q=B.default.polylineToBezierCurve,D=B.default.getBezierCurveLength;function A(X){var te=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ie=te.xAxis,le=te.yAxis,$=te.series,x=[];ie&&le&&$&&(x=(0,k.initNeedSeries)($,y.lineConfig,"line"),x=b(x,X)),(0,v.doUpdate)({chart:X,series:x,key:"lineArea",getGraphConfig:O,getStartGraphConfig:p,beforeUpdate:d,beforeChange:a}),(0,v.doUpdate)({chart:X,series:x,key:"line",getGraphConfig:u,getStartGraphConfig:R,beforeUpdate:d,beforeChange:a}),(0,v.doUpdate)({chart:X,series:x,key:"linePoint",getGraphConfig:W,getStartGraphConfig:g}),(0,v.doUpdate)({chart:X,series:x,key:"lineLabel",getGraphConfig:T})}function b(X,te){var ie=te.axisData;return X.map(function(le){var $=(0,k.mergeSameStackData)(le,X);$=z(le,$);var x=L(le,ie),E=Y($,x),q=G(x);return N(N({},le),{},{linePosition:E.filter(function(H){return H}),lineFillBottomPos:q})})}function z(X,te){var ie=X.data;return te.map(function(le,$){return typeof ie[$]=="number"?le:null})}function L(X,te){var ie=X.xAxisIndex,le=X.yAxisIndex,$=te.find(function(E){var q=E.axis,H=E.index;return q==="x"&&H===ie}),x=te.find(function(E){var q=E.axis,H=E.index;return q==="y"&&H===le});return[$,x]}function Y(X,te){var ie=te.findIndex(function(re){var oe=re.data;return oe==="value"}),le=te[ie],$=te[1-ie],x=le.linePosition,E=le.axis,q=$.tickPosition,H=q.length,K=E==="x"?0:1,m=x[0][K],V=x[1][K],f=V-m,S=le.maxValue,j=le.minValue,I=S-j,Z=new Array(H).fill(0).map(function(re,oe){var ce=X[oe];if(typeof ce!="number")return null;var fe=(ce-j)/I;return I===0&&(fe=0),fe*f+m});return Z.map(function(re,oe){if(oe>=H||typeof re!="number")return null;var ce=[re,q[oe][1-K]];return K===0||ce.reverse(),ce})}function G(X){var te=X.find(function(V){var f=V.data;return f==="value"}),ie=te.axis,le=te.linePosition,$=te.minValue,x=te.maxValue,E=ie==="x"?0:1,q=le[0][E];if($<0&&x>0){var H=x-$,K=Math.abs(le[0][E]-le[1][E]),m=Math.abs($)/H*K;ie==="y"&&(m*=-1),q+=m}return{changeIndex:E,changeValue:q}}function O(X){var te=X.animationCurve,ie=X.animationFrame,le=X.lineFillBottomPos,$=X.rLevel;return[{name:l(X),index:$,animationCurve:te,animationFrame:ie,visible:X.lineArea.show,lineFillBottomPos:le,shape:P(X),style:C(X),drawed:_}]}function P(X){var te=X.linePosition;return{points:te}}function C(X){var te=X.lineArea,ie=X.color,le=te.gradient,$=te.style,x=[$.fill||ie],E=(0,k.deepMerge)(x,le);E.length===1&&E.push(E[0]);var q=F(X);return $=N(N({},$),{},{stroke:"rgba(0, 0, 0, 0)"}),(0,k.deepMerge)({gradientColor:E,gradientParams:q,gradientType:"linear",gradientWith:"fill"},$)}function F(X){var te=X.lineFillBottomPos,ie=X.linePosition,le=te.changeIndex,$=te.changeValue,x=ie.map(function(K){return K[le]}),E=Math.max.apply(Math,(0,n.default)(x)),q=Math.min.apply(Math,(0,n.default)(x)),H=E;return le===1&&(H=q),le===1?[0,H,0,$]:[H,0,$,0]}function _(X,te){var ie=X.lineFillBottomPos,le=X.shape,$=te.ctx,x=le.points,E=ie.changeIndex,q=ie.changeValue,H=(0,n.default)(x[x.length-1]),K=(0,n.default)(x[0]);H[E]=q,K[E]=q,$.lineTo.apply($,(0,n.default)(H)),$.lineTo.apply($,(0,n.default)(K)),$.closePath(),$.fill()}function p(X){var te=O(X)[0],ie=N({},te.style);return ie.opacity=0,te.style=ie,[te]}function d(X,te,ie,le){var $=X[ie];if($){var x=l(te),E=le.chart.render,q=$[0].name,H=x!==q;H&&($.forEach(function(K){return E.delGraph(K)}),X[ie]=null)}}function a(X,te){var ie=te.shape.points,le=X.shape.points,$=le.length,x=ie.length;if(x>$){var E=le.slice(-1)[0],q=new Array(x-$).fill(0).map(function(H){return(0,n.default)(E)});le.push.apply(le,(0,n.default)(q))}else x<$&&le.splice(x)}function u(X){var te=X.animationCurve,ie=X.animationFrame,le=X.rLevel;return[{name:l(X),index:le+1,animationCurve:te,animationFrame:ie,shape:P(X),style:s(X)}]}function l(X){var te=X.smooth;return te?"smoothline":"polyline"}function s(X){var te=X.lineStyle,ie=X.color,le=X.smooth,$=X.linePosition,x=h($,le);return(0,k.deepMerge)({stroke:ie,lineDash:[x,0]},te)}function h(X){var te=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(!te)return(0,k.getPolylineLength)(X);var ie=Q(X);return D(ie)}function R(X){var te=X.lineStyle.lineDash,ie=u(X)[0],le=ie.style.lineDash;return te?le=[0,0]:le=(0,n.default)(le).reverse(),ie.style.lineDash=le,[ie]}function W(X){var te=X.animationCurve,ie=X.animationFrame,le=X.rLevel,$=o(X),x=w(X);return $.map(function(E){return{name:"circle",index:le+2,visible:X.linePoint.show,animationCurve:te,animationFrame:ie,shape:E,style:x}})}function o(X){var te=X.linePosition,ie=X.linePoint.radius;return te.map(function(le){var $=(0,r.default)(le,2),x=$[0],E=$[1];return{r:ie,rx:x,ry:E}})}function w(X){var te=X.color,ie=X.linePoint.style;return(0,k.deepMerge)({stroke:te},ie)}function g(X){var te=W(X);return te.forEach(function(ie){ie.shape.r=.1}),te}function T(X){var te=X.animationCurve,ie=X.animationFrame,le=X.rLevel,$=U(X),x=ue(X);return $.map(function(E,q){return{name:"text",index:le+3,visible:X.label.show,animationCurve:te,animationFrame:ie,shape:E,style:x}})}function U(X){var te=ae(X),ie=ee(X);return te.map(function(le,$){return{content:le,position:ie[$]}})}function ee(X){var te=X.linePosition,ie=X.lineFillBottomPos,le=X.label,$=le.position,x=le.offset,E=ie.changeIndex,q=ie.changeValue;return te.map(function(H){if($==="bottom"&&(H=(0,n.default)(H),H[E]=q),$==="center"){var K=(0,n.default)(H);K[E]=q,H=ne(H,K)}return J(H,x)})}function J(X,te){var ie=(0,r.default)(X,2),le=ie[0],$=ie[1],x=(0,r.default)(te,2),E=x[0],q=x[1];return[le+E,$+q]}function ne(X,te){var ie=(0,r.default)(X,2),le=ie[0],$=ie[1],x=(0,r.default)(te,2),E=x[0],q=x[1];return[(le+E)/2,($+q)/2]}function ae(X){var te=X.data,ie=X.label.formatter;if(te=te.filter(function($){return typeof $=="number"}).map(function($){return $.toString()}),!ie)return te;var le=(0,t.default)(ie);return le==="string"?te.map(function($){return ie.replace("{value}",$)}):le==="function"?te.map(function($,x){return ie({value:$,index:x})}):te}function ue(X){var te=X.color,ie=X.label.style;return(0,k.deepMerge)({fill:te},ie)}return zt}var Gt={},Ca;function Ju(){if(Ca)return Gt;Ca=1;var e=be;Object.defineProperty(Gt,"__esModule",{value:!0}),Gt.bar=Q;var t=e(Le()),r=e(Ee),n=e(Ae()),i=e(Se),v=Fe(),y=Re(),B=_e(),k=xe;function M(m,V){var f=Object.keys(m);if(Object.getOwnPropertySymbols){var S=Object.getOwnPropertySymbols(m);V&&(S=S.filter(function(j){return Object.getOwnPropertyDescriptor(m,j).enumerable})),f.push.apply(f,S)}return f}function N(m){for(var V=1;V<arguments.length;V++){var f=arguments[V]!=null?arguments[V]:{};V%2?M(Object(f),!0).forEach(function(S){(0,r.default)(m,S,f[S])}):Object.getOwnPropertyDescriptors?Object.defineProperties(m,Object.getOwnPropertyDescriptors(f)):M(Object(f)).forEach(function(S){Object.defineProperty(m,S,Object.getOwnPropertyDescriptor(f,S))})}return m}function Q(m){var V=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},f=V.xAxis,S=V.yAxis,j=V.series,I=[];f&&S&&j&&(I=(0,k.initNeedSeries)(j,y.barConfig,"bar"),I=D(I,m),I=A(I),I=_(I)),(0,v.doUpdate)({chart:m,series:I.slice(-1),key:"backgroundBar",getGraphConfig:h}),I.reverse(),(0,v.doUpdate)({chart:m,series:I,key:"bar",getGraphConfig:w,getStartGraphConfig:ue,beforeUpdate:le}),(0,v.doUpdate)({chart:m,series:I,key:"barLabel",getGraphConfig:$})}function D(m,V){var f=V.axisData;return m.forEach(function(S){var j=S.xAxisIndex,I=S.yAxisIndex;typeof j!="number"&&(j=0),typeof I!="number"&&(I=0);var Z=f.find(function(fe){var he=fe.axis,ve=fe.index;return"".concat(he).concat(ve)==="x".concat(j)}),re=f.find(function(fe){var he=fe.axis,ve=fe.index;return"".concat(he).concat(ve)==="y".concat(I)}),oe=[Z,re],ce=oe.findIndex(function(fe){var he=fe.data;return he==="value"});S.valueAxis=oe[ce],S.labelAxis=oe[1-ce]}),m}function A(m,V){var f=z(m);return f.forEach(function(S){b(S),Y(S),G(S),O(S),F(S)}),m}function b(m){var V=L(m);V=V.map(function(S){return{stack:S,index:-1}});var f=0;m.forEach(function(S){var j=S.stack;if(!j)S.barIndex=f,f++;else{var I=V.find(function(Z){var re=Z.stack;return re===j});I.index===-1&&(I.index=f,f++),S.barIndex=I.index}})}function z(m){var V=m.map(function(f){var S=f.labelAxis,j=S.axis,I=S.index;return j+I});return V=(0,i.default)(new Set(V)),V.map(function(f){return m.filter(function(S){var j=S.labelAxis,I=j.axis,Z=j.index;return I+Z===f})})}function L(m){var V=[];return m.forEach(function(f){var S=f.stack;S&&V.push(S)}),(0,i.default)(new Set(V))}function Y(m){var V=(0,i.default)(new Set(m.map(function(f){var S=f.barIndex;return S}))).length;m.forEach(function(f){return f.barNum=V})}function G(m){var V=m.slice(-1)[0],f=V.barCategoryGap,S=V.labelAxis.tickGap,j=0;typeof f=="number"?j=f:j=(1-parseInt(f)/100)*S,m.forEach(function(I){return I.barCategoryWidth=j})}function O(m){var V=m.slice(-1)[0],f=V.barCategoryWidth,S=V.barWidth,j=V.barGap,I=V.barNum,Z=[];typeof S=="number"||S!=="auto"?Z=P(f,S,j):S==="auto"&&(Z=C(f,S,j,I));var re=Z,oe=(0,n.default)(re,2),ce=oe[0],fe=oe[1];m.forEach(function(he){he.barWidth=ce,he.barGap=fe})}function P(m,V,f){var S=0,j=0;return typeof V=="number"?S=V:S=parseInt(V)/100*m,typeof f=="number"?j=f:j=parseInt(f)/100*S,[S,j]}function C(m,V,f,S){var j=0,I=0,Z=m/S;if(typeof f=="number")I=f,j=Z-I;else{var re=10+parseInt(f)/10;re===0?(j=Z*2,I=-j):(j=Z/re*10,I=Z-j)}return[j,I]}function F(m){var V=m.slice(-1)[0],f=V.barGap,S=V.barWidth,j=V.barNum,I=(f+S)*j-f;m.forEach(function(Z){return Z.barAllWidthAndGap=I})}function _(m,V){return m=d(m),m=p(m),m=u(m),m=l(m),m}function p(m){return m.map(function(V){var f=V.labelAxis,S=V.barAllWidthAndGap,j=V.barGap,I=V.barWidth,Z=V.barIndex,re=f.tickGap,oe=f.tickPosition,ce=f.axis,fe=ce==="x"?0:1,he=oe.map(function(ve,ge){var Ce=oe[ge][fe]-re/2,ze=Ce+(re-S)/2;return ze+(Z+.5)*I+Z*j});return N(N({},V),{},{barLabelAxisPos:he})})}function d(m){return m.map(function(V){var f=(0,k.mergeSameStackData)(V,m);f=a(V,f);var S=V.valueAxis,j=S.axis,I=S.minValue,Z=S.maxValue,re=S.linePosition,oe=s(I,Z,I<0?0:I,re,j),ce=f.map(function(he){return s(I,Z,he,re,j)}),fe=ce.map(function(he){return[oe,he]});return N(N({},V),{},{barValueAxisPos:fe})})}function a(m,V){var f=m.data;return V.map(function(S,j){return typeof f[j]=="number"?S:null}).filter(function(S){return S!==null})}function u(m){return m.map(function(V){var f=V.barLabelAxisPos,S=V.data;return S.forEach(function(j,I){typeof j!="number"&&(f[I]=null)}),N(N({},V),{},{barLabelAxisPos:f.filter(function(j){return j!==null})})})}function l(m){return m.forEach(function(V){var f=V.data,S=V.barLabelAxisPos,j=V.barValueAxisPos,I=f.filter(function(re){return typeof re=="number"}).length,Z=S.length;Z>I&&(S.splice(I),j.splice(I))}),m}function s(m,V,f,S,j){if(typeof f!="number")return null;var I=V-m,Z=j==="x"?0:1,re=S[1][Z]-S[0][Z],oe=(f-m)/I;I===0&&(oe=0);var ce=oe*re;return ce+S[0][Z]}function h(m){var V=m.animationCurve,f=m.animationFrame,S=m.rLevel,j=R(m),I=o(m);return j.map(function(Z){return{name:"rect",index:S,visible:m.backgroundBar.show,animationCurve:V,animationFrame:f,shape:Z,style:I}})}function R(m){var V=m.labelAxis,f=m.valueAxis,S=V.tickPosition,j=f.axis,I=f.linePosition,Z=W(m),re=Z/2,oe=j==="x"?0:1,ce=S.map(function(ge){return ge[1-oe]}),fe=[I[0][oe],I[1][oe]],he=fe[0],ve=fe[1];return ce.map(function(ge){return j==="x"?{x:he,y:ge-re,w:ve-he,h:Z}:{x:ge-re,y:ve,w:Z,h:he-ve}})}function W(m){var V=m.barAllWidthAndGap,f=m.barCategoryWidth,S=m.backgroundBar,j=S.width;return typeof j=="number"?j:j==="auto"?V:parseInt(j)/100*f}function o(m){return m.backgroundBar.style}function w(m){var V=m.barLabelAxisPos,f=m.animationCurve,S=m.animationFrame,j=m.rLevel,I=g(m);return V.map(function(Z,re){return{name:I,index:j,animationCurve:f,animationFrame:S,shape:T(m,re),style:ne(m,re)}})}function g(m){var V=m.shapeType;return V==="leftEchelon"||V==="rightEchelon"?"polyline":"rect"}function T(m,V){var f=m.shapeType;return f==="leftEchelon"?U(m,V):f==="rightEchelon"?ee(m,V):J(m,V)}function U(m,V){var f=m.barValueAxisPos,S=m.barLabelAxisPos,j=m.barWidth,I=m.echelonOffset,Z=(0,n.default)(f[V],2),re=Z[0],oe=Z[1],ce=S[V],fe=j/2,he=m.valueAxis.axis,ve=[];return he==="x"?(ve[0]=[oe,ce-fe],ve[1]=[oe,ce+fe],ve[2]=[re,ce+fe],ve[3]=[re+I,ce-fe],oe-re<I&&ve.splice(3,1)):(ve[0]=[ce-fe,oe],ve[1]=[ce+fe,oe],ve[2]=[ce+fe,re],ve[3]=[ce-fe,re-I],re-oe<I&&ve.splice(3,1)),{points:ve,close:!0}}function ee(m,V){var f=m.barValueAxisPos,S=m.barLabelAxisPos,j=m.barWidth,I=m.echelonOffset,Z=(0,n.default)(f[V],2),re=Z[0],oe=Z[1],ce=S[V],fe=j/2,he=m.valueAxis.axis,ve=[];return he==="x"?(ve[0]=[oe,ce+fe],ve[1]=[oe,ce-fe],ve[2]=[re,ce-fe],ve[3]=[re+I,ce+fe],oe-re<I&&ve.splice(2,1)):(ve[0]=[ce+fe,oe],ve[1]=[ce-fe,oe],ve[2]=[ce-fe,re],ve[3]=[ce+fe,re-I],re-oe<I&&ve.splice(2,1)),{points:ve,close:!0}}function J(m,V){var f=m.barValueAxisPos,S=m.barLabelAxisPos,j=m.barWidth,I=(0,n.default)(f[V],2),Z=I[0],re=I[1],oe=S[V],ce=m.valueAxis.axis,fe={};return ce==="x"?(fe.x=Z,fe.y=oe-j/2,fe.w=re-Z,fe.h=j):(fe.x=oe-j/2,fe.y=re,fe.w=j,fe.h=Z-re),fe}function ne(m,V){var f=m.barStyle,S=m.gradient,j=m.color,I=m.independentColor,Z=m.independentColors,re=[f.fill||j],oe=(0,k.deepMerge)(re,S.color);if(I){var ce=Z[V%Z.length];oe=ce instanceof Array?ce:[ce]}oe.length===1&&oe.push(oe[0]);var fe=ae(m,V);return(0,k.deepMerge)({gradientColor:oe,gradientParams:fe,gradientType:"linear",gradientWith:"fill"},f)}function ae(m,V){var f=m.barValueAxisPos,S=m.barLabelAxisPos,j=m.data,I=m.valueAxis,Z=I.linePosition,re=I.axis,oe=(0,n.default)(f[V],2),ce=oe[0],fe=oe[1],he=S[V],ve=j[V],ge=(0,n.default)(Z,2),Ce=ge[0],ze=ge[1],Ne=re==="x"?0:1,Ge=fe;return m.gradient.local||(Ge=ve<0?Ce[Ne]:ze[Ne]),re==="y"?[he,Ge,he,ce]:[Ge,he,ce,he]}function ue(m){var V=w(m),f=m.shapeType;return V.forEach(function(S){var j=S.shape;f==="leftEchelon"?j=X(j,m):f==="rightEchelon"?j=te(j,m):j=ie(j,m),S.shape=j}),V}function X(m,V){var f=V.valueAxis.axis;m=(0,B.deepClone)(m);var S=m,j=S.points,I=f==="x"?0:1,Z=j[2][I];return j.forEach(function(re){return re[I]=Z}),m}function te(m,V){var f=V.valueAxis.axis;m=(0,B.deepClone)(m);var S=m,j=S.points,I=f==="x"?0:1,Z=j[2][I];return j.forEach(function(re){return re[I]=Z}),m}function ie(m,V){var f=V.valueAxis.axis,S=m.x,j=m.y,I=m.w,Z=m.h;return f==="x"?I=0:(j=j+Z,Z=0),{x:S,y:j,w:I,h:Z}}function le(m,V,f,S){var j=S.chart.render,I=g(V);m[f]&&m[f][0].name!==I&&(m[f].forEach(function(Z){return j.delGraph(Z)}),m[f]=null)}function $(m){var V=m.animationCurve,f=m.animationFrame,S=m.rLevel,j=x(m),I=K(m);return j.map(function(Z){return{name:"text",index:S,visible:m.label.show,animationCurve:V,animationFrame:f,shape:Z,style:I}})}function x(m){var V=E(m),f=q(m);return f.map(function(S,j){return{position:S,content:V[j]}})}function E(m){var V=m.data,f=m.label,S=f.formatter;if(V=V.filter(function(I){return typeof I=="number"}).map(function(I){return I.toString()}),!S)return V;var j=(0,t.default)(S);return j==="string"?V.map(function(I){return S.replace("{value}",I)}):j==="function"?V.map(function(I,Z){return S({value:I,index:Z})}):V}function q(m){var V=m.label,f=m.barValueAxisPos,S=m.barLabelAxisPos,j=V.position,I=V.offset,Z=m.valueAxis.axis;return f.map(function(re,oe){var ce=(0,n.default)(re,2),fe=ce[0],he=ce[1],ve=S[oe],ge=[he,ve];return j==="bottom"&&(ge=[fe,ve]),j==="center"&&(ge=[(fe+he)/2,ve]),Z==="y"&&ge.reverse(),H(ge,I)})}function H(m,V){var f=(0,n.default)(m,2),S=f[0],j=f[1],I=(0,n.default)(V,2),Z=I[0],re=I[1];return[S+Z,j+re]}function K(m){var V=m.color,f=m.label.style,S=m.gradient.color;return S.length&&(V=S[0]),f=(0,k.deepMerge)({fill:V},f),f}return Gt}var Nt={},Pa;function ec(){if(Pa)return Nt;Pa=1;var e=be;Object.defineProperty(Nt,"__esModule",{value:!0}),Nt.pie=Q;var t=e(Ee),r=e(Le()),n=e(Ae()),i=e(Se),v=Fe(),y=zi(),B=_e(),k=xe;function M(x,E){var q=Object.keys(x);if(Object.getOwnPropertySymbols){var H=Object.getOwnPropertySymbols(x);E&&(H=H.filter(function(K){return Object.getOwnPropertyDescriptor(x,K).enumerable})),q.push.apply(q,H)}return q}function N(x){for(var E=1;E<arguments.length;E++){var q=arguments[E]!=null?arguments[E]:{};E%2?M(Object(q),!0).forEach(function(H){(0,t.default)(x,H,q[H])}):Object.getOwnPropertyDescriptors?Object.defineProperties(x,Object.getOwnPropertyDescriptors(q)):M(Object(q)).forEach(function(H){Object.defineProperty(x,H,Object.getOwnPropertyDescriptor(q,H))})}return x}function Q(x){var E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},q=E.series;q||(q=[]);var H=(0,k.initNeedSeries)(q,y.pieConfig,"pie");H=D(H,x),H=A(H,x),H=z(H),H=G(H),H=C(H),H=_(H),H=d(H),H=a(H),(0,v.doUpdate)({chart:x,series:H,key:"pie",getGraphConfig:W,getStartGraphConfig:o,beforeChange:w}),(0,v.doUpdate)({chart:x,series:H,key:"pieInsideLabel",getGraphConfig:U}),(0,v.doUpdate)({chart:x,series:H,key:"pieOutsideLabelLine",getGraphConfig:ne,getStartGraphConfig:ae}),(0,v.doUpdate)({chart:x,series:H,key:"pieOutsideLabel",getGraphConfig:te,getStartGraphConfig:ie})}function D(x,E){var q=E.render.area;return x.forEach(function(H){var K=H.center;K=K.map(function(m,V){return typeof m=="number"?m:parseInt(m)/100*q[V]}),H.center=K}),x}function A(x,E){var q=Math.min.apply(Math,(0,i.default)(E.render.area))/2;return x.forEach(function(H){var K=H.radius,m=H.data;K=b(K,q),m.forEach(function(V){var f=V.radius;f||(f=K),f=b(f,q),V.radius=f}),H.radius=K}),x}function b(x,E){return x instanceof Array||(x=[0,x]),x=x.map(function(q){return typeof q=="number"?q:parseInt(q)/100*E}),x}function z(x,E){var q=x.filter(function(H){var K=H.roseType;return K});return q.forEach(function(H){var K=H.radius,m=H.data,V=H.roseSort,f=Y(H),S=(0,i.default)(m);m=L(m),m.forEach(function(j,I){j.radius[1]=K[1]-f*I}),V?m.reverse():H.data=S,H.roseIncrement=f}),x}function L(x){return x.sort(function(E,q){var H=E.value,K=q.value;if(H===K)return 0;if(H>K)return-1;if(H<K)return 1})}function Y(x){var E=x.radius,q=x.roseIncrement;if(typeof q=="number")return q;if(q==="auto"){var H=x.data,K=H.reduce(function(f,S){var j=S.radius;return[].concat((0,i.default)(f),(0,i.default)(j))},[]),m=Math.min.apply(Math,(0,i.default)(K)),V=Math.max.apply(Math,(0,i.default)(K));return(V-m)*.6/(H.length-1||1)}return parseInt(q)/100*E[1]}function G(x){return x.forEach(function(E){var q=E.data,H=E.percentToFixed,K=P(q);q.forEach(function(V){var f=V.value;V.percent=f/K*100,V.percentForLabel=O(f/K*100,H)});var m=(0,k.mulAdd)(q.slice(0,-1).map(function(V){var f=V.percent;return f}));q.slice(-1)[0].percent=100-m,q.slice(-1)[0].percentForLabel=O(100-m,H)}),x}function O(x){var E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,q=x.toString(),H=q.split("."),K=H[1]||"0",m=K.slice(0,E);return H[1]=m,parseFloat(H.join("."))}function P(x){return(0,k.mulAdd)(x.map(function(E){var q=E.value;return q}))}function C(x){return x.forEach(function(E){var q=E.startAngle,H=E.data;H.forEach(function(K,m){var V=F(H,m),f=(0,n.default)(V,2),S=f[0],j=f[1];K.startAngle=q+S,K.endAngle=q+j})}),x}function F(x,E){var q=Math.PI*2,H=x.slice(0,E+1),K=(0,k.mulAdd)(H.map(function(f){var S=f.percent;return S})),m=x[E].percent,V=K-m;return[q*V/100,q*K/100]}function _(x){return x.forEach(function(E){var q=E.data;q.forEach(function(H){H.insideLabelPos=p(E,H)})}),x}function p(x,E){var q=x.center,H=E.startAngle,K=E.endAngle,m=(0,n.default)(E.radius,2),V=m[0],f=m[1],S=(V+f)/2,j=(H+K)/2;return B.getCircleRadianPoint.apply(void 0,(0,i.default)(q).concat([S,j]))}function d(x){return x.forEach(function(E){var q=E.data,H=E.center;q.forEach(function(K){var m=K.startAngle,V=K.endAngle,f=K.radius,S=(m+V)/2,j=B.getCircleRadianPoint.apply(void 0,(0,i.default)(H).concat([f[1],S]));K.edgeCenterPos=j})}),x}function a(x){return x.forEach(function(E){var q=s(E),H=s(E,!1);q=h(q),H=h(H),R(q,E),R(H,E,!1)}),x}function u(x){var E=x.outsideLabel.labelLineBendGap,q=l(x);return typeof E!="number"&&(E=parseInt(E)/100*q),E+q}function l(x){var E=x.data,q=E.map(function(H){var K=(0,n.default)(H.radius,2);K[0];var m=K[1];return m});return Math.max.apply(Math,(0,i.default)(q))}function s(x){var E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,q=x.data,H=x.center,K=H[0];return q.filter(function(m){var V=m.edgeCenterPos,f=V[0];return E?f<=K:f>K})}function h(x){return x.sort(function(E,q){var H=(0,n.default)(E.edgeCenterPos,2);H[0];var K=H[1],m=(0,n.default)(q.edgeCenterPos,2);m[0];var V=m[1];if(K>V)return 1;if(K<V)return-1;if(K===V)return 0}),x}function R(x,E){var q=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,H=E.center,K=E.outsideLabel,m=u(E);x.forEach(function(V){var f=V.edgeCenterPos,S=V.startAngle,j=V.endAngle,I=K.labelLineEndLength,Z=(S+j)/2,re=B.getCircleRadianPoint.apply(void 0,(0,i.default)(H).concat([m,Z])),oe=(0,i.default)(re);oe[0]+=I*(q?-1:1),V.labelLine=[f,re,oe],V.labelLineLength=(0,k.getPolylineLength)(V.labelLine),V.align={textAlign:"left",textBaseline:"middle"},q&&(V.align.textAlign="right")})}function W(x){var E=x.data,q=x.animationCurve,H=x.animationFrame,K=x.rLevel;return E.map(function(m,V){return{name:"pie",index:K,animationCurve:q,animationFrame:H,shape:g(x,V),style:T(x,V)}})}function o(x){var E=x.animationDelayGap,q=x.startAnimationCurve,H=W(x);return H.forEach(function(K,m){K.animationCurve=q,K.animationDelay=m*E,K.shape.or=K.shape.ir}),H}function w(x){x.animationDelay=0}function g(x,E){var q=x.center,H=x.data,K=H[E],m=K.radius,V=K.startAngle,f=K.endAngle;return{startAngle:V,endAngle:f,ir:m[0],or:m[1],rx:q[0],ry:q[1]}}function T(x,E){var q=x.pieStyle,H=x.data,K=H[E],m=K.color;return(0,k.deepMerge)({fill:m},q)}function U(x){var E=x.animationCurve,q=x.animationFrame,H=x.data,K=x.rLevel;return H.map(function(m,V){return{name:"text",index:K,visible:x.insideLabel.show,animationCurve:E,animationFrame:q,shape:ee(x,V),style:J(x)}})}function ee(x,E){var q=x.insideLabel,H=x.data,K=q.formatter,m=H[E],V=(0,r.default)(K),f="";return V==="string"&&(f=K.replace("{name}",m.name),f=f.replace("{percent}",m.percentForLabel),f=f.replace("{value}",m.value)),V==="function"&&(f=K(m)),{content:f,position:m.insideLabelPos}}function J(x,E){var q=x.insideLabel.style;return q}function ne(x){var E=x.animationCurve,q=x.animationFrame,H=x.data,K=x.rLevel;return H.map(function(m,V){return{name:"polyline",index:K,visible:x.outsideLabel.show,animationCurve:E,animationFrame:q,shape:ue(x,V),style:X(x,V)}})}function ae(x){var E=x.data,q=ne(x);return q.forEach(function(H,K){H.style.lineDash=[0,E[K].labelLineLength]}),q}function ue(x,E){var q=x.data,H=q[E];return{points:H.labelLine}}function X(x,E){var q=x.outsideLabel,H=x.data,K=q.labelLineStyle,m=H[E].color;return(0,k.deepMerge)({stroke:m,lineDash:[H[E].labelLineLength,0]},K)}function te(x){var E=x.animationCurve,q=x.animationFrame,H=x.data,K=x.rLevel;return H.map(function(m,V){return{name:"text",index:K,visible:x.outsideLabel.show,animationCurve:E,animationFrame:q,shape:le(x,V),style:$(x,V)}})}function ie(x){var E=x.data,q=te(x);return q.forEach(function(H,K){H.shape.position=E[K].labelLine[1]}),q}function le(x,E){var q=x.outsideLabel,H=x.data,K=q.formatter,m=H[E],V=m.labelLine,f=m.name,S=m.percentForLabel,j=m.value,I=(0,r.default)(K),Z="";return I==="string"&&(Z=K.replace("{name}",f),Z=Z.replace("{percent}",S),Z=Z.replace("{value}",j)),I==="function"&&(Z=K(H[E])),{content:Z,position:V[2]}}function $(x,E){var q=x.outsideLabel,H=x.data,K=H[E],m=K.color,V=K.align,f=q.style;return(0,k.deepMerge)(N({fill:m},V),f)}return Nt}var Bt={},Sa;function tc(){if(Sa)return Bt;Sa=1;var e=be;Object.defineProperty(Bt,"__esModule",{value:!0}),Bt.radarAxis=N;var t=e(Ae()),r=e(Ee),n=e(Se),i=Fe(),v=Re(),y=_e(),B=xe;function k(o,w){var g=Object.keys(o);if(Object.getOwnPropertySymbols){var T=Object.getOwnPropertySymbols(o);w&&(T=T.filter(function(U){return Object.getOwnPropertyDescriptor(o,U).enumerable})),g.push.apply(g,T)}return g}function M(o){for(var w=1;w<arguments.length;w++){var g=arguments[w]!=null?arguments[w]:{};w%2?k(Object(g),!0).forEach(function(T){(0,r.default)(o,T,g[T])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(g)):k(Object(g)).forEach(function(T){Object.defineProperty(o,T,Object.getOwnPropertyDescriptor(g,T))})}return o}function N(o){var w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},g=w.radar,T=[];g&&(T=Q(g),T=D(T,o),T=A(T,o),T=b(T),T=z(T),T=L(T),T=[T]);var U=T;T.length&&!T[0].show&&(U=[]),(0,i.doUpdate)({chart:o,series:U,key:"radarAxisSplitArea",getGraphConfig:Y,beforeUpdate:P,beforeChange:C}),(0,i.doUpdate)({chart:o,series:U,key:"radarAxisSplitLine",getGraphConfig:F,beforeUpdate:d,beforeChange:a}),(0,i.doUpdate)({chart:o,series:U,key:"radarAxisLine",getGraphConfig:u}),(0,i.doUpdate)({chart:o,series:U,key:"radarAxisLable",getGraphConfig:h}),o.radarAxis=T[0]}function Q(o){return(0,B.deepMerge)((0,y.deepClone)(v.radarAxisConfig),o)}function D(o,w){var g=w.render.area,T=o.center;return o.centerPos=T.map(function(U,ee){return typeof U=="number"?U:parseInt(U)/100*g[ee]}),o}function A(o,w){var g=w.render.area,T=o.splitNum,U=o.radius,ee=Math.min.apply(Math,(0,n.default)(g))/2;typeof U!="number"&&(U=parseInt(U)/100*ee);var J=U/T;return o.ringRadius=new Array(T).fill(0).map(function(ne,ae){return J*(ae+1)}),o.radius=U,o}function b(o){var w=o.indicator,g=o.centerPos,T=o.radius,U=o.startAngle,ee=Math.PI*2,J=w.length,ne=ee/J,ae=new Array(J).fill(0).map(function(ue,X){return ne*X+U});return o.axisLineAngles=ae,o.axisLinePosition=ae.map(function(ue){return y.getCircleRadianPoint.apply(void 0,(0,n.default)(g).concat([T,ue]))}),o}function z(o){var w=o.ringRadius,g=w[0]/2;return o.areaRadius=w.map(function(T){return T-g}),o}function L(o){var w=o.axisLineAngles,g=o.centerPos,T=o.radius,U=o.axisLabel;return T+=U.labelGap,o.axisLabelPosition=w.map(function(ee){return y.getCircleRadianPoint.apply(void 0,(0,n.default)(g).concat([T,ee]))}),o}function Y(o){var w=o.areaRadius,g=o.polygon,T=o.animationCurve,U=o.animationFrame,ee=o.rLevel,J=g?"regPolygon":"ring";return w.map(function(ne,ae){return{name:J,index:ee,visible:o.splitArea.show,animationCurve:T,animationFrame:U,shape:G(o,ae),style:O(o,ae)}})}function G(o,w){var g=o.polygon,T=o.areaRadius,U=o.indicator,ee=o.centerPos,J=U.length,ne={rx:ee[0],ry:ee[1],r:T[w]};return g&&(ne.side=J),ne}function O(o,w){var g=o.splitArea,T=o.ringRadius,U=o.axisLineAngles,ee=o.polygon,J=o.centerPos,ne=g.color,ae=g.style;ae=M({fill:"rgba(0, 0, 0, 0)"},ae);var ue=T[0]-0;if(ee){var X=y.getCircleRadianPoint.apply(void 0,(0,n.default)(J).concat([T[0],U[0]])),te=y.getCircleRadianPoint.apply(void 0,(0,n.default)(J).concat([T[0],U[1]]));ue=(0,B.getPointToLineDistance)(J,X,te)}if(ae=(0,B.deepMerge)((0,y.deepClone)(ae,!0),{lineWidth:ue}),!ne.length)return ae;var ie=ne.length;return(0,B.deepMerge)(ae,{stroke:ne[w%ie]})}function P(o,w,g,T){var U=o[g];if(U){var ee=T.chart.render,J=w.polygon,ne=U[0].name,ae=J?"regPolygon":"ring",ue=ae!==ne;ue&&(U.forEach(function(X){return ee.delGraph(X)}),o[g]=null)}}function C(o,w){var g=w.shape.side;typeof g=="number"&&(o.shape.side=g)}function F(o){var w=o.ringRadius,g=o.polygon,T=o.animationCurve,U=o.animationFrame,ee=o.rLevel,J=g?"regPolygon":"ring";return w.map(function(ne,ae){return{name:J,index:ee,animationCurve:T,animationFrame:U,visible:o.splitLine.show,shape:_(o,ae),style:p(o,ae)}})}function _(o,w){var g=o.ringRadius,T=o.centerPos,U=o.indicator,ee=o.polygon,J={rx:T[0],ry:T[1],r:g[w]},ne=U.length;return ee&&(J.side=ne),J}function p(o,w){var g=o.splitLine,T=g.color,U=g.style;if(U=M({fill:"rgba(0, 0, 0, 0)"},U),!T.length)return U;var ee=T.length;return(0,B.deepMerge)(U,{stroke:T[w%ee]})}function d(o,w,g,T){var U=o[g];if(U){var ee=T.chart.render,J=w.polygon,ne=U[0].name,ae=J?"regPolygon":"ring",ue=ae!==ne;ue&&(U.forEach(function(X){return ee.delGraph(X)}),o[g]=null)}}function a(o,w){var g=w.shape.side;typeof g=="number"&&(o.shape.side=g)}function u(o){var w=o.axisLinePosition,g=o.animationCurve,T=o.animationFrame,U=o.rLevel;return w.map(function(ee,J){return{name:"polyline",index:U,visible:o.axisLine.show,animationCurve:g,animationFrame:T,shape:l(o,J),style:s(o,J)}})}function l(o,w){var g=o.centerPos,T=o.axisLinePosition,U=[g,T[w]];return{points:U}}function s(o,w){var g=o.axisLine,T=g.color,U=g.style;if(!T.length)return U;var ee=T.length;return(0,B.deepMerge)(U,{stroke:T[w%ee]})}function h(o){var w=o.axisLabelPosition,g=o.animationCurve,T=o.animationFrame,U=o.rLevel;return w.map(function(ee,J){return{name:"text",index:U,visible:o.axisLabel.show,animationCurve:g,animationFrame:T,shape:R(o,J),style:W(o,J)}})}function R(o,w){var g=o.axisLabelPosition,T=o.indicator;return{content:T[w].name,position:g[w]}}function W(o,w){var g=o.axisLabel,T=(0,t.default)(o.centerPos,2),U=T[0],ee=T[1],J=o.axisLabelPosition,ne=g.color,ae=g.style,ue=(0,t.default)(J[w],2),X=ue[0],te=ue[1],ie=X>U?"left":"right",le=te>ee?"top":"bottom";if(ae=(0,B.deepMerge)({textAlign:ie,textBaseline:le},ae),!ne.length)return ae;var $=ne.length;return(0,B.deepMerge)(ae,{fill:ne[w%$]})}return Bt}var qt={},_a;function rc(){if(_a)return qt;_a=1;var e=be;Object.defineProperty(qt,"__esModule",{value:!0}),qt.radar=D;var t=e(Ee),r=e(Le()),n=e(Ae()),i=e(Se),v=Fe(),y=Re(),B=_e(),k=At,M=xe;function N(s,h){var R=Object.keys(s);if(Object.getOwnPropertySymbols){var W=Object.getOwnPropertySymbols(s);h&&(W=W.filter(function(o){return Object.getOwnPropertyDescriptor(s,o).enumerable})),R.push.apply(R,W)}return R}function Q(s){for(var h=1;h<arguments.length;h++){var R=arguments[h]!=null?arguments[h]:{};h%2?N(Object(R),!0).forEach(function(W){(0,t.default)(s,W,R[W])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(R)):N(Object(R)).forEach(function(W){Object.defineProperty(s,W,Object.getOwnPropertyDescriptor(R,W))})}return s}function D(s){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},R=h.series;R||(R=[]);var W=(0,M.initNeedSeries)(R,y.radarConfig,"radar");W=A(W,s),W=b(W,s),W=z(W,s),(0,v.doUpdate)({chart:s,series:W,key:"radar",getGraphConfig:L,getStartGraphConfig:Y,beforeChange:P}),(0,v.doUpdate)({chart:s,series:W,key:"radarPoint",getGraphConfig:C,getStartGraphConfig:F}),(0,v.doUpdate)({chart:s,series:W,key:"radarLabel",getGraphConfig:d})}function A(s,h){var R=h.radarAxis;if(!R)return[];var W=R.indicator,o=R.axisLineAngles,w=R.radius,g=R.centerPos;return s.forEach(function(T){var U=T.data;T.dataRadius=[],T.radarPosition=W.map(function(ee,J){var ne=ee.max,ae=ee.min,ue=U[J];typeof ne!="number"&&(ne=ue),typeof ae!="number"&&(ae=0),typeof ue!="number"&&(ue=ae);var X=(ue-ae)/(ne-ae)*w;return T.dataRadius[J]=X,B.getCircleRadianPoint.apply(void 0,(0,i.default)(g).concat([X,o[J]]))})}),s}function b(s,h){var R=h.radarAxis;if(!R)return[];var W=R.centerPos,o=R.axisLineAngles;return s.forEach(function(w){var g=w.dataRadius,T=w.label,U=T.labelGap;w.labelPosition=g.map(function(ee,J){return B.getCircleRadianPoint.apply(void 0,(0,i.default)(W).concat([ee+U,o[J]]))})}),s}function z(s,h){var R=h.radarAxis;if(!R)return[];var W=(0,n.default)(R.centerPos,2),o=W[0],w=W[1];return s.forEach(function(g){var T=g.labelPosition,U=T.map(function(ee){var J=(0,n.default)(ee,2),ne=J[0],ae=J[1],ue=ne>o?"left":"right",X=ae>w?"top":"bottom";return{textAlign:ue,textBaseline:X}});g.labelAlign=U}),s}function L(s){var h=s.animationCurve,R=s.animationFrame,W=s.rLevel;return[{name:"polyline",index:W,animationCurve:h,animationFrame:R,shape:G(s),style:O(s)}]}function Y(s,h){var R=h.chart.radarAxis.centerPos,W=L(s)[0],o=W.shape.points.length,w=new Array(o).fill(0).map(function(g){return(0,i.default)(R)});return W.shape.points=w,[W]}function G(s){var h=s.radarPosition;return{points:h,close:!0}}function O(s){var h=s.radarStyle,R=s.color,W=(0,k.getRgbaValue)(R);W[3]=.5;var o={stroke:R,fill:(0,k.getColorFromRgbValue)(W)};return(0,M.deepMerge)(o,h)}function P(s,h){var R=h.shape,W=s.shape.points,o=W.length,w=R.points.length;if(w>o){var g=W.slice(-1)[0],T=new Array(w-o).fill(0).map(function(U){return(0,i.default)(g)});W.push.apply(W,(0,i.default)(T))}else w<o&&W.splice(w)}function C(s){var h=s.radarPosition,R=s.animationCurve,W=s.animationFrame,o=s.rLevel;return h.map(function(w,g){return{name:"circle",index:o,animationCurve:R,animationFrame:W,visible:s.point.show,shape:_(s,g),style:p(s)}})}function F(s){var h=C(s);return h.forEach(function(R){return R.shape.r=.01}),h}function _(s,h){var R=s.radarPosition,W=s.point,o=W.radius,w=R[h];return{rx:w[0],ry:w[1],r:o}}function p(s,h){var R=s.point,W=s.color,o=R.style;return(0,M.deepMerge)({stroke:W},o)}function d(s){var h=s.labelPosition,R=s.animationCurve,W=s.animationFrame,o=s.rLevel;return h.map(function(w,g){return{name:"text",index:o,visible:s.label.show,animationCurve:R,animationFrame:W,shape:a(s,g),style:l(s,g)}})}function a(s,h){var R=s.labelPosition,W=s.label,o=s.data,w=W.offset,g=W.formatter,T=u(R[h],w),U=o[h]?o[h].toString():"0",ee=(0,r.default)(g);return ee==="string"&&(U=g.replace("{value}",U)),ee==="function"&&(U=g(U)),{content:U,position:T}}function u(s,h){var R=(0,n.default)(s,2),W=R[0],o=R[1],w=(0,n.default)(h,2),g=w[0],T=w[1];return[W+g,o+T]}function l(s,h){var R=s.label,W=s.color,o=s.labelAlign,w=R.style,g=Q({fill:W},o[h]);return(0,M.deepMerge)(g,w)}return qt}var It={},wa;function nc(){if(wa)return It;wa=1;var e=be;Object.defineProperty(It,"__esModule",{value:!0}),It.gauge=D;var t=e(Ee),r=e(Le()),n=e(Ae()),i=e(Se),v=Fe(),y=Gi(),B=_e(),k=xe,M=At;function N($,x){var E=Object.keys($);if(Object.getOwnPropertySymbols){var q=Object.getOwnPropertySymbols($);x&&(q=q.filter(function(H){return Object.getOwnPropertyDescriptor($,H).enumerable})),E.push.apply(E,q)}return E}function Q($){for(var x=1;x<arguments.length;x++){var E=arguments[x]!=null?arguments[x]:{};x%2?N(Object(E),!0).forEach(function(q){(0,t.default)($,q,E[q])}):Object.getOwnPropertyDescriptors?Object.defineProperties($,Object.getOwnPropertyDescriptors(E)):N(Object(E)).forEach(function(q){Object.defineProperty($,q,Object.getOwnPropertyDescriptor(E,q))})}return $}function D($){var x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=x.series;E||(E=[]);var q=(0,k.initNeedSeries)(E,y.gaugeConfig,"gauge");q=A(q,$),q=b(q,$),q=z(q,$),q=L(q),q=Y(q),q=G(q),q=O(q),q=P(q),q=C(q),q=F(q),(0,v.doUpdate)({chart:$,series:q,key:"gaugeAxisTick",getGraphConfig:p}),(0,v.doUpdate)({chart:$,series:q,key:"gaugeAxisLabel",getGraphConfig:u}),(0,v.doUpdate)({chart:$,series:q,key:"gaugeBackgroundArc",getGraphConfig:h,getStartGraphConfig:o}),(0,v.doUpdate)({chart:$,series:q,key:"gaugeArc",getGraphConfig:w,getStartGraphConfig:U,beforeChange:ee}),(0,v.doUpdate)({chart:$,series:q,key:"gaugePointer",getGraphConfig:J,getStartGraphConfig:X}),(0,v.doUpdate)({chart:$,series:q,key:"gaugeDetails",getGraphConfig:te})}function A($,x){var E=x.render.area;return $.forEach(function(q){var H=q.center;H=H.map(function(K,m){return typeof K=="number"?K:parseInt(K)/100*E[m]}),q.center=H}),$}function b($,x){var E=x.render.area,q=Math.min.apply(Math,(0,i.default)(E))/2;return $.forEach(function(H){var K=H.radius;typeof K!="number"&&(K=parseInt(K)/100*q),H.radius=K}),$}function z($,x){var E=x.render.area,q=Math.min.apply(Math,(0,i.default)(E))/2;return $.forEach(function(H){var K=H.radius,m=H.data,V=H.arcLineWidth;m.forEach(function(f){var S=f.radius,j=f.lineWidth;S||(S=K),typeof S!="number"&&(S=parseInt(S)/100*q),f.radius=S,j||(j=V),f.lineWidth=j})}),$}function L($,x){return $.forEach(function(E){var q=E.startAngle,H=E.endAngle,K=E.data,m=E.min,V=E.max,f=H-q,S=V-m;K.forEach(function(j){var I=j.value,Z=Math.abs((I-m)/S*f);j.startAngle=q,j.endAngle=q+Z})}),$}function Y($,x){return $.forEach(function(E){var q=E.data;q.forEach(function(H){var K=H.color,m=H.gradient;(!m||!m.length)&&(m=K),m instanceof Array||(m=[m]),H.gradient=m})}),$}function G($,x){return $.forEach(function(E){var q=E.startAngle,H=E.endAngle,K=E.splitNum,m=E.center,V=E.radius,f=E.arcLineWidth,S=E.axisTick,j=S.tickLength,I=S.style.lineWidth,Z=H-q,re=V-f/2,oe=re-j,ce=Z/(K-1),fe=2*Math.PI*V*Z/(Math.PI*2),he=Math.ceil(I/2)/fe*Z;E.tickAngles=[],E.tickInnerRadius=[],E.tickPosition=new Array(K).fill(0).map(function(ve,ge){var Ce=q+ce*ge;return ge===0&&(Ce+=he),ge===K-1&&(Ce-=he),E.tickAngles[ge]=Ce,E.tickInnerRadius[ge]=oe,[B.getCircleRadianPoint.apply(void 0,(0,i.default)(m).concat([re,Ce])),B.getCircleRadianPoint.apply(void 0,(0,i.default)(m).concat([oe,Ce]))]})}),$}function O($,x){return $.forEach(function(E){var q=E.center,H=E.tickInnerRadius,K=E.tickAngles,m=E.axisLabel.labelGap,V=K.map(function(S,j){return B.getCircleRadianPoint.apply(void 0,(0,i.default)(q).concat([H[j]-m,K[j]]))}),f=V.map(function(S){var j=(0,n.default)(S,2),I=j[0],Z=j[1];return{textAlign:I>q[0]?"right":"left",textBaseline:Z>q[1]?"bottom":"top"}});E.labelPosition=V,E.labelAlign=f}),$}function P($,x){return $.forEach(function(E){var q=E.axisLabel,H=E.min,K=E.max,m=E.splitNum,V=q.data,f=q.formatter,S=(K-H)/(m-1),j=new Array(m).fill(0).map(function(Z,re){return parseInt(H+S*re)}),I=(0,r.default)(f);V=(0,k.deepMerge)(j,V).map(function(Z,re){var oe=Z;return I==="string"&&(oe=f.replace("{value}",Z)),I==="function"&&(oe=f({value:Z,index:re})),oe}),q.data=V}),$}function C($,x){return $.forEach(function(E){var q=E.data,H=E.details,K=E.center,m=H.position,V=H.offset,f=q.map(function(S){var j=S.startAngle,I=S.endAngle,Z=S.radius,re=null;return m==="center"?re=K:m==="start"?re=B.getCircleRadianPoint.apply(void 0,(0,i.default)(K).concat([Z,j])):m==="end"&&(re=B.getCircleRadianPoint.apply(void 0,(0,i.default)(K).concat([Z,I]))),_(re,V)});E.detailsPosition=f}),$}function F($,x){return $.forEach(function(E){var q=E.data,H=E.details,K=H.formatter,m=(0,r.default)(K),V=q.map(function(f){var S=f.value;return m==="string"&&(S=K.replace("{value}","{nt}"),S=S.replace("{name}",f.name)),m==="function"&&(S=K(f)),S.toString()});E.detailsContent=V}),$}function _($,x){var E=(0,n.default)($,2),q=E[0],H=E[1],K=(0,n.default)(x,2),m=K[0],V=K[1];return[q+m,H+V]}function p($){var x=$.tickPosition,E=$.animationCurve,q=$.animationFrame,H=$.rLevel;return x.map(function(K,m){return{name:"polyline",index:H,visible:$.axisTick.show,animationCurve:E,animationFrame:q,shape:d($,m),style:a($)}})}function d($,x){var E=$.tickPosition;return{points:E[x]}}function a($,x){var E=$.axisTick.style;return E}function u($){var x=$.labelPosition,E=$.animationCurve,q=$.animationFrame,H=$.rLevel;return x.map(function(K,m){return{name:"text",index:H,visible:$.axisLabel.show,animationCurve:E,animationFrame:q,shape:l($,m),style:s($,m)}})}function l($,x){var E=$.labelPosition,q=$.axisLabel.data;return{content:q[x].toString(),position:E[x]}}function s($,x){var E=$.labelAlign,q=$.axisLabel,H=q.style;return(0,k.deepMerge)(Q({},E[x]),H)}function h($){var x=$.animationCurve,E=$.animationFrame,q=$.rLevel;return[{name:"arc",index:q,visible:$.backgroundArc.show,animationCurve:x,animationFrame:E,shape:R($),style:W($)}]}function R($){var x=$.startAngle,E=$.endAngle,q=$.center,H=$.radius;return{rx:q[0],ry:q[1],r:H,startAngle:x,endAngle:E}}function W($){var x=$.backgroundArc,E=$.arcLineWidth,q=x.style;return(0,k.deepMerge)({lineWidth:E},q)}function o($){var x=h($)[0],E=Q({},x.shape);return E.endAngle=x.shape.startAngle,x.shape=E,[x]}function w($){var x=$.data,E=$.animationCurve,q=$.animationFrame,H=$.rLevel;return x.map(function(K,m){return{name:"agArc",index:H,animationCurve:E,animationFrame:q,shape:g($,m),style:T($,m)}})}function g($,x){var E=$.data,q=$.center,H=$.endAngle,K=E[x],m=K.radius,V=K.startAngle,f=K.endAngle,S=K.localGradient;return S&&(H=f),{rx:q[0],ry:q[1],r:m,startAngle:V,endAngle:f,gradientEndAngle:H}}function T($,x){var E=$.data,q=$.dataItemStyle,H=E[x],K=H.lineWidth,m=H.gradient;return m=m.map(function(V){return(0,M.getRgbaValue)(V)}),(0,k.deepMerge)({lineWidth:K,gradient:m},q)}function U($){var x=w($);return x.map(function(E){var q=Q({},E.shape);q.endAngle=E.shape.startAngle,E.shape=q}),x}function ee($,x){var E=$.style.gradient,q=E.length,H=x.style.gradient.length;if(q>H)E.splice(H);else{var K=E.slice(-1)[0];E.push.apply(E,(0,i.default)(new Array(H-q).fill(0).map(function(m){return(0,i.default)(K)})))}}function J($){var x=$.animationCurve,E=$.animationFrame,q=$.center,H=$.rLevel;return[{name:"polyline",index:H,visible:$.pointer.show,animationCurve:x,animationFrame:E,shape:ne($),style:ae($),setGraphCenter:function(m,V){V.style.graphCenter=q}}]}function ne($){var x=$.center;return{points:ue(x),close:!0}}function ae($){var x=$.startAngle,E=$.endAngle,q=$.min,H=$.max,K=$.data,m=$.pointer,V=$.center,f=m.valueIndex,S=m.style,j=K[f]?K[f].value:0,I=(j-q)/(H-q)*(E-x)+x+Math.PI/2;return(0,k.deepMerge)({rotate:(0,k.radianToAngle)(I),scale:[1,1],graphCenter:V},S)}function ue($){var x=(0,n.default)($,2),E=x[0],q=x[1],H=[E,q-40],K=[E+5,q],m=[E,q+10],V=[E-5,q];return[H,K,m,V]}function X($){var x=$.startAngle,E=J($)[0];return E.style.rotate=(0,k.radianToAngle)(x+Math.PI/2),[E]}function te($){var x=$.detailsPosition,E=$.animationCurve,q=$.animationFrame,H=$.rLevel,K=$.details.show;return x.map(function(m,V){return{name:"numberText",index:H,visible:K,animationCurve:E,animationFrame:q,shape:ie($,V),style:le($,V)}})}function ie($,x){var E=$.detailsPosition,q=$.detailsContent,H=$.data,K=$.details,m=E[x],V=q[x],f=H[x].value,S=K.valueToFixed;return{number:[f],content:V,position:m,toFixed:S}}function le($,x){var E=$.details,q=$.data,H=E.style,K=q[x].color;return(0,k.deepMerge)({fill:K},H)}return It}var Vt={},Aa;function ac(){if(Aa)return Vt;Aa=1;var e=be;Object.defineProperty(Vt,"__esModule",{value:!0}),Vt.legend=k;var t=e(Ee),r=e(Ae()),n=e(Le()),i=Fe(),v=_e(),y=Re(),B=xe;function k(o){var w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},g=w.legend;g?(g=(0,B.deepMerge)((0,v.deepClone)(y.legendConfig,!0),g),g=M(g),g=N(g,w,o),g=Q(g,o),g=b(g,o),g=[g]):g=[],(0,i.doUpdate)({chart:o,series:g,key:"legendIcon",getGraphConfig:d}),(0,i.doUpdate)({chart:o,series:g,key:"legendText",getGraphConfig:l})}function M(o){var w=o.data;return o.data=w.map(function(g){var T=(0,n.default)(g);return T==="string"?{name:g}:T==="object"?g:{name:""}}),o}function N(o,w,g){var T=w.series,U=g.legendStatus,ee=o.data.filter(function(J){var ne=J.name,ae=T.find(function(ue){var X=ue.name;return ne===X});return ae?(J.color||(J.color=ae.color),J.icon||(J.icon=ae.type),J):!1});return(!U||U.length!==o.data.length)&&(U=new Array(o.data.length).fill(!0)),ee.forEach(function(J,ne){return J.status=U[ne]}),o.data=ee,g.legendStatus=U,o}function Q(o,w){var g=w.render.ctx,T=o.data,U=o.textStyle,ee=o.textUnselectedStyle;return T.forEach(function(J){var ne=J.status,ae=J.name;J.textWidth=D(g,ae,ne?U:ee)}),o}function D(o,w,g){return o.font=A(g),o.measureText(w).width}function A(o){var w=o.fontFamily,g=o.fontSize;return"".concat(g,"px ").concat(w)}function b(o,w){var g=o.orient;return g==="vertical"?C(o,w):z(o,w),o}function z(o,w){var g=o.iconHeight,T=o.itemGap,U=L(o,w),ee=U.map(function(ae){return G(ae,o,w)}),J=O(o,w),ne={textAlign:"left",textBaseline:"middle"};U.forEach(function(ae,ue){return ae.forEach(function(X){var te=X.iconPosition,ie=X.textPosition,le=ee[ue],$=J+ue*(T+g);X.iconPosition=P(te,[le,$]),X.textPosition=P(ie,[le,$]),X.align=ne})})}function L(o,w){var g=o.data,T=o.iconWidth,U=w.render.area[0],ee=0,J=[[]];return g.forEach(function(ne,ae){var ue=Y(ee,ae,o),X=ue+T+5+ne.textWidth;X>=U&&(ee=ae,ue=Y(ee,ae,o),J.push([])),ne.iconPosition=[ue,0],ne.textPosition=[ue+T+5,0],J.slice(-1)[0].push(ne)}),J}function Y(o,w,g){var T=g.data,U=g.iconWidth,ee=g.itemGap,J=T.slice(o,w);return(0,B.mulAdd)(J.map(function(ne){var ae=ne.textWidth;return ae}))+(w-o)*(ee+5+U)}function G(o,w,g){var T=w.left,U=w.right,ee=w.iconWidth,J=w.itemGap,ne=g.render.area[0],ae=o.length,ue=(0,B.mulAdd)(o.map(function(te){var ie=te.textWidth;return ie}))+ae*(5+ee)+(ae-1)*J,X=[T,U].findIndex(function(te){return te!=="auto"});return X===-1?(ne-ue)/2:X===0?typeof T=="number"?T:parseInt(T)/100*ne:(typeof U!="number"&&(U=parseInt(U)/100*ne),ne-(ue+U))}function O(o,w){var g=o.top,T=o.bottom,U=o.iconHeight,ee=w.render.area[1],J=[g,T].findIndex(function(te){return te!=="auto"}),ne=U/2;if(J===-1){var ae=w.gridArea,ue=ae.y,X=ae.h;return ue+X+45-ne}else return J===0?typeof g=="number"?g-ne:parseInt(g)/100*ee-ne:(typeof T!="number"&&(T=parseInt(T)/100*ee),ee-T-ne)}function P(o,w){var g=(0,r.default)(o,2),T=g[0],U=g[1],ee=(0,r.default)(w,2),J=ee[0],ne=ee[1];return[T+J,U+ne]}function C(o,w){var g=F(o,w),T=(0,r.default)(g,2),U=T[0],ee=T[1],J=_(o,w);p(o,U);var ne={textAlign:"left",textBaseline:"middle"};o.data.forEach(function(ae){var ue=ae.textPosition,X=ae.iconPosition;ae.textPosition=P(ue,[ee,J]),ae.iconPosition=P(X,[ee,J]),ae.align=ne})}function F(o,w){var g=o.left,T=o.right,U=w.render.area[0],ee=[g,T].findIndex(function(ne){return ne!=="auto"});if(ee===-1)return[!0,U-10];var J=[g,T][ee];return typeof J!="number"&&(J=parseInt(J)/100*U),[!!ee,J]}function _(o,w){var g=o.iconHeight,T=o.itemGap,U=o.data,ee=o.top,J=o.bottom,ne=w.render.area[1],ae=U.length,ue=ae*g+(ae-1)*T,X=[ee,J].findIndex(function(ie){return ie!=="auto"});if(X===-1)return(ne-ue)/2;var te=[ee,J][X];return typeof te!="number"&&(te=parseInt(te)/100*ne),X===1&&(te=ne-te-ue),te}function p(o,w){var g=o.data,T=o.iconWidth,U=o.iconHeight,ee=o.itemGap,J=U/2;g.forEach(function(ne,ae){var ue=ne.textWidth,X=(U+ee)*ae+J,te=w?0-T:0,ie=w?te-5-ue:T+5;ne.iconPosition=[te,X],ne.textPosition=[ie,X]})}function d(o,w){var g=o.data,T=o.selectAble,U=o.animationCurve,ee=o.animationFrame,J=o.rLevel;return g.map(function(ne,ae){return(0,t.default)({name:ne.icon==="line"?"lineIcon":"rect",index:J,visible:o.show,hover:T,click:T,animationCurve:U,animationFrame:ee,shape:a(o,ae),style:u(o,ae)},"click",W(o,ae,w))})}function a(o,w){var g=o.data,T=o.iconWidth,U=o.iconHeight,ee=(0,r.default)(g[w].iconPosition,2),J=ee[0],ne=ee[1],ae=U/2;return{x:J,y:ne-ae,w:T,h:U}}function u(o,w){var g=o.data,T=o.iconStyle,U=o.iconUnselectedStyle,ee=g[w],J=ee.status,ne=ee.color,ae=J?T:U;return(0,B.deepMerge)({fill:ne},ae)}function l(o,w){var g=o.data,T=o.selectAble,U=o.animationCurve,ee=o.animationFrame,J=o.rLevel;return g.map(function(ne,ae){return{name:"text",index:J,visible:o.show,hover:T,animationCurve:U,animationFrame:ee,hoverRect:R(o,ae),shape:s(o,ae),style:h(o,ae),click:W(o,ae,w)}})}function s(o,w){var g=o.data[w],T=g.textPosition,U=g.name;return{content:U,position:T}}function h(o,w){var g=o.textStyle,T=o.textUnselectedStyle,U=o.data[w],ee=U.status,J=U.align,ne=ee?g:T;return(0,B.deepMerge)((0,v.deepClone)(ne,!0),J)}function R(o,w){var g=o.textStyle,T=o.textUnselectedStyle,U=o.data[w],ee=U.status,J=(0,r.default)(U.textPosition,2),ne=J[0],ae=J[1],ue=U.textWidth,X=ee?g:T,te=X.fontSize;return[ne,ae-te/2,ue,te]}function W(o,w,g){var T=o.data[w].name;return function(){var U=g.chart,ee=U.legendStatus,J=U.option,ne=!ee[w],ae=J.series.find(function(ue){var X=ue.name;return X===T});ae.show=ne,ee[w]=ne,g.chart.setOption(J)}}return Vt}var La;function ic(){return La||(La=1,function(e){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"mergeColor",{enumerable:!0,get:function(){return t.mergeColor}}),Object.defineProperty(e,"title",{enumerable:!0,get:function(){return r.title}}),Object.defineProperty(e,"grid",{enumerable:!0,get:function(){return n.grid}}),Object.defineProperty(e,"axis",{enumerable:!0,get:function(){return i.axis}}),Object.defineProperty(e,"line",{enumerable:!0,get:function(){return v.line}}),Object.defineProperty(e,"bar",{enumerable:!0,get:function(){return y.bar}}),Object.defineProperty(e,"pie",{enumerable:!0,get:function(){return B.pie}}),Object.defineProperty(e,"radarAxis",{enumerable:!0,get:function(){return k.radarAxis}}),Object.defineProperty(e,"radar",{enumerable:!0,get:function(){return M.radar}}),Object.defineProperty(e,"gauge",{enumerable:!0,get:function(){return N.gauge}}),Object.defineProperty(e,"legend",{enumerable:!0,get:function(){return Q.legend}});var t=Hu(),r=Yu(),n=Xu(),i=Zu(),v=Ku(),y=Ju(),B=ec(),k=tc(),M=rc(),N=nc(),Q=ac()}(Er)),Er}var ja;function oc(){return ja||(ja=1,function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t(Le()),n=t(_t),i=t(Kr),v=_e(),y=ic(),B=function k(M){if((0,n.default)(this,k),!M)return console.error("Charts Missing parameters!"),!1;var N=M.clientWidth,Q=M.clientHeight,D=document.createElement("canvas");D.setAttribute("width",N),D.setAttribute("height",Q),M.appendChild(D);var A={container:M,canvas:D,render:new i.default(D),option:null};Object.assign(this,A)};e.default=B,B.prototype.setOption=function(k){var M=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(!k||(0,r.default)(k)!=="object")return console.error("setOption Missing parameters!"),!1;M&&this.render.graphs.forEach(function(Q){return Q.animationEnd()});var N=(0,v.deepClone)(k,!0);(0,y.mergeColor)(this,N),(0,y.grid)(this,N),(0,y.axis)(this,N),(0,y.radarAxis)(this,N),(0,y.title)(this,N),(0,y.bar)(this,N),(0,y.line)(this,N),(0,y.pie)(this,N),(0,y.radar)(this,N),(0,y.gauge)(this,N),(0,y.legend)(this,N),this.option=k,this.render.launchAnimation()},B.prototype.resize=function(){var k=this.container,M=this.canvas,N=this.render,Q=this.option,D=k.clientWidth,A=k.clientHeight;M.setAttribute("width",D),M.setAttribute("height",A),N.area=[D,A],this.setOption(Q)}}(dr)),dr}(function(e){var t=be;Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"changeDefaultConfig",{enumerable:!0,get:function(){return n.changeDefaultConfig}}),e.default=void 0;var r=t(oc()),n=Re(),i=r.default;e.default=i})(di);const md=ro(di);var Ni=_e();function sc(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:600,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,n;return function(){n&&clearTimeout(n);for(var i=arguments.length,v=new Array(i),y=0;y<i;y++)v[y]=arguments[y];if(r){e.apply(this,v),r=!1;return}n=setTimeout(e.bind.apply(e,[this].concat(v)),t)}}function lc(e,t){var r=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,n=new r(t);return n.observe(e,{attributes:!0,attributeFilter:["style"],attributeOldValue:!0}),n}function yd(e){var t=!1,r=!1,n=null;if(typeof e=="function"&&(e=e()),!e||typeof e.next!="function")return function(){return{}};return Promise.resolve().then(function(){t||i(e.next())}),{end:function(){t=!0,Promise.resolve().then(function(){e.return(),e=null})},pause:function(){t||(r=!0)},resume:function(){var y=n;!t&&r&&(r=!1,Promise.resolve(n).then(function(){!t&&!r&&y===n&&i(e.next())}))}};function i(v){return v.done?v.value:(n=v.value,Promise.resolve(v.value).then(function(){!t&&!r&&i(e.next())}))}}function bd(e){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var r=Math.random()*16|0,n=t==="x"?r:r&3|8;return n.toString(16)})}function xt(e){"@babel/helpers - typeof";return xt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},xt(e)}function ka(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function Oa(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?ka(Object(r),!0).forEach(function(n){uc(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ka(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function uc(e,t,r){return t=cc(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function cc(e){var t=fc(e,"string");return xt(t)=="symbol"?t:String(t)}function fc(e,t){if(xt(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(xt(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function dc(e,t){return gc(e)||vc(e,t)||hc(e,t)||pc()}function pc(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function hc(e,t){if(e){if(typeof e=="string")return Ea(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Ea(e,t)}}function Ea(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function vc(e,t){var r=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var n,i,v,y,B=[],k=!0,M=!1;try{if(v=(r=r.call(e)).next,t!==0)for(;!(k=(n=v.call(r)).done)&&(B.push(n.value),B.length!==t);k=!0);}catch(N){M=!0,i=N}finally{try{if(!k&&r.return!=null&&(y=r.return(),Object(y)!==y))return}finally{if(M)throw i}}return B}}function gc(e){if(Array.isArray(e))return e}function an(e){var t=se.useState({width:0,height:0}),r=dc(t,2),n=r[0],i=r[1],v=se.useRef(null),y=se.useCallback(function(){var B=v.current||{clientWidth:0,clientHeight:0},k=B.clientWidth,M=B.clientHeight;i({width:k,height:M}),v.current?(!k||!M)&&console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!"):console.warn("DataV: Failed to get dom node, component rendering may be abnormal!")},[]);return se.useImperativeHandle(e,function(){return{setWH:y}},[]),se.useEffect(function(){var B=sc(y,100);B();var k=lc(v.current,B);return window.addEventListener("resize",B),function(){window.removeEventListener("resize",B),k&&(k.disconnect(),k.takeRecords())}},[]),Oa(Oa({},n),{},{domRef:v,setWH:y})}var mc=["#3f96a5","#3f96a5"],yc=se.forwardRef(function(e,t){var r=e.className,n=e.style,i=e.color,v=e.dur,y=v===void 0?1.2:v,B=an(t),k=B.width,M=B.height,N=B.domRef,Q=se.useMemo(function(){return Fi(Ni.deepClone(mc,!0),i||[])},[i]),D=se.useMemo(function(){return"dv-decoration-5".concat(r?" ".concat(r):"")},[r]),A=se.useMemo(function(){var G=[[0,M*.2],[k*.18,M*.2],[k*.2,M*.4],[k*.25,M*.4],[k*.27,M*.6],[k*.72,M*.6],[k*.75,M*.4],[k*.8,M*.4],[k*.82,M*.2],[k,M*.2]],O=[[k*.3,M*.8],[k*.7,M*.8]],P=Kn(G),C=Kn(O),F=G.map(function(p){return p.join(",")}).join(" "),_=O.map(function(p){return p.join(",")}).join(" ");return{line1PointsString:F,line2PointsString:_,line1Length:P,line2Length:C}},[k,M]),b=A.line1PointsString,z=A.line2PointsString,L=A.line1Length,Y=A.line2Length;return c.jsx("div",{className:D,style:n,ref:N,children:c.jsxs("svg",{width:k,height:M,children:[c.jsx("polyline",{fill:"transparent",stroke:Q[0],strokeWidth:"3",points:b,children:c.jsx("animate",{attributeName:"stroke-dasharray",attributeType:"XML",from:"0, ".concat(L/2,", 0, ").concat(L/2),to:"0, 0, ".concat(L,", 0"),dur:"".concat(y,"s"),begin:"0s",calcMode:"spline",keyTimes:"0;1",keySplines:"0.4,1,0.49,0.98",repeatCount:"indefinite"})}),c.jsx("polyline",{fill:"transparent",stroke:Q[1],strokeWidth:"2",points:z,children:c.jsx("animate",{attributeName:"stroke-dasharray",attributeType:"XML",from:"0, ".concat(Y/2,", 0, ").concat(Y/2),to:"0, 0, ".concat(Y,", 0"),dur:"".concat(y,"s"),begin:"0s",calcMode:"spline",keyTimes:"0;1",keySplines:".4,1,.49,.98",repeatCount:"indefinite"})})]})})});function bc(e,t){return Sc(e)||Pc(e,t)||Cc(e,t)||xc()}function xc(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Cc(e,t){if(e){if(typeof e=="string")return Ma(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Ma(e,t)}}function Ma(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Pc(e,t){var r=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var n,i,v,y,B=[],k=!0,M=!1;try{if(v=(r=r.call(e)).next,t!==0)for(;!(k=(n=v.call(r)).done)&&(B.push(n.value),B.length!==t);k=!0);}catch(N){M=!0,i=N}finally{try{if(!k&&r.return!=null&&(y=r.return(),Object(y)!==y))return}finally{if(M)throw i}}return B}}function Sc(e){if(Array.isArray(e))return e}var _c=["#3f96a5","#3f96a5"],Ra=se.forwardRef(function(e,t){var r=e.className,n=e.style,i=e.color,v=e.reverse,y=v===void 0?!1:v,B=an(t),k=B.width,M=B.height,N=B.domRef,Q=se.useMemo(function(){return Fi(Ni.deepClone(_c,!0),i||[])},[i]),D=se.useMemo(function(){return"dv-decoration-8".concat(r?" ".concat(r):"")},[r]),A=se.useMemo(function(){var G=function(P){return y?k-P:P};return["".concat(G(0),", 0 ").concat(G(30),", ").concat(M/2),"".concat(G(20),", 0 ").concat(G(50),", ").concat(M/2," ").concat(G(k),", ").concat(M/2),"".concat(G(0),", ").concat(M-3,", ").concat(G(200),", ").concat(M-3)]},[y,k,M]),b=bc(A,3),z=b[0],L=b[1],Y=b[2];return c.jsx("div",{className:D,style:n,ref:N,children:c.jsxs("svg",{width:k,height:M,children:[c.jsx("polyline",{stroke:Q[0],strokeWidth:"2",fill:"transparent",points:z}),c.jsx("polyline",{stroke:Q[0],strokeWidth:"2",fill:"transparent",points:L}),c.jsx("polyline",{stroke:Q[1],fill:"transparent",strokeWidth:"3",points:Y})]})})}),wc=se.forwardRef(function(e,t){var r=e.children,n=e.className,i=e.style,v=an(t),y=v.domRef;return se.useLayoutEffect(function(){var B=window.screen,k=B.width,M=B.height;Object.assign(y.current.style,{width:"".concat(k,"px"),height:"".concat(M,"px")}),y.current.style.transform="scale(".concat(document.body.clientWidth/k,")")}),c.jsx("div",{id:"dv-full-screen-container",className:n,style:i,ref:y,children:r})});//! =============== 設定與常量 ===============
const Ac=["#3f96a5","#3f96a5"];//! =============== 樣式組件 ===============
const on=de.div`
  /* 布局定位 */
  display: flex;
  position: relative;
  height: 100%;
  align-items: center;
`,Lc=de.div`
  /* 布局定位 */
  display: flex;
  position: relative;
  width: 100%;
  height: 5.9375rem;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  /* 視覺樣式 */
  background-color: #080c34;
  background-image: linear-gradient(
    to right,
    rgba(0, 20, 80, 0.8),
    rgba(0, 10, 50, 0.9),
    rgba(0, 20, 80, 0.8)
  );
`,jc=de(on)`
  /* 布局定位 */
  flex: 1;
`,kc=de(on)`
  /* 布局定位 */
  flex: 2;
  justify-content: center;
`,Oc=de(on)`
  /* 布局定位 */
  flex: 1;
  justify-content: flex-end;
`,Ec=de.div`
  /* 布局定位 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  /* 視覺樣式 */
  font-size: 1.75rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 0.625rem rgba(0, 255, 255, 0.5);
`,Mc=({title:e="數據可視化標題",style:t={},decorationColor:r=Ac})=>{const n={color:r},i={...n,style:{width:"30.0625rem",height:"3.75rem"}};return c.jsxs(Lc,{style:t,id:"top-header",children:[c.jsx(jc,{children:c.jsx(Ra,{...i})}),c.jsxs(kc,{children:[c.jsx(yc,{...n,style:{width:"48.125rem",height:"3.75rem",marginTop:"2.1875rem"}}),c.jsx(Ec,{className:"center-title",children:e})]}),c.jsx(Oc,{children:c.jsx(Ra,{...i,reverse:!0})})]})},Rc=de.div`
  /* 基本設置確保佔滿視口 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000; /* 確保在最上層 */

  /* 重置可能繼承的樣式 */
  margin: 0;
  padding: 0;
  background-color: #fff; /* 或者你想要的背景色 */
  overflow: hidden;

  /* 防止影響其他元素 */
  isolation: isolate;
`;function Fc({children:e}){return c.jsx(Rc,{children:e})}const Fa=e=>{let t;const r=new Set,n=(M,N)=>{const Q=typeof M=="function"?M(t):M;if(!Object.is(Q,t)){const D=t;t=N??(typeof Q!="object"||Q===null)?Q:Object.assign({},t,Q),r.forEach(A=>A(t,D))}},i=()=>t,B={setState:n,getState:i,getInitialState:()=>k,subscribe:M=>(r.add(M),()=>r.delete(M))},k=t=e(n,i,B);return B},Tc=e=>e?Fa(e):Fa,$c=e=>e;function Dc(e,t=$c){const r=Qt.useSyncExternalStore(e.subscribe,()=>t(e.getState()),()=>t(e.getInitialState()));return Qt.useDebugValue(r),r}const zc=e=>{const t=Tc(e),r=n=>Dc(t,n);return Object.assign(r,t),r},Gc=e=>zc;function Bi(e,t){let r;try{r=e()}catch{return}return{getItem:i=>{var v;const y=k=>k===null?null:JSON.parse(k,void 0),B=(v=r.getItem(i))!=null?v:null;return B instanceof Promise?B.then(y):y(B)},setItem:(i,v)=>r.setItem(i,JSON.stringify(v,void 0)),removeItem:i=>r.removeItem(i)}}const zr=e=>t=>{try{const r=e(t);return r instanceof Promise?r:{then(n){return zr(n)(r)},catch(n){return this}}}catch(r){return{then(n){return this},catch(n){return zr(n)(r)}}}},Nc=(e,t)=>(r,n,i)=>{let v={storage:Bi(()=>localStorage),partialize:z=>z,version:0,merge:(z,L)=>({...L,...z}),...t},y=!1;const B=new Set,k=new Set;let M=v.storage;if(!M)return e((...z)=>{console.warn(`[zustand persist middleware] Unable to update item '${v.name}', the given storage is currently unavailable.`),r(...z)},n,i);const N=()=>{const z=v.partialize({...n()});return M.setItem(v.name,{state:z,version:v.version})},Q=i.setState;i.setState=(z,L)=>{Q(z,L),N()};const D=e((...z)=>{r(...z),N()},n,i);i.getInitialState=()=>D;let A;const b=()=>{var z,L;if(!M)return;y=!1,B.forEach(G=>{var O;return G((O=n())!=null?O:D)});const Y=((L=v.onRehydrateStorage)==null?void 0:L.call(v,(z=n())!=null?z:D))||void 0;return zr(M.getItem.bind(M))(v.name).then(G=>{if(G)if(typeof G.version=="number"&&G.version!==v.version){if(v.migrate){const O=v.migrate(G.state,G.version);return O instanceof Promise?O.then(P=>[!0,P]):[!0,O]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,G.state];return[!1,void 0]}).then(G=>{var O;const[P,C]=G;if(A=v.merge(C,(O=n())!=null?O:D),r(A,!0),P)return N()}).then(()=>{Y==null||Y(A,void 0),A=n(),y=!0,k.forEach(G=>G(A))}).catch(G=>{Y==null||Y(void 0,G)})};return i.persist={setOptions:z=>{v={...v,...z},z.storage&&(M=z.storage)},clearStorage:()=>{M==null||M.removeItem(v.name)},getOptions:()=>v,rehydrate:()=>b(),hasHydrated:()=>y,onHydrate:z=>(B.add(z),()=>{B.delete(z)}),onFinishHydration:z=>(k.add(z),()=>{k.delete(z)})},v.skipHydration||b(),A||D},Bc=Nc,qc=Gc()(Bc((e,t)=>({headerName:"戰情室",setHeaderName:r=>e({headerName:r}),resetHeaderName:()=>e({headerName:""})}),{name:"food-storage",storage:Bi(()=>sessionStorage)}));//! =============== 1. 樣式定義 ===============
const Ic=de.div`
  /* 布局定位 */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  /* 盒模型 */
  box-sizing: border-box;
  /* 視覺樣式 */
  background-color: #061639;
`,Vc=de.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: ${e=>e.$isEntry?"0":"0 1.25rem"};
  box-sizing: border-box;
`;//! =============== 2. 核心功能 ===============
function Wc(){const e=document.createElement("style");return e.textContent=`
    /* 🧠 只在組件渲染時應用，不影響全局 */
    body.temp-fullscreen-mode {
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
    }
  `,document.head.appendChild(e),document.body.classList.add("temp-fullscreen-mode"),()=>{document.body.classList.remove("temp-fullscreen-mode"),document.head.removeChild(e)}}const Ta=e=>["/ManufacturingLiveMonitor","/FactoryPerformanceDashboard"].some(r=>e.startsWith(r));function Uc(){const{headerName:e}=qc(),t=Ct(),[r,n]=se.useState(0);Qt.useLayoutEffect(()=>Wc(),[]);const i=()=>{console.log("ManufacturingLiveMonitor 錯誤邊界已重置")};return c.jsx(oi,{resetKey:r,onReset:i,children:c.jsx(Fc,{children:c.jsx(wc,{children:c.jsxs(Ic,{children:[!Ta(t.pathname)&&c.jsx(Mc,{title:e}),c.jsx(Vc,{$isEntry:Ta(t.pathname),children:c.jsx(Gr,{})})]})})})})}//! =============== 1. 動畫定義 ===============
const Qc=we`
  0% {
    transform: rotateX(0) rotateY(0);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
`,Hc=we`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`,Yc=we`
  0%, 100% {
    opacity: 0.9;
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 25px rgba(69, 156, 255, 0.7);
  }
`,Xc=we`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 0.6;
  }
`;//! =============== 2. 樣式組件 ===============
const Zc=de.div`
  /* 布局定位 */
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 盒模型 */
  /* width: 100vw; */
  /* height: 100vh; */
  margin: 0;
  padding: 0;
  min-height: 400px;

  /* 視覺樣式 */
  background: rgba(4% 6% 10% / 0.95);

  /* 其他屬性 */
  overflow: hidden;
  isolation: isolate;
`,Kc=de.div`
  /* 布局定位 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  /* 盒模型 */
  padding: 2rem;
`,Jc=de.div`
  /* 布局定位 */
  position: relative;

  /* 盒模型 */
  width: 80px;
  height: 80px;
  margin-bottom: 2rem;

  /* CSS3特效 */
  transform-style: preserve-3d;
  perspective: 500px;
  animation: ${Qc} 10s linear infinite;

  /* 響應式層 */
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-bottom: 1.5rem;
  }
`,Wt=de.div`
  /* 布局定位 */
  position: absolute;
  top: 0;
  left: 0;

  /* 盒模型 */
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid transparent;

  /* CSS3特效 */
  animation: ${Hc} 2s ease-in-out infinite;

  /* 根據索引不同應用不同樣式 */
  &:nth-child(1) {
    border-top-color: #4fc3f7;
    animation-delay: 0s;
    transform: rotateX(0deg) rotateY(0deg);
  }

  &:nth-child(2) {
    border-right-color: #2196f3;
    animation-delay: 0.5s;
    transform: rotateX(90deg) rotateY(0deg);
  }

  &:nth-child(3) {
    border-bottom-color: #1976d2;
    animation-delay: 1s;
    transform: rotateX(0deg) rotateY(90deg);
  }

  &:nth-child(4) {
    border-left-color: #0d47a1;
    animation-delay: 1.5s;
    transform: rotateX(45deg) rotateY(45deg);
  }
`,ef=de.div`
  /* 視覺樣式 */
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(100% 100% 100% / 0.9);
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
  text-shadow: 0 0 20px rgba(69, 156, 255, 0.5);

  /* CSS3特效 */
  animation: ${Yc} 2s ease-in-out infinite;

  /* 響應式層 */
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`,tf=de.div`
  /* 視覺樣式 */
  font-size: 0.9rem;
  color: rgba(100% 100% 100% / 0.6);
  letter-spacing: 0.02em;

  /* CSS3特效 */
  animation: ${Xc} 3s steps(40, end) 1;
`;function ft({children:e="載入中..."}){return c.jsx(Zc,{children:c.jsxs(Kc,{children:[c.jsxs(Jc,{children:[c.jsx(Wt,{}),c.jsx(Wt,{}),c.jsx(Wt,{}),c.jsx(Wt,{})]}),e&&c.jsx(ef,{children:e}),c.jsx(tf,{children:"正在建立安全連接..."})]})})}const rf="_card_16rt5_3",nf="_cardContent_16rt5_44",af="_iconContainer_16rt5_58",of="_icon_16rt5_58",sf="_title_16rt5_92",lf="_description_16rt5_103",uf="_stats_16rt5_115",cf="_statValue_16rt5_127",ff="_statTrend_16rt5_135",df="_trendUp_16rt5_152",pf="_trendDown_16rt5_158",hf="_trendStable_16rt5_164",vf="_cardOverlay_16rt5_182",gf="_cardRing_16rt5_202",mf="_container_16rt5_290",yf="_header_16rt5_309",bf="_systemInfo_16rt5_342",xf="_statusItem_16rt5_354",Cf="_statusLabel_16rt5_363",Pf="_statusValue_16rt5_373",Sf="_modulesGrid_16rt5_380",_f="_footer_16rt5_396",wf="_footerContent_16rt5_412",Af="_footerLinks_16rt5_431",Lf="_subpageHeader_16rt5_451",jf="_backButton_16rt5_471",kf="_backIcon_16rt5_497",Of="_compactStatus_16rt5_511",Ef="_statusDot_16rt5_521",Mf="_pulse_16rt5_1",Rf="_outletContainer_16rt5_554",me={card:rf,cardContent:nf,iconContainer:af,icon:of,title:sf,description:lf,stats:uf,statValue:cf,statTrend:ff,trendUp:df,trendDown:pf,trendStable:hf,cardOverlay:vf,cardRing:gf,"js-tilt-glare":"_js-tilt-glare_16rt5_220","js-tilt-glare-inner":"_js-tilt-glare-inner_16rt5_238",container:mf,header:yf,systemInfo:bf,statusItem:xf,statusLabel:Cf,statusValue:Pf,modulesGrid:Sf,footer:_f,footerContent:wf,footerLinks:Af,subpageHeader:Lf,backButton:jf,backIcon:kf,compactStatus:Of,statusDot:Ef,pulse:Mf,outletContainer:Rf};class Me{constructor(t,r={}){if(!(t instanceof Node))throw"Can't initialize VanillaTilt because "+t+" is not a Node.";this.width=null,this.height=null,this.clientWidth=null,this.clientHeight=null,this.left=null,this.top=null,this.gammazero=null,this.betazero=null,this.lastgammazero=null,this.lastbetazero=null,this.transitionTimeout=null,this.updateCall=null,this.event=null,this.updateBind=this.update.bind(this),this.resetBind=this.reset.bind(this),this.element=t,this.settings=this.extendSettings(r),this.reverse=this.settings.reverse?-1:1,this.resetToStart=Me.isSettingTrue(this.settings["reset-to-start"]),this.glare=Me.isSettingTrue(this.settings.glare),this.glarePrerender=Me.isSettingTrue(this.settings["glare-prerender"]),this.fullPageListening=Me.isSettingTrue(this.settings["full-page-listening"]),this.gyroscope=Me.isSettingTrue(this.settings.gyroscope),this.gyroscopeSamples=this.settings.gyroscopeSamples,this.elementListener=this.getElementListener(),this.glare&&this.prepareGlare(),this.fullPageListening&&this.updateClientSize(),this.addEventListeners(),this.reset(),this.resetToStart===!1&&(this.settings.startX=0,this.settings.startY=0)}static isSettingTrue(t){return t===""||t===!0||t===1}getElementListener(){if(this.fullPageListening)return window.document;if(typeof this.settings["mouse-event-element"]=="string"){const t=document.querySelector(this.settings["mouse-event-element"]);if(t)return t}return this.settings["mouse-event-element"]instanceof Node?this.settings["mouse-event-element"]:this.element}addEventListeners(){this.onMouseEnterBind=this.onMouseEnter.bind(this),this.onMouseMoveBind=this.onMouseMove.bind(this),this.onMouseLeaveBind=this.onMouseLeave.bind(this),this.onWindowResizeBind=this.onWindowResize.bind(this),this.onDeviceOrientationBind=this.onDeviceOrientation.bind(this),this.elementListener.addEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.addEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.addEventListener("mousemove",this.onMouseMoveBind),(this.glare||this.fullPageListening)&&window.addEventListener("resize",this.onWindowResizeBind),this.gyroscope&&window.addEventListener("deviceorientation",this.onDeviceOrientationBind)}removeEventListeners(){this.elementListener.removeEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.removeEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.removeEventListener("mousemove",this.onMouseMoveBind),this.gyroscope&&window.removeEventListener("deviceorientation",this.onDeviceOrientationBind),(this.glare||this.fullPageListening)&&window.removeEventListener("resize",this.onWindowResizeBind)}destroy(){clearTimeout(this.transitionTimeout),this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.element.style.willChange="",this.element.style.transition="",this.element.style.transform="",this.resetGlare(),this.removeEventListeners(),this.element.vanillaTilt=null,delete this.element.vanillaTilt,this.element=null}onDeviceOrientation(t){if(t.gamma===null||t.beta===null)return;this.updateElementPosition(),this.gyroscopeSamples>0&&(this.lastgammazero=this.gammazero,this.lastbetazero=this.betazero,this.gammazero===null?(this.gammazero=t.gamma,this.betazero=t.beta):(this.gammazero=(t.gamma+this.lastgammazero)/2,this.betazero=(t.beta+this.lastbetazero)/2),this.gyroscopeSamples-=1);const r=this.settings.gyroscopeMaxAngleX-this.settings.gyroscopeMinAngleX,n=this.settings.gyroscopeMaxAngleY-this.settings.gyroscopeMinAngleY,i=r/this.width,v=n/this.height,y=t.gamma-(this.settings.gyroscopeMinAngleX+this.gammazero),B=t.beta-(this.settings.gyroscopeMinAngleY+this.betazero),k=y/i,M=B/v;this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.event={clientX:k+this.left,clientY:M+this.top},this.updateCall=requestAnimationFrame(this.updateBind)}onMouseEnter(){this.updateElementPosition(),this.element.style.willChange="transform",this.setTransition()}onMouseMove(t){this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.event=t,this.updateCall=requestAnimationFrame(this.updateBind)}onMouseLeave(){this.setTransition(),this.settings.reset&&requestAnimationFrame(this.resetBind)}reset(){this.onMouseEnter(),this.fullPageListening?this.event={clientX:(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.clientWidth,clientY:(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.clientHeight}:this.event={clientX:this.left+(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.width,clientY:this.top+(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.height};let t=this.settings.scale;this.settings.scale=1,this.update(),this.settings.scale=t,this.resetGlare()}resetGlare(){this.glare&&(this.glareElement.style.transform="rotate(180deg) translate(-50%, -50%)",this.glareElement.style.opacity="0")}getValues(){let t,r;this.fullPageListening?(t=this.event.clientX/this.clientWidth,r=this.event.clientY/this.clientHeight):(t=(this.event.clientX-this.left)/this.width,r=(this.event.clientY-this.top)/this.height),t=Math.min(Math.max(t,0),1),r=Math.min(Math.max(r,0),1);let n=(this.reverse*(this.settings.max-t*this.settings.max*2)).toFixed(2),i=(this.reverse*(r*this.settings.max*2-this.settings.max)).toFixed(2),v=Math.atan2(this.event.clientX-(this.left+this.width/2),-(this.event.clientY-(this.top+this.height/2)))*(180/Math.PI);return{tiltX:n,tiltY:i,percentageX:t*100,percentageY:r*100,angle:v}}updateElementPosition(){let t=this.element.getBoundingClientRect();this.width=this.element.offsetWidth,this.height=this.element.offsetHeight,this.left=t.left,this.top=t.top}update(){let t=this.getValues();this.element.style.transform="perspective("+this.settings.perspective+"px) rotateX("+(this.settings.axis==="x"?0:t.tiltY)+"deg) rotateY("+(this.settings.axis==="y"?0:t.tiltX)+"deg) scale3d("+this.settings.scale+", "+this.settings.scale+", "+this.settings.scale+")",this.glare&&(this.glareElement.style.transform=`rotate(${t.angle}deg) translate(-50%, -50%)`,this.glareElement.style.opacity=`${t.percentageY*this.settings["max-glare"]/100}`),this.element.dispatchEvent(new CustomEvent("tiltChange",{detail:t})),this.updateCall=null}prepareGlare(){if(!this.glarePrerender){const t=document.createElement("div");t.classList.add("js-tilt-glare");const r=document.createElement("div");r.classList.add("js-tilt-glare-inner"),t.appendChild(r),this.element.appendChild(t)}this.glareElementWrapper=this.element.querySelector(".js-tilt-glare"),this.glareElement=this.element.querySelector(".js-tilt-glare-inner"),!this.glarePrerender&&(Object.assign(this.glareElementWrapper.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden","pointer-events":"none","border-radius":"inherit"}),Object.assign(this.glareElement.style,{position:"absolute",top:"50%",left:"50%","pointer-events":"none","background-image":"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",transform:"rotate(180deg) translate(-50%, -50%)","transform-origin":"0% 0%",opacity:"0"}),this.updateGlareSize())}updateGlareSize(){if(this.glare){const t=(this.element.offsetWidth>this.element.offsetHeight?this.element.offsetWidth:this.element.offsetHeight)*2;Object.assign(this.glareElement.style,{width:`${t}px`,height:`${t}px`})}}updateClientSize(){this.clientWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,this.clientHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}onWindowResize(){this.updateGlareSize(),this.updateClientSize()}setTransition(){clearTimeout(this.transitionTimeout),this.element.style.transition=this.settings.speed+"ms "+this.settings.easing,this.glare&&(this.glareElement.style.transition=`opacity ${this.settings.speed}ms ${this.settings.easing}`),this.transitionTimeout=setTimeout(()=>{this.element.style.transition="",this.glare&&(this.glareElement.style.transition="")},this.settings.speed)}extendSettings(t){let r={reverse:!1,max:15,startX:0,startY:0,perspective:1e3,easing:"cubic-bezier(.03,.98,.52,.99)",scale:1,speed:300,transition:!0,axis:null,glare:!1,"max-glare":1,"glare-prerender":!1,"full-page-listening":!1,"mouse-event-element":null,reset:!0,"reset-to-start":!0,gyroscope:!0,gyroscopeMinAngleX:-45,gyroscopeMaxAngleX:45,gyroscopeMinAngleY:-45,gyroscopeMaxAngleY:45,gyroscopeSamples:10},n={};for(var i in r)if(i in t)n[i]=t[i];else if(this.element.hasAttribute("data-tilt-"+i)){let v=this.element.getAttribute("data-tilt-"+i);try{n[i]=JSON.parse(v)}catch{n[i]=v}}else n[i]=r[i];return n}static init(t,r){t instanceof Node&&(t=[t]),t instanceof NodeList&&(t=[].slice.call(t)),t instanceof Array&&t.forEach(n=>{"vanillaTilt"in n||(n.vanillaTilt=new Me(n,r))})}}typeof document<"u"&&(window.VanillaTilt=Me,Me.init(document.querySelectorAll("[data-tilt]")));function Ff({title:e,description:t,icon:r,color:n,stats:i,onClick:v}){const y=se.useRef(null);se.useEffect(()=>(y.current&&Me.init(y.current,{max:10,speed:400,glare:!0,"max-glare":.3,scale:1.05,perspective:1e3,gyroscope:!1,transition:!0,easing:"cubic-bezier(.03,.98,.52,.99)"}),()=>{y.current&&y.current.vanillaTilt&&y.current.vanillaTilt.destroy()}),[]);const B=M=>{switch(M){case"up":return me.trendUp;case"down":return me.trendDown;default:return me.trendStable}},k=M=>{switch(M){case"up":return"trending_up";case"down":return"trending_down";default:return"trending_flat"}};return c.jsx("div",{ref:y,className:me.card,onClick:v,style:{"--card-color":n,"--card-gradient":`linear-gradient(135deg, ${n} 0%, rgba(0,0,0,0.7) 100%)`},"data-tilt-glare":!0,children:c.jsxs("div",{className:me.cardContent,children:[c.jsx("div",{className:me.iconContainer,children:c.jsx("span",{className:`${me.icon} material-icons`,children:r})}),c.jsx("h2",{className:me.title,children:e}),c.jsx("p",{className:me.description,children:t}),i&&c.jsxs("div",{className:me.stats,children:[c.jsx("div",{className:me.statValue,children:i.value}),c.jsxs("div",{className:`${me.statTrend} ${B(i.trend)}`,children:[c.jsx("span",{className:"material-icons",children:k(i.trend)}),c.jsx("span",{children:i.change})]})]}),c.jsx("div",{className:me.cardOverlay}),c.jsx("div",{className:me.cardRing})]})})}const Tf=(e,t="Harry's </> Corner")=>{se.useEffect(()=>{const r=document.title;return document.title=e?`${e} | ${t}`:t,()=>{document.title=r}},[e,t])};//! =============== 1. 設定與常量 ===============
const $f=[{id:"realtime-oee",title:"OEE 即時監控",description:"即時監控生產線效率，包含設備運作狀態、產能以及良率指標",icon:"dashboard",path:"/RealTimeOEEMonitor",color:"rgba(0, 123, 255, 0.85)",stats:{value:"87.2%",trend:"up",change:"2.4%"}},{id:"production-progress",title:"生產進度追蹤",description:"監控各產線生產進度，提供工單達成率、實際生產數量與計劃比較",icon:"trending_up",path:"/ProductionProgressTracker",color:"rgba(40, 167, 69, 0.85)",stats:{value:"94.5%",trend:"up",change:"3.7%"}},{id:"delivery-trend",title:"交貨趨勢分析",description:"分析出貨數據趨勢，預測未來產能需求及規劃",icon:"assessment",path:"/DeliveryTrendAnalyzer",color:"rgba(255, 193, 7, 0.85)",stats:{value:"98.3%",trend:"stable",change:"0.2%"}},{id:"oee-insight",title:"OEE 深度分析",description:"深入分析設備OEE指標，找出瓶頸及改善方向",icon:"insights",path:"/OEEInsightSystem",color:"rgba(220, 53, 69, 0.85)",stats:{value:"76.8%",trend:"down",change:"1.5%"}},{id:"factory-performance",title:"工廠績效儀表板",description:"全廠生產線即時狀態監控，包含設備狀態、良率及完成率指標",icon:"factory",path:"/FactoryPerformanceDashboard",color:"rgba(111, 66, 193, 0.85)",stats:{value:"82.5%",trend:"up",change:"1.8%"}}];function Df(){Tf("製造現場監控中心");const e=$a(),t=Ct(),[r,n]=se.useState(!0),[i,v]=se.useState({lastUpdate:new Date().toLocaleString(),activeLines:12,alertCount:3,systemHealth:"98.7%"});se.useEffect(()=>{n(t.pathname==="/ManufacturingLiveMonitor");const k=setInterval(()=>{v(M=>({...M,lastUpdate:new Date().toLocaleString(),alertCount:Math.floor(Math.random()*5),systemHealth:(97+Math.random()*3).toFixed(1)+"%"}))},15e3);return()=>clearInterval(k)},[t.pathname]);const y=k=>{e(k)},B=()=>{e("/ManufacturingLiveMonitor")};return c.jsx("div",{className:me.container,children:r?c.jsxs(c.Fragment,{children:[c.jsxs("header",{className:me.header,children:[c.jsx("h1",{className:me.title,children:"製造監控中心"}),c.jsxs("div",{className:me.systemInfo,children:[c.jsxs("div",{className:me.statusItem,children:[c.jsx("span",{className:me.statusLabel,children:"最後更新"}),c.jsx("span",{className:me.statusValue,children:i.lastUpdate})]}),c.jsxs("div",{className:me.statusItem,children:[c.jsx("span",{className:me.statusLabel,children:"運行產線"}),c.jsx("span",{className:me.statusValue,children:i.activeLines})]}),c.jsxs("div",{className:me.statusItem,children:[c.jsx("span",{className:me.statusLabel,children:"活動警報"}),c.jsx("span",{className:me.statusValue,children:i.alertCount})]}),c.jsxs("div",{className:me.statusItem,children:[c.jsx("span",{className:me.statusLabel,children:"系統狀態"}),c.jsx("span",{className:me.statusValue,children:i.systemHealth})]})]})]}),c.jsx("div",{className:me.modulesGrid,children:$f.map(k=>c.jsx(Ff,{title:k.title,description:k.description,icon:k.icon,color:k.color,stats:k.stats,onClick:()=>y(k.path)},k.id))}),c.jsx("footer",{className:me.footer,children:c.jsxs("div",{className:me.footerContent,children:[c.jsxs("p",{children:["© ",new Date().getFullYear()," 製造智能監控系統 - v1.2.0"]}),c.jsxs("div",{className:me.footerLinks,children:[c.jsx("a",{href:"#help",children:"系統說明"}),c.jsx("a",{href:"#settings",children:"系統設定"}),c.jsx("a",{href:"#contact",children:"聯絡支援"})]})]})})]}):c.jsxs(c.Fragment,{children:[c.jsxs("div",{className:me.subpageHeader,children:[c.jsxs("button",{className:me.backButton,onClick:B,children:[c.jsx("span",{className:me.backIcon,children:"arrow_back"}),"返回儀表板"]}),c.jsxs("div",{className:me.compactStatus,children:[c.jsx("div",{className:me.statusDot}),"系統正常運行中 | 最後更新: ",i.lastUpdate]})]}),c.jsx("div",{className:me.outletContainer,children:c.jsx(Gr,{})})]})})}const zf=se.lazy(()=>Pe(()=>import("./Home-DOsdu719.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]))),Gf=se.lazy(()=>Pe(()=>import("./Timeline-lTQXI7EC.js"),__vite__mapDeps([10,1,2,4,5,3,6,8,9]))),Nf=se.lazy(()=>Pe(()=>import("./About-CqIPwrhk.js"),__vite__mapDeps([11,1,2,4,5,3,6,8,9]))),Bf=se.lazy(()=>Pe(()=>import("./Contact-7u-6tx0j.js"),__vite__mapDeps([12,1,2,4,5,3,6,8,9]))),qf=se.lazy(()=>Pe(()=>import("./ProjectShowcase-Ci6cTawa.js"),__vite__mapDeps([13,1,2,7,4,14,3,6,8,9]))),If=se.lazy(()=>Pe(()=>import("./DesignToken-CkwM-HAm.js"),__vite__mapDeps([15,1,2,4,5,6,9,8,14,3]))),Vf=se.lazy(()=>Pe(()=>import("./PigSystemLayout-BmD823H4.js"),__vite__mapDeps([16,1,2,6,9,8,3]))),Wf=se.lazy(()=>Pe(()=>import("./Boargenotype-p7Wzoz4U.js"),__vite__mapDeps([17,1,2,18,6,7,9,8,3]))),Uf=se.lazy(()=>Pe(()=>import("./CullingBoar-OpoTcotz.js"),__vite__mapDeps([19,1,2,18,6,7,9,8,3]))),Qf=se.lazy(()=>Pe(()=>import("./PigHouseInventory-BlQ2RpMg.js"),__vite__mapDeps([20,1,2,8,18,6,7,9,3]))),Hf=se.lazy(()=>Pe(()=>import("./SowBreedingRecords-Bf2LwuwS.js"),__vite__mapDeps([21,1,2,18,6,7,9,8,3]))),We=(e,t)=>se.lazy(()=>e().then(r=>r)),Yf=We(()=>Pe(()=>import("./index-B_vi-6N3.js"),__vite__mapDeps([22,1,2,23,8,24,25,26,6]))),Xf=We(()=>Pe(()=>import("./index-A6q5SNz4.js"),__vite__mapDeps([27,1,2,28,6,29,30,31,3,8,9]))),Zf=We(()=>Pe(()=>import("./index-BxIL-yUb.js"),__vite__mapDeps([32,1,2,29,6,28,25,26,3,8,9]))),Kf=We(()=>Pe(()=>import("./index-DeN_0nfL.js"),__vite__mapDeps([33,1,2,3,29,6,28,31,8,9]))),Jf=We(()=>Pe(()=>import("./index-DvPquFwY.js"),__vite__mapDeps([34,1,2,29,6,31,30,3,8,9]))),ed=We(()=>Pe(()=>import("./Index-Cw6rsFJh.js"),__vite__mapDeps([35,1,2,6,3,8,9]))),td=We(()=>Pe(()=>import("./index-B0GEfybX.js"),__vite__mapDeps([36,1,2,23,8,24,26,6,25,3,9]))),rd=no([{path:"/",element:c.jsx(ql,{}),errorElement:c.jsx(Rt,{}),children:[{index:!0,element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(zf,{})})},{path:"timeline",element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(Gf,{})})},{path:"about",element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(Nf,{})})},{path:"contact",element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(Bf,{})})},{path:"project-showcase",element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(qf,{})})},{path:"design-token",element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(If,{})})},{path:"dynamic-timeline",element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(Yf,{})})},{path:"wise-scheduling",element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(td,{})})},{path:"*",element:c.jsx(Rt,{})}]},{element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(Vf,{})}),errorElement:c.jsx(Rt,{}),children:[{path:"boargenotype",element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(Wf,{})})},{path:"culling-boar",element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(Uf,{})})},{path:"pig-house-inventory",element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(Qf,{})})},{path:"sow-breeding-records",element:c.jsx(se.Suspense,{fallback:c.jsx(je,{}),children:c.jsx(Hf,{})})}]},{element:c.jsx(Uc,{}),errorElement:c.jsx(Rt,{}),children:[{index:!0,path:"ManufacturingLiveMonitor",element:c.jsx(Df,{})},{path:"FactoryPerformanceDashboard",element:c.jsx(se.Suspense,{fallback:c.jsx(ft,{children:"載入製造現場即時監控中..."}),children:c.jsx(ed,{})})},{path:"RealTimeOEEMonitor",element:c.jsx(se.Suspense,{fallback:c.jsx(ft,{children:"載入製造現場即時監控中..."}),children:c.jsx(Xf,{})})},{path:"ProductionProgressTracker",element:c.jsx(se.Suspense,{fallback:c.jsx(ft,{children:"載入製造現場即時監控中..."}),children:c.jsx(Zf,{})})},{path:"DeliveryTrendAnalyzer",element:c.jsx(se.Suspense,{fallback:c.jsx(ft,{children:"載入製造現場即時監控中..."}),children:c.jsx(Kf,{})})},{path:"OEEInsightSystem",element:c.jsx(se.Suspense,{fallback:c.jsx(ft,{children:"載入製造現場即時監控中..."}),children:c.jsx(Jf,{})})}]}]);function nd(){return c.jsx(ao,{router:rd})}const ad=()=>{//! =============== 1. 設定與常量 ===============
const e={colors:{primary:"#42a5f5",primaryDark:"#1976d2",secondary:"#ff4081",text:"#ffffff",lightText:"#b0b0b0",background:"#1a1a1a",cardBackground:"#2c2c2c",border:"#404040",error:"#ff5252",success:"#69f0ae",warning:"#ffab40"},fonts:{main:'"Free HK Kai", "Noto Serif TC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',headings:'"Free HK Kai", "Noto Serif TC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',system:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'},spacing:{xs:"0.25rem",sm:"0.5rem",md:"1rem",lg:"1.5rem",xl:"2rem","2xl":"3rem","3xl":"4rem"},borderRadius:{sm:"0.125rem",md:"0.25rem",lg:"0.5rem",xl:"1rem",full:"9999px"},shadows:{sm:"0 1px 2px rgba(0, 0, 0, 0.05)",md:"0 2px 4px rgba(0, 0, 0, 0.1)",lg:"0 5px 15px rgba(0, 0, 0, 0.1)",xl:"0 10px 25px rgba(0, 0, 0, 0.1)","2xl":"0 20px 40px rgba(0, 0, 0, 0.1)"},breakpoints:{mobile:"576px",tablet:"768px",desktop:"992px",largeDesktop:"1200px",wide:"1440px",ultrawide:"1920px",tv:"2560px",bigtv:"3440px",tv50:"4096px"},fontSizes:{xs:"0.875rem",sm:"1rem",base:"1.125rem",lg:"1.25rem",xl:"1.5rem","2xl":"1.75rem","3xl":"2.125rem","4xl":"2.5rem","5xl":"3.25rem","6xl":"4rem","7xl":"4.75rem"}},t={wide:{xs:"0.8125rem",sm:"0.9375rem",base:"1.0625rem",lg:"1.1875rem",xl:"1.375rem","2xl":"1.625rem","3xl":"2rem","4xl":"2.5rem","5xl":"3.25rem","6xl":"4rem","7xl":"5rem"},ultrawide:{xs:"0.875rem",sm:"1rem",base:"1.125rem",lg:"1.25rem",xl:"1.5rem","2xl":"1.75rem","3xl":"2.25rem","4xl":"2.75rem","5xl":"3.5rem","6xl":"4.5rem","7xl":"5.5rem"},tv:{xs:"1rem",sm:"1.125rem",base:"1.25rem",lg:"1.5rem",xl:"1.75rem","2xl":"2rem","3xl":"2.5rem","4xl":"3rem","5xl":"4rem","6xl":"5rem","7xl":"6rem"},bigtv:{xs:"1.25rem",sm:"1.5rem",base:"1.75rem",lg:"2rem",xl:"2.25rem","2xl":"2.75rem","3xl":"3.25rem","4xl":"4rem","5xl":"5rem","6xl":"6rem","7xl":"7.5rem"},tv50:{xs:"1.5rem",sm:"1.75rem",base:"2rem",lg:"2.5rem",xl:"3rem","2xl":"3.5rem","3xl":"4rem","4xl":"5rem","5xl":"6rem","6xl":"7.5rem","7xl":"9rem"}},r={background:{primary:"#010D15",secondary:"#000000",surface:"#FFFFFF",surfaceAlt:"#EFEFEF"},accent:{primary:"#1593EB",primaryHover:"#0d7acc",primaryLight:"#6fb9f0"},border:{primary:"#1593EB",light:"#E0EBF0",medium:"#EFEFEF",dark:"#010D15"},text:{primary:"#000000",secondary:"#010D15",tertiary:"#6a6a6a",inverse:"#FFFFFF",inverseSecondary:"#E0EBF0",accent:"#1593EB"}},n={primary:e.colors.primary,primaryDark:e.colors.primaryDark,secondary:e.colors.secondary,text:e.colors.text,lightText:e.colors.lightText,background:e.colors.background,cardBackground:e.colors.cardBackground,border:e.colors.border,error:e.colors.error,success:e.colors.success,warning:e.colors.warning,accent:r.accent,backgroundTokens:r.background,borderTokens:r.border,textTokens:r.text};return{...e,colors:n,responsiveFontSizes:t}},pe=ad();Wa`
  :root {
    /* 基礎字體大小變數 */
    --font-size-xs: ${pe.fontSizes.xs};
    --font-size-sm: ${pe.fontSizes.sm};
    --font-size-base: ${pe.fontSizes.base};
    --font-size-lg: ${pe.fontSizes.lg};
    --font-size-xl: ${pe.fontSizes.xl};
    --font-size-2xl: ${pe.fontSizes["2xl"]};
    --font-size-3xl: ${pe.fontSizes["3xl"]};
    --font-size-4xl: ${pe.fontSizes["4xl"]};
    --font-size-5xl: ${pe.fontSizes["5xl"]};
    --font-size-6xl: ${pe.fontSizes["6xl"]};
    --font-size-7xl: ${pe.fontSizes["7xl"]};
  }

  /* 基礎字體大小類別 */
  .text-xs { font-size: var(--font-size-xs); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-base { font-size: var(--font-size-base); }
  .text-lg { font-size: var(--font-size-lg); }
  .text-xl { font-size: var(--font-size-xl); }
  .text-2xl { font-size: var(--font-size-2xl); }
  .text-3xl { font-size: var(--font-size-3xl); }
  .text-4xl { font-size: var(--font-size-4xl); }
  .text-5xl { font-size: var(--font-size-5xl); }
  .text-6xl { font-size: var(--font-size-6xl); }
  .text-7xl { font-size: var(--font-size-7xl); }

  /* 寬螢幕斷點 (wide): 1440px - 適合寬螢幕桌機 */
  @media (min-width: ${pe.breakpoints.wide}) {
    :root {
      --font-size-xs: ${pe.responsiveFontSizes.wide.xs};
      --font-size-sm: ${pe.responsiveFontSizes.wide.sm};
      --font-size-base: ${pe.responsiveFontSizes.wide.base};
      --font-size-lg: ${pe.responsiveFontSizes.wide.lg};
      --font-size-xl: ${pe.responsiveFontSizes.wide.xl};
      --font-size-2xl: ${pe.responsiveFontSizes.wide["2xl"]};
      --font-size-3xl: ${pe.responsiveFontSizes.wide["3xl"]};
      --font-size-4xl: ${pe.responsiveFontSizes.wide["4xl"]};
      --font-size-5xl: ${pe.responsiveFontSizes.wide["5xl"]};
      --font-size-6xl: ${pe.responsiveFontSizes.wide["6xl"]};
      --font-size-7xl: ${pe.responsiveFontSizes.wide["7xl"]};
    }
  }

  /* 超寬螢幕斷點 (ultrawide): 1920px - 適合超寬螢幕和小型電視 */
  @media (min-width: ${pe.breakpoints.ultrawide}) {
    :root {
      --font-size-xs: ${pe.responsiveFontSizes.ultrawide.xs};
      --font-size-sm: ${pe.responsiveFontSizes.ultrawide.sm};
      --font-size-base: ${pe.responsiveFontSizes.ultrawide.base};
      --font-size-lg: ${pe.responsiveFontSizes.ultrawide.lg};
      --font-size-xl: ${pe.responsiveFontSizes.ultrawide.xl};
      --font-size-2xl: ${pe.responsiveFontSizes.ultrawide["2xl"]};
      --font-size-3xl: ${pe.responsiveFontSizes.ultrawide["3xl"]};
      --font-size-4xl: ${pe.responsiveFontSizes.ultrawide["4xl"]};
      --font-size-5xl: ${pe.responsiveFontSizes.ultrawide["5xl"]};
      --font-size-6xl: ${pe.responsiveFontSizes.ultrawide["6xl"]};
      --font-size-7xl: ${pe.responsiveFontSizes.ultrawide["7xl"]};
    }
  }

  /* 電視螢幕斷點 (tv): 2560px - 適合大型顯示器和中型電視 */
  @media (min-width: ${pe.breakpoints.tv}) {
    :root {
      --font-size-xs: ${pe.responsiveFontSizes.tv.xs};
      --font-size-sm: ${pe.responsiveFontSizes.tv.sm};
      --font-size-base: ${pe.responsiveFontSizes.tv.base};
      --font-size-lg: ${pe.responsiveFontSizes.tv.lg};
      --font-size-xl: ${pe.responsiveFontSizes.tv.xl};
      --font-size-2xl: ${pe.responsiveFontSizes.tv["2xl"]};
      --font-size-3xl: ${pe.responsiveFontSizes.tv["3xl"]};
      --font-size-4xl: ${pe.responsiveFontSizes.tv["4xl"]};
      --font-size-5xl: ${pe.responsiveFontSizes.tv["5xl"]};
      --font-size-6xl: ${pe.responsiveFontSizes.tv["6xl"]};
      --font-size-7xl: ${pe.responsiveFontSizes.tv["7xl"]};
    }
  }

  /* 大型電視螢幕斷點 (bigtv): 3440px - 適合超寬和大型電視 */
  @media (min-width: ${pe.breakpoints.bigtv}) {
    :root {
      --font-size-xs: ${pe.responsiveFontSizes.bigtv.xs};
      --font-size-sm: ${pe.responsiveFontSizes.bigtv.sm};
      --font-size-base: ${pe.responsiveFontSizes.bigtv.base};
      --font-size-lg: ${pe.responsiveFontSizes.bigtv.lg};
      --font-size-xl: ${pe.responsiveFontSizes.bigtv.xl};
      --font-size-2xl: ${pe.responsiveFontSizes.bigtv["2xl"]};
      --font-size-3xl: ${pe.responsiveFontSizes.bigtv["3xl"]};
      --font-size-4xl: ${pe.responsiveFontSizes.bigtv["4xl"]};
      --font-size-5xl: ${pe.responsiveFontSizes.bigtv["5xl"]};
      --font-size-6xl: ${pe.responsiveFontSizes.bigtv["6xl"]};
      --font-size-7xl: ${pe.responsiveFontSizes.bigtv["7xl"]};
    }
  }

  /* 50吋電視螢幕斷點 (tv50): 4096px+ - 適合50吋以上大型電視 */
  @media (min-width: ${pe.breakpoints.tv50}) {
    :root {
      --font-size-xs: ${pe.responsiveFontSizes.tv50.xs};
      --font-size-sm: ${pe.responsiveFontSizes.tv50.sm};
      --font-size-base: ${pe.responsiveFontSizes.tv50.base};
      --font-size-lg: ${pe.responsiveFontSizes.tv50.lg};
      --font-size-xl: ${pe.responsiveFontSizes.tv50.xl};
      --font-size-2xl: ${pe.responsiveFontSizes.tv50["2xl"]};
      --font-size-3xl: ${pe.responsiveFontSizes.tv50["3xl"]};
      --font-size-4xl: ${pe.responsiveFontSizes.tv50["4xl"]};
      --font-size-5xl: ${pe.responsiveFontSizes.tv50["5xl"]};
      --font-size-6xl: ${pe.responsiveFontSizes.tv50["6xl"]};
      --font-size-7xl: ${pe.responsiveFontSizes.tv50["7xl"]};
    }
  }
`;const id=Wa`
  /* 使用更直覺的盒模型 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* 移除預設邊距 */
  * {
    margin: 0;
  }

  /* 基本樣式 */
  html {
    background-color: #1a1a1a;
  }

  body {
    font-family: ${e=>e.theme.fonts.main};
    background-color: #1a1a1a;
    color: #f5f5f5;
    line-height: 1.5;
    font-size: 1.125rem; /* 18px - Free HK Kai 視覺較小所以放大 */
    -webkit-font-smoothing: antialiased;
  }

  #root {
    background-color: #1a1a1a;
    min-height: 100vh;
  }

  /* 改進媒體元素預設值 */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  /* 統一表單元素的字體 */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* 避免文字溢出 */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  /* 改進行換行 */
  p {
    text-wrap: pretty;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: balance;
  }

  /* 創建根堆疊上下文 */
  #root,
  #__next {
    isolation: isolate;
  }

  /* 應用程式容器 */
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* 內容區域 */
  .content {
    flex: 1;
  }

  /* 鏈接樣式 */
  a {
    color: ${e=>e.theme.colors.primary};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* 自適應設計 */
  @media (max-width: ${e=>e.theme.breakpoints.tablet}) {
    .page-container {
      padding: 0 1rem;
    }
  }
`,od=!1,sd=new mo({defaultOptions:{queries:{refetchOnWindowFocus:!1,retry:1,staleTime:1e3*60*5}}}),ld=yo({reducer:{[cr.reducerPath]:cr.reducer},middleware:e=>e().concat(cr.middleware)});Ua(document.getElementById("root")).render(c.jsx(se.StrictMode,{children:c.jsx(bo,{store:ld,children:c.jsx(xo,{client:sd,children:c.jsxs(Co,{theme:pe,children:[c.jsx(id,{}),c.jsx(nd,{}),od]})})})}));export{md as C,id as G,je as L,an as a,bd as b,ye as c,Fi as d,Ni as e,qc as f,yd as g,Kr as l,$e as s,pe as t,Tf as u,cr as w};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Home-DOsdu719.js","assets/vendor-mui-Cc1TuOMr.js","assets/vendor-react-CQ9jITQR.js","assets/vendor-query-DLAcIdav.js","assets/muiTheme-C2AwhCSp.js","assets/StyledComponents-BTKPc553.js","assets/vendor-styled-F-HTyTPr.js","assets/iconify-CCN44Ko-.js","assets/vendor-date-CdyaOyHe.js","assets/vendor-antd-Ct-O66bz.js","assets/Timeline-lTQXI7EC.js","assets/About-CqIPwrhk.js","assets/Contact-7u-6tx0j.js","assets/ProjectShowcase-Ci6cTawa.js","assets/index.dom-DdL1y947.js","assets/DesignToken-CkwM-HAm.js","assets/PigSystemLayout-BmD823H4.js","assets/Boargenotype-p7Wzoz4U.js","assets/calculateTotalWidth-Ltyhivfe.js","assets/CullingBoar-OpoTcotz.js","assets/PigHouseInventory-BlQ2RpMg.js","assets/SowBreedingRecords-Bf2LwuwS.js","assets/index-B_vi-6N3.js","assets/zh-tw-CSIT1pcM.js","assets/zh-tw-jtqEkXuC.css","assets/vendor-charts-Dh6Kn8Ga.js","assets/vendor-moment-C5S46NFB.js","assets/index-A6q5SNz4.js","assets/Dataflow-J5q19pfI.js","assets/index-D8a8k8iB.js","assets/index-B7pmhEl_.js","assets/index-BpWeAHNk.js","assets/index-BxIL-yUb.js","assets/index-DeN_0nfL.js","assets/index-DvPquFwY.js","assets/Index-Cw6rsFJh.js","assets/index-B0GEfybX.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
