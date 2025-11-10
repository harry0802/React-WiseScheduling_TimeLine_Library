import { BorderBox } from '../../../styles/Content'

import { BaseCard } from '../../../components/DashboardCard'
import MachineOperationRateDashboard from '../components/Dashboard/MachineOperationRateDashboard'

function MachineOperationRate() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: 'transparent' }}>
        <BaseCard.Header>
          <BaseCard.Title>當日機台嫁動時間率</BaseCard.Title>
        </BaseCard.Header>
        <BaseCard.Content>
          <MachineOperationRateDashboard />
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  )
}

export default MachineOperationRate

