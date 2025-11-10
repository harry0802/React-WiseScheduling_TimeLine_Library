// components/StatusForms/Idle.jsx
import React, { useMemo } from "react";
import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useStatusForm } from "../../../hooks/schedule/useStatusForm";
import { VALIDATION_RULES } from "../../../configs/validations/schedule/formConfig";
import {
  MACHINE_STATUS,
  isHistoricalRecord,
} from "../../../configs/validations/schedule/constants";
import { useGetMachinesQuery } from "../../../services/machine/machineApi";
import TimePickerSection from "./TimePickerSection";
// import Cookies from "js-cookie"; // 暫時移除未使用的導入
import { Controller } from "react-hook-form"; // 引入 Controller

const Idle = ({ disabled, item, status, mode = "create" }) => {
  // 使用表單 hook
  const {
    register,
    errors,
    watch,
    setValue,
    isFieldError,
    initialized,
    control,
  } = // 這裡需要加上 control
    useStatusForm(MACHINE_STATUS.IDLE, item);

  // 直接從 API 獲取所有機台數據
  const { isSuccess, isLoading, data: machinesData } = useGetMachinesQuery();

  // 獲取表單控制值
  const selectedArea = watch("area");
  const selectedGroup = watch("group");
  const isEditMode = mode === "edit";

  // 檢查是否為歷史紀錄
  const isHistorical = useMemo(() => {
    return isHistoricalRecord(MACHINE_STATUS.IDLE, item);
  }, [item]);

  // 從 API 數據中提取所有唯一的區域
  const availableAreas = useMemo(() => {
    if (!isSuccess || !machinesData?.data) return [];
    // 使用 Set 來獲取唯一值並轉換回數組
    return [
      ...new Set(machinesData.data.map((machine) => machine.productionArea)),
    ].sort();
  }, [machinesData, isSuccess]);

  // 根據選擇的區域過濾機台
  const filteredMachines = useMemo(() => {
    if (!isSuccess || !machinesData?.data || !selectedArea) return [];
    return machinesData.data.filter(
      (machine) => machine.productionArea === selectedArea
    );
  }, [machinesData, selectedArea, isSuccess]);

  // 處理載入狀態
  if (!initialized || isLoading) {
    return <CircularProgress size={24} />;
  }

  // 沒有項目數據時不渲染
  if (!item) {
    return null;
  }

  // 設置表單禁用狀態
  const isFormDisabled = disabled || isHistorical;
  const isAreaDisabled = isFormDisabled || isEditMode;
  const isGroupDisabled = isFormDisabled || !selectedArea || isEditMode;

  // 幫助文本函數
  const getMachineHelperText = () => {
    if (isHistorical) return "此狀態已開始執行，無法修改";
    if (isEditMode) return "編輯現有事件時不可變更機台";
    if (!selectedArea) return "請先選擇區域";
    return errors.group?.message || "";
  };

  const getAreaHelperText = () => {
    if (isHistorical) return "此狀態已開始執行，無法修改";
    if (isEditMode) return "編輯現有事件時不可變更區域";
    return errors.area?.message || "";
  };

  return (
    <Grid container spacing={3}>
      {/* 歷史狀態警告 */}
      {isHistorical && (
        <Grid item xs={12}>
          <Alert severity="info" icon={<LockIcon />} sx={{ mb: 2 }}>
            此狀態已開始執行，成為歷史紀錄，無法修改
          </Alert>
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          機台選擇{isEditMode ? " (編輯模式下不可變更)" : ""}
          {isHistorical ? " - 歷史紀錄" : ""}
        </Typography>

        <Grid container spacing={2}>
          {/* 區域選擇 - 使用 API 數據生成選項 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              {...register("area", VALIDATION_RULES.area)}
              select
              label="區域"
              error={isFieldError("area")}
              helperText={getAreaHelperText()}
              disabled={isAreaDisabled}
              value={selectedArea || ""}
            >
              {/* 添加預設選項 */}
              <MenuItem value="" disabled>
                請選擇區域
              </MenuItem>

              {availableAreas.map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* 機台編號選擇 - 使用 API 數據生成選項 */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="group" // Controller 的 name 屬性
              control={control} // 從 useForm 獲取 control
              rules={isEditMode ? {} : VALIDATION_RULES.group} // 編輯模式時不驗證
              render={({ field }) => (
                <TextField
                  {...field} // 包含 name, value, onChange, onBlur
                  fullWidth
                  select
                  label="機台編號"
                  error={isFieldError("group")}
                  helperText={getMachineHelperText()}
                  disabled={isGroupDisabled}
                  value={field.value || ""} // 使用 field.value
                  onChange={(e) => {
                    // 先執行原有的邏輯
                    const selectedMachine = machinesData.data.find(
                      (m) => m.machineSN === e.target.value
                    );
                    if (selectedMachine) {
                      // 確保 machineId 是數字類型
                      setValue("machineId", selectedMachine.id);
                    }
                    // 然後呼叫 react-hook-form 提供的 onChange
                    field.onChange(e.target.value);
                  }}
                >
                  {filteredMachines.length > 0 ? (
                    [
                      <MenuItem key="placeholder" value="" disabled>
                        請選擇機台
                      </MenuItem>,

                      ...filteredMachines.map((machine) => {
                        return (
                          <MenuItem key={machine.id} value={machine.machineSN}>
                            {machine.machineSN}
                          </MenuItem>
                        );
                      }),
                    ]
                  ) : (
                    <MenuItem value="" disabled>
                      {selectedArea ? "此區域無可用機台" : "請先選擇區域"}
                    </MenuItem>
                  )}
                </TextField>
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      <input type="hidden" {...register("machineId")} />
      <TimePickerSection
        register={register}
        errors={errors}
        disabled={isFormDisabled}
      />
    </Grid>
  );
};

export default Idle;
