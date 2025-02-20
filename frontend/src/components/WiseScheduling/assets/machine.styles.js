import styled from "styled-components";
import { Box } from "@mui/material";

export const StatusHeader = styled.div`
  color: #666;
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: normal;
  }
  p {
    margin: 5px 0 0;
    font-size: 14px;
  }
`;

export const SliderContainer = styled(Box)`
  margin: 2rem 0;
  position: relative;
  
  .MuiSlider-rail {
    height: 4px;
    background: #E8E8E8;
    border-radius: 2px;
  }
  
  .MuiSlider-track {
    height: 4px;
    border-radius: 2px;
  }
  
  .MuiSlider-thumb {
    width: 16px;
    height: 16px;
    background: #2196F3;
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
  
  .test { color: #00BCD4; }
  .error { color: #F44336; }
  .adjust { color: #FFC107; }
  .waiting { color: #9E9E9E; }
`;

export const ReasonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;

  .MuiFormControlLabel-root {
    margin: 0;
    font-size: 14px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;

  button {
    padding: 6px 16px;
    border-radius: 4px;
    border: 1px solid #ddd;
    cursor: pointer;
    font-size: 14px;
    
    &.confirm {
      background-color: #8BC34A;
      color: white;
      border: none;
      &:hover {
        background-color: #7CB342;
      }
    }
  }
`;