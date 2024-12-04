import { memo, useCallback, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SharedCard from "../../../Global/card/ProductCard";
import { useFactoryHomeSlice, useSalesHomeSlice } from "../../slice/qmsHome";
import { useDeleteQuotationMutation } from "../../services/salesServices/endpoints/quotationApi";
import PmHomeContent from "../../../Global/content/PmHomeContent";
import ConfirmationDialog from "../../../Global/dialog/BaseDialog";

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
  });

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
      setPendingAction(() => async () => {
        try {
          const response = await deleteQuotation(id);
          if (response.error) {
            const errorMessage =
              response.error.data?.message || "刪除報價單時發生錯誤";
            throw new Error(errorMessage);
          }
          return {
            success: true,
            message: "報價單刪除成功",
          };
        } catch (error) {
          console.error("💣💣💣 刪除報價單失敗:", error.message);
          return {
            success: false,
            error: {
              message: error.message,
              details: error.data,
            },
          };
        }
      });
      setDialogConfig({
        title: "確認刪除",
        message: "你確定要刪除這個報價單嗎？此操作無法撤銷。",
        confirmText: "確認刪除",
        cancelText: "取消",
      });
      setConfirmOpen(true);
    },
    [deleteQuotation]
  );

  const handleConfirm = async () => {
    if (pendingAction) {
      try {
        await pendingAction();
      } catch (error) {
        console.error("Action error:", error);
      }
    }
    setConfirmOpen(false);
  };

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
      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        {...dialogConfig}
      />
    </PmHomeContent>
  );
}

export default memo(QmsHome);
