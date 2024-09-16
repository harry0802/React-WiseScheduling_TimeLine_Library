import React from "react";
import { Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Global/Topbar";
import styled from "styled-components";

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  && {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

const StyledContent = styled(Content)`
  && {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  && {
    flex: 1;
    display: flex;
    padding: 0 1.25rem;
    width: 100%;
    justify-content: center;
  }
`;

const AppLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <StyledLayout>
      <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <StyledContent>
        <React.Suspense fallback={<Spin size="large" />}>
          <MainContent>
            <Outlet />
          </MainContent>
        </React.Suspense>
      </StyledContent>
    </StyledLayout>
  );
};

export default AppLayout;
