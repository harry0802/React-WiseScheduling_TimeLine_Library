/**
 * @file MachineStatusManager.jsx
 * @description 機台狀態管理器組件，處理機台狀態表單和相關邏輯
 * @version 1.0.0
 */

//! =============== 1. 設定與常量 ===============
import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  //* --------- 表單初始化 ---------
  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(statusSchema),
    defaultValues: initialData,
  });

  //* --------- 表單狀態監聽 ---------
  //? 監聽 status 欄位以顯示條件式界面
  const status = form.watch("status");

  //* --------- Ref API 暴露 ---------
  /**
   * 通過 ref 暴露給父組件的 API
   * @type {FormAPI}
   */
  useImperativeHandle(ref, () => ({
    /**
     * 取得表單所有值
     * @returns {Object} 表單值物件
     */
    getFormValues: () => form.getValues(),

    /**
     * 觸發表單驗證並返回結果
     * @returns {Promise<Object>} 驗證結果物件
     */
    validateForm: async () => {
      try {
        const isValid = await form.trigger();
        return isValid
          ? { isValid: true, data: form.getValues(), step: "complete" }
          : { isValid: false, errors: form.formState.errors, step: "schema" };
      } catch (error) {
        return { isValid: false, error, step: "error" };
      }
    },

    /**
     * 設置表單欄位值
     * @param {string} name - 欄位名稱
     * @param {any} value - 欄位值
     */
    setFormValue: (name, value) => form.setValue(name, value),

    /**
     * 取得表單錯誤
     * @returns {Object} 表單錯誤物件
     */
    getFormErrors: () => form.formState.errors,
  }));

  //* --------- 渲染組件 ---------
  return (
    <FormProvider {...form}>
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
          <StatusSlider />
        </SliderContainer>

        {/* 條件渲染：異常原因選擇器 */}
        {status === "OFFLINE" && (
          <ReasonGrid>
            <ReasonSelector />
          </ReasonGrid>
        )}

        {/* 條件渲染：試模產品輸入 */}
        {status === "TESTING" && (
          <ProductInputContainer>
            <ProductInput />
          </ProductInputContainer>
        )}
      </div>
    </FormProvider>
  );
});

//! =============== 4. 工具函數 ===============
// 此組件沒有獨立工具函數

//! =============== 5. 導出 ===============
// 設置顯示名稱以便於偵錯
MachineStatusManager.displayName = "MachineStatusManager";

export default MachineStatusManager;
