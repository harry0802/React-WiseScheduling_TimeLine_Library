import { Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const TimeInfo = ({ disabled }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" color="primary" gutterBottom>
        時程安排
      </Typography>
      <Grid container spacing={2}>
        {/* 時間相關欄位 */}
      </Grid>
    </Grid>
  );
};

export default TimeInfo;
