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
  // 基礎資訊
  id: "202408160004",
  group: "C1",
  area: "C",
  timeLineStatus: "製立單",

  // 狀態資訊
  status: {
    startTime: start,
    endTime: null,
    reason: "",
    product: "",
  },

  // 訂單資訊
  orderInfo: {
    start: start,
    end: new Date(start.getTime() + 4 * 60 * 60 * 1000),
    actualStart: null,
    actualEnd: null,
    productId: "SP-01048-AR1-01",
    productName: "封蓋外(R)灌包 黑VW326",
    quantity: 1100,
    completedQty: 0,
    process: "廠內成型-IJ01",
    orderStatus: "尚未上機",
  },

  // 視覺相關
  className: "status-producing",
  content: "SP-01048-AR1-01 封蓋外(R)灌包 黑VW326",
});

// 生成初始訂單資料
export const generateInitialOrders = () => {
  return new DataSet(
    [createDemoOrder()].map((item) => ({
      ...item,
      start:
        item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED
          ? item.orderInfo.start
          : item.status.startTime,
      end:
        item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED
          ? item.orderInfo.end
          : item.status.endTime ||
            new Date(item.status.startTime.getTime() + 2 * 60 * 60 * 1000),
    }))
  );
};
