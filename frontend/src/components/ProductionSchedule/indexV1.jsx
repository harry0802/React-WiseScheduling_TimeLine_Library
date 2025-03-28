import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, message, Modal, Tooltip, Spin } from "antd";
import { debounce } from "lodash";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import FilterBar from "../ProductionReport/FilterBar";
import { WORKORDER_STATUS } from "../../config/enum";
import { MACHINE_LIST } from "../../config/config";
import {
  useGetProductionScheduleQuery,
  useGetWorkOrderSNsQuery,
  useAddProductionScheduleMutation,
  useUpdateProductionScheduleMutation,
} from "../../store/api/productionScheduleApi";
import "./index.scss";
import ExcelExample from "../../assets/ExcelExample.xlsx";
import { TZ } from "../../config/config";
import EditableRow from "./component/EditableRow";
import EditableCell from "./component/EditableCell";
import ResizableTitle from "./component/ResizableTitle";
import useSearchFilters from "./hook/useSearchFilters";
import usePagination from "./hook/usePagination";
import { getDefaultColumns } from "./hook/columnsConfig";
import { getColumns } from "./utils/tableUtils";
import { useSelectionAndDeletion } from "./hook/useSelectionAndDeletion";
import useExportData from "./hook/useExportData";
import { convertDatesToCustomFormat, exportToExcel } from "./utils/excelUtils";
import { useLYQuery } from "./hook/useLYQuery";
import { LoadingOutlined } from "@ant-design/icons";
import { useProductionScheduleData } from "./hook/useProductionScheduleData";

dayjs.extend(utc);
dayjs.extend(timezone);

const hasDataChanged = (oldData, newData) => {
  const dateKeys = [
    "workOrderDate",
    "planOnMachineDate",
    "planFinishDate",
    "actualOnMachineDate",
    "actualFinishDate",
  ];

  return Object.keys(newData).some((key) => {
    if (dateKeys.includes(key)) {
      const oldDate = oldData[key]
        ? dayjs(oldData[key]).tz(TZ).format("YYYY-MM-DD")
        : null;
      const newDate = newData[key]
        ? dayjs(newData[key]).tz(TZ).format("YYYY-MM-DD")
        : null;
      return oldDate !== newDate;
    }
    return oldData[key] !== newData[key];
  });
};

