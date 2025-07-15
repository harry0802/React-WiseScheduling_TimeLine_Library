import { Charts } from "@iimm/data-view-react";
import { useGetMachineStatusHoursStatisticsQuery } from "../../../../services";
import { useState, useEffect } from "react";

//! =============== 1. 設定與常量 ===============

/**
 * 機台狀態對應顏色配置
 * 使用語義化命名提高可讀性
 */
const STATUS_COLORS = {
  productionHours: "#00c853", // 生產時間 - 綠色
  testingHours: "#29b6f6", // 試模時間 - 藍色
  tuningHours: "#ffa726", // 調機時間 - 橙色
  offlineHours: "#ef5350", // 停機時間 - 紅色
  idleHours: "#9e9e9e", // 待機時間 - 灰色
};

//! =============== 2. 資料轉換函數 ===============

/**
 * 將 API 回傳的陣列資料轉換為圖表所需的物件格式
 *
 * @param {Array<Object>} apiData - API 回傳的機台狀態時數陣列
 * @param {string} apiData[].machineSN - 機台編號
 * @param {number} apiData[].run - 運行時間(小時)
 * @param {number} apiData[].testing - 試模時間(小時)
 * @param {number} apiData[].tuning - 調機時間(小時)
 * @param {number} apiData[].offline - 停機時間(小時)
 * @param {number} apiData[].idle - 閒置時間(小時)
 * @returns {Object} 轉換後的圖表資料物件
 * @returns {Array<string>} returns.machineNames - 機台名稱陣列
 * @returns {Array<number>} returns.productionHours - 生產時間陣列
 * @returns {Array<number>} returns.testingHours - 試模時間陣列
 * @returns {Array<number>} returns.tuningHours - 調機時間陣列
 * @returns {Array<number>} returns.offlineHours - 停機時間陣列
 * @returns {Array<number>} returns.idleHours - 待機時間陣列
 */
function transformApiDataToChartFormat(apiData) {
  // 處理空陣列或無效資料的情況
  if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
    return {
      machineNames: [],
      productionHours: [],
      testingHours: [],
      tuningHours: [],
      offlineHours: [],
      idleHours: [],
    };
  }

  // 將 API 資料轉換為圖表所需的陣列格式
  // 所有陣列中的資料按機台順序一一對應
  const machineNames = apiData.map((item) => item.machineSN);
  const productionHours = apiData.map((item) => item.run);
  const testingHours = apiData.map((item) => item.testing);
  const tuningHours = apiData.map((item) => item.tuning);
  const offlineHours = apiData.map((item) => item.offline);
  const idleHours = apiData.map((item) => item.idle);

  return {
    machineNames,
    productionHours,
    testingHours,
    tuningHours,
    offlineHours,
    idleHours,
  };
}

//! =============== 3. 機台區域分區函數 ===============

/**
 * 根據機台編號首字母對資料進行分區
 *
 * @param {Array<string>} machineNames - 機台名稱陣列
 * @returns {Object} 分區結果物件
 * @returns {Object} returns.zoneGroups - 以區域名稱為key，對應索引陣列為value的物件
 * @returns {Array<string>} returns.availableZones - 存在資料的區域名稱陣列
 *
 * @example
 * // 輸入：['A1', 'A2', 'B1', 'C1', 'A3']
 * // 輸出：{
 * //   zoneGroups: { A: [0, 1, 4], B: [2], C: [3] },
 * //   availableZones: ['A', 'B', 'C']
 * // }
 */
function groupMachinesByZone(machineNames) {
  // 處理空陣列情況
  if (
    !machineNames ||
    !Array.isArray(machineNames) ||
    machineNames.length === 0
  ) {
    return {
      zoneGroups: {},
      availableZones: [],
    };
  }

  // 根據機台編號首字母進行分組
  const zoneGroups = {};

  machineNames.forEach((machineName, index) => {
    // 取得機台編號的首字母作為區域標識
    const zoneKey = machineName.charAt(0).toUpperCase();

    // 如果該區域尚未存在，則初始化為空陣列
    if (!zoneGroups[zoneKey]) {
      zoneGroups[zoneKey] = [];
    }

    // 將當前機台的索引加入對應區域
    zoneGroups[zoneKey].push(index);
  });

  // 取得所有存在資料的區域名稱，並按字母順序排序
  const availableZones = Object.keys(zoneGroups).sort();

  return {
    zoneGroups,
    availableZones,
  };
}

