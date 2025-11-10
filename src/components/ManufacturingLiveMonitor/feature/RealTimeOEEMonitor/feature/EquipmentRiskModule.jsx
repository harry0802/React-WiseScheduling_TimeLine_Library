import { BorderBox } from '../../../styles/Content'

import { FlexFlow } from '../../../styles/Dataflow'
import DashBordrdMark from '../../../components/Marks/DashBordrdMark'
import {
  DEVICE_STATUS_COLORS,
  DEVICE_STATUS_NAMES
} from '../../../configs/Color'

import { BaseCard } from '../../../components/DashboardCard'
import EquipmentRiskModuleDashbord from '../components/Dashboard/EquipmentRiskModuleDashbord'
const MockData = [
  {
    status: DEVICE_STATUS_NAMES.ADJUSTMENT_MODE,
    color: DEVICE_STATUS_COLORS.ADJUSTMENT_MODE
  },
  {
    status: DEVICE_STATUS_NAMES.ERROR_STATE,
    color: DEVICE_STATUS_COLORS.ERROR_STATE
  }
]

function EquipmentRiskModule() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: 'transparent' }}>
        <BaseCard.Header>
          <BaseCard.Title>
            <FlexFlow>
              <BaseCard.Title>設備即時狀態</BaseCard.Title>
              {/* <DashBordrdMark data={MockData} /> */}
            </FlexFlow>
          </BaseCard.Title>
        </BaseCard.Header>
        <BaseCard.Content>
          <EquipmentRiskModuleDashbord />
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  )
}

export default EquipmentRiskModule

