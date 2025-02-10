// orderItems.js
import { DataSet } from "vis-data";
import { MACHINE_CONFIG, MACHINE_STATUS } from "./constants";
import dayjs from "dayjs";

// 🧠 建立工作開始時間
const getWorkStartTime = (date = new Date()) => {
  return dayjs(date)
    .hour(MACHINE_CONFIG.WORK_START_HOUR)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toDate(); // vis.js 需要 Date 物件
};

// ✨ 生成示範訂單
const createDemoOrder = (start = getWorkStartTime()) => {
  const startTime = dayjs(start);

  return {
    // 基礎資訊
    id: "202408160004",
    group: "C1",
    area: "C",
    timeLineStatus: "製立單",

    // 狀態資訊
    status: {
      startTime: startTime.toDate(),
      endTime: null,
      reason: "",
      product: "",
    },

    // 訂單資訊
    orderInfo: {
      start: startTime.toDate(),
      end: startTime.add(4, "hour").toDate(),
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
  };
};

// 生成初始訂單資料
export const generateInitialOrders = () => {
  return new DataSet(
    [createDemoOrder()].map((item) => ({
      ...item,
      start: dayjs(
        item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED
          ? item.orderInfo.start
          : item.status.startTime
      ).toDate(),
      end: dayjs(
        item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED
          ? item.orderInfo.end
          : item.status.endTime || dayjs(item.status.startTime).add(2, "hour")
      ).toDate(),
    }))
  );
};
