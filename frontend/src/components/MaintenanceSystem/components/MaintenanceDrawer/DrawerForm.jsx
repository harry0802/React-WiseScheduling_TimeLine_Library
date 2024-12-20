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
import { useEffect } from "react";
import timeUtils from "../../utils/timeUtils";

function DrawerForm({ type, initialData, config, onSubmit, setFormMethods }) {
  const schema = createMaintenanceSchema(config);
  const methods = useForm({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      checkItems: {},
      personnel: "",
      date: timeUtils.getNow(),
    },
  });

  useEffect(() => {
    setFormMethods(methods);
  }, [methods, setFormMethods]);

  return (
    <FormContainer>
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
                onChange={(e) => onChange(e.target.value)}
              >
                <FormControlLabel value="OK" control={<Radio />} label="確認" />
                <FormControlLabel value="NG" control={<Radio />} label="NG" />
              </RadioGroup>
            )}
          />
          {methods.formState.errors?.checkItems?.[field.id] && (
            <ErrorText>
              {methods.formState.errors.checkItems[field.id].message}
            </ErrorText>
          )}
        </FormRow>
      ))}

      <FormRow>
        {/* <span>{config.personnel.label}</span> */}
        {config.personnel.type === "select" ? (
          <FormControl fullWidth>
            <InputLabel>{config.personnel.label}</InputLabel>
            <StyledSelect
              label={config.personnel.label}
              {...methods.register("personnel")}
            >
              {config.personnel.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        ) : (
          <StyledTextField
            label="請輸入人員"
            {...methods.register("personnel")}
          />
        )}
        {methods.formState.errors?.personnel && (
          <ErrorText>{methods.formState.errors.personnel.message}</ErrorText>
        )}
      </FormRow>
    </FormContainer>
  );
}

export default DrawerForm;
