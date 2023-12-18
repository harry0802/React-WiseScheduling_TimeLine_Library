import React, { useEffect, useState } from 'react';
import './FanSystem.scss';
import ModeFanOffIcon from '@mui/icons-material/ModeFanOff';

import SelectSmall from '../SelectSmall';

export default function FanSystem(props) {

  // console.log('devices12123123123123', props.devices);
  const FIELD_SWITCH = props.devices.filter(item => item.name === 'FIELD_SWITCH');
  const FAN = props.devices.filter(item => item.name === "FAN");
  const RPM_SETTING = FAN[0].values.filter(item => item.name === "RPM_SETTING");
  const RPM = FAN[0].values.filter(item => item.name === "RPM");
  const POWER = FAN[0].values.filter(item => item.name === "POWER");
  const MODE = FIELD_SWITCH[0].values[0].value;
  // console.log(FAN[0])
  // console.log('RPM_SETTING',RPM_SETTING)
  // console.log('RPM',RPM)
  // console.log('POWER',POWER)



  const [isFanOn, setIsFanOn] = useState(true);
  useEffect(() => {
    setIsFanOn(POWER[0]?.value !== false);
  }, [POWER[0].value]);

  return (
    <div
      className={`fan-system-box ${isFanOn ? 'on-fan' : 'off-fan'} `}
    >
      <div className="system-top" >
        <div className="title">
          風扇系統
          {(!MODE && RPM) && <SelectSmall fanValues={RPM_SETTING} />}
        </div>
        <div className='fan-box1'>

          <div className='num'>NU-BE-18279975</div>
          {RPM &&


            <span className='value'>
              {RPM[0].value}
              <span>
                {RPM[0].unit}
              </span>
            </span>
          }

        </div>

        <ModeFanOffIcon className='ModeFanOffIcon' sx={{ width: '100% ', fontSize: 150, bottom: -150, textAlign: 'center', lg: { position: 'absolute' }, display: { xs: 'none' ,lg:'block'} }}
        />
      </div>
    </div>
  );
}
