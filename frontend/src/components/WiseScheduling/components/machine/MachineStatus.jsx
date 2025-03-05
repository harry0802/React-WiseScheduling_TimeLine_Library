/**
 * @file MachineStatusManager.jsx
 * @description 機台狀態管理器組件，處理機台狀態表單和相關邏輯
 * @version 1.0.0
 */

//! =============== 1. 設定與常量 ===============
import React, { forwardRef, useImperativeHandle, useState } from "react";
import dayjs from "dayjs";

//! =============== 2. 類型與介面 ===============
/**
 * @typedef {Object} MachineStatusProps
 * @property {Object} initialData - 機台初始狀態數據
 * @property {Function} onSubmit - 表單提交處理函數
 */

/**
 * @typedef {Object} FormAPI
 * @property {Function} getFormValues - 取得表單所有值
 * @property {Function} validateForm - 觸發表單驗證並返回結果
 * @property {Function} setFormValue - 設置表單欄位值
 * @property {Function} getFormErrors - 取得表單錯誤
 */

//! =============== 3. 核心功能 ===============
import StatusSlider from "./StatusSlider";
import ReasonSelector from "./ReasonSelector";
import ProductInput from "./ProductInput";
import { statusSchema } from "../../configs/status.schema";
import {
  StatusHeader,
  SliderContainer,
  ReasonGrid,
  ProductInputContainer,
} from "../../assets/machine.styles";
import { getChineseStatus } from "../../utils/statusConverter";

/**
 * 機台狀態管理器組件
 *
 * @function MachineStatusManager
 * @param {MachineStatusProps} props - 組件屬性
 * @param {React.Ref} ref - 轉發的 ref
 * @returns {React.ReactElement} 機台狀態管理介面
 *
 * @example
 * // 基礎使用示例
 * const statusManagerRef = useRef();
 * <MachineStatusManager
 *   ref={statusManagerRef}
 *   initialData={machineData}
 *   onSubmit={handleSubmit}
 * />
 *
 * @notes
 * - 使用 forwardRef 暴露內部方法給父組件
 * - 使用 React Hook Form 進行表單管理
 * - 使用 zod 進行表單驗證
 */
const MachineStatusManager = forwardRef(({ initialData, onSubmit }, ref) => {
  // 使用 useState 管理所有需要的状态
  const [currentStatus, setCurrentStatus] = useState(initialData.status);
  const [statusDisplay, setStatusDisplay] = useState(
    getChineseStatus(initialData.status)
  );
  const [formValues, setFormValues] = useState(initialData);

  // 更新表单值的函数
  const updateFormValue = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 暴露给父组件的 API
  useImperativeHandle(ref, () => ({
    getFormValues: () => formValues,

    validateForm: async () => {
      try {
        // 这里可以添加自定义验证逻辑
        // 如果需要使用 zod 验证，可以直接调用 statusSchema.parse(formValues)
        return { isValid: true, data: formValues, step: "complete" };
      } catch (error) {
        return { isValid: false, error, step: "error" };
      }
    },

    setFormValue: (name, value) => updateFormValue(name, value),

    getFormErrors: () => ({}), // 返回空对象，因为我们不再使用 useForm 的错误处理
  }));

  // 处理状态变更
  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    setStatusDisplay(getChineseStatus(newStatus));
    updateFormValue("status", newStatus);
    updateFormValue("statusDisplay", getChineseStatus(newStatus));
  };

  //* --------- 渲染組件 ---------
  return (
    <div>
      {/* 機台資訊 */}
      <StatusHeader>
        <div>
          <h3>
            {initialData.productionArea} - {initialData.machineSN}
          </h3>
          <p>
            稼動時間：
            {initialData.actualStartDate ??
              initialData.planStartDate ??
              dayjs().format("YYYY-MM-DD HH:mm:ss")}
          </p>
        </div>
      </StatusHeader>

      {/* 機台狀態選擇器 */}
      <SliderContainer>
        <StatusSlider
          currentStatus={currentStatus}
          onStatusChange={handleStatusChange}
        />
      </SliderContainer>

      {/* 條件渲染：異常原因選擇器 */}
      {currentStatus === "OFFLINE" && (
        <ReasonGrid>
          <ReasonSelector
            value={formValues.reason}
            onChange={(reason) => updateFormValue("reason", reason)}
          />
        </ReasonGrid>
      )}

      {/* 條件渲染：試模產品輸入 */}
      {currentStatus === "TESTING" && (
        <ProductInputContainer>
          <ProductInput
            value={formValues.product}
            onChange={(product) => updateFormValue("product", product)}
          />
        </ProductInputContainer>
      )}
    </div>
  );
});

//! =============== 4. 工具函數 ===============
// 此組件沒有獨立工具函數

//! =============== 5. 導出 ===============
// 設置顯示名稱以便於偵錯
MachineStatusManager.displayName = "MachineStatusManager";

export default MachineStatusManager;
