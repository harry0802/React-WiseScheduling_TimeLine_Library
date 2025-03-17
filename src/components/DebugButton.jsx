import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const DebugButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
`;

const Button = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #ff5252;
  }
`;

const DevtoolsContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 60%;
  z-index: 9998;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DebugButton = () => {
  const [isDevtoolsOpen, setIsDevtoolsOpen] = useState(false);

  const toggleDevtools = () => {
    setIsDevtoolsOpen(!isDevtoolsOpen);
  };

  return (
    <>
      <DebugButtonContainer>
        <Button onClick={toggleDevtools}>
          {isDevtoolsOpen ? '關閉查詢調試' : '打開查詢調試'}
        </Button>
      </DebugButtonContainer>
      
      <DevtoolsContainer isOpen={isDevtoolsOpen}>
        <ReactQueryDevtools initialIsOpen={true} />
      </DevtoolsContainer>
    </>
  );
};

export default DebugButton;
