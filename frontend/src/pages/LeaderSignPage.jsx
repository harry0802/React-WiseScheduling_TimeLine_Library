import React from "react";
import LeaderSign from "../components/LeaderSign";
import { MachineStoreValidator } from "../components/Global/MachineStoreValidator";

const LeaderSignPage = () => {
  return (
    <div>
      <MachineStoreValidator />
      <LeaderSign />
    </div>
  );
};

export default LeaderSignPage;
