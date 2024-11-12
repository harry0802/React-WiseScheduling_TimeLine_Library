import { useEffect } from "react";
import SharedManagementSystem from "../../Global/content/ProductManagementContent";
import QmsActions from "../components/QmsActions";
import { useSalesHomeSlice } from "../slice/qmsHome";
import mockData from "../../ProductionRecord/data.json";

function SalesManagementSystem() {
  const { setData, pageStatus } = useSalesHomeSlice();
  const routes = [
    { path: "/QuotationManagementSystem", Action: <QmsActions /> },
  ];

  useEffect(() => {
    (async function () {
      if (mockData) {
        setData(mockData);
      }
    })();
  }, [setData]);

  return <SharedManagementSystem title={pageStatus} routes={routes} />;
}

export default SalesManagementSystem;
