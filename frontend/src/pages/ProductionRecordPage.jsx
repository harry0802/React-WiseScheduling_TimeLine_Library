import ProductionRecord from "../components/ProductionRecord/index.jsx";
import { ProductionRecordProvider } from "../components/ProductionRecord/Context/ProductionRecordProvider.jsx";
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
