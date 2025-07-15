import { useState } from 'react'
import { useGetRecentShippingPanelQuery } from '../../../services'
import { BorderBox } from '../../../styles/Content'
import { FlexFlow } from '../../../styles/Dataflow'
import DashBordrdMark from '../../../components/Marks/DashBordrdMark'
import { STATUS_COLORS, STATUS_NAMES } from '../../../configs/Color'
import { BaseCard } from '../../../components/DashboardCard'
import RecentShippingPanelDashboard from '../components/Dashboard/RecentShippingPanelDashboard'

const MockData = [
  {
    status: STATUS_NAMES.NORMAL,
    color: STATUS_COLORS.NORMAL
  },
  {
    status: STATUS_NAMES.WARNING,
    color: STATUS_COLORS.WARNING
  },
  {
    status: STATUS_NAMES.EXPIRED,
    color: STATUS_COLORS.EXPIRED
  }
]

function RecentShippingPanel() {
  // 使用狀態鉤子控制錯誤信息顯示
  const [errorMessage, setErrorMessage] = useState('')
  
  // 🔄 使用 RTK Query hook 替換 TanStack Query
  const {
    data: recentshippingPanel,
    isLoading,
    isError,
    error
  } = useGetRecentShippingPanelQuery()
  
  // 渲染內容部分
  const renderContent = () => {
    // 處理錯誤狀態
    if (isError) {
      if (!errorMessage) {
        setErrorMessage(error?.message || '當日待出貨即時戰情')
      }
      return <div className='error-container'>{errorMessage}</div>
    }

    // 處理加載狀態
    if (isLoading) {
      return <div className='loading-container'>載入中...</div>
    }

    // 渲染儀表板
    return <RecentShippingPanelDashboard data={recentshippingPanel} />
  }

  return (
    <>
      {recentshippingPanel && (
        <BorderBox>
          <BaseCard style={{ backgroundColor: 'transparent' }}>
            <BaseCard.Header>
              <BaseCard.Title>
                <FlexFlow>
                  <BaseCard.Title>當日待出貨即時戰情</BaseCard.Title>
                  <DashBordrdMark data={MockData} />
                </FlexFlow>
              </BaseCard.Title>
            </BaseCard.Header>
            <BaseCard.Content>{renderContent()}</BaseCard.Content>
          </BaseCard>
        </BorderBox>
      )}
    </>
  )
}

export default RecentShippingPanel

