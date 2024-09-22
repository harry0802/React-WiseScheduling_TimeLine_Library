import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Row, Col, Select } from "antd";
import styled from "styled-components";
import RefreshButton from "../../Global/RefreshButton";
import { message } from "antd";
import { useGetMachinesQuery } from "../../../store/api/productionScheduleApi";
import { PRODUCTION_AREA } from "../../../config/config";
import { useQmsData } from "../slice/QmsAccount";

const Container = styled.div`
  width: 100%;
`;

const Box = styled.div`
  position: relative;
  margin-bottom: 0.625rem;
  padding: 1.25rem;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 3.75rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9375rem;
  color: #fff;
  text-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;

  @media (min-width: 75rem) {
    font-size: 1.5rem;
  }
`;

const MachineBox = styled.div`
  display: flex;
  margin-top: 1.875rem;
  min-height: 9.375rem;
  padding: 0.9375rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 0.25rem;
  cursor: pointer;

  @property --gradient-start {
    syntax: "<color>";
    initial-value: ${(props) => (props.active ? "#73D5BF" : "#676767")};
    inherits: false;
  }

  @property --gradient-end {
    syntax: "<color>";
    initial-value: ${(props) => (props.active ? "#89C0E1" : "#2a2a2a")};
    inherits: false;
  }

  background: linear-gradient(
    180deg,
    var(--gradient-start) 0%,
    var(--gradient-end) 100%
  );
  box-shadow: 0.25rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25);
  transition: --gradient-start 0.3s ease, --gradient-end 0.3s ease;

  --gradient-start: ${(props) => (props.active ? "#83E5CF" : "#787878")};
  --gradient-end: ${(props) => (props.active ? "#99D0F1" : "#3a3a3a")};

  &:hover {
    --gradient-start: ${(props) => (props.active ? "#73D5BF" : "#676767")};
    --gradient-end: ${(props) => (props.active ? "#89C0E1" : "#2a2a2a")};
  }

  &:active {
    --gradient-start: ${(props) => (props.active ? "#89C0E1" : "#676767")};
    --gradient-end: ${(props) => (props.active ? "#89C0E1" : "#2a2a2a")};
  }

  h1 {
    color: #fff;
    font-family: Roboto, sans-serif;
    font-size: 3rem;
    font-style: normal;
    font-weight: 400;
    margin: 0;
  }

  p {
    color: #fff;
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
    margin: 0;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1.875rem;
`;

const StyledSelect = styled(Select)`
  .ant-select-selection-placeholder,
  .ant-select-dropdown .ant-select-item,
  .ant-select-selection-item {
    color: #8f8f8f;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    border-radius: 0.25rem;
  }

  &.ant-select-single .ant-select-selector {
    border-radius: 0.25rem;
  }
`;

function MachineSelect() {
  const { t } = useTranslation();
  const { Option } = Select;
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [areaFilter, setAreaFilter] = useState("A");
  const [filteredMachines, setFilteredMachines] = useState([]);

  const { data: machines, isLoading } = useGetMachinesQuery();

  // TODO  收集活躍機台
  // todo  現在當我點下時候我要把 productionSchedules 中活越的機台 workOrderSN 收集起來
  //  ? 點擊機台  -> 過濾一樣的機台 machineSN ->  收集所有的 workOrderSN
  // * 過濾當下點擊的機台 = 使用 machineSN 過濾
  // * 收集所有的 workOrderSN
  // ! 這些是為了要給後續 品管人員檢驗要用的

  const { productionSchedules } = useQmsData();

  console.log(productionSchedules);

  const activeMachines = React.useMemo(() => {
    if (!productionSchedules || !productionSchedules) return {};
    return productionSchedules.reduce((acc, schedule) => {
      acc[schedule.machineSN] = true;
      return acc;
    }, {});
  }, [productionSchedules]);

  const handleMachineClick = (machine) => {
    if (activeMachines[machine.machineSN]) {
      navigate(`${machine.machineSN}`);
    } else {
      messageApi.warning(machine.machineSN + " 目前無生產任何單據");
    }
  };

  const allAreaOptions = [
    PRODUCTION_AREA.map((item, index) => (
      <Option key={index} value={item.value} label={item.label}>
        {item.label}
      </Option>
    )),
  ];

  useEffect(() => {
    if (machines) {
      const filtered = machines.filter(
        (machine) => machine.productionArea === areaFilter
      );
      setFilteredMachines(filtered);
    }
  }, [machines, areaFilter]);

  const handleAreaChange = (value) => {
    setAreaFilter(value);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            primaryColor: "#4CAF50",
          },
          Select: {
            optionFontSize: 24,
          },
        },
      }}
    >
      {contextHolder}

      <Container>
        <Box>
          <TitleBox>
            <Title>
              {t("QmsMachineSelect.title")}
              <RefreshButton />
            </Title>
            <FilterSection>
              <StyledSelect
                className="area-filter"
                defaultValue="A"
                style={{ width: "11.25rem", height: "3.75rem" }}
                onChange={handleAreaChange}
              >
                {allAreaOptions}
              </StyledSelect>
            </FilterSection>
          </TitleBox>
          <Row gutter={[16, 24]}>
            {filteredMachines.map((machine) => (
              <Col span={6} key={machine.machineSN}>
                <MachineBox
                  active={activeMachines[machine.machineSN]}
                  onClick={() => handleMachineClick(machine)}
                >
                  <h1>{machine.machineSN}</h1>
                  <p>
                    {activeMachines[machine.machineSN]
                      ? t("productionReport.machineSelect.onGoing")
                      : t("productionReport.machineSelect.none")}
                  </p>
                </MachineBox>
              </Col>
            ))}
          </Row>
        </Box>
      </Container>
    </ConfigProvider>
  );
}

export default MachineSelect;
