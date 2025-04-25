// DashboardCard.jsx
import React, { createContext, useContext } from 'react'
import styled, { css } from 'styled-components'

//! =============== 1. 設定與常量 ===============
//* 🧠 狀態配置常量 - 集中管理所有視覺相關屬性
const STATUS_CONFIG = {
  success: {
    bgColor: '#57cc99',
    statusDot: '#00fc2a',
    statusText: '正常運行',
    textShadow: '1px 1px 2px #38a3a5',
    lightColor: '#FFFF8D',
    darkColor: '#80DEEA'
  },
  warning: {
    bgColor: '#4895ef',
    statusDot: '#4895ef',
    statusText: '需注意',
    textShadow: '1px 1px 2px #3f8efc',
    lightColor: '#FFFF8D',
    darkColor: '#80DEEA'
  },
  danger: {
    bgColor: '#f5a091',
    statusDot: '#ff3b30',
    statusText: '異常',
    textShadow: '1px 1px 2px #d0887b',
    lightColor: '#FFFF8D',
    darkColor: '#80DEEA'
  },
  inactive: {
    bgColor: '#d3d3d3',
    statusDot: '#8e8e93',
    statusText: '未啟用',
    textShadow: '1px 1px 2px #b3b3b3',
    lightColor: '#eee',
    darkColor: '#D1D1D1'
  }
}

//* 💡 通用陰影效果 - 抽象重複的樣式定義
const SHADOWS = {
  main: '14px 14px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px #fff',

  hover:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  inner:
    '4px 4px 8px rgba(0, 0, 0, 0.15), -4px -4px 8px rgba(255, 255, 255, 0.2)',
  text: '1px 1px 3px rgba(0, 0, 0, 0.2)'
}

//! =============== 2. 工具函數 ===============
/**
 * 計算顏色的深淺變化
 * @param {string} color - 原始色碼
 * @param {number} amount - 調整量 (正數變亮，負數變暗)
 * @returns {string} 調整後的色碼
 */
function adjustColor(color, amount) {
  if (color === '#d3d3d3' && amount < 0) return '#b3b3b3'
  if (color === '#d3d3d3' && amount > 0) return '#f3f3f3'

  return color
    .replace(/#/g, '')
    .match(/.{2}/g)
    .map((c) => {
      let num = Math.max(0, Math.min(255, parseInt(c, 16) + amount))
      return num.toString(16).padStart(2, '0')
    })
    .join('')
}

//! =============== 3. Context 定義 ===============
//* 建立卡片元件的 Context
const CardContext = createContext()

//! =============== 4. Styled Components ===============
//* 基礎卡片容器
const CardContainer = styled.div`
  border-radius: 50px;
  background: ${(props) =>
    STATUS_CONFIG[props.status]?.bgColor || STATUS_CONFIG.inactive.bgColor};
  box-shadow: ${SHADOWS.main};
  transition: all 0.3s ease;
  padding: 1.5rem;
  width: 100%;
  max-width: 300px;

  /* &:hover {
    box-shadow: ${SHADOWS.hover};
  } */
`

//* 頂部區域排版
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

//* ID 和狀態區域
const IdStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`

//* 設備 ID 樣式
const EquipmentId = styled.span`
  font-size: 2.25rem;
  font-weight: 700;
  color: white;
  text-shadow: ${(props) =>
    STATUS_CONFIG[props.status]?.textShadow ||
    STATUS_CONFIG.inactive.textShadow};
`

//* 狀態指示器容器
const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.75rem;
`

//* 狀態指示點
const StatusDot = styled.span`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: ${(props) =>
    STATUS_CONFIG[props.status]?.statusDot || STATUS_CONFIG.inactive.statusDot};
  margin-right: 0.5rem;
  box-shadow: ${(props) => {
    const color =
      STATUS_CONFIG[props.status]?.bgColor || STATUS_CONFIG.inactive.bgColor
    const darken = adjustColor(color, -25)
    const lighten = adjustColor(color, 25)
    return `4px 4px 8px #${darken}, -4px -4px 8px #${lighten}`
  }};
`

//* 狀態文字
const StatusText = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
  color: white;
  text-shadow: ${(props) =>
    STATUS_CONFIG[props.status]?.textShadow ||
    STATUS_CONFIG.inactive.textShadow};
`

//* 型號標籤
const ModelBadge = styled.div`
  font-size: 1.125rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 500;
  color: white;
  background: ${(props) =>
    STATUS_CONFIG[props.status]?.bgColor || STATUS_CONFIG.inactive.bgColor};
  box-shadow: ${(props) => {
    const color =
      STATUS_CONFIG[props.status]?.bgColor || STATUS_CONFIG.inactive.bgColor
    const darken = adjustColor(color, -25)
    const lighten = adjustColor(color, 25)
    return `4px 4px 8px #${darken}, -4px -4px 8px #${lighten}`
  }};
