import{j as t,U as B,R as y,V as le,W as b,e as N,X as ce,Y as de,Z as K,$ as Z,a0 as J,T as D,a1 as oe,a2 as H,G as l,B as ne,a3 as ue,a4 as me,O as he,Q as pe}from"./vendor-mui-BwwhWuia.js";import{r as T}from"./vendor-react-CEU0ziL0.js";import{i as xe,a as fe,b as ge,d as be,u as Te,t as je,o as M,s as f,c as _,n as X,e as ee,f as Se,C as te,g as ve,h as Ee,F as De,T as Ie}from"./zh-tw-C9cCUJm9.js";import{j as m}from"./vendor-date-C7fpNwus.js";import{D as ae}from"./vendor-charts-8wpaen7z.js";import{h as Q}from"./vendor-moment-C5S46NFB.js";import{d as k,l as ie}from"./vendor-styled-D2EzWVfU.js";//! =============== 1. 設定與常量 ===============
const we="Asia/Taipei";//! =============== 2. 初始化設定 ===============
[xe,fe,ge,be,Te,je].forEach(e=>m.extend(e));m.tz.setDefault(we);//! =============== 3. 核心功能 ===============
const P=(e,r=m())=>{const s=r,o=8,i={hour:{start:s.subtract(1,"hour"),end:s.add(1,"hour")},day:{start:s.startOf("day").hour(o),end:s.endOf("day").startOf("hour")},week:{start:s.startOf("week").hour(o),end:s.endOf("week").startOf("hour")},month:{start:s.startOf("month").hour(o),end:s.endOf("month").startOf("hour")}};return i[e]||i.day};//! =============== 4. 工具函數 ===============
const re=(e,r="YYYY-MM-DDTHH:mm")=>m(e).format(r),ye=e=>e?m(e).format("YYYY-MM-DDTHH:mm"):"",ke=`
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
  `,_e={hour:{label:"小時",getWindow:e=>P("hour",e),format:{minorLabels:{minute:"mm",hour:"HH:mm"},majorLabels:{minute:"HH:mm",hour:"MM-DD HH:mm"}}},day:{label:"天",getWindow:e=>P("day",e),format:{minorLabels:{hour:"HH:mm",day:"D日"},majorLabels:{hour:"M月D日",day:"YYYY年M月"}}},week:{label:"週",getWindow:e=>P("week",e),format:{minorLabels:{day:"DD日",week:"第w週"},majorLabels:{day:"MM月",week:"YYYY年"}}},month:{label:"月",getWindow:e=>P("month",e),format:{minorLabels:{day:"DD",month:"MM月"},majorLabels:{day:"MM月",month:"YYYY年"}}}},W={AREAS:["A","B","C","D"],MACHINES_PER_AREA:10,WORK_START_HOUR:8},n={ORDER_CREATED:"製立單",IDLE:"待機中",SETUP:"上模與調機",TESTING:"產品試模",STOPPED:"機台停機"},U={[n.ORDER_CREATED]:{name:n.ORDER_CREATED,description:"製立單模式",color:"#4caf50",className:"status-producing",canSwitch:!1,canDelete:!1,allowedTransitions:[]},[n.IDLE]:{name:n.IDLE,description:"機台空閒狀態",color:"#9e9e9e",className:"status-idle",canSwitch:!0,canDelete:!0,allowedTransitions:[n.SETUP,n.TESTING,n.STOPPED]},[n.SETUP]:{name:n.SETUP,description:"機台正在進行設定",color:"#ff9800",className:"status-setup",canSwitch:!0,canDelete:!0,allowedTransitions:[n.IDLE]},[n.TESTING]:{name:n.TESTING,description:"進行產品測試",color:"#2196f3",className:"status-testing",canSwitch:!0,canDelete:!0,allowedTransitions:[n.IDLE]},[n.STOPPED]:{name:n.STOPPED,description:"機台暫停運作",color:"#f44336",className:"status-stopped",canSwitch:!0,canDelete:!0,allowedTransitions:[n.IDLE]}},Ce=e=>{const r=U[e];return!(!r||!r.canSwitch)},Re=e=>{var r;return((r=U[e])==null?void 0:r.name)??e},Oe=e=>{var r;return((r=U[e])==null?void 0:r.className)??""},Ae=(e,r)=>({id:`${e}${r}`,content:`${e}${r}`,area:e}),q=e=>Array.from({length:W.MACHINES_PER_AREA},(r,s)=>Ae(e,s+1)),Me=()=>{const e=W.AREAS.flatMap(q);return new ae(e)},Pe=({timeRange:e,onTimeRangeChange:r,onAddItem:s,onMoveToNow:o})=>{const[i,d]=T.useState(""),[u,p]=T.useState(""),j=i?q(i):[],E=h=>{const g=h.target.value;d(g),p("")};return t.jsxs(B,{spacing:2,direction:{xs:"column",sm:"row"},justifyContent:"space-between",alignItems:"center",mb:2,children:[t.jsx(B,{direction:"row",spacing:1,children:Object.entries(_e).map(([h,{label:g}])=>t.jsx(y,{startIcon:t.jsx(le,{}),variant:e===h?"contained":"outlined",onClick:()=>r(h),sx:{mr:1,color:e===h?"white":"inherit",borderColor:e===h?"primary.main":"grey.300"},children:g},h))}),t.jsxs(B,{direction:"row",spacing:2,children:[t.jsx(b,{select:!0,label:"區域",value:i,onChange:E,sx:{width:100},size:"small",children:W.AREAS.map(h=>t.jsx(N,{value:h,children:h},h))}),t.jsx(b,{select:!0,label:"機台",value:u,onChange:h=>p(h.target.value),sx:{width:100},size:"small",disabled:!i,children:j.map(h=>t.jsx(N,{value:h.id,children:h.content},h.id))}),t.jsx(y,{startIcon:t.jsx(ce,{}),onClick:s,variant:"outlined",children:"新增"}),t.jsx(y,{startIcon:t.jsx(de,{}),onClick:o,variant:"outlined",children:"現在"})]})]})},Le=({open:e,title:r,content:s,onConfirm:o,onCancel:i,confirmText:d="確認",cancelText:u="取消"})=>t.jsxs(K,{open:e,onClose:i,maxWidth:"sm",fullWidth:!0,children:[t.jsx(Z,{children:r}),t.jsx(J,{children:t.jsx(D,{children:s})}),t.jsxs(oe,{children:[t.jsx(y,{onClick:i,children:u}),t.jsx(y,{onClick:o,variant:"contained",color:"primary",children:d})]})]}),Ne={start:f().min(1,"開始時間為必填").transform(e=>m(e).toDate()).refine(e=>m(e).isValid(),"時間格式錯誤"),end:f().min(1,"結束時間為必填").transform(e=>m(e).toDate()).refine(e=>m(e).isValid(),"時間格式錯誤")},We=M({group:f().min(1,"機台編號為必填"),area:f().min(1,"區域為必填"),actualStartTime:_(ee()),actualEndTime:_(ee()),productId:_(f()),productName:_(f()),quantity:_(X()),completedQty:_(X()),process:_(f()),orderStatus:_(f()),...Ne}).refine(e=>{console.log("🚀 ~ data:",e);const r=m();return m(e.end).isAfter(r)},{message:"結束時間不能早於現在",path:["end"]}).refine(e=>{const r=m(e.start);return m(e.end).isAfter(r)},{message:"結束時間必須晚於開始時間",path:["end"]}).refine(e=>{const r=m(e.start);return m(e.end).diff(r,"hour")>=4},{message:"排程時間至少需要 4 小時",path:["end"]}),Ye={[n.ORDER_CREATED]:We,[n.IDLE]:M({start:f().min(1,"開始時間為必填"),end:f().optional(),area:f().min(1,"區域為必填"),group:f().min(1,"機台編號為必填")}),[n.SETUP]:M({start:f().min(1,"開始時間為必填"),end:f().optional(),area:f().min(1,"區域為必填"),group:f().min(1,"機台編號為必填"),setupInfo:f().optional(),className:f().optional(),reason:f().optional()}),[n.TESTING]:M({product:f().optional(),start:f().min(1,"開始時間為必填"),end:f().optional(),area:f().min(1,"區域為必填"),group:f().min(1,"機台編號為必填"),className:f().optional()}),[n.STOPPED]:M({product:f().optional(),start:f().min(1,"開始時間為必填"),end:f().optional(),area:f().min(1,"區域為必填"),group:f().min(1,"機台編號為必填"),className:f().optional(),reason:f().min(2,"停機原因至少需要2個字").max(50,"停機原因不能超過50個字")})},A=e=>Ye[e]||M({}),C={defaultValues:{start:re(m()),end:re(m().add(2,"hour"))},timePickerProps:{type:"datetime-local",InputLabelProps:{shrink:!0},inputProps:{step:300}}},V={group:{required:"請選擇機台"},area:{required:"請選擇區域"}},ze={[n.ORDER_CREATED]:{name:"製立單表單",schema:A(n.ORDER_CREATED),defaultValues:{group:"",start:"",end:""}},[n.IDLE]:{name:"待機表單",schema:A(n.IDLE),defaultValues:{startTime:m().toDate(),endTime:m().add(2,"hour").toDate(),group:"",area:""}},[n.SETUP]:{name:"上模與調機表單",schema:A(n.SETUP),defaultValues:{startTime:"",setupInfo:""}},[n.TESTING]:{name:"產品試模表單",schema:A(n.TESTING),defaultValues:{startTime:"",product:""}},[n.STOPPED]:{name:"機台停機表單",schema:A(n.STOPPED),defaultValues:{startTime:"",reason:""}}},F={basic:["status","id","group","area","timeLineStatus"],order:["productName","process","quantity","completedQty","scheduledStartTime","scheduledEndTime","orderStatus"],time:["start","end"],status:["startTime","endTime","reason","product"]},$=(e,r)=>{console.log("🚀 ~ useStatusForm ~ item:",r);const s=Se(),{register:o,setValue:i,watch:d,control:u,formState:{errors:p}}=s,j=T.useRef(!1);T.useEffect(()=>{if(!r||j.current)return;const h={...F.basic.reduce((g,c)=>({...g,[c]:c==="status"?e:r[c]}),{}),...F.order.reduce((g,c)=>{var x;return{...g,[c]:(x=r.orderInfo)==null?void 0:x[c]}},{}),...F.time.reduce((g,c)=>({...g,[c]:ye(r[c])}),{}),...F.status.reduce((g,c)=>{var x;return{...g,[c]:(x=r.status)==null?void 0:x[c]}},{})};console.log("🚀 ~ useEffect ~ updates:",h),Object.entries(h).forEach(([g,c])=>{c!==void 0&&i(g,c,{shouldValidate:!0,shouldDirty:!1})}),j.current=!0},[r,i,e]);const E=j.current;return{register:o,watch:d,errors:p,control:u,setValue:i,initialized:E,getFieldValue:d,isFieldError:h=>!!p[h]}},He=({item:e,disabled:r})=>{var E,h,g;const{register:s,errors:o,watch:i,control:d,initialized:u}=$(n.ORDER_CREATED,e),p=i("area"),j=p?q(p):[];return u?!(e!=null&&e.id)||!(e!=null&&e.orderInfo)||!(e!=null&&e.status)?null:t.jsxs(l,{container:!0,spacing:3,children:[t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"基本資訊"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(b,{fullWidth:!0,...s("id"),label:"製令單號",value:e.id,disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(b,{fullWidth:!0,...s("productName"),label:"產品名稱",value:e.orderInfo.productName,disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(b,{fullWidth:!0,...s("process"),label:"製程名稱",value:e.orderInfo.process,disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("area",V.area),select:!0,label:"區域",error:!!o.area,helperText:(E=o.area)==null?void 0:E.message,disabled:r,value:i("area")||"",children:W.AREAS.map(c=>t.jsx(N,{value:c,children:c},c))})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("group",V.group),select:!0,label:"機台編號",error:!!o.group,helperText:(h=o.group)==null?void 0:h.message,disabled:r||!p,value:i("group")||((g=j[0])==null?void 0:g.id)||"",children:j.map(c=>t.jsx(N,{value:c.id,children:c.content},c.id))})})]})]}),t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"生產數量"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(b,{fullWidth:!0,...s("quantity"),label:"製令數量",value:e.orderInfo.quantity,disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(b,{fullWidth:!0,...s("completedQty"),label:"已完成數量",value:e.orderInfo.completedQty,disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:4,children:t.jsx(b,{fullWidth:!0,label:"完成率",value:`${e.orderInfo.completedQty}/${e.orderInfo.quantity}`,disabled:!0})})]})]}),t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"時程安排"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(te,{name:"start",control:d,render:({field:c,fieldState:{error:x}})=>t.jsx(b,{...c,fullWidth:!0,label:"預計上機日",type:"datetime-local",error:!!x,helperText:(x==null?void 0:x.message)||"",disabled:r,InputLabelProps:{shrink:!0}})})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(te,{name:"end",control:d,render:({field:c,fieldState:{error:x}})=>t.jsx(b,{...c,fullWidth:!0,label:"預計完成日",type:"datetime-local",error:!!x,helperText:(x==null?void 0:x.message)||"",disabled:r,InputLabelProps:{shrink:!0}})})})]})]}),t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"生產狀態"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,label:"實際上機日",value:e.status.startTime?new Date(e.status.startTime).toLocaleDateString():"",disabled:!0})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,label:"延遲完成日",value:"",disabled:!0})}),t.jsx(l,{item:!0,xs:12,children:t.jsx(b,{fullWidth:!0,label:"狀態",value:e.orderInfo.orderStatus,disabled:!0})})]})]})]}):t.jsx(H,{})},$e=({disabled:e,item:r})=>{var j,E,h,g,c;const{register:s,errors:o,watch:i,initialized:d}=$(n.IDLE,r),u=i("area"),p=T.useMemo(()=>u?q(u):[],[u]);return d?r?t.jsxs(l,{container:!0,spacing:3,children:[t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"機台選擇"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("area",V.area),select:!0,label:"區域",error:!!o.area,helperText:(j=o.area)==null?void 0:j.message,disabled:e,value:u||"",children:W.AREAS.map(x=>t.jsx(N,{value:x,children:x},x))})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("group",V.group),select:!0,label:"機台編號",error:!!o.group,helperText:(E=o.group)==null?void 0:E.message,disabled:e||!(r!=null&&r.area),value:i("group")||((h=p[0])==null?void 0:h.id)||"",children:p.map(x=>t.jsx(N,{value:x.id,children:x.content},x.id))})})]})]}),t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"時程安排"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("start"),...C.timePickerProps,label:"開始時間",error:!!o.start,helperText:(g=o.start)==null?void 0:g.message,disabled:e})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("end"),...C.timePickerProps,label:"結束時間",error:!!o.end,helperText:(c=o.end)==null?void 0:c.message,disabled:e})})]})]})]}):null:t.jsx(H,{})},Ge=({disabled:e,item:r})=>{var d,u,p;console.log("🚀 ~ Setup ~ item:",r);const{register:s,errors:o,initialized:i}=$(n.SETUP,r);return!r||!i?t.jsx(H,{}):t.jsxs(l,{container:!0,spacing:2,children:[t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"時程安排"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("start"),...C.timePickerProps,label:"開始時間",error:!!o.start,helperText:(d=o.start)==null?void 0:d.message,disabled:e})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("end"),...C.timePickerProps,label:"結束時間",error:!!o.end,helperText:(u=o.end)==null?void 0:u.message,disabled:e})})]})]}),t.jsxs(l,{item:!0,xs:12,sm:6,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0}),t.jsx(b,{fullWidth:!0,...s("reason"),label:"調機說明",multiline:!0,rows:2,error:!!o.reason,helperText:(p=o.reason)==null?void 0:p.message,disabled:e})]})]})},Fe=({disabled:e,item:r})=>{var i,d,u;const{register:s,errors:o}=$(n.TESTING,r);return t.jsxs(l,{container:!0,spacing:1,children:[t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"時程安排"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("start"),...C.timePickerProps,label:"開始時間",error:!!o.start,helperText:(i=o.start)==null?void 0:i.message,disabled:e})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("end"),...C.timePickerProps,label:"結束時間",error:!!o.end,helperText:(d=o.end)==null?void 0:d.message,disabled:e})})]})]}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("product"),label:"測試產品",error:!!o.product,helperText:(u=o.product)==null?void 0:u.message,disabled:e})})]})},Be=({disabled:e,item:r})=>{var i,d,u;const{register:s,errors:o}=$(n.STOPPED,r);return t.jsxs(l,{container:!0,spacing:2,children:[t.jsxs(l,{item:!0,xs:12,children:[t.jsx(D,{variant:"subtitle1",color:"primary",gutterBottom:!0,children:"時程安排"}),t.jsxs(l,{container:!0,spacing:2,children:[t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("start"),...C.timePickerProps,label:"開始時間",error:!!o.start,helperText:(i=o.start)==null?void 0:i.message,disabled:e})}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("end"),...C.timePickerProps,label:"結束時間",error:!!o.end,helperText:(d=o.end)==null?void 0:d.message,disabled:e})})]})]}),t.jsx(l,{item:!0,xs:12,sm:6,children:t.jsx(b,{fullWidth:!0,...s("reason"),label:"停機原因",error:!!o.reason,helperText:(u=o.reason)==null?void 0:u.message,required:!0,disabled:e})})]})},Ve=({status:e,item:r,disabled:s,onSubmit:o,mode:i,isSubmitting:d,onClose:u,groups:p})=>{const j=ze[e],{handleSubmit:E,...h}=ve({defaultValues:{...j.defaultValues,...r==null?void 0:r.status},resolver:Ee(A(e))}),g={[n.ORDER_CREATED]:He,[n.IDLE]:$e,[n.SETUP]:Ge,[n.TESTING]:Fe,[n.STOPPED]:Be}[e],c=x=>{console.log("Form submitted:",x),o(x)};return g?t.jsx(De,{...h,children:t.jsxs("form",{id:"status-form",onSubmit:E(c),children:[t.jsx(g,{disabled:s,item:r,groups:p}),t.jsxs(oe,{children:[t.jsx(y,{onClick:u,disabled:d,children:"取消"}),i!=="view"&&t.jsx(y,{type:"submit",variant:"contained",disabled:d,startIcon:d?t.jsx(H,{size:20}):null,children:"確認"})]})]})}):null},Ue=T.memo(Ve),qe=({open:e,onClose:r,currentStatus:s,onStatusChange:o,disabled:i,mode:d})=>{const u=()=>s===n.ORDER_CREATED?[]:d==="add"?Object.values(n).filter(p=>p!==n.ORDER_CREATED&&p!==s):s===n.IDLE?Object.values(n).filter(p=>p!==n.IDLE&&p!==n.ORDER_CREATED):[n.IDLE];return t.jsxs(K,{open:e,onClose:i?void 0:r,maxWidth:"xs",fullWidth:!0,disableEscapeKeyDown:i,children:[t.jsx(Z,{children:"切換狀態"}),t.jsx(J,{children:t.jsx(B,{spacing:2,sx:{mt:2},children:u().map(p=>{const j=U[p];return t.jsxs(y,{variant:"outlined",onClick:()=>{o(p),r()},disabled:i,sx:{borderColor:j.color,color:j.color,"&:hover":{borderColor:j.color,backgroundColor:`${j.color}10`}},children:["切換至",j.name]},p)})})})]})},se=e=>{var r;return e.name==="ZodError"?((r=e.errors[0])==null?void 0:r.message)||"表單驗證錯誤":e.name==="StatusError"?e.message:"操作失敗，請稍後再試"};class Qe extends Error{constructor(r){super(r),this.name="StatusError"}}//! =============== 2. 類型與介面 ===============
