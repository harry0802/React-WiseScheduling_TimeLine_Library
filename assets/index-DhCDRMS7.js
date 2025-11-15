import{s as de,t as le,v as ue,r as g,w as fe,j as d,m as O,x as pe,y as me,z as $,D as A,E as B,F as G,P as ge,H as L,I as Ce,u as be,f as xe,g as ye,c as b,R as w}from"./index-CBdAkR7r.js";const he=(e,r)=>e.filter(t=>r.includes(t)),R=(e,r,t)=>{const o=e.keys[0];Array.isArray(r)?r.forEach((s,n)=>{t((a,l)=>{n<=e.keys.length-1&&(n===0?Object.assign(a,l):a[e.up(e.keys[n])]=l)},s)}):r&&typeof r=="object"?(Object.keys(r).length>e.keys.length?e.keys:he(e.keys,Object.keys(r))).forEach(n=>{if(e.keys.includes(n)){const a=r[n];a!==void 0&&t((l,f)=>{o===n?Object.assign(l,f):l[e.up(n)]=f},a)}}):(typeof r=="number"||typeof r=="string")&&t((s,n)=>{Object.assign(s,n)},r)};function k(e){return`--Grid-${e}Spacing`}function N(e){return`--Grid-parent-${e}Spacing`}const P="--Grid-columns",S="--Grid-parent-columns",Se=({theme:e,ownerState:r})=>{const t={};return R(e.breakpoints,r.size,(o,s)=>{let n={};s==="grow"&&(n={flexBasis:0,flexGrow:1,maxWidth:"100%"}),s==="auto"&&(n={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"}),typeof s=="number"&&(n={flexGrow:0,flexBasis:"auto",width:`calc(100% * ${s} / var(${S}) - (var(${S}) - ${s}) * (var(${N("column")}) / var(${S})))`}),o(t,n)}),t},we=({theme:e,ownerState:r})=>{const t={};return R(e.breakpoints,r.offset,(o,s)=>{let n={};s==="auto"&&(n={marginLeft:"auto"}),typeof s=="number"&&(n={marginLeft:s===0?"0px":`calc(100% * ${s} / var(${S}) + var(${N("column")}) * ${s} / var(${S}))`}),o(t,n)}),t},Re=({theme:e,ownerState:r})=>{if(!r.container)return{};const t={[P]:12};return R(e.breakpoints,r.columns,(o,s)=>{const n=s??12;o(t,{[P]:n,"> *":{[S]:n}})}),t},ke=({theme:e,ownerState:r})=>{if(!r.container)return{};const t={};return R(e.breakpoints,r.rowSpacing,(o,s)=>{var a;const n=typeof s=="string"?s:(a=e.spacing)==null?void 0:a.call(e,s);o(t,{[k("row")]:n,"> *":{[N("row")]:n}})}),t},Ne=({theme:e,ownerState:r})=>{if(!r.container)return{};const t={};return R(e.breakpoints,r.columnSpacing,(o,s)=>{var a;const n=typeof s=="string"?s:(a=e.spacing)==null?void 0:a.call(e,s);o(t,{[k("column")]:n,"> *":{[N("column")]:n}})}),t},Te=({theme:e,ownerState:r})=>{if(!r.container)return{};const t={};return R(e.breakpoints,r.direction,(o,s)=>{o(t,{flexDirection:s})}),t},Ee=({ownerState:e})=>({minWidth:0,boxSizing:"border-box",...e.container&&{display:"flex",flexWrap:"wrap",...e.wrap&&e.wrap!=="wrap"&&{flexWrap:e.wrap},gap:`var(${k("row")}) var(${k("column")})`}}),je=e=>{const r=[];return Object.entries(e).forEach(([t,o])=>{o!==!1&&o!==void 0&&r.push(`grid-${t}-${String(o)}`)}),r},Me=(e,r="xs")=>{function t(o){return o===void 0?!1:typeof o=="string"&&!Number.isNaN(Number(o))||typeof o=="number"&&o>0}if(t(e))return[`spacing-${r}-${String(e)}`];if(typeof e=="object"&&!Array.isArray(e)){const o=[];return Object.entries(e).forEach(([s,n])=>{t(n)&&o.push(`spacing-${s}-${String(n)}`)}),o}return[]},Oe=e=>e===void 0?[]:typeof e=="object"?Object.entries(e).map(([r,t])=>`direction-${r}-${t}`):[`direction-xs-${String(e)}`],$e=de(),Ae=le("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,r)=>r.root});function Ge(e){return me({props:e,name:"MuiGrid",defaultTheme:$e})}function Le(e={}){const{createStyledComponent:r=Ae,useThemeProps:t=Ge,useTheme:o=ue,componentName:s="MuiGrid"}=e,n=(i,c)=>{const{container:C,direction:u,spacing:m,wrap:p,size:T}=i,E={root:["root",C&&"container",p!=="wrap"&&`wrap-xs-${String(p)}`,...Oe(u),...je(T),...C?Me(m,c.breakpoints.keys[0]):[]]};return $(E,j=>A(s,j),{})};function a(i,c,C=()=>!0){const u={};return i===null||(Array.isArray(i)?i.forEach((m,p)=>{m!==null&&C(m)&&c.keys[p]&&(u[c.keys[p]]=m)}):typeof i=="object"?Object.keys(i).forEach(m=>{const p=i[m];p!=null&&C(p)&&(u[m]=p)}):u[c.keys[0]]=i),u}const l=r(Re,Ne,ke,Se,Te,Ee,we),f=g.forwardRef(function(c,C){const u=o(),m=t(c),p=fe(m),{className:T,children:E,columns:j=12,container:D=!1,component:J="div",direction:X="row",wrap:Z="wrap",size:q={},offset:Q={},spacing:M=0,rowSpacing:Y=M,columnSpacing:ee=M,unstable_level:h=0,...re}=p,te=a(q,u.breakpoints,x=>x!==!1),oe=a(Q,u.breakpoints),ne=c.columns??(h?void 0:j),se=c.spacing??(h?void 0:M),ae=c.rowSpacing??c.spacing??(h?void 0:Y),ce=c.columnSpacing??c.spacing??(h?void 0:ee),_={...p,level:h,columns:ne,container:D,direction:X,wrap:Z,spacing:se,rowSpacing:ae,columnSpacing:ce,size:te,offset:oe},ie=n(_,u);return d.jsx(l,{ref:C,as:J,ownerState:_,className:O(ie.root,T),...re,children:g.Children.map(E,x=>{var z;return g.isValidElement(x)&&pe(x,["Grid"])&&D&&x.props.container?g.cloneElement(x,{unstable_level:((z=x.props)==null?void 0:z.unstable_level)??h+1}):x})})});return f.muiName="Grid",f}function ve(e){return A("MuiCard",e)}B("MuiCard",["root"]);const De=e=>{const{classes:r}=e;return $({root:["root"]},ve,r)},_e=G(ge,{name:"MuiCard",slot:"Root",overridesResolver:(e,r)=>r.root})({overflow:"hidden"}),ze=g.forwardRef(function(r,t){const o=L({props:r,name:"MuiCard"}),{className:s,raised:n=!1,...a}=o,l={...o,raised:n},f=De(l);return d.jsx(_e,{className:O(f.root,s),elevation:n?8:void 0,ref:t,ownerState:l,...a})});function Pe(e){return A("MuiCardContent",e)}B("MuiCardContent",["root"]);const Ue=e=>{const{classes:r}=e;return $({root:["root"]},Pe,r)},Be=G("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,r)=>r.root})({padding:16,"&:last-child":{paddingBottom:24}}),Ie=g.forwardRef(function(r,t){const o=L({props:r,name:"MuiCardContent"}),{className:s,component:n="div",...a}=o,l={...o,component:n},f=Ue(l);return d.jsx(Be,{as:n,className:O(f.root,s),ownerState:l,ref:t,...a})}),qe=Le({createStyledComponent:G("div",{name:"MuiGrid2",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,t.container&&r.container]}}),componentName:"MuiGrid2",useThemeProps:e=>L({props:e,name:"MuiGrid2"}),useTheme:Ce});var We=["#6586ec","#2cf7fe"],He=g.forwardRef(function(e,r){var t=e.children,o=e.className,s=e.style,n=e.color,a=e.backgroundColor,l=a===void 0?"transparent":a,f=be(r),i=f.width,c=f.height,C=f.domRef,u=g.useMemo(function(){return xe(ye.deepClone(We,!0),n||[])},[n]),m=g.useMemo(function(){return o?"dv-border-box-13 ".concat(o):"dv-border-box-13"},[o]);return d.jsxs("div",{className:m,style:s,ref:C,children:[d.jsxs("svg",{className:"dv-border-svg-container",width:i,height:c,children:[d.jsx("path",{fill:l,stroke:u[0],d:`
            M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
            L `.concat(i-20," 10 L ").concat(i-5,` 25
            L `).concat(i-5," ").concat(c-5," L 20 ").concat(c-5,`
            L 5 `).concat(c-20,` L 5 20
          `)}),d.jsx("path",{fill:"transparent",strokeWidth:"3",strokeLinecap:"round",strokeDasharray:"10, 5",stroke:u[0],d:"M 16 9 L 61 9"}),d.jsx("path",{fill:"transparent",stroke:u[1],d:"M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"}),d.jsx("path",{fill:"transparent",stroke:u[1],d:"M ".concat(i-5," ").concat(c-30," L ").concat(i-5," ").concat(c-5," L ").concat(i-30," ").concat(c-5)})]}),d.jsx("div",{className:"border-box-content",children:t})]})});//! =============== 1. 設定與常量 ===============
const Fe={NORMAL:"oklch(1 0 0)",WARNING:"oklch(0.8 0.18 75)",EXPIRED:"oklch(0.63 0.26 25)",LOW_STOCK:"oklch(0.7 0.2 30)"},Qe={NORMAL:"正常狀態",WARNING:"即將過期",EXPIRED:"已經過期",LOW_STOCK:"低庫存"},Ye={...Fe,NORMAL_PRODUCTION:"oklch(0.8 0.2 145)",TRIAL_MODE:"oklch(0.7 0.2 220)",ADJUSTMENT_MODE:"oklch(0.8 0.18 85)",SHUTDOWN_STATE:"oklch(0.55 0.03 250)",ERROR_STATE:"oklch(0.65 0.27 25)"},er={NORMAL_PRODUCTION:"正常量產",TRIAL_MODE:"試模狀態",ADJUSTMENT_MODE:"調機狀態",SHUTDOWN_STATE:"關機狀態",ERROR_STATE:"異常狀態"};function rr(e){const r={"oklch(0.8 0.2 145)":"#59de65","oklch(0.7 0.2 220)":"#00b2dd","oklch(0.8 0.18 85)":"#f2b200","oklch(0.55 0.03 250)":"#657383","oklch(0.65 0.27 25)":"#ff082f"};return r[e]?r[e]:"#808080"}const tr=b(He)`
  && {
    position: relative;
    padding: 0.5rem;
    overflow: hidden;
  }
`;//! =============== 樣式定義 ===============
b.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
`;b.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;b.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;b.div`
  font-size: 14px;
  color: #666;
`;//! =============== 1. 設定與常量 ===============
const U={default:{backgroundColor:"rgba(1.2%, 12.2%, 31.4%, 0.7)",borderColor:"rgba(25.5%, 35.3%, 54.5%, 0.5)"},active:{backgroundColor:"rgba(1.6%, 16.1%, 39.2%, 0.7)",borderColor:"rgba(0%, 43.9%, 95.3%, 0.7)"},warning:{backgroundColor:"rgba(23.5%, 16.1%, 0%, 0.7)",borderColor:"rgba(96.1%, 62%, 4.3%, 0.7)"},error:{backgroundColor:"rgba(31.4%, 6.7%, 0%, 0.7)",borderColor:"rgba(86.3%, 14.9%, 14.9%, 0.7)"}};//! =============== 2. Context 定義 ===============
const I=g.createContext(void 0);function v(){const e=g.useContext(I);if(e===void 0)throw new Error("useCardContext must be used within a Card component");return e}//! =============== 3. 樣式組件 ===============
const Ke=b(ze)`
  && {
    /* 布局定位 */
    display: flex;
    flex-direction: column;

    /* 盒模型 */
    width: 100%;
    height: 100%;

    /* 視覺樣式 */
    background-color: ${e=>{var r;return((r=U[e.variant])==null?void 0:r.backgroundColor)||U.default.backgroundColor}};
    color: rgba(100%, 100%, 100%, 1);
    box-shadow: 0 0.25rem 0.75rem rgba(0%, 0%, 0%, 0.3);

    /* CSS3特效 */
    transition: all 0.2s ease-in-out;
    transform: translateZ(0);

    /* 其他屬性 */
    overflow: hidden;
    &:hover {
      box-shadow: 0 0.375rem 1rem rgba(0%, 0%, 0%, 0.4);
    }
  }
`,Ve=b.div`
  /* 布局定位 */
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* 盒模型 */
  padding: 0.5rem 1.25rem 0.25rem;

  /* 視覺樣式 */
  border-bottom: 0.0625rem solid rgba(100%, 100%, 100%, 0.1);
  font-weight: 600;
  font-size: 1rem;
`,Je=b(Ie)`
  && {
    /* 布局定位 */
    flex: 1;

    /* 盒模型 */
    padding: 0.5rem !important;

    /* 視覺樣式 */
    color: rgba(100%, 100%, 100%, 0.85);
  }
`,Xe=b.div`
  /* 布局定位 */
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* 盒模型 */
  padding: 0.75rem 1.25rem;

  /* 視覺樣式 */
  border-top: 0.0625rem solid rgba(100%, 100%, 100%, 0.1);
  font-size: 0.875rem;
`;//! =============== 4. 卡片組件 ===============
const y=w.forwardRef(({className:e="",variant:r="default",children:t,collapsible:o=!1,defaultExpanded:s=!0,...n},a)=>{const[l,f]=g.useState(s),i=()=>f(c=>!c);return d.jsx(I.Provider,{value:{variant:r,isExpanded:l,toggleExpand:i,collapsible:o},children:d.jsx(Ke,{className:e,variant:r,ref:a,...n,children:t})})});y.displayName="Card";const W=w.forwardRef(({className:e,children:r,...t},o)=>{const{collapsible:s,isExpanded:n,toggleExpand:a}=v();return d.jsxs(Ve,{className:e,ref:o,...t,children:[d.jsx("div",{style:{width:"100%"},children:r}),s&&d.jsx("button",{onClick:a,style:{background:"none",border:"none",color:"rgba(100%, 100%, 100%, 1)",cursor:"pointer"},children:n?"▲":"▼"})]})});W.displayName="CardHeader";const H=w.forwardRef(({className:e,children:r,...t},o)=>d.jsx("h3",{className:e,ref:o,style:{margin:0,fontSize:"1.5rem",fontWeight:600,letterSpacing:".085em"},...t,children:r}));H.displayName="CardTitle";const F=w.forwardRef(({className:e,children:r,...t},o)=>d.jsx("p",{className:e,ref:o,style:{margin:"0.3125rem 0 0",fontSize:"0.875rem",color:"rgba(100%, 100%, 100%, 0.6)"},...t,children:r}));F.displayName="CardDescription";const K=w.forwardRef(({className:e,children:r,...t},o)=>{const{collapsible:s,isExpanded:n}=v();return s&&!n?null:d.jsx(Je,{className:e,ref:o,...t,children:r})});K.displayName="CardContent";const V=w.forwardRef(({className:e,children:r,...t},o)=>{const{collapsible:s,isExpanded:n}=v();return s&&!n?null:d.jsx(Xe,{className:e,ref:o,...t,children:r})});V.displayName="CardFooter";y.Header=W;y.Title=H;y.Description=F;y.Content=K;y.Footer=V;const or=y;export{tr as B,Ye as D,qe as G,Fe as S,or as a,Qe as b,er as c,rr as o};
