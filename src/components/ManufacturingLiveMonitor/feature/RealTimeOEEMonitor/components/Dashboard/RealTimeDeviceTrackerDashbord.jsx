import ProductionTable from "../../../../components/Carousel/CarouselTable/CarouselTable";
import { createDateCondition } from "../../../../components/Carousel/CarouselTable/utils";
import { DEVICE_STATUS_COLORS, STATUS_COLORS } from "../../../../configs/Color";

const MockData = [
  {
    id: "01",
    machine: "A1",
    productionTime: "05:18:25",
    adjustmentTime: "02:12:35",
    downtime: "00:23:24",
    testingTime: "02:12:35",
    waitingTime: "00:23:24",
    status: "RUN",
  },
  {
    id: "02",
    machine: "A2",
    productionTime: "04:12:47",
    adjustmentTime: "02:12:47",
    downtime: "01:53:22",
    testingTime: "02:12:47",
    waitingTime: "00:53:22",
    status: "IDLE",
  },
  {
    id: "03",
    machine: "A3",
    productionTime: "03:45:12",
    adjustmentTime: "01:22:35",
    downtime: "00:45:18",
    testingTime: "01:36:42",
    waitingTime: "00:38:24",
    status: "TUNING",
  },
  {
    id: "04",
    machine: "A4",
    productionTime: "06:12:35",
    adjustmentTime: "01:45:22",
    downtime: "00:32:14",
    testingTime: "01:22:43",
    waitingTime: "00:42:12",
    status: "TESTING",
  },
  {
    id: "05",
    machine: "A5",
    productionTime: "04:32:18",
    adjustmentTime: "02:34:12",
    downtime: "01:12:45",
    testingTime: "01:45:36",
    waitingTime: "00:35:24",
    status: "OFFLINE",
  },
  {
    id: "06",
    machine: "A6",
    productionTime: "05:45:36",
    adjustmentTime: "01:23:45",
    downtime: "00:45:12",
    testingTime: "02:12:18",
    waitingTime: "00:32:42",
    status: "RUN",
  },
  {
    id: "07",
    machine: "A7",
    productionTime: "03:54:28",
    adjustmentTime: "02:32:14",
    downtime: "01:24:36",
    testingTime: "01:45:12",
    waitingTime: "00:42:18",
    status: "IDLE",
  },
  {
    id: "08",
    machine: "A8",
    productionTime: "04:12:36",
    adjustmentTime: "01:45:24",
    downtime: "00:36:48",
    testingTime: "01:36:24",
    waitingTime: "00:48:36",
    status: "TUNING",
  },
  {
    id: "09",
    machine: "A9",
    productionTime: "05:36:48",
    adjustmentTime: "02:24:12",
    downtime: "00:48:36",
    testingTime: "01:48:24",
    waitingTime: "00:36:12",
    status: "TESTING",
  },
  {
    id: "10",
    machine: "A10",
    productionTime: "04:48:36",
    adjustmentTime: "01:36:24",
    downtime: "01:12:36",
    testingTime: "02:24:12",
    waitingTime: "00:54:18",
    status: "OFFLINE",
  },
  {
    id: "11",
    machine: "B1",
    productionTime: "05:24:36",
    adjustmentTime: "02:36:12",
    downtime: "00:54:18",
    testingTime: "01:48:36",
    waitingTime: "00:42:24",
    status: "RUN",
  },
  {
    id: "12",
    machine: "B2",
    productionTime: "04:36:18",
    adjustmentTime: "01:48:24",
    downtime: "01:24:36",
    testingTime: "02:12:18",
    waitingTime: "00:36:12",
    status: "IDLE",
  },
  {
    id: "13",
    machine: "B3",
    productionTime: "03:48:24",
    adjustmentTime: "02:24:36",
    downtime: "00:36:12",
    testingTime: "01:36:48",
    waitingTime: "00:48:24",
    status: "TUNING",
  },
  {
    id: "14",
    machine: "B4",
    productionTime: "05:12:36",
    adjustmentTime: "01:36:48",
    downtime: "00:48:24",
    testingTime: "02:24:36",
    waitingTime: "00:36:48",
    status: "TESTING",
  },
  {
    id: "15",
    machine: "B5",
    productionTime: "04:24:18",
    adjustmentTime: "02:48:36",
    downtime: "01:36:12",
    testingTime: "01:12:48",
    waitingTime: "00:54:36",
    status: "OFFLINE",
  },
  {
    id: "16",
    machine: "B6",
    productionTime: "06:36:24",
    adjustmentTime: "01:12:48",
    downtime: "00:24:36",
    testingTime: "02:36:12",
    waitingTime: "00:48:24",
    status: "RUN",
  },
  {
    id: "17",
    machine: "B7",
    productionTime: "03:48:36",
    adjustmentTime: "02:36:24",
    downtime: "00:36:12",
    testingTime: "01:24:48",
    waitingTime: "00:36:24",
    status: "IDLE",
  },
  {
    id: "18",
    machine: "B8",
    productionTime: "05:24:12",
    adjustmentTime: "01:36:48",
    downtime: "01:12:36",
    testingTime: "02:12:36",
    waitingTime: "00:48:12",
    status: "TUNING",
  },
  {
    id: "19",
    machine: "B9",
    productionTime: "04:12:48",
    adjustmentTime: "02:48:12",
    downtime: "00:48:36",
    testingTime: "01:36:24",
    waitingTime: "00:36:48",
    status: "TESTING",
  },
  {
    id: "20",
    machine: "B10",
    productionTime: "05:36:24",
    adjustmentTime: "01:24:36",
    downtime: "00:36:48",
    testingTime: "02:48:12",
    waitingTime: "00:24:36",
    status: "OFFLINE",
  },
  {
    id: "21",
    machine: "C1",
    productionTime: "04:48:24",
    adjustmentTime: "02:36:12",
    downtime: "01:12:36",
    testingTime: "01:24:48",
    waitingTime: "00:48:36",
    status: "RUN",
  },
  {
    id: "22",
    machine: "C2",
    productionTime: "05:24:36",
    adjustmentTime: "01:12:48",
    downtime: "00:48:24",
    testingTime: "02:36:12",
    waitingTime: "00:36:48",
    status: "IDLE",
  },
  {
    id: "23",
    machine: "C3",
    productionTime: "03:36:12",
    adjustmentTime: "02:24:36",
    downtime: "00:36:48",
    testingTime: "01:48:24",
    waitingTime: "00:24:36",
    status: "TUNING",
  },
  {
    id: "24",
    machine: "C4",
    productionTime: "04:12:48",
    adjustmentTime: "01:48:24",
    downtime: "01:24:12",
    testingTime: "02:12:36",
    waitingTime: "00:36:12",
    status: "TESTING",
  },
  {
    id: "25",
    machine: "C5",
    productionTime: "05:48:36",
    adjustmentTime: "02:12:36",
    downtime: "00:36:24",
    testingTime: "01:36:48",
    waitingTime: "00:48:12",
    status: "OFFLINE",
  },
  {
    id: "26",
    machine: "C6",
    productionTime: "04:36:24",
    adjustmentTime: "01:36:48",
    downtime: "00:48:12",
    testingTime: "02:48:36",
    waitingTime: "00:36:24",
    status: "RUN",
  },
  {
    id: "27",
    machine: "C7",
    productionTime: "06:12:36",
    adjustmentTime: "02:48:24",
    downtime: "01:36:48",
    testingTime: "01:12:36",
    waitingTime: "00:24:48",
    status: "IDLE",
  },
  {
    id: "28",
    machine: "C8",
    productionTime: "04:24:48",
    adjustmentTime: "01:12:36",
    downtime: "00:24:48",
    testingTime: "02:36:24",
    waitingTime: "00:48:12",
    status: "TUNING",
  },
  {
    id: "29",
    machine: "C9",
    productionTime: "05:36:12",
    adjustmentTime: "02:36:24",
    downtime: "00:48:36",
    testingTime: "01:24:48",
    waitingTime: "00:36:24",
    status: "TESTING",
  },
  {
    id: "30",
    machine: "C10",
    productionTime: "03:48:24",
    adjustmentTime: "01:24:48",
    downtime: "01:36:12",
    testingTime: "02:36:24",
    waitingTime: "00:48:36",
    status: "OFFLINE",
  },
  {
    id: "31",
    machine: "D1",
    productionTime: "05:24:36",
    adjustmentTime: "02:36:24",
    downtime: "00:36:48",
    testingTime: "01:48:36",
    waitingTime: "00:36:24",
    status: "RUN",
  },
  {
    id: "32",
    machine: "D2",
    productionTime: "04:12:48",
    adjustmentTime: "01:48:36",
    downtime: "00:24:36",
    testingTime: "02:24:12",
    waitingTime: "00:48:36",
    status: "IDLE",
  },
  {
    id: "33",
    machine: "D3",
    productionTime: "06:48:36",
    adjustmentTime: "02:24:12",
    downtime: "01:48:36",
    testingTime: "01:12:48",
    waitingTime: "00:36:24",
    status: "TUNING",
  },
  {
    id: "34",
    machine: "D4",
    productionTime: "03:36:24",
    adjustmentTime: "01:12:48",
    downtime: "00:36:24",
    testingTime: "02:48:36",
    waitingTime: "00:24:12",
    status: "TESTING",
  },
  {
    id: "35",
    machine: "D5",
    productionTime: "05:12:48",
    adjustmentTime: "02:48:36",
    downtime: "00:24:12",
    testingTime: "01:36:24",
    waitingTime: "00:48:36",
    status: "OFFLINE",
  },
  {
    id: "36",
    machine: "D6",
    productionTime: "04:24:36",
    adjustmentTime: "01:36:24",
    downtime: "01:48:12",
    testingTime: "02:12:48",
    waitingTime: "00:36:24",
    status: "RUN",
  },
  {
    id: "37",
    machine: "D7",
    productionTime: "05:36:48",
    adjustmentTime: "02:12:36",
    downtime: "00:36:24",
    testingTime: "01:24:36",
    waitingTime: "00:48:12",
    status: "IDLE",
  },
  {
    id: "38",
    machine: "D8",
    productionTime: "03:24:12",
    adjustmentTime: "01:24:36",
    downtime: "00:48:24",
    testingTime: "02:36:48",
    waitingTime: "00:36:12",
    status: "TUNING",
  },
  {
    id: "39",
    machine: "D9",
    productionTime: "04:48:36",
    adjustmentTime: "02:36:48",
    downtime: "01:36:24",
    testingTime: "01:48:12",
    waitingTime: "00:24:36",
    status: "TESTING",
  },
  {
    id: "40",
    machine: "D10",
    productionTime: "05:36:12",
    adjustmentTime: "01:48:24",
    downtime: "00:24:36",
    testingTime: "02:36:48",
    waitingTime: "00:36:12",
    status: "OFFLINE",
  },
];

