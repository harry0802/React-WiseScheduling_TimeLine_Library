//! ============== 1. 設定與常量 ===============
import { useState, useEffect } from "react";
import { Stack, IconButton } from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import styled from "styled-components";
import { timeUtils } from "../../utils/timeUtils";
import { useMaintenanceHeaderParams } from "../../slice/MainteanceSlice";

//! =============== 2. 類型與樣式 ===============
//* 客製化樣式組件
const StyledDatePicker = styled(MuiDatePicker)`
  && {
    .MuiInputBase-root {
      background: var(--color-background);
      height: 3.4375rem;
      font-size: 1.25rem;
      max-width: 17rem;
      margin: 0 1rem;
      .MuiOutlinedInput-notchedOutline {
        border: 1px solid currentColor;
        transition: all 0.3s ease;
      }

      &:hover .MuiOutlinedInput-notchedOutline {
        border-color: #666;
      }
    }
    & input {
      text-align: center;
      color: currentColor;
    }
  }
`;

const NavigationButton = styled(IconButton)`
  && {
    max-width: 2.5rem;
    max-height: 2.5rem;
    background: #186c98;
    color: #fff;
    stroke-width: 1.5;
    stroke: currentColor;
    transition: all 0.3s ease;
    &:hover {
      background: #186c9888;
    }
  }
`;

// 添加一個新的樣式容器
const DatePickerWrapper = styled.div`
  && {
    .MuiFormControl-root {
      margin-bottom: 0;
    }
  }
`;

//! =============== 3. 主要組件 ===============
/**
 * @component DatePicker
 * @description 自定義日期選擇器組件，包含週數顯示和週導航
 */
function DatePicker() {
  const { maintenance, updateMaintenanceHeaderParams } =
    useMaintenanceHeaderParams();

  //* 狀態管理
  const [currentDate, setCurrentDate] = useState(() => {
    const initialDate = maintenance.date || timeUtils.getNow();
    return dayjs(initialDate);
  });

  //* 同步 store 值
  useEffect(() => {
    if (
      maintenance.date &&
      !dayjs(maintenance.date).isSame(currentDate, "day")
    ) {
      setCurrentDate(dayjs(maintenance.date));
    }
  }, [maintenance.date]);

  //* 事件處理函數
  const handleDateUpdate = (newDate) => {
    const selectedDate = dayjs(newDate).startOf("day");
    setCurrentDate(selectedDate);

    updateMaintenanceHeaderParams({
      date: selectedDate.format(),
      week: timeUtils.getISOWeek(selectedDate),
      year: selectedDate.year(),
    });
  };

  //* 週切換處理
  const handleWeekChange = (direction) => {
    const updatedDate = currentDate[direction === "prev" ? "subtract" : "add"](
      1,
      "week"
    );
    handleDateUpdate(updatedDate);
  };

  //* 渲染組件
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-tw">
      <Stack direction="row" alignItems="center" spacing={2}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NavigationButton
            onClick={() => handleWeekChange("prev")}
            size="small"
          >
            <ExpandLess />
          </NavigationButton>

          <DatePickerWrapper>
            <StyledDatePicker
              value={currentDate}
              onChange={handleDateUpdate}
              format="YYYY/MM/DD"
              views={["day"]}
              showDaysOutsideCurrentMonth
              slotProps={{
                textField: {
                  size: "small",
                  InputProps: {
                    value: `${currentDate.format(
                      "YYYY/MM/DD"
                    )} 第 ${timeUtils.getISOWeek(currentDate)} 週`,
                  },
                },
                field: {
                  clearable: false,
                },
              }}
            />
          </DatePickerWrapper>

          <NavigationButton
            onClick={() => handleWeekChange("next")}
            size="small"
          >
            <ExpandMore />
          </NavigationButton>
        </div>
      </Stack>
    </LocalizationProvider>
  );
}

export default DatePicker;
