/**
 * @fileoverview QMS 系統首頁元件
 * @description
 * 此檔案實現了 QMS 系統的首頁功能，包含產品列表展示與分頁控制
 * 總行數: 198 行
 * 複雜度較高部分: 分頁邏輯處理、數據轉換
 *
 * @version 1.0.0
 * @lastModified 2024-12-05
 */

//! =============== 1. 設定與常量 ===============
import { memo, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsWithPaginationQuery } from "../../../ProductionRecord/service/endpoints/productApi";
import PmHomeContent from "../../../Global/content/PmHomeContent";
import SharedCard from "../../../Global/card/ProductCard";
import { useFactoryHomeSlice } from "../../slice/qmsHome";

//* 預設值配置
const DEFAULT_VALUES = {
  DATE: "無日期",
  SERIAL_NUMBER: "無編號",
  PRODUCT_NAME: "未命名產品",
  CUSTOMER_NAME: "未命名客戶",
};

//! =============== 2. 類型與介面 ===============
/**
 * @typedef {Object} ProductData
 * @property {string} createDate - 建立日期
 * @property {string} quotationSN - 報價單編號
 * @property {string} productName - 產品名稱
 * @property {string} customerName - 客戶名稱
 * @property {string} id - 產品 ID
 */

//! =============== 3. 核心功能 ===============
//* --------- 展示元件區 ---------
/**
 * @component DisplayComponents
 * @description 集中管理各種狀態的展示元件
 */
const DisplayComponents = {
  Error: ({ message }) => (
    <div className="flex items-center justify-center h-full">
      <p className="text-red-500">載入失敗: {message || "未知錯誤"}</p>
    </div>
  ),
  Loading: () => (
    <div className="flex items-center justify-center h-full">
      <p>載入中...</p>
    </div>
  ),
  Empty: () => (
    <div className="flex items-center justify-center h-full">
      <p>暫無資料</p>
    </div>
  ),
};

//* --------- 卡片元件 ---------
/**
 * @component Card
 * @description 產品卡片元件，展示單個產品的基本信息
 * @param {Object} props
 * @param {ProductData} props.data - 產品數據
 * @param {Function} props.onCardClick - 點擊卡片的回調函數
 */
const Card = memo(function Card({ data, onCardClick }) {
  const {
    createDate = DEFAULT_VALUES.DATE,
    quotationSN = DEFAULT_VALUES.SERIAL_NUMBER,
    productName = DEFAULT_VALUES.PRODUCT_NAME,
    customerName = DEFAULT_VALUES.CUSTOMER_NAME,
  } = data;

  return (
    <SharedCard
      date={createDate}
      quoteNumber={quotationSN}
      productName={productName}
      customerName={customerName}
      onClick={onCardClick}
    />
  );
});

//* --------- 主元件 ---------
/**
 * @component QmsHome
 * @description QMS 系統首頁主元件
 * @notes
 * - 負責處理產品列表的展示、分頁控制及導航
 * - 使用 RTK Query 進行數據獲取
 * - 實現了數據緩存和重新獲取策略
 */
function QmsHome() {
  const navigate = useNavigate();
  const { queryParams, pagination, setPage, setPageSize, setPagination } =
    useFactoryHomeSlice();

  //* API 查詢與數據獲取
  const { data, isLoading, isError, error } = useGetProductsWithPaginationQuery(
    queryParams,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  //* 分頁數據更新
  useEffect(() => {
    if (data?.meta) {
      setPagination(data.meta);
    }
  }, [data?.meta, setPagination]);

  //* ========= 事件處理函數 =========
  const handlePageChange = useCallback(
    (page) => {
      setPage(page);
    },
    [setPage]
  );

  const handlePageSizeChange = useCallback(
    (size) => {
      setPageSize(size);
    },
    [setPageSize]
  );

  const handleCardClick = useCallback(
    (id) => {
      if (id) navigate(`edit/${id}`);
    },
    [navigate]
  );

  //* 卡片列表渲染優化
  const cardList = useMemo(() => {
    const items = data?.data || [];
    if (!Array.isArray(items)) return null;

    return items.map((item) => (
      <Card
        key={item.id}
        data={item}
        onCardClick={() => handleCardClick(item.id)}
      />
    ));
  }, [data?.data, handleCardClick]);

  //! ========= 條件渲染邏輯 =========
  if (isError) return <DisplayComponents.Error message={error?.message} />;
  if (isLoading) return <DisplayComponents.Loading />;
  if (!data?.data?.length) return <DisplayComponents.Empty />;

  return (
    <PmHomeContent>
      <PmHomeContent.Content>{cardList}</PmHomeContent.Content>
      <PmHomeContent.Pagination
        currentPage={pagination.current_page}
        itemsPerPage={pagination.page_size}
        total={pagination.total_count}
        setPage={handlePageChange}
        setPageSize={handlePageSizeChange}
      />
    </PmHomeContent>
  );
}

//! =============== 4. 導出設定 ===============
export default memo(QmsHome);
