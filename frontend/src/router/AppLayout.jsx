import React from "react";
import { Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Global/Topbar";
import styled from "styled-components";
const { Content } = Layout;

const MainContainer = styled(Content)`
  width: auto;
  height: 100%;
`;

const AppLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout>
      <Layout>
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <MainContainer>
          <React.Suspense fallback={<Spin size="large" />}>
            <Outlet />
          </React.Suspense>
        </MainContainer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
