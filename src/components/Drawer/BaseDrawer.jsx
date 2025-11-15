import { createContext, useContext, memo } from "react";
import { Drawer } from "antd";
import styled, { css } from "styled-components";
import { colors } from "../../designTokens";

const DrawerContext = createContext();

// 共享樣式
const buttonStyles = css`
  min-width: 5rem;
  padding: 0.5625rem 1.375rem 0.625rem 1.375rem;
  border-radius: 1.875rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: none;
`;

// Styled components
const StyledDrawer = styled(Drawer)`
  &&& {
    &.product-drawer {
      color: ${colors.text.inverse};
      font-family: Roboto, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;

      .ant-drawer-content-wrapper {
        border-radius: 10px 0 0 10px;
        background: ${colors.background.secondary};
      }

      .ant-drawer-content {
        background: ${colors.background.secondary};
      }

      .ant-drawer-body {
        padding: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: ${colors.background.secondary};
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
  border-bottom: 1px solid ${colors.accent.primary}40;
  background: ${colors.background.primary};
  color: ${colors.accent.primary};
  font-size: 20px;
  font-weight: 700;
`;

const DrawerBody = styled.div`
  flex: 1;
  margin-top: 2rem;
  padding: 1.5rem;
  padding-bottom: 6rem;
  overflow-y: auto;
  background: ${colors.background.secondary};
`;

const DrawerFooter = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem 2.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 1rem;
  z-index: 2;
  background: ${colors.background.primary};
  border-top: 1px solid ${colors.accent.primary}40;
  box-shadow: 0 -2px 8px ${colors.accent.primary}20;
`;

const CancelButton = styled.button`
  ${buttonStyles}
  background: transparent;
  color: ${colors.text.secondary};
  border: 1px solid ${colors.border.primary};

  &:hover {
    color: ${colors.accent.primary};
    border-color: ${colors.accent.primary};
    background: ${colors.accent.primary}10;
  }
`;

const ConfirmButton = styled.button`
  ${buttonStyles}
  background: ${colors.accent.primary};
  color: ${colors.background.primary};
  box-shadow: 0 2px 8px ${colors.accent.primary}40;

  &:hover {
    background: ${colors.accent.primary};
    filter: brightness(1.1);
    box-shadow: 0 4px 12px ${colors.accent.primary}60;
  }

  &:active {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: none;
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
