/**
 * @file MachineStatusBoard.jsx
 * @description 機台狀態看板，用於顯示和管理廠區各機台狀態
 */

import React, { useState, useRef, useCallback } from "react";
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
import { v4 as uuidv4 } from "uuid";
/**
 * 區域選擇器元件
 */
const AreaSelector = ({ value, onChange }) => {
  return (
    <FilterSection>
      <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
        {PRODUCTION_AREA.map(({ value, label }) => (
          <StyledMenuItem key={value} value={value}>
            {label}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </FilterSection>
  );
};

/**
 * 機台卡片組件
 * - 根據狀態顯示不同顏色和圖標
 * - 運行中的機台不可點擊修改狀態
 */
const MachineCard = ({ machine, onClick }) => {
  const englishStatus = convertTimeLineStatus(machine.status);
  const statusText =
    STATUS_STYLE_MAP[englishStatus]?.text || STATUS_STYLE_MAP.IDLE.text;

  return (
    <MachineBox
      $status={englishStatus}
      onClick={englishStatus === "RUN" ? undefined : () => onClick(machine)}
      style={{
        cursor: englishStatus === "RUN" ? "not-allowed" : "pointer",
      }}
    >
      <div className="title-container">
        <h1>{machine.machineSN}</h1>
      </div>

      <div className="status-container">
        <p>{statusText}</p>
        {englishStatus !== "RUN" && <HandymanIcon className="icon" />}
      </div>
    </MachineBox>
  );
};

/**
 * 獲取機台數據的自訂 Hook
 */
const useMachineData = (area) => {
  const { data: machineStatus, isLoading } = useGetMachineStatusQuery(area);
  return {
    machines: machineStatus || [],
    isLoading,
  };
};

/**
 * 新增機台狀態的自訂 Hook
 */
const useCreateMachineStatus = () => {
  const [createMachineStatus, { isLoading }] = useCreateMachineStatusMutation();
  return {
    createMachineStatus,
    isLoading,
  };
};

/**
 * 修改機台狀態的自訂 Hook
 */
const useUpdateMachineStatus = () => {
  const [updateMachineStatus, { isLoading }] = useUpdateMachineStatusMutation();
  return {
    updateMachineStatus,
    isLoading,
  };
};

/**
 * 機台狀態看板主元件
 */
const MachineStatusBoard = () => {
  // 狀態管理
  const [area, setArea] = useState("A");
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const statusManagerRef = useRef(null);

  // 獲取機台數據
  const { machines, isLoading } = useMachineData(area);

  // 事件處理
  const handleMachineClick = useCallback((machine) => {
    setSelectedMachine(machine);
    setDrawerVisible(true);
  }, []);

  const { createMachineStatus, isLoading: isCreateLoading } =
    useCreateMachineStatus();
  const { updateMachineStatus, isLoading: isUpdateLoading } =
    useUpdateMachineStatus();

  const handleStatusUpdate = useCallback(async (data) => {
    console.log("更新機台狀態:", data);
    //TODO 這裡需要實現實際的狀態更新API調用
    if (data.id) {
      await updateMachineStatus({
        ...data,
        status: getChineseStatus(data.status),
      });
    } else {
      await createMachineStatus({
        ...data,
        status: getChineseStatus(data.status),
        planStartDate: data.planStartDate ?? data.actualStartDate,
        planEndDate: data.planEndDate ?? data.actualStartDate,
      });
    }

    setDrawerVisible(false);
    return data; // 返回提交結果
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerVisible(false);
  }, []);

  // 使用 StatusManager 中的表單提交方法
  const handleFormSubmit = useCallback(async () => {
    if (statusManagerRef.current) {
      console.log("開始提交表單");
      try {
        const success = await statusManagerRef.current.submit();
        console.log("表單提交結果:", success);
        if (success) {
          // 提交成功後自動關閉抽屜
          setDrawerVisible(false);
        }
      } catch (error) {
        console.error("表單提交發生錯誤:", error);
      }
    } else {
      console.warn("表單引用不存在");
    }
  }, []);

  // 加載狀態
  if (isLoading) {
    return <p>加載中...</p>;
  }

  return (
    <Container>
      <Box>
        {/* 標題與篩選 */}
        <TitleBox>
          <Title>機台狀態與保養紀錄</Title>
          <AreaSelector value={area} onChange={setArea} />
        </TitleBox>

        {/* 機台列表 */}
        <MachinesGrid>
          {machines.map((machine) => (
            <MachineCard
              // 時間戳記避免重複渲染
              key={uuidv4()}
              machine={machine}
              onClick={handleMachineClick}
            />
          ))}
        </MachinesGrid>
      </Box>

      {/* 機台狀態修改抽屉 */}
      <BaseDrawer
        visible={drawerVisible}
        onClose={handleDrawerClose}
        width={700}
      >
        <BaseDrawer.Header>修改機台狀態</BaseDrawer.Header>
        <BaseDrawer.Body>
          {selectedMachine && (
            <StatusManager
              ref={statusManagerRef}
              initialData={selectedMachine}
              onSubmit={handleStatusUpdate}
            />
          )}
        </BaseDrawer.Body>
        <BaseDrawer.Footer onSubmit={handleFormSubmit} />
      </BaseDrawer>
    </Container>
  );
};

export default MachineStatusBoard;
