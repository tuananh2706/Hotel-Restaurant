import { apiClient, setAuthorizationHeader } from "../api/apiClient";

export const getNotifications = async (accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.get("/Notification");
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở getNotifications", error.message);
  }
};

export const markAllRead = async (accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.put("/Notification/mark-all-read");
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra markAllRead : ", error.message);
  }
};
