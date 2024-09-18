import React from "react";
import { Tab } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  StyledBox,
  StyledTabContainer,
  StyledTabs,
  StyledButton,
} from "./utils/styles";
import TabPanel from "./components/TabPanel";
import { TRANSLATION_KEYS } from "./utils/constants";
import { a11yProps } from "./utils/utils";
import { useQmsProductionInspection } from "./hooks/useQmsProductionInspection";

const QmsProductionInspection = ({
  renderTabPanel,
  renderTabs,
  renderTabPanels,
}) => {
  const { t } = useTranslation();
  const {
    tabValue,
    lots,
    handleChange,
    handleSubmit,
    updateLotsByProductionQuantity,
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
        updateLotsByProductionQuantity={updateLotsByProductionQuantity}
        render={renderTabPanel}
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
            updateLotsByProductionQuantity,
            renderTabPanel,
          })
        : defaultRenderTabPanels()}
      <StyledButton onClick={handleSubmit}>
        {t(TRANSLATION_KEYS.SHIFT_CHANGE)}
      </StyledButton>
    </StyledBox>
  );
};

export default QmsProductionInspection;
