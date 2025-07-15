import React, { useState, useCallback, useEffect } from "react";
import { useGetProductionCostsQuery } from "../service/ReceiptApi";
import ReceiptTable from "../components/table/ReceiptTable";

/**
 * 改進的父元件實現範例
 * 解決 DataGrid 伺服器端分頁問題
 */
const ImprovedParentComponent = ({
  dataType = "mother",
  productionScheduleId = null,
  isParent = true,
}) => {
  // 🎯 分頁狀態管理
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // 🔧 API 查詢with更強的錯誤處理
  const { data, isLoading, isFetching, error, isSuccess, isError } =
    useGetProductionCostsQuery({
      dataType,
      page: page + 1, // 轉換為 1-based 供 API 使用
      size: pageSize,
      ...(productionScheduleId && { productionScheduleId }),
    });

  // 🔧 安全的資料提取
  const rows = data?.rows || [];
  const totalCount = data?.totalCount || 0;

  // 🔧 分頁處理器with驗證
  const handlePaginationModelChange = useCallback(
    (model) => {
      const newPage = Math.max(0, model.page);
      const newPageSize = Math.max(1, model.pageSize);

      // 🔧 驗證分頁參數
      if (newPage !== page || newPageSize !== pageSize) {
        setPage(newPage);
        setPageSize(newPageSize);
      }
    },
    [page, pageSize]
  );

  // 🔧 當總數變化時重置分頁（防止超出範圍）
  useEffect(() => {
    if (isSuccess && totalCount > 0) {
      const maxPage = Math.ceil(totalCount / pageSize) - 1;
      if (page > maxPage) {
        setPage(Math.max(0, maxPage));
      }
    }
  }, [totalCount, pageSize, page, isSuccess]);

  // 🔧 錯誤處理
  if (isError) {
    console.error("ProductionCost API Error:", error);
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>資料載入失敗</h3>
        <p>請重新整理頁面或聯繫系統管理員</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  // 🔧 空資料處理
  if (isSuccess && rows.length === 0 && totalCount === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>暫無資料</h3>
        <p>目前沒有符合條件的生產成本記錄</p>
      </div>
    );
  }

  return (
    <div>
      {/* 🔧 偵錯資訊（開發模式） */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f5f5f5",
            marginBottom: "10px",
            fontSize: "12px",
          }}
        >
          <strong>Debug Info:</strong>
          Page: {page + 1}, Size: {pageSize}, Total: {totalCount}, Rows:{" "}
          {rows.length}, Loading: {isLoading || isFetching}
        </div>
      )}

      {/* 🎯 主要表格元件 */}
      <ReceiptTable
        isParent={isParent}
        rows={rows}
        loading={isLoading || isFetching}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPaginationModelChange={handlePaginationModelChange}
      />
    </div>
  );
};

export default ImprovedParentComponent;

/**
 * 使用範例：
 *
 * // 主批次表格
 * <ImprovedParentComponent
 *   dataType="mother"
 *   isParent={true}
 * />
 *
 * // 子批次表格
 * <ImprovedParentComponent
 *   dataType="child"
 *   productionScheduleId={scheduleId}
 *   isParent={false}
 * />
 */
