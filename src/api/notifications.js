import axiosInstance from "./axios";

export const fetchUserNotifications = async () => {
  try {
    const response = await axiosInstance.get(
      "/notifications/user-notifications"
    );
    console.log(response, "reso");
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
