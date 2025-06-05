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

//* 設備資料模型，對應C1-C9九台機器，根據圖片布局
const equipmentData = [
  // 上排機台 (C1-C3, C8)
  {
    id: 'C1',
    model: 'RT-778876',
    goodRate: 44,
    completionRate: 53,
    status: MACHINE_STATUS.TESTING,
    gridArea: 'c1'
  },
  {
    id: 'C2',
    model: 'HQ-917382',
    goodRate: 26,
    completionRate: 83,
    status: MACHINE_STATUS.WARNING,
    gridArea: 'c2'
  },
  {
    id: 'C3',
    model: 'OI-782492',
    goodRate: 28,
    completionRate: 99,
    status: MACHINE_STATUS.NORMAL,
    gridArea: 'c3'
  },
  {
    id: 'C8',
    model: '--',
    goodRate: 0,
    completionRate: 0,
    status: MACHINE_STATUS.SHUTDOWN,
    gridArea: 'c8'
  },
  // 下排機台 (C4-C7, C9)
  {
    id: 'C9',
    model: 'OM-935176',
    goodRate: 77,
    completionRate: 22,
    status: MACHINE_STATUS.NORMAL,
    gridArea: 'c9'
  },
  {
    id: 'C4',
    model: '--',
    goodRate: 0,
    completionRate: 0,
    status: MACHINE_STATUS.SHUTDOWN,
    gridArea: 'c4'
  },
  {
    id: 'C5',
    model: '--',
    goodRate: 0,
    completionRate: 0,
    status: MACHINE_STATUS.SHUTDOWN,
    gridArea: 'c5'
  },
  {
    id: 'C6',
    model: 'MH-713254',
    goodRate: 56,
    completionRate: 42,
    status: MACHINE_STATUS.WARNING,
    gridArea: 'c6'
  },
  {
    id: 'C7',
    model: 'PG-820090',
    goodRate: 57,
    completionRate: 43,
    status: MACHINE_STATUS.WARNING,
    gridArea: 'c7'
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
    'c8 empty1 c3 c2 c1 '
    'spacer1 spacer2 spacer3 spacer4 spacer5'
    'c9 c4 c5 c6 c7';
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto 1fr auto;
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
      'c1 c2 c3'
      'c8 c9 c4'
      'c5 c6 c7';
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
 * @function ProductionZoneC
 * @description 生產區域C的設備狀態顯示組件，顯示對應工廠布局的機台
 * @returns {JSX.Element} 渲染的生產區域C組件
 */
function ProductionZoneC() {
  return (
    <BaseSection backgroundImage={'/images/ProductionZoneC.jpg'}>
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

export default ProductionZoneC

