import { BorderBox } from "../../../styles/Content";
import { BaseCard } from "../../../components/DashboardCard";
import Grid from "@mui/material/Grid";
import ProcessText from "../components/ProcessText";
import ProgressBarChart from "../components/Dashboard/ProgressBarChart";

function DailyIncomingStock() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: "transparent" }}>
        <BaseCard.Content>
          <Grid container sx={{ height: "100%", alignItems: "center" }}>
            <Grid xs={9} sx={{ height: "100%", paddingRight: "1.25rem" }}>
              <ProgressBarChart
                inStockPercentage={0}
                inStockGradient={{
                  startColor: "#04B30A",
                  endColor: "#37FFF2",
                }}
                chartId="daily-incoming-stock"
              />
            </Grid>
            <Grid xs={3}>
              <ProcessText
                data={{
                  title: "當日入庫",
                  percentage: 0,
                  quantity: 0,
                }}
              />
            </Grid>
          </Grid>
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  );
}

export default DailyIncomingStock;
