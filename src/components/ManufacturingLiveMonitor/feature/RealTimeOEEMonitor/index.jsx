//! =============== 1. 導入區塊 ===============
// 使用統一導出接口導入卡片元件

// import GridExample from "../../components/GridSystem/GridExample";
import Grid from "@mui/material/Grid2";
import { Stack } from "@mui/material";
import { Decoration10 } from "@iimm/data-view-react";

import DailyProduction from "./feature/DailyProduction";
import Scoreboard from "./feature/Scoreboard";
import OverdueTasks from "./feature/OverdueTasks";
import OEEMonitor from "./feature/OEEMonitor";
import RealTimeDeviceTracker from "./feature/RealTimeDeviceTracker";
import MachineStateTimeRatio from "./feature/MachineStateTimeRatio";
import EquipmentRiskModule from "./feature/EquipmentRiskModule";

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
        style={{ width: "100%", height: "5px", marginBottom: "10px" }}
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
            <MachineStateTimeRatio />
          </Grid>
          <Grid size={4}>
            <EquipmentRiskModule />
          </Grid>
        </Grid>
      </Stack>
    </section>
  );
}

export default RealTimeOEEMonitor;
