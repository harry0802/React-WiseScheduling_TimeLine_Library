import { useState, useCallback } from "react";

/**
 * 自定義 Hook，用於處理分頁邏輯
 * @param {number} [initialPageSize=20] - 初始每頁顯示的條目數
 * @returns {Object} 包含分頁狀態、設置分頁狀態函數和處理表格變更函數的對象
 */
const usePagination = (initialPageSize = 20) => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: initialPageSize,
  });

  const [loading, setLoading] = useState(false);

  /**
   * 處理表格變更
   * @param {number} page - 當前頁碼
   * @param {number} pageSize - 每頁顯示的條目數
   */
  const handleTableChange = useCallback(async (page, pageSize) => {
    setLoading(true);
    setPagination((prev) => ({
      page: pageSize !== prev.pageSize ? 1 : page,
      pageSize,
    }));

    // 添加小延遲讓動畫更流暢
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
  }, []);

  return {
    pagination,
    setPagination,
    handleTableChange,
    loading,
  };
};

export default usePagination;