function ProductionSchedule() {
  const navigate = useNavigate();
  const [UpdateProductionSchedule] = useUpdateProductionScheduleMutation();

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    statusState,
    setStatusState,
    expiryState,
    setExpiryState,
    keywordTypeState,
    setKeywordTypeState,
    keywordState,
    setKeywordState,
    formatDateTime,
  } = useSearchFilters();

  const { pagination, setPagination, handleTableChange, loading } =
    usePagination();

  const queryParams = {
    size: pagination?.pageSize,
    page: pagination?.page,
    start_planOnMachineDate: formatDateTime(startDate, "start"),
    end_planOnMachineDate: formatDateTime(endDate, "end"),
    status: statusState,
    expiry: expiryState,
    [keywordTypeState]: keywordState,
  };

  const {
    dataSource,
    setDataSource,
    totalCurrent,
    // loading,
    isLoading,
    refetch,
  } = useProductionScheduleData(queryParams);
  console.log("🚀 ~ ProductionSchedule ~ isLoading:", isLoading);

  const { data: workOrderSNData, isSuccess: workOrderSNIsSuccess } =
    useGetWorkOrderSNsQuery();

  const [workOrderSNsFromLYState, setWorkOrderSNsFromLYState] = useState([]);

  const onChange = (filters, sorter) => {};

  const { needExportData } = useExportData(
    startDate,
    endDate,
    statusState,
    expiryState,
    keywordTypeState,
    keywordState,
    formatDateTime
  );

  const [addProductionSchedule] = useAddProductionScheduleMutation();
  const [nowDate, setNowDate] = useState(
    dayjs.tz(dayjs().format("YYYY-MM-DD"), TZ).format()
  );

  const { selectionType, selectedRowKeys, deleteChecked, rowSelection } =
    useSelectionAndDeletion(dataSource, refetch);

  const handleAdd = async () => {
    if (selectedRowKeys.length > 0) {
      message.warning("請先取消勾選增製令單才能新增項目");
      return;
    }

    try {
      Modal.confirm({
        title: "確認新增",
        content: "確定要新增製令單嗎？",
        okText: "確定",
        cancelText: "取消",
        onOk: async () => {
          try {
            message.success("新增製令單成功");

            const newData = {
              workOrderSN: "",
              productSN: "",
              productName: "",
              workOrderQuantity: 1000,
              workOrderDate: nowDate,
              planOnMachineDate: nowDate,
            };

            await addProductionSchedule(newData);
            refetch();
            setPagination({ ...pagination, page: 1 });
          } catch (error) {
            console.error("新增製令單時發生錯誤:", error);
          }
        },
      });
    } catch (error) {
      console.error("處理新增製令單時發生錯誤:", error);
    }
  };
  // handleSave 優化
  const handleSave = useCallback(
    async (row) => {
      const originalDataSource = [...dataSource];
      try {
        const matchedData = dataSource.find((item) => item.id === row.id);
        if (!matchedData) return;

        // 檢查數據是否真的變更
        const isChanged = hasDataChanged(matchedData, row);
        if (!isChanged) return;

        // 先更新 UI
        setDataSource((prev) =>
          prev.map((item) => (item.id === row.id ? { ...item, ...row } : item))
        );

        // 發送 API 請求
        const convertedRow = convertDatesToCustomFormat(
          [row],
          "YYYY-MM-DDTHH:mm:ssZ"
        )[0];
        const response = await UpdateProductionSchedule({
          id: row.id,
          data: convertedRow,
        });

        if (response.error) throw response.error;

        message.success("修改數據成功");
      } catch (error) {
        message.error("修改數據失敗!");
        setDataSource(originalDataSource);
      }
    },
    [dataSource, UpdateProductionSchedule]
  );
  const { queryFromLY } = useLYQuery(handleSave);

  // 修改 handleQueryFromLY
  const handleQueryFromLY = useCallback(
    (row) => {
      if (!row.workOrderSN) {
        message.warning("請先輸入製令單號");
        return;
      }

      if (
        workOrderSNsFromLYState.some((item) => item.value === row.workOrderSN)
      ) {
        queryFromLY(row);
      } else {
        message.warning("凌越ERP查無此製令單號，請重新輸入。");
      }
    },
    [workOrderSNsFromLYState, queryFromLY]
  );

  const handleProductionAreaChange = async (value, record) => {
    try {
      const defaultMachineSN = MACHINE_LIST.filter((item) => {
        return item.productionArea === value;
      })[0].machineSN;
      const defaultSingleOrDoubleColor = MACHINE_LIST.find(
        (item) => item.machineSN === defaultMachineSN
      ).singleOrDoubleColor;

      await UpdateProductionSchedule({
        id: record.id,
        data: {
          productionArea: value,
          machineSN: defaultMachineSN,
          singleOrDoubleColor: defaultSingleOrDoubleColor,
        },
      });
      message.success("修改數據成功");
    } catch (error) {
      console.error("Error updating production area:", error);
    }
  };

  const handleMachineSNChange = async (value, record) => {
    try {
      const defaultSingleOrDoubleColor = MACHINE_LIST.find(
        (item) => item.machineSN === value
      ).singleOrDoubleColor;
      await UpdateProductionSchedule({
        id: record.id,
        data: {
          machineSN: value,
          singleOrDoubleColor: defaultSingleOrDoubleColor,
        },
      });
      message.success("修改數據成功");
    } catch (error) {
      console.error("Error updating production area:", error);
    }
  };

  const handleSingleOrDoubleColorChange = async (value, record) => {
    try {
      await UpdateProductionSchedule({
        id: record.id,
        data: { singleOrDoubleColor: value },
      });
      message.success("修改數據成功");
    } catch (error) {
      console.error("Error updating production area:", error);
    }
  };

  const [defaultColumns, setDefaultColumns] = useState(
    getDefaultColumns(
      handleProductionAreaChange,
      handleMachineSNChange,
      handleSingleOrDoubleColorChange
    )
  );

  const columns = useMemo(
    () =>
      getColumns(
        defaultColumns,
        handleSave,
        handleQueryFromLY,
        workOrderSNsFromLYState,
        setDefaultColumns
      ),
    [defaultColumns, handleSave, handleQueryFromLY, workOrderSNsFromLYState]
  );

  const components = {
    header: {
      cell: ResizableTitle,
    },
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  useEffect(() => {
    if (workOrderSNIsSuccess) {
      const workOrderSNOption = workOrderSNData.map((item) => {
        return { value: item };
      });
      setWorkOrderSNsFromLYState(workOrderSNOption);
    }
  }, [workOrderSNIsSuccess, workOrderSNData]);

  if (isLoading) {
    return <Spin indicator={<LoadingOutlined spin />} size="large" />;
  }

  const debouncedHandleDelete = debounce(deleteChecked, 500);
  const debouncedHandleAdd = debounce(handleAdd, 500);
  const debouncedExportToExcel = debounce(() => {
    exportToExcel(columns, needExportData);
  }, 500);

  return (
    <div className="production-schedule">
      <div className="box">
        <div className="title-box">
          <div className="title">生產計劃排程表</div>
          <div className="btn-box">
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
            <Tooltip title="取消生產">
              <button className="delete" onClick={debouncedHandleDelete}>
                <FontAwesomeIcon icon={faTrashCan} style={{ color: "#fff" }} />
              </button>
            </Tooltip>

            <Tooltip title="新增製令單">
              <button className="add" onClick={debouncedHandleAdd}>
                <FontAwesomeIcon icon={faPlus} style={{ color: "#fff" }} />
              </button>
            </Tooltip>
          </div>
        </div>

        <Table
          components={components}
          rowClassName={(record, index) => {
            var className = "";
            if (record.status === WORKORDER_STATUS.PAUSE) {
              className += " status-pause ";
            }
            if (
              record.planFinishDate &&
              record.status !== WORKORDER_STATUS.DONE &&
              dayjs().isAfter(dayjs(record.planFinishDate).add(-7, "days"))
            ) {
              className += " expiry-warning ";
            }
            if (
              record.planFinishDate &&
              record.status !== WORKORDER_STATUS.DONE &&
              dayjs().isAfter(dayjs(record.planFinishDate))
            ) {
              className += " expiry-danger ";
            }

            return className;
          }}
          bordered
          striped={true}
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
          pagination={{
            total: totalCurrent,
            current: pagination?.page,
            defaultPageSize: pagination?.pageSize,
            pageSize: pagination?.pageSize,
            showSizeChanger: true,
            showLessItems: true,
            showQuickJumper: false,
            position: ["bottomCenter"],
            onChange: handleTableChange,
          }}
          loading={loading}
          scroll={{ x: 3000 }}
          rowSelection={{
            type: selectionType,
            ...rowSelection,
            columnWidth: "32px",
          }}
          onChange={onChange}
        />

        {dataSource.length > 0 && (
          <>
            <Button
              key="downloadExcel"
              type="ghost"
              onClick={debouncedExportToExcel}
              className="exportBtn"
            >
              匯出
            </Button>
            <Button
              type="ghost"
              onClick={() => {
                navigate("/ImportProductionSchedulePage");
              }}
              className={
                dataSource.length === 0 ? "importBtn-initial" : "importBtn"
              }
            >
              匯入
            </Button>
            <a
              href={ExcelExample}
              download="生產排程計畫表-匯入範例"
              target="_blank"
            >
              <Button
                type="ghost"
                className={
                  dataSource.length === 0
                    ? "downloadBtn-initial"
                    : "downloadBtn"
                }
              >
                下載匯入Excel範例
              </Button>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductionSchedule;
