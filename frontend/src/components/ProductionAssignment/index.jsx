import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useMachineNoStore } from "../../store/zustand/store";
import {
  ConfigProvider,
  Table,
  Select,
  Form,
  Input,
  Button,
  message,
  Modal,
  Tooltip,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import CompressIcon from "@mui/icons-material/Compress";

import {
  useGetProductionAssignmentQuery,
  usePauseStausMutation,
  useCancelStausMutation,
  useActionStausMutation,
  useAddProductionAssignmentMutation,
  useUpdateProductionAssignmentMutation,
} from "../../store/api/productionAssignmentApi";
import "./index.scss";

import { debounce } from "lodash"; // 引入 lodash 的 debounce 函數

const ProductionAssignment = (props) => {
  // 如果沒有機台資訊，則導向機台選擇頁面
  // TODO....
  // 如果有正在生產的母批，則導向產線領導者簽名頁面(replace:true)
  // TODO....

  // 資料表欄位
  const defaultColumns = [
    {
      title: "NO",
      // dataIndex: 'id',
      width: "4%",
      fixed: true,
      render: (text, object, index) => {
        return (index + 1).toString().padStart(2, "0");
      },
    },
    {
      title: "狀態",
      dataIndex: "status",
      fixed: true,
      width: "6%",
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
      dataIndex: "tmpNo",
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
      width: "10%",
    },
    {
      title: "良品數量",
      dataIndex: "productionQuantity",
      width: "10%",
    },
    {
      title: "不良數",
      dataIndex: "formatedDefectiveQty",
      width: "10%",
    },
    {
      title: "預計上機日",
      dataIndex: "planOnMachineDate",
      width: "10%",
    },
    {
      title: "實際上機日",
      dataIndex: "actualOnMachineDate",
      width: "10%",
    },
  ];

  const machineNo = useMachineNoStore((state) => state.machineNo);
  console.log("machineNo: ", machineNo);
  // 設定初始當前頁面以及分頁一頁有幾個資料
  const [pagination, setPagination] = useState({
    page: 1 /*當前分頁位址*/,
    pageSize: 10, // 默认值为 10
  });
  const [totalCurrent, setTotalCurrent] = useState(1); /*總數據量*/
  const [dataSource, setDataSource] = useState([]); /*回傳資料*/
  const navigate = useNavigate();
  // 搜尋條件篩選
  const { Option } = Select;
  // 日期
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState("all"); // 狀態
  const [expiryFilter, setExpiryFilter] = useState("all"); // 期限
  const [keywordTypeFilter, setKeywordTypeFilter] = useState("製令單號"); // 關鍵字搜尋類型
  const [machineSN, setMachineSN] = useState(""); // 機台

  const [loading, setLoading] = useState(false);

  const isLoading = false;
  const isSuccess = true;
  // const { data, isLoading, isSuccess, refetch } = useGetProductionAssignmentQuery({
  //   start_date: startDate,
  //   end_date: endDate,
  //   status_filter: statusFilter ? statusFilter : 'all',

  // });

  // 查詢條件
  // 日期換算成週數
  const getWeekNumber = (date) => {
    date = new Date(date);
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  };

  // 製令單狀態
  const allStatusOptions = [
    <Option key={0} value={"all"} label="所有狀態">
      所有狀態
    </Option>,
    <Option key={1} value={"尚未上機"} label="尚未上機">
      尚未上機
    </Option>,
    <Option key={2} value={"On-going"} label="正在生產">
      正在生產
    </Option>,
    <Option key={3} value={"Done"} label="已經完成">
      已經完成
    </Option>,
    <Option key={4} value={"暫停生產"} label="暫停生產">
      暫停生產
    </Option>,
  ];

  // 製令單期限
  const allExpiryOptions = [
    <Option key={0} value={"all"} label="所有狀態">
      所有狀態
    </Option>,
    <Option key={1} value={"無限期"} label="無限期">
      無限期
    </Option>,
    <Option key={2} value={"即將到期"} label="即將到期">
      即將到期
    </Option>,
    <Option key={3} value={"已經到期"} label="已經到期">
      已經到期
    </Option>,
  ];

  // 關鍵字搜尋類型
  const allKeywordTypeOptions = [
    <Option key={1} value={"製令單號"} label="製令單號">
      製令單號
    </Option>,
    <Option key={2} value={"產品名稱"} label="產品名稱">
      產品名稱
    </Option>,
  ];

  // useEffect(() => {
  //   if (isSuccess) {
  //     setLoading(true);

  //     const { data: dataSource, meta } = data;
  //     // 設定總量
  //     setDataSource(dataSource);
  //     setLoading(false);
  //     setTotalCurrent(meta.total_count);

  //     // // 在获取到最新的 dataSource 后，检查 moldingSecond 和 moldCavity 是否有值
  //     // const newDataWithHourlyCapacity = dataSource.map((item) => {
  //     //   if (item.moldingSecond && item.moldCavity) {
  //     //     // 计算新的 hourlyCapacity，并使用 Math.floor() 進行無条件捨去
  //     //     const newHourlyCapacity = Math.floor((3600 / item.moldingSecond) * item.moldCavity);
  //     //     // 更新 dataSource 中的 hourlyCapacity
  //     //     return { ...item, hourlyCapacity: newHourlyCapacity };
  //     //   }
  //     //   return item;
  //     // });

  //     // // 更新 dataSource
  //     // setDataSource(newDataWithHourlyCapacity);

  //     // // 在这里处理 hourlyCapacity 更新后的逻辑
  //     // const newDataWithDailyCapacity = newDataWithHourlyCapacity.map((item) => {
  //     //   if (item.hourlyCapacity !== null && item.conversionRate !== null) {
  //     //     // 计算新的 dailyCapacity，并使用 Math.floor() 進行無条件捨去
  //     //     const newDailyCapacity = Math.floor(item.hourlyCapacity * item.dailyWorkingHours * item.conversionRate);
  //     //     // 更新 dataSource 中的 dailyCapacity
  //     //     return { ...item, dailyCapacity: newDailyCapacity };
  //     //   }
  //     //   return item;
  //     // });

  //     // // 更新 dataSource
  //     // setDataSource(newDataWithDailyCapacity);
  //   }
  // }, [statusFilter, isSuccess, data]);

  const fakeData = [
    {
      key: "1",
      id: 11,
      tmpNo: 1,
      status: "尚未上機",
      workOrderSN: "ABCD-0000",
      productName: "LotName-001",
      workOrderQuantity: 21000,
      productionQuantity: null,
      defectiveQuantity: null,
      productionDefectiveRate: null,
      planOnMachineDate: "2024-03-12 17:00",
      planFinishDate: "2024-03-30 17:00",
      actualOnMachineDate: null,
    },
    {
      key: "2",
      id: 12,
      tmpNo: 2,
      status: "正在生產",
      workOrderSN: "ABCD-0000",
      productName: "LotName-001",
      workOrderQuantity: 21000,
      productionQuantity: 0,
      defectiveQuantity: 0,
      productionDefectiveRate: 0,
      planOnMachineDate: "2024-03-02 17:00",
      planFinishDate: "2024-03-19 17:00",
      actualOnMachineDate: "2024-03-12 17:00",
    },
    {
      key: "3",
      id: 13,
      tmpNo: 3,
      status: "暫停生產",
      workOrderSN: "ABCD-0000",
      productName: "LotName-001",
      workOrderQuantity: 21000,
      productionQuantity: 15000,
      defectiveQuantity: 200,
      productionDefectiveRate: 0.01,
      planOnMachineDate: "2024-03-01 17:00",
      planFinishDate: "2024-03-12 17:00",
      actualOnMachineDate: "2024-03-02 17:00",
    },
    {
      key: "4",
      id: 14,
      tmpNo: 4,
      status: "已經完成",
      workOrderSN: "ABCD-0000",
      productName: "LotName-001",
      workOrderQuantity: 21000,
      productionQuantity: 10000,
      defectiveQuantity: 1000,
      productionDefectiveRate: 0.05,
      planOnMachineDate: "2024-03-05 17:00",
      planFinishDate: "2024-03-12 17:00",
      actualOnMachineDate: "2024-03-08 17:00",
    },
  ];
  // format the defectiveQuantity and productionDefectiveRate to a string like "defectiveQuantity(productionDefectiveRate)"
  const fakeDataTwo = fakeData.map((item) => {
    if (item.productionQuantity !== null && item.defectiveQuantity !== null) {
      const formatedDefectiveQty = `${item.defectiveQuantity}(${(
        item.productionDefectiveRate * 100
      ).toFixed(1)}%)`;
      return { ...item, formatedDefectiveQty: formatedDefectiveQty };
    }
    return item;
  });

  // Search
  const actionSearch = () => {
    // check if the start date is earlier than the end date
    if (dayjs(startDate).isAfter(dayjs(endDate))) {
      Modal.info({
        width: "800px",
        content: <p>請將時間，調整成合理的區間範圍</p>,
        okText: "確定",
        onOk() {},
      });
      return;
    }

    // Modal.confirm({
    //   title: '確認啟動動作',
    //   content: '確定要啟動所選項目的動作嗎？',
    //   okText: '確定',
    //   cancelText: '取消',
    //   onOk: async () => {
    //     try {
    //       message.success('目前狀態已變為正在生產');
    //     } catch (error) {
    //       console.error('Error starting production schedules:', error);
    //     }
    //   },
    // });
  };

  const [selectionType, setSelectionType] = useState("checkbox");

  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 追蹤選中的行的 id

  // 勾選令機具開始動作
  const [actionStaus] = useActionStausMutation();
  const actionChecked = () => {
    // Get the selected rows' ids
    if (selectedRowKeys.length === 0) {
      message.warning("請先勾選要啟動的項目");
      return;
    }
    const selectedRowsData = dataSource.filter((row) =>
      selectedRowKeys.includes(row.id)
    );

    // Check if the 'actualOnMachineDate' property exists in all selected rows
    const missingActualOnMachineDate = selectedRowsData.some(
      (row) => !row.actualOnMachineDate
    );

    if (missingActualOnMachineDate) {
      message.warning("請先填寫實際上機日!");
      return;
    }
    // Check if the status is "Done" for any selected rows
    const completedDocuments = selectedRowsData.some(
      (row) => row.status === "Done"
    );

    if (completedDocuments) {
      message.warning("此單據已經完成，無法進行修改。");
      return;
    }
    const stringIds = JSON.stringify(selectedRowKeys);

    Modal.confirm({
      title: "確認啟動動作",
      content: "確定要啟動所選項目的動作嗎？",
      okText: "確定",
      cancelText: "取消",
      onOk: async () => {
        try {
          // 將勾選的欄位更改其屬性 status 值為"啟動動作"
          await actionStaus(stringIds);

          // 清空勾選
          // setSelectedRowKeys([]);

          message.success("目前狀態已變為正在生產");
        } catch (error) {
          console.error("Error starting production schedules:", error);
        }
      },
    });
  };

  // 勾選設定
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys); // 更新選中的行
    },
    getCheckboxProps: (record) => ({
      disabled: record.status === "正在生產" || record.status === "已經完成",
      // Column configuration not to be checked
      status: record.status,
    }),
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // 防抖函數，延遲 500 毫秒執行
  // const debouncedHandleDelete = debounce(deleteChecked, 500);
  // const debouncedHandleAction = debounce(actionChecked, 500);
  // const debouncedHandlePause = debounce(pauseChecked, 500);
  // const debouncedHandleAdd = debounce(handleAdd, 500);

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionFontSize: 24, // enlarge the font size of the options for all antd Select components
          },
        },
      }}
    >
      <div className="prodution-assignment">
        <div className="box">
          <div className="title-box">
            <div className="title">{machineNo}機台產線派工系統</div>

            <div className="filter-section">
              <div className="start-date">
                <DatePicker
                  defaultValue={dayjs(startDate)}
                  format="YYYY/MM/DD"
                  onChange={(date, dateString) => {
                    setStartDate(dateString);
                  }}
                />
                <div className="week-no">{getWeekNumber(startDate)} 週</div>
              </div>
              <span className="date-to">~</span>
              <div className="end-date">
                <DatePicker
                  defaultValue={dayjs(endDate)}
                  format="YYYY/MM/DD"
                  onChange={(date, dateString) => {
                    setEndDate(dateString);
                  }}
                />
                <div className="week-no">{getWeekNumber(endDate)} 週</div>
              </div>

              <div className="select-box">
                {/* 篩選狀態 */}
                <Select
                  className="status-filter"
                  placeholder="所有狀態"
                  style={{ width: 180, height: 60 }}
                  // onChange={(value) => setStatusFilter(value)}
                >
                  {allStatusOptions}
                </Select>

                {/* 篩選期限 */}
                <Select
                  className="expiry-filter"
                  placeholder="全部期限"
                  style={{ width: 180, height: 60 }}
                  onChange={(value) => setExpiryFilter(value)}
                >
                  {allExpiryOptions}
                </Select>

                {/* 篩選關鍵字搜尋類型 */}
                <Select
                  className="keyword-type-filter"
                  placeholder="製令單號"
                  style={{ width: 180, height: 60 }}
                  onChange={(value) => setKeywordTypeFilter(value)}
                >
                  {allKeywordTypeOptions}
                </Select>

                <Input
                  className="keyword-search"
                  placeholder="請輸入關鍵字查詢..."
                  style={{ width: 260, marginRight: "15px" }}
                  suffix={<SearchOutlined />}
                ></Input>
              </div>
              <div className="btn-box">
                <Tooltip title="搜尋">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<SearchOutlined />}
                    onClick={actionSearch}
                  />
                </Tooltip>
              </div>
            </div>
          </div>

          {isSuccess && (
            <Table
              rowKey="id" // 在這裡指定 'id' 作為每一行的唯一標識
              rowClassName={(record, index) => {
                var className = "";
                if (record.status === "暫停生產") {
                  className += " status-stop ";
                }
                //預計完成日前七天(只要狀態不是已經完成，就會反黃提醒)
                if (
                  record.planFinishDate &&
                  record.status !== "已經完成" &&
                  dayjs().isAfter(dayjs(record.planFinishDate).add(-7, "days"))
                ) {
                  className += " expiry-warning ";
                }
                //過了預計完成日變紅色提醒
                if (
                  record.planFinishDate &&
                  record.status !== "已經完成" &&
                  dayjs().isAfter(dayjs(record.planFinishDate))
                ) {
                  className += " expiry-danger ";
                }

                return className;
              }}
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={defaultColumns}
              dataSource={fakeDataTwo}
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
            icon={<CompressIcon sx={{ fontSize: 64 }} />}
            onClick={() =>
              navigate("/LeaderSignPage", { state: { action: "new" } })
            }
          />
        </Tooltip>
      </div>
    </ConfigProvider>
  );
};

export default ProductionAssignment;
