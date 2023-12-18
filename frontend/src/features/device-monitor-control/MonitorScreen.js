import React from 'react';
import './MonitorScreen.scss';
import { useParams } from 'react-router-dom';
import field2 from '../../icons/svg/第14棟_0.png';
import field1 from '../../icons/svg/第2、4棟_0.png';

export default function MonitorScreen() {
  const params = useParams();
  const { id } = params;
  // console.log('id', id);

  if (id === '2' || id ==='3') {

    return (
      <div className="monitor-screen-box">
        <span className="title">感測器分布圖</span>
        {<img src={field1} className="field" />}
      </div>
    );
  }
  if (id === '1') {

    return (
      <div className="monitor-screen-box">
        <span className="title">感測器分布圖</span>
        {<img src={field2} className="field" />}
      </div>
    );
  }

}
