import { BorderBox } from "../../../styles/Content";
import "../../../components/Marks/DashBordrdMark";

import { BaseCard } from "../../../components/DashboardCard";
import { FlexFlow } from "../../../styles/Dataflow";
import DailyProductionDashboard from "../../RealTimeOEEMonitor/components/Dashboard/DailyProductionDashboard";

function DailyIncomingStock() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: "transparent" }}>
        <BaseCard.Content>
          <FlexFlow>
            <DailyProductionDashboard />
          </FlexFlow>
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  );
}

export default DailyIncomingStock;
