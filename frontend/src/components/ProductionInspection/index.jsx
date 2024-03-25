import React, { useState } from "react";
import styles from "./index.module.scss";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import QuantityInput from "./QuantityInput";
import { Modal } from "antd";
import { useLotStore } from "../../store/zustand/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const InspectionList = [
  {
    lable: "色差",
    schema: "colorDifference",
  },
  {
    lable: "氣泡",
    schema: "bubble",
  },
  {
    lable: "油汙",
    schema: "oilStain",
  },
  {
    lable: "變形",
    schema: "deformation",
  },
  {
    lable: "雜質",
    schema: "impurity",
  },
  {
    lable: "毛邊",
    schema: "burr",
  },
  {
    lable: "縮水",
    schema: "shrinkage",
  },
  {
    lable: "壓克",
    schema: "pressure",
  },
  {
    lable: "黑點",
    schema: "blackSpot",
  },
  {
    lable: "缺料",
    schema: "shortage",
  },
  {
    lable: "溢料",
    schema: "overflow",
  },
  {
    lable: "刮傷",
    schema: "scratch",
  },
  {
    lable: "破洞",
    schema: "hole",
  },
  {
    lable: "流痕",
    schema: "flowMark",
  },
  {
    lable: "包封",
    schema: "encapsulation",
  },
  {
    lable: "其他",
    schema: "other",
  },
];

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
    lotName,
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
                <span></span>
              </div>
              <div className={styles.qty}>
                <span>良品數量</span>
                <TextField
                  className="muiTextField"
                  // sx={{ width: "200px" }}
                  id="productionQuantity"
                  label="數量*"
                  type="number"
                  name="productionQuantity"
                  autoComplete="productionQuantity"
                  variant="outlined"
                  margin="normal"
                  inputProps={{ style: { fontSize: "16px", color: "#FFF" } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: "16px" } }} // font size of input label
                  error={false}
                  helperText={false ? "" : ""}
                  FormHelperTextProps={{
                    style: { fontSize: "16px", color: "#E61F19" },
                  }}
                />
              </div>
            </div>
            <div className={styles.records}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
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
  // 防止使用者回上一頁
  useEffect(() => {
    window.history.pushState(null, "", document.URL);
    window.onpopstate = function () {
      window.history.pushState(null, "", document.URL);
      Modal.info({
        width: "800px",
        content: <p>您無法回到上一頁，請完成此生產階段，並"換班"交接</p>,
        okText: "確定",
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
              startTime={lastItem.start_time}
              quatity={lot.workOrderQuantity}
              lotName={lastItem.lotName}
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
        onClick={() => {
          navigate("/OperatorSignPage", { state: { action: "endChildLot" } });
        }}
      >
        換班
      </Button>
    </Box>
  );
};

export default ProductionInspection;
