import { useState, useCallback, useEffect } from "react";
import { useGetProductionScheduleThroughLYQuery } from "../../../store/api/productionScheduleApi";
import { message } from "antd";

/**
 * 自定義 Hook，用於處理凌越 ERP 查詢邏輯
 *
 * @param {Function} handleSave - 保存查詢結果的回調函數
 * @returns {Object} 包含 queryFromLY 函數的物件
 */
export function useLYQuery(handleSave) {
  const [queryState, setQueryState] = useState({
    isQuerying: false,
    query: { id: null, workOrderSN: null },
  });

  const {
    data: lyData,
    isSuccess,
    error,
    isFetching,
  } = useGetProductionScheduleThroughLYQuery(queryState.query, {
    skip:
      !queryState.isQuerying ||
      !queryState.query.workOrderSN ||
      !queryState.query.id,
    // 添加防抖
    debounceTime: 300,
  });

  const queryFromLY = useCallback((row) => {
    if (!row?.workOrderSN || !row?.id) {
      return;
    }

    // 只有當數據真的改變時才設置新狀態
    setQueryState((prev) => {
      if (
        prev.query.workOrderSN === row.workOrderSN &&
        prev.query.id === row.id
      ) {
        return prev;
      }
      return {
        isQuerying: true,
        query: {
          id: row.id,
          workOrderSN: row.workOrderSN,
        },
      };
    });
  }, []);

  // 處理成功響應
  useEffect(() => {
    if (!isFetching && isSuccess && lyData) {
      handleSave({ ...lyData });
      setQueryState((prev) => ({
        ...prev,
        isQuerying: false,
      }));
    }
  }, [isSuccess, lyData, handleSave, isFetching]);

  // 處理錯誤響應
  useEffect(() => {
    if (error) {
      message.warning(error.data.message);
      setQueryState((prev) => ({
        ...prev,
        isQuerying: false,
      }));
    }
  }, [error]);

  return {
    queryFromLY,
    isQuerying: queryState.isQuerying || isFetching,
  };
}
