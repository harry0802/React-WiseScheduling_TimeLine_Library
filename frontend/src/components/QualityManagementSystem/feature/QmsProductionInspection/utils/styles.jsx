import styled from "styled-components";
import { Box, Tabs, Button, TextField } from "@mui/material";

export const StyledBox = styled(Box)`
  position: relative;
  margin-bottom: 10px;
  padding: 20px;
`;

export const StyledTabContainer = styled.div`
  flex: 1;
  background-color: transparent;
  border-bottom: 1px solid #8f8f8f;
`;

export const StyledTabs = styled(Tabs)`
  & .MuiButtonBase-root {
    font-size: 0.75rem;
    color: #ffffff;
    @media (min-width: 1024px) {
      font-size: 1rem;
    }
  }
  & .Mui-selected {
    color: #8ac0e2;
  }
  & .MuiSvgIcon-root {
    font-size: 2rem;
  }
`;

export const StyledButton = styled(Button)`
  && {
    text-align: end;
    margin-top: 30px;
    color: #fff;
    font-size: 1.25rem;
    display: flex;
    margin-bottom: 1.875rem;
    width: 100%;
    max-width: 21.875rem;
    height: 56px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #8ac0e2;
    background: linear-gradient(269deg, #73d5bf 13.23%, #8ac0e2 77.6%);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

export const StyledInspection = styled.div`
  margin-top: 15px;
`;

export const StyledHead = styled.div`
  & h1 {
    font-size: 1.25rem;
    color: #fff;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    @media (min-width: 1024px) {
      font-size: 1.5rem;
    }
  }
`;

export const StyledInner = styled.div`
  font-size: 1rem;
  display: flex;
  margin-top: 15px;
  padding-left: 15px;
  color: #ffffff;
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 30%;
  & span {
    margin-right: 15px;
  }
`;

export const StyledQty = styled.div`
  display: flex;
  align-items: center;
  & span {
    width: 25%;
  }
`;

export const StyledRecords = styled.div`
  max-width: 70%;
`;

export const StyledTextField = styled(TextField)`
  && {
    * {
      border-color: #fff;
      color: #fff;
    }
    & .MuiInputBase-root {
      font-size: 16px;
      color: #fff;
      &:hover {
        border-color: #fff;
      }
    }
    & .MuiInputLabel-root {
      font-size: 16px;
    }
    & .MuiFormHelperText-root {
      font-size: 16px;
      color: #e61f19;
    }
  }
`;
