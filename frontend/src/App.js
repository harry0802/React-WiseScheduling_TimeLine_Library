import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { zhTW } from '@mui/material/locale';
import 'i18n/i18n';
import ProtectedLayout from 'app/ProtectedLayout';
import NotFoundPage from 'components/NotFoundPage'; // 引入 404 頁面
import SignInPage from 'features/auth/SignInPage';
import MonitorPage from 'features/device-monitor-control/MonitorPage';
import MeterDataPage from 'features/meter-data/MeterDataPage';
import HouseMode from 'features/houses/HouseMode';
import WaterMeterInformation from 'features/WaterMeterInformation';
import ParameterSettings from 'features/ParameterSettings';
import SolidLiquidSeparatorPage from 'features/SolidLiquidSeparatorPage';
import Sensor from 'features/Sensor';
// import AdminSetting from 'features/AdminSetting';
// import TestUI from 'features/TestUI';
import { Navigate } from "react-router-dom";
const mdTheme = createTheme(
  {
    palette: {
      mode: 'dark',
      primary: {
        light: '#739BB0',
        main: '#186C98',
        contrastText: '#E1E7F5',
      },
      text: {
        primary: '#8F8F8F',
      },
      success: {
        main: '#07CB3E',
      },
    },
    typography: {
      fontFamily: ['"Noto Sans"', 'sans-serif'].join(','),
    },
  },
  zhTW
);

function App() {


  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Routes>
        <Route path="signin" element={<SignInPage />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="houses/:id" element={<HouseMode />}>
            <Route path="deviceMonitoring" element={<MonitorPage />} />
            <Route path="meterData" element={<MeterDataPage />} />
            <Route path="waterMeterInformation" element={<WaterMeterInformation />} />
            <Route path="parameterSettings" element={<ParameterSettings />} />
            <Route path="sensor" element={<Sensor />} />
            {/* <Route path="solid-liquid-separatorPage" element={<SolidLiquidSeparatorPage />} /> */}
            {/* <Route path="adminSetting" element={<AdminSetting />} />
            <Route path="testUI" element={<TestUI />} /> */}
          </Route>
          {/* 加入 404 錯誤路徑捕捉 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        <Route
          path="*"
          element={<Navigate to="/" replace={true} />}
        />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
