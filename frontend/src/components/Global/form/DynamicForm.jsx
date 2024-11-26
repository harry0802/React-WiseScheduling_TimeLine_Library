import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  useDeferredValue,
} from "react";
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
// 選項合併與去重
const mergeAndDedupeOptions = (asyncOptions = [], staticOptions = []) => {
  const uniqueOptions = new Map();

  // 確保 asyncOptions 是數組
  if (Array.isArray(asyncOptions)) {
    asyncOptions.forEach((option) => {
      if (option?.value !== undefined) {
        uniqueOptions.set(option.value, option);
      }
    });
  }

  // 確保 staticOptions 是數組
  if (Array.isArray(staticOptions)) {
    staticOptions.forEach((option) => {
      if (option?.value !== undefined) {
        uniqueOptions.set(option.value, option);
      }
    });
  }

  return Array.from(uniqueOptions.values());
};

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
    options, // 添加 options
    field, // 添加 field
    controllerField, // 添加 controllerField
    error, // 添加 error
    ...domProps
  } = props;
  return domProps;
}
// 渲染表單項目
function renderFormItem(
  field,
  controllerField,
  restProps,
  options,
  error,
  loading,
  asyncOptions
) {
  const mergedProps = mergeProps(field, controllerField, restProps);
  const {
    getDependentOptions,
    dependsOn,
    rules,
    customProps,
    type, // 添加 type
    label, // 添加 label
    span, // 添加 span
    ...cleanProps
  } = restProps;
  switch (field.type) {
    // 在 switch case 中
    case "select":
      const selectOptions = loading
        ? []
        : mergeAndDedupeOptions(asyncOptions, options || []);

      return (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
          <Select
            {...controllerField}
            {...restProps}
            labelId={`${field.name}-label`}
            label={field.label}
          >
            {selectOptions.map((option) => (
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
    async (values) => {
      try {
        const result = await methods.trigger();
        console.log("🚀 ~ result:", result);
        if (!result) {
          // 獲取所有錯誤
          const errors = methods.formState.errors;
          Object.entries(errors).forEach(([field, error]) => {
            console.error(`${field}: ${error.message}`);
          });
          return;
        }

        const formattedValues = formatSubmitValues(values);
        onFinish(formattedValues);
      } catch (error) {
        console.error("表單驗證失敗:", error);
      }
    },
    [onFinish, methods]
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
  const [asyncOptions, setAsyncOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prevDependentValue, setPrevDependentValue] = useState(null);

  // 修改這裡的驗證規則處理
  const {
    field: controllerField,
    fieldState: { error },
  } = useController({
    name: field.name,
    control: methods.control,
    defaultValue: field.type === "number" ? null : "",
    rules: {
      ...field.rules,
      ...(field.type === "number" && {
        validate: {
          isNumber: (value) =>
            value === null ||
            value === "" ||
            !isNaN(Number(value)) ||
            "請輸入有效數字",
          required: (value) =>
            (value !== null && value !== "") || `${field.label}為必填`,
        },
      }),
      ...(field.type === "select" && {
        validate: {
          required: (value) =>
            (value !== null && value !== "") || `請選擇${field.label}`,
        },
      }),
    },
  });

  const { getDependentOptions, dependsOn, rules, ...cleanCustomProps } =
    customProps;

  // 添加這個 useEffect 來監聽依賴值的變化
  useEffect(() => {
    if (field.dependsOn) {
      const subscription = methods.watch((value, { name }) => {
        if (name === field.dependsOn) {
          console.log(`${field.dependsOn} changed:`, value[field.dependsOn]);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [field.dependsOn, methods]);

  // 處理非同步獲取選項
  useEffect(() => {
    if (field.getOptions) {
      setLoading(true);
      field
        .getOptions()
        .then((data) => setAsyncOptions(data))
        .catch((err) => console.error("獲取選項失敗:", err))
        .finally(() => setLoading(false));
    }
  }, [field.getOptions]);

  // 修改數字輸入處理
  const inputProps =
    field.type === "number"
      ? {
          ...controllerField,
          value: controllerField.value ?? "",
          type: "number",
          inputProps: { step: "any" },
          onChange: (e) => {
            const value = e.target.value === "" ? null : Number(e.target.value);
            controllerField.onChange(value);
          },
        }
      : {
          ...controllerField,
          value: controllerField.value ?? "",
        };
  const dependentValue = methods.watch(field.dependsOn);
  const deferredOptions = useDeferredValue(asyncOptions || []);

  // 使用 useCallback 來穩定函數引用
  const fetchDependentOptions = useCallback(
    async (value) => {
      // 從 field 而不是 customProps 獲取 getDependentOptions
      if (!field.getDependentOptions) return [];

      setLoading(true);
      try {
        const options = await field.getDependentOptions(value);
        setAsyncOptions(options);
      } catch (error) {
        console.error("獲取依賴選項失敗:", error);
        setAsyncOptions([]);
      } finally {
        setLoading(false);
      }
    },
    [field] // 依賴 field 而不是 field.getDependentOptions
  );

  // 優化後的 useEffect
  useEffect(() => {
    // 只在以下情況執行：
    // 1. 有依賴欄位
    // 2. 依賴值存在
    // 3. 依賴值與上次不同
    if (
      field.dependsOn &&
      dependentValue &&
      dependentValue !== prevDependentValue
    ) {
      console.log("依賴值變更，重新獲取選項:", {
        field: field.name,
        dependentValue,
        prevValue: prevDependentValue,
      });

      fetchDependentOptions(dependentValue);
      setPrevDependentValue(dependentValue);
    }
  }, [
    dependentValue,
    field.dependsOn,
    fetchDependentOptions,
    prevDependentValue,
  ]);

  const processedOptions = useMemo(() => {
    if (loading) return [];
    if (Array.isArray(deferredOptions) && deferredOptions.length > 0) {
      return deferredOptions;
    }
    if (Array.isArray(field.options)) {
      return field.options;
    }
    return [];
  }, [loading, deferredOptions, field.options]);

  return (
    <Grid item xs={field.span || 12}>
      <FormItem
        field={field}
        controllerField={inputProps}
        options={processedOptions}
        error={error}
        loading={loading}
        asyncOptions={deferredOptions}
        {...cleanCustomProps}
      />
    </Grid>
  );
}
// 表單項目渲染組件
function FormItem({
  field,
  controllerField,
  options,
  error,
  loading,
  asyncOptions,
  ...props
}) {
  const domProps = filterCustomProps(props);
  return renderFormItem(
    field,
    controllerField,
    domProps,
    options,
    error,
    loading,
    asyncOptions
  );
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
