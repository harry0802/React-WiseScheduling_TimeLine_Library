//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置,便於統一管理

//* 基礎 React Hooks
import { useEffect, useRef, useState, useCallback } from "react";

//* 工具和日期處理
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import moment from "moment";

//* UI 組件相關
import { Timeline } from "vis-timeline/standalone";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "vis-timeline/styles/vis-timeline-graph2d.css";

//* 樣式組件
import { TimelineContainer, TimelineContent } from "../../assets/schedule";

//* Timeline 設定與選項
import { TIMELINE_STYLES } from "../../configs/validations/schedule/timeline/timelineConfigs";
import {
  BASE_TIMELINE_OPTIONS,
  TIME_FORMAT_CONFIG,
} from "../../configs/validations/schedule/timeline/timelineOptions";

//* 其他配置和常量
import { momentLocaleConfig } from "../../configs/validations/schedule/timeline/timelineLocale";
import {
  getStatusName,
  MACHINE_STATUS,
} from "../../configs/validations/schedule/constants";

//* Hooks 與工具函數
import { useTimelineData } from "../../hooks/schedule/useTimelineData";
import { useTimelineOperations } from "../../hooks/schedule/useTimelineOperations";

//* 自定義組件
import TimelineControls from "./TimelineControls";
import OperationDialog from "./OperationDialog";
import ItemDialog from "./ItemDialog/index";
import { createItemTemplate } from "./TimelineContent";
import { getTimeWindow } from "../../utils/schedule/dateUtils";

//! =============== 2. 單獨設定版塊 ===============
// 設定日期本地化
dayjs.locale("zh-tw");

// 設定 moment 相關設定
if (moment) {
  moment.updateLocale("zh-tw", momentLocaleConfig);
}

//! =============== 常量定義與工具函數 ===============
const TIMELINE_HEIGHT = "600px";
const TEN_YEARS_MS = 1000 * 60 * 60 * 24 * 31 * 12 * 10; // 10年的毫秒數

/**
 * 創建新的時間軸實例
 * @pure
 */
const createTimeline = (container, items, groupsData, options) =>
  new Timeline(container, items, groupsData, options);

/**
 * 更新現有時間軸
 * @pure
 */
const updateTimeline = (timeline, options, items, groupsData) => {
  timeline.setOptions(options);
  timeline.setData({ items, groups: groupsData });
  return timeline;
};

/**
 * 清理時間軸資源
 * @pure
 */
const cleanupTimeline = (timeline) => {
  if (timeline) {
    timeline.destroy();
    return null;
  }
  return timeline;
};

/**
 * 獲取時間軸特定選項
 * @pure
 */
const getTimeAxisOptions = (currentTimeRange) =>
  currentTimeRange === "hour" ? { timeAxis: { scale: "hour", step: 1 } } : {};

/**
 * 渲染時間線容器
 * @pure
 */
const renderTimelineContainer = (ref) => (
  <Paper
    ref={ref}
    elevation={1}
    sx={{
      width: "100%",
      flexGrow: 1,
      minHeight: TIMELINE_HEIGHT,
      border: 1,
      borderColor: "grey.200",
      borderRadius: 1,
    }}
  />
);

/**
 * 渲染操作對話框
 * @pure
 */
const renderOperationDialog = (isOpen, onConfirm, onCancel) => (
  <OperationDialog
    open={isOpen}
    title="刪除確認"
    content="確定要刪除這個訂單嗎？"
    onConfirm={onConfirm}
    onCancel={onCancel}
    confirmText="刪除"
    cancelText="取消"
  />
);

/**
 * @component DynamicTimeline
 * @description 動態時間線組件，用於顯示和管理排程資料，使用函數式編程風格實現
 *
 * @features
 * - 支援不同時間範圍視圖（小時、日、週、月）
 * - 允許拖拽調整排程項目
 * - 支援新增、編輯、刪除排程項目
 * - 提供跳轉到當前時間的功能
 */
