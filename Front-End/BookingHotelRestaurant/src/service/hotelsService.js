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

export const editInfoHotels = async (id, payload) => {
  try {
    const response = await apiClient.put(
      `/Hotel/${id}`,
      JSON.stringify(payload)
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra editInfoHotels: ", error.message);
  }
};

export const editRoomTypes = async (payload) => {
  try {
    const response = await apiClient.put(
      "/RoomType/update-room-types",
      JSON.stringify(payload)
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra editRoomTypes: ", error.message);
  }
};

export const deleteRoomTypeAsync = async (id) => {
  try {
    const response = await apiClient.delete(`/RoomType/${id}`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra deleteRoomType: ", error.message);
  }
};

export const deleteRoomAsync = async (id) => {
  try {
    const response = await apiClient.delete(`/Room/${id}`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra deleteRoomType: ", error.message);
  }
};

export const editInfoServicesAsync = async (payload) => {
  try {
    const response = await apiClient.put("/Service", JSON.stringify(payload));
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở editInfoServicesAsync", error.message);
  }
};

export const deleteServiceAsync = async (id) => {
  try {
    const response = await apiClient.delete(`/Service/${id}`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra deleteServiceAsync", error.message);
  }
};

export const deleteImageServiceAsync = async (serviceId, id) => {
  try {
    const response = await apiClient.delete(
      `/Service/${serviceId}/image/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra deleteImageServiceAsync", error.message);
  }
};
