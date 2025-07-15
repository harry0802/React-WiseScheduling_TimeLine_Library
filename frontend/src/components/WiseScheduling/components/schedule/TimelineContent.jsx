import dayjs from "dayjs";
import {
  getStatusName,
  MACHINE_STATUS,
  isHistoricalRecord,
} from "../../configs/validations/schedule/constants";

// 🧠 基本樣式定義
const TIMELINE_ITEM_STYLES = {
  container: `
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    padding: 4px 8x;
    width: 100%;
  `,
  title: `
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 2px;
  `,
  info: `
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.6);
  `,
};

// 🧠 工單模板
const generateOrderTemplate = (item, startTime, endTime) => `
  <div style="${TIMELINE_ITEM_STYLES.container}">
    <div style="${TIMELINE_ITEM_STYLES.title}">${item.content}</div>
    <div style="${TIMELINE_ITEM_STYLES.info}">${
  item.orderInfo?.process ?? 0
}%</div>
  </div>
`;

// 🧠 狀態模板
const generateStatusTemplate = (status, startTime, endTime, item) => {
  const isHistorical = isHistoricalRecord(status, item);
  
  const containerStyle = `
    background-color: ${isHistorical ? '#f5f5f5' : '#fff'};
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    padding: 4px 8px;
    width: 100%;
    ${isHistorical ? 'border-left: 4px solid #757575; opacity: 0.8;' : ''}
  `;

  return `
    <div style="${containerStyle}">
      <div style="${TIMELINE_ITEM_STYLES.title}">
        ${getStatusName(status)}
        ${isHistorical ? ' 🔒' : ''}
      </div>
      <div style="${TIMELINE_ITEM_STYLES.info}">
        ${startTime} - ${endTime}
        ${isHistorical ? '<br><small style="color: #757575;">歷史紀錄</small>' : ''}
      </div>
    </div>
  `;
};

// 🧠 主模板函數
export const createItemTemplate = (item) => {
  console.log("🚀 ~ createItemTemplate ~ item:", item.orderInfo?.process);
  const startTime = dayjs(item.start).format("HH:mm");
  const endTime = dayjs(item.end).format("HH:mm");

  return item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED
    ? generateOrderTemplate(item)
    : generateStatusTemplate(item.timeLineStatus, startTime, endTime, item);
};
