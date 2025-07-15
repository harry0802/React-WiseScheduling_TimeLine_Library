import Box from "@mui/material/Box";
import { memo } from "react";
import {
  StyledDrawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  CancelButton,
  ConfirmButton,
} from "./ProductDrawer.styled";

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
    <StyledDrawer
      width={700}
      placement="right"
      onClose={onClose}
      open={visible}
      closable={false}
      destroyOnClose={true}
    >
      <DrawerHeader>
        <div>{title}</div>
        {!!headericon && headericon}
      </DrawerHeader>

      <DrawerBody>
        <Box component="div" noValidate autoComplete="off">
          {children}
        </Box>
      </DrawerBody>

      <DrawerFooter>
        <CancelButton onClick={onClose}>取消</CancelButton>
        <ConfirmButton disabled={disabled} onClick={onSubmit}>
          確定
        </ConfirmButton>
      </DrawerFooter>
    </StyledDrawer>
  );
}
export default memo(ProductDrawer);
