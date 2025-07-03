import { Charts } from "@iimm/data-view-react";
import { useGetDailyOEEQuery } from "../../../../services";

function OEEMonitorBarChart() {
  const { data: dailyOEEData = [], isLoading, error } = useGetDailyOEEQuery();

  const option = {
    title: {
      show: false,
      text: "當日全廠OEE(%)",
      style: {
        fill: "#fff",
        fontSize: 18,
        fontWeight: "bold",
      },
      offset: [0, -10],
    },
    xAxis: {
      name: "(日)",
      nameTextStyle: {
        fill: "#fff",
        fontSize: 18,
      },
      data: dailyOEEData.map((item) => {
        const date = new Date(item.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }),
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
        fontSize: 20,
      },
      data: "value",
      min: 0,
      max: 180,
      splitNumber: 6,
      axisLabel: {
        style: {
          fill: "#fff",
          fontSize: 18,
        },
      },
    },
    series: [
      {
        data: dailyOEEData.map((item) => item.OEE),
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
      left: "8%",
      right: "8%",
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

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        載入中...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height: "25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        載入資料失敗
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "25rem" }}>
      <Charts option={option} />
    </div>
  );
}

export default OEEMonitorBarChart;
