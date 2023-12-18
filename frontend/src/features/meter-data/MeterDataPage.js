import './MeterDataPage.scss';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MainPage from 'app/MainPage';
import MeterData from './MeterData';
import NotFoundPage from '../../components/NotFoundPage';
import { useGetHousesQuery } from 'api/housesApi';
import { useParams } from 'react-router-dom';
import { useGetHousesDeviceByIdQuery } from 'api/housesApi';

const MemoizedMeterData = React.memo(MeterData);

export default function MeterDataPage() {

  const params = useParams();
  const { data: houses, isSuccess: housesisSuccess } = useGetHousesQuery();
  const { id } = params;
  const nowHouse = houses && houses.filter(item => item.id === parseInt(id, 10));


  const result = useGetHousesDeviceByIdQuery(id, {
    pollingInterval: 1000, // 设置轮询的间隔，单位毫秒 如果为0则表示不轮询

  });
  const { data: devices, isSuccess, isLoading, refetch } = result; // 调用Api中的钩子查询数据
  // console.log('devices22222222', devices);

  if (!isSuccess || !devices || devices.length === 0) {
    return <NotFoundPage />;
  }

  if (nowHouse && isSuccess) {
    const { meterData } = nowHouse[0].display.permissions;

    return (
      <MainPage id="meter-data-page">

        <Box
          sx={{
            flexGrow: 1,
            paddingLeft: 3,
            paddingRight: 3,
            overflow: 'auto'
          }}
        > {meterData &&
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              sx={{
                marginTop: '4px',
                height: { xs: '200px', md: '310px', xl: '434px' },
              }}
            >
              {/* {(isSuccess && devices != []) && <MeterData
                  devices={devices[0].values[3]}
                  title="電壓"
                  unit="V"
                />
                } */}
              {isSuccess && devices[0]?.values[3] && (<MemoizedMeterData
                devices={devices[0].values[3]} title="電壓" unit="V" />
              )}


            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              sx={{
                marginTop: '4px',
                height: { xs: '200px', md: '310px', xl: '434px' },
              }}
            >

              {isSuccess && devices[0]?.values[7] && <MemoizedMeterData
                devices={devices[0].values[7]}
                title="安培"
                unit="A"
              />
              }

            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              sx={{
                marginTop: '4px',
                height: { xs: '200px', md: '310px', xl: '434px' },
              }}
            >

              {isSuccess && devices[0]?.values[13] && <MemoizedMeterData
                devices={devices[0].values[13]}
                title="功率因素"
                unit="PF"
              />
              }
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              sx={{
                marginTop: '4px',
                height: { xs: '200px', md: '310px', xl: '434px' },
              }}
            >


              {isSuccess && devices[0]?.values[14] && <MemoizedMeterData
                devices={devices[0].values[14]}
                title="累積用電量"
                unit="kWh"
              />
              }
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              sx={{
                marginTop: '4px',
                height: { xs: '200px', md: '310px', xl: '434px' },
                display: !isSuccess || (devices[4]?.values[0]?.name !== 'CURRENT_1') ? 'none' : 'block', // Hide if conditions are not met
              }}
            >
              {isSuccess && devices[4]?.values[0]?.name === 'CURRENT_1' && (
                <MeterData
                  FanDevices={devices[4]}
                  title="電扇用電壓"
                />
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              sx={{
                marginTop: '4px',
                height: { xs: '200px', md: '310px', xl: '434px' },
              }}
            >

              {isSuccess && devices[0]?.values[12] && <MemoizedMeterData
                devices={devices[0].values[12]}
                title="即時用電量"
                unit="kW"
              />
              }
            </Grid>
          </Grid>
          }
          {
            !meterData && <NotFoundPage />
          }
        </Box>
      </MainPage>
    );
  }
}
