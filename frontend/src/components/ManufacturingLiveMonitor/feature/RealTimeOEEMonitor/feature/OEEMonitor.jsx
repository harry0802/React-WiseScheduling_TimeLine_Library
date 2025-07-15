import { BorderBox } from "../../../styles/Content";
import { BaseCard } from "../../../components/DashboardCard";
import OEEMonitorBarChart from "../components/Dashboard/OEEMonitorBarChart";
function OEEMonitor() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: "transparent" }}>
        <BaseCard.Header>
          <BaseCard.Title>當日全廠OEE(%)趨勢</BaseCard.Title>
        </BaseCard.Header>
        <BaseCard.Content>
          <OEEMonitorBarChart />
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  );
}

export default OEEMonitor;
