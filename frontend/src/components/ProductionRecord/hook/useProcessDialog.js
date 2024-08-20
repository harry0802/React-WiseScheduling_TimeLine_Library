// hooks/useProcessDialog.js
import { useState, useEffect } from "react";
import { useGetProcessOptionsQuery } from "../service/endpoints/processOptionApi";
import {
  convertToApiFormat,
  useProcessActions,
} from "../service/endpoints/processApi";
import { useTransferListSlice } from "../slice/TransferListSlice";

export function useProcessDialog(initialProcessData) {
  const [formValues, setFormValues] = useState({
    processName: initialProcessData?.processName || "",
    moldName: initialProcessData?.processSN || "",
  });

  const [selectedProcess, setSelectedProcess] = useState(null);
  const [moldItems, setMoldItems] = useState(initialProcessData?.molds || []);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
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
      (option) => option.processName === formValues.processName
    );

    setSelectedProcess(selected || null);
  }, [formValues.processName, options]);

  return {
    formValues,
    setFormValues,
    selectedProcess,
    setSelectedProcess,
    moldItems,
    setMoldItems,
    options,
    inputValue,
    checkMastirialData,
    setInputValue,
    handleCreateProcess,
    handleUpdateProcess,
    handleDeleteProcess,
    convertToApiFormat,
  };
}
