import { useState, useEffect } from "react";

import { convertDatesToCustomFormat } from "../utils/excelUtils"; // 引入新的函數
import { useGetProductionScheduleQuery } from "../../../store/api/productionScheduleApi";

/**
 * 自定義 Hook，用於導出生產計劃數據
 * @param {string} startDate - 開始日期
 * @param {string} endDate - 結束日期
 * @param {string} statusState - 狀態
 * @param {string} expiryState - 到期狀態
 * @param {string} keywordTypeState - 關鍵字類型
 * @param {string} keywordState - 關鍵字
 * @param {Function} formatDateTime - 日期格式化函數
 * @returns {Object} 包含需要導出的數據和重新獲取數據的函數
 */
function useExportData(
  startDate,
  endDate,
  statusState,
  expiryState,
  keywordTypeState,
  keywordState,
  formatDateTime
) {
  const [needExportData, setNeedExportData] = useState([]);

  const {
    data: exportData,
    isSuccess: exportIsSuccess,
    refetch: exportRefetch,
  } = useGetProductionScheduleQuery({
    size: 10000000,
    start_planOnMachineDate: formatDateTime(startDate, "start"),
    end_planOnMachineDate: formatDateTime(endDate, "end"),
    status: statusState,
    expiry: expiryState,
    [keywordTypeState]: keywordState,
  });

  useEffect(() => {
    if (exportIsSuccess) {
      const newDataWithISODate = convertDatesToCustomFormat(exportData.data); // 使用新的函數
      setNeedExportData(newDataWithISODate);
    }
  }, [exportIsSuccess, exportData]);

  return { needExportData, exportRefetch };
}

export default useExportData;
