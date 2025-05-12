/**
 * @file index.jsx
 * @description 動態時間線組件，實現生產排程管理功能
 * @version 7.2.0
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

//* 服務與資料
import { useGetSmartScheduleQuery } from "../../services/schedule/smartSchedule";
import { useGetMachinesQuery } from "../../../QuotationManagementSystem/services/salesServices/endpoints/machineApi";

//* 樣式
import { TimelineContainer } from "../../assets/schedule";

//* 常量與配置
import { momentLocaleConfig } from "../../configs/validations/schedule/timeline/timelineLocale";

//* 自定義 Hook 與管理器
import { useTimelineData } from "../../hooks/schedule/useTimelineData";
import { useTimelineConfig } from "../../hooks/schedule/useTimelineConfig";
import { useTimelineDialogs } from "../../hooks/schedule/useTimelineDialogs";
import { DialogManager } from "./DialogManager";
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
 * @description 獲取特定區域的排程數據
 * @param {string} area - 區域代碼
 * @returns {Object} 排程數據和加載狀態
 */
const useAreaScheduleData = (area = "A") => {
  const {
    isSuccess,
    isLoading,
    data: scheduleData,
  } = useGetSmartScheduleQuery({
    productionArea: area,
  });

  // 過濾並處理指定區域的數據
  const scheduleList = useMemo(() => {
    if (!scheduleData || !scheduleData.data) return [];

    // 如果數據已經按區域過濾，則直接使用
    if (scheduleData.productionArea === area) {
      return scheduleData.data;
    }

    // 否則手動過濾
    return scheduleData.data.filter((item) => {
      // 根據數據結構選擇過濾方式
      const itemArea =
        item.productionArea ||
        item.area ||
        (item.machine && item.machine.match(/[A-Z]/)?.[0]) ||
        (item.machineId && item.machineId.match(/[A-Z]/)?.[0]);

      return itemArea === area;
    });
  }, [scheduleData, area]);

  return {
    isSuccess,
    isLoading,
    scheduleList,
  };
};

/**
 * @function useAreaMachines
 * @description 獲取特定區域的機台數據
 * @param {string} area - 區域代碼
 * @returns {Object} 機台數據和加載狀態
 */
const useAreaMachines = (area = "A") => {
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
};

/**
 * @component TimelinePaper
 * @description 時間線容器組件，使用 memo 避免不必要的重新渲染
 */
const TimelinePaper = React.memo(({ containerRef }) => {
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
});

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

  //! =============== 4. 數據獲取 ===============
  // 獲取特定區域的排程數據
  const {
    isSuccess: isScheduleSuccess,
    isLoading: isScheduleLoading,
    scheduleList,
  } = useAreaScheduleData(selectedArea);

  // 獲取機台數據
  const {
    isSuccess: isMachinesSuccess,
    isLoading: isMachinesLoading,
    allArea,
    filteredMachines,
  } = useAreaMachines(selectedArea);

  // 使用自定義 hook 獲取時間線數據
  const { itemsDataRef, groups } = useTimelineData(
    filteredMachines
    // scheduleList
  );

  // 使用自定義 hook 獲取時間線配置選項
  const { getTimelineOptions } = useTimelineConfig(itemsDataRef, timeRange);

  // 使用自定義 hook 處理對話框
  const { handleAddItem, handleEditItem, handleMoveToNow: dialogMoveToNow } = useTimelineDialogs({
    itemsDataRef,
    groups,
    timelineRef,
    timeRange,
  });

  // 確保 DialogManager 有最新的 groups 數據
  useEffect(() => {
    if (groups) {
      DialogManager.setGroups(groups);
    }
  }, [groups]);

  //! =============== 5. 時間線初始化與事件處理 ===============
  /**
   * 創建時間線
   */
  const createTimeline = useCallback(() => {
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
  }, [containerRef, itemsDataRef, groups, getTimelineOptions, handleEditItem]);

  /**
   * 清理時間線
   */
  const cleanupTimeline = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.destroy();
      timelineRef.current = null;
    }
  }, []);

  /**
   * 移動到當前時間
   * 優先使用來自 useTimelineDialogs 的實現，備用使用本地實現
   */
  const handleMoveToNow = useCallback(() => {
    // 嘗試使用 useTimelineDialogs 中的實現
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
   * 初始化時間線
   */
  useEffect(() => {
    createTimeline();

    return () => {
      cleanupTimeline();
    };
  }, [createTimeline, cleanupTimeline]);

  //! =============== 6. 渲染 ===============
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <TimelineContainer>
        {/* 控制面板 */}
        <TimelineControls
          timeRange={timeRange}
          selectedArea={selectedArea}
          onTimeRangeChange={setTimeRange}
          onAreaChange={setSelectedArea}
          onAddItem={handleAddItem}
          onMoveToNow={handleMoveToNow}
        />

        {/* 時間線容器 */}
        <TimelinePaper containerRef={containerRef} />
      </TimelineContainer>

      {/* 使用 Portal 渲染對話框 */}
      <DialogPortals />
    </Box>
  );
}

export default DynamicTimeline;
