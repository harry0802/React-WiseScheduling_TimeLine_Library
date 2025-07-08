import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import ProductionRecordButton from "../../../utility/ProductionRecordButton";
import {
  StyledAccordion,
  StyledAccordionHeader,
  StyledAccordionContent
} from "./ProcessAccordion.styled";

function ProcessAccordion({ children, title, OnClick = null }) {
  function handleButtonClick(e) {
    /* 取消冒泡事件 */
    if (OnClick != null) OnClick();
    e.stopPropagation();
  }

  return (
    <StyledAccordion defaultExpanded>
      <StyledAccordionHeader expandIcon={<ExpandMoreIcon />}>
        {title}
        <ProductionRecordButton OnClick={handleButtonClick}>
          <EditIcon />
        </ProductionRecordButton>
      </StyledAccordionHeader>

      <StyledAccordionContent>
        {children}
      </StyledAccordionContent>
    </StyledAccordion>
  );
}

export default ProcessAccordion;
