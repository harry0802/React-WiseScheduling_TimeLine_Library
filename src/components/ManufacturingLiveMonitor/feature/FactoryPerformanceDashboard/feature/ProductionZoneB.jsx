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

//* 設備資料模型，對應B1-B11十一台機器，根據圖片布局
const equipmentData = [
  // 上排機台 (B1-B5)
  {
    id: 'B5',
    model: 'BT-244297',
    goodRate: 66,
    completionRate: 30,
    status: MACHINE_STATUS.NORMAL,
    gridArea: 'b5'
  },
  {
    id: 'B4',
    model: 'HQ-917382',
    goodRate: 26,
    completionRate: 63,
    status: MACHINE_STATUS.ADJUSTING,
    gridArea: 'b4'
  },
  {
    id: 'B3',
    model: 'RP-791824',
    goodRate: 11,
    completionRate: 13,
    status: MACHINE_STATUS.NORMAL,
    gridArea: 'b3'
  },
  {
    id: 'B2',
    model: 'JH-498735',
    goodRate: 89,
    completionRate: 91,
    status: MACHINE_STATUS.NORMAL,
    gridArea: 'b2'
  },
  {
    id: 'B1',
    model: 'PJ-719382',
    goodRate: 57,
    completionRate: 17,
    status: MACHINE_STATUS.NORMAL,
    gridArea: 'b1'
  },
  // 下排機台 (B6-B11)
  {
    id: 'B11',
    model: 'BT-244297',
    goodRate: 36,
    completionRate: 20,
    status: MACHINE_STATUS.TESTING,
    gridArea: 'b11'
  },
  {
    id: 'B10',
    model: '--',
    goodRate: 0,
    completionRate: 0,
    status: MACHINE_STATUS.SHUTDOWN,
    gridArea: 'b10'
  },
  {
    id: 'B9',
    model: 'ER-558214',
    goodRate: 34,
    completionRate: 17,
    status: MACHINE_STATUS.TESTING,
    gridArea: 'b9'
  },
  {
    id: 'B8',
    model: 'BAE-9728318',
    goodRate: 36,
    completionRate: 77,
    status: MACHINE_STATUS.TESTING,
    gridArea: 'b8'
  },
  {
    id: 'B7',
    model: 'RT-778876',
    goodRate: 7,
    completionRate: 0,
    status: MACHINE_STATUS.SHUTDOWN,
    gridArea: 'b7'
  },
  {
    id: 'B6',
    model: 'EI-556463',
    goodRate: 41,
    completionRate: 22,
    status: MACHINE_STATUS.NORMAL,
    gridArea: 'b6'
  }
]

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
    'b6 b5 b4 b3 b2 b1 '
    'spacer1 spacer2 spacer3 spacer4 spacer5 spacer6'
    ' empty1 b7 b8 b9 b10 b11';
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
      'b1 b2 b3'
      'b4 b5 empty'
      'b6 b7 b8'
      'b9 b10 b11';
    gap: 1rem;
  }
`

//* 卡片容器 - 根據設備ID定位
const CardContainer = styled.div`
  grid-area: ${(props) => props.gridArea};
  display: ${(props) => (props.hidden ? 'none' : 'block')};
`

/**
 * @function ProductionZoneB
 * @description 生產區域B的設備狀態顯示組件，顯示對應工廠布局的機台
 * @returns {JSX.Element} 渲染的生產區域B組件
 */
function ProductionZoneB() {
  return (
    <BaseSection backgroundImage={'public/images/ProductionZoneB.jpg'}>
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

export default ProductionZoneB

