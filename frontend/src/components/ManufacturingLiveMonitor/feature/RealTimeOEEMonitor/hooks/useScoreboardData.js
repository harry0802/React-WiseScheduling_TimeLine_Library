import { useGetCurrentMachineStatusCountQuery } from '../../../services/endpoints/realTimeMonitorApi';
import { useGetMachineStatusProportionQuery } from '../../../services/endpoints/oeeInsightApi';

// 狀態映射表：API 中文狀態 -> 元件內部英文鍵
const STATUS_MAP = {
  '生產中': 'NORMAL',
  '生產': 'NORMAL',
  '產品試模': 'TESTING',
  '上模與調機': 'SWITCHING',
  '待機中': 'PAUSED',
  '待機': 'PAUSED',
  '機台停機': 'ABNORMAL',
};

/**
 * 階段二：基礎資料獲取、映射與合併 + 智慧輪詢機制
 * 
 * 特點：
 * - 完全依賴 RTK Query 的內建狀態管理
 * - 無 useEffect 或 .refetch() 調用，避免重複請求
 * - 直接在主體邏輯中進行資料轉換，不使用 useMemo
 * - 統一處理兩個查詢的狀態
 * - 自動輪詢機制（30秒間隔）
 * - 智慧輪詢：背景暫停，前景立即恢復
 */
export const useScoreboardData = () => {
  // 啟用輪詢的 RTK Query hooks
  const countQuery = useGetCurrentMachineStatusCountQuery(undefined, {
    pollingInterval: 30000, // 30秒輪詢間隔
  });
  const proportionQuery = useGetMachineStatusProportionQuery(undefined, {
    pollingInterval: 30000, // 30秒輪詢間隔
  });

  // 統一衍生 loading 狀態
  const isLoading = countQuery.isLoading || proportionQuery.isLoading;

  // 統一衍生 error 狀態
  const error = countQuery.error || proportionQuery.error;

  // 直接在主體邏輯中進行資料合併（不使用 useMemo）
  let data = [];
  
  if (countQuery.data && proportionQuery.data) {
    // 建立映射表
    const countMap = {};
    const hoursMap = {};

    // 處理機台狀態統計資料
    countQuery.data.forEach(item => {
      const englishKey = STATUS_MAP[item.status] || 'NORMAL';
      countMap[englishKey] = item.count || 0;
    });

    // 處理機台狀態時間比例資料
    proportionQuery.data.forEach(item => {
      const englishKey = STATUS_MAP[item.status] || 'NORMAL';
      hoursMap[englishKey] = item.hours || 0;
    });

    // 合併成最終格式
    data = ['NORMAL', 'TESTING', 'SWITCHING', 'PAUSED', 'ABNORMAL'].map(status => ({
      status,
      count: countMap[status] || 0,
      hours: hoursMap[status] || 0,
    }));
  }

  return {
    data,
    loading: isLoading,
    error: error?.message || null,
  };
};