import { useNavigate } from "react-router-dom";
import classes from "./Login.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import myImage from "../../assets/loginIcon.png";
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

const Login = (props) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 處理登入邏輯...

    // 登入成功後，導向生產計劃排程表

    navigate("/ProductionSchedulePage");
  };

  return (
    <Box
      component="form"
      noValidate
      className={classes.box}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Add this line
        textAlign: "center",

        // overflow: "hidden",
      }}
    >
      <img
        style={{
          maxWidth: "30.125rem",
          objectFit: "cover",
          aspectRatio: "16/1",
        }}
        src={myImage}
        alt="一張圖片"
      />
      {/* 帳號 */}
      <CssTextField
        sx={{
          width: "350px",
          borderRadius: "5px",
        }}
        id="companey"
        label="公司統編"
        name="companey"
        autoComplete="companey"
        variant="outlined"
        margin="normal"
      />
      <CssTextField
        sx={{
          width: "350px",
          borderRadius: "5px",
        }}
        id="username"
        label="帳號"
        name="username"
        autoComplete="username"
        variant="outlined"
        margin="normal"
      />
      <CssTextField
        sx={{
          width: "350px",
          borderRadius: "5px",
        }}
        id="password"
        label="密碼"
        name="password"
        autoComplete="password"
        variant="outlined"
        margin="normal"
      />

      <FormControlLabel
        sx={{ width: "350px" }}
        control={
          <Box sx={{ width: "100%", textAlign: "end" }}>
            <Checkbox />
            <span>記住統編與帳號</span>
          </Box>
        }
      />

      <Button
        className={classes.login}
        sx={{ textAlign: "end" }}
        onClick={handleLogin}
      >
        登入
      </Button>
    </Box>
  );
};

export default Login;
