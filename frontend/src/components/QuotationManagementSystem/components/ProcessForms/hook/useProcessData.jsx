//! =============== 1. 引入相關依賴 ===============
import { useMemo } from "react";
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
  //! =============== 3. API 請求處理 ===============
  const {
    data: types = [],
    isLoading: loading,
    isSuccess: typesSuccess,
    error: typesError,
  } = useGetOptionQuery("processCategory");

  const {
    data: subtypeData,
    isLoading: subtypeLoading,
    error: subtypeError,
  } = useGetProcessOptionsQuery({
    skip: !categoryId,
  });

  //! =============== 4. 數據轉換處理 ===============
  const mappedTypes = processMappers?.processTypes?.toOptions(types.data);

  const mappedSubtypes = useMemo(() => {
    if (!subtypeData?.data) return [];
    return processMappers?.processTypes?.toSubtypeOptions(subtypeData.data);
  }, [subtypeData?.data]);

  const filteredSubtypes = useMemo(() => {
    if (!categoryId || !mappedTypes?.length || !mappedSubtypes.length)
      return [];

    const category = mappedTypes.find((basic) => basic.value === categoryId);

    if (!category?.processCategory) return [];

    return mappedSubtypes.filter(
      (type) => type.processCategory === category.processCategory
    );
  }, [categoryId, mappedTypes, mappedSubtypes]);

  //! =============== 5. 返回結果 ===============
  return {
    types: mappedTypes,
    subtypes: filteredSubtypes,
    loading: loading || subtypeLoading,
    error: typesError || subtypeError,
    isSuccess: typesSuccess,
  };
};
