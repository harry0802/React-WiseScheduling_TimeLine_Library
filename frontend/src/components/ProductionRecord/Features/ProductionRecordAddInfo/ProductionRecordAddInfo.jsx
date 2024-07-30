import ProductContent from "../../Utility/ProductContent.jsx";
import AddInfoSections from "../ProductionRecordAddInfo/section/AddInfoSections.jsx";
import ProcessSections from "../ProductionRecordAddInfo/section/ProcessSections.jsx";
import { useRecord } from "../../Context/ProductionRecordProvider.jsx";
import { useEffect } from "react";
function ProductionRecordAddInfo() {
  const { handlePageStatust } = useRecord();

  useEffect(() => {
    handlePageStatust("新增產品資訊");
  }, []);
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
