import React, { useState, createContext, useContext } from "react";
import { Layout as AntLayout } from "antd";
const { Content, Header, Footer, Sider } = AntLayout;
import { Link, Outlet } from "react-router-dom";

const LayoutContext = createContext();

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutContext.Provider value={{ collapsed, setCollapsed }}>
      <AntLayout className="app-layout">{children}</AntLayout>
    </LayoutContext.Provider>
  );
};

const LayoutSider = () => {
  const { collapsed, setCollapsed } = useContext(LayoutContext);

  return (
    <Sider
      className="app-layout__sider"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="lg"
    >
      {/* Sider content */}
    </Sider>
  );
};

Layout.Sider = LayoutSider;
Layout.Sider.displayName = "Layout.Sider";

Layout.Header = () => <Header className="app-layout__header" />;
Layout.Header.displayName = "Layout.Header";

Layout.Content = () => (
  <Content className="app-layout__content">
    <Outlet />
  </Content>
);
Layout.Content.displayName = "Layout.Content";

Layout.Footer = () => (
  <Footer className="app-layout__footer">
    Your App ©{new Date().getFullYear()} Created by Your Team
  </Footer>
);
Layout.Footer.displayName = "Layout.Footer";

export default Layout;
