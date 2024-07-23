import ProductionRecordButton from "../Utility/ProductionRecordButton.jsx";
import ProductDrawer from "../Utility/ProductDrawer.jsx";

function ProductContextCard({ children, icon, title, OnClick }) {
  // pd =product
  // PdId =產品編號

  return (
    <div className="product-info">
      <div className="product-info__header">
        <div className="header__title">
          <h3>{title}</h3>
        </div>

        <div className="header__button">
          <ProductionRecordButton OnClick={OnClick}>
            {icon}
          </ProductionRecordButton>
        </div>
      </div>
      {children}
    </div>
  );
}
export default ProductContextCard;
