
import React from 'react';
import classes from './index.module.scss';
import { useGetHousesDeviceByIdQuery } from 'api/housesApi';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

const HouseCircle = ({ title, value1, value2, uniqueId }) => (
  <Grid
    item
    xs={12}
    md={12}
    lg={6}
    xl={4}
    sx={{
      height: { xs: '450px', md: '450px', lg: '450px', xl: '450px' },

    }}
    className={classes.CircleBox}
  >
    <div className={classes.Box}>
      <div className={classes.title}>{title}</div>
      <div className={classes.Circle}>

        <Circle value1={value1} value2={value2} uniqueId={uniqueId} />
        <div className={classes.showValue}>
          <div className={classes.tempVlaue}>
            <div className={classes.tempVlaue}>溫度</div>
            <div className={classes.tempVlaue}>{`${value1.toFixed(2)}°C`}</div>
          </div>
          <div className={classes.hunVlaue}>
            <div className={classes.hunVlaue}>濕度</div>
            <div className={classes.hunVlaue}>{`${value2.toFixed(2)}%`}</div>
          </div>
        </div>
      </div>
    </div>
  </Grid>
);

export default function Sensor() {
  const params = useParams();
  const { id } = params;

  const result = useGetHousesDeviceByIdQuery(id, {
    pollingInterval: 1000,
  });

  const { data: devices, isSuccess, isLoading } = result;
  

  // 过滤TEMP_HUMI_SENSOR
  if (isSuccess) {

    const TEMP_HUMI_SENSOR = devices.filter(item => item.type === 'TEMP_HUMI_SENSOR');
    // console.log('TEMP_HUMI_SENSOR',TEMP_HUMI_SENSOR)
    return (
      <div className={classes.info}>
        {isSuccess && (

          <div className={classes.box}>
            {TEMP_HUMI_SENSOR.map((value, index) => (
              <div key={value.id} className={classes.box1}>
                <div  >
                  <div className={classes.title}>
                    {value.label}
                  </div>
                </div>
                <div  className={classes.box2}>
                  {value.values.map((val) => (
                    <div key={val.id}>
                      <div className={classes.value} >
                        {val.label}:  {val.value} {val.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}


// import React from 'react';
// import classes from './index.module.scss';
// import { useGetHousesDeviceByIdQuery } from 'api/housesApi';
// import { useParams } from 'react-router-dom';
// import Circle from '../../components/ChartUI/Circle'; // 引入 Circle 組件

// const Sensor = () => {
//   const params = useParams();
//   const { id: paramsId } = params;

//   const result = useGetHousesDeviceByIdQuery(paramsId, {
//     pollingInterval: 1000,
//   });

//   const { data: devices, isSuccess, isLoading } = result;

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!isSuccess) {
//     return <div>Error loading data.</div>;
//   }

//   // 過濾 TEMP_HUMI_SENSOR
//   const TEMP_HUMI_SENSOR = devices.filter(item => item.type === 'TEMP_HUMI_SENSOR');

//   return (
//     <div className={classes.sensorBox}>
//       {TEMP_HUMI_SENSOR.map((sensor, index) => (
//         <div key={sensor.id} className={classes.sensorCircle}>
//           <div className={classes.sensorTitle}>{sensor.label}</div>
//           <Circle
//             value1={parseFloat(sensor.values[0]?.value || 0)} // 取第一個感測器的溫度值
//             value2={parseFloat(sensor.values[1]?.value || 0)} // 取第一個感測器的濕度值
//             uniqueId={index + 1}
//           />
//           <div className={classes.sensorValue}>
//             <div className={classes.sensorTempValue}>
//               <div>
//                 溫度:
//               </div>
//               <div>
//                 {sensor.values[0]?.value || 0} {sensor.values[0]?.unit}
//                 </div> 
//             </div>
//             <div className={classes.sensorHumValue}>

//             <div>
//                 濕度:
//               </div>
//             <div>

//               {sensor.values[1]?.value || 0} {sensor.values[1]?.unit}
//               </div>

//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Sensor;


