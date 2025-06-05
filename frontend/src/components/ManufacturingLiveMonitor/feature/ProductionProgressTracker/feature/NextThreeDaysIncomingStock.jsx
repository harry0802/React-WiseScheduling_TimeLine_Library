import { BorderBox } from "../../../styles/Content";
import { BaseCard } from "../../../components/DashboardCard";
import Grid from "@mui/material/Unstable_Grid2";
import ProcessText from "../components/ProcessText";
import ProgressBarChart from "../components/Dashboard/ProgressBarChart";

function NextThreeDaysIncomingStock() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: "transparent" }}>
        <BaseCard.Content>
          <Grid
            container
            spacing={2.5}
            sx={{ height: "100%", alignItems: "center" }}
          >
            <Grid xs={9} sx={{ height: "100%" }}>
              <ProgressBarChart
                inStockPercentage={30}
                inStockGradient={{
                  startColor: "#0491B4",
                  endColor: "#37FFF2",
                }}
                chartId="next-three-days-stock"
              />
            </Grid>
            <Grid sx={{ height: "100%" }} xs={3}>
              <ProcessText
                data={{
                  title: "未來三天入庫",
                  percentage: 30,
                  quantity: 100000,
                }}
              />
            </Grid>
          </Grid>
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  );
}

export default NextThreeDaysIncomingStock;
