/**
 * @file TimeRangeSelector.jsx
 * @description 時間範圍選擇器組件 - 用於設定時間線顯示範圍
 * @version 1.0.0
 */

import React from "react";
import { Box, Paper, Typography, Grid, TextField, Button, Chip } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EventIcon from "@mui/icons-material/Event";
import dayjs from "dayjs";

/**
 * @component TimeRangeSelector
 * @description 時間範圍選擇器，提供開始時間和結束時間的選擇
 * @param {string} startTime - 開始時間 (ISO string)
 * @param {string} endTime - 結束時間 (ISO string)
 * @param {Function} onStartTimeChange - 開始時間變更回調
 * @param {Function} onEndTimeChange - 結束時間變更回調
 * @param {boolean} disabled - 是否禁用
 */
function TimeRangeSelector({ 
  startTime, 
  endTime, 
  onStartTimeChange, 
  onEndTimeChange, 
  disabled = false 
}) {
  
  // 🧠 轉換 ISO 字串為 datetime-local 格式
  const formatForInput = (isoString) => {
    if (!isoString) return "";
    return dayjs(isoString).format("YYYY-MM-DDTHH:mm");
  };

  // 🧠 轉換 datetime-local 格式為 ISO 字串
  const formatFromInput = (inputValue) => {
    if (!inputValue) return null;
    return dayjs(inputValue).toISOString();
  };

  const handleStartChange = (event) => {
    const value = event.target.value;
    const isoValue = formatFromInput(value);
    onStartTimeChange?.(isoValue);
  };

  const handleEndChange = (event) => {
    const value = event.target.value;
    const isoValue = formatFromInput(value);
    onEndTimeChange?.(isoValue);
  };

  // 🚀 快捷時間範圍設定
  const handleQuickSelect = (type) => {
    const now = dayjs();
    let start, end;

    switch (type) {
      case 'today':
        start = now.startOf('day');
        end = now.endOf('day');
        break;
      case 'week':
        start = now.startOf('week');
        end = now.endOf('week');
        break;
      case 'month':
        start = now.startOf('month');
        end = now.endOf('month');
        break;
      case 'default':
      default:
        start = now.subtract(1, 'month').startOf('day');
        end = now.add(1, 'month').endOf('day');
        break;
    }

    onStartTimeChange?.(start.toISOString());
    onEndTimeChange?.(end.toISOString());
  };

  // 🧠 計算時間範圍資訊
  const getTimeRangeInfo = () => {
    if (!startTime || !endTime) return null;
    
    const start = dayjs(startTime);
    const end = dayjs(endTime);
    const duration = end.diff(start, 'day');
    
    if (duration === 0) return "當天";
    if (duration <= 7) return `${duration} 天`;
    if (duration <= 30) return `約 ${Math.ceil(duration / 7)} 週`;
    return `約 ${Math.ceil(duration / 30)} 個月`;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        p: 3,
        border: "2px solid #E0E0E0",
        borderRadius: "8px",
        backgroundColor: "#FAFAFA",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <CalendarTodayIcon 
          sx={{ 
            mr: 1, 
            color: "#1976D2",
            fontSize: "20px" 
          }} 
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#1976D2",
            fontSize: "16px"
          }}
        >
          時間範圍設定
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="datetime-local"
            label="開始時間"
            value={formatForInput(startTime)}
            onChange={handleStartChange}
            disabled={disabled}
            InputLabelProps={{ 
              shrink: true,
              sx: { fontSize: "14px", fontWeight: 500 }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#BDBDBD",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#1976D2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976D2",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputBase-root": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="datetime-local"
            label="結束時間"
            value={formatForInput(endTime)}
            onChange={handleEndChange}
            disabled={disabled}
            InputLabelProps={{ 
              shrink: true,
              sx: { fontSize: "14px", fontWeight: 500 }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#BDBDBD",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#1976D2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976D2",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputBase-root": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>

        {/* 🔧 快捷選擇按鈕 */}
        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                color: "#616161",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              快速選擇：
            </Typography>
            
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<TodayIcon />}
                onClick={() => handleQuickSelect('today')}
                disabled={disabled}
                sx={{ fontSize: "12px", textTransform: "none" }}
              >
                今天
              </Button>
              
              <Button
                size="small"
                variant="outlined"
                startIcon={<DateRangeIcon />}
                onClick={() => handleQuickSelect('week')}
                disabled={disabled}
                sx={{ fontSize: "12px", textTransform: "none" }}
              >
                本週
              </Button>
              
              <Button
                size="small"
                variant="outlined"
                startIcon={<EventIcon />}
                onClick={() => handleQuickSelect('month')}
                disabled={disabled}
                sx={{ fontSize: "12px", textTransform: "none" }}
              >
                本月
              </Button>
              
              <Button
                size="small"
                variant="outlined"
                startIcon={<CalendarTodayIcon />}
                onClick={() => handleQuickSelect('default')}
                disabled={disabled}
                sx={{ fontSize: "12px", textTransform: "none" }}
              >
                前後一月
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* 🔧 時間範圍資訊顯示 */}
        {getTimeRangeInfo() && (
          <Grid item xs={12}>
            <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "#616161",
                  fontSize: "12px",
                }}
              >
                時間範圍：
              </Typography>
              <Chip
                label={getTimeRangeInfo()}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ fontSize: "11px", height: "20px" }}
              />
            </Box>
          </Grid>
        )}
      </Grid>

      {/* 🔧 時間範圍提示 */}
      <Box sx={{ mt: 2 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: "#757575",
            fontSize: "12px",
            fontStyle: "italic"
          }}
        >
          提示：時間範圍會影響排程資料的載入和時間線顯示範圍
        </Typography>
      </Box>
    </Paper>
  );
}

export default React.memo(TimeRangeSelector);
