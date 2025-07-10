import React, { useMemo } from "react";
import { DigitalFlop } from "@iimm/data-view-react";
import styled from "styled-components";
import { useGetMachineUtilizationStatisticsQuery } from "../../../services";

// 假設你的 RTK Query API 定義在 services/dashboardApi.js 或類似路徑
// 請將此替換為你的實際 API 引入路徑

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置和型別定義，便於統一管理

/**
 * @typedef {object} MachineUtilizationData
 * @property {string} utilizationTime - 稼動時間 (格式: "XX時XX分")
 * @property {number} utilizationRate - 稼動率 (百分比)
 * @property {number} runCount - 運行機台數量
 * @property {number} offlineCount - 離線機台數量
 */

//! =============== 2. 類型與介面定義 ===============
//* 定義所有資料結構，幫助理解資料流向

/**
 * @typedef {object} MachineOperationSummaryDisplayProps
 * @property {boolean} [showFormatted=false] - 是否顯示千分位格式。
 */

//! =============== 3. 核心功能實作 ===============

// 儀表板容器
const DashboardContainer = styled.div`
  /* 布局定位 */
  padding-left: 2rem;
  width: 100%;
  max-width: 500px;
  /* 視覺樣式 */
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px;
`;

// 統計項容器
const StatContainer = styled.div`
  /* 盒模型 */
  /* margin-bottom: ${(props) => (props.$isLast ? "0" : "1.5rem")}; */
`;

// 統計項標籤
const StatLabel = styled.div`
  /* 視覺樣式 */
  color: #fff;
  font-size: 1.2rem;
  /* 盒模型 */
  margin-bottom: 0.5rem;
  /* 布局定位 */
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

// 翻牌器容器
const FlopContainer = styled.div`
  /* 盒模型 */
  width: 100%;
  height: 60px;
`;

/**
 * @function MachineOperationSummaryDisplay
 * @description 使用 DataV 的 DigitalFlop 組件和 styled-components 實現的營運統計儀表板。
 * 🧠 此組件現在會從 API 獲取數據。
 * @param {MachineOperationSummaryDisplayProps} props - 組件屬性。
 */
const MachineOperationSummaryDisplay = ({ showFormatted = false }) => {
  // 💡 使用 RTK Query Hook 獲取數據
  const { data, isLoading, error } = useGetMachineUtilizationStatisticsQuery();
  // 避免在組件內部重複解析時間，使用 useMemo 優化
  const parsedUtilizationTime = useMemo(() => {
    if (!data?.utilizationTime) {
      return { hours: 0, minutes: 0 };
    }
    // 解析 "XX時XX分" 格式的時間字串
    const match = data.utilizationTime.match(/(\d+)時(\d+)分/);
    if (match) {
      return {
        hours: parseInt(match[1], 10),
        minutes: parseInt(match[2], 10),
      };
    }
    return { hours: 0, minutes: 0 };
  }, [data?.utilizationTime]);
  // 數據載入中或出錯的處理
  if (isLoading) {
    return <DashboardContainer>載入中...</DashboardContainer>;
  }

  if (error) {
    console.error("獲取稼動統計數據失敗:", error);
    return (
      <DashboardContainer>
        載入失敗: {error.message || "未知錯誤"}
      </DashboardContainer>
    );
  }

  // 確保數據存在，如果 API 返回 null/undefined 或部分數據缺失，提供預設值
  const displayData = {
    utilizationTime: parsedUtilizationTime,
    utilizationRate: data?.utilizationRate ?? 0,
    runCount: data?.runCount ?? 0,
    offlineCount: data?.offlineCount ?? 0,
  };

  // 稼動時間配置
  const timeConfig = {
    number: [
      displayData.utilizationTime.hours,
      displayData.utilizationTime.minutes,
    ],
    content: "{nt}時{nt}分",
    style: {
      fontSize: 45,
      fill: "#fff",
    },
  };

  // 稼動率配置
  const rateConfig = {
    number: [displayData.utilizationRate],
    content: "{nt}%",
    toFixed: 1,
    style: {
      fontSize: 45,
      fill: "#fff",
    },
  };

  // 生產機台數配置
  const machineConfig = {
    number: [displayData.runCount],
    content: "{nt}台",
    style: {
      fontSize: 45,
      fill: "#fff",
    },
    ...(showFormatted && { formatter: formatThousands }),
  };

  // 停機次數配置 (使用 offlineCount 欄位)
  const stopConfig = {
    number: [displayData.offlineCount],
    content: "{nt}筆",
    style: {
      fontSize: 45,
      fill: "#fff",
    },
    ...(showFormatted && { formatter: formatThousands }),
  };

  return (
    <DashboardContainer>
      {/* 稼動時間 */}
      <StatContainer style={{ marginTop: "10px" }}>
        <StatLabel>稼動時間 : </StatLabel>
        <FlopContainer>
          <DigitalFlop
            config={timeConfig}
            style={{ width: "100%", height: "100%" }}
          />
        </FlopContainer>
      </StatContainer>

      {/* 稼動率 */}
      <StatContainer>
        <StatLabel>稼動率 : </StatLabel>
        <FlopContainer>
          <DigitalFlop
            config={rateConfig}
            style={{ width: "100%", height: "100%" }}
          />
        </FlopContainer>
      </StatContainer>

      {/* 生產機台數 */}
      <StatContainer>
        <StatLabel>生產機台數 : </StatLabel>
        <FlopContainer>
          <DigitalFlop
            config={machineConfig}
            style={{ width: "100%", height: "100%" }}
          />
        </FlopContainer>
      </StatContainer>

      {/* 停機次數 */}
      <StatContainer $isLast>
        <StatLabel>離線機台數 : </StatLabel> {/* ⚠️ 根據 API 欄位名調整標籤 */}
        <FlopContainer>
          <DigitalFlop
            config={stopConfig}
            style={{ width: "100%", height: "100%" }}
          />
        </FlopContainer>
      </StatContainer>
    </DashboardContainer>
  );
};

export default MachineOperationSummaryDisplay;

//! =============== 4. 工具函數區 ===============
//* 通用功能區，可被多個模組復用

/**
 * @function formatThousands
 * @description 千分位格式化函數
 * @param {number} number - 要格式化的數字
 * @returns {string|number} - 格式化後的數字
 */
const formatThousands = (number) => {
  if (typeof number !== "number") {
    // ⚠️ 增加類型檢查，防止非數字輸入
    console.warn("formatThousands 收到非數字輸入:", number);
    return number;
  }
  if (number < 1000) return number;

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
