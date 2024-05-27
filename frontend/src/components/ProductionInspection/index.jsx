import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import QuantityInput from "./QuantityInput";
import { Modal, notification } from "antd";
import { useLotStore } from "../../store/zustand/store";
import { useNavigate } from "react-router-dom";
import { useUpdateChildLotsMutation } from "../../store/api/productionReportApi";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TZ } from "../../config/config";
dayjs.extend(utc);
dayjs.extend(timezone);

const TabPanel = (props) => {
  const { t } = useTranslation(); // i18n 語言切換

  const InspectionList = [
    {
      lable: `${t("productionReport.inspection.colorDifference")}`,
      schema: "colorDifference",
    },
    {
      lable: `${t("productionReport.inspection.bubble")}`,
      schema: "bubble",
    },
    {
      lable: `${t("productionReport.inspection.oilStain")}`,
      schema: "oilStain",
    },
    {
      lable: `${t("productionReport.inspection.deformation")}`,
      schema: "deformation",
    },
    {
      lable: `${t("productionReport.inspection.impurity")}`,
      schema: "impurity",
    },
    {
      lable: `${t("productionReport.inspection.burr")}`,
      schema: "burr",
    },
    {
      lable: `${t("productionReport.inspection.shrinkage")}`,
      schema: "shrinkage",
    },
    {
      lable: `${t("productionReport.inspection.pressure")}`,
      schema: "pressure",
    },
    {
      lable: `${t("productionReport.inspection.blackSpot")}`,
      schema: "blackSpot",
    },
    {
      lable: `${t("productionReport.inspection.shortage")}`,
      schema: "shortage",
    },
    {
      lable: `${t("productionReport.inspection.overflow")}`,
      schema: "overflow",
    },
    {
      lable: `${t("productionReport.inspection.scratch")}`,
      schema: "scratch",
    },
    {
      lable: `${t("productionReport.inspection.hole")}`,
      schema: "hole",
    },
    {
      lable: `${t("productionReport.inspection.flowMark")}`,
      schema: "flowMark",
    },
    {
      lable: `${t("productionReport.inspection.encapsulation")}`,
      schema: "encapsulation",
    },
    {
      lable: `${t("productionReport.inspection.other")}`,
      schema: "other",
    },
  ];

  const {
    children,
    value,
    index,
    product,
    operator1,
    operator2,
    startTime,
    quatity,
    lotName,
    defectiveQuantity,
    productionQuantity,
    unfinishedQuantity,
    ...other
  } = props;

  const updateLotsByProductionQuantity = useLotStore(
    (state) => state.updateLotsByProductionQuantity
  );

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className={styles.inspection}>
          <div className={styles.head}>
            <div className="product">
              <h1>{product}</h1>
            </div>
          </div>
          <div className={styles.inner}>
            <div className={styles.info}>
              <div>
                <span>{t("productionReport.inspection.operator1")}</span>
                <span>{operator1}</span>
              </div>
              <div>
                <span>{t("productionReport.inspection.operator2")}</span>
                <span>{operator2}</span>
              </div>
              <div>
                <span>{t("productionReport.inspection.startTime")}</span>
                <span>{startTime}</span>
              </div>
              <div>
                <span>{t("productionReport.table.workOrderQuantity")}</span>
                <span>{quatity}</span>
              </div>
              <div>
                <span>{t("productionReport.table.unfinishedQuantity")}</span>
                <span>{unfinishedQuantity}</span>
              </div>
              <div>
                <span>{t("productionReport.table.formatedDefectiveQty")}</span>
                <span>{defectiveQuantity}</span>
              </div>
              <div className={styles.qty}>
                <span>{t("productionReport.table.productionQuantity")}</span>
                <TextField
                  className="muiTextField"
                  sx={{ width: "200px" }}
                  id={`productionQuantity${index}`}
                  label={t("productionReport.inspection.count")}
                  type="number"
                  name={`productionQuantity${index}`}
                  autoComplete={`productionQuantity${index}`}
                  defaultValue={productionQuantity}
                  variant="outlined"
                  margin="normal"
                  inputProps={{ style: { fontSize: "16px", color: "#FFF" } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: "16px" } }} // font size of input label
                  FormHelperTextProps={{
                    style: { fontSize: "16px", color: "#E61F19" },
                  }}
                  onChange={(event) => {
                    updateLotsByProductionQuantity(lotName, event.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.records}>
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {InspectionList.map((item, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <QuantityInput
                      label={item.lable}
                      lotName={lotName}
                      schema={item.schema}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `product-tab-${index}`,
    "aria-controls": `product-tabpanel-${index}`,
  };
};

const ProductionInspection = () => {
  const { t } = useTranslation(); // i18n 語言切換
  // 防止使用者回上一頁
  useEffect(() => {
    window.history.pushState(null, "", document.URL);
    window.onpopstate = function () {
      window.history.pushState(null, "", document.URL);
      Modal.info({
        content: <p>{t("productionReport.inspection.forbidden")}</p>,
        okText: `${t("common.okBtn")}`,
        onOk() {},
      });
    };
    return () => {
      window.onpopstate = null;
    };
  }, []);

  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const lots = useLotStore((state) => state.lots);
  const [updateChildLots, updateChildLotsMutationResult] =
    useUpdateChildLotsMutation(); // 更新子批
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async () => {
    // check if TextField if empty
    const emptyTextField = lots.filter((lot) => {
      return (
        lot.children[lot.children.length - 1].productionQuantity === null ||
        lot.children[lot.children.length - 1].productionQuantity === ""
      );
    });
    if (emptyTextField.length > 0) {
      Modal.error({
        content: (
          <div>
            <p>請填寫以下產品的良品數量：</p>
            {emptyTextField.map((lot, idx) => {
              return <p key={idx}>{lot.productName}</p>;
            })}
          </div>
        ),
        okText: `${t("common.okBtn")}`,
        onOk() {},
      });
      return;
    }

    // get the last child from each lot
    const childLots = lots.map((lot) => {
      const lastChild = lot.children[lot.children.length - 1];
      return {
        ...lastChild,
        id: lastChild.id || lastChild.productionReport_id,
      };
    });
    await updateChildLots(childLots)
      .unwrap()
      .then((payload) => {
        navigate("/OperatorSignPage", { state: { action: "endChildLot" } });
      })
      .catch((error) => {
        console.error("rejected", error);
        notification.error({
          description: `${t("common.updatingError")}`,
          placement: "bottomRight",
          duration: 5,
        });
      });
  };

  return (
    <Box
      sx={{
        position: "relative",
        marginBottom: "10px",
        padding: "20px",
      }}
    >
      <div className={styles.tabContainer}>
        <Tabs
          className={styles.tabs}
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#8AC0E2",
            },
          }}
        >
          {/* map lots to Tabs*/}
          {lots.map((lot, index) => (
            <Tab
              key={index}
              label={
                lot.productName.length > 5
                  ? lot.productName.substring(0, 5) + "..."
                  : lot.productName
              }
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </div>
      {/* map the last item of the lots's children to TabPanels*/}
      {lots.map((lot, index) => {
        if (lot.children != null && lot.children.length > 0) {
          const lastItem = lot.children[lot.children.length - 1];
          return (
            <TabPanel
              key={index}
              value={tabValue}
              index={index}
              product={lot.productName}
              operator1={lastItem.operator1}
              operator2={lastItem.operator2}
              startTime={dayjs(lastItem.startTime)
                .tz(TZ)
                .format("YYYY-MM-DD HH:mm:ss")}
              quatity={lot.workOrderQuantity}
              lotName={lastItem.lotName}
              defectiveQuantity={
                lastItem.defectiveQuantity ? lastItem.defectiveQuantity : ""
              }
              productionQuantity={
                lastItem.productionQuantity ? lastItem.productionQuantity : ""
              }
              unfinishedQuantity={
                lot.unfinishedQuantity ? lot.unfinishedQuantity : ""
              }
            ></TabPanel>
          );
        }
      })}
      <Button
        className="sign"
        sx={{
          textAlign: "end",
          marginTop: "30px",
          color: "#FFFFFF",
          fontSize: "16px",
        }}
        onClick={() => handleSubmit()}
      >
        {t("productionReport.inspection.shiftChange")}
      </Button>
    </Box>
  );
};

export default ProductionInspection;
