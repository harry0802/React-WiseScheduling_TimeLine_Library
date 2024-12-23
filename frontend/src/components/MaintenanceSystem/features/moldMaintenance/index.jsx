import { useState } from "react";
import HeaderControls from "../../components/HeaderControls";
import MaintenanceTable from "../../components/MaintenanceTable";
import { Stack } from "@mui/material";
import { MAINTENANCE_ITEMS } from "./configs/maintenanceItems";
import MaintenanceDrawer from "../../components/MaintenanceDrawer/Index";
import { FORM_CONFIGS } from "./configs/formConfigs";
import { useMaintenanceHeaderParams } from "../../slice/MainteanceSlice";

import { transformToMaintenanceApiFormat } from "../../utils/dataTransformers";
import { FullScreenSpin } from "../../../Global/layout/FullScreenSpin";
import {
  useGetMoldMaintenanceQuery,
  useUpdateMoldMaintenanceMutation,
} from "./services/moldMaintenanceApi";
function MoldMaintenance() {
  // 統一的抽屜狀態管理
  const [drawerState, setDrawerState] = useState({
    isOpen: false,
    type: null, // 'inspector' | 'reinspector' | 'approver'
    currentRow: null,
  });
  const { maintenance } = useMaintenanceHeaderParams();

  const { data: maintenanceData, isFetching } = useGetMoldMaintenanceQuery(
    {
      moldSN: maintenance.moldSN,
      year: maintenance.year,
      week: maintenance.week,
    },
    {
      skip: !maintenance.moldSN || !maintenance.year || !maintenance.week,
    }
  );
  console.log("🚀 ~ MachineMaintenance ~ maintenanceData:", maintenanceData);
  const [updateMaintenance] = useUpdateMoldMaintenanceMutation();

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
      <HeaderControls model="moldMaintenance" />
      {isFetching ? (
        <FullScreenSpin />
      ) : (
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
export default MoldMaintenance;
