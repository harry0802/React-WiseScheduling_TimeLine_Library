import React from "react";
import styled from "styled-components";
import { useGetProductionZoneCQuery } from "../../../services";
import ProductionZoneTemplate from "../components/ProductionZoneTemplate";

//! =============== 1. 設定與常量 ===============
//* 機台位置映射 - 根據machineSN映射到對應的grid位置
const MACHINE_POSITION_MAP = {
  C1: "c1",
  C2: "c2",
  C3: "c3",
  C4: "c4",
  C5: "c5",
  C6: "c6",
  C7: "c7",
  C8: "c8",
  C9: "c9",
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

  /* 網格定義 - C區特殊布局 */
  grid-template-areas:
    "c8 empty1 c3 c2 c1 "
    "spacer1 spacer2 spacer3 spacer4 spacer5"
    "c9 c4 c5 c6 c7";
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto 1fr auto;
  align-items: center;
  justify-content: space-between;

  /* 盒模型 */
  gap: 1.25rem;
  padding: 1rem;

  /* 響應式處理 */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "c1 c2 c3"
      "c8 c9 c4"
      "c5 c6 c7";
    gap: 1rem;
  }
`;

/**
 * @function ProductionZoneC
 * @description 生產區域C的設備狀態顯示組件，從API獲取即時資料
 * @returns {JSX.Element} 渲染的生產區域C組件
 */
function ProductionZoneC() {
  // 🔄 使用RTK Query hook獲取生產區域C的資料，啟用輪詢
  const queryResult = useGetProductionZoneCQuery(undefined, {
    pollingInterval: 5000, // 每5秒輪詢一次
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <ProductionZoneTemplate
      zoneName="C"
      backgroundImage="/images/ProductionZoneC.jpg"
      queryResult={queryResult}
      machinePositionMap={MACHINE_POSITION_MAP}
      FactoryLayout={FactoryLayout}
    />
  );
}

export default ProductionZoneC;
