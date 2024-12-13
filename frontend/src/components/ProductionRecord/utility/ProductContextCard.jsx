import ProductionRecordButton from "./ProductionRecordButton";

function ProductContextCard({
  children,
  icon,
  title,
  OnClick,
  style,
  hideButton,
}) {
  // pd =product
  // PdId =產品編號

  return (
    <div className={`product-info ${style}`}>
      <div className="product-info__header">
        <div className="header__title">
          <h3>{title}</h3>
        </div>

        <div className="header__button">
          {!hideButton && (
            <ProductionRecordButton OnClick={OnClick}>
              {icon}
            </ProductionRecordButton>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
export default ProductContextCard;
