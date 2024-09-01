import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, message, Modal, Tooltip } from "antd";
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
  useGetProductionScheduleThroughLYQuery,
  useAddProductionScheduleMutation,
  useUpdateProductionScheduleMutation,
} from "../../store/api/productionScheduleApi";
import "./index.scss";
import ExcelExample from "../../assets/ExcelExample.xlsx";
import { TZ } from "../../config/config";
import { useRendersCount } from "react-use";
import EditableRow from "./component/EditableRow";
import EditableCell from "./component/EditableCell";
import ResizableTitle from "./component/ResizableTitle";
import useSearchFilters from "./hook/useSearchFilters";
import usePagination from "./hook/usePagination";
import { getDefaultColumns } from "./hook/columnsConfig";
import { getColumns } from "./utils/tableUtils";
import { useSelectionAndDeletion } from "./hook/useSelectionAndDeletion";
import useExportData from "./hook/useExportData";
import { convertDatesToISO, exportToExcel } from "./utils/excelUtils";
import { useLYQuery } from "./hook/useLYQuery";

dayjs.extend(utc);
dayjs.extend(timezone);

function ProductionSchedule() {
  const navigate = useNavigate();
  const rendersCount = useRendersCount();
  const [UpdateProductionSchedule] = useUpdateProductionScheduleMutation();

  // 搜尋條件篩選
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
    loading,
    setLoading,
    formatDateTime,
  } = useSearchFilters();

  // 分頁設定
  const { pagination, setPagination, handleTableChange } = usePagination();
  const { data, isLoading, isSuccess, refetch } = useGetProductionScheduleQuery(
    {
      size: pagination?.pageSize,
      page: pagination?.page,
      start_planOnMachineDate: formatDateTime(startDate, "start"),
      end_planOnMachineDate: formatDateTime(endDate, "end"),
      status: statusState,
      expiry: expiryState,
      [keywordTypeState]: keywordState,
    }
  );

  // 資料處理
  const [totalCurrent, setTotalCurrent] = useState(1);
  const [dataSource, setDataSource] = useState([]);

  // 獲取外部 api 工作列表
  const {
    data: workOrderSNData,
    isLoading: workOrderSNIsLoading,
    isSuccess: workOrderSNIsSuccess,
    refetch: workOrderSNRefetch,
  } = useGetWorkOrderSNsQuery();

  const [workOrderSNsFromLYState, setWorkOrderSNsFromLYState] = useState([]);

  const onChange = (filters, sorter) => {};

  // 表單 I/O
  const { needExportData } = useExportData(
    startDate,
    endDate,
    statusState,
    expiryState,
    keywordTypeState,
    keywordState,
    formatDateTime
  );

  // 新增項目 與 新增製令單
  const [addProductionSchedule] = useAddProductionScheduleMutation();
  const [nowDate, setNowDate] = useState(
    dayjs.tz(dayjs().format("YYYY-MM-DD"), TZ).format()
  );

  // 勾選表單
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

  const handleSave = useCallback(
    async (row) => {
      const originalDataSource = [...dataSource]; // 保存当前的数据源状态
      try {
        const matchedData = dataSource.find((item) => item.id === row.id);
        if (!matchedData) {
          throw new Error("未找到匹配的数据");
        }

        const dateKeys = [
          "workOrderDate",
          "planOnMachineDate",
          "planFinishDate",
          "actualOnMachineDate",
          "actualFinishDate",
        ];

        const isDataChanged = Object.keys(row).some((key) => {
          if (dateKeys.includes(key)) {
            const dataDate = matchedData[key]
              ? dayjs(matchedData[key]).tz(TZ).format("YYYY-MM-DD")
              : null;
            const rowDate = row[key]
              ? dayjs(row[key]).tz(TZ).format("YYYY-MM-DD")
              : null;
            return dataDate !== rowDate;
          }
          return matchedData[key] !== row[key];
        });

        if (!isDataChanged) {
          return;
        }

        const updatedData = dataSource.map((item) =>
          item.id === row.id ? { ...item, ...row } : item
        );
        setDataSource(updatedData);

        row.workOrderDate = row.workOrderDate
          ? dayjs.tz(row.workOrderDate, TZ).format()
          : null;
        row.planOnMachineDate = row.planOnMachineDate
          ? dayjs.tz(row.planOnMachineDate, TZ).format()
          : null;
        row.planFinishDate = row.planFinishDate
          ? dayjs.tz(row.planFinishDate, TZ).format()
          : null;
        row.actualOnMachineDate = row.actualOnMachineDate
          ? dayjs.tz(row.actualOnMachineDate, TZ).format()
          : null;
        row.actualFinishDate = row.actualFinishDate
          ? dayjs.tz(row.actualFinishDate, TZ).format()
          : null;

        const response = await UpdateProductionSchedule({
          id: row.id,
          data: row,
        });

        if (!response.error) {
          message.success("修改數據成功");
        } else {
          throw new Error("修改數據失敗");
        }
      } catch (error) {
        message.error("修改數據失敗!!!!");
        // 恢复原始数据
        setDataSource(originalDataSource);
      }
    },
    [dataSource, UpdateProductionSchedule]
  );

  const { queryFromLY } = useLYQuery(handleSave);

  const handleQueryFromLY = useCallback(
    (row) => {
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

  useEffect(() => {
    if (isSuccess) {
      const { data: rawDataSource, meta } = data;

      const processedDataSource = rawDataSource.map((item) => {
        let newItem = { ...item };

        if (item.moldingSecond && item.moldCavity) {
          newItem.hourlyCapacity = Math.floor(
            (3600 / item.moldingSecond) * item.moldCavity
          );
        }

        if (newItem.hourlyCapacity !== null && item.conversionRate !== null) {
          newItem.dailyCapacity = Math.floor(
            newItem.hourlyCapacity *
              item.dailyWorkingHours *
              item.conversionRate
          );
        }

        return newItem;
      });

      const newDataWithISODate = convertDatesToISO(processedDataSource);
      setDataSource((prevDataSource) => {
        if (
          JSON.stringify(prevDataSource) !== JSON.stringify(newDataWithISODate)
        ) {
          return newDataWithISODate;
        }
        return prevDataSource;
      });
      setLoading(false);
      setTotalCurrent(meta.total_count);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <p>Loading...</p>;
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
        {isSuccess && (
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
        )}
        {dataSource.length > 0 && (
          <Button
            key="downloadExcel"
            type="ghost"
            onClick={debouncedExportToExcel}
            className="exportBtn"
          >
            匯出
          </Button>
        )}
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
              dataSource.length === 0 ? "downloadBtn-initial" : "downloadBtn"
            }
          >
            下載匯入Excel範例
          </Button>
        </a>
        <span>Renders count: {rendersCount}</span>
      </div>
    </div>
  );
}

export default ProductionSchedule;
