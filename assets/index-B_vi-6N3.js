import{j as t,S as G,N as k,Q as oe,R as j,U as P,V as ne,W as ae,X as U,Y as q,Z as Q,i as D,$ as X,a0 as Y,G as l,B as ee,a1 as ie,a2 as le,K as ce,M as de}from"./vendor-mui-Cc1TuOMr.js";import{r as S}from"./vendor-react-CQ9jITQR.js";import{i as ue,a as me,b as he,d as pe,u as ge,t as xe,z as i,c as fe,C as K,e as be,f as Te,F as je,T as Se}from"./zh-tw-CSIT1pcM.js";import{j as m}from"./vendor-date-CdyaOyHe.js";import{D as te}from"./vendor-charts-Dh6Kn8Ga.js";import{h as re}from"./vendor-moment-C5S46NFB.js";import{l as se,d as y}from"./vendor-styled-F-HTyTPr.js";//! =============== 1. 設定與常量 ===============
const ve="Asia/Taipei";//! =============== 2. 初始化設定 ===============
[ue,me,he,pe,ge,xe].forEach(e=>m.extend(e));m.tz.setDefault(ve);//! =============== 3. 核心功能 ===============
const A=(e,r=m())=>{const s=r,o=8,d={hour:{start:s.subtract(1,"hour"),end:s.add(1,"hour")},day:{start:s.startOf("day").hour(o),end:s.endOf("day").startOf("hour")},week:{start:s.startOf("week").hour(o),end:s.endOf("week").startOf("hour")},month:{start:s.startOf("month").hour(o),end:s.endOf("month").startOf("hour")}};return d[e]||d.day};//! =============== 4. 工具函數 ===============
const Z=(e,r="YYYY-MM-DDTHH:mm")=>m(e).format(r),Ee=e=>e?m(e).format("YYYY-MM-DDTHH:mm"):"",De=`
    .vis-item.custom-item {
      background-color: #e3f2fd;
      border-color: #2196f3;
      color: #1976d2;
      border-radius: 4px;
      font-size: 12px;
    }
    .vis-item.custom-item.vis-selected {
      background-color: #bbdefb;
      border-color: #1565c0;
    }
  `,we={hour:{label:"小時",getWindow:e=>A("hour",e),format:{minorLabels:{minute:"mm",hour:"HH:mm"},majorLabels:{minute:"HH:mm",hour:"MM-DD HH:mm"}}},day:{label:"天",getWindow:e=>A("day",e),format:{minorLabels:{hour:"HH:mm",day:"D日"},majorLabels:{hour:"M月D日",day:"YYYY年M月"}}},week:{label:"週",getWindow:e=>A("week",e),format:{minorLabels:{day:"DD日",week:"第w週"},majorLabels:{day:"MM月",week:"YYYY年"}}},month:{label:"月",getWindow:e=>A("month",e),format:{minorLabels:{day:"DD",month:"MM月"},majorLabels:{day:"MM月",month:"YYYY年"}}}},L={AREAS:["A","B","C","D"],MACHINES_PER_AREA:10,WORK_START_HOUR:8},n={ORDER_CREATED:"製立單",IDLE:"待機中",SETUP:"上模與調機",TESTING:"產品試模",STOPPED:"機台停機"},B={[n.ORDER_CREATED]:{name:n.ORDER_CREATED,description:"製立單模式",color:"#4caf50",className:"status-producing",canSwitch:!1,canDelete:!1,allowedTransitions:[]},[n.IDLE]:{name:n.IDLE,description:"機台空閒狀態",color:"#9e9e9e",className:"status-idle",canSwitch:!0,canDelete:!0,allowedTransitions:[n.SETUP,n.TESTING,n.STOPPED]},[n.SETUP]:{name:n.SETUP,description:"機台正在進行設定",color:"#ff9800",className:"status-setup",canSwitch:!0,canDelete:!0,allowedTransitions:[n.IDLE]},[n.TESTING]:{name:n.TESTING,description:"進行產品測試",color:"#2196f3",className:"status-testing",canSwitch:!0,canDelete:!0,allowedTransitions:[n.IDLE]},[n.STOPPED]:{name:n.STOPPED,description:"機台暫停運作",color:"#f44336",className:"status-stopped",canSwitch:!0,canDelete:!0,allowedTransitions:[n.IDLE]}},Ie=e=>{const r=B[e];return!(!r||!r.canSwitch)},ke=e=>{var r;return((r=B[e])==null?void 0:r.name)??e},ye=e=>{var r;return((r=B[e])==null?void 0:r.className)??""},_e=(e,r)=>({id:`${e}${r}`,content:`${e}${r}`,area:e}),V=e=>Array.from({length:L.MACHINES_PER_AREA},(r,s)=>_e(e,s+1)),Ce=()=>{const e=L.AREAS.flatMap(V);return new te(e)},Re=({timeRange:e,onTimeRangeChange:r,onAddItem:s,onMoveToNow:o})=>{const[d,g]=S.useState(""),[p,u]=S.useState(""),x=d?V(d):[],T=h=>{const b=h.target.value;g(b),u("")};return t.jsxs(G,{spacing:2,direction:{xs:"column",sm:"row"},justifyContent:"space-between",alignItems:"center",mb:2,children:[t.jsx(G,{direction:"row",spacing:1,children:Object.entries(we).map(([h,{label:b}])=>t.jsx(k,{startIcon:t.jsx(oe,{}),variant:e===h?"contained":"outlined",onClick:()=>r(h),sx:{mr:1,color:e===h?"white":"inherit",borderColor:e===h?"primary.main":"grey.300"},children:b},h))}),t.jsxs(G,{direction:"row",spacing:2,children:[t.jsx(j,{select:!0,label:"區域",value:d,onChange:T,sx:{width:100},size:"small",children:L.AREAS.map(h=>t.jsx(P,{value:h,children:h},h))}),t.jsx(j,{select:!0,label:"機台",value:p,onChange:h=>u(h.target.value),sx:{width:100},size:"small",disabled:!d,children:x.map(h=>t.jsx(P,{value:h.id,children:h.content},h.id))}),t.jsx(k,{startIcon:t.jsx(ne,{}),onClick:s,variant:"outlined",children:"新增"}),t.jsx(k,{startIcon:t.jsx(ae,{}),onClick:o,variant:"outlined",children:"現在"})]})]})},Oe=({open:e,title:r,content:s,onConfirm:o,onCancel:d,confirmText:g="確認",cancelText:p="取消"})=>t.jsxs(U,{open:e,onClose:d,maxWidth:"sm",fullWidth:!0,children:[t.jsx(q,{children:r}),t.jsx(Q,{children:t.jsx(D,{children:s})}),t.jsxs(X,{children:[t.jsx(k,{onClick:d,children:p}),t.jsx(k,{onClick:o,variant:"contained",color:"primary",children:g})]})]}),Ae={start:i.string().min(1,"開始時間為必填").transform(e=>m(e).toDate()).refine(e=>m(e).isValid(),"時間格式錯誤"),end:i.string().min(1,"結束時間為必填").transform(e=>m(e).toDate()).refine(e=>m(e).isValid(),"時間格式錯誤")},Me=i.object({group:i.string().min(1,"機台編號為必填"),area:i.string().min(1,"區域為必填"),actualStartTime:i.optional(i.date()),actualEndTime:i.optional(i.date()),productId:i.optional(i.string()),productName:i.optional(i.string()),quantity:i.optional(i.number()),completedQty:i.optional(i.number()),process:i.optional(i.string()),orderStatus:i.optional(i.string()),...Ae}).refine(e=>{console.log("🚀 ~ data:",e);const r=m();return m(e.end).isAfter(r)},{message:"結束時間不能早於現在",path:["end"]}).refine(e=>{const r=m(e.start);return m(e.end).isAfter(r)},{message:"結束時間必須晚於開始時間",path:["end"]}).refine(e=>{const r=m(e.start);return m(e.end).diff(r,"hour")>=4},{message:"排程時間至少需要 4 小時",path:["end"]}),Pe={[n.ORDER_CREATED]:Me,[n.IDLE]:i.object({start:i.string().min(1,"開始時間為必填"),end:i.string().optional(),area:i.string().min(1,"區域為必填"),group:i.string().min(1,"機台編號為必填")}),[n.SETUP]:i.object({start:i.string().min(1,"開始時間為必填"),end:i.string().optional(),area:i.string().min(1,"區域為必填"),group:i.string().min(1,"機台編號為必填"),setupInfo:i.string().optional(),className:i.string().optional(),reason:i.string().optional()}),[n.TESTING]:i.object({product:i.string().optional(),start:i.string().min(1,"開始時間為必填"),end:i.string().optional(),area:i.string().min(1,"區域為必填"),group:i.string().min(1,"機台編號為必填"),className:i.string().optional()}),[n.STOPPED]:i.object({product:i.string().optional(),start:i.string().min(1,"開始時間為必填"),end:i.string().optional(),area:i.string().min(1,"區域為必填"),group:i.string().min(1,"機台編號為必填"),className:i.string().optional(),reason:i.string().min(2,"停機原因至少需要2個字").max(50,"停機原因不能超過50個字")})},O=e=>Pe[e]||i.object({}),_={defaultValues:{content:"",start:Z(m()),end:Z(m().add(2,"hour")),group:""},timePickerProps:{type:"datetime-local",InputLabelProps:{shrink:!0},inputProps:{step:300}}},F={content:{required:"訂單內容不能為空",maxLength:{value:100,message:"內容不能超過100字"}},start:{required:"請選擇開始時間"},end:{required:"請選擇結束時間"},group:{required:"請選擇機台"},area:{required:"請選擇區域"}},Le={[n.ORDER_CREATED]:{name:"製立單表單",schema:O(n.ORDER_CREATED),defaultValues:{group:"",start:"",end:""}},[n.IDLE]:{name:"待機表單",schema:O(n.IDLE),defaultValues:{startTime:m().toDate(),endTime:m().add(2,"hour").toDate(),group:"",area:""}},[n.SETUP]:{name:"上模與調機表單",schema:O(n.SETUP),defaultValues:{startTime:"",setupInfo:""}},[n.TESTING]:{name:"產品試模表單",schema:O(n.TESTING),defaultValues:{startTime:"",product:""}},[n.STOPPED]:{name:"機台停機表單",schema:O(n.STOPPED),defaultValues:{startTime:"",reason:""}}},$={basic:["status","id","group","area","timeLineStatus"],order:["productName","process","quantity","completedQty","scheduledStartTime","scheduledEndTime","orderStatus"],time:["start","end"],status:["startTime","endTime","reason","product"]},z=(e,r)=>{console.log("🚀 ~ useStatusForm ~ item:",r);const s=fe(),{register:o,setValue:d,watch:g,control:p,formState:{errors:u}}=s,x=S.useRef(!1);S.useEffect(()=>{if(!r||x.current)return;const h={...$.basic.reduce((b,c)=>({...b,[c]:c==="status"?e:r[c]}),{}),...$.order.reduce((b,c)=>{var f;return{...b,[c]:(f=r.orderInfo)==null?void 0:f[c]}},{}),...$.time.reduce((b,c)=>({...b,[c]:Ee(r[c])}),{}),...$.status.reduce((b,c)=>{var f;return{...b,[c]:(f=r.status)==null?void 0:f[c]}},{})};console.log("🚀 ~ useEffect ~ updates:",h),Object.entries(h).forEach(([b,c])=>{c!==void 0&&d(b,c,{shouldValidate:!0,shouldDirty:!1})}),x.current=!0},[r,d,e]);const T=x.current;return{register:o,watch:g,errors:u,control:p,setValue:d,initialized:T,getFieldValue:g,isFieldError:h=>!!u[h]}},Ne=({item:e,disabled:r})=>{var T,h,b;const{register:s,errors:o,watch:d,control:g,initialized:p}=z(n.ORDER_CREATED,e),u=d("area"),x=u?V(u):[];return p?!(e!=null&&e.id)||!(e!=null&&e.orderInfo)||!(e!=null&&e.status)?null:t.jsxs(l,{container:!0,spacing:3,children:[t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"基本資訊"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(j,{fullWidth:!0,...s("id"),label:"製令單號",value:e.id,disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(j,{fullWidth:!0,...s("productName"),label:"產品名稱",value:e.orderInfo.productName,disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(j,{fullWidth:!0,...s("process"),label:"製程名稱",value:e.orderInfo.process,disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("area",F.area),select:!0,label:"區域",error:!!o.area,helperText:(T=o.area)==null?void 0:T.message,disabled:r,value:d("area")||"",children:L.AREAS.map(c=>t.jsx(P,{value:c,children:c},c))})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("group",F.group),select:!0,label:"機台編號",error:!!o.group,helperText:(h=o.group)==null?void 0:h.message,disabled:r||!u,value:d("group")||((b=x[0])==null?void 0:b.id)||"",children:x.map(c=>t.jsx(P,{value:c.id,children:c.content},c.id))})})]})]}),t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"生產數量"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(j,{fullWidth:!0,...s("quantity"),label:"製令數量",value:e.orderInfo.quantity,disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(j,{fullWidth:!0,...s("completedQty"),label:"已完成數量",value:e.orderInfo.completedQty,disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(j,{fullWidth:!0,label:"完成率",value:`${e.orderInfo.completedQty}/${e.orderInfo.quantity}`,disabled:!0})})]})]}),t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"時程安排"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(K,{name:"start",control:g,render:({field:c,fieldState:{error:f}})=>t.jsx(j,{...c,fullWidth:!0,label:"預計上機日",type:"datetime-local",error:!!f,helperText:(f==null?void 0:f.message)||"",disabled:r,InputLabelProps:{shrink:!0}})})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(K,{name:"end",control:g,render:({field:c,fieldState:{error:f}})=>t.jsx(j,{...c,fullWidth:!0,label:"預計完成日",type:"datetime-local",error:!!f,helperText:(f==null?void 0:f.message)||"",disabled:r,InputLabelProps:{shrink:!0}})})})]})]}),t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"生產狀態"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,label:"實際上機日",value:e.status.startTime?new Date(e.status.startTime).toLocaleDateString():"",disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,label:"延遲完成日",value:"",disabled:!0})}),t.jsx(l,{item:!0,xs:12,children:t.jsx(j,{fullWidth:!0,label:"狀態",value:e.orderInfo.orderStatus,disabled:!0})})]})]})]}):t.jsx(Y,{})},We=({disabled:e,item:r})=>{var x,T,h,b,c;const{register:s,errors:o,watch:d,initialized:g}=z(n.IDLE,r),p=d("area"),u=S.useMemo(()=>p?V(p):[],[p]);return g?r?t.jsxs(l,{container:!0,spacing:3,children:[t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"機台選擇"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("area",F.area),select:!0,label:"區域",error:!!o.area,helperText:(x=o.area)==null?void 0:x.message,disabled:e,value:p||"",children:L.AREAS.map(f=>t.jsx(P,{value:f,children:f},f))})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("group",F.group),select:!0,label:"機台編號",error:!!o.group,helperText:(T=o.group)==null?void 0:T.message,disabled:e||!(r!=null&&r.area),value:d("group")||((h=u[0])==null?void 0:h.id)||"",children:u.map(f=>t.jsx(P,{value:f.id,children:f.content},f.id))})})]})]}),t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"時程安排"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("start"),..._.timePickerProps,label:"開始時間",error:!!o.start,helperText:(b=o.start)==null?void 0:b.message,disabled:e})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("end"),..._.timePickerProps,label:"結束時間",error:!!o.end,helperText:(c=o.end)==null?void 0:c.message,disabled:e})})]})]})]}):null:t.jsx(Y,{})},Ye=({disabled:e,item:r})=>{var u,x,T;console.log("🚀 ~ Setup ~ item:",r);const{register:s,errors:o,watch:d,control:g,initialized:p}=z(n.SETUP,r);return!r||!p?t.jsx(Y,{}):t.jsxs(l,{container:!0,spacing:2,children:[t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"時程安排"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("start"),..._.timePickerProps,label:"開始時間",error:!!o.start,helperText:(u=o.start)==null?void 0:u.message,disabled:e})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("end"),..._.timePickerProps,label:"結束時間",error:!!o.end,helperText:(x=o.end)==null?void 0:x.message,disabled:e})})]})]}),t.jsxs(l,{item:!0,xs:12,sm:6,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0}),t.jsx(j,{fullWidth:!0,...s("reason"),label:"調機說明",multiline:!0,rows:2,error:!!o.reason,helperText:(T=o.reason)==null?void 0:T.message,disabled:e})]})]})},ze=({disabled:e,item:r})=>{var u,x,T;const{register:s,errors:o,watch:d,control:g,initialized:p}=z(n.TESTING,r);return t.jsxs(l,{container:!0,spacing:1,children:[t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"時程安排"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("start"),..._.timePickerProps,label:"開始時間",error:!!o.start,helperText:(u=o.start)==null?void 0:u.message,disabled:e})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("end"),..._.timePickerProps,label:"結束時間",error:!!o.end,helperText:(x=o.end)==null?void 0:x.message,disabled:e})})]})]}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("product"),label:"測試產品",error:!!o.product,helperText:(T=o.product)==null?void 0:T.message,disabled:e})})]})},He=({disabled:e,item:r})=>{var u,x,T;const{register:s,errors:o,watch:d,control:g,initialized:p}=z(n.STOPPED,r);return t.jsxs(l,{container:!0,spacing:2,children:[t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"時程安排"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("start"),..._.timePickerProps,label:"開始時間",error:!!o.start,helperText:(u=o.start)==null?void 0:u.message,disabled:e})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("end"),..._.timePickerProps,label:"結束時間",error:!!o.end,helperText:(x=o.end)==null?void 0:x.message,disabled:e})})]})]}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(j,{fullWidth:!0,...s("reason"),label:"停機原因",error:!!o.reason,helperText:(T=o.reason)==null?void 0:T.message,required:!0,disabled:e})})]})},$e=({status:e,item:r,disabled:s,onSubmit:o,mode:d,isSubmitting:g,onClose:p,groups:u})=>{const x=Le[e],{handleSubmit:T,...h}=be({defaultValues:{...x.defaultValues,...r==null?void 0:r.status},resolver:Te(O(e))}),b={[n.ORDER_CREATED]:Ne,[n.IDLE]:We,[n.SETUP]:Ye,[n.TESTING]:ze,[n.STOPPED]:He}[e],c=f=>{console.log("Form submitted:",f),o(f)};return b?t.jsx(je,{...h,children:t.jsxs("form",{id:"status-form",onSubmit:T(c),children:[t.jsx(b,{disabled:s,item:r,groups:u}),t.jsxs(X,{children:[t.jsx(k,{onClick:p,disabled:g,children:"取消"}),d!=="view"&&t.jsx(k,{type:"submit",variant:"contained",disabled:g,startIcon:g?t.jsx(Y,{size:20}):null,children:"確認"})]})]})}):null},Ge=S.memo($e),Fe=({open:e,onClose:r,currentStatus:s,onStatusChange:o,disabled:d,mode:g})=>{const p=()=>s===n.ORDER_CREATED?[]:g==="add"?Object.values(n).filter(u=>u!==n.ORDER_CREATED&&u!==s):s===n.IDLE?Object.values(n).filter(u=>u!==n.IDLE&&u!==n.ORDER_CREATED):[n.IDLE];return t.jsxs(U,{open:e,onClose:d?void 0:r,maxWidth:"xs",fullWidth:!0,disableEscapeKeyDown:d,children:[t.jsx(q,{children:"切換狀態"}),t.jsx(Q,{children:t.jsx(G,{spacing:2,sx:{mt:2},children:p().map(u=>{const x=B[u];return t.jsxs(k,{variant:"outlined",onClick:()=>{o(u),r()},disabled:d,sx:{borderColor:x.color,color:x.color,"&:hover":{borderColor:x.color,backgroundColor:`${x.color}10`}},children:["切換至",x.name]},u)})})})]})},J=e=>{var r;return e.name==="ZodError"?((r=e.errors[0])==null?void 0:r.message)||"表單驗證錯誤":e.name==="StatusError"?e.message:"操作失敗，請稍後再試"};class Be extends Error{constructor(r){super(r),this.name="StatusError"}}//! =============== 2. 類型與介面 ===============
