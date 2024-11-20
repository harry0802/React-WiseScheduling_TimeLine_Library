import { useEffect } from "react";
import SharedManagementSystem from "../../Global/content/ProductManagementContent";
import QmsActions from "../components/QmsActions";
import { useFactoryHomeSlice } from "../slice/qmsHome";
import mockData from "../../ProductionRecord/data.json";

function QuotationManagementSystemFactory() {
  const { setData, pageStatus } = useFactoryHomeSlice();
  const routes = [
    { path: "/FactoryQuotationManagementSystem", Action: <QmsActions /> },
  ];
  console.log("🚀 ~ QuotationManagementSystemFactory ~ routes:", routes);

  useEffect(() => {
    (async function () {
      if (mockData) {
        setData(mockData);
      }
    })();
  }, [setData]);

  return <SharedManagementSystem title={pageStatus} currentRouter={routes} />;
}

export default QuotationManagementSystemFactory;
