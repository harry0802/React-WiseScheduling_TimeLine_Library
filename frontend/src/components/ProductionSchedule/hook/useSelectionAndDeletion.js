import { useState } from "react";
import { message, Modal } from "antd";
import { useCancelStausMutation } from "../../../store/api/productionScheduleApi";

/**
 * 自定義 Hook，用於處理生產計劃的選擇和刪除操作
 * @param {Array} dataSource - 數據源
 * @param {Function} refetch - 重新獲取數據的函數
 * @returns {Object} 包含選擇類型、選中的行鍵、刪除選中項目函數和行選擇配置的對象
 */
export function useSelectionAndDeletion(dataSource, refetch) {
  const [selectionType] = useState("checkbox");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [cancelStaus] = useCancelStausMutation();

  /**
   * 刪除選中的項目
   */
  const deleteChecked = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("請先勾選要刪除的單據");
      return;
    }

    const selectedRowsData = dataSource.filter((row) =>
      selectedRowKeys.includes(row.id)
    );

    const completedDocuments = selectedRowsData.some(
      (row) => row.status === "Done"
    );

    if (completedDocuments) {
      message.warning("此單據已經完成，無法進行修改。");
      return;
    }

    const stringIds = JSON.stringify(selectedRowKeys);

    Modal.confirm({
      title: "確認刪除",
      content: "確定要刪除生產選中的項目嗎？",
      okText: "確定",
      cancelText: "取消",
      onOk: async () => {
        try {
          await cancelStaus(stringIds);
          message.success("刪除成功!!");
          setSelectedRowKeys([]);
          refetch();
        } catch (error) {
          console.error("Error deleting production schedule:", error);
          message.error("刪除失敗，請稍後再試");
        }
      },
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return {
    selectionType,
    selectedRowKeys,
    deleteChecked,
    rowSelection,
  };
}
