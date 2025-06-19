import ProductionTable from "../../../../components/Carousel/CarouselTable/CarouselTable";
import { createDateCondition } from "../../../../components/Carousel/CarouselTable/utils";
import { DEVICE_STATUS_COLORS, STATUS_COLORS } from "../../../../configs/Color";
const AlertMockData = [
  {
    id: "01",
    time: "12:43",
    machine: "A7",
    reason: "模具卡件",
  },
  {
    id: "02",
    time: "12:40",
    machine: "A8",
    reason: "射出條件與外觀異常",
  },
  {
    id: "03",
    time: "12:23",
    machine: "A9",
    reason: "射出條件與外觀異常",
  },
  {
    id: "04",
    time: "12:17",
    machine: "B3",
    reason: "射出條件與外觀異常",
  },
  {
    id: "05",
    time: "11:23",
    machine: "B6",
    reason: "射出條件與外觀異常",
  },
  {
    id: "06",
    time: "11:07",
    machine: "C7",
    reason: "模具卡件",
  },
  {
    id: "07",
    time: "10:55",
    machine: "D4",
    reason: "設備故障",
  },
  {
    id: "08",
    time: "10:42",
    machine: "A2",
    reason: "原料問題",
  },
  {
    id: "09",
    time: "10:30",
    machine: "B9",
    reason: "模具卡件",
  },
  {
    id: "10",
    time: "10:15",
    machine: "C3",
    reason: "射出條件與外觀異常",
  },
  {
    id: "11",
    time: "09:48",
    machine: "D8",
    reason: "設備故障",
  },
  {
    id: "12",
    time: "09:32",
    machine: "A5",
    reason: "模具卡件",
  },
  {
    id: "13",
    time: "09:20",
    machine: "B1",
    reason: "射出條件與外觀異常",
  },
  {
    id: "14",
    time: "09:05",
    machine: "C10",
    reason: "設備故障",
  },
  {
    id: "15",
    time: "08:52",
    machine: "D2",
    reason: "原料問題",
  },
  {
    id: "16",
    time: "08:40",
    machine: "A10",
    reason: "模具卡件",
  },
  {
    id: "17",
    time: "08:28",
    machine: "B7",
    reason: "射出條件與外觀異常",
  },
  {
    id: "18",
    time: "08:15",
    machine: "C2",
    reason: "設備故障",
  },
  {
    id: "19",
    time: "08:03",
    machine: "D5",
    reason: "原料問題",
  },
  {
    id: "20",
    time: "07:45",
    machine: "A3",
    reason: "模具卡件",
  },
];

function EquipmentRiskModuleDashbord() {
  return (
    <>
      <ProductionTable
        columnWidths={[70]}
        rowNum={6}
        height={270}
        initialData={AlertMockData}
        header={["NO.", "發生時間", "機台", "原因"]}
        fieldMapping={{
          time: 1,
          machine: 2,
          reason: 3,
        }}
        // statusRules={{
        //   NORMAL_PRODUCTION: {
        //     condition(data) {
        //       return data?.status === "RUN";
        //     },
        //     color: DEVICE_STATUS_COLORS.NORMAL_PRODUCTION,
        //     columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        //   },
        //   TRIAL_MODE: {
        //     condition(data) {
        //       return data?.status === "TESTING";
        //     },
        //     color: DEVICE_STATUS_COLORS.TRIAL_MODE,
        //     columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        //   },
        //   ADJUSTMENT_MODE: {
        //     condition(data) {
        //       return data?.status === "TUNING";
        //     },
        //     color: DEVICE_STATUS_COLORS.ADJUSTMENT_MODE,
        //     columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        //   },

        //   ERROR_STATE: {
        //     condition(data) {
        //       return data?.status === "OFFLINE";
        //     },
        //     color: DEVICE_STATUS_COLORS.ERROR_STATE,
        //     columns: [1, 2, 3, 4, 5, 6, 7, 8],
        //   },

        //   SHUTDOWN_STATE: {
        //     condition(data) {
        //       return data?.status === "IDLE";
        //     },
        //     color: DEVICE_STATUS_COLORS.SHUTDOWN_STATE,
        //     columns: [1, 2, 3, 4, 5, 6, 7, 8],
        //   },
        // }}
      />
    </>
  );
}

export default EquipmentRiskModuleDashbord;
