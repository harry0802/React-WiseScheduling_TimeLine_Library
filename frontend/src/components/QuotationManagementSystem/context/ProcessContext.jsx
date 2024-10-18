import React, { createContext, useState, useCallback } from "react";
import { mockProcessCostAnalysisData } from "../data/processCostAnalysisData";

export const ProcessContext = createContext();

export function ProcessProvider({ children }) {
  const [processes, setProcesses] = useState(mockProcessCostAnalysisData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProcesses = useCallback(() => {
    setProcesses(mockProcessCostAnalysisData);
  }, []);

  const addProcess = useCallback((process) => {
    setProcesses((prev) => [
      ...prev,
      { ...process, id: Date.now().toString() },
    ]);
  }, []);

  const updateProcess = useCallback((id, updatedProcess) => {
    setProcesses((prev) =>
      prev.map((process) =>
        process.id === id ? { ...process, ...updatedProcess } : process
      )
    );
  }, []);

  const deleteProcess = useCallback((id) => {
    setProcesses((prev) => prev.filter((process) => process.id !== id));
  }, []);

  return (
    <ProcessContext.Provider
      value={{
        processes,
        isLoading,
        error,
        fetchProcesses,
        addProcess,
        updateProcess,
        deleteProcess,
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
}
