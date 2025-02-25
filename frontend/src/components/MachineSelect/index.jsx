/**
 * @component MachineSelect
 * @description 機台選擇組件，用於顯示所有可用機台並允許用戶選擇
 * @version 2.0.0
 * @author Frontend Team
 * @lastModified 2025-02-25
 */

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Select, Col, Row } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { useMachineSNStore } from "../../store/zustand/store";
import {
  useGetMachinesQuery,
  useGetProductionScheduleByMachinesQuery,
} from "../../store/api/productionScheduleApi";
import { WORKORDER_STATUS } from "../../config/enum";
import { PRODUCTION_AREA } from "../../config/config";
import RefreshButton from "../Global/RefreshButton";
import "./index.scss";

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置,便於統一管理

/**
 * @constant {Object} API_CONFIG - API相關配置
 */
const API_CONFIG = {
  PAGE_SIZE: 100,
  DEFAULT_AREA: "A",
};

/**
 * @constant {Object} UI_CONFIG - UI相關常量
 */
const UI_CONFIG = {
  SELECT_WIDTH: 180,
  SELECT_HEIGHT: 60,
  COLUMN_SPAN: 6,
};

/**
 * @constant {Object} MACHINE_STATUS - 機台狀態常量
 */
const MACHINE_STATUS = {
  ACTIVE: "active", // 正在生產
  IDLE: null, // 待機，可開始新生產
  DISABLED: "disabled", // 尚未生產，禁止點選
};

//! =============== 2. 類型與介面 ===============
//* 定義所有資料結構,幫助理解資料流向

/**
 * @typedef {Object} Machine
 * @property {string} machineSN - 機台編號
 * @property {string} productionArea - 生產區域
 * @property {string|null} status - 機台狀態，active表示正在生產，disabled表示尚未生產禁止點選
 * @property {boolean} isClickable - 是否可點選，默認為true
 */

/**
 * @typedef {Object} MachineArea
 * @property {string} area - 區域代碼
 * @property {Array<Machine>} machines - 該區域的機台列表
 */

/**
 * @typedef {Object} RequestTracker
 * @property {boolean} machineDataLoaded - 機台數據是否已加載
 * @property {boolean} productionDataLoaded - 生產數據是否已加載
 */

//! =============== 3. 核心功能 ===============
//* 主要業務邏輯區,每個功能都配有詳細說明

