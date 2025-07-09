import { Charts } from "@iimm/data-view-react";
import { DEVICE_STATUS_COLORS, oklchToHex } from "../../../../configs/Color";
import { useGetMachineStatusProportionQuery } from "../../../../services";

// 建立狀態與顏色的精確映射關係（按優先順序排列）
const STATUS_COLOR_MAP = {
  生產中: DEVICE_STATUS_COLORS.NORMAL_PRODUCTION, // 第1優先 - 鮮亮綠色
  上模與調機: DEVICE_STATUS_COLORS.ADJUSTMENT_MODE, // 第2優先 - 明亮橙色
  機台停機: DEVICE_STATUS_COLORS.ERROR_STATE, // 第3優先 - 金屬灰藍色
  產品試模: DEVICE_STATUS_COLORS.TRIAL_MODE, // 第4優先 - 亮藍色
  待機中: DEVICE_STATUS_COLORS.SHUTDOWN_STATE, // 第5優先 - 鮮明紅色
};

/**
 * @description 機台運轉率儀表板組件
 * 顯示機台各狀態時間佔比的圓餅圖
 * 使用 RTK Query 從 API 獲取即時資料
 */
function MachineOperationRateDashboard() {
  const {
    data: machineStatusData,
    isLoading,
    isError,
    error,
  } = useGetMachineStatusProportionQuery();

  /**
   * @description 將 API 資料轉換為圖表格式
   * @param {Array} apiData - API 返回的機台狀態資料
   * @returns {Object} 圖表配置物件
   */
  const transformDataForChart = (apiData) => {
    if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
      return getDefaultChartOption();
    }

    // 將 API 資料轉換為圖表需要的格式: name = status, value = percentage
    const chartData = apiData
      .map((item) => ({
        name: item.status,
        value: item.percentage,
      }))
      .filter((item) => item.value > 0);

    // 根據資料順序動態生成對應的顏色陣列
    const chartColors = () => {
      if (!chartData || chartData.length === 0) return [];
      console.log(apiData);

      return chartData.map((item) =>
        oklchToHex(
          STATUS_COLOR_MAP[item.name] || DEVICE_STATUS_COLORS.ERROR_STATE
        )
      );
    };

    return {
      color: chartColors(),
      series: [
        {
          type: "pie",
          data: chartData,
          sortData: true,
          radius: ["50%", "70%"],
          outsideLabel: {
            show: true,
            formatter: "{name} : \n   {percent}%", // 使用 \n 實現換行
            labelLineEndLength: 20, // 引導線長度
            labelLineBendGap: 20, // 引導線彎曲程度
            style: {
              fontSize: 16,
              fill: "#fff",
              fontWeight: "bold",
            },
          },
          insideLabel: {
            style: {
              fontSize: 14,
              fill: "#fff",
              fontWeight: "normal",
            },
          },
        },
      ],
    };
  };

  /**
   * @description 獲取預設圖表配置（用於載入中或錯誤狀態）
   * @returns {Object} 預設圖表配置
   */
  const getDefaultChartOption = () => ({
    color: [oklchToHex(DEVICE_STATUS_COLORS.NORMAL_PRODUCTION)],
    series: [
      {
        type: "pie",
        data: [{ name: "暫無資料", value: 100 }],
        sortData: true,
        radius: ["50%", "70%"],
        outsideLabel: {
          show: true,
          formatter: "{name}",
          style: {
            fontSize: 16,
            fill: "#fff",
            fontWeight: "bold",
          },
        },
        insideLabel: {
          style: {
            fontSize: 14,
            fill: "#fff",
            fontWeight: "normal",
          },
        },
      },
    ],
  });

  /**
   * @description 載入中狀態顯示
   */
  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "16px",
        }}
      >
        載入中...
      </div>
    );
  }

  /**
   * @description 錯誤狀態顯示
   */
  if (isError) {
    console.error("機台狀態資料載入失敗:", error);
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ff6b6b",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        <div>
          <div>資料載入失敗</div>
          <div style={{ fontSize: "12px", marginTop: "8px", opacity: 0.7 }}>
            {error?.message || "請檢查網路連接"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Charts
        option={transformDataForChart(machineStatusData)}
        style={{ height: "300px", width: "100%", margin: "auto" }}
      />
    </div>
  );
}

export default MachineOperationRateDashboard;
