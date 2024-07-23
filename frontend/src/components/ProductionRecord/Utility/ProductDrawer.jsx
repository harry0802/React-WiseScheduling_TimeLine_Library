import { Drawer, Button } from "antd";

function ProductDrawer({ children, visible, onClose, title }) {
  return (
    <Drawer
      className="product-drawer"
      width={700}
      placement="right"
      onClose={onClose}
      open={visible}
      closable={false}
    >
      <div className="product-drawer__header">{title}</div>

      <div className="product-drawer__body">{children}</div>

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
