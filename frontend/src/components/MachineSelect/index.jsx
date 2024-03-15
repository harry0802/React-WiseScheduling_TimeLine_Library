import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMachineNoStore } from "../../store/zustand/store";
import { ConfigProvider, Select, Col, Row } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import "./index.scss";

import { debounce } from "lodash"; // 引入 lodash 的 debounce 函數

const MachineSelect = (props) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]); /*回傳資料*/
  // 搜尋條件篩選
  const { Option } = Select;
  let areaRef = useRef("a"); // 地區
  const [machineList, setMachineList] = useState([]); // 機台清單
  const updateMachineNo = useMachineNoStore((state) => state.updateMachineNo);

  const [loading, setLoading] = useState(false);

  const isLoading = false;
  const isSuccess = true;
  // const { data, isLoading, isSuccess, refetch } = useGetProductionAssignmentQuery({
  //   start_date: startDate,
  //   end_date: endDate,
  //   status_filter: statusFilter ? statusFilter : 'all',

  // });

  // 地區下拉選單
  const allAreaOptions = [
    <Option key={0} value={"a"} label="A區">
      A區
    </Option>,
    <Option key={1} value={"b"} label="B區">
      B區
    </Option>,
    <Option key={2} value={"c"} label="C區">
      C區
    </Option>,
    <Option key={3} value={"d"} label="D區">
      D區
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

  const fakeMachineList = [
    {
      area: "a",
      machines: [
        { machine_number: "A01", status: "active" },
        { machine_number: "A02", status: null },
        { machine_number: "A03", status: null },
        { machine_number: "A04", status: null },
        { machine_number: "A05", status: null },
        { machine_number: "A06", status: null },
        { machine_number: "A07", status: null },
      ],
    },
    {
      area: "b",
      machines: [
        { machine_number: "B01", status: null },
        { machine_number: "B02", status: null },
        { machine_number: "B03", status: null },
        { machine_number: "B04", status: null },
        { machine_number: "B05", status: null },
        { machine_number: "B06", status: null },
      ],
    },
    {
      area: "c",
      machines: [
        { machine_number: "C01", status: null },
        { machine_number: "C02", status: null },
        { machine_number: "C03", status: null },
        { machine_number: "C04", status: null },
        { machine_number: "C05", status: "active" },
      ],
    },
    {
      area: "d",
      machines: [
        { machine_number: "D01", status: null },
        { machine_number: "D02", status: null },
        { machine_number: "D03", status: null },
        { machine_number: "D04", status: null },
      ],
    },
  ];

  const changeMachineList = () => {
    let list = fakeMachineList.filter((item) => item.area === areaRef.current);
    setMachineList(list[0].machines);
  };

  useEffect(() => {
    changeMachineList();
  }, []); // Pass an empty array to only call the function once on mount.

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
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
      <div className="machine-select">
        <div className="box">
          <div className="title-box">
            <div className="title">產線派工系統-機台選擇</div>

            <div className="filter-section">
              {/* 篩選地區 */}
              <Select
                className="area-filter"
                defaultValue="a"
                style={{ width: 180, height: 60 }}
                onChange={(value) => {
                  areaRef.current = value;
                  changeMachineList();
                }}
              >
                {allAreaOptions}
              </Select>
            </div>
          </div>

          {machineList && (
            <div className="box-list">
              <Row gutter={[16, 24]}>
                {machineList.map((item, index) => (
                  <Col className="gutter-row" span={6} key={index}>
                    <div
                      className={
                        item.status === "active"
                          ? "machine-box active"
                          : "machine-box"
                      }
                      onClick={() => {
                        console.log("click", item.machine_number);
                        updateMachineNo(item.machine_number);
                        navigate("/ProductionAssignmentPage");
                      }}
                    >
                      <h1>{item.machine_number}</h1>
                      {item.status === "active" ? (
                        <p>正在運作...</p>
                      ) : (
                        <p>目前無生產任何單據</p>
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default MachineSelect;
