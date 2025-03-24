//! =============== 1. 導入區塊 ===============
// 使用統一導出接口導入卡片元件
import { BaseCard } from "../../components/DashboardCard";
// import GridExample from "../../components/GridSystem/GridExample";
import StatusDisplay from "./StatusDisplay";
import styled from "styled-components";

import Grid from "@mui/material/Grid2";
import { Stack } from "@mui/material";
import { Decoration10 } from "@iimm/data-view-react";
import { BorderBox13 } from "@iimm/data-view-react";
import DailyProductionDashboard from "./Dashboard/DailyProductionDashboard";
//! =============== 2. 樣式定義 ===============
const StatusContent = styled.div`
  /* 布局定位 */
  display: flex;
  justify-content: center;
  padding: 12px 82px 0px 95px;
  /* 盒模型 */
  width: 100%;
  margin-bottom: 20px;
`;

/**
 * @function RealTimeOEEMonitor
 * @description 實時OEE監控元件，展示生產狀態和進度
 */

function RealTimeOEEMonitor() {
  // 靜態生產數據 (實際項目中應從API或狀態管理獲取)
  const productionData = [
    { status: "NORMAL", count: "120", hours: "9000.0" },
    { status: "TESTING", count: "00", hours: "040.0" },
    { status: "SWITCHING", count: "300", hours: "2510.0" },
    { status: "PAUSED", count: "00", hours: "000.0" },
    { status: "ABNORMAL", count: "00", hours: "2510.0" },
  ];
  // (87 / 2) / 8 = 5.4375
  return (
    <section>
      <StatusContent>
        <Grid container sx={{ width: "100%" }} spacing={5.4375}>
          {/* 狀態展示卡片列表 */}
          {productionData.map((data, index) => (
            <Grid size={2.4} key={index}>
              <StatusDisplay
                status={data.status}
                count={data.count}
                hours={data.hours}
              />
            </Grid>
          ))}
        </Grid>
      </StatusContent>

      <Decoration10
        style={{ width: "100%", height: "5px", marginBottom: "20px" }}
      />

      <Stack spacing={2.5}>
        <Grid container spacing={2.5}>
          <Grid size={8}>
            <Stack spacing={2.5}>
              {/* border-box-content */}
              <BorderBox13>
                <BaseCard style={{ backgroundColor: "transparent" }}>
                  <BaseCard.Header>
                    <BaseCard.Title>本日生產進度</BaseCard.Title>
                  </BaseCard.Header>
                  <BaseCard.Content>
                    <DailyProductionDashboard />
                  </BaseCard.Content>
                </BaseCard>
              </BorderBox13>

              <BorderBox13>
                <BaseCard style={{ backgroundColor: "transparent" }}>
                  <BaseCard.Header>
                    <BaseCard.Title>生產進度</BaseCard.Title>
                  </BaseCard.Header>
                  <BaseCard.Content>進度數據顯示區域</BaseCard.Content>
                </BaseCard>
              </BorderBox13>
            </Stack>
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

        <Grid container spacing={2.5}>
          <Grid size={5}>
            <BorderBox13>
              <BaseCard style={{ backgroundColor: "transparent" }}>
                <BaseCard.Header>
                  <BaseCard.Title>生產進度</BaseCard.Title>
                </BaseCard.Header>
                <BaseCard.Content>進度數據顯示區域</BaseCard.Content>
              </BaseCard>
            </BorderBox13>
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
                <BaseCard.Content>進度數據顯示區域</BaseCard.Content>
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
