import styled from 'styled-components';
import { Box } from '@mui/material';

export const StatusCard = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  ${props => props.status === '機台停機' && `
    border-left: 4px solid #f44336;
  `}
  
  ${props => props.status === '調機' && `
    border-left: 4px solid #ff9800;
  `}
`;

export const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
  }
  
  p {
    margin: 0.5rem 0 0;
    color: rgba(0, 0, 0, 0.6);
  }
`;

export const SliderContainer = styled(Box)`
  position: relative;
  margin: 2rem 0;
  
  .MuiSlider-rail {
    height: 8px;
    background: #e0e0e0;
  }
  
  .MuiSlider-track {
    height: 8px;
    background: #2196f3;
  }
  
  .MuiSlider-thumb {
    width: 24px;
    height: 24px;
    background: #fff;
    border: 2px solid #2196f3;
    
    &:hover {
      box-shadow: 0 0 0 8px rgba(33, 150, 243, 0.16);
    }
  }
`;

export const ReasonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  
  .MuiFormControlLabel-root {
    margin: 0;
  }
`;