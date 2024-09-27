import React from "react";
import ProductionInspection from "../components/ProductionInspection";
import { MachineStoreValidator } from "../components/Global/MachineStoreValidator";

const ProductionInspectionPage = () => {
  return (
    <>
      <MachineStoreValidator />
      <ProductionInspection />
    </>
  );
};

export default ProductionInspectionPage;
