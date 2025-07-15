import ProductionTable from "../../../../components/Carousel/CarouselTable/CarouselTable";
import { createDateCondition } from "../../../../components/Carousel/CarouselTable/utils";
import { STATUS_COLORS } from "../../../../configs/Color";
import { isExpired, isExpiredSoon } from "../../../../utils/calcDay";

//! =============== 1. 設定與常量 ===============
//* 表格狀態配置
const TABLE_STATUS_CONFIG = {
  warning: {
    condition: (item) =>
      item.status !== "done" &&
      item.planFinishDate &&
      isExpiredSoon(item.planFinishDate, 7),
    color: STATUS_COLORS.WARNING,
    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  // 整條row 套用
  expired: {
    condition: (item) =>
      item.status !== "done" &&
      item.planFinishDate &&
      isExpired(item.planFinishDate),
    color: STATUS_COLORS.EXPIRED,
    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
};

//* 表格欄位對應
const FIELD_MAPPING = {
  planFinishDate: 1, // 訂單交期
  orderNumber: 2, // 訂單單號
  workOrderSN: 3, // 製令單號
  productName: 4, // 產品名稱
  workOrderQuantity: 5, // 製令數量
  processOne: 6, // 一射
  processTwo: 7, // 二射
  inspection: 8, // 檢驗狀態
  shipment: 9, // 出貨狀態
};

//* 表格標題定義
const TABLE_HEADER = [
  "NO.",
  "訂單交期", //保留欄位
  "訂單單號",
  "製令單號",
  "產品名稱",
  "製令數量",
  "一射",
  "二射",
  "檢驗狀態", //保留欄位
  "出貨狀態", //保留欄位
];

//* 欄位寬度設定
const COLUMN_WIDTHS = [80];

//* 欄位對齊方式設定
const COLUMN_ALIGNS = [
  "center", // NO.
  "center", // 訂單交期
  "center", // 訂單單號
  "center", // 製令單號
  "left", // 產品名稱
  "right", // 製令數量
  "center", // 一射
  "center", // 二射
  "center", // 檢驗狀態
  "center", // 出貨狀態
];

/**
 * @function DailyProductionTasksDashboard
 * @description 每日生產任務儀表板組件
 * @param {Object} props - 組件屬性
 * @param {Array} props.data - 生產任務資料
 * @returns {JSX.Element} 每日生產任務儀表板渲染結果
 */
function DailyProductionTasksDashboard({ data }) {
  if (!data || data.length === 0) {
    return <div className="empty-data">暫無資料</div>;
  }

  /**
   * @description 處理資料格式，確保所有欄位都有值，缺少的欄位用 "--" 填充
   * @param {Array} rawData - 原始資料
   * @returns {Array} 處理後的資料
   */
  const processData = (rawData) => {
    return rawData.map((item, index) => ({
      // 原始資料保留用於狀態判斷
      ...item,
      // 表格顯示欄位處理
      rowNumber: index + 1, // NO.
      planFinishDate: item.planFinishDate || "--", // 訂單交期
      orderNumber: "--", // 訂單單號 (無對應資料)
      workOrderSN: item.workOrderSN || "--", // 製令單號
      productName: item.productName || "--", // 產品名稱
      workOrderQuantity: item.workOrderQuantity || "--", // 製令數量
      processOne: item.processOne || "--", // 一射
      processTwo: item.processTwo || "--", // 二射
      inspection: "--", // 檢驗狀態 (保留欄位)
      shipment: "--", // 出貨狀態 (保留欄位)
    }));
  };

  const processedData = processData(data);

  return (
    <ProductionTable
      width="100%"
      height="650px"
      initialData={processedData}
      header={TABLE_HEADER}
      fieldMapping={FIELD_MAPPING}
      columnWidths={COLUMN_WIDTHS}
      columnAligns={COLUMN_ALIGNS}
      statusRules={TABLE_STATUS_CONFIG}
      rowNum={14}
    />
  );
}

export default DailyProductionTasksDashboard;
