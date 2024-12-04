import { memo, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsWithPaginationQuery } from "../../../ProductionRecord/service/endpoints/productApi";
import PmHomeContent from "../../../Global/content/PmHomeContent";
import SharedCard from "../../../Global/card/ProductCard";

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

const DEFAULT_PARAMS = {
  productName: undefined,
  oldProductSN: undefined,
  productSN: undefined,
  sort: undefined,
  size: "10",
  page: "1",
};

function QmsHome() {
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState(DEFAULT_PARAMS);

  const { data, isLoading, isError, error } = useGetProductsWithPaginationQuery(
    queryParams,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const handlePageChange = useCallback((page) => {
    setQueryParams((prev) => ({ ...prev, page: String(page) }));
  }, []);

  const handlePageSizeChange = useCallback((size) => {
    setQueryParams((prev) => ({ ...prev, size: String(size) }));
  }, []);

  const handleCardClick = useCallback(
    (id) => id && navigate(`edit/${id}`),
    [navigate]
  );

  const cardList = useMemo(() => {
    const items = data?.items || [];
    if (!Array.isArray(items)) return null;

    return items.map((item) => (
      <Card
        key={item.id}
        data={item}
        onCardClick={() => handleCardClick(item.id)}
      />
    ));
  }, [data?.items, handleCardClick]);

  if (isError) return <DisplayComponents.Error message={error?.message} />;
  if (isLoading) return <DisplayComponents.Loading />;
  if (!data?.items?.length) return <DisplayComponents.Empty />;

  return (
    <PmHomeContent>
      <PmHomeContent.Content>{cardList}</PmHomeContent.Content>
      <PmHomeContent.Pagination
        currentPage={Number(queryParams.page)}
        itemsPerPage={Number(queryParams.size)}
        total={data.total || 0}
        setPage={handlePageChange}
        setPageSize={handlePageSizeChange}
      />
    </PmHomeContent>
  );
}

export default memo(QmsHome);
