import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Row, Col, Tooltip } from "antd";
import { CheckOutlined, PauseOutlined } from "@ant-design/icons";
import styled from "styled-components";
import RefreshButton from "../../Global/RefreshButton";
import { message } from "antd";

const machineData = [
  {
    machineSN: "M001",
    status: "active",
    name: "Cutting Machine A",
  },
  {
    machineSN: "M002",
    status: "inactive",
    name: "Drilling Machine B",
  },
  {
    machineSN: "M003",
    status: "active",
    name: "Welding Machine C",
  },
  {
    machineSN: "M004",
    status: "inactive",
    name: "Assembly Line D",
  },
  {
    machineSN: "M005",
    status: "active",
    name: "Packaging Machine E",
  },
  {
    machineSN: "M006",
    status: "inactive",
    name: "Quality Control Station F",
  },
  {
    machineSN: "M007",
    status: "active",
    name: "Painting Booth G",
  },
  {
    machineSN: "M008",
    status: "inactive",
    name: "CNC Machine H",
  },
];
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

function MachineSelect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleMachineClick = (machine) => {
    if (machine.status === "active") {
      navigate(`${machine.machineSN}`);
    } else {
      messageApi.warning(machine.machineSN + " 目前無生產任何單據");
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            primaryColor: "#4CAF50",
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
          </TitleBox>
          <Row gutter={[16, 24]}>
            {machineData.map((machine) => (
              <Col span={6} key={machine.machineSN}>
                <MachineBox
                  active={machine.status === "active"}
                  onClick={() => handleMachineClick(machine)}
                >
                  <h1>{machine.machineSN}</h1>
                  <p>
                    {machine.status === "active"
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
