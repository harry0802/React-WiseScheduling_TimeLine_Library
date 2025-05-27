/**
 * @file index.jsx
 * @description 動態時間線組件，實現生產排程管理功能
 * @version 7.3.0
 */

//! =============== 1. 設定與常量 ===============
//* 基礎 React Hooks
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

//* UI 元件
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.css";

//* 時間處理庫
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import moment from "moment";

//* 自定義元件
import TimelineControls from "./TimelineControls";
import DialogPortals from "./dialogs/DialogPortals";
import "./styles/industrialTheme"; // 引入工業風格主題

//* 服務與資料
import { useGetSmartScheduleQuery } from "../../services/schedule/smartSchedule";
import { useGetMachinesQuery } from "../../../QuotationManagementSystem/services/salesServices/endpoints/machineApi";

//* 樣式
import { TimelineContainer } from "../../assets/schedule";

//* 常量與配置
import { momentLocaleConfig } from "../../configs/validations/schedule/timeline/timelineLocale";
import { TIME_RANGES } from "../../configs/validations/schedule/timeline/timelineConfigs";
import { MACHINE_CONFIG } from "../../configs/validations/schedule/constants";

//* 自定義 Hook 與管理器
import { useTimelineData } from "../../hooks/schedule/useTimelineData";
import { useTimelineConfig } from "../../hooks/schedule/useTimelineConfig";
import { useTimelineDialogs } from "../../hooks/schedule/useTimelineDialogs";
import useTimeRange from "../../hooks/schedule/useTimeRange";
import { setGroups } from "./DialogManager";
import { getTimeWindow } from "../../utils/schedule/dateUtils";

//! =============== 2. 全局初始化設定 ===============
// 設定日期本地化
dayjs.locale("zh-tw");

// 設定 moment 本地化配置
if (moment) {
  moment.updateLocale("zh-tw", momentLocaleConfig);
}

/**
 * @function useAreaScheduleData
 * @description 獲取特定區域的排程數據，分別提取最新的製令單和機台狀態
 * @param {string} area - 區域代碼，例如 "A"、"B" 等
 * @param {string} startTime - 開始時間 (ISO string)
 * @param {string} endTime - 結束時間 (ISO string)
 * @returns {Object} 排程數據和加載狀態
 */
function useAreaScheduleData(area = "A", startTime = null, endTime = null) {
  // 🧠 API 查詢，獲取智能排程數據（包含時間範圍）
  const {
    isSuccess,
    isLoading,
    data: scheduleData,
  } = useGetSmartScheduleQuery({
    productionArea: area,
    startTime,
    endTime,
  });

  // ✨ 使用 useMemo 處理數據，避免重複計算
  const scheduleList = useMemo(() => {
    if (!scheduleData?.data) return [];

    // 過濾出指定區域的數據
    const areaData = scheduleData.data.filter(
      (item) => item.productionArea === area
    );

    // 只過濾 area，不進行進一步處理
    return areaData;
  }, [scheduleData, area]);

  return {
    isSuccess,
    isLoading,
    scheduleList,
  };
}

/**
 * @function useAreaMachines
 * @description 獲取特定區域的機台數據
 * @param {string} area - 區域代碼
 * @returns {Object} 機台數據和加載狀態
 */
