import{d as i}from"./vendor-styled-F-HTyTPr.js";import{r as p,a as u}from"./vendor-react-CQ9jITQR.js";import{a as v,d as w,e as y}from"./index-D6LdA2ZN.js";import{j as e,a4 as A,a5 as O}from"./vendor-mui-Cc1TuOMr.js";var j=["#6586ec","#2cf7fe"],D=p.forwardRef(function(o,r){var a=o.children,t=o.className,d=o.style,n=o.color,f=o.backgroundColor,g=f===void 0?"transparent":f,b=v(r),s=b.width,c=b.height,N=b.domRef,m=p.useMemo(function(){return w(y.deepClone(j,!0),n||[])},[n]),L=p.useMemo(function(){return t?"dv-border-box-13 ".concat(t):"dv-border-box-13"},[t]);return e.jsxs("div",{className:L,style:d,ref:N,children:[e.jsxs("svg",{className:"dv-border-svg-container",width:s,height:c,children:[e.jsx("path",{fill:g,stroke:m[0],d:`
            M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
            L `.concat(s-20," 10 L ").concat(s-5,` 25
            L `).concat(s-5," ").concat(c-5," L 20 ").concat(c-5,`
            L 5 `).concat(c-20,` L 5 20
          `)}),e.jsx("path",{fill:"transparent",strokeWidth:"3",strokeLinecap:"round",strokeDasharray:"10, 5",stroke:m[0],d:"M 16 9 L 61 9"}),e.jsx("path",{fill:"transparent",stroke:m[1],d:"M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"}),e.jsx("path",{fill:"transparent",stroke:m[1],d:"M ".concat(s-5," ").concat(c-30," L ").concat(s-5," ").concat(c-5," L ").concat(s-30," ").concat(c-5)})]}),e.jsx("div",{className:"border-box-content",children:a})]})});//! =============== 1. 設定與常量 ===============
const M={NORMAL:"oklch(1 0 0)",WARNING:"oklch(0.8 0.18 75)",EXPIRED:"oklch(0.63 0.26 25)",LOW_STOCK:"oklch(0.7 0.2 30)"},F={NORMAL:"正常狀態",WARNING:"即將過期",EXPIRED:"已經過期",LOW_STOCK:"低庫存"},$={...M,NORMAL_PRODUCTION:"oklch(0.8 0.2 145)",TRIAL_MODE:"oklch(0.7 0.2 220)",ADJUSTMENT_MODE:"oklch(0.8 0.18 85)",SHUTDOWN_STATE:"oklch(0.55 0.03 250)",ERROR_STATE:"oklch(0.65 0.27 25)"},V={NORMAL_PRODUCTION:"正常量產",TRIAL_MODE:"試模狀態",ADJUSTMENT_MODE:"調機狀態",SHUTDOWN_STATE:"關機狀態",ERROR_STATE:"異常狀態"};function G(o){const r={"oklch(0.8 0.2 145)":"#59de65","oklch(0.7 0.2 220)":"#00b2dd","oklch(0.8 0.18 85)":"#f2b200","oklch(0.55 0.03 250)":"#657383","oklch(0.65 0.27 25)":"#ff082f"};return r[o]?r[o]:"#808080"}const J=i(D)`
  && {
    position: relative;
    padding: 0.5rem;
    overflow: hidden;
  }
`;//! =============== 樣式定義 ===============
i.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
`;i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;i.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;i.div`
  font-size: 14px;
  color: #666;
`;//! =============== 1. 設定與常量 ===============
const x={default:{backgroundColor:"rgba(1.2%, 12.2%, 31.4%, 0.7)",borderColor:"rgba(25.5%, 35.3%, 54.5%, 0.5)"},active:{backgroundColor:"rgba(1.6%, 16.1%, 39.2%, 0.7)",borderColor:"rgba(0%, 43.9%, 95.3%, 0.7)"},warning:{backgroundColor:"rgba(23.5%, 16.1%, 0%, 0.7)",borderColor:"rgba(96.1%, 62%, 4.3%, 0.7)"},error:{backgroundColor:"rgba(31.4%, 6.7%, 0%, 0.7)",borderColor:"rgba(86.3%, 14.9%, 14.9%, 0.7)"}};//! =============== 2. Context 定義 ===============
const h=p.createContext(void 0);function C(){const o=p.useContext(h);if(o===void 0)throw new Error("useCardContext must be used within a Card component");return o}//! =============== 3. 樣式組件 ===============
const _=i(A)`
  && {
    /* 布局定位 */
    display: flex;
    flex-direction: column;

    /* 盒模型 */
    width: 100%;
    height: 100%;

    /* 視覺樣式 */
    background-color: ${o=>{var r;return((r=x[o.variant])==null?void 0:r.backgroundColor)||x.default.backgroundColor}};
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
`,I=i.div`
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
`,U=i(O)`
  && {
    /* 布局定位 */
    flex: 1;

    /* 盒模型 */
    padding: 0.5rem !important;

    /* 視覺樣式 */
    color: rgba(100%, 100%, 100%, 0.85);
  }
`,z=i.div`
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
const l=u.forwardRef(({className:o="",variant:r="default",children:a,collapsible:t=!1,defaultExpanded:d=!0,...n},f)=>{const[g,b]=p.useState(d),s=()=>b(c=>!c);return e.jsx(h.Provider,{value:{variant:r,isExpanded:g,toggleExpand:s,collapsible:t},children:e.jsx(_,{className:o,variant:r,ref:f,...n,children:a})})});l.displayName="Card";const R=u.forwardRef(({className:o,children:r,...a},t)=>{const{collapsible:d,isExpanded:n,toggleExpand:f}=C();return e.jsxs(I,{className:o,ref:t,...a,children:[e.jsx("div",{style:{width:"100%"},children:r}),d&&e.jsx("button",{onClick:f,style:{background:"none",border:"none",color:"rgba(100%, 100%, 100%, 1)",cursor:"pointer"},children:n?"▲":"▼"})]})});R.displayName="CardHeader";const k=u.forwardRef(({className:o,children:r,...a},t)=>e.jsx("h3",{className:o,ref:t,style:{margin:0,fontSize:"1.5rem",fontWeight:600,letterSpacing:".085em"},...a,children:r}));k.displayName="CardTitle";const S=u.forwardRef(({className:o,children:r,...a},t)=>e.jsx("p",{className:o,ref:t,style:{margin:"0.3125rem 0 0",fontSize:"0.875rem",color:"rgba(100%, 100%, 100%, 0.6)"},...a,children:r}));S.displayName="CardDescription";const E=u.forwardRef(({className:o,children:r,...a},t)=>{const{collapsible:d,isExpanded:n}=C();return d&&!n?null:e.jsx(U,{className:o,ref:t,...a,children:r})});E.displayName="CardContent";const T=u.forwardRef(({className:o,children:r,...a},t)=>{const{collapsible:d,isExpanded:n}=C();return d&&!n?null:e.jsx(z,{className:o,ref:t,...a,children:r})});T.displayName="CardFooter";l.Header=R;l.Title=k;l.Description=S;l.Content=E;l.Footer=T;const K=l;export{J as B,$ as D,M as S,K as a,F as b,V as c,G as o};
