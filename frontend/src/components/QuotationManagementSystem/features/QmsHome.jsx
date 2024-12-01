import { memo, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SharedCard from "../../Global/card/ProductCard";
import { useSalesHomeSlice, useFactoryHomeSlice } from "../slice/qmsHome";
import PmHomeContent from "../../Global/content/PmHomeContent";
import { useDeleteQuotationMutation } from "../services/salesServices/endpoints/quotationApi";

// 抽離卡片組件，避免不必要的重渲染
const Card = memo(function Card({ data, onCardClick, onDelete }) {
  return (
    <SharedCard
      date={data.createDate || "無日期"}
      quoteNumber={data.quotationSN || "無編號"}
      productName={data.productName || "未命名產品"}
      customerName={data.customerName || "未命名客戶"}
      onClick={onCardClick}
      onDelete={onDelete}
    />
  );
});

function QmsHome() {
  const navigate = useNavigate();
  const location = useLocation();

  // 使用 useMemo 記憶 slice hook 的選擇
  const sliceHook = useMemo(
    () =>
      location.pathname.includes("Sales")
        ? useSalesHomeSlice
        : useFactoryHomeSlice,
    [location.pathname]
  );

  const {
    displayedData,
    currentPage,
    itemsPerPage,
    total,
    isLoading,
    error,
    setPage,
    setPageSize,
    type,
  } = sliceHook();
  // 使用 useCallback 記憶導航函數
  const handleCardClick = useCallback(
    (id) => {
      if (id) navigate(`edit/${id}`);
    },
    [navigate]
  );

  const [deleteQuotation, { isLoading: isDeleting, error: deleteError }] =
    useDeleteQuotationMutation({
      skip: type !== "sales",
    });

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await deleteQuotation(id);

        // 檢查響應內容
        if (response.error) {
          // RTK Query 錯誤處理
          const errorMessage =
            response.error.data?.message || "刪除報價單時發生錯誤";
          throw new Error(errorMessage);
        }

        // 成功處理
        return {
          success: true,
          message: "報價單刪除成功",
        };
      } catch (error) {
        // 統一錯誤處理
        console.error("💣💣💣 刪除報價單失敗:", error.message);
        return {
          success: false,
          error: {
            message: error.message,
            details: error.data,
          },
        };
      }
    },
    [deleteQuotation]
  );
  // 使用 useMemo 優化渲染列表
  const cardList = useMemo(() => {
    if (!Array.isArray(displayedData)) return null;

    return displayedData.map((data) => (
      <Card
        key={data.id}
        data={data}
        onCardClick={() => handleCardClick(data.id)}
        onDelete={() => handleDelete(data.id)}
      />
    ));
  }, [displayedData, handleCardClick, handleDelete]);

  // 錯誤處理
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">載入失敗: {error}</p>
      </div>
    );
  }

  return (
    <PmHomeContent>
      <PmHomeContent.Content>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p>載入中...</p>
          </div>
        ) : !cardList ? (
          <div className="flex items-center justify-center h-full">
            <p>暫無資料</p>
          </div>
        ) : (
          cardList
        )}
      </PmHomeContent.Content>

      {displayedData && displayedData.length > 0 && (
        <PmHomeContent.Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          total={total}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      )}
    </PmHomeContent>
  );
}

export default memo(QmsHome);
