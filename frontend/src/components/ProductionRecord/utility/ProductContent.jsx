import { NavLink } from "react-router-dom";
import {
  ProductContentContainer,
  ProductContentBreadcrumb,
  ProductContentSections
} from "../styles/ProductContent.styles";

function Productcontent({ children, title }) {
  return (
    <ProductContentContainer>
      <ProductContentBreadcrumb>
        <NavLink to="/ProductionRecordPage"> 產品履歷與BOM </NavLink> {" > "}
        {title}
      </ProductContentBreadcrumb>
      <ProductContentSections>{children}</ProductContentSections>
    </ProductContentContainer>
  );
}

export default Productcontent;
