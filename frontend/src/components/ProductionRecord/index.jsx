import React from "react";
import ProductionRecordActions from "./features/ProductionRecordHome/ProductionRecordActions.jsx";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import InventoryManagementActions from "./features/ProductionRecordinventoryManagement/InventoryManagementActions.jsx";
import { homeSlice } from "./slice/HomeSlice";
import {
  RecordContainer,
  RecordWrapper,
  RecordHeader,
  RecordTitle,
  RecordSections,
} from "./styles/ProductionRecordLayout.styles";

// wrapper
function ProductionRecordWarpper({ children }) {
  return (
    <RecordContainer>
      <RecordWrapper>{children}</RecordWrapper>
    </RecordContainer>
  );
}

// wrapper -> header
function ProductionRecordHeader({ children }) {
  const { pageStatus } = homeSlice();
  return (
    <RecordHeader>
      <RecordTitle>{pageStatus}</RecordTitle>
      {children}
    </RecordHeader>
  );
}

// sections
function ProductionRecordSections({ children }) {
  return <RecordSections>{children}</RecordSections>;
}

function ProductionRecord() {
  const location = useLocation();

  const isHomePage =
    location.pathname.startsWith("/ProductionRecordPage") &&
    (location.pathname === "/ProductionRecordPage" ||
      location.pathname === "/ProductionRecordPage/");

  const isInventoryPage =
    location.pathname.startsWith("/ProductionRecordPage/inventoryManagement") &&
    (location.pathname === "/ProductionRecordPage/inventoryManagement" ||
      location.pathname === "/ProductionRecordPage/inventoryManagement/");

  return (
    <ProductionRecordWarpper>
      <ProductionRecordHeader>
        {isHomePage && <ProductionRecordActions />}
        {isInventoryPage && <InventoryManagementActions />}
      </ProductionRecordHeader>

      <ProductionRecordSections>
        <Outlet />
      </ProductionRecordSections>
    </ProductionRecordWarpper>
  );
}

export default ProductionRecord;
