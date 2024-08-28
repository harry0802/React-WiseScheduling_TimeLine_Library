import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useMachineSNStore } from "../../store/zustand/store";
import { Table, Button, Modal, Tooltip } from "antd";
import CompressIcon from "@mui/icons-material/Compress";
import { useGetProductionReportQuery } from "../../store/api/productionReportApi";
import "./index.scss";
import RefreshButton from "../Global/RefreshButton";
import StatusInfoIcon from "../Global/StatusInfoIcon";
import FilterBar from "./FilterBar";
import { WORKORDER_STATUS } from "../../config/enum";
import { debounce, throttle } from "lodash"; // 引入 lodash 的 debounce 函數
import { useTranslation } from "react-i18next";
import { TZ } from "../../config/config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const ProductionReport = (props) => {
  const { t } = useTranslation(); // i18n 語言切換

  // 資料表欄位
  const defaultColumns = [
    {
      title: "NO",
      width: "5%",
      fixed: true,
      render: (text, object, index) => {
        return (index + 1).toString().padStart(2, "0");
      },
    },
    {
      title: (
        <>
          <div className="status-column">
            {t("productionReport.table.status")}
            <StatusInfoIcon />
          </div>
        </>
      ),
      dataIndex: "status",
      fixed: true,
      width: "10%",
    },
    {
      title: `${t("productionReport.table.workOrderSN")}`,
      dataIndex: "workOrderSN",
      width: "10%",
      fixed: true,
      ellipsis: true,
      render: (text) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },

    {
      title: `${t("productionReport.table.productName")}`,
      dataIndex: "productName",
      width: "12%",
      fixed: true,
      ellipsis: true,
      render: (text) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: `${t("productionReport.table.workOrderQuantity")}`,
      dataIndex: "workOrderQuantity",
      width: "9%",
    },
    {
      title: `${t("productionReport.table.moldNo")}`,
      dataIndex: "moldNo",
      width: "8%",
      fixed: true,
      ellipsis: true,
      render: (text, record) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          <span>{record.moldNos}</span>
        </Tooltip>
      ),
    },
    // TODO: added new columns here...
    // added  zh-Tw.json  processName
    {
      title: `${t("productionReport.table.processName")}`,
      dataIndex: "processName",
      width: "8%",
      fixed: true,
      ellipsis: true,
      render: (text, record) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          <span>{record.processName}</span>
        </Tooltip>
      ),
    },
    {
      title: `${t("productionReport.table.productionQuantity")}`,
      dataIndex: "productionQuantity",
      width: "12%",
    },
    {
      title: `${t("productionReport.table.formatedDefectiveQty")}`,
      dataIndex: "formatedDefectiveQty",
      width: "10%",
    },
    {
      title: `${t("productionReport.table.planOnMachineDate")}`,
      dataIndex: "planOnMachineDate",
      width: "11%",
    },
    {
      title: `${t("productionReport.table.actualOnMachineDate")}`,
      dataIndex: "actualOnMachineDate",
      width: "11%",
    },
  ];

  // 從zustand store 取得機台編號
  const machineSN_Store = useMachineSNStore((state) => state.machineSN_Store);
  const [dataSource, setDataSource] = useState([]); // 製令單資料，用於 Table 的 dataSource
  const navigate = useNavigate();

  // 搜尋條件篩選
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 28 * 24 * 60 * 60 * 1000)
  );
  const [statusState, setStatusState] = useState(WORKORDER_STATUS.ALL);
  const [expiryState, setExpiryState] = useState("無限期");
  const [keywordTypeState, setKeywordTypeState] = useState("workOrderSN");
  const [keywordState, setKeywordState] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 追蹤選中的行的 id
  const [loading, setLoading] = useState(false);

  const formatDateTime = (date, type) => {
    if (!date) {
      switch (type) {
        case "start":
          date = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        case "end":
          date = new Date(new Date().getTime() + 28 * 24 * 60 * 60 * 1000);
        default:
          break;
      }
    }
    return dayjs.tz(date, TZ).format();
  };

  // 取得製令單資料
  const {
    data: workOrderList,
    isLoading,
    isSuccess,
    refetch,
  } = useGetProductionReportQuery({
    start_planOnMachineDate: formatDateTime(startDate, "start"),
    end_planOnMachineDate: formatDateTime(endDate, "end"),
    machineSN: machineSN_Store,
    status: statusState,
    expiry: expiryState,
    [keywordTypeState]: keywordState,
    motherOnly: true,
  });

  useEffect(() => {
    if (isSuccess) {
      const formattedworkOrderList = workOrderList.map((item) => {
        let formatedDefectiveQty = "";
        if (item.defectiveQuantity && item.productionDefectiveRate) {
          formatedDefectiveQty = `${item.defectiveQuantity}(${item.productionDefectiveRate}%)`;
        }
        // 將日期轉換成當地時區
        const planOnMachineDate = item.planOnMachineDate
          ? dayjs(item.planOnMachineDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        const actualOnMachineDate = item.actualOnMachineDate
          ? dayjs(item.actualOnMachineDate).tz(TZ).format("YYYY-MM-DD")
          : "";
        return {
          ...item,
          formatedDefectiveQty: formatedDefectiveQty,
          planOnMachineDate: planOnMachineDate,
          actualOnMachineDate: actualOnMachineDate,
        };
      });
      setDataSource(formattedworkOrderList);
    }
  }, [isSuccess, workOrderList]);

  // TODO logic for sending
  /*
   * 1. 當兩筆模具編號 ( Row Data ) 一樣時候 不可進行生產

   * 2. 母胚生產檢查
   */

  // * Function to display modal information
  const showModal = (message) =>
    Modal.info({
      content: <p>{message}</p>,
      okText: "確定",
      onOk() {},
    });

  // * Function to check if all selected rows have identical mold numbers
  const allMoldNosIdentical = (selectedRowsData) => {
    const moldNoSet = new Set();
    console.log(selectedRowsData);

    for (const { moldNos } of selectedRowsData) {
      if (!moldNos) {
        showModal("所選製令單必須有模具編號");
        return false;
      }

      const moldNosArray = moldNos.split(",").map((item) => item.trim());

      // Initialize set with the first row's mold numbers
      if (moldNoSet.size === 0)
        moldNosArray.forEach((moldNo) => moldNoSet.add(moldNo));

      // Check if all subsequent mold numbers match the initialized set
      if (moldNosArray.some((moldNo) => !moldNoSet.has(moldNo))) {
        showModal(t("productionReport.report.moldUnmatchedMsg"));
        return false;
      }
    }

    return true;
  };

  // 產生母批
  /* TODO 修改模具邏輯
   * 原有的  moldNo  改為 moldNos
   * 需要判斷多筆 moldNos 是否一樣 , 使用既有的 set 來尋找值 / has
   * 只允許一樣的 moldNos 生產
   */
  const handleAdd = () => {
    if (selectedRowKeys.length === 0) {
      showModal("請先勾選製令單");
      return;
    }

    const selectedRowsData = dataSource.filter((row) =>
      selectedRowKeys.includes(row.id)
    );

    if (allMoldNosIdentical(selectedRowsData)) {
      navigate("/LeaderSignPage", {
        state: { action: "new", newWorkOrders: selectedRowsData },
      });
    }
  };

  // 產生母批
  // const handleAdd = () => {
  //   // Get the selected rows' ids
  //   if (selectedRowKeys.length === 0) {
  //     Modal.info({
  //       content: <p>請先勾選製令單</p>,
  //       okText: "確定",
  //       onOk() {},
  //     });
  //     return;
  //   }
  //   // * 過濾出選擇的資料
  //   const selectedRowsData = dataSource.filter(
  //     (row) => selectedRowKeys.includes(row.id) // productionSchedule.id
  //   );

  //   // * 處理模具部分
  //   /* TODO 修改模具邏輯
  //    * 原有的  moldNo  改為 moldNos
  //    * 需要判斷多筆 moldNos 是否一樣 , 使用既有的 set 來尋找值 / has
  //    * 只允許一樣的 moldNos 生產
  //    */

  //   // 選取的製令單必須屬於同一個模具
  //   let isMoldNoEmpty = false;
  //   const moldNoSet = new Set();

  //   selectedRowsData.forEach((row) => {
  //     const { moldNos } = row || {};
  //     if (!moldNos) {
  //       isMoldNoEmpty = true;
  //       return;
  //     }

  //     const moldNosArray = moldNos.split(",").map((item) => item.trim());

  //     moldNosArray.forEach(function (item) {
  //       if (moldNoSet.has(item)) {
  //         alert("有重複");
  //         return;
  //       }

  //       moldNoSet.add(item);
  //     });

  //     // moldNoSet.add(row.moldNo);
  //   });

  //   if (isMoldNoEmpty) {
  //     showModal("所選製令單必須有模具編號");
  //     return;
  //   }

  //   // if (moldNoSet.size > 1) {
  //   //   // t("productionReport.report.moldUnmatchedMsg")
  //   //   //
  //   //   Modal.info({
  //   //     content: <p>{t("productionReport.report.moldUnmatchedMsg")}</p>,
  //   //     okText: "確定",
  //   //     onOk() {},
  //   //   });
  //   //   return;
  //   // }

  //   // navigate("/LeaderSignPage", {
  //   //   state: { action: "new", newWorkOrders: selectedRowsData },
  //   // });
  // };

  // 勾選設定
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys); // 更新選中的行
    },
    getCheckboxProps: (record) => ({
      disabled:
        record.status === WORKORDER_STATUS.ON_GOING ||
        record.status === WORKORDER_STATUS.DONE,
    }),
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // 節流函數，500 毫秒內不重複執行
  const throttleHandleAdd = debounce(handleAdd, 500);

  return (
    <div className="prodution-assignment">
      <div className="box">
        <div className="title-box">
          <div className="title">
            {machineSN_Store}
            {t("productionReport.report.title")}
            <RefreshButton />
          </div>
          <FilterBar
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            statusState={statusState}
            setStatusState={setStatusState}
            expiryState={expiryState}
            setExpiryState={setExpiryState}
            keywordTypeState={keywordTypeState}
            setKeywordTypeState={setKeywordTypeState}
            keywordState={keywordState}
            setKeywordState={setKeywordState}
          />
        </div>

        {isSuccess && (
          <Table
            rowKey={(record) => record.id} // 在這裡指定 'id' 作為每一行的唯一標識
            rowClassName={(record, index) => {
              var className = "";
              if (record.status === WORKORDER_STATUS.PAUSE) {
                className += " status-pause ";
              }
              //預計完成日前七天(只要狀態不是已經完成，就會反黃提醒)
              if (
                record.planFinishDate &&
                record.status !== WORKORDER_STATUS.DONE &&
                dayjs().isAfter(dayjs(record.planFinishDate).add(-7, "days"))
              ) {
                className += " expiry-warning ";
              }
              //過了預計完成日變紅色提醒
              if (
                record.planFinishDate &&
                record.status !== WORKORDER_STATUS.DONE &&
                dayjs().isAfter(dayjs(record.planFinishDate))
              ) {
                className += " expiry-danger ";
              }

              return className;
            }}
            rowSelection={{
              ...rowSelection,
            }}
            columns={defaultColumns}
            dataSource={dataSource}
            loading={loading}
            pagination={false}
          />
        )}
      </div>
      <Tooltip title="產生新母批">
        <Button
          className="btn-new"
          type="default"
          shape="circle"
          icon={<CompressIcon sx={{ fontSize: 36 }} />}
          onClick={throttleHandleAdd}
        />
      </Tooltip>
    </div>
  );
};

export default ProductionReport;
