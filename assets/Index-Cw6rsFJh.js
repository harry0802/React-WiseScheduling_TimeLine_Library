import{j as e}from"./vendor-mui-Cc1TuOMr.js";import{r as g}from"./vendor-react-CQ9jITQR.js";import{d as o,l as N}from"./vendor-styled-F-HTyTPr.js";import{u as k}from"./index-D6LdA2ZN.js";import"./vendor-query-DLAcIdav.js";import"./vendor-date-CdyaOyHe.js";import"./vendor-antd-Ct-O66bz.js";const D=o.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0px;
  padding: 1.25rem;
  ${t=>t.$backgroundImage&&`
    background-image: url(${t.$backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `}
`;function x({backgroundImage:t,children:a}){return e.jsx(D,{$backgroundImage:t,children:a})}//! =============== 1. 設定與常量 ===============
const i={success:{bgColor:"rgba(19, 70, 58, 0.85)",statusDot:"#4ade80",statusText:"正常運行",textShadow:"1px 1px 2px rgba(0, 0, 0, 0.5)",lightColor:"#6ee7b7",darkColor:"#a7f3d0"},testing:{bgColor:"rgba(22, 78, 99, 0.85)",statusDot:"#38bdf8",statusText:"試模中",textShadow:"1px 1px 2px rgba(0, 0, 0, 0.5)",lightColor:"#7dd3fc",darkColor:"#bae6fd"},adjusting:{bgColor:"rgba(99, 84, 0, 0.85)",statusDot:"#eab308",statusText:"調機中",textShadow:"1px 1px 2px rgba(0, 0, 0, 0.5)",lightColor:"#facc15",darkColor:"#fef08a"},warning:{bgColor:"rgba(78, 53, 22, 0.85)",statusDot:"#f97316",statusText:"需注意",textShadow:"1px 1px 2px rgba(0, 0, 0, 0.5)",lightColor:"#fdba74",darkColor:"#fed7aa"},danger:{bgColor:"rgba(120, 37, 46, 0.85)",statusDot:"#f87171",statusText:"異常狀態",textShadow:"1px 1px 2px rgba(0, 0, 0, 0.5)",lightColor:"#fca5a5",darkColor:"#fee2e2"},inactive:{bgColor:"rgba(55, 65, 81, 0.75)",statusDot:"#9ca3af",statusText:"未啟用",textShadow:"1px 1px 2px rgba(0, 0, 0, 0.5)",lightColor:"#d1d5db",darkColor:"#e5e7eb"}},m={main:"0 10px 20px rgba(0, 0, 0, 0.4), 0 6px 6px rgba(0, 0, 0, 0.3)",hover:"0 15px 25px rgba(0, 0, 0, 0.4), 0 10px 10px rgba(0, 0, 0, 0.2)",inner:"inset 0 4px 8px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(0, 0, 0, 0.2)",text:"1px 1px 2px rgba(0, 0, 0, 0.6)"};//! =============== 3. Context 定義 ===============
const h=g.createContext();//! =============== 4. Styled Components ===============
const I=o.div`
  border-radius: 20px;
  background: ${t=>{var a;return((a=i[t.$status])==null?void 0:a.bgColor)||i.inactive.bgColor}};
  box-shadow: ${m.main};
  transition: all 0.3s ease;
  padding: 1.5rem;
  width: 100%;
  max-width: 300px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.15);

  &:hover {
    box-shadow: ${m.hover};
    transform: translateY(-5px);
  }
`,O=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`,L=o.div`
  display: flex;
  flex-direction: column;
`,H=o.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-shadow: ${t=>{var a;return((a=i[t.$status])==null?void 0:a.textShadow)||i.inactive.textShadow}};
  letter-spacing: -0.02em;
`,B=o.div`
  display: flex;
  align-items: center;
  margin-top: 0.75rem;
