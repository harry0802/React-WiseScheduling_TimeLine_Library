// orderItems.js
import { DataSet } from "vis-data";
import { MACHINE_CONFIG, MACHINE_STATUS } from "./constants";

// 🧠 建立工作開始時間
const getWorkStartTime = (date = new Date()) => {
  const workStart = new Date(date);
  workStart.setHours(MACHINE_CONFIG.WORK_START_HOUR, 0, 0, 0);
  return workStart;
};

// ✨ 生成示範訂單
const createDemoOrder = (start = getWorkStartTime()) => ({
  id: "202408160004",
  group: "C1",
  start,
  end: new Date(start.getTime() + 4 * 60 * 60 * 1000),
  content: "SP-01048-AR1-01 封蓋外(R)灌包 黑VW326",
  className: "status-producing",

  // 💡 狀態信息獨立管理
  status: {
    type: MACHINE_STATUS.PRODUCING,
    startTime: start,
    endTime: null,
  },

  // ⚠️ 訂單詳細信息 - 需要與後端 API 同步
  orderInfo: {
    productId: "SP-01048-AR1-01",
    productName: "封蓋外(R)灌包 黑VW326",
    quantity: 1100,
    completedQty: 0,
    process: "廠內成型-IJ01",
    orderStatus: "尚未上機",
  },
});

// 生成初始訂單資料
export const generateInitialOrders = () => {
  return new DataSet([createDemoOrder()]);
};
