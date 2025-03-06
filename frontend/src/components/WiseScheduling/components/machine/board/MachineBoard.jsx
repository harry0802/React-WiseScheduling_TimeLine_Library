/**
 * @file MachineStatusBoard.jsx
 * @description 機台狀態看板，用於顯示和管理廠區各機台狀態
 * @version 1.1.0
 */

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置，便於統一管理
import React, { useState, useRef, useCallback } from "react";
import HandymanIcon from "@mui/icons-material/Handyman";

// 專案設定
import { PRODUCTION_AREA } from "../../../../../config/config";

// API 服務
import { useGetMachineStatusQuery } from "../../../services";

// 狀態處理
import {
  convertTimeLineStatus,
  STATUS_STYLE_MAP,
} from "../../../utils/statusConverter";

// 共用組件
import BaseDrawer from "../../../../Global/Drawer/BaseDrawer";
import StatusManager from "../manager/StatusManager";

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
} from "../../../assets/machineBoard.styles";

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
 * 區域選擇器元件，用於篩選不同生產區域
 *
 * @function AreaSelector
 * @param {Object} props - 元件屬性
 * @param {string} props.value - 選中的區域值
 * @param {Function} props.onChange - 區域變更時的回調函數
 * @returns {React.ReactElement} 區域選擇界面
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
 * 機台卡片組件，用於顯示單個機台的狀態
 *
 * @function MachineCard
 * @param {MachineCardProps} props - 組件屬性
 * @returns {React.ReactElement} 機台卡片界面
 *
 * @example
 * <MachineCard machine={machineData} onClick={handleClick} />
 *
 * @notes
 * - 根據機台狀態顯示不同的顏色和圖標
 * - 運行中的機台不可點擊修改狀態
 */
const MachineCard = ({ machine, onClick }) => {
  //* 轉換機台狀態為英文狀態碼
  const englishStatus = convertTimeLineStatus(machine.status);

  //* 從狀態映射中獲取顯示文字，若找不到則使用預設值
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
 * 機台狀態看板，使用自訂 Hook 處理數據邏輯
 *
 * @function useMachineData
 * @param {string} area - 選中的區域
 * @returns {Object} 機台數據和加載狀態
 */
const useMachineData = (area) => {
  const { data: machineStatus, isLoading } = useGetMachineStatusQuery(area);
  return {
    machines: machineStatus || [],
    isLoading,
  };
};

/**
 * 機台狀態看板，顯示所有機台並允許修改狀態
 *
 * @function MachineStatusBoard
 * @returns {React.ReactElement} 機台狀態看板界面
 *
 * @example
 * <MachineStatusBoard />
 *
 * @notes
 * - 使用 RTK Query 獲取機台數據
 * - 支援按生產區域篩選機台
 * - 點擊機台可打開抽屜修改狀態
 *
 * @commonErrors
 * - 資料加載失敗: 檢查網絡連接或API狀態
 * - 表單驗證失敗: 檢查必填欄位
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
  //* 使用自訂 Hook 獲取機台數據
  const { machines, isLoading } = useMachineData(area);

  //! --------- 事件處理函數 ---------

  /**
   * 處理點擊機台卡片事件
   *
   * @function handleMachineClick
   * @param {Machine} machine - 被點擊的機台資料
   */
  const handleMachineClick = useCallback((machine) => {
    setSelectedMachine(machine);
    setDrawerVisible(true);
  }, []);

  /**
   * 處理機台狀態更新
   *
   * @function handleStatusUpdate
   * @param {Object} data - 更新的機台狀態資料
   */
  const handleStatusUpdate = useCallback(async (data) => {
    console.log("更新機台狀態:", data);
    //TODO 這裡需要實現實際的狀態更新API調用
    setDrawerVisible(false);
  }, []);

  /**
   * 處理抽屜關閉
   *
   * @function handleDrawerClose
   */
  const handleDrawerClose = useCallback(() => {
    setDrawerVisible(false);
  }, []);

  /**
   * 處理表單提交
   *
   * @function handleSubmit
   * @returns {Promise<boolean>} 提交是否成功
   */
  const handleSubmit = useCallback(async () => {
    // 🧠 提前檢查並返回，避免深層嵌套
    if (!formRef.current) {
      return false;
    }

    // 驗證表單數據
    const { isValid } = await formRef.current.validate();

    // 💡 驗證失敗時提前退出
    if (!isValid) {
      return false;
    }

    // 獲取並提交表單數據
    const data = formRef.current.getValues();
    console.log("提交數據:", data);
    await handleStatusUpdate(data);
    return true;
  }, [handleStatusUpdate]);

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

          {/* 選擇區域 - 抽離為獨立組件 */}
          <AreaSelector value={area} onChange={setArea} />
        </TitleBox>

        {/* 機台列表 */}
        <MachinesGrid>
          {machines.map((machine) => (
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
        onClose={handleDrawerClose}
        width={700}
      >
        <BaseDrawer.Header>修改機台狀態</BaseDrawer.Header>
        <BaseDrawer.Body>
          {selectedMachine && (
            <StatusManager
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

export default MachineStatusBoard;
