import React from "react";
import styles from "./Topbar.module.scss";
import { Layout, Dropdown } from "antd";
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../../assets/logo.svg";
import translation from "../../assets/translation.svg";
import { useTranslation } from "react-i18next";

const { Header } = Layout;

const Topbar = () => {
  const { i18n } = useTranslation();
  const items = [
    {
      key: "zh-TW",
      label: "中文",
    },
    {
      key: "vi-VN",
      label: "Tiếng Việt",
    },
  ];
  const onClick = ({ key }) => {
    i18n.changeLanguage(key);
  };

  return (
    <Header>
      <div className={styles.inner}>
        <img src={logo} alt="隆廷實業股份有限公司" />
        <div className={styles.tools}>
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["zh-TW"],
              onClick,
            }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <img src={translation} alt="語言切換" />
          </Dropdown>
          <NotificationsIcon />
        </div>
      </div>
    </Header>
  );
};

export default Topbar;
