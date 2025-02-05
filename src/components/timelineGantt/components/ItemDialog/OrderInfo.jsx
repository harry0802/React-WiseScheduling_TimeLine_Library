// components/ItemDialog/OrderInfo.jsx
import { Grid, TextField, Typography, MenuItem } from "@mui/material";
import { useFormContext } from "react-hook-form";

const OrderInfo = ({ disabled, groups }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <Grid item xs={12}>
      {/* 基本資訊 */}
      <Typography variant="subtitle1" color="primary" gutterBottom>
        基本資訊
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth {...register("id")} label="製令單號" disabled />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            {...register("group")}
            label="機台"
            disabled={disabled}
            error={!!errors.group}
            helperText={errors.group?.message}
          >
            {groups?.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.content}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            {...register("productName")}
            label="產品名稱"
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            {...register("process")}
            label="製程名稱"
            disabled={disabled}
          />
        </Grid>
      </Grid>

      {/* 數量組 */}
      <Typography
        variant="subtitle1"
        color="primary"
        gutterBottom
        sx={{ mt: 2 }}
      >
        生產數量
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            {...register("quantity")}
            label="製令數量"
            type="number"
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            {...register("completedQty")}
            label="已完成數量"
            type="number"
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="完成率"
            value={`${watch("completedQty")}/${watch("quantity")}`}
            disabled
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderInfo;
