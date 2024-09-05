import { Button, Tooltip } from "antd";
import { memo } from "react";

function ProductionRecordButton({
  children,
  shape = "circle",
  OnClick = null,
  className = "",
  icon,
  disabled,
  tooltip = "",
}) {
  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={OnClick}
        className={`c-btn-primars ${className}`}
        shape={shape}
        icon={icon}
        disabled={!!disabled ? disabled : null}
      >
        {children}
      </Button>
    </Tooltip>
  );
}

export default memo(ProductionRecordButton);
