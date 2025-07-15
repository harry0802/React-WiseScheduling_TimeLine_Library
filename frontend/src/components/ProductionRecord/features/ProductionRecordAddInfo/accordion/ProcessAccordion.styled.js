import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { commonTheme } from "../../../styles/common";

// 樣式化的手風琴組件
export const StyledAccordion = styled(Accordion)`
  border: 1px solid ${commonTheme.colors.border};
  border-radius: 4px;
  background: ${commonTheme.colors.white};
  box-shadow: none;
  margin-bottom: 1rem;

  &:before {
    display: none;
  }

  &.Mui-expanded {
    margin: 0 0 1rem 0;
  }
`;

// 樣式化的手風琴標題
export const StyledAccordionHeader = styled(AccordionSummary)`
  background-color: ${commonTheme.colors.background};
  color: ${commonTheme.colors.textPrimary};
  font-family: Roboto;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;

  .MuiAccordionSummary-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
  }

  .MuiAccordionSummary-expandIconWrapper {
    color: ${commonTheme.colors.textPrimary};
  }
`;

// 樣式化的手風琴內容
export const StyledAccordionContent = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
  padding: 1rem;
  background: ${commonTheme.colors.white};
  color: ${commonTheme.colors.textPrimary};
`;
