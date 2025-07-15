/**
 * @file useTimeRange.js
 * @description 時間範圍管理 Hook
 * @version 1.0.0
 */

import { useState, useCallback, useMemo } from "react";
import dayjs from "dayjs";

/**
 * @hook useTimeRange
 * @description 管理時間線的時間範圍狀態
 * @returns {Object} 時間範圍狀態和操作方法
 */
function useTimeRange() {
  // 🧠 預設時間範圍：當天的前後一個月
  const getDefaultTimeRange = useCallback(() => {
    const now = dayjs();
    const startTime = now.subtract(1, "month").startOf("day").toISOString();
    const endTime = now.add(1, "month").endOf("day").toISOString();
    
    return { startTime, endTime };
  }, []);

  // 🦉 狀態管理
  const [timeRange, setTimeRange] = useState(() => getDefaultTimeRange());

  // 🔧 時間範圍操作方法
  const handleStartTimeChange = useCallback((newStartTime) => {
    setTimeRange(prev => ({
      ...prev,
      startTime: newStartTime
    }));
  }, []);

  const handleEndTimeChange = useCallback((newEndTime) => {
    setTimeRange(prev => ({
      ...prev,
      endTime: newEndTime
    }));
  }, []);

  // 🧠 重置為預設範圍
  const resetToDefault = useCallback(() => {
    setTimeRange(getDefaultTimeRange());
  }, [getDefaultTimeRange]);

  // 🧠 設定為今天
  const setToToday = useCallback(() => {
    const today = dayjs();
    setTimeRange({
      startTime: today.startOf("day").toISOString(),
      endTime: today.endOf("day").toISOString()
    });
  }, []);

  // 🧠 設定為本週
  const setToThisWeek = useCallback(() => {
    const now = dayjs();
    setTimeRange({
      startTime: now.startOf("week").toISOString(),
      endTime: now.endOf("week").toISOString()
    });
  }, []);

  // 🧠 設定為本月
  const setToThisMonth = useCallback(() => {
    const now = dayjs();
    setTimeRange({
      startTime: now.startOf("month").toISOString(),
      endTime: now.endOf("month").toISOString()
    });
  }, []);

  // ✨ 格式化的時間範圍（用於 API 調用）
  const formattedTimeRange = useMemo(() => ({
    startTime: timeRange.startTime,
    endTime: timeRange.endTime,
    // 🔧 API 可能需要的其他格式
    startTimeFormatted: timeRange.startTime ? dayjs(timeRange.startTime).format("YYYY-MM-DD HH:mm:ss") : null,
    endTimeFormatted: timeRange.endTime ? dayjs(timeRange.endTime).format("YYYY-MM-DD HH:mm:ss") : null,
  }), [timeRange]);

  // 📊 時間範圍資訊
  const timeRangeInfo = useMemo(() => {
    if (!timeRange.startTime || !timeRange.endTime) {
      return { isValid: false, duration: 0, durationText: "" };
    }

    const start = dayjs(timeRange.startTime);
    const end = dayjs(timeRange.endTime);
    const duration = end.diff(start, "day");
    
    let durationText = "";
    if (duration === 0) {
      durationText = "當天";
    } else if (duration <= 7) {
      durationText = `${duration} 天`;
    } else if (duration <= 30) {
      const weeks = Math.floor(duration / 7);
      const days = duration % 7;
      durationText = weeks > 0 ? `${weeks}週${days > 0 ? ` ${days}天` : ""}` : `${duration} 天`;
    } else {
      const months = Math.floor(duration / 30);
      const remainingDays = duration % 30;
      durationText = `${months}個月${remainingDays > 0 ? ` ${remainingDays}天` : ""}`;
    }

    return {
      isValid: start.isBefore(end),
      duration,
      durationText,
      startText: start.format("YYYY/MM/DD HH:mm"),
      endText: end.format("YYYY/MM/DD HH:mm"),
    };
  }, [timeRange]);

  return {
    // 狀態
    timeRange,
    formattedTimeRange,
    timeRangeInfo,
    
    // 操作方法
    handleStartTimeChange,
    handleEndTimeChange,
    setTimeRange,
    
    // 快捷設定方法
    resetToDefault,
    setToToday,
    setToThisWeek,
    setToThisMonth,
  };
}

export default useTimeRange;
