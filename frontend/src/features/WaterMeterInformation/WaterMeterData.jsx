import './WaterMeterData.scss';

export default function WaterMeterData(props) {
  const { devices,  } = props;
  // console.log('devices77777',devices)
  // console.log('title ,unit,devices', title, unit, devices);
  // console.log('666devices6666', devices);
  const {values} =props.devices
  return (
    <div className="watermeter-data">
        <div className='title'>
          水錶即時資訊
        </div>
        <div className='WATER_VOLUME'>
          {values[0].value}
          <span className='unit'>{values[0].unit}</span>
        </div>
        {/* <div className='water-box'>
          <span style={{textAlign:'center', fontSize:"60px", color:'#8f8f8f'}}>
            水表-歷史資訊
          </span>
        </div> */}

    </div>
  );
}
