import React from "react";
import { Pagination } from "antd";
import styled from "styled-components";

const StyledPagination = styled(Pagination)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5.5rem auto 1rem auto;
    .ant-pagination-item {
      display: flex;
      align-self: center;
      justify-self: center;
      text-align: center;
      min-width: unset;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0px 6px;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.paletteTextPrimary || "#000"};
      border-radius: 50%;
      border: none;
      line-height: unset;

      &.ant-pagination-item-active {
        background: #f39838;
        color: #fff;
      }

      a {
        text-align: center;
        color: currentColor;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        font-size: 1.5rem;
        font-weight: 600;
      }
    }

    .anticon-right,
    .anticon-left,
    .ant-pagination-item-ellipsis {
      color: #8f8f8f !important;
      stroke-width: 5;
    }
  }
`;

function PmPagination({
  currentPage,
  itemsPerPage,
  total,
  setPage,
  setPageSize,
  className,
  pageSize,
}) {
  function handlePageChange(page, pageSize) {
    if (currentPage !== page) setPage(page);
    if (itemsPerPage !== pageSize) setPageSize(pageSize);
  }

  return (
    <StyledPagination
      className={className}
      itemActiveColorDisabled
      total={total}
      current={currentPage}
      defaultPageSize={itemsPerPage}
      onChange={handlePageChange}
      defaultCurrent={1}
      showSizeChanger
    />
  );
}

export default PmPagination;
