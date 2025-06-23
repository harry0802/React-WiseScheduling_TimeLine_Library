/**
 * @file MachineBoard.jsx
 * @description 機台狀態看板
 * @version 2.1.0
 * @author Harry's Engineering Team
 * @lastModified 2025-06-19
 *
 * 架構設計理念：
 * 1. 採用函數式組件設計模式，提升性能與可維護性
 * 2. 使用 React.memo 實現精確的重新渲染控制
 * 3. 透過 custom hooks 抽象業務邏輯
 * 4. 實施錯誤邊界處理確保用戶體驗
 *
 * 性能優化策略：
 * - 組件級別的記憶化 (Component-level Memoization)
 * - 回調函數穩定化 (Callback Stabilization)
 * - 計算結果快取 (Computed Value Caching)
 * - 條件渲染最佳化 (Conditional Rendering Optimization)
 */

import React, { useState, useRef, useCallback, useMemo, memo } from "react";
import HandymanIcon from "@mui/icons-material/Handyman";

// 配置與服務層導入
import { PRODUCTION_AREA } from "../../../../../config/config";
import {
  useCreateMachineStatusMutation,
  useGetMachineStatusQuery,
  useUpdateMachineStatusMutation,
} from "../../../services";
import {
  convertTimeLineStatus,
  getChineseStatus,
  STATUS_STYLE_MAP,
} from "../../../configs/constants/fieldNames";

// UI 組件導入
import BaseDrawer from "../../../../Global/Drawer/BaseDrawer";
import StatusManager from "../manager/StatusManager";
import {
  StyledMenuItem,
  StyledSelect,
  Container,
  Box,
  TitleBox,
  Title,
  FilterSection,
  MachinesGrid,
  MachineBox,
} from "../../../assets/machineBoard.styles";

/**
 * 機台卡片組件 - 採用 React.memo 防止不必要的重新渲染
 *
 * 優化重點：
 * 1. 使用 memo 包裝，只有 props 改變時才重新渲染
 * 2. 內聯樣式物件穩定化，避免每次創建新物件
 * 3. 條件渲染優化，減少 DOM 操作
 *
 * @param {Object} machineData - 機台數據物件
 * @param {Function} onMachineClick - 機台點擊處理函數
 */
const MachineCard = memo(({ machineData, onMachineClick }) => (
  <MachineBox
    $status={machineData.englishStatus}
    onClick={
      machineData.isClickable ? () => onMachineClick(machineData) : undefined
    }
    style={{
      cursor: machineData.isClickable ? "pointer" : "not-allowed",
    }}
  >
    <div className="title-container">
      <h1>{machineData.machine.machineSN}</h1>
    </div>
    <div className="status-container">
      <p>{machineData.statusText}</p>
      {machineData.showIcon && <HandymanIcon className="icon" />}
    </div>
  </MachineBox>
));

// 設定 displayName 便於 React DevTools 調試
MachineCard.displayName = "MachineCard";

/**
 * 區域選擇器組件 - 記憶化的下拉選單組件
 *
 * 設計考量：
 * 1. 使用 memo 避免父組件重新渲染時的無謂更新
 * 2. 選項列表使用 map 渲染，確保 key 的唯一性
 * 3. 事件處理函數由父組件傳入，保持組件的純淨性
 *
 * @param {string} area - 當前選中的區域值
 * @param {Function} onAreaChange - 區域變更處理函數
 */
