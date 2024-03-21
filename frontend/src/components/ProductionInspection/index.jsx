import React, { useState } from "react";
import styles from "./ProductionInspection.module.scss";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import QuantityInput from "./QuantityInput";
import { useLotStore } from "../../store/zustand/store";

const TabPanel = (props) => {
  const {
    children,
    value,
    index,
    product,
    operator1,
    operator2,
    startTime,
    quatity,
    ...other
  } = props;

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
                <span>人員1</span>
                <span>{operator1}</span>
              </div>
              <div>
                <span>人員2</span>
                <span>{operator2}</span>
              </div>
              <div>
                <span>開始時間</span>
                <span>{startTime}</span>
              </div>
              <div>
                <span>製令數量</span>
                <span>{quatity}</span>
              </div>
              <div>
                <span>不良數量</span>
                <span>{quatity}</span>
              </div>
              <div className={styles.qty}>
                <span>良品數量</span>
                <TextField
                  className={styles.muiTextField}
                  id="productionQuantity"
                  label="數量*"
                  type="number"
                  name="productionQuantity"
                  autoComplete="productionQuantity"
                  variant="outlined"
                  margin="normal"
                  inputProps={{ style: { fontSize: "34px", color: "#FFF" } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: "34px" } }} // font size of input label
                />
              </div>
            </div>
            <div className={styles.records}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={2} sm={4} md={4}>
                  <QuantityInput
                    label="色差"
                    lotName="ABCD0001-001"
                    type="colorDifference"
                  />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <QuantityInput label="氣泡" />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <QuantityInput label="油汙" />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <QuantityInput label="變形" />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <QuantityInput label="雜質" />
                </Grid>
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
  const [tabValue, setTabValue] = useState(0);
  const lots = useLotStore((state) => state.lots);
  console.log("lots", lots);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
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
            <Tab key={index} label={lot.productName} {...a11yProps(index)} />
          ))}
        </Tabs>
      </div>
      {/* map lots to TabPanels*/}
      {lots.map((lot, index) => (
        <TabPanel
          key={index}
          value={tabValue}
          index={index}
          product={lot.productName}
          operator1={lot.operator1}
          operator2={lot.operator2}
          startTime={lot.startTime}
          quatity={lot.quantity}
        >
          Item One
        </TabPanel>
      ))}
      {/* <TabPanel
        value={tabValue}
        index={0}
        product="產品一號的名稱請精簡以方便管理"
        operator1="李第一"
        operator2="張零二"
        startTime="2024/01/01 08:00"
        quatity="21000"
      >
        Item One
      </TabPanel> */}
      <Button
        className={styles.sign}
        sx={{
          textAlign: "end",
          marginTop: "60px",
          color: "#FFFFFF",
          fontSize: "24px",
        }}
      >
        確認
      </Button>
    </Box>
  );
};

export default ProductionInspection;
