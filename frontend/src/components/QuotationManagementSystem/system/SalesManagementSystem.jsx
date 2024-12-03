/**
 * @fileoverview 銷售管理系統主組件
 * @description 處理報價單的創建、查詢和管理功能
 * @author [Your Name]
 * @version 1.0.0
 */

//! =============== 1. 設定與常量 ===============
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//* API 相關引入
import {
  useGetQuotationsQuery,
  useCreateQuotationMutation,
} from "../services/salesServices/endpoints/quotationApi";

//* 公共組件與工具引入
import SharedManagementSystem from "../../Global/content/ProductManagementContent";
import QmsActions from "../components/QmsActions";
import { useSalesHomeSlice } from "../slice/qmsHome";
import { timeUtils } from "../utility/timeUtils";

//! =============== 2. 常量定義 ===============
const ROUTES = {
  BASE_PATH: "/SalesQuotationManagementSystem",
  CREATE: "create",
};

const LOADING_TEXT = "載入中...";

//! =============== 3. 核心組件 ===============
/**
 * @component SalesManagementSystem
 * @description 銷售管理系統的主要組件,處理報價單相關操作
 *
 * @notes
 * - 使用 RTK Query 進行 API 調用
 * - 整合了路由導航功能
 * - 包含報價單創建和查詢功能
 *
 * @commonErrors
 * - API 調用失敗: 檢查網絡連接和服務器狀態
 * - 路由導航錯誤: 確保路徑正確配置
 */
function SalesManagementSystem() {
  //* ========= 1. Hooks 初始化 =========
  const location = useLocation();
  const navigate = useNavigate();
  const { pageStatus, setAPIData } = useSalesHomeSlice();

  //* ========= 2. API Hooks =========
  const { data, isSuccess, refetch } = useGetQuotationsQuery();

  const [createQuotation, { isLoading: isCreating, isSuccess: isCreated }] =
    useCreateQuotationMutation();

  //* ========= 3. 事件處理函數 =========
  /**
   * @function handleCreate
   * @description 處理創建新報價單的邏輯
   * @throws {Error} 當創建過程發生錯誤時拋出
   */
  const handleCreate = async () => {
    try {
      const response = await createQuotation({
        createDate: timeUtils.getNow(),
      });

      const quotationId = response?.data?.data?.id;
      if (quotationId) {
        navigate(`${ROUTES.CREATE}/${quotationId}`);
      }
    } catch (error) {
      console.error("建立報價單失敗:", error);
      // TODO: 添加錯誤提示 UI
    }
  };

  //* ========= 4. 副作用處理 =========
  // 路由變化時重新獲取數據
  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  // 數據更新時同步狀態
  useEffect(() => {
    if ((isSuccess || isCreated) && data) {
      setAPIData(data);
    }
  }, [isSuccess, isCreated, data, setAPIData]);

  //* ========= 5. 路由配置 =========
  const routes = [
    {
      path: ROUTES.BASE_PATH,
      Action: <QmsActions onCreate={handleCreate} isLoading={isCreating} />,
    },
  ];

  //* ========= 6. 渲染邏輯 =========
  if (!isSuccess && !isCreated) {
    return <div>{LOADING_TEXT}</div>;
  }

  return <SharedManagementSystem title={pageStatus} currentRouter={routes} />;
}

export default SalesManagementSystem;
