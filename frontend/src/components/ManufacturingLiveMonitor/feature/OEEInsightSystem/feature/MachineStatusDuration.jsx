import { BorderBox } from "../../../styles/Content";

import { BaseCard } from "../../../components/DashboardCard";
import MachineStatusDurationDashboard from "../components/Dashboard/MachineStatusDurationDashboard";
function MachineStatusDuration() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: "transparent" }}>
        <BaseCard.Header>
          <BaseCard.Title>當日機台各狀態時數統計</BaseCard.Title>
        </BaseCard.Header>
        <BaseCard.Content>
          <MachineStatusDurationDashboard />
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  );
}

export default MachineStatusDuration;
