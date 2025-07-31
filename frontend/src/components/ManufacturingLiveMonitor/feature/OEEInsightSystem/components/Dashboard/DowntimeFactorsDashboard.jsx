import { Charts } from "@iimm/data-view-react";
import { useGetMachineOfflineReasonProportionQuery } from "../../../../services/endpoints/oeeInsightApi";
import { useMemo } from "react";

/**
 * 停機因素類別 - 作為基準範本和顯示順序的依據
 * 此陣列保持靜態不變，確保圖表顯示順序的一致性
 */
const DOWNTIME_CATEGORIES = [
  "人員不足",
  "等待物料",
  "塑料未乾",
  "模具維修",
  "機台故障",
  "機台保養",
  "換模換線",
  "異常停機",
];

/**
 * 停機因素儀表板組件
 * 展示各類停機原因的時間分佈分析
 */
function DowntimeFactorsDashboard() {
  // 🔄 使用 RTK Query 獲取停機因素比例資料
  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetMachineOfflineReasonProportionQuery();

  /**
   * 📊 資料轉換核心邏輯
   * 將 API 資料映射到圖表所需的格式
   *
   * 邏輯說明：
   * 1. 遍歷靜態的 DOWNTIME_CATEGORIES 陣列
   * 2. 為每個類別在 API 資料中查找對應的 count 值
   * 3. 如果找到匹配，使用 API 資料的 count 值
   * 4. 如果未找到或 API 資料為空，使用 0 作為預設值
   * 5. 保持與 yAxis.data 相同的順序
   */
  const transformedData = useMemo(() => {
    // 處理 API 資料為空或載入中的情況
    if (!apiData || isLoading || isError) {
      return DOWNTIME_CATEGORIES.map(() => 0);
    }

    // 確保 API 資料為陣列格式
    const dataArray = Array.isArray(apiData) ? apiData : [apiData];

    // 根據 DOWNTIME_CATEGORIES 的順序映射資料
    return DOWNTIME_CATEGORIES.map((category) => {
      const matchedItem = dataArray.find((item) => item.reason === category);
      return matchedItem ? matchedItem.count : 0;
    });
  }, [apiData, isLoading, isError]);

  /**
   * 📈 圖表配置選項
   * 動態生成 series 資料，保持其他配置不變
   */
  const chartOption = useMemo(
    () => ({
      // 基本配置
      color: ["#ff3d43"],

      // 網格配置
      grid: {
        right: "5%",
        top: 0,
        bottom: "10%",
      },

      // X軸配置 - 水平柱狀圖中表示數值
      xAxis: {
        name: "台", // ✨ [修改] 將單位設置為座標軸的名稱
        nameLocation: "end", // ✨ [新增] 確保名稱顯示在軸的末端
        nameTextStyle: {
          // ✨ [新增] 統一名稱與標籤的樣式，並增加一點間距
          fill: "#ffffff",
          fontSize: 20,
          padding: [0, 0, 0, 5], // 避免與最後一個數字重疊
        },
        data: "value",
        min: 0,
        max: 40,
        interval: 2,
        axisLine: {
          show: true,
          style: {
            stroke: "#617485",
            lineWidth: 1,
          },
        },
        splitLine: {
          show: true,
          style: {
            stroke: "#617485",
            lineWidth: 0.5,
          },
        },
        axisLabel: {
          style: {
            fill: "#ffffff",
            fontSize: 20,
          },
          formatter: "{value}", // ✨ [修改] 移除每個標籤後的 "台"
        },
      },

      // Y軸配置 - 水平柱狀圖中表示類別（保持靜態）
      yAxis: {
        name: "",
        data: DOWNTIME_CATEGORIES,
        axisLine: {
          style: {
            stroke: "#6B6565",
            lineWidth: 1,
          },
        },
        axisLabel: {
          style: {
            fill: "#ffffff",
            fontSize: 18,
          },
        },
        splitLine: {
          show: false,
        },
      },

      // 系列數據配置 - 使用動態轉換的資料
      series: [
        {
          type: "bar",
          name: "時間",
          barWidth: 18,
          data: transformedData, // 🎯 使用動態轉換的資料
          label: {
            show: false,
          },
          gradient: {
            color: ["#FF8A80", "#B71C1C"],
          },
          animationCurve: "easeOutCubic",
          animationFrame: 50,
        },
      ],
    }),
    [transformedData]
  );

  // 🔄 載入狀態處理
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          color: "#ffffff",
        }}
      >
        載入停機因素資料中...
      </div>
    );
  }

  // ❌ 錯誤狀態處理
  if (isError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          color: "#ff3d43",
        }}
      >
        無法載入停機因素資料，請稍後再試
      </div>
    );
  }

  // ✅ 正常渲染圖表
  return <Charts option={chartOption} />;
}

export default DowntimeFactorsDashboard;
