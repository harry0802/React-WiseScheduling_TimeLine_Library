/**
 * @file useMachineBoard.js
 * @description 機台看板業務邏輯 Hook
 * @author Harry's Engineering Team
 */

import { useState, useCallback, useMemo } from "react";
import {
  useCreateMachineStatusMutation,
  useGetMachineStatusQuery,
  useUpdateMachineStatusMutation,
} from "../../services";
import {
  STATUS_STYLE_MAP,
  STATUS_NAME_MAP,
} from "../../configs/constants/fieldNames";

/**
 * 機台看板業務邏輯 Hook
 * @param {string} initialArea - 初始區域
 * @returns {Object} 機台看板相關狀態和方法
 */
export const useMachineBoard = (initialArea = "A") => {
  // 狀態管理
  const [area, setArea] = useState(initialArea);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // API Hooks
  const {
    data: machineStatus,
    isLoading,
    error,
  } = useGetMachineStatusQuery(area);
  const [createMachineStatus] = useCreateMachineStatusMutation();
  const [updateMachineStatus] = useUpdateMachineStatusMutation();

  // 處理機台數據
  const processedMachines = useMemo(() => {
    if (!machineStatus?.length) return [];

    // 先處理機台數據
    const processedData = machineStatus.map((machine) => {
      const englishStatus = machine.status;
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

    // 按機台編號自然排序 (A1, A2, A10, A11...)
    return processedData.sort((a, b) => {
      return a.machine.machineSN.localeCompare(b.machine.machineSN, 'zh-TW', { 
        numeric: true, 
        sensitivity: 'base' 
      });
    });
  }, [machineStatus]);

  // 事件處理
  const handleAreaChange = useCallback((e) => {
    setArea(e.target.value);
  }, []);

  const handleMachineClick = useCallback((machineData) => {
    setSelectedMachine(machineData.machine);
    setDrawerVisible(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setDrawerVisible(false);
    setSelectedMachine(null);
  }, []);

  // 狀態更新邏輯
  const handleUpdateStatus = useCallback(
    async (data) => {
      try {
        const allowedStatusList = ["TUNING", "TESTING", "OFFLINE"];
        const shouldIncludeStatus = allowedStatusList.includes(data.status);

        let statusData;
        if (shouldIncludeStatus) {
          statusData = {
            ...data,
            status: STATUS_NAME_MAP[data.status] || data.status,
          };
        } else {
          const { status, ...payloadWithoutStatus } = data;
          statusData = payloadWithoutStatus;
        }

        if (data.id) {
          await updateMachineStatus(statusData);
        } else {
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

  return {
    // 狀態
    area,
    selectedMachine,
    drawerVisible,
    processedMachines,
    isLoading,
    error,

    // 方法
    handleAreaChange,
    handleMachineClick,
    handleCloseDrawer,
    handleUpdateStatus,
  };
};
