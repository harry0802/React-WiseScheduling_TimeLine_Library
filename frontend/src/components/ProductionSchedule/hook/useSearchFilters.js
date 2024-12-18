import { useState } from "react";
import { WORKORDER_STATUS } from "../../../config/enum";
import { TZ } from "../../../config/config";
import dayjs from "dayjs";

/**
 * 自定義 Hook，用於管理搜索篩選條件
 * @returns {Object} 包含搜索篩選條件和相關設置函數的對象
 */
const useSearchFilters = () => {
  const initialDate = (days) =>
    new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000);
  const [startDate, setStartDate] = useState(initialDate(-7));
  const [endDate, setEndDate] = useState(initialDate(28));
  const [statusState, setStatusState] = useState(WORKORDER_STATUS.ALL);
  const [expiryState, setExpiryState] = useState("無限期");
  const [keywordTypeState, setKeywordTypeState] = useState("workOrderSN");
  const [keywordState, setKeywordState] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * 格式化日期時間
   * @param {Date|string} date - 日期對象或日期字符串
   * @param {string} type - 日期類型（"start" 或 "end"）
   * @returns {string} 格式化後的日期字符串
   */
  const formatDateTime = (date, type) => {
    if (!date) {
      date = type === "start" ? initialDate(-7) : initialDate(28);
    }
    return dayjs.tz(date, TZ).format();
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    statusState,
    setStatusState,
    expiryState,
    setExpiryState,
    keywordTypeState,
    setKeywordTypeState,
    keywordState,
    setKeywordState,
    loading,
    setLoading,
    formatDateTime,
  };
};

export default useSearchFilters;
