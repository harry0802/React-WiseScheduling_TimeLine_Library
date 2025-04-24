import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Tooltip } from "antd";
import {
  CheckOutlined,
  PauseOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import {
  useMachineSNStore,
  useProductionScheduleIdsStore,
  useLotStore,
} from "../../store/zustand/store";
import { useGetProductionReportQuery } from "../../store/api/productionReportApi";
import styles from "./index.module.scss";
import RefreshButton from "../Global/RefreshButton";
import { useTranslation } from "react-i18next";
import { TZ } from "../../config/config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

//! =============== 1. 自定義 Hooks ===============
/**
 * @function usePreventGoBack
 * @description 防止使用者通過瀏覽器返回按鈕離開頁面
 * @param {string} warningMessage - 顯示給使用者的警告訊息
 * @param {string} okText - 確認按鈕文字
 */
const usePreventGoBack = (warningMessage, okText) => {
  useEffect(() => {
    window.history.pushState(null, "", document.URL);

    const handlePopState = () => {
      window.history.pushState(null, "", document.URL);
      Modal.info({
        width: "800px",
        content: <p>{warningMessage}</p>,
        okText: okText,
        onOk() {},
      });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [warningMessage, okText]);
};

//! =============== 2. 表格相關函數 ===============
/**
 * @function getTableColumns
 * @description 生成表格的列定義
 * @param {Function} t - i18n 翻譯函數
 * @returns {Array} 表格列定義數組
 */
const getTableColumns = (t) => {
  return [
    {
      title: "NO",
      dataIndex: "no",
      width: "3%",
    },
    {
      title: `${t("productionReport.table.status")}`,
      dataIndex: "status",
      width: "8%",
    },
    {
      title: `${t("productionReport.table.workOrderSN")}`,
      dataIndex: "lotName",
      width: "12%",
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: `${t("productionReport.table.moldNo")}`,
      dataIndex: "moldNo",
      width: "10%",
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: `${t("productionReport.table.productName")}`,
      dataIndex: "productName",
      width: "15%",
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: `${t("productionReport.table.workOrderQuantity")}`,
      dataIndex: "workOrderQuantity",
      width: "8%",
    },
    {
      title: `${t("productionReport.table.productionQuantity")}`,
      dataIndex: "productionQuantity",
      width: "8%",
    },
    {
      title: `${t("productionReport.table.formatedDefectiveQty")}`,
      dataIndex: "defectiveQuantity",
      width: "8%",
    },
    {
      title: `${t("productionReport.table.unfinishedQuantity")}`,
      dataIndex: "unfinishedQuantity",
      width: "8%",
    },
    {
      title: `${t("productionReport.table.operators")}`,
      dataIndex: "operators",
      width: "8%",
    },
    {
      title: `${t("productionReport.table.period")}`,
      dataIndex: "period",
      width: "12%",
    },
  ];
};

/**
 * @function getRowClassName
 * @description 根據記錄生成行樣式類名
 * @param {Object} record - 表格行數據
 * @param {boolean} showUnfinished - 是否顯示未完成項
 * @param {Object} styles - 樣式對象
 * @returns {string} 行樣式類名
 */
const getRowClassName = (record, showUnfinished, styles) => {
  let className = "";

  // 設置未完成行樣式
  if (
    showUnfinished &&
    ((record.children != null && record.unfinishedQuantity > 0) ||
      (record.children === null && record.unfinishedQuantity === null))
  ) {
    className += ` ${styles.unfinishedRow} `;
  }

  // 設置分組樣式
  className +=
    record.className === " groupWhite "
      ? ` ${styles.groupWhite} `
      : ` ${styles.groupGray} `;

  return className;
};

//! =============== 3. 數據處理函數 ===============
/**
 * @function processWorkOrders
 * @description 處理工單數據，將母批和子批關聯
 * @param {Array} workOrders - 原始工單數據
 * @returns {Array} 處理後的嵌套工單數據
 */
const processWorkOrders = (workOrders) => {
  // 檢查 workOrders 是否為陣列
  if (!Array.isArray(workOrders) || workOrders.length === 0) {
    console.error('無效的工單數據:', workOrders);
    return [];
  }

  try {
    // 分離母批和子批，並確保項目有效
    const motherLots = workOrders.filter((item) => 
      item && typeof item === 'object' && item.serialNumber === 0
    );
    
    const childLots = workOrders.filter((item) => 
      item && typeof item === 'object' && item.serialNumber !== 0
    );

    // 構建嵌套結構
    return motherLots.map((motherLot) => {
      // 確保母批有效
      if (!motherLot || typeof motherLot !== 'object') {
        return null;
      }
      
      // 過濾相關的子批並建立關聯
      const children = childLots.filter(childLot => 
        childLot && childLot.workOrderSN === motherLot.workOrderSN
      );
      
      return {
        ...motherLot,
        children: children.length > 0 ? children : null,
      };
    }).filter(Boolean); // 移除無效項目
  } catch (error) {
    console.error('處理工單數據時出錯:', error);
    return [];
  }
};

/**
 * @function formatWorkOrders
 * @description 格式化工單數據為表格數據源格式
 * @param {Array} nestedLots - 嵌套結構的工單數據
 * @param {string} timezone - 時區設置
 * @returns {Array} 格式化後的表格數據源
 */
const formatWorkOrders = (nestedLots, timezone) => {
  // 檢查輸入數據是否有效
  if (!Array.isArray(nestedLots) || nestedLots.length === 0) {
    return [];
  }

  let currentClass = " groupGray ";

  try {
    return nestedLots.map((item, m_idx) => {
      // 處理序號
      const key = m_idx + 1;
      const no = (m_idx + 1).toString().padStart(2, "0");

      // 處理操作人員和時間段
      let operators = "";
      let period = "";
      if (item.leader != null) {
        try {
          const leaderData = JSON.parse(item.leader);
          if (Array.isArray(leaderData)) {
            operators = leaderData.map((leader) => {
              return `\n${leader.leader || ''}\n`;
            }).join('');
            period = leaderData.map((leader) => {
              const logTime = leader.log_time ? dayjs(leader.log_time).tz(timezone).format("YYYY-MM-DD HH:mm") : '';
              return `${logTime} \n${leader.action || ''}\n`;
            }).join('');
          }
        } catch (error) {
          console.error("JSON parse error:", error, item.leader);
          operators = "解析錯誤";
          period = "解析錯誤";
        }
      }

      // 處理行樣式
      currentClass =
        currentClass === " groupWhite " ? " groupGray " : " groupWhite ";
      const className = currentClass;

      // 處理子批數據
      let children = null;
      if (item.children != null && Array.isArray(item.children)) {
        children = item.children.map((child, idx) => {
          // 安全地處理日期格式化
          const formatSafeDate = (dateStr) => {
            if (!dateStr) return '';
            try {
              return dayjs(dateStr).tz(timezone).format("YYYY-MM-DD HH:mm");
            } catch (err) {
              console.error("Date parsing error:", err, dateStr);
              return '';
            }
          };
          
          // 安全地取得屬性值
          const safeGet = (obj, prop, defaultValue = '') => {
            return obj && obj[prop] !== undefined && obj[prop] !== null ? obj[prop] : defaultValue;
          };
          
          return {
            key: idx + (m_idx + 1) * 100,
            lotName: safeGet(child, 'lotName'),
            productionQuantity: safeGet(child, 'productionQuantity', 0),
            defectiveQuantity: safeGet(child, 'defectiveQuantity', 0),
            unfinishedQuantity: safeGet(child, 'unfinishedQuantity', 0),
            operators: `${safeGet(child, 'operator1')}\n${safeGet(child, 'operator2')}`,
            period: `${formatSafeDate(child.start_time)}\n${formatSafeDate(child.end_time)}`,
            className: currentClass,
          };
        });
      }

      return {
        ...item,
        key,
        no,
        className,
        operators,
        period,
        children,
      };
    });
  } catch (error) {
    console.error('格式化工單數據時出錯:', error);
    return [];
  }
};

//! =============== 4. 事件處理函數 ===============
/**
 * @function handleCompleteAction
 * @description 處理完成按鈕的點擊事件
 * @param {Array} dataSource - 表格數據源
 * @param {Array} workOrders - 原始工單數據
 * @param {Function} navigate - 路由導航函數
 * @param {Function} t - i18n 翻譯函數
 * @param {Function} setShowUnfinished - 設置是否顯示未完成項的函數
 */
const handleCompleteAction = (
  dataSource,
  workOrders,
  navigate,
  t,
  setShowUnfinished
) => {
  // 檢查數據是否有效
  if (!Array.isArray(dataSource) || dataSource.length === 0) {
    console.error('無效的數據源:', dataSource);
    return;
  }

  try {
    // 檢查是否所有工單都已完成
    const isComplete = dataSource.every((item) => item.unfinishedQuantity === 0);

    if (!isComplete) {
      // 如果有未完成的項目，顯示確認對話框
      Modal.confirm({
        content: <p>{t("productionReport.detail.completePopMsg")}</p>,
        cancelText: `${t("common.cancelBtn")}`,
        okText: `${t("common.okBtn")}`,
        onCancel() {
          setShowUnfinished(true);
        },
        onOk() {
          navigate("/LeaderSignPage", {
            state: { action: "complete", completedWorkOrders: workOrders },
          });
        },
      });
      return;
    }

    // 如果全部完成，直接導航
    navigate("/LeaderSignPage", {
      state: { action: "complete", completedWorkOrders: workOrders },
    });
  } catch (error) {
    console.error('處理完成操作時出錯:', error);
  }
};

//! =============== 5. 主元件 ===============
/**
 * @function ProductionDetail
 * @description 生產詳情頁面元件
 */
const ProductionDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 使用自定義 Hook 防止返回
  usePreventGoBack(t("productionReport.detail.forbidden"), t("common.okBtn"));

  // 從 store 獲取數據
  const productionScheduleIdsStore = useProductionScheduleIdsStore(
    (state) => state.productionScheduleIdsStore
  );
  const machineSN_Store = useMachineSNStore((state) => state.machineSN_Store);
  const updateLots = useLotStore((state) => state.updateLots);

  // 本地狀態
  const [dataSource, setDataSource] = useState([]);
  const [showUnfinished, setShowUnfinished] = useState(false);
  const [loading, setLoading] = useState(false);

  // 獲取表格列定義
  const defaultColumns = getTableColumns(t);

  // 如果沒有製令單 ID，則導航回選擇頁面
  if (productionScheduleIdsStore === null) {
    navigate("/MachineSelectPage");
  }

  // 獲取工單數據
  const {
    data: workOrders,
    isLoading,
    isSuccess,
    refetch,
  } = useGetProductionReportQuery({
    productionSchedule_ids: productionScheduleIdsStore,
  });

  // 數據處理
  useEffect(() => {
    if (isSuccess && workOrders) {
      console.log("workOrders", workOrders);

      try {
        // 處理工單數據
        const nestedLots = processWorkOrders(workOrders);

        // 更新 store
        updateLots(nestedLots);

        // 格式化並設置表格數據
        const formattedData = formatWorkOrders(nestedLots, TZ);
        setDataSource(formattedData);
      } catch (error) {
        console.error('處理數據時出錯:', error);
        setDataSource([]);
      }
    }
  }, [isSuccess, workOrders, updateLots]);

  // 完成按鈕處理
  const handleComplete = () => {
    handleCompleteAction(
      dataSource,
      workOrders,
      navigate,
      t,
      setShowUnfinished
    );
  };

  // 加載中顯示
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.produtionDetail}>
      <div className={styles.box}>
        <div className={styles.titleBox}>
          <div className={styles.title}>
            {machineSN_Store}
            {t("productionReport.detail.title")}
            <RefreshButton />
          </div>
          <div className={styles.btnBox}>
            <div>
              <Tooltip title={t("productionReport.detail.completeBtn")}>
                <Button
                  className={styles.btnDone}
                  type="primary"
                  onClick={handleComplete}
                >
                  <CheckOutlined /> {t("productionReport.detail.completeBtn")}
                </Button>
              </Tooltip>
              <Tooltip title={t("productionReport.detail.pauseBtn")}>
                <Button
                  className={styles.btnPause}
                  type="default"
                  onClick={() =>
                    navigate("/LeaderSignPage", {
                      state: {
                        action: "pause",
                        pausedWorkOrders: workOrders,
                      },
                    })
                  }
                >
                  <PauseOutlined /> {t("productionReport.detail.pauseBtn")}
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        {isSuccess && (
          <Table
            tableLayout="fixed"
            style={{ whiteSpace: "pre" }}
            columns={defaultColumns}
            dataSource={dataSource}
            loading={loading}
            pagination={false}
            rowClassName={(record) =>
              getRowClassName(record, showUnfinished, styles)
            }
          />
        )}
      </div>
      <Button
        className={styles.btnStart}
        type="default"
        onClick={() =>
          navigate("/OperatorSignPage", {
            state: { action: "startChildLot" },
          })
        }
      >
        <span>{t("productionReport.detail.startBtn")}</span>
        <span className={styles.iconCircle}>
          <CaretRightOutlined />
        </span>
      </Button>
    </div>
  );
};

export default ProductionDetail;