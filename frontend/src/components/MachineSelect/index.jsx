import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMachineSNStore } from "../../store/zustand/store";
import { ConfigProvider, Select, Col, Row } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import "./index.scss";
import {
  useGetMachinesQuery,
  useGetProductionScheduleByMachinesQuery,
} from "../../store/api/productionScheduleApi";
import { WORKORDER_STATUS } from "../../config/enum";
import { PRODUCTION_AREA } from "../../config/config";
import RefreshButton from "../Global/RefreshButton";
import { useTranslation } from "react-i18next";

const MachineSelect = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Option } = Select;
  const [skip, setSkip] = useState(true);
  const [machineFilter, setMachineFilter] = useState(""); // 機台過濾條件
  let areaRef = useRef("A"); // 地區
  const [machineList, setMachineList] = useState([]); // 機台清單
  let machineDataRef = useRef([]); // 格式化後的機台資料
  const updateMachineSN = useMachineSNStore((state) => state.updateMachineSN); // 更新機台編號至Zustand store
  const [loading, setLoading] = useState(false);

  // 地區下拉選單

  const allAreaOptions = [
    PRODUCTION_AREA.map((item, index) => (
      <Option key={index} value={item.value} label={item.label}>
        {item.label}
      </Option>
    )),
  ];

  // 取得機台資料
  const {
    data: machineData,
    isLoading: machineIsLoading,
    isSuccess: machineIsSuccess,
    refetch: machineRefetch,
  } = useGetMachinesQuery();

  // 取得正在生產的製令單資料
  const {
    data: productionScheduleData,
    isSuccess: productionScheduleIsSuccess,
    isLoading: productionScheduleIsLoading,
    refetch: productionScheduleRefetch,
  } = useGetProductionScheduleByMachinesQuery(
    {
      machineSNs: machineFilter,
      status: WORKORDER_STATUS.ON_GOING,
    },
    { skip }
  );

  useEffect(() => {
    if (machineIsSuccess) {
      const machine_filter = machineData.map((item) => {
        return item.machineSN;
      });
      setMachineFilter(machine_filter.join(","));
      setSkip((prev) => !prev);
    }
  }, [machineIsSuccess]);

  // 將 machine data 格式化成以下格式
  // {
  //     area: "a",
  //     machines: [
  //       { machine_number: "A01", status: "active" },
  //       { machine_number: "A02", status: null },
  //     ],
  // },
  const formatMachineData = () => {
    const tempData = PRODUCTION_AREA.map((item) => {
      const machines = machineData.filter(
        (machine) => machine.productionArea === item.value
      );
      return {
        area: item.value,
        machines: machines,
      };
    });
    const formattedData = tempData.map((item) => {
      const machines = item.machines.map((machine) => {
        // add status to machine and set it to active if machine.machineSN is in productionScheduleData
        return productionScheduleData.some(
          (bMachine) => bMachine.machineSN === machine.machineSN
        )
          ? { ...machine, status: "active" }
          : { ...machine, status: null };
      });
      return { ...item, machines: machines };
    });
    return formattedData;
  };

  useEffect(() => {
    if (machineIsSuccess && productionScheduleIsSuccess) {
      machineDataRef.current = formatMachineData();
      console.log("machineDataRef.current", machineDataRef.current);
      changeMachineList();
    }
  }, [machineIsSuccess, productionScheduleIsSuccess]);

  const changeMachineList = () => {
    let list = machineDataRef.current.filter(
      (item) => item.area === areaRef.current
    );
    setMachineList(list[0].machines);
  };

  if (machineIsLoading || productionScheduleIsLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

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
            <div className="title">
              {t("productionReport.machineSelect.title")}
              <RefreshButton />
            </div>

            <div className="filter-section">
              {/* 篩選地區 */}
              <Select
                className="area-filter"
                defaultValue="A"
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
                        updateMachineSN(item.machineSN);
                        if (item.status === "active") {
                          navigate("/LeaderSignPage", {
                            state: { action: "continue" },
                          });
                        } else {
                          navigate("/ProductionReportPage");
                        }
                      }}
                    >
                      <h1>{item.machineSN}</h1>
                      {item.status === "active" ? (
                        <p>{t("productionReport.machineSelect.onGoing")}...</p>
                      ) : (
                        <p>{t("productionReport.machineSelect.none")}</p>
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
