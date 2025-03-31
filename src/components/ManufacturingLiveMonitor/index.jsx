import { FullScreenContainer } from "@iimm/data-view-react";
import styled from "styled-components";
import React, { useState } from "react";
import DataVHeader from "./components/DataVHeader";

import RealTimeOEEMonitor from "./feature/RealTimeOEEMonitor";

//! =============== 1. 樣式定義 ===============
//* 主容器：負責整體布局和背景
const Container = styled.div`
  /* 布局定位 */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  /* 盒模型 */
  box-sizing: border-box;

  /* 視覺樣式 */
  background-color: #061639;

  /* 全局重置，避免外部樣式影響 */
  /* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  } */
`;

//* 內容區域：負責卡片的彈性布局
const ContentArea = styled.div`
  /* 布局定位 */
  display: flex;
  flex-wrap: wrap;
  flex: 1;

  /* 盒模型 */
  padding: 0 1.25rem;
  gap: 1.25rem;

  /* 視覺樣式 */
  overflow: auto;
`;
//
const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
`;

//! =============== 2. 核心功能 ===============
/**
 * @function setupFullScreenMode
 * @description 設置臨時全屏模式，確保在渲染前調整樣式
 * @returns {Function} 清理函數，用於在組件卸載時移除臨時樣式
 */
function setupFullScreenMode() {
  // 創建臨時樣式標籤
  const style = document.createElement("style");
  style.textContent = `
    /* 🧠 只在組件渲染時應用，不影響全局 */
    body.temp-fullscreen-mode {
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
    }
  `;
  document.head.appendChild(style);

  // 添加臨時類名
  document.body.classList.add("temp-fullscreen-mode");

  // 返回清理函數
  return () => {
    document.body.classList.remove("temp-fullscreen-mode");
    document.head.removeChild(style);
  };
}

/**
 * @function ManufacturingLiveMonitor
 * @description 製造監控儀表板主組件，顯示各種生產數據
 */
function ManufacturingLiveMonitor() {
  const [sectionTitle, setSectionTitle] = useState("");

  // 使用 useLayoutEffect 確保在 DOM 渲染前設置全屏模式
  React.useLayoutEffect(() => {
    return setupFullScreenMode();
  }, []);

  return (
    <FullScreenContainer>
      <Container>
        <DataVHeader title={sectionTitle} />
        <Main>
          <RealTimeOEEMonitor onChangeSectTitle={setSectionTitle} />
        </Main>
      </Container>
    </FullScreenContainer>
  );
}

export default ManufacturingLiveMonitor;

// function Section() {
//   return (
//     <ContentArea>
//       {/* 卡片 1 */}
//       <Card style={{ flex: "1 1 300px", minHeight: "200px" }} variant="default">
//         <Card.Header>
//           <Card.Title>生產進度</Card.Title>
//           <Card.Description>即時監控生產線狀態</Card.Description>
//         </Card.Header>
//         <Card.Content>進度數據顯示區域</Card.Content>
//         <Card.Footer>更新時間：2025/03/18 14:30</Card.Footer>
//       </Card>

//       {/* 卡片 2 - 可折疊 */}
//       <Card
//         style={{ flex: "1 1 300px", minHeight: "200px" }}
//         variant="active"
//         collapsible={true}
//         defaultExpanded={true}
//       >
//         <Card.Header>
//           <Card.Title>關鍵指標</Card.Title>
//         </Card.Header>
//         <Card.Content>指標數據顯示區域</Card.Content>
//       </Card>

//       {/* 卡片 3 - 較大尺寸 */}
//       <Card style={{ flex: "2 1 650px", minHeight: "200px" }} variant="default">
//         <Card.Header>
//           <Card.Title>生產趨勢</Card.Title>
//         </Card.Header>
//         <Card.Content>趨勢圖表顯示區域</Card.Content>
//       </Card>

//       {/* 卡片 4 - 警告樣式 */}
//       <Card style={{ flex: "1 1 400px", minHeight: "250px" }} variant="warning">
//         <Card.Header>
//           <Card.Title>異常監控</Card.Title>
//         </Card.Header>
//         <Card.Content>異常事件列表</Card.Content>
//         <Card.Footer>總計: 3 個待處理事件</Card.Footer>
//       </Card>

//       {/* 卡片 5 */}
//       <Card style={{ flex: "1 1 400px", minHeight: "250px" }} variant="default">
//         <Card.Header>
//           <Card.Title>資源分配</Card.Title>
//         </Card.Header>
//         <Card.Content>資源分配數據</Card.Content>
//       </Card>
//     </ContentArea>
//   );
// }
