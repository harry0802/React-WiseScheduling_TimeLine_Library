import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useGetInspectionTypesQuery } from "../service/endpoints/inspectionApi";

import React from "react";
import { useGetProductionScheduleByMachinesQuery } from "../../../store/api/productionScheduleApi";

const initialState = {
  account: "",
  password: "",
  isAuthenticated: false,
  userType: null,
  inspectionTypes: [],
  productionSchedules: [],
};

const actions = (set) => ({
  setAccount: (account) => set({ account }),
  setPassword: (password) => set({ password }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUserType: (userType) => set({ userType }),
  setInspectionTypes: (types) => set({ inspectionTypes: types }),
  setProductionSchedules: (schedules) =>
    set({ productionSchedules: schedules }),
  login: (account, password, userType) =>
    set({
      account,
      password,
      isAuthenticated: true,
      userType,
    }),
  logout: () => set(initialState),
});

const useQmsStore = create(
  persist(
    (set) => ({
      ...initialState,
      ...actions(set),
    }),
    {
      name: "qms-storage",
      storage: sessionStorage,
    }
  )
);

export const useQmsData = () => {
  const { data: apiInspectionTypes, isLoading: isLoadingInspectionTypes } =
    useGetInspectionTypesQuery();

  const {
    data: apiProductionSchedules,
    isLoading: isLoadingProductionSchedules,
  } = useGetProductionScheduleByMachinesQuery({ status: "On-going" });

  const {
    inspectionTypes,
    setInspectionTypes,
    productionSchedules,
    setProductionSchedules,
  } = useQmsStore();

  React.useEffect(() => {
    if (apiInspectionTypes && !isLoadingInspectionTypes) {
      setInspectionTypes(apiInspectionTypes.data);
    }
  }, [apiInspectionTypes, isLoadingInspectionTypes, setInspectionTypes]);

  React.useEffect(() => {
    if (apiProductionSchedules && !isLoadingProductionSchedules) {
      setProductionSchedules(apiProductionSchedules);
    }
  }, [
    apiProductionSchedules,
    isLoadingProductionSchedules,
    setProductionSchedules,
  ]);

  return {
    inspectionTypes,
    isLoadingInspectionTypes,
    productionSchedules,
    isLoadingProductionSchedules,
  };
};

export { useQmsStore };
