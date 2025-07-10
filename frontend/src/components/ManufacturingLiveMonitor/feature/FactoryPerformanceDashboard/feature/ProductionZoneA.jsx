import React from "react";
import styled from "styled-components";

import ProductionZoneTemplate from "../components/ProductionZoneTemplate";
import { useGetProductionZoneAQuery } from "../../../services";

//! =============== 1. 設定與常量 ===============
//* 機台位置映射 - 根據machineSN映射到對應的grid位置
const MACHINE_POSITION_MAP = {
  A1: "a1",
  A2: "a2",
  A3: "a3",
  A4: "a4",
  A5: "a5",
  A6: "a6",
  A7: "a7",
  A8: "a8",
  A9: "a9",
  A10: "a10",
};

//! =============== 2. 樣式定義 ===============
//* 工廠布局容器 - 使用grid佈局實現固定位置
const FactoryLayout = styled.div`
  /* 布局定位 */
  position: fixed;
  inset: 0;
  display: grid;
  width: 100%;
  height: 100;

  /* 網格定義 - 2排布局，對應照片中的位置 */
  grid-template-areas:
    "a7 a8 a9 a10 . ."
    "empty empty empty empty empty empty"
    "a6 a5 a4 a3 a2 a1";
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 1fr auto;
  align-items: center;
  /* 盒模型 */
  gap: 1.25rem;
  padding: 1rem;

  /* 響應式處理 */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
      "a7 a8 a9"
      "a10 a6 empty"
      "a5 a4 a3"
      "empty a2 a1";
  }
`;

/**
 * @function ProductionZoneA
 * @description 生產區域A的設備狀態顯示組件，從API獲取即時資料
 * @returns {JSX.Element} 渲染的生產區域A組件
 */
function ProductionZoneA() {
  // 🔄 使用RTK Query hook獲取生產區域A的資料，啟用輪詢
  const queryResult = useGetProductionZoneAQuery(undefined, {
    pollingInterval: 5000, // 每5秒輪詢一次
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <ProductionZoneTemplate
      zoneName="A"
      backgroundImage="/images/ProductionZoneA.jpg"
      queryResult={queryResult}
      machinePositionMap={MACHINE_POSITION_MAP}
      FactoryLayout={FactoryLayout}
    />
  );
}

export default ProductionZoneA;
