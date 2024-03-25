import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useLotStore } from "../../store/zustand/store";

const OperatorSign = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const action = location.state.action ? location.state.action : null; // startChildLot: 開始子批生產，endChildLot: 結束子批生產
  const [error, setError] = useState(false);
  const lots = useLotStore((state) => state.lots);

  const handleSubmit = (e) => {
    e.preventDefault();
    var isValidate = true;

    const data = new FormData(e.currentTarget);
    console.log({
      operator1: data.get("operator1"),
      operator2: data.get("operator2"),
    });

    if (isValidate) {
      if (action === "startChildLot") {
        navigate("/ProductionInspectionPage");
      } else if (action === "endChildLot") {
        navigate("/ProductionDetailPage");
      }
    } else {
      setError(true);
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
        justifyContent: "center", // Add this line
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
          error={error}
          helperText={error ? "您並無權限閱覽/帳號密碼錯誤" : ""}
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
          error={error}
          helperText={error ? "您並無權限閱覽/帳號密碼錯誤" : ""}
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
