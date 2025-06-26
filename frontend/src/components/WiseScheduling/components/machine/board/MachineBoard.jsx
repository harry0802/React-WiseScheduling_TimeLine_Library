/**
 * @file MachineBoard.jsx
 * @description 機台狀態看板
 * @author Harry's Engineering Team
 */

import React, { useRef, useCallback } from "react";
import BaseDrawer from "../../../../Global/Drawer/BaseDrawer";
import StatusManager from "../manager/StatusManager";
import { useMachineBoard } from "../../../hooks/machine/useMachineBoard";
import MachineCard from "./components/MachineCard";
import AreaSelector from "./components/AreaSelector";
import {
  Container,
  Box,
  TitleBox,
  Title,
  MachinesGrid,
} from "../../../assets/machineBoard.styles";

/**
 * 加載狀態組件
 * @returns {JSX.Element} 加載中顯示組件
 */
const LoadingState = () => (
  <Container>
    <Box>
      <p>加載中...</p>
    </Box>
  </Container>
);

/**
 * 錯誤狀態組件
 * @returns {JSX.Element} 錯誤顯示組件
 */
const ErrorState = () => (
  <Container>
    <Box>
      <p>載入機台狀態時發生錯誤，請重新整理頁面</p>
    </Box>
  </Container>
);

/**
 * 機台看板標題區域組件
 * @param {Object} props - 組件屬性
 * @param {string} props.area - 當前區域
 * @param {Function} props.onAreaChange - 區域變更處理函數
 * @returns {JSX.Element} 標題區域組件
 */
const BoardHeader = ({ area, onAreaChange }) => (
  <TitleBox>
    <Title>機台狀態與保養紀錄</Title>
    <AreaSelector area={area} onAreaChange={onAreaChange} />
  </TitleBox>
);

/**
 * 機台網格組件
 * @param {Object} props - 組件屬性
 * @param {Array} props.machines - 機台數據列表
 * @param {Function} props.onMachineClick - 機台點擊處理函數
 * @returns {JSX.Element} 機台網格組件
 */
const MachinesGridContainer = ({ machines, onMachineClick }) => (
  <MachinesGrid>
    {machines.map((machineData) => (
      <MachineCard
        key={machineData.machine.machineSN}
        machineData={machineData}
        onMachineClick={onMachineClick}
      />
    ))}
  </MachinesGrid>
);

/**
 * 狀態管理抽屜組件
 * @param {Object} props - 組件屬性
 * @param {boolean} props.visible - 抽屜可見性
 * @param {Function} props.onClose - 關閉處理函數
 * @param {Object} props.selectedMachine - 選中的機台
 * @param {Function} props.onUpdateStatus - 狀態更新處理函數
 * @param {Function} props.onSubmit - 表單提交處理函數
 * @param {React.RefObject} props.statusManagerRef - StatusManager 引用
 * @returns {JSX.Element} 狀態管理抽屜組件
 */
const StatusDrawer = ({
  visible,
  onClose,
  selectedMachine,
  onUpdateStatus,
  onSubmit,
  statusManagerRef,
}) => (
  <BaseDrawer visible={visible} onClose={onClose} width={700}>
    <BaseDrawer.Header>修改機台狀態</BaseDrawer.Header>
    <BaseDrawer.Body>
      {selectedMachine && (
        <StatusManager
          ref={statusManagerRef}
          initialData={selectedMachine}
          onSubmit={onUpdateStatus}
          machineId={selectedMachine.machineId}
        />
      )}
    </BaseDrawer.Body>
    <BaseDrawer.Footer onSubmit={onSubmit} />
  </BaseDrawer>
);

/**
 * 機台狀態看板主組件
 * @returns {JSX.Element} 機台狀態看板組件
 */
function MachineStatusBoard() {
  const statusManagerRef = useRef(null);

  const {
    area,
    selectedMachine,
    drawerVisible,
    processedMachines,
    isLoading,
    error,
    handleAreaChange,
    handleMachineClick,
    handleCloseDrawer,
    handleUpdateStatus,
  } = useMachineBoard();

  /**
   * 表單提交處理函數
   * @returns {Promise<boolean>} 提交結果
   */
  const handleSubmitForm = useCallback(async () => {
    if (!statusManagerRef.current) {
      console.warn("表單引用不存在");
      return false;
    }

    try {
      const success = await statusManagerRef.current.submit();
      return success;
    } catch (error) {
      console.error("表單提交發生錯誤:", error);
      return false;
    }
  }, []);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <Container>
      <Box>
        <BoardHeader area={area} onAreaChange={handleAreaChange} />
        <MachinesGridContainer
          machines={processedMachines}
          onMachineClick={handleMachineClick}
        />
      </Box>

      <StatusDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        selectedMachine={selectedMachine}
        onUpdateStatus={handleUpdateStatus}
        onSubmit={handleSubmitForm}
        statusManagerRef={statusManagerRef}
      />
    </Container>
  );
}

export default MachineStatusBoard;
