import { useEffect, useState } from "react";
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
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.3s;
  pointer-events: ${(props) => (props.show ? "auto" : "none")};

  .ant-spin {
    .ant-spin-dot-item {
      background-color: #fff;
    }
  }
`;

export const FullScreenSpin = () => {
  const [show, setShow] = useState(true);
  const [canUnmount, setCanUnmount] = useState(false);

  useEffect(() => {
    const minDisplayTimer = setTimeout(() => {
      setShow(false);
    }, 1100);

    const unmountTimer = setTimeout(() => {
      setCanUnmount(true);
    }, 1200);

    return () => {
      clearTimeout(minDisplayTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (canUnmount) return null;

  return (
    <StyledSpinContainer show={show}>
      <Spin size="large" />
    </StyledSpinContainer>
  );
};

export const useLoadingSpinner = (loadingStates, delay = 300) => {
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const isLoading = Object.values(loadingStates).some((state) => state);

    if (isLoading) {
      setIsSpinning(true);
    } else {
      setTimeout(() => {
        setIsSpinning(false);
      }, delay);
    }
  }, Object.values(loadingStates));

  return isSpinning;
};
