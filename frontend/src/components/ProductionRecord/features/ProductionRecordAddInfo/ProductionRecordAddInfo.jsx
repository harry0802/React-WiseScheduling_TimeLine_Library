import ProductContent from "../../utility/ProductContent.jsx";
import AddInfoSections from "./section/AddInfoSections.jsx";
import ProcessSections from "./section/ProcessSections.jsx";
import { useRecord } from "../../context/ProductionRecordProvider.jsx";
import { useEffect } from "react";
import NotificationSlice from "../../slice/NotificationSlice.jsx";
function ProductionRecordAddInfo() {
  const { handlePageStatust } = useRecord();

  const triggerNotification = NotificationSlice(
    (state) => state.triggerNotification
  );

  const handleClick = () => {
    try {
      triggerNotification({
        message:
          "Notification from SomeComponent Notification from SomeComponent",
        // description:
        //   "This notification was triggered by clicking a button in SomeComponent.",
      });
    } catch (error) {
      console.error(error.message);
      // Handle the error gracefully, e.g., showing a fallback message or disabling the button.
    }
  };

  useEffect(() => {
    handlePageStatust("新增產品資訊");
  }, []);
  return (
    <div>
      <ProductContent title="新增產品資訊">
        <button onClick={handleClick}>Trigger Notification</button>
        <AddInfoSections />
        <ProcessSections />
      </ProductContent>
    </div>
  );
}

export default ProductionRecordAddInfo;
