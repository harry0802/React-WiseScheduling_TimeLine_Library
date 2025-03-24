import React from "react";
import { ErrorBoundary } from "react-error-boundary";

//! =============== 1. 設定與常量 ===============
//* 錯誤邊界樣式設定，集中管理便於統一修改
const STYLES = {
  container: {
    padding: "20px",
    color: "red",
    border: "1px solid red",
    borderRadius: "5px",
    margin: "10px",
  },
  details: { 
    whiteSpace: "pre-wrap" 
  },
  button: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }
};

/**
 * @function ErrorFallback
 * @description 自定義錯誤顯示組件
 * @param {Object} props - 組件屬性
 * @param {Error} props.error - 捕獲的錯誤
 * @param {Function} props.resetErrorBoundary - 重置錯誤邊界的函數
 * @returns {React.ReactNode} - 錯誤 UI 元素
 */
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div style={STYLES.container}>
      <h2>出錯了！</h2>
      <p>{error.message}</p>
      <details style={STYLES.details}>
        <summary>查看詳細錯誤</summary>
        <pre>{error.stack}</pre>
      </details>
      <div>
        <button onClick={resetErrorBoundary} style={STYLES.button}>
          重試
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          style={{...STYLES.button, marginLeft: "10px", backgroundColor: "#2196F3"}}
        >
          返回首頁
        </button>
      </div>
    </div>
  );
}

/**
 * @function logError
 * @description 記錄錯誤信息到控制台或錯誤追蹤服務
 * @param {Error} error - 捕獲的錯誤
 * @param {Object} info - 錯誤信息
 */
const logError = (error, info) => {
  console.error("錯誤捕獲:", error);
  console.error("元件堆疊:", info.componentStack);
  
  //TODO 將錯誤信息發送到日誌服務或監控平台
};

/**
 * @function CustomErrorBoundary
 * @description 使用 react-error-boundary 包裝的錯誤邊界組件
 * @param {Object} props - 組件屬性
 * @returns {React.ReactNode} - 錯誤邊界組件
 * 
 * @example
 * // 基本使用方式
 * <CustomErrorBoundary>
 *   <YourComponent />
 * </CustomErrorBoundary>
 */
const CustomErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={() => {
        // 重置應用狀態，避免錯誤再次發生
        // 如果有全局狀態管理，可以在這裡重置相關狀態
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
