import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

// 樣式定義
const ContentWrapper = styled.div`
  width: 100%;
`;

const BreadcrumbWrapper = styled.div`
  font-family: Roboto;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  color: #fff;
  line-height: 1.25rem;
`;

const StyledNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ContentSections = styled.div`
  & > div {
    margin-top: 1.25rem;
  }
`;

// 可重用的麵包屑項目組件
const BreadcrumbItem = ({ to, label, isLast }) => (
  <>
    {to ? <StyledNavLink to={to}>{label}</StyledNavLink> : <span>{label}</span>}
    {!isLast && " > "}
  </>
);

// 主要的內容佈局組件
function ProductAddtionLayout({ breadcrumbs, children }) {
  return (
    <ContentWrapper>
      <BreadcrumbWrapper>
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem
            key={index}
            to={crumb.to}
            label={crumb.label}
            isLast={index === breadcrumbs.length - 1}
          />
        ))}
      </BreadcrumbWrapper>
      <ContentSections>{children}</ContentSections>
    </ContentWrapper>
  );
}

export default ProductAddtionLayout;
/* exmp:

const ProductContent = ({ children, title }) => {
  const breadcrumbs = [
    { to: "/ProductionRecordPage", label: "產品履歷與BOM" },
    { label: title }
  ];

  return (
    <ContentLayout breadcrumbs={breadcrumbs}>
      {children}
    </ContentLayout>
  );
};
*/
