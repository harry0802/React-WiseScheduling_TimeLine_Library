import { Button } from "antd";

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

export default ProductionRecordButton;
