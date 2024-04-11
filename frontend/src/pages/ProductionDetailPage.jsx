import React from "react";
import ProductionDetail from "../components/ProductionDetail";
import { MachineStoreValidator } from "../components/Global/MachineStoreValidator";

const ProductionDetailPage = () => {
  return (
    <div>
      <MachineStoreValidator />
      <ProductionDetail />
    </div>
  );
};

export default ProductionDetailPage;
