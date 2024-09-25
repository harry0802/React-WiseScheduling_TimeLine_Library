import "./index.scss";
import ProductionRecordActions from "./features/ProductionRecordHome/ProductionRecordActions.jsx";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import InventoryManagementActions from "./features/ProductionRecordinventoryManagement/InventoryManagementActions.jsx";
import ProductNotification from "./utility/ProductNotification";

import { homeSlice } from "./slice/HomeSlice";

// wrapper
function ProductionRecordWarpper({ children }) {
  return (
    <div className="record">
      <div className="record__container">{children}</div>
    </div>
  );
}

// wrapper -> header
function ProductionRecordHeader({ children }) {
  const { pageStatus } = homeSlice();
  return (
    <div className="record-header">
      <div className="record-header__title">
        <h3 className="record-header__title">{pageStatus} </h3>
      </div>
      {children}
    </div>
  );
}

// sections
function ProductionRecordSections({ children }) {
  return <section className="record-sections">{children}</section>;
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
        <ProductNotification />
      </ProductionRecordSections>
    </ProductionRecordWarpper>
  );
}

export default ProductionRecord;
