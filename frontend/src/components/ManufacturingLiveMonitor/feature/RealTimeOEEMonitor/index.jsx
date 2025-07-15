//! =============== 1. 導入區塊 ===============
// React 核心庫
import { useEffect, memo } from "react";

// 第三方 UI 組件庫
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Decoration10 } from "@iimm/data-view-react";

// 本地狀態管理
import { useHeaderNameStore } from "../../slice/LayoutSlice";

// 業務功能模組 - 實時 OEE 監控相關組件
import Scoreboard from "./feature/Scoreboard"; // 關鍵績效指標總覽面板
import DailyProduction from "./feature/DailyProduction"; // 日產量統計與趨勢分析
import OEEMonitor from "./feature/OEEMonitor"; // 設備綜合效率監控面板
import RealTimeDeviceTracker from "./feature/RealTimeDeviceTracker"; // 實時設備狀態追蹤
import OverdueTasks from "./feature/OverdueTasks"; // 逾期任務管理與提醒
import MachineStateTimeRatio from "./feature/MachineStateTimeRatio"; // 機器狀態時間佔比分析
import EquipmentRiskModule from "./feature/EquipmentRiskModule"; // 設備風險評估與預警模組

//! =============== 2. 組件定義 ===============

/**
 * 實時 OEE 監控儀表板主組件
 *
 * @description
 * 製造現場實時 OEE（Overall Equipment Effectiveness）監控系統的主要介面，
 * 整合多個關鍵生產指標模組，提供統一的生產狀態總覽和實時監控功能。
 *
 * 功能特色：
 * - 🎯 關鍵績效指標（KPI）即時顯示
 * - 📊 日產量統計與趨勢分析
 * - ⚡ 設備綜合效率實時監控
 * - 🔍 設備狀態即時追蹤
 * - ⚠️ 逾期任務管理與提醒
 * - 📈 機器運行狀態時間分析
 * - 🛡️ 設備風險評估與預警
 *
 * @component
 * @example
 * // 基本使用
 * <RealTimeOEEMonitor />
 *
 * @returns {JSX.Element} 實時 OEE 監控儀表板介面
 */
const RealTimeOEEMonitor = memo(function RealTimeOEEMonitor() {
  // 頁面標題狀態管理
  const { setHeaderName } = useHeaderNameStore();

  /**
   * 初始化頁面標題設定
   * 在組件掛載時設定頁面頂部顯示的標題
   * 這裡使用「施工養護綜合數據」作為製造業監控系統的主標題
   */
  useEffect(() => {
    if (!setHeaderName) return;
    setHeaderName("施工養護綜合數據");
  }, [setHeaderName]);

  return (
    <section aria-label="實時OEE監控儀表板">
      {/* 頂部關鍵績效指標總覽區域 */}
      <Scoreboard />

      {/* 視覺分隔線 - 提供區域間的視覺區分 */}
      <Decoration10
        style={{ width: "100%", height: "5px", marginBottom: "10px" }}
      />

      {/* 主要監控內容區域 - 使用響應式網格布局 */}
      <Stack spacing={1.25}>
        {/* 
          第一行布局：左側生產數據區域 + 右側OEE監控區域
          採用 8:4 的黃金比例分配，突出生產數據的重要性
        */}
        <Grid container spacing={1.25}>
          {/* 左側生產數據區域 (佔比 8/12 = 66.7%) */}
          <Grid item xs={8}>
            <Stack spacing={1.25}>
              {/* 日產量統計模組 - 顯示當日產量完成情況和趨勢 */}
              <DailyProduction />

              {/* 實時設備追蹤模組 - 監控生產線上設備的即時狀態 */}
              <RealTimeDeviceTracker />
            </Stack>
          </Grid>

          {/* 右側OEE監控區域 (佔比 4/12 = 33.3%) */}
          <Grid item xs={4}>
            {/* OEE效率監控面板 - 顯示設備綜合效率的核心指標 */}
            <OEEMonitor />
          </Grid>
        </Grid>

        {/* 
          第二行布局：任務管理 + 狀態分析 + 風險監控
          採用 5:3:4 的分配比例，平衡各功能模組的展示空間
        */}
        <Grid container spacing={1.25}>
          {/* 逾期任務管理模組 (佔比 5/12 = 41.7%) */}
          <Grid item xs={5}>
            {/* 逾期任務列表 - 顯示未完成的生產任務和緊急處理項目 */}
            <OverdueTasks />
          </Grid>

          {/* 機器狀態時間分析模組 (佔比 3/12 = 25%) */}
          <Grid item xs={3}>
            {/* 設備運行時間統計 - 分析設備運行、停機、維護時間佔比 */}
            <MachineStateTimeRatio />
          </Grid>

          {/* 設備風險評估模組 (佔比 4/12 = 33.3%) */}
          <Grid item xs={4}>
            {/* 設備健康狀態監控 - 預測性維護和風險預警功能 */}
            <EquipmentRiskModule />
          </Grid>
        </Grid>
      </Stack>
    </section>
  );
});

// 設定組件顯示名稱，便於開發工具識別和除錯
RealTimeOEEMonitor.displayName = "RealTimeOEEMonitor";

export default RealTimeOEEMonitor;
