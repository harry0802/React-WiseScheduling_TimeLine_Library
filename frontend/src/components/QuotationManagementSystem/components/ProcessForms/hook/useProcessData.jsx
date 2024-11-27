//! =============== 1. 引入相關依賴 ===============
import { useState, useEffect } from "react";
import { processMappers } from "../utils/processMappers";
import { useGetProcessOptionsQuery } from "../../../../ProductionRecord/service/endpoints/processOptionApi";
import { useGetOptionQuery } from "../../../../ProductionRecord/service/endpoints/optionApi";

/**
 * @typedef {Object} ProcessDataResult
 * @property {Array} types - 處理類型選項列表
 * @property {Array} subtypes - 子類型選項列表
 * @property {boolean} loading - 加載狀態
 * @property {Object|null} error - 錯誤信息
 * @property {boolean} isSuccess - 請求是否成功
 */

/**
 * @function useProcessData
 * @description 獲取和管理製程相關數據的自定義 Hook
 *
 * @param {string|number} categoryId - 製程分類 ID
 * @param {Object} [initialData=null] - 初始數據（預留擴展用）
 *
 * @returns {ProcessDataResult} 處理後的數據和狀態
 *
 * @example
 * const { types, subtypes, loading, error, isSuccess } = useProcessData(categoryId);
 *
 * @notes
 * - 會同時請求製程類型和子類型數據
 * - 子類型數據會根據 categoryId 進行過濾
 * - 當 categoryId 不存在時，會跳過子類型數據請求
 */
export const useProcessData = (categoryId, initialData = null) => {
  //! =============== 2. 狀態管理 ===============
  const [subtypes, setSubtypes] = useState([]);

  //! =============== 3. API 請求處理 ===============
  //* 獲取製程類型數據
  const {
    data: types = [],
    isLoading: loading,
    isSuccess: typesSuccess,
    error: typesError,
  } = useGetOptionQuery("processCategory");

  //* 獲取製程子類型數據
  const {
    data: subtypeData,
    isLoading: subtypeLoading,
    error: subtypeError,
  } = useGetProcessOptionsQuery({
    skip: !categoryId, //* 無 categoryId 時跳過請求
  });

  //! =============== 4. 數據轉換處理 ===============
  //* 轉換製程類型數據
  const mappedTypes = processMappers?.processTypes?.toOptions(types.data);

  //* 處理並過濾子類型數據
  useEffect(() => {
    if (subtypeData?.data) {
      //* 轉換子類型數據
      const mappedSubtypes = processMappers?.processTypes?.toSubtypeOptions(
        subtypeData.data
      );

      //* 根據所選分類過濾子類型
      const filteredSubtypes = mappedSubtypes?.filter((type) => {
        const category = mappedTypes?.find(
          (basic) => basic.value === categoryId
        );
        return type.processCategory === category?.processCategory;
      });

      setSubtypes(filteredSubtypes);
    }
  }, [subtypeData, categoryId]);

  //! =============== 5. 返回結果 ===============
  return {
    types: mappedTypes,
    subtypes,
    loading: loading || subtypeLoading,
    error: typesError || subtypeError,
    isSuccess: typesSuccess,
  };
};
