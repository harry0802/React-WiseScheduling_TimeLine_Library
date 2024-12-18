import { useState } from "react";
import HeaderControls from "../../components/HeaderControls";
import MaintenanceTable from "../../components/MaintenanceTable";
import { Stack } from "@mui/material";
const testConfig = {
  rows: [
    {
      maintenanceCheckItem: "boxClean",
      maintenanceMethod: "詳細檢查",
      inspectionResult: "OK",
      inspector: "inspector",
      inspectionDate: "2024-12-16",
      reinspectionResult: "OK",
      reinspector: "reinspector",
      reinspectionDate: "2024-12-17",
      approver: "approver",
      approvalDate: "2024-12-18",
    },
    {
      maintenanceCheckItem: "boxClean",
      maintenanceMethod: "詳細檢查",
      inspectionResult: "OK",
      inspector: "inspector",
      inspectionDate: "2024-12-16",
      reinspectionResult: "OK",
      reinspector: "reinspector",
      reinspectionDate: "2024-12-17",
      approver: "approver",
      approvalDate: "2024-12-18",
    },
    {
      maintenanceCheckItem: "boxClean",
      maintenanceMethod: "詳細檢查",
      inspectionResult: "OK",
      inspector: "inspector",
      inspectionDate: "2024-12-16",
      reinspectionResult: "OK",
      reinspector: "reinspector",
      reinspectionDate: "2024-12-17",
      approver: "approver",
      approvalDate: "2024-12-18",
    },
    {
      maintenanceCheckItem: "boxClean",
      maintenanceMethod: "詳細檢查",
      inspectionResult: "OK",
      inspector: "inspector",
      inspectionDate: "2024-12-16",
      reinspectionResult: "OK",
      reinspector: "reinspector",
      reinspectionDate: "2024-12-17",
      approver: "approver",
      approvalDate: "2024-12-18",
    },
    {
      maintenanceCheckItem: "boxClean",
      maintenanceMethod: "詳細檢查",
      inspectionResult: "OK",
      inspector: "inspector",
      inspectionDate: "2024-12-16",
      reinspectionResult: "OK",
      reinspector: "reinspector",
      reinspectionDate: "2024-12-17",
      approver: "approver",
      approvalDate: "2024-12-18",
    },
  ],
};
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
        config={testConfig}
        onEditInspector={handleEditInspector}
        onEditReinspector={handleEditReinspector}
        onEditApprover={handleEditApprover}
      />
    </Stack>
  );
}

export default MachineMaintenance;
