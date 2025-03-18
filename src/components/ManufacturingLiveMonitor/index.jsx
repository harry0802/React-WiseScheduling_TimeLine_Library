import { FullScreenContainer } from "@iimm/data-view-react";
import styled from "styled-components";
import React from "react";
import DataVHeader from "../DataVHeader";
/*
TIP

建议在全屏容器内使用百分比搭配flex进行布局，以便于在不同的分辨率下得到较为一致的展示效果。

使用前请注意将body的margin设为 0，否则会引起计算误差，全屏后不能完全充满屏幕。
*/

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #061639; /* 深藍色背景，符合參考圖 */

  /* 針對該組件的全局重置，避免受到外部樣式影響 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

// 內容區域樣式
const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 1.25rem;
  gap: 1.25rem;
  overflow: auto;
`;

function ManufacturingLiveMonitor() {
  // 使用 React 的 useLayoutEffect 確保在渲染前調整樣式
  React.useLayoutEffect(() => {
    // 創建一個臨時樣式標籤
    const style = document.createElement("style");
    style.textContent = `
      /* 只在這個組件渲染時應用，並不會影響全局 */
      body.temp-fullscreen-mode {
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);

    // 添加臨時類名
    document.body.classList.add("temp-fullscreen-mode");

    // 清理函數
    return () => {
      document.body.classList.remove("temp-fullscreen-mode");
      document.head.removeChild(style);
    };
  }, []);

  return (
    <FullScreenContainer>
      <Container>
        <DataVHeader title="施工養護綜合數據" />
        <ContentArea>
          {/* 儀表板卡片 1 */}
          <div
            style={{
              flex: "1 1 300px",
              minHeight: "200px",
              backgroundColor: "rgba(3, 31, 80, 0.7)",
              borderRadius: "4px",
              padding: "15px",
              color: "white",
            }}
          >
            儀表板卡片 1
          </div>

          {/* 儀表板卡片 2 */}
          <div
            style={{
              flex: "1 1 300px",
              minHeight: "200px",
              backgroundColor: "rgba(3, 31, 80, 0.7)",
              borderRadius: "4px",
              padding: "15px",
              color: "white",
            }}
          >
            儀表板卡片 2
          </div>

          {/* 儀表板卡片 3 */}
          <div
            style={{
              flex: "2 1 650px",
              minHeight: "200px",
              backgroundColor: "rgba(3, 31, 80, 0.7)",
              borderRadius: "4px",
              padding: "15px",
              color: "white",
            }}
          >
            儀表板卡片 3
          </div>

          {/* 儀表板卡片 4 */}
          <div
            style={{
              flex: "1 1 400px",
              minHeight: "250px",
              backgroundColor: "rgba(3, 31, 80, 0.7)",
              borderRadius: "4px",
              padding: "15px",
              color: "white",
            }}
          >
            儀表板卡片 4
          </div>

          {/* 儀表板卡片 5 */}
          <div
            style={{
              flex: "1 1 400px",
              minHeight: "250px",
              backgroundColor: "rgba(3, 31, 80, 0.7)",
              borderRadius: "4px",
              padding: "15px",
              color: "white",
            }}
          >
            儀表板卡片 5
          </div>
        </ContentArea>
      </Container>
    </FullScreenContainer>
  );
}

export default ManufacturingLiveMonitor;
