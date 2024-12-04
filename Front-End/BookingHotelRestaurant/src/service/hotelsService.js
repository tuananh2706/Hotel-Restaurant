import { apiClient } from "../api/apiClient";

export const getHotels = async (query) => {
  try {
    const response = await apiClient.get(`/Hotel/GetHotels?${query}`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra: ", error.message);
    throw error;
  }
};

export const getHotelsById = async (id) => {
  try {
    const response = await apiClient.get(`/Hotel/${id}`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở get by id: ", error.message);
    throw error;
  }
};
