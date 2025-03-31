import { BorderBox } from "../../../styles/Content";
import { FlexFlow } from "../../../styles/Dataflow";
import "../../../components/Marks/DashBordrdMark";

import { BaseCard } from "../../../components/DashboardCard";
import MachineStateTimeRatioPieChart from "../components/Dashboard/MachineStateTimeRatioPieChart";

function MachineStateTimeRatio() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: "transparent" }}>
        <BaseCard.Header>
          <BaseCard.Title>
            <FlexFlow>
              <BaseCard.Title>設備狀態時間比例</BaseCard.Title>
            </FlexFlow>
          </BaseCard.Title>
        </BaseCard.Header>
        <BaseCard.Content>
          <MachineStateTimeRatioPieChart />
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  );
}

export default MachineStateTimeRatio;
