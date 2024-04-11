import React from "react";
import ProductionInspection from "../components/ProductionInspection";
import { MachineStoreValidator } from "../components/Global/MachineStoreValidator";

const ProductionInspectionPage = () => {
  return (
    <div>
      <MachineStoreValidator />
      <ProductionInspection />
    </div>
  );
};

export default ProductionInspectionPage;
