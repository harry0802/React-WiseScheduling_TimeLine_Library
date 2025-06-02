/**
 * @file index.jsx
 * @description 動態時間線組件，實現工業級生產排程管理功能
 * @version 8.0.0 - 認知負荷優化版本
 * @author 資深前端開發團隊
 * @lastModified 2025-05-29
 *
 * @features
 * - 高效能 vis-timeline 整合，避免重複渲染
 * - 支援多區域生產排程管理
 * - 即時數據同步與狀態管理
 * - 響應式時間範圍控制
 *
 * @performance
 * - 使用 ref 保持 timeline 實例穩定
 * - memo 化關鍵組件避免重渲染
 * - 批次數據處理減少 API 調用
 */

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置，便於統一管理和維護

//* 基礎 React Hooks - 核心狀態管理工具
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

//* UI 元件 - Material-UI 基礎組件
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

//* 時間線核心庫 - vis-timeline 主要功能
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.css";

//* 🏭 工廠友善字體樣式 - 簡單字體放大
import "../../assets/schedule/simpleFactoryFonts.css";

//* 時間處理庫 - 多語言日期處理
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import moment from "moment";

//* 自定義組件 - 本專案核心組件
import TimelineControls from "./TimelineControls";
import DialogPortals from "./dialogs/DialogPortals";
import "./styles/industrialTheme"; // 工業風格主題

//* API 服務層 - 數據獲取與狀態管理
import { useGetSmartScheduleQuery } from "../../services/schedule/smartSchedule";
import { useGetMachinesQuery } from "../../../QuotationManagementSystem/services/salesServices/endpoints/machineApi";

//* 樣式配置 - 組件外觀控制
import { TimelineContainer } from "../../assets/schedule";

//* 配置常量 - 系統設定與驗證規則
import { momentLocaleConfig } from "../../configs/validations/schedule/timeline/timelineLocale";
import { TIME_RANGES } from "../../configs/validations/schedule/timeline/timelineConfigs";
import { MACHINE_CONFIG } from "../../configs/validations/schedule/constants";

//* 自定義 Hooks - 業務邏輯封裝
import { useTimelineData } from "../../hooks/schedule/useTimelineData";
import { useTimelineConfig } from "../../hooks/schedule/useTimelineConfig";
import { useTimelineDialogs } from "../../hooks/schedule/useTimelineDialogs";
import useTimeRange from "../../hooks/schedule/useTimeRange";

//* 工具模組 - 通用功能函數
import { setGroups } from "./DialogManager";
import { getTimeWindow } from "../../utils/schedule/dateUtils";

//! =============== 2. 類型與介面 ===============
//* 定義所有資料結構和業務邏輯 Hook，幫助理解資料流向

/**
 * @function useLocaleInitialization
 * @description 初始化多語言設定，確保日期顯示正確
 * @returns {void}
 *
 * @example
 * // 組件載入時自動執行
 * useLocaleInitialization();
 *
 * @notes
 * - 同時設定 dayjs 和 moment 的中文語系
 * - 確保時間線顯示使用正確的中文格式
 */
function useLocaleInitialization() {
  useEffect(() => {
    // 設定 dayjs 中文語系
    dayjs.locale("zh-tw");

    // 設定 moment 中文語系配置
    if (moment) {
      moment.updateLocale("zh-tw", momentLocaleConfig);
    }
  }, []);
}

/**
 * @function useAreaScheduleData
 * @description 獲取特定區域的智能排程數據
 * @param {string} area - 區域代碼，例如 "A"、"B" 等
 * @param {string|null} startTime - 開始時間 (ISO string)
 * @param {string|null} endTime - 結束時間 (ISO string)
 * @returns {Object} { isSuccess, isLoading, scheduleList }
 *
 * @example
 * // 基礎使用
 * const { scheduleList } = useAreaScheduleData("A");
 *
 * // 帶時間範圍
 * const { scheduleList, isLoading } = useAreaScheduleData(
 *   "B",
 *   "2025-01-01T00:00:00Z",
 *   "2025-01-31T23:59:59Z"
 * );
 *
 * @notes
 * - 自動過濾指定區域的數據
 * - 支援時間範圍查詢優化性能
 * - 返回的數據已經過處理，可直接使用
 *
 * @commonErrors
 * - area 參數為空時返回空陣列
 * - API 請求失敗時 scheduleList 為空陣列
 */
