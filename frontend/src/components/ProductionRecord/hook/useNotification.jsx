import { notification } from "antd";
import { useRef, useImperativeHandle, forwardRef } from "react";

export const useProductToast = () => {
  const [api, contextHolder] = notification.useNotification();

  const notify = (
    type,
    {
      message,
      description,
      duration = 4.5,
      placement = "bottomRight",
      iconOption = null,
    } = {}
  ) => {
    api[type]({
      message,
      description,
      duration,
      placement,
      icon: iconOption,
    });
  };

  return { notify, contextHolder };
};

// Hook to be used in components to expose notification functionality
export const useNotificationHandler = () => {
  const notificationRef = useRef();

  const NotificationComponent = forwardRef((_, ref) => {
    const { notify, contextHolder } = useProductToast();

    useImperativeHandle(ref, () => ({
      notify,
    }));

    return <>{contextHolder}</>;
  });

  return { notificationRef, NotificationComponent };
};
