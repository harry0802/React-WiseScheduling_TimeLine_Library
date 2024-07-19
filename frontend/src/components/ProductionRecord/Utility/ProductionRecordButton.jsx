import { Button } from "antd";

function ProductionRecordButton({
  children,
  shape = "circle",
  OnClick = null,
  className = "",
  icon,
}) {
  return (
    <Button
      onClick={OnClick}
      className={`c-btn-primars${className}`}
      shape={shape}
      icon={icon}
    >
      {children}
    </Button>
  );
}

export default ProductionRecordButton;
