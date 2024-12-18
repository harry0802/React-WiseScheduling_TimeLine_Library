import React from "react";
import { Button, Modal, Tooltip } from "antd";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from "react-i18next";

export default function StatusInfoIcon() {
  const { t } = useTranslation();
  const showInfo = () => {
    Modal.info({
      content: (
        <p>
          {t("productionReport.statusInfoIcon.description1")} <br />
          {t("productionReport.statusInfoIcon.description2")} <br />
          {t("productionReport.statusInfoIcon.description3")}
        </p>
      ),
      okText: "確定",
      onOk() {},
    });
  };

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
