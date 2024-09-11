import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import TimerIcon from "@mui/icons-material/Timer";
import BeachAccess from "@mui/icons-material/BeachAccess";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  width: auto;
  border: none;
  box-shadow: none;
  padding-top: 6.13rem;
`;

// 自定義鎖圖標組件
const CustomLockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="41"
    height="41"
    viewBox="0 0 41 41"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.5 0C9.17816 0 0 9.17816 0 20.5C0 31.8218 9.17816 41 20.5 41C31.8218 41 41 31.8218 41 20.5C41 9.17816 31.8218 0 20.5 0ZM20.7887 8.81691C16.7948 8.81691 13.5191 12.019 13.5191 15.9886V17.912C11.8932 17.9174 10.5493 19.2213 10.5493 20.8609V28.6567C10.5493 30.2998 11.8987 31.6056 13.5292 31.6056H28.0483C29.6787 31.6056 31.0282 30.2998 31.0282 28.6567V20.8609C31.0282 19.2213 29.6843 17.9174 28.0583 17.912V15.9886C28.0583 12.019 24.7826 8.81691 20.7887 8.81691ZM15.5191 15.9886C15.5191 13.1531 17.8696 10.8169 20.7887 10.8169C23.7079 10.8169 26.0583 13.1531 26.0583 15.9886V18.912V19.912H27.0583H28.0483C28.604 19.912 29.0282 20.352 29.0282 20.8609V28.6567C29.0282 29.1656 28.604 29.6056 28.0483 29.6056H13.5292C12.9735 29.6056 12.5493 29.1656 12.5493 28.6567V20.8609C12.5493 20.352 12.9735 19.912 13.5292 19.912H14.5191H15.5191V18.912V15.9886ZM18.8189 15.9886C18.8189 14.9437 19.6886 14.0652 20.7887 14.0652C21.8889 14.0652 22.7586 14.9437 22.7586 15.9886V17.912H18.8189V15.9886ZM20.7887 12.0652C18.6138 12.0652 16.8189 13.8096 16.8189 15.9886V18.912V19.912H17.8189H23.7586H24.7586V18.912V15.9886C24.7586 13.8096 22.9636 12.0652 20.7887 12.0652Z"
      fill="url(#paint0_linear_3030_457)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3030_457"
        x1="4.33099"
        y1="9.23944"
        x2="34.6479"
        y2="35.8028"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8AC0E2" />
        <stop offset="1" stopColor="#73D5BF" />
      </linearGradient>
    </defs>
  </svg>
);

// 更新 StyledBox 組件以適應新的圖標尺寸
const StyledBox = styled(Box)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 2.5625rem;
  height: 2.5625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.25rem; /* 166.667% */
  margin-bottom: 1.25rem;
  background-color: currentColor;
  color: white;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  box-shadow: none;
  color: #fff;
  text-align: center;
  font-family: Roboto;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 166.667% */
`;

const StyledTypography = styled(Typography)`
  color: white;
`;

const StyledButton = styled(Button)`
  width: 11.875rem;
  height: 2.5rem;
  padding: 0.625rem 1.9375rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid #8f8f8f;
  background: rgba(255, 255, 255, 0.1);
  color: white;

  &:nth-of-type(1) {
    margin-bottom: 1.25rem;
  }
`;

function QmsUserAccessSelect() {
  return (
    <StyledContainer>
      <StyledPaper
        sx={{
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
        }}
      >
        <StyledBox>
          <CustomLockIcon />
        </StyledBox>
        <StyledTypography variant="h4" gutterBottom>
          A01
        </StyledTypography>

        <StyledTypography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
          請選擇使用與操作權限
        </StyledTypography>
        <StyledButton variant="contained" startIcon={<TimerIcon />}>
          產線小班長
        </StyledButton>
        <StyledButton variant="contained" startIcon={<BeachAccess />}>
          品管人員
        </StyledButton>
        <Button variant="text" sx={{ mt: "5.58rem", color: "white" }}>
          取消
        </Button>
      </StyledPaper>
    </StyledContainer>
  );
}

export default QmsUserAccessSelect;
