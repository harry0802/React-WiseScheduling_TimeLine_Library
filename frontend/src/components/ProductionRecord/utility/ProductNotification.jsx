import React, { useEffect } from "react";
import { notification } from "antd";
import NotificationSlice from "../slice/NotificationSlice.jsx";
const ProductNotification = () => {
  const initializeApi = NotificationSlice((state) => state.initializeApi);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    initializeApi(api);
  }, [api, initializeApi]);

  return <>{contextHolder}</>;
};

export default ProductNotification;