function RealTimeDeviceTrackerDashbord() {
  return (
    <>
      <ProductionTable
        height={270}
        rowNum={6}
        initialData={MockData}
        header={[
          "NO.",
          "機台",
          "生產時間",
          "調機時間",
          "停機時間",
          "試模時間",
          "待機時間",
        ]}
        fieldMapping={{
          machine: 1,
          productionTime: 2,
          adjustmentTime: 3,
          downtime: 4,
          testingTime: 5,
          waitingTime: 6,
        }}
        statusRules={{
          NORMAL_PRODUCTION: {
            condition(data) {
              return data?.status === "RUN";
            },
            color: DEVICE_STATUS_COLORS.NORMAL_PRODUCTION,
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          },
          TRIAL_MODE: {
            condition(data) {
              return data?.status === "TESTING";
            },
            color: DEVICE_STATUS_COLORS.TRIAL_MODE,
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          },
          ADJUSTMENT_MODE: {
            condition(data) {
              return data?.status === "TUNING";
            },
            color: DEVICE_STATUS_COLORS.ADJUSTMENT_MODE,
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          },

          ERROR_STATE: {
            condition(data) {
              return data?.status === "OFFLINE";
            },
            color: DEVICE_STATUS_COLORS.ERROR_STATE,
            columns: [1, 2, 3, 4, 5, 6, 7, 8],
          },

          SHUTDOWN_STATE: {
            condition(data) {
              return data?.status === "IDLE";
            },
            color: DEVICE_STATUS_COLORS.SHUTDOWN_STATE,
            columns: [1, 2, 3, 4, 5, 6, 7, 8],
          },
        }}
      />
    </>
  );
}

export default RealTimeDeviceTrackerDashbord;