function useAreaScheduleData(area = "A", startTime = null, endTime = null) {
  //! API 查詢 - 核心數據獲取
  const {
    isSuccess,
    isLoading,
    data: scheduleData,
  } = useGetSmartScheduleQuery({
    productionArea: area,
    startTime,
    endTime,
  });

  //* 數據處理 - 過濾和轉換邏輯
  const scheduleList = useMemo(() => {
    if (!scheduleData?.data) return [];

    // 過濾指定區域的數據
    return scheduleData.data.filter((item) => item.productionArea === area);
  }, [scheduleData, area]);

  return {
    isSuccess,
    isLoading,
    scheduleList,
  };
}

/**
 * @function useAreaMachines
 * @description 獲取特定區域的機台設備數據
 * @param {string} area - 區域代碼
 * @returns {Object} { isSuccess, isLoading, allArea, filteredMachines }
 *
 * @example
 * // 基礎使用
 * const { filteredMachines } = useAreaMachines("A");
 *
 * @notes
 * - 從所有機台中過濾出指定區域的設備
 * - 保留原始數據供其他組件使用
 * - 自動處理載入狀態
 */
function useAreaMachines(area = "A") {
  //! 機台數據獲取 - 系統設備資訊
  const { isSuccess, isLoading, data: allArea } = useGetMachinesQuery();

  //* 區域過濾 - 指定區域機台篩選
  const filteredMachines = useMemo(
    () => allArea?.data?.filter((machine) => machine.productionArea === area),
    [allArea, area]
  );

  return {
    isSuccess,
    isLoading,
    allArea,
    filteredMachines,
  };
}

//! =============== 3. 核心功能 ===============
//* 主要業務邏輯區，每個功能都配有詳細說明

/**
 * @function TimelinePaper
 * @description 時間線容器組件，使用 memo 優化性能
 * @param {Object} props - 組件屬性
 * @param {React.RefObject} props.containerRef - 時間線容器引用
 * @returns {React.Component} 時間線紙張容器
 *
 * @example
 * <TimelinePaper containerRef={containerRef} />
 *
 * @notes
 * - 使用 React.memo 避免不必要重渲染
 * - 固定樣式確保時間線正確顯示
 * - 最小高度 600px 保證可視性
 */
function TimelinePaperComponent({ containerRef }) {
  return (
    <Paper
      ref={containerRef}
      elevation={1}
      sx={{
        width: "100%",
        flexGrow: 1,
        minHeight: "600px",
        border: 1,
        borderColor: "grey.200",
        borderRadius: 1,
      }}
    />
  );
}

const TimelinePaper = React.memo(TimelinePaperComponent);
TimelinePaper.displayName = "TimelinePaper";

/**
 * @function useTimelineInitialization
 * @description 處理時間線初始化和事件綁定邏輯
 * @param {Object} params - 初始化參數
 * @param {React.RefObject} params.containerRef - 容器引用
 * @param {React.RefObject} params.timelineRef - 時間線引用
 * @param {React.RefObject} params.itemsDataRef - 數據引用
 * @param {Array} params.groups - 分組數據
 * @param {Function} params.getTimelineOptions - 選項獲取函數
 * @param {Function} params.handleEditItem - 項目編輯處理
 * @returns {void}
 *
 * @notes
 * - 整合時間線初始化、事件綁定和清理操作
 * - 設置雙擊編輯事件監聽
 * - 確保 DialogManager 同步分組數據
 * - 提供調試接口（開發環境）
 */
function useTimelineInitialization({
  containerRef,
  timelineRef,
  itemsDataRef,
  groups,
  getTimelineOptions,
  handleEditItem,
}) {
  useEffect(() => {
    //? 初始化條件檢查 - 可能需要更嚴格的驗證
    if (!containerRef.current || !itemsDataRef.current || !groups) return;

    // 清空容器準備重新初始化
    containerRef.current.innerHTML = "";

    // 獲取時間線配置選項
    const options = getTimelineOptions();

    //! 創建時間線實例 - 核心功能初始化
    timelineRef.current = new Timeline(
      containerRef.current,
      itemsDataRef.current,
      groups,
      options
    );

    //* 事件監聽設置 - 雙擊編輯功能
    timelineRef.current.on("doubleClick", (properties) => {
      if (!properties.item) return;
      const item = itemsDataRef.current.get(properties.item);
      if (item) {
        handleEditItem(item);
      }
    });

    //TODO 調試接口 - 生產環境應移除
    if (process.env.NODE_ENV === "development") {
      window.timeline = timelineRef.current;
      if (!window.app) window.app = {};
      window.app.timelineData = itemsDataRef.current;
    }

    //* DialogManager 同步 - 確保對話框正確顯示
    if (groups) {
      setGroups(groups);
    }

    //! 清理函數 - 防止記憶體洩漏
    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
        timelineRef.current = null;
      }
    };
  }, [containerRef, itemsDataRef, groups, getTimelineOptions, handleEditItem]);
}

