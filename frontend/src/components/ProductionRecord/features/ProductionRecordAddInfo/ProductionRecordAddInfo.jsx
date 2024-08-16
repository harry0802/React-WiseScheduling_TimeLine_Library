import ProductContent from "../../utility/ProductContent.jsx";
import AddInfoSections from "./section/AddInfoSections.jsx";
import ProcessSections from "./section/ProcessSections.jsx";
import { useRecord } from "../../context/ProductionRecordProvider.jsx";
import { useEffectOnce } from "react-use";

function ProductionRecordAddInfo() {
  const { handlePageStatust } = useRecord();
  useEffectOnce(() => handlePageStatust("新增產品資訊"));
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
