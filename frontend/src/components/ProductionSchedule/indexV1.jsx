import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  Select,
  Form,
  Input,
  Button,
  message,
  Modal,
  Tooltip,
  AutoComplete,
} from "antd";
import { Resizable } from "react-resizable";
import FilterBar from "../ProductionReport/FilterBar";
import { WORKORDER_STATUS } from "../../config/enum";
import {
  PRODUCTION_AREA,
  MACHINE_LIST,
  REACT_APP_LY_ERP_ON,
  PROCESS_CATEGORY_OPTION,
} from "../../config/config";
import {
  useGetProductionScheduleQuery,
  useGetWorkOrderSNsQuery,
  useGetProductionScheduleThroughLYQuery,
  useCancelStausMutation,
  useAddProductionScheduleMutation,
  useUpdateProductionScheduleMutation,
} from "../../store/api/productionScheduleApi";
import "./index.scss";
import { saveAs } from "file-saver";
import Exceljs from "exceljs";
import ExcelExample from "../../assets/ExcelExample.xlsx";
import { debounce } from "lodash"; // 引入 lodash 的 debounce 函數
import { TZ } from "../../config/config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useGetProcessesAndMaterialsQuery } from "../ProductionRecord/service/endpoints/processApi";

import { useRendersCount } from "react-use";

dayjs.extend(utc);
dayjs.extend(timezone);

/*
ProductionSchedule (Main Component)
│
├── **Imports**
│   ├── React
│   ├── React Router (`useNavigate`)
│   ├── Ant Design Components (`Table`, `Select`, `Form`, `Input`, `Button`, `Modal`, `Tooltip`, `AutoComplete`)
│   ├── FontAwesome Icons (`faPlus`, `faTrashCan`)
│   ├── Utilities (`Resizable`, `debounce`, `saveAs`, `Exceljs`, `dayjs`)
│   ├── API Hooks (`useGetProductionScheduleQuery`, `useGetWorkOrderSNsQuery`, `useUpdateProductionScheduleMutation`, etc.)
│   └── Config and Constants (`WORKORDER_STATUS`, `PRODUCTION_AREA`, `MACHINE_LIST`, `TZ`)
│
├── **Components**
│   ├── **Reusable Components**
│   │   ├── ResizableTitle (Handles resizable table columns)
│   │   ├── EditableContext (React Context for editable cells)
│   │   ├── EditableRow (Table row wrapped with Form and Context Provider)
│   │   └── EditableCell (Editable table cell, handles input and save logic)
│   │
│   └── **External Components**
│       └── FilterBar (Used for search and filtering controls)
│
├── **State Management** (Local state using React hooks)
│   ├── Pagination (`pagination`, `setPagination`)
│   ├── Data (`dataSource`, `setDataSource`)
│   ├── Filters and Search (`startDate`, `endDate`, `statusState`, `expiryState`, `keywordTypeState`, `keywordState`)
│   ├── Loading States (`loading`)
│   └── Miscellaneous (`workOrderSNsFromLYState`, `totalCurrent`, `needExportData`)
│
├── **API Data Fetching and Mutations** (RTK Query hooks)
│   ├── useGetProductionScheduleQuery (Fetches production schedule data)
│   ├── useGetWorkOrderSNsQuery (Fetches work order serial numbers)
│   ├── useGetProductionScheduleThroughLYQuery (Fetches production schedule data through LY)
│   ├── useCancelStausMutation (Mutation for cancelling status)
│   ├── useAddProductionScheduleMutation (Mutation for adding production schedules)
│   └── useUpdateProductionScheduleMutation (Mutation for updating production schedules)
│
├── **Helper Functions**
│   ├── handleSave (Handles saving of edited table rows)
│   ├── handleAdd (Handles addition of new work orders)
│   ├── deleteChecked (Handles deletion of selected table rows)
│   ├── handleProductionAreaChange (Updates production area and related fields)
│   ├── handleMachineSNChange (Updates machine serial number and related fields)
│   ├── handleSingleOrDoubleColorChange (Updates single or double color selection)
│   ├── exportToExcel (Handles export of table data to Excel format)
│   └── queryFromLY (Handles fetching data from external LY ERP system)
│
└── **Render Logic**
    ├── Table (Main data table with editable cells, sorting, filtering, and pagination)
    ├── FilterBar (Search and filter controls)
    ├── Action Buttons
    │   ├── Add Button (Adds a new work order)
    │   ├── Delete Button (Deletes selected rows)
    │   ├── Export Button (Exports data to Excel)
    │   └── Import Button (Navigates to import page)
    └── Conditional Rendering (Displays loading state, table, and buttons based on data and state)


*/

// 表格可調整欄位寬度
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

/*--------------------------------------------------  global / Context   start ------------------------------------------------------*/
/* EditableContext :: EditablerProvider
 *  EditableRow -> HTML::tr th td
 */
// 表單編輯設置
const EditableContext = React.createContext(null);

