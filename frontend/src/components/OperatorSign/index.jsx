import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { notification } from "antd";
import { useLotStore } from "../../store/zustand/store";
import {
  useAddChildLotsMutation,
  useUpdateChildLotsMutation,
} from "../../store/api/productionReportApi";
import { useUpdateProductionSchedulesMutation } from "../../store/api/productionScheduleApi";
import { WORKORDER_STATUS } from "../../config/enum";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TZ } from "../../config/config";
dayjs.extend(utc);
dayjs.extend(timezone);

const OperatorSign = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const action = location.state ? location.state.action : null; // startChildLot: 開始子批生產，endChildLot: 結束子批生產
  const [errorOperator1, setErrorOperator1] = useState(false);
  const [errorOperator2, setErrorOperator2] = useState(false);
  const [errorMsgOperator1, setErrorMsgOperator1] = useState("");
  const [errorMsgOperator2, setErrorMsgOperator2] = useState("");
  const lotStore = useLotStore((state) => state.lots);
  const updateLots = useLotStore((state) => state.updateLots);
  const [addChildLots, addChildLotsMutationResult] = useAddChildLotsMutation(); // 新增子批
  const [updateChildLots, updateChildLotsMutationResult] =
    useUpdateChildLotsMutation(); // 更新子批
  const [updateProductionSchedules] = useUpdateProductionSchedulesMutation(); // 更新製令單狀態

  // 如果沒有action，返回productionDetailPage
  useEffect(() => {
    console.log("action", action);
    if (!action) {
      navigate("/ProductionDetailPage");
    }
  }, []);

  // 開始子批生產
  const startChildLot = async (data) => {
    let childLots = [];
    let newLots = lotStore.map((lot) => {
      const childLot = {
        startTime: dayjs.tz(new Date(), TZ).format(),
        machineSN: lot.machineSN,
        workOrderSN: lot.workOrderSN,
        workOrderQuantity: lot.workOrderQuantity,
        operator1: data.get("operator1"),
        operator2: data.get("operator2"),
      };
      childLots.push(childLot);
      if (lot.children === null) {
        lot.children = [childLot];
      } else {
        lot.children.push(childLot);
      }
      return lot;
    });
    await addChildLots(childLots)
      .unwrap()
      .then((payload) => {
        // update payload to newLots
        newLots.forEach((lot, index) => {
          const temp = payload.data.filter((item) => {
            return item.workOrderSN === lot.workOrderSN;
          });
          console.log("temp", temp);
          lot.children[lot.children.length - 1] = temp[0];
        });
        updateLots(newLots);
      })
      .catch((error) => {
        console.error("rejected", error);
        notification.error({
          description: "暫時無法更新，請稍後再試",
          placement: "bottomRight",
          duration: 5,
        });
        return;
      });
    // 更新製令單狀態為On-going
    const updatedProductionSchedules = new Set();
    lotStore.forEach((workOrder) => {
      updatedProductionSchedules.add(
        workOrder.id || workOrder.productionSchedule_id
      );
    });
    const updatedIds = JSON.stringify(Array.from(updatedProductionSchedules));
    console.log("updatedIds", updatedIds);
    // 如果有實際上機日，表示此批之前就已經有開始生產，不需要再更新實際上機日
    let args = {};
    if (lotStore[0].actualStartDate) {
      args = {
        ids: updatedIds,
        data: {
          status: WORKORDER_STATUS.ON_GOING,
        },
      };
    } else {
      args = {
        ids: updatedIds,
        data: {
          status: WORKORDER_STATUS.ON_GOING,
          actualOnMachineDate: dayjs.tz(new Date(), TZ).format(),
        },
      };
    }
    console.log("args", args);
    await updateProductionSchedules(args)
      .unwrap()
      .then((payload) => {
        navigate("/ProductionInspectionPage");
      })
      .catch((error) => {
        console.error("rejected", error);
        notification.error({
          description: "暫時無法更新，請稍後再試",
          placement: "bottomRight",
          duration: 5,
        });
      });
  };

  // 結束子批生產
  const endChildLot = async (data) => {
    // 檢查人員帳號是否與開始的人員帳號相同
    let isValidate = true;
    const lastChildLot = lotStore[0].children[lotStore[0].children.length - 1];
    if (lastChildLot.operator1 !== data.get("operator1")) {
      setErrorOperator1(true);
      setErrorMsgOperator1("人員1帳號與開始的人員1不符合");
      isValidate = false;
    } else {
      setErrorOperator1(false);
    }
    if (lastChildLot.operator2 !== data.get("operator2")) {
      setErrorOperator2(true);
      setErrorMsgOperator2("人員2帳號與開始的人員2不符合");
      isValidate = false;
    } else {
      setErrorOperator2(false);
    }
    if (!isValidate) {
      return;
    }
    // 更新子批結束時間
    let childLots = [];
    let updatedLots = lotStore.map((lot) => {
      if (lot.children) {
        const lastChildLot = lot.children[lot.children.length - 1];
        const childLot = {
          id: lastChildLot.id || lastChildLot.productionReport_id,
          workOrderSN: lastChildLot.workOrderSN,
          endTime: dayjs.tz(new Date(), TZ).format(),
        };
        lot.children[lot.children.length - 1] = {
          ...lastChildLot,
          ...childLot,
        };
        childLots.push(childLot);
      }
      return lot;
    });
    console.log("childLots", childLots);
    await updateChildLots(childLots)
      .unwrap()
      .then((payload) => {
        navigate("/ProductionDetailPage");
      })
      .catch((error) => {
        console.error("rejected", error);
        notification.error({
          description: "暫時無法更新，請稍後再試",
          placement: "bottomRight",
          duration: 5,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValidate = true;
    const data = new FormData(e.currentTarget);
    if (data.get("operator1") === "") {
      setErrorOperator1(true);
      setErrorMsgOperator1("請輸入人員1帳號");
      isValidate = false;
    } else {
      setErrorOperator1(false);
    }
    if (data.get("operator2") === "") {
      setErrorOperator2(true);
      setErrorMsgOperator2("請輸入人員2帳號");
      isValidate = false;
    } else {
      setErrorOperator2(false);
    }
    if (!isValidate) {
      return;
    }
    if (action === "startChildLot") {
      startChildLot(data);
    } else if (action === "endChildLot") {
      endChildLot(data);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      className={styles.operatorSign}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // height: "100vh", // Modify this if needed
        textAlign: "center",
      }}
    >
      <div className={styles.box}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "#FFFFFF",
          }}
        >
          請輸入產線工作人員1帳號，正式進行作業(必填)
        </Typography>

        {/* 帳號 */}
        <TextField
          className="muiTextField"
          id="operator1"
          label="人員1帳號*"
          name="operator1"
          autoComplete="operator1"
          variant="outlined"
          margin="normal"
          inputProps={{ style: { fontSize: "16px", color: "#FFF" } }} // font size of input text
          InputLabelProps={{ style: { fontSize: "16px" } }} // font size of input label
          error={errorOperator1}
          helperText={errorOperator1 ? `${errorMsgOperator1}` : ""}
          FormHelperTextProps={{
            style: { fontSize: "16px", color: "#E61F19" },
          }}
        />
      </div>
      <div className={styles.box}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "#FFFFFF",
          }}
        >
          請輸入產線工作人員2帳號
        </Typography>

        {/* 帳號 */}
        <TextField
          className="muiTextField"
          id="operator2"
          label="人員2帳號"
          name="operator2"
          autoComplete="operator2"
          variant="outlined"
          margin="normal"
          inputProps={{ style: { fontSize: "16px", color: "#FFF" } }} // font size of input text
          InputLabelProps={{ style: { fontSize: "16px" } }} // font size of input label
          error={errorOperator2}
          helperText={errorOperator2 ? `${errorMsgOperator2}` : ""}
          FormHelperTextProps={{
            style: { fontSize: "16px", color: "#E61F19" },
          }}
        />
      </div>

      <Button
        type="submit"
        className="sign"
        sx={{
          textAlign: "end",
          marginTop: "30px",
          color: "#FFFFFF",
          fontSize: "16px",
        }}
      >
        確認
      </Button>
      <Button
        variant="text"
        sx={{
          color: "#8F8F8F",
          marginTop: "30px",
          fontSize: "16px",
          textDecoration: "underline",
        }}
        onClick={() => navigate(-1)}
      >
        取消
      </Button>
    </Box>
  );
};

export default OperatorSign;
