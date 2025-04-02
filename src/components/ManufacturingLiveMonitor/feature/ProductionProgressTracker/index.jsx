import { useEffect } from "react";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useHeaderNameStore } from "../../slice/LayoutSlice";

function ProductionProgressTracker({ onChangeSectTitle }) {
  const { setHeaderName } = useHeaderNameStore();
  useEffect(() => {
    setHeaderName("即時生產進度追蹤");
  }, []);

  return (
    <section>
      <Stack spacing={2.5}>
        <Grid container spacing={2.5}>
          <Grid spacing={6}></Grid>
          <Grid spacing={6}></Grid>
        </Grid>
        <Grid container spacing={2.5}>
          <Grid spacing={12}></Grid>
        </Grid>
      </Stack>
    </section>
  );
}

export default ProductionProgressTracker;
