export const createNotificationEntity = ({
  message,
  description,
  style = { width: 600 },
  icon = null,
  duration = 1,
  placement = "bottomRight",
}) => ({
  id: Date.now().toString(),
  message,
  description,
  style,
  icon,
  duration,
  placement,
});

export const validateNotification = (notification) => {
  if (!notification.message) {
    throw new Error("Notification must have a message");
  }
  return notification;
};