const MachineSelect = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Option } = Select;

  //! ===== 狀態管理 =====
  const [skip, setSkip] = useState(true);
  const [machineFilter, setMachineFilter] = useState("");
  const [machineList, setMachineList] = useState([]);
  const [loading, setLoading] = useState(false);

  //! ===== Refs =====
  const areaRef = useRef(API_CONFIG.DEFAULT_AREA);
  const machineDataRef = useRef([]);
  const requestTrackerRef = useRef({
    machineDataLoaded: false,
    productionDataLoaded: false,
  });

  //! ===== Store =====
  const updateMachineSN = useMachineSNStore((state) => state.updateMachineSN);

  //! ===== API請求 =====

  /**
   * @description 獲取機台數據的RTK Query Hook
   */
  const {
    data: machineData,
    isLoading: machineIsLoading,
    isSuccess: machineIsSuccess,
    refetch: machineRefetch,
  } = useGetMachinesQuery(undefined, {
    onError: (error) => {
      console.error("獲取機台數據失敗:", error);
      setLoading(false);
    },
  });

  /**
   * @description 獲取生產數據的RTK Query Hook
   */
  const {
    data: productionScheduleData,
    isSuccess: productionScheduleIsSuccess,
    isLoading: productionScheduleIsLoading,
    refetch: productionScheduleRefetch,
  } = useGetProductionScheduleByMachinesQuery(
    {
      size: API_CONFIG.PAGE_SIZE,
      machineSNs: machineFilter,
      status: WORKORDER_STATUS.ON_GOING,
    },
    {
      skip,
      onError: (error) => {
        console.error("獲取製令單數據失敗:", error);
        setLoading(false);
      },
    }
  );

  //! ===== 生命週期與數據處理 =====

  /**
   * @function initializeComponent
   * @description 組件初始化和清理
   */
  useEffect(() => {
    console.log("組件掛載，初始化數據...");
    setLoading(true);

    // 重置請求狀態追蹤
    requestTrackerRef.current = {
      machineDataLoaded: false,
      productionDataLoaded: false,
    };

    // 重新獲取機台數據
    machineRefetch();

    // 組件卸載時重置狀態
    return () => {
      console.log("組件卸載，重置狀態");
      setSkip(true);
      setMachineFilter("");
    };
  }, [machineRefetch]);

  /**
   * @function monitorLoadingState
   * @description 監控數據加載狀態以解除loading
   */
  useEffect(() => {
    if (
      (machineIsSuccess && requestTrackerRef.current.productionDataLoaded) ||
      (productionScheduleIsSuccess &&
        requestTrackerRef.current.machineDataLoaded)
    ) {
      setLoading(false);
    }
  }, [machineIsSuccess, productionScheduleIsSuccess]);

  /**
   * @function processMachineData
   * @description 處理機台數據加載成功
   */
  useEffect(() => {
    if (machineIsSuccess && machineData) {
      console.log("機台數據加載成功:", machineData?.length || 0);
      requestTrackerRef.current.machineDataLoaded = true;

      if (!machineData || machineData.length === 0) {
        console.warn("未獲取到機台數據");
        return;
      }

      // 生成machineFilter
      const machineFilter = machineData.map((item) => item.machineSN);
      const filterString = machineFilter.join(",");

      console.log("設置機台過濾器:", filterString);
      setMachineFilter(filterString);

      // 如果有過濾器且當前skip為true，則觸發第二個API請求
      if (filterString && skip) {
        console.log("准備觸發製令單API請求...");
        setSkip(false);
      }
    }
  }, [machineIsSuccess, machineData, skip]);

  /**
   * @function processProductionData
   * @description 處理製令單數據加載成功
   */
  useEffect(() => {
    if (productionScheduleIsSuccess && productionScheduleData) {
      console.log("製令單數據加載成功:", productionScheduleData?.length || 0);
      requestTrackerRef.current.productionDataLoaded = true;
    }
  }, [productionScheduleIsSuccess, productionScheduleData]);

  /**
   * @function processCompletedData
   * @description 當兩個API都加載完成後處理數據
   */
  useEffect(() => {
    if (
      machineIsSuccess &&
      productionScheduleIsSuccess &&
      machineData &&
      productionScheduleData
    ) {
      console.log("兩個API都已加載完成，準備格式化數據");
      const formattedData = formatMachineData();
      machineDataRef.current = formattedData;
      console.log("已格式化機台數據:", formattedData);
      changeMachineList();
    }
  }, [
    machineIsSuccess,
    productionScheduleIsSuccess,
    machineData,
    productionScheduleData,
  ]);

  //! =============== 4. 工具函數 ===============
  //* 通用功能區,可被多個模組復用

  /**
   * @function formatMachineData
   * @description 將原始機台數據和生產數據組合成易於使用的格式
   * @returns {Array<MachineArea>} 格式化後的機台區域數據
   *
   * @example
   * // 返回格式示例:
   * // [
   * //   {
   * //     area: "A",
   * //     machines: [
   * //       { machineSN: "A01", productionArea: "A", status: "active" },
   * //       { machineSN: "A02", productionArea: "A", status: null }
   * //     ]
   * //   }
   * // ]
   *
   * @notes
   * - 這是整個組件中邏輯最複雜的部分
   * - 需要同時處理兩個API的數據
   * - 添加了完整的錯誤處理
   */
  const formatMachineData = useCallback(() => {
    // 檢查數據有效性
    if (!machineData || !productionScheduleData) {
      console.warn("無法格式化機台數據 - 數據不完整", {
        hasMachineData: Boolean(machineData),
        hasProductionData: Boolean(productionScheduleData),
      });
      return [];
    }

    try {
      //* ========= 複雜邏輯解釋 =========
      // 步驟 1: 先按區域分組機台數據
      // 步驟 2: 然後為每個機台添加狀態信息
      // 步驟 3: 如果機台正在生產中(在productionScheduleData中)則標記為active

      // 先按區域分組
      const tempData = PRODUCTION_AREA.map((item) => {
        const machines = machineData.filter(
          (machine) => machine.productionArea === item.value
        );
        return {
          area: item.value,
          machines,
        };
      });

      // 添加狀態信息
      const formattedData = tempData.map((item) => {
        const machines = item.machines.map((machine) => {
          // 檢查機台是否在生產中
          const isActive = productionScheduleData.some(
            (productionMachine) =>
              productionMachine.machineSN === machine.machineSN
          );

          // 判斷機台是否可點選
          // 修改邏輯：所有沒有生產中任務的機台都設置為禁用狀態
          const isNotActive = !isActive;

          if (isActive) {
            return {
              ...machine,
              status: MACHINE_STATUS.ACTIVE,
              isClickable: true,
            };
          } else if (isNotActive) {
            // 沒有活動生產任務的機台設為禁用狀態
            return {
              ...machine,
              status: MACHINE_STATUS.DISABLED,
              isClickable: false,
            };
          } else {
            return {
              ...machine,
              status: MACHINE_STATUS.IDLE,
              isClickable: true,
            };
          }
        });
        return { ...item, machines };
      });

      return formattedData;
    } catch (error) {
      console.error("格式化機台數據時發生錯誤:", error);
      return [];
    }
  }, [machineData, productionScheduleData]);

  /**
   * @function changeMachineList
   * @description 根據選擇的區域更新機台列表
   * @returns {void}
   *
   * @commonErrors
   * - 格式化數據為空 - 確保formatMachineData已被調用
   * - 所選區域不存在 - 檢查areaRef.current值是否正確
   */
  const changeMachineList = useCallback(() => {
    if (!machineDataRef.current || machineDataRef.current.length === 0) {
      console.warn("無法變更機台列表 - 沒有格式化的機台數據");
      return;
    }

    try {
      // 從當前格式化數據中找出所選區域的數據
      const filteredList = machineDataRef.current.filter(
        (item) => item.area === areaRef.current
      );

      if (filteredList.length > 0) {
        console.log("設置區域機台列表:", filteredList[0].machines?.length || 0);
        setMachineList(filteredList[0].machines);
      } else {
        console.warn("所選區域沒有機台數據:", areaRef.current);
        setMachineList([]);
      }
    } catch (error) {
      console.error("變更機台列表時發生錯誤:", error);
      setMachineList([]);
    }
  }, []);

  /**
   * @function handleMachineClick
   * @description 處理機台點擊事件，更新store並導航
   * @param {Machine} item - 選中的機台對象
   * @returns {void}
   */
  const handleMachineClick = useCallback(
    (item) => {
      try {
        // 檢查機台是否可點選
        if (!item.isClickable) {
          console.log("機台不可點選:", item.machineSN, "狀態:", item.status);
          return; // 直接返回，不執行後續操作
        }

        console.log("選擇機台:", item.machineSN, "狀態:", item.status);

        // 更新store
        updateMachineSN(item.machineSN);

        // 導航前檢查store
        console.log("導航前store狀態:", useMachineSNStore.getState());

        // 根據狀態導航
        if (item.status === MACHINE_STATUS.ACTIVE) {
          console.log("導航到LeaderSignPage");
          navigate("/LeaderSignPage", { state: { action: "continue" } });
        } else {
          console.log("導航到ProductionReportPage");
          navigate("/ProductionReportPage");
        }
      } catch (error) {
        console.error("導航過程中發生錯誤:", error);
      }
    },
    [navigate, updateMachineSN]
  );

  /**
   * @function handleRefresh
   * @description 觸發手動數據刷新
   * @returns {void}
   */
  const handleRefresh = useCallback(() => {
    console.log("手動刷新數據");
    setLoading(true);

    // 重置請求狀態
    requestTrackerRef.current = {
      machineDataLoaded: false,
      productionDataLoaded: false,
    };

    // 先重設skip為true
    setSkip(true);

    // 重新獲取機台數據
    machineRefetch();
  }, [machineRefetch]);

  /**
   * @function renderAreaOptions
   * @description 渲染區域下拉選項
   * @returns {Array<React.ReactNode>} 區域選項
   */
  const renderAreaOptions = () => [
    PRODUCTION_AREA.map((item, index) => (
      <Option key={index} value={item.value} label={item.label}>
        {item.label}
      </Option>
    )),
  ];

  //! ===== 渲染邏輯 =====

  // 顯示加載器
  if (loading || machineIsLoading || productionScheduleIsLoading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionFontSize: 24,
          },
        },
      }}
    >
      <div className="machine-select">
        <div className="box">
          <div className="title-box">
            <div className="title">
              {t("productionReport.machineSelect.title")}
              <RefreshButton onClick={handleRefresh} />
            </div>

            <div className="filter-section">
              {/* 篩選地區 */}
              <Select
                className="area-filter"
                defaultValue={API_CONFIG.DEFAULT_AREA}
                style={{
                  width: UI_CONFIG.SELECT_WIDTH,
                  height: UI_CONFIG.SELECT_HEIGHT,
                }}
                onChange={(value) => {
                  console.log("變更區域:", value);
                  areaRef.current = value;
                  changeMachineList();
                }}
              >
                {renderAreaOptions()}
              </Select>
            </div>
          </div>

          {machineList && machineList.length > 0 ? (
            <div className="box-list">
              <Row gutter={[16, 24]}>
                {machineList.map((item, index) => (
                  <Col
                    className="gutter-row"
                    span={UI_CONFIG.COLUMN_SPAN}
                    key={index}
                  >
                    <div
                      className={
                        item.status === MACHINE_STATUS.ACTIVE
                          ? "machine-box active"
                          : item.status === MACHINE_STATUS.DISABLED
                          ? "machine-box disabled"
                          : "machine-box"
                      }
                      onClick={() => handleMachineClick(item)}
                      style={{
                        cursor: item.isClickable ? "pointer" : "not-allowed",
                        opacity: item.isClickable ? 1 : 0.6,
                      }}
                    >
                      <h1>{item.machineSN}</h1>
                      {item.status === MACHINE_STATUS.ACTIVE ? (
                        <p>{t("productionReport.machineSelect.onGoing")}...</p>
                      ) : item.status === MACHINE_STATUS.DISABLED ? (
                        <>
                          <p>{t("productionReport.machineSelect.none")}</p>
                        </>
                      ) : (
                        <p>{t("productionReport.machineSelect.none")}</p>
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            <div className="no-data">
              <p>{t("common.noData")}</p>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default MachineSelect;
