import { create } from "zustand";
import CheckIcon from "@mui/icons-material/Check";
// Define the Zustand store
const useNotificationStore = create((set, get) => ({
  // State to store the notification API instance
  api: null,

  // Function to initialize the notification API and store it in the state
  initializeApi: (apiInstance) => set({ api: apiInstance }),

  /**
   * Function to trigger a notification.
   *
   * @param {Object} params - Parameters for the notification.
   * @param {string} params.message - The title of the notification.
   * @param {string} params.description - The content of the notification.
   * @param {Object} [params.notificationStyle] - Optional styles to apply to the notification.
   *
   * This function checks if the notification API has been initialized.
   * If the API is available, it triggers a notification with the provided parameters.
   * If the API is not initialized, it logs an error and throws an exception.
   */
  triggerNotification: ({
    message,
    description,
    notificationStyle,
    iconOptions,
  }) => {
    // Get the current API instance from the state
    const api = get().api;

    // Check if the API is initialized
    if (api) {
      // Trigger the notification with the provided parameters
      api.open({
        message: message || null,
        description: description || null,
        className: "notificationStyle", // Optional class name for custom styling
        style: notificationStyle || { width: 600 }, // Apply custom or default styles
        placement: "bottomRight",
        icon: iconOptions || (
          <CheckIcon
            className="notificationStyle__icon"
            style={{
              color: "#07CB3E",
              strokeWidth: "2px",
              stroke: "currentColor",
            }}
          />
        ),
      });
    } else {
      // Log an error and throw an exception if the API is not initialized
      console.error("Notification API is not initialized.");
      throw new Error("Notification API is not initialized.");
    }
  },
}));

export default useNotificationStore;