//! =============== 3. 核心功能 ===============
const Ve=({open:e,onClose:r,item:s,mode:o="view",onSave:d,groups:g})=>{const[p,u]=S.useState((s==null?void 0:s.timeLineStatus)||n.IDLE),[x,T]=S.useState(!1),[h,b]=S.useState(null),[c,f]=S.useState(!1),N=a=>{try{if(o!=="add"&&!Ie(p,a))throw new Be("無法切換到此狀態");u(a),T(!1)}catch(v){b(J(v))}},W=async a=>{if(!c)try{f(!0),console.log("Submitting form data:",a);const v={...s,group:a.group||"",area:a.area||"",start:a.start||null,end:a.end||null,timeLineStatus:a.timeLineStatus||p,status:{...s.status,product:a.product||"",reason:a.reason||"",startTime:a.start||null,endTime:a.end||null},orderInfo:{...s.orderInfo,productName:a.productName||"",process:a.process||"",scheduledStartTime:a.start||null,scheduledEndTime:a.end||null,actualStartTime:a.start||null,actualEndTime:a.end||null}};console.log("Updated item:",v),await d(v),r()}catch(v){console.error("Submit error:",v),b(J(v))}finally{f(!1)}};//! =============== 4. 工具函數 ===============
const C=()=>{if(c)return"處理中...";switch(o){case"add":return"新增狀態";case"edit":return"編輯狀態";default:return"檢視狀態"}};return s?t.jsxs(t.Fragment,{children:[t.jsxs(U,{open:e,onClose:c?void 0:r,maxWidth:"md",fullWidth:!0,disableEscapeKeyDown:c,keepMounted:!1,"aria-labelledby":"item-dialog-title",children:[t.jsxs(q,{id:"item-dialog-title",children:[C(),c&&t.jsx(Y,{size:20,sx:{ml:1}})]}),t.jsxs(Q,{children:[t.jsx(ee,{display:"flex",alignItems:"center",gap:1,sx:{mb:2},children:o!=="add"&&p!==n.ORDER_CREATED?t.jsx(t.Fragment,{children:t.jsx(k,{variant:"contained",color:"primary",onClick:()=>T(!0),disabled:c||o==="view",startIcon:t.jsx(ie,{}),children:p})}):t.jsxs(D,{variant:"subtitle1",children:["當前狀態：",p]})}),t.jsx(Ge,{status:p,item:s,onSubmit:W,mode:o,isSubmitting:c,onClose:r,groups:g,disabled:o==="view"||c||o!=="add"&&(s.start<m()||s.orderInfo.scheduledStartTime<m())})]})]}),t.jsx(Fe,{open:x,onClose:()=>T(!1),currentStatus:p,onStatusChange:N,disabled:c,mode:o}),t.jsx(le,{open:!!h,autoHideDuration:3e3,onClose:()=>b(null),children:t.jsx(ce,{severity:"error",children:h})})]}):null},Ue=(e=new Date)=>m(e).hour(L.WORK_START_HOUR).minute(0).second(0).millisecond(0).toDate(),qe=(e=Ue())=>{const r=m(e);return{id:"202408160004",group:"C1",area:"C",timeLineStatus:"製立單",status:{startTime:r.toDate(),endTime:null,reason:"",product:""},orderInfo:{scheduledStartTime:r.toDate(),scheduledEndTime:r.add(4,"hour").toDate(),actualStartTime:null,actualEndTime:null,productId:"SP-01048-AR1-01",productName:"封蓋外(R)灌包 黑VW326",quantity:1100,completedQty:0,process:"廠內成型-IJ01",orderStatus:"尚未上機"},className:"status-producing",content:"SP-01048-AR1-01 封蓋外(R)灌包 黑VW326"}},Qe=()=>new te([qe()].map(e=>({...e,start:m(e.timeLineStatus===n.ORDER_CREATED?e.orderInfo.actualStartTime||e.orderInfo.scheduledStartTime:e.status.startTime).toDate(),end:m(e.timeLineStatus===n.ORDER_CREATED?e.orderInfo.actualEndTime||e.orderInfo.scheduledEndTime:e.status.endTime||m(e.status.startTime).add(2,"hour")).toDate(),editable:e.timeLineStatus===n.ORDER_CREATED?{updateTime:!(e.orderInfo.actualStartTime||e.orderInfo.scheduledStartTime<m()),updateGroup:!(e.orderInfo.actualStartTime||e.orderInfo.scheduledStartTime<m()),remove:!1}:{updateTime:!1,updateGroup:!1,remove:!0}}))),Ke=()=>{const e=S.useRef(null),r=S.useMemo(Ce,[]);if(!e.current){const s=Qe();e.current=s}return{itemsDataRef:e,groups:r}};//! =============== 1. 設定與常量 ===============
//! =============== 2. 類型與介面 ===============
//! =============== 3. 核心功能 ===============
const Ze=(e,r,s,o)=>{const[d,g]=S.useState({selectedItem:null,mode:"view",isOpen:!1}),[p,u]=S.useState(!1);//! =============== 4. 工具函數 ===============
const x=a=>{if(a.timeLineStatus===n.ORDER_CREATED)return{start:m(a.orderInfo.scheduledStartTime).toDate(),end:m(a.orderInfo.scheduledEndTime).toDate()};const v=m(a.status.startTime).toDate(),E=a.status.endTime?m(a.status.endTime).toDate():m(a.status.startTime).add(2,"hour").toDate();return{start:v,end:E}},T=(a,v)=>a==="製立單"?v==="尚未上機"?{updateTime:!0,updateGroup:!0,remove:!1}:{updateTime:!1,updateGroup:!1,remove:!0}:{updateTime:!1,updateGroup:!1,remove:!0},h=S.useCallback(a=>{var v;if(r.current)try{const E=(v=a.group)==null?void 0:v.match(/[A-Z]/),w={...a,className:ye(a.timeLineStatus),...x(a),area:(E==null?void 0:E[0])||"",updateTime:!1,editable:T(a.timeLineStatus,a.orderInfo.orderStatus)},R=d.mode==="add"?"add":"update";r.current[R](w),g(H=>({...H,isOpen:!1,selectedItem:null}))}catch(E){console.error("Save item failed:",E)}},[d.mode]),b=S.useCallback(()=>{var a;if(!(!((a=d.selectedItem)!=null&&a.id)||!r.current))try{r.current.remove(d.selectedItem.id),u(!1),g(v=>({...v,selectedItem:null}))}catch(v){console.error("Delete item failed:",v)}},[d.selectedItem]),c=S.useCallback(()=>{if(e.current)try{const a=m().tz("Asia/Taipei"),v=a.add(2,"hour"),E={id:`ORDER-${Date.now()}`,group:"A1",area:"A",timeLineStatus:n.IDLE,status:{startTime:a.toDate(),endTime:v.toDate(),reason:"",product:""},orderInfo:{start:"",end:"",actualStart:null,actualEnd:null,productId:"",productName:"",quantity:0,completedQty:0,process:"",orderStatus:"尚未上機"},start:a.toDate(),end:v.toDate(),className:"status-idle",content:"新訂單"};g({selectedItem:E,mode:"add",isOpen:!0})}catch(a){console.error("Add item failed:",a)}},[]),f=S.useCallback(()=>{if(e.current)try{const a=A(s,m());e.current.setWindow(a.start.toDate(),a.end.toDate(),{animation:!0})}catch(a){console.error("Move to current time failed:",a)}},[s]),N=S.useCallback(()=>{g(a=>({...a,isOpen:!1,selectedItem:null}))},[]),W=S.useCallback(()=>u(!0),[]),C=S.useCallback(()=>u(!1),[]);return{dialogState:d,setDialogState:g,isDeleteDialogOpen:p,handleSaveItem:h,handleDeleteItem:b,handleAddItem:c,handleMoveToNow:f,closeDialog:N,openDeleteDialog:W,closeDeleteDialog:C}};//! =============== 1. 基礎配置 ===============
const I={colors:{header:"#186c98",text:"#ffffff",gridMinor:"#00bbc9",gridMajor:"#00747c",hover:"rgba(25, 118, 210, 0.05)",weekend:"rgba(25, 118, 210, 0.08)",rowAlternate:"rgba(0, 0, 0, 0.02)"},spacing:{base:"1rem",label:"2px 14px"}};//! =============== 2. 共用樣式 ===============
const Je=se`
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
`,Xe=se`
  .vis-grid {
    &.vis-minor {
      border-color: rgba(0, 0, 0, 0.05);
      border-left: 1px dashed ${I.colors.gridMinor};
    }

    &.vis-major {
      border-left: 2px solid ${I.colors.gridMajor};
    }
  }
`;//! =============== 3. 組件實現 ===============
const et=y.div`
  .vis-timeline {
    border: none;
    font-family: "Noto Sans TC", sans-serif;
    padding: ${I.spacing.base};
  }

  /* ✨ Header 樣式 */
  .vis-panel.vis-top,
  .vis-time-axis.vis-foreground {
    background-color: ${I.colors.header};
  }

  .vis-time-axis .vis-text {
    color: ${I.colors.text} !important;
  }

  /* 💡 中心區域滾動 */
  .vis-panel.vis-center {
    ${Je}
  }
`,tt=y.div`
  /* ✨ 基礎網格 */
  ${Xe}

  /* 💡 行樣式與互動 */
  .vis-panel.vis-center .vis-content {
    .vis-itemset .vis-foreground .vis-group {
      transition: background-color 0.2s ease;

      &:nth-child(odd) {
        background-color: ${I.colors.rowAlternate};
      }

      &:hover {
        background-color: ${I.colors.hover};
      }
    }
  }

  /* ✨ 週末特殊樣式 */
  .vis-time-axis .vis-grid {
    &.vis-saturday,
    &.vis-sunday {
      background-color: ${I.colors.weekend};
    }
  }

  /* 💡 標籤樣式 */
  .vis-labelset .vis-label {
    padding: ${I.spacing.label};

    /* ⚠️ 支持動態行顏色 */
    &[data-color] {
      background-color: var(--row-color);
    }
  }
`,rt=y.div`
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
`;y.div`
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
`;const st=y.div`
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
`,ot=y.div`
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
`,nt=y.div`
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
`,at=y.div`
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
`;y.div`
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
`;const it={current:"現在",time:"時間",deleteSelected:"刪除選取",editable:{add:"新增",remove:"刪除",updateTime:"調整時間",updateGroup:"調整群組"}},lt={months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),meridiem:(e,r)=>{const s=e*100+r;return s<600?"凌晨":s<900?"早上":s<1130?"上午":s<1230?"中午":s<1800?"下午":"晚上"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:(e,r)=>{let s=e===12?0:e;return["凌晨","早上","上午"].includes(r)?s:r==="中午"?s>=11?s:s+12:["下午","晚上"].includes(r)?s+12:s}},ct={orientation:"top",zoomable:!1,moveable:!0,stack:!0,stackSubgroups:!0,verticalScroll:!0,horizontalScroll:!0,showCurrentTime:!0,locale:"zh-TW",snap:null,locales:{"zh-TW":it},moment:e=>re(e).locale("zh-tw").utcOffset("+08:00")},dt={minorLabels:{millisecond:"SSS",second:"s秒",minute:"a h:mm",hour:"a h點",weekday:"M月D日",day:"D日",week:"第w週",month:"M月",year:"YYYY年"},majorLabels:{millisecond:"HH:mm:ss",second:"M月D日 a h:mm",minute:"M月D日 a h:mm",hour:"M月D日 a",weekday:"YYYY年M月",day:"YYYY年M月",week:"YYYY年M月",month:"YYYY年",year:""}},M={container:`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    padding: 4px 8x;
    width: 100%;
  `,title:`
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 2px;
  `,info:`
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.6);
  `},ut=(e,r,s)=>{var o;return`
  <div style="${M.container}">
    <div style="${M.title}">${e.content}</div>
    <div style="${M.info}">${((o=e.orderInfo)==null?void 0:o.process)??0}%</div>
  </div>
`},mt=(e,r,s)=>`
  <div style="${M.container}">
    <div style="${M.title}">${ke(e)}</div>
    <div style="${M.info}">${r} - ${s}</div>
  </div>
`,ht=e=>{var o;console.log("🚀 ~ createItemTemplate ~ item:",(o=e.orderInfo)==null?void 0:o.process);const r=m(e.start).format("HH:mm"),s=m(e.end).format("HH:mm");return e.timeLineStatus===n.ORDER_CREATED?ut(e):mt(e.timeLineStatus,r,s)};m.locale("zh-tw");re.updateLocale("zh-tw",lt);//! =============== 2. 類型與介面 ===============
//! =============== 3. 核心功能 ===============
const St=()=>{const e=S.useRef(null),r=S.useRef(null),[s,o]=S.useState("day"),{itemsDataRef:d,groups:g}=Ke(),{dialogState:p,setDialogState:u,isDeleteDialogOpen:x,handleSaveItem:T,handleDeleteItem:h,handleAddItem:b,handleMoveToNow:c,closeDialog:f,openDeleteDialog:N,closeDeleteDialog:W}=Ze(r,d,s),C=S.useCallback(()=>{const E=A(s);return{...ct,...De[s],editable:{add:!1,updateTime:!0,updateGroup:!0},onMove:function(w,R){R(w)},format:dt,start:E.start.toDate(),end:E.end.toDate(),snap:null,orientation:{axis:"top",item:"top"},margin:{item:{vertical:8}}}},[s]),a=S.useCallback(()=>{if(!e.current||!d.current||!g)return;const E={...C(),template:ht};r.current?(r.current.setOptions(E),r.current.setData({items:d.current,groups:g})):(e.current.innerHTML="",r.current=new Se(e.current,d.current,g,E))},[g,C]),v=S.useCallback(()=>{if(!r.current)return;const E=w=>{var H;if(!w.item)return;const R=(H=d.current)==null?void 0:H.get(w.item);R&&u({selectedItem:R,mode:"edit",isOpen:!0})};return r.current.on("doubleClick",E),()=>{var w;return(w=r.current)==null?void 0:w.off("doubleClick",E)}},[u]);return S.useEffect(()=>{try{a();const E=v();return()=>{E==null||E(),r.current&&(r.current.destroy(),r.current=null)}}catch(E){console.error("Timeline 操作失敗:",E)}},[a,v]),t.jsxs(ee,{sx:{p:4},children:[t.jsx(et,{children:t.jsx(tt,{children:t.jsx(st,{children:t.jsx(ot,{children:t.jsx(rt,{children:t.jsx(nt,{children:t.jsxs(at,{children:[t.jsx(Re,{timeRange:s,onTimeRangeChange:o,onAddItem:b,onMoveToNow:c}),t.jsx(de,{ref:e,elevation:1,sx:{border:1,borderColor:"grey.200",borderRadius:1}})]})})})})})})}),p.selectedItem&&t.jsx(Ve,{open:p.isOpen,onClose:f,item:p.selectedItem,mode:p.mode,onSave:T,onDelete:N,groups:g}),t.jsx(Oe,{open:x,title:"刪除確認",content:"確定要刪除這個訂單嗎？",onConfirm:h,onCancel:W,confirmText:"刪除",cancelText:"取消"})]})};export{St as default};
