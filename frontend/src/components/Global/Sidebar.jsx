import React, { useState } from "react";
import {
  ScheduleOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
  SettingOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import styles from "./Sidebar.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const menuItems = [
  {
    key: "production",
    icon: <ScheduleOutlined />,
    label: "生管部門",
    children: [
      {
        key: "ProductionSchedulePage",
        label: "計畫排程表",
      },
      {
        key: "FactoryQuotationManagementSystem",
        label: "廠內報價系統",
      },
      {
        key: "ProductionRecordPage",
        label: "產品履歷BOM系統",
      },
      {
        key: "CostWiseSystemPage",
        label: "智慧成本分析表",
      },
    ],
  },
  {
    key: "quality",
    icon: <SafetyCertificateOutlined />,
    label: "品管部門",
    children: [
      {
        key: "QualityManagementSystem",
        label: "即時品檢系統",
      },
    ],
  },
  {
    key: "sales",
    icon: <ShoppingOutlined />,
    label: "業務部門",
    children: [
      {
        key: "SalesQuotationManagementSystem",
        label: "業務報價系統",
      },
    ],
  },
  {
    key: "molding",
    icon: <SettingOutlined />,
    label: "成型部門",
    children: [
      {
        key: "MachineMaintenance",
        label: "機台保養表",
      },
      {
        key: "MoldMaintenance",
        label: "模具保養表",
      },
      {
        key: "MachineSelectPage",
        label: "派工系統",
      },
    ],
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 取得當前路徑作為選中項目
  const selectedKey =
    location.pathname.split("/")[1] || "ProductionSchedulePage";

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <div className={styles.sidebar}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo} />
        <div className={styles.bugerMenu}>
          <Button
            type="text"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ color: "white" }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={["production", "quality", "sales", "molding"]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
