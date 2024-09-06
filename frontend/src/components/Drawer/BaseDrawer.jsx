import { Drawer } from "antd";
// import Box from "@mui/material/Box";
import { createContext, useContext, useState, memo, cloneElement } from "react";
const DrawerContext = createContext();

function BaseDrawer({
  children,
  defaultOpen = false,
  name = "default",
  ...props
}) {
  const [openName, setOpenName] = useState(defaultOpen ? name : null);

  const open = (drawerName) => setOpenName(drawerName);
  const close = () => setOpenName(null);

  const contextValue = {
    openName,
    open,
    close,
    ...props,
  };

  return (
    <DrawerContext.Provider value={contextValue}>
      <Drawer
        className="base-drawer"
        width={700}
        placement="right"
        closable={false}
        destroyOnClose={true}
        open={openName === name}
        onClose={close}
        {...props}
      >
        {children}
      </Drawer>
    </DrawerContext.Provider>
  );
}

BaseDrawer.Header = function DrawerHeader({ children, icon }) {
  return (
    <div className="base-drawer__header">
      <div>{children}</div>
      {icon && icon}
    </div>
  );
};

BaseDrawer.Body = function DrawerBody({ children }) {
  return (
    <div className="base-drawer__body">
      {children}
      {/* <Box component="div" noValidate autoComplete="off">
        {children}
      </Box> */}
    </div>
  );
};

BaseDrawer.Footer = function DrawerFooter() {
  const { close, onSubmit, disabled } = useContext(DrawerContext);
  return (
    <div className="base-drawer__footer">
      <button onClick={close} className="c-btn-primars--cancel">
        取消
      </button>
      <button disabled={disabled} onClick={onSubmit} className="c-btn-primars">
        確定
      </button>
    </div>
  );
};

BaseDrawer.Trigger = function DrawerTrigger({ children, name }) {
  const { open } = useContext(DrawerContext);
  return cloneElement(children, {
    onClick: () => open(name),
  });
};

export default memo(BaseDrawer);

{
  /* <BaseDrawer name="example">
  <BaseDrawer.Trigger name="example">
    <button>打開抽屜</button>
  </BaseDrawer.Trigger>
  <BaseDrawer.Header icon={<SomeIcon />}>標題</BaseDrawer.Header>
  <BaseDrawer.Body>
    {抽屜的主要內容 }
  </BaseDrawer.Body>
  <BaseDrawer.Footer />
</BaseDrawer> */
}
