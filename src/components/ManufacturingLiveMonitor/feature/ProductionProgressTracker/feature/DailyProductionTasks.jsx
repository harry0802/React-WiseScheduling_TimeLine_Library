import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BorderBox } from '../../../styles/Content'
import { FlexFlow } from '../../../styles/Dataflow'
import DashBordrdMark from '../../../components/Marks/DashBordrdMark'
import { STATUS_COLORS, STATUS_NAMES } from '../../../configs/Color'
import { BaseCard } from '../../../components/DashboardCard'
import DailyProductionTasksDashboard from '../components/Dashboard/DailyProductionTasksDashboard'

//* 資料來源路徑
const DATA_SOURCE =
  'src/components/ManufacturingLiveMonitor/feature/ProductionProgressTracker/mock/DailyProductionTasksMock.json'

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

/**
 * @function useDailyProductionTasks
 * @description 取得每日生產任務資料的 Hook
 * @returns {Object} 查詢結果包含 data, isLoading, isError 等狀態
 */
const useDailyProductionTasks = () => {
  return useQuery({
    queryKey: ['DailyProductionTasksItem'],
    queryFn: async () => {
      try {
        const response = await fetch(DATA_SOURCE)
        if (!response.ok) {
          throw new Error('無法讀取每日生產任務資料')
        }
        return response.json()
      } catch (error) {
        console.error('資料讀取錯誤:', error.message)
        throw error
      }
    }
  })
}

function DailyProductionTasks() {
  // 使用狀態鉤子控制錯誤信息顯示
  const [errorMessage, setErrorMessage] = useState('')

  // 獲取資料和加載狀態
  const {
    data: productionTasks,
    isLoading,
    isError,
    error
  } = useDailyProductionTasks()

  // 渲染內容部分
  const renderContent = () => {
    // 處理錯誤狀態
    if (isError) {
      if (!errorMessage) {
        setErrorMessage(error?.message || '無法讀取每日生產任務資料')
      }
      return <div className='error-container'>{errorMessage}</div>
    }

    // 處理加載狀態
    if (isLoading) {
      return <div className='loading-container'>載入中...</div>
    }

    // 渲染儀表板
    return <DailyProductionTasksDashboard data={productionTasks} />
  }

  return (
    <>
      {productionTasks && (
        <BorderBox>
          <BaseCard style={{ backgroundColor: 'transparent' }}>
            <BaseCard.Header>
              <BaseCard.Title>
                <FlexFlow>
                  <BaseCard.Title>本日生產任務</BaseCard.Title>
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

export default DailyProductionTasks

