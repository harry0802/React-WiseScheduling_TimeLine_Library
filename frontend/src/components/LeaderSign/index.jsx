import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { notification } from "antd";
import checkImage from "../../assets/check.png";
import pauseImage from "../../assets/pause.png";
import { useMachineSNStore } from "../../store/zustand/store";
import {
  useGetProductionReportQuery,
  useAddMotherLotsMutation,
  useUpdateMotherLotsMutation,
} from "../../store/api/productionReportApi";
import { useDoneStausMutation } from "../../store/api/productionScheduleApi";
import { WORKORDER_STATUS, LEADER_ACTION } from "../../config/enum";
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
  const newWorkOrders = location.state ? location.state.newWorkOrders : null; // 要新增母批的製令單號清單
  const completedWorkOrders = location.state
    ? location.state.completedWorkOrders
    : null; // 要完成的母批清單
  const pausedWorkOrders = location.state
    ? location.state.pausedWorkOrders
    : null; // 要暫停的母批清單
  const [skip, setSkip] = useState(true);
  const [error, setError] = useState(false); // 是否顯示帳號錯誤訊息
  const [errorMsg, setErrorMsg] = useState(""); // 錯誤訊息
  const [addMotherLots, motherLotsMutationResult] = useAddMotherLotsMutation(); // 新增母批
  const [updateMotherLots, updateMotherLotsMutationResult] =
    useUpdateMotherLotsMutation(); // 更新母批
  const [doneStaus] = useDoneStausMutation(); // 更新製令單狀態

  // 取得該機台正在生產的製令單資料
  const {
    data: continuedWorkOrders,
    isLoading,
    isSuccess,
    refetch,
  } = useGetProductionReportQuery(
    {
      machineSN: machineSN_Store,
      status: WORKORDER_STATUS.ON_GOING,
      motherOnly: true,
    },
    { skip: skip }
  );

  useEffect(() => {
    // 每次進入此頁面時，都要檢查是否有action，若無則返回機台選擇頁面
    if (!action) {
      navigate("/MachineSelectPage");
    }
    switch (action) {
      case "new":
        // 如果action是new，但沒有傳入要新增母批的製令單號清單，則返回製令單列表頁面。有的話，等產線管理者輸入帳號後批次新增母批。
        if (!newWorkOrders) {
          navigate("/RroductionReportPage");
        }
        break;
      case "continue":
        setSkip(false);
        break;
      case "complete":
        // 如果action是complete，但沒有傳入要完成的母批清單，則返回生產明細列表頁面。有的話，等產線管理者輸入帳號後批次完成母批。
        if (!completedWorkOrders) {
          navigate("/ProductionDetailPage");
        }
        break;
      case "pause":
        // 如果action是pause，但沒有傳入要暫停的母批清單，則返回生產明細列表頁面。有的話，等產線管理者輸入帳號後批次暫停母批。
        if (!pausedWorkOrders) {
          navigate("/ProductionDetailPage");
        }
        break;
      default:
        break;
    }
  }, []);

  const actionNew = async (data) => {
    // 新增母批
    const leader = JSON.stringify([
      {
        leader: data.get("leader"),
        log_time: dayjs.tz(new Date(), TZ).format(),
        action: LEADER_ACTION.NEW,
      },
    ]);
    const newProductionReports = newWorkOrders
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
    // await addMotherLots(newProductionReports);
    // 更新母批
    const updatedProductionReports = newWorkOrders
      .filter((workOrder) => workOrder.productionReport_id != null)
      .map((workOrder) => {
        let leader = JSON.parse(workOrder.leader);
        leader.push({
          leader: data.get("leader"),
          log_time: dayjs.tz(new Date(), TZ).format(),
          action: LEADER_ACTION.CONTINUE,
        });
        leader = JSON.stringify(leader);
        return {
          id: workOrder.productionReport_id,
          leader: leader,
        };
      });
    // await updateMotherLots(updatedProductionReports);
    const productionSchedule_ids = JSON.stringify(
      newWorkOrders.map((workOrder) => {
        return workOrder.productionSchedule_id;
      })
    );
    navigate("/ProductionDetailPage", {
      state: { productionSchedule_ids: productionSchedule_ids },
    });
  };

  const actionContinue = async (data) => {
    const updatedProductionReports = continuedWorkOrders
      .filter((workOrder) => workOrder.productionReport_id != null)
      .map((workOrder) => {
        let leader = JSON.parse(workOrder.leader);
        leader.push({
          leader: data.get("leader"),
          log_time: dayjs.tz(new Date(), TZ).format(),
          action: LEADER_ACTION.CONTINUE,
        });
        leader = JSON.stringify(leader);
        return {
          id: workOrder.productionReport_id,
          leader: leader,
        };
      });
    await updateMotherLots(updatedProductionReports);
    navigate("/ProductionDetailPage");
  };

  const actionComplete = async (data) => {
    // 更新母批
    const updatedProductionReports = completedWorkOrders
      .filter((workOrder) => workOrder.productionReport_id != null)
      .map((workOrder) => {
        let leader = JSON.parse(workOrder.leader);
        leader.push({
          leader: data.get("leader"),
          log_time: dayjs.tz(new Date(), TZ).format(),
          action: LEADER_ACTION.COMPLETE,
        });
        leader = JSON.stringify(leader);
        return {
          id: workOrder.productionReport_id,
          leader: leader,
          endTime: dayjs.tz(new Date(), TZ).format(),
        };
      });
    await updateMotherLots(updatedProductionReports);
    // 更新製令單狀態為Done
    const updatedProductionSchedules = completedWorkOrders.map((workOrder) => {
      return {
        id: workOrder.productionSchedule_id,
      };
    });
    const updatedIds = Json.stringify(updatedProductionSchedules);
    await doneStaus(updatedIds);
    notification.success({
      description: "已完成階段工作",
      placement: "bottomRight",
      duration: 5,
    });
    navigate("/ProductionReportPage");
  };

  const actionPause = async (data) => {
    // 更新母批
    const updatedProductionReports = pausedWorkOrders
      .filter((workOrder) => workOrder.productionReport_id != null)
      .map((workOrder) => {
        let leader = JSON.parse(workOrder.leader);
        leader.push({
          leader: data.get("leader"),
          log_time: dayjs.tz(new Date(), TZ).format(),
          action: LEADER_ACTION.PAUSE,
        });
        leader = JSON.stringify(leader);
        return {
          id: workOrder.productionReport_id,
          leader: leader,
        };
      });
    await updateMotherLots(updatedProductionReports);
    // 更新製令單狀態為暫停
    const updatedProductionSchedules = pausedWorkOrders.map((workOrder) => {
      return {
        id: workOrder.productionSchedule_id,
      };
    });
    const updatedIds = JSON.stringify(updatedProductionSchedules);
    await pauseStaus(updatedIds);
    notification.success({
      description: "已暫停該階段工作",
      placement: "bottomRight",
      duration: 5,
    });
    navigate("/ProductionReportPage");
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
        actionComplete(data);
        break;
      case "pause":
        actionPause(data);
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
