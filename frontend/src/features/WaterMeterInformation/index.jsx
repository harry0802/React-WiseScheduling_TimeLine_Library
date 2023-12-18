import React from 'react';
import classes from './index.module.scss';
import WaterMeterData from './WaterMeterData';
import { useParams } from 'react-router-dom';

import { useGetHousesDeviceByIdQuery } from 'api/housesApi';
import NotFoundPage from '../../components/NotFoundPage';
import { useGetHousesQuery } from 'api/housesApi';

export default function WaterMeterInformation() {
  const params = useParams();

  // console.log(params)

  const { id } = params;
  const { data: houses, isSuccess: housesisSuccess } = useGetHousesQuery();
  const nowHouse = houses && houses.filter(item => item.id === parseInt(id, 10));


  const result = useGetHousesDeviceByIdQuery(id, {
    pollingInterval: 1000, // 设置轮询的间隔，单位毫秒 如果为0则表示不轮询
    skip: false, // 设置是否跳过当前请求，默认false
    refetchOnMountOrArgChange: false, // 设置是否每次都重新加载数据 false正常使用缓存，
    // true每次都重载数据
    //数字，数据缓存的时间（秒）
    refetchOnFocus: false, // 是否在重新获取焦点时重载数据
    refetchOnReconnect: true, // 是否在重新连接后重载数据
  });

  // console.log('result', result);
  const { data: devices, isSuccess, isLoading, refetch } = result; // 调用Api中的钩子查询数据
  // console.log('devices111111', devices);
  if (isSuccess && devices.length === 0) {
    return <NotFoundPage />;
  }
  if (!isSuccess) {
    return <NotFoundPage />;
  }
  if (nowHouse && isSuccess) {
    const { waterMeterInformation } = nowHouse[0].display.permissions;

    return (
      <div className={classes.info} >
        {isSuccess && waterMeterInformation && <WaterMeterData devices={devices[2]} />}
        {!waterMeterInformation && <NotFoundPage />}
      </div>
    );
  }
}
