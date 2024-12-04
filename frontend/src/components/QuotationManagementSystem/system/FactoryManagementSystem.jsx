//! =============== 1. 設定與常量 ===============
import SharedManagementSystem from "../../Global/content/ProductManagementContent";
import QmsActions from "../components/QmsActions";
import { useFactoryHomeSlice } from "../slice/qmsHome";
import QmsHome from "../features/Factory/FactoryQmsHome";

//! =============== 2. 常量定義 ===============
const ROUTES = {
  BASE_PATH: "/FactoryQuotationManagementSystem",
};

//! =============== 3. 核心組件 ===============
function FactoryManagementSystem() {
  const { updateSearchParams } = useFactoryHomeSlice();

  const routes = [
    {
      path: ROUTES.BASE_PATH,
      Action: <QmsActions onSearch={updateSearchParams} />,
    },
  ];

  return (
    <SharedManagementSystem currentRouter={routes}>
      <QmsHome />
    </SharedManagementSystem>
  );
}

export default FactoryManagementSystem;
