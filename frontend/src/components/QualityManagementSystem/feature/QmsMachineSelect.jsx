import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Select, Col, Row } from "antd";
import "../../MachineSelect/index.scss";
import { useTranslation } from "react-i18next";
const { Option } = Select;

// 假資料
const MOCK_MACHINES = [
  { machineSN: "A01", status: "active" },
  { machineSN: "A02", status: null },
  { machineSN: "A03", status: null },
  { machineSN: "A04", status: null },
  { machineSN: "A05", status: null },
  { machineSN: "A06", status: null },
  { machineSN: "A07", status: null },
  { machineSN: "A08", status: null },
];

const PRODUCTION_AREAS = [
  { value: "A", label: "A區" },
  { value: "B", label: "B區" },
  // 可以根據需要添加更多區域
];

function MachineSelect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState("A");

  const handleAreaChange = (value) => {
    setSelectedArea(value);
  };

  const handleMachineClick = (machine) => {
    // 這裡可以添加選擇機器後的邏輯
    console.log("Selected machine:", machine);
    if (machine.status === "active") {
      navigate("/LeaderSignPage", { state: { action: "continue" } });
    } else {
      navigate("/ProductionReportPage");
    }
  };

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
              {/* RefreshButton component can be added here */}
            </div>
            <div className="filter-section">
              <Select
                className="area-filter"
                defaultValue="A"
                style={{ width: 180, height: 60 }}
                onChange={handleAreaChange}
              >
                {PRODUCTION_AREAS.map((area) => (
                  <Option key={area.value} value={area.value}>
                    {area.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="box-list">
            <Row gutter={[16, 24]}>
              {MOCK_MACHINES.map((machine) => (
                <Col className="gutter-row" span={6} key={machine.machineSN}>
                  <div
                    className={`machine-box ${
                      machine.status === "active" ? "active" : ""
                    }`}
                    onClick={() => handleMachineClick(machine)}
                  >
                    <h1>{machine.machineSN}</h1>
                    <p>
                      {machine.status === "active"
                        ? t("productionReport.machineSelect.onGoing")
                        : t("productionReport.machineSelect.none")}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default MachineSelect;
