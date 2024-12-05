//! =============== 1. 設定與常量 ===============
import SharedManagementSystem from "../../Global/content/ProductManagementContent";
import QmsActions from "../components/QmsActions";
import { useFactoryHomeSlice } from "../slice/qmsHome";
import QmsHome from "../features/Factory/FactoryQmsHome";
import {
  quotationApi,
  useCreateQuotationMutation,
} from "../services/salesServices/endpoints/quotationApi";
import timeUtils from "../utility/timeUtils";
import { useNavigate } from "react-router-dom";

//! =============== 2. 常量定義 ===============
const ROUTES = {
  BASE_PATH: "/FactoryQuotationManagementSystem",
};

//! =============== 3. 核心組件 ===============
function FactoryManagementSystem() {
  const { updateSearchParams } = useFactoryHomeSlice();
  const [createQuotation] = useCreateQuotationMutation();

  const navigate = useNavigate();
  const handleCreate = async () => {
    const response = await createQuotation({
      createDate: timeUtils.getNow(),
    });
    const quotationId = response?.data?.data?.id;
    if (quotationId) {
      navigate(`${ROUTES.CREATE}/${quotationId}`);
    }
  };

  const routes = [
    {
      path: ROUTES.BASE_PATH,
      Action: (
        <QmsActions onCreate={handleCreate} onSearch={updateSearchParams} />
      ),
    },
  ];

  return (
    <SharedManagementSystem currentRouter={routes}>
      <QmsHome />
    </SharedManagementSystem>
  );
}

export default FactoryManagementSystem;
