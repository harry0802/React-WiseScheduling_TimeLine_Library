import { Grid, CircularProgress, Alert, Box } from "@mui/material";
import styled from "styled-components";
import StatusDisplay from "../components/Dashboard/StatusDisplay";
import { useScoreboardData } from "../hooks/useScoreboardData";

const StatusContent = styled.div`
  /* 布局定位 */
  display: flex;
  justify-content: center;
  /* padding: 12px 82px 0px 95px; */
  /* 盒模型 */
  width: 100%;
  margin-bottom: 10px;
`;

const CenteredContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
`;

/**
 * 階段三：完整的 UI 狀態處理展示
 * 
 * 特點：
 * - 移除所有靜態 productionData
 * - 使用 useScoreboardData Hook 獲取即時資料
 * - 完整的載入、錯誤、成功狀態處理
 * - 自動 30 秒輪詢更新
 */
function Scoreboard() {
  const { data, loading, error } = useScoreboardData();

  // 載入中狀態：顯示 Spinner
  if (loading) {
    return (
      <StatusContent>
        <CenteredContainer>
          <CircularProgress size={40} />
        </CenteredContainer>
      </StatusContent>
    );
  }

  // 錯誤狀態：顯示錯誤訊息
  if (error) {
    return (
      <StatusContent>
        <CenteredContainer>
          <Alert severity="error" sx={{ minWidth: '300px' }}>
            載入資料失敗：{error}
          </Alert>
        </CenteredContainer>
      </StatusContent>
    );
  }

  // 成功狀態：渲染資料
  return (
    <StatusContent>
      <Grid container sx={{ width: "100%" }} spacing={5.4375}>
        {data.map((item, index) => (
          <Grid item xs={2.4} key={index}>
            <StatusDisplay
              status={item.status}
              count={item.count}
              hours={item.hours}
            />
          </Grid>
        ))}
      </Grid>
    </StatusContent>
  );
}

export default Scoreboard;
