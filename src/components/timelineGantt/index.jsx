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
const DynamicTimeline = () => {
  // 基礎狀態管理
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [timeRange, setTimeRange] = useState("day");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogMode, setDialogMode] = useState("view");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [timelineHeight, setTimelineHeight] = useState(
    window.innerHeight - 200
  );

  const { itemsDataRef, groups } = useTimelineData();
  console.log(itemsDataRef.current);

  // 將 Timeline 初始化邏�抽出
  const initTimeline = useCallback(() => {
    if (!containerRef.current || !itemsDataRef.current || !groups) return;
    const timeWindow = getTimeWindow(timeRange);

    const baseOptions = {
      ...TIMELINE_STYLES[timeRange],
      orientation: "top",
      zoomable: false,
      moveable: true,
      stack: false,
      editable: {
        add: false,
        updateTime: true,
        updateGroup: true,
        remove: true,
      },
      height: `${timelineHeight}px`,
      verticalScroll: true,
      horizontalScroll: true,
      start: timeWindow.start.toDate(),
      end: timeWindow.end.toDate(),
      // 移除之前的 moment 和 snap 配置
      format: {
        minorLabels: {
          millisecond: "SSS",
          second: "s",
          minute: "HH:mm",
          hour: "HH:mm",
          weekday: "ddd",
          day: "D",
          month: "MMM",
          year: "YYYY",
        },
        majorLabels: {
          millisecond: "HH:mm:ss",
          second: "YYYY/MM/DD",
          minute: "ddd D MMMM",
          hour: "ddd D MMMM",
          weekday: "MMMM YYYY",
          day: "MMMM YYYY",
          month: "YYYY",
          year: "",
        },
      },
    };

    // 只在第一次創建實例
    if (!timelineRef.current) {
      containerRef.current.innerHTML = "";
      timelineRef.current = new Timeline(
        containerRef.current,
        itemsDataRef.current,
        groups,
        baseOptions
      );
    } else {
      // 更新現有實例
      timelineRef.current.setOptions(baseOptions);
      timelineRef.current.setData({
        items: itemsDataRef.current,
        groups,
      });
    }
  }, [groups, timeRange, timelineHeight]);
  // 在 bindTimelineEvents 函數中修改
  const bindTimelineEvents = useCallback(() => {
    if (!timelineRef.current) return;

    const handleDoubleClick = (properties) => {
      const clickedItem = properties.item;
      if (clickedItem) {
        const selectedItemData = itemsDataRef.current.get(clickedItem);
        if (selectedItemData) {
          setSelectedItem(selectedItemData);
          setDialogMode("edit");
          setIsDialogOpen(true);
        }
      }
    };

    timelineRef.current.on("doubleClick", handleDoubleClick);
    return () => timelineRef.current?.off("doubleClick", handleDoubleClick);
  }, []);

  // 主要的 useEffect
  useEffect(() => {
    try {
      initTimeline();
      const cleanup = bindTimelineEvents();

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
  }, [initTimeline, bindTimelineEvents]);

  // 處理項目儲存
  const handleSaveItem = useCallback(
    (updatedItem) => {
      if (!itemsDataRef.current) return;

      try {
        if (dialogMode === "add") {
          itemsDataRef.current.add({
            ...updatedItem,
            className: "custom-item",
          });
        } else if (dialogMode === "edit") {
          itemsDataRef.current.update({
            ...updatedItem,
            className: "custom-item",
          });
        }
        setIsDialogOpen(false);
        setSelectedItem(null);
      } catch (error) {
        console.error("儲存項目時出錯:", error);
      }
    },
    [dialogMode]
  );

  // 處理項目刪除
  const handleDeleteItem = useCallback(() => {
    if (!selectedItem || !itemsDataRef.current) return;

    try {
      itemsDataRef.current.remove(selectedItem.id);
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("刪除項目時出錯:", error);
    }
  }, [selectedItem]);

  // 處理新增項目
  const handleAddItem = useCallback(() => {
    if (!timelineRef.current || !itemsDataRef.current) return;

    try {
      const window = timelineRef.current.getWindow();
      const centerTime = dayjs(
        (window.start.getTime() + window.end.getTime()) / 2
      );

      setSelectedItem({
        id: Date.now(),
        group: 1,
        start: centerTime.toDate(),
        end: centerTime.add(2, "hour").toDate(),
        content: "新訂單",
        className: "custom-item",
      });
      setDialogMode("add");
      setIsDialogOpen(true);
    } catch (error) {
      console.error("新增項目時出錯:", error);
    }
  }, []);

  // 處理移動到當前時間
  const handleMoveToNow = useCallback(() => {
    if (!timelineRef.current) return;

    try {
      const now = dayjs();
      const timeWindow = getTimeWindow(timeRange, now);

      timelineRef.current.setWindow(
        timeWindow.start.toDate(),
        timeWindow.end.toDate(),
        { animation: true }
      );
    } catch (error) {
      console.error("移動到當前時間時出錯:", error);
    }
  }, [timeRange]);
  return (
    <Box sx={{ height: "100vh", p: 4 }}>
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
          height: `${timelineHeight}px`,
          border: 1,
          borderColor: "grey.200",
          borderRadius: 1,
        }}
      />

      <ItemDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
        mode={dialogMode}
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
