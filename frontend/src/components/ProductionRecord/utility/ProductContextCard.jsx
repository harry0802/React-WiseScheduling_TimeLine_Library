import ProductionRecordButton from "./ProductionRecordButton";
import {
  ProductInfoContainer,
  ProductInfoHeader,
  HeaderTitle,
  HeaderButton
} from "./ProductContextCard.styled";

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
    <ProductInfoContainer className={style}>
      <ProductInfoHeader>
        <HeaderTitle>
          <h3>{title}</h3>
        </HeaderTitle>

        <HeaderButton>
          {!hideButton && (
            <ProductionRecordButton OnClick={OnClick}>
              {icon}
            </ProductionRecordButton>
          )}
        </HeaderButton>
      </ProductInfoHeader>
      {children}
    </ProductInfoContainer>
  );
}
export default ProductContextCard;
