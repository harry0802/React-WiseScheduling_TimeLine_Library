import React, { useMemo, useCallback, useEffect, useState } from "react";
import {
  useForm,
  FormProvider,
  useController,
  useFormContext,
  useWatch,
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  formatInitialValues,
  formatSubmitValues,
} from "../../../utility/formUtils";

// 支持的表單元素映射
const FormItemMap = {
  input: TextField,
  number: TextField,
  select: Select,
  checkbox: Checkbox,
  radio: RadioGroup,
  textarea: TextField,
  autocomplete: Autocomplete,
  date: TextField, // Date 可以擴展為更複雜的 DatePicker
};

// 表單樣式
const StyledForm = styled("form")(({ theme }) => ({
  "& .MuiFormControl-root": {
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
    transition: "background-color 0.3s, transform 0.1s ",
    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.25)",
    "&:hover": {
      backgroundColor: "#6fc1ae",
    },
    "&:active": {
      backgroundColor: "#8bc1e3",
    },
  },
}));

// 動態表單組件
function DynamicForm({
  children,
  onFinish,
  initialValues,
  submitText = "提交",
  fields = [],
  submitButton = false,
  externalMethods,
  loading = false, // 是否顯示提交加載狀態
  ...props
}) {
  const internalMethods = useForm();
  const methods = externalMethods || internalMethods;

  // 格式化初始值
  const formattedInitialValues = useMemo(() => {
    return formatInitialValues(initialValues, fields);
  }, [initialValues, fields]);

  // 提交處理
  const handleFinish = useCallback(
    (values) => {
      const formattedValues = formatSubmitValues(values);
      onFinish(formattedValues);
    },
    [onFinish]
  );

  useEffect(() => {
    if (initialValues) {
      methods.reset(formattedInitialValues);
    } else {
      methods.reset({});
    }
  }, [methods, formattedInitialValues, initialValues]);

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(handleFinish)} {...props}>
        <Grid container spacing={2}>
          {children({ FormItem: ({ children }) => children })}
        </Grid>
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

// 動態表單欄位
DynamicForm.Field = React.memo(({ field, customProps }) => {
  const { control, watch } = useFormContext();
  const {
    field: controllerField,
    fieldState: { error },
  } = useController({
    name: field.name,
    control,
    rules: field.rules,
    defaultValue: field.defaultValue ?? "",
  });

  // 從 props 中提取出自定義屬性
  const { getDependentOptions, dependsOn, ...restProps } = field.props || {};

  // 監聽依賴字段的值
  const dependentValue = dependsOn ? watch(dependsOn) : null;

  // 根據依賴值獲取選項
  const options = useMemo(() => {
    if (getDependentOptions && dependentValue) {
      return getDependentOptions(dependentValue);
    }
    return field.options || [];
  }, [field, dependentValue, getDependentOptions]);

  const Component = FormItemMap[field.type];

  if (!Component) return null;

  const renderFormItem = (fieldProps) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            {...fieldProps}
            helperText={error?.message}
            error={!!error}
            fullWidth
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      case "radio":
        return (
          <RadioGroup {...fieldProps}>
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
            {...fieldProps}
            options={options || []}
            value={controllerField.value || null}
            onChange={(event, newValue) => controllerField.onChange(newValue)}
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
                {...fieldProps}
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
            {...fieldProps}
            type={field.type === "date" ? "date" : "text"}
            multiline={field.type === "textarea"}
            error={!!error}
            helperText={error?.message}
          />
        );
    }
  };

  const fieldProps = {
    ...field,
    ...field.props,
    ...restProps,
    ...controllerField,
    ...customProps,
  };

  return (
    <Grid item xs={field.span || 12}>
      {renderFormItem(fieldProps)}
    </Grid>
  );
});

// 處理依賴關係的子組件
function DependentField({ field }) {
  const { watch } = useFormContext();
  const dependentValue = watch(field.dependsOn);

  if (dependentValue !== field.dependsOnValue) {
    return null;
  }

  return <DynamicForm.Field field={field} />;
}

DynamicForm.Field.displayName = "DynamicForm.Field";
DynamicForm.DependentField = DependentField;

export default DynamicForm;
