import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, TextField, Button, Grid } from "@mui/material";
import { Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { styled } from "@mui/system";
import { useLotStore } from "../../../store/zustand/store";
import { useUpdateChildLotsMutation } from "../../../store/api/productionReportApi";
import { TZ } from "../../../config/config";
import QuantityInput from "../../ProductionInspection/QuantityInput";

dayjs.extend(utc);
dayjs.extend(timezone);

// Styled components (CSS-in-JS)
const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative",
  marginBottom: "10px",
  padding: "20px",
}));

const StyledTabContainer = styled("div")({
  flex: 1,
  backgroundColor: "transparent",
  borderBottom: "1px solid #8f8f8f",
});

const StyledTabs = styled(Tabs)({
  "& .MuiButtonBase-root": {
    fontSize: "0.75rem",
    color: "#ffffff",
    "@media (min-width: 1024px)": {
      fontSize: "1rem",
    },
  },
  "& .Mui-selected": {
    color: "#8ac0e2",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "2rem",
  },
});

const StyledInspection = styled("div")({
  marginTop: "15px",
});

const StyledHead = styled("div")({
  "& h1": {
    fontSize: "1.25rem",
    color: "#fff",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    "@media (min-width: 1024px)": {
      fontSize: "1.5rem",
    },
  },
});

const StyledInner = styled("div")({
  fontSize: "1rem",
  display: "flex",
  marginTop: "15px",
  paddingLeft: "15px",
  color: "#ffffff",
  "@media (min-width: 1024px)": {
    fontSize: "1.5rem",
  },
});

const StyledInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  width: "30%",
  "& span": {
    marginRight: "15px",
  },
});

const StyledQty = styled("div")({
  display: "flex",
  alignItems: "center",
  "& span": {
    width: "25%",
  },
});

const StyledRecords = styled("div")({
  maxWidth: "70%",
});

const StyledButton = styled(Button)({
  textAlign: "end",
  marginTop: "30px",
  color: "#FFFFFF",
  fontSize: "16px",
});

const TabPanel = ({ value, index, lot, ...other }) => {
  const { t } = useTranslation();
  const updateLotsByProductionQuantity = useLotStore(
    (state) => state.updateLotsByProductionQuantity
  );
  const lastItem = lot.children[lot.children.length - 1];

  const InspectionList = [
    {
      lable: t("productionReport.inspection.colorDifference"),
      schema: "colorDifference",
    },
    { lable: t("productionReport.inspection.bubble"), schema: "bubble" },
    { lable: t("productionReport.inspection.oilStain"), schema: "oilStain" },
    {
      lable: t("productionReport.inspection.deformation"),
      schema: "deformation",
    },
    { lable: t("productionReport.inspection.impurity"), schema: "impurity" },
    { lable: t("productionReport.inspection.burr"), schema: "burr" },
    { lable: t("productionReport.inspection.shrinkage"), schema: "shrinkage" },
    { lable: t("productionReport.inspection.pressure"), schema: "pressure" },
    { lable: t("productionReport.inspection.blackSpot"), schema: "blackSpot" },
    { lable: t("productionReport.inspection.shortage"), schema: "shortage" },
    { lable: t("productionReport.inspection.overflow"), schema: "overflow" },
    { lable: t("productionReport.inspection.scratch"), schema: "scratch" },
    { lable: t("productionReport.inspection.hole"), schema: "hole" },
    { lable: t("productionReport.inspection.flowMark"), schema: "flowMark" },
    {
      lable: t("productionReport.inspection.encapsulation"),
      schema: "encapsulation",
    },
    { lable: t("productionReport.inspection.other"), schema: "other" },
  ];

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <StyledInspection>
          <StyledHead>
            <h1>{lot.productName}</h1>
          </StyledHead>
          <StyledInner>
            <StyledInfo>
              <div>
                <span>{t("productionReport.inspection.operator1")}</span>
                <span>{lastItem.operator1}</span>
              </div>
              <div>
                <span>{t("productionReport.inspection.operator2")}</span>
                <span>{lastItem.operator2}</span>
              </div>
              <div>
                <span>{t("productionReport.inspection.startTime")}</span>
                <span>
                  {dayjs(lastItem.startTime)
                    .tz(TZ)
                    .format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </div>
              <div>
                <span>{t("productionReport.table.workOrderQuantity")}</span>
                <span>{lot.workOrderQuantity}</span>
              </div>
              <div>
                <span>{t("productionReport.table.unfinishedQuantity")}</span>
                <span>{lot.unfinishedQuantity || ""}</span>
              </div>
              <div>
                <span>{t("productionReport.table.formatedDefectiveQty")}</span>
                <span>{lastItem.defectiveQuantity || ""}</span>
              </div>
              <div>
                <span>
                  {t("productionReport.inspection.currentProduction")}
                </span>
                <span>{lot.processName}</span>
              </div>
              <StyledQty>
                <span>{t("productionReport.table.productionQuantity")}</span>
                <TextField
                  className="muiTextField"
                  sx={{ width: "200px" }}
                  id={`productionQuantity${index}`}
                  label={t("productionReport.inspection.count")}
                  type="number"
                  name={`productionQuantity${index}`}
                  autoComplete={`productionQuantity${index}`}
                  defaultValue={lastItem.productionQuantity || ""}
                  variant="outlined"
                  margin="normal"
                  inputProps={{ style: { fontSize: "16px", color: "#FFF" } }}
                  InputLabelProps={{ style: { fontSize: "16px" } }}
                  FormHelperTextProps={{
                    style: { fontSize: "16px", color: "#E61F19" },
                  }}
                  onChange={(event) => {
                    updateLotsByProductionQuantity(
                      lastItem.lotName,
                      event.target.value
                    );
                  }}
                />
              </StyledQty>
            </StyledInfo>
            <StyledRecords>
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {InspectionList.map((item, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <QuantityInput
                      label={item.lable}
                      lotName={lastItem.lotName}
                      schema={item.schema}
                    />
                  </Grid>
                ))}
              </Grid>
            </StyledRecords>
          </StyledInner>
        </StyledInspection>
      )}
    </div>
  );
};

