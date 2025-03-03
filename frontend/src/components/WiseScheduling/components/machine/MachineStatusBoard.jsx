import React, { useState, useRef, useCallback } from "react";

import HandymanIcon from "@mui/icons-material/Handyman";
import BaseDrawer from "../../../Global/Drawer/BaseDrawer";
import MachineStatusManager from "./MachineStatus";
import {
  convertTimeLineStatus,
  STATUS_STYLE_MAP,
} from "../../utils/statusConverter";
import { mockEvents } from "../../mock/mockData";
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
import { PRODUCTION_AREA } from "../../../../config/config";
import { useGetMachineStatusQuery } from "../../services";

const MachineCard = ({ machine, onClick }) => {
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
          {STATUS_STYLE_MAP[englishStatus]?.text ||
            STATUS_STYLE_MAP.IDLE.text}
        </p>
        {!isRunning && <HandymanIcon className="icon" />}
      </div>
    </MachineBox>
  );
};

const MachineStatusBoard = () => {
  const [area, setArea] = useState("A");
  const { data: machineStatus, isLoading } = useGetMachineStatusQuery(area);
  console.log("🚀 ~ MachineStatusBoard ~ machineStatus:", machineStatus);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const formRef = useRef(null);

  const machines = machineStatus || [];

  const handleMachineClick = (machine) => {
    setSelectedMachine(machine);
    setDrawerVisible(true);
  };

  const handleStatusUpdate = async (data) => {
    console.log("更新機台狀態:", data);

    // 這裡處理狀態更新邏輯
    setDrawerVisible(false);
  };

  const handleSubmit = useCallback(async () => {
    if (!formRef.current) return;

    try {
      const data = formRef.current.getFormValues();
      console.log("Form Values:", data);

      const isValid = await formRef.current.validateForm();
      console.log("Form Validation:", isValid);

      if (isValid.isValid) {
        await handleStatusUpdate(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Submit Error:", error);
      return false;
    }
  }, []);

  if (isLoading) {
    return <p>加載中...</p>;
  }

  return (
    <Container>
      <Box>
        {/* 標題 */}
        <TitleBox>
          <Title>機台狀態與保養紀錄</Title>
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
          {isLoading ? (
            <p>加載中...</p>
          ) : (
            machines?.map((machine) => (
              <MachineCard
                key={machine.machineId}
                machine={machine}
                onClick={handleMachineClick}
              />
            ))
          )}
        </MachinesGrid>
      </Box>
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

export default MachineStatusBoard;
