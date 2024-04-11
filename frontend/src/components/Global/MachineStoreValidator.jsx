import React from "react";
import { Navigate } from "react-router-dom";
import { useMachineSNStore } from "../../store/zustand/store";

export const MachineStoreValidator = () => {
  const machineSN_Store = useMachineSNStore((state) => state.machineSN_Store);
  if (!machineSN_Store) {
    return <Navigate to="/MachineSelectPage" replace />;
  }
};
