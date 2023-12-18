import React, { useState, useEffect } from 'react';
import classes from './InductionTestValue.module.scss';
import { useUpdateValuesMutation } from 'api/housesApi';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { NavLink, useParams } from 'react-router-dom';

const calculateAverage = (values) => {
  if (!values || values.length === 0) {
    return 0;
  }
  const sum = values.reduce((acc, value) => acc + value.value, 0);
  return sum / values.length;
};

export default function InductionTestValue(props) {
  const { devices, isSuccess } = props;
  const params = useParams();
  const { id } = params;
  const [isBlinkingHumidity, setIsBlinkingHumidity] = useState(false);
  const [isBlinkingTemperature, setIsBlinkingTemperature] = useState(false);

  const TEMP_HUMI_SENSOR = devices.filter(item => item.name === 'TEMP_HUMI_SENSOR');
  const COOLING_PAD = devices.find(item => item.name === 'COOLING_PAD');
  const tempSettingValue = COOLING_PAD ? COOLING_PAD.values.find(value => value.name === 'TEMP_SETTING') : null;

  const [temperature, setTemperature] = useState(() => (tempSettingValue ? tempSettingValue.value : ''));
  const oldValue = tempSettingValue ? tempSettingValue.value : '';

  const [isEdit, setIsEdit] = useState(false);
  const cancelEdit = () => {
    setIsEdit(false);
  };

  const [updateValues, { isSuccess: isUpdateSuccess }] = useUpdateValuesMutation();

  const [openDialog, setOpenDialog] = useState(false);

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      setTemperature((prevTemperature) => (parseFloat(prevTemperature) + (event.key === 'ArrowUp' ? 1 : -1)).toFixed(2));
    }
  };

  const handleBlur = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (confirmed) => {
    setOpenDialog(false);

    if (confirmed) {
      cancelEdit();

      updateValues({
        id: tempSettingValue.id,
        value: parseFloat(temperature)
      });
    } else {
      setTemperature(oldValue);
      cancelEdit();
    }
  };
  const sensorTempValues = TEMP_HUMI_SENSOR.flatMap(item => item.values.filter(value => value.name === 'SENSOR_TEMP'));
  const sensorHumValues = TEMP_HUMI_SENSOR.flatMap(item => item.values.filter(value => value.name === 'SENSOR_HUMI'));

  const averageValue = calculateAverage(sensorTempValues);
  const averageHumValues = calculateAverage(sensorHumValues);

  useEffect(() => {
    setTemperature(tempSettingValue ? tempSettingValue.value : '');

    // Check conditions for blinking
    const threshold = 10; // Adjust this threshold as needed
    const isBlinkingTemperature = averageValue !== null && averageValue > threshold;
    const isBlinkingHumidity = averageHumValues !== null && averageHumValues > threshold;

    setIsBlinkingTemperature(isBlinkingTemperature);
    setIsBlinkingHumidity(isBlinkingHumidity);
  }, [tempSettingValue, averageHumValues, averageValue]);



  return (
    <div className={classes.inductionTestValueBox}>
      <div className={classes.temperature}>
        {averageValue !== null && (
          <span className={classes.title}>
            <NavLink to={`/houses/${id}/sensor`} className={classes.activeLink}>
              平均溫度感測
            </NavLink>
          </span>
        )}
        {averageValue !== null && (
          <div className={`${classes.monitorPageValue} ${isBlinkingHumidity ? classes.blinking : ''}`}>
            {averageValue.toFixed(2)}
            <span className={classes.TempUnit}>°C</span>
          </div>
        )}
      </div>

      <div className={classes.temperature}>
        {averageHumValues !== null && (
          <span className={classes.title}>
            <NavLink to={`/houses/${id}/sensor`} className={classes.activeLink}>
              平均濕度感測
            </NavLink>
          </span>
        )}
        {averageHumValues !== null && (
          <div className={`${classes.monitorHumPageValue} ${isBlinkingHumidity ? classes.blinking : ''}`}>
            {averageHumValues.toFixed(2)}
            <span className={classes.HumUnit}>%</span>
          </div>
        )}
      </div>

      <div className={classes.temperature}>
        {isSuccess && tempSettingValue && (
          <div className={classes.title}>
            {tempSettingValue.label}
            <button className={classes.edit} onClick={() => setIsEdit(true)}>
              編輯
            </button>
          </div>
        )}
        <div className={classes.PageValue}>
          {isEdit && isSuccess && tempSettingValue && (
            <input
              autoFocus
              className={classes.EditInput}
              value={temperature}
              onChange={handleTemperatureChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          )}
          {!isEdit && isSuccess && tempSettingValue && (
            <div className={`${classes.NoEditValue} ${isBlinkingHumidity ? classes.blinking : ''}`}>
              {tempSettingValue.value}
              <span className={classes.TempUnit}>°C</span>
            </div>
          )}
        </div>
      </div>

      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>
          <span className={classes.Title}>溫度設定</span>
        </DialogTitle>
        <DialogContent>
          <span className={classes.Title}>您確定要更改此溫度嗎?</span>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            <span className={classes.btn}>取消</span>
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">
            <span className={classes.btn}>確認</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
