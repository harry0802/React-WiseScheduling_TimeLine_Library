/**
 * @file useTimelineDialogs.js
 * @description 時間軸對話框管理 Hook - 認知負荷優化版本
 * @version 5.0.0 - 2025-05-29 應用認知負荷控制和註解規範
 * @author 資深 JavaScript 程式碼管理專家
 */

import { useEffect, useCallback } from "react";
import {
  setGroups,
  openItemDialog,
  closeItemDialog,
  onSaveItem,
  onConfirmDelete,
  openDeleteDialog,
} from "../../components/schedule/DialogManager";
import dayjs from "dayjs";
import {
  MACHINE_STATUS,
  getStatusClass,
} from "../../configs/validations/schedule/constants";
import { getTimeWindow } from "../../utils/schedule/dateUtils";
import { useChangeWorkOrderMutation } from "../../services/schedule/smartSchedule";
import {
  useCreateMachineStatusMutation,
  useUpdateMachineStatusMutation,
  useDeleteMachineStatusMutation,
} from "../../services/machine/machineStatusApi";
import {
  transformNewStatusToApi,
  transformUpdateStatusToApi,
} from "../../utils/schedule/transformers/apiTransformers";
import { isNumber } from "@mui/x-data-grid/internals";

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所