import ProductContent from "../Utility/ProductContent.jsx";
import AddInfoSections from "../ProductionRecordAddInfo/section/AddInfoSections.jsx";
import ProcessSections from "../ProductionRecordAddInfo/section/ProcessSections.jsx";

function ProductionRecordAddInfo() {
  return (
    <div>
      <ProductContent title="新增產品資訊">
        <AddInfoSections />
        <ProcessSections />
      </ProductContent>
    </div>
  );
}

export default ProductionRecordAddInfo;
