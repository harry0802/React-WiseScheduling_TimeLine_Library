import React from "react";
import BaseSection from "../components/BaseSection";
import DashboardCard from "../components/DashboardCard";
import styled from "styled-components";

//! =============== 1. 設定與常量 ===============
//* 設備資料模型，對應A1-A10十台機器
const equipmentData = [
  // 下排機台 (A1-A6)
  {
    id: "A1",
    model: "BT-244297",
    goodRate: 66,
    completionRate: 30,
    status: "success",
    gridArea: "a1",
  },
  {
    id: "A2",
    model: "--",
    goodRate: 0,
    completionRate: 0,
    status: "inactive",
    gridArea: "a2",
  },
  {
    id: "A3",
    model: "--",
    goodRate: 0,
    completionRate: 0,
    status: "inactive",
    gridArea: "a3",
  },
  {
    id: "A4",
    model: "WQ-87439",
    goodRate: 20,
    completionRate: 30,
    status: "warning",
    gridArea: "a4",
  },
  {
    id: "A5",
    model: "--",
    goodRate: 0,
    completionRate: 0,
    status: "inactive",
    gridArea: "a5",
  },
  {
    id: "A6",
    model: "--",
    goodRate: 0,
    completionRate: 0,
    status: "inactive",
    gridArea: "a6",
  },
  // 上排機台 (A7-A10)
  {
    id: "A7",
    model: "BT-244297",
    goodRate: 66,
    completionRate: 30,
    status: "danger",
    gridArea: "a7",
  },
  {
    id: "A8",
    model: "BT-244297",
    goodRate: 66,
    completionRate: 30,
    status: "danger",
    gridArea: "a8",
  },
  {
    id: "A9",
    model: "BT-244297",
    goodRate: 66,
    completionRate: 30,
    status: "success",
    gridArea: "a9",
  },
  {
    id: "A10",
    model: "--",
    goodRate: 0,
    completionRate: 0,
    status: "inactive",
    gridArea: "a10", // 這台沒有卡片顯示在截圖中，先設為未啟用
  },
];

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
  grid-template-rows: 2, 300, 1fr;
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

//* 卡片容器 - 根據設備ID定位
const CardContainer = styled.div`
  grid-area: ${(props) => props.gridArea};
  display: ${(props) => (props.hidden ? "none" : "block")};
`;

/**
 * @function ProductionZoneA
 * @description 生產區域A的設備狀態顯示組件，顯示對應工廠布局的機台
 * @returns {JSX.Element} 渲染的生產區域A組件
 */
function ProductionZoneA() {
  return (
    <BaseSection backgroundImage={"public/images/ProductionZoneA.jpg"}>
      <FactoryLayout>
        {equipmentData.map((equipment) => (
          <CardContainer
            key={equipment.id}
            gridArea={equipment.gridArea}
            // hidden={equipment.id === 'A10'} // A10沒有卡片顯示在截圖中
          >
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

export default ProductionZoneA;
