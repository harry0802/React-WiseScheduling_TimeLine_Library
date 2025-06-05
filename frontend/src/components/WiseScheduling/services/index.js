// 集中導出所有 API
import apiSlice from "./apiSlice";
import {
  useGetMachineStatusQuery,
  useCreateMachineStatusMutation,
  useUpdateMachineStatusMutation,
  useDeleteMachineStatusMutation,
} from "./machine/machineStatusApi";

import { useGetMachineStatusOptionsQuery } from "./machine/optionApi";

// 導出 API 切片
export { apiSlice };

// 導出所有自動生成的 hooks
export {
  // 機台狀態 API hooks
  useGetMachineStatusQuery,
  useCreateMachineStatusMutation,
  useUpdateMachineStatusMutation,
  useDeleteMachineStatusMutation,

  // 選項 API hooks
  useGetMachineStatusOptionsQuery,
};
