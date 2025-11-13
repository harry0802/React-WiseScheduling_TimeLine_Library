import {
  createNotificationEntity,
  validateNotification,
} from "./notificationEntity";
import { createNotificationRepository } from "./notificationRepository";

export const createNotificationService = (api) => {
  const repository = createNotificationRepository(api);

  return {
    triggerNotification: (notificationData) => {
      const notification = createNotificationEntity(notificationData);
      const validatedNotification = validateNotification(notification);
      repository.display(validatedNotification);
    },
  };
};
