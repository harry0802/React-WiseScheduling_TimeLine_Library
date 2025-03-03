/*
services/
├── apiSlice.js - API 基礎配置
└── endpoints/ - 各類端點 API
    ├── machineStatusApi.js - 機台狀態相關 API
    └── optionApi.js - 選項相關 API
*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../store/api/apiConfig";

const wiseSchedulingApiSlice = createApi({
  reducerPath: "wiseSchedulingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
  }),
  tagTypes: ["MachineStatus", "Option"],
  endpoints: () => ({}),
});

export default wiseSchedulingApiSlice;

/*
使用方式:
import { useGetMachineStatusQuery } from '@/components/WiseScheduling/services/endpoints/machineStatusApi';
import { useGetMachineStatusOptionsQuery } from '@/components/WiseScheduling/services/endpoints/optionApi';

const MachineStatusComponent = () => {
  const { data: machineStatus, isLoading } = useGetMachineStatusQuery('A');
  const { data: statusOptions } = useGetMachineStatusOptionsQuery();

  // 使用這些 hooks...
};
*/