const EditableRow = ({ id, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

/*--------------------------------------------------  global / Context  end ------------------------------------------------------*/

/*--------------------------------------------------  global / useContext  start ------------------------------------------------------*/
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  rule,
  type,
  record,
  handleSave,
  queryFromLY,
  workOrderSNsFromLYState,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const queryFromLYandSave = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      queryFromLY({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("queryFromLYandSave failed:", errInfo);
    }
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      dataIndex === "workOrderSN" && REACT_APP_LY_ERP_ON === true ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[rule]}
        >
          <AutoComplete
            ref={inputRef}
            defaultValue={record[dataIndex]}
            onBlur={queryFromLYandSave}
            style={{ width: 140 }}
            options={workOrderSNsFromLYState}
            placeholder="輸入製令單號"
            filterOption={(inputValue, option) =>
              option.value.indexOf(inputValue) !== -1
            }
          />
        </Form.Item>
      ) : (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[rule]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} type={type} />
        </Form.Item>
      )
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

/*--------------------------------------------------  global / useContext  end ------------------------------------------------------*/
//  TODO: Add more form controls and logic for editing production  schedule
function ScheduleProcessNameOptions({ source }) {
  // parameter deconstruct
  const { Option } = Select;
  const { productId, id, processName } = source || {};

  // * Api
  const [UpdateProductionSchedule] = useUpdateProductionScheduleMutation();

  const { data: processCategory } = useGetProcessesAndMaterialsQuery(
    {
      productId: productId,
      processCategory: PROCESS_CATEGORY_OPTION[0].category,
    },
    { skip: !productId }
  );

  // * Handle Select Change
  const handleSelectChange = async (value) => {
    if (!id) return;
    try {
      // Send a request to the server to update the data
      const response = await UpdateProductionSchedule({
        id,
        data: { processId: value },
      });
      !response.error
        ? message.success("修改數據成功")
        : message.error("修改數據失敗");
    } catch (error) {
      message.error("更新過程中出現錯誤");
    }
  };

  return (
    <Select
      defaultValue={processName || ""}
      value={processName || ""}
      style={{ width: 200, background: "none", borderColor: "#1677ff" }}
      onChange={(value, label) => handleSelectChange(value, label)}
    >
      {processCategory?.data?.map((item, index) => (
        <Option key={index} value={item.id} label={item.processName}>
          {item.processName}
        </Option>
      ))}
      ,
    </Select>
  );
}

