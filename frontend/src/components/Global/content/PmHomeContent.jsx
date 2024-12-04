import React from "react";
import styled from "styled-components";
import { useEffectOnce } from "react-use";
import PmPagination from "../pagination/PmPagination";

const HomeWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const HomeContent = styled.div`
  max-width: 100cqw;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.25rem;
`;

function PmHomeContent({ children, className }) {
  return <HomeWrapper className={className}>{children}</HomeWrapper>;
}

PmHomeContent.Content = function Content({ children }) {
  return <HomeContent>{children}</HomeContent>;
};

PmHomeContent.Pagination = function HomePagination(props) {
  return <PmPagination {...props} />;
};

export default PmHomeContent;
