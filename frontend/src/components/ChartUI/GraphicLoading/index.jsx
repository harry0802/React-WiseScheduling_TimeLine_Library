import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GraphicComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import classes from './index.module.scss';

echarts.use([GraphicComponent, CanvasRenderer]);

const GraphicLoading = ({ loop }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize ECharts instance
    const myChart = echarts.init(chartRef.current);

    // ECharts option
    const option = {
      graphic: {
        elements: [
          {
            type: 'group',
            left: 'center',
            top: 'center',
            children: new Array(7).fill(0).map((val, i) => ({
              type: 'rect',
              x: i * 20,
              shape: {
                x: 0,
                y: -40,
                width: 10,
                height: 80,
              },
              style: {
                fill: '#fff',
              },
              keyframeAnimation: {
                duration: 1000,
                delay: i * 200,
                loop: loop, // Use the loop prop to control the loop property
                keyframes: [
                  {
                    percent: 0.5,
                    scaleY: 0.3,
                    easing: 'cubicIn',
                  },
                  {
                    percent: 1,
                    scaleY: 1,
                    easing: 'cubicOut',
                  },
                ],
              },
            })),
          },
        ],
      },
    };

    // Set ECharts option
    myChart.setOption(option);

    // Clean up
    return () => {
      myChart.dispose();
    };
  }, [loop]); // Re-run the effect when the loop prop changes

  return <div  className={classes.chart} ref={chartRef} style={{ width: '200px', height: '400px' }} />;
};

export default GraphicLoading;
