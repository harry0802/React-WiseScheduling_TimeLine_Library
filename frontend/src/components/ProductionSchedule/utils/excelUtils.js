import Exceljs from "exceljs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import { TZ } from "../../../config/config";

/**
 * 獲取Excel列配置
 * @param {Array} columns - 列配置數組
 * @returns {Array} Excel列配置數組
 */
export const getExcelColumns = (columns) => {
  if (!Array.isArray(columns)) {
    console.error("columns 不是一個數組");
    return [];
  }

  return columns.map((item) => ({
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
    width: getColumnWidth(item.dataIndex),
  }));
};

/**
 * 根據列的dataIndex獲取列寬
 * @param {string} dataIndex - 列的dataIndex
 * @returns {number} 列寬
 */
const getColumnWidth = (dataIndex) => {
  const widths = {
    id: 10,
    workOrderSN: 25,
    productName: 25,
    workOrderQuantity: 15,
    workOrderDate: 25,
    processName: 25,
    moldno: 25,
    moldingSecond: 15,
    moldCavity: 10,
    productionArea: 15,
    machineSN: 25,
    planOnMachineDate: 25,
    planFinishDate: 25,
    moldWorkDays: 25,
    actualFinishDate: 25,
    dailyWorkingHours: 10,
    actualOnMachineDate: 25,
    week: 10,
    hourlyCapacity: 15,
    dailyCapacity: 10,
    workDays: 15,
    singleOrDoubleColor: 10,
    conversionRate: 10,
    status: 15,
    comment: 10,
  };
  return widths[dataIndex] || 15;
};

/**
 * 匯出Excel
 * @param {Array} columns - 列配置數組
 * @param {Array} data - 數據數組
 */
export const exportToExcel = (columns, data) => {
  const workbook = new Exceljs.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  const excelColumns = getExcelColumns(columns);
  worksheet.columns = excelColumns;
  console.log("導出數據:", data); // 調試輸出
  if (Array.isArray(data)) {
    console.log("導出數據:", data); // 調試輸出
    worksheet.addRows(data);
  } else {
    console.error("data 不是一個數組");
  }

  const headerStyle = {
    font: { name: "Arial", size: 14 },
    fill: { type: "pattern", pattern: "solid", fgColor: "#fff" },
    alignment: { wrapText: true, vertical: "middle", horizontal: "center" },
    border: {
      top: { style: "double" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    },
  };

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = headerStyle.font;
    cell.fill = headerStyle.fill;
    cell.alignment = headerStyle.alignment;
    cell.border = headerStyle.border;
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ProductionSchedule.xlsx");
  });
};

/**
 * 日期格式轉換
 * @param {Array} data - 數據數組
 * @returns {Array} 轉換後的數據數組
 */
export const convertDatesToISO = (data) => {
  if (!Array.isArray(data)) {
    console.error("data 不是一個數組");
    return [];
  }

  return data.map((item) => {
    const newItem = { ...item };
    newItem.workOrderDate = formatDate(item.workOrderDate);
    newItem.planOnMachineDate = formatDate(item.planOnMachineDate);
    newItem.planFinishDate = formatDate(item.planFinishDate);
    newItem.actualOnMachineDate = formatDate(item.actualOnMachineDate);
    newItem.actualFinishDate = formatDate(item.actualFinishDate);
    return newItem;
  });
};

/**
 * 格式化日期
 * @param {string} date - 日期字符串
 * @returns {string} 格式化後的日期字符串
 */
const formatDate = (date) => {
  return date ? dayjs(date).tz(TZ).format("YYYY-MM-DD") : "";
};
