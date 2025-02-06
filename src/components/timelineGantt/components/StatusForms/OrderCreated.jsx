// components/StatusForms/OrderCreated.jsx
import { Grid, TextField, Typography, MenuItem } from "@mui/material";
import { useStatusForm } from "../../hooks/useStatusForm";
import { FORM_CONFIG, VALIDATION_RULES } from "../../configs/formConfig";
import { MACHINE_STATUS } from "../../configs/constants";

const OrderCreated = ({ item, disabled, groups }) => {
  const { register, errors, watch } = useStatusForm(
    MACHINE_STATUS.ORDER_CREATED,
    item
  );

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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("id")}
              label="製令單號"
              value={item.id}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("productName")}
              label="產品名稱"
              value={item.orderInfo.productName}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("group", VALIDATION_RULES.group)}
              select
              label="機台編號"
              error={!!errors.group}
              helperText={errors.group?.message}
              disabled={disabled}
              value={watch("group") || ""}
            >
              {Array.isArray(groups?.get?.()) ? (
                groups.get().map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.content || group.id}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">無可用機台</MenuItem>
              )}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("process")}
              label="製程名稱"
              value={item.orderInfo.process}
              disabled
            />
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
            <TextField
              fullWidth
              {...register("start", VALIDATION_RULES.start)}
              {...FORM_CONFIG.timePickerProps}
              label="預計上機日"
              error={!!errors.start}
              helperText={errors.start?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("end", VALIDATION_RULES.end)}
              {...FORM_CONFIG.timePickerProps}
              label="預計完成日"
              error={!!errors.end}
              helperText={errors.end?.message}
              disabled={disabled}
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
