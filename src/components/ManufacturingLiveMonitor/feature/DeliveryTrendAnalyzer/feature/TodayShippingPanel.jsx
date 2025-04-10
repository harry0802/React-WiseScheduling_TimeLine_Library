import { BorderBox } from '../../../styles/Content'
import { BaseCard } from '../../../components/DashboardCard'
import TodayShippingPanelDashboard from '../components/Dashboard/TodayShippingPanelDashboard'
function TodayShippingPanel() {
  return (
    <>
      <BorderBox>
        <BaseCard style={{ backgroundColor: 'transparent' }}>
          <BaseCard.Header>
            <BaseCard.Title>近兩個月出貨即時戰情</BaseCard.Title>
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

