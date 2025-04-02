import React, { useState, useCallback } from "react";

import styled from "styled-components";
import ErrorBoundary from "../components/ErrorBoundary";

// 隔離容器，限制樣式影響範圍
const IsolatedContainer = styled.div`
  /* 基本設置確保佔滿視口 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000; /* 確保在最上層 */

  /* 重置可能繼承的樣式 */
  margin: 0;
  padding: 0;
  background-color: #fff; /* 或者你想要的背景色 */
  overflow: hidden;

  /* 防止影響其他元素 */
  isolation: isolate;
`;

/**
 * @function FullScreenLayout
 * @description 全屏佈局組件，包含錯誤邊界和重置功能
 * @param {Object} props - 組件屬性
 * @returns {React.ReactNode} - 佈局組件
 */
function FullScreenLayout({ children }) {
  // 🧠 管理錯誤邊界重置狀態
  const [resetErrorBoundary, setResetErrorBoundary] = useState(false);

  // ✨ 提供重置錯誤邊界的方法
  const handleResetError = useCallback(() => {
    // 透過修改狀態值觸發ErrorBoundary的重置
    setResetErrorBoundary((prev) => !prev);
    console.log("錯誤邊界已重置");
  }, []);

  // 💡 重置後的回調處理
  const handleAfterReset = useCallback(({ children }) => {
    // 這裡可以放置重置後的額外邏輯，如重新獲取數據等
    console.log("錯誤邊界重置完成，執行後續處理");
  }, []);

  return (
    <IsolatedContainer>
      <ErrorBoundary resetKey={resetErrorBoundary} onReset={handleAfterReset}>
        {children}
      </ErrorBoundary>

      {/* 💡 全局錯誤重置方法綁定到Window對象，便於在任何地方訪問 */}
      {React.useEffect(() => {
        window.__resetErrorBoundary = handleResetError;
        return () => {
          delete window.__resetErrorBoundary;
        };
      }, [handleResetError])}
    </IsolatedContainer>
  );
}

export default FullScreenLayout;
