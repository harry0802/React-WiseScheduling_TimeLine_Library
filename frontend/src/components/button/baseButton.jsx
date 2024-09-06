import { Button, Tooltip } from "antd";
import { memo } from "react";

const BaseButton = ({
  children,
  shape = "circle",
  onClick = null,
  className = "",
  icon,
  disabled,
  tooltip = "",
}) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={onClick}
        className={`c-btn-primars ${className}`}
        shape={shape}
        icon={icon}
        disabled={disabled}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default memo(BaseButton);
