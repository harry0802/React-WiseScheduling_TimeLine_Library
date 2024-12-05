import { memo, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsWithPaginationQuery } from "../../../ProductionRecord/service/endpoints/productApi";
import PmHomeContent from "../../../Global/content/PmHomeContent";
import SharedCard from "../../../Global/card/ProductCard";
import { useFactoryHomeSlice } from "../../slice/qmsHome";

// 抽離展示組件到單獨文件更好，這裡為了方便展示
const DisplayComponents = {
  Error: ({ message }) => (
    <div className="flex items-center justify-center h-full">
      <p className="text-red-500">載入失敗: {message || "未知錯誤"}</p>
    </div>
  ),
  Loading: () => (
    <div className="flex items-center justify-center h-full">
      <p>載入中...</p>
    </div>
  ),
  Empty: () => (
    <div className="flex items-center justify-center h-full">
      <p>暫無資料</p>
    </div>
  ),
};

const Card = memo(function Card({ data, onCardClick }) {
  const {
    createDate = "無日期",
    quotationSN = "無編號",
    productName = "未命名產品",
    customerName = "未命名客戶",
  } = data;

  return (
    <SharedCard
      date={createDate}
      quoteNumber={quotationSN}
      productName={productName}
      customerName={customerName}
      onClick={onCardClick}
    />
  );
});

function QmsHome() {
  const navigate = useNavigate();
  const { queryParams, pagination, setPage, setPageSize, setPagination } =
    useFactoryHomeSlice();

  const { data, isLoading, isError, error } = useGetProductsWithPaginationQuery(
    queryParams,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // 當 API 返回數據時更新分頁信息
  useEffect(() => {
    if (data?.meta) {
      setPagination(data.meta);
    }
  }, [data?.meta, setPagination]);

  const handlePageChange = useCallback(
    (page) => {
      setPage(page);
    },
    [setPage]
  );

  const handlePageSizeChange = useCallback(
    (size) => {
      setPageSize(size);
    },
    [setPageSize]
  );

  const handleCardClick = useCallback(
    (id) => id && navigate(`edit/${id}`),
    [navigate]
  );

  const cardList = useMemo(() => {
    const items = data?.data || [];
    if (!Array.isArray(items)) return null;

    return items.map((item) => (
      <Card
        key={item.id}
        data={item}
        onCardClick={() => handleCardClick(item.id)}
      />
    ));
  }, [data?.data, handleCardClick]);

  if (isError) return <DisplayComponents.Error message={error?.message} />;
  if (isLoading) return <DisplayComponents.Loading />;
  if (!data?.data?.length) return <DisplayComponents.Empty />;

  return (
    <PmHomeContent>
      <PmHomeContent.Content>{cardList}</PmHomeContent.Content>
      <PmHomeContent.Pagination
        currentPage={pagination.current_page}
        itemsPerPage={pagination.page_size}
        total={pagination.total_count}
        setPage={handlePageChange}
        setPageSize={handlePageSizeChange}
      />
    </PmHomeContent>
  );
}

export default memo(QmsHome);
