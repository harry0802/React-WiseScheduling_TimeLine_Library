import "./index.scss";
import ProductionRecordHome from "./ProductionRecordHome/ProductionRecordHome.jsx";
import ProductionRecordActions from "./ProductionRecordHome/ProductionRecordActions.jsx";

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
  return (
    <ProductionRecordWarpper>
      <ProductionRecordHeader>
        <div className="record-header__title">
          <h3 className="record-header__title">產品履歷與BOM</h3>
        </div>
        <ProductionRecordActions />
      </ProductionRecordHeader>

      <ProductionRecordSections>
        <ProductionRecordHome />

        {/* output 放這裡  */}
      </ProductionRecordSections>
    </ProductionRecordWarpper>
  );
}

export default ProductionRecord;
