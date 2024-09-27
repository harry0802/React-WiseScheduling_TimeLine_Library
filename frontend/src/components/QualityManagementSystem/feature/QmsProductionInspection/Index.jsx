import React, { useEffect, useState, useMemo } from "react";
import { Tab, Tooltip } from "@mui/material";
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

const QmsProductionInspection = () => {
  const {
    tabValue,
    lots,
    handleChange,
    handleSubmit,
    updateLotsByInspectionQuantity,
    updateLotsByGoodQuantity,
  } = useQmsProductionInspection();

  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    // console.log("🚀 Lots updated:", lots);
    setUpdateKey((prev) => prev + 1);
  }, [lots]);

  const memoizedTabs = useMemo(
    () =>
      lots.map((lot, index) => (
        <Tooltip
          key={`tooltip-${lot.id}-${index}`}
          title={lot.productName}
          placement="top"
        >
          <Tab
            key={`${lot.id}-${index}-${updateKey}`}
            label={
              lot.productName.length > 5
                ? `${lot.productName.slice(0, 5)}...`
                : lot.productName
            }
            {...a11yProps(index)}
          />
        </Tooltip>
      )),
    [lots, updateKey]
  );

  const memoizedTabPanels = useMemo(
    () =>
      lots.map((lot, index) => (
        <TabPanel
          key={`${lot.id}-${index}-${updateKey}`}
          value={tabValue}
          index={index}
          lot={lot}
          updateLotsByInspectionQuantity={updateLotsByInspectionQuantity}
          updateLotsByGoodQuantity={updateLotsByGoodQuantity}
          handleSubmit={handleSubmit}
        />
      )),
    [
      lots,
      updateKey,
      tabValue,
      updateLotsByInspectionQuantity,
      updateLotsByGoodQuantity,
      handleSubmit,
    ]
  );

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
          {memoizedTabs}
        </StyledTabs>
      </StyledTabContainer>
      {memoizedTabPanels}
    </StyledBox>
  );
};

export default QmsProductionInspection;
