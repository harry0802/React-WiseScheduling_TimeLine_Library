import{j as e,k as f,l as y,B as d,T as p}from"./vendor-mui-BwwhWuia.js";import{r as m,a as v,L as b}from"./vendor-react-CEU0ziL0.js";import{F as w}from"./vendor-query-yrDjzXSM.js";import{m as j}from"./muiTheme-SdPnoL3M.js";import{G as k,a as z}from"./StyledComponents-DtNAaz3Z.js";import{c as n,u,a as $,L as H}from"./index-C_1yu6ni.js";import{d as o}from"./vendor-styled-D2EzWVfU.js";import{I as C}from"./iconify-Bqg7a4kj.js";import"./vendor-antd-CUY9U6fe.js";import"./vendor-date-C7fpNwus.js";const I=()=>e.jsx("svg",{width:"0",height:"0",style:{position:"absolute"},children:e.jsx("defs",{children:e.jsx("clipPath",{id:"hexagon-clip",clipPathUnits:"objectBoundingBox",children:e.jsx("polygon",{points:".25 0, .75 0, 1 .5, .75 1, .25 1, 0 .5"})})})}),h={tablet:768,desktop:1200};function x(t){return t>=h.desktop?6:t>=h.tablet?4:2}function T(t,r){const c=[];for(let i=0;i<t.length;i+=r)c.push(t.slice(i,i+r));return c}const B=o.section`
  /* 響應式尺寸定義 */
  --hexa-columns: 2;
  --hexa-size: 160px;

  @media only screen and (min-width: 768px) {
    --hexa-columns: 4;
    --hexa-size: 180px;
  }

  @media only screen and (min-width: 1200px) {
    --hexa-columns: 6;
    --hexa-size: 200px;
  }

  /* 衍生計算變數 */
  --hexa-height: calc(var(--hexa-size) * 0.8660254);
  --hexa-overlap-x: calc(var(--hexa-size) * 0.25);
  --hexa-col-width: calc(var(--hexa-size) * 0.75);
  --hexa-overlap-y: calc(var(--hexa-height) * 0.5);

  /* ✨ [核心修改] 
   * 將負邊界從 -50% (-0.5) 減少為 -0% (-0)
   * 這會讓第二排 "更下方"
   */
  --hexa-margin-y: 0;

  width: calc(
    var(--hexa-col-width) * var(--hexa-columns) + var(--hexa-overlap-x)
  );
  max-width: 100%;
  margin: 0 auto;
  padding-top: var(--hexa-overlap-y);
  padding-bottom: var(--hexa-overlap-y);
`,E=o.div`
  display: flex;
  justify-content: flex-start; /* 保持左對齊 */

  /* 建立堆疊上下文並反轉 z-index */
  position: relative;
  z-index: ${t=>10-t.$rowIndex};

  /* 垂直貼合 (現在使用 -25% 的值) */
  &:not(:first-child) {
    margin-top: var(--hexa-margin-y);
  }

  /* "永遠" 只下推偶數卡片 (nth-child(2n)) */
  & > *:nth-child(2n) {
    transform: translateY(var(--hexa-overlap-y));
  }

  & > *:nth-child(2n):hover {
    transform: translateY(var(--hexa-overlap-y)) scale(1.05);
    z-index: 99;
  }

  /* 所有 "未被下推" (奇數) 的卡片 hover 效果 */
  & > *:nth-child(2n + 1):hover {
    transform: scale(1.05);
    z-index: 99;
  }
`,L=({children:t})=>{const[r,c]=m.useState(x(window.innerWidth));m.useEffect(()=>{function a(){c(x(window.innerWidth))}return window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[]);const i=m.useMemo(()=>{const a=v.Children.toArray(t);return T(a,r)},[t,r]);return e.jsxs(e.Fragment,{children:[e.jsx(I,{}),e.jsx(B,{children:i.map((a,s)=>e.jsx(E,{$rowIndex:s,children:a},s))})]})};//! =============== 外層六角形 (白色邊框層) ===============
const S=o(b)`
  /* 強制 padding 被包含在 height 內 */
  box-sizing: border-box;

  /* 繼承 Grid 定義的 CSS 變數 */
  width: var(--hexa-size);
  height: var(--hexa-height);

  /* ✨ [核心] 水平貼合：所有卡片向左重疊 25% */
  margin-left: calc(var(--hexa-size) * -0.25);

  /* ✨ [核心] 校正每行第一個：(因為這是 row 裡的第一個) */
  &:first-child {
    margin-left: 0;
  }

  /* ✨ [核心移除] transform 邏輯已由 HexagonRow 父層接管 */

  /* 基礎樣式 */
  position: relative;
  cursor: pointer;
  text-decoration: none;
  display: block;

  /* 六角形裁切 */
  clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);

  /* 白色邊框背景 */
  background: linear-gradient(
    135deg,
    ${n.accent.primary}dd,
    ${n.accent.primary}aa
  );
  padding: 3px;

  /* 基礎陰影 */
  box-shadow: 0 4px 8px ${n.accent.primary}15,
    0 2px 4px ${n.accent.primary}10;

  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  /* Hover 效果 (只保留陰影和內部動畫，transform 由父層控制) */
  &:hover {
    box-shadow: 0 12px 40px ${n.accent.primary}30,
      0 8px 16px ${n.accent.primary}20, 0 4px 8px ${n.accent.primary}15;

    .card-front {
      opacity: 0;
      transform: scale(0.95);
    }

    .card-back {
      opacity: 1;
      transform: scale(1);
    }
  }
`;//! =============== 內層六角形 (深色內容層) ===============
const R=o.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  /* 六角形裁切 (內縮) */
  clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);

  /* 深色背景 + 漸層 */
  background: ${n.background.secondary};
