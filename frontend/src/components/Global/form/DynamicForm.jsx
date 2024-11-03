import React, { useMemo, useCallback, useEffect } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  useController,
} from "react-hook-form";
import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Autocomplete,
  CircularProgress,
  InputLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { formatSubmitValues } from "../../../utility/formUtils";

//* 表單樣式
const StyledForm = styled("form")(({ theme }) => ({
  "& .MuiFormControl-root": {
    width: "100%",
    marginLeft: 0,
    marginBottom: theme.spacing(3),
  },
  "& .MuiInputLabel-root": {
    color: "#8f8f8f",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  "& .MuiInputBase-input": {
    color: "#8f8f8f",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 400,
    padding: "1.0625rem 0.5625rem",
  },
  "& .MuiButton-containedPrimary": {
    backgroundColor: "#83bf45",
    color: "white",
    transition: "background-color 0.3s, transform 0.1s",
    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.25)",
    "&:hover": {
      backgroundColor: "#6fc1ae",
    },
    "&:active": {
      backgroundColor: "#8bc1e3",
    },
  },
}));

// 合併 field, controllerField 和其餘 props
function mergeProps(field, controllerField, restProps) {
  return { ...field, ...controllerField, ...restProps };
}

// 過濾掉表單項目的自定義屬性，只保留合法的 DOM 屬性
function filterCustomProps(props) {
  const {
    dependsOn,
    getDependentOptions,
    getDependentValue,
    rules,
    customProps,
    ...domProps
  } = props;
  return domProps;
}

// 渲染表單項目
function renderFormItem(field, controllerField, restProps, options, error) {
  const mergedProps = mergeProps(field, controllerField, restProps);
  switch (field.type) {
    case "select":
      return (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
          <Select
            {...mergedProps}
            labelId={`${field.name}-label`}
            label={field.label}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      );
    case "radio":
      return (
        <RadioGroup {...mergedProps}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      );
    case "autocomplete":
      return (
        <Autocomplete
          {...field}
          {...restProps}
          options={options}
          value={controllerField.value || null}
          onChange={(_, newValue) => controllerField.onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={field.label}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      );
    case "checkbox":
      return (
        <FormControlLabel
          control={
            <Checkbox
              {...controllerField}
              {...field}
              {...restProps}
              checked={controllerField.value}
              onChange={(e) => controllerField.onChange(e.target.checked)}
            />
          }
          label={field.label}
        />
      );
    default:
      return (
        <TextField
          {...mergedProps}
          type={
            field.type === "number"
              ? "number"
              : field.type === "date"
              ? "date"
              : "text"
          }
          multiline={field.type === "textarea"}
          error={!!error}
          helperText={error?.message}
        />
      );
  }
}

// 表單主體組件
function DynamicForm({
  children,
  onFinish,
  initialValues,
  submitText = "提交",
  fields = [],
  submitButton = false,
  externalMethods,
  loading = false,
  ...props
}) {
  const internalMethods = useForm();
  const methods = externalMethods || internalMethods;

  // 處理表單提交
  const handleFinish = useCallback(
    (values) => {
      const formattedValues = formatSubmitValues(values);
      onFinish(formattedValues);
    },
    [onFinish]
  );

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(handleFinish)} {...props}>
        <Grid container>{children}</Grid>
        {submitButton && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : submitText}
          </Button>
        )}
      </StyledForm>
    </FormProvider>
  );
}

