import React from "react";
import ProductionDetail from "../components/ProductionDetail";
import { MachineStoreValidator } from "../components/Global/MachineStoreValidator";

const ProductionDetailPage = () => {
  return (
    <>
      <MachineStoreValidator />
      <ProductionDetail />
    </>
  );
};

export default ProductionDetailPage;
