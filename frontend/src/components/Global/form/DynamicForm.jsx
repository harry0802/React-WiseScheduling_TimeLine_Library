//! =============== 1. 設定與常量 ===============
//* 核心依賴引入
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

//* 主題樣式配置
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

//! =============== 2. 工具函數 ===============
//* 選項處理工具
/**
 * @function mergeAndDedupeOptions
 * @description 合併並去重選項列表
 */
const mergeAndDedupeOptions = (asyncOptions = [], staticOptions = []) => {
  const uniqueOptions = new Map();

  if (Array.isArray(asyncOptions)) {
    asyncOptions.forEach((option) => {
      if (option?.value !== undefined) {
        uniqueOptions.set(option.value, option);
      }
    });
  }

  if (Array.isArray(staticOptions)) {
    staticOptions.forEach((option) => {
      if (option?.value !== undefined) {
        uniqueOptions.set(option.value, option);
      }
    });
  }

  return Array.from(uniqueOptions.values());
};

//* Props 處理工具
/**
 * @function mergeProps
 * @description 合併各種 props
 */
function mergeProps(field, controllerField, restProps) {
  return { ...field, ...controllerField, ...restProps };
}

/**
 * @function filterCustomProps
 * @description 過濾自定義屬性
 */
function filterCustomProps(props) {
  const {
    dependsOn,
    getDependentOptions,
    getDependentValue,
    rules,
    customProps,
    options,
    field,
    controllerField,
    error,
    ...domProps
  } = props;
  return domProps;
}

//! =============== 3. 渲染函數 ===============
//* 表單項目渲染
/**
 * @function renderFormItem
 * @description 根據欄位類型渲染對應的表單控件
 */
function renderFormItem(
  field,
  controllerField,
  restProps,
  options,
  error,
  loading,
  asyncOptions,
  methods
) {
  const mergedProps = mergeProps(field, controllerField, restProps);
  // 先過濾掉所有自定義 props
  const {
    getOptions,
    dependsOn,
    getDependentOptions,
    rules,
    customProps,
    type,
    label,
    span,
    ...domProps
  } = restProps;

  switch (field.type) {
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
          onChange={async (_, newValue) => {
            controllerField.onChange(newValue);

            // 處理依賴值更新
            if (newValue && field.getDependentValues) {
              try {
                const values = await field.getDependentValues(newValue);
                if (values && typeof values === "object") {
                  // 獲取當前字段的基礎路徑
                  const basePath = field.name.split(".").slice(0, -1).join(".");

                  Object.entries(values).forEach(([key, val]) => {
                    const fullPath = basePath ? `${basePath}.${key}` : key;
                    methods.setValue(fullPath, val, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  });
                }
              } catch (error) {
                console.error("設置依賴值失敗:", error);
              }
            }
          }}
          getOptionKey={(option) => `${option.value}-${Math.random()}`}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={field.label}
              error={!!error}
              helperText={error?.message}
            />
          )}
          renderOption={(props, option) => (
            <li
              {...props}
              key={`${option.value}-${option.label}-${Math.random()}`}
            >
              {option.label}
            </li>
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

//! =============== 4. 核心組件 ===============
//* 主表單組件
/**
 * @component DynamicForm
 * @description 動態表單的主要組件
 */
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

  const handleFinish = useCallback(
    async (values) => {
      try {
        const result = await methods.trigger();
        if (!result) {
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

//! =============== 5. 欄位組件 ===============
//* 欄位管理組件
/**
 * @component FieldComponent
 * @description 處理表單欄位的主要邏輯
 */
function FieldComponent({ field, customProps = {} }) {
  const methods = useFormContext();
  const [asyncOptions, setAsyncOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prevDependentValue, setPrevDependentValue] = useState(null);

  const uniqueFieldName = useMemo(() => {
    if (field.name.includes(".")) {
      return field.name;
    }
    return field.name;
  }, [field.name]);

  const {
    field: controllerField,
    fieldState: { error },
  } = useController({
    name: uniqueFieldName,
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

  const fetchDependentOptions = useCallback(
    async (value) => {
      if (!field.getDependentOptions) return [];

      setLoading(true);
      try {
        const result = await field.getDependentOptions(value, methods);
        setAsyncOptions(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("獲取依賴選項失敗:", error);
        setAsyncOptions([]);
      } finally {
        setLoading(false);
      }
    },
    [field, methods]
  );

  useEffect(() => {
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
        methods={methods}
        {...cleanCustomProps}
      />
    </Grid>
  );
}

//* 表單項目組件
/**
 * @component FormItem
 * @description 渲染具體的表單項目
 */
function FormItem({
  field,
  controllerField,
  options,
  error,
  loading,
  asyncOptions,
  methods,
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
    asyncOptions,
    methods
  );
}

//* 依賴性欄位組件
/**
 * @component DependentField
 * @description 處理欄位間的依賴關係
 */
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

//! =============== 6. 性能優化 ===============
const MemoizedField = React.memo(FieldComponent);
DynamicForm.Field = MemoizedField;
DynamicForm.DependentField = React.memo(DependentField);

export default DynamicForm;
