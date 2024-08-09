import NotificationSlice from "../slice/NotificationSlice.jsx"; // Assuming NotificationSlice is imported from Zustand

function useNotification() {
  const triggerNotification = NotificationSlice(
    (state) => state.triggerNotification
  );

  // Direct functions for common notifications
  const notifySuccess = () => {
    triggerNotification({
      message: "Operation Successful",
      description: "Your action was successfully completed.",
    });
  };

  const notifyError = () => {
    triggerNotification({
      message: "Error Occurred",
      description: "An error occurred while processing your request.",
    });
  };

  const notifyWarning = () => {
    triggerNotification({
      message: "Warning",
      description: "Please check the information you provided.",
    });
  };

  const notifyInfo = () => {
    triggerNotification({
      message: "Information",
      description: "Here is some important information for you.",
    });
  };

  // General notification function for custom messages
  const notify = ({ message, description, notificationStyle }) => {
    try {
      triggerNotification({
        message: message || "Default Notification Title",
        description: description || "",
        notificationStyle,
      });
    } catch (error) {
      console.error("Error triggering notification:", error.message);
    }
  };

  // Return all functions that can be used in the component
  return {
    notify,
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
  };
}

export default useNotification;