//! =============== 3. 核心功能 ===============
const Ke=({open:e,onClose:r,item:s,mode:o="view",onSave:i,groups:d})=>{const[u,p]=T.useState((s==null?void 0:s.timeLineStatus)||n.IDLE),[j,E]=T.useState(!1),[h,g]=T.useState(null),[c,x]=T.useState(!1),Y=a=>{try{if(o!=="add"&&!Ce(u,a))throw new Qe("無法切換到此狀態");p(a),E(!1)}catch(S){g(se(S))}},z=async a=>{if(!c)try{x(!0),console.log("Submitting form data:",a);const S={...s,group:a.group||"",area:a.area||"",start:a.start||null,end:a.end||null,timeLineStatus:a.timeLineStatus||u,status:{...s.status,product:a.product||"",reason:a.reason||"",startTime:a.start||null,endTime:a.end||null},orderInfo:{...s.orderInfo,productName:a.productName||"",process:a.process||"",scheduledStartTime:a.start||null,scheduledEndTime:a.end||null,actualStartTime:a.start||null,actualEndTime:a.end||null}};console.log("Updated item:",S),await i(S),r()}catch(S){console.error("Submit error:",S),g(se(S))}finally{x(!1)}};//! =============== 4. 工具函數 ===============
const R=()=>{if(c)return"處理中...";switch(o){case"add":return"新增狀態";case"edit":return"編輯狀態";default:return"檢視狀態"}};return s?t.jsxs(t.Fragment,{children:[t.jsxs(K,{open:e,onClose:c?void 0:r,maxWidth:"md",fullWidth:!0,disableEscapeKeyDown:c,keepMounted:!1,"aria-labelledby":"item-dialog-title",children:[t.jsxs(Z,{id:"item-dialog-title",children:[R(),c&&t.jsx(H,{size:20,sx:{ml:1}})]}),t.jsxs(J,{children:[t.jsx(ne,{display:"flex",alignItems:"center",gap:1,sx:{mb:2},children:o!=="add"&&u!==n.ORDER_CREATED?t.jsx(t.Fragment,{children:t.jsx(y,{variant:"contained",color:"primary",onClick:()=>E(!0),disabled:c||o==="view",startIcon:t.jsx(ue,{}),children:u})}):t.jsxs(D,{variant:"subtitle1",children:["當前狀態：",u]})}),t.jsx(Ue,{status:u,item:s,onSubmit:z,mode:o,isSubmitting:c,onClose:r,groups:d,disabled:o==="view"||c||o!=="add"&&(s.start<m()||s.orderInfo.scheduledStartTime<m())})]})]}),t.jsx(qe,{open:j,onClose:()=>E(!1),currentStatus:u,onStatusChange:Y,disabled:c,mode:o}),t.jsx(me,{open:!!h,autoHideDuration:3e3,onClose:()=>g(null),children:t.jsx(he,{severity:"error",children:h})})]}):null},Ze=(e=new Date)=>m(e).hour(W.WORK_START_HOUR).minute(0).second(0).millisecond(0).toDate(),Je=(e=Ze())=>{const r=m(e);return{id:"202408160004",group:"C1",area:"C",timeLineStatus:"製立單",status:{startTime:r.toDate(),endTime:null,reason:"",product:""},orderInfo:{scheduledStartTime:r.toDate(),scheduledEndTime:r.add(4,"hour").toDate(),actualStartTime:null,actualEndTime:null,productId:"SP-01048-AR1-01",productName:"封蓋外(R)灌包 黑VW326",quantity:1100,completedQty:0,process:"廠內成型-IJ01",orderStatus:"尚未上機"},className:"status-producing",content:"SP-01048-AR1-01 封蓋外(R)灌包 黑VW326"}},Xe=()=>new ae([Je()].map(e=>({...e,start:m(e.timeLineStatus===n.ORDER_CREATED?e.orderInfo.actualStartTime||e.orderInfo.scheduledStartTime:e.status.startTime).toDate(),end:m(e.timeLineStatus===n.ORDER_CREATED?e.orderInfo.actualEndTime||e.orderInfo.scheduledEndTime:e.status.endTime||m(e.status.startTime).add(2,"hour")).toDate(),editable:e.timeLineStatus===n.ORDER_CREATED?{updateTime:!(e.orderInfo.actualStartTime||e.orderInfo.scheduledStartTime<m()),updateGroup:!(e.orderInfo.actualStartTime||e.orderInfo.scheduledStartTime<m()),remove:!1}:{updateTime:!1,updateGroup:!1,remove:!0}}))),et=()=>{const e=T.useRef(null),r=T.useMemo(Me,[]);if(!e.current){const s=Xe();e.current=s}return{itemsDataRef:e,groups:r}};//! =============== 1. 設定與常量 ===============
//! =============== 2. 類型與介面 ===============
//! =============== 3. 核心功能 ===============
const tt=(e,r,s,o)=>{const[i,d]=T.useState({selectedItem:null,mode:"view",isOpen:!1}),[u,p]=T.useState(!1);//! =============== 4. 工具函數 ===============
const j=a=>{if(a.timeLineStatus===n.ORDER_CREATED)return{start:m(a.orderInfo.scheduledStartTime).toDate(),end:m(a.orderInfo.scheduledEndTime).toDate()};const S=m(a.status.startTime).toDate(),v=a.status.endTime?m(a.status.endTime).toDate():m(a.status.startTime).add(2,"hour").toDate();return{start:S,end:v}},E=(a,S)=>a==="製立單"?S==="尚未上機"?{updateTime:!0,updateGroup:!0,remove:!1}:{updateTime:!1,updateGroup:!1,remove:!0}:{updateTime:!1,updateGroup:!1,remove:!0},h=T.useCallback(a=>{var S;if(r.current)try{const v=(S=a.group)==null?void 0:S.match(/[A-Z]/),I={...a,className:Oe(a.timeLineStatus),...j(a),area:(v==null?void 0:v[0])||"",updateTime:!1,editable:E(a.timeLineStatus,a.orderInfo.orderStatus)},O=i.mode==="add"?"add":"update";r.current[O](I),d(G=>({...G,isOpen:!1,selectedItem:null}))}catch(v){console.error("Save item failed:",v)}},[i.mode]),g=T.useCallback(()=>{var a;if(!(!((a=i.selectedItem)!=null&&a.id)||!r.current))try{r.current.remove(i.selectedItem.id),p(!1),d(S=>({...S,selectedItem:null}))}catch(S){console.error("Delete item failed:",S)}},[i.selectedItem]),c=T.useCallback(()=>{if(e.current)try{const a=m().tz("Asia/Taipei"),S=a.add(2,"hour"),v={id:`ORDER-${Date.now()}`,group:"A1",area:"A",timeLineStatus:n.IDLE,status:{startTime:a.toDate(),endTime:S.toDate(),reason:"",product:""},orderInfo:{start:"",end:"",actualStart:null,actualEnd:null,productId:"",productName:"",quantity:0,completedQty:0,process:"",orderStatus:"尚未上機"},start:a.toDate(),end:S.toDate(),className:"status-idle",content:"新訂單"};d({selectedItem:v,mode:"add",isOpen:!0})}catch(a){console.error("Add item failed:",a)}},[]),x=T.useCallback(()=>{if(e.current)try{const a=P(s,m());e.current.setWindow(a.start.toDate(),a.end.toDate(),{animation:!0})}catch(a){console.error("Move to current time failed:",a)}},[s]),Y=T.useCallback(()=>{d(a=>({...a,isOpen:!1,selectedItem:null}))},[]),z=T.useCallback(()=>p(!0),[]),R=T.useCallback(()=>p(!1),[]);return{dialogState:i,setDialogState:d,isDeleteDialogOpen:u,handleSaveItem:h,handleDeleteItem:g,handleAddItem:c,handleMoveToNow:x,closeDialog:Y,openDeleteDialog:z,closeDeleteDialog:R}};//! =============== 1. 基礎配置 ===============
const w={colors:{header:"#186c98",text:"#ffffff",gridMinor:"#00bbc9",gridMajor:"#00747c",hover:"rgba(25, 118, 210, 0.05)",weekend:"rgba(25, 118, 210, 0.08)",rowAlternate:"rgba(0, 0, 0, 0.02)"},spacing:{base:"1rem",label:"2px 14px"}};//! =============== 2. 共用樣式 ===============
const rt=ie`
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
`,st=ie`
  .vis-grid {
    &.vis-minor {
      border-color: rgba(0, 0, 0, 0.05);
      border-left: 1px dashed ${w.colors.gridMinor};
    }

    &.vis-major {
      border-left: 2px solid ${w.colors.gridMajor};
    }
  }
`;//! =============== 3. 組件實現 ===============
const ot=k.div`
  .vis-timeline {
    border: none;
    font-family: "Noto Sans TC", sans-serif;
    padding: ${w.spacing.base};
  }

  /* ✨ Header 樣式 */
  .vis-panel.vis-top,
  .vis-time-axis.vis-foreground {
    background-color: ${w.colors.header};
  }

  .vis-time-axis .vis-text {
    color: ${w.colors.text} !important;
  }

  /* 💡 中心區域滾動 */
  .vis-panel.vis-center {
    ${rt}
  }
`,nt=k.div`
  /* ✨ 基礎網格 */
  ${st}

  /* 💡 行樣式與互動 */
  .vis-panel.vis-center .vis-content {
    .vis-itemset .vis-foreground .vis-group {
      transition: background-color 0.2s ease;

      &:nth-child(odd) {
        background-color: ${w.colors.rowAlternate};
      }

      &:hover {
        background-color: ${w.colors.hover};
      }
    }
  }

  /* ✨ 週末特殊樣式 */
  .vis-time-axis .vis-grid {
    &.vis-saturday,
    &.vis-sunday {
      background-color: ${w.colors.weekend};
    }
  }

  /* 💡 標籤樣式 */
  .vis-labelset .vis-label {
    padding: ${w.spacing.label};

    /* ⚠️ 支持動態行顏色 */
    &[data-color] {
      background-color: var(--row-color);
    }
  }
`,at=k.div`
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
`;k.div`
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
`;const it=k.div`
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
`,lt=k.div`
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
`,ct=k.div`
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
`,dt=k.div`
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
`;k.div`
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
`;const ut={current:"現在",time:"時間",deleteSelected:"刪除選取",editable:{add:"新增",remove:"刪除",updateTime:"調整時間",updateGroup:"調整群組"}},mt={months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),meridiem:(e,r)=>{const s=e*100+r;return s<600?"凌晨":s<900?"早上":s<1130?"上午":s<1230?"中午":s<1800?"下午":"晚上"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:(e,r)=>{let s=e===12?0:e;return["凌晨","早上","上午"].includes(r)?s:r==="中午"?s>=11?s:s+12:["下午","晚上"].includes(r)?s+12:s}},ht={orientation:"top",zoomable:!1,moveable:!0,stack:!0,stackSubgroups:!0,verticalScroll:!0,horizontalScroll:!0,showCurrentTime:!0,locale:"zh-TW",snap:null,locales:{"zh-TW":ut},moment:e=>Q(e).locale("zh-tw").utcOffset("+08:00")},pt={minorLabels:{millisecond:"SSS",second:"s秒",minute:"a h:mm",hour:"a h點",weekday:"M月D日",day:"D日",week:"第w週",month:"M月",year:"YYYY年"},majorLabels:{millisecond:"HH:mm:ss",second:"M月D日 a h:mm",minute:"M月D日 a h:mm",hour:"M月D日 a",weekday:"YYYY年M月",day:"YYYY年M月",week:"YYYY年M月",month:"YYYY年",year:""}},L={container:`
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
  `},xt=(e,r,s)=>{var o;return`
  <div style="${L.container}">
    <div style="${L.title}">${e.content}</div>
    <div style="${L.info}">${((o=e.orderInfo)==null?void 0:o.process)??0}%</div>
  </div>
`},ft=(e,r,s)=>`
  <div style="${L.container}">
    <div style="${L.title}">${Re(e)}</div>
    <div style="${L.info}">${r} - ${s}</div>
  </div>
`,gt=e=>{var o;console.log("🚀 ~ createItemTemplate ~ item:",(o=e.orderInfo)==null?void 0:o.process);const r=m(e.start).format("HH:mm"),s=m(e.end).format("HH:mm");return e.timeLineStatus===n.ORDER_CREATED?xt(e):ft(e.timeLineStatus,r,s)};m.locale("zh-tw");Q&&Q.updateLocale("zh-tw",mt);//! =============== 2. 類型與介面 ===============
//! =============== 3. 核心功能 ===============
const It=()=>{const e=T.useRef(null),r=T.useRef(null),[s,o]=T.useState("day"),{itemsDataRef:i,groups:d}=et(),{dialogState:u,setDialogState:p,isDeleteDialogOpen:j,handleSaveItem:E,handleDeleteItem:h,handleAddItem:g,handleMoveToNow:c,closeDialog:x,openDeleteDialog:Y,closeDeleteDialog:z}=tt(r,i,s),R=T.useCallback(()=>{const v=P(s);return{...ht,...ke[s],editable:{add:!1,updateTime:!0,updateGroup:!0},onMove:function(I,O){O(I)},format:pt,start:v.start.toDate(),end:v.end.toDate(),snap:null,orientation:{axis:"top",item:"top"},margin:{item:{vertical:8}}}},[s]),a=T.useCallback(()=>{if(!e.current||!i.current||!d)return;const v={...R(),template:gt};r.current?(r.current.setOptions(v),r.current.setData({items:i.current,groups:d})):(e.current.innerHTML="",r.current=new Ie(e.current,i.current,d,v))},[d,R]),S=T.useCallback(()=>{if(!r.current)return;const v=I=>{var G;if(!I.item)return;const O=(G=i.current)==null?void 0:G.get(I.item);O&&p({selectedItem:O,mode:"edit",isOpen:!0})};return r.current.on("doubleClick",v),()=>{var I;return(I=r.current)==null?void 0:I.off("doubleClick",v)}},[p]);return T.useEffect(()=>{try{a();const v=S();return()=>{v==null||v(),r.current&&(r.current.destroy(),r.current=null)}}catch(v){console.error("Timeline 操作失敗:",v)}},[a,S]),t.jsxs(ne,{sx:{p:4},children:[t.jsx(ot,{children:t.jsx(nt,{children:t.jsx(it,{children:t.jsx(lt,{children:t.jsx(at,{children:t.jsx(ct,{children:t.jsxs(dt,{children:[t.jsx(Pe,{timeRange:s,onTimeRangeChange:o,onAddItem:g,onMoveToNow:c}),t.jsx(pe,{ref:e,elevation:1,sx:{border:1,borderColor:"grey.200",borderRadius:1}})]})})})})})})}),u.selectedItem&&t.jsx(Ke,{open:u.isOpen,onClose:x,item:u.selectedItem,mode:u.mode,onSave:E,onDelete:Y,groups:d}),t.jsx(Le,{open:j,title:"刪除確認",content:"確定要刪除這個訂單嗎？",onConfirm:h,onCancel:z,confirmText:"刪除",cancelText:"取消"})]})};export{It as default};
