import React from "react";
import ProductionTable from "../../../../components/Carousel/CarouselTable/CarouselTable";
import { DEVICE_STATUS_COLORS } from "../../../../configs/Color";
import { useGetMachineAccumulatedTimeQuery } from "../../../../services";

function RealTimeDeviceTrackerDashbord() {
  // API 調用：獲取機台累計時間資料
  const {
    data: apiData,
    isLoading,
    isError,
    error,
  } = useGetMachineAccumulatedTimeQuery();

  if (!apiData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          fontSize: "16px",
          color: "#666",
        }}
      >
        資料載入中...
      </div>
    );
  }
  if (apiData.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          fontSize: "16px",
          color: "#666",
        }}
      >
        無資料
      </div>
    );
  }

  // 載入狀態處理
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          fontSize: "16px",
          color: "#666",
        }}
      >
        資料載入中...
      </div>
    );
  }

  // 錯誤狀態處理
  if (isError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          fontSize: "16px",
          color: "#ff4d4f",
        }}
      >
        載入失敗：{error?.message || "請稍後重試"}
      </div>
    );
  }

  return (
    <>
      <ProductionTable
        // height={270}
        rowNum={3}
        initialData={apiData || []}
        header={[
          "NO.",
          "機台",
          "生產時間",
          "調機時間",
          "停機時間",
          "試模時間",
          "待機時間",
        ]}
        columnWidths={[70]}
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
              return data?.status === "生產中";
            },
            color: DEVICE_STATUS_COLORS.NORMAL_PRODUCTION,
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          },
          TRIAL_MODE: {
            condition(data) {
              return data?.status === "產品試模";
            },
            color: DEVICE_STATUS_COLORS.TRIAL_MODE,
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          },
          ADJUSTMENT_MODE: {
            condition(data) {
              return data?.status === "上模與調機";
            },
            color: DEVICE_STATUS_COLORS.ADJUSTMENT_MODE,
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          },

          ERROR_STATE: {
            condition(data) {
              return data?.status === "機台停機";
            },
            color: DEVICE_STATUS_COLORS.ERROR_STATE,
            columns: [1, 2, 3, 4, 5, 6, 7, 8],
          },

          SHUTDOWN_STATE: {
            condition(data) {
              return data?.status === "待機中";
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
