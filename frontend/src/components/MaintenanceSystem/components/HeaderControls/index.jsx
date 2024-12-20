import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import MachineSelector from "./MachineSelector";
import DatePicker from "./DatePicker";
import styled from "@emotion/styled";
import timeUtils from "../../utils/timeUtils";
import { useMaintenanceHeaderParams } from "../../slice/MainteanceSlice";

const HeaderWrapper = styled(Stack)`
  padding: 16px;
  width: 100%;
  height: 80px;
  padding: 16px 0;
  border-bottom: 1px solid #444;
`;

function HeaderControls() {
  const { maintenance, updateMaintenanceHeaderParams } =
    useMaintenanceHeaderParams();

  const handleMachineChange = ({ area, machineId }) => {
    const newParams = { area, machineId };
    updateMaintenanceHeaderParams(newParams);
  };

  return (
    <HeaderWrapper
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={8}
    >
      <MachineSelector
        value={{ area: maintenance.area, machineId: maintenance.machineId }}
        onChange={handleMachineChange}
      />
      <DatePicker />
    </HeaderWrapper>
  );
}

export default HeaderControls;
