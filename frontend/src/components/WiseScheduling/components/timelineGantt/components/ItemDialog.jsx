//! =============== 1. 設定與常量 ===============
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Stack,
  TextField,
  MenuItem,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FORM_CONFIG, VALIDATION_RULES } from "../configs/formConfig";
import { formUtils } from "../utils/formUtils";
import { useEffect } from "react";

// 🧠 主對話框組件
const ItemDialog = ({
  open,
  onClose,
  item,
  mode = "view",
  onSave,
  onDelete,
  groups,
}) => {
  const defaultGroup = groups?.get()?.[0]?.id || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      ...FORM_CONFIG.defaultValues,
      group: item ? item?.group : defaultGroup, // ✨ 使用第一個選項作為默認值
    },
  });

  // 監聽項目變化重置表單
  useEffect(() => {
    // 確保項目存在并且從非空物件開始
    if (item && Object.keys(item).length > 0) {
      try {
        const formData = formUtils.initializeFormData(item);
        reset(formData);
      } catch (error) {
        console.error("Error initializing form data:", error);
        // 如果初始化失敗，提供默認值
        reset({
          ...FORM_CONFIG.defaultValues,
          group: item?.group || defaultGroup
        });
      }
    }
  }, [item, reset, defaultGroup]);

  // 處理表單提交
  const onSubmit = (data) => {
    const updatedItem = formUtils.createUpdatedItem(data, item);
    onSave(updatedItem);
    onClose();
  };

  // 監聽開始時間變化
  const startTime = watch("start");
  useEffect(() => {
    if (startTime) {
      setValue("end", formUtils.calculateEndTime(startTime));
    }
  }, [startTime, setValue]);

  // 我們不再提前返回null，因為Dialog需要open屬性
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>製令單詳細資訊</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
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
                    value={item?.id || ''}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    {...register("productName")}
                    label="產品名稱"
                    value={item?.orderInfo?.productName || ''}
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
                    disabled={mode === "view"}
                    value={watch("group") || ""}
                  >
                    {groups?.get()?.map((group) => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.content || group.id}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    {...register("process")}
                    label="製程名稱"
                    value={item?.orderInfo?.process || ''}
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
                    value={item?.orderInfo?.quantity || 0}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    {...register("completedQty")}
                    label="已完成數量"
                    value={item?.orderInfo?.completedQty || 0}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="完成率"
                    value={`${item?.orderInfo?.completedQty || 0}/${item?.orderInfo?.quantity || 0}`}
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
                    disabled={mode === "view"}
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
                      item?.status?.startTime
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
                    value={item?.orderInfo?.orderStatus || '無資料'}
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          {mode === "edit" && (
            <Button onClick={onDelete} color="error" sx={{ mr: "auto" }}>
              刪除
            </Button>
          )}
          <Button onClick={onClose}>取消</Button>
          <Button type="submit" variant="contained">
            保存
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ItemDialog;
