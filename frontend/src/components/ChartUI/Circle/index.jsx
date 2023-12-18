import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts/theme/macarons'; // Import the theme if needed
import classes from './index.module.scss';

const Circle = (props) => {
  const { value1, value2, uniqueId } = props;
  useEffect(() => {
    // Initialize ECharts instance
    const myChart = echarts.init(document.getElementById(`main-${uniqueId}`));

    // Specify chart configuration and setOption
    const option = {
      angleAxis: {
        max: 100,
        startAngle: 90,
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
        axisLabel: {
          fontSize: 16, // Set your desired font size
        },
        
      },
     
      radiusAxis: {
        type: 'category',
        data: ['y', 'z'],
        show: '',
      },
      polar: {},
      series: [
        {
          type: 'bar',
          data: [0, 0],
          coordinateSystem: 'polar',
          name: 'Without Round Cap',
          itemStyle: {
            // color: ['rgba(255, 89, 89, 1)', 'rgba(246, 177, 0, 1)'],
            opacity: 1,
            borderWidth: 1,
          },
          
        },
        {
          type: 'bar',
          data: [0, props.value2],
          coordinateSystem: 'polar',
          name: 'With Round Cap',
          roundCap: true,
          itemStyle: {
            // color: 'rgba(89, 175, 255, 1), rgba(72, 253, 231, 1)',
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(89, 175, 255, 1)'
              },
              {
                offset: 1,
                color: 'rgba(72, 253, 231, 1)'
              }
            ]),
            opacity: 0.8,
            borderWidth: 5,
          },

        },
        {
          type: 'bar',
          data: [0, props.value1],
          coordinateSystem: 'polar',
          name: 'With Round Cap',
          roundCap: true,
          itemStyle: {
            // color: 'rgba(255, 89, 89, 1), rgba(246, 177, 0, 1)',
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 89, 89, 1)'
              },
              {
                offset: 1,
                color: ' rgba(246, 177, 0, 1)'
              }
            ]),
            opacity: 0.8,
            borderWidth: 5,
          },
        },
   
      ],

    };

    // Set the options
    myChart.setOption(option);

    // Clean up the chart when the component unmounts
    return () => {
      myChart.dispose();
    };
  }, [value1, value2, uniqueId]);

  return <div id={`main-${uniqueId}`} className={classes.main} style={{ top: '8px', width: '350px', height: '350px' }}></div>;
};

export default Circle;
