import dayjs from "dayjs";
import {
  getStatusName,
  MACHINE_STATUS,
} from "../../configs/schedule/constants";

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
const generateStatusTemplate = (status, startTime, endTime) => `
  <div style="${TIMELINE_ITEM_STYLES.container}">
    <div style="${TIMELINE_ITEM_STYLES.title}">${getStatusName(status)}</div>
    <div style="${TIMELINE_ITEM_STYLES.info}">${startTime} - ${endTime}</div>
  </div>
`;

// 🧠 主模板函數
export const createItemTemplate = (item) => {
  console.log("🚀 ~ createItemTemplate ~ item:", item.orderInfo?.process);
  const startTime = dayjs(item.start).format("HH:mm");
  const endTime = dayjs(item.end).format("HH:mm");

  return item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED
    ? generateOrderTemplate(item)
    : generateStatusTemplate(item.timeLineStatus, startTime, endTime);
};
