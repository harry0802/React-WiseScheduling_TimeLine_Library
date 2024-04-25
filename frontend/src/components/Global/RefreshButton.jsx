import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Tooltip } from "antd";
import { throttle } from "lodash"; // 引入 lodash 的 debounce 函數
import styles from "./RefreshButton.module.scss";

export default function RefreshButton() {
  const refresh = () => {
    window.location.reload(true);
  };
  const throttleRefresh = throttle(refresh, 500);
  return (
    <div className={styles.refreshButton}>
      <Tooltip title="重新整理">
        <Button
          className={styles.btnRefresh}
          type="default"
          shape="circle"
          icon={<RefreshIcon sx={{ fontSize: 36 }} />}
          onClick={throttleRefresh}
        />
      </Tooltip>
    </div>
  );
}
