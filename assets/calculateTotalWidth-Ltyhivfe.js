import{j as a}from"./vendor-mui-Cc1TuOMr.js";import{r as d,a as L}from"./vendor-react-CQ9jITQR.js";import{l as N,d as p}from"./vendor-styled-F-HTyTPr.js";import{I as F}from"./iconify-CCN44Ko-.js";import{c as n,G as K}from"./index-D6LdA2ZN.js";import{T as q,B as E,F as J,c as Q,I as A,d as X,S as Z,e as ee,C as te,R as re,f as g,g as oe,h as ne,s as ae}from"./vendor-antd-Ct-O66bz.js";import{j}from"./vendor-date-CdyaOyHe.js";const y={textSecondary:"#8f8f8f",background:"#ebecf0",borderColor:"#e8e8e8",buttonPrimary:"#83bf45",buttonHover:"#6fc1ae",buttonActive:"#8bc1e3",confirmButtonBg:"#186c98",confirmButtonText:"#e1e7f5",dangerButtonBg:"#eb0004",dangerButtonHover:"#e8686a",dangerButtonActive:"#be090c"},se=N`
  display: flex;
  place-content: center center;
  /* width: 2.1875rem; */
  /* height: 2.1875rem; */
  background: ${y.buttonPrimary} !important;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.25));

  & > svg {
    align-self: center;
    width: 100%;
    height: 100%;
  }
`,T=(e,t)=>N`
  &:hover {
    background-color: ${e} !important;
    color: white !important;
  }

  &:active {
    background-color: ${t} !important;
    color: white !important;
  }
`,ce=p(E)`
  ${se}
  ${T(y.buttonHover,y.buttonActive)}

  &.c-btn-primars--cancel {
    color: ${y.textSecondary};
    background: unset;
    &:hover {
      color: ${y.buttonHover};
      text-decoration: underline;
    }
    &:active {
      color: ${y.buttonActive};
    }
  }

  &.c-btn-primars--delete {
    background-color: ${y.dangerButtonBg} !important;
    color: #fff !important;
    ${T(y.dangerButtonHover,y.dangerButtonActive)}
  }
`,ie=({children:e,shape:t="circle",onClick:r=null,className:i="",icon:c,disabled:o,tooltip:s="",type:l="primary"})=>{const m=`c-btn-primars ${l==="delete"?"c-btn-primars--delete":""} ${l==="cancel"?"c-btn-primars--cancel":""} ${i}`;return a.jsx(q,{title:s,children:a.jsx(ce,{className:m,onClick:r,shape:t,icon:c,disabled:o,children:e})})},le=d.memo(ie),de=p.div`
  display: flex;
  flex-direction: column;
  align-items: self-start;
  padding: 1.875rem 1.4375rem;
  color: ${n.text.inverse};
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  background: ${n.background.secondary};
  border-radius: 8px;
  border: 1px solid ${n.accent.primary}40;
  box-shadow: 0 2px 8px ${n.accent.primary}20;
`,me=p.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${n.border.primary};
`,ue=p.h3`
  color: ${n.accent.primary};
  font-family: Roboto, sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin: 0;
