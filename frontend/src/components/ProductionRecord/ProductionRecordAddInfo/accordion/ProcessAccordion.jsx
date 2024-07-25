import * as React from "react";
import Accordion from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductionRecordButton from "../../Utility/ProductionRecordButton";
import AddIcon from "@mui/icons-material/Add";
function ProcessAccordion({ children, title }) {
  function handleButtonClick(e) {
    e.stopPropagation();
  }

  return (
    <Accordion className="accordion" defaultExpanded>
      <AccordionSummary
        className="accordion__header"
        expandIcon={<ExpandMoreIcon />}
      >
        {title}
        <span onClick={handleButtonClick}>
          <ProductionRecordButton>
            <AddIcon />
          </ProductionRecordButton>
        </span>
      </AccordionSummary>

      <AccordionDetails className="accordion__content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
    </Accordion>
  );
}

export default ProcessAccordion;
