/**
 * @file MachineStatusManager.jsx
 * @description 機台狀態管理器 - 協調不同狀態表單的顯示與資料處理
 * @version 2.0.0
 */

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { useForm, FormProvider } from "react-hook-form";
import { Box } from "@mui/material";

// 導入狀態常量
import { MACHINE_STATUS } from "../../configs/validations/schedule/constants";

// 導入狀態轉換工具
import { getChineseStatus } from "../../utils/statusConverter";

// 導入狀態選擇器
import StatusSlider from "./StatusSlider";

// 導入各狀態的表單組件
import IdleForm from "./forms/IdleForm";
import SetupForm from "./forms/SetupForm";
import StoppedForm from "./forms/StoppedForm";
import TestingForm from "./forms/TestingForm";

// 導入樣式
import { StatusHeader, SliderContainer } from "../../assets/machine.styles";

/**
 * 機台狀態管理器
 *
 * @component MachineStatusManager
 * @param {Object} props - 組件屬性
 * @param {Object} props.initialData - 初始數據
 * @param {Function} props.onSubmit - 提交回調
 * @param {string|number} props.machineId - 機台ID (可選)
 * @param {Object} ref - 轉發的ref，用於暴露內部方法
 * @returns {React.ReactElement}
 */
const MachineStatusManager = forwardRef(
  ({ initialData, onSubmit, machineId }, ref) => {
    // 預設值
    const defaultStatus = useMemo(
      () => initialData?.status || MACHINE_STATUS.IDLE,
      [initialData]
    );

    // 🧠 管理狀態
    const [currentStatus, setCurrentStatus] = useState(defaultStatus);
    const [statusDisplay, setStatusDisplay] = useState(
      getChineseStatus(defaultStatus)
    );

    // 💡 使用refs存儲子表單引用
    const formRefs = {
      [MACHINE_STATUS.IDLE]: useRef(null),
      [MACHINE_STATUS.SETUP]: useRef(null),
      [MACHINE_STATUS.STOPPED]: useRef(null),
      [MACHINE_STATUS.TESTING]: useRef(null),
    };

    // 表單默認值 - 使用 useMemo 避免重复計算
    const defaultValues = useMemo(
      () => ({
        status: defaultStatus,
        statusDisplay: getChineseStatus(defaultStatus),
        ...initialData,
      }),
      [defaultStatus, initialData]
    );

    // 建立表單方法
    const methods = useForm({
      defaultValues,
    });

    // 當初始數據更新時，更新表單值
    // 避免重複渲染，使用 isMounted 標記
    useEffect(() => {
      let isMounted = true;
      if (initialData && isMounted) {
        methods.reset(defaultValues);
      }
      return () => {
        isMounted = false;
      };
    }, [initialData, methods, defaultValues]);

  // 處理狀態變更 - 直接定義，不使用 useCallback
  // newStatus 是中文狀態，如："試模"、"異常"、"調機"、"待機"
  const handleStatusChange = (chineseStatus) => {
    console.log(`渲染表單 - 狀態切換前: ${currentStatus}, 切換後中文: ${chineseStatus}`);
    
    // 從中文狀態尋找對應的 MACHINE_STATUS 英文狀態
    const newStatus = Object.values(MACHINE_STATUS).find(status => {
      return status === chineseStatus || getChineseStatus(status) === chineseStatus;
    }) || MACHINE_STATUS.IDLE;
    
    console.log(`從中文狀態 [${chineseStatus}] 尋找對應的英文狀態: [${newStatus}]`);
    
    // 取消任何正在進行的事件
    setTimeout(() => {
      // 先更新狀態與顯示文字
      setCurrentStatus(newStatus);
      setStatusDisplay(chineseStatus);
      
      // 强制重置表單
      methods.reset({
        status: newStatus,
        statusDisplay: chineseStatus,
        ...initialData
      });
      
      // 確保表單值更新
      methods.setValue("status", newStatus, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      methods.setValue("statusDisplay", chineseStatus, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      
      // 清理所有表單引用
      Object.keys(formRefs).forEach(key => {
        const formRef = formRefs[key]?.current;
        if (formRef && typeof formRef.reset === "function") {
          formRef.reset();
        }
      });
      
      console.log(`狀態已更新為: ${newStatus} (${chineseStatus})`);
    }, 0);
  };

    // 獲取當前激活表單的ref
    const getActiveFormRef = useCallback(() => {
      return formRefs[currentStatus] || null;
    }, [currentStatus, formRefs]);

    // 表單驗證和獲取值
    const validateAndGetValues = useCallback(async () => {
      const activeForm = getActiveFormRef()?.current;

      if (!activeForm) {
        // 如果沒有活動表單，則僅驗證主表單
        const isMainValid = await methods.trigger();
        return {
          isValid: isMainValid,
          values: isMainValid ? methods.getValues() : null,
          errors: isMainValid ? null : methods.formState.errors,
        };
      }

      try {
        // 如果有活動表單，則同時驗證主表單和子表單
        const isMainValid = await methods.trigger();

        // 驗證子表單 (如果有validate方法)
        if (typeof activeForm.validate === "function") {
          const childResult = await activeForm.validate();

          if (!childResult.isValid) {
            return {
              isValid: false,
              values: null,
              errors: childResult.errors,
            };
          }
        }

        // 如果主表單和子表單都有效，合併值
        if (isMainValid) {
          const mainValues = methods.getValues();
          const childValues =
            typeof activeForm.getValues === "function"
              ? activeForm.getValues()
              : {};

          return {
            isValid: true,
            values: { ...mainValues, ...childValues },
            errors: null,
          };
        } else {
          return {
            isValid: false,
            values: null,
            errors: methods.formState.errors,
          };
        }
      } catch (error) {
        console.error("表單驗證錯誤:", error);
        return {
          isValid: false,
          values: null,
          errors: error,
        };
      }
    }, [methods, getActiveFormRef]);

    // 提交表單
    const handleSubmit = useCallback(async () => {
      const { isValid, values } = await validateAndGetValues();

      if (!isValid || !values) {
        return false;
      }

      try {
        // 調用外部提交函數
        await onSubmit({
          ...values,
          machineId: machineId || initialData?.machineId,
        });
        return true;
      } catch (error) {
        console.error("提交失敗:", error);
        return false;
      }
    }, [validateAndGetValues, onSubmit, machineId, initialData]);

    // 重置表單
    const resetForm = useCallback(() => {
      methods.reset({
        status: initialData?.status || MACHINE_STATUS.IDLE,
        statusDisplay: getChineseStatus(
          initialData?.status || MACHINE_STATUS.IDLE
        ),
        ...initialData,
      });

      const activeForm = getActiveFormRef()?.current;
      if (activeForm && typeof activeForm.reset === "function") {
        activeForm.reset();
      }
    }, [methods, initialData, getActiveFormRef]);

    // 暴露方法給父組件
    useImperativeHandle(
      ref,
      () => ({
        getFormValues: () => {
          const mainValues = methods.getValues();

          // 獲取子表單值 (如果有)
          const activeForm = getActiveFormRef()?.current;
          const childValues =
            activeForm && typeof activeForm.getValues === "function"
              ? activeForm.getValues()
              : {};

          return { ...mainValues, ...childValues };
        },

        validateForm: validateAndGetValues,

        submit: handleSubmit,

        reset: resetForm,

        getCurrentStatus: () => currentStatus,

        setFormValue: (name, value) => {
          methods.setValue(name, value, { shouldValidate: true });
        },
      }),
      [
        currentStatus,
        methods,
        validateAndGetValues,
        handleSubmit,
        resetForm,
        getActiveFormRef,
      ]
    );

  // 渲染對應狀態的表單組件
  // 不使用 useCallback 避免緩存問題
  const renderStatusForm = () => {
    // 使用直接引用狀態，且確保打印變量的確切種類
    console.log(`渲染表單，當前狀態(種類: ${typeof currentStatus}): ${currentStatus}`);
    console.log(`MACHINE_STATUS.IDLE = ${MACHINE_STATUS.IDLE}`);
    console.log(`MACHINE_STATUS.SETUP = ${MACHINE_STATUS.SETUP}`);
    console.log(`MACHINE_STATUS.STOPPED = ${MACHINE_STATUS.STOPPED}`);
    console.log(`MACHINE_STATUS.TESTING = ${MACHINE_STATUS.TESTING}`);
    
    // 強制使用当前的狀態作為 key
    const formKey = `form-${currentStatus}-${Date.now()}`;
    
    const commonProps = {
      initialData,
      key: formKey, // 使用唯一的 key 確保每次都重新渲染
    };

    // 使用確切的字符串比較而不是參考比較
    switch (String(currentStatus)) {
      case String(MACHINE_STATUS.IDLE):
        console.log(`渲染 IDLE 表單`);
        return (
          <IdleForm ref={formRefs[MACHINE_STATUS.IDLE]} {...commonProps} />
        );
      case String(MACHINE_STATUS.SETUP):
        console.log(`渲染 SETUP 表單`);
        return (
          <SetupForm ref={formRefs[MACHINE_STATUS.SETUP]} {...commonProps} />
        );
      case String(MACHINE_STATUS.STOPPED):
        console.log(`渲染 STOPPED 表單`);
        return (
          <StoppedForm
            ref={formRefs[MACHINE_STATUS.STOPPED]}
            {...commonProps}
          />
        );
      case String(MACHINE_STATUS.TESTING):
        console.log(`渲染 TESTING 表單`);
        return (
          <TestingForm
            ref={formRefs[MACHINE_STATUS.TESTING]}
            {...commonProps}
          />
        );
      default:
        console.log(`沒有匹配的表單，默認渲染 IDLE`);
        return (
          <IdleForm ref={formRefs[MACHINE_STATUS.IDLE]} {...commonProps} />
        );
    }
  };

    return (
      <FormProvider {...methods}>
        <Box>
          {/* 機台資訊 */}
          <StatusHeader>
            <div>
              <h3>
                {initialData?.productionArea || ""} -{" "}
                {initialData?.machineSN || ""}
              </h3>
              <p>
                稼動時間：
                {initialData?.actualStartDate ??
                  initialData?.planStartDate ??
                  new Date().toLocaleString()}
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

          {/* 渲染狀態特定的表單 */}
          {renderStatusForm()}
        </Box>
      </FormProvider>
    );
  }
);

MachineStatusManager.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  machineId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MachineStatusManager.defaultProps = {
  initialData: {},
};

// 設定組件顯示名稱
MachineStatusManager.displayName = "MachineStatusManager";

export default MachineStatusManager;
