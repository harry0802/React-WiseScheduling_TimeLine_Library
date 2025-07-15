import React from "react";
import styled from "styled-components";
import { useGetProductionZoneDQuery } from "../../../services";
import ProductionZoneTemplate from "../components/ProductionZoneTemplate";

//! =============== 1. 設定與常量 ===============
//* 機台位置映射 - 根據machineSN映射到對應的grid位置
const MACHINE_POSITION_MAP = {
  D1: "d1",
  D2: "d2",
  D3: "d3",
  D4: "d4",
  D5: "d5",
  D6: "d6",
  D7: "d7",
  D8: "d8",
};

//! =============== 2. 樣式定義 ===============
//* 工廠布局容器 - 使用grid佈局實現固定位置
const FactoryLayout = styled.div`
  /* 布局定位 */
  position: fixed;
  inset: 0;
  display: grid;
  width: 100%;
  height: 100vh;
  position: relative;

  /* 網格定義 - D區特殊布局 */
  grid-template-areas:
    "d6 empty1 empty2 empty3 d5"
    "spacer1 spacer2 spacer3 spacer4 spacer5"
    "d7 d1 d2 d3 d4";
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto 400px auto;
  /* 盒模型 */
  gap: 1.25rem;
  padding: 1rem;

  /* 響應式處理 */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "d5 d6 d7"
      "d4 d3 d2"
      "d1 empty1 empty2";
    gap: 1rem;
  }
`;

/**
 * @function ProductionZoneD
 * @description 生產區域D的設備狀態顯示組件，從API獲取即時資料
 * @returns {JSX.Element} 渲染的生產區域D組件
 */
function ProductionZoneD() {
  // 🔄 使用RTK Query hook獲取生產區域D的資料，啟用輪詢
  const queryResult = useGetProductionZoneDQuery(undefined, {
    pollingInterval: 5000, // 每5秒輪詢一次
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <ProductionZoneTemplate
      zoneName="D"
      backgroundImage="/images/ProductionZoneD.jpg"
      queryResult={queryResult}
      machinePositionMap={MACHINE_POSITION_MAP}
      FactoryLayout={FactoryLayout}
    />
  );
}

export default ProductionZoneD;
