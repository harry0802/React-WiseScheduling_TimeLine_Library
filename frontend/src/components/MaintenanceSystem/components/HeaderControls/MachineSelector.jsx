//! =============== 1. 設定與常量 ===============
import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import { createMachineScope } from "../../../../services/QuotationManagement/machineService";

//! =============== 2. 類型與介面 ===============
/**
 * @typedef {Object} AreaOption
 * @property {string} value - 區域值
 *
 * @typedef {Object} MachineOption
 * @property {string} id - 機台 ID
 * @property {string} value - 機台名稱
 */

//! =============== 3. 樣式元件 ===============
//* 表單控制項樣式
const StyledFormControl = styled(FormControl)`
  && {
    color: #fff;
    .MuiOutlinedInput-root {
      max-height: 3.4375rem;
      font-size: 1.25rem;
      border-radius: 4px;
      color: currentColor;

      .MuiOutlinedInput-notchedOutline {
        border: 1px solid currentColor;
        transition: all 0.3s ease;
      }

      &:hover .MuiOutlinedInput-notchedOutline {
        border-color: #666;
      }

      .MuiSelect-icon {
        color: currentColor;
      }
    }

    .MuiInputLabel-root {
      color: currentColor;
      &.Mui-focused {
        color: currentColor;
      }
    }
  }
`;

//* 選項樣式
const StyledMenuItem = styled(MenuItem)`
  color: #fff;
  &.Mui-selected {
    background-color: #444;
    transition: all 0.3s ease;
    &:hover {
      background-color: #555;
    }
  }
`;

//* 下拉選單樣式
const StyledSelect = styled(Select)`
  && {
    color: currentColor;
    .MuiSelect-icon {
      color: currentColor;
    }
  }
`;

//! =============== 4. 主要元件 ===============
/**
 * @component MachineSelect
 * @description 機台選擇元件，包含區域選擇和機台選擇兩個下拉選單
 *
 * @example
 * // 基本使用
 * <MachineSelect />
 *
 * @notes
 * - 元件會在掛載時自動獲取區域列表
 * - 選擇區域後會自動獲取該區域的機台列表
 * - 載入數據時會顯示 loading 狀態
 *
 * @commonErrors
 * - 獲取數據失敗時會在控制台顯示錯誤信息
 * - 區域為空時機台選單會被禁用
 */
function MachineSelect({ value, onChange }) {
  //! =============== 狀態管理 ===============
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [machines, setMachines] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedMachineId, setSelectedMachineId] = useState("");

  const machineScope = createMachineScope();

  //! =============== 副作用處理 ===============
  //* 獲取區域列表
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        const areaOptions = await machineScope.getMachinesByArea();
        setAreas(areaOptions);
        if (areaOptions.length > 0) {
          setSelectedArea(areaOptions[0].value);
        }
      } catch (error) {
        console.error("獲取區域失敗:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  //* 根據選擇的區域獲取機台列表
  useEffect(() => {
    const fetchMachines = async () => {
      if (!selectedArea) {
        setMachines([]);
        setSelectedMachineId("");
        return;
      }

      try {
        setLoading(true);
        const machineOptions = await machineScope.getMachinesByMachineSN(
          selectedArea
        );
        setMachines(machineOptions);
        if (machineOptions.length > 0) {
          setSelectedMachineId(machineOptions[0].id);
          onChange?.({ area: selectedArea, machineId: machineOptions[0].id });
        }
      } catch (error) {
        console.error("獲取機台失敗:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMachines();
  }, [selectedArea]);

  const handleAreaChange = (e) => {
    const newArea = e.target.value;
    setSelectedArea(newArea);
    onChange?.({ area: newArea, machineId: selectedMachineId });
  };

  const handleMachineChange = (e) => {
    const newMachineId = e.target.value;
    setSelectedMachineId(newMachineId);
    onChange?.({ area: selectedArea, machineId: newMachineId });
  };

  //! =============== 渲染處理 ===============
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Stack direction="row" spacing={2} sx={{ minWidth: 400 }}>
      {/* 區域選擇 */}
      <StyledFormControl fullWidth>
        <InputLabel>機台區域</InputLabel>
        <StyledSelect
          value={selectedArea}
          onChange={handleAreaChange}
          label="機台區域"
        >
          {areas.map((area) => (
            <StyledMenuItem key={area.value} value={area.value}>
              {area.value}區
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>

      {/* 機台選擇 */}
      <StyledFormControl fullWidth>
        <InputLabel>機台</InputLabel>
        <StyledSelect
          value={selectedMachineId}
          onChange={handleMachineChange}
          label="機台"
          disabled={!selectedArea}
        >
          {machines.map((machine) => (
            <StyledMenuItem key={machine.id} value={machine.id}>
              {machine.value}
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </Stack>
  );
}

export default MachineSelect;
