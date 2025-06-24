import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { API_BASE } from "../../../store/api/apiConfig";

/**
 * Asynchronously checks if a production schedule is eligible to start.
 *
 * @async
 * @param {string} processId - The unique identifier of the process.
 * @param {string} workOrderSN - The serial number of the work order.
 * @returns {Promise<Object|null>} A promise that resolves to the response data if the check is successful, or null if an error occurs.
 */
const checkStartEligibility = async (processId, workOrderSN) => {
  try {
    const response = await fetch(
      `${API_BASE}productionSchedule/checkStartEligibility?processId=${processId}&workOrderSN=${workOrderSN}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error for workOrderSN: ${workOrderSN}`, error);
    return null; // Return null in case of an error
  }
};

// * (提升使用者體驗)  修改判斷邏輯順序 ,1. 先檢查有所有模具 , 2. 在檢查所有母胚生產許可
//  ! 防呆措施 :告訴此用者哪一筆出錯

// * Function to display modal information
const showModal = (message) =>
  Modal.info({
    content: <p>{message}</p>,
    okText: "確定",
    onOk() {},
  });

/**
 * Custom hook for production report functionality.
 * @returns {Object} An object containing production report functions.
 */
function useProductionReport() {
  const { t } = useTranslation(); // i18n 語言切換

  /**
   * Asynchronously checks if all selected rows have identical mold numbers.
   * @async
   * @param {Array<Object>} selectedRowsData - An array of selected row data objects.
   * @returns {Promise<boolean>} True if all mold numbers are identical; otherwise, false.
   */
  const allMoldNosIdentical = async (selectedRowsData) => {
    const moldNoSet = new Set();

    for (const { moldNos } of selectedRowsData) {
      if (!moldNos) {
        showModal("所選製令單必須有模具編號");
        return false;
      }

      const moldNosArray = moldNos.split(",").map((item) => item.trim());

      if (moldNoSet.size === 0) {
        moldNosArray.forEach((moldNo) => moldNoSet.add(moldNo));
      }

      if (moldNosArray.some((moldNo) => !moldNoSet.has(moldNo))) {
        showModal(t("productionReport.report.moldUnmatchedMsg"));
        return false;
      }
    }

    return true;
  };
  /**
   * Asynchronously checks the eligibility of all provided parameters.
   *
   * This function iterates through an array of parameters, each representing a production order.
   * It checks the eligibility of each order to start production. If any order fails the eligibility check,
   * the function immediately returns false and displays an error message. If all orders pass the check,
   * the function returns true.
   *
   * @async
   * @param {Array<Object>} paramsArray - An array of objects, each containing information about a production order.
   * @param {string} paramsArray[].processId - The ID of the process for the production order.
   * @param {string} paramsArray[].workOrderSN - The serial number of the work order.
   * @param {string} paramsArray[].no - The NO number of the production order in the table.
   * @returns {Promise<boolean>} A promise that resolves to true if all orders are eligible, false otherwise.
   * @throws {Error} If there's an error during the batch processing.
   */
  const checkEligibilityBatch = async (paramsArray) => {
    try {
      for (const { processId, workOrderSN, no } of paramsArray) {
        const result = await checkStartEligibility(processId, workOrderSN);

        if (!result || !result.data) {
          showModal(
            `生產失敗，訂單號碼: ${workOrderSN}  (NO: ${no}) 無法開始生產`
          );
          return false; // Exit immediately if any eligibility check fails
        }
      }

      return true; // All eligibility checks passed
    } catch (error) {
      console.error("Error in batch processing:", error);
      return false;
    }
  };

  return { allMoldNosIdentical, checkEligibilityBatch };
}
export { showModal, useProductionReport };
