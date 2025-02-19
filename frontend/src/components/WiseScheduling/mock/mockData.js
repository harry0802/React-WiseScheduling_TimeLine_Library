export const mockEvents = {
  A: [
    // 原本的資料
    {
      id: "202408160001",
      group: "A1",
      area: "A",
      timeLineStatus: "產品試模",
      status: {
        startTime: new Date("2024-02-19T08:00:00"),
        endTime: new Date("2024-02-19T10:00:00"),
        product: "SP-01048-AR1-01 封蓋外(R)灌包 黑VW326",
      },
      orderInfo: {
        scheduledStartTime: new Date("2024-02-19T08:00:00"),
        scheduledEndTime: new Date("2024-02-19T16:00:00"),
        actualStartTime: new Date("2024-02-19T08:00:00"),
        actualEndTime: null,
        productId: "SP-01048-AR1-01",
        productName: "封蓋外(R)灌包 黑VW326",
        quantity: 1100,
        completedQty: 0,
        process: "廠內成型-IJ01",
        orderStatus: "生產中",
      },
      start: new Date("2024-02-19T08:00:00"),
      end: new Date("2024-02-19T10:00:00"),
    },
    // 新增製立單狀態 - 剛建立
    {
      id: "202408160009",
      group: "A2",
      area: "A",
      timeLineStatus: "製立單",
      status: {
        startTime: new Date("2024-02-19T07:30:00"),
        endTime: new Date("2024-02-19T08:00:00"),
      },
      orderInfo: {
        scheduledStartTime: new Date("2024-02-19T08:00:00"),
        scheduledEndTime: new Date("2024-02-19T12:00:00"),
        actualStartTime: null,
        actualEndTime: null,
        productId: "SP-01050-AR1-02",
        productName: "前保險桿_黑色VW326",
        quantity: 500,
        completedQty: 0,
        process: "廠內成型-IJ01",
        orderStatus: "尚未上機",
      },
      start: new Date("2024-02-19T07:30:00"),
      end: new Date("2024-02-19T08:00:00"),
    },
  ],
  B: [
    // 原本的資料
    {
      id: "202408160002",
      group: "B1",
      area: "B",
      timeLineStatus: "待機中",
      status: {
        startTime: new Date("2024-02-19T08:00:00"),
        endTime: new Date("2024-02-19T12:00:00"),
      },
      orderInfo: {
        scheduledStartTime: new Date("2024-02-19T13:00:00"),
        scheduledEndTime: new Date("2024-02-19T20:00:00"),
        actualStartTime: null,
        actualEndTime: null,
        productId: "SP-02011-BR2-02",
        productName: "側蓋本體(L) 深灰PA738",
        quantity: 800,
        completedQty: 0,
        process: "廠內成型-IJ02",
        orderStatus: "尚未上機",
      },
      start: new Date("2024-02-19T08:00:00"),
      end: new Date("2024-02-19T12:00:00"),
    },
    // 新增製立單狀態 - 準備開始
    {
      id: "202408160010",
      group: "B2",
      area: "B",
      timeLineStatus: "製立單",
      status: {
        startTime: new Date("2024-02-19T07:45:00"),
        endTime: new Date("2024-02-19T08:15:00"),
      },
      orderInfo: {
        scheduledStartTime: new Date("2024-02-19T08:15:00"),
        scheduledEndTime: new Date("2024-02-19T16:15:00"),
        actualStartTime: null,
        actualEndTime: null,
        productId: "SP-02013-BR2-03",
        productName: "後保險桿_銀灰PA739",
        quantity: 700,
        completedQty: 0,
        process: "廠內成型-IJ02",
        orderStatus: "尚未上機",
      },
      start: new Date("2024-02-19T07:45:00"),
      end: new Date("2024-02-19T08:15:00"),
    },
  ],
  C: [
    // 原本的資料
    {
      id: "202408160003",
      group: "C1",
      area: "C",
      timeLineStatus: "機台停機",
      status: {
        startTime: new Date("2024-02-19T09:00:00"),
        endTime: new Date("2024-02-19T11:00:00"),
        reason: "定期保養",
      },
      orderInfo: {
        scheduledStartTime: new Date("2024-02-19T13:00:00"),
        scheduledEndTime: new Date("2024-02-19T18:00:00"),
        actualStartTime: null,
        actualEndTime: null,
        productId: "SP-03022-CR3-01",
        productName: "前保險桿 黑色VW326",
        quantity: 500,
        completedQty: 0,
        process: "廠內成型-IJ03",
        orderStatus: "尚未上機",
      },
      start: new Date("2024-02-19T09:00:00"),
      end: new Date("2024-02-19T11:00:00"),
    },
    // 新增製立單狀態 - 延遲開始
    {
      id: "202408160011",
      group: "C2",
      area: "C",
      timeLineStatus: "製立單",
      status: {
        startTime: new Date("2024-02-19T08:30:00"),
        endTime: new Date("2024-02-19T09:00:00"),
      },
      orderInfo: {
        scheduledStartTime: new Date("2024-02-19T09:00:00"),
        scheduledEndTime: new Date("2024-02-19T17:00:00"),
        actualStartTime: null,
        actualEndTime: null,
        productId: "SP-03024-CR3-03",
        productName: "側蓋本體(R)_深灰PA738",
        quantity: 600,
        completedQty: 0,
        process: "廠內成型-IJ03",
        orderStatus: "尚未上機",
      },
      start: new Date("2024-02-19T08:30:00"),
      end: new Date("2024-02-19T09:00:00"),
    },
  ],
  D: [
    {
      id: "202408160004",
      group: "D1",
      area: "D",
      timeLineStatus: "上模與調機",
      status: {
        startTime: new Date("2024-02-19T08:30:00"),
        endTime: new Date("2024-02-19T09:30:00"),
      },
      orderInfo: {
        scheduledStartTime: new Date("2024-02-19T08:00:00"),
        scheduledEndTime: new Date("2024-02-19T16:00:00"),
        actualStartTime: new Date("2024-02-19T08:30:00"),
        actualEndTime: null,
        productId: "SP-04033-DR1-03",
        productName: "後保險桿 銀灰PA739",
        quantity: 1000,
        completedQty: 0,
        process: "廠內成型-IJ04",
        orderStatus: "調機中",
      },
      start: new Date("2024-02-19T08:30:00"),
      end: new Date("2024-02-19T09:30:00"),
    },
    // 新增製立單狀態 - 跨日生產
    {
      id: "202408160012",
      group: "D2",
      area: "D",
      timeLineStatus: "製立單",
      status: {
        startTime: new Date("2024-02-19T23:30:00"),
        endTime: new Date("2024-02-20T00:00:00"),
      },
      orderInfo: {
        scheduledStartTime: new Date("2024-02-20T00:00:00"),
        scheduledEndTime: new Date("2024-02-20T08:00:00"),
        actualStartTime: null,
        actualEndTime: null,
        productId: "SP-04035-DR1-05",
        productName: "側蓋本體(L)_深灰PA738",
        quantity: 800,
        completedQty: 0,
        process: "廠內成型-IJ04",
        orderStatus: "尚未上機",
      },
      start: new Date("2024-02-19T23:30:00"),
      end: new Date("2024-02-20T00:00:00"),
    },
  ],
};

// 機台組列表
export const groups = [
  { id: "A1", area: "A" },
  { id: "A2", area: "A" },
  { id: "B1", area: "B" },
  { id: "B2", area: "B" },
  { id: "C1", area: "C" },
  { id: "C2", area: "C" },
  { id: "D1", area: "D" },
  { id: "D2", area: "D" },
];

// 時間軸狀態列表
export const timeLineStatuses = [
  "製立單",
  "待機中",
  "上模與調機",
  "產品試模",
  "機台停機",
];

// 訂單狀態列表
export const orderStatuses = ["尚未上機", "調機中", "生產中", "已完成"];
