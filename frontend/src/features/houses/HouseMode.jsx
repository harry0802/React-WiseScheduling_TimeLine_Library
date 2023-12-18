import React from 'react';
import './HouseMode.scss';
import { Outlet, useNavigate ,useParams, useLocation} from "react-router-dom";
import { useEffect } from 'react';



//元件
import Menu from './Menu';
// import MeterDataPage from '../meter-data/MeterDataPage'

export default function HouseMode() {
  const navigate = useNavigate();
  // 重定向 ,因為我不想看到首頁
  const params = useParams();
  const location = useLocation();

  // console.log(params)

  const {id} = params
  useEffect(() => {
 
    if (location.pathname === `/houses/${id}`) {
      navigate(`/houses/${id}/deviceMonitoring`);
    }
 
  }, [navigate]);



  return (
    <div className='house-box'>
      <Outlet />
      <Menu />
    </div>
  );
}
