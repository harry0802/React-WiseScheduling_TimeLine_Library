// export default DynamicTimeline;
//! =============== 1. 設定與常量 ===============
import { useEffect, useRef, useState, useCallback } from "react";
import { Timeline } from "vis-timeline/standalone";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "vis-timeline/styles/vis-timeline-graph2d.css";
import TimelineControls from "./components/TimelineControls";
import ItemDialog from "./components/ItemDialog";
import OperationDialog from "./components/OperationDialog";
import { useTimelineData } from "./hooks/useTimelineData";
import { TIME_RANGES, TIMELINE_STYLES } from "./configs/timelineConfigs";
import dayjs from "dayjs";
import { getTimeWindow } from "./utils/dateUtils";
import "dayjs/locale/zh-tw"; // 導入繁體中文語系
dayjs.locale("zh-tw"); // 設置使用繁體中文
import moment from "moment"; // 新增這行

import {
  BaseTimelineContainer,
  TimelineGrid,
  BaseItem,
  StatusStyles,
  TimeAxisStyles,
  CurrentTimeMarker,
  StatusBase,
  StatusProgress,
  StatusLabel,
} from "./styles";

//* 基礎配置常量
const DEFAULT_HEIGHT = window.innerHeight - 200;

// 定義中文本地化配置
const zhTWLocale = {
  current: "現在",
  time: "時間",
  deleteSelected: "刪除選取",
  editable: {
    add: "新增",
    remove: "刪除",
    updateTime: "調整時間",
    updateGroup: "調整群組",
  },
};

// 修改 moment 相關設定
if (moment) {
  moment.updateLocale("zh-tw", {
    months:
      "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
        "_"
      ),
    monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split(
      "_"
    ),
    weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
    weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
    weekdaysMin: "日_一_二_三_四_五_六".split("_"),
    meridiem: function (hour, minute) {
      const hm = hour * 100 + minute;
      if (hm < 600) {
        return "凌晨";
      } else if (hm < 900) {
        return "早上";
      } else if (hm < 1130) {
        return "上午";
      } else if (hm < 1230) {
        return "中午";
      } else if (hm < 1800) {
        return "下午";
      } else {
        return "晚上";
      }
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
      let h = hour;
      if (h === 12) {
        h = 0;
      }
      if (meridiem === "凌晨" || meridiem === "早上" || meridiem === "上午") {
        return h;
      } else if (meridiem === "中午") {
        return h >= 11 ? h : h + 12;
      } else if (meridiem === "下午" || meridiem === "晚上") {
        return h + 12;
      }
    },
  });
}

//* Timeline 基礎選項配置
const BASE_TIMELINE_OPTIONS = {
  orientation: "top",
  zoomable: false,
  moveable: true,
  stack: true,
  stackSubgroups: true,
  verticalScroll: true,
  horizontalScroll: true,
  showCurrentTime: true,
  locale: "zh-tw",
  locales: {
    "zh-tw": zhTWLocale,
  },
  moment: (date) => {
    return moment(date).locale("zh-tw").utcOffset("+08:00"); // 使用引入的 moment
  },
};

//* 時間格式配置
const TIME_FORMAT_CONFIG = {
  minorLabels: {
    millisecond: "SSS",
    second: "s秒",
    minute: "a h:mm",
    hour: "a h點",
    weekday: "M月D日",
    day: "D日",
    week: "第w週",
    month: "M月",
    year: "YYYY年",
  },

  majorLabels: {
    millisecond: "HH:mm:ss",
    second: "M月D日 a h:mm",
    minute: "M月D日 a h:mm",
    hour: "M月D日 a",
    weekday: "YYYY年M月",
    day: "YYYY年M月",
    week: "YYYY年M月",
    month: "YYYY年",
    year: "",
  },
};

//! =============== 2. 類型與介面 ===============
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
  const [timelineHeight] = useState(DEFAULT_HEIGHT);

  const { itemsDataRef, groups } = useTimelineData();

  /**
   * @function getTimelineOptions
   *  @description 根據當前時間範圍生成 Timeline 配置
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
        console.log("🚀 ~ onMove ~ item:", item);
        callback(item); // 接受移动
      },
      format: TIME_FORMAT_CONFIG,
      start: timeWindow.start.toDate(),
      end: timeWindow.end.toDate(),
      snap: null, // 關閉吸附效果
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
      // 檢查是否有點擊到 item (properties.item 為 undefined 表示沒點到)
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
  /**
   * @function handleSaveItem
   * @description 處理項目保存操作
   * @param {TimelineItem} updatedItem - 更新後的項目數據
   */
  const handleSaveItem = useCallback(
    (updatedItem) => {
      if (!itemsDataRef.current) return;

      try {
        if (dialogState.mode === "add") {
          itemsDataRef.current.add(updatedItem);
        } else {
          itemsDataRef.current.update(updatedItem);
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
      //TODO: 加入錯誤提示 UI
    }
  }, [dialogState.selectedItem]);

  /**
   * @function handleAddItem
   * @description 處理新增項目操作
   */
  const handleAddItem = useCallback(() => {
    if (!timelineRef.current) return;

    try {
      const window = timelineRef.current.getWindow();
      const centerTime = dayjs(
        (window.start.getTime() + window.end.getTime()) / 2
      );

      //* 設置新項目的預設值
      const newItem = {
        id: Date.now(),
        group: "A1",
        start: centerTime.toDate(),
        end: centerTime.add(2, "hour").toDate(),
        content: "新訂單",
        className: "custom-item",
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

      <ItemDialog
        isOpen={dialogState.isOpen}
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
