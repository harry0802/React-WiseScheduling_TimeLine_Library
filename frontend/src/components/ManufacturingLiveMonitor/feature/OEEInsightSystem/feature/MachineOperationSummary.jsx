import { BorderBox } from "../../../styles/Content";

import { BaseCard } from "../../../components/DashboardCard";
import MachineOperationSummaryDisplay from "../components/MachineOperationSummaryDisplay";

function MachineOperationSummary() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: "transparent" }}>
        <BaseCard.Content>
          <MachineOperationSummaryDisplay
            data={{
              operationTimeMinutes: 5256, // 87小時36分鐘
              operationRate: 36.4,
              machineCount: 7,
              stopCount: 6,
            }}
          />
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  );
}

export default MachineOperationSummary;