`;//! =============== 卡片正面 (預設狀態：圖標 + 標題) ===============
const A=o.div`
  position: absolute;
  inset: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;

  opacity: 1;
  transform: scale(1);
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;//! =============== 卡片背面 (Hover 狀態：完整描述 + 按鈕) ===============
const P=o.div`
  position: absolute;
  inset: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1;

  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
`;//! =============== 共用樣式：圖標 ===============
const W=o.div`
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 4px 8px ${n.accent.primary}50);
  display: flex;
  align-items: center;
  justify-content: center;

  /* Iconify icon 大小與配色 */
  svg {
    width: clamp(2.5rem, 5vw, 3.5rem);
    height: clamp(2.5rem, 5vw, 3.5rem);
    color: ${n.accent.primary};
  }
`;//! =============== 共用樣式：標題 ===============
const g=o.h3`
  color: ${n.accent.primary};
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 700;
  margin: 0.5rem 0;
  letter-spacing: 0.03em;
  line-height: 1.3;
  text-shadow: 0 2px 4px ${n.accent.primary}30;
`;//! =============== 詳細描述 (僅背面顯示) ===============
const G=o.p`
  color: ${n.text.inverse};
  font-size: clamp(0.75rem, 1.5vw, 0.85rem);
  line-height: 1.6;
  margin: 0.75rem 0 1rem;
  opacity: 0.95;
  max-width: 90%;
  font-weight: 400;
`;//! =============== 按鈕 (僅背面顯示) ===============
o.div`
  background: linear-gradient(
    135deg,
    ${n.accent.primary},
    ${n.accent.primary}cc
  );
  color: ${n.background.primary};
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  font-size: clamp(0.75rem, 1.5vw, 0.85rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 12px ${n.accent.primary}40;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${n.accent.primary}60;
  }
`;//! =============== 裝飾背景 ===============
const D=o.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, ${n.accent.primary}10, transparent);
  clip-path: inherit;
  z-index: 0;
  pointer-events: none;
`,F=({icon:t,title:r,description:c,link:i,buttonText:a="查看更多"})=>e.jsx(S,{to:i,children:e.jsxs(R,{className:"inner-hexagon",children:[e.jsx(D,{}),e.jsxs(A,{className:"card-front",children:[e.jsx(W,{className:"hexagon-icon",children:e.jsx(C,{icon:t})}),e.jsx(g,{children:r})]}),e.jsxs(P,{className:"card-back",children:[e.jsx(g,{style:{fontSize:"0.95rem"},children:r}),e.jsx(G,{children:c})]})]})}),K=[{icon:"streamline-stickies-color:baby",link:"/about"},{icon:"streamline-ultimate-color:module-four",link:"/timeline"},{icon:"streamline-emojis:factory",link:"/project-showcase"},{icon:"skill-icons:figma-light",link:"/design-token"},{icon:"streamline-ultimate-color:calendar-1",link:"/wise-scheduling"},{icon:"streamline-ultimate-color:monitor-graph-line",link:"/ManufacturingLiveMonitor"},{icon:"fluent-emoji-flat:pig",link:"/pig-house-inventory"},{icon:"flat-color-icons:business-contact",link:"/contact"}];//! =============== 2. 類型與介面定義 ===============
//! =============== 1. 設定與常量 ===============
const M=async()=>({name:"時間軸專案",version:"1.0.0",features:["時間軸視覺化","數據滑動器","查詢功能"]});//! =============== 3. 核心功能實作 ===============
function N(){const{t}=u("home"),{data:r,isLoading:c}=w({queryKey:["appInfo"],queryFn:M}),i=K.map((a,s)=>{const l=["about","timeline","moldIndustry","designToken","scheduling","monitoring","pigManagement","contact"][s];return{icon:a.icon,title:t(`cards.${l}.title`),description:t(`cards.${l}.description`),link:a.link,buttonText:t(`cards.${l}.button`)}});return{appInfo:r,isLoading:c,featureCards:i}}function ne(){const{t}=u("home"),{isLoading:r,featureCards:c}=N();return $(t("meta.title")),r?e.jsx(H,{}):e.jsx(f,{theme:j,children:e.jsx(y,{maxWidth:"none",sx:{pt:8,pb:20,backgroundColor:n.background.primary,minHeight:"100vh"},children:e.jsxs(d,{children:[e.jsx(k,{sx:{mb:6,position:"relative",clipPath:"polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)","&::before":{content:'""',position:"absolute",top:-2,left:-2,right:-2,bottom:-2,background:`linear-gradient(135deg, ${n.accent.primary}40, transparent)`,clipPath:"polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)",zIndex:-1}},children:e.jsxs(d,{sx:{textAlign:"center",py:2},children:[e.jsx(p,{variant:"h2",component:"h1",gutterBottom:!0,sx:{fontWeight:700,color:n.accent.primary,mb:3,letterSpacing:"0.02em",textShadow:`0 2px 8px ${n.accent.primary}30`},children:t("hero.title")}),e.jsx(z,{sx:{width:"100px",height:"3px",mx:"auto"}}),e.jsx(p,{variant:"h6",sx:{color:n.text.inverse,lineHeight:2,maxWidth:700,mx:"auto",mt:3,fontWeight:400,opacity:.95},children:t("hero.subtitle")})]})}),e.jsx(L,{children:c.map((i,a)=>e.jsx(F,{icon:i.icon,title:i.title,description:i.description,link:i.link},a))})]})})})}export{ne as default};