`,U=o.span`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${t=>{var a;return((a=i[t.$status])==null?void 0:a.statusDot)||i.inactive.statusDot}};
  margin-right: 0.5rem;
  box-shadow: 0 0 5px
    ${t=>{var a;return((a=i[t.$status])==null?void 0:a.statusDot)||i.inactive.statusDot}};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: inherit;
    opacity: 0.4;
    filter: blur(4px);
    z-index: -1;
  }
`,E=o.span`
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: ${t=>{var a;return((a=i[t.$status])==null?void 0:a.textShadow)||i.inactive.textShadow}};
  letter-spacing: 0.02em;
`,G=o.div`
  font-size: 1rem;
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  letter-spacing: 0.05em;
`,W=o.div`
  border-radius: 10px;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(2px);
  box-shadow: ${m.inner};
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.1);
`,f=o.div`
  width: 50%;
  text-align: center;
  padding: ${t=>t.$isLeft?"0 0.75rem 0 0":"0 0 0 0.75rem"};
  ${t=>!t.$isLeft&&N`
      border-left: 1px solid rgba(255, 255, 255, 0.2);
    `}
`,$=o.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
`,C=o.div`
  display: flex;
  align-items: center;
  justify-content: center;
`,S=o.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${t=>{var a,r;return t.$isActive?t.$type==="goodRate"?(a=i[t.$status])==null?void 0:a.lightColor:(r=i[t.$status])==null?void 0:r.darkColor:i.inactive.lightColor}};
  text-shadow: ${m.text};
  position: relative;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: ${t=>{var r,s;if(!t.$isActive)return"transparent";const a=t.$type==="goodRate"?(r=i[t.$status])==null?void 0:r.lightColor:(s=i[t.$status])==null?void 0:s.darkColor;return a?`${a}22`:"transparent"}};
    filter: blur(8px);
    opacity: 0.6;
    z-index: -1;
    border-radius: 8px;
  }
`,v=o.span`
  margin-left: 0.25rem;
  font-size: 1rem;
  color: ${t=>{var a,r;return t.$isActive?t.$type==="goodRate"?(a=i[t.$status])==null?void 0:a.lightColor:(r=i[t.$status])==null?void 0:r.darkColor:i.inactive.lightColor}};
  text-shadow: ${m.text};
  opacity: 0.8;
  font-weight: 500;
  align-self: flex-start;
  margin-top: 0.5rem;
`;//! =============== 5. Compound Component 實現 ===============
function d({status:t="inactive",children:a}){const r=Object.keys(i).includes(t)?t:"inactive",s={status:r,isActive:r!=="inactive"};return e.jsx(h.Provider,{value:s,children:e.jsx(I,{$status:r,children:a})})}function M({id:t,model:a,statusText:r}){var p;const{status:s}=g.useContext(h);return e.jsxs(O,{children:[e.jsxs(L,{children:[e.jsx(H,{$status:s,children:t}),e.jsxs(B,{children:[e.jsx(U,{$status:s}),e.jsx(E,{$status:s,children:r||((p=i[s])==null?void 0:p.statusText)||i.inactive.statusText})]})]}),e.jsx(G,{$status:s,children:a!=="--"?a:"無數據"})]})}function P({goodRate:t=0,completionRate:a=0}){const{status:r,isActive:s}=g.useContext(h);return e.jsxs(W,{$status:r,children:[e.jsxs(f,{$isLeft:!0,children:[e.jsx($,{children:"良率"}),e.jsxs(C,{children:[e.jsx(S,{$isActive:s,$status:r,$type:"goodRate",children:t}),e.jsx(v,{$isActive:s,$status:r,$type:"goodRate",children:"%"})]})]}),e.jsxs(f,{$isLeft:!1,children:[e.jsx($,{children:"完成率"}),e.jsxs(C,{children:[e.jsx(S,{$isActive:s,$status:r,$type:"completionRate",children:a}),e.jsx(v,{$isActive:s,$status:r,$type:"completionRate",children:"%"})]})]})]})}//! =============== 6. 組合元件 ===============
d.Header=M;d.Stats=P;//! =============== 1. 設定與常量 ===============
const z=[{id:"A1",model:"BT-244297",goodRate:66,completionRate:30,status:"success",gridArea:"a1"},{id:"A2",model:"--",goodRate:0,completionRate:0,status:"inactive",gridArea:"a2"},{id:"A3",model:"--",goodRate:0,completionRate:0,status:"inactive",gridArea:"a3"},{id:"A4",model:"WQ-87439",goodRate:20,completionRate:30,status:"warning",gridArea:"a4"},{id:"A5",model:"--",goodRate:0,completionRate:0,status:"inactive",gridArea:"a5"},{id:"A6",model:"--",goodRate:0,completionRate:0,status:"inactive",gridArea:"a6"},{id:"A7",model:"BT-244297",goodRate:66,completionRate:30,status:"danger",gridArea:"a7"},{id:"A8",model:"BT-244297",goodRate:66,completionRate:30,status:"danger",gridArea:"a8"},{id:"A9",model:"BT-244297",goodRate:66,completionRate:30,status:"success",gridArea:"a9"},{id:"A10",model:"--",goodRate:0,completionRate:0,status:"inactive",gridArea:"a10"}];//! =============== 2. 樣式定義 ===============
const Z=o.div`
  /* 布局定位 */
  position: fixed;
  inset: 0;
  display: grid;
  width: 100%;
  height: 100;

  /* 網格定義 - 2排布局，對應照片中的位置 */
  grid-template-areas:
    'a7 a8 a9 a10 . .'
    'empty empty empty empty empty empty'
    'a6 a5 a4 a3 a2 a1';
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 2, 300, 1fr;
  align-items: center;
  /* 盒模型 */
  gap: 1.25rem;
  padding: 1rem;

  /* 響應式處理 */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
      'a7 a8 a9'
      'a10 a6 empty'
      'a5 a4 a3'
      'empty a2 a1';
  }
