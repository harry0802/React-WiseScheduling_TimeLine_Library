import HeaderControls from "../../components/HeaderControls";
import MaintenanceTable from "../../components/MaintenanceTable";
import { Stack } from "@mui/material";

function MachineMaintenance() {
  return (
    <Stack direction="column" width="100%">
      <HeaderControls />
      <MaintenanceTable />
    </Stack>
  );
}

export default MachineMaintenance;
