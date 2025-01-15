import { Stack, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TIME_RANGES } from "../configs/timelineConfigs";

const TimelineControls = ({
  timeRange,
  onTimeRangeChange,
  onAddItem,
  onMoveToNow, // 確保這個 prop 被正確傳入
}) => (
  <Stack
    spacing={2}
    direction={{ xs: "column", sm: "row" }}
    justifyContent="space-between"
    alignItems="center"
    mb={2}
  >
    <Stack direction="row" spacing={1}>
      {Object.entries(TIME_RANGES).map(([key, { label }]) => (
        <Button
          key={key}
          startIcon={<CalendarMonthIcon />}
          variant={timeRange === key ? "contained" : "outlined"}
          onClick={() => onTimeRangeChange(key)}
          sx={{
            mr: 1,
            color: timeRange === key ? "white" : "inherit",
            borderColor: timeRange === key ? "primary.main" : "grey.300",
          }}
        >
          {label}
        </Button>
      ))}
    </Stack>
    <Stack direction="row" spacing={1}>
      <Button startIcon={<AddIcon />} onClick={onAddItem} variant="outlined">
        新增
      </Button>
      <Button
        startIcon={<AccessTimeIcon />}
        onClick={onMoveToNow}
        variant="outlined"
      >
        現在
      </Button>
    </Stack>
  </Stack>
);

export default TimelineControls;
