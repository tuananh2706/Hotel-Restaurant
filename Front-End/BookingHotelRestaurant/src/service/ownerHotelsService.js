import { apiClient, setAuthorizationHeader } from "../api/apiClient";

export const getHotelsOwner = async (accountName, accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.get(`/Owner/${accountName}`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở getHotelsOwner: ", error.message);
  }
};

export const suspend = async (accountName, hotelId, accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.put(
      `/Owner/hotels/${hotelId}/suspend?accountName=${accountName}`
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở suspend: ", error.message);
  }
};

export const activate = async (accountName, hotelId, accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.put(
      `/Owner/hotels/${hotelId}/activate?accountName=${accountName}`
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở activate: ", error.message);
  }
};