const a11yProps = (index) => ({
  id: `product-tab-${index}`,
  "aria-controls": `product-tabpanel-${index}`,
});

const mockLots = [
  {
    productName: "Product A",
    workOrderQuantity: 1000,
    unfinishedQuantity: 200,
    processName: "Assembly",
    children: [
      {
        lotName: "Lot-A-001",
        operator1: "John Doe",
        operator2: "Jane Smith",
        startTime: "2023-06-01T08:00:00Z",
        defectiveQuantity: 5,
        productionQuantity: 795,
      },
    ],
  },
  {
    productName: "Product B",
    workOrderQuantity: 500,
    unfinishedQuantity: 100,
    processName: "Painting",
    children: [
      {
        lotName: "Lot-B-001",
        operator1: "Bob Johnson",
        operator2: "Alice Brown",
        startTime: "2023-06-01T09:30:00Z",
        defectiveQuantity: 2,
        productionQuantity: 398,
      },
    ],
  },
  {
    productName: "Product C",
    workOrderQuantity: 750,
    unfinishedQuantity: 150,
    processName: "Packaging",
    children: [
      {
        lotName: "Lot-C-001",
        operator1: "Charlie Wilson",
        operator2: "Diana Clark",
        startTime: "2023-06-01T10:15:00Z",
        defectiveQuantity: 3,
        productionQuantity: 597,
      },
    ],
  },
];

const QmsProductionInspection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [lots, setLots] = useState(mockLots);
  const [updateChildLots] = useUpdateChildLotsMutation();

  useEffect(() => {
    window.history.pushState(null, "", document.URL);
    window.onpopstate = function () {
      window.history.pushState(null, "", document.URL);
      Modal.info({
        content: <p>{t("productionReport.inspection.forbidden")}</p>,
        okText: t("common.okBtn"),
        onOk() {},
      });
    };
    return () => {
      window.onpopstate = null;
    };
  }, [t]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async () => {
    const emptyTextField = lots.filter(
      (lot) => !lot.children[lot.children.length - 1].productionQuantity
    );

    if (emptyTextField.length > 0) {
      Modal.error({
        content: (
          <div>
            <p>{t("productionReport.inspection.emptyFieldError")}</p>
            {emptyTextField.map((lot, idx) => (
              <p key={idx}>{lot.productName}</p>
            ))}
          </div>
        ),
        okText: t("common.okBtn"),
      });
      return;
    }

    const childLots = lots.map((lot) => {
      const lastChild = lot.children[lot.children.length - 1];
      return {
        ...lastChild,
        id: lastChild.id || lastChild.productionReport_id,
      };
    });

    try {
      await updateChildLots(childLots).unwrap();
      navigate("/OperatorSignPage", { state: { action: "endChildLot" } });
    } catch (error) {
      console.error("rejected", error);
      notification.error({
        description: t("common.updatingError"),
        placement: "bottomRight",
        duration: 5,
      });
    }
  };

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
          {lots.map((lot, index) => (
            <Tab
              key={index}
              label={
                lot.productName.length > 5
                  ? `${lot.productName.substring(0, 5)}...`
                  : lot.productName
              }
              {...a11yProps(index)}
            />
          ))}
        </StyledTabs>
      </StyledTabContainer>
      {lots.map(
        (lot, index) =>
          lot.children &&
          lot.children.length > 0 && (
            <TabPanel key={index} value={tabValue} index={index} lot={lot} />
          )
      )}
      <StyledButton onClick={handleSubmit}>
        {t("productionReport.inspection.shiftChange")}
      </StyledButton>
    </StyledBox>
  );
};

export default QmsProductionInspection;
