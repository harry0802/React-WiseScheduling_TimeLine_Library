import "./index.scss";
import ProductionRecordActions from "./ProductionRecordHome/ProductionRecordActions.jsx";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
  return <div className="record-header">{children}</div>;
}

// sections
function ProductionRecordSections({ children }) {
  return <section className="record-sections">{children}</section>;
}

function ProductionRecord() {
  const location = useLocation();
  const isNestedPage = location.pathname !== "/ProductionRecordPage/";

  return (
    <ProductionRecordWarpper>
      <ProductionRecordHeader>
        <div className="record-header__title">
          <h3 className="record-header__title">產品履歷與BOM</h3>
        </div>
        {!isNestedPage && <ProductionRecordActions />}
      </ProductionRecordHeader>

      <ProductionRecordSections>
        <Outlet />
      </ProductionRecordSections>
    </ProductionRecordWarpper>
  );
}

export default ProductionRecord;
