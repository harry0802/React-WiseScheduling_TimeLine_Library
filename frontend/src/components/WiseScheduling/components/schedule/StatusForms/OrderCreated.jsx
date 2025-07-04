// components/StatusForms/OrderCreated.jsx
import React from "react";
import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Paper,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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
import { Controller } from "react-hook-form";
// import { formatISOToDateTime } from "../index";

// 自定義唯讀欄位的樣式
const ReadOnlyField = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#F5F5F5",
  border: "2px solid #9E9E9E", // 中等灰色粗邊框
  borderRadius: theme.shape.borderRadius,
  height: "56px", // 固定高度與TextField一致
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // 垂直居中內容
  width: "100%",
}));

// 欄位標籤樣式
const FieldLabel = styled(Typography)(({ theme }) => ({
  color: "#616161", // 深灰色
  fontSize: "0.85rem",
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
}));

// 欄位值樣式
const FieldValue = styled(Typography)(({ theme }) => ({
  color: "#212121", // 近黑色，確保高對比度
  fontSize: "1rem",
  fontWeight: 400,
}));

// 分區標題
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: 600,
  color: "#424242",
  marginBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

// 圖例項目
const LegendItem = styled(Box)(({ type, theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(3),
}));

// 圖例方塊
const LegendBox = styled(Box)(({ type }) => ({
  width: 20,
  height: 20,
  marginRight: 8,
  borderRadius: 4,
  backgroundColor: type === "editable" ? "#FFFFFF" : "#F5F5F5",
  border: type === "editable" ? "2px solid #1976D2" : "2px solid #9E9E9E",
}));

// 簡化的進度條
const SimpleProgressBar = styled(Box)(({ value, color, theme }) => ({
  width: "100%",
  height: "10px", // 較粗，更易看見
  backgroundColor: "#E0E0E0",
  borderRadius: "5px",
  marginTop: theme.spacing(0.5),
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: `${value || 0}%`,
    backgroundColor: color || "#1976D2", // 支援自定義顏色
    transition: "width 0.5s ease-in-out",
  },
}));

/**
 * @function formatISOToDateTime
 * @description 將 ISO 8601 格式時間字串轉換為中文本地時間格式
 * @param {string} isoString - ISO 8601 格式時間字串
 * @returns {string} 中文格式的本地時間字串 (YYYY/MM/DD 上午/下午HH:mm)
 *
 * @example
 * // 基本使用 - 轉換為中文時間格式
 * const result = formatISOToDateTime("2025-06-10T05:45:18.000Z");
 * console.log(result); // "2025/06/10 上午05:45"
 *
 * // 下午時間示例
 * const afternoon = formatISOToDateTime("2025-06-17T18:06:07.000Z");
 * console.log(afternoon); // "2025/06/17 下午18:06"
 *
 * // OrderCreated 使用場景
 * console.log(`🚀 ~ OrderCreated ~ item: ${formatISOToDateTime(item.timestamp)}`);
 * // 輸出: "🚀 ~ OrderCreated ~ item: 2025/06/12 上午04:09"
 *
 * @notes
 * - 🔄 2025/01 修改：從 UTC 時間改為本地時間顯示
 * - ⏰ 時區依賴：依賴客戶端系統時區設定 (預期：Asia/Taipei)
 * - 支援中文上午/下午顯示
 * - 自動處理空值和無效時間
 * - 格式：YYYY/MM/DD 上午/下午HH:mm
 */
function formatISOToDateTime(isoString) {
  console.log("🚀 ~ formatISOToDateTime ~ isoString:", isoString);
  if (!isoString) return "";

  try {
    const date = new Date(isoString);

    // 檢查日期是否有效
    if (isNaN(date.getTime())) {
      console.warn("[formatISOToDateTime] 無效的日期格式:", isoString);
      return "";
    }

    // 使用本地時間方法顯示使用者時區的時間
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // 判斷上午/下午
    const period = hours < 12 ? "上午" : "下午";
    const formatHours = String(hours).padStart(2, "0");

    return `${year}/${month}/${day} ${period}${formatHours}:${minutes}`;
  } catch (error) {
    console.error("[formatISOToDateTime] 時間格式轉換錯誤:", error);
    return "";
  }
}

/**
 * @function OrderCreated
 * @description 製令單狀態的表單組件 - 因其複雜性保持獨立實現，不強行套用抽象
 * @param {boolean} disabled - 是否禁用表單
 * @param {Object} item - 表單項目數據
 * @returns {JSX.Element} 渲染的表單組件
 */
