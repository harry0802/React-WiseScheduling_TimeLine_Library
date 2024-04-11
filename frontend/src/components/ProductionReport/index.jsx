import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { useMachineSNStore } from "../../store/zustand/store";
import { Table, Select, Input, Button, Modal, Tooltip, DatePicker } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { SearchOutlined } from "@ant-design/icons";
import CompressIcon from "@mui/icons-material/Compress";
import { useGetProductionReportQuery } from "../../store/api/productionReportApi";
import "./index.scss";
import { WORKORDER_STATUS } from "../../config/enum";
import { TZ } from "../../config/config";
import { debounce, throttle } from "lodash"; // 引入 lodash 的 debounce 函數
dayjs.extend(utc);
dayjs.extend(timezone);

const ProductionReport = (props) => {
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
      title: "狀態",
      dataIndex: "status",
      fixed: true,
      width: "8%",
    },
    {
      title: "製令單號",
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
      title: "模具編號",
      dataIndex: "moldNo",
      width: "8%",
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
      title: "產品名稱",
      dataIndex: "productName",
      width: "20%",
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
      title: "製令數量",
      dataIndex: "workOrderQuantity",
      width: "8%",
    },
    {
      title: "良品數量",
      dataIndex: "productionQuantity",
      width: "8%",
    },
    {
      title: "不良數",
      dataIndex: "formatedDefectiveQty",
      width: "8%",
    },
    {
      title: "預計上機日",
      dataIndex: "planOnMachineDate",
      width: "12%",
    },
    {
      title: "實際上機日",
      dataIndex: "actualOnMachineDate",
      width: "12%",
    },
  ];

  // 從zustand store 取得機台編號
  const machineSN_Store = useMachineSNStore((state) => state.machineSN_Store);
  const [dataSource, setDataSource] = useState([]); // 製令單資料，用於 Table 的 dataSource
  const navigate = useNavigate();
  // 搜尋條件篩選
  const { Option } = Select;
  // 日期
  const startDateRef = useRef(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const endDateRef = useRef(new Date());
  const statusRef = useRef(WORKORDER_STATUS.ALL); // 狀態
  const expiryRef = useRef("無限期"); // 期限
  const keywordTypeRef = useRef("workOrderSN");
  const keywordRef = useRef(""); // 關鍵字
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 追蹤選中的行的 id
  const [loading, setLoading] = useState(false);

  // 製令單狀態
  const allStatusOptions = [
    <Option key={0} value={WORKORDER_STATUS.ALL} label={WORKORDER_STATUS.ALL}>
      所有狀態
    </Option>,
    <Option
      key={1}
      value={WORKORDER_STATUS.NOT_YET}
      label={WORKORDER_STATUS.NOT_YET}
    >
      {WORKORDER_STATUS.NOT_YET}
    </Option>,
    <Option
      key={2}
      value={WORKORDER_STATUS.ON_GOING}
      label={WORKORDER_STATUS.ON_GOING}
    >
      {WORKORDER_STATUS.ON_GOING}
    </Option>,
    <Option key={3} value={WORKORDER_STATUS.DONE} label={WORKORDER_STATUS.DONE}>
      {WORKORDER_STATUS.DONE}
    </Option>,
    <Option
      key={4}
      value={WORKORDER_STATUS.CANCEL}
      label={WORKORDER_STATUS.CANCEL}
    >
      {WORKORDER_STATUS.CANCEL}
    </Option>,
  ];

  // 製令單期限
  const allExpiryOptions = [
    <Option key={0} value={"無限期"} label="無限期">
      無限期
    </Option>,
    <Option key={1} value={"即將到期"} label="即將到期">
      即將到期
    </Option>,
    <Option key={2} value={"已經過期"} label="已經過期">
      已經過期
    </Option>,
  ];

  // 關鍵字搜尋類型
  const allKeywordTypeOptions = [
    <Option key={0} value={"workOrderSN"} label="workOrderSN">
      製令單號
    </Option>,
    <Option key={1} value={"productName"} label="productName">
      產品名稱
    </Option>,
  ];

  const formatDateTime = (date, type) => {
    if (!date) {
      switch (type) {
        case "start":
          date = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        case "end":
          date = new Date();
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
    start_planOnMachineDate: formatDateTime(startDateRef.current, "start"),
    end_planOnMachineDate: formatDateTime(endDateRef.current, "end"),
    machineSN: machineSN_Store,
    status: statusRef.current,
    expiry: expiryRef.current,
    [keywordTypeRef.current]: keywordRef.current,
  });

  console.log("workOrderList", workOrderList);

  useEffect(() => {
    if (isSuccess) {
      const formattedworkOrderList = workOrderList.map((item) => {
        let formatedDefectiveQty = "";
        if (item.defectiveQuantity && item.productionDefectiveRate) {
          formatedDefectiveQty = `${item.defectiveQuantity}(${item.productionDefectiveRate}%)`;
        }
        // 將日期轉換成當地時區
        const planOnMachineDate = dayjs(item.planOnMachineDate)
          .tz(TZ)
          .format("YYYY-MM-DD");
        const actualOnMachineDate = dayjs(item.actualOnMachineDate)
          .tz(TZ)
          .format("YYYY-MM-DD");
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

  // 查詢條件
  // 日期換算成週數
  const getWeekNumber = (date) => {
    if (!date) return "";
    date = new Date(date);
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  };
  const [startWeekNo, setStartWeekNo] = useState(
    getWeekNumber(startDateRef.current)
  ); // 週數
  const [endWeekNo, setEndWeekNo] = useState(getWeekNumber(endDateRef.current)); // 週數

  // Search
  const handleSearch = () => {
    // check if the start date is earlier than the end date
    if (
      dayjs(startDateRef.current).isAfter(dayjs(endDateRef.current)) ||
      startDateRef.current === "" ||
      endDateRef.current === ""
    ) {
      Modal.info({
        content: <p>請將時間，調整成合理的區間範圍</p>,
        okText: "確定",
        onOk() {},
      });
      return;
    }
    refetch();
  };

  // 產生母批
  const handleAdd = () => {
    // Get the selected rows' ids
    if (selectedRowKeys.length === 0) {
      Modal.info({
        content: <p>請先勾選製令單</p>,
        okText: "確定",
        onOk() {},
      });
      return;
    }

    const selectedRowsData = dataSource.filter((row) =>
      selectedRowKeys.includes(row.productionSchedule_id)
    );
    // 選取的製令單必須屬於同一個模具
    const moldNoSet = new Set();
    selectedRowsData.forEach((row) => {
      moldNoSet.add(row.moldNo);
    });
    if (moldNoSet.size > 1) {
      Modal.info({
        content: <p>所選製令單必須屬於同一個模具</p>,
        okText: "確定",
        onOk() {},
      });
      return;
    }

    const stringIds = JSON.stringify(selectedRowKeys);
    navigate("/LeaderSignPage", {
      state: { action: "new", selectedWorkOrder: selectedRowsData },
    });
  };

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
  const throttleHandleSearch = throttle(handleSearch, 500);
  const throttleHandleAdd = debounce(handleAdd, 500);

  return (
    <div className="prodution-assignment">
      <div className="box">
        <div className="title-box">
          <div className="title">{machineSN_Store}機台產線派工系統</div>
          <div className="filter-section">
            <div className="start-date">
              <DatePicker
                defaultValue={dayjs(startDateRef.current)}
                format="YYYY/MM/DD"
                onChange={(date, dateString) => {
                  startDateRef.current = dateString;
                  setStartWeekNo(getWeekNumber(dateString));
                }}
              />
              <div className="week-no">{startWeekNo} 週</div>
            </div>
            <span className="date-to">~</span>
            <div className="end-date">
              <DatePicker
                defaultValue={dayjs(endDateRef.current)}
                format="YYYY/MM/DD"
                onChange={(date, dateString) => {
                  endDateRef.current = dateString;
                  setEndWeekNo(getWeekNumber(dateString));
                }}
              />
              <div className="week-no">{endWeekNo} 週</div>
            </div>

            <div className="select-box">
              {/* 篩選狀態 */}
              <Select
                className="status-filter"
                placeholder="所有狀態"
                style={{ width: 120 }}
                onChange={(value) => (statusRef.current = value)}
              >
                {allStatusOptions}
              </Select>

              {/* 篩選期限 */}
              <Select
                className="expiry-filter"
                placeholder="無限期"
                style={{ width: 120 }}
                onChange={(value) => (expiryRef.current = value)}
              >
                {allExpiryOptions}
              </Select>

              {/* 篩選關鍵字搜尋類型 */}
              <Select
                className="keyword-type-filter"
                placeholder="製令單號"
                style={{ width: 120 }}
                onChange={(value) => (keywordTypeRef.current = value)}
              >
                {allKeywordTypeOptions}
              </Select>

              <Input
                className="keyword-search"
                placeholder="請輸入關鍵字查詢..."
                style={{ width: 160 }}
                suffix={<SearchOutlined />}
                onInput={(e) => (keywordRef.current = e.target.value)}
              ></Input>
            </div>
            <div className="btn-box">
              <Tooltip title="搜尋">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SearchOutlined />}
                  onClick={throttleHandleSearch}
                />
              </Tooltip>
            </div>
          </div>
        </div>

        {isSuccess && (
          <Table
            rowKey={(record) => record.productionSchedule_id} // 在這裡指定 'productionSchedule_id' 作為每一行的唯一標識
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
