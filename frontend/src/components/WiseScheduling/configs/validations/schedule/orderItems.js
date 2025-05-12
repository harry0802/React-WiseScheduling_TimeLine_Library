/**
 * @file orderItems.js
 * @description 處理訂單和排程數據的函數
 * @version 2.0.0
 */

import { DataSet } from "vis-data";
import { MACHINE_CONFIG, MACHINE_STATUS, getStatusClass } from "./constants";
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
      scheduledStartTime: startTime.toDate(), // 預計開始時間
      scheduledEndTime: startTime.add(4, "hour").toDate(), // 預計結束時間
      actualStartTime: null, // 實際開始時間
      actualEndTime: null, // 實際結束時間
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

/**
 * @function mapItemToVisDataFormat
 * @description 將項目映射到 vis-data 格式
 * @param {Object} item - 原始項目數據
 * @returns {Object} vis-data 格式的項目
 */
export const mapItemToVisDataFormat = (item) => {
  // 檢查是否為過去的項目
  const isPastItem =
    (item.orderInfo.actualStartTime &&
      new Date(item.orderInfo.actualStartTime) < new Date()) ||
    (item.orderInfo.scheduledStartTime &&
      new Date(item.orderInfo.scheduledStartTime) < new Date()) ||
    (item.status.startTime && new Date(item.status.startTime) < new Date());

  let editableOptions;
  if (isPastItem) {
    // 過去的項目不允許任何操作
    editableOptions = {
      updateTime: false,
      updateGroup: false,
      remove: false,
    };
  } else if (item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED) {
    // OrderCreated 狀態的項目
    editableOptions = {
      updateTime: true, // 允許拖拉調整時間
      updateGroup: true, // 允許修改機台
      remove: false, // 不允許刪除
    };
  } else {
    // 非 OrderCreated 狀態的項目
    editableOptions = {
      updateTime: false, // 不允許拖拉調整時間
      updateGroup: true, // 允許修改機台
      remove: true, // 允許刪除
    };
  }

  return {
    ...item,
    start: dayjs(
      item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED
        ? item.orderInfo.actualStartTime || item.orderInfo.scheduledStartTime
        : item.status.startTime
    ).toDate(),
    end: dayjs(
      item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED
        ? item.orderInfo.actualEndTime || item.orderInfo.scheduledEndTime
        : item.status.endTime || dayjs(item.status.startTime).add(2, "hour") // 預設結束時間為開始後 2 小時
    ).toDate(),
    editable: editableOptions,
  };
};

/**
 * @function transformScheduleData
 * @description 將 API 獲取的排程數據轉換為時間線項目格式
 * @param {Array} scheduleList - API 獲取的排程數據
 * @returns {Array} 轉換後的時間線項目格式數據
 */
