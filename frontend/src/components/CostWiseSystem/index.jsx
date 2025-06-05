import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
const CostWiseSystemWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CostWiseSystemHeader = styled.div`
  color: var(--color-primary-text);
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 0;
  border-bottom: 1px solid #444;
`;

function CostWiseSystem() {
  return (
    <CostWiseSystemWrapper>
      <CostWiseSystemHeader>智慧成本</CostWiseSystemHeader>
      <Outlet />
    </CostWiseSystemWrapper>
  );
}

export default CostWiseSystem;
