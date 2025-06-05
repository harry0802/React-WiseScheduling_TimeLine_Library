// MaintenanceDrawer.jsx
import { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import BaseDrawer from "../../../Global/Drawer/BaseDrawer";
import DrawerForm from "./DrawerForm";

//! =============== 1. 設定與常量 ===============
//* 人員類型對應的標題映射
const TITLE_MAP = {
  inspector: "檢查",
  reinspector: "複檢",
  approver: "承認",
};

/**
 * @function MaintenanceDrawer
 * @description 維護系統的抽屜組件，負責顯示不同類型的維護表單
 * @param {Object} props - 組件屬性
 * @param {string} props.type - 維護類型 (inspector/reinspector/approver)
 * @param {Function} props.onClose - 關閉抽屜時的回調函數
 * @param {boolean} props.visible - 控制抽屜是否可見
 * @param {Object} props.config - 表單配置對象
 * @param {Object} props.initialData - 表單的初始數據
 * @param {Function} props.onSubmit - 表單提交時的回調函數
 * @returns {JSX.Element|null} 渲染的抽屜組件或 null
 */
function MaintenanceDrawer({
  type,
  onClose,
  visible,
  config,
  initialData,
  onSubmit,
}) {
  // 🧠 使用 useRef 引用表單組件
  const formRef = useRef(null);

  // 早期返回避免渲染不必要的內容
  // if (!type) return null;

  // 檢查 initialData 是否包含必要的 machineId 屬性
  if (!initialData || !initialData.machineId) {
    console.warn("initialData 缺少 machineId 或為空");
  }

  /**
   * 處理表單提交
   * @description 當表單數據有效時調用此函數
   * @param {Object} formData - 已驗證的表單數據
   */
  const handleSubmit = useCallback(
    async (formData) => {
      try {
        onSubmit?.(formData);
        onClose();
        return formData;
      } catch (error) {
        console.error("提交失敗:", error);
        throw error;
      }
    },
    [onSubmit, onClose]
  );

  /**
   * 外部提交按鈕點擊處理
   * @description 當確定按鈕被點擊時調用
   */
  const handleExternalSubmit = useCallback(() => {
    if (formRef.current) {
      // 直接調用表單的 submit 方法
      formRef.current.submit();
    } else {
      console.error("表單引用不存在，無法提交表單");
    }
  }, [formRef]);

  // 確保傳遞有效的 initialData
  const safeInitialData = {
    ...initialData,
    machineId: initialData?.machineId || "default-machine-id", // 提供一個預設值
  };

  return (
    <BaseDrawer visible={visible} onClose={onClose}>
      <BaseDrawer.Header>
        請{TITLE_MAP[type] || "處理"}以下項目
      </BaseDrawer.Header>
      <BaseDrawer.Body>
        <DrawerForm
          ref={formRef}
          type={type}
          initialData={safeInitialData}
          config={config}
          onSubmit={handleSubmit}
        />
      </BaseDrawer.Body>
      <BaseDrawer.Footer onSubmit={handleExternalSubmit} />
    </BaseDrawer>
  );
}

export default MaintenanceDrawer;
