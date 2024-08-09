import ProductionRecordCard from "./ProductionRecordCard";
import "../../index.scss";
import { Pagination } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { homeSlice } from "../../slice/HomeSlice";
import fakedata from "../../data.json";

// 分頁器
function ProductionRecordPaginations() {
  const { currentPage, itemsPerPage, total, setPage, setPageSize } =
    homeSlice();

  function handlePageChange(page, pageSize) {
    if (currentPage !== page) setPage(page);
    if (itemsPerPage !== pageSize) setPageSize(pageSize);
  }

  return (
    <Pagination
      className="record-paginations"
      itemActiveColorDisabled
      total={total}
      current={currentPage}
      defaultPageSize={itemsPerPage}
      onChange={handlePageChange}
      defaultCurrent={1}
    />
  );
}

// 首頁
function ProductionRecordHome() {
  const navigate = useNavigate();
  const { displayedData, setPageStatus, setData } = homeSlice();

  useEffect(() => {
    setPageStatus("產品履歷與BOM");
  }, []);

  useEffect(() => {
    (async function () {
      const order = await setData(fakedata);
      return order;
    })();
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
            onButtonClick={() => navigate(`addProductInfo/${data.id}`)}
          />
        ))}
      </div>
      <ProductionRecordPaginations />
    </div>
  );
}

export default ProductionRecordHome;
