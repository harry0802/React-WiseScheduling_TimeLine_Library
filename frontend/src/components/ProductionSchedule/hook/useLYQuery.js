import { useState, useCallback } from "react";
import { useGetProductionScheduleThroughLYQuery } from "../../../store/api/productionScheduleApi";

/**
 * 自定義 Hook，用於處理凌越 ERP 查詢邏輯
 *
 * @param {Function} handleSave - 保存查詢結果的回調函數
 * @returns {Object} 包含 queryFromLY 函數的物件
 */
export function useLYQuery(handleSave) {
  const [lyQuery, setLyQuery] = useState({ id: null, workOrderSN: null });
  const [isQuerying, setIsQuerying] = useState(false);

  /**
   * 使用 RTK Query 獲取生產計劃數據
   */
  const { data: lyData, isSuccess: lyIsSuccess } =
    useGetProductionScheduleThroughLYQuery(lyQuery, { skip: !isQuerying });

  /**
   * 觸發凌越 ERP 查詢
   *
   * @param {Object} row - 包含 id 和 workOrderSN 的物件
   */
  const queryFromLY = useCallback((row) => {
    setLyQuery({
      id: row.id,
      workOrderSN: row.workOrderSN,
    });
    setIsQuerying(true);
  }, []);

  // 當查詢成功時，調用 handleSave 並重置查詢狀態
  if (isQuerying && lyIsSuccess && lyData) {
    handleSave({ ...lyData });
    setIsQuerying(false);
    setLyQuery({ id: null, workOrderSN: null });
  }

  return { queryFromLY };
}
