import { BorderBox } from "../../../styles/Content";

import { FlexFlow } from "../../../styles/Dataflow";
import DashBordrdMark from "../../../components/Marks/DashBordrdMark";
import {
  DEVICE_STATUS_COLORS,
  DEVICE_STATUS_NAMES,
} from "../../../configs/Color";

import { BaseCard } from "../../../components/DashboardCard";
import EquipmentRiskModuleDashbord from "../components/Dashboard/EquipmentRiskModuleDashbord";
const MockData = [
  {
    status: DEVICE_STATUS_NAMES.NORMAL_PRODUCTION,
    color: DEVICE_STATUS_COLORS.NORMAL_PRODUCTION,
  },
  {
    status: DEVICE_STATUS_NAMES.TRIAL_MODE,
    color: DEVICE_STATUS_COLORS.TRIAL_MODE,
  },
  {
    status: DEVICE_STATUS_NAMES.ADJUSTMENT_MODE,
    color: DEVICE_STATUS_COLORS.ADJUSTMENT_MODE,
  },
];

function EquipmentRiskModule() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: "transparent" }}>
        <BaseCard.Header>
          <BaseCard.Title>
            <FlexFlow>
              <BaseCard.Title>設備即時狀態</BaseCard.Title>
              <DashBordrdMark data={MockData} />
            </FlexFlow>
          </BaseCard.Title>
        </BaseCard.Header>
        <BaseCard.Content>
          <EquipmentRiskModuleDashbord />
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  );
}

export default EquipmentRiskModule;