/**
 * @function useMoveToNowHandler
 * @description 處理移動到當前時間的邏輯
 * @param {React.RefObject} timelineRef - 時間線引用
 * @param {string} timeRange - 時間範圍設定
 * @param {Function} dialogMoveToNow - 對話框的移動函數
 * @returns {Function} 移動到現在的處理函數
 *
 * @notes
 * - 優先使用對話框提供的移動函數
 * - 備用實現確保功能可靠性
 * - 包含錯誤處理避免應用崩潰
 */
function useMoveToNowHandler(timelineRef, timeRange, dialogMoveToNow) {
  return useCallback(() => {
    //! 優先策略 - 使用對話框提供的函數
    if (dialogMoveToNow) {
      dialogMoveToNow();
      return;
    }

    //* 備用實現 - 直接操作時間線
    if (!timelineRef.current) return;

    try {
      const timeWindow = getTimeWindow(timeRange, dayjs());
      timelineRef.current.setWindow(
        timeWindow.start.toDate(),
        timeWindow.end.toDate(),
        { animation: true }
      );
    } catch (error) {
      console.error("移動到當前時間失敗:", error);
    }
  }, [timeRange, dialogMoveToNow, timelineRef]);
}

//! =============== 4. 工具函數 ===============
//* 通用功能區，可被多個模組復用

/**
 * @function formatTimeForInput
 * @description 將 ISO 時間字串格式化為 HTML input 可用格式
 * @param {string} isoString - ISO 格式時間字串
 * @returns {string} HTML datetime-local 格式字串
 *
 * @example
 * // 基本使用
 * const formatted = formatTimeForInput("2025-01-01T10:30:00.000Z");
 * // 結果: "2025-01-01T10:30"
 *
 * @notes
 * - 專門用於 HTML datetime-local input
 * - 自動處理空值情況
 * - 使用 dayjs 確保格式一致性
 */
function formatTimeForInput(isoString) {
  if (!isoString) return "";
  return dayjs(isoString).format("YYYY-MM-DDTHH:mm");
}

/**
 * @function handleTimeInputChange
 * @description 處理時間輸入變更，轉換格式並調用更新函數
 * @param {string} inputValue - HTML input 的時間值
 * @param {Function} setter - 狀態更新函數
 * @returns {void}
 *
 * @example
 * // 基本使用
 * handleTimeInputChange("2025-01-01T10:30", setStartTime);
 *
 * @notes
 * - 自動轉換為 ISO 格式
 * - 確保時間格式統一性
 */
function handleTimeInputChange(inputValue, setter) {
  const isoValue = dayjs(inputValue).toISOString();
  setter(isoValue);
}

/**
 * @function createTimeRangeOptions
 * @description 創建時間範圍選項陣列
 * @returns {Array} 時間範圍選項
 *
 * @example
 * const options = createTimeRangeOptions();
 * // 結果: [{ value: "day", label: "日" }, ...]
 */
function createTimeRangeOptions() {
  return Object.entries(TIME_RANGES).map(([key, config]) => ({
    value: key,
    label: config.label,
  }));
}

/**
 * @function createAreaOptions
 * @description 創建區域選項陣列
 * @returns {Array} 區域選項
 *
 * @example
 * const options = createAreaOptions();
 * // 結果: [{ value: "A", label: "A區" }, ...]
 */
function createAreaOptions() {
  return MACHINE_CONFIG.AREAS.map((area) => ({
    value: area,
    label: `${area}區`,
  }));
}

/**
 * @function useQuickTimeSelector
 * @description 處理快捷時間選擇邏輯
 * @param {Function} handleStartTimeChange - 開始時間更新函數
 * @param {Function} handleEndTimeChange - 結束時間更新函數
 * @returns {Function} 快捷時間選擇處理函數
 *
 * @example
 * const handleQuickSelect = useQuickTimeSelector(setStart, setEnd);
 * handleQuickSelect("today"); // 設定為今天
 *
 * @notes
 * - 支援今天、本週、本月、預設範圍
 * - 使用 dayjs 確保時間計算正確
 * - 自動處理時區問題
 */