/**
 * 根據區域索引從完整資料中提取指定區域的資料子集
 *
 * @param {Object} fullData - 完整的轉換後資料
 * @param {Array<number>} zoneIndices - 區域內機台的索引陣列
 * @returns {Object} 該區域的資料子集
 */
function extractZoneData(fullData, zoneIndices) {
  // 處理空索引陣列
  if (!zoneIndices || zoneIndices.length === 0) {
    return {
      machineNames: [],
      productionHours: [],
      testingHours: [],
      tuningHours: [],
      offlineHours: [],
      idleHours: [],
    };
  }

  // 根據索引陣列提取對應的資料
  return {
    machineNames: zoneIndices.map((index) => fullData.machineNames[index]),
    productionHours: zoneIndices.map(
      (index) => fullData.productionHours[index]
    ),
    testingHours: zoneIndices.map((index) => fullData.testingHours[index]),
    tuningHours: zoneIndices.map((index) => fullData.tuningHours[index]),
    offlineHours: zoneIndices.map((index) => fullData.offlineHours[index]),
    idleHours: zoneIndices.map((index) => fullData.idleHours[index]),
  };
}

//! =============== 4. 圖表配置生成函數 ===============

/**
 * 根據轉換後的資料生成動態圖表配置
 *
 * @param {Object} transformedData - 經過轉換的圖表資料
 * @param {string} [currentZone] - 當前顯示的區域名稱（用於標題顯示）
 * @returns {Object} ECharts 配置物件
 */
