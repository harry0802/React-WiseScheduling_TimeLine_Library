import { useEffect } from "react";
import SharedManagementSystem from "../../Global/content/ProductManagementContent";
import QmsActions from "../components/QmsActions";
import { useSalesHomeSlice } from "../slice/qmsHome";
import {
  useGetQuotationsQuery,
  useCreateQuotationMutation,
} from "../services/endpoints/quotationApi";
import { getNow } from "../utility/timeUtils";

function SalesManagementSystem() {
  const { pageStatus, setAPIData } = useSalesHomeSlice();
  const { data, isSuccess } = useGetQuotationsQuery();
  console.log("🚀 ~ SalesManagementSystem ~ data:", data);
  const [createQuotation, { isLoading: isCreating, isSuccess: isCreated }] =
    useCreateQuotationMutation();

  const routes = [
    {
      // 預設路徑 他是用來檢查是否進入到這個頁面 才會顯示 action
      path: "/SalesQuotationManagementSystem",
      Action: (
        <QmsActions
          id={data?.data.at(-1)?.id + 1}
          onCreate={() => createQuotation({ createDate: getNow() })}
          isLoading={isCreating}
        />
      ),
    },
  ];

  useEffect(() => {
    (async function () {
      if (isSuccess || isCreated) {
        setAPIData(data);
      }
    })();
  }, [isSuccess, isCreated, data, setAPIData]);

  return isSuccess || isCreated ? (
    <SharedManagementSystem title={pageStatus} currentRouter={routes} />
  ) : (
    <div>載入中...</div>
  );
}

export default SalesManagementSystem;
