import React from 'react';
import './PowerConsumption.scss';
import './MonitorPage.scss';

export default function PowerConsumption({ device = {} }) {
  return (
    <div className="power-consumptione-box">
      <div className="power-consumptione">
        <span className="title">耗電量</span>
        <div className="value">
          {device.device_value}
          <span className="unit">kWh</span>
        </div>
      </div>
    </div>
  );
}
