import React, { useEffect, useState } from 'react';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import './WaterCurtainSystem.scss';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function WaterCurtainSystem(props) {
  const { devices } = props;
  // console.log('devices',devices)

  const [isWaterOn, setIsWaterOn] = useState(true);
  const COOLING_PAD = devices.filter(item=>item.name ==='COOLING_PAD')
  let coolingPadValues = COOLING_PAD[0].values;
  let POWER = coolingPadValues.filter(value => value.name === 'POWER');
  // console.log('POWER',POWER)

  // const powerSwitch = values
  useEffect(() => {
    setIsWaterOn(POWER[0]?.value !== false);
  }, [POWER[0].value]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            height: { xs: '200px', md: '206px', lg: '206px', xl: '266px' },
          }}
        >
          <div
            className={`water-curtain-system-box1 ${isWaterOn ? 'on-water' : 'off-water'}`}
          >
            <div className="system-left">
              <div className="title">水濂系統</div>
              <div className="unmber">NU-BE-18279975</div>
            </div>
            <WaterDropIcon
              sx={{
                fontSize: 180,
                position: 'absolute',
                right: 0,
                top: 10,
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}