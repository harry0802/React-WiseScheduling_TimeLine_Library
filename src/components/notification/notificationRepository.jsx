import { Icon } from "@iconify/react";

const createDefaultIcon = () => (
  <Icon
    icon="fontisto:check"
    className="notificationStyle__icon"
    style={{
      color: "#07CB3E",
      strokeWidth: "2px",
      stroke: "currentColor",
    }}
  />
);

export const createNotificationRepository = (api) => ({
  display: (notification) => {
    if (!api) {
      throw new Error("Notification API is not initialized.");
    }
    const icon = notification.icon || createDefaultIcon();
    api.open({
      message: notification.message,
      description: notification.description,
      className: "notificationStyle",
      style: notification.style,
      placement: notification.placement,
      duration: notification.duration,
      pauseOnHover: false,
      icon: icon,
    });
  },
});
