import React, { useState } from "react";
import styled from "styled-components";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffectOnce } from "react-use";
import { useQmsStore } from "../slice/QmsAccount";

const LeaderSignContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledTypography = styled(Typography)`
  && {
    color: #ffffff;
    margin-bottom: 1.25rem;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    max-width: 18.75rem;
    margin-bottom: 1.875rem;
    .MuiInputBase-input {
      font-size: 1rem;
      color: #fff;
    }

    label,
    fieldset,
    &:hover fieldset,
    .Mui-focused fieldset,
    input:focus + fieldset {
      color: ${({ error }) => (error ? "#d32f2f" : "#8f8f8f")};
      border-color: ${({ error }) => (error ? "#d32f2f" : "#8f8f8f")};
    }
  }

  .MuiInputLabel-root {
    color: ${({ error }) => (error ? "#d32f2f" : "#8f8f8f")};
    margin-bottom: 0.9375rem;
    &.Mui-focused {
      color: ${({ error }) => (error ? "#d32f2f" : "#8f8f8f")};
    }
  }

  .MuiFormHelperText-root {
    color: #d32f2f;
  }

  ${({ error }) =>
    error &&
    `
    && .MuiInputBase-input {
      color: #d32f2f;
    }
  `}
`;

const SubmitButton = styled(Button)`
  && {
    display: flex;
    margin-bottom: 1.875rem;
    width: 300px;
    height: 56px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #8ac0e2;
    background: linear-gradient(269deg, #73d5bf 13.23%, #8ac0e2 77.6%);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

const CancelButton = styled(Button)`
  && {
    color: #8f8f8f;
    font-size: 0.875rem;
    text-transform: none;
    &:hover {
      color: #ffffff;
      background-color: transparent;
    }
  }
`;

function QmsAuthenticate() {
  const navigate = useNavigate();
  const { userType, machineSN } = useParams();
  const {
    login,
    account: storedAccount,
    password: storedPassword,
  } = useQmsStore();

  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState(storedAccount || "");
  const [password, setPassword] = useState(storedPassword || "");
  const [accountError, setAccountError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    const newAccountError = account ? "" : "請輸入帳號";
    const newPasswordError = password ? "" : "請輸入密碼";
    setAccountError(newAccountError);
    setPasswordError(newPasswordError);
    return !newAccountError && !newPasswordError;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      login(account, password, userType);
      navigate(`/QualityManagementSystem/${machineSN}/${userType}/dashboard`);
    }
  };

  useEffectOnce(() => {
    if (!machineSN || !userType) {
      navigate("/QualityManagementSystem");
    }
  });

  return (
    <LeaderSignContainer>
      <StyledTypography variant="h6" component="h2">
        請輸入{userType === "productionLine" ? "產線小班長" : "品管人員"}帳號
      </StyledTypography>
      <StyledTextField
        label="請輸入帳號"
        variant="outlined"
        fullWidth
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        error={!!accountError}
        helperText={accountError}
        required
        onFocus={() => setAccountError("")}
        onBlur={() => !account && setAccountError("請輸入帳號")}
      />
      <StyledTextField
        label="請輸入密碼"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
        required
        onFocus={() => setPasswordError("")}
        onBlur={() => !password && setPasswordError("請輸入密碼")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
                sx={{ color: "#8f8f8f" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <SubmitButton variant="contained" fullWidth onClick={handleSubmit}>
        確認
      </SubmitButton>
      <CancelButton
        onClick={() => navigate(`/QualityManagementSystem/${machineSN}`)}
        variant="text"
      >
        取消
      </CancelButton>
    </LeaderSignContainer>
  );
}

export default QmsAuthenticate;
