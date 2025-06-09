/**
 * @file MachineBoard.jsx
 * @description 機台狀態看板 - 簡化版本
 * @version 2.0.0
 */

import React, { useState, useRef, useCallback, useMemo } from "react";
import HandymanIcon from "@mui/icons-material/Handyman";

// 導入
import { PRODUCTION_AREA } from "../../../../../config/config";
import {
  useCreateMachineStatusMutation,
  useGetMachineStatusQuery,
  useUpdateMachineStatusMutation,
} from "../../../services";
import {
  convertTimeLineStatus,
  getChineseStatus,
  STATUS_STYLE_MAP,
} from "../../../configs/constants/fieldNames";
import BaseDrawer from "../../../../Global/Drawer/BaseDrawer";
import StatusManager from "../manager/StatusManager";
import {
  StyledMenuItem,
  StyledSelect,
  Container,
  Box,
  TitleBox,
  Title,
  FilterSection,
  MachinesGrid,
  MachineBox,
} from "../../../assets/machineBoard.styles";

/**
 * 機台狀態看板組件 - 簡化版本
 */
function MachineStatusBoard() {
  // 1. 基礎狀態
  const [area, setArea] = useState("A");
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const statusManagerRef = useRef(null);

  // 2. API 調用
  const { data: machineStatus, isLoading } = useGetMachineStatusQuery(area);
  const [createMachineStatus, { isLoading: isCreateLoading }] =
    useCreateMachineStatusMutation();
  const [updateMachineStatus, { isLoading: isUpdateLoading }] =
    useUpdateMachineStatusMutation();

  // 3. 處理機台數據
  const processedMachines = useMemo(() => {
    if (!machineStatus) return [];

    return machineStatus.map((machine) => {
      const englishStatus = convertTimeLineStatus(machine.status);
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
  }, [machineStatus]);
  // 4. 事件處理
  const handleMachineClick = useCallback((machineData) => {
    setSelectedMachine(machineData.machine);
    setDrawerVisible(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setDrawerVisible(false);
  }, []);

  const handleSubmitForm = useCallback(async () => {
    if (!statusManagerRef.current) {
      console.warn("表單引用不存在");
      return false;
    }

    try {
      const success = await statusManagerRef.current.submit();
      if (success) {
        setDrawerVisible(false);
      }
      return success;
    } catch (error) {
      console.error("表單提交發生錯誤:", error);
      return false;
    }
  }, []);

  const handleUpdateStatus = useCallback(
    async (data) => {
      console.log("更新機台狀態:", data);

      try {
        if (data.id) {
          await updateMachineStatus({
            ...data,
            status: getChineseStatus(data.status),
          });
        } else {
          // 計算計劃開始時間
          let planEndDate = null;
          if (data.planStartDate) {
            planEndDate = data.planStartDate;
          } else if (data.actualStartDate) {
            const date = new Date(data.actualStartDate);
            date.setHours(date.getHours() + 1);
            planEndDate = date.toISOString();
          }

          await createMachineStatus({
            ...data,
            status: getChineseStatus(data.status),
            planStartDate: data.planStartDate ?? data.actualStartDate,
            planEndDate,
          });
        }

        setDrawerVisible(false);
        return data;
      } catch (error) {
        console.error("更新狀態失敗:", error);
        throw error;
      }
    },
    [createMachineStatus, updateMachineStatus]
  );

  // 5. 渲染
  if (isLoading) {
    return <p>加載中...</p>;
  }

  return (
    <Container>
      <Box>
        <TitleBox>
          <Title>機台狀態與保養紀錄</Title>

          {/* 區域選擇器 */}
          <FilterSection>
            <StyledSelect
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              {PRODUCTION_AREA.map(({ value, label }) => (
                <StyledMenuItem key={value} value={value}>
                  {label}
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </FilterSection>
        </TitleBox>

        {/* 機台網格 */}
        <MachinesGrid>
          {processedMachines.map((machineData, index) => (
            <MachineBox
              key={machineData.machine.machineId}
              $status={machineData.englishStatus}
              onClick={
                machineData.isClickable
                  ? () => handleMachineClick(machineData)
                  : undefined
              }
              style={{
                cursor: machineData.isClickable ? "pointer" : "not-allowed",
              }}
            >
              <div className="title-container">
                <h1>{machineData.machine.machineSN}</h1>
              </div>

              <div className="status-container">
                <p>{machineData.statusText}</p>
                {machineData.showIcon && <HandymanIcon className="icon" />}
              </div>
            </MachineBox>
          ))}
        </MachinesGrid>
      </Box>

      {/* 狀態編輯抽屜 */}
      <BaseDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        width={700}
      >
        <BaseDrawer.Header>修改機台狀態</BaseDrawer.Header>
        <BaseDrawer.Body>
          {selectedMachine && (
            <StatusManager
              ref={statusManagerRef}
              initialData={selectedMachine}
              onSubmit={handleUpdateStatus}
            />
          )}
        </BaseDrawer.Body>
        <BaseDrawer.Footer onSubmit={handleSubmitForm} />
      </BaseDrawer>
    </Container>
  );
}

export default MachineStatusBoard;
