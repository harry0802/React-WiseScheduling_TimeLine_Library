import { useState, useEffect, useMemo, memo } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import styled from "styled-components";

const areaOptions = ["A區", "B區", "C區"];

const getMachinesByArea = (area) => {
  const mockData = {
    A區: ["A01", "A02", "A03"],
    B區: ["B01", "B02", "B03"],
    C區: ["C01", "C02", "C03"],
  };
  return mockData[area] || [];
};

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

const StyledSelect = styled(Select)`
  && {
    color: currentColor;
    .MuiSelect-icon {
      color: currentColor;
    }
  }
`;

function MachineSelector({ value, onChange }) {
  const [selectedArea, setSelectedArea] = useState(
    value?.area || areaOptions[0]
  );
  const [selectedMachine, setSelectedMachine] = useState(() => {
    const initialArea = value?.area || areaOptions[0];
    const machines = getMachinesByArea(initialArea);
    return value?.machineId || (machines.length > 0 ? machines[0] : "");
  });

  const machines = useMemo(
    () => getMachinesByArea(selectedArea),
    [selectedArea]
  );

  const handleAreaChange = (event) => {
    const newArea = event.target.value;
    const newMachines = getMachinesByArea(newArea);
    const newMachine = newMachines.length > 0 ? newMachines[0] : "";

    setSelectedArea(newArea);
    setSelectedMachine(newMachine);
    onChange?.({ area: newArea, machineId: newMachine });
  };

  const handleMachineChange = (event) => {
    const newMachine = event.target.value;
    setSelectedMachine(newMachine);
    onChange?.({ area: selectedArea, machineId: newMachine });
  };

  useEffect(() => {
    if (value?.area && value?.machineId) {
      const machines = getMachinesByArea(value.area);
      if (machines.includes(value.machineId)) {
        setSelectedArea(value.area);
        setSelectedMachine(value.machineId);
      }
    }
  }, [value]);

  return (
    <Stack direction="row" spacing={2} sx={{ minWidth: 400 }}>
      <StyledFormControl fullWidth>
        <InputLabel>機台區域</InputLabel>
        <StyledSelect
          value={selectedArea}
          onChange={handleAreaChange}
          label="機台區域"
        >
          {areaOptions.map((area) => (
            <StyledMenuItem key={area} value={area}>
              {area}
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>

      <StyledFormControl fullWidth>
        <InputLabel>機台編號</InputLabel>
        <StyledSelect
          value={selectedMachine}
          onChange={handleMachineChange}
          label="機台編號"
        >
          {machines.map((machine) => (
            <StyledMenuItem key={machine} value={machine}>
              {machine}
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </Stack>
  );
}

export default memo(MachineSelector);
