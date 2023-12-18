import './MeterData.scss';

export default function MeterData(props) {
  const { title, unit, devices, FanDevices } = props;
  // console.log('devices77777',devices)
  // console.log('title ,unit,devices', title, unit, devices);
  // console.log('FanDevices', FanDevices);

  return (
    <div
      className="meter-data"
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="title">
        {title}
      </div>

      {devices && (
        <div className="value">
          {devices.value}
          <span className="unit">
            {unit}
          </span>
        </div>
      )}

      {FanDevices && (
        <>

          <div className="fan-devices">
            <span className='fan-devices-label'>
              {FanDevices.values[0].label}: &nbsp;
            </span>
            <span>
              {FanDevices.values[0].value}
            </span>
            <span className="unit">
              {FanDevices.values[0].unit}
            </span>
            <br></br>

            <span className='fan-devices-label'>
              {FanDevices.values[1].label}: &nbsp;
            </span>
            <span>
              {FanDevices.values[1].value}
            </span>
            <span className="unit">
              {FanDevices.values[1].unit}
            </span>
            <br></br>

            <span className='fan-devices-label'>
              {FanDevices.values[2].label}: &nbsp;
            </span>
            <span>
              {FanDevices.values[2].value}
            </span>
            <span className="unit">
              {FanDevices.values[2].unit}
            </span>
          </div>

        </>
      )}
    </div>
  );
}
