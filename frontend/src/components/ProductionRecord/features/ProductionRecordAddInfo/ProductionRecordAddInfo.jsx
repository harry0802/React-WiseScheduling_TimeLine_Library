import ProductContent from "../../utility/ProductContent.jsx";
import AddInfoSections from "./section/AddInfoSections.jsx";
import ProcessSections from "./section/ProcessSections.jsx";
import { useRecord } from "../../context/ProductionRecordProvider.jsx";
import { useEffect } from "react";
import useNotification from "../../hook/useNotification.js";
function ProductionRecordAddInfo() {
  const { handlePageStatust } = useRecord();

  const { notifySuccess } = useNotification();

  useEffect(() => {
    handlePageStatust("新增產品資訊");
  }, []);
  return (
    <div>
      <ProductContent title="新增產品資訊">
        <button onClick={notifySuccess}>Trigger Notification</button>
        <AddInfoSections />
        <ProcessSections />
      </ProductContent>
    </div>
  );
}

export default ProductionRecordAddInfo;
