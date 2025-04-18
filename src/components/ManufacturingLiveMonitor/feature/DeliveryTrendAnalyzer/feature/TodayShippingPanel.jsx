import { BorderBox } from '../../../styles/Content'
import { BaseCard } from '../../../components/DashboardCard'
import TodayShippingPanelDashboard from '../components/Dashboard/TodayShippingPanelDashboard'
import { FlexFlow } from '../../../styles/Dataflow'

import DashBordrdMark from '../../../components/Marks/DashBordrdMark'
import { COLORS } from '../config/colors'
const MockData = [
  {
    status: '已交貨量',
    color: COLORS.barColumnGradient
  },
  {
    status: '已交貨率',
    color: COLORS.chartLine
  }
]
function TodayShippingPanel() {
  return (
    <>
      <BorderBox>
        <BaseCard style={{ backgroundColor: 'transparent' }}>
          <BaseCard.Header>
            <FlexFlow>
              <BaseCard.Title>近兩個月出貨即時戰情</BaseCard.Title>
              <DashBordrdMark data={MockData} />
            </FlexFlow>
          </BaseCard.Header>
          <BaseCard.Content>
            <TodayShippingPanelDashboard />
          </BaseCard.Content>
        </BaseCard>
      </BorderBox>
    </>
  )
}

export default TodayShippingPanel