export const transformScheduleData = (scheduleList) => {
  if (!Array.isArray(scheduleList)) return [];

  try {
    const transformedItems = scheduleList.map((schedule) => {
      // 這裡需要根據 API 返回的數據結構進行調整
      const startTime = dayjs(
        schedule.startDate || schedule.scheduledStartTime || new Date()
      );
      const endTime = dayjs(
        schedule.endDate ||
          schedule.scheduledEndTime ||
          startTime.add(2, "hour")
      );

      // 預設使用機台的第一個機器，如果有指定則使用指定的
      const machineGroup = schedule.machineId || schedule.machine || "A1";
      const area = machineGroup.match(/[A-Z]/)?.[0] || "A";

      // 使用適當的狀態，如果沒有則使用待機中
      const timeLineStatus = schedule.status || MACHINE_STATUS.IDLE;

      // 創建標準格式的項目
      const item = {
        id:
          schedule.id ||
          `API-SCHEDULE-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
        group: machineGroup,
        area,
        timeLineStatus,

        status: {
          startTime: startTime.toDate(),
          endTime: endTime.toDate(),
          reason: schedule.reason || "",
          product: schedule.product || schedule.productName || "",
        },

        orderInfo: {
          scheduledStartTime: startTime.toDate(),
          scheduledEndTime: endTime.toDate(),
          actualStartTime: schedule.actualStartTime
            ? dayjs(schedule.actualStartTime).toDate()
            : null,
          actualEndTime: schedule.actualEndTime
            ? dayjs(schedule.actualEndTime).toDate()
            : null,
          productId: schedule.productId || "",
          productName: schedule.productName || schedule.product || "未命名產品",
          quantity: schedule.quantity || 0,
          completedQty: schedule.completedQty || 0,
          process: schedule.process || "未知工序",
          orderStatus: schedule.orderStatus || "未知狀態",
        },

        className: getStatusClass(timeLineStatus),
        content: schedule.productName || schedule.product || timeLineStatus,
      };

      // 映射到 vis-data 格式
      return mapItemToVisDataFormat(item);
    });

    return transformedItems;
  } catch (error) {
    console.error("轉換排程數據時出錯:", error);
    return [];
  }
};

/**
 * @function generateInitialOrders
 * @description 生成初始訂單數據
 * @returns {DataSet} 訂單數據集
 */
export const generateInitialOrders = () => {
  // 創建一個基本時間作為參考點
  const now = new Date();
  const baseTime = getWorkStartTime(now);

  // 創建測試資料陣列
  const testData = [
    // 原始示範訂單
    createDemoOrder(baseTime),

    // 測試案例 1：兩個重疊的訂單（一個 OrderCreated，一個 Idle）
    {
      id: "ORDER-CREATED-TEST-01",
      group: "A1", // 相同機台
      area: "A",
      timeLineStatus: "製立單", // OrderCreated 狀態
      status: {
        startTime: dayjs(baseTime).add(1, "hour").toDate(),
        endTime: dayjs(baseTime).add(6, "hour").toDate(), // 時間重疊部分
        reason: "",
        product: "塑膠管件A型",
      },
      orderInfo: {
        scheduledStartTime: dayjs(baseTime).add(1, "hour").toDate(),
        scheduledEndTime: dayjs(baseTime).add(6, "hour").toDate(),
        actualStartTime: null,
        actualEndTime: null,
        productId: "PROD-A001",
        productName: "塑膠管件A型",
        quantity: 500,
        completedQty: 0,
        process: "廠內-成型-IJ01",
        orderStatus: "尚未上機",
      },
      className: "status-producing",
      content: "塑膠管件A型",
    },

    {
      id: "IDLE-TEST-01",
      group: "A1", // 相同機台
      area: "A",
      timeLineStatus: "待機中", // Idle 狀態
      status: {
        startTime: dayjs(baseTime).add(3, "hour").toDate(), // 與 OrderCreated 重疊
        endTime: dayjs(baseTime).add(8, "hour").toDate(),
        reason: "待排程",
        product: "",
      },
      orderInfo: {
        scheduledStartTime: dayjs(baseTime).add(3, "hour").toDate(),
        scheduledEndTime: dayjs(baseTime).add(8, "hour").toDate(),
        actualStartTime: null,
        actualEndTime: null,
        productId: "",
        productName: "",
        quantity: 0,
        completedQty: 0,
        process: "",
        orderStatus: "待機",
      },
      className: "status-idle",
      content: "待機中",
    },

    // 測試案例 2：兩個不重疊的 Setup 狀態
    {
      id: "SETUP-TEST-01",
      group: "B1",
      area: "B",
      timeLineStatus: "上模與調機",
      status: {
        startTime: dayjs(baseTime).add(1, "hour").toDate(),
        endTime: dayjs(baseTime).add(3, "hour").toDate(),
        reason: "準備生產",
        product: "",
      },
      orderInfo: {
        scheduledStartTime: dayjs(baseTime).add(1, "hour").toDate(),
        scheduledEndTime: dayjs(baseTime).add(3, "hour").toDate(),
        actualStartTime: null,
        actualEndTime: null,
        productId: "",
        productName: "",
        quantity: 0,
        completedQty: 0,
        process: "",
        orderStatus: "準備中",
      },
      className: "status-setup",
      content: "上模與調機",
    },

    {
      id: "SETUP-TEST-02",
      group: "B1",
      area: "B",
      timeLineStatus: "上模與調機",
      status: {
        startTime: dayjs(baseTime).add(4, "hour").toDate(), // 不重疊
        endTime: dayjs(baseTime).add(6, "hour").toDate(),
        reason: "更換模具",
        product: "",
      },
      orderInfo: {
        scheduledStartTime: dayjs(baseTime).add(4, "hour").toDate(),
        scheduledEndTime: dayjs(baseTime).add(6, "hour").toDate(),
        actualStartTime: null,
        actualEndTime: null,
        productId: "",
        productName: "",
        quantity: 0,
        completedQty: 0,
        process: "",
        orderStatus: "準備中",
      },
      className: "status-setup",
      content: "上模與調機",
    },

    // 測試案例 3：一個 OrderCreated 和一個 Testing 在不同機台
    {
      id: "ORDER-CREATED-TEST-02",
      group: "D1",
      area: "D",
      timeLineStatus: "製立單",
      status: {
        startTime: dayjs(baseTime).add(1, "hour").toDate(),
        endTime: dayjs(baseTime).add(5, "hour").toDate(),
        reason: "",
        product: "金屬配件X系列",
      },
      orderInfo: {
        scheduledStartTime: dayjs(baseTime).add(1, "hour").toDate(),
        scheduledEndTime: dayjs(baseTime).add(5, "hour").toDate(),
        actualStartTime: null,
        actualEndTime: null,
        productId: "PROD-X002",
        productName: "金屬配件X系列",
        quantity: 800,
        completedQty: 0,
        process: "廠內-成型-IJ02",
        orderStatus: "尚未上機",
      },
      className: "status-producing",
      content: "金屬配件X系列",
    },

    {
      id: "TESTING-TEST-01",
      group: "D2", // 不同機台
      area: "D",
      timeLineStatus: "產品試模",
      status: {
        startTime: dayjs(baseTime).add(2, "hour").toDate(),
        endTime: dayjs(baseTime).add(4, "hour").toDate(),
        reason: "品質測試",
        product: "",
      },
      orderInfo: {
        scheduledStartTime: dayjs(baseTime).add(2, "hour").toDate(),
        scheduledEndTime: dayjs(baseTime).add(4, "hour").toDate(),
        actualStartTime: null,
        actualEndTime: null,
        productId: "",
        productName: "",
        quantity: 0,
        completedQty: 0,
        process: "",
        orderStatus: "測試中",
      },
      className: "status-testing",
      content: "產品試模",
    },
  ];

  // 使用工具函數來映射資料
  return new DataSet(testData.map(mapItemToVisDataFormat));
};
