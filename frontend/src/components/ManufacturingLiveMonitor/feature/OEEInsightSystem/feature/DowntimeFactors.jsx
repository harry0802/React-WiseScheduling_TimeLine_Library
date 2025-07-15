import { BorderBox } from "../../../styles/Content";

import { BaseCard } from "../../../components/DashboardCard";
import DowntimeFactorsDashboard from "../components/Dashboard/DowntimeFactorsDashboard";

function DowntimeFactors() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: "transparent" }}>
        <BaseCard.Header>
          <BaseCard.Title>停機因素占比分析</BaseCard.Title>
        </BaseCard.Header>
        <BaseCard.Content>
          <DowntimeFactorsDashboard />
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  );
}

export default DowntimeFactors;
