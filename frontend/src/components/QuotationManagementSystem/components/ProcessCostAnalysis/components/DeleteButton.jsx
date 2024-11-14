// components/DeleteButton/DeleteButton.tsx
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteButton = ({
  onDelete,
  disabled = false,
  tooltip = "刪除",
  size = "small",
  userType = "factory",
}) => {
  // 只有業務報價可以刪除
  if (userType !== "sales") {
    return null;
  }
  return (
    <Tooltip title={tooltip}>
      <span>
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // 防止事件冒泡
            onDelete();
          }}
          disabled={disabled}
          size={size}
        >
          <DeleteIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};
