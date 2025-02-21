import styled from "styled-components";
import { Box } from "@mui/material";

export const StatusHeader = styled.div`
  color: #8f8f8f;
  padding: 0 33px;
  font-size: 18px;
  h3 {
    margin: 0;
    font-weight: normal;
    margin-bottom: 20px;
  }
  p {
    margin: 5px 0 0;
    margin-bottom: 30px;
  }
`;

export const SliderContainer = styled(Box)`
  position: relative;
  width: calc(100% - 80px);
  margin: 0 auto;
  .MuiSlider-rail {
    height: 4px;
    background: #e8e8e8;
    border-radius: 2px;
  }

  .MuiSlider-track {
    height: 4px;
    border-radius: 2px;
  }

  .MuiSlider-thumb {
    width: 16px;
    height: 16px;
    background: #2196f3;
    border: none;
    box-shadow: 0 2px 4px rgba(33, 150, 243, 0.3);

    &:hover {
      box-shadow: 0 3px 6px rgba(33, 150, 243, 0.4);
    }
  }
`;

export const StatusLabels = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  margin: 10px 0;
  font-size: 14px;

  span {
    padding: 4px 8px;
    transition: opacity 0.2s;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .test {
    color: #00bcd4;
  }
  .error {
    color: #f44336;
  }
  .adjust {
    color: #ffc107;
  }
  .waiting {
    color: #9e9e9e;
  }
`;

export const ReasonGrid = styled.div`
  display: flex;
  justify-content: center;
  .MuiFormControlLabel-root {
    margin: 0;
    font-size: 14px;
  }
`;