`,_=o.div`
  grid-area: ${t=>t.gridArea};
  display: ${t=>t.hidden?"none":"block"};
`;function F(){return e.jsx(x,{backgroundImage:"/React-WiseScheduling_TimeLine_Library/images/ProductionZoneA.jpg",children:e.jsx(Z,{children:z.map(t=>e.jsx(_,{gridArea:t.gridArea,children:e.jsxs(d,{status:t.status,children:[e.jsx(d.Header,{id:t.id,model:t.model}),e.jsx(d.Stats,{goodRate:t.goodRate,completionRate:t.completionRate})]})},t.id))})})}//! =============== 1. 設定與常量 ===============
const n={NORMAL:"success",TESTING:"testing",ADJUSTING:"adjusting",WARNING:"warning",SHUTDOWN:"inactive",ERROR:"danger"},J=[{id:"B5",model:"BT-244297",goodRate:66,completionRate:30,status:n.NORMAL,gridArea:"b5"},{id:"B4",model:"HQ-917382",goodRate:26,completionRate:63,status:n.ADJUSTING,gridArea:"b4"},{id:"B3",model:"RP-791824",goodRate:11,completionRate:13,status:n.NORMAL,gridArea:"b3"},{id:"B2",model:"JH-498735",goodRate:89,completionRate:91,status:n.NORMAL,gridArea:"b2"},{id:"B1",model:"PJ-719382",goodRate:57,completionRate:17,status:n.NORMAL,gridArea:"b1"},{id:"B11",model:"BT-244297",goodRate:36,completionRate:20,status:n.TESTING,gridArea:"b11"},{id:"B10",model:"--",goodRate:0,completionRate:0,status:n.SHUTDOWN,gridArea:"b10"},{id:"B9",model:"ER-558214",goodRate:34,completionRate:17,status:n.TESTING,gridArea:"b9"},{id:"B8",model:"BAE-9728318",goodRate:36,completionRate:77,status:n.TESTING,gridArea:"b8"},{id:"B7",model:"RT-778876",goodRate:7,completionRate:0,status:n.SHUTDOWN,gridArea:"b7"},{id:"B6",model:"EI-556463",goodRate:41,completionRate:22,status:n.NORMAL,gridArea:"b6"}];//! =============== 2. 樣式定義 ===============
const V=o.div`
  /* 布局定位 */
  position: fixed;
  inset: 0;
  display: grid;
  width: 100%;
  height: 100;

  /* 網格定義 - 2排布局，對應照片中的位置 */
  grid-template-areas:
    'b6 b5 b4 b3 b2 b1 '
    'spacer1 spacer2 spacer3 spacer4 spacer5 spacer6'
    ' empty1 b7 b8 b9 b10 b11';
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 1fr auto;
  align-items: center;
  /* 盒模型 */
  gap: 1.25rem;
  padding: 1rem;

  /* 響應式處理 */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      'b1 b2 b3'
      'b4 b5 empty'
      'b6 b7 b8'
      'b9 b10 b11';
    gap: 1rem;
  }
