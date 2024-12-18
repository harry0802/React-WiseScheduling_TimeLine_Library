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

function HeaderControls({ onParamsChange }) {
  const { maintenance, updateMaintenanceHeaderParams } =
    useMaintenanceHeaderParams();

  const [params, setParams] = useState({
    area: maintenance.area || "",
    machineId: maintenance.machineId || "",
    date: maintenance.date || timeUtils.getNow(),
    week: maintenance.week,
    year: maintenance.year,
  });

  const handleMachineChange = ({ area, machineId }) => {
    const newParams = { area, machineId };
    updateMaintenanceHeaderParams(newParams);
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  useEffect(() => {
    onParamsChange?.(params);
  }, [params, onParamsChange]);

  return (
    <HeaderWrapper
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={8}
    >
      <MachineSelector
        value={{ area: params.area, machineId: params.machineId }}
        onChange={handleMachineChange}
      />
      <DatePicker />
    </HeaderWrapper>
  );
}

export default HeaderControls;
