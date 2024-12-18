import React from "react";
import { Select, Tooltip } from "antd";
import {
  MACHINE_LIST,
  PRODUCTION_AREA,
  REACT_APP_LY_ERP_ON,
} from "../../../config/config";
import ScheduleProcessNameOptions from "../component/ScheduleProcessNameOptions";

const renderTooltip = (text) => {
  if (!text && text !== 0) return null;
  return (
    <Tooltip title={text}>
      <span>{String(text)}</span>
    </Tooltip>
  );
};

const renderSelect = (options, value, onChange) => (
  <Select
    value={value}
    style={{ width: 90, background: "none", borderColor: "#1677ff" }}
    onChange={onChange}
  >
    {options.map((item, index) => (
      <Select.Option key={index} value={item.value}>
        {item.label}
      </Select.Option>
    ))}
  </Select>
);

export const getDefaultColumns = (
  handleProductionAreaChange,
  handleMachineSNChange,
  handleSingleOrDoubleColorChange
) => [
  {
    title: "編號",
    dataIndex: "id",
    width: 30,
    fixed: true,
    editable: false,
    ellipsis: true,
    render: (text) => renderTooltip(text),
  },
  {
    title: "狀態",
    dataIndex: "status",
    fixed: true,
    ellipsis: true,
    width: 36,
  },
  {
    title: "製令單號",
    dataIndex: "workOrderSN",
    width: 76,
    fixed: true,
    editable: true,
    ellipsis: true,
    render: (text) => renderTooltip(text),
  },
  {
    title: "產品名稱",
    dataIndex: "productName",
    width: 125,
    fixed: true,
    editable: !REACT_APP_LY_ERP_ON,
    ellipsis: true,
    render: (text) => renderTooltip(text),
  },
  {
    title: "產品編號",
    dataIndex: "productSN",
    width: 80,
    editable: !REACT_APP_LY_ERP_ON,
    ellipsis: true,
    render: (text) => renderTooltip(text),
  },
  {
    title: "製令數量",
    dataIndex: "workOrderQuantity",
    editable: !REACT_APP_LY_ERP_ON,
    ellipsis: true,
    width: 50,
    type: "number",
    rule: {
      type: "integer",
      message: "請輸入整數",
      transform: (value) => (value ? Number(value) : undefined),
    },
  },
  {
    title: "訂單交期",
    dataIndex: "workOrderDate",
    width: 60,
    editable: !REACT_APP_LY_ERP_ON,
    ellipsis: true,
    type: "date",
    sorter: (a, b) =>
      a.workOrderDate < b.workOrderDate
        ? -1
        : a.workOrderDate > b.workOrderDate
        ? 1
        : 0,
  },
  {
    title: "製程名稱",
    dataIndex: "processName",
    ellipsis: true,
    width: 120,
    type: "string",
    render: (_, record) =>
      record.productId ? <ScheduleProcessNameOptions source={record} /> : null,
  },
  {
    title: "模具編號",
    dataIndex: "moldno",
    ellipsis: true,
    width: 60,
    type: "string",
    render: (_, record) => (record.moldNos ? record.moldNos : null),
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
      transform: (value) => (value ? Number(value) : undefined),
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
      transform: (value) => (value ? Number(value) : undefined),
    },
  },
  {
    title: "生產區域",
    dataIndex: "productionArea",
    ellipsis: true,
    width: 50,
    render: (text, record) =>
      renderSelect(PRODUCTION_AREA, text, (value) =>
        handleProductionAreaChange(value, record)
      ),
    filters: PRODUCTION_AREA.map((item, index) => {
      return { text: item.value, value: item.value };
    }),
    filterSearch: true,
    onFilter: (value, record) => record.machineSN.startsWith(value),
    sorter: (a, b) =>
      a.machineSN < b.machineSN ? -1 : a.machineSN > b.machineSN ? 1 : 0,
  },
  {
    title: "機台編號",
    dataIndex: "machineSN",
    ellipsis: true,
    width: 50,
    render: (text, record) => {
      // 過濾出當前生產區域的機台
      const filteredMachines = MACHINE_LIST.filter(
        (item) => item.productionArea === record.productionArea
      ).map((item) => ({
        value: item.machineSN,
        label: item.machineSN,
      }));

      return renderSelect(filteredMachines, text, (value) =>
        handleMachineSNChange(value, record)
      );
    },

    filters: MACHINE_LIST.map((item) => ({
      text: item.machineSN,
      value: item.machineSN,
    })),
    filterSearch: true,
    onFilter: (value, record) => record.machineSN.startsWith(value),
    sorter: (a, b) =>
      a.machineSN < b.machineSN ? -1 : a.machineSN > b.machineSN ? 1 : 0,
  },

  {
    title: "預計上機日",
    dataIndex: "planOnMachineDate",
    editable: true,
    ellipsis: true,
    width: 60,
    type: "date",
    sorter: (a, b) =>
      a.planOnMachineDate < b.planOnMachineDate
        ? -1
        : a.planOnMachineDate > b.planOnMachineDate
        ? 1
        : 0,
  },
  {
    title: "預計完成日",
    dataIndex: "planFinishDate",
    ellipsis: true,
    width: 60,
    type: "date",
    sorter: (a, b) =>
      a.planFinishDate < b.planFinishDate
        ? -1
        : a.planFinishDate > b.planFinishDate
        ? 1
        : 0,
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
      transform: (value) => (value ? Number(value) : undefined),
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
      transform: (value) => (value ? Number(value) : undefined),
    },
  },
  {
    title: "實際上機日",
    dataIndex: "actualOnMachineDate",
    ellipsis: true,
    width: 60,
    type: "date",
    sorter: (a, b) =>
      a.actualOnMachineDate < b.actualOnMachineDate
        ? -1
        : a.actualOnMachineDate > b.actualOnMachineDate
        ? 1
        : 0,
  },
  {
    title: "實際完成日",
    dataIndex: "actualFinishDate",
    ellipsis: true,
    width: 60,
    type: "date",
    sorter: (a, b) =>
      a.actualFinishDate < b.actualFinishDate
        ? -1
        : a.actualFinishDate > b.actualFinishDate
        ? 1
        : 0,
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
      transform: (value) => (value ? Number(value) : undefined),
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
      transform: (value) => (value ? Number(value) : undefined),
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
      transform: (value) => (value ? Number(value) : undefined),
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
      transform: (value) => (value ? Number(value) : undefined),
    },
  },
  {
    title: "單雙射",
    dataIndex: "singleOrDoubleColor",
    ellipsis: true,
    width: 40,
    render: (text, record) =>
      renderSelect(
        [
          { value: "單", label: "單" },
          { value: "雙", label: "雙" },
        ],
        text,
        (value) => handleSingleOrDoubleColorChange(value, record)
      ),
  },
  {
    title: "轉換率",
    dataIndex: "conversionRate",
    editable: true,
    ellipsis: true,
    width: 40,
    type: "number",
  },
  {
    title: "備註",
    dataIndex: "comment",
    editable: true,
    ellipsis: true,
    width: 100,
    render: (text) => renderTooltip(text),
  },
];
