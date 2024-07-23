function Productcontent({ children, title }) {
  return (
    <div className="product-content">
      <div className="product-content__breadcrumb">產品履歷與BOM > {title}</div>
      <div className="product-content__sections">{children}</div>
    </div>
  );
}

export default Productcontent;
