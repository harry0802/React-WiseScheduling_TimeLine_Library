//! =============== 1. 導入區塊 ===============
// 使用統一導出接口導入卡片元件
import { BaseCard } from "../../components/DashboardCard";
// import GridExample from "../../components/GridSystem/GridExample";
import Grid from "@mui/material/Grid2";
import { Stack } from "@mui/material";
import { Decoration10 } from "@iimm/data-view-react";
import { BorderBox13, Charts } from "@iimm/data-view-react";
import DailyProduction from "./feature/DailyProduction";
import Scoreboard from "./feature/Scoreboard";
import OverdueTasks from "./feature/OverdueTasks";
import OEEMonitor from "./feature/OEEMonitor";
import RealTimeDeviceTracker from "./feature/RealTimeDeviceTracker";

//! =============== 2. 樣式定義 ===============

/**
 * @function RealTimeOEEMonitor
 * @description 實時OEE監控元件，展示生產狀態和進度
 */

function RealTimeOEEMonitor() {
  // 靜態生產數據 (實際項目中應從API或狀態管理獲取)

  return (
    <section>
      <Scoreboard />
      <Decoration10
        style={{ width: "100%", height: "5px", marginBottom: "20px" }}
      />
      <Stack spacing={2.5}>
        <Grid container spacing={2.5}>
          <Grid size={8}>
            <Stack spacing={2.5}>
              <DailyProduction />
              <OverdueTasks />
            </Stack>
          </Grid>
          <Grid size={4}>
            <OEEMonitor />
          </Grid>
        </Grid>

        <Grid container spacing={2.5}>
          <Grid size={5}>
            <RealTimeDeviceTracker />
          </Grid>
          <Grid size={3}>
            <BorderBox13>
              <BaseCard
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <BaseCard.Header>
                  <BaseCard.Title>生產進度</BaseCard.Title>
                </BaseCard.Header>
                <BaseCard.Content>Just a pending</BaseCard.Content>
              </BaseCard>
            </BorderBox13>
          </Grid>
          <Grid size={4}>
            <BorderBox13>
              <BaseCard style={{ backgroundColor: "transparent" }}>
                <BaseCard.Header>
                  <BaseCard.Title>生產進度</BaseCard.Title>
                </BaseCard.Header>
                <BaseCard.Content>進度數據顯示區域</BaseCard.Content>
              </BaseCard>
            </BorderBox13>
          </Grid>
        </Grid>
      </Stack>
    </section>
  );
}

export default RealTimeOEEMonitor;
