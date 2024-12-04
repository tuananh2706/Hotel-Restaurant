import { apiClient } from "../api/apiClient";

export const createReview = async (payload) => {
  try {
    const response = await apiClient.post(
      "/HotelReview",
      JSON.stringify(payload)
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở createReview: ", error.message);
    throw error;
  }
};

export const editReview = async (payload, id) => {
  try {
    const response = await apiClient.put(
      `/HotelReview/${id}`,
      JSON.stringify(payload)
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở editReview: ", error.message);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await apiClient.delete(`/HotelReview/${id}`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở deleteReview: ", error.message);
    throw error;
  }
};
