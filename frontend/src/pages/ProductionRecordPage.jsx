import { ProductionRecordProvider } from "../components/ProductionRecord/context/ProductionRecordProvider.jsx";
import ProductionRecord from "../components/ProductionRecord/index.jsx";
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