const ProductionSchedule = (props) => {
  const navigate = useNavigate();
  const { Option } = Select;

  const rendersCount = useRendersCount();

  //! New Add :  Fetch processCategory data using RTK Query hook

  /*--------------------------------------------------  ant ui -> table -> Column   start ------------------------------------------------------*/
  /*
* ant ui ->  table ->  same API Column  

*  defaultColumns :: [] 

* defaultColumns ::[category] -> category:: {}

{} :
* render :: function (插入自訂義元素) 
  - Tooltip :  當寬度不足時文字將會縮行... , 使用 Tooltip ， hover 顯示全文 
  - Select : 下拉選單

* Rule : ant ui ->  form -> Rule 

*/

  const [defaultColumns, setDefaultColumns] = useState([
    {
      title: "編號 ",
      dataIndex: "id",
      width: 30,
      fixed: true,
      editable: false,
      ellipsis: true,
      render: (text) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          <span style={{ textAlign: "center" }}> {text}</span>
        </Tooltip>
      ),
    },
    {
      title: "狀態 ",
      dataIndex: "status",
      fixed: true,
      ellipsis: true,
      width: 36,
    },
    {
      title: "製令單號 ",
      dataIndex: "workOrderSN",
      width: 76,
      fixed: true,
      editable: true,
      ellipsis: true,
      render: (text) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "產品名稱",
      dataIndex: "productName",
      width: 125,
      fixed: true,
      editable: REACT_APP_LY_ERP_ON === false,
      ellipsis: true,
      render: (text) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          {/* <span style={{background:'#fff'}} >{text}</span> */}
          <span>{text}</span>
        </Tooltip>
      ),
      // rule:
      // {
      //   required: true,
      //   message: `is required.`,
      // }
    },
    {
      title: "產品編號",
      dataIndex: "productSN",
      width: 80,
      editable: REACT_APP_LY_ERP_ON === false,
      ellipsis: true,
      render: (text) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
      // rule:
      // {
      //   required: true,
      //   message: `is required.`,
      // }
    },
    {
      title: "製令數量",
      dataIndex: "workOrderQuantity",
      editable: REACT_APP_LY_ERP_ON === false,
      ellipsis: true,
      width: 50,
      type: "number",
      rule: {
        type: "integer",
        // required: true,
        message: "請輸入整數",
        transform: (value) => (value ? Number(value) : undefined), // Transform the value to a number
      },
    },
    {
      title: "訂單交期",
      dataIndex: "workOrderDate",
      width: 60,
      editable: REACT_APP_LY_ERP_ON === false,
      ellipsis: true,
      type: "date",
      sorter: (a, b) => {
        if (a.workOrderDate < b.workOrderDate) {
          return -1;
        }
        if (a.workOrderDate > b.workOrderDate) {
          return 1;
        }
        return 0;
      },
      // rule:
      // {
      //   required: true,
      //   message: `is required.`,
      // }
    },
    // ! new add column
    {
      title: "製程名稱",
      dataIndex: "processName",
      ellipsis: true,
      width: 120,
      type: "string",
      render: function (text, record) {
        if (!record.productId) return null;
        return <ScheduleProcessNameOptions source={record} />;
      },
    },
    {
      title: "模具編號",
      dataIndex: "moldno",
      ellipsis: true,
      width: 60,
      type: "string",
      render: function (_, record) {
        if (!record.moldNos) return null;
        return record.moldNos;
      },
    },

    {
      title: "成型秒數",
      dataIndex: "moldingSecond",
      editable: true,
      ellipsis: true,
      width: 45,
      type: "number",
      rule: {
        type: "integer",
        message: "請輸入整數",
        transform: (value) => (value ? Number(value) : undefined), // Transform the value to a number
      },
    },
    {
      title: "穴數",
      dataIndex: "moldCavity",
      editable: true,
      ellipsis: true,
      width: 30,
      type: "number",
      rule: {
        type: "integer",
        message: "請輸入整數",
        transform: (value) => (value ? Number(value) : undefined), // Transform the value to a number
      },
    },
    {
      title: "生產區域",
      dataIndex: "productionArea",
      ellipsis: true,
      width: 50,
      render: (text, record) => (
        <Select
          defaultValue={text}
          value={text}
          style={{ width: 90, background: "none", borderColor: "#1677ff" }}
          onChange={(value) => handleProductionAreaChange(value, record)}
        >
          {PRODUCTION_AREA.map((item, index) => (
            <Option key={index} value={item.value} label={item.label}>
              {item.label}
            </Option>
          ))}
          ,
        </Select>
      ),
      filters: PRODUCTION_AREA.map((item, index) => {
        return { text: item.value, value: item.value };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.productionArea.startsWith(value),
      sorter: (a, b) => {
        if (a.productionArea < b.productionArea) {
          return -1;
        }
        if (a.productionArea > b.productionArea) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "機台編號",
      dataIndex: "machineSN",
      ellipsis: true,
      width: 50,
      render: (text, record) => (
        <Select
          defaultValue={text}
          value={text}
          style={{ width: 90, background: "none", borderColor: "#1677ff" }}
          onChange={(value) => handleMachineSNChange(value, record)}
        >
          {MACHINE_LIST.map((item, index) => {
            if (item.productionArea === record.productionArea) {
              return (
                <Option
                  key={index}
                  value={item.machineSN}
                  label={item.machineSN}
                >
                  {item.machineSN}
                </Option>
              );
            }
          })}
        </Select>
      ),
      filters: MACHINE_LIST.map((item, index) => {
        return { text: item.machineSN, value: item.machineSN };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.machineSN.startsWith(value),
      sorter: (a, b) => {
        if (a.machineSN < b.machineSN) {
          return -1;
        }
        if (a.machineSN > b.machineSN) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "預計上機日",
      dataIndex: "planOnMachineDate",
      editable: true,
      ellipsis: true,
      width: 60,
      type: "date",
      sorter: (a, b) => {
        if (a.planOnMachineDate < b.planOnMachineDate) {
          return -1;
        }
        if (a.planOnMachineDate > b.planOnMachineDate) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "預計完成日",
      dataIndex: "planFinishDate",
      ellipsis: true,
      width: 60,
      type: "date",
      sorter: (a, b) => {
        if (a.planFinishDate < b.planFinishDate) {
          return -1;
        }
        if (a.planFinishDate > b.planFinishDate) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "上下模工作日",
      dataIndex: "moldWorkDays",
      editable: true,
      ellipsis: true,
      width: 60,
      type: "number",
      rule: {
        type: "integer",
        message: "請輸入整數",
        transform: (value) => (value ? Number(value) : undefined), // Transform the value to a number
      },
    },
    {
      title: "日工時",
      dataIndex: "dailyWorkingHours",
      editable: true,
      ellipsis: true,
      width: 35,
      type: "number",
      rule: {
        type: "integer",
        message: "請輸入整數",
        transform: (value) => (value ? Number(value) : undefined), // Transform the value to a number
      },
    },
    {
      title: "實際上機日",
      dataIndex: "actualOnMachineDate",
      ellipsis: true,
      width: 60,
      type: "date",
      sorter: (a, b) => {
        if (a.actualOnMachineDate < b.actualOnMachineDate) {
          return -1;
        }
        if (a.actualOnMachineDate > b.actualOnMachineDate) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "實際完成日",
      dataIndex: "actualFinishDate",
      ellipsis: true,
      width: 60,
      type: "date",
      sorter: (a, b) => {
        if (a.actualFinishDate < b.actualFinishDate) {
          return -1;
        }
        if (a.actualFinishDate > b.actualFinishDate) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "週別",
      dataIndex: "week",
      ellipsis: true,
      width: 30,
      type: "number",
      rule: {
        type: "integer",
        message: "請輸入整數",
        transform: (value) => (value ? Number(value) : undefined), // Transform the value to a number
      },
    },
    {
      title: "產能小時",
      dataIndex: "hourlyCapacity",
      ellipsis: true,
      width: 40,
      type: "number",
      rule: {
        type: "integer",
        message: "請輸入整數",
        transform: (value) => (value ? Number(value) : undefined), // Transform the value to a number
      },
    },
    {
      title: "日產能",
      dataIndex: "dailyCapacity",
      ellipsis: true,
      width: 36,
      type: "number",
      rule: {
        type: "integer",
        message: "請輸入整數",
        transform: (value) => (value ? Number(value) : undefined), // Transform the value to a number
      },
    },
    {
      title: "工作天數",
      dataIndex: "workDays",
      ellipsis: true,
      width: 40,
      type: "number",
      rule: {
        type: "integer",
        message: "請輸入整數",
        transform: (value) => (value ? Number(value) : undefined), // Transform the value to a number
      },
    },
    {
      title: "單雙射",
      dataIndex: "singleOrDoubleColor",
      ellipsis: true,
      width: 40,
      render: (text, record) => (
        <Select
          defaultValue={text}
          value={text}
          style={{ width: 60, background: "none", borderColor: "#1677ff" }}
          onChange={(value) => handleSingleOrDoubleColorChange(value, record)}
        >
          <Option key={0} value="單" label="單">
            單
          </Option>
          <Option key={1} value="雙" label="雙">
            雙
          </Option>
        </Select>
      ),
    },
    {
      title: "轉換率 ",
      dataIndex: "conversionRate",
      editable: true,
      ellipsis: true,
      width: 40,
      type: "number",
    },
    {
      title: "備註 ",
      dataIndex: "comment",
      editable: true,
      ellipsis: true,
      width: 100,
      ellipsis: true,
      render: (text) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
  ]);

  /*--------------------------------------------------  ant ui -> table -> Column   end ------------------------------------------------------*/

  /*--------------------------------------------------  分頁 secontions   start ------------------------------------------------------*/

  // 設定初始當前頁面以及分頁一頁有幾個資料
  const [pagination, setPagination] = useState({
    page: 1 /*當前分頁位址*/,
    pageSize: 20, // 默认值为 10
  });
  /*--------------------------------------------------  分頁 secontions end ------------------------------------------------------*/

  /*--------------------------------------------------  資料處理 start ------------------------------------------------------*/

  const [totalCurrent, setTotalCurrent] = useState(1); /*總數據量*/
  const [dataSource, setDataSource] = useState([]); /*回傳資料*/
  /*--------------------------------------------------  資料處理 end ------------------------------------------------------*/

  /*-------------------------------------------------- 搜尋條件篩選  start ------------------------------------------------------*/

  // 搜尋條件篩選
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 28 * 24 * 60 * 60 * 1000)
  );
  const [statusState, setStatusState] = useState(WORKORDER_STATUS.ALL);
  const [expiryState, setExpiryState] = useState("無限期");
  const [keywordTypeState, setKeywordTypeState] = useState("workOrderSN");
  const [keywordState, setKeywordState] = useState("");
  const [loading, setLoading] = useState(false);

  const formatDateTime = (date, type) => {
    if (!date) {
      switch (type) {
        case "start":
          date = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        case "end":
          date = new Date(new Date().getTime() + 28 * 24 * 60 * 60 * 1000);
        default:
          break;
      }
    }
    return dayjs.tz(date, TZ).format();
  };

  const { data, isLoading, isSuccess, refetch } = useGetProductionScheduleQuery(
    {
      size: pagination.pageSize /*分頁數量*/,
      page: pagination.page /*想取得的分頁位址*/,
      start_planOnMachineDate: formatDateTime(startDate, "start"),
      end_planOnMachineDate: formatDateTime(endDate, "end"),
      status: statusState,
      expiry: expiryState,
      [keywordTypeState]: keywordState,
    }
  );
  // 分頁相關設定
  const handleTableChange = (page, size) => {
    const newPagination = {
      ...pagination,
      // page:當前分頁,
      page: size !== pagination.pageSize ? 1 : +page,
      // pageSize:分頁大小(10,20,50,100),
      pageSize: size,
    };

    if (size !== pagination?.pageSize) {
      setDataSource([]);
      // setPagination(newPagination);
    }
    setPagination(newPagination);
  };
  /*-------------------------------------------------- 搜尋條件篩選  end ------------------------------------------------------*/

  /*--------------------------------------------------獲取外部 api 工作列表 start ------------------------------------------------------*/

  // get distinct workOrderSNs from LY(凌越) ERP
  const {
    data: workOrderSNData,
    isLoading: workOrderSNIsLoading,
    isSuccess: workOrderSNIsSuccess,
    refetch: workOrderSNRefetch,
  } = useGetWorkOrderSNsQuery();

  const [workOrderSNsFromLYState, setWorkOrderSNsFromLYState] = useState([]);
  useEffect(() => {
    if (workOrderSNIsSuccess) {
      const workOrderSNOption = workOrderSNData.map((item) => {
        return { value: item };
      });
      setWorkOrderSNsFromLYState(workOrderSNOption);
    }
  }, [workOrderSNIsSuccess, workOrderSNData]);

  /*--------------------------------------------------獲取外部 api 工作列表 end ------------------------------------------------------*/

  const onChange = (filters, sorter) => {};

  /*-------------------------------------------------- 表單 I/O start ------------------------------------------------------*/

  // 新增 exportData 狀態
  const [needExportData, setNeedExportData] = useState([]);
  // API匯出exportData
  const {
    data: exportData,
    isSuccess: exportIsSuccess,
    refetch: exportRefetch,
  } = useGetProductionScheduleQuery({
    size: 10000000,
    start_planOnMachineDate: formatDateTime(startDate, "start"),
    end_planOnMachineDate: formatDateTime(endDate, "end"),
    status: statusState,
    expiry: expiryState,
    [keywordTypeState]: keywordState,
  });

  useEffect(() => {
    if (isSuccess) {
      setLoading(true);

      const { data: dataSource, meta } = data;
      // 設定總量
      setDataSource(dataSource);
      setLoading(false);
      setTotalCurrent(meta.total_count);

      // 在获取到最新的 dataSource 后，检查 moldingSecond 和 moldCavity 是否有值
      const newDataWithHourlyCapacity = dataSource.map((item) => {
        if (item.moldingSecond && item.moldCavity) {
          // 计算新的 hourlyCapacity，并使用 Math.floor() 進行無条件捨去
          const newHourlyCapacity = Math.floor(
            (3600 / item.moldingSecond) * item.moldCavity
          );
          // 更新 dataSource 中的 hourlyCapacity
          return { ...item, hourlyCapacity: newHourlyCapacity };
        }
        return item;
      });

      // 更新 dataSource
      setDataSource(newDataWithHourlyCapacity);

      // 在这里处理 hourlyCapacity 更新后的逻辑
      const newDataWithDailyCapacity = newDataWithHourlyCapacity.map((item) => {
        if (item.hourlyCapacity !== null && item.conversionRate !== null) {
          // 计算新的 dailyCapacity，并使用 Math.floor() 進行無条件捨去
          const newDailyCapacity = Math.floor(
            item.hourlyCapacity * item.dailyWorkingHours * item.conversionRate
          );
          // 更新 dataSource 中的 dailyCapacity
          return { ...item, dailyCapacity: newDailyCapacity };
        }
        return item;
      });

      // 更新 dataSource
      setDataSource(newDataWithDailyCapacity);

      // convert dates to ISO format
      const newDataWithISODate = newDataWithDailyCapacity.map((item) => {
        const newItem = { ...item };
        newItem.workOrderDate = item.workOrderDate
          ? dayjs(item.workOrderDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        newItem.planOnMachineDate = item.planOnMachineDate
          ? dayjs(item.planOnMachineDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        newItem.planFinishDate = item.planFinishDate
          ? dayjs(item.planFinishDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        newItem.actualOnMachineDate = item.actualOnMachineDate
          ? dayjs(item.actualOnMachineDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        newItem.actualFinishDate = item.actualFinishDate
          ? dayjs(item.actualFinishDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        return newItem;
      });
      // 更新 dataSource
      setDataSource(newDataWithISODate);
    }

    if (exportIsSuccess) {
      const { data } = exportData;
      // convert dates to ISO format
      const newDataWithISODate = exportData.data.map((item) => {
        const newItem = { ...item };
        newItem.workOrderDate = item.workOrderDate
          ? dayjs(item.workOrderDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        newItem.planOnMachineDate = item.planOnMachineDate
          ? dayjs(item.planOnMachineDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        newItem.planFinishDate = item.planFinishDate
          ? dayjs(item.planFinishDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        newItem.actualOnMachineDate = item.actualOnMachineDate
          ? dayjs(item.actualOnMachineDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        newItem.actualFinishDate = item.actualFinishDate
          ? dayjs(item.actualFinishDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        return newItem;
      });
      setNeedExportData(newDataWithISODate);
    }
  }, [isSuccess, data, exportData]);

  // 匯出功能
  const exportToExcel = () => {
    const workbook = new Exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // 设置表格列
    worksheet.columns = getExcelColumns();
    // const titleRow1 = worksheet.addRow(['隆廷實業有限公司']);
    // titleRow1.font = { bold: true, color: { argb: '00ffffff' } }; // 设置标题行样式
    // const titleRow2 = worksheet.addRow(['生產排程週計畫表']);
    // titleRow2.font = { bold: true, color: { argb: '00ffffff' } }; // 设置标题行样式

    // 添加数据行
    worksheet.addRows(needExportData);

    // 设置表头样式
    let headerStyle = {
      font: {
        name: "Arial",
        size: 14,
        // bold: true,
        // color: { argb: '00ffffff' },
      },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: "#fff",
      },
      alignment: {
        wrapText: true,
        vertical: "middle",
        horizontal: "center",
      },
      border: {
        top: { style: "double" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      width: 300,
    };

    // 填充表头样式
    for (let i = 1; i <= worksheet.columnCount; i++) {
      let cell = worksheet.getCell(1, i);
      cell.font = headerStyle.font;
      cell.fill = headerStyle.fill;
      cell.alignment = headerStyle.alignment;
      cell.border = headerStyle.border;
    }

    // 将工作簿写入缓冲区，并保存为Excel文件
    workbook.xlsx.writeBuffer().then((buffer) => {
      let blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "ProductionSchedule.xlsx");
    });
  };

  const getExcelColumns = () => {
    return columns.map((item) => {
      let items = {
        header: item.title,
        key: item.dataIndex,
        style: {
          font: { size: 11 },
          border: {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          },
          alignment: {
            wrapText: true,
            vertical: "middle",
            horizontal: "center",
          },
        },
      };
      // 添加其他样式配置...
      switch (item.dataIndex) {
        case "id":
          items["width"] = 10;
          break;
        case "workOrderSN":
          items["width"] = 25;
          break;
        case "productName":
          items["width"] = 25;
          break;
        case "workOrderQuantity":
          items["width"] = 15;
          break;
        case "workOrderDate":
          items["width"] = 25;
          break;
        case "processName":
          items["width"] = 25;
          break;
        case "moldno":
          items["width"] = 25;
          break;
        case "moldingSecond":
          items["width"] = 15;
          break;
        case "moldCavity":
          items["width"] = 10;
          break;
        case "productionArea":
          items["width"] = 15;
          break;
        case "machineSN":
          items["width"] = 25;
          break;
        case "planOnMachineDate":
          items["width"] = 25;
          break;
        case "planFinishDate":
          items["width"] = 25;
          break;
        case "moldWorkDays":
          items["width"] = 25;
          break;
        case "actualFinishDate":
          items["width"] = 25;
          break;
        case "dailyWorkingHours":
          items["width"] = 10;
          break;
        case "actualOnMachineDate":
          items["width"] = 25;
          break;
        case "week":
          items["width"] = 10;
          break;
        case "hourlyCapacity":
          items["width"] = 15;
          break;
        case "dailyCapacity":
          items["width"] = 10;
          break;
        case "workDays":
          items["width"] = 15;
          break;
        case "singleOrDoubleColor":
          items["width"] = 10;
          break;
        case "conversionRate":
          items["width"] = 10;
          break;
        case "status":
          items["width"] = 15;
          break;
        case "comment":
          items["width"] = 10;
          break;
      }
      return items;
    });
  };

  /*-------------------------------------------------- 表單 I/O end ------------------------------------------------------*/

  /*-------------------------------------------------- 新增項目 與 新增製令單 start  ------------------------------------------------------*/
  // TODO: 修復 bug
  //  ! 請先取消勾選增製令單才能新增項目  // 已刪除項目還是跳出
  //  !

  // 新增項目
  const [addProductionSchedule] = useAddProductionScheduleMutation();
  const [nowDate, setNowDate] = useState(
    dayjs.tz(dayjs().format("YYYY-MM-DD"), TZ).format()
  ); // 初始值为当前日期

  // 新增製令單
  const handleAdd = async () => {
    if (selectedRowKeys.length > 0) {
      message.warning("請先取消勾選增製令單才能新增項目");
      return;
    }

    try {
      Modal.confirm({
        title: "確認新增",
        content: "確定要新增製令單嗎？",
        okText: "確定",
        cancelText: "取消",
        onOk: async () => {
          try {
            message.success("新增製令單成功");

            const newData = {
              workOrderSN: "",
              productSN: "",
              productName: "",
              workOrderQuantity: 1000,
              workOrderDate: nowDate,
              planOnMachineDate: nowDate,
            };

            // 添加製令單
            const addedItem = await addProductionSchedule(newData);

            // Refetch 数据以获取更新后的列表
            refetch();

            // 將分頁設置為第一頁
            setPagination({ ...pagination, page: 1 });
          } catch (error) {
            console.error("新增製令單時發生錯誤:", error);
          }
        },
      });
    } catch (error) {
      console.error("處理新增製令單時發生錯誤:", error);
    }
  };
  /*-------------------------------------------------- 新增項目 與 新增製令單 end  ------------------------------------------------------*/

  /*--------------------------------------------------  勾選表單 start ------------------------------------------------------*/
  // ant ui:: Table ->  rowSelection API

  /* 表單 SELECTIONS SECTION
    
  *  selectionType :: rowSelection ->  type::'checkbox' 
  * cancelStaus 
  */
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 追蹤選中的行的 id
  const [cancelStaus] = useCancelStausMutation();

  //勾選刪除
  const deleteChecked = async () => {
    // Get the selected rows' ids
    if (selectedRowKeys.length === 0) {
      message.warning("請先勾選要刪除的單據");
      return;
    }
    // Get the selected rows' data
    const selectedRowsData = dataSource.filter((row) =>
      selectedRowKeys.includes(row.id)
    );

    // Check if the status is "Done" for any selected rows
    const completedDocuments = selectedRowsData.some(
      (row) => row.status === "Done"
    );

    if (completedDocuments) {
      message.warning("此單據已經完成，無法進行修改。");
      return;
    }

    const stringIds = JSON.stringify(selectedRowKeys);

    //  popup dialog
    Modal.confirm({
      title: "確認刪除",
      content: "確定要刪除生產選中的項目嗎？",
      okText: "確定",
      cancelText: "取消",
      onOk: async () => {
        try {
          await cancelStaus(stringIds);
          message.success("刪除成功!!");
        } catch (error) {
          console.error("Error deleting production schedule:", error);
        }
      },
    });
  };

  // 勾選設定
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys); // 更新選中的行
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  /*-------------------------------------------------- 勾選表單 end  ------------------------------------------------------*/

  /*-------------------------------------------------- 外部 API 串接 START  ------------------------------------------------------*/

  // 編輯
  // get production schedule through LY
  //  ? 處理製令單獲取資料的 fn ?
  const [lyQuery, setLyQuery] = useState({ id: null, workOrderSN: null });

  const { data: lyData, isSuccess: lyIsSuccess } =
    useGetProductionScheduleThroughLYQuery(
      {
        id: lyQuery.id,
        workOrderSN: lyQuery.workOrderSN,
      },
      { skip: REACT_APP_LY_ERP_ON === false }
    );
  useEffect(() => {
    if (lyIsSuccess) {
      handleSave({ ...lyData });
    }
  }, [lyIsSuccess, lyData]);
  // TODO
  /*
 ? 查無製令單號 
 * 目前製令單號為 db 所以目前 erp 沒有同步嗎?
 * 所以剛剛行為沒有觸發該錯誤是為上述原因?
*
*/
  const queryFromLY = (row) => {
    if (
      workOrderSNsFromLYState.some((item) => item.value === row.workOrderSN)
    ) {
      setLyQuery({
        id: row.id,
        workOrderSN: row.workOrderSN,
      });
    } else {
      message.warning("凌越ERP查無此製令單號，請重新輸入。");
    }
  };
  /*  -------------------------------------------------- 外部 API 串接 end  ------------------------------------------------------*/

  const [UpdateProductionSchedule] = useUpdateProductionScheduleMutation();
  /*
   TODO  
   * matchedData 獲取對應的製令單 
   * dataSource 所有的 table data 
*/
  // 儲存, 更新  觸發
  const handleSave = async (row) => {
    try {
      // Check if there are changes in the data
      const matchedData = dataSource.find((item) => item.id === row.id);

      console.log(matchedData);

      // Define date keys
      const dateKeys = [
        "workOrderDate",
        "planOnMachineDate",
        "planFinishDate",
        "actualOnMachineDate",
        "actualFinishDate",
      ];

      const isDataChanged = Object.keys(row).some((key) => {
        // Check if the key is a date key and compare dates
        if (dateKeys.includes(key)) {
          const dataDate = matchedData[key]
            ? dayjs(matchedData[key]).tz(TZ).format("YYYY-MM-DD")
            : null;
          const rowDate = row[key]
            ? dayjs(row[key]).tz(TZ).format("YYYY-MM-DD")
            : null;
          return dataDate !== rowDate;
        }
        // For non-date keys, directly compare the values
        return matchedData[key] !== row[key];
      });

      if (!isDataChanged) {
        // If there are no changes, you can choose to return or show a message
        // message.info('No changes detected.');
        return;
      }
      // Perform the optimistic update on the client side
      const updatedData = dataSource.map((item) =>
        item.id === row.id ? { ...item, ...row } : item
      );
      setDataSource(updatedData);
      // convert dates to ISO format
      row.workOrderDate = row.workOrderDate
        ? dayjs.tz(row.workOrderDate, TZ).format()
        : null;
      row.planOnMachineDate = row.planOnMachineDate
        ? dayjs.tz(row.planOnMachineDate, TZ).format()
        : null;
      row.planFinishDate = row.planFinishDate
        ? dayjs.tz(row.planFinishDate, TZ).format()
        : null;
      row.actualOnMachineDate = row.actualOnMachineDate
        ? dayjs.tz(row.actualOnMachineDate, TZ).format()
        : null;
      row.actualFinishDate = row.actualFinishDate
        ? dayjs.tz(row.actualFinishDate, TZ).format()
        : null;
      // Perform the actual update on the server side
      const response = await UpdateProductionSchedule({
        id: row.id,
        data: row,
      });

      if (!response.error) {
        message.success("修改數據成功");
      } else {
        message.error("修改數據失敗!!!");
      }
    } catch (error) {
      // Handle the error (e.g., display an error message to the user, revert changes, etc.)
      message.error("修改數據失敗!!!!");
    }
  };

  const handleProductionAreaChange = async (value, record) => {
    try {
      const defaultMachineSN = MACHINE_LIST.filter((item, index) => {
        return item.productionArea === value;
      })[0].machineSN;
      const defaultSingleOrDoubleColor = MACHINE_LIST.find(
        (item) => item.machineSN === defaultMachineSN
      ).singleOrDoubleColor;
      // Send a request to the server to update the data
      await UpdateProductionSchedule({
        id: record.id,
        data: {
          productionArea: value,
          machineSN: defaultMachineSN,
          singleOrDoubleColor: defaultSingleOrDoubleColor,
        },
      });
      // If the server update is successful, no action is needed
      message.success("修改數據成功");
    } catch (error) {
      // Handle the error (e.g., display a message to the user, revert changes, etc.)
      console.error("Error updating production area:", error);
    }
  };

  const handleMachineSNChange = async (value, record) => {
    try {
      const defaultSingleOrDoubleColor = MACHINE_LIST.find(
        (item) => item.machineSN === value
      ).singleOrDoubleColor;
      // Send a request to the server to update the data
      await UpdateProductionSchedule({
        id: record.id,
        data: {
          machineSN: value,
          singleOrDoubleColor: defaultSingleOrDoubleColor,
        },
      });
      // If the server update is successful, no action is needed
      message.success("修改數據成功");
    } catch (error) {
      // Handle the error (e.g., display a message to the user, revert changes, etc.)
      console.error("Error updating production area:", error);
    }
  };

  const handleSingleOrDoubleColorChange = async (value, record) => {
    try {
      // Send a request to the server to update the data
      await UpdateProductionSchedule({
        id: record.id,
        data: { singleOrDoubleColor: value },
      });
      // If the server update is successful, no action is needed
      message.success("修改數據成功");
    } catch (error) {
      // Handle the error (e.g., display a message to the user, revert changes, etc.)
      console.error("Error updating production area:", error);
    }
  };

  //  --------------------------------------------------  ui 套件 Table 設定 start  --------------------------------------------------
  /*
   * Ant ui :: Table-> API -> components
   */
  const components = {
    header: {
      cell: ResizableTitle,
    },
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  //  --------------------------------------------------  ui 套件 Form 設定  end  --------------------------------------------------

  const handleResize =
    (index) =>
    (_, { size }) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setDefaultColumns(newColumns);
    };

  /*
   * 處理 ant ui ->  columns  ,  loop defaultColumns
   * onCell : 自定義 props 傳給子層組件
   */

  const columns = defaultColumns.map((col, index) => {
    const onCell = (record) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      rule: col.rule,
      type: col.type,
      title: col.title,
      handleSave,
      queryFromLY,
      workOrderSNsFromLYState: workOrderSNsFromLYState,
    });

    return {
      ...col,
      key: col.dataIndex, // 添加了這一行，使用 dataIndex 作為 key
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
      onCell: col.editable ? onCell : null,
    };
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // 防抖函數，延遲 500 毫秒執行
  const debouncedHandleDelete = debounce(deleteChecked, 500);
  const debouncedHandleAdd = debounce(handleAdd, 500);
  const debouncedExportToExcel = debounce(exportToExcel, 500);

  return (
    <div className="production-schedule">
      <div className="box">
        <div className="title-box">
          <div className="title">生產計劃排程表</div>
          <div className="btn-box">
            <FilterBar
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              statusState={statusState}
              setStatusState={setStatusState}
              expiryState={expiryState}
              setExpiryState={setExpiryState}
              keywordTypeState={keywordTypeState}
              setKeywordTypeState={setKeywordTypeState}
              keywordState={keywordState}
              setKeywordState={setKeywordState}
            />
            <Tooltip title="取消生產">
              <button className="delete" onClick={debouncedHandleDelete}>
                <FontAwesomeIcon icon={faTrashCan} style={{ color: "#fff" }} />
              </button>
            </Tooltip>

            <Tooltip title="新增製令單">
              <button className="add" onClick={debouncedHandleAdd}>
                <FontAwesomeIcon icon={faPlus} style={{ color: "#fff" }} />
              </button>
            </Tooltip>
          </div>
        </div>
        {isSuccess && (
          <Table
            components={components}
            rowClassName={(record, index) => {
              var className = "";
              if (record.status === WORKORDER_STATUS.PAUSE) {
                className += " status-pause ";
              }
              //預計完成日前七天(只要狀態不是已經完成，就會反黃提醒)
              if (
                record.planFinishDate &&
                record.status !== WORKORDER_STATUS.DONE &&
                dayjs().isAfter(dayjs(record.planFinishDate).add(-7, "days"))
              ) {
                className += " expiry-warning ";
              }
              //過了預計完成日變紅色提醒
              if (
                record.planFinishDate &&
                record.status !== WORKORDER_STATUS.DONE &&
                dayjs().isAfter(dayjs(record.planFinishDate))
              ) {
                className += " expiry-danger ";
              }

              return className;
            }}
            bordered
            striped={true}
            rowKey="id" // 在這裡指定 'id' 作為每一行的唯一標識
            dataSource={dataSource}
            columns={columns}
            pagination={{
              total: totalCurrent, // 確保這個值正確反映你的實際數據總數
              current: pagination.page /*當前分頁位址*/,
              defaultPageSize: pagination.pageSize,
              pageSize: pagination.pageSize,
              showSizeChanger: true,
              showLessItems: true,
              showQuickJumper: false,
              position: ["bottomCenter"],
              onChange: handleTableChange,
            }}
            loading={loading}
            scroll={{ x: 3000 }}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
              columnWidth: "32px",
            }}
            onChange={onChange}
          />
        )}
        {dataSource.length > 0 && (
          <Button
            key="downloadExcel"
            type="ghost"
            onClick={debouncedExportToExcel}
            className="exportBtn"
          >
            匯出
          </Button>
        )}
        <Button
          type="ghost"
          onClick={() => {
            navigate("/ImportProductionSchedulePage");
          }}
          className={
            dataSource.length === 0 ? "importBtn-initial" : "importBtn"
          }
        >
          匯入
        </Button>
        <a
          href={ExcelExample}
          download="生產排程計畫表-匯入範例"
          target="_blank"
        >
          <Button
            type="ghost"
            className={
              dataSource.length === 0 ? "downloadBtn-initial" : "downloadBtn"
            }
          >
            下載匯入Excel範例
          </Button>
        </a>
        <span>Renders count: {rendersCount}</span>
      </div>
    </div>
  );
};

export default ProductionSchedule;
