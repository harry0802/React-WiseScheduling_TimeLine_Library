/**
 * @file MachineCard.jsx
 * @description 機台卡片組件
 * @author Harry's Engineering Team
 */

import React, { memo } from "react";
import HandymanIcon from "@mui/icons-material/Handyman";
import { MachineBox } from "../../../../assets/machineBoard.styles";

/**
 * 機台卡片組件
 * @param {Object} machineData - 機台數據
 * @param {Function} onMachineClick - 點擊處理函數
 */
const MachineCard = memo(({ machineData, onMachineClick }) => {
  // 處理嵌套的資料結構
  const machineSN = machineData.machine?.machine?.machineSN ||
                    machineData.machine?.machineSN ||
                    'N/A';

  return (
    <MachineBox
      $status={machineData.englishStatus}
      onClick={
        machineData.isClickable ? () => onMachineClick(machineData) : undefined
      }
      style={{
        cursor: machineData.isClickable ? "pointer" : "not-allowed",
      }}
    >
      <div className="title-container">
        <h1>{machineSN}</h1>
      </div>
      <div className="status-container">
        <p>{machineData.statusText}</p>
        {machineData.showIcon && <HandymanIcon className="icon" />}
      </div>
    </MachineBox>
  );
});

MachineCard.displayName = "MachineCard";

export default MachineCard;
