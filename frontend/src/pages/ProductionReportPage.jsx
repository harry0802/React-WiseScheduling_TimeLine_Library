import React from "react";
import ProductionReport from "../components/ProductionReport";
import { MachineStoreValidator } from "../components/Global/MachineStoreValidator";

const ProductionReportPage = () => {
  return (
    <div>
      <MachineStoreValidator />
      <ProductionReport />
    </div>
  );
};

export default ProductionReportPage;
