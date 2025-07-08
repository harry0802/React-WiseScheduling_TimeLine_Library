import ProductionRecordCard from "./ProductionRecordCard";
import { useNavigate } from "react-router-dom";
import { homeSlice } from "../../slice/HomeSlice";
import { useEffectOnce } from "react-use";
import { 
  RecordHomeContainer, 
  RecordHomeContent, 
  StyledPagination 
} from "./ProductionRecordHome.styled";

// 分頁器
function ProductionRecordPaginations() {
  const { currentPage, itemsPerPage, total, setPage, setPageSize } =
    homeSlice();

  function handlePageChange(page, pageSize) {
    if (currentPage !== page) setPage(page);
    if (itemsPerPage !== pageSize) setPageSize(pageSize);
  }

  return (
    <StyledPagination
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
  const { displayedData, setPageStatus } = homeSlice();

  useEffectOnce(() => setPageStatus("產品履歷與BOM"));

  return (
    <RecordHomeContainer>
      <RecordHomeContent>
        {displayedData?.map((data) => (
          <ProductionRecordCard
            key={data.id}
            title={data.productSN}
            subtitle={data.productName}
            onButtonClick={() => navigate(`addProductInfo/${data.id}`)}
          />
        ))}
      </RecordHomeContent>
      <ProductionRecordPaginations />
    </RecordHomeContainer>
  );
}

export default ProductionRecordHome;
