import React from "react";
import { PRODUCTION_AREA } from "../../../config/config";
import {
  STATUS_MAP,
  StyledMenuItem,
  StyledSelect,
  Container,
  Box,
  TitleBox,
  Title,
  FilterSection,
  MachinesGrid,
  MachineBox,
} from "./MachineStatusBoard.styles";

import HandymanIcon from "@mui/icons-material/Handyman";

const MachineCard = ({ machineSN, status }) => (
  <MachineBox $status={status}>
    <div className="title-container">
      <h1>{machineSN}</h1>
    </div>

    <div className="status-container">
      <p>{STATUS_MAP[status]?.text || STATUS_MAP.waiting.text}</p>
      <HandymanIcon className="icon" />
    </div>
  </MachineBox>
);

const MachineStatusBoard = () => {
  const [area, setArea] = React.useState("A");

  // 模擬假資料
  const mockMachines = [
    { machineSN: "A01", productionArea: "A", status: "production" },
    { machineSN: "A02", productionArea: "A", status: "waiting" },
    { machineSN: "A03", productionArea: "A", status: "testing" },
    { machineSN: "A04", productionArea: "A", status: "error" },
    { machineSN: "A05", productionArea: "A", status: "tuning" },
    { machineSN: "B01", productionArea: "B", status: "production" },
    { machineSN: "B02", productionArea: "B", status: "waiting" },
  ];

  const filteredMachines = mockMachines.filter(
    (m) => m.productionArea === area
  );

  return (
    <Container>
      <Box>
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
        <MachinesGrid>
          {filteredMachines.map((machine) => (
            <MachineCard
              key={machine.machineSN}
              machineSN={machine.machineSN}
              status={machine.status}
            />
          ))}
        </MachinesGrid>
      </Box>
    </Container>
  );
};

export default MachineStatusBoard;
