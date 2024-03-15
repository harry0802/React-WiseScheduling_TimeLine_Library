import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

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

const CssBox = styled(Box)({
  borderRadius: "10px",
  backgroundColor: "#3D424E",
  width: "600px",
  marginTop: "30px",
  textAlign: "left",
  padding: "30px",
});

const OperatorSign = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    var isValidate = false;

    const data = new FormData(e.currentTarget);
    console.log({
      operator1: data.get("operator1"),
      operator2: data.get("operator2"),
    });

    if (isValidate) {
      navigate("/");
    } else {
      setError(true);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      className="operator-sign"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Add this line
        height: "100vh", // Modify this if needed
        textAlign: "center",
      }}
    >
      <CssBox>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: "#FFFFFF",
            marginTop: "30px",
          }}
        >
          請輸入產線工作人員1帳號，正式進行作業(必填)
        </Typography>

        {/* 帳號 */}
        <CssTextField
          sx={{
            width: "350px",
            borderRadius: "5px",
          }}
          id="operator1"
          label="人員1帳號*"
          name="operator1"
          autoComplete="operator1"
          variant="outlined"
          margin="normal"
          inputProps={{ style: { fontSize: "24px", color: "#FFF" } }} // font size of input text
          InputLabelProps={{ style: { fontSize: "24px" } }} // font size of input label
          error={error}
          helperText={error ? "您並無權限閱覽/帳號密碼錯誤" : ""}
          FormHelperTextProps={{
            style: { fontSize: "22px", color: "#E61F19" },
          }}
        />
      </CssBox>
      <CssBox>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: "#FFFFFF",
            marginTop: "30px",
          }}
        >
          請輸入產線工作人員2帳號(非必填)
        </Typography>

        {/* 帳號 */}
        <CssTextField
          sx={{
            width: "350px",
            borderRadius: "5px",
          }}
          id="operator2"
          label="人員2帳號"
          name="operator2"
          autoComplete="operator2"
          variant="outlined"
          margin="normal"
          inputProps={{ style: { fontSize: "24px", color: "#FFF" } }} // font size of input text
          InputLabelProps={{ style: { fontSize: "24px" } }} // font size of input label
          error={error}
          helperText={error ? "您並無權限閱覽/帳號密碼錯誤" : ""}
          FormHelperTextProps={{
            style: { fontSize: "22px", color: "#E61F19" },
          }}
        />
      </CssBox>

      <Button
        type="submit"
        className="sign"
        sx={{
          textAlign: "end",
          marginTop: "60px",
          color: "#FFFFFF",
          fontSize: "24px",
        }}
      >
        確認
      </Button>
      <Button
        variant="text"
        sx={{
          color: "#8F8F8F",
          marginTop: "30px",
          fontSize: "24px",
          textDecoration: "underline",
        }}
        onClick={() => navigate("/ProductionDetailPage")}
      >
        取消
      </Button>
    </Box>
  );
};

export default OperatorSign;
