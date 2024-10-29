import React, { useMemo, useCallback, useEffect } from "react";
import {
  useForm,
  FormProvider,
  useController,
  useFormContext,
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
import {
  formatInitialValues,
  formatSubmitValues,
} from "../../../utility/formUtils";

// * 渲染表單項目 支持的表單元素映射
const FormItemMap = {
  input: TextField,
  number: TextField,
  select: Select,
  checkbox: Checkbox,
  radio: RadioGroup,
  textarea: TextField,
  autocomplete: Autocomplete,
  date: TextField,
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

// ! 將renderFormItem 移到全局
function mergeProps(field, controllerField, restProps) {
  return {
    ...field,
    ...controllerField,
    ...restProps,
  };
}

// *渲染表單項目
function renderFormItem(field, controllerField, restProps, options, error) {
  // 合併 props
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
    case "date":
    case "textarea":
    case "input":
    default:
      return (
        <TextField
          {...mergedProps}
          // 我還要兼容 number 的 type
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

// ! 表單組件主體
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

//  ! 以下為可選組件
// * 動態表單欄位
function FieldComponent({ field, initialValues, customProps }) {
  const { control } = useFormContext();
  const {
    field: controllerField,
    fieldState: { error },
  } = useController({
    name: field.name,
    control,
    rules: field.rules,
    // ?防禦性 :如果 initialValues 不存在，則使用空字串
    defaultValue: initialValues ? initialValues[field.name] : "",
  });

  const { getDependentOptions, dependsOn, ...restProps } = field.props || {};

  const options = useMemo(() => {
    if (getDependentOptions && field.dependentValue) {
      return getDependentOptions(field.dependentValue);
    }
    return field.options || [];
  }, [getDependentOptions, field.dependentValue, field.options]);

  const Component = FormItemMap[field.type];

  if (!Component) return null;

  return (
    <Grid item xs={field.span || 12}>
      {renderFormItem(field, controllerField, restProps, options, error)}
    </Grid>
  );
}

//  動態表單欄位 這個函數是用來比較兩個 props 是否相等，如果相等，則不重新渲染
const areEqual = (prevProps, nextProps) => {
  return (
    // 比較 name、type、options 和 customProps 是否相等
    prevProps.field.name === nextProps.field.name &&
    prevProps.field.type === nextProps.field.type &&
    // 比較 options 是否相等
    JSON.stringify(prevProps.field.options) ===
      JSON.stringify(nextProps.field.options) &&
    // 比較 customProps 是否相等
    JSON.stringify(prevProps.customProps) ===
      JSON.stringify(nextProps.customProps)
  );
};
//  動態表單欄位 使用 React.memo 進行優化
DynamicForm.Field = React.memo(FieldComponent, areEqual);

// * 處理依賴關係的子組件
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

//  處理依賴關係的子組件 使用 React.memo 進行優化
DynamicForm.DependentField = React.memo(DependentField);

export default DynamicForm;
