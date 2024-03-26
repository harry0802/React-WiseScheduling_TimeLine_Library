import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, message, Modal, Tooltip } from "antd";
import {
  CheckOutlined,
  PauseOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { useLotStore } from "../../store/zustand/store";

import {
  useGetProductionAssignmentQuery,
  usePauseStausMutation,
  useCancelStausMutation,
  useActionStausMutation,
  useAddProductionAssignmentMutation,
  useUpdateProductionAssignmentMutation,
} from "../../store/api/productionAssignmentApi";
import styles from "./index.module.scss";

import { debounce } from "lodash"; // 引入 lodash 的 debounce 函數

const ProductionDetail = (props) => {
  // 如果沒有機台資訊，則導向機台選擇頁面，有的話，則列出該機台所有[尚未上機, 暫停生產, 正在生產]的母批並更新lot state
  // TODO....

  // 防止使用者回上一頁
  useEffect(() => {
    window.history.pushState(null, "", document.URL);
    window.onpopstate = function () {
      window.history.pushState(null, "", document.URL);
      Modal.info({
        width: "800px",
        content: <p>您無法回到上一頁，請"暫停"或"完成"此生產階段</p>,
        okText: "確定",
        onOk() {},
      });
    };
    return () => {
      window.onpopstate = null;
    };
  }, []);

  // 資料表欄位
  const defaultColumns = [
    {
      title: "NO",
      dataIndex: "no",
      width: "5%",
    },
    {
      title: "狀態",
      dataIndex: "status",
      width: "6%",
    },
    {
      title: "製令單號",
      dataIndex: "lotName",
      width: "8%",
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
      width: "8%",
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
      dataIndex: "defectiveQuantity",
      width: "8%",
    },
    {
      title: "未完成數量",
      dataIndex: "unfinishedQuantity",
      width: "8%",
    },
    {
      title: "負責人員",
      dataIndex: "operators",
      width: "10%",
    },
    {
      title: "生產區間",
      dataIndex: "period",
      width: "10%",
    },
  ];
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]); /*回傳資料*/
  const [showUnfinished, setShowUnfinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const lots = useLotStore((state) => state.lots);
  const updateLots = useLotStore((state) => state.updateLots);

  const isLoading = false;
  const isSuccess = true;
  // const { data, isLoading, isSuccess, refetch } = useGetProductionAssignmentQuery({
  //   start_date: startDate,
  //   end_date: endDate,
  //   status_filter: statusFilter ? statusFilter : 'all',

  // });

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
      key: 1,
      serialNumber: 1,
      tmpNo: 1,
      status: "尚未上機",
      lotName: "ABCD0001",
      productName: "LotName-001",
      workOrderQuantity: 21000,
      productionQuantity: null,
      colorDifference: 0,
      deformation: 0,
      shrinkage: 0,
      shortage: 0,
      hole: 0,
      bubble: 0,
      impurity: 0,
      pressure: 0,
      overflow: 0,
      flowMark: 0,
      oilStain: 0,
      burr: 0,
      blackSpot: 0,
      scratch: 0,
      encapsulation: 0,
      other: 0,
      defectiveQuantity: null,
      productionDefectiveRate: null,
      unfinishedQuantity: null,
      leader: [{ leader: "Martin", leader_start_time: "2024-03-01 17:00" }],
      operator1: null,
      operator2: null,
      start_time: null,
      end_time: null,
      children: [
        {
          key: 9,
          serialNumber: 11,
          tmpNo: null,
          status: null,
          lotName: "ABCD0001-001",
          productName: "LotName-001",
          workOrderQuantity: null,
          productionQuantity: null,
          colorDifference: 0,
          deformation: 0,
          shrinkage: 0,
          shortage: 0,
          hole: 0,
          bubble: 0,
          impurity: 0,
          pressure: 0,
          overflow: 0,
          flowMark: 0,
          oilStain: 0,
          burr: 0,
          blackSpot: 0,
          scratch: 0,
          encapsulation: 0,
          other: 0,
          defectiveQuantity: null,
          productionDefectiveRate: null,
          unfinishedQuantity: null,
          leader: null,
          operator1: "Tom",
          operator2: "Jerry",
          start_time: "2024-03-01 12:00",
          end_time: "2024-03-01 17:00",
        },
      ],
    },
    {
      key: 2,
      serialNumber: 2,
      tmpNo: 2,
      status: "尚未上機",
      lotName: "ABCD0002",
      productName: "LotName-002",
      workOrderQuantity: 21000,
      productionQuantity: 21031,
      colorDifference: 0,
      deformation: 0,
      shrinkage: 0,
      shortage: 0,
      hole: 0,
      bubble: 0,
      impurity: 0,
      pressure: 0,
      overflow: 0,
      flowMark: 0,
      oilStain: 0,
      burr: 0,
      blackSpot: 0,
      scratch: 0,
      encapsulation: 0,
      other: 0,
      defectiveQuantity: 880,
      productionDefectiveRate: 0.0418,
      unfinishedQuantity: 0,
      leader: [
        { leader: "Martin", leader_start_time: "2024-03-01 17:00" },
        { leader: "John", leader_start_time: "2024-03-02 17:00" },
      ],
      operator1: null,
      operator2: null,
      start_time: null,
      end_time: null,
      children: [
        {
          key: 3,
          serialNumber: 3,
          tmpNo: null,
          status: null,
          lotName: "ABCD0002-001",
          productName: "LotName-002",
          workOrderQuantity: null,
          productionQuantity: 7121,
          colorDifference: 0,
          deformation: 0,
          shrinkage: 0,
          shortage: 0,
          hole: 0,
          bubble: 0,
          impurity: 0,
          pressure: 0,
          overflow: 0,
          flowMark: 0,
          oilStain: 0,
          burr: 0,
          blackSpot: 0,
          scratch: 0,
          encapsulation: 0,
          other: 0,
          defectiveQuantity: 310,
          productionDefectiveRate: 0.2,
          unfinishedQuantity: 13879,
          leader: null,
          operator1: "Tom",
          operator2: "Jerry",
          start_time: "2024-03-01 12:00",
          end_time: "2024-03-01 17:00",
        },
        {
          key: 4,
          serialNumber: 3,
          tmpNo: null,
          status: null,
          lotName: "ABCD0002-002",
          productName: "LotName-002",
          workOrderQuantity: null,
          productionQuantity: 7003,
          colorDifference: 0,
          deformation: 0,
          shrinkage: 0,
          shortage: 0,
          hole: 0,
          bubble: 0,
          impurity: 0,
          pressure: 0,
          overflow: 0,
          flowMark: 0,
          oilStain: 0,
          burr: 0,
          blackSpot: 0,
          scratch: 0,
          encapsulation: 0,
          other: 0,
          defectiveQuantity: 237,
          productionDefectiveRate: 0.2,
          unfinishedQuantity: 6870,
          leader: null,
          operator1: "Tom",
          operator2: "Jerry",
          start_time: "2024-03-01 12:00",
          end_time: "2024-03-01 17:00",
        },
        {
          key: 5,
          serialNumber: 3,
          tmpNo: null,
          status: null,
          lotName: "ABCD0002-003",
          productName: "LotName-002",
          workOrderQuantity: null,
          productionQuantity: 6907,
          colorDifference: 0,
          deformation: 0,
          shrinkage: 0,
          shortage: 0,
          hole: 0,
          bubble: 0,
          impurity: 0,
          pressure: 0,
          overflow: 0,
          flowMark: 0,
          oilStain: 0,
          burr: 0,
          blackSpot: 0,
          scratch: 0,
          encapsulation: 0,
          other: 0,
          defectiveQuantity: 333,
          productionDefectiveRate: 0.2,
          unfinishedQuantity: 0,
          leader: null,
          operator1: "Tom",
          operator2: "Jerry",
          start_time: "2024-03-01 12:00",
          end_time: "2024-03-01 17:00",
        },
      ],
    },
    {
      key: 7,
      serialNumber: 2,
      tmpNo: 2,
      status: "尚未上機",
      lotName: "ABCD0003",
      productName: "LotName-003",
      workOrderQuantity: 21000,
      productionQuantity: 1000,
      colorDifference: 0,
      deformation: 0,
      shrinkage: 0,
      shortage: 0,
      hole: 0,
      bubble: 0,
      impurity: 0,
      pressure: 0,
      overflow: 0,
      flowMark: 0,
      oilStain: 0,
      burr: 0,
      blackSpot: 0,
      scratch: 0,
      encapsulation: 0,
      other: 0,
      defectiveQuantity: 200,
      productionDefectiveRate: 0.2,
      unfinishedQuantity: 20000,
      leader: [
        { leader: "Martin", leader_start_time: "2024-03-01 17:00" },
        { leader: "John", leader_start_time: "2024-03-02 17:00" },
      ],
      operator1: null,
      operator2: null,
      start_time: null,
      end_time: null,
      children: [
        {
          key: 8,
          serialNumber: 3,
          tmpNo: null,
          status: null,
          lotName: "ABCD0003-001",
          productName: "LotName-003",
          workOrderQuantity: null,
          productionQuantity: 1000,
          colorDifference: 0,
          deformation: 0,
          shrinkage: 0,
          shortage: 0,
          hole: 0,
          bubble: 0,
          impurity: 0,
          pressure: 0,
          overflow: 0,
          flowMark: 0,
          oilStain: 0,
          burr: 0,
          blackSpot: 0,
          scratch: 0,
          encapsulation: 0,
          other: 0,
          defectiveQuantity: 200,
          productionDefectiveRate: 0.2,
          unfinishedQuantity: 20000,
          leader: null,
          operator1: "Tom",
          operator2: "Jerry",
          start_time: "2024-03-01 12:00",
          end_time: "2024-03-01 17:00",
        },
      ],
    },
  ];

  let currentClass = " groupGray ";
  const fakeDataTwo = fakeData.map((item, idx) => {
    let no = 0;
    let operators = "";
    let period = "";
    let children = null;

    // generate serial number with padding zero
    no = (idx + 1).toString().padStart(2, "0");

    // combine leader and start time in operators and period
    if (item.leader != null) {
      operators = item.leader.map((leader) => {
        return leader.leader + "\n";
      });
      period = item.leader.map((leader) => {
        return leader.leader_start_time + "\n";
      });
    }

    // set groupWhite class to the first item and its children, set groupGray to the second item and its children, set groupWhite to the third item and its children, and so on
    let className = "";
    currentClass =
      currentClass === " groupWhite " ? " groupGray " : " groupWhite ";
    className = currentClass;

    // combine operators and start time, end time in children array
    if (item.children != null) {
      children = item.children.map((child) => {
        return {
          ...child,
          operators: child.operator1 + "\n" + child.operator2,
          period: child.start_time + "\n" + child.end_time,
          className: currentClass,
        };
      });
    }

    return {
      ...item,
      no: no,
      className: className,
      operators: operators,
      period: period,
      children: children,
    };
  });

  useEffect(() => {
    updateLots(fakeData);
  }, []);

  // Complete
  const handleComplete = () => {
    const isComplete = fakeDataTwo.every((item) => {
      return item.unfinishedQuantity === 0;
    });

    if (!isComplete) {
      Modal.confirm({
        width: "800px",
        content: (
          <p>
            仍有製令單未符合製令數量，一旦結單無法再執行此單，需重開製令單，您確定要完成此生產階段?
          </p>
        ),
        cancelText: "取消",
        okText: "確定",
        onCancel() {
          setShowUnfinished(true);
        },
        onOk() {
          navigate("/LeaderSignPage", { state: { action: "complete" } });
        },
      });
      return;
    }
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
    <div className={styles.produtionDetail}>
      <div className={styles.box}>
        <div className={styles.titleBox}>
          <div className={styles.title}>{"A2"}機台製令單生產明細</div>

          <div>
            <div>
              <Tooltip title="完成">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<CheckOutlined />}
                  onClick={handleComplete}
                />
              </Tooltip>
              <Tooltip title="暫停">
                <Button
                  className={styles.btnPause}
                  type="default"
                  shape="circle"
                  icon={<PauseOutlined />}
                  onClick={() =>
                    navigate("/LeaderSignPage", {
                      state: { action: "stop" },
                    })
                  }
                />
              </Tooltip>
            </div>
          </div>
        </div>

        {isSuccess && (
          <Table
            style={{ whiteSpace: "pre" }}
            columns={defaultColumns}
            dataSource={fakeDataTwo}
            loading={loading}
            pagination={false}
            rowClassName={(record, index) => {
              let className = "";
              // set color to red if there is any unfinished quantity
              if (
                showUnfinished &&
                ((record.children != null && record.unfinishedQuantity > 0) ||
                  (record.children === null &&
                    record.unfinishedQuantity === null))
              ) {
                className += ` ${styles.unfinishedRow} `;
              }

              // group the same color to the same group
              className +=
                record.className === " groupWhite "
                  ? ` ${styles.groupWhite} `
                  : ` ${styles.groupGray} `;

              return className;
            }}
          />
        )}
      </div>
      <Tooltip title="開始">
        <Button
          className={styles.btnStart}
          type="default"
          shape="circle"
          icon={<CaretRightOutlined />}
          onClick={() =>
            navigate("/OperatorSignPage", {
              state: { action: "startChildLot" },
            })
          }
        />
      </Tooltip>
    </div>
  );
};

export default ProductionDetail;