`

//* 數據區域
const StatsContainer = styled.div`
  border-radius: 1.5rem;
  padding: 1rem;
  background: ${(props) =>
    STATUS_CONFIG[props.status]?.bgColor || STATUS_CONFIG.inactive.bgColor};
  box-shadow: ${SHADOWS.inner};
  display: flex;
`

//* 共用的統計項目樣式
const StatItem = styled.div`
  width: 50%;
  text-align: center;
  padding: ${(props) => (props.isLeft ? '0 0.75rem 0 0' : '0 0 0 0.75rem')};
  ${(props) =>
    !props.isLeft &&
    css`
      border-left: 1px solid rgba(255, 255, 255, 0.2);
    `}
`

//* 統計標題
const StatLabel = styled.span`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: white;
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
`

//* 統計數值容器
const StatValueContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

//* 統計數值
const StatValue = styled.span`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${(props) => {
    if (!props.isActive) return STATUS_CONFIG.inactive.lightColor
    return props.type === 'goodRate'
      ? STATUS_CONFIG[props.status]?.lightColor
      : STATUS_CONFIG[props.status]?.darkColor
  }};
  text-shadow: ${SHADOWS.text};
`

//* 統計單位
const StatUnit = styled.span`
  margin-left: 0.25rem;
  font-size: 1.125rem;
  color: ${(props) => {
    if (!props.isActive) return STATUS_CONFIG.inactive.lightColor
    return props.type === 'goodRate'
      ? STATUS_CONFIG[props.status]?.lightColor
      : STATUS_CONFIG[props.status]?.darkColor
  }};
  text-shadow: ${SHADOWS.text};
`

//! =============== 5. Compound Component 實現 ===============
/**
 * @function DashboardCard
 * @description 設備監控卡片的主元件，使用 Compound Component 模式
 * @param {Object} props - 元件屬性
 * @param {string} props.status - 設備狀態 (success/warning/danger/inactive)
 * @param {React.ReactNode} props.children - 子元件
 * @example
 * <DashboardCard status="success">
 *   <DashboardCard.Header id="A1" model="BT-244297" />
 *   <DashboardCard.Stats goodRate={66} completionRate={30} />
 * </DashboardCard>
 */
function DashboardCard({ status = 'inactive', children }) {
  // ✨ 驗證狀態值是否有效
  const validStatus = Object.keys(STATUS_CONFIG).includes(status)
    ? status
    : 'inactive'

  // 將狀態傳入 Context 供子元件使用
  const contextValue = {
    status: validStatus,
    isActive: validStatus !== 'inactive'
  }

  return (
    <CardContext.Provider value={contextValue}>
      <CardContainer status={validStatus}>{children}</CardContainer>
    </CardContext.Provider>
  )
}

/**
 * @function Header
 * @description 卡片頂部區域，包含設備 ID、狀態指示和型號
 * @param {Object} props - 元件屬性
 * @param {string} props.id - 設備 ID
 * @param {string} props.model - 設備型號
 */
function Header({ id, model }) {
  const { status } = useContext(CardContext)

  return (
    <HeaderContainer>
      <IdStatusContainer>
        <EquipmentId status={status}>{id}</EquipmentId>
        <StatusContainer>
          <StatusDot status={status} />
          <StatusText status={status}>
            {STATUS_CONFIG[status]?.statusText ||
              STATUS_CONFIG.inactive.statusText}
          </StatusText>
        </StatusContainer>
      </IdStatusContainer>

      <ModelBadge status={status}>
        {model !== '--' ? model : '無數據'}
      </ModelBadge>
    </HeaderContainer>
  )
}

/**
 * @function Stats
 * @description 卡片數據區域，顯示良率和完成率
 * @param {Object} props - 元件屬性
 * @param {number} props.goodRate - 良率百分比
 * @param {number} props.completionRate - 完成率百分比
 */
function Stats({ goodRate = 0, completionRate = 0 }) {
  const { status, isActive } = useContext(CardContext)

  return (
    <StatsContainer status={status}>
      <StatItem isLeft>
        <StatLabel>良率</StatLabel>
        <StatValueContainer>
          <StatValue
            isActive={isActive}
            status={status}
            type='goodRate'
          >
            {goodRate}
          </StatValue>
          <StatUnit
            isActive={isActive}
            status={status}
            type='goodRate'
          >
            %
          </StatUnit>
        </StatValueContainer>
      </StatItem>

      <StatItem>
        <StatLabel>完成率</StatLabel>
        <StatValueContainer>
          <StatValue
            isActive={isActive}
            status={status}
            type='completionRate'
          >
            {completionRate}
          </StatValue>
          <StatUnit
            isActive={isActive}
            status={status}
            type='completionRate'
          >
            %
          </StatUnit>
        </StatValueContainer>
      </StatItem>
    </StatsContainer>
  )
}

//! =============== 6. 組合元件 ===============
// 將子元件附加到主元件上
DashboardCard.Header = Header
DashboardCard.Stats = Stats

export default DashboardCard