function useQuickTimeSelector(handleStartTimeChange, handleEndTimeChange) {
  return useCallback(
    (type) => {
      const now = dayjs();

      switch (type) {
        case "today":
          handleStartTimeChange(now.startOf("day").toISOString());
          handleEndTimeChange(now.endOf("day").toISOString());
          break;
        case "week":
          handleStartTimeChange(now.startOf("week").toISOString());
          handleEndTimeChange(now.endOf("week").toISOString());
          break;
        case "month":
          handleStartTimeChange(now.startOf("month").toISOString());
          handleEndTimeChange(now.endOf("month").toISOString());
          break;
        case "default":
          const defaultStart = now
            .subtract(1, "month")
            .startOf("day")
            .toISOString();
          const defaultEnd = now.add(1, "month").endOf("day").toISOString();
          handleStartTimeChange(defaultStart);
          handleEndTimeChange(defaultEnd);
          break;
        default:
          break;
      }
    },
    [handleStartTimeChange, handleEndTimeChange]
  );
}

/**
 * @component DynamicTimeline
 * @description 動態時間線主組件，整合所有功能模組
 * @returns {React.Component} 完整的時間線界面
 *
 * @example
 * // 基本使用
 * <DynamicTimeline />
 *
 * @notes
 * - 整合數據獲取、時間線顯示、控制面板
 * - 支援多區域切換和時間範圍調整
 * - 包含完整的狀態管理和事件處理
 *
 * @performance
 * - 使用 memo 和 useCallback 優化渲染性能
 * - 避免 vis-timeline 實例重複創建
 * - 批次處理數據更新減少重渲染
 */
function DynamicTimeline() {
  //! 語言初始化 - 確保中文顯示正確
  useLocaleInitialization();

  //! 核心狀態管理 - 組件主要狀態
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [timeRange, setTimeRange] = useState("day");
  const [selectedArea, setSelectedArea] = useState("A");
  const [timePanelExpanded, setTimePanelExpanded] = useState(false);

  //* 時間範圍管理 - 自定義時間選擇
  const {
    timeRange: selectedTimeRange,
    formattedTimeRange,
    handleStartTimeChange,
    handleEndTimeChange,
  } = useTimeRange();

  //! 數據獲取 - API 數據層
  const { scheduleList } = useAreaScheduleData(
    selectedArea,
    formattedTimeRange.startTime,
    formattedTimeRange.endTime
  );
  const { filteredMachines } = useAreaMachines(selectedArea);

  //* 業務邏輯 Hooks - 核心功能封裝
  const { itemsDataRef, groups } = useTimelineData(
    filteredMachines,
    scheduleList
  );
  const { getTimelineOptions } = useTimelineConfig(itemsDataRef, timeRange);
  const {
    handleAddItem,
    handleEditItem,
    handleMoveToNow: dialogMoveToNow,
  } = useTimelineDialogs({
    itemsDataRef,
    groups,
    timelineRef,
    timeRange,
  });

  //* 事件處理函數 - 用戶互動邏輯
  const handleMoveToNow = useMoveToNowHandler(
    timelineRef,
    timeRange,
    dialogMoveToNow
  );
  const handleQuickTimeSelect = useQuickTimeSelector(
    handleStartTimeChange,
    handleEndTimeChange
  );

  //* 時間線初始化 - 核心組件設置
  useTimelineInitialization({
    containerRef,
    timelineRef,
    itemsDataRef,
    groups,
    getTimelineOptions,
    handleEditItem,
  });

  //* 選項數據 - UI 控制選項
  const timeRangeOptions = createTimeRangeOptions();
  const areaOptions = createAreaOptions();

  //! 主要渲染邏輯 - 組件 UI 結構
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <TimelineContainer>
        {/* 控制面板 - 用戶操作界面 */}
        <TimelineControls>
          {/* 主控制列 - 基本操作按鈕 */}
          <TimelineControls.Row>
            {/* 時間範圍選擇 */}
            <TimelineControls.ButtonGroup>
              {timeRangeOptions.map((option) => (
                <TimelineControls.TimeRangeButton
                  key={option.value}
                  value={option.value}
                  currentValue={timeRange}
                  onChange={setTimeRange}
                >
                  {option.label}
                </TimelineControls.TimeRangeButton>
              ))}
            </TimelineControls.ButtonGroup>

            {/* 操作控制 */}
            <TimelineControls.ButtonGroup>
              <TimelineControls.AreaSelect
                value={selectedArea}
                onChange={setSelectedArea}
                options={areaOptions}
                placeholder="選擇區域"
              />
              <TimelineControls.AddButton
                onClick={() => handleAddItem(null, selectedArea)}
              />
              <TimelineControls.NowButton onClick={handleMoveToNow} />
            </TimelineControls.ButtonGroup>
          </TimelineControls.Row>

          {/* 時間詳細設定面板 - 進階時間控制 */}
          <TimelineControls.Panel
            title="時間範圍設定"
            expanded={timePanelExpanded}
            onToggle={setTimePanelExpanded}
            info={
              formattedTimeRange.startTime && formattedTimeRange.endTime
                ? `${dayjs(formattedTimeRange.startTime).format(
                    "MM/DD"
                  )} - ${dayjs(formattedTimeRange.endTime).format("MM/DD")}`
                : "預設範圍"
            }
          >
            <TimelineControls.Row>
              {/* 精確時間輸入 */}
              <TimelineControls.ButtonGroup>
                <TimelineControls.TimeInput
                  label="開始"
                  value={formatTimeForInput(selectedTimeRange.startTime)}
                  onChange={(value) =>
                    handleTimeInputChange(value, handleStartTimeChange)
                  }
                />
                <TimelineControls.TimeInput
                  label="結束"
                  value={formatTimeForInput(selectedTimeRange.endTime)}
                  onChange={(value) =>
                    handleTimeInputChange(value, handleEndTimeChange)
                  }
                />
              </TimelineControls.ButtonGroup>

              {/* 快捷時間選擇 */}
              <TimelineControls.ButtonGroup>
                <TimelineControls.Button
                  onClick={() => handleQuickTimeSelect("today")}
                >
                  今天
                </TimelineControls.Button>
                <TimelineControls.Button
                  onClick={() => handleQuickTimeSelect("week")}
                >
                  本週
                </TimelineControls.Button>
                <TimelineControls.Button
                  onClick={() => handleQuickTimeSelect("month")}
                >
                  本月
                </TimelineControls.Button>
                <TimelineControls.Button
                  onClick={() => handleQuickTimeSelect("default")}
                >
                  預設範圍
                </TimelineControls.Button>
              </TimelineControls.ButtonGroup>
            </TimelineControls.Row>
          </TimelineControls.Panel>
        </TimelineControls>

        {/* 時間線顯示區域 */}
        <TimelinePaper containerRef={containerRef} />
      </TimelineContainer>

      {/* 對話框管理 - 彈窗功能 */}
      <DialogPortals />
    </Box>
  );
}