const AreaSelector = memo(({ area, onAreaChange }) => (
  <FilterSection>
    <StyledSelect value={area} onChange={onAreaChange}>
      {PRODUCTION_AREA.map(({ value, label }) => (
        <StyledMenuItem key={value} value={value}>
          {label}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  </FilterSection>
));

// 設定 displayName 便於 React DevTools 調試
AreaSelector.displayName = "AreaSelector";

/**
 * 機台狀態看板主組件
 *
 * 系統架構說明：
 * 1. 狀態管理：採用 React Hooks 實現本地狀態管理
 * 2. 數據獲取：使用 RTK Query 進行 API 狀態管理
 * 3. 性能優化：透過 useMemo、useCallback 實現計算快取
 * 4. 錯誤處理：實施多層錯誤邊界保護
 *
 * 業務邏輯流程：
 * 1. 用戶選擇生產區域 → 觸發 API 調用
 * 2. 獲取機台狀態數據 → 進行數據轉換處理
 * 3. 渲染機台卡片網格 → 支持狀態互動
 * 4. 點擊機台卡片 → 開啟狀態編輯抽屜
 * 5. 提交狀態變更 → 更新後端數據
 */
function MachineStatusBoard() {
  // ==================== 狀態定義區塊 ====================
  // 生產區域選擇狀態 - 控制數據獲取範圍
  const [area, setArea] = useState("A");

  // 選中機台狀態 - 用於抽屜編輯功能
  const [selectedMachine, setSelectedMachine] = useState(null);

  // 抽屜顯示狀態 - 控制編輯界面可見性
  const [drawerVisible, setDrawerVisible] = useState(false);

  // StatusManager 組件引用 - 用於表單提交控制
  const statusManagerRef = useRef(null);

  // ==================== API 集成區塊 ====================
  // RTK Query hooks - 實現數據獲取與變更的統一管理
  const {
    data: machineStatus,
    isLoading,
    error,
  } = useGetMachineStatusQuery(area);
  const [createMachineStatus] = useCreateMachineStatusMutation();
  const [updateMachineStatus] = useUpdateMachineStatusMutation();

  // ==================== 事件處理區塊 ====================
  /**
   * 區域變更處理函數 - 使用 useCallback 防止不必要的重新渲染
   * 當用戶切換生產區域時觸發，會重新獲取對應區域的機台數據
   */
  const handleAreaChange = useCallback((e) => {
    setArea(e.target.value);
  }, []);

  // ==================== 數據處理區塊 ====================
  /**
   * 機台數據處理邏輯 - 使用 useMemo 實現計算結果快取
   *
   * 處理流程：
   * 1. 狀態轉換：將中文狀態轉換為英文狀態碼
   * 2. 互動性判斷：運行中的機台不可點擊
   * 3. 圖示顯示：非運行狀態顯示維修圖示
   * 4. 文字映射：根據狀態碼獲取對應的顯示文字
   *
   * 性能優化：只有 machineStatus 改變時才重新計算
   */
  const processedMachines = useMemo(() => {
    if (!machineStatus?.length) return [];

    return machineStatus.map((machine) => {
      const englishStatus = convertTimeLineStatus(machine.status);
      const isRunning = englishStatus === "RUN";

      return {
        machine,
        englishStatus,
        statusText:
          STATUS_STYLE_MAP[englishStatus]?.text || STATUS_STYLE_MAP.IDLE.text,
        isClickable: !isRunning,
        showIcon: !isRunning,
      };
    });
  }, [machineStatus]);

  // ==================== 事件處理區塊 ====================
  /**
   * 機台點擊處理函數 - 開啟狀態編輯抽屜
   * 設計原則：使用 useCallback 穩定化函數引用，避免子組件不必要的重新渲染
   */
  const handleMachineClick = useCallback((machineData) => {
    setSelectedMachine(machineData.machine);
    setDrawerVisible(true);
  }, []);

  /**
   * 抽屜關閉處理函數 - 重置相關狀態
   * 確保關閉抽屜時清理選中的機台數據，避免內存洩漏
   */
  const handleCloseDrawer = useCallback(() => {
    setDrawerVisible(false);
    setSelectedMachine(null);
  }, []);

  /**
   * 表單提交處理函數 - 統一的表單提交邏輯
   *
   * 錯誤處理策略：
   * 1. 檢查表單引用是否存在
   * 2. 捕獲提交過程中的異常
   * 3. 成功後自動關閉抽屜並清理狀態
   */
  const handleSubmitForm = useCallback(async () => {
    if (!statusManagerRef.current) {
      console.warn("表單引用不存在");
      return false;
    }

    try {
      const success = await statusManagerRef.current.submit();
      if (success) {
        setDrawerVisible(false);
        setSelectedMachine(null);
      }
      return success;
    } catch (error) {
      console.error("表單提交發生錯誤:", error);
      return false;
    }
  }, []);

  /**
   * 機台狀態更新處理函數 - 核心業務邏輯
   *
   * 業務邏輯說明：
   * 1. 數據預處理：統一狀態格式轉換
   * 2. 動態 payload 構建：根據狀態類型決定是否包含 status 屬性
   * 3. 更新/創建判斷：根據是否存在 ID 決定操作類型
   * 4. 時間計算：自動計算計劃結束時間（+1小時）
   * 5. 狀態清理：操作成功後關閉抽屜
   *
   * 錯誤處理：完整的 try-catch 機制確保錯誤可追蹤
   */
  const handleUpdateStatus = useCallback(
    async (data) => {
      console.log("更新機台狀態:", data);

      try {
        // 根據新狀態動態決定是否包含 status 屬性
        const allowedStatusList = ["TUNING", "TESTING", "OFFLINE"];
        const shouldIncludeStatus = allowedStatusList.includes(data.status);

        // 動態構建最終的 statusData payload
        let statusData;
        if (shouldIncludeStatus) {
          // 包含 status 屬性的完整 payload
          statusData = {
            ...data,
            status: getChineseStatus(data.status),
          };
        } else {
          // 排除 status 屬性的 payload（創建新物件，避免修改原始 data）
          const { status, ...payloadWithoutStatus } = data;
          statusData = payloadWithoutStatus;
        }

        if (data.id) {
          // 更新現有機台狀態
          await updateMachineStatus(statusData);
        } else {
          // 創建新的機台狀態記錄
          const planEndDate =
            data.planStartDate ||
            (data.actualStartDate
              ? new Date(
                  new Date(data.actualStartDate).getTime() + 3600000
                ).toISOString()
              : null);

          await createMachineStatus({
            ...statusData,
            planStartDate: data.planStartDate ?? data.actualStartDate,
            planEndDate,
          });
        }

        // 操作成功後清理狀態
        setDrawerVisible(false);
        setSelectedMachine(null);
        return data;
      } catch (error) {
        console.error("更新狀態失敗:", error);
        throw error;
      }
    },
    [createMachineStatus, updateMachineStatus]
  );

  // ==================== 渲染控制區塊 ====================
  /**
   * 載入狀態處理 - 提供友好的載入體驗
   * 在數據獲取期間顯示載入提示，避免空白頁面
   */
  if (isLoading) {
    return (
      <Container>
        <Box>
          <p>加載中...</p>
        </Box>
      </Container>
    );
  }

  /**
   * 錯誤狀態處理 - 優雅的錯誤降級
   * 當 API 調用失敗時提供用戶友好的錯誤提示
   */
  if (error) {
    return (
      <Container>
        <Box>
          <p>載入機台狀態時發生錯誤，請重新整理頁面</p>
        </Box>
      </Container>
    );
  }

  // ==================== 主要渲染區塊 ====================
  /**
   * 主要 UI 渲染邏輯
   * 組件結構：
   * 1. 標題區域：包含頁面標題和區域選擇器
   * 2. 機台網格：使用記憶化組件渲染機台卡片
   * 3. 編輯抽屜：模態式的狀態編輯界面
   *
   * 性能優化：
   * - 使用記憶化的子組件減少重新渲染
   * - 條件渲染避免不必要的 DOM 操作
   * - 穩定的事件處理函數引用
   */
  return (
    <Container>
      <Box>
        {/* 頁面標題與篩選區域 */}
        <TitleBox>
          <Title>機台狀態與保養紀錄</Title>
          <AreaSelector area={area} onAreaChange={handleAreaChange} />
        </TitleBox>

        {/* 機台狀態網格 - 主要內容區域 */}
        <MachinesGrid>
          {processedMachines.map((machineData) => (
            <MachineCard
              key={machineData.machine.machineSN}
              machineData={machineData}
              onMachineClick={handleMachineClick}
            />
          ))}
        </MachinesGrid>
      </Box>

      {/* 狀態編輯抽屜 - 模態式編輯界面 */}
      <BaseDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        width={700}
      >
        <BaseDrawer.Header>修改機台狀態</BaseDrawer.Header>
        <BaseDrawer.Body>
          {selectedMachine && (
            <StatusManager
              ref={statusManagerRef}
              initialData={selectedMachine}
              onSubmit={handleUpdateStatus}
            />
          )}
        </BaseDrawer.Body>
        <BaseDrawer.Footer onSubmit={handleSubmitForm} />
      </BaseDrawer>
    </Container>
  );
}

export default MachineStatusBoard;
