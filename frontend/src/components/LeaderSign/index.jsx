import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import checkImage from "../../assets/check.png";
import stopImage from "../../assets/stop.png";
import { styled } from "@mui/material/styles";
import { useLotStore } from "../../store/zustand/store";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FFFFFF",
  },
  "& label": {
    color: "#FFFFFF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#B2BAC2",
    },
  },
});

const LeaderSign = (props) => {
  // 如果沒有機台資訊，則導向機台選擇頁面
  // TODO....
  // 如果action是new，但沒有傳入要新增母批的製令單號清單，則返回製令單列表頁面。有的話，等產線管理者輸入帳號後批次新增母批。
  // TODO....
  // 如果action是continue，但lot state沒有正在生產的母批，則返回機台選擇頁面。有的話，等產線管理者輸入帳號後更新正在生產的母批。
  // TODO....

  const navigate = useNavigate();
  const location = useLocation();
  const action = location.state.action ? location.state.action : null; // new: 從製令單列表頁面過來要新增母批, continue: 從機台選擇頁面過來要繼續進行正在生產的母批, complete: 完成母批, stop: 暫停母批
  const selectedWorkOrder = location.state.selectedWorkOrder
    ? location.state.selectedWorkOrder
    : null; // 要新增母批的製令單號清單
  console.log("action: ", action);
  console.log("selectedWorkOrder: ", selectedWorkOrder);
  const [error, setError] = useState(false); // 是否顯示帳號錯誤訊息
  const lots = useLotStore((state) => state.lots); // 該機台的母批及子批清單

  const handleSubmit = (e) => {
    e.preventDefault();
    var isValidate = true;

    const data = new FormData(e.currentTarget);
    console.log({
      leader: data.get("leader"),
    });

    if (isValidate) {
      if (action === "new") {
        // 新增母批，並更新lots state
        const newLots = [
          {
            lotName: "A123456789",
            product: "產品A",
            startTime: new Date().toLocaleString(),
            quantity: 100,
            badQuantity: 0,
          },
        ];
      }
    } else {
      setError(true);
    }

    navigate("/ProductionDetailPage");
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
      {action === "stop" && (
        <img style={{ width: "120px" }} src={stopImage} alt="暫停" />
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
        helperText={error ? "您並無權限閱覽" : ""}
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
      {(action === "complete" || action === "stop") && (
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
