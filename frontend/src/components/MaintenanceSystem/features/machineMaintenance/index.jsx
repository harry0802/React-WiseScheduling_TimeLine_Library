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

  // 處理表單提交
  const handleUpdateMaintenance = async (formData) => {
    if (!formData) {
      console.error("formData 為 null 或 undefined");
      return;
    }

    try {
      // 獲取表單數據，確保傳遞有效的 maintenance 數據
      const data = transformToMaintenanceApiFormat(formData, drawerState.type, {
        machineId: maintenance.machineId || "default-machine-id",
        year: maintenance.year || new Date().getFullYear(),
        week: maintenance.week || 1,
        ...maintenance,
      });
      // 如果轉換成功，則調用更新
      if (data) {
        await updateMaintenance(data).unwrap();
      }
    } catch (error) {
      console.error("更新維護數據時發生錯誤:", error);
      // 可以在這裡添加錯誤處理，如顯示錯誤消息
    }
  };

  // 確保有有效的初始數據
  const getFormInitialData = () => {
    if (!maintenanceData?.forms) {
      return {
        machineId: maintenance.machineId || "default-machine-id",
        year: maintenance.year || new Date().getFullYear(),
        week: maintenance.week || 1,
        checkItems: {},
        personnel: "",
        date: new Date().toISOString(),
      };
    }

    return {
      machineId: maintenance.machineId || "default-machine-id",
      year: maintenance.year || new Date().getFullYear(),
      week: maintenance.week || 1,
      ...maintenanceData.forms[drawerState.type],
    };
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
          initialData={getFormInitialData()}
          onSubmit={handleUpdateMaintenance}
        />
      )}
    </Stack>
  );
}
export default MachineMaintenance;
