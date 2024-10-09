import { createContext, useContext, memo } from "react";
import { Drawer } from "antd";
import styled, { css } from "styled-components";

const DrawerContext = createContext();

// 共享樣式
const buttonStyles = css`
  width: 5rem;
  padding: 0.5625rem 1.375rem 0.625rem 1.375rem;
  border-radius: 1.875rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
`;

// Styled components
const StyledDrawer = styled(Drawer)`
  && {
    &.product-drawer {
      color: var(--color-text-secondary);
      font-family: Roboto, sans-serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      background: var(--color-background);
      box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.25);
      padding-bottom: 6.625rem !important;

      .ant-drawer-content-wrapper {
        border-radius: 10px 0 0 10px;
      }
      .ant-drawer-body {
        padding: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }
    }
  }
`;

const DrawerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
`;

const DrawerBody = styled.div`
  flex: 1;
  /* margin-top: 3.125rem; */
  padding: 1.5rem;
  overflow-y: auto;
`;

const DrawerFooter = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  padding-top: 2.625rem;
  padding-bottom: 1.5rem;
  padding-right: 2.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 1.875rem;
  z-index: 2;
  background: var(--color-background);
`;

const CancelButton = styled.button`
  ${buttonStyles}
  background: none;
  color: var(--color-text-secondary);
  text-decoration-line: underline;
  text-decoration-color: transparent;
  &:hover {
    color: var(--color-button-hover);
    text-decoration-color: currentColor;
  }
`;

const ConfirmButton = styled.button`
  ${buttonStyles}
  background-color: var(--color-button-primary);
  color: var(--color-confirm-button-text);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    background-color: var(--color-button-hover);
  }
  &:active {
    background-color: var(--color-click-button-bg);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 3.875rem;
  gap: 9px;
  font-family: Inter, sans-serif;
  line-height: 1.0625rem;

  &:not(:first-child) {
    margin-top: 1.25rem;
  }

  > span {
    font-size: 0.875rem;
  }
`;

// 組件定義保持不變
const BaseDrawer = memo(({ children, visible, onClose, width = 700 }) => {
  return (
    <StyledDrawer
      className="product-drawer"
      width={width}
      placement="right"
      onClose={onClose}
      open={visible}
      closable={false}
      destroyOnClose={true}
    >
      <DrawerContext.Provider value={{ onClose }}>
        {children}
      </DrawerContext.Provider>
    </StyledDrawer>
  );
});

const Header = ({ children, icon }) => (
  <DrawerHeader>
    {children}
    {icon && icon}
  </DrawerHeader>
);

const Body = ({ children }) => <DrawerBody>{children}</DrawerBody>;

const Footer = ({ onSubmit, disabled }) => {
  const { onClose } = useContext(DrawerContext);
  return (
    <DrawerFooter>
      <CancelButton onClick={onClose}>取消</CancelButton>
      <ConfirmButton disabled={disabled} onClick={onSubmit}>
        確定
      </ConfirmButton>
    </DrawerFooter>
  );
};

Header.displayName = "BaseDrawer.Header";
BaseDrawer.Header = Header;

Body.displayName = "BaseDrawer.Body";
BaseDrawer.Body = Body;

Footer.displayName = "BaseDrawer.Footer";
BaseDrawer.Footer = Footer;

BaseDrawer.displayName = "BaseDrawer";
export default BaseDrawer;
