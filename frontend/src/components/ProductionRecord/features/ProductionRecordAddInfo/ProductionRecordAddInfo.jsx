import ProductContent from "../../utility/ProductContent.jsx";
import AddInfoSections from "./section/AddInfoSections.jsx";
import ProcessSections from "./section/ProcessSections.jsx";
import { useEffectOnce } from "react-use";
import { homeSlice } from "../../slice/HomeSlice.jsx";

function ProductionRecordAddInfo() {
  const { setPageStatus } = homeSlice();
  useEffectOnce(() => setPageStatus("新增產品資訊"));
  return (
    <div style={{ width: "100%" }}>
      <ProductContent title="新增產品資訊">
        <AddInfoSections />
        <ProcessSections />
      </ProductContent>
    </div>
  );
}

export default ProductionRecordAddInfo;
