import React from "react";
import { Tab } from "@mui/material";
import { StyledBox, StyledTabContainer, StyledTabs } from "./utils/styles";
import TabPanel from "./components/TabPanel";
import { a11yProps } from "./utils/utils";
import { useQmsProductionInspection } from "./hooks/useQmsProductionInspection";

/* WORKFLOW
QmsProductionInspection (Index.jsx)
│
├── useQmsProductionInspection (hook)
│   │
│   ├── createQmsProductionInspectionService
│   │   │
│   │   ├── createLotService
│   │   │   │
│   │   │   ├── createLot
│   │   │   │   └── createLotChild
│   │   │   │
│   │   │   ├── updateLotProductionQuantity
│   │   │   ├── getLotsWithEmptyProductionQuantity
│   │   │   └── prepareChildLotsForUpdate
│   │   │
│   │   ├── initialLots
│   │   ├── updateLotProductionQuantity
│   │   └── submitLots
│   │
│   ├── handleChange (tab change)
│   └── handleSubmit
│
├── Render Tabs
│   └── Tab (for each lot)
│
└── Render TabPanels
    └── TabPanel (for each lot)
        │
        ├── Display Lot Information
        │   ├── Operator 1 & 2
        │   ├── Start Time
        │   ├── Work Order Quantity
        │   ├── Unfinished Quantity
        │   ├── Defective Quantity
        │   └── Current Production
        │
        ├── Production Quantity Input
        │   └── updateLotsByProductionQuantity
        │
        └── Inspection List
            └── QuantityInput (for each inspection item)
*/

const QmsProductionInspection = ({
  renderTabPanel,
  renderTabs,
  renderTabPanels,
}) => {
  const {
    tabValue,
    lots,
    handleChange,
    handleSubmit,
    updateLotsByInspectionQuantity,
    updateLotsByGoodQuantity,
  } = useQmsProductionInspection();

  const defaultRenderTabs = () =>
    lots.map((lot, index) => (
      <Tab
        key={index}
        label={
          lot.productName.length > 5
            ? `${lot.productName.substring(0, 5)}...`
            : lot.productName
        }
        {...a11yProps(index)}
      />
    ));

  const defaultRenderTabPanels = () =>
    lots.map((lot, index) => (
      <TabPanel
        key={index}
        value={tabValue}
        index={index}
        lot={lot}
        updateLotsByInspectionQuantity={updateLotsByInspectionQuantity}
        updateLotsByGoodQuantity={updateLotsByGoodQuantity}
        render={renderTabPanel}
        handleSubmit={handleSubmit}
      />
    ));

  return (
    <StyledBox>
      <StyledTabContainer>
        <StyledTabs
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          TabIndicatorProps={{ style: { backgroundColor: "#8AC0E2" } }}
        >
          {renderTabs ? renderTabs({ lots, a11yProps }) : defaultRenderTabs()}
        </StyledTabs>
      </StyledTabContainer>
      {renderTabPanels
        ? renderTabPanels({
            lots,
            tabValue,
            updateLotsByInspectionQuantity,
            updateLotsByGoodQuantity,
            renderTabPanel,
          })
        : defaultRenderTabPanels()}
    </StyledBox>
  );
};

export default QmsProductionInspection;
