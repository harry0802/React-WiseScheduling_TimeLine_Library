import { useState } from "react";
import HeaderControls from "../../components/HeaderControls";
import MaintenanceTable from "../../components/MaintenanceTable";
import { Stack } from "@mui/material";

function MachineMaintenance() {
  const [editInspector, setEditInspector] = useState(null);
  const [editReinspector, setEditReinspector] = useState(null);
  const [editApprover, setEditApprover] = useState(null);

  const handleEditInspector = () => {
    console.log("editInspector");
    setEditInspector(true);
  };

  const handleEditReinspector = () => {
    console.log("editReinspector");
    setEditReinspector(true);
  };

  const handleEditApprover = () => {
    console.log("editApprover");
    setEditApprover(true);
  };

  return (
    <Stack direction="column" width="100%">
      <HeaderControls />
      <MaintenanceTable
        onEditInspector={handleEditInspector}
        onEditReinspector={handleEditReinspector}
        onEditApprover={handleEditApprover}
      />
    </Stack>
  );
}

export default MachineMaintenance;
