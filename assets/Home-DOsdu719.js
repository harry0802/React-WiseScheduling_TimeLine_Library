import{j as e,T as g,h as u,B as p,i as d}from"./vendor-mui-Cc1TuOMr.js";import{r as s,a as f,L as y}from"./vendor-react-CQ9jITQR.js";import{F as b}from"./vendor-query-DLAcIdav.js";import{m as v}from"./muiTheme-C2AwhCSp.js";import{G as w,a as j}from"./StyledComponents-BTKPc553.js";import{c as t,u as k,L as z}from"./index-D6LdA2ZN.js";import{d as a}from"./vendor-styled-F-HTyTPr.js";import{I as $}from"./iconify-CCN44Ko-.js";import"./vendor-date-CdyaOyHe.js";import"./vendor-antd-Ct-O66bz.js";const T=()=>e.jsx("svg",{width:"0",height:"0",style:{position:"absolute"},children:e.jsx("defs",{children:e.jsx("clipPath",{id:"hexagon-clip",clipPathUnits:"objectBoundingBox",children:e.jsx("polygon",{points:".25 0, .75 0, 1 .5, .75 1, .25 1, 0 .5"})})})}),m={tablet:768,desktop:1200};function x(n){return n>=m.desktop?6:n>=m.tablet?4:2}function H(n,i){const r=[];for(let o=0;o<n.length;o+=i)r.push(n.slice(o,o+i));return r}const C=a.section`
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
`,I=a.div`
  display: flex;
  justify-content: flex-start; /* 保持左對齊 */

  /* 建立堆疊上下文並反轉 z-index */
  position: relative;
  z-index: ${n=>10-n.$rowIndex};

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
`,E=({children:n})=>{const[i,r]=s.useState(x(window.innerWidth));s.useEffect(()=>{function c(){r(x(window.innerWidth))}return window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]);const o=s.useMemo(()=>{const c=f.Children.toArray(n);return H(c,i)},[n,i]);return e.jsxs(e.Fragment,{children:[e.jsx(T,{}),e.jsx(C,{children:o.map((c,l)=>e.jsx(I,{$rowIndex:l,children:c},l))})]})};//! =============== 外層六角形 (白色邊框層) ===============
const B=a(y)`
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
    ${t.accent.primary}dd,
    ${t.accent.primary}aa
  );
  padding: 3px;

  /* 基礎陰影 */
  box-shadow: 0 4px 8px ${t.accent.primary}15,
    0 2px 4px ${t.accent.primary}10;

  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  /* Hover 效果 (只保留陰影和內部動畫，transform 由父層控制) */
  &:hover {
    box-shadow: 0 12px 40px ${t.accent.primary}30,
      0 8px 16px ${t.accent.primary}20, 0 4px 8px ${t.accent.primary}15;

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
const L=a.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  /* 六角形裁切 (內縮) */
  clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);

  /* 深色背景 + 漸層 */
  background: ${t.background.secondary};
`;//! =============== 卡片正面 (預設狀態：圖標 + 標題) ===============
const R=a.div`
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
const S=a.div`
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
const P=a.div`
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 4px 8px ${t.accent.primary}50);
  display: flex;
  align-items: center;
  justify-content: center;

  /* Iconify icon 大小與配色 */
  svg {
    width: clamp(2.5rem, 5vw, 3.5rem);
    height: clamp(2.5rem, 5vw, 3.5rem);
    color: ${t.accent.primary};
  }
`;//! =============== 共用樣式：標題 ===============
const h=a.h3`
  color: ${t.accent.primary};
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 700;
  margin: 0.5rem 0;
  letter-spacing: 0.03em;
  line-height: 1.3;
  text-shadow: 0 2px 4px ${t.accent.primary}30;
`;//! =============== 詳細描述 (僅背面顯示) ===============
const A=a.p`
  color: ${t.text.inverse};
  font-size: clamp(0.75rem, 1.5vw, 0.85rem);
  line-height: 1.6;
  margin: 0.75rem 0 1rem;
  opacity: 0.95;
  max-width: 90%;
  font-weight: 400;
`;//! =============== 按鈕 (僅背面顯示) ===============
a.div`
  background: linear-gradient(
    135deg,
    ${t.accent.primary},
    ${t.accent.primary}cc
  );
  color: ${t.background.primary};
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  font-size: clamp(0.75rem, 1.5vw, 0.85rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 12px ${t.accent.primary}40;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${t.accent.primary}60;
  }
`;//! =============== 裝飾背景 ===============
const D=a.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, ${t.accent.primary}10, transparent);
  clip-path: inherit;
  z-index: 0;
  pointer-events: none;
