import { BorderBox } from '../../../styles/Content'

import { FlexFlow } from '../../../styles/Dataflow'
import DashBordrdMark from '../../../components/Marks/DashBordrdMark'
import { STATUS_COLORS, STATUS_NAMES } from '../../../configs/Color'
import OverdueTasksDashbord from '../components/Dashboard/OverdueTasksDashbord'

import { BaseCard } from '../../../components/DashboardCard'

const MockData = [
  {
    status: STATUS_NAMES.WARNING,
    color: STATUS_COLORS.WARNING
  },
  {
    status: STATUS_NAMES.EXPIRED,
    color: STATUS_COLORS.EXPIRED
  }
]

function OverdueTasks() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: 'transparent' }}>
        <BaseCard.Header>
          <BaseCard.Title>
            <FlexFlow>
              <BaseCard.Title>生產逾期任務</BaseCard.Title>
              <DashBordrdMark data={MockData} />
            </FlexFlow>
          </BaseCard.Title>
        </BaseCard.Header>
        <BaseCard.Content>
          <OverdueTasksDashbord />
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  )
}

export default OverdueTasks

