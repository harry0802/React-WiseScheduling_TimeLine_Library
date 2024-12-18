import React from "react";
import OperatorSign from "../components/OperatorSign";
import { MachineStoreValidator } from "../components/Global/MachineStoreValidator";

const OperatorSignPage = () => {
  return (
    <>
      <MachineStoreValidator />
      <OperatorSign />
    </>
  );
};

export default OperatorSignPage;