// 表單欄位組件
function FieldComponent({ field, customProps = {} }) {
  const methods = useFormContext();

  // 使用 useController 提取 field 和 error 狀態
  const {
    field: controllerField,
    fieldState: { error },
  } = useController({
    name: field.name,
    control: methods.control,
    rules: field.rules,
    defaultValue: field.defaultValue || "", // 防禦性處理
  });

  // 動態依賴值更新
  const dependentValue = field.dependsOn
    ? methods.watch(field.dependsOn)
    : null;
  const options = useMemo(() => {
    if (field.getDependentOptions && dependentValue) {
      return field.getDependentOptions(dependentValue);
    }
    return field.options || [];
  }, [field, dependentValue]);

  // 動態設置欄位值
  useEffect(() => {
    if (field.getDependentValue && dependentValue) {
      const value = field.getDependentValue(dependentValue);
      methods.setValue(field.name, value);
    }
  }, [dependentValue, field, methods]);

  const domProps = filterCustomProps(customProps);

  return (
    <Grid item xs={field.span || 12}>
      <FormItem
        field={field}
        controllerField={controllerField}
        options={options}
        error={error}
        {...domProps}
      />
    </Grid>
  );
}

// 表單項目渲染組件
function FormItem({ field, controllerField, options, error, ...props }) {
  const domProps = filterCustomProps(props);
  return renderFormItem(field, controllerField, domProps, options, error);
}

// 使用 React.memo 優化渲染效能，避免不必要的重新渲染
const MemoizedField = React.memo(FieldComponent);
DynamicForm.Field = MemoizedField;

// 處理依賴關係的子組件
function DependentField({ field }) {
  const methods = useFormContext();

  if (!methods || typeof methods.watch !== "function") {
    console.error("FormContext is not available or watch is not a function");
    return null;
  }

  const dependentValue = methods.watch(field.dependsOn);
  if (dependentValue !== field.dependsOnValue) {
    return null;
  }

  return <DynamicForm.Field field={field} />;
}

// 使用 React.memo 優化 DependentField 的渲染
DynamicForm.DependentField = React.memo(DependentField);

export default DynamicForm;

// !example
// import React from "react";
// import DynamicForm from "./DynamicForm";

// * 處理表單提交的回調函數
// * 當表單提交時，這個函數會接收到所有欄位的值
// function handleSubmit(values) {
//   console.log("表單提交的值:", values);  // 顯示提交的表單數據
// }

// ! 定義表單欄位結構
// const fields = [
//   {
//     name: "processSubtype",           // 欄位名稱，用於識別欄位
//     label: "製程子類型",               // 欄位的顯示標籤
//     type: "select",                    // 欄位類型：下拉選單
//     rules: { required: "請選擇製程子類型" }, // 必填規則，提示訊息
//     options: [                         // 下拉選單選項
//       { value: "subtype1", label: "子類型 1" },
//       { value: "subtype2", label: "子類型 2" },
//     ],
//   },
//   {
//     name: "preInspectionRate",         // 欄位名稱，用於識別此欄位
//     label: "預檢不良率",               // 顯示標籤
//     type: "number",                    // 欄位類型：數字輸入框
//     rules: { required: "預檢不良率為必填" }, // 必填提示訊息
//   },
//   {
//     name: "dependentField",            // 欄位名稱
//     label: "依賴欄位",                 // 顯示標籤
//     type: "text",                      // 欄位類型：文字輸入框
//     dependsOn: "processSubtype",       // 此欄位的顯示依賴於另一欄位
//     dependsOnValue: "subtype1",        // 當 `processSubtype` 值為 `subtype1` 時顯示
//     rules: { required: "此欄位為必填" }, // 驗證規則
//   },
// ];

// ! 使用範例：渲染表單
// function ExampleForm() {
//   return (
//     <DynamicForm
//       fields={fields}                  // 設定表單欄位結構
//       onFinish={handleSubmit}          // 傳入表單提交的處理函數
//       submitButton                     // 啟用提交按鈕
//       submitText="提交"                // 設定提交按鈕的顯示文字
//     >
//       {/* 使用 `DynamicForm.Field` 來渲染每個欄位 */}
//       {fields.map((field) => (
//         <DynamicForm.Field key={field.name} field={field} />
//       ))}
//     </DynamicForm>
//   );
// }

// export default ExampleForm;
