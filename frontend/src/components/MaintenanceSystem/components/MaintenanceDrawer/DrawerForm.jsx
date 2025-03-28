/* eslint-disable no-unused-vars */
// DrawerForm.js
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  FormContainer,
  FormRow,
  StyledTextField,
  StyledSelect,
  ErrorText,
} from "./DrawerForm.styles";
import { createMaintenanceSchema } from "../../validations/maintenanceSchema";
import {
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import timeUtils from "../../utils/timeUtils";
import { transformFormToApi } from "../../utils/formDataTransformers";

/**
 * @function DrawerForm
 * @description 維護系統的表單組件，支持外部和內部提交
 */
const DrawerForm = forwardRef(
  ({ type, initialData, config, onSubmit }, ref) => {
    // 🧠 創建表單驗證 schema
    const schema = createMaintenanceSchema(config);

    // 確保初始值包含必要欄位
    const safeInitialData = {
      checkItems: {},
      personnel: "",
      ...(initialData || {}),
      date: timeUtils.getNow(),
    };

    // 初始化 react-hook-form
    const methods = useForm({
      mode: "onTouched", // 觸摸後驗證
      resolver: zodResolver(schema),
      defaultValues: safeInitialData,
    });

    // 表單的 DOM 引用
    const formRef = useRef(null);

    /**
     * 處理表單數據提交
     * @param {Object} data - 表單數據
     */
    const handleSubmit = useCallback(
      (data) => {
        // 確保數據包含必要欄位
        const safeData = {
          checkItems: data.checkItems || {},
          personnel: data.personnel || "",
          date: data.date || timeUtils.getNow(),
          ...data,
        };

        // ✨ 使用轉換工具處理數據格式
        try {
          const apiData = transformFormToApi(safeData, type, initialData);
          onSubmit(apiData);
        } catch (error) {
          // 顯示錯誤給用戶或進行其他處理
        }
      },
      [type, initialData, onSubmit]
    );

    // 向父組件暴露方法
    useImperativeHandle(
      ref,
      () => ({
        // 提供一個直接提交表單的方法
        submit: () => {
          try {
            if (formRef.current) {
              formRef.current.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              );
            } else {
              methods.handleSubmit((data) => {
                handleSubmit(data);
              })();
            }
          } catch (error) {}
        },
        // 暴露表單方法供父組件使用
        formMethods: methods,
        // 獲取當前表單數據
        getValues: () => methods.getValues(),
      }),
      [methods, handleSubmit]
    );

    // 監聽表單值變化（可選，用於調試）
    useEffect(() => {
      const subscription = methods.watch((value) => {});
      return () => subscription.unsubscribe();
    }, [methods]);

    return (
      <FormContainer
        ref={formRef}
        onSubmit={methods.handleSubmit((data) => {
          handleSubmit(data);
        })}
      >
        {/* 渲染所有檢查項字段 */}
        {config.fields.map((field) => (
          <FormRow key={field.id}>
            <span>{field.label}</span>
            <Controller
              name={`checkItems.${field.id}`}
              control={methods.control}
              defaultValue={null}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  row
                  value={value || ""}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="OK"
                    control={<Radio />}
                    label="確認"
                  />
                  <FormControlLabel value="NG" control={<Radio />} label="NG" />
                </RadioGroup>
              )}
            />
            {/* 顯示錯誤信息 */}
            {methods.formState.errors?.checkItems?.[field.id] && (
              <ErrorText>
                {methods.formState.errors.checkItems[field.id].message}
              </ErrorText>
            )}
          </FormRow>
        ))}

        {/* 人員選擇字段 */}
        <FormRow>
          {config.personnel.type === "select" ? (
            <FormControl fullWidth>
              <InputLabel>{config.personnel.label}</InputLabel>
              <Controller
                name="personnel"
                control={methods.control}
                defaultValue={safeInitialData.personnel}
                render={({ field }) => (
                  <StyledSelect
                    {...field}
                    label={config.personnel.label}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    {config.personnel.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                )}
              />
            </FormControl>
          ) : (
            <StyledTextField
              label={config.personnel.label}
              {...methods.register("personnel")}
            />
          )}
          {/* 顯示錯誤信息 */}
          {methods.formState.errors?.personnel && (
            <ErrorText>{methods.formState.errors.personnel.message}</ErrorText>
          )}
        </FormRow>

        {/* 添加日期隱藏字段 */}
        <input
          type="hidden"
          {...methods.register("date")}
          defaultValue={timeUtils.getNow()}
        />
      </FormContainer>
    );
  }
);

DrawerForm.displayName = "DrawerForm";

export default DrawerForm;
