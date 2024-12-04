import { useState, useMemo, useEffect } from "react";
import { calculateTotalCost } from "./useProcessComputations";

export function useProcessCostAnalysis(quotationSlice) {
  const { processData, setData, costAndQuotation, setCostAndQuotation } =
    quotationSlice || {};

  const [processes, setProcesses] = useState(processData);
  const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);

  const costResult = useMemo(() => {
    return calculateTotalCost(
      processes?.map((process) => ({
        processCategory: process.processType,
        data: process,
      }))
    );
  }, [processes]);

  useEffect(() => {
    setData?.(processes);
  }, [processes, setData]);

  useEffect(() => {
    if (!costResult || !setCostAndQuotation) return;
    setCostAndQuotation({
      base: costResult.totalCostSubtotal,
    });
  }, [costResult, setCostAndQuotation]);

  const handlers = {
    updateProcess: (id, updatedData) => {
      setProcesses((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
      );
    },
    addProcess: (newProcess) => {
      setProcesses((prev) => [...prev, newProcess]);
    },
    deleteProcess: (id) => {
      setProcesses((prev) => prev.filter((p) => p.id !== id));
    },
  };

  return {
    processes,
    costResult,
    handlers,
    isNewDrawerOpen,
    setIsNewDrawerOpen,
  };
}
