import { NavLink } from "react-router-dom";

function Productcontent({ children, title }) {
  return (
    <div className="product-content">
      <div className="product-content__breadcrumb">
        <NavLink to="/ProductionRecordPage"> 產品履歷與BOM </NavLink> {" > "}
        {title}
      </div>
      <div className="product-content__sections">{children}</div>
    </div>
  );
}

export default Productcontent;
