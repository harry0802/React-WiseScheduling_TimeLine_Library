import { Drawer } from "antd";
import Box from "@mui/material/Box";

function ProductDrawer({ visible, onClose, title, onSubmit, children }) {
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
      <div className="product-drawer__header">{title}</div>

      <div className="product-drawer__body">
        <Box component="div" noValidate autoComplete="off">
          {children}
        </Box>
      </div>

      <div className="product-drawer__footer">
        <button onClick={onClose} className="c-btn-primars--cancel">
          取消
        </button>
        <button onClick={onSubmit} className="c-btn-primars">
          確定
        </button>
      </div>
    </Drawer>
  );
}
export default ProductDrawer;