`,Q=o.div`
  grid-area: ${t=>t.gridArea};
  display: ${t=>t.hidden?"none":"block"};
`;function Y(){return e.jsx(x,{backgroundImage:"/React-WiseScheduling_TimeLine_Library/images/ProductionZoneB.jpg",children:e.jsx(V,{children:J.map(t=>e.jsx(Q,{gridArea:t.gridArea,children:e.jsxs(d,{status:t.status,children:[e.jsx(d.Header,{id:t.id,model:t.model}),e.jsx(d.Stats,{goodRate:t.goodRate,completionRate:t.completionRate})]})},t.id))})})}//! =============== 1. 設定與常量 ===============
const c={NORMAL:"success",TESTING:"testing",ADJUSTING:"adjusting",WARNING:"warning",SHUTDOWN:"inactive",ERROR:"danger"},K=[{id:"C1",model:"RT-778876",goodRate:44,completionRate:53,status:c.TESTING,gridArea:"c1"},{id:"C2",model:"HQ-917382",goodRate:26,completionRate:83,status:c.WARNING,gridArea:"c2"},{id:"C3",model:"OI-782492",goodRate:28,completionRate:99,status:c.NORMAL,gridArea:"c3"},{id:"C8",model:"--",goodRate:0,completionRate:0,status:c.SHUTDOWN,gridArea:"c8"},{id:"C9",model:"OM-935176",goodRate:77,completionRate:22,status:c.NORMAL,gridArea:"c9"},{id:"C4",model:"--",goodRate:0,completionRate:0,status:c.SHUTDOWN,gridArea:"c4"},{id:"C5",model:"--",goodRate:0,completionRate:0,status:c.SHUTDOWN,gridArea:"c5"},{id:"C6",model:"MH-713254",goodRate:56,completionRate:42,status:c.WARNING,gridArea:"c6"},{id:"C7",model:"PG-820090",goodRate:57,completionRate:43,status:c.WARNING,gridArea:"c7"}];//! =============== 2. 樣式定義 ===============
const X=o.div`
  /* 布局定位 */
  display: grid;
  width: 100%;
  height: 100vh;
  position: relative;

  /* 網格定義 - 2排布局，對應照片中的位置 */
  grid-template-areas:
    'c8 empty1 c3 c2 c1 '
    'spacer1 spacer2 spacer3 spacer4 spacer5'
    'c9 c4 c5 c6 c7';
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto 1fr auto;
  /* 盒模型 */
  gap: 1.25rem;
  padding: 1rem;

  /* 視覺樣式 */
  background: transparent;

  /* 響應式處理 */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      'c1 c2 c3'
      'c8 c9 c4'
      'c5 c6 c7';
    gap: 1rem;
  }
`,q=o.div`
  grid-area: ${t=>t.gridArea};
  display: ${t=>t.hidden?"none":"block"};
  z-index: 10;
