import React from "react";
import { Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Global/Topbar";
import styled from "styled-components";

const { Content } = Layout;

const MainContent = styled.div`
  && {
    display: flex;
    padding: 0 1.25rem;
    height: 100%;
    width: 100%;
    justify-content: center;
  }
`;

const AppLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout>
      <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Content style={{ display: "flex", flexDirection: "column" }}>
        <React.Suspense fallback={<Spin size="large" />}>
          <MainContent>
            <Outlet />
          </MainContent>
        </React.Suspense>
      </Content>
    </Layout>
  );
};

export default AppLayout;
