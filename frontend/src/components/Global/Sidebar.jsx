import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import styles from "./Sidebar.module.scss";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={styles.sidebar}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className={styles.bugerMenu}>
          <Button
            type="text"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
              children: [
                {
                  key: "1-1",
                  icon: <UserOutlined />,
                  label: "nav 1-1",
                },
                {
                  key: "1-2",
                  icon: <UserOutlined />,
                  label: "nav 1-2",
                },
              ],
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
