import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import { useParams } from 'react-router-dom';

import { useGetHousesDeviceByIdQuery, useUpdateValuesMutation } from 'api/housesApi';
import NotFoundPage from '../../components/NotFoundPage';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useGetHousesQuery } from 'api/housesApi';

export default function ParameterSettings() {
  const params = useParams();

  // 取得棟舍id
  const { id } = params;
  const { data: houses, isSuccess: housesisSuccess } = useGetHousesQuery();
  const nowHouse = houses && houses.filter(item => item.id === parseInt(id, 10));

  // 取得棟舍device
  const result = useGetHousesDeviceByIdQuery(id, {
    pollingInterval: 1000,
  });
  const { data: devices, isSuccess, isLoading } = result;

  // console.log(devices[5])
  const COOLING_PAD = devices.filter(item => item.name === 'COOLING_PAD');
  let coolingPadValues = COOLING_PAD[0].values;

  // const { values: COOLING_PAD } = devices[5];
  // console.log('COOLING_PAD666',COOLING_PAD)
  const PID_P_OBJ = coolingPadValues.find(item => item.name === "PID_P");
  // 取得obj對應的id
  const { id: proportionId } = PID_P_OBJ;
  const PID_I_OBJ = coolingPadValues.find(item => item.name === "PID_I");
  // 取得obj對應的id
  const { id: integralId } = PID_I_OBJ;
  const PID_D_OBJ = coolingPadValues.find(item => item.name === "PID_D");
  // 取得obj對應的id
  const { id: differentialId } = PID_D_OBJ;
  const SPEED_MAX_OBJ = coolingPadValues.find(item => item.name === "SPEED_MAX");
  // 取得obj對應的id
  const { id: maxValueId } = SPEED_MAX_OBJ;
  const SPEED_MIN_OBJ = coolingPadValues.find(item => item.name === "SPEED_MIN");
  // 取得obj對應的id
  const { id: minValueId } = SPEED_MIN_OBJ;


  // Define state variables for edited values
  const [editedProportionValue, setEditedProportionValue] = useState(PID_P_OBJ.value);
  const [editedIntegralValue, setEditedIntegralValue] = useState(PID_I_OBJ.value);
  const [editedDifferentialValue, setEditedDifferentialValue] = useState(PID_D_OBJ.value);
  const [editedMaxValue, setEditedMaxValue] = useState(SPEED_MAX_OBJ.value);
  const [editedMinValue, setEditedMinValue] = useState(SPEED_MIN_OBJ.value);

  // 編輯判斷顯示
  const [editStatus, setEditStatus] = useState({
    proportion: false,
    integral: false,
    differential: false,
    maxValue: false,
    minValue: false
  });
  // console.log('editStatus', editStatus);

  // Ensure hooks are not conditionally invoked
  const [updateType, setUpdateType] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  // 確認框開關

  const [confirmationData, setConfirmationData] = useState({ key: '', id: '' });

  // api
  const [updateValues, { isSuccess: isUpdateSuccess }] = useUpdateValuesMutation();

  // 編輯後的變數值
  const [editedValue, setEditedValue] = useState('');

  // 每次組件選染完畢後再執行,保證為最新的值
  useEffect(() => {
    if (devices) {
      setEditedProportionValue(PID_P_OBJ.value);
      setEditedIntegralValue(PID_I_OBJ.value);
      setEditedDifferentialValue(PID_D_OBJ.value);
      setEditedMaxValue(SPEED_MAX_OBJ.value);
      setEditedMinValue(SPEED_MIN_OBJ.value);
    }
  }, [devices]);



  // 設定點擊編輯按鈕
  const handleEdit = (key, value) => {
    // 顯示設定
    setEditStatus((prevStatus) => ({
      ...prevStatus,
      [key]: true
    }));

    // 修改editedValue
    setEditedValue(value);
  };
  // 控制inout的value值(對應各個 edited values)
  const handleInputChange = (key, event) => {
    switch (key) {
      case 'proportion':
        setEditedProportionValue(event.target.value);
        break;
      case 'integral':
        setEditedIntegralValue(event.target.value);
        break;
      case 'differential':
        setEditedDifferentialValue(event.target.value);
        break;
      case 'maxValue':
        setEditedMaxValue(event.target.value);
        break;
      case 'minValue':
        setEditedMinValue(event.target.value);
        break;
      default:
        break;
    }
  };



  // 設定儲存按鈕
  const handleSave = (key, id) => {

    setIsConfirmationOpen(true);
    setConfirmationData({ key, id });
    setUpdateType(key);

  };

  const handleConfirmation = (confirmed) => {
    setIsConfirmationOpen(false);
    if (confirmed) {
      const { key, id } = confirmationData;
      setEditStatus((prevStatus) => ({
        ...prevStatus,
        [key]: false
      }));
      let editedValue;
      switch (key) {
        case 'proportion':
          editedValue = editedProportionValue;
          break;
        case 'integral':
          editedValue = editedIntegralValue;
          break;
        case 'differential':
          editedValue = editedDifferentialValue;
          break;
        case 'maxValue':
          editedValue = editedMaxValue;
          break;
        case 'minValue':
          editedValue = editedMinValue;
          break;
        default:
          break;
      }
      updateValues({ id, value: +editedValue });
      // console.log('我將更新的數據傳過去了!!');
    }
  };

  // 取消修改
  const cancelEdit = (key) => {
    switch (key) {
      case 'proportion':
        setEditedProportionValue(PID_P_OBJ.value);
        break;
      case 'integral':
        setEditedIntegralValue(PID_I_OBJ.value);
        break;
      case 'differential':
        setEditedDifferentialValue(PID_D_OBJ.value);
        break;
      case 'maxValue':
        setEditedMaxValue(SPEED_MAX_OBJ.value);
        break;
      case 'minValue':
        setEditedMinValue(SPEED_MIN_OBJ.value);
        break;
      default:
        break;
    }
    setEditStatus((prevStatus) => ({
      ...prevStatus,
      [key]: false
    }));
  };

  // 設定未設定路由為404
  if (isSuccess && devices.length === 0) {
    return <NotFoundPage />;
  }

  if (!isSuccess) {
    return <NotFoundPage />;
  }


  if (nowHouse && isSuccess) {
    const { parameterSettings } = nowHouse[0].display.permissions;
    return (
      <div className={classes.info}>
        {parameterSettings && <div>參數設定</div>}
        {parameterSettings && <div className={classes.valueBox}>
          <div className={classes.values}>
            <div className={classes.box1}>
              <div className={classes.title}>比例值:</div>
              {!editStatus.proportion ? (
                <div className={classes.value}>{PID_P_OBJ.value}</div>
              ) : (
                <input
                  autoFocus
                  type="number"
                  id="proportion" // 为每个输入字段设定一个唯一的ID
                  step="1"
                  value={editedProportionValue}
                  onChange={(event) => handleInputChange('proportion', event)} // 使用正确的 key
                />
              )}          </div>
            <div>

              {editStatus.proportion && (
                <div style={{ width: "300px" }}>
                  <button className={classes.save} onClick={() => handleSave('proportion', proportionId)}>儲存</button>
                  <button style={{ width: '150px' }} onClick={() => cancelEdit('proportion')}>取消修改</button>
                </div>
              )}
              {!editStatus.proportion && (<button onClick={() => handleEdit('proportion')}>修改</button>)}

            </div>
          </div>

          <div className={classes.values}>
            <div className={classes.box1}>
              <div className={classes.title}>積分值:</div>
              {!editStatus.integral ? (
                <div className={classes.value}>{PID_I_OBJ.value}</div>
              ) : (
                <input
                  autoFocus
                  type="number"
                  id="integral" // 为每个输入字段设定一个唯一的ID
                  step="1"
                  value={editedIntegralValue}
                  onChange={(event) => handleInputChange('integral', event)} // 使用正确的 key
                />
              )}          </div>
            <div >
              {!editStatus.integral && <button onClick={() => handleEdit('integral')}>修改</button>}
              {editStatus.integral && (
                <div style={{ width: '300px' }}>
                  <button className={classes.save} onClick={() => handleSave('integral', integralId)}>儲存</button>
                  <button style={{ width: '150px' }} onClick={() => cancelEdit('integral')}>取消修改</button>
                </div>
              )}
            </div>
          </div>

          <div className={classes.values}>
            <div className={classes.box1}>
              <div className={classes.title}>微分值:</div>
              {!editStatus.differential ? (
                <div className={classes.value}>{PID_D_OBJ.value}</div>
              ) : (
                <input
                  autoFocus
                  type="number"
                  id="differential" // 为每个输入字段设定一个唯一的ID
                  step="1"
                  value={editedDifferentialValue}
                  onChange={(event) => handleInputChange('differential', event)} // 使用正确的 key
                />
              )}          </div>
            <div>
              {!editStatus.differential && <button onClick={() => handleEdit('differential')}>修改</button>}
              {editStatus.differential && (
                <div style={{ width: '300px' }}>
                  <button className={classes.save} onClick={() => handleSave('differential', differentialId)}>儲存</button>
                  <button style={{ width: '150px' }} onClick={() => cancelEdit('differential')}>取消修改</button>
                </div>
              )}              </div>
          </div>

          <div className={classes.values}>
            <div className={classes.box1}>
              <div className={classes.title}>最大值限制:</div>
              {!editStatus.maxValue ? (
                <div className={classes.value}>{SPEED_MAX_OBJ.value}</div>
              ) : (
                <input
                  autoFocus
                  type="number"
                  id="maxValue" // 为每个输入字段设定一个唯一的ID
                  step="1"
                  value={editedMaxValue}
                  onChange={(event) => handleInputChange('maxValue', event)} // 使用正确的 key
                />
              )}
            </div>
            <div>
              {!editStatus.maxValue && <button onClick={() => handleEdit('maxValue')}>修改</button>}
              {editStatus.maxValue && (
                <div style={{ width: '300px' }}>
                  <button className={classes.save} onClick={() => handleSave('maxValue', maxValueId)}>儲存</button>
                  <button style={{ width: '150px' }} onClick={() => cancelEdit('maxValue')}>取消修改</button>
                </div>
              )}
            </div>
          </div>

          <div className={classes.values}>
            <div className={classes.box1}>
              <div className={classes.title}>最小值限制:</div>
              {!editStatus.minValue ? (
                <div className={classes.value}>{SPEED_MIN_OBJ.value}</div>
              ) : (
                <input
                  autoFocus
                  type="number"
                  id="minValue" // 为每个输入字段设定一个唯一的ID
                  step="1"
                  value={editedMinValue}
                  onChange={(event) => handleInputChange('minValue', event)} // 使用正确的 key
                />
              )}
            </div>
            <div>
              {!editStatus.minValue && <button onClick={() => handleEdit('minValue')}>修改</button>}
              {editStatus.minValue && (
                <div style={{ width: '300px' }}>
                  <button className={classes.save} onClick={() => handleSave('minValue', minValueId)}>儲存</button>
                  <button style={{ width: '150px' }} onClick={() => cancelEdit('minValue')}>取消修改</button>
                </div>
              )}
            </div>
          </div>
        </div>}
        {parameterSettings &&
          <Dialog open={isConfirmationOpen} onClose={() => handleConfirmation(false)}>
            <DialogTitle>
              <span className={classes.Title}>

                {updateType && `數據更新 `}
              </span>

            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center' }} >
              <span className={classes.Content}>

                確認要保存更改嗎?
              </span>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }} >
              <Button className={classes.cancel} onClick={() => handleConfirmation(false)}>
                <span className={classes.DialogBtn}>

                  取消
                </span>
              </Button>
              <Button className={classes.ok} onClick={() => handleConfirmation(true)}>
                <span className={classes.DialogBtn}>

                  確認
                </span>

              </Button>
            </DialogActions>
          </Dialog>
        }
        {!parameterSettings && <NotFoundPage />}

      </div>
    );

  }


}