import DailyProductionDashboard from "../components/Dashboard/DailyProductionDashboard";
import { BorderBox } from "../../../styles/Content";
import DashBordrdMark from "../../../components/Marks/DashBordrdMark";
import { STATUS_COLORS, STATUS_NAMES } from "../../../configs/Color";
import { BaseCard } from "../../../components/DashboardCard";
import { FlexFlow } from "../../../styles/Dataflow";

const MockData = [
  {
    status: STATUS_NAMES.NORMAL,
    color: STATUS_COLORS.NORMAL,
  },
  {
    status: STATUS_NAMES.WARNING,
    color: STATUS_COLORS.WARNING,
  },
  {
    status: STATUS_NAMES.EXPIRED,
    color: STATUS_COLORS.EXPIRED,
  },
];

function DailyProduction() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: "transparent" }}>
        <BaseCard.Header>
          <FlexFlow>
            <BaseCard.Title>本日生產進度</BaseCard.Title>
            <DashBordrdMark data={MockData} />
          </FlexFlow>
        </BaseCard.Header>
        <BaseCard.Content>
          <DailyProductionDashboard />
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  );
}

export default DailyProduction;
