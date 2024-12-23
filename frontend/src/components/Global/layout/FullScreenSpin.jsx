import styled from "styled-components";
import { Spin } from "antd";

const StyledSpinContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 32, 0.205);
  z-index: 9999;

  .ant-spin {
    .ant-spin-dot-item {
      background-color: #fff;
    }
  }
`;

export const FullScreenSpin = () => (
  <StyledSpinContainer>
    <Spin size="large" />
  </StyledSpinContainer>
);
