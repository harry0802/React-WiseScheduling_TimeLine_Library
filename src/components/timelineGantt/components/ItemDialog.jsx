// ItemDialog.jsx - 簡化版本
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { formatDate, parseDate } from "../utils/dateUtils";
import dayjs from "dayjs";

const ItemDialog = ({
  isOpen,
  onClose,
  item,
  mode = "view",
  onSave,
  onDelete,
  groups,
}) => {
  const [formData, setFormData] = useState({
    content: "",
    start: formatDate(dayjs()),
    end: formatDate(dayjs().add(2, "hour")),
    group: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        content: item.content,
        start: dayjs(item.start).format("YYYY-MM-DD HH:mm"),
        end: dayjs(item.end).format("YYYY-MM-DD HH:mm"),
        group: item.group,
      });
    }
  }, [item]);
  // ItemDialog.jsx
  const handleSave = () => {
    const start = dayjs(formData.start).toDate();
    const end = dayjs(formData.end).toDate();

    const updatedItem = {
      ...item,
      ...formData,
      start,
      end,
    };
    onSave(updatedItem);
    onClose();
  };

  // 時間欄位部分
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === "add" ? "新增訂單" : "編輯訂單"}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="訂單內容"
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
          />

          <TextField
            label="開始時間"
            type="datetime-local"
            value={formData.start}
            onChange={(e) => {
              const newStartTime = e.target.value;
              setFormData((prev) => ({
                ...prev,
                start: newStartTime,
                end: dayjs(newStartTime)
                  .add(2, "hour")
                  .format("YYYY-MM-DDTHH:mm"),
              }));
            }}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 300, // 5分鐘間隔
            }}
          />

          <TextField
            label="結束時間"
            type="datetime-local"
            value={formData.end}
            onChange={(e) => {
              const newEnd = dayjs(e.target.value);
              setFormData((prev) => ({
                ...prev,
                end: newEnd.format("YYYY-MM-DD HH:mm"),
              }));
            }}
            disabled={mode === "view"}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
          />

          <TextField
            select
            label="機台編號"
            value={formData.group}
            onChange={(e) =>
              setFormData({ ...formData, group: e.target.value })
            }
            disabled={mode === "view"}
          >
            {groups?.get()?.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.content}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        {mode === "edit" && (
          <Button
            onClick={onDelete}
            color="error"
            sx={{ mr: "auto" }} // 將刪除按鈕靠左對齊
          >
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
