/**
 * @file MachineStatusBoard.jsx
 * @description 機台狀態看板，用於顯示和管理廠區各機台狀態
 * @version 1.0.0
 */

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置，便於統一管理
import React, { useState, useRef, useCallback } from "react";
import HandymanIcon from "@mui/icons-material/Handyman";

// 專案設定
import { PRODUCTION_AREA } from "../../../../config/config";

// API 服務
import { useGetMachineStatusQuery } from "../../services";

// 狀態處理
import {
  convertTimeLineStatus,
  STATUS_STYLE_MAP,
} from "../../utils/statusConverter";

// 共用組件
import BaseDrawer from "../../../Global/Drawer/BaseDrawer";
import MachineStatusManager from "./MachineStatusManager";

// 樣式組件
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
} from "../../assets/machineBoard.styles";

//! =============== 2. 類型與介面 ===============
//* 定義所有資料結構，幫助理解資料流向
/**
 * @typedef {Object} Machine
 * @property {string} machineId - 機台唯一識別碼(變更為機台是否上機)
 * @property {string} machineSN - 機台序號
 * @property {string} status - 機台狀態（中文）
 * @property {string} productionArea - 生產區域
 */

/**
 * @typedef {Object} MachineCardProps
 * @property {Machine} machine - 機台數據
 * @property {Function} onClick - 點擊機台卡片的處理函數
 */

//! =============== 3. 核心功能 ===============
//* 主要業務邏輯區，每個功能都配有詳細說明

/**
 * @function MachineCard
 * @description 機台卡片組件，用於顯示單個機台的狀態
 * @param {MachineCardProps} props - 組件屬性
 * @returns {React.ReactElement} 機台卡片界面
 *
 * @example
 * <MachineCard machine={machineData} onClick={handleClick} />
 */
const MachineCard = ({ machine, onClick }) => {
  //* 轉換機台狀態為英文狀態碼
  const englishStatus = convertTimeLineStatus(machine.status);
  const isRunning = englishStatus === "RUN";

  return (
    <MachineBox
      $status={englishStatus}
      onClick={!isRunning ? () => onClick(machine) : undefined}
      style={{
        cursor: isRunning ? "not-allowed" : "pointer",
      }}
    >
      <div className="title-container">
        <h1>{machine.machineSN}</h1>
      </div>

      <div className="status-container">
        <p>
          {STATUS_STYLE_MAP[englishStatus]?.text || STATUS_STYLE_MAP.IDLE.text}
        </p>
        {!isRunning && <HandymanIcon className="icon" />}
      </div>
    </MachineBox>
  );
};

/**
 * @function MachineStatusBoard
 * @description 機台狀態看板，顯示所有機台並允許修改狀態
 * @returns {React.ReactElement} 機台狀態看板界面
 */
const MachineStatusBoard = () => {
  //! --------- 狀態管理 ---------
  //* 選擇的生產區域
  const [area, setArea] = useState("A");

  //* 抽屜狀態與選中機台
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  //* 表單引用
  const formRef = useRef(null);

  //! --------- 資料獲取 ---------
  //* 獲取對應區域的機台狀態數據
  const { data: machineStatus, isLoading } = useGetMachineStatusQuery(area);
  const machines = machineStatus || [];

  //! --------- 事件處理 ---------
  /**
   * @function handleMachineClick
   * @description 處理點擊機台卡片事件
   * @param {Machine} machine - 被點擊的機台資料
   */
  const handleMachineClick = (machine) => {
    setSelectedMachine(machine);
    setDrawerVisible(true);
  };

  /**
   * @function handleStatusUpdate
   * @description 處理機台狀態更新
   * @param {Object} data - 更新的機台狀態資料
   */
  const handleStatusUpdate = async (data) => {
    console.log("更新機台狀態:", data);
    //TODO 這裡需要實現實際的狀態更新API調用
    setDrawerVisible(false);
  };

  /**
   * @function handleSubmit
   * @description 處理表單提交
   * @returns {Promise<boolean>} 提交是否成功
   */
  const handleSubmit = useCallback(async () => {
    if (formRef.current) {
      const isValid = await formRef.current.validateForm();
      if (isValid) {
        const data = formRef.current.getFormValues();
        console.log("提交数据:", data);
        await handleStatusUpdate(data);
        return true;
      }
    }
    return false;
  }, []);

  //! --------- 渲染邏輯 ---------
  //* 加載狀態
  if (isLoading) {
    return <p>加載中...</p>;
  }

  return (
    <Container>
      <Box>
        {/* 標題與篩選 */}
        <TitleBox>
          <Title>機台狀態與保養紀錄</Title>
          {/* 選擇區域 */}
          <FilterSection>
            <StyledSelect
              value={area}
              style={{ width: 180, height: 60 }}
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

        {/* 機台列表 */}
        <MachinesGrid>
          {machines?.map((machine) => (
            <MachineCard
              key={machine.machineId}
              machine={machine}
              onClick={handleMachineClick}
            />
          ))}
        </MachinesGrid>
      </Box>

      {/* 機台狀態修改抽屉 */}
      <BaseDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={700}
      >
        <BaseDrawer.Header>修改機台狀態</BaseDrawer.Header>
        <BaseDrawer.Body>
          {selectedMachine && (
            <MachineStatusManager
              ref={formRef}
              initialData={selectedMachine}
              onSubmit={handleStatusUpdate}
            />
          )}
        </BaseDrawer.Body>
        <BaseDrawer.Footer onSubmit={handleSubmit} />
      </BaseDrawer>
    </Container>
  );
};

//! =============== 4. 工具函數 ===============
//* 通用功能區，可被多個模組復用
// 此模組沒有獨立的工具函數

export default MachineStatusBoard;
