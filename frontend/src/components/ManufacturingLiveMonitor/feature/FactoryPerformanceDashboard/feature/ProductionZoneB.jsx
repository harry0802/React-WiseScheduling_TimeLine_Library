import React from "react";
import styled from "styled-components";
import { useGetProductionZoneBQuery } from "../../../services";
import ProductionZoneTemplate from "../components/ProductionZoneTemplate";

//! =============== 1. 設定與常量 ===============
//* 機台位置映射 - 根據machineSN映射到對應的grid位置
const MACHINE_POSITION_MAP = {
  B1: "b1",
  B2: "b2",
  B3: "b3",
  B4: "b4",
  B5: "b5",
  B6: "b6",
  B7: "b7",
  B8: "b8",
  B9: "b9",
  B10: "b10",
  B11: "b11",
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
    "b6 b5 b4 b3 b2 b1 "
    "spacer1 spacer2 spacer3 spacer4 spacer5 spacer6"
    " empty1 b7 b8 b9 b10 b11";
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 1fr auto;
  align-items: center;
  /* 盒模型 */
  gap: 1.25rem;
  padding: 1rem;

  /* 響應式處理 */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "b1 b2 b3"
      "b4 b5 empty"
      "b6 b7 b8"
      "b9 b10 b11";
    gap: 1rem;
  }
`;

/**
 * @function ProductionZoneB
 * @description 生產區域B的設備狀態顯示組件，從API獲取即時資料
 * @returns {JSX.Element} 渲染的生產區域B組件
 */
function ProductionZoneB() {
  // 🔄 使用RTK Query hook獲取生產區域B的資料，啟用輪詢
  const queryResult = useGetProductionZoneBQuery(undefined, {
    pollingInterval: 5000, // 每5秒輪詢一次
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <ProductionZoneTemplate
      zoneName="B"
      backgroundImage="/images/ProductionZoneB.jpg"
      queryResult={queryResult}
      machinePositionMap={MACHINE_POSITION_MAP}
      FactoryLayout={FactoryLayout}
    />
  );
}

export default ProductionZoneB;
