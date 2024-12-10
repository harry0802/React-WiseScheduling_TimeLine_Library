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
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { formatSubmitValues } from "../../../utility/formUtils";

//* 主題配置
const THEME_CONFIG = {
  spacing: 3,
  colors: {
    text: "#8f8f8f",
    primary: "#83bf45",
    primaryHover: "#6fc1ae",
    primaryActive: "#8bc1e3",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 400,
  },
};

//* 樣式組件
const StyledForm = styled("form")(({ theme }) => ({
  "& .MuiFormControl-root": {
    width: "100%",
    marginLeft: 0,
    marginBottom: theme.spacing(THEME_CONFIG.spacing),
  },
  "& .MuiInputLabel-root": {
    color: THEME_CONFIG.colors.text,
    ...THEME_CONFIG.typography,
  },
  "& .MuiInputBase-input": {
    color: THEME_CONFIG.colors.text,
    fontFamily: THEME_CONFIG.typography.fontFamily,
    fontSize: THEME_CONFIG.typography.fontSize,
    fontWeight: THEME_CONFIG.typography.fontWeight,
    padding: "1.0625rem 0.5625rem",
  },
  "& .MuiButton-containedPrimary": {
    backgroundColor: THEME_CONFIG.colors.primary,
    color: "white",
    transition: "background-color 0.3s, transform 0.1s",
    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.25)",
    "&:hover": {
      backgroundColor: THEME_CONFIG.colors.primaryHover,
    },
    "&:active": {
      backgroundColor: THEME_CONFIG.colors.primaryActive,
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

/**
 * @function filterCustomProps
 * @description 過濾自定義屬性
 */
function filterCustomProps(props) {
  // 定義所有需要過濾的自定義屬性
  const CUSTOM_PROPS = [
    "dependsOn",
    "getDependentOptions",
    "getDependentValue",
    "getDependentValues",
    "getOptions",
    "rules",
    "customProps",
    "type",
    "label",
    "span",
    "unitPrice",
    "freeSolo",
    "materialSN",
    "field",
    "controllerField",
    "options",
    "error",
    "loading",
    "asyncOptions",
    "methods",
    "hidden",
    "disabled", // 新增這行
  ];

  // 創建新的 props 對象，排除自定義屬性
  const filteredProps = Object.keys(props).reduce((acc, key) => {
    if (!CUSTOM_PROPS.includes(key)) {
      acc[key] = props[key];
    }
    return acc;
  }, {});

  return filteredProps;
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
  props,
  options,
  error,
  loading,
  asyncOptions,
  methods
) {
  const filteredProps = {
    ...filterCustomProps(props),
    disabled: props.disabled || field.disabled, // 確保 disabled 被保留
  };
  if (field.hidden) {
    return (
      <input
        type="hidden"
        style={{ display: "none" }}
        {...controllerField}
        {...filterCustomProps(props)}
      />
    );
  }

  switch (field.type) {
    case "select":
      const selectOptions = loading
        ? []
        : mergeAndDedupeOptions(asyncOptions, options || []);
      const normalizeSelectValue = (value, options) => {
        // Early return for empty options or missing value
        if (!options?.length) return "";
        if (value === undefined || value === null || value === 0) return "";

        // Convert value to string for consistent comparison
        const valueStr = String(value).trim();
        if (!valueStr) return "";

        // Try to match by value first
        const matchedById = options.find(
          (opt) => String(opt.value) === valueStr
        );
        if (matchedById) return matchedById.value;

        // Then try to match by label
        const matchedByLabel = options.find(
          (opt) => String(opt.label) === valueStr
        );
        if (matchedByLabel) return matchedByLabel.value;

        // If no match found, return empty string
        return "";
      };

      const selectValue = normalizeSelectValue(
        controllerField.value,
        selectOptions
      );

      return (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
          <Select
            {...controllerField}
            {...filteredProps}
            disabled={Boolean(filteredProps.disabled)}
            value={selectValue}
            onChange={(e) => {
              const newValue = e.target.value || "";
              controllerField.onChange(newValue);
            }}
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
        <RadioGroup {...filteredProps}>
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
          {...filteredProps}
          options={options}
          value={controllerField.value || null}
          onChange={async (_, newValue) => {
            controllerField.onChange(newValue);
            if (newValue && field.getDependentValues) {
              try {
                const values = await field.getDependentValues(newValue);
                if (values && typeof values === "object") {
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
          isOptionEqualToValue={(option, value) => {
            if (typeof value === "string") {
              return (
                option?.value === value ||
                option?.label === value ||
                option?.value?.toString() === value
              );
            }
            if (value && typeof value === "object") {
              return (
                option?.value === value?.value || option?.label === value?.label
              );
            }
            if (!value) {
              return !option;
            }
            return false;
          }}
          getOptionLabel={(option) => {
            if (!option) return "";
            if (typeof option === "string") return option;
            return option.label || option.value?.toString() || "";
          }}
          renderInput={(params) => {
            const inputProps = filterCustomProps(params);
            return (
              <TextField
                {...inputProps}
                disabled={field.disabled || filteredProps.disabled} // 新增 disabled 屬性
                label={field.label}
                error={!!error}
                helperText={error?.message}
              />
            );
          }}
          freeSolo={field.freeSolo}
          renderOption={(props, option, state) => (
            <Box
              component="li"
              {...props}
              key={option.id || `${option.value}-${state.index}`}
            >
              <Typography noWrap>{option.label || option.value}</Typography>
            </Box>
          )}
        />
      );

    case "checkbox":
      return (
        <FormControlLabel
          control={
            <Checkbox
              {...controllerField}
              {...filteredProps}
              checked={controllerField.value}
              onChange={(e) => controllerField.onChange(e.target.checked)}
            />
          }
          label={field.label}
        />
      );

    case "number":
      return (
        <TextField
          {...filteredProps}
          {...controllerField}
          type="number"
          label={field.label}
          error={!!error}
          helperText={error?.message}
          InputProps={{
            inputProps: {
              min: field.min,
              max: field.max,
              step: field.step || 1,
            },
          }}
        />
      );

    case "date":
      return (
        <TextField
          {...filteredProps}
          {...controllerField}
          type="date"
          label={field.label}
          error={!!error}
          helperText={error?.message}
          InputLabelProps={{ shrink: true }}
        />
      );

    case "textarea":
      return (
        <TextField
          {...filteredProps}
          {...controllerField}
          multiline
          rows={field.rows || 4}
          label={field.label}
          error={!!error}
          helperText={error?.message}
        />
      );

    case "text":
    default:
      return (
        <TextField
          {...filteredProps}
          {...controllerField}
          disabled={
            field.disabled || field.props?.disabled || filteredProps.disabled
          }
          type="text"
          label={field.label}
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
function FieldComponent({ field, customProps = {}, onChange, disabled }) {
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
        setValueAs: (value) => {
          if (value === "" || value === null || value === undefined)
            return null;
          const num = Number(value);
          return isNaN(num) ? null : num;
        },
        validate: {
          isValidNumber: (value) => {
            if (value === null) return true;
            const num = Number(value);
            return !isNaN(num) || "請輸入有效的數字";
          },
        },
      }),
      ...(field.type === "select" &&
        field.rules?.required && {
          required: `請選擇${field.label}`,
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
          onChange: (e) => {
            const value = e.target.value;
            if (value === "") {
              controllerField.onChange(null);
            } else {
              const num = Number(value);
              controllerField.onChange(isNaN(num) ? value : num);
            }
          },
          onBlur: (e) => {
            const value = e.target.value;
            if (value === "") {
              controllerField.onChange(null);
            } else {
              const num = Number(value);
              controllerField.onChange(isNaN(num) ? null : num);
            }
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
        if (field.type === "hidden") {
          // 只有當值真的改變時才設置
          const currentValue = methods.getValues(field.name);
          if (currentValue !== result) {
            methods.setValue(field.name, result, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          }
        } else {
          setAsyncOptions(Array.isArray(result) ? result : []);
        }
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
    <Grid item xs={field?.span || 12}>
      <FormItem
        field={field}
        controllerField={inputProps}
        options={processedOptions}
        error={error}
        loading={loading}
        asyncOptions={deferredOptions}
        methods={methods}
        disabled={disabled || field?.disabled}
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
  disabled,
  ...restProps
}) {
  if (!field) {
    console.error("Field object is undefined");
    return null;
  }

  const filteredProps = {
    ...filterCustomProps(restProps),
    disabled: disabled || field.disabled,
  };

  return renderFormItem(
    field,
    controllerField,
    filteredProps,
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
