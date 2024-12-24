import { useState } from "react";
import HeaderControls from "../../components/HeaderControls";
import MaintenanceTable from "../../components/MaintenanceTable";
import { Stack } from "@mui/material";
import { MAINTENANCE_ITEMS } from "./configs/maintenanceItems";
import MaintenanceDrawer from "../../components/MaintenanceDrawer/Index";
import { FORM_CONFIGS } from "./configs/formConfigs";
import { useMaintenanceHeaderParams } from "../../slice/MainteanceSlice";
import {
  useGetWeeklyMaintenanceQuery,
  useUpdateMaintenanceMutation,
} from "./services/maintenanceApi";
import { transformToMaintenanceApiFormat } from "../../utils/dataTransformers";
import {
  FullScreenSpin,
  useLoadingSpinner,
} from "../../../Global/layout/FullScreenSpin";

function MachineMaintenance() {
  // 統一的抽屜狀態管理
  const [drawerState, setDrawerState] = useState({
    isOpen: false,
    type: null, // 'inspector' | 'reinspector' | 'approver'
    currentRow: null,
  });
  const { maintenance } = useMaintenanceHeaderParams();

  const {
    data: maintenanceData,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetWeeklyMaintenanceQuery(
    {
      machineId: maintenance.machineId,
      year: maintenance.year,
      week: maintenance.week,
    },
    {
      skip: !maintenance.machineId || !maintenance.year || !maintenance.week,
    }
  );
  const [updateMaintenance] = useUpdateMaintenanceMutation();

  const isSpinning = useLoadingSpinner({ isLoading, isFetching });

  // 統一的處理函數
  const handleEdit = (type, rowData) => {
    setDrawerState({
      isOpen: true,
      type,
      currentRow: rowData,
    });
  };

  // 關閉抽屜
  const handleCloseDrawer = () => {
    setDrawerState({
      type: null,
      currentRow: null,
      isOpen: false,
    });
  };
  const handleUpdateMaintenance = async (formData) => {
    const data = transformToMaintenanceApiFormat(
      formData,
      drawerState.type,
      maintenance
    );
    updateMaintenance(data);
  };

  return (
    <Stack direction="column" width="100%">
      <HeaderControls />
      {isSpinning && <FullScreenSpin />}
      {isSuccess && (
        <MaintenanceTable
          config={maintenanceData?.table}
          onEditInspector={(rowData) => handleEdit("inspector", rowData)}
          onEditReinspector={(rowData) => handleEdit("reinspector", rowData)}
          onEditApprover={(rowData) => handleEdit("approver", rowData)}
          fixedItems={MAINTENANCE_ITEMS}
        />
      )}

      {/* 這裡可以加入 MaintenanceDrawer 組件 */}
      {drawerState.isOpen && (
        <MaintenanceDrawer
          type={drawerState.type}
          onClose={handleCloseDrawer}
          visible={drawerState.isOpen}
          config={FORM_CONFIGS[drawerState.type]}
          initialData={maintenanceData?.forms[drawerState.type]}
          onSubmit={handleUpdateMaintenance}
        />
      )}
    </Stack>
  );
}
export default MachineMaintenance;
