import Reac, { useState } from 'react';
import { NavLink } from "react-router-dom";
import classes from "./Menu.module.scss";
import SettingsIcon from '@mui/icons-material/Settings';
import ConstructionIcon from '@mui/icons-material/Construction';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PowerIcon from '@mui/icons-material/Power';
import { useGetHousesQuery } from 'api/housesApi';

import { useParams } from "react-router-dom";


export default function Menu() {
  const { data: houses, isSuccess, isLoading, refetch } = useGetHousesQuery( null,{
    pollingInterval: 1000, // 设置轮询的间隔，单位毫秒 如果为0则表示不轮询
  });
  const params = useParams();
  const { id } = params;
  // console.log('ID:', id);
// console.log('Houses:', houses);

  // 檢查數據是否正在加載中
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 檢查屋舍ID是否存在
  if (!id) {
    console.error('Invalid or missing house ID');
    return <div>Invalid or missing house ID</div>;
  }
  
  const nowHouse = houses && houses.filter(item => item.id === parseInt(id, 10));


  if (nowHouse && isSuccess) {
    const { deviceMonitoring, meterData, parameterSettings, waterMeterInformation } = nowHouse[0].display.permissions;
    return (
      <div>
        <ul className={classes.switchPath}>
          {
            deviceMonitoring &&
            <li >
              <NavLink
                to={`/houses/${id}/deviceMonitoring`}
                style={
                  ({ isActive }) => {
                    return isActive ?
                      { color: '#8AC0E2' } :
                      null;
                  }
                }
              >
                <ConstructionIcon />
                設備監控
              </NavLink>
            </li>
          }

          {/* 判斷使用者是否有電錶數據功能 */}
          {meterData && <li >

            <NavLink
              to={`/houses/${id}/meterData`}

              style={
                ({ isActive }) => {
                  return isActive ?
                    { color: '#8AC0E2' } :
                    null;
                }
              }
            >
              <PowerIcon />
              電錶數據
            </NavLink>
          </li>}
          {/* 判斷使用者是否有水錶資訊功能 */}
          {waterMeterInformation &&
            <li >

              <NavLink
                to={`/houses/${id}/waterMeterInformation`}
                style={
                  ({ isActive }) => {
                    return isActive ?
                      { color: '#8AC0E2' } :
                      null;
                  }
                }
              >
                <WaterDropIcon />
                水錶資訊
              </NavLink>
            </li>
          }
          {/* 判斷使用者是否有參數設定功能 */}
          {
            parameterSettings &&
            <li >
              <NavLink
                to={`/houses/${id}/parameterSettings`}
                style={
                  ({ isActive }) => {
                    return isActive ?
                      { color: '#8AC0E2' } :
                      null;
                  }
                }
              >
                <SettingsIcon />
                參數設定
              </NavLink>
            </li>
          }
        </ul>
      </div>
    );
  } else {
    // Handle the case where no house with the specified id is found
    console.error('No house found with id:', id);
    return <div>No house found with id: {id}</div>;
  }

}