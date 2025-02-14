//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置,便於統一管理

//* 基礎 React Hooks
import { useEffect, useRef, useState, useCallback } from "react";

//* UI 組件相關
import { Timeline } from "vis-timeline/standalone";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "vis-timeline/styles/vis-timeline-graph2d.css";

//* 自定義組件
import TimelineControls from "./components/TimelineControls";
import OperationDialog from "./components/OperationDialog";
import ItemDialog from "./components/ItemDialog/index";

//* Hooks 與工具函數
import { useTimelineData } from "./hooks/useTimelineData";
import { useTimelineOperations } from "./hooks/useTimelineOperations";
import { TIMELINE_STYLES } from "./configs/timeline/timelineConfigs";
import dayjs from "dayjs";
import { getTimeWindow } from "./utils/dateUtils";

//* 多語系設定
import "dayjs/locale/zh-tw";
dayjs.locale("zh-tw");
import moment from "moment";

//* 樣式組件
import {
  BaseTimelineContainer,
  TimelineGrid,
  BaseItem,
  TimeAxisStyles,
  CurrentTimeMarker,
  StatusBase,
  StatusProgress,
} from "./styles";

//* Timeline 配置
import {
  BASE_TIMELINE_OPTIONS,
  TIME_FORMAT_CONFIG,
} from "./configs/timeline/timelineOptions";

//* 其他配置
import { momentLocaleConfig } from "./configs/timeline/timelineLocale";
import { getStatusName, MACHINE_STATUS } from "./configs/constants";
import { createItemTemplate } from "./components/TimelineContent";

// moment 相關設定
if (moment) {
  moment.updateLocale("zh-tw", momentLocaleConfig);
}

//! =============== 2. 類型與介面 ===============
//* 定義所有資料結構,幫助理解資料流向
/**
 * @typedef {Object} TimelineItem
 * @property {number|string} id - 項目唯一識別碼
 * @property {number} group - 群組 ID
 * @property {Date} start - 開始時間
 * @property {Date} end - 結束時間
 * @property {string} content - 顯示內容
 * @property {string} className - CSS 類名
 */

/**
 * @typedef {Object} DialogState
 * @property {TimelineItem|null} selectedItem - 當前選中的項目
 * @property {'view'|'edit'|'add'} mode - 對話框模式
 * @property {boolean} isOpen - 是否開啟
 */

//! =============== 3. 核心功能 ===============
//* 主要業務邏輯區,每個功能都配有詳細說明
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

  const getTimelineOptions = useCallback(() => {
    const timeWindow = getTimeWindow(timeRange);
    return {
      ...BASE_TIMELINE_OPTIONS,
      ...TIMELINE_STYLES[timeRange],
      editable: {
        add: false,
        updateTime: true,
        updateGroup: true,
      },
      onMove: function (item, callback) {
        callback(item);
      },
      format: TIME_FORMAT_CONFIG,
      start: timeWindow.start.toDate(),
      end: timeWindow.end.toDate(),
      snap: null,
      // height: "100%",
      // minHeight: "600px",
      orientation: {
        axis: "top",
        item: "top",
      },
      margin: {
        item: {
          vertical: 8,
        },
      },
    };
  }, [timeRange]);

  const initTimeline = useCallback(() => {
    if (!containerRef.current || !itemsDataRef.current || !groups) return;

    const options = {
      ...getTimelineOptions(),
      template: createItemTemplate,
    };

    // ⚠️ Timeline 初始化或更新
    if (!timelineRef.current) {
      containerRef.current.innerHTML = "";
      timelineRef.current = new Timeline(
        containerRef.current,
        itemsDataRef.current,
        groups,
        options
      );
    } else {
      timelineRef.current.setOptions(options);
      timelineRef.current.setData({
        items: itemsDataRef.current,
        groups,
      });
    }
  }, [groups, getTimelineOptions]);
  const handleTimelineEvents = useCallback(() => {
    if (!timelineRef.current) return;

    const handleDoubleClick = (properties) => {
      if (!properties.item) return;

      const clickedItem = itemsDataRef.current?.get(properties.item);
      if (clickedItem) {
        setDialogState({
          selectedItem: clickedItem,
          mode: "edit",
          isOpen: true,
        });
      }
    };

    timelineRef.current.on("doubleClick", handleDoubleClick);
    return () => timelineRef.current?.off("doubleClick", handleDoubleClick);
  }, [setDialogState]);

  useEffect(() => {
    try {
      initTimeline();
      const cleanup = handleTimelineEvents();

      return () => {
        cleanup?.();
        if (timelineRef.current) {
          timelineRef.current.destroy();
          timelineRef.current = null;
        }
      };
    } catch (error) {
      console.error("Timeline 操作失敗:", error);
    }
  }, [initTimeline, handleTimelineEvents]);

  //* 渲染區塊
  return (
    <Box sx={{ p: 4 }}>
      <BaseTimelineContainer>
        <TimelineGrid>
          <TimeAxisStyles>
            <CurrentTimeMarker>
              <BaseItem>
                <StatusBase>
                  <StatusProgress>
                    <TimelineControls
                      timeRange={timeRange}
                      onTimeRangeChange={setTimeRange}
                      onAddItem={handleAddItem}
                      onMoveToNow={handleMoveToNow}
                    />
                    <Paper
                      ref={containerRef}
                      elevation={1}
                      sx={{
                        border: 1,
                        borderColor: "grey.200",
                        borderRadius: 1,
                      }}
                    />
                  </StatusProgress>
                </StatusBase>
              </BaseItem>
            </CurrentTimeMarker>
          </TimeAxisStyles>
        </TimelineGrid>
      </BaseTimelineContainer>

      {dialogState.selectedItem && (
        <ItemDialog
          open={dialogState.isOpen}
          onClose={closeDialog}
          item={dialogState.selectedItem}
          mode={dialogState.mode}
          onSave={handleSaveItem}
          onDelete={openDeleteDialog}
          groups={groups}
        />
      )}

      <OperationDialog
        open={isDeleteDialogOpen}
        title="刪除確認"
        content="確定要刪除這個訂單嗎？"
        onConfirm={handleDeleteItem}
        onCancel={closeDeleteDialog}
        confirmText="刪除"
        cancelText="取消"
      />
    </Box>
  );
};

export default DynamicTimeline;