export default DynamicTimeline;

//* ========= 複雜邏輯解釋 =========
// 組件架構說明：
// 步驟 1: 語言初始化確保中文顯示正確
// 步驟 2: 核心狀態管理控制組件行為
// 步驟 3: 數據獲取層處理 API 請求和過濾
// 步驟 4: 業務邏輯 Hooks 封裝複雜功能
// 步驟 5: 事件處理函數管理用戶互動
// 步驟 6: 時間線初始化設置 vis-timeline 實例
// 注意事項：使用 ref 避免 vis-timeline 重複創建，提升性能

//* ========= 效能優化策略 =========
// 重型組件處理：
// 1. vis-timeline 實例使用 ref 保持穩定，避免重新創建
// 2. 通過 API 更新數據內容，不重新初始化組件
// 3. TimelinePaper 使用 React.memo 避免不必要重渲染
// 4. 所有事件處理函數使用 useCallback 包裝
// 5. 數據處理邏輯使用 useMemo 緩存結果

//! =============== 示例區塊 ===============
/**
 * @example 常見使用場景
 *
 * // 場景 1: 基本時間線顯示
 * function App() {
 *   return (
 *     <div>
 *       <DynamicTimeline />
 *     </div>
 *   );
 * }
 *
 * // 場景 2: 集成到更大的系統中
 * function ProductionDashboard() {
 *   return (
 *     <Layout>
 *       <Header />
 *       <DynamicTimeline />
 *       <Footer />
 *     </Layout>
 *   );
 * }
 *
 * // 場景 3: 多個時間線組件
 * function MultiAreaView() {
 *   return (
 *     <div>
 *       {AREAS.map(area => (
 *         <DynamicTimeline key={area} defaultArea={area} />
 *       ))}
 *     </div>
 *   );
 * }
 */
