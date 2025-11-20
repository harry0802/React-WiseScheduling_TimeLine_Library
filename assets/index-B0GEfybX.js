import{j as o,Q as mn,V as fn,W as Ue,a6 as gn,i as N,a7 as xn,a8 as Sn,a9 as Tn,aa as bn,s as R,X as En,Y as In,p as Ot,Z as vn,$ as Dn,N as Ke,B as M,ab as yn,ac as wn,M as Ze,ad as Ee,ae as Ct,af as Rt,ag as kt,a0 as xe,ah as An,ai as Mt,I as Ve,aj as jn,C as Je,ak as Xe,al as Ft,a2 as On,K as Ie,a1 as Nt,am as Cn,U as G,f as pt,g as ht,x as me,G as D,R as W,an as Rn,ao as kn}from"./vendor-mui-Cc1TuOMr.js";import{r as h,a as et,b as Lt}from"./vendor-react-CQ9jITQR.js";import{i as Mn,a as Fn,b as Nn,d as Ln,u as _n,t as Pn,z as E,c as zn,C as _t,e as $n,f as Yn,F as Bn,T as Hn}from"./zh-tw-CSIT1pcM.js";import{j as u}from"./vendor-date-CdyaOyHe.js";import{h as Pt}from"./vendor-moment-C5S46NFB.js";import{w as tt,u as Wn}from"./index-D6LdA2ZN.js";import{d as _,f as Un,l as zt}from"./vendor-styled-F-HTyTPr.js";import{D as $t}from"./vendor-charts-Dh6Kn8Ga.js";import"./vendor-query-DLAcIdav.js";import"./vendor-antd-Ct-O66bz.js";//! =============== 1. 設定與常量 ===============
const Ge={colors:{primary:{main:"rgba(13% 39% 75% / 1)",light:"rgba(15% 46% 82% / 1)",dark:"rgba(5% 28% 63% / 1)",contrast:"rgba(100% 100% 100% / 1)"},accent:{blue:"rgba(15% 46% 82% / 1)",red:"rgba(83% 18% 18% / 1)",orange:"rgba(96% 49% 0% / 1)",green:"rgba(22% 56% 24% / 1)",grey:"rgba(46% 46% 46% / 1)"},background:{primary:"transparent",hover:"rgba(15% 46% 82% / 0.08)",active:"rgba(15% 46% 82% / 0.12)",panel:"rgba(15% 46% 82% / 0.04)"},text:{primary:"rgba(100% 100% 100% / 1)",secondary:"rgba(100% 100% 100% / 0.85)",disabled:"rgba(100% 100% 100% / 0.6)"},border:{default:"rgba(100% 100% 100% / 0.4)",active:"rgba(15% 46% 82% / 1)",hover:"rgba(15% 46% 82% / 0.8)"}},size:{height:"48px",fontSize:"18px",buttonFontSize:"20px",iconSize:"24px",padding:"0 20px",borderRadius:"8px",minWidth:"120px",gap:"16px"}},Vn={mobile:"768px",tablet:"1024px",desktop:"1200px"};//! =============== 2. 類型與介面 ===============
const Yt=h.createContext(Ge);function Se(){return h.useContext(Yt)}//! =============== 3. 核心功能 ===============
const Gn=_.div`
  /* 布局定位 */
  display: flex;
  flex-direction: column;
  width: 100%;

  /* 盒模型 */
  margin-bottom: 20px;
  gap: ${e=>e.theme.size.gap};
`,qn=_.div`
  /* 布局定位 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  /* 盒模型 */
  gap: ${e=>e.theme.size.gap};

  /* 響應式 */
  @media (max-width: ${Vn.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,Qn=_.div`
  /* 布局定位 */
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  /* 盒模型 */
  gap: 12px;
`,Kn=_.button`
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
`,Zn=_.select`
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
`,Jn=_.input`
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
`,Xn=_(Sn).withConfig({shouldForwardProp:e=>e!=="customTheme"})`
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
`,er=_(Tn).withConfig({shouldForwardProp:e=>e!=="customTheme"})`
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
`,tr=_(bn).withConfig({shouldForwardProp:e=>e!=="customTheme"})`
  /* 盒模型 */
  padding: 20px !important;
