import { Drawer } from "antd";
import Box from "@mui/material/Box";

function ProductDrawer({ children, visible, onClose, title }) {
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
        <Box component="form" noValidate autoComplete="off">
          {children}
        </Box>
      </div>

      <div className="product-drawer__footer">
        <button onClick={onClose} className="footer__drawerc--cancel">
          取消
        </button>
        <button className="footer__drawer--confirm">確定</button>
      </div>
    </Drawer>
  );
}

export default ProductDrawer;
