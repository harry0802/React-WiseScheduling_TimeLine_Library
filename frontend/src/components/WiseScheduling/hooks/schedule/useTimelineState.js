/**
 * @file useTimelineState.js
 * @description 時間線狀態管理 hook，處理時間線的各種狀態
 * @version 1.0.0
 */

import { useState, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { getTimeWindow } from "../../utils/schedule/dateUtils";

/**
 * @function useTimelineState
 * @description 時間線狀態管理 hook，集中管理時間線相關狀態
 * @returns {Object} 時間線狀態和狀態更新方法
 */
export function useTimelineState() {
  //! =============== 1. 基礎 UI 狀態 ===============
  // 時間範圍選擇
  const [timeRange, setTimeRange] = useState("day");
  // 選中的區域
  const [selectedArea, setSelectedArea] = useState("A");
  
  //! =============== 2. 對話框狀態 ===============
  // 項目對話框狀態
  const [dialogState, setDialogState] = useState({
    selectedItem: null,
    mode: "view",
    isOpen: false,
  });
  // 刪除確認對話框狀態
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  //! =============== 3. 狀態更新函數 ===============
  /**
   * 更新時間範圍
   * @function
   * @param {string} newRange - 新的時間範圍
   * @returns {void}
   */
  const handleTimeRangeChange = useCallback((newRange) => {
    setTimeRange(newRange);
  }, []);

  /**
   * 更新選中的區域
   * @function
   * @param {string} newArea - 新的區域
   * @returns {void}
   */
  const handleAreaChange = useCallback((newArea) => {
    setSelectedArea(newArea);
  }, []);
  
  /**
   * 開啟項目對話框
   * @function
   * @param {Object} item - 選中的項目
   * @param {string} mode - 對話框模式 (view/add/edit)
   * @returns {void}
   */
  const openItemDialog = useCallback((item, mode = "view") => {
    setDialogState({
      selectedItem: item,
      mode,
      isOpen: true,
    });
  }, []);
  
  /**
   * 關閉項目對話框
   * @function
   * @returns {void}
   */
  const closeItemDialog = useCallback(() => {
    setDialogState({
      selectedItem: null,
      mode: "view",
      isOpen: false,
    });
  }, []);
  
  /**
   * 更新項目對話框狀態
   * @function
   * @param {Object} newState - 新的對話框狀態
   * @returns {void}
   */
  const updateDialogState = useCallback((newState) => {
    setDialogState((prev) => ({ ...prev, ...newState }));
  }, []);
  
  /**
   * 開啟刪除確認對話框
   * @function
   * @returns {void}
   */
  const openDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);
  
  /**
   * 關閉刪除確認對話框
   * @function
   * @returns {void}
   */
  const closeDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
  }, []);
  
  //! =============== 4. 計算派生狀態 ===============
  /**
   * 獲取當前時間窗口
   * @function
   * @returns {Object} 開始和結束時間
   */
  const currentTimeWindow = useMemo(() => {
    return getTimeWindow(timeRange, dayjs());
  }, [timeRange]);
  
  // 返回所有狀態和狀態更新方法
  return {
    // 基礎 UI 狀態
    timeRange,
    selectedArea,
    setTimeRange: handleTimeRangeChange,
    setSelectedArea: handleAreaChange,
    
    // 對話框狀態
    dialogState,
    isDeleteDialogOpen,
    openItemDialog,
    closeItemDialog,
    updateDialogState,
    openDeleteDialog,
    closeDeleteDialog,
    
    // 派生狀態
    currentTimeWindow,
  };
}
