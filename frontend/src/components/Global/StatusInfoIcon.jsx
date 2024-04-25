import React from "react";
import { Button, Modal, Tooltip } from "antd";
import InfoIcon from "@mui/icons-material/Info";

const showInfo = () => {
  Modal.info({
    content: (
      <p>
        1.若預計完成日前七天未完單，狀態欄反黃提醒
        2.若已經過了預計完成日，狀態欄則會反紅警示
        3.暫停單據，字體顏色較不明顯，但仍舊能與其他單據合併重新生產
      </p>
    ),
    okText: "確定",
    onOk() {},
  });
};

export default function StatusInfoIcon() {
  return (
    <Tooltip title="狀態欄位說明">
      <Button
        type="default"
        shape="circle"
        icon={<InfoIcon />}
        onClick={showInfo}
      />
    </Tooltip>
  );
}
