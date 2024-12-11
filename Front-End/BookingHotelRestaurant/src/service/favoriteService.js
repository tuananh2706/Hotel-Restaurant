import { apiClient, setAuthorizationHeader } from "../api/apiClient";

export const toggleFavoriteUserAsync = async (id, accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.post(`/FavoriteHotels?hotelId=${id}`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra: ", error.message);
  }
};

export const getFavoriteHotelsAsync = async (accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.get("/FavoriteHotels/my-favorites");
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra: ", error.message);
  }
};
