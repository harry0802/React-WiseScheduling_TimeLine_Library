import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ErrorIcon from '@mui/icons-material/Error';
import NotFoundPage from '../../components/NotFoundPage';
import MainPage from 'app/MainPage';
import InductionTestValue from './InductionTestValue';
import WaterCurtainSystem from './WaterCurtainSystem';
import FanSystem from './FanSystem';
import MonitorScreen from './MonitorScreen';
import TSSnackbar from 'components/TSSnackbar';
import './MonitorPage.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetHousesQuery, useGetHousesDeviceByIdQuery } from 'api/housesApi';

const MemoizedInductionTestValue = React.memo(InductionTestValue);
const MemoizedWaterCurtainSystem = React.memo(WaterCurtainSystem);
const MemoizedFanSystem = React.memo(FanSystem);

export default function MonitorPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { data: houses, isSuccess: housesisSuccess } = useGetHousesQuery();
  const { id } = params;
  const nowHouse = houses && houses.filter(item => item.id === parseInt(id, 10));
  const isSuccessHouses = housesisSuccess;

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const result = useGetHousesDeviceByIdQuery(id, {
    pollingInterval: isSuccessHouses ? 1000 : 0,
    onSuccess: () => {
      setIsDataLoaded(true);
    },
  });

  const { data: devices, isSuccess: isSuccessDevices, isLoading, refetch } = result;
  const [showMessage, setShowMessage] = useState({
    open: false,
    message: '',
  });

  useEffect(() => {
    // 在这里进行检查，如果数据已成功加载，可以进行页面跳转
    if (isDataLoaded) {
      // 在这里添加你希望跳转的路径，例如 '/houses/123/deviceMonitoring'
      navigate(`/houses/${id}/deviceMonitoring`);
    }
  }, [isDataLoaded, navigate, id]);

  if (isSuccessDevices && devices.length === 0) {
    return <div style={{ fontSize: '120px', textAlign: 'center', width: '100vw', height: '100vh', backgroundColor: '#0C1421' }}>
      <div style={{ paddingTop: '400px' }}>

        資料讀取失敗..請稍後再試
      </div>
    </div>;
  }

  if (!isSuccessDevices) {
    return <div style={{ fontSize: '120px', textAlign: 'center', width: '100%', height: '100vh', backgroundColor: '#0C1421' }}>
      <div style={{ paddingTop: '400px' }}>

        資料讀取中...請稍待片刻
      </div>
    </div>;
  }

  if (nowHouse && isSuccessDevices) {
    const { deviceMonitoring } = nowHouse[0].display.permissions;

    return (
      <MainPage id="monitor-page">
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          {deviceMonitoring && (
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={12}
                lg={6}
                sx={{
                  height: { xs: '150px', md: '206px', lg: '206px', xl: '266px' },
                }}
              >
                {isSuccessDevices && <MemoizedInductionTestValue devices={devices} isSuccess={isSuccessDevices} refetch={refetch} />}
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
                lg={6}
                sx={{
                  height: { xs: '200px', md: '206px', lg: '206px', xl: '266px' },
                }}
              >
                {isSuccessDevices && <MemoizedWaterCurtainSystem devices={devices} />}
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                lg={3}
                sx={{
                  marginBottom: "8px",
                  height: { xs: '200px', md: '206px', lg: '414px', xl: '570px' },
                }}
              >
                {isSuccessDevices && <MemoizedFanSystem devices={devices} />}
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
                lg={9}
                sx={{
                  marginBottom: '8px',
                  height: { xs: '250px', md: '570px', lg: '570px', xl: '570px' },
                }}
              >
                <MonitorScreen />
              </Grid>
            </Grid>
          )}
        </Box>

        {deviceMonitoring && (
          <TSSnackbar
            open={showMessage.open}
            autoHideDuration={1000}
            onClose={() => {
              setShowMessage({ open: false, message: '' });
            }}
            message={showMessage.message}
            action={<ErrorIcon color="error" />}
          />
        )}

        {!deviceMonitoring && <NotFoundPage />}
      </MainPage>
    );
  }
}