function generateChartOptions(transformedData, currentZone = null) {
  return {
    // 圖表標題 - 根據是否有區域資訊動態調整
    title: {
      text: currentZone
        ? `當日機台各狀態時數統計 - ${currentZone}區`
        : "當日機台各狀態時數統計",
      show: !!currentZone,
      left: "center",
      top: 10,
      textStyle: {
        fill: "#ffffff",
        fontSize: 16,
      },
    },

    // 顏色配置 - 使用優化後的命名
    color: [
      STATUS_COLORS.productionHours,
      STATUS_COLORS.testingHours,
      STATUS_COLORS.tuningHours,
      STATUS_COLORS.offlineHours,
      STATUS_COLORS.idleHours,
    ],

    // 圖例配置
    legend: {
      orient: "horizontal",
      right: 20,
      top: 20,
      data: ["生產時間", "試模時間", "調機時間", "停機時間", "待機時間"],
      textStyle: {
        fill: "#ffffff",
      },
      itemGap: 15,
    },

    // X軸配置 - 使用動態機台名稱
    xAxis: {
      data: transformedData.machineNames,
      boundaryGap: true,
      axisLine: {
        style: {
          stroke: "#333333",
        },
      },
      axisLabel: {
        style: {
          fill: "#ffffff",
          fontSize: 16,
        },
      },
      axisTick: {
        show: false,
      },
    },

    // Y軸配置
    yAxis: {
      name: "時",
      nameTextStyle: {
        fill: "#ffffff",
        fontSize: 20,
      },
      data: "value",
      min: 0,
      max: 24,
      interval: 2,
      axisLine: {
        style: {
          stroke: "#333333",
        },
      },
      axisLabel: {
        style: {
          fill: "#ffffff",
          fontSize: 18,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        style: {
          stroke: "#333333",
        },
      },
    },

    // 系列配置 - 使用動態資料
    series: [
      {
        name: "生產時間",
        type: "bar",
        data: transformedData.productionHours,
        barWidth: 20,
        barGap: "10%",
        barStyle: {
          fill: STATUS_COLORS.productionHours,
        },
      },
      {
        name: "試模時間",
        type: "bar",
        data: transformedData.testingHours,
        barWidth: 20,
        barGap: "10%",
        barStyle: {
          fill: STATUS_COLORS.testingHours,
        },
      },
      {
        name: "調機時間",
        type: "bar",
        data: transformedData.tuningHours,
        barWidth: 20,
        barGap: "10%",
        barStyle: {
          fill: STATUS_COLORS.tuningHours,
        },
      },
      {
        name: "停機時間",
        type: "bar",
        data: transformedData.offlineHours,
        barWidth: 20,
        barGap: "10%",
        barStyle: {
          fill: STATUS_COLORS.offlineHours,
        },
      },
      {
        name: "待機時間",
        type: "bar",
        data: transformedData.idleHours,
        barWidth: 20,
        barGap: "10%",
        barStyle: {
          fill: STATUS_COLORS.idleHours,
        },
      },
    ],

    // 背景設置
    backgroundColor: "#0c1426",

    // 網格設置 - 根據是否顯示標題調整頂部間距
    grid: {
      top: currentZone ? 60 : 40,
      left: 40,
      right: 40,
      bottom: 40,
    },
  };
}

//! =============== 5. 主要組件 ===============

/**
 * 機台狀態時數統計儀表板組件
 *
 * 整合 RTK Query 獲取即時機台狀態時數資料，
 * 並透過堆疊長條圖呈現各機台的不同狀態時數分佈
 *
 * 核心功能：
 * - 當機台總數 > 10 時，按區域（A、B、C、D等）輪播顯示
 * - 當機台總數 ≤ 10 時，靜態顯示所有機台
 * - 自動輪播間隔為 5 秒
 *
 * @returns {JSX.Element} 機台狀態時數統計圖表
 */
function MachineStatusDurationDashboard() {
  // 使用 RTK Query 獲取機台狀態時數統計資料
  const {
    data: apiData,
    isLoading,
    isError,
    error,
  } = useGetMachineStatusHoursStatisticsQuery();

  // 資料轉換：將 API 陣列格式轉換為圖表所需的物件格式
  const transformedData = transformApiDataToChartFormat(apiData);

  // 區域輪播狀態管理
  const [zoneIndex, setZoneIndex] = useState(0);

  // 判斷是否需要啟用輪播功能（機台總數 > 10）
  const shouldEnableCarousel = transformedData.machineNames.length > 10;

  // 根據機台名稱進行區域分組
  const { zoneGroups, availableZones } = groupMachinesByZone(
    transformedData.machineNames
  );

  // 自動輪播邏輯：每 5 秒切換到下一個區域
  useEffect(() => {
    // 只有在需要輪播且有多個區域時才啟用定時器
    if (!shouldEnableCarousel || availableZones.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setZoneIndex((prevIndex) => (prevIndex + 1) % availableZones.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [shouldEnableCarousel, availableZones.length]);

  // 當 API 資料變更時，重置輪播索引
  useEffect(() => {
    setZoneIndex(0);
  }, [apiData]);

  // 決定要顯示的資料和當前區域
  const { displayData, currentZone } =
    shouldEnableCarousel && availableZones.length > 0
      ? (() => {
          const currentZoneName = availableZones[zoneIndex];
          const zoneIndices = zoneGroups[currentZoneName];
          return {
            displayData: extractZoneData(transformedData, zoneIndices),
            currentZone: currentZoneName,
          };
        })()
      : {
          displayData: transformedData,
          currentZone: null,
        };

  // 生成動態圖表配置
  const chartOptions = generateChartOptions(displayData, currentZone);

  // 載入中狀態
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          color: "#ffffff",
          backgroundColor: "#0c1426",
        }}
      >
        載入中...
      </div>
    );
  }

  // 錯誤狀態
  if (isError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          color: "#ef5350",
          backgroundColor: "#0c1426",
        }}
      >
        載入失敗：{error?.message || "無法取得機台狀態資料"}
      </div>
    );
  }

  // 無資料狀態
  if (!displayData.machineNames.length) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          color: "#9e9e9e",
          backgroundColor: "#0c1426",
        }}
      >
        暫無機台狀態資料
      </div>
    );
  }

  // 正常渲染圖表
  return (
    <Charts option={chartOptions} style={{ width: "100%", height: "400px" }} />
  );
}

export default MachineStatusDurationDashboard;
