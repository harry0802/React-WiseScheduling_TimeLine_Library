import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import {
  StyledInspection,
  StyledHead,
  StyledInner,
  StyledInfo,
  StyledQty,
  StyledRecords,
  StyledTextField,
  StyledButton,
} from "../utils/styles";

import QuantityInput from "../../../../ProductionInspection/QuantityInput";
import { INSPECTION_LIST, TRANSLATION_KEYS } from "../utils/constants";
import { TZ } from "../../../../../config/config";

const TabPanel = ({
  value,
  index,
  lot,
  updateLotsByInspectionQuantity,
  updateLotsByGoodQuantity,
  render,
  handleSubmit,
  ...other
}) => {
  const { t } = useTranslation();
  const lastItem = lot.getLastChild();
  const defaultRender = () => (
    <StyledInspection>
      <StyledHead>
        <h1>{lot.productName}</h1>
      </StyledHead>
      <StyledInner>
        <StyledInfo>
          <div>
            <span>{t(TRANSLATION_KEYS.OPERATOR1)}</span>
            <span>{lastItem.operator1}</span>
          </div>
          <div>
            <span>{t(TRANSLATION_KEYS.OPERATOR2)}</span>
            <span>{lastItem.operator2}</span>
          </div>
          <div>
            <span>{t(TRANSLATION_KEYS.START_TIME)}</span>
            <span>
              {dayjs(lastItem.startTime).tz(TZ).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
          <div>
            <span>{t(TRANSLATION_KEYS.WORK_ORDER_QUANTITY)}</span>
            <span>{lot.workOrderQuantity}</span>
          </div>
          <div>
            <span>{t(TRANSLATION_KEYS.UNFINISHED_QUANTITY)}</span>
            <span>{lot.unfinishedQuantity || ""}</span>
          </div>
          <div>
            <span>{t(TRANSLATION_KEYS.DEFECTIVE_QUANTITY)}</span>
            <span>{lastItem.defectiveQuantity || ""}</span>
          </div>
          <div>
            <span>{t(TRANSLATION_KEYS.CURRENT_PRODUCTION)}</span>
            <span>{lot.processName}</span>
          </div>
          <StyledQty>
            <span>{t(TRANSLATION_KEYS.INSPECTION_QUANTITY)}</span>
            <StyledTextField
              sx={{ width: "200px" }}
              id={`inspectionQuantity${index}`}
              label={t(TRANSLATION_KEYS.COUNT)}
              type="number"
              name={`inspectionQuantity${index}`}
              autoComplete={`inspectionQuantity${index}`}
              defaultValue={lastItem.inspectionQuantity || ""}
              variant="outlined"
              margin="normal"
              onChange={(event) => {
                updateLotsByInspectionQuantity(
                  lastItem.lotName,
                  event.target.value
                );
              }}
            />
          </StyledQty>
          <StyledQty>
            <span>{t(TRANSLATION_KEYS.GOOD_QUANTITY)}</span>
            <StyledTextField
              sx={{ width: "200px" }}
              id={`goodQuantity${index}`}
              label={t(TRANSLATION_KEYS.COUNT)}
              type="number"
              name={`goodQuantity${index}`}
              autoComplete={`goodQuantity${index}`}
              defaultValue={lastItem.goodQuantity || ""}
              variant="outlined"
              margin="normal"
              onChange={(event) => {
                updateLotsByGoodQuantity(lastItem.lotName, event.target.value);
              }}
            />
          </StyledQty>

          <StyledButton className="btn-primary" onClick={handleSubmit}>
            {t(TRANSLATION_KEYS.SUBMIT)}
          </StyledButton>
        </StyledInfo>

        <StyledRecords>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {INSPECTION_LIST.map((item, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <QuantityInput
                  label={t(item.label)}
                  lotName={lastItem.lotName}
                  schema={item.schema}
                  isQualityControl
                />
              </Grid>
            ))}
          </Grid>
        </StyledRecords>
      </StyledInner>
    </StyledInspection>
  );

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index &&
        (render
          ? render({ lot, lastItem, updateLotsByInspectionQuantity, t })
          : defaultRender())}
    </div>
  );
};

export default TabPanel;
