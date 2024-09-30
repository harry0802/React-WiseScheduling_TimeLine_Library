/* eslint-disable react-hooks/rules-of-hooks */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useEffect, useMemo } from "react";
import { useGetProductionReportQuery } from "../../../store/api/productionReportApi";
import { useGetProductionScheduleByMachinesQuery } from "../../../store/api/productionScheduleApi";
import {
  useAddQualityInspectionMutation,
  useGetInspectionsQuery,
  useGetInspectionTypesQuery,
} from "../service/endpoints/inspectionApi";
import { createQmsProductionInspectionService } from "../feature/QmsProductionInspection/domain/qmsProductionInspectionService";
import { useParams } from "react-router-dom";

// 1. Initial State
const initialState = {
  account: "",
  password: "",
  isAuthenticated: false,
  userType: null,
  inspectionTypes: [],
  productionSchedules: [],
  activeMachines: {},
  productionReports: {},
};

// 2. Store Actions
const createActions = (set) => ({
  // User related actions
  setAccount: (account) => set({ account }),
  setPassword: (password) => set({ password }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUserType: (userType) => set({ userType }),
  login: (account, password, userType) =>
    set({ account, password, isAuthenticated: true, userType }),
  logout: () => set(initialState),

  // Inspection and Production Schedule actions
  setInspectionTypes: (types) => set({ inspectionTypes: types }),
  setProductionSchedules: (schedules) =>
    set({ productionSchedules: schedules }),

  // Active Machine actions
  setActiveMachine: (machineSN, workOrderSN, scheduleIds) =>
    set((state) => ({
      activeMachines: {
        ...state.activeMachines,
        [machineSN]: { workOrderSN, scheduleIds },
      },
    })),
  clearActiveMachines: () => set({ activeMachines: {} }),

  // Production Report actions
  setProductionReport: (machineSN, report) =>
    set((state) => ({
      productionReports: {
        ...state.productionReports,
        [machineSN]: report,
      },
    })),
  clearProductionReports: () => set({ productionReports: {} }),
});

// 3. Zustand Store Creation
const useQmsStore = create(
  persist((set) => ({ ...initialState, ...createActions(set) }), {
    name: "qms-storage",
    storage: createJSONStorage(() => sessionStorage),
  })
);

// 4. Data Processing Module
const dataProcessing = {
  processProductionReport: (reportData, inspectionData) =>
    reportData.map((report) => {
      const matchingInspection = inspectionData.find(
        (inspection) => inspection?.productionScheduleId === report?.id
      );

      return {
        id: report.id,
        productName: report.productName,
        workOrderQuantity: report.workOrderQuantity,
        unfinishedQuantity: report.unfinishedQuantity,
        processName: report.processName,
        children: [dataProcessing.createLotData(report, matchingInspection)],
      };
    }),

  createLotData: (report, inspection) => ({
    id: report.id,
    lotName: report.lotName,
    workOrderSN: report.workOrderSN,
    operator1: report.operator1,
    operator2: report.operator2,
    startTime: report.startTime,
    endTime: report.endTime,
    defectiveQuantity: report.defectiveQuantity,
    productionQuantity: report.productionQuantity,
    colorDifference: report.colorDifference,
    deformation: report.deformation,
    shrinkage: report.shrinkage,
    shortage: report.shortage,
    hole: report.hole,
    bubble: report.bubble,
    impurity: report.impurity,
    pressure: report.pressure,
    overflow: report.overflow,
    flowMark: report.flowMark,
    oilStain: report.oilStain,
    burr: report.burr,
    blackSpot: report.blackSpot,
    scratch: report.scratch,
    encapsulation: report.encapsulation,
    other: report.other,
    // Add inspection data if available
    // inspectionQuantity: inspection?.inspectionQuantity || 0,
    // goodQuantity: inspection?.goodQuantity || 0,
    inspector: inspection?.inspector || null,
    inspectionDate: inspection?.inspectionDate || null,
    inspectionType: inspection?.inspectionType || null,
    inspectionResult: inspection?.result || null,
  }),
};

// 5. Main Hooks
export const useInspectionTypes = () => {
  const { inspectionTypes, setInspectionTypes } = useQmsStore();
  const { data: apiInspectionTypes, isLoading: isLoadingInspectionTypes } =
    useGetInspectionTypesQuery();

  useEffect(() => {
    if (apiInspectionTypes && !isLoadingInspectionTypes) {
      setInspectionTypes(apiInspectionTypes.data);
    }
  }, [apiInspectionTypes, isLoadingInspectionTypes, setInspectionTypes]);

  return { inspectionTypes, isLoadingInspectionTypes };
};

export const useProductionSchedules = () => {
  const {
    productionSchedules,
    setProductionSchedules,
    activeMachines,
    setActiveMachine,
    clearActiveMachines,
  } = useQmsStore();

  const {
    data: apiProductionSchedules,
    isLoading: isLoadingProductionSchedules,
  } = useGetProductionScheduleByMachinesQuery({ status: "On-going" });

  useEffect(() => {
    if (apiProductionSchedules && !isLoadingProductionSchedules) {
      setProductionSchedules(apiProductionSchedules);
    }
  }, [
    apiProductionSchedules,
    isLoadingProductionSchedules,
    setProductionSchedules,
  ]);

  const handleMachineSelect = (machineSN) => {
    const machineSchedules = productionSchedules.filter(
      (schedule) => schedule.machineSN === machineSN
    );
    const [{ workOrderSN }] = machineSchedules;
    const scheduleIds = machineSchedules.map(({ id }) => id);
    setActiveMachine(machineSN, workOrderSN, scheduleIds);
  };

  return {
    productionSchedules,
    isLoadingProductionSchedules,
    activeMachines,
    handleMachineSelect,
    clearActiveMachines,
  };
};

export const useProductionReports = () => {
  const {
    activeMachines,
    setProductionReport,
    clearProductionReports,
    userType,
  } = useQmsStore();
  const { machineSN } = useParams();

  // Queries
  const { data: productionReportData, isLoading: isLoadingProductionReport } =
    useGetProductionReportQuery(
      { status: "On-going", machineSN },
      {
        refetchOnMountOrArgChange: true,
        skip:
          !machineSN ||
          !activeMachines ||
          Object.keys(activeMachines).length === 0,
      }
    );

  const { data: inspections } = useGetInspectionsQuery(userType, {
    refetchOnMountOrArgChange: true,
    skip: !userType,
  });

  // Mutations
  const [addQualityInspection] = useAddQualityInspectionMutation();

  // Memoized values
  const lastProductionReport = useMemo(
    () =>
      productionReportData?.length
        ? [productionReportData[productionReportData.length - 1]]
        : [],
    [productionReportData]
  );

  const latestInspections = useMemo(() => {
    const inspectionsSource = inspections?.data;
    return inspectionsSource
      ?.filter((inspection) => inspection.machineSN === machineSN)
      .sort((a, b) => b.inspectionDate - a.inspectionDate);
  }, [machineSN, inspections]);

  // Services
  const qmsService = createQmsProductionInspectionService(addQualityInspection);

  // Effects
  useEffect(() => {
    if (lastProductionReport.length && !isLoadingProductionReport) {
      Object.entries(activeMachines).forEach(([machineSN, { workOrderSN }]) => {
        const machineReportData = lastProductionReport.filter(
          (report) =>
            report.machineSN === machineSN && report.workOrderSN === workOrderSN
        );

        const inspectionData = latestInspections?.at(-1);
        const processedData = dataProcessing.processProductionReport(
          machineReportData,
          [inspectionData].filter(Boolean)
        );

        setProductionReport(machineSN, processedData);
      });
    }
  }, [
    lastProductionReport,
    isLoadingProductionReport,
    activeMachines,
    setProductionReport,
    latestInspections,
  ]);

  return { qmsService, clearProductionReports, isLoadingProductionReport };
};

// 原來的 useQmsData 可以保留，但現在它只是組合其他 hooks 的結果
export const useQmsData = () => {
  const inspectionData = useInspectionTypes();
  const schedulesData = useProductionSchedules();
  const reportsData = useProductionReports();

  // Add error handling
  if (!inspectionData || !schedulesData || !reportsData) {
    console.error("Error: One or more QMS data hooks failed to load");
    return null;
  }

  return {
    ...inspectionData,
    ...schedulesData,
    ...reportsData,
  };
};

export { useQmsStore };
