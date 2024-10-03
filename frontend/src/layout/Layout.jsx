import { useState, createContext, useContext } from "react";
import { Layout as AntLayout, Menu } from "antd";
const { Content, Header, Footer, Sider } = AntLayout;
import { Link, Outlet } from "react-router-dom";
import { HomeOutlined, BarChartOutlined } from "@ant-design/icons";

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

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "2",
      icon: <BarChartOutlined />,
      label: <Link to="/pig-house-inventory">Pig House Inventory</Link>,
    },
    {
      key: "3",
      icon: <BarChartOutlined />,
      label: <Link to="/sow-breeding-records">Sow Breeding Records</Link>,
    },
    {
      key: "4",
      icon: <BarChartOutlined />,
      label: <Link to="/boar-genotype">Boar Genotype</Link>,
    },
    {
      key: "5",
      icon: <BarChartOutlined />,
      label: <Link to="/culling-boar">Culling Boar</Link>,
    },
  ];

  return (
    <Sider
      className="app-layout__sider"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="lg"
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      />
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
