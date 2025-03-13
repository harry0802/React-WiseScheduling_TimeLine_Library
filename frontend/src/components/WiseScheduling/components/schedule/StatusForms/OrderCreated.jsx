// components/StatusForms/OrderCreated.jsx
import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useStatusForm } from "../../../hooks/schedule/useStatusForm";
import {
  FORM_CONFIG,
  VALIDATION_RULES,
} from "../../../configs/validations/schedule/formConfig";
import {
  MACHINE_CONFIG,
  MACHINE_STATUS,
} from "../../../configs/validations/schedule/constants";
import { createAreaMachines } from "../../../configs/validations/schedule/machineGroups";
import { Controller, useFormContext } from "react-hook-form";

const OrderCreated = ({ item, disabled }) => {
  const { register, errors, watch, control, initialized } = useStatusForm(
    MACHINE_STATUS.ORDER_CREATED,
    item
  );
  const selectedArea = watch("area");
  // 直接使用 createAreaMachines 生成當前區域的機台
  const filteredGroups = selectedArea ? createAreaMachines(selectedArea) : [];

  if (!initialized) {
    return <CircularProgress />; // 或其他 loading 狀態
  }
  // 添加完整的防護檢查
  if (!item?.id || !item?.orderInfo || !item?.status) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {/* 基本信息組 */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          基本資訊
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              {...register("id")}
              label="製令單號"
              value={item.id}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              {...register("productName")}
              label="產品名稱"
              value={item.orderInfo.productName}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              {...register("process")}
              label="製程名稱"
              value={item.orderInfo.process}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("area", VALIDATION_RULES.area)}
              select
              label="區域"
              error={!!errors.area}
              helperText={errors.area?.message}
              disabled={disabled}
              value={watch("area") || ""}
            >
              {MACHINE_CONFIG.AREAS.map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("group", VALIDATION_RULES.group)}
              select
              label="機台編號"
              error={!!errors.group}
              helperText={errors.group?.message}
              disabled={disabled || !selectedArea}
              value={watch("group") || filteredGroups[0]?.id || ""}
            >
              {filteredGroups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.content}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>

      {/* 數量組 */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          生產數量
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              {...register("quantity")}
              label="製令數量"
              value={item.orderInfo.quantity}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              {...register("completedQty")}
              label="已完成數量"
              value={item.orderInfo.completedQty}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="完成率"
              value={`${item.orderInfo.completedQty}/${item.orderInfo.quantity}`}
              disabled
            />
          </Grid>
        </Grid>
      </Grid>

      {/* 時間組 */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          時程安排
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="start"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="預計上機日"
                  type="datetime-local"
                  error={!!error}
                  helperText={error?.message || ""}
                  disabled={disabled}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="end"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="預計完成日"
                  type="datetime-local"
                  error={!!error}
                  helperText={error?.message || ""}
                  disabled={disabled}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* 狀態組 */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          生產狀態
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="實際上機日"
              value={
                item.status.startTime
                  ? new Date(item.status.startTime).toLocaleDateString()
                  : ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="延遲完成日" value="" disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="狀態"
              value={item.orderInfo.orderStatus}
              disabled
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderCreated;

// // components/ItemDialog/index.jsx
// import { useForm, FormProvider } from "react-hook-form";

// const ItemDialog = ({ item, mode, ...props }) => {
//   const methods = useForm({
//     defaultValues: {
//       status: item?.status || "ORDER_CREATED",
//       id: "",
//       productName: "",
//       // ... 其他預設值
//     }
//   });

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)}>
//         {/* 根據狀態渲染對應表單 */}
//         {methods.watch("status") === "ORDER_CREATED" && (
//           <OrderCreated
//             item={item}
//             disabled={mode === "view"}
//           />
//         )}

//         {methods.watch("status") === "IDLE" && (
//           <Idle
//             item={item}
//             disabled={mode === "view"}
//           />
//         )}
//       </form>
//     </FormProvider>
//   );
// };