`,pe=p(le)`
  display: flex;
  place-content: center center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${n.accent.primary};
  color: ${n.background.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 6px ${n.accent.primary}40;

  & > svg {
    align-self: center;
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${n.accent.primary};
    filter: brightness(1.1);
    box-shadow: 0 4px 10px ${n.accent.primary}60;
    transform: scale(1.05);
  }

  &:active {
    filter: brightness(0.9);
    transform: scale(0.98);
  }
`;function be({title:e,onAddClick:t,children:r}){return a.jsxs(de,{children:[a.jsx(K,{}),a.jsxs(me,{children:[a.jsx(ue,{children:e}),a.jsx(pe,{onClick:t,children:a.jsx(F,{icon:"mingcute:add-fill"})})]}),r]})}const fe=p(J)`
  && {
    width: 100%;
    .ant-table {
      border: 1px solid ${n.border.primary};
      overflow: hidden;
      border-radius: 8px;
      background: ${n.background.secondary};

      * {
        font-family: Roboto, sans-serif;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem;
        border: none;
      }

      .ant-table-thead .ant-table-cell {
        &::before {
          display: none;
        }
        color: ${n.accent.primary} !important;
        padding: 14px 16px;
        border-bottom: 2px solid ${n.accent.primary}60;
        background: ${n.background.primary} !important;
        border-right: 1px solid ${n.border.primary};
        font-weight: 700;
        font-size: 15px;
        text-transform: uppercase;
        letter-spacing: 0.5px;

        &:hover {
          color: ${n.accent.primary} !important;
          background: ${n.background.primary} !important;
        }

        .ant-table-column-sorter {
          color: ${n.accent.primary}60;

          &:hover {
            color: ${n.accent.primary};
          }
        }

        .ant-table-column-sorter-up.active,
        .ant-table-column-sorter-down.active {
          color: ${n.accent.primary};
        }
      }

      td {
        transition: all 0.3s;
        padding: 14px 16px;
        font-size: 14px;
        color: ${n.text.inverse} !important;
      }
      td:not(:last-child) {
        border-right: 1px solid ${n.border.primary};
      }
      .ant-table-row {
        position: relative;
        z-index: 1;

        &:not(:last-child) > td {
          border-bottom: 1px solid ${n.border.primary};
        }

        &:nth-of-type(odd) {
          .ant-table-cell,
          .ant-table-cell.ant-table-cell-fix-left,
          .ant-table-cell.ant-table-cell-fix-right {
            background: ${n.background.secondary};
          }
        }

        &:nth-of-type(even) {
          .ant-table-cell,
          .ant-table-cell.ant-table-cell-fix-left,
          .ant-table-cell.ant-table-cell-fix-right {
            background: ${n.background.primary};
          }
        }

        &:hover {
          position: relative;
          z-index: 10;

          > td {
            background: ${n.background.primary} !important;
            background-image: linear-gradient(
              ${n.accent.primary}25,
              ${n.accent.primary}25
            ) !important;
            color: ${n.text.inverse} !important;
            cursor: pointer;
            box-shadow: inset 0 0 0 1px ${n.accent.primary}80;
          }
        }
      }
    }

    // 确保固定列的 z-index 正确
    :where(.ant-table-cell-fix-left, .ant-table-cell-fix-right) {
      z-index: 2;

      &:hover {
        z-index: 20 !important;
      }
    }

    .ant-table-row:hover {
      :where(.ant-table-cell-fix-left, .ant-table-cell-fix-right) {
        z-index: 20 !important;
      }
    }
  }

  &.reusableTable {
    max-height: ${({maxHeight:e})=>e||"32.5rem"};
    overflow: auto;
    cursor: pointer;
  }
`;function ye({columns:e,data:t,onRowClick:r,scroll:i={x:1200,y:500},maxHeight:c}){return a.jsx(fe,{scroll:i,sticky:!0,className:"reusableTable",columns:e,dataSource:t,onRow:o=>({onClick:()=>r(o)}),maxHeight:c})}const he=({title:e,columns:t,data:r,onRowClick:i,onAddClick:c,scroll:o,maxHeight:s})=>a.jsx("div",{className:"procMaterials-context",children:a.jsx(be,{onAddClick:c,title:e,icon:a.jsx(F,{icon:"gg:add"}),children:a.jsx(ye,{columns:t,data:r,onRowClick:i,scroll:o,maxHeight:s})})}),O=d.createContext(),z=N`
  min-width: 5rem;
  padding: 0.5625rem 1.375rem 0.625rem 1.375rem;
  border-radius: 1.875rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: none;
`,xe=p(Q)`
  &&& {
    &.product-drawer {
      color: ${n.text.inverse};
      font-family: Roboto, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;

      .ant-drawer-content-wrapper {
        border-radius: 10px 0 0 10px;
        background: ${n.background.secondary};
      }

      .ant-drawer-content {
        background: ${n.background.secondary};
      }

      .ant-drawer-body {
        padding: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: ${n.background.secondary};
      }
    }
  }
`,ge=p.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${n.accent.primary}40;
  background: ${n.background.primary};
  color: ${n.accent.primary};
  font-size: 20px;
  font-weight: 700;
`,we=p.div`
  flex: 1;
  margin-top: 2rem;
  padding: 1.5rem;
  padding-bottom: 6rem;
  overflow-y: auto;
  background: ${n.background.secondary};
`,ke=p.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem 2.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 1rem;
  z-index: 2;
  background: ${n.background.primary};
  border-top: 1px solid ${n.accent.primary}40;
  box-shadow: 0 -2px 8px ${n.accent.primary}20;
`,$e=p.button`
  ${z}
  background: transparent;
  color: ${n.text.secondary};
  border: 1px solid ${n.border.primary};

  &:hover {
    color: ${n.accent.primary};
    border-color: ${n.accent.primary};
    background: ${n.accent.primary}10;
  }
`,ve=p.button`
  ${z}
  background: ${n.accent.primary};
  color: ${n.background.primary};
  box-shadow: 0 2px 8px ${n.accent.primary}40;

  &:hover {
    background: ${n.accent.primary};
    filter: brightness(1.1);
    box-shadow: 0 4px 12px ${n.accent.primary}60;
  }

  &:active {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: none;
  }
`;p.div`
  display: flex;
  flex-direction: column;
  max-height: 3.875rem;
  gap: 9px;
  font-family: Inter, sans-serif;
  line-height: 1.0625rem;

  &:not(:first-child) {
    margin-top: 1.25rem;
  }

  > span {
    font-size: 0.875rem;
  }
`;const x=d.memo(({children:e,visible:t,onClose:r,width:i=700})=>a.jsx(xe,{className:"product-drawer",width:i,placement:"right",onClose:r,open:t,closable:!1,destroyOnClose:!0,children:a.jsx(O.Provider,{value:{onClose:r},children:e})})),M=({children:e,icon:t})=>a.jsxs(ge,{children:[e,t&&t]}),W=({children:e})=>a.jsx(we,{children:e}),H=({onSubmit:e,disabled:t})=>{const{onClose:r}=d.useContext(O);return a.jsxs(ke,{children:[a.jsx($e,{onClick:r,children:"取消"}),a.jsx(ve,{disabled:t,onClick:e,children:"確定"})]})};M.displayName="BaseDrawer.Header";x.Header=M;W.displayName="BaseDrawer.Body";x.Body=W;H.displayName="BaseDrawer.Footer";x.Footer=H;x.displayName="BaseDrawer";function je(e,t){return e?Object.entries(e).reduce((r,[i,c])=>{const o=t.find(s=>s.name===i);return r[i]=(o==null?void 0:o.type)==="date"&&c?j(c):c,r},{}):{}}function P(e){return Object.entries(e).reduce((t,[r,i])=>(t[r]=j.isDayjs(i)?i.format("YYYY-MM-DD"):i,t),{})}const{TextArea:Ie}=A,Ce={input:A,number:X,select:Z,date:ee,checkbox:te,radio:re.Group,textarea:Ie};function I({children:e,onFinish:t,initialValues:r,submitText:i="提交",fields:c=[],form:o,submitButton:s=!1,...l}){const[m]=g.useForm(),f=o||m,k=d.useMemo(()=>je(r,c),[r,c]),S=d.useCallback($=>{const v=P($);t(v)},[t]);return d.useEffect(()=>{r?f.setFieldsValue(k):f.resetFields()},[f,k,r]),a.jsxs(g,{form:f,onFinish:S,initialValues:k,layout:"vertical",...l,children:[a.jsx(ne,{gutter:16,children:e({form:f,FormItem:g.Item})}),s&&a.jsx(g.Item,{children:a.jsx(E,{type:"primary",htmlType:"submit",children:i})})]})}I.Field=L.memo(({field:e,children:t})=>{const r=Ce[e.type];if(!r)return null;const i=()=>{var c;switch(e.type){case"select":case"radio":return a.jsx(r,{...e.props,children:(c=e.options)==null?void 0:c.map(o=>a.jsx(r.Option,{value:o.value,children:o.label},o.value))});case"checkbox":return a.jsx(r,{...e.props,children:e.label});case"date":return a.jsx(r,{...e.props,format:"YYYY-MM-DD"});default:return a.jsx(r,{...e.props})}};return a.jsx(g.Item,{noStyle:!0,shouldUpdate:(c,o)=>e.dependencies?e.dependencies.some(s=>c[s]!==o[s]):!1,children:({getFieldsValue:c})=>{const o=c();return(e.shouldRender?e.shouldRender(o):!0)?a.jsx(oe,{span:e.span||24,children:a.jsx(g.Item,{name:e.name,label:e.type!=="checkbox"?e.label:"",valuePropName:e.type==="checkbox"?"checked":"value",rules:e.rules,children:t?t(i()):i()})}):null}})});I.Field.displayName="DynamicForm.Field";const Fe=()=>a.jsx(F,{icon:"fontisto:check",className:"notificationStyle__icon",style:{color:"#07CB3E",strokeWidth:"2px",stroke:"currentColor"}}),Se=e=>({display:t=>{if(!e)throw new Error("Notification API is not initialized.");const r=t.icon||Fe();e.open({message:t.message,description:t.description,className:"notificationStyle",style:t.style,placement:t.placement,duration:t.duration,pauseOnHover:!1,icon:r})}}),Ne=({message:e,description:t,style:r={width:600},icon:i=null,duration:c=1,placement:o="bottomRight"})=>({id:Date.now().toString(),message:e,description:t,style:r,icon:i,duration:c,placement:o}),De=e=>{if(!e.message)throw new Error("Notification must have a message");return e},h={SUCCESS:"success",ERROR:"error",WARNING:"warning",INFO:"info"},Be=()=>{const e=d.useMemo(()=>({[h.SUCCESS]:{icon:"mdi:check-bold",color:"#07CB3E"},[h.ERROR]:{icon:"mdi:alert",color:"#FF4D4F"},[h.WARNING]:{icon:"mdi:alert-outline",color:"#FAAD14"},[h.INFO]:{icon:"mdi:information-outline",color:"#1890FF"}}),[]),t=d.useMemo(()=>Se(ae),[]),r=d.useCallback((o,s)=>a.jsx(F,{icon:o,className:"notificationStyle__icon",style:{color:s,strokeWidth:"2px",stroke:"currentColor"}}),[]),i=d.useCallback(o=>{try{const s=Ne(o),l=De(s);t.display(l)}catch(s){console.error("Error triggering notification:",s.message)}},[t]),c=d.useCallback(({type:o,message:s,description:l})=>{const m=e[o];i({message:s,description:l,icon:r(m.icon,m.color),style:{borderLeft:`5px solid ${m.color}`},duration:3})},[r,i]);return d.useMemo(()=>({notify:i,notifySuccess:(o="Operation successful",s="Operation completed successfully")=>c({type:h.SUCCESS,message:o,description:s}),notifyError:(o="An error occurred",s="An unexpected error occurred")=>c({type:h.ERROR,message:o,description:s}),notifyWarning:(o="Please note",s="Please take note of this")=>c({type:h.WARNING,message:o,description:s}),notifyInfo:(o="System information",s="Information about the system")=>c({type:h.INFO,message:o,description:s})}),[i,c])},V=d.createContext(),Re=p.div`
  background: ${n.background.primary};
`;function C({children:e,config:t}){const[r,i]=d.useState([]),[c,o]=d.useState(!0),[s,l]=d.useState(!1),[m,f]=d.useState(null),{notifySuccess:k}=Be();console.log(t),d.useEffect(()=>{(async()=>{o(!0);try{const b=await t.fetchItems();i(b)}catch(b){console.error("Error fetching inventory data:",b)}finally{o(!1)}})()},[t]);const S=d.useCallback((u=null)=>{f(u),l(!0)},[]),$=d.useCallback(()=>{f(null),l(!1)},[]),v=d.useCallback(async u=>{o(!0);try{const b=await t.addItem(u);return console.log(b),i(w=>[...w,b]),b}finally{o(!1)}},[t]),B=d.useCallback(async(u,b)=>{o(!0);try{const w=await t.updateItem(u,b);return i(U=>U.map(R=>R.id===u?w:R)),k(),w}finally{o(!1)}},[t]),Y=d.useCallback(async u=>{o(!0);try{await t.deleteItem(u),i(b=>b.filter(w=>w.id!==u))}finally{o(!1)}},[t]),G=d.useCallback(async u=>{console.log(u),m?await B(m.id,u):await v(u),$()},[m,B,v,$]),_={config:t,data:r,loading:c,visible:s,editingItem:m,openDrawer:S,closeDrawer:$,handleFinish:G,deleteItem:Y};return a.jsx(V.Provider,{value:_,children:a.jsx(Re,{children:e})})}function D(){const e=d.useContext(V);if(!e)throw new Error("InventorySystem compound components cannot be rendered outside the InventorySystem component");return e}C.Table=function(){const{config:t,data:r,loading:i,openDrawer:c}=D(),{columnConfig:o,totalWidth:s}=t.getColumns();return console.log(o),a.jsx(he,{title:t.title,columns:o,data:r,onRowClick:c,onAddClick:()=>c(),scroll:{x:s,y:350},loading:i})};C.Drawer=function(){const{visible:t,closeDrawer:r,editingItem:i,config:c,handleFinish:o}=D(),[s]=g.useForm(),l=d.useCallback(()=>{s.validateFields().then(m=>{const f=P(m);o(f)}).catch(m=>{console.error("Validation failed:",m)})},[s,o]);return a.jsxs(x,{visible:t,onClose:r,width:700,children:[a.jsx(x.Header,{children:i?`編輯${c.title}`:`新增${c.title}`}),a.jsx(x.Body,{children:a.jsx(C.Form,{form:s})}),a.jsx(x.Footer,{onSubmit:l})]})};C.Form=function({form:t}){const{config:r,editingItem:i}=D();return a.jsx(I,{form:t,fields:r.formFields,initialValues:i,submitButton:!1,children:()=>a.jsx(a.Fragment,{children:r.formFields.map((c,o)=>a.jsx(I.Field,{field:c},o))})})};const Te=(e,t)=>Math.floor(Math.random()*(t-e+1))+e,Ve=(e=null,t=null)=>{const r=new Date;return e||r.setDate(r.getDate()-Te(0,365)),r.setDate(e-t),r.toISOString().split("T")[0]},Ye=e=>{const t={},r=[{obj:e,prefix:""}];for(;r.length;){const{obj:i,prefix:c}=r.pop();for(const[o,s]of Object.entries(i)){const l=c?`${c}${o.charAt(0).toUpperCase()+o.slice(1)}`:o;typeof s=="object"&&s!==null&&!Array.isArray(s)?r.push({obj:s,prefix:l}):t[l]=s}}return t},Ge=(e,t={})=>{const{setWidthForChars:r=4,defaultWidth:i=80,defaultColumnWidth:c=100}=t,o=new WeakMap,s=l=>o.has(l)?void 0:(o.set(l,!0),{title:l.title,dataIndex:l.dataIndex,key:l.key||l.dataIndex,sorter:l.sorter,...l.fixed?{fixed:l.fixed}:{},width:l.width||(l.title.length>=r?i:c),...l.children?{children:l.children.map(s)}:{}});return e.map(s)},_e=(e,t)=>j(e).unix()-j(t).unix(),Ue=(e,t)=>e-t;function Ee(e){return e.reduce((t,r)=>typeof r.width=="number"?t+r.width:r.children?t+Ee(r.children):t+100,0)}export{C as I,Ve as a,Ge as b,Ee as c,Ue as d,Ye as f,Te as g,_e as s};
