// hooks/useProcessDialog.js
import { useState, useEffect } from "react";
import { useGetProcessOptionsQuery } from "../service/endpoints/processOptionApi";
import {
  convertToApiFormat,
  useProcessActions,
} from "../service/endpoints/processApi";
import { useTransferListSlice } from "../slice/TransferListSlice";
import { useProcessSectionSlice } from "../slice/ProcessSectionsSlice";
export function useProcessDialog() {
  const {
    mold,
    isEditMode,
    onDelete,
    processIndex,
    processName,
    processSN,
    processId,
  } = useProcessSectionSlice();

  //
  const [options, setOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    processName: "",
    moldName: "",
  });
  //

  const [selectedProcess, setSelectedProcess] = useState(null);
  const [inputValue, setInputValue] = useState(processName || "");

  //
  const { data: processesOptions } = useGetProcessOptionsQuery();
  const { right: checkMastirialData } = useTransferListSlice();

  const { handleCreateProcess, handleUpdateProcess, handleDeleteProcess } =
    useProcessActions();

  useEffect(() => {
    if (processesOptions?.data) {
      setOptions(processesOptions.data);
    }
  }, [processesOptions]);

  useEffect(() => {
    const selected = options.find(
      (option) => option.processName === processName ?? formValues.processName
    );

    setSelectedProcess(selected || null);
  }, [formValues.processName, options, processName]);

  return {
    formValues,
    setFormValues,
    selectedProcess,
    setSelectedProcess,
    options,
    inputValue,
    onDelete,
    checkMastirialData,
    setInputValue,
    handleCreateProcess,
    handleUpdateProcess,
    handleDeleteProcess,
    convertToApiFormat,
    isEditMode,
    processIndex,
    processName,
    processSN,
    processId,
    mold,
  };
}
