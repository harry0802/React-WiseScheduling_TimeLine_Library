import React from "react";
import BaseSection from "./BaseSection";
import DashboardCard from "./DashboardCard";
import styled from "styled-components";

//! =============== 1. 設定與常量 ===============
//* 設備狀態映射 - 將API返回的machineStatus轉換為卡片狀態
const STATUS_MAPPING = {
  "生產中": "success",
  "產品試模": "testing",
  "調機中": "adjusting",
  "機台停機": "inactive",
  "待機中": "inactive",
  "需注意": "warning",
  "異常狀態": "danger",
  "": "inactive",
  null: "inactive",
  undefined: "inactive",
};

//! =============== 2. 樣式定義 ===============
//* 載入狀態指示器
const LoadingIndicator = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem 2rem;
  border-radius: 8px;
  z-index: 1000;
`;

//* 錯誤提示
const ErrorMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 1000;
`;

//* 卡片容器 - 根據設備ID定位
const CardContainer = styled.div`
  grid-area: ${(props) => props.gridArea};
  display: ${(props) => (props.hidden ? "none" : "block")};
`;

//! =============== 3. 工具函數 ===============
/**
 * 轉換API資料為組件所需格式
 * @param {Array} apiData - 來自API的機台資料
 * @param {Object} machinePositionMap - 機台位置映射表
 * @param {string} productionArea - 生產區域代碼
 * @returns {Array} 轉換後的設備資料陣列
 */
function transformApiData(apiData, machinePositionMap, productionArea) {
  if (!Array.isArray(apiData)) return [];

  return apiData.map((machine) => ({
    id: machine.machineSN || "",
    model: machine.productSN || "--",
    // 轉換小數點為百分比顯示
    goodRate: machine.yield ? Math.round(machine.yield * 100) : 0,
    completionRate: machine.completionRate ? Math.round(machine.completionRate * 100) : 0,
    status: STATUS_MAPPING[machine.machineStatus] || "inactive",
    gridArea:
      machinePositionMap[machine.machineSN] ||
      Object.values(machinePositionMap)[0],
    productionArea: machine.productionArea || productionArea,
  }));
}

/**
 * @function ProductionZoneTemplate
 * @description 可重用的生產區域模板組件
 * @param {Object} props - 組件屬性
 * @param {string} props.zoneName - 區域名稱 (A, B, C, D)
 * @param {string} props.backgroundImage - 背景圖片路徑
 * @param {Object} props.queryResult - RTK Query 查詢結果
 * @param {Object} props.machinePositionMap - 機台位置映射表
 * @param {React.Component} props.FactoryLayout - 工廠布局組件
 * @returns {JSX.Element} 渲染的生產區域組件
 */
function ProductionZoneTemplate({
  zoneName,
  backgroundImage,
  queryResult,
  machinePositionMap,
  FactoryLayout,
}) {
  const { data: apiData, isLoading, isError, error } = queryResult;
  // 🔄 處理載入狀態
  if (isLoading) {
    return (
      <BaseSection backgroundImage={backgroundImage}>
        <LoadingIndicator>載入生產區域{zoneName}資料中...</LoadingIndicator>
      </BaseSection>
    );
  }

  // 🔄 處理錯誤狀態
  if (isError) {
    return (
      <BaseSection backgroundImage={backgroundImage}>
        <ErrorMessage>
          無法載入生產區域{zoneName}資料: {error?.message || "網路連接錯誤"}
        </ErrorMessage>
        <FactoryLayout>
          {/* 顯示空的佔位符 */}
          {Object.keys(machinePositionMap).map((machineId) => (
            <CardContainer
              key={machineId}
              gridArea={machinePositionMap[machineId]}
            >
              <DashboardCard status="inactive">
                <DashboardCard.Header id={machineId} model="--" />
                <DashboardCard.Stats goodRate={0} completionRate={0} />
              </DashboardCard>
            </CardContainer>
          ))}
        </FactoryLayout>
      </BaseSection>
    );
  }

  // 🔄 轉換API資料
  const equipmentData = transformApiData(apiData, machinePositionMap, zoneName);

  return (
    <BaseSection backgroundImage={backgroundImage}>
      <FactoryLayout>
        {equipmentData.map((equipment) => (
          <CardContainer key={equipment.id} gridArea={equipment.gridArea}>
            <DashboardCard status={equipment.status}>
              <DashboardCard.Header id={equipment.id} model={equipment.model} />
              <DashboardCard.Stats
                goodRate={equipment.goodRate}
                completionRate={equipment.completionRate}
              />
            </DashboardCard>
          </CardContainer>
        ))}
      </FactoryLayout>
    </BaseSection>
  );
}

export default ProductionZoneTemplate;
