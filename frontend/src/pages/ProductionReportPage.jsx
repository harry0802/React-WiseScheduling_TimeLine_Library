import React from "react";
import ProductionReport from "../components/ProductionReport";
import { MachineStoreValidator } from "../components/Global/MachineStoreValidator";

const ProductionReportPage = () => {
  return (
    <>
      <MachineStoreValidator />
      <ProductionReport />
    </>
  );
};

export default ProductionReportPage;
