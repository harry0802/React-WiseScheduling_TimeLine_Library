import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import checkImage from "../../assets/check.png";
import pauseImage from "../../assets/pause.png";
import { useMachineSNStore, useLotStore } from "../../store/zustand/store";
import {
  useAddMotherLotsMutation,
  useUpdateMotherLotsMutation,
} from "../../store/api/productionReportApi";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TZ } from "../../config/config";
dayjs.extend(utc);
dayjs.extend(timezone);

const LeaderSign = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const machineSN_Store = useMachineSNStore((state) => state.machineSN_Store); // 從zustand store 取得機台編號
  const action = location.state ? location.state.action : null; // new: 從製令單列表頁面過來要新增母批, continue: 從機台選擇頁面過來要繼續進行正在生產的母批, complete: 完成母批, pause: 暫停母批
  const selectedWorkOrder = location.state
    ? location.state.selectedWorkOrder
    : null; // 要新增母批的製令單號清單
  const [error, setError] = useState(false); // 是否顯示帳號錯誤訊息
  const [errorMsg, setErrorMsg] = useState(""); // 錯誤訊息
  const lots = useLotStore((state) => state.lots); // 該機台的母批及子批清單
  const [addMotherLots, motherLotsMutationResult] = useAddMotherLotsMutation(); // 新增母批
  const [updateMotherLots, updateMotherLotsMutationResult] =
    useUpdateMotherLotsMutation(); // 更新母批

  useEffect(() => {
    // 每次進入此頁面時，都要檢查是否有action，若無則返回機台選擇頁面
    if (!action) {
      navigate("/MachineSelectPage");
    }
    switch (action) {
      case "new":
        // 如果action是new，但沒有傳入要新增母批的製令單號清單，則返回製令單列表頁面。有的話，等產線管理者輸入帳號後批次新增母批。
        if (!selectedWorkOrder) {
          navigate("/RroductionReportPage");
        }
        break;
      case "continue":
        // 如果action是continue，但lot state沒有正在生產的母批，則返回機台選擇頁面。有的話，等產線管理者輸入帳號後更新正在生產的母批。
        if (lots.length === 0) {
          navigate("/MachineSelectPage");
        }
        break;
      default:
        break;
    }
  }, []);

  // 若母批已存在，則更新正在生產的母批，例如暫停生產的母批
  const handleUpdateMotherLots = async (data) => {
    const updatedProductionReports = selectedWorkOrder
      .filter((workOrder) => workOrder.productionReport_id != null)
      .map((workOrder) => {
        let leader = JSON.parse(workOrder.leader);
        leader.push({
          leader: data.get("leader"),
          log_time: dayjs.tz(new Date(), TZ).format(),
        });
        leader = JSON.stringify(leader);
        return {
          id: workOrder.productionReport_id,
          leader: leader,
        };
      });
    const updatedItem = await updateMotherLots(updatedProductionReports);
  };

  const actionNew = async (data) => {
    // 新增母批
    const leader = JSON.stringify([
      {
        leader: data.get("leader"),
        log_time: dayjs.tz(new Date(), TZ).format(),
      },
    ]);
    const newProductionReports = selectedWorkOrder
      .filter((workOrder) => workOrder.productionReport_id === null)
      .map((workOrder) => {
        return {
          startTime: dayjs.tz(new Date(), TZ).format(),
          machineSN: machineSN_Store,
          workOrderSN: workOrder.workOrderSN,
          lotName: workOrder.workOrderSN,
          workOrderQuantity: workOrder.workOrderQuantity,
          leader: leader,
        };
      });
    const addedItem = await addMotherLots(newProductionReports);
    handleUpdateMotherLots(data);
    navigate("/ProductionDetailPage");
  };

  const actionContinue = async (data) => {
    handleUpdateMotherLots(data);
    navigate("/ProductionDetailPage");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("leader") === "") {
      setError(true);
      setErrorMsg("請輸入帳號");
      return;
    } else {
      setError(false);
      setErrorMsg("");
    }
    switch (action) {
      case "new":
        actionNew(data);
        break;
      case "continue":
        actionContinue(data);
        break;
      case "complete":
        break;
      case "pause":
        break;
      default:
        break;
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      className={styles.leaderSign}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Add this line
        height: "100vh", // Modify this if needed
        textAlign: "center",
      }}
    >
      {action === "complete" && (
        <img style={{ width: "150px" }} src={checkImage} alt="完成" />
      )}
      {action === "pause" && (
        <img style={{ width: "120px" }} src={pauseImage} alt="暫停" />
      )}

      <Typography
        variant="h6"
        component="h2"
        sx={{
          color: "#FFFFFF",
          marginTop: "30px",
        }}
      >
        請輸入該產線管理者帳號，完成該工作階段
      </Typography>

      {/* 帳號 */}
      <TextField
        className="muiTextField"
        id="leader"
        label="帳號"
        name="leader"
        autoComplete="leader"
        variant="outlined"
        margin="normal"
        inputProps={{ style: { fontSize: "16px", color: "#FFF" } }} // font size of input text
        InputLabelProps={{ style: { fontSize: "16px" } }} // font size of input label
        error={error}
        helperText={error ? errorMsg : ""}
        FormHelperTextProps={{
          style: { fontSize: "16px", color: "#E61F19" },
        }}
      />

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
      {(action === "new" || action === "continue") && (
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
      )}
      {(action === "complete" || action === "pause") && (
        <Button
          variant="text"
          sx={{
            color: "#8F8F8F",
            marginTop: "30px",
            fontSize: "18px",
            textDecoration: "underline",
          }}
          onClick={() => navigate("/ProductionDetailPage")}
        >
          取消
        </Button>
      )}
    </Box>
  );
};

export default LeaderSign;
