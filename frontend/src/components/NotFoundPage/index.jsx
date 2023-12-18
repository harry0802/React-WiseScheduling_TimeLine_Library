import React from 'react';
import { useParams } from 'react-router-dom';

const NotFoundPage = () => {
  
  return (
    <div style={{ textAlign: 'center', width:'100%' ,fontSize:'50px',height:'100vh',backgroundColor:'#0C1421',paddingTop:'300px'
    }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      {/* 你可以在這裡添加其他自訂的錯誤訊息、圖片或返回按鈕 */}
    </div>
  );
};

export default NotFoundPage;
