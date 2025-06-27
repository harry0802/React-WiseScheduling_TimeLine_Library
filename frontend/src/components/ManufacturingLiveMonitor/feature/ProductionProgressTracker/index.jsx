import { useEffect } from "react";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useHeaderNameStore } from "../../slice/LayoutSlice";
import DailyIncomingStock from "./feature/DailyInComingStock";
import NextThreeDaysIncomingStock from "./feature/NextThreeDaysIncomingStock";
import DailyProductionTasks from "./feature/DailyProductionTasks";

function ProductionProgressTracker() {
  const { setHeaderName } = useHeaderNameStore();
  useEffect(() => {
    setHeaderName("即時生產進度追蹤");
  }, []);

  return (
    <section>
      <Stack marginTop={1.25} spacing={2.5}>
        <Grid container spacing={2.5}>
          <Grid xs={6}>
            <DailyIncomingStock />
          </Grid>
          <Grid xs={6}>
            <NextThreeDaysIncomingStock />
          </Grid>
        </Grid>
        <Grid container spacing={2.5}>
          <Grid xs={12}>
            <DailyProductionTasks />
          </Grid>
        </Grid>
      </Stack>
    </section>
  );
}

export default ProductionProgressTracker;
