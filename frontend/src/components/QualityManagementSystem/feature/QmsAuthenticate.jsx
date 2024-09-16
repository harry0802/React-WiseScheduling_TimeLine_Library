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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
  width: 100%;
  max-width: 18.75rem;
  margin-bottom: 1.25rem;

  && {
    .MuiInputBase-input {
      font-size: 1rem;
      color: #fff;
    }
    label {
      color: #8f8f8f;
    }
    fieldset {
      border-color: #8f8f8f;
    }
    &:hover fieldset {
      border-color: #8f8f8f;
    }
    .Mui-focused fieldset {
      border-color: #8f8f8f;
    }
    input:focus + fieldset {
      border-color: #8f8f8f;
    }
  }

  .MuiInputLabel-root {
    color: #8f8f8f;
    margin-bottom: 0.9375rem;
    &.Mui-focused {
      color: #8f8f8f;
    }
  }
`;

const SubmitButton = styled(Button)`
  && {
    display: flex;
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
    margin-top: 0.9375rem;
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
  const { userType } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <LeaderSignContainer>
      <StyledTypography variant="h6" component="h2">
        請輸入{userType === "productionLine" ? "產線小班長" : "品管人員"}帳號
      </StyledTypography>
      <StyledTextField
        sx={{ mb: "1.25rem" }}
        label="請輸入帳號"
        variant="outlined"
        fullWidth
      />
      <StyledTextField
        sx={{ mb: "2.125rem" }}
        label="請輸入密碼"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                sx={{ color: "#8f8f8f" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <SubmitButton variant="contained" fullWidth>
        確認
      </SubmitButton>
      <CancelButton
        onClick={() => navigate("/QualityManagementSystem/QmsUserAccessSelect")}
        variant="text"
      >
        取消
      </CancelButton>
    </LeaderSignContainer>
  );
}

export default QmsAuthenticate;
