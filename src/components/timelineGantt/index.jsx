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
import { TIMELINE_STYLES } from "./configs/timeline/timelineConfigs";
import dayjs from "dayjs";
import {
  formatToFormDateTime,
  formatToVisDateTime,
  getTimeWindow,
} from "./utils/dateUtils";

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
import { MACHINE_STATUS } from "./configs/constants";

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

  //* 對話框狀態管理
  const [dialogState, setDialogState] = useState({
    selectedItem: null,
    mode: "view",
    isOpen: false,
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { itemsDataRef, groups } = useTimelineData();

  /**
   * @function getTimelineOptions
   * @description 根據當前時間範圍生成 Timeline 配置
   */
  const getTimelineOptions = useCallback(() => {
    const timeWindow = getTimeWindow(timeRange);
    return {
      ...BASE_TIMELINE_OPTIONS,
      ...TIMELINE_STYLES[timeRange],
      editable: {
        add: false,
        updateTime: true,
        updateGroup: true,
        remove: true,
      },
      onMove: function (item, callback) {
        callback(item);
      },
      format: TIME_FORMAT_CONFIG,
      start: timeWindow.start.toDate(),
      end: timeWindow.end.toDate(),
      snap: null,
    };
  }, [timeRange]);

  /**
   * @function initTimeline
   * @description Timeline 初始化邏輯
   */
  const initTimeline = useCallback(() => {
    if (!containerRef.current || !itemsDataRef.current || !groups) return;

    const options = getTimelineOptions();

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

  /**
   * @function handleTimelineEvents
   * @description Timeline 事件綁定處理
   */
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
  }, []);

  //* Timeline 生命週期管理
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

  //! =============== 4. 工具函數 ===============
  //* 通用功能區,可被多個模組復用
  /**
   * @function handleSaveItem
   * @description 處理項目保存操作
   * @param {TimelineItem} updatedItem - 更新後的項目數據
   */
  const handleSaveItem = useCallback(
    (updatedItem) => {
      if (!itemsDataRef.current) return;

      try {
        const processedItem = {
          ...updatedItem,
          start: dayjs(updatedItem.orderInfo.start).toDate(),
          end: dayjs(updatedItem.orderInfo.end).toDate(),
          ...(updatedItem.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED && {
            start: dayjs(updatedItem.status.startTime).toDate(),
            end: updatedItem.status.endTime
              ? dayjs(updatedItem.status.endTime).toDate()
              : dayjs(updatedItem.status.startTime).add(2, "hour").toDate(),
          }),
        };

        if (dialogState.mode === "add") {
          itemsDataRef.current.add(processedItem);
        } else {
          itemsDataRef.current.update(processedItem);
        }

        setDialogState((prev) => ({
          ...prev,
          isOpen: false,
          selectedItem: null,
        }));
      } catch (error) {
        console.error("儲存項目失敗:", error);
      }
    },
    [dialogState.mode]
  );

  /**
   * @function handleDeleteItem
   * @description 處理項目刪除操作
   */
  const handleDeleteItem = useCallback(() => {
    if (!dialogState.selectedItem?.id || !itemsDataRef.current) return;

    try {
      itemsDataRef.current.remove(dialogState.selectedItem.id);
      setIsDeleteDialogOpen(false);
      setDialogState((prev) => ({
        ...prev,
        selectedItem: null,
      }));
    } catch (error) {
      console.error("刪除項目失敗:", error);
    }
  }, [dialogState.selectedItem]);

  /**
   * @function handleAddItem
   * @description 處理新增項目操作
   */
  const handleAddItem = useCallback(() => {
    if (!timelineRef.current) return;

    try {
      const centerTime = dayjs().tz("Asia/Taipei");
      const endTime = centerTime.add(2, "hour");

      const newItem = {
        id: `ORDER-${Date.now()}`,
        group: "A1",
        area: "A",
        timeLineStatus: MACHINE_STATUS.IDLE,
        status: {
          startTime: centerTime.toDate(),
          endTime: endTime.toDate(),
          reason: "",
          product: "",
        },
        orderInfo: {
          start: "",
          end: "",
          actualStart: null,
          actualEnd: null,
          productId: "",
          productName: "",
          quantity: 0,
          completedQty: 0,
          process: "",
          orderStatus: "尚未上機",
        },
        start: centerTime.toDate(),
        end: endTime.toDate(),
        className: "status-idle",
        content: "新訂單",
      };

      setDialogState({
        selectedItem: newItem,
        mode: "add",
        isOpen: true,
      });
    } catch (error) {
      console.error("新增項目失敗:", error);
    }
  }, []);

  /**
   * @function handleMoveToNow
   * @description 移動時間軸到當前時間
   */
  const handleMoveToNow = useCallback(() => {
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
  }, [timeRange]);

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
          onClose={() =>
            setDialogState((prev) => ({
              ...prev,
              isOpen: false,
              selectedItem: null,
            }))
          }
          item={dialogState.selectedItem}
          mode={dialogState.mode}
          onSave={handleSaveItem}
          onDelete={() => setIsDeleteDialogOpen(true)}
          groups={groups}
        />
      )}

      <OperationDialog
        open={isDeleteDialogOpen}
        title="刪除確認"
        content="確定要刪除這個訂單嗎？"
        onConfirm={handleDeleteItem}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="刪除"
        cancelText="取消"
      />
    </Box>
  );
};

export default DynamicTimeline;
