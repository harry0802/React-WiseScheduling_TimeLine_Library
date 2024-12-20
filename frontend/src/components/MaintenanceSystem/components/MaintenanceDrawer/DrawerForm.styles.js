import styled from "styled-components";
import { Radio, RadioGroup, TextField, Select } from "@mui/material";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem 0;
`;

export const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    height: 3.875rem;
  }
`;

export const StyledSelect = styled(Select)`
  && {
    width: 100%;
    height: 3.875rem;
  }
`;

export const ErrorText = styled.span`
  width: 100%;
  color: var(--color-danger);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
