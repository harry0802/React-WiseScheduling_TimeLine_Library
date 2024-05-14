import React, { useState } from "react";
import styles from "./Topbar.module.scss";
import { Layout, Button } from "antd";
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../../assets/logo.svg";
import translation from "../../assets/translation.svg";
import { useTranslation } from "react-i18next";

const { Header } = Layout;

const Topbar = () => {
  const { i18n } = useTranslation();
  const lngs = {
    "zh-TW": { nativeName: "Taiwanese" },
    "vi-VN": { nativeName: "Vietnamese" },
  };
  return (
    <Header>
      <div className={styles.inner}>
        <img src={logo} alt="隆廷實業股份有限公司" />
        <div className={styles.tools}>
          <img src={translation} alt="語言切換" />
          {Object.keys(lngs).map((lng) => (
            <button
              key={lng}
              style={{
                fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
              }}
              type="submit"
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
          <NotificationsIcon sx={{ color: "#E0E7F5" }} />
        </div>
      </div>
    </Header>
  );
};

export default Topbar;
