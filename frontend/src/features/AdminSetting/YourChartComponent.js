import React from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

const YourChartComponent = () => {
  // 创建图表配置
  const option = {
    title: {
      text: '示例图表',
    },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E'],
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: [5, 10, 15, 20, 25],
      type: 'bar',
    }],
  };

  // 渲染 ECharts 组件
  return (
    <ReactEcharts
      option={option}
      echarts={echarts}
      style={{ height: '400px', width: '100%' }}
    />
  );
};

export default YourChartComponent;
