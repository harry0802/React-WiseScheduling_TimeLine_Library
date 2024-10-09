import React, { useMemo, useCallback, useEffect } from "react";
import {
  useForm,
  FormProvider,
  Controller,
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

function DynamicForm({
  children,
  onFinish,
  initialValues,
  submitText = "提交",
  fields = [],
  submitButton = false,
  ...props
}) {
  const methods = useForm();

  const formattedInitialValues = useMemo(() => {
    return formatInitialValues(initialValues, fields);
  }, [initialValues, fields]);

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
          <Button type="submit" variant="contained" color="primary">
            {submitText}
          </Button>
        )}
      </StyledForm>
    </FormProvider>
  );
}

DynamicForm.Field = React.memo(({ field, children }) => {
  const { control } = useFormContext();
  const Component = FormItemMap[field.type];

  console.log(field);

  if (!Component) return null;

  const renderFormItem = () => {
    switch (field.type) {
      case "select":
        return (
          <Select {...field.props}>
            {field.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      case "radio":
        return (
          <RadioGroup {...field.props}>
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
          <Controller
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: controllerField }) => (
              <Autocomplete
                {...field.props}
                options={field.options || []}
                value={controllerField.value}
                onChange={(event, newValue) => {
                  controllerField.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label={field.label} />
                )}
              />
            )}
          />
        );
      case "checkbox":
        return (
          <FormControlLabel
            control={<Checkbox {...field.props} />}
            label={field.label}
          />
        );
      case "date":
        return <TextField {...field.props} type="date" />;
      case "textarea":
        return <TextField {...field.props} multiline />;

      default:
        return <TextField {...field.props} variant="outlined" />;
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
