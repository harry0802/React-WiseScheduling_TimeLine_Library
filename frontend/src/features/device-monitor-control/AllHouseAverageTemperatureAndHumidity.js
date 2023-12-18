import React from 'react';
import classes from './AllHouseAverageTemperatureAndHumidity.module.scss';
import Grid from '@mui/material/Grid';
import Circle from '../../components/ChartUI/Circle';
import { useGetHousesDeviceByIdQuery } from 'api/housesApi';

const calculateAverage = (values) => {
  if (!values || values.length === 0) {
    return 0;
  }
  const sum = values.reduce((acc, value) => acc + value.value, 0);
  return sum / (values.length);
};

const HouseCircle = ({ title, averageValue, averageHumValues, uniqueId }) => (
  <Grid
    item
    xs={12}
    md={12}
    lg={6}
    xl={4}
    sx={{
      height: { xs: '470px', md: '470px', lg: '470px', xl: '470px' },

    }}
    className={classes.CircleBox}
  >
    <div className={classes.Box}>
      <div className={classes.title}>{title}</div>
      <div className={classes.Circle}>

        <Circle value1={averageValue} value2={averageHumValues} uniqueId={uniqueId} />
        <div className={classes.showValue}>
          <div className={classes.tempVlaue}>
            <div className={classes.tempVlaue}>溫度</div>
            <div className={classes.tempVlaue}>{`${averageValue.toFixed(2)}°C`}</div>
          </div>
          <div className={classes.hunVlaue}>
            <div className={classes.hunVlaue}>濕度</div>
            <div className={classes.hunVlaue}>{`${averageHumValues.toFixed(2)}%`}</div>
          </div>
        </div>
      </div>
    </div>
  </Grid>
);

const AllHouseAverageTemperatureAndHumidity = ({ housesIdArray, housesLabelArray }) => {
  const circlesData = housesIdArray.map((houseId, index) => {
    const { data, error } = useGetHousesDeviceByIdQuery(houseId);

    if (error) {
      console.error(`Error fetching data for house ${houseId}:`, error);
      return null;
    }

    if (!data || data.length === 0) {
      // console.warn(`Data for house ${houseId} is undefined or empty.`);
      return null;
    }
    const sensorTempValues = data.flatMap(item =>
      item.values.filter(value => value.name === 'SENSOR_TEMP' && item.name !== 'TEMP_HUMI_SENSOR_OUTSIDE')
    );

    const sensorHumValues = data.flatMap(item =>
      item.values.filter(value => value.name === 'SENSOR_HUMI' && item.name !== 'TEMP_HUMI_SENSOR_OUTSIDE')
    );

    // console.log('sensorTempValues',sensorTempValues)
    const averageValue = calculateAverage(sensorTempValues);
    // console.log('averageValue',averageValue)
    const averageHumValues = calculateAverage(sensorHumValues);

    return { title: `${housesLabelArray[index]}棟舍平均溫溼度`, averageValue, averageHumValues, uniqueId: index + 1 };
  });
  // console.log('circlesData',circlesData)

  return (
    <div>

      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
        {circlesData
          .filter(circleData => circleData !== null)
          .map((circleData) => (
            <HouseCircle key={circleData.uniqueId} {...circleData} />
          ))}
      </Grid>
    </div>
  );
};

export default AllHouseAverageTemperatureAndHumidity;
