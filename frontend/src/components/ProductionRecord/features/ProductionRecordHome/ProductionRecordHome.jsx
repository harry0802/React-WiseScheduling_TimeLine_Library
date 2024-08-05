import ProductionRecordCard from "./ProductionRecordCard";
import { useRecord } from "../../context/ProductionRecordProvider.jsx";
import "../../index.scss";
import { Pagination } from "antd";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
// 分頁器
function ProductionRecordPaginations({
  total,
  pageSize,
  defaultCurrent = 1,
  handlePageChange,
  current,
}) {
  return (
    <Pagination
      className="record-paginations"
      itemActiveColorDisabled
      total={total}
      current={current}
      defaultPageSize={pageSize}
      onChange={handlePageChange}
      defaultCurrent={defaultCurrent}
    />
  );
}

// 首頁
function ProductionRecordHome() {
  const { state, dispatch, handlePageStatust } = useRecord();
  const { currentPage, itemsPerPage, total, displayedData } = state;
  const navigate = useNavigate();

  function handlePageChange(page, pageSize) {
    if (currentPage !== page) dispatch({ type: "SET_PAGE", payload: page });
    if (itemsPerPage !== pageSize)
      dispatch({ type: "SET_PAGE_SIZE", payload: pageSize });
  }

  function handleButtonClick() {
    navigate("addProductInfo");
  }

  useEffect(() => {
    handlePageStatust("產品履歷與BOM");
  }, []);
  return (
    <div className="record-home">
      <div className="record-home__content">
        {displayedData?.map((data) => (
          <ProductionRecordCard
            key={data.id}
            title={data.productNumber}
            subtitle={data.customerName}
            content={data.description}
            onButtonClick={handleButtonClick}
          />
        ))}
      </div>

      <ProductionRecordPaginations
        current={currentPage}
        pageSize={itemsPerPage}
        total={total}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductionRecordHome;
