import styled from 'styled-components';
import { Button } from 'antd';
import { antdButtonOverrides } from '../styles/ProductionRecordButton.styles';

// 樣式化的 Antd Button 組件
export const StyledProductionButton = styled(Button)`
  ${antdButtonOverrides}
`;