function useAreaMachines(area = "A") {
  // 🧠 獲取所有機台數據
  const { isSuccess, isLoading, data: allArea } = useGetMachinesQuery();

  // ✨ 過濾特定區域的機台
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

/**
 * @component TimelinePaper
 * @description 時間線容器組件，使用 memo 避免不必要的重新渲染
 */
function TimelinePaperInner({ containerRef }) {
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
const TimelinePaper = React.memo(TimelinePaperInner);

// 確保顯示名稱，方便調試
TimelinePaper.displayName = "TimelinePaper";

/**
 * @component DynamicTimeline
 * @description 動態時間線組件，結合多個功能子組件實現生產排程管理功能
 */
function DynamicTimeline() {
  //! =============== 3. 狀態與引用 ===============
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [timeRange, setTimeRange] = useState("day");
  const [selectedArea, setSelectedArea] = useState("A");
  const [timePanelExpanded, setTimePanelExpanded] = useState(false); // 新增：面板展開狀態

  // 🔧 新增：時間範圍管理
  const {
    timeRange: selectedTimeRange,
    formattedTimeRange,
    handleStartTimeChange,
    handleEndTimeChange,
  } = useTimeRange();

  //! =============== 4. 數據獲取 ===============
  // 獲取特定區域的排程數據（包含時間範圍）
  const { scheduleList } = useAreaScheduleData(
    selectedArea,
    formattedTimeRange.startTime,
    formattedTimeRange.endTime
  );
  
  // 獲取機台數據
  const { filteredMachines } = useAreaMachines(selectedArea);

  // 使用自定義 hook 獲取時間線數據
  const { itemsDataRef, groups } = useTimelineData(
    filteredMachines,
    scheduleList // 修正：取消註釋，確保排程資料能被載入
  );

  // 使用自定義 hook 獲取時間線配置選項
  const { getTimelineOptions } = useTimelineConfig(itemsDataRef, timeRange);

  // 使用自定義 hook 處理對話框
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

  //! =============== 5. 時間線初始化與事件處理 ===============
  /**
   * 移動到當前時間
   */
  const handleMoveToNow = useCallback(() => {
    // 優先使用 dialogMoveToNow
    if (dialogMoveToNow) {
      dialogMoveToNow();
      return;
    }

    // 備用實現
    if (!timelineRef.current) return;

    try {
      const timeWindow = getTimeWindow(timeRange, dayjs());
      timelineRef.current.setWindow(
        timeWindow.start.toDate(),
        timeWindow.end.toDate(),
        { animation: true }
      );
    } catch (error) {
      console.error("Move to current time failed:", error);
    }
  }, [timeRange, dialogMoveToNow]);

  /**
   * 初始化和更新時間線
   * 這個 Effect 整合了時間線的初始化、事件綁定和清理操作
   */
  useEffect(() => {
    // 初始化條件檢查
    if (!containerRef.current || !itemsDataRef.current || !groups) return;

    // 清空容器
    containerRef.current.innerHTML = "";

    // 獲取選項
    const options = getTimelineOptions();

    // 創建時間線
    timelineRef.current = new Timeline(
      containerRef.current,
      itemsDataRef.current,
      groups,
      options
    );

    // 設置雙擊事件
    timelineRef.current.on("doubleClick", (properties) => {
      if (!properties.item) return;
      const item = itemsDataRef.current.get(properties.item);
      if (item) {
        handleEditItem(item);
      }
    });

    // 調試用
    window.timeline = timelineRef.current;
    if (!window.app) window.app = {};
    window.app.timelineData = itemsDataRef.current;

    // 確保 DialogManager 有最新的 groups 數據
    if (groups) {
      setGroups(groups);
    }

    // 清理函數
    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
        timelineRef.current = null;
      }
    };
  }, [containerRef, itemsDataRef, groups, getTimelineOptions, handleEditItem]);

  //! =============== 6. 加載狀態處理 ===============
  // 判斷整體載入狀態

  //! =============== 7. 渲染 ===============
  
  // 🔧 格式化函數 - 父組件控制格式邏輯
  const formatTimeForInput = (isoString) => {
    if (!isoString) return "";
    return dayjs(isoString).format("YYYY-MM-DDTHH:mm");
  };

  const handleTimeInputChange = (inputValue, setter) => {
    const isoValue = dayjs(inputValue).toISOString();
    setter(isoValue);
  };

  // 🎯 時間範圍選項 - 父組件定義選項
  const timeRangeOptions = Object.entries(TIME_RANGES).map(([key, config]) => ({
    value: key,
    label: config.label
  }));

  const areaOptions = MACHINE_CONFIG.AREAS.map(area => ({
    value: area,
    label: `${area}區`
  }));

  // 🧠 快捷時間設定邏輯 - 父組件控制
  const handleQuickTimeSelect = (type) => {
    const now = dayjs();
    switch(type) {
      case 'today':
        handleStartTimeChange(now.startOf('day').toISOString());
        handleEndTimeChange(now.endOf('day').toISOString());
        break;
      case 'week':
        handleStartTimeChange(now.startOf('week').toISOString());
        handleEndTimeChange(now.endOf('week').toISOString());
        break;
      case 'month':
        handleStartTimeChange(now.startOf('month').toISOString());
        handleEndTimeChange(now.endOf('month').toISOString());
        break;
      case 'default':
        const defaultStart = now.subtract(1, "month").startOf("day").toISOString();
        const defaultEnd = now.add(1, "month").endOf("day").toISOString();
        handleStartTimeChange(defaultStart);
        handleEndTimeChange(defaultEnd);
        break;
    }
  };

  return (
    <Box sx={{ width: "100%", p: 4 }}>
      {/* 時間線顯示 */}
      <TimelineContainer>
        {/* 🚀 控制反轉版本 - 父組件完全控制功能 */}
        <TimelineControls>
          
          {/* 主控制列 */}
          <TimelineControls.Row>
            {/* 時間範圍選擇 - 父組件決定有哪些選項 */}
            <TimelineControls.ButtonGroup>
              {timeRangeOptions.map(option => (
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
              
              <TimelineControls.NowButton 
                onClick={handleMoveToNow}
              />
            </TimelineControls.ButtonGroup>
          </TimelineControls.Row>

          {/* 時間詳細設定 - 可展開面板 */}
          <TimelineControls.Panel
            title="時間範圍設定"
            expanded={timePanelExpanded}
            onToggle={setTimePanelExpanded}
            info={formattedTimeRange.startTime && formattedTimeRange.endTime ? 
              `${dayjs(formattedTimeRange.startTime).format('MM/DD')} - ${dayjs(formattedTimeRange.endTime).format('MM/DD')}` : 
              "預設範圍"
            }
          >
            <TimelineControls.Row>
              {/* 時間輸入 */}
              <TimelineControls.ButtonGroup>
                <TimelineControls.TimeInput
                  label="開始"
                  value={formatTimeForInput(selectedTimeRange.startTime)}
                  onChange={(value) => handleTimeInputChange(value, handleStartTimeChange)}
                />
                <TimelineControls.TimeInput
                  label="結束"
                  value={formatTimeForInput(selectedTimeRange.endTime)}
                  onChange={(value) => handleTimeInputChange(value, handleEndTimeChange)}
                />
              </TimelineControls.ButtonGroup>

              {/* 快捷按鈕 - 父組件決定有哪些 */}
              <TimelineControls.ButtonGroup>
                <TimelineControls.Button onClick={() => handleQuickTimeSelect('today')}>
                  今天
                </TimelineControls.Button>
                <TimelineControls.Button onClick={() => handleQuickTimeSelect('week')}>
                  本週
                </TimelineControls.Button>
                <TimelineControls.Button onClick={() => handleQuickTimeSelect('month')}>
                  本月
                </TimelineControls.Button>
                <TimelineControls.Button onClick={() => handleQuickTimeSelect('default')}>
                  預設範圍
                </TimelineControls.Button>
              </TimelineControls.ButtonGroup>
            </TimelineControls.Row>
          </TimelineControls.Panel>

        </TimelineControls>

        {/* 時間線容器 */}
        <TimelinePaper containerRef={containerRef} />
      </TimelineContainer>

      {/* 使用 Portal 渲染對話框 */}
      <DialogPortals />
    </Box>
  );
}

export default DynamicTimeline;
