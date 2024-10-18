// src/contexts/ProcessCostAnalysisContext.js

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";
import { PROCESS_TYPE_OPTIONS } from "../config/processTypes";
import { mockProcessCostAnalysisData } from "../data/processCostAnalysisData";

const ProcessCostAnalysisContext = createContext();

export function ProcessCostAnalysisProvider({ children }) {
  const [processType, setProcessType] = useState(null);
  const [formData, setFormData] = useState({});
  const [infoDrawer, setInfoDrawerState] = useState(false);
  const methods = useForm();
  const [mockData, setMockData] = useState(mockProcessCostAnalysisData);

  // 使用 useRef 來存儲最新的 processType，避免閉包問題
  const processTypeRef = useRef(processType);
  processTypeRef.current = processType;

  // 經過檢查的 setProcessType 函數，避免不必要的更新
  const setProcessTypeWithCheck = useCallback((type) => {
    if (type !== processTypeRef.current) {
      setProcessType(type);
      processTypeRef.current = type;
    }
  }, []);

  const handleFormSubmit = useCallback(async (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  }, []);

  const [typeTitle, setTypeTitle] = useState("");
  const [currentData, setCurrentData] = useState({});

  const openDrawer = useCallback(
    (id) => {
      let selectedProcess;
      let processTypeOption;

      if (id) {
        // 如果提供了 id，從 mockData 中查找對應的流程
        selectedProcess = mockData.find((process) => process.id === id);
        processTypeOption = PROCESS_TYPE_OPTIONS.find(
          (option) => option.value === selectedProcess.processType
        );
      } else {
        // 如果沒有提供 id，使用當前選擇的 processType
        processTypeOption = PROCESS_TYPE_OPTIONS.find(
          (option) => option.label === processType
        );
        // 從 mockData 中查找第一個匹配當前 processType 的流程
        selectedProcess = mockData.find(
          (process) => process.processType === processTypeOption?.value
        );
      }

      if (processTypeOption) {
        setProcessType(processTypeOption.label);
        setTypeTitle(processTypeOption.label);
      }

      if (selectedProcess) {
        setCurrentData(selectedProcess);
        setFormData(selectedProcess);
      } else {
        // 如果沒有找到匹配的流程，可以設置一個空的或默認的數據結構
        setCurrentData({});
        setFormData({});
      }

      setInfoDrawerState(true);
    },
    [mockData, processType]
  );

  const closeDrawer = useCallback(() => {
    setInfoDrawerState(false);
    setProcessType(null);
    methods.reset();
  }, [methods]);

  const handleAddProcess = useCallback(() => {
    openDrawer(null);
  }, [openDrawer]);

  const deleteProcess = useCallback((type) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      delete newData[type];
      return newData;
    });
  }, []);

  const valueContext = {
    processType,
    setProcessType: setProcessTypeWithCheck, // 使用檢查版本
    formData,
    setFormData,
    methods,
    handleFormSubmit,
    infoDrawer,
    openDrawer,
    closeDrawer,
    handleAddProcess,
    deleteProcess,
    PROCESS_TYPE_OPTIONS,
    mockData,
    setMockData,
    typeTitle,
    currentData,
  };

  return (
    <ProcessCostAnalysisContext.Provider value={valueContext}>
      {children}
    </ProcessCostAnalysisContext.Provider>
  );
}

export function useProcessCostAnalysis() {
  const context = useContext(ProcessCostAnalysisContext);

  if (!context) {
    throw new Error(
      "useProcessCostAnalysis must be used within a ProcessCostAnalysisProvider"
    );
  }

  return context;
}
