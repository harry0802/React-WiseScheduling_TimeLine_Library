import ProductionRecord from "../components/ProductionRecord/index.jsx";
import { ProductionRecordProvider } from "../components/ProductionRecord/ProductionRecordContext/ProductionRecordProvider.jsx";

function ProductionRecordPage() {
  return (
    <div>
      <ProductionRecordProvider>
        <ProductionRecord />
      </ProductionRecordProvider>
    </div>
  );
}

export default ProductionRecordPage;
