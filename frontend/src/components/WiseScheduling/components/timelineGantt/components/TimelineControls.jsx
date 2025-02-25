import { Stack, Button, TextField, MenuItem } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TIME_RANGES } from "../configs/timeline/timelineConfigs";
import { MACHINE_CONFIG } from "../configs/constants";
import { createAreaMachines } from "../configs/machineGroups";
import { useState } from "react";

const TimelineControls = ({
  timeRange,
  onTimeRangeChange,
  onAddItem,
  onMoveToNow,
}) => {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");

  const machines = selectedArea ? createAreaMachines(selectedArea) : [];

  const handleAreaChange = (event) => {
    const area = event.target.value;
    setSelectedArea(area);
    setSelectedMachine(""); // 清空機台選擇
  };

  return (
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
      <Stack direction="row" spacing={2}>
        <TextField
          select
          label="區域"
          value={selectedArea}
          onChange={handleAreaChange}
          sx={{ width: 100 }}
          size="small"
        >
          {MACHINE_CONFIG.AREAS.map((area) => (
            <MenuItem key={area} value={area}>
              {area}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="機台"
          value={selectedMachine}
          onChange={(e) => setSelectedMachine(e.target.value)}
          sx={{ width: 100 }}
          size="small"
          disabled={!selectedArea}
        >
          {machines.map((machine) => (
            <MenuItem key={machine.id} value={machine.id}>
              {machine.content}
            </MenuItem>
          ))}
        </TextField>
        <Button 
          startIcon={<AddIcon />} 
          onClick={() => onAddItem(null, selectedMachine || null)} 
          variant="outlined"
        >
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
};

export default TimelineControls;
