import * as React from "react";
import Accordion from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import ProductionRecordButton from "../../../utility/ProductionRecordButton";

function ProcessAccordion({ children, title, OnClick = null }) {
  function handleButtonClick(e) {
    /* 取消冒泡事件 */
    if (OnClick != null) OnClick();
    e.stopPropagation();
  }

  return (
    <Accordion className="accordion" defaultExpanded>
      <AccordionSummary
        className="accordion__header"
        expandIcon={<ExpandMoreIcon />}
      >
        {title}
        <ProductionRecordButton OnClick={handleButtonClick}>
          <EditIcon />
        </ProductionRecordButton>
      </AccordionSummary>

      <AccordionDetails
        style={{ display: "flex", flexDirection: "column", rowGap: "1.25rem" }}
        className="accordion__content"
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

export default ProcessAccordion;
