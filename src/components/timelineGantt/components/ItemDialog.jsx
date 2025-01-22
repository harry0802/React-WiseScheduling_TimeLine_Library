//! =============== 1. 設定與常量 ===============
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { formatDate } from "../utils/dateUtils";
import dayjs from "dayjs";

//* 表單欄位默認值
const DEFAULT_FORM_STATE = {
  content: "",
  start: formatDate(dayjs()),
  end: formatDate(dayjs().add(2, "hour")),
  group: "",
};

//* 時間選擇器配置
const TIME_PICKER_PROPS = {
  type: "datetime-local",
  InputLabelProps: { shrink: true },
  inputProps: { step: 300 }, // 5分鐘間隔
};

//! =============== 2. 表單相關工具函數 ===============
/**
 * @function initializeFormData
 * @description 根據項目初始化表單數據
 */
const initializeFormData = (item) => {
  if (!item) return DEFAULT_FORM_STATE;

  return {
    content: item.content,
    start: dayjs(item.start).format("YYYY-MM-DD HH:mm"),
    end: dayjs(item.end).format("YYYY-MM-DD HH:mm"),
    group: item.group,
  };
};

/**
 * @function createUpdatedItem
 * @description 創建更新後的項目數據
 */
const createUpdatedItem = (formData, originalItem) => ({
  ...originalItem,
  ...formData,
  start: dayjs(formData.start).toDate(),
  end: dayjs(formData.end).toDate(),
});

//! =============== 3. 主要組件 ===============
const ItemDialog = ({
  isOpen,
  onClose,
  item,
  mode = "view",
  onSave,
  onDelete,
  groups,
}) => {
  //* 表單狀態管理
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);

  //* 監聽項目變化，更新表單
  useEffect(() => {
    if (item) {
      setFormData(initializeFormData(item));
    }
  }, [item]);

  //* 表單字段更新處理
  const handleFieldChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => {
      const updates = { [field]: value };

      // 特殊處理開始時間變更
      if (field === "start") {
        updates.end = dayjs(value).add(2, "hour").format("YYYY-MM-DDTHH:mm");
      }

      return { ...prev, ...updates };
    });
  };

  //* 保存處理
  const handleSave = () => {
    const updatedItem = createUpdatedItem(formData, item);
    onSave(updatedItem);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      keepMounted={false}
      disablePortal={false}
      container={document.body}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{mode === "add" ? "新增訂單" : "編輯訂單"}</DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {/* 訂單內容輸入 */}
          <TextField
            label="訂單內容"
            value={formData.content}
            onChange={handleFieldChange("content")}
          />

          {/* 開始時間選擇 */}
          <TextField
            {...TIME_PICKER_PROPS}
            label="開始時間"
            value={formData.start}
            onChange={handleFieldChange("start")}
          />

          {/* 結束時間選擇 */}
          <TextField
            {...TIME_PICKER_PROPS}
            label="結束時間"
            value={formData.end}
            onChange={handleFieldChange("end")}
            disabled={mode === "view"}
          />

          {/* 機台選擇 */}
          <TextField
            select
            label="機台編號"
            value={formData.group}
            onChange={handleFieldChange("group")}
            disabled={mode === "view"}
          >
            {groups?.get()?.map((group) => (
              <MenuItem key={group.content} value={group.id}>
                {group.content}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        {mode === "edit" && (
          <Button onClick={onDelete} color="error" sx={{ mr: "auto" }}>
            刪除
          </Button>
        )}
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemDialog;
