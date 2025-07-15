import { Charts } from "@iimm/data-view-react";
import { DEVICE_STATUS_COLORS, oklchToHex } from "../../../../configs/Color";
import { useGetMachineStatusProportionQuery } from "../../../../services";
import { useMemo } from "react";

function MachineStateTimeRatioPieChart() {
  const {
    data: apiData,
    isLoading,
    error,
  } = useGetMachineStatusProportionQuery();

  // 建立狀態與顏色的精確映射關係（按優先順序排列）
  const STATUS_COLOR_MAP = {
    生產中: DEVICE_STATUS_COLORS.NORMAL_PRODUCTION, // 第1優先 - 鮮亮綠色
    上模與調機: DEVICE_STATUS_COLORS.ADJUSTMENT_MODE, // 第2優先 - 明亮橙色
    機台停機: DEVICE_STATUS_COLORS.ERROR_STATE, // 第3優先 - 金屬灰藍色
    產品試模: DEVICE_STATUS_COLORS.TRIAL_MODE, // 第4優先 - 亮藍色
    待機中: DEVICE_STATUS_COLORS.SHUTDOWN_STATE, // 第5優先 - 鮮明紅色
  };

  const chartData = useMemo(() => {
    if (!apiData || !Array.isArray(apiData)) return [];

    return apiData
      .filter((item) => item.percentage > 0) // 過濾掉 0% 的項目，避免標籤重疊
      .map((item) => ({
        name: item.status,
        value: item.percentage,
      }));
  }, [apiData]);

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
  const chartOption = useMemo(
    () => ({
      color: chartColors(),
      series: [
        {
          type: "pie",
          radius: "75%",
          data: chartData,
          insideLabel: {
            show: true,
            formatter: "{percent}%",
            style: {
              fontSize: 17,
              fill: "#fff",
              textAlign: "center",
              textBaseline: "middle",
            },
          },

          outsideLabel: {
            show: true,
            formatter: "{name}",
            style: {
              fontSize: 14,
              fill: "#fff",
            },
          },
        },
      ],
    }),
    [chartData, chartColors]
  );

  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height: "270px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#ff6b6b" }}>資料載入失敗</span>
      </div>
    );
  }

  if (isLoading || !chartData.length) {
    return (
      <div
        style={{
          width: "100%",
          height: "270px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#666" }}>載入中...</span>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "270px" }}>
      <Charts option={chartOption} />
    </div>
  );
}

export default MachineStateTimeRatioPieChart;
