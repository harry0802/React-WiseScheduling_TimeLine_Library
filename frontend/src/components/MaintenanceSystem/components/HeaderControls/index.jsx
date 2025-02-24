import { Stack } from "@mui/material";
import MachineSelector from "./MachineSelector";
import DatePicker from "./DatePicker";
import styled from "@emotion/styled";
import { useMaintenanceHeaderParams } from "../../slice/MainteanceSlice";
import { Typography } from "antd";
import MoldSelector from "./MoldSelector";

const HeaderWrapper = styled(Stack)`
  width: 100%;
  padding: 16px;
  min-height: 80px;
  padding: 16px;
  background: var(--color-background-base);
  border-bottom: 1px solid #444;
`;

const Title = styled(Typography)`
  && {
    color: var(--color-primary-text);
    margin-right: auto;
    justify-self: flex-start;
    font-size: 24px;
    font-weight: 600;
  }
`;

function HeaderControls({ model = "machineMaintenance" }) {
  const { maintenance, updateMaintenanceHeaderParams } =
    useMaintenanceHeaderParams();
  const handleMachineChange = ({ area, machineId }) => {
    const newParams = { area, machineId };
    updateMaintenanceHeaderParams(newParams);
  };

  const handleMoldChange = (moldId) => {
    const newParams = { moldSN: moldId };
    updateMaintenanceHeaderParams(newParams);
  };

  return (
    <HeaderWrapper
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
    >
      <Title>
        {model === "machineMaintenance" ? "機台" : "模具"}維護保養紀錄單
      </Title>

      {model === "machineMaintenance" && (
        <MachineSelector
          value={{ area: maintenance.area, machineId: maintenance.machineId }}
          onChange={handleMachineChange}
        />
      )}
      {model === "moldMaintenance" && (
        <MoldSelector
          value={maintenance.moldSN || ""}
          onChange={handleMoldChange}
        />
      )}

      <DatePicker />
    </HeaderWrapper>
  );
}

export default HeaderControls;
