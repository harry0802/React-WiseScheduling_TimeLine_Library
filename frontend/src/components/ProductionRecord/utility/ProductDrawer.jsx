import { Drawer } from "antd";
import Box from "@mui/material/Box";
import { memo } from "react";

function ProductDrawer({
  visible,
  onClose,
  title,
  onSubmit,
  children,
  headericon = null,
  disabled,
}) {
  return (
    <Drawer
      className="product-drawer"
      width={700}
      placement="right"
      onClose={onClose}
      open={visible}
      closable={false}
      destroyOnClose={true}
    >
      <div className="product-drawer__header">
        <div>{title}</div>
        {!!headericon && headericon}
      </div>

      <div className="product-drawer__body">
        <Box component="div" noValidate autoComplete="off">
          {children}
        </Box>
      </div>

      <div className="product-drawer__footer">
        <button onClick={onClose} className="c-btn-primars--cancel">
          取消
        </button>
        <button
          disabled={disabled}
          onClick={onSubmit}
          className="c-btn-primars"
        >
          確定
        </button>
      </div>
    </Drawer>
  );
}
export default memo(ProductDrawer);
