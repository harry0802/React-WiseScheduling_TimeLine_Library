import { useState, useEffect } from "react";

// 極簡數據處理 Hook
export const useDataProcessing = (options) => {
  const { initialData, refreshInterval, onDataProcessed } = options;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 直接處理初始數據
    if (onDataProcessed) {
      onDataProcessed(initialData || []);
    }
    setIsLoading(false);

    // 定時刷新邏輯（如果需要）
    let timer;
    if (refreshInterval > 0 && onDataProcessed) {
      timer = setInterval(
        () => onDataProcessed(initialData || []),
        refreshInterval
      );
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [initialData, refreshInterval]);

  return { isLoading };
};
