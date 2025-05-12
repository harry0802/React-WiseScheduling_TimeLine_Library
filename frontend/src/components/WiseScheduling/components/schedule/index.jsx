/**
 * @file index.jsx
 * @description 動態時間線組件，實現生產排程管理功能
 * @version 2.0.0
 */

//! =============== 1. 導入區塊 ===============
//* 基礎 React Hooks
import { useEffect, useRef, useState } from "react";

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
import OperationDialog from "./OperationDialog";
import ItemDialog from "./ItemDialog/index";

//* 自定義 Hooks
import { useTimelineData } from "../../hooks/schedule/useTimelineData";
import { useTimelineOperations } from "../../hooks/schedule/useTimelineOperations";
import { useTimelineConfig } from "../../hooks/schedule/useTimelineConfig";
import { useTimelineEvents } from "../../hooks/schedule/useTimelineEvents";
import { useTimelineInitialization } from "../../hooks/schedule/useTimelineInitialization";

//* 樣式
import { TimelineContainer } from "../../assets/schedule";

//* 常量與配置
import { momentLocaleConfig } from "../../configs/validations/schedule/timeline/timelineLocale";
import { useGetSmartScheduleQuery } from "../../services/schedule/smartSchedule";
import { useGetMachinesQuery } from "../../../QuotationManagementSystem/services/salesServices/endpoints/machineApi";

//! =============== 2. 全局初始化設定 ===============
// 設定日期本地化
dayjs.locale("zh-tw");

// 設定 moment 本地化配置
if (moment) {
  moment.updateLocale("zh-tw", momentLocaleConfig);
}

const useGetSmartSchedule = (area = "A") => {
  const {
    isSuccess,
    isLoading,
    data: scheduleList,
  } = useGetSmartScheduleQuery({
    productionArea: area,
  });
  return {
    isSuccess,
    isLoading,
    scheduleList,
  };
};
const useMachineGroups = (area = "A") => {
  const { isSuccess, isLoading, data: allArea } = useGetMachinesQuery();
  const filteredMachines = allArea?.data?.filter((machine) => {
    return machine.productionArea === area;
  });
  return {
    isSuccess,
    isLoading,
    allArea,
    filteredMachines,
  };
};

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

  // 獲取 api 資料
  const { isSuccess, isLoading, filteredMachines, allArea } =
    useMachineGroups(selectedArea);
  // 使用自定義 hook 獲取時間線數據
  const { itemsDataRef, groups } = useTimelineData(filteredMachines);
  // 使用自定義 hook 處理操作
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

  // 使用自定義 hook 獲取時間線配置選項
  const { getTimelineOptions } = useTimelineConfig(itemsDataRef, timeRange);

  // 使用自定義 hook 處理時間線事件
  const { setupTimelineEvents } = useTimelineEvents(setDialogState);

  // 使用自定義 hook 處理時間線初始化和清理
  const { initializeTimeline, cleanupTimeline } = useTimelineInitialization(
    containerRef,
    timelineRef,
    itemsDataRef,
    getTimelineOptions,
    groups
  );

  //! =============== 4. 副作用與生命週期 ===============
  useEffect(() => {
    try {
      // 初始化時間軸
      const timeline = initializeTimeline();

      // 設置事件監聽器，並獲取清理函數
      const cleanupEvents = setupTimelineEvents(timeline, itemsDataRef);

      // 返回清理函數
      return () => {
        cleanupEvents();
        cleanupTimeline();
      };
    } catch (error) {
      console.error("Timeline 操作失敗:", error);
      return () => {};
    }
  }, [initializeTimeline, setupTimelineEvents, itemsDataRef, cleanupTimeline]);

  //! =============== 5. 渲染 ===============
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <TimelineContainer>
        {/* 控制面板組件 */}
        <TimelineControls
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onAddItem={handleAddItem}
          onMoveToNow={handleMoveToNow}
          areaOptions={selectedArea}
          onAreaChange={setSelectedArea}
        />

        {/* 時間線容器 */}
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
      </TimelineContainer>

      {/* 項目編輯對話框 */}
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

      {/* 刪除確認對話框 */}
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
}

export default DynamicTimeline;