`,W=({icon:n,title:i,description:r,link:o,buttonText:c="查看更多"})=>e.jsx(B,{to:o,children:e.jsxs(L,{className:"inner-hexagon",children:[e.jsx(D,{}),e.jsxs(R,{className:"card-front",children:[e.jsx(P,{className:"hexagon-icon",children:e.jsx($,{icon:n})}),e.jsx(h,{children:i})]}),e.jsxs(S,{className:"card-back",children:[e.jsx(h,{style:{fontSize:"0.95rem"},children:i}),e.jsx(A,{children:r})]})]})}),G=[{icon:"streamline-stickies-color:baby",title:"關於我",description:"前端工程師,專注於 React 生態系統與工業級系統開發",link:"/about",buttonText:"查看履歷"},{icon:"streamline-ultimate-color:module-four",title:"開發歷程",description:"專案開發時程與技術演進歷程",link:"/timeline",buttonText:"查看開發歷程"},{icon:"streamline-emojis:factory",title:"模具產業系統",description:"科專_TIIP模具產業高階製造系統展示",link:"/project-showcase",buttonText:"查看專案詳情"},{icon:"skill-icons:figma-light",title:"Design Token 推動",description:"設計系統規範化,推動設計與開發協作效率提升",link:"/design-token",buttonText:"查看 Design Token"},{icon:"streamline-ultimate-color:calendar-1",title:"智慧排程系統",description:"工業級生產排程管理,支援多區域即時調度與狀態追蹤",link:"/wise-scheduling",buttonText:"進入智慧排程"},{icon:"streamline-ultimate-color:monitor-graph-line",title:"製造監控中心",description:"多功能生產監控儀表板,包含 OEE 分析、進度追蹤等",link:"/ManufacturingLiveMonitor",buttonText:"進入監控中心"},{icon:"fluent-emoji-flat:pig",title:"養豬場管理系統",description:"豬隻飼養管理系統,追蹤豬舍庫存與飼養記錄",link:"/pig-house-inventory",buttonText:"進入管理系統"},{icon:"flat-color-icons:business-contact",title:"聯絡方式",description:"歡迎聯繫討論專案合作或技術交流",link:"/contact",buttonText:"聯絡我"}];//! =============== 2. 類型與介面定義 ===============
//! =============== 1. 設定與常量 ===============
const F=async()=>({name:"時間軸專案",version:"1.0.0",features:["時間軸視覺化","數據滑動器","查詢功能"]});//! =============== 3. 核心功能實作 ===============
function N(){const{data:n,isLoading:i}=b({queryKey:["appInfo"],queryFn:F});return{appInfo:n,isLoading:i,featureCards:G}}function X(){const{isLoading:n,featureCards:i}=N();return k("首頁"),n?e.jsx(z,{}):e.jsx(g,{theme:v,children:e.jsx(u,{maxWidth:"none",sx:{pt:8,pb:20,backgroundColor:t.background.primary,minHeight:"100vh"},children:e.jsxs(p,{children:[e.jsx(w,{sx:{mb:6,position:"relative",clipPath:"polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)","&::before":{content:'""',position:"absolute",top:-2,left:-2,right:-2,bottom:-2,background:`linear-gradient(135deg, ${t.accent.primary}40, transparent)`,clipPath:"polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)",zIndex:-1}},children:e.jsxs(p,{sx:{textAlign:"center",py:2},children:[e.jsx(d,{variant:"h2",component:"h1",gutterBottom:!0,sx:{fontWeight:700,color:t.accent.primary,mb:3,letterSpacing:"0.02em",textShadow:`0 2px 8px ${t.accent.primary}30`},children:"智慧製造前端工程整合方案"}),e.jsx(j,{sx:{width:"100px",height:"3px",mx:"auto"}}),e.jsx(d,{variant:"h6",sx:{color:t.text.inverse,lineHeight:2,maxWidth:700,mx:"auto",mt:3,fontWeight:400,opacity:.95},children:"歡迎來到我的個人作品集！這裡展示了我在智慧製造領域的專案經驗， 包含生產排程系統、即時監控儀表板等工業級應用開發。"})]})}),e.jsx(E,{children:i.map((r,o)=>e.jsx(W,{icon:r.icon,title:r.title,description:r.description,link:r.link},o))})]})})})}export{X as default};
