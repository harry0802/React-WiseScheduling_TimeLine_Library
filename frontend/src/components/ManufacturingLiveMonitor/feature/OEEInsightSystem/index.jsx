import { useEffect } from "react";
import { Stack, Grid } from "@mui/material";
import { useHeaderNameStore } from "../../slice/LayoutSlice";
import MachineOperationRate from "./feature/MachineOperationRate";
import MachineOperationSummary from "./feature/MachineOperationSummary";
import DowntimeFactors from "./feature/DowntimeFactors";
import MachineStatusDuration from "./feature/MachineStatusDuration";

function OEEInsightSystem() {
  const { setHeaderName } = useHeaderNameStore();
  useEffect(() => {
    setHeaderName("全廠設備稼動分析");
  }, []);
  return (
    <section>
      <Stack marginTop={1.25} spacing={2.5}>
        <Grid
          container
          spacing={1.25}
          sx={{
            width: "100%",
            height: "430px",
          }}
        >
          <Grid item xs={3}>
            <MachineOperationRate />
          </Grid>
          <Grid item xs={3}>
            <MachineOperationSummary />
          </Grid>
          <Grid item xs={6}>
            <DowntimeFactors />
          </Grid>
        </Grid>

        <Grid container spacing={1.25} sx={{ height: "510px" }}>
          <MachineStatusDuration />
        </Grid>
      </Stack>
    </section>
  );
}

export default OEEInsightSystem;