`;function tt(){return e.jsx(x,{backgroundImage:"/React-WiseScheduling_TimeLine_Library/images/ProductionZoneC.jpg",children:e.jsx(X,{children:K.map(t=>e.jsx(q,{gridArea:t.gridArea,children:e.jsxs(d,{status:t.status,children:[e.jsx(d.Header,{id:t.id,model:t.model}),e.jsx(d.Stats,{goodRate:t.goodRate,completionRate:t.completionRate})]})},t.id))})})}//! =============== 1. 設定與常量 ===============
const l={NORMAL:"success",TESTING:"testing",ADJUSTING:"adjusting",WARNING:"warning",SHUTDOWN:"inactive",ERROR:"danger"},et=[{id:"D5",model:"KJ-571593",goodRate:48,completionRate:29,status:l.NORMAL,gridArea:"d5"},{id:"D6",model:"--",goodRate:0,completionRate:0,status:l.SHUTDOWN,gridArea:"d6"},{id:"D4",model:"HG-38759",goodRate:28,completionRate:77,status:l.NORMAL,gridArea:"d4"},{id:"D3",model:"YG-936687",goodRate:54,completionRate:38,status:l.ERROR,gridArea:"d3"},{id:"D2",model:"VB-359727",goodRate:32,completionRate:92,status:l.TESTING,gridArea:"d2"},{id:"D1",model:"--",goodRate:0,completionRate:0,status:l.SHUTDOWN,gridArea:"d1"},{id:"D7",model:"--",goodRate:0,completionRate:0,status:l.SHUTDOWN,gridArea:"d7"}];//! =============== 2. 樣式定義 ===============
const at=o.div`
  /* 布局定位 */
  display: grid;
  width: 100%;
  height: 100vh;
  position: relative;

  /* 網格定義 - 2排布局，對應照片中的位置 */
  grid-template-areas:
    'd6 empty1 empty2 empty3 d5'
    'spacer1 spacer2 spacer3 spacer4 spacer5'
    'd7 d1 d2 d3 d4';
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto 400px auto;
  /* 盒模型 */
  gap: 1.25rem;
  padding: 1rem;

  /* 視覺樣式 */
  background: transparent;

  /* 響應式處理 */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      'd5 d6 d7'
      'd4 d3 d2'
      'd1 empty1 empty2';
    gap: 1rem;
  }
`,ot=o.div`
  grid-area: ${t=>t.gridArea};
  display: ${t=>t.hidden?"none":"block"};
  z-index: 10;
`;function rt(){return e.jsx(x,{backgroundImage:"/React-WiseScheduling_TimeLine_Library/images/ProductionZoneD.jpg",children:e.jsx(at,{children:et.map(t=>e.jsx(ot,{gridArea:t.gridArea,children:e.jsxs(d,{status:t.status,children:[e.jsx(d.Header,{id:t.id,model:t.model}),e.jsx(d.Stats,{goodRate:t.goodRate,completionRate:t.completionRate})]})},t.id))})})}//! =============== 1. 設定與常量 ===============
const R={switchInterval:1e4,progressUpdateInterval:1e3};//! =============== 3. 核心資料結構 ===============
const u=[{component:F,name:"A區生產線",key:"zone-a"},{component:Y,name:"B區生產線",key:"zone-b"},{component:tt,name:"C區生產線",key:"zone-c"},{component:rt,name:"D區生產線",key:"zone-d"}];//! =============== 4. 樣式定義 ===============
const it=o.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
`,st=o.div`
  height: 100%;
  background-color: #4caf50;
  width: ${t=>t.progress}%;
  transition: width 1s linear;
`;function ut(){k("工廠績效儀表板");const[t,a]=g.useState(0),[r,s]=g.useState(100),p=g.useCallback(()=>{a(b=>(b+1)%u.length),s(100)},[]);g.useEffect(()=>{const b=100/(R.switchInterval/R.progressUpdateInterval),y=setInterval(()=>{s(w=>{const A=w-b;return A<0?(p(),100):A})},R.progressUpdateInterval);return()=>clearInterval(y)},[p]);const T=u[t].component,j=u[t].name;return e.jsxs(e.Fragment,{children:[e.jsx(T,{},u[t].key),e.jsx(it,{"aria-label":`正在顯示${j}，${Math.round(r/10)}秒後切換`,children:e.jsx(st,{progress:r})})]})}export{ut as default};