const OrderCreated = ({ item, disabled }) => {
  console.log(
    "🚀 ~ OrderCreated ~ item:",
    formatISOToDateTime(item.orderInfo.actualStartTime)
  );
  const { register, errors, watch, control, initialized } = useStatusForm(
    MACHINE_STATUS.ORDER_CREATED,
    item
  );
  const selectedArea = watch("area");
  // 直接使用 createAreaMachines 生成當前區域的機台
  const filteredGroups = selectedArea ? createAreaMachines(selectedArea) : [];

  // 監聽表單錯誤
  if (!initialized) {
    return <CircularProgress />;
  }

  if (!item?.id || !item?.orderInfo) {
    return null;
  }

  // 計算完成率，確保數值有效並處理邊緣情況
  const completedPercentage =
    item.orderInfo.quantity && item.orderInfo.quantity > 0
      ? Math.min(
          100,
          Math.round(
            (item.orderInfo.completedQty / item.orderInfo.quantity) * 100
          )
        )
      : 0;

  return (
    <Grid container spacing={3}>
      {/* 表單圖例 */}
      <Grid item xs={12}>
        <Alert
          severity="info"
          icon={false}
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#E3F2FD", // 非常淺的藍色
            "& .MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              width: "100%",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={500}
              sx={{ mr: 2, mb: { xs: 1, sm: 0 } }}
            >
              欄位說明:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <LegendItem>
                <LegendBox type="readonly" />
                <Typography variant="body1">灰框 = 只能查看</Typography>
              </LegendItem>
              <LegendItem>
                <LegendBox type="editable" />
                <Typography variant="body1">藍框 = 可以編輯</Typography>
              </LegendItem>
            </Box>
          </Box>
        </Alert>

        {/* 顯示關於製令單狀態的說明 */}
        {item?.orderInfo?.orderStatus !== "尚未上機" &&
          item?.orderInfo?.orderStatus !== "暫停生產" && (
            <Alert severity="info" sx={{ mb: 2 }}>
              此製令單無法編輯。您只能查看製令單的詳細資訊。
            </Alert>
          )}
      </Grid>

      {/* 基本資訊區 */}
      <Grid item xs={12}>
        <SectionTitle>基本資訊</SectionTitle>
        <Divider sx={{ mb: 2, borderWidth: "1px" }} />
        <Grid container spacing={3}>
          {/* 唯讀欄位：製令單號 */}
          <Grid item xs={12} sm={4}>
            <FieldLabel>製令單號</FieldLabel>
            <ReadOnlyField>
              <FieldValue>{item.orderInfo.workOrderSN}</FieldValue>
            </ReadOnlyField>
          </Grid>

          {/* 唯讀欄位：產品名稱 */}
          <Grid item xs={12} sm={4}>
            <FieldLabel>產品名稱</FieldLabel>
            <ReadOnlyField>
              <FieldValue>{item.orderInfo.productName}</FieldValue>
            </ReadOnlyField>
          </Grid>

          {/* 唯讀欄位：製程名稱 */}
          <Grid item xs={12} sm={4}>
            <FieldLabel>製程名稱</FieldLabel>
            <ReadOnlyField>
              <FieldValue>{item.orderInfo.process}</FieldValue>
            </ReadOnlyField>
          </Grid>

          {/* 可編輯欄位：區域 */}
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
              sx={{
                mt: 1, // 與唯讀欄位對齊
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderWidth: "2px",
                    borderColor: "#1976D2", // 藍色邊框
                  },
                  "&:hover fieldset": {
                    borderColor: "#1976D2",
                  },
                },
              }}
            >
              {MACHINE_CONFIG.AREAS.map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* 可編輯欄位：機台編號 */}
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
              sx={{
                mt: 1, // 與唯讀欄位對齊
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderWidth: "2px",
                    borderColor: "#1976D2", // 藍色邊框
                  },
                  "&:hover fieldset": {
                    borderColor: "#1976D2",
                  },
                },
              }}
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

      {/* 生產數量區 */}
      <Grid item xs={12}>
        <SectionTitle>生產數量</SectionTitle>
        <Divider sx={{ mb: 2, borderWidth: "1px" }} />
        <Grid container spacing={3}>
          {/* 唯讀欄位：製令數量 */}
          <Grid item xs={12} sm={4}>
            <FieldLabel>製令數量</FieldLabel>
            <ReadOnlyField>
              <FieldValue>{item.orderInfo.quantity}</FieldValue>
            </ReadOnlyField>
          </Grid>

          {/* 唯讀欄位：已完成數量 */}
          <Grid item xs={12} sm={4}>
            <FieldLabel>已完成數量</FieldLabel>
            <ReadOnlyField>
              <FieldValue>{item.orderInfo.completedQty}</FieldValue>
            </ReadOnlyField>
          </Grid>

          {/* 唯讀欄位：完成率 (帶進度指示器) */}
          <Grid item xs={12} sm={4}>
            <FieldLabel>完成率</FieldLabel>
            <ReadOnlyField>
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <FieldValue
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color:
                      completedPercentage >= 100
                        ? "#4CAF50"
                        : completedPercentage > 0
                        ? "#1976D2"
                        : "#757575",
                  }}
                >
                  {completedPercentage}%
                </FieldValue>
                <FieldValue sx={{ ml: 1 }}>
                  ({item.orderInfo.completedQty} / {item.orderInfo.quantity})
                </FieldValue>
              </Box>
              <SimpleProgressBar
                value={completedPercentage}
                color={completedPercentage >= 100 ? "#4CAF50" : "#1976D2"}
              />
            </ReadOnlyField>
          </Grid>
        </Grid>
      </Grid>

      {/* 時程安排區 */}
      <Grid item xs={12}>
        <SectionTitle>時程安排</SectionTitle>
        <Divider sx={{ mb: 2, borderWidth: "1px" }} />
        <Grid container spacing={3}>
          {/* 可編輯欄位：預計上機日 */}
          <Grid item xs={12} sm={6}>
            <FieldLabel>預計上機日</FieldLabel>
            <Controller
              name="start"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="datetime-local"
                  error={!!error}
                  helperText={error?.message || ""}
                  disabled={disabled}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderWidth: "2px",
                        borderColor: "#1976D2", // 藍色邊框
                      },
                      "&:hover fieldset": {
                        borderColor: "#1976D2",
                      },
                    },
                    "& .MuiInputBase-root": {
                      height: "56px", // 確保與ReadOnlyField高度一致
                    },
                  }}
                />
              )}
            />
          </Grid>
          {/* 唯讀欄位：預計完成日 - 使用唯讀框而非 Controller，避免表單驗證 */}
          <Grid item xs={12} sm={6}>
            <FieldLabel>預計完成日</FieldLabel>
            <ReadOnlyField>
              <FieldValue>
                {item.end ? formatISOToDateTime(item.end) : "-"}
              </FieldValue>
            </ReadOnlyField>
          </Grid>
        </Grid>
      </Grid>

      {/* 生產狀態區 */}
      <Grid item xs={12}>
        <SectionTitle>生產狀態</SectionTitle>
        <Divider sx={{ mb: 2, borderWidth: "1px" }} />
        <Grid container spacing={3}>
          {/* 唯讀欄位：實際上機日 - 修改為使用 orderInfo */}
          <Grid item xs={12} sm={6}>
            <FieldLabel>實際上機日</FieldLabel>
            <ReadOnlyField>
              <FieldValue>
                {item.orderInfo.actualStartTime
                  ? formatISOToDateTime(item.orderInfo.actualStartTime)
                  : "尚未開始"}
              </FieldValue>
            </ReadOnlyField>
          </Grid>

          {/* 唯讀欄位：延遲完成日 */}
          <Grid item xs={12} sm={6}>
            <FieldLabel>延遲完成日</FieldLabel>
            <ReadOnlyField>
              <FieldValue>{item.orderInfo.postponeTime || "-"}</FieldValue>
            </ReadOnlyField>
          </Grid>

          {/* 唯讀欄位：狀態 */}
          <Grid item xs={12}>
            <FieldLabel>狀態</FieldLabel>
            <ReadOnlyField>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    mr: 1.5,
                    bgcolor:
                      item.orderInfo.orderStatus === "進行中" ||
                      item.orderInfo.orderStatus.toLowerCase() === "on-going"
                        ? "#4CAF50" // 綠色
                        : item.orderInfo.orderStatus === "延遲"
                        ? "#F44336" // 紅色
                        : "#1976D2", // 藍色
                  }}
                />
                <FieldValue sx={{ fontSize: "1.1rem" }}>
                  {item.orderInfo.orderStatus || "未開始"}
                </FieldValue>
              </Box>
            </ReadOnlyField>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderCreated;
