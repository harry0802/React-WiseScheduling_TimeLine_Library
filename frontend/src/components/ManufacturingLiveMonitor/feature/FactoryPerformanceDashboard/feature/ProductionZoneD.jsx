import React from 'react'
import BaseSection from '../components/BaseSection'
import DashboardCard from '../components/DashboardCard'
import styled from 'styled-components'

//! =============== 1. 設定與常量 ===============
//* 設備狀態常量定義
const MACHINE_STATUS = {
  NORMAL: 'success', // 正常生產 - 綠色
  TESTING: 'testing', // 試模狀態 - 藍色
  ADJUSTING: 'adjusting', // 調機狀態 - 黃色
  WARNING: 'warning', // 警告狀態 - 橙色
  SHUTDOWN: 'inactive', // 關機狀態 - 灰色
  ERROR: 'danger' // 異常狀態 - 紅色
}

//* 設備資料模型，對應D1-D7七台機器，根據圖片布局
const equipmentData = [
  // 上排機台 (D5-D6)
  {
    id: 'D5',
    model: 'KJ-571593',
    goodRate: 48,
    completionRate: 29,
    status: MACHINE_STATUS.NORMAL,
    gridArea: 'd5'
  },
  {
    id: 'D6',
    model: '--',
    goodRate: 0,
    completionRate: 0,
    status: MACHINE_STATUS.SHUTDOWN,
    gridArea: 'd6'
  },
  // 下排機台 (D1-D4, D7)
  {
    id: 'D4',
    model: 'HG-38759',
    goodRate: 28,
    completionRate: 77,
    status: MACHINE_STATUS.NORMAL,
    gridArea: 'd4'
  },
  {
    id: 'D3',
    model: 'YG-936687',
    goodRate: 54,
    completionRate: 38,
    status: MACHINE_STATUS.ERROR,
    gridArea: 'd3'
  },
  {
    id: 'D2',
    model: 'VB-359727',
    goodRate: 32,
    completionRate: 92,
    status: MACHINE_STATUS.TESTING,
    gridArea: 'd2'
  },
  {
    id: 'D1',
    model: '--',
    goodRate: 0,
    completionRate: 0,
    status: MACHINE_STATUS.SHUTDOWN,
    gridArea: 'd1'
  },
  {
    id: 'D7',
    model: '--',
    goodRate: 0,
    completionRate: 0,
    status: MACHINE_STATUS.SHUTDOWN,
    gridArea: 'd7'
  }
]

//! =============== 2. 樣式定義 ===============
//* 工廠布局容器 - 使用grid佈局實現固定位置
const FactoryLayout = styled.div`
  /* 布局定位 */
  display: grid;
  width: 100%;
  height: 100vh;
  position: relative;

  /* 網格定義 - 2排布局，對應照片中的位置 */
  grid-template-areas:
    'd6 empty1 empty2 empty3 d5'
    'spacer1 spacer2 spacer3 spacer4 spacer5'
    'd7 d1 d2 d3 d4';
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto 400px auto;
  /* 盒模型 */
  gap: 1.25rem;
  padding: 1rem;

  /* 視覺樣式 */
  background: transparent;

  /* 響應式處理 */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      'd5 d6 d7'
      'd4 d3 d2'
      'd1 empty1 empty2';
    gap: 1rem;
  }
`

//* 卡片容器 - 根據設備ID定位
const CardContainer = styled.div`
  grid-area: ${(props) => props.gridArea};
  display: ${(props) => (props.hidden ? 'none' : 'block')};
  z-index: 10;
`

/**
 * @function ProductionZoneD
 * @description 生產區域D的設備狀態顯示組件，顯示對應工廠布局的機台
 * @returns {JSX.Element} 渲染的生產區域D組件
 */
function ProductionZoneD() {
  return (
    <BaseSection backgroundImage={'/images/ProductionZoneD.jpg'}>
      <FactoryLayout>
        {equipmentData.map((equipment) => (
          <CardContainer
            key={equipment.id}
            gridArea={equipment.gridArea}
          >
            <DashboardCard status={equipment.status}>
              <DashboardCard.Header
                id={equipment.id}
                model={equipment.model}
              />
              <DashboardCard.Stats
                goodRate={equipment.goodRate}
                completionRate={equipment.completionRate}
              />
            </DashboardCard>
          </CardContainer>
        ))}
      </FactoryLayout>
    </BaseSection>
  )
}

export default ProductionZoneD

