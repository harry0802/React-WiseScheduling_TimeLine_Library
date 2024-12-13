import React from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import ProductionRecordButton from "../../ProductionRecord/utility/ProductionRecordButton";

// 使用 styled-components 將樣式合併
const StyledAccordion = styled(Accordion)`
  && {
    width: 100%;
    color: #8f8f8f;
    font-family: Roboto, sans-serif;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; /* 125% */
    .MuiAccordionSummary-content {
      align-items: center;
      gap: 1.25rem;
    }

    .accordion__content {
      display: flex;
      flex-direction: column;
      row-gap: 1.25rem;
    }
  }
`;

function ProcessAccordion({ children, title, OnClick = null }) {
  function handleButtonClick(e) {
    /* 取消冒泡事件 */
    e.stopPropagation();
    if (OnClick) OnClick();
  }

  return (
    <StyledAccordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {title}
        <ProductionRecordButton OnClick={handleButtonClick}>
          <EditIcon />
        </ProductionRecordButton>
      </AccordionSummary>

      <AccordionDetails className="accordion__content">
        {children}
      </AccordionDetails>
    </StyledAccordion>
  );
}

export default ProcessAccordion;