const DynamicTimeline = () => {
  //* 基礎狀態管理
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [timeRange, setTimeRange] = useState("day");

  const { itemsDataRef, groups } = useTimelineData();

  const {
    dialogState,
    setDialogState,
    isDeleteDialogOpen,
    handleSaveItem,
    handleDeleteItem,
    handleAddItem,
    handleMoveToNow,
    closeDialog,
    openDeleteDialog,
    closeDeleteDialog,
  } = useTimelineOperations(timelineRef, itemsDataRef, timeRange, groups);

  /**
   * 根據時間範圍獲取時間軸選項
   * @pure
   */
  const getBaseOptions = useCallback(
    () => ({
      ...BASE_TIMELINE_OPTIONS,
      editable: {
        add: false,
        updateTime: true,
        updateGroup: true,
        remove: false,
      },
      format: TIME_FORMAT_CONFIG,
      onMove: (item, callback) => {
        // 只有 OrderCreated 允許時間重疊，其他狀態不允許
        if (item.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED) {
          // 獲取同一組（機台）的所有項目
          const groupItems = itemsDataRef.current.get({
            filter: (groupItem) => {
              return (
                groupItem.group === item.group &&
                groupItem.id !== item.id &&
                groupItem.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED
              );
            },
          });

          // 檢查是否與現有項目時間重疊
          const hasOverlap = groupItems.some((existingItem) => {
            // 檢查兩個時間段是否重疊
            const itemStart = dayjs(item.start);
            const itemEnd = dayjs(item.end);
            const existingStart = dayjs(existingItem.start);
            const existingEnd = dayjs(existingItem.end);

            // 檢查是否存在重疊：兩個區間有交集
            return (
              (itemStart.isBefore(existingEnd) &&
                itemEnd.isAfter(existingStart)) ||
              itemStart.isSame(existingStart) ||
              itemEnd.isSame(existingEnd)
            );
          });

          if (hasOverlap) {
            // 時間重疊，拒絕移動
            console.warn("時間重疊，無法移動：", item.timeLineStatus);
            callback(null); // 拒絕移動
            return;
          }
        }
        // 允許移動
        callback(item);
      },
      snap: null, // 關閉對齊功能，允許自由拖動
      margin: {
        item: { vertical: 8 },
      },
      zoomMax: TEN_YEARS_MS,
    }),
    []
  );

  /**
   * 獲取時間視窗相關選項
   * @pure
   */
  const getTimeWindowOptions = useCallback((currentTimeRange) => {
    const timeWindow = getTimeWindow(currentTimeRange);
    return {
      ...TIMELINE_STYLES[currentTimeRange],
      start: timeWindow.start.toDate(),
      end: timeWindow.end.toDate(),
      zoomMin: TIMELINE_STYLES[currentTimeRange].zoomMin,
    };
  }, []);

  /**
   * 生成完整的時間軸選項
   * @pure
   */
  const getTimelineOptions = useCallback(
    () => ({
      ...getBaseOptions(),
      ...getTimeWindowOptions(timeRange),
      ...getTimeAxisOptions(timeRange),
      template: createItemTemplate,
    }),
    [timeRange, getBaseOptions, getTimeWindowOptions]
  );

  /**
   * 初始化或更新時間軸
   */
  const initTimeline = useCallback(() => {
    if (!containerRef.current || !itemsDataRef.current || !groups) return null;

    const options = getTimelineOptions();

    // 根據當前狀態決定是創建還是更新時間軸
    timelineRef.current = timelineRef.current
      ? updateTimeline(
          timelineRef.current,
          options,
          itemsDataRef.current,
          groups
        )
      : (() => {
          containerRef.current.innerHTML = "";
          return createTimeline(
            containerRef.current,
            itemsDataRef.current,
            groups,
            options
          );
        })();

    // 將時間軸實例存入全局變量，以便其他組件可以訪問
    window.timeline = timelineRef.current;
    // 將數據也存入全局變量
    if (!window.app) window.app = {};
    window.app.timelineData = itemsDataRef.current;

    return timelineRef.current;
  }, [groups, getTimelineOptions]);

  /**
   * 創建處理雙擊事件的函數
   * @pure
   */
  const createDoubleClickHandler = useCallback(
    (itemsRef, stateSetter) => (properties) => {
      if (!properties.item) return;

      const clickedItem = itemsRef.current?.get(properties.item);
      if (clickedItem) {
        stateSetter({
          selectedItem: clickedItem,
          mode: "edit",
          isOpen: true,
        });
      }
    },
    []
  );

  /**
   * 設置時間軸事件
   */
  const setupTimelineEvents = useCallback(
    (timeline, itemsRef, stateSetter) => {
      if (!timeline) return () => {};

      const handleDoubleClick = createDoubleClickHandler(itemsRef, stateSetter);
      timeline.on("doubleClick", handleDoubleClick);

      return () => timeline?.off("doubleClick", handleDoubleClick);
    },
    [createDoubleClickHandler]
  );

  // 時間軸初始化和事件處理
  useEffect(() => {
    try {
      const timeline = initTimeline();
      const cleanupEvents = setupTimelineEvents(
        timeline,
        itemsDataRef,
        setDialogState
      );

      return () => {
        cleanupEvents();
        timelineRef.current = cleanupTimeline(timelineRef.current);
      };
    } catch (error) {
      console.error("Timeline 操作失敗:", error);
      // 可以在此添加更多錯誤處理邏輯
      return () => {};
    }
  }, [initTimeline, setupTimelineEvents]);

  /**
   * 渲染時間線控制組件
   * @pure
   */
  const renderTimelineControls = useCallback(
    (currentTimeRange, onRangeChange, onAdd, onMoveNow) => (
      <TimelineControls
        timeRange={currentTimeRange}
        onTimeRangeChange={onRangeChange}
        onAddItem={onAdd}
        onMoveToNow={onMoveNow}
      />
    ),
    []
  );

  /**
   * 渲染項目對話框
   * @pure
   */
  const renderItemDialog = useCallback(
    (item, isOpen, mode, groupsData, onClose, onSave, onDelete) =>
      item && (
        <ItemDialog
          open={isOpen}
          onClose={onClose}
          item={item}
          mode={mode}
          onSave={onSave}
          onDelete={onDelete}
          groups={groupsData}
        />
      ),
    []
  );

  //* 使用函數式編程風格進行組合渲染
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <TimelineContainer>
        {renderTimelineControls(
          timeRange,
          setTimeRange,
          handleAddItem,
          handleMoveToNow
        )}
        {renderTimelineContainer(containerRef)}
      </TimelineContainer>

      {renderItemDialog(
        dialogState.selectedItem,
        dialogState.isOpen,
        dialogState.mode,
        groups,
        closeDialog,
        handleSaveItem,
        openDeleteDialog
      )}

      {renderOperationDialog(
        isDeleteDialogOpen,
        handleDeleteItem,
        closeDeleteDialog
      )}
    </Box>
  );
};

export default DynamicTimeline;
