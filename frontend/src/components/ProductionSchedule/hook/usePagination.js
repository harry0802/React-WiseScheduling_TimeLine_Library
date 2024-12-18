import { useState } from "react";

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

  /**
   * 處理表格變更
   * @param {number} page - 當前頁碼
   * @param {number} size - 每頁顯示的條目數
   * @param {Function} setDataSource - 設置數據源的函數
   */
  const handleTableChange = (page, size, setDataSource) => {
    const newPagination = {
      ...pagination,
      page: size !== pagination.pageSize ? 1 : +page,
      pageSize: size,
    };

    if (size !== pagination.pageSize) {
      setDataSource([]);
    }
    setPagination(newPagination);
  };

  return {
    pagination,
    setPagination,
    handleTableChange,
  };
};

export default usePagination;
