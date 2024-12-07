import { apiClient } from "../api/apiClient";

export const getHotels = async (query) => {
  try {
    const response = await apiClient.get(`/Hotel/GetHotels?${query}`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra getHotels : ", error.message);
    throw error;
  }
};

export const getAllHotels = async (query) => {
  try {
    const response = await apiClient.get(`/Hotel/GetAllHotels?${query}`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra getAllHotels : ", error.message);
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

export const createHotel = async (payload) => {
  try {
    const response = await apiClient.post(
      "/Hotel/createHotel",
      JSON.stringify(payload)
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở get by id: ", error.message);
    throw error;
  }
};

export const disableHotel = async (id) => {
  try {
    const response = await apiClient.put(`/Hotel/${id}/deactivate`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở get by id: ", error.message);
    throw error;
  }
};

export const activateHotel = async (id) => {
  try {
    const response = await apiClient.put(`/Hotel/${id}/activate`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở get by id: ", error.message);
    throw error;
  }
};
