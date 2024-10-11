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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  formatInitialValues,
  formatSubmitValues,
} from "../../../utility/formUtils";

const FormItemMap = {
  input: TextField,
  number: TextField,
  select: Select,
  // date: DatePicker,
  checkbox: Checkbox,
  radio: RadioGroup,
  textarea: TextField,
  autocomplete: Autocomplete,
};

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

function DynamicForm({
  children,
  onFinish,
  initialValues,
  submitText = "提交",
  fields = [],
  submitButton = false,
  externalMethods, // 新增這個prop來接收外部的useForm方法
  ...props
}) {
  const internalMethods = useForm();
  const methods = externalMethods || internalMethods; // 使用外部方法或內部方法

  const formattedInitialValues = useMemo(() => {
    return formatInitialValues(initialValues, fields);
  }, [initialValues, fields]);

  // 這是給預設內部的按鈕觸發的 如果今天沒有預設按鈕 則會是在外面觸發 與此無關
  const handleFinish = useCallback(
    (values) => {
      const formattedValues = formatSubmitValues(values);
      console.log(formattedValues);
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
          <Button type="submit" variant="contained" color="primary">
            {submitText}
          </Button>
        )}
      </StyledForm>
    </FormProvider>
  );
}

DynamicForm.Field = React.memo(({ field }) => {
  const { control } = useFormContext();

  const {
    field: controllerField,
    fieldState: { error },
  } = useController({
    name: field.name,
    control,
    rules: field.rules,
    defaultValue: field.defaultValue ?? "",
  });

  const Component = FormItemMap[field.type];

  if (!Component) return null;

  const renderFormItem = () => {
    switch (field.type) {
      case "select":
        return (
          <Select {...field.props} {...controllerField}>
            {field.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      case "radio":
        return (
          <RadioGroup {...field.props} {...controllerField}>
            {field.options?.map((option) => (
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
            {...field.props}
            {...field}
            options={field.options || []}
            value={controllerField.value || null} // Ensure null when no match
            onChange={(event, newValue) => controllerField.onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={field.label}
                error={!!error}
                helperText={error?.message}
              />
            )}
            isOptionEqualToValue={(option, value) => {
              // 如果 value 是字符串，則與 option.value 比較
              return typeof value === "string"
                ? option.value === value
                : option.value === value?.value;
            }}
          />
        );
      case "checkbox":
        return (
          <FormControlLabel
            control={
              <Checkbox
                {...field.props}
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
            {...field.props}
            {...field}
            {...controllerField}
            type={field.type === "date" ? "date" : "text"}
            multiline={field.type === "textarea"}
            error={!!error}
            helperText={error?.message}
          />
        );
    }
  };

  return (
    <Grid item xs={field.span || 12}>
      {renderFormItem()}
    </Grid>
  );
});

DynamicForm.Field.displayName = "DynamicForm.Field";

export default DynamicForm;
