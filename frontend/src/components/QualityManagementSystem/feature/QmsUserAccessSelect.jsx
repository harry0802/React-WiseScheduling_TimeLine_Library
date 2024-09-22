import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import BeachAccess from "@mui/icons-material/BeachAccess";
import styled from "styled-components";
import { useQmsData, useQmsStore } from "../slice/QmsAccount";

const StyledContainer = styled(Container)`
  && {
    margin: 0;
    padding: 0;
    align-self: center;
    justify-content: center;
  }
`;

const StyledPaper = styled(Paper)`
  && {
    align-items: center;
    border: none;
    box-shadow: none;
    color: #fff;
    display: flex;
    flex-direction: column;
    font-family: Roboto;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    justify-content: center;
    line-height: 1.25rem;
    text-align: center;
  }
`;

const StyledBox = styled(Box)`
  && {
    align-items: center;
    background-color: currentColor;
    border-radius: 50%;
    color: transparent;
    display: flex;
    height: 3.75rem;
    justify-content: center;
    line-height: 1.25rem;
    margin: auto auto 1.25rem;
    width: 3.75rem;
  }
`;

const StyledTypography = styled(Typography)`
  font-size: 1.125rem;
  color: white;
`;

const StyledButton = styled(Button)`
  && {
    height: 56px;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #8f8f8f;
    border-radius: 0.25rem;
    color: white;
    flex-shrink: 0;
    height: 56px;
    justify-content: center;
    padding: 0.625rem 1.9375rem;
    transition: background 0.3s ease;
    width: 18.75rem;
    font-size: 18px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    &:active {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  &:nth-of-type(1) {
    margin-bottom: 1.25rem;
  }
`;

// 自定義鎖圖標組件
const CustomLockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
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

function QmsUserAccessSelect() {
  const navigate = useNavigate();
  const { machineSN } = useParams();

  const { productionSchedules, isLoadingProductionSchedules, inspectionTypes } =
    useQmsData();
  const { setUserType } = useQmsStore();

  const handleClick = (userNB) => {
    const type = inspectionTypes[userNB].schema;
    setUserType(type);
    navigate(`${type}`);
  };

  useEffect(() => {
    if (!isLoadingProductionSchedules && productionSchedules) {
      const isActiveSchedule = productionSchedules.some(
        (schedule) => schedule.machineSN === machineSN
      );

      if (!isActiveSchedule) {
        navigate("/QualityManagementSystem");
      }
    }
  }, [machineSN, isLoadingProductionSchedules, productionSchedules, navigate]);

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

        <StyledTypography
          sx={{
            marginBottom: "1.4788rem",
          }}
          variant="h4"
        >
          {machineSN}
        </StyledTypography>

        <StyledTypography
          sx={{
            marginBottom: "1.25rem",
          }}
          variant="subtitle"
          gutterBottom
        >
          請選擇使用與操作權限
        </StyledTypography>
        <StyledButton
          variant="contained"
          startIcon={<TimerIcon />}
          onClick={() => handleClick(0)}
        >
          產線小班長
        </StyledButton>
        <StyledButton
          onClick={() => handleClick(1)}
          variant="contained"
          startIcon={<BeachAccess />}
        >
          品管人員
        </StyledButton>
        <Button
          variant="text"
          onClick={() => navigate("/QualityManagementSystem")}
          sx={{
            backgroundColor: "transparent",
            color: "#8F8F8F",
            mt: "5.58rem",
            textDecoration: "underline",
            textUnderlineOffset: ".1875rem",
            "&:hover": {
              backgroundColor: "transparent",
              color: "white",
            },
          }}
        >
          取消
        </Button>
      </StyledPaper>
    </StyledContainer>
  );
}

export default QmsUserAccessSelect;
