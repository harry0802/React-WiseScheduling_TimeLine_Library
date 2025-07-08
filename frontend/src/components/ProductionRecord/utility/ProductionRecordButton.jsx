import { Tooltip } from "antd";
import { memo } from "react";
import { StyledProductionButton } from "./ProductionRecordButton.styled";

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
      <StyledProductionButton
        onClick={OnClick}
        className={`c-btn-primars ${className}`}
        shape={shape}
        icon={icon}
        disabled={!!disabled ? disabled : null}
      >
        {children}
      </StyledProductionButton>
    </Tooltip>
  );
}

export default memo(ProductionRecordButton);
