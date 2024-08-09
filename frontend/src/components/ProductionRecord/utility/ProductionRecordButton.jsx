import { Button } from "antd";
import { memo } from "react";

function ProductionRecordButton({
  children,
  shape = "circle",
  OnClick = null,
  className = "",
  icon,
  disabled,
}) {
  return (
    <Button
      onClick={OnClick}
      className={`c-btn-primars ${className}`}
      shape={shape}
      icon={icon}
      disabled={!!disabled ? disabled : null}
    >
      {children}
    </Button>
  );
}

export default memo(ProductionRecordButton);
