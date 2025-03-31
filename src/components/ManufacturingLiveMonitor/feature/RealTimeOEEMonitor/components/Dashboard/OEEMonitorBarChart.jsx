import { Charts } from "@iimm/data-view-react";
const option1 = {
  title: {
    text: "當日全廠OEE(%)",
    style: {
      fill: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    offset: [0, -10],
  },
  xAxis: {
    name: "(時)",
    nameTextStyle: {
      fill: "#fff",
      fontSize: 14,
    },
    data: [
      "20:00",
      "22:00",
      "00:00",
      "02:00",
      "04:00",
      "06:00",
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
    ],
    axisLabel: {
      style: {
        fill: "#fff",
        fontSize: 12,
      },
    },
  },
  yAxis: {
    name: "OEE(%)",
    nameTextStyle: {
      fill: "#fff",
      fontSize: 14,
    },
    data: "value",
    min: 0,
    max: 180,
    splitNumber: 6,
    axisLabel: {
      style: {
        fill: "#fff",
        fontSize: 12,
      },
    },
  },
  series: [
    {
      data: [
        0, 47.7, 55.4, 68.4, 69.2, 101.1, 124.9, 156.5, 161.4, 166.6, 172.8,
        177.1, 180.0,
      ],
      type: "line",
      smooth: true,
      name: "OEE(%)",
      lineStyle: {
        width: 3,
      },
      linePoint: {
        radius: 4,
        style: {
          fill: "#3CFDDB",
          stroke: "#fff",
        },
      },
      lineArea: {
        show: true,
        gradient: ["rgba(60,253,219,0.3)", "rgba(60,253,219,0)"],
      },
    },
  ],
  grid: {
    top: 60,
    bottom: 50,
    left: "10%",
    right: "10%",
  },
  legend: {
    show: true,
    orient: "horizontal",
    bottom: 0,
    style: {
      fill: "#fff",
    },
  },
  color: ["#3CFDDB"],
};

function OEEMonitorBarChart() {
  return (
    <div style={{ width: "100%", height: "25rem" }}>
      <Charts option={option1} />
    </div>
  );
}

export default OEEMonitorBarChart;
