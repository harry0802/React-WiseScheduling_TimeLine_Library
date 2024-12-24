import React, { createContext, useContext, useState } from "react";
import { notification } from "antd";

// Create a Context for the notification
const NotificationContext = createContext();

// Create a Provider component
export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const triggerNotification = ({ message, description, notificationStyle }) => {
    api.open({
      message: message || "Notification Title",
      description: description || "This is the content of the notification.",
      className: "custom-class",
      style: notificationStyle || { width: 600 },
    });
  };

  return (
    <NotificationContext.Provider value={triggerNotification}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification trigger function
export const useNotification = () => {
  return useContext(NotificationContext);
};
