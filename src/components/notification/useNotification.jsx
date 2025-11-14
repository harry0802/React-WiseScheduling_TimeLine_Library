import { useMemo, useCallback } from "react";
import { notification } from "antd"; // Importing notification from antd for displaying notifications
// Importing function for creating a notification repository
import { Icon } from "@iconify/react"; // Importing Icon from @iconify/react for custom icons
import { createNotificationRepository } from "./notificationRepository";
import {
  createNotificationEntity,
  validateNotification,
} from "./notificationEntity";

// Defining constants for notification types
const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Custom hook for managing notifications
const useNotification = () => {
  // Configuration for each notification type, including icon and color
  const NOTIFICATION_CONFIG = useMemo(
    () => ({
      [NOTIFICATION_TYPES.SUCCESS]: {
        icon: "mdi:check-bold",
        color: "#07CB3E",
      },
      [NOTIFICATION_TYPES.ERROR]: { icon: "mdi:alert", color: "#FF4D4F" },
      [NOTIFICATION_TYPES.WARNING]: {
        icon: "mdi:alert-outline",
        color: "#FAAD14",
      },
      [NOTIFICATION_TYPES.INFO]: {
        icon: "mdi:information-outline",
        color: "#1890FF",
      },
    }),
    []
  );

  // Creating a notification repository using useMemo to memoize the creation
  const notificationRepository = useMemo(
    () => createNotificationRepository(notification),
    []
  );

  // Function to create a custom icon for notifications
  const createIcon = useCallback(
    (icon, color) => (
      <Icon
        icon={icon}
        className="notificationStyle__icon"
        style={{
          color,
          strokeWidth: "2px",
          stroke: "currentColor",
        }}
      />
    ),
    []
  );

  // Function to trigger a notification
  const triggerNotification = useCallback(
    (notificationData) => {
      try {
        // Creating and validating a notification entity
        const notificationEntity = createNotificationEntity(notificationData);
        const validatedNotification = validateNotification(notificationEntity);
        // Displaying the notification using the repository
        notificationRepository.display(validatedNotification);
      } catch (error) {
        console.error("Error triggering notification:", error.message);
      }
    },
    [notificationRepository]
  );

  // Function to notify with a specific type
  const notifyWithType = useCallback(
    ({ type, message, description }) => {
      // Getting the configuration for the specified type
      const config = NOTIFICATION_CONFIG[type];
      // Triggering the notification with the type's configuration
      triggerNotification({
        message,
        description,
        icon: createIcon(config.icon, config.color),
        style: { borderLeft: `5px solid ${config.color}` },
        duration: 3,
      });
    },
    [createIcon, triggerNotification]
  );

  // Returning the notification functions
  // This useMemo hook memoizes the notification functions to prevent unnecessary recomputations.
  return useMemo(
    () => ({
      // notify function directly calls triggerNotification to display a notification.
      notify: triggerNotification,
      // notifySuccess function displays a success notification with default or custom messages.
      notifySuccess: (
        message = "Operation successful",
        description = "Operation completed successfully"
      ) =>
        notifyWithType({
          type: NOTIFICATION_TYPES.SUCCESS,
          message,
          description,
        }),
      // notifyError function displays an error notification with default or custom messages.
      notifyError: (
        message = "An error occurred",
        description = "An unexpected error occurred"
      ) =>
        notifyWithType({
          type: NOTIFICATION_TYPES.ERROR,
          message,
          description,
        }),
      // notifyWarning function displays a warning notification with default or custom messages.
      notifyWarning: (
        message = "Please note",
        description = "Please take note of this"
      ) =>
        notifyWithType({
          type: NOTIFICATION_TYPES.WARNING,
          message,
          description,
        }),
      // notifyInfo function displays an info notification with default or custom messages.
      notifyInfo: (
        message = "System information",
        description = "Information about the system"
      ) =>
        notifyWithType({ type: NOTIFICATION_TYPES.INFO, message, description }),
    }),
    [triggerNotification, notifyWithType]
  );
};

export default useNotification;