`,nr=_(Kn)`
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
`;function C({children:e,customTheme:t}){const n=t?{...Ge,...t}:Ge;return o.jsx(Yt.Provider,{value:n,children:o.jsx(Gn,{theme:n,children:e})})}C.Row=function({children:t,...n}){const r=Se();return o.jsx(qn,{theme:r,...n,children:t})};C.ButtonGroup=function({children:t,...n}){const r=Se();return o.jsx(Qn,{theme:r,...n,children:t})};C.Button=function({variant:t="default",active:n=!1,children:r,onClick:s,styleOverrides:a={},getStyles:i,...c}){const l=Se(),T={...i?i(l,t,n):rr(l,t,n),...a};return o.jsx(nr,{theme:l,onClick:s,...T,...c,children:r})};C.TimeRangeButton=function({value:t,currentValue:n,onChange:r,children:s,icon:a=mn}){return o.jsxs(C.Button,{active:t===n,onClick:()=>r==null?void 0:r(t),children:[o.jsx(a,{}),s]})};C.Select=function({value:t,onChange:n,children:r,placeholder:s,...a}){const i=Se();return o.jsxs(Zn,{theme:i,value:t,onChange:c=>n==null?void 0:n(c.target.value),...a,children:[s&&o.jsx("option",{value:"",disabled:!0,children:s}),r]})};C.AreaSelect=function({value:t,onChange:n,options:r=[],placeholder:s="選擇區域",renderOption:a}){return o.jsx(C.Select,{value:t,onChange:n,placeholder:s,children:r.map((i,c)=>{if(a)return a(i,c);const l=typeof i=="string"?i:i.value,p=typeof i=="string"?i:i.label;return o.jsx("option",{value:l,children:p},l)})})};C.AddButton=function({onClick:t,children:n="新增狀態",icon:r=fn}){return o.jsxs(C.Button,{variant:"primary",onClick:t,children:[o.jsx(r,{}),n]})};C.NowButton=function({onClick:t,children:n="移至現在",icon:r=Ue}){return o.jsxs(C.Button,{variant:"success",onClick:t,children:[o.jsx(r,{}),n]})};C.TimeInput=function({label:t,value:n,onChange:r,type:s="datetime-local"}){const a=Se();return o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t&&o.jsxs("span",{style:{fontSize:a.size.fontSize,minWidth:"60px",color:a.colors.text.primary,fontFamily:"Noto Sans TC, sans-serif",fontWeight:500},children:[t,"："]}),o.jsx(Jn,{theme:a,type:s,value:n,onChange:i=>r==null?void 0:r(i.target.value)})]})};C.Panel=function({title:t,expanded:n=!1,onToggle:r,icon:s=xn,children:a,info:i,renderHeader:c,renderContent:l}){const p=Se(),T=(v,g)=>{r==null||r(g)},[m,b]=et.useState(n),I=r!==void 0,x=I?n:m,S=I?T:(v,g)=>b(g);return o.jsxs(Xn,{customTheme:p,expanded:x,onChange:S,disableGutters:!1,children:[o.jsx(er,{customTheme:p,expandIcon:o.jsx(gn,{}),"aria-controls":`${t}-content`,id:`${t}-header`,children:c?c({title:t,info:i,Icon:s,theme:p,expanded:x}):o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[o.jsx(s,{style:{fontSize:"28px",color:p.colors.primary.light}}),o.jsx(N,{variant:"h6",sx:{fontSize:"20px",fontWeight:600,color:p.colors.text.primary,fontFamily:'"Noto Sans TC", sans-serif'},children:t}),i&&o.jsxs(N,{variant:"body2",sx:{fontSize:"16px",opacity:.8,color:p.colors.text.secondary,fontFamily:'"Noto Sans TC", sans-serif'},children:["(",i,")"]})]})}),o.jsx(tr,{customTheme:p,children:l?l({children:a,theme:p,expanded:x}):o.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:a})})]})};//! =============== 4. 工具函數 ===============
function rr(e,t,n){return n?{backgroundColor:e.colors.primary.light,borderColor:e.colors.primary.light,hoverBackgroundColor:e.colors.primary.light,hoverOpacity:.9}:{primary:{backgroundColor:e.colors.accent.blue,borderColor:e.colors.accent.blue,hoverBackgroundColor:e.colors.accent.blue,hoverOpacity:.9},success:{backgroundColor:e.colors.accent.green,borderColor:e.colors.accent.green,hoverBackgroundColor:e.colors.accent.green,hoverOpacity:.9},warning:{backgroundColor:e.colors.accent.orange,borderColor:e.colors.accent.orange,hoverBackgroundColor:e.colors.accent.orange,hoverOpacity:.9},danger:{backgroundColor:e.colors.accent.red,borderColor:e.colors.accent.red,hoverBackgroundColor:e.colors.accent.red,hoverOpacity:.9}}[t]||{}}const $={colors:{primary:{main:"#1E3A5F",light:"#1976D2",dark:"#0D47A1",contrast:"#FFFFFF"},accent:{blue:"#1976D2",red:"#F44336",green:"#4CAF50",orange:"#FF9800"},status:{idle:"#757575",running:"#4CAF50",setup:"#FF9800",stopped:"#F44336",maintenance:"#673AB7"},background:{primary:"#FFFFFF",secondary:"#F5F5F5",panel:"#EEEEEE",hover:"#E0E0E0"},text:{primary:"#212121",secondary:"#616161",disabled:"#9E9E9E",contrast:"#FFFFFF"},border:{light:"#E0E0E0",medium:"#9E9E9E",dark:"#616161",active:"#1976D2"}},size:{height:"56px",borderRadius:"8px",spacing:{xs:"6px",sm:"12px",md:"20px",lg:"28px",xl:"36px"},fontSize:{xs:"18px",sm:"20px",md:"22px",lg:"26px",xl:"30px",xxl:"36px",factory:{timeline:{axisLarge:"42px",axisMedium:"32px",axisSmall:"28px",itemTitle:"22px",itemContent:"20px",itemMeta:"18px",machineLabel:"24px"},button:{sm:"18px",md:"20px",lg:"24px"},heading:{h1:"40px",h2:"36px",h3:"32px",h4:"28px",h5:"24px",h6:"20px"}}}},animation:{transition:"all 0.2s ease"},shadows:{sm:"0 2px 4px rgba(0,0,0,0.1)",md:"0 4px 8px rgba(0,0,0,0.1)",lg:"0 8px 16px rgba(0,0,0,0.1)"}};function or(e){return{製令單:$.colors.accent.blue,閒置:$.colors.status.idle,設置中:$.colors.status.setup,生產中:$.colors.status.running,停機:$.colors.status.stopped,維護中:$.colors.status.maintenance}[e]||$.colors.text.primary}const nt=R(En)(({theme:e})=>({"& .MuiDialog-paper":{borderRadius:"6px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",border:`2px solid ${$.colors.border.medium}`,overflow:"hidden",maxWidth:"900px",width:"90%"}})),rt=R(In)(({theme:e})=>({backgroundColor:$.colors.primary.main,color:$.colors.primary.contrast,padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"18px",fontWeight:600,"& .MuiIconButton-root":{color:"inherit",padding:"8px",marginLeft:"8px","&:hover":{backgroundColor:"rgba(255, 255, 255, 0.2)"}}}));R(Ot)(({color:e})=>({backgroundColor:e||$.colors.status.idle,color:"#FFFFFF",fontWeight:600,height:"32px",fontSize:"14px",marginLeft:"16px","& .MuiChip-label":{padding:"0 12px"},"& .MuiChip-icon":{fontSize:"18px",marginRight:"6px"}}));const ot=R(vn)(({theme:e})=>({padding:"24px",backgroundColor:"#FFFFFF"})),st=R(Dn)(({theme:e})=>({padding:"16px 24px",borderTop:"2px solid #E0E0E0",backgroundColor:"#F5F5F5"})),Bt=R(Ke)(({theme:e})=>({backgroundColor:"#1976D2",color:"#FFFFFF",padding:"10px 24px",fontSize:"16px",fontWeight:500,height:"48px",boxShadow:"none","&:hover":{backgroundColor:"#1565C0",boxShadow:"0 2px 4px rgba(0,0,0,0.2)"}})),Le=R(Ke)(({theme:e})=>({color:"#424242",padding:"10px 24px",fontSize:"16px",height:"48px",border:"2px solid #9E9E9E","&:hover":{backgroundColor:"#EEEEEE",borderColor:"#757575"}})),sr=R(Ke)(({theme:e})=>({color:"#F44336",padding:"10px 24px",fontSize:"16px",height:"48px",border:"2px solid #F44336","&:hover":{backgroundColor:"rgba(244, 67, 54, 0.1)",borderColor:"#D32F2F"}})),ar=R(N)(({theme:e})=>({fontSize:"18px",fontWeight:600,color:"#1E3A5F",marginBottom:"16px",paddingBottom:"8px",borderBottom:"2px solid #1E3A5F"})),ir=R(M)(({theme:e})=>({marginBottom:"32px",padding:"20px",backgroundColor:"#FFFFFF",borderRadius:"6px",border:"2px solid #E0E0E0"})),cr=R(yn)(({theme:e})=>({backgroundColor:"#F5F5F5",borderBottom:"2px solid #E0E0E0","& .MuiTab-root":{minHeight:"56px",fontSize:"16px",fontWeight:500,padding:"0 24px"},"& .Mui-selected":{color:"#1976D2",fontWeight:600},"& .MuiTabs-indicator":{backgroundColor:"#1976D2",height:"4px"}})),lr=R(wn)(({theme:e})=>({textTransform:"none",fontSize:"16px",padding:"12px 24px","&.Mui-selected":{backgroundColor:"rgba(25, 118, 210, 0.08)"}}));R(Ze)(({theme:e})=>({padding:"20px",backgroundColor:"#FFFFFF",borderRadius:"6px",boxShadow:"none",border:"2px solid #E0E0E0",margin:"16px 0"}));R(M)(({theme:e})=>({display:"flex",marginBottom:"12px","&:last-child":{marginBottom:0}}));R(N)(({theme:e})=>({width:"140px",flexShrink:0,color:"#616161",fontSize:"16px",fontWeight:500}));R(N)(({theme:e})=>({flex:1,fontWeight:500,fontSize:"16px",color:"#212121"}));//! =============== 1. 設定與常量 ===============
const Ht="Asia/Taipei",dr={fullDateTime:"YYYY-MM-DD HH:mm:ss",dateTime:"YYYY-MM-DD HH:mm",date:"YYYY-MM-DD",time:"HH:mm",isoDateTime:"YYYY-MM-DDTHH:mm"};//! =============== 2. 初始化設定 ===============
[Mn,Fn,Nn,Ln,_n,Pn].forEach(e=>u.extend(e));u.tz.setDefault(Ht);//! =============== 3. 核心功能 ===============
const de=(e,t=u())=>{const n=t,r=8,s={hour:{start:n.subtract(3,"hour"),end:n.add(3,"hour")},day:{start:n.subtract(3,"day").hour(r),end:n.add(3,"day").hour(r)},week:{start:n.subtract(2,"week").hour(r),end:n.add(2,"week").hour(r)},month:{start:n.subtract(2,"month").hour(r),end:n.add(2,"month").hour(r)}};return s[e]||s.day},oe=(e,t="")=>{if(!e)return t;try{const n=u(e);return n.isValid()?(n.tz?n.tz(Ht):n.local()).format(dr.isoDateTime):(console.warn("[formatToFormDateTime] Invalid date:",e),t)}catch(n){return console.error("[formatToFormDateTime] Error:",n,{date:e}),t}},$e=(e,t=new Date)=>{const n=oe(e);return n||oe(t,"")},ur=(e={})=>{var t,n,r,s,a,i,c,l,p,T,m,b;return{planStartTime:oe((e==null?void 0:e.planStartTime)||((t=e==null?void 0:e.orderInfo)==null?void 0:t.planStartTime)||((n=e==null?void 0:e.status)==null?void 0:n.planStartTime)||((r=e==null?void 0:e.status)==null?void 0:r.startTime)),planEndTime:oe((e==null?void 0:e.planEndTime)||((s=e==null?void 0:e.orderInfo)==null?void 0:s.planEndTime)||((a=e==null?void 0:e.status)==null?void 0:a.planEndTime)||((i=e==null?void 0:e.status)==null?void 0:i.endTime)),start:oe((e==null?void 0:e.start)||((c=e==null?void 0:e.status)==null?void 0:c.startTime)),end:oe((e==null?void 0:e.end)||((l=e==null?void 0:e.status)==null?void 0:l.endTime)),product:((p=e==null?void 0:e.status)==null?void 0:p.product)||"",reason:((T=e==null?void 0:e.status)==null?void 0:T.reason)||"",productName:((m=e==null?void 0:e.orderInfo)==null?void 0:m.productName)||"",process:((b=e==null?void 0:e.orderInfo)==null?void 0:b.process)||""}};var pr={};//! =============== 1. 錯誤類型定義 ===============
const Te={API:"API_ERROR",VALIDATION:"VALIDATION_ERROR",BUSINESS:"BUSINESS_ERROR",FORM:"FORM_ERROR",STATE_TRANSITION:"STATE_TRANSITION_ERROR",DATE_TIME:"DATE_TIME_ERROR",PERMISSION:"PERMISSION_ERROR",UNKNOWN:"UNKNOWN_ERROR"},K={CRITICAL:"CRITICAL",ERROR:"ERROR",WARNING:"WARNING",INFO:"INFO"};//! =============== 2. 錯誤處理工廠函數 ===============
const ve=(e,t={})=>{const{type:n=Te.UNKNOWN,severity:r=K.ERROR,details:s={},name:a="AppError",cause:i=null}=t,c={message:e,name:a,type:n,severity:r,details:s,timestamp:u().format(),cause:i,toUserMessage:()=>e,toLogFormat:()=>({timestamp:c.timestamp,type:c.type,severity:c.severity,message:c.message,details:c.details,stack:new Error(e).stack})};return c},pe=(e,t={})=>ve(e,{type:Te.VALIDATION,severity:K.ERROR,details:t,name:"ValidationError"}),hr=(e,t={})=>ve(e,{type:Te.FORM,severity:K.ERROR,details:t,name:"FormError"}),se=(e,t={})=>ve(e,{type:Te.STATE_TRANSITION,severity:K.ERROR,details:t,name:"StateTransitionError"}),fe=(e,t={})=>ve(e,{type:Te.API,severity:K.ERROR,details:t,name:"ApiError"});//! =============== 3. 錯誤處理函數 ===============
const Wt=e=>e&&typeof e=="object"&&typeof e.toUserMessage=="function"&&typeof e.type=="string",ue=e=>{var t;if(Wt(e))return e.toUserMessage();if(e.name==="ZodError"){const n=(t=e.errors)==null?void 0:t[0];if(n){const r=n.path.map(s=>({start:"開始時間",end:"結束時間",group:"機台編號",area:"區域",reason:"原因",product:"產品"})[s]||s).join(" > ");return r?`${r}: ${n.message}`:n.message}return"表單驗證失敗"}return console.error("未處理的錯誤類型:",e),"操作失敗，請稍後再試"},mr=(e={})=>{const n={...{logLevel:"error",includeStackTrace:!0,shouldLogToConsole:!0,shouldLogToServer:!1,serverEndpoint:"/api/logs"},...e};return(r,s={})=>{const a=Wt(r)?r:ve((r==null?void 0:r.message)||"未知錯誤",{type:Te.UNKNOWN,severity:K.ERROR,details:{originalError:r},cause:r});if(n.shouldLogToConsole){const c={...a.toLogFormat(),context:{...s,timestamp:new Date().toISOString(),appVersion:pr.REACT_APP_VERSION||"未知"}};switch(a.severity){case K.CRITICAL:case K.ERROR:console.error("錯誤:",c);break;case K.WARNING:console.warn("警告:",c);break;case K.INFO:default:console.info("提示:",c);break}}return a}},ee=mr(),fr=hr,at={AREAS:["A","B","C","D"],MACHINES_PER_AREA:10,WORK_START_HOUR:8},d={ORDER_CREATED:"製令單",IDLE:"待機中",SETUP:"上模與調機",TESTING:"產品試模",STOPPED:"機台停機"},De={[d.ORDER_CREATED]:{name:d.ORDER_CREATED,description:"製令單模式",color:"#4caf50",className:"status-producing",canSwitch:!1,canDelete:!1,allowedTransitions:[]},[d.IDLE]:{name:d.IDLE,description:"機台空閒狀態",color:"#9e9e9e",className:"status-idle",canSwitch:!0,canDelete:!0,allowedTransitions:[d.SETUP,d.TESTING,d.STOPPED],checkHistorical:e=>{var t;return!!(e!=null&&e.actualStartTime||(t=e==null?void 0:e.status)!=null&&t.actualStartTime)}},[d.SETUP]:{name:d.SETUP,description:"機台正在進行設定",color:"#ff9800",className:"status-setup",canSwitch:!0,canDelete:!0,allowedTransitions:[d.IDLE]},[d.TESTING]:{name:d.TESTING,description:"進行產品測試",color:"#2196f3",className:"status-testing",canSwitch:!0,canDelete:!0,allowedTransitions:[d.IDLE]},[d.STOPPED]:{name:d.STOPPED,description:"機台暫停運作",color:"#f44336",className:"status-stopped",canSwitch:!0,canDelete:!0,allowedTransitions:[d.IDLE]}},gr=(e,t)=>{if(e===d.ORDER_CREATED)return!1;const n=De[e];return!n||!n.canSwitch?!1:n.allowedTransitions.includes(t)},_e=(e,t)=>{const n=De[e];return n!=null&&n.checkHistorical?n.checkHistorical(t):!1},be=e=>{var n,r,s;return e?[(n=e==null?void 0:e.status)==null?void 0:n.actualStartTime,(r=e==null?void 0:e.status)==null?void 0:r.actualEndTime,e==null?void 0:e.machineStatusActualStartTime,e==null?void 0:e.machineStatusActualEndTime,(s=e==null?void 0:e.orderInfo)==null?void 0:s.actualEndTime].some(a=>a!=null&&a!==""&&a!=="null"):!1},xr=e=>{if(!e||be(e)||e.timeLineStatus===d.ORDER_CREATED)return!1;const t=e.timeLineStatus;return Er(t,e)},Sr=e=>{if(!e||be(e)||e.timeLineStatus===d.ORDER_CREATED)return!1;const t=e.timeLineStatus;return br(t,e)},Tr=e=>!(!e||be(e)||e.timeLineStatus===d.ORDER_CREATED),br=(e,t=null)=>{var n;return t&&_e(e,t)?!1:((n=De[e])==null?void 0:n.canDelete)??!1},Er=(e,t=null)=>{var n;return t&&_e(e,t)?!1:((n=De[e])==null?void 0:n.canSwitch)??!1},it=e=>{var t;return((t=De[e])==null?void 0:t.className)??""};//! =============== 1. 預設值配置 ===============
const Ir={group:{backups:["machineSN"],defaultValue:"A-1",warningMessage:"缺少機台組，使用預設值: A-1"},start:{backups:["machineStatusPlanStartTime","machineStatusActualStartTime","planOnMachineDate"],defaultValue:()=>u().format(),warningMessage:"缺少開始時間，使用當前時間作為預設值"},planStartTime:{backups:["machineStatusPlanStartTime","start"],defaultValue:()=>u().format(),warningMessage:"缺少預計開始時間，使用當前時間作為預設值"},planEndTime:{backups:["machineStatusPlanEndTime","end"],defaultValue:()=>u().add(1,"hour").format(),warningMessage:"缺少預計結束時間，使用當前時間+1小時作為預設值"},actualStartTime:{backups:["machineStatusActualStartTime"],defaultValue:"",warningMessage:"實際開始時間為選填"},actualEndTime:{backups:["machineStatusActualEndTime"],defaultValue:"",warningMessage:"實際結束時間為選填"}};//! =============== 2. 狀態特定驗證規則 ===============
const vr={[d.TESTING]:{requiredFields:["machineStatusProduct"],errorMessages:{machineStatusProduct:"產品試模狀態必須指定產品"}},[d.STOPPED]:{requiredFields:["machineStatusReason"],errorMessages:{machineStatusReason:"機台停機狀態必須指定原因"}},[d.ORDER_CREATED]:{requiredFields:["productName"],errorMessages:{productName:"製令單必須指定產品名稱"}}};//! =============== 3. 狀態轉換規則 ===============
const Ye={[d.ORDER_CREATED]:{canSwitchFrom:!1,errorMessage:"製令單狀態不能被切換"},nonIdleTransitions:{onlyToIdle:!0,errorMessage:"從非待機狀態只能切換回待機狀態"},toIdleRequirements:{requireEndTime:!0,errorMessage:"從非待機狀態切換回待機狀態時，必須設置結束時間"}};//! =============== 2. 數據預處理函數 ===============
function Dr(e){if(!e||typeof e!="object"){console.warn("fillDefaultValues: apiItem 為空或非對象類型");return}Object.entries(Ir).forEach(([t,n])=>{var r;if(!e[t]){const s=(r=n.backups)==null?void 0:r.find(a=>e[a]);if(s)e[t]=e[s];else{const a=typeof n.defaultValue=="function"?n.defaultValue():n.defaultValue;e[t]=a,console.warn(n.warningMessage)}}})}function yr(e){if(!e||typeof e!="object")throw pe("API 項目數據為空或格式錯誤",{apiItem:typeof e});["group","start"].forEach(n=>{if(!e[n])throw pe(`${n} 為必填欄位`,{field:n,value:e[n]})})}function wr(e){if(!e||typeof e!="object")throw pe("API 項目數據為空或格式錯誤",{apiItem:typeof e});const t=vr[e.timeLineStatus];if(!t){if(!Object.values(d).includes(e.timeLineStatus))throw pe(`未知的狀態類型: ${e.timeLineStatus}`,{providedStatus:e.timeLineStatus,validStatuses:Object.values(d)});return}t.requiredFields.forEach(n=>{if(!e[n])throw pe(t.errorMessages[n],{field:n,status:e.timeLineStatus})})}//! =============== 3. 狀態轉換驗證 ===============
function Ut(e,t,n){var r;if(!e||!t)throw se("狀態轉換驗證缺少必要參數",{initialStatus:e,targetStatus:t,itemId:n==null?void 0:n.id});if(e!==t){if(e===d.ORDER_CREATED)throw se(Ye[d.ORDER_CREATED].errorMessage,{initialStatus:e,targetStatus:t,itemId:n==null?void 0:n.id});if(Ar(e,t))throw se(Ye.nonIdleTransitions.errorMessage,{initialStatus:e,targetStatus:t,itemId:n==null?void 0:n.id});if(jr(e,t,n))throw se(Ye.toIdleRequirements.errorMessage,{initialStatus:e,targetStatus:t,itemId:n==null?void 0:n.id,endTime:(n==null?void 0:n.end)||((r=n==null?void 0:n.status)==null?void 0:r.endTime)})}}function Ar(e,t){return e!==d.IDLE&&t!==d.IDLE}function jr(e,t,n){var r;return e!==d.IDLE&&t===d.IDLE&&!n.end&&!((r=n.status)!=null&&r.endTime)}//! =============== 4. 時間重疊驗證 ===============
function Or(e,t=null){if(e.timeLineStatus!==d.ORDER_CREATED){if(!e||!e.start||!e.group){console.warn("validateTimeOverlap: 缺少必要的時間或群組資訊");return}try{const n=u(e.start),r=u(e.end),s=r.isValid()?r:u().add(2,"hour");let a=[];if(window.timeline&&window.app&&window.app.timelineData)a=window.app.timelineData.get({filter:function(c){return c.id!==e.id&&c.group===e.group&&c.timeLineStatus!==d.ORDER_CREATED}});else if(t)if(Array.isArray(t)){const c=t.find(l=>l.id===e.group);c&&c.items&&(a=c.items.filter(l=>l.id!==e.id&&l.timeLineStatus!==d.ORDER_CREATED))}else t.filter&&(a=t.filter(c=>c.id!==e.id&&c.group===e.group&&c.timeLineStatus!==d.ORDER_CREATED));if(a.some(c=>{const l=u(c.start),p=u(c.end),T=p.isValid()?p:l.add(2,"hour");return n.isBefore(T)&&s.isAfter(l)||n.isSame(l)||s.isSame(T)}))throw pe("時間重疊：除了「製令單」外的其他狀態都不允許時間重疊",{itemId:e.id,group:e.group,start:e.start,end:e.end,status:e.timeLineStatus})}catch(n){if(n.type==="VALIDATION_ERROR")throw n;console.error(...oo_tx("4056104611_302_4_302_45_11","檢查時間重疊時發生錯誤，繼續執行:",n))}}}//! =============== 5. Zod 模式驗證 ===============
const Vt=E.object({start:E.string().min(1,"開始時間為必填").refine(e=>u(e).isValid(),"開始時間格式無效"),machineStatusPlanEndTime:E.string().optional().refine(e=>!e||u(e).isValid(),"計劃結束時間格式無效"),machineStatusActualEndTime:E.string().optional().refine(e=>!e||u(e).isValid(),"實際結束時間格式無效")}),je=Vt.extend({machineSN:E.string().min(1,"機台編號為必填"),productionArea:E.string().min(1,"生產區域為必填"),timeLineStatus:E.string().min(1,"狀態類型為必填"),machineId:E.string().optional()});E.discriminatedUnion("timeLineStatus",[Vt.extend({machineSN:E.string().min(1,"機台編號為必填"),productionArea:E.string().min(1,"生產區域為必填"),timeLineStatus:E.literal(d.ORDER_CREATED),productName:E.string().min(1,"產品名稱為必填"),productSN:E.string().optional(),processName:E.string().optional(),workOrderQuantity:E.string().optional(),productionQuantity:E.string().optional(),planOnMachineDate:E.string().min(1,"計劃上機時間為必填").refine(e=>u(e).isValid(),"計劃上機時間格式無效")}),je.extend({timeLineStatus:E.literal(d.IDLE)}),je.extend({timeLineStatus:E.literal(d.SETUP)}),je.extend({timeLineStatus:E.literal(d.TESTING),machineStatusProduct:E.string().min(1,"產品試模狀態必須指定產品")}),je.extend({timeLineStatus:E.literal(d.STOPPED),machineStatusReason:E.string().min(1,"機台停機狀態必須指定原因")})]);//! =============== 5. 主要驗證函數 ===============
function Gt(e,t=!1){t||(Dr(e),yr(e),wr(e))}function qt(e,t,n=!1){if(n||!t)return;const r=t.timeLineStatus,s=e.timeLineStatus;Ut(r,s,e)}//! =============== 1. 基礎輔助判斷函數 ===============
const Qt=e=>!e||!e.timeLineStatus?!1:e.timeLineStatus===d.ORDER_CREATED,Kt=e=>!e||!e.orderInfo||!e.orderInfo.orderStatus?!1:e.orderInfo.orderStatus.toLowerCase().trim()==="on-going";function mt(e,t,n,r="edit",s=!1){if(s&&e===t)return;if(e===t&&r!=="add")throw se(`已經是「${e}」狀態，無需切換`,{currentStatus:e,newStatus:t,mode:r,itemId:n==null?void 0:n.id});if(r==="add"||s)return;try{const i=(n==null?void 0:n.timeLineStatus)||e;Ut(i,t,n)}catch(i){throw se(i.message,{currentStatus:(n==null?void 0:n.timeLineStatus)||e,newStatus:t,mode:r,itemId:n==null?void 0:n.id,originalError:i})}const a=(n==null?void 0:n.timeLineStatus)||e;if(!gr(a,t))throw se(`無法從「${a}」切換到「${t}」狀態`,{currentStatus:a,newStatus:t,mode:r,itemId:n==null?void 0:n.id})}function Cr(e,t){try{return Or(e,t),!1}catch(n){if(n.type==="VALIDATION_ERROR"&&n.message.includes("時間重疊"))throw new Error(n.message);return console.error("檢查時間重疊時發生錯誤，繼續執行:",n),!1}}//! =============== 3. UI 輔助函數 ===============
const Rr=(e,t,n)=>{var r;return e==="view"||t?!0:n?be(n)?!0:e!=="add"&&(n.productionScheduleStatus==="On-going"||n.orderInfo&&((r=n.orderInfo.orderStatus)==null?void 0:r.toLowerCase())==="on-going"):!1},kr=(e,t)=>{if(e)return"處理中...";switch(t){case"add":return"新增狀態";case"edit":return"編輯狀態";default:return"檢視狀態"}},z=[];for(let e=0;e<256;++e)z.push((e+256).toString(16).slice(1));function Mr(e,t=0){return(z[e[t+0]]+z[e[t+1]]+z[e[t+2]]+z[e[t+3]]+"-"+z[e[t+4]]+z[e[t+5]]+"-"+z[e[t+6]]+z[e[t+7]]+"-"+z[e[t+8]]+z[e[t+9]]+"-"+z[e[t+10]]+z[e[t+11]]+z[e[t+12]]+z[e[t+13]]+z[e[t+14]]+z[e[t+15]]).toLowerCase()}let Be;const Fr=new Uint8Array(16);function Nr(){if(!Be){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");Be=crypto.getRandomValues.bind(crypto)}return Be(Fr)}const Lr=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),ft={randomUUID:Lr};function _r(e,t,n){var s;if(ft.randomUUID&&!e)return ft.randomUUID();e=e||{};const r=e.random??((s=e.rng)==null?void 0:s.call(e))??Nr();if(r.length<16)throw new Error("Random bytes length must be >= 16");return r[6]=r[6]&15|64,r[8]=r[8]&63|128,Mr(r)}//! =============== 1. 常量定義 ===============
const Pr="A-1",zr="待機中",$r="A",Me="製令單",B="YYYY-MM-DDTHH:mm:ss",Yr={machineStatusId:null,machineStatusPlanStartTime:null,machineStatusPlanEndTime:null,machineStatusActualStartTime:null,machineStatusActualEndTime:null,machineStatusReason:null,machineStatusProduct:null,productionScheduleId:null,planOnMachineDate:null,planFinishDate:null,actualOnMachineDate:null,actualFinishDate:null,postponeTime:null,workOrderSN:null,productSN:null,productName:null,workOrderQuantity:null,productionQuantity:null,processName:null,productionScheduleStatus:null};//! =============== 2. 輔助工具函數 ===============
function H(e,t=B,n=!0){return e?n?u(e).utc().toISOString():u(e).format(t):null}function gt(e,t=0){if(e==null)return t;const n=parseInt(e,10);return isNaN(n)?t:n}function Br(e){var t,n,r,s;return((t=e.orderInfo)==null?void 0:t.productName)&&((n=e.orderInfo)==null?void 0:n.process)&&Me||((r=e.status)==null?void 0:r.reason)==="機台故障"&&"機台停機"||((s=e.status)==null?void 0:s.product)&&"產品試模"||e.status&&"待機中"||zr}function Zt(e,t="internal"){return e?t==="api"&&!e.machineSN&&!e.timeLineStatus?(console.warn("API資料缺少關鍵欄位"),!1):!0:(console.error(`轉換錯誤: ${t}資料為空`),!1)}//! =============== 3. 資料修復與標準化 ===============
function Hr(e){var t,n;return e.start||((t=e.status)==null?void 0:t.startTime)||((n=e.orderInfo)==null?void 0:n.scheduledStartTime)||(console.warn("缺少開始時間信息，使用當前時間"),new Date)}function Wr(e,t){var n,r;return e.end||((n=e.status)==null?void 0:n.endTime)||((r=e.orderInfo)==null?void 0:r.scheduledEndTime)||u(t).add(1,"hour").toDate()}function Ur(e,t){const n=Hr(e),r=Wr(e,n),s=e.group||(t==null?void 0:t.group)||Pr;let a=e.timeLineStatus||Br(e);return{startTime:n,endTime:r,group:s,timeLineStatus:a,isWorkOrder:a===Me}}//! =============== 4. API轉內部格式 ===============
function Vr(e,{startTime:t,endTime:n}){return{id:e.productionScheduleId||"",planStartTime:u(e.planOnMachineDate||t).toDate(),planEndTime:u(e.planFinishDate||n).toDate(),scheduledStartTime:u(e.planOnMachineDate||t).toDate(),scheduledEndTime:u(e.planFinishDate||n).toDate(),actualStartTime:e.actualOnMachineDate?u(e.actualOnMachineDate).toDate():null,actualEndTime:e.actualFinishDate?u(e.actualFinishDate).toDate():null,productId:e.productSN||"",productName:e.productName||"",quantity:gt(e.workOrderQuantity),completedQty:gt(e.productionQuantity),process:e.processName||"",orderStatus:e.productionScheduleStatus||"",postponeTime:e.postponeTime||null,workOrderSN:e.workOrderSN||""}}function Gr(e,{startTime:t,endTime:n}){const r=e.machineStatusPlanStartTime||t,s=e.machineStatusPlanEndTime||n,a=e.machineStatusActualStartTime,i=e.machineStatusActualEndTime;return{id:e.machineStatusId||"",planStartTime:u(r).toDate(),planEndTime:u(s).toDate(),startTime:t,endTime:n,actualStartTime:a?u(a).toDate():null,actualEndTime:i?u(i).toDate():null,reason:e.machineStatusReason||"",product:e.machineStatusProduct||e.productName||""}}const qr=e=>{if(!Zt(e,"api"))return null;const t=e.timeLineStatus==="製令單"?Me:e.timeLineStatus,n=t===Me;let r,s;n?(r=e.planOnMachineDate?u(e.planOnMachineDate):u(),s=e.planFinishDate?u(e.planFinishDate):r.add(1,"hour")):(r=u(e.machineStatusActualStartTime||e.machineStatusPlanStartTime),s=e.machineStatusActualEndTime?u(e.machineStatusActualEndTime):e.machineStatusPlanEndTime?u(e.machineStatusPlanEndTime):r.add(1,"hour"));const a={startTime:r,endTime:s},i=Vr(e,a),c=Gr(e,a),l={id:_r(),group:e.machineSN,area:e.productionArea,timeLineStatus:t,className:it(e.timeLineStatus),content:e.timeLineStatus==="製令單"?e.productName:e.timeLineStatus,_originalApiData:e};return n?(l.orderInfo=i,l.status=null,l.planStartTime=i.planStartTime,l.planEndTime=i.planEndTime,l.start=i.actualStartTime??i.planStartTime,l.end=i.actualEndTime??i.planEndTime,l.actualStartTime=i.actualStartTime,l.actualEndTime=i.actualEndTime):(l.status=c,l.orderInfo=null,l.planStartTime=c.planStartTime,l.planEndTime=c.planEndTime,l.start=c.actualStartTime??c.planStartTime,l.end=c.actualEndTime??c.planEndTime,l.actualStartTime=c.actualStartTime,l.actualEndTime=c.actualEndTime),l};//! =============== 5. 內部格式轉API - 工作訂單 ===============
function Qr(e,t,n,r){var i,c,l,p,T,m,b,I,x,S,v,g,y,O,w,k;const s=H(n,B,!0),a=H(r,B,!0);t.productionScheduleId=((i=e.orderInfo)==null?void 0:i.id)||((c=e._originalApiData)==null?void 0:c.productionScheduleId)||"",t.planOnMachineDate=(l=e.orderInfo)!=null&&l.planStartTime?H(e.orderInfo.planStartTime,B,!0):(p=e.orderInfo)!=null&&p.scheduledStartTime?H(e.orderInfo.scheduledStartTime,B,!0):s,t.planFinishDate=(T=e.orderInfo)!=null&&T.planEndTime?H(e.orderInfo.planEndTime,B,!0):(m=e.orderInfo)!=null&&m.scheduledEndTime?H(e.orderInfo.scheduledEndTime,B,!0):a,t.actualOnMachineDate=(b=e.orderInfo)!=null&&b.actualStartTime?H(e.orderInfo.actualStartTime,B,!0):null,t.actualFinishDate=(I=e.orderInfo)!=null&&I.actualEndTime?H(e.orderInfo.actualEndTime,B,!0):null,t.productSN=((x=e.orderInfo)==null?void 0:x.productId)||"",t.productName=((S=e.orderInfo)==null?void 0:S.productName)||e.content||"",t.workOrderQuantity=((v=e.orderInfo)==null?void 0:v.quantity)!=null?String(e.orderInfo.quantity):"0",t.productionQuantity=((g=e.orderInfo)==null?void 0:g.completedQty)!=null?String(e.orderInfo.completedQty):"0",t.processName=((y=e.orderInfo)==null?void 0:y.process)||"",t.productionScheduleStatus=((O=e.orderInfo)==null?void 0:O.orderStatus)||"",t.postponeTime=H((w=e.orderInfo)==null?void 0:w.postponeTime,B,!1)||null,t.workOrderSN=((k=e.orderInfo)==null?void 0:k.workOrderSN)||""}//! =============== 6. 內部格式轉API - 機台狀態 ===============
function Kr(e,t,n,r){const s=H(n,B,!0),a=H(r,B,!0),{status:i,_originalApiData:c}=e;t.machineStatusId=i.id||"",t.status=e.timeLineStatus||"",t.planStartDate=i!=null&&i.planStartTime?H(i.planStartTime,B,!0):i!=null&&i.startTime?H(i.startTime,B,!0):s,t.planEndDate=i!=null&&i.planEndTime?H(i.planEndTime,B,!0):i!=null&&i.endTime?H(i.endTime,B,!0):a,t.machineStatusReason=(i==null?void 0:i.reason)||null,t.machineStatusProduct=(i==null?void 0:i.product)||null}//! =============== 7. 主要轉換函數 ===============
const Jt=(e,t=null,n=!1)=>{if(!Zt(e,"internal"))return null;const{startTime:r,endTime:s,group:a,timeLineStatus:i,isWorkOrder:c}=Ur(e,t);t&&!n&&qt(e,t);const l={...Yr,timeLineStatus:c?"製令單":i,productionArea:e.area||$r,machineSN:a,machineId:e.machineId||null};return c?Qr(e,l,r,s):Kr(e,l,r,s),l},Xt=(e,t=!1)=>{const n=Jt(e,null,t);return t||Gt(n),n},en=(e,t,n=!1)=>{n||qt(e,t);const r=Jt(e,t,n);return n||Gt(r),r};//! =============== 1. 業務邏輯 Hook ===============
function Zr(e,t,n={}){const{onSave:r,onClose:s,groups:a}=n,[i,c]=h.useState((e==null?void 0:e.timeLineStatus)||d.IDLE),[l,p]=h.useState(null),[T,m]=h.useState(!1);h.useEffect(()=>{e!=null&&e.timeLineStatus&&c(e.timeLineStatus)},[e]);//! =============== 2. 錯誤處理函數 ===============
const b=h.useCallback(()=>{p(null)},[]),I=h.useCallback(f=>{const A=ue(f);p(A),ee(f,{context:"EnhancedDialog",dialogMode:t,statusType:i,itemId:e==null?void 0:e.id})},[t,i,e]);//! =============== 3. 驗證函數 ===============
const x=h.useCallback(f=>{if(f.planStartTime||f.start)f.planStartTime&&!f.start&&(f.start=f.planStartTime);else{const F=$e(new Date);f.planStartTime=F,f.start=F}},[]),S=h.useCallback(f=>{if(t==="add")return;const A=(e==null?void 0:e.timeLineStatus)===f.timeLineStatus;try{mt((e==null?void 0:e.timeLineStatus)||d.IDLE,f.timeLineStatus,e,t,A)}catch(F){throw se(F.message,{fromStatus:(e==null?void 0:e.timeLineStatus)||d.IDLE,toStatus:f.timeLineStatus,itemId:e==null?void 0:e.id,isDataOnlyEdit:A})}},[e,t]),v=h.useCallback(f=>{try{Cr(f,a)}catch(A){throw pe(A.message,{field:"timeOverlap",item:f.id,group:f.group})}},[a]);//! =============== 4. 數據轉換函數 ===============
const g=h.useCallback(f=>{var P,le,Ae,ut;const A=i===d.ORDER_CREATED,F=f.planStartTime||f.start,Y=f.planEndTime||f.end,j={...e,id:(e==null?void 0:e.id)||"",group:f.group||(e==null?void 0:e.group)||"",area:f.area||(e==null?void 0:e.area)||"",machineId:f.machineId||(e==null?void 0:e.machineId)||null,planStartTime:F,planEndTime:A?e==null?void 0:e.planEndTime:Y,start:F,end:A?e==null?void 0:e.end:Y,timeLineStatus:f.timeLineStatus||i,content:f.content||(e==null?void 0:e.content)||i};return A?(j.orderInfo={...e==null?void 0:e.orderInfo,productName:f.productName||"",process:f.process??0,planStartTime:F,planEndTime:((P=e==null?void 0:e.orderInfo)==null?void 0:P.planEndTime)||Y,scheduledStartTime:F,scheduledEndTime:((le=e==null?void 0:e.orderInfo)==null?void 0:le.scheduledEndTime)||Y,actualStartTime:(e==null?void 0:e.actualEndTime)??((Ae=e==null?void 0:e.orderInfo)==null?void 0:Ae.actualStartTime)??null,actualEndTime:(e==null?void 0:e.actualEndTime)??((ut=e==null?void 0:e.orderInfo)==null?void 0:ut.actualEndTime)??null},j.status={}):(j.status={...e==null?void 0:e.status,product:f.product||"",reason:f.reason||"",planStartTime:F,planEndTime:Y,startTime:F,endTime:Y},j.orderInfo={}),j},[e,i]),y=h.useCallback(f=>{if(t!=="add"&&(e==null?void 0:e.timeLineStatus)!==d.IDLE&&f.timeLineStatus===d.IDLE&&!f.end){const F=new Date;f.end=$e(F),f.status.endTime=$e(F)}return f},[t,e]);//! =============== 5. API 處理函數 ===============
const O=h.useCallback(async f=>{const A=Xt(f,!1);await(r==null?void 0:r({internal:f,api:A}))},[r]),w=h.useCallback(async f=>{const A=en(f,e,!1);await(r==null?void 0:r({internal:f,api:A}))},[r,e]);//! =============== 6. 主要提交處理 ===============
const k=h.useCallback(async f=>{if(!T)try{b(),m(!0),x(f);let A=g(f);S(A),v(A),A=y(A),t==="add"?await O(A):await w(A),s==null||s()}catch(A){I(A)}finally{m(!1)}},[T,b,I,x,g,S,v,y,O,w,s,t]);//! =============== 7. 狀態切換處理 ===============
const q=h.useCallback(f=>{try{if(b(),t==="add"&&i===f)return;mt(i,f,e,t),c(f)}catch(A){I(A)}},[b,I,i,e,t]);//! =============== 8. 返回公共 API ===============
return{currentStatus:i,error:l,isSubmitting:T,setCurrentStatus:c,clearError:b,handleSubmit:k,handleStatusChange:q}}const Jr=R(M)(({bgColor:e})=>({display:"inline-flex",alignItems:"center",height:"32px",padding:"0 16px",borderRadius:"16px",backgroundColor:e||"#757575",marginLeft:"16px",border:"1px solid rgba(255, 255, 255, 0.3)"})),Xr=R(N)({color:"#FFFFFF",fontSize:"0.85rem",fontWeight:600,lineHeight:1.5,marginLeft:"4px",marginRight:"4px"}),eo=R(M)({display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFFF",marginRight:"8px","& .MuiSvgIcon-root":{fontSize:"1.2rem"}}),to=({label:e,color:t,icon:n})=>o.jsxs(Jr,{bgColor:t,children:[n&&o.jsx(eo,{children:n}),o.jsx(Xr,{children:e})]});//! =============== 狀態圖標組件 ===============
function no({status:e}){switch(e){case d.ORDER_CREATED:return o.jsx(Ee,{color:"primary",variant:"dot",children:o.jsx(Ue,{fontSize:"medium"})});case d.IDLE:return o.jsx(Ee,{color:"default",variant:"dot",children:o.jsx(Ue,{fontSize:"medium"})});case d.SETUP:return o.jsx(Ee,{color:"warning",variant:"dot",children:o.jsx(kt,{fontSize:"medium"})});case d.STOPPED:return o.jsx(Ee,{color:"error",variant:"dot",children:o.jsx(Rt,{fontSize:"medium"})});default:return o.jsx(Ee,{color:"success",variant:"dot",children:o.jsx(Ct,{fontSize:"medium"})})}}//! =============== 對話框標題組件 ===============
function ro({status:e,isSubmitting:t,mode:n,item:r}){const s=or(e),a=kr(t,n),i=be(r);return o.jsxs(M,{sx:{display:"flex",alignItems:"center"},children:[o.jsx(N,{variant:"h6",component:"span",sx:{fontWeight:600,fontSize:"18px"},children:a}),t&&o.jsx(xe,{size:24,sx:{ml:2},color:"inherit"}),i&&o.jsx(Ot,{icon:o.jsx(An,{}),label:"歷史資料",size:"small",color:"warning",variant:"outlined",sx:{ml:2,fontSize:"12px",fontWeight:500}}),o.jsx(to,{label:e,color:s,icon:o.jsx(no,{status:e})})]})}//! =============== 對話框操作按鈕組件 ===============
function oo({mode:e,onMenuOpen:t,onClose:n,isSubmitting:r}){const s=e!=="view";return o.jsxs(M,{children:[s&&o.jsx(Mt,{title:"更多操作",children:o.jsx(Ve,{"aria-label":"更多操作",onClick:t,sx:{color:"inherit",padding:"8px"},children:o.jsx(jn,{fontSize:"medium"})})}),o.jsx(Ve,{"aria-label":"關閉",onClick:n,disabled:r,sx:{color:"inherit",padding:"8px",ml:1},children:o.jsx(Je,{fontSize:"medium"})})]})}//! =============== 底部操作按鈕組件 ===============
function so({mode:e,isSubmitting:t,onClose:n,onDelete:r,item:s}){const a=Sr(s),i=xr(s),c=be(s),l=e==="edit"&&!Qt(s)&&!Kt(s),p=t?"處理中...":i?"確認":"查看";return o.jsxs(o.Fragment,{children:[l&&o.jsx(sr,{onClick:a?r:void 0,startIcon:a?o.jsx(Xe,{}):o.jsx(Ft,{}),variant:"outlined",sx:{mr:"auto"},disabled:t||!a,children:a?"刪除":"已封存"}),o.jsx(Le,{onClick:n,disabled:t,children:"取消"}),o.jsx(Bt,{type:"submit",form:"status-form",variant:"contained",disabled:t||c&&e==="edit",children:p})]})}//! =============== 錯誤通知組件 ===============
function ao({error:e,onClose:t}){return o.jsx(On,{open:!!e,autoHideDuration:3e3,onClose:t,anchorOrigin:{vertical:"top",horizontal:"center"},children:o.jsx(Ie,{severity:"error",onClose:t,sx:{fontSize:"16px","& .MuiAlert-icon":{fontSize:"24px"}},children:e})})}//! =============== 狀態變更面板組件 ===============
function io({status:e,isSubmitting:t,onShowStatusDialog:n,item:r}){return Tr(r)?o.jsxs(Ze,{elevation:0,sx:{mb:3,p:2,display:"flex",alignItems:"center",border:"2px solid #E0E0E0",borderRadius:"6px",backgroundColor:"#F5F5F5"},children:[o.jsx(Le,{onClick:n,startIcon:o.jsx(Nt,{}),disabled:t,sx:{mr:2,fontSize:"16px"},children:"切換狀態"}),o.jsxs(N,{variant:"body1",color:"#424242",fontSize:"16px",fontWeight:500,children:["當前狀態: ",e]}),e!==d.IDLE&&o.jsx(N,{variant:"body2",color:"text.secondary",sx:{ml:2},children:"注意：當前狀態只能切換回待機狀態"})]}):null}//! =============== 對話框菜單組件 ===============
function co({anchorEl:e,onClose:t,mode:n,currentStatus:r,isOrder:s,isOnGoing:a,onShowStatusChange:i,onDelete:c}){const l=r!==d.ORDER_CREATED,p=n==="edit",T=p&&l,m=p&&!s,b=T&&m;return o.jsxs(Cn,{anchorEl:e,open:!!e,onClose:t,transformOrigin:{horizontal:"right",vertical:"top"},anchorOrigin:{horizontal:"right",vertical:"bottom"},children:[T&&o.jsxs(G,{onClick:i,children:[o.jsx(pt,{children:o.jsx(Nt,{fontSize:"small"})}),o.jsx(ht,{primary:"變更狀態",primaryTypographyProps:{fontSize:"16px",fontWeight:500}})]}),b&&o.jsx(me,{sx:{my:1}}),m&&o.jsxs(G,{onClick:c,sx:{color:"error.main"},disabled:a,children:[o.jsx(pt,{children:o.jsx(Xe,{fontSize:"small",color:a?"disabled":"error"})}),o.jsx(ht,{primary:"刪除項目",primaryTypographyProps:{fontSize:"16px",fontWeight:500}})]})]})}//! =============== 1. 共享驗證規則 ===============
const tn={start:E.string().min(1,"開始時間為必填").refine(e=>u(e).isValid(),"時間格式錯誤"),end:E.string().optional().or(E.literal("")).refine(e=>!e||u(e).isValid(),"時間格式錯誤"),planStartTime:E.string().min(1,"計劃開始時間為必填").refine(e=>u(e).isValid(),"時間格式錯誤"),planEndTime:E.string().optional().or(E.literal("")).refine(e=>!e||u(e).isValid(),"時間格式錯誤")},nn={group:E.string().min(1,"機台編號為必填"),area:E.string().min(1,"區域為必填")};//! =============== 2. 狀態特定驗證 ===============
function lo(e={}){return E.object({...nn,...e,planStartTime:tn.planStartTime,planEndTime:E.any().optional(),start:E.any().optional(),end:E.any().optional()})}function Pe(e={}){return E.object({...nn,...tn,...e})}const uo=lo({productName:E.string().optional(),process:E.string().optional(),quantity:E.coerce.number().optional(),completedQty:E.coerce.number().optional()}),po=Pe({machineId:E.coerce.number().optional()}),ho=Pe({setupInfo:E.string().optional(),reason:E.string().optional()}),mo=Pe({product:E.string().optional()}),fo=Pe({product:E.string().optional(),reason:E.string().min(1,"請選擇停機原因")});//! =============== 3. 驗證模式導出 ===============
const go={[d.ORDER_CREATED]:uo,[d.IDLE]:po,[d.SETUP]:ho,[d.TESTING]:mo,[d.STOPPED]:fo};function he(e){if(!e)return console.warn("❌ [ZOD] 缺少狀態類型參數，使用空對象驗證"),E.object({});const t=go[e];return t||(console.warn(`❌ [ZOD] 未找到狀態 "${e}" 的驗證模式，使用空對象驗證`),E.object({}))}//! =============== 1. 設定與常量 ===============
const Oe={defaultValues:{id:"",group:"",timeLineStatus:"",content:"",start:"",end:"",planStartTime:"",planEndTime:"",actualStartTime:"",actualEndTime:"",productId:"",productName:"",quantity:0,completedQty:0,process:"",orderStatus:""},timePickerProps:{type:"datetime-local",InputLabelProps:{shrink:!0},inputProps:{}}},Fe={group:{required:"請選擇機台"},start:{required:"請選擇開始時間",validate:{isValid:e=>e?u(e).isValid()||"無效的日期格式":!0,isFuture:e=>e?u(e).isAfter(u())||"開始時間必須在當前時間之後":!0}}},xt={[d.ORDER_CREATED]:{name:"製令單表單",schema:he(d.ORDER_CREATED),defaultValues:{group:"",start:"",planStartTime:"",planEndTime:"",actualStartTime:"",actualEndTime:""}},[d.IDLE]:{name:"待機表單",schema:he(d.IDLE),defaultValues:{start:u().format("YYYY-MM-DDTHH:mm"),end:u().add(2,"hour").format("YYYY-MM-DDTHH:mm"),planStartTime:u().format("YYYY-MM-DDTHH:mm"),planEndTime:u().add(1,"hour").format("YYYY-MM-DDTHH:mm"),actualStartTime:"",actualEndTime:"",group:"",area:"",machineId:0}},[d.SETUP]:{name:"上模與調機表單",schema:he(d.SETUP),defaultValues:{start:u().format("YYYY-MM-DDTHH:mm"),end:u().add(1,"hour").format("YYYY-MM-DDTHH:mm"),planStartTime:u().format("YYYY-MM-DDTHH:mm"),planEndTime:u().add(1,"hour").format("YYYY-MM-DDTHH:mm"),actualStartTime:"",actualEndTime:"",setupInfo:"",group:"",area:""}},[d.TESTING]:{name:"產品試模表單",schema:he(d.TESTING),defaultValues:{start:u().format("YYYY-MM-DDTHH:mm"),end:u().add(1,"hour").format("YYYY-MM-DDTHH:mm"),planStartTime:u().format("YYYY-MM-DDTHH:mm"),planEndTime:u().add(1,"hour").format("YYYY-MM-DDTHH:mm"),actualStartTime:"",actualEndTime:"",product:"",group:"",area:""}},[d.STOPPED]:{name:"機台停機表單",schema:he(d.STOPPED),defaultValues:{start:u().format("YYYY-MM-DDTHH:mm"),end:u().add(1,"hour").format("YYYY-MM-DDTHH:mm"),planStartTime:u().format("YYYY-MM-DDTHH:mm"),planEndTime:u().add(1,"hour").format("YYYY-MM-DDTHH:mm"),actualStartTime:"",actualEndTime:"",reason:"",group:"",area:""}}};//! =============== 1. 設定與常量 ===============
const He={basic:["status","id","group","area","timeLineStatus","machineId"],order:["productName","process","quantity","completedQty","scheduledStartTime","scheduledEndTime","orderStatus","postponeTime","workOrderSN"],time:["start","end","planStartTime","planEndTime","actualStartTime","actualEndTime"],status:["startTime","endTime","reason","product","planStartDate","planEndDate","actualStartDate","actualEndDate"]},xo={id:"id",group:"group",area:"area",timeLineStatus:"timeLineStatus",machineId:"machineId",start:["status.actualStartTime","orderInfo.actualStartTime","status.startTime","orderInfo.scheduledStartTime","start"],end:["status.actualEndTime","orderInfo.actualEndTime","status.endTime","orderInfo.scheduledEndTime","end"],planStartTime:["status.planStartTime","orderInfo.planStartTime"],planEndTime:["status.planEndTime","orderInfo.planEndTime"],actualStartTime:["status.actualStartTime","orderInfo.actualStartTime"],actualEndTime:["status.actualEndTime","orderInfo.actualEndTime"],productName:"orderInfo.productName",process:"orderInfo.process",quantity:"orderInfo.quantity",completedQty:"orderInfo.completedQty",orderStatus:"orderInfo.orderStatus",postponeTime:"orderInfo.postponeTime",workOrderSN:"orderInfo.workOrderSN",reason:"status.reason",product:"status.product"};//! =============== 2. 核心功能 ===============
function rn(e){const t=[...He.basic,...He.time];return e===d.ORDER_CREATED?[...t,...He.order]:e===d.TESTING?[...t,"product"]:e===d.STOPPED?[...t,"reason"]:e===d.SETUP?[...t,"setupInfo","reason"]:t}function qe(e,t,n){if(!t)return null;const r=xo[e],s=n===d.ORDER_CREATED;return Array.isArray(r)?So(r,t,s):r?To(r,t,s):t[e]}function So(e,t,n){for(const r of e){if(on(r,n))continue;const s=sn(t,r);if(s!=null)return s}return null}function To(e,t,n){return on(e,n)?null:sn(t,e)}function on(e,t){return t&&e.startsWith("status.")||!t&&e.startsWith("orderInfo.")}function bo(e,t,n){if(e==="end"&&n===d.ORDER_CREATED){const i=qe(e,t,n);return console.log("🔍 [processTimeField] 唯讀的 end 欄位原始值:",i),console.log("🔍 [processTimeField] 唯讀的 end 欄位類型:",i?typeof i:"undefined"),i}const r=qe(e,t,n);return oe(r||!(e==="actualStartTime"||e==="actualEndTime")&&(e==="start"||e==="planStartTime")&&new Date||null)}function Eo(e,t,n){const r={};return e.forEach(s=>{let a;["start","end","planStartTime","planEndTime","actualStartTime","actualEndTime"].includes(s)?a=bo(s,t,n):(a=qe(s,t,n),s==="timeLineStatus"&&(a=a||n)),a!==void 0&&(r[s]=a)}),r}function Io(e,t,n){const r=h.useRef(!1),s=h.useRef({});return h.useEffect(()=>{if(!(!e||r.current))try{const a=rn(t),i=Eo(a,e,t);s.current={...i},Object.entries(i).forEach(([c,l])=>{n(c,l,{shouldValidate:!0,shouldDirty:!1})}),r.current=!0}catch(a){ee(new fr("表單初始化失敗",{status:t,itemId:e==null?void 0:e.id,error:a.message})),console.error("表單初始化錯誤:",a)}},[e,n,t]),{initialized:r.current,initialFields:s.current}}function vo(e,t,n,r){return h.useMemo(()=>e?Object.keys(t).reduce((s,a)=>{const i=n(a),c=r[a];return i!==c&&(s[a]={from:c,to:i}),s},{}):{},[e,t,n,r])}const ye=(e,t)=>{const n=zn(),{register:r,setValue:s,watch:a,control:i,formState:{errors:c,isDirty:l,dirtyFields:p}}=n,T=h.useMemo(()=>rn(e),[e]),{initialized:m,initialFields:b}=Io(t,e,s),I=vo(l,p,a,b);return{register:r,watch:a,control:i,setValue:s,errors:c,isFieldError:x=>!!c[x],initialized:m,isDirty:l,changedFields:I,fields:T,isFieldRequired:x=>T.includes(x),getFieldValue:a,resetField:(x,S={})=>{const v=b[x]||(x==="start"?oe(new Date):"");s(x,v,{shouldValidate:!0,shouldDirty:!1,...S})}}};//! =============== 4. 工具函數 ===============
const sn=(e,t)=>{if(!e||!t)return;const n=t.split(".");if(!(n[0]==="orderInfo"&&(!e.orderInfo||e.orderInfo===null))&&!(n[0]==="status"&&(!e.status||e.status===null)))return n.reduce((r,s)=>r&&r[s]!==void 0?r[s]:void 0,e)},Do=(e,t)=>({id:`${e}${t}`,content:`${e}${t}`,area:e}),yo=e=>Array.from({length:at.MACHINES_PER_AREA},(t,n)=>Do(e,n+1));function wo(e){if(Array.isArray(e))return e.map(t=>{const{id:n,productionArea:r,machineSN:s}=t;return{id:s,content:s,area:r,originalId:n}})}const Ao=e=>{if(e)return new $t(e)},Q=R(M)(({theme:e})=>({padding:e.spacing(2),backgroundColor:"#F5F5F5",border:"2px solid #9E9E9E",borderRadius:e.shape.borderRadius,height:"56px",display:"flex",flexDirection:"column",justifyContent:"center",width:"100%"})),U=R(N)(({theme:e})=>({color:"#616161",fontSize:"0.85rem",fontWeight:500,marginBottom:e.spacing(.5)})),V=R(N)(({theme:e})=>({color:"#212121",fontSize:"1rem",fontWeight:400})),Ce=R(N)(({theme:e})=>({fontSize:"1.1rem",fontWeight:600,color:"#424242",marginBottom:e.spacing(1),paddingLeft:e.spacing(1),borderLeft:`4px solid ${e.palette.primary.main}`})),St=R(M)(({type:e,theme:t})=>({display:"flex",alignItems:"center",marginRight:t.spacing(3)})),Tt=R(M)(({type:e})=>({width:20,height:20,marginRight:8,borderRadius:4,backgroundColor:e==="editable"?"#FFFFFF":"#F5F5F5",border:e==="editable"?"2px solid #1976D2":"2px solid #9E9E9E"})),jo=R(M)(({value:e,color:t,theme:n})=>({width:"100%",height:"10px",backgroundColor:"#E0E0E0",borderRadius:"5px",marginTop:n.spacing(.5),overflow:"hidden",position:"relative","&:after":{content:'""',position:"absolute",left:0,top:0,height:"100%",width:`${e||0}%`,backgroundColor:t||"#1976D2",transition:"width 0.5s ease-in-out"}}));function We(e){if(!e)return"";try{const t=new Date(e);if(isNaN(t.getTime()))return console.warn("[formatISOToChineseDateTime] 無效的日期格式:",e),"";const n=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0"),a=t.getHours(),i=String(t.getMinutes()).padStart(2,"0"),c=a<12?"上午":"下午";let l;a===0?l=12:a<=12?l=a:l=a-12;const p=String(l).padStart(2,"0");return`${n}/${r}/${s} ${c}${p}:${i}`}catch(t){return console.error("[formatISOToChineseDateTime] 時間格式轉換錯誤:",t),""}}const Oo=({item:e,disabled:t})=>{var b,I,x;const{register:n,errors:r,watch:s,control:a,initialized:i}=ye(d.ORDER_CREATED,e),c=s("area"),l=c?yo(c):[];if(!i)return o.jsx(xe,{});if(!(e!=null&&e.id)||!(e!=null&&e.orderInfo))return null;const p=e.orderInfo.quantity&&e.orderInfo.quantity>0?Math.min(100,Math.round(e.orderInfo.completedQty/e.orderInfo.quantity*100)):0,T=e.orderInfo.orderStatus==="尚未上機"||e.orderInfo.orderStatus==="暫停生產",m=t||!T;return o.jsxs(D,{container:!0,spacing:3,children:[o.jsxs(D,{item:!0,xs:12,children:[o.jsx(Ie,{severity:"info",icon:!1,sx:{mb:2,display:"flex",alignItems:"center",backgroundColor:"#E3F2FD","& .MuiAlert-message":{width:"100%"}},children:o.jsxs(M,{sx:{display:"flex",flexDirection:{xs:"column",sm:"row"},alignItems:{xs:"flex-start",sm:"center"},width:"100%"},children:[o.jsx(N,{variant:"subtitle1",fontWeight:500,sx:{mr:2,mb:{xs:1,sm:0}},children:"欄位說明:"}),o.jsxs(M,{sx:{display:"flex",flexWrap:"wrap"},children:[o.jsxs(St,{children:[o.jsx(Tt,{type:"readonly"}),o.jsx(N,{variant:"body1",children:"灰框 = 只能查看"})]}),o.jsxs(St,{children:[o.jsx(Tt,{type:"editable"}),o.jsx(N,{variant:"body1",children:"藍框 = 可以編輯"})]})]})]})}),!T&&o.jsxs(Ie,{severity:"warning",sx:{mb:2},children:["此製令單目前狀態為「",e.orderInfo.orderStatus,"」，無法編輯。 只有「尚未上機」或「暫停生產」狀態的製令單可以修改區域、機台和預計上機日。"]})]}),o.jsxs(D,{item:!0,xs:12,children:[o.jsx(Ce,{children:"基本資訊"}),o.jsx(me,{sx:{mb:2,borderWidth:"1px"}}),o.jsxs(D,{container:!0,spacing:3,children:[o.jsxs(D,{item:!0,xs:12,sm:4,children:[o.jsx(U,{children:"製令單號"}),o.jsx(Q,{children:o.jsx(V,{children:e.orderInfo.workOrderSN})})]}),o.jsxs(D,{item:!0,xs:12,sm:4,children:[o.jsx(U,{children:"產品名稱"}),o.jsx(Q,{children:o.jsx(V,{children:e.orderInfo.productName})})]}),o.jsxs(D,{item:!0,xs:12,sm:4,children:[o.jsx(U,{children:"製程名稱"}),o.jsx(Q,{children:o.jsx(V,{children:e.orderInfo.process})})]}),o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsx(W,{fullWidth:!0,...n("area",Fe.area),select:!0,label:"區域",error:!!r.area,helperText:(b=r.area)==null?void 0:b.message,disabled:m,value:s("area")||"",sx:{mt:1,"& .MuiOutlinedInput-root":{"& fieldset":{borderWidth:"2px",borderColor:"#1976D2"},"&:hover fieldset":{borderColor:"#1976D2"}}},children:at.AREAS.map(S=>o.jsx(G,{value:S,children:S},S))})}),o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsx(W,{fullWidth:!0,...n("group",Fe.group),select:!0,label:"機台編號",error:!!r.group,helperText:(I=r.group)==null?void 0:I.message,disabled:m||!c,value:s("group")||((x=l[0])==null?void 0:x.id)||"",sx:{mt:1,"& .MuiOutlinedInput-root":{"& fieldset":{borderWidth:"2px",borderColor:"#1976D2"},"&:hover fieldset":{borderColor:"#1976D2"}}},children:l.map(S=>o.jsx(G,{value:S.id,children:S.content},S.id))})})]})]}),o.jsxs(D,{item:!0,xs:12,children:[o.jsx(Ce,{children:"生產數量"}),o.jsx(me,{sx:{mb:2,borderWidth:"1px"}}),o.jsxs(D,{container:!0,spacing:3,children:[o.jsxs(D,{item:!0,xs:12,sm:4,children:[o.jsx(U,{children:"製令數量"}),o.jsx(Q,{children:o.jsx(V,{children:e.orderInfo.quantity})})]}),o.jsxs(D,{item:!0,xs:12,sm:4,children:[o.jsx(U,{children:"已完成數量"}),o.jsx(Q,{children:o.jsx(V,{children:e.orderInfo.completedQty})})]}),o.jsxs(D,{item:!0,xs:12,sm:4,children:[o.jsx(U,{children:"完成率"}),o.jsxs(Q,{children:[o.jsxs(M,{sx:{display:"flex",alignItems:"center",mb:.5},children:[o.jsxs(V,{sx:{fontSize:"1.1rem",fontWeight:500,color:p>=100?"#4CAF50":p>0?"#1976D2":"#757575"},children:[p,"%"]}),o.jsxs(V,{sx:{ml:1},children:["(",e.orderInfo.completedQty," / ",e.orderInfo.quantity,")"]})]}),o.jsx(jo,{value:p,color:p>=100?"#4CAF50":"#1976D2"})]})]})]})]}),o.jsxs(D,{item:!0,xs:12,children:[o.jsx(Ce,{children:"時程安排"}),o.jsx(me,{sx:{mb:2,borderWidth:"1px"}}),o.jsxs(D,{container:!0,spacing:3,children:[o.jsxs(D,{item:!0,xs:12,sm:6,children:[o.jsx(U,{children:"預計上機日"}),o.jsx(_t,{name:"planStartTime",control:a,render:({field:S,fieldState:{error:v}})=>o.jsx(W,{...S,fullWidth:!0,type:"datetime-local",error:!!v,helperText:(v==null?void 0:v.message)||"",disabled:m,InputLabelProps:{shrink:!0},sx:{"& .MuiOutlinedInput-root":{"& fieldset":{borderWidth:"2px",borderColor:"#1976D2"},"&:hover fieldset":{borderColor:"#1976D2"}},"& .MuiInputBase-root":{height:"56px"}}})})]}),o.jsxs(D,{item:!0,xs:12,sm:6,children:[o.jsx(U,{children:"預計完成日"}),o.jsx(Q,{children:o.jsx(V,{children:e.planEndTime?We(e.planEndTime):"-"})})]})]})]}),o.jsxs(D,{item:!0,xs:12,children:[o.jsx(Ce,{children:"生產狀態"}),o.jsx(me,{sx:{mb:2,borderWidth:"1px"}}),o.jsxs(D,{container:!0,spacing:3,children:[o.jsxs(D,{item:!0,xs:12,sm:6,children:[o.jsx(U,{children:"實際上機日"}),o.jsx(Q,{children:o.jsx(V,{children:e.orderInfo.actualStartTime?We(e.orderInfo.actualStartTime):"尚未開始"})})]}),o.jsxs(D,{item:!0,xs:12,sm:6,children:[o.jsx(U,{children:"延遲完成日"}),o.jsx(Q,{children:o.jsx(V,{children:e.orderInfo.postponeTime?We(e.orderInfo.postponeTime):"-"})})]}),o.jsxs(D,{item:!0,xs:12,children:[o.jsx(U,{children:"狀態"}),o.jsx(Q,{children:o.jsxs(M,{sx:{display:"flex",alignItems:"center"},children:[o.jsx(M,{sx:{width:16,height:16,borderRadius:"50%",mr:1.5,bgcolor:e.orderInfo.orderStatus==="進行中"||e.orderInfo.orderStatus.toLowerCase()==="on-going"?"#4CAF50":e.orderInfo.orderStatus==="延遲"?"#F44336":"#1976D2"}}),o.jsx(V,{sx:{fontSize:"1.1rem"},children:e.orderInfo.orderStatus||"未開始"})]})})]})]})]})]})},Co=300,ae=(e=Co)=>new Promise(t=>setTimeout(t,e));//! =============== 1. 欄位名稱定義 ===============
const X={RUN:"RUN",IDLE:"IDLE",TUNING:"TUNING",TESTING:"TESTING",OFFLINE:"OFFLINE",生產中:"RUN",待機中:"IDLE",上模與調機:"TUNING",產品試模:"TESTING",機台停機:"OFFLINE"},Re=(e=0)=>{const t=new Date;return t.setDate(t.getDate()+e),t.toISOString()},Qe=e=>e[Math.floor(Math.random()*e.length)],Ro=()=>{const e=[X.RUN,X.IDLE,X.TUNING,X.TESTING,X.OFFLINE];return Qe(e)},ko=["塑膠杯蓋-A型","汽車零件-B123","電子外殼-C456","玩具配件-D789","容器本體-E001","包裝盒-F002","面板框架-G003","手機外殼-H004","工具握把-I005",null],Mo=["定期保養","模具更換","設備故障","材料短缺","品質調整","計劃性停機",null],Fo=(e,t,n="單")=>{const r=Ro(),s=r===X.RUN,a=r===X.OFFLINE,i=e.replace(/[A-Z]/g,""),l=(t.charCodeAt(0)-64)*100+parseInt(i);return{machine:{id:l,machineSN:e,productionArea:t,singleOrDoubleColor:n},machineStatusId:l*10+Math.floor(Math.random()*1e3),machineId:l,status:r,planStartDate:Re(-2),planEndDate:Re(3),actualStartDate:Re(-1),actualEndDate:s?null:Re(0),machineStatusProduct:s||r===X.TUNING?Qe(ko.filter(p=>p!==null)):null,machineStatusReason:a||r===X.TUNING?Qe(Mo.filter(p=>p!==null)):null}},Z=e=>({A:[{sn:"A1",color:"雙"},{sn:"A2",color:"單"},{sn:"A3",color:"單"},{sn:"A4",color:"單"},{sn:"A5",color:"單"},{sn:"A6",color:"單"},{sn:"A7",color:"單"},{sn:"A8",color:"單"},{sn:"A9",color:"單"},{sn:"A10",color:"單"}],B:[{sn:"B1",color:"單"},{sn:"B2",color:"雙"},{sn:"B3",color:"雙"},{sn:"B4",color:"雙"},{sn:"B5",color:"雙"},{sn:"B6",color:"雙"},{sn:"B7",color:"雙"},{sn:"B8",color:"雙"},{sn:"B9",color:"雙"},{sn:"B10",color:"雙"},{sn:"B11",color:"單"}],C:[{sn:"C1",color:"雙"},{sn:"C2",color:"單"},{sn:"C3",color:"單"},{sn:"C4",color:"單"},{sn:"C5",color:"單"},{sn:"C6",color:"單"},{sn:"C7",color:"單"},{sn:"C8",color:"單"},{sn:"C9",color:"單"}],D:[{sn:"D1",color:"單"},{sn:"D2",color:"單"},{sn:"D3",color:"單"},{sn:"D4",color:"單"},{sn:"D5",color:"單"},{sn:"D6",color:"單"},{sn:"D7",color:"單"},{sn:"D8",color:"單"},{sn:"D9",color:"單"}]}[e]||[]).map(r=>Fo(r.sn,e,r.color)),No=()=>({A:Z("A"),B:Z("B"),C:Z("C"),D:Z("D")});No();const Lo=tt.injectEndpoints({endpoints:e=>({getMachines:e.query({async queryFn(){{await ae();const n=["A","B","C","D"].flatMap(r=>Z(r).map(a=>a.machine));return console.log("[Mock API] 獲取機台列表:",n.length,"台機器"),console.log("[Mock API] 機台資料前3筆:",n.slice(0,3)),console.log("[Mock API] 返回結構:",{data:n}),{data:n}}},providesTags:["Machine"]}),getMachinesByArea:e.query({async queryFn(t){{await ae();const r=Z(t).map(s=>s.machine);return console.log(`[Mock API] 獲取區域 ${t} 的機台:`,r.length,"台機器"),{data:r}}},providesTags:(t,n,r)=>[{type:"Machine",id:r}]})})}),{useGetMachinesQuery:an,useGetMachinesByAreaQuery:La}=Lo,_o=({register:e,errors:t,disabled:n,title:r="時程安排"})=>{var s,a,i,c;return o.jsxs(o.Fragment,{children:[o.jsxs(D,{item:!0,xs:12,children:[o.jsx(N,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:r}),o.jsxs(D,{container:!0,spacing:2,children:[o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsx(W,{fullWidth:!0,...e("planStartTime"),...Oe.timePickerProps,label:"預計開始時間",error:!!(t!=null&&t.planStartTime),helperText:((s=t==null?void 0:t.planStartTime)==null?void 0:s.message)||"",disabled:n})}),o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsx(W,{fullWidth:!0,...e("planEndTime"),...Oe.timePickerProps,label:"預計結束時間",error:!!(t!=null&&t.planEndTime),helperText:((a=t==null?void 0:t.planEndTime)==null?void 0:a.message)||"",disabled:n})})]})]}),o.jsx(D,{item:!0,xs:12,children:o.jsxs(D,{container:!0,spacing:2,children:[o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsx(W,{fullWidth:!0,...e("actualStartTime"),...Oe.timePickerProps,label:"實際開始時間",error:!!(t!=null&&t.actualStartTime),helperText:((i=t==null?void 0:t.actualStartTime)==null?void 0:i.message)||"",disabled:n})}),o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsx(W,{fullWidth:!0,...e("actualEndTime"),...Oe.timePickerProps,label:"實際結束時間",error:!!(t!=null&&t.actualEndTime),helperText:((c=t==null?void 0:t.actualEndTime)==null?void 0:c.message)||"",disabled:n})})]})})]})},ze=et.memo(_o),Po=({disabled:e,item:t,status:n,mode:r="create"})=>{var Y;const{register:s,errors:a,watch:i,setValue:c,isFieldError:l,initialized:p,control:T}=ye(d.IDLE,t),m=an(),{isSuccess:b,isLoading:I,data:x}=m;console.log("[Idle] queryResult 完整結構:",m),console.log("[Idle] queryResult.data:",m.data),console.log("[Idle] queryResult.data?.data:",(Y=m.data)==null?void 0:Y.data);const S=i("area"),v=i("group"),g=r==="edit";console.log("[Idle] 表單模式:",r),console.log('[Idle] watch("area"):',S),console.log('[Idle] watch("group"):',v);const y=h.useMemo(()=>_e(d.IDLE,t),[t]),O=h.useMemo(()=>!b||!x?[]:[...new Set(x.map(j=>j.productionArea))].sort(),[x,b]),w=h.useMemo(()=>!b||!x||!S?[]:x.filter(j=>j.productionArea===S),[x,S,b]);if(!p||I)return o.jsx(xe,{size:24});if(!t)return null;const k=e||y,q=k,f=k||!S;console.log("[Idle] 機台API狀態:",{isSuccess:b,isLoading:I,machinesDataLength:x==null?void 0:x.length}),console.log("[Idle] machinesData 類型:",Array.isArray(x)?"陣列":typeof x),console.log("[Idle] machinesData 完整:",x),console.log("[Idle] machinesData 前3筆:",x==null?void 0:x.slice(0,3)),console.log("[Idle] machinesData[0] 結構:",x==null?void 0:x[0]),console.log("[Idle] 可用區域:",O),console.log("[Idle] 選擇的區域:",S),console.log("[Idle] 過濾後的機台:",w),console.log("[Idle] item 資料:",t);const A=()=>{var j;return y?"此狀態已開始執行，無法修改":S?w.length===0?"此區域無可用機台":((j=a.group)==null?void 0:j.message)||"":"請先選擇區域"},F=()=>{var j;return y?"此狀態已開始執行，無法修改":((j=a.area)==null?void 0:j.message)||""};return o.jsxs(D,{container:!0,spacing:3,children:[y&&o.jsx(D,{item:!0,xs:12,children:o.jsx(Ie,{severity:"info",icon:o.jsx(Ft,{}),sx:{mb:2},children:"此狀態已開始執行，成為歷史紀錄，無法修改"})}),o.jsxs(D,{item:!0,xs:12,children:[o.jsxs(N,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:["機台選擇",y?" - 歷史紀錄":""]}),o.jsxs(D,{container:!0,spacing:2,children:[o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsxs(W,{fullWidth:!0,...s("area",Fe.area),select:!0,label:"區域",error:l("area"),helperText:F(),disabled:q,value:S||"",children:[o.jsx(G,{value:"",disabled:!0,children:"請選擇區域"}),O.map(j=>o.jsx(G,{value:j,children:j},j))]})}),o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsx(_t,{name:"group",control:T,rules:g?{}:Fe.group,render:({field:j})=>o.jsx(W,{...j,fullWidth:!0,select:!0,label:"機台編號",error:l("group"),helperText:A(),disabled:f,value:j.value||"",onChange:P=>{const le=x==null?void 0:x.find(Ae=>Ae.machineSN===P.target.value);le&&c("machineId",le.id),j.onChange(P.target.value)},children:w.length>0?[o.jsx(G,{value:"",disabled:!0,children:"請選擇機台"},"placeholder"),...w.map(P=>o.jsx(G,{value:P.machineSN,children:P.machineSN},P.id))]:o.jsx(G,{value:"",disabled:!0,children:S?"此區域無可用機台":"請先選擇區域"})})})})]})]}),o.jsx("input",{type:"hidden",...s("machineId")}),o.jsx(ze,{register:s,errors:a,disabled:k})]})},zo=({disabled:e,item:t})=>{var a;const{register:n,errors:r,initialized:s}=ye(d.SETUP,t);return!t||!s?o.jsx(xe,{}):o.jsxs(D,{container:!0,spacing:2,children:[o.jsx(ze,{register:n,errors:r,disabled:e}),o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsx(W,{fullWidth:!0,...n("reason"),label:"調機說明",multiline:!0,rows:2,error:!!r.reason,helperText:(a=r.reason)==null?void 0:a.message,disabled:e})})]})},$o=({disabled:e,item:t})=>{var a;const{register:n,errors:r,initialized:s}=ye(d.TESTING,t);return o.jsxs(D,{container:!0,spacing:1,children:[o.jsx(ze,{register:n,errors:r,disabled:e}),o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsx(W,{fullWidth:!0,...n("product"),label:"測試產品",error:!!r.product,helperText:((a=r.product)==null?void 0:a.message)||"",disabled:e})})]})},Yo=({disabled:e,item:t})=>{var p;const{register:n,errors:r,watch:s,initialized:a}=ye(d.STOPPED,t),i=["機台故障","人員不足","等待物料","機台保養","塑料未乾","模具維修","換模換線","異常停機"],c=s("reason"),l=T=>T?i.includes(T)?!0:"請選擇有效的停機原因":"請選擇停機原因";return o.jsxs(D,{container:!0,spacing:2,children:[o.jsx(ze,{register:n,errors:r,disabled:e}),o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsxs(W,{fullWidth:!0,...n("reason",{required:"請選擇停機原因",validate:l}),select:!0,label:"停機原因",error:!!r.reason,helperText:((p=r.reason)==null?void 0:p.message)||"",required:!0,disabled:e,value:c||"",children:[o.jsx(G,{value:"",disabled:!0,children:"請選擇停機原因"}),i.map(T=>o.jsx(G,{value:T,children:T},T))]})})]})};//! =============== 1. 表單標題映射 ===============
const Bo={[d.ORDER_CREATED]:"製令單詳細資訊",[d.IDLE]:"待機狀態設定",[d.SETUP]:"設置狀態設定",[d.TESTING]:"測試狀態設定",[d.STOPPED]:"停機狀態設定"},bt={[d.ORDER_CREATED]:Oo,[d.IDLE]:Po,[d.SETUP]:zo,[d.TESTING]:$o,[d.STOPPED]:Yo};function Ho(e,t=!0){return t?Bo[e]||"狀態設定":`${e} 狀態設定 (使用默認表單)`}//! =============== 2. 表單控制器 ===============
const Wo=({status:e,item:t,disabled:n,onSubmit:r,mode:s="create",isSubmitting:a,onClose:i,groups:c})=>{const[l,p]=h.useState(null),T=_e(e,t),m=e==="製令單"?d.ORDER_CREATED:e,b=!!xt[m],I=b?m:d.IDLE,x=xt[I],S=$n({defaultValues:{...(x==null?void 0:x.defaultValues)||{},...t==null?void 0:t.status,group:(t==null?void 0:t.group)||"",area:(t==null?void 0:t.area)||"",...ur(t)},resolver:Yn(he(I)),mode:"onChange"}),v=S.formState.errors;h.useEffect(()=>{Object.keys(v).length>0},[v,I]);const g=bt[I]||bt[d.IDLE],y=h.useCallback(O=>{p(null);try{const w={...O,...O.quantity!==void 0&&{quantity:Number(O.quantity)},...O.completedQty!==void 0&&{completedQty:Number(O.completedQty)},timeLineStatus:m};console.log(`✅ [表單] ${m} 提交前的最終數據:`,w),r(w)}catch(w){const k=ue(w);throw p(k),ee(w,{component:"StatusController",status:m,formData:JSON.stringify(O).substring(0,200)}),w}},[m,I,r]);return o.jsx(Bn,{...S,children:o.jsxs("form",{id:"status-form",onSubmit:S.handleSubmit(y),children:[l&&o.jsx(Ie,{severity:"error",sx:{mb:2},onClose:()=>p(null),children:l}),o.jsxs(M,{sx:{mb:3},children:[o.jsx(ar,{children:Ho(I,b)}),o.jsx(ir,{children:a?o.jsx(M,{sx:{display:"flex",justifyContent:"center",alignItems:"center",height:"200px"},children:o.jsx(xe,{size:40})}):o.jsx(g,{disabled:n||T,item:t,groups:c,mode:s})})]})]})})},Uo=h.memo(Wo),Vo=R(M)(({active:e,disabled:t,statusColor:n})=>({padding:"24px 16px",borderRadius:"6px",border:`2px solid ${e?n:t?"#E0E0E0":"#9E9E9E"}`,backgroundColor:e?`${n}08`:"#FFFFFF",cursor:t?"not-allowed":"pointer",opacity:t?.7:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"140px",textAlign:"center",boxShadow:e?"0 2px 8px rgba(0,0,0,0.1)":"none","&:hover":{boxShadow:t?"none":"0 4px 8px rgba(0,0,0,0.1)",transform:t?"none":"translateY(-2px)",backgroundColor:e?`${n}12`:"#F5F5F5",borderColor:t?"#E0E0E0":e?n:"#616161"}})),Go=R(M)(({statusColor:e})=>({display:"flex",alignItems:"center",justifyContent:"center",color:e,marginBottom:"16px","& .MuiSvgIcon-root":{fontSize:"3rem"}})),qo=[{value:d.IDLE,label:"待機中",description:"機台待命狀態",icon:o.jsx(Rn,{}),color:"#757575"},{value:d.SETUP,label:"設置中",description:"機台設置與調整",icon:o.jsx(kt,{}),color:"#FF9800"},{value:d.TESTING,label:"產品試模",description:"進行產品測試",icon:o.jsx(Ct,{}),color:"#4CAF50"},{value:d.STOPPED,label:"機台停機",description:"機台暫停運作",icon:o.jsx(kn,{}),color:"#F44336"}],Qo=({open:e,onClose:t,currentStatus:n,onStatusChange:r,disabled:s,mode:a,item:i})=>{const c=l=>{try{if(n===l)return!0;const p=(i==null?void 0:i.timeLineStatus)||n;return!(p===d.ORDER_CREATED||p!==d.IDLE&&l!==d.IDLE)}catch{return!0}};return o.jsxs(nt,{open:e,onClose:t,maxWidth:"md","aria-labelledby":"status-change-dialog-title",children:[o.jsxs(rt,{id:"status-change-dialog-title",children:[o.jsxs(M,{sx:{display:"flex",alignItems:"center"},children:["變更機台狀態",s&&o.jsx(xe,{size:24,sx:{ml:2}})]}),o.jsx(M,{children:o.jsx(Mt,{title:"關閉",children:o.jsx("span",{children:o.jsx(Je,{onClick:t,sx:{cursor:"pointer",fontSize:"24px"}})})})})]}),o.jsxs(ot,{children:[o.jsx(N,{variant:"h6",sx:{mb:3,fontWeight:500,color:"#212121",fontSize:"18px"},children:"請選擇要切換的狀態："}),o.jsx(me,{sx:{mb:3,borderWidth:"1px"}}),o.jsx(D,{container:!0,spacing:3,children:qo.map(l=>{const p=n===l.value,T=s||!c(l.value);return o.jsx(D,{item:!0,xs:12,sm:6,children:o.jsx(M,{sx:{position:"relative"},children:o.jsxs(Vo,{active:p,disabled:T,statusColor:l.color,onClick:()=>{!T&&!p&&r(l.value)},children:[o.jsx(Go,{statusColor:l.color,children:l.icon}),o.jsx(N,{variant:"h6",fontWeight:600,color:p?l.color:"#212121",fontSize:"18px",sx:{mb:1},children:l.label}),o.jsx(N,{variant:"body1",color:"#616161",fontSize:"16px",children:l.description}),T&&!p&&o.jsx(M,{sx:{position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(255,255,255,0.7)",borderRadius:"6px",border:"2px solid #E0E0E0"},children:o.jsx(N,{color:"#616161",fontSize:"16px",fontWeight:500,children:"無法切換到此狀態"})})]})})},l.value)})})]}),o.jsx(st,{children:o.jsx(Le,{onClick:t,sx:{fontSize:"16px"},children:"關閉"})})]})};//! =============== 現代化主組件 ===============
function Ko({open:e,onClose:t,item:n,mode:r="view",onSave:s,onDelete:a,groups:i}){const c=Zr(n,r,{onSave:s,onClose:t,groups:i}),[l,p]=h.useState(!1),[T,m]=h.useState(0),[b,I]=h.useState(null),x=h.useId();//! =============== UI 事件處理 ===============
const S=h.useCallback(Y=>{I(Y.currentTarget)},[]),v=h.useCallback(()=>{I(null)},[]),g=h.useCallback((Y,j)=>{m(j)},[]),y=h.useCallback(()=>{p(!0),v()},[v]),O=h.useCallback(Y=>{c.handleStatusChange(Y),p(!1)},[c]),w=h.useCallback(()=>{n!=null&&n.id&&(a==null||a(n.id)),v()},[n,a,v]);//! =============== 渲染邏輯 ===============
if(!n)return null;const k=c.currentStatus!==d.ORDER_CREATED&&r==="edit",q=r==="add",f=Rr(r,c.isSubmitting,n),A=Qt(n),F=Kt(n);//! =============== 組件渲染 ===============
return o.jsxs(o.Fragment,{children:[o.jsxs(nt,{open:e,onClose:c.isSubmitting?void 0:t,maxWidth:"md",fullWidth:!0,disableEscapeKeyDown:c.isSubmitting,keepMounted:!1,"aria-labelledby":x,children:[o.jsxs(rt,{id:x,children:[o.jsx(ro,{status:c.currentStatus,isSubmitting:c.isSubmitting,mode:r,item:n}),o.jsx(oo,{mode:r,onMenuOpen:S,onClose:t,isSubmitting:c.isSubmitting})]}),q&&o.jsx(cr,{value:T,onChange:g,"aria-label":"狀態頁籤",variant:"scrollable",scrollButtons:"auto",children:o.jsx(lr,{label:d.IDLE,value:0})}),o.jsxs(ot,{dividers:!0,children:[k&&o.jsx(io,{status:c.currentStatus,isSubmitting:c.isSubmitting,onShowStatusDialog:y,item:n}),o.jsx(Uo,{status:c.currentStatus,item:n,disabled:f,onSubmit:c.handleSubmit,mode:r,isSubmitting:c.isSubmitting,onClose:t,groups:i})]}),o.jsx(st,{children:o.jsx(so,{mode:r,isSubmitting:c.isSubmitting,onClose:t,onDelete:w,item:n})})]}),o.jsx(Qo,{open:l,onClose:()=>p(!1),currentStatus:c.currentStatus,onStatusChange:O,disabled:c.isSubmitting,mode:r,item:n}),o.jsx(ao,{error:c.error,onClose:c.clearError}),o.jsx(co,{anchorEl:b,onClose:v,mode:r,currentStatus:c.currentStatus,isOrder:A,isOnGoing:F,onShowStatusChange:y,onDelete:w})]})}//! =============== 1. 事件系統 ===============
const Zo=()=>{const e={};return{on:(r,s)=>(e[r]||(e[r]=[]),e[r].push(s),()=>{e[r]=e[r].filter(a=>a!==s)}),emit:(r,s)=>{e[r]&&e[r].forEach(a=>{a(s)})}}};//! =============== 2. 對話框管理器 ===============
const Jo=()=>{const e=Zo();let t={isOpen:!1,mode:"view",item:null,groups:[]},n={isOpen:!1,itemId:null},r=[];const s=S=>{r=S||[]},a=(S,v,g)=>{t={isOpen:!0,mode:v,item:S,groups:g||r},e.emit("itemDialog:update",t)},i=()=>{t={...t,isOpen:!1},e.emit("itemDialog:update",t)},c=S=>e.on("itemDialog:update",S),l=S=>{e.emit("itemDialog:save",S)},p=S=>e.on("itemDialog:save",S),T=S=>{n={isOpen:!0,itemId:S},e.emit("deleteDialog:update",n)},m=()=>{n={...n,isOpen:!1},e.emit("deleteDialog:update",n)};return{setGroups:s,openItemDialog:a,closeItemDialog:i,onItemDialogChange:c,saveItem:l,onSaveItem:p,openDeleteDialog:T,closeDeleteDialog:m,onDeleteDialogChange:S=>e.on("deleteDialog:update",S),confirmDelete:()=>{e.emit("deleteDialog:confirm",n.itemId),m(),i()},onConfirmDelete:S=>e.on("deleteDialog:confirm",S)}};//! =============== 3. 單例實現 ===============
const Xo=(()=>{let e;return e||(e=Jo()),e})(),{setGroups:cn,openItemDialog:Et,closeItemDialog:It,onItemDialogChange:es,saveItem:ts,onSaveItem:ns,openDeleteDialog:ln,closeDeleteDialog:rs,onDeleteDialogChange:os,confirmDelete:ss,onConfirmDelete:as}=Xo;function is(){const[e,t]=h.useState({isOpen:!1,mode:"view",item:null,groups:[]});h.useEffect(()=>es(t),[]);const n=s=>{ts(s),It()},r=()=>{var s;(s=e.item)!=null&&s.id&&ln(e.item.status.id)};return!e.isOpen||!e.item?null:Lt.createPortal(o.jsx(Ko,{open:e.isOpen,onClose:()=>It(),item:e.item,mode:e.mode,onSave:n,onDelete:r,groups:e.groups}),document.body)}const cs=({open:e,title:t="刪除確認",content:n="確定要刪除這個項目嗎？",onConfirm:r,onCancel:s,confirmText:a="刪除",cancelText:i="取消"})=>o.jsxs(nt,{open:e,onClose:s,maxWidth:"sm","aria-labelledby":"delete-dialog-title",children:[o.jsxs(rt,{id:"delete-dialog-title",sx:{backgroundColor:$.colors.accent.red},children:[o.jsx(M,{sx:{display:"flex",alignItems:"center"},children:t}),o.jsx(Ve,{"aria-label":"關閉",onClick:s,sx:{color:$.colors.text.contrast},children:o.jsx(Je,{})})]}),o.jsxs(ot,{children:[o.jsxs(M,{sx:{display:"flex",alignItems:"center",backgroundColor:"rgba(244, 67, 54, 0.08)",borderRadius:$.size.borderRadius,padding:2,marginBottom:2},children:[o.jsx(Rt,{sx:{fontSize:40,color:$.colors.accent.red,marginRight:2}}),o.jsx(N,{variant:"body1",children:n})]}),o.jsx(N,{variant:"body2",color:"textSecondary",children:"此操作不可撤銷，刪除後的數據無法復原。"})]}),o.jsxs(st,{children:[o.jsx(Le,{onClick:s,sx:{mr:1},children:i}),o.jsx(Bt,{onClick:r,variant:"contained",color:"error",startIcon:o.jsx(Xe,{}),sx:{backgroundColor:$.colors.accent.red,"&:hover":{backgroundColor:$.colors.accent.red,opacity:.9}},children:a})]})]});function ls(){const[e,t]=h.useState({isOpen:!1,itemId:null});return h.useEffect(()=>os(r=>{t(r)}),[]),e.isOpen?Lt.createPortal(o.jsx(cs,{open:e.isOpen,title:"刪除確認",content:"確定要刪除這個生產項目嗎？此操作將會移除所有相關的排程資訊。",onConfirm:()=>ss(),onCancel:()=>rs(),confirmText:"刪除",cancelText:"取消"}),document.body):null}function ds(){return o.jsxs(o.Fragment,{children:[o.jsx(is,{}),o.jsx(ls,{})]})}const us=Un`
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
`,J={colors:{header:"#186c98",text:"#ffffff",gridMinor:"#00bbc9",gridMajor:"#00747c",hover:"rgba(25, 118, 210, 0.05)",weekend:"rgba(25, 118, 210, 0.08)",rowAlternate:"rgba(0, 0, 0, 0.02)"},spacing:{base:"1rem",label:"2px 14px"}},ps=_.div`
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
    padding: ${J.spacing.base};
    background: rgba(255, 255, 255, 0.95);
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }

  /* TimeAxisStyles 樣式 */
  .vis-panel.vis-top,
  .vis-time-axis.vis-foreground {
    background-color: ${J.colors.header};
  }

  .vis-time-axis .vis-text {
    color: ${J.colors.text} !important;
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
    border-left: 1px dashed ${J.colors.gridMinor};
  }

  .vis-grid.vis-major {
    border-left: 2px solid ${J.colors.gridMajor};
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
      background-color: ${J.colors.rowAlternate};
    }

    &:hover {
      background-color: ${J.colors.hover};
    }
  }

  /* 週末特殊樣式 */
  .vis-time-axis .vis-grid.vis-saturday,
  .vis-time-axis .vis-grid.vis-sunday {
    background-color: ${J.colors.weekend};
  }

  /* 標籤樣式 */
  .vis-labelset .vis-label {
    padding: ${J.spacing.label};
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
`;_.div`
  width: 100%;
  flex-grow: 1;
  min-height: 600px;
`;//! =============== 1. 基礎配置 ===============
const te={colors:{header:"#186c98",text:"#ffffff",gridMinor:"#00bbc9",gridMajor:"#00747c",hover:"rgba(25, 118, 210, 0.05)",weekend:"rgba(25, 118, 210, 0.08)",rowAlternate:"rgba(0, 0, 0, 0.02)"},spacing:{base:"1rem",label:"2px 14px"}};//! =============== 2. 共用樣式 ===============
const hs=zt`
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
`,ms=zt`
  .vis-grid {
    &.vis-minor {
      border-color: rgba(0, 0, 0, 0.05);
      border-left: 1px dashed ${te.colors.gridMinor};
    }

    &.vis-major {
      border-left: 2px solid ${te.colors.gridMajor};
    }
  }
`;//! =============== 3. 組件實現 ===============
_.div`
  .vis-timeline {
    border: none;
    font-family: "Noto Sans TC", sans-serif;
    padding: ${te.spacing.base};
  }

  /* ✨ Header 樣式 */
  .vis-panel.vis-top,
  .vis-time-axis.vis-foreground {
    background-color: ${te.colors.header};
  }

  .vis-time-axis .vis-text {
    color: ${te.colors.text} !important;
  }

  /* 💡 中心區域滾動 */
  .vis-panel.vis-center {
    ${hs}
  }
`;_.div`
  /* ✨ 基礎網格 */
  ${ms}

  /* 💡 行樣式與互動 */
  .vis-panel.vis-center .vis-content {
    .vis-itemset .vis-foreground .vis-group {
      transition: background-color 0.2s ease;

      &:nth-child(odd) {
        background-color: ${te.colors.rowAlternate};
      }

      &:hover {
        background-color: ${te.colors.hover};
      }
    }
  }

  /* ✨ 週末特殊樣式 */
  .vis-time-axis .vis-grid {
    &.vis-saturday,
    &.vis-sunday {
      background-color: ${te.colors.weekend};
    }
  }

  /* 💡 標籤樣式 */
  .vis-labelset .vis-label {
    padding: ${te.spacing.label};

    /* ⚠️ 支持動態行顏色 */
    &[data-color] {
      background-color: var(--row-color);
    }
  }
`;_.div`
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
`;_.div`
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
`;_.div`
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
`;_.div`
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
`;_.div`
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
`;_.div`
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
`;_.div`
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
const ie=(e=0,t=0)=>u().add(e,"day").add(t,"hour").toISOString(),ge=e=>e[Math.floor(Math.random()*e.length)],L=(e,t)=>Math.floor(Math.random()*(t-e+1))+e;let fs=1e4;const we=()=>fs++;//! =============== 2. 常量定義 ===============
const ct=["塑膠杯蓋-A型","汽車零件-B123","電子外殼-C456","玩具配件-D789","容器本體-E001","包裝盒-F002","面板框架-G003","手機外殼-H004","工具握把-I005","醫療器材-J006"],gs=["設備故障","模具損壞","原料不足","計劃性維護","電力中斷","品質異常"],xs=["射出成型","吹塑成型","壓鑄成型","熱壓成型"],Ss={A:Array.from({length:10},(e,t)=>`A${t+1}`),B:Array.from({length:11},(e,t)=>`B${t+1}`),C:Array.from({length:9},(e,t)=>`C${t+1}`),D:Array.from({length:9},(e,t)=>`D${t+1}`)};//! =============== 3. 製令單資料生成器 ===============
const Ts=(e,t,n,r=!1)=>{const s=we(),a=L(8,48),i=L(100,5e3),c=r?L(50,i):0,l=ie(n,L(8,16)),p=u(l).add(a,"hour").toISOString(),T=r?ie(n,L(8,16)):null,m=r&&L(1,10)>7?u(T).add(a+L(-2,5),"hour").toISOString():null;let b;return r?m?b="已完成":b="進行中":b="尚未上機",{timeLineStatus:d.ORDER_CREATED,productionScheduleId:s,productionArea:e,machineSN:t,planOnMachineDate:l,planFinishDate:p,actualOnMachineDate:T,actualFinishDate:m,workOrderSN:`WO-${String(s).padStart(6,"0")}`,productSN:`P-${L(1e3,9999)}`,productName:ge(ct),processName:ge(xs),workOrderQuantity:i,productionQuantity:c,productionScheduleStatus:b,postponeTime:r&&L(1,10)>8?u(p).add(L(1,5),"day").toISOString():null,createdAt:ie(-30),updatedAt:ie(-1)}};//! =============== 4. 機台狀態資料生成器 ===============
const bs=(e,t,n,r=!1)=>{const s=we(),a=L(1,4),i=ie(n,L(8,16)),c=u(i).add(a,"hour").toISOString(),l=r?i:null,p=r?u(l).add(a,"hour").toISOString():null;return{timeLineStatus:d.IDLE,productionArea:e,machineSN:t,machineStatusId:s,machineStatusPlanStartTime:i,machineStatusPlanEndTime:c,machineStatusActualStartTime:l,machineStatusActualEndTime:p,machineStatusReason:"",machineStatusProduct:""}},Es=(e,t,n,r=!1)=>{const s=we(),a=L(2,6),i=ie(n,L(8,16)),c=u(i).add(a,"hour").toISOString(),l=r?i:null,p=r?u(l).add(a,"hour").toISOString():null;return{timeLineStatus:d.SETUP,productionArea:e,machineSN:t,machineStatusId:s,machineStatusPlanStartTime:i,machineStatusPlanEndTime:c,machineStatusActualStartTime:l,machineStatusActualEndTime:p,machineStatusReason:ge(["模具更換","參數調整","首件檢驗"]),machineStatusProduct:ge(ct)}},Is=(e,t,n,r=!1)=>{const s=we(),a=L(1,3),i=ie(n,L(8,16)),c=u(i).add(a,"hour").toISOString(),l=r?i:null,p=r?u(l).add(a,"hour").toISOString():null;return{timeLineStatus:d.TESTING,productionArea:e,machineSN:t,machineStatusId:s,machineStatusPlanStartTime:i,machineStatusPlanEndTime:c,machineStatusActualStartTime:l,machineStatusActualEndTime:p,machineStatusReason:"",machineStatusProduct:ge(ct)}},vs=(e,t,n,r=!1)=>{const s=we(),a=L(1,8),i=ie(n,L(8,16)),c=u(i).add(a,"hour").toISOString(),l=r?i:null,p=r?u(l).add(a,"hour").toISOString():null;return{timeLineStatus:d.STOPPED,productionArea:e,machineSN:t,machineStatusId:s,machineStatusPlanStartTime:i,machineStatusPlanEndTime:c,machineStatusActualStartTime:l,machineStatusActualEndTime:p,machineStatusReason:ge(gs),machineStatusProduct:""}};//! =============== 5. 綜合資料生成器 ===============
const Ds=(e,t)=>{const n=[];let r=-7;const s=L(8,12);for(let a=0;a<s;a++){const i=r<0,c=L(1,100);let l;c<=40?l=Ts(e,t,r,i):c<=55?l=bs(e,t,r,i):c<=70?l=Es(e,t,r,i):c<=85?l=Is(e,t,r,i):l=vs(e,t,r,i),n.push(l),r+=L(1,2)}return n},ce=e=>{const t=Ss[e]||[],n=[];return t.forEach(r=>{const s=Ds(e,r);n.push(...s)}),n},ys=()=>({A:ce("A"),B:ce("B"),C:ce("C"),D:ce("D")}),ws=(e,t,n)=>{if(!t||!n)return e;const r=u(t),s=u(n);return e.filter(a=>{let i,c;return a.timeLineStatus===d.ORDER_CREATED?(i=u(a.actualOnMachineDate||a.planOnMachineDate),c=u(a.actualFinishDate||a.planFinishDate)):(i=u(a.machineStatusActualStartTime||a.machineStatusPlanStartTime),c=u(a.machineStatusActualEndTime||a.machineStatusPlanEndTime)),i.isBefore(s)&&c.isAfter(r)})};ys();let ke={A:ce("A"),B:ce("B"),C:ce("C"),D:ce("D")};const As=tt.injectEndpoints({endpoints:e=>({getSmartSchedule:e.query({async queryFn({productionArea:t,startTime:n,endTime:r}){{await ae();let s=ke[t]||[];n&&r&&(s=ws(s,n,r));const a=s.reduce((i,c)=>(i[c.timeLineStatus]=(i[c.timeLineStatus]||0)+1,i),{});return console.log(`[Mock API] 獲取區域 ${t} 的排程:`,s.length,"筆資料",a),{data:{data:s}}}},providesTags:["schedule"]}),changeWorkOrder:e.mutation({async queryFn(t){{await ae();const{productionScheduleId:n,planOnMachineDate:r,machineSN:s}=t;let a=!1;return Object.keys(ke).forEach(i=>{ke[i]=ke[i].map(c=>c.productionScheduleId===n?(a=!0,{...c,planOnMachineDate:r,machineSN:s,updatedAt:new Date().toISOString()}):c)}),console.log(`[Mock API] 更新工單 ${n}:`,a?"成功":"找不到工單"),{data:{success:a,message:a?"工單已更新":"找不到工單"}}}},invalidatesTags:["schedule"]})})}),{useGetSmartScheduleQuery:js,useChangeWorkOrderMutation:Os}=As,Cs={current:"現在",time:"時間",deleteSelected:"刪除選取",editable:{add:"新增",remove:"刪除",updateTime:"調整時間",updateGroup:"調整群組"}},Rs={months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),meridiem:(e,t)=>{const n=e*100+t;return n<600?"凌晨":n<900?"早上":n<1130?"上午":n<1230?"中午":n<1800?"下午":"晚上"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:(e,t)=>{let n=e===12?0:e;return["凌晨","早上","上午"].includes(t)?n:t==="中午"?n>=11?n:n+12:["下午","晚上"].includes(t)?n+12:n}},vt={hour:{zoomMin:1e3*60*5},day:{zoomMin:1e3*60*15},week:{zoomMin:1e3*60*60},month:{zoomMin:1e3*60*60*12}},ks={hour:{label:"小時",getWindow:e=>de("hour",e),format:{minorLabels:{minute:"mm",hour:"HH:mm"},majorLabels:{minute:"HH:mm",hour:"MM-DD HH:mm"}}},day:{label:"天",getWindow:e=>de("day",e),format:{minorLabels:{hour:"HH:mm",day:"D日"},majorLabels:{hour:"M月D日",day:"YYYY年M月"}}},week:{label:"週",getWindow:e=>de("week",e),format:{minorLabels:{day:"DD日",week:"第w週"},majorLabels:{day:"MM月",week:"YYYY年"}}},month:{label:"月",getWindow:e=>de("month",e),format:{minorLabels:{day:"DD",month:"MM月"},majorLabels:{day:"MM月",month:"YYYY年"}}}};//! =============== 1. 常量定義 ===============
const dn=2;//! =============== 2. 輔助函數 ===============
function Ms(e){return e.timeLineStatus==="製令單"}function Fs(e){if(!e)return!1;const t=new Date;return e.actualStartTime&&new Date(e.actualStartTime)<t||e.scheduledStartTime&&new Date(e.scheduledStartTime)<t}function Ns(e){return(e==null?void 0:e.startTime)&&new Date(e.startTime)<new Date}function Ls(e,t){const n=e.actualStartTime||e.planStartTime||t.start,r=e.actualEndTime||e.planEndTime||t.end;return{startDate:n,endDate:r}}function _s(e,t){const n=e.startTime||t.start,r=e.endTime||e.startTime&&u(e.startTime).add(dn,"hour").toDate()||t.end;return{startDate:n,endDate:r}}function un(e){const t=e.start,n=e.end||u(e.start).add(dn,"hour").toDate();return{startDate:t,endDate:n}}//! =============== 3. 主要處理函數 ===============
function Ps(e){var a;const t=Fs(e.orderInfo),n=un(e),{startDate:r,endDate:s}=e.orderInfo?Ls(e.orderInfo,n):n;return(a=e==null?void 0:e.orderInfo)==null||a.orderStatus,{...e,start:r,end:s,editable:t?{updateTime:!1,updateGroup:!1,remove:!1}:{updateTime:!0,updateGroup:!0,remove:!1}}}function zs(e){const t=Ns(e.status),n=un(e),{startDate:r,endDate:s}=e.status?_s(e.status,n):n;return{...e,start:u(r).toDate(),end:u(s).toDate(),editable:t?{updateTime:!1,updateGroup:!1,remove:!1}:{updateTime:!1,updateGroup:!0,remove:!0}}}const $s=e=>Ms(e)?Ps(e):zs(e),Ys=e=>{if(!Array.isArray(e))return[];try{return e.map(n=>{const r=qr(n);return $s(r)})}catch(t){return console.error("轉換排程數據時出錯:",t),[]}},Bs=(e,t=null)=>{const n=h.useMemo(()=>{console.log("[useTimelineData] 原始機台列表:",e);const s=e?wo(e):[];console.log("[useTimelineData] 轉換後的機台列表:",s);const a=Ao(s);return console.log("[useTimelineData] 生成的 groups:",a),a},[e]),r=h.useRef(null);return r.current||(r.current=new $t([])),h.useEffect(()=>{if(console.log("[useTimelineData] 排程列表更新:",t==null?void 0:t.length,"筆"),!(t!=null&&t.length)){const s=r.current.getIds();s.length>0&&r.current.remove(s),console.log("[useTimelineData] 無排程數據，已清空");return}try{console.log("[useTimelineData] 開始轉換排程數據...");const s=Ys(t);console.log("[useTimelineData] 轉換後的數據:",s.length,"筆"),console.log("[useTimelineData] 第一筆轉換後數據:",s[0]);const a=r.current.getIds();a.length>0&&r.current.remove(a),s.length>0&&(r.current.add(s),console.log("[useTimelineData] 已添加",s.length,"筆數據到 DataSet"))}catch(s){console.error("[useTimelineData] 轉換排程數據失敗:",s),console.error("[useTimelineData] 錯誤堆疊:",s.stack)}},[t]),{itemsDataRef:r,groups:n}},Hs={width:"100%",minHeight:"600px",margin:{item:{horizontal:10,vertical:10}},groupHeightMode:"auto",orientation:"top",zoomable:!1,moveable:!0,stack:!0,stackSubgroups:!0,verticalScroll:!0,horizontalScroll:!0,showCurrentTime:!0,locale:"zh-TW",snap:null,locales:{"zh-TW":Cs},moment:function(e){return Pt(e).locale("zh-tw").utcOffset("+08:00")}},Ws={minorLabels:{millisecond:"SSS",second:"s秒",minute:"a h:mm",hour:"a h點",weekday:"M月D日",day:"D日",week:"第w週",month:"M月",year:"YYYY年"},majorLabels:{millisecond:"HH:mm:ss",second:"M月D日 a h:mm",minute:"M月D日 a h:mm",hour:"M月D日 a",weekday:"YYYY年M月",day:"YYYY年M月",week:"YYYY年M月",month:"YYYY年",year:""}},Dt={[d.ORDER_CREATED]:e=>{var t,n;return`${(t=e._originalApiData)==null?void 0:t.productionScheduleStatus}  /  製令單號: ${(n=e.orderInfo)==null?void 0:n.workOrderSN} `||"製令單號未設定"},[d.STOPPED]:e=>{var t;return((t=e.status)==null?void 0:t.reason)||e.machineStatusReason||"停機原因未設定"},[d.TESTING]:e=>{var t;return((t=e.status)==null?void 0:t.product)||e.machineStatusProduct||""},default:e=>""},Us=e=>{const t=e.timeLineStatus;return(Dt[t]||Dt.default)(e)},Vs=e=>{const t=e.content||"",n=()=>({IDLE:"status-idle",TUNING:"status-tuning",TESTING:"status-testing",OFFLINE:"status-offline",ORDER_CREATED:"status-order"})[e.timeLineStatus]||"",r=Us(e),s=t||r;return`
    <div class="timeline-item ${n()}" title="${s}">
      <div class="timeline-item-content">${t}</div>
      ${r?`<div class="timeline-item-status">${r}</div>`:""}
    </div>
  `};//! =============== 1. 設定與常量 ===============
const Gs=1e3*60*60*24*31*12*10;//! =============== 4. 工具函數 ===============
function qs(e,t){const n=u(e.start),r=u(e.end),s=u(t.start),a=u(t.end);return n.isBefore(a)&&r.isAfter(s)}function Qs(e){return e==="hour"?{timeAxis:{scale:"hour",step:1}}:{}}//! =============== 3. 核心功能 ===============
function Ks(e,t){const n=h.useCallback(()=>({...Hs,editable:{add:!1,updateTime:!1,updateGroup:!1,remove:!1,overrideItems:!0},selectable:!0,multiselect:!1,format:Ws,snap:null,zoomMax:Gs}),[e]),r=h.useCallback(a=>{const i=de(a);return{...vt[a],start:i.start.toDate(),end:i.end.toDate(),zoomMin:vt[a].zoomMin}},[]),s=h.useCallback(()=>({...n(),...r(t),...Qs(t),template:Vs}),[t,n,r]);return{getBaseOptions:n,getTimeWindowOptions:r,getTimelineOptions:s,hasTimeOverlap:qs}}let re={A:Z("A"),B:Z("B"),C:Z("C"),D:Z("D")};const Zs=tt.injectEndpoints({endpoints:e=>({getMachineStatus:e.query({async queryFn(t){{await ae();const n=re[t]||[];return console.log(`[Mock API] 獲取區域 ${t} 的機台狀態:`,n.length,"台機器"),{data:n}}},providesTags:["MachineStatus"]}),createMachineStatus:e.mutation({async queryFn(t){var n;{await ae();const r={...t,machineStatusId:t.machineStatusId||Date.now()},s=((n=t.machine)==null?void 0:n.productionArea)||"A";return re[s]=re[s].map(a=>a.machineId===t.machineId?{...a,...r}:a),console.log("[Mock API] 新增機台狀態:",r),{data:r}}},invalidatesTags:["MachineStatus","schedule"]}),updateMachineStatus:e.mutation({async queryFn(t){var n;{await ae();const r=((n=t.machine)==null?void 0:n.productionArea)||"A";return re[r]=re[r].map(s=>s.machineId===t.machineId?{...s,...t}:s),console.log("[Mock API] 更新機台狀態:",t),{data:t}}},invalidatesTags:["MachineStatus","schedule"]}),deleteMachineStatus:e.mutation({async queryFn(t){return await ae(),Object.keys(re).forEach(n=>{re[n]=re[n].map(r=>r.machineStatusId===t?{...r,status:"IDLE",machineStatusProduct:null,machineStatusReason:null}:r)}),console.log("[Mock API] 刪除機台狀態 ID:",t),{data:{success:!0}}},invalidatesTags:["MachineStatus","schedule"]})})}),{useGetMachineStatusQuery:_a,useCreateMachineStatusMutation:Js,useUpdateMachineStatusMutation:Xs,useDeleteMachineStatusMutation:ea}=Zs;function ta(e){return typeof e=="number"||typeof e=="string"&&!isNaN(Number(e))}//! =============== 1. 設定與常量 ===============
const pn=2,yt=1,ne={INVALID_STRUCTURE:"項目格式不正確，請檢查資料結構",CANNOT_DELETE_ORDER:"無法刪除製令單，製令單不允許被刪除",TIME_OVERLAP:"時間重疊：除了「製令單」外的其他狀態都不允許時間重疊",SAVE_ORDER_FAILED:"保存製令單失敗",SAVE_STATUS_FAILED:"保存機台狀態失敗",DELETE_FAILED:"刪除項目失敗",START_DATE_TOO_EARLY:"預計上機日不能早於當前時間，請選擇未來的時間",INVALID_INPUT:"輸入資料有誤，請檢查後重試"};//! =============== 2. 類型與介面 ===============
function Ne(e){return(e==null?void 0:e.timeLineStatus)===d.ORDER_CREATED}function na(e){if(!(e!=null&&e.internal))throw new Error(ne.INVALID_STRUCTURE)}function ra(e){return!Ne(e)}function oa(e,t){var n;return((n=e==null?void 0:e.status)==null?void 0:n.id)&&e.status.id===t}function sa(e){const t=e==null?void 0:e.data,n=t==null?void 0:t.error_reason,r=t==null?void 0:t.message;let s;n==="Invalid_input"?r!=null&&r.includes("New start date is earlier than now")?s=ne.START_DATE_TOO_EARLY:s=ne.INVALID_INPUT:r?s=r:s=e.message||ne.SAVE_ORDER_FAILED;const a=fe(s,{originalError:e,errorData:t,errorReason:n,apiEndpoint:"smart-schedule",timestamp:new Date().toISOString()});return ee(a,{context:"製令單 API 更新",errorReason:n,originalMessage:r}),ue(a)}function aa(e){return e&&typeof e=="string"&&e.startsWith("ITEM-")}//! =============== 3. 核心功能 ===============
function lt(e){if(Ne(e)&&e.orderInfo){const r=u(e.orderInfo.scheduledStartTime||e.start),s=u(e.orderInfo.scheduledEndTime||e.end||r.add(yt,"hour"));return{start:r.toDate(),end:s.toDate()}}if(!Ne(e)&&e.status){const r=u(e.status.startTime||e.start),s=e.status.endTime?u(e.status.endTime):e.end?u(e.end):r.add(pn,"hour");return{start:r.toDate(),end:s.toDate()}}const t=u(e.start||new Date),n=u(e.end||t.add(yt,"hour"));return{start:t.toDate(),end:n.toDate()}}function dt(e,t){return e===d.ORDER_CREATED?t==="尚未上機"?{updateTime:!0,updateGroup:!0,remove:!1}:{updateTime:!1,updateGroup:!1,remove:!0}:{updateTime:!1,updateGroup:!1,remove:!0}}function ia(e){var n,r,s;const t=lt(e);return{...e,className:it(e.timeLineStatus),start:t.start,end:t.end,area:e.area||((r=(n=e.group)==null?void 0:n.match(/[A-Z]/))==null?void 0:r[0])||"",updateTime:!1,editable:dt(e.timeLineStatus,(s=e.orderInfo)==null?void 0:s.orderStatus),status:null}}function ca(e){var n,r;const t=lt(e);return{...e,className:it(e.timeLineStatus),start:t.start,end:t.end,area:e.area||((r=(n=e.group)==null?void 0:n.match(/[A-Z]/))==null?void 0:r[0])||"",updateTime:!1,editable:dt(e.timeLineStatus,null),orderInfo:null}}function la(e,t){const n=u(e.start),r=u(e.end),s=u(t.start),a=u(t.end);return n.isBefore(a)&&r.isAfter(s)||n.isSame(s)||r.isSame(a)}//! =============== 4. 工具函數 ===============
function da(e){return aa(e)?"add":"update"}function ua(e){if(!ra(e))throw new Error(ne.CANNOT_DELETE_ORDER)}function wt(e,t){t.current.remove(e),console.log("本地項目刪除完成:",e)}function pa(e,t){t(e.status.id).unwrap().then(()=>{console.log("機台狀態 API 刪除成功")}).catch(n=>{const r=fe("機台狀態 API 刪除失敗",{originalError:n,context:"刪除機台狀態",operation:"deleteMachineStatus",itemId:e.status.id});ee(r,{context:"機台狀態刪除流程",note:"本地已成功刪除，API失敗不影響用戶體驗"})})}function ha(e,t){if(t.get({filter:function(s){return s.id!==e.id&&s.group===e.group&&s.timeLineStatus!==d.ORDER_CREATED}}).some(s=>la(e,s)))throw new Error(ne.TIME_OVERLAP)}function ma(e,t,n,r){oa(e,t)?(wt(t,n),pa(e,r)):wt(t,n)}//! =============== 5. 主要 Hook 實現 ===============
function fa({itemsDataRef:e,groups:t,timelineRef:n,timeRange:r}){const[s]=Os(),[a]=Js(),[i]=Xs(),[c]=ea();h.useEffect(()=>{t&&cn(t)},[t]);const l=h.useCallback(function(g){var y;try{const O=ia(g.internal);g.api?s(g.api).unwrap().then(w=>{console.log("製令單 API 更新成功:",w),e.current.update(O)}).catch(w=>{console.error("製令單 API 更新失敗:",w);const k=sa(w);alert(k)}):e.current.update(O)}catch(O){const w=fe(O.message||ne.SAVE_ORDER_FAILED,{originalError:O,context:"保存製令單",operation:"saveOrderItem"});ee(w,{context:"製令單保存流程",itemId:(y=g==null?void 0:g.internal)==null?void 0:y.id}),alert(ue(w))}},[e,s]),p=h.useCallback(function(g){try{const y=ca(g.internal);ha(y,e.current);const O=da(y.id),w=O==="update";let k;if(g.api)k=g.api;else if(w){const A=e.current.get(y.id);k=en(y,A)}else k=Xt(y);const q=w?i:a,f=w?"更新":"創建";q(k).unwrap().then(A=>{console.log(`機台狀態 API ${f}成功:`,A),e.current[O](y)}).catch(A=>{const F=fe(`機台狀態 API ${f}失敗`,{originalError:A,context:`${f}機台狀態`,operation:w?"updateMachineStatus":"createMachineStatus",actionName:f});ee(F,{context:"機台狀態保存流程",action:f,isUpdate:w}),alert(ue(F))})}catch(y){const O=fe(y.message||ne.SAVE_STATUS_FAILED,{originalError:y,context:"保存機台狀態",operation:"saveMachineStatus"});ee(O,{context:"機台狀態保存流程",stage:"數據處理階段"}),alert(ue(O))}},[e,a,i]),T=h.useCallback(function(g){try{na(g),Ne(g.internal)?l(g):p(g)}catch(y){console.error("Save item failed:",y),alert(y.message)}},[l,p]),m=h.useCallback(function(g){if(!ta(g)||!e.current){console.warn("無效的刪除參數:",{itemId:g,hasDataRef:!!e.current});return}const y=e.current.get(g);if(!y){console.warn("找不到要刪除的項目:",g);return}try{ua(y),ma(y,g,e,c)}catch(O){console.error("Delete item failed:",O),alert(O.message||ne.DELETE_FAILED)}},[e,c]),b=h.useCallback(function(g){if(!(g!=null&&g.length)){alert("請選擇要刪除的項目");return}ln(g)},[]),I=h.useCallback(function(g,y){var O;try{const w=g?u(g):u(),k=w.add(pn,"hour"),f={id:`ITEM-${Date.now()}`,group:"",area:y||"",timeLineStatus:d.IDLE,status:{startTime:w.toDate(),endTime:k.toDate(),reason:"",product:""},orderInfo:null,start:w.toDate(),end:k.toDate(),className:"status-idle",content:"新狀態",isNew:!0};Et(f,"add",t)}catch(w){const k=fe(w.message||"新增狀態失敗",{originalError:w,context:"新增機台狀態",operation:"handleAddItem",startTime:g,areaCode:y});ee(k,{context:"新增狀態流程",startTime:((O=g==null?void 0:g.toISOString)==null?void 0:O.call(g))||g,areaCode:y}),alert(ue(k))}},[t]),x=h.useCallback(function(g){g&&Et(g,"edit",t)},[t]),S=h.useCallback(function(){if(n!=null&&n.current)try{const g=de(r,u());n.current.setWindow(g.start.toDate(),g.end.toDate(),{animation:!0})}catch(g){console.error("Move to current time failed:",g)}},[n,r]);return h.useEffect(()=>{const v=ns(T),g=as(m);return()=>{v(),g()}},[T,m]),{handleAddItem:I,handleEditItem:x,handleSaveItem:T,openDeleteConfirmation:b,handleMoveToNow:S,getItemTiming:lt,getEditableConfig:dt}}//! =============== 示例區塊 ===============
function ga(){const e=h.useCallback(()=>{const m=u(),b=m.subtract(1,"month").startOf("day").toISOString(),I=m.add(1,"month").endOf("day").toISOString();return{startTime:b,endTime:I}},[]),[t,n]=h.useState(()=>e()),r=h.useCallback(m=>{n(b=>({...b,startTime:m}))},[]),s=h.useCallback(m=>{n(b=>({...b,endTime:m}))},[]),a=h.useCallback(()=>{n(e())},[e]),i=h.useCallback(()=>{const m=u();n({startTime:m.startOf("day").toISOString(),endTime:m.endOf("day").toISOString()})},[]),c=h.useCallback(()=>{const m=u();n({startTime:m.startOf("week").toISOString(),endTime:m.endOf("week").toISOString()})},[]),l=h.useCallback(()=>{const m=u();n({startTime:m.startOf("month").toISOString(),endTime:m.endOf("month").toISOString()})},[]),p=h.useMemo(()=>({startTime:t.startTime,endTime:t.endTime,startTimeFormatted:t.startTime?u(t.startTime).format("YYYY-MM-DD HH:mm:ss"):null,endTimeFormatted:t.endTime?u(t.endTime).format("YYYY-MM-DD HH:mm:ss"):null}),[t]),T=h.useMemo(()=>{if(!t.startTime||!t.endTime)return{isValid:!1,duration:0,durationText:""};const m=u(t.startTime),b=u(t.endTime),I=b.diff(m,"day");let x="";if(I===0)x="當天";else if(I<=7)x=`${I} 天`;else if(I<=30){const S=Math.floor(I/7),v=I%7;x=S>0?`${S}週${v>0?` ${v}天`:""}`:`${I} 天`}else{const S=Math.floor(I/30),v=I%30;x=`${S}個月${v>0?` ${v}天`:""}`}return{isValid:m.isBefore(b),duration:I,durationText:x,startText:m.format("YYYY/MM/DD HH:mm"),endText:b.format("YYYY/MM/DD HH:mm")}},[t]);return{timeRange:t,formattedTimeRange:p,timeRangeInfo:T,handleStartTimeChange:r,handleEndTimeChange:s,setTimeRange:n,resetToDefault:a,setToToday:i,setToThisWeek:c,setToThisMonth:l}}//! =============== 2. 類型與介面 ===============
function xa(){h.useEffect(()=>{u.locale("zh-tw"),Pt.updateLocale("zh-tw",Rs)},[])}function Sa(e="A",t=null,n=null){//! API 查詢 - 核心數據獲取
const{isSuccess:r,isLoading:s,data:a}=js({productionArea:e,startTime:t,endTime:n}),i=h.useMemo(()=>a!=null&&a.data?a.data.filter(c=>c.productionArea===e):[],[a,e]);return{isSuccess:r,isLoading:s,scheduleList:i}}function Ta(e="A"){//! 機台數據獲取 - 系統設備資訊
const{isSuccess:t,isLoading:n,data:r}=an(),s=h.useMemo(()=>{console.log("[useAreaMachines] allArea 數據:",r);const a=(r==null?void 0:r.data)||r||[];console.log("[useAreaMachines] machines 陣列:",a);const i=a.filter(c=>c.productionArea===e);return console.log("[useAreaMachines] 過濾後的機台:",i.length,"台"),i},[r,e]);return{isSuccess:t,isLoading:n,allArea:r,filteredMachines:s}}//! =============== 3. 核心功能 ===============
function ba({containerRef:e}){return o.jsx(Ze,{ref:e,elevation:1,sx:{width:"100%",flexGrow:1,minHeight:"600px",border:1,borderColor:"grey.200",borderRadius:1}})}const hn=et.memo(ba);hn.displayName="TimelinePaper";function Ea({containerRef:e,timelineRef:t,itemsDataRef:n,groups:r,getTimelineOptions:s,handleEditItem:a}){h.useEffect(()=>{if(!e.current||!n.current||!r)return;e.current.innerHTML="";const i=s();//! 創建時間線實例 - 核心功能初始化
t.current=new Hn(e.current,n.current,r,i),t.current.on("doubleClick",c=>{if(!c.item)return;const l=n.current.get(c.item);l&&a(l)}),r&&cn(r);//! 清理函數 - 防止記憶體洩漏
return()=>{t.current&&(t.current.destroy(),t.current=null)}},[e,n,r,s,a])}function Ia(e,t,n){return h.useCallback(()=>{//! 優先策略 - 使用對話框提供的函數
if(n){n();return}if(e.current)try{const r=de(t,u());e.current.setWindow(r.start.toDate(),r.end.toDate(),{animation:!0})}catch(r){console.error("移動到當前時間失敗:",r)}},[t,n,e])}//! =============== 4. 工具函數 ===============
function At(e){return e?u(e).format("YYYY-MM-DDTHH:mm"):""}function jt(e,t){const n=u(e).toISOString();t(n)}function va(){return Object.entries(ks).map(([e,t])=>({value:e,label:t.label}))}function Da(){return at.AREAS.map(e=>({value:e,label:`${e}區`}))}function ya(e,t){return h.useCallback(n=>{const r=u();switch(n){case"today":e(r.startOf("day").toISOString()),t(r.endOf("day").toISOString());break;case"week":e(r.startOf("week").toISOString()),t(r.endOf("week").toISOString());break;case"month":e(r.startOf("month").toISOString()),t(r.endOf("month").toISOString());break;case"default":const s=r.subtract(1,"month").startOf("day").toISOString(),a=r.add(1,"month").endOf("day").toISOString();e(s),t(a);break}},[e,t])}function Pa(){//! 設置頁面標題
Wn("智慧排程系統");//! 語言初始化 - 確保中文顯示正確
xa();//! 核心狀態管理 - 組件主要狀態
const e=h.useRef(null),t=h.useRef(null),[n,r]=h.useState("day"),[s,a]=h.useState("A"),[i,c]=h.useState(!1);//! 視圖中心保持狀態 - 時間範圍切換優化
const l=h.useRef(null),p=h.useRef(!1),{timeRange:T,formattedTimeRange:m,handleStartTimeChange:b,handleEndTimeChange:I}=ga();//! 數據獲取 - API 數據層
const{scheduleList:x}=Sa(s,m.startTime,m.endTime),{filteredMachines:S}=Ta(s),{itemsDataRef:v,groups:g}=Bs(S,x),{getTimelineOptions:y}=Ks(v,n),{handleAddItem:O,handleEditItem:w,handleMoveToNow:k}=fa({itemsDataRef:v,groups:g,timelineRef:t,timeRange:n}),q=Ia(t,n,k),f=ya(b,I),A=h.useCallback(j=>{try{if(t.current){const P=t.current.getWindow();if(P&&P.start&&P.end){const le=new Date((P.start.getTime()+P.end.getTime())/2);l.current=le,p.current=!0}}r(j)}catch(P){console.warn("時間範圍切換失敗:",P),r(j)}},[]);Ea({containerRef:e,timelineRef:t,itemsDataRef:v,groups:g,getTimelineOptions:y,handleEditItem:w}),h.useEffect(()=>{if(!t.current||!p.current)return;const j=()=>{if(p.current&&l.current)try{t.current.moveTo(l.current,{animation:{duration:300,easingFunction:"easeInOutQuad"}}),p.current=!1,l.current=null}catch(P){console.warn("恢復視圖中心失敗:",P),p.current=!1,l.current=null}};return t.current.on("changed",j),()=>{t.current&&t.current.off("changed",j)}},[n]),h.useEffect(()=>()=>{l.current=null,p.current=!1},[]);const F=va(),Y=Da();//! 主要渲染邏輯 - 組件 UI 結構
return o.jsxs(o.Fragment,{children:[o.jsx(us,{}),o.jsxs(M,{sx:{width:"100%",p:4},children:[o.jsxs(ps,{children:[o.jsxs(C,{children:[o.jsxs(C.Row,{children:[o.jsx(C.ButtonGroup,{children:F.map(j=>o.jsx(C.TimeRangeButton,{value:j.value,currentValue:n,onChange:A,children:j.label},j.value))}),o.jsxs(C.ButtonGroup,{children:[o.jsx(C.AreaSelect,{value:s,onChange:a,options:Y,placeholder:"選擇區域"}),o.jsx(C.NowButton,{onClick:q})]})]}),o.jsx(C.Panel,{title:"時間範圍設定",expanded:i,onToggle:c,info:m.startTime&&m.endTime?`${u(m.startTime).format("MM/DD")} - ${u(m.endTime).format("MM/DD")}`:"預設範圍",children:o.jsxs(C.Row,{children:[o.jsxs(C.ButtonGroup,{children:[o.jsx(C.TimeInput,{label:"開始",value:At(T.startTime),onChange:j=>jt(j,b)}),o.jsx(C.TimeInput,{label:"結束",value:At(T.endTime),onChange:j=>jt(j,I)})]}),o.jsxs(C.ButtonGroup,{children:[o.jsx(C.Button,{onClick:()=>f("today"),children:"今天"}),o.jsx(C.Button,{onClick:()=>f("week"),children:"本週"}),o.jsx(C.Button,{onClick:()=>f("month"),children:"本月"}),o.jsx(C.Button,{onClick:()=>f("default"),children:"預設範圍"})]})]})})]}),o.jsx(hn,{containerRef:e})]}),o.jsx(ds,{})]})]})}//! =============== 示例區塊 ===============
export{Pa as default};
