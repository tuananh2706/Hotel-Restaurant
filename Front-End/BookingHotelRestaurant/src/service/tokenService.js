import { apiClient } from "../api/apiClient";
import Cookies from "js-cookie";

export const refreshTokenfnc = async () => {
  try {
    const refreshTokenRequest = Cookies.get("token");

    if (!refreshTokenRequest) {
      throw new Error("Không tìm thấy refresh token");
    }

    const accountName = localStorage.getItem("accountName");

    if (!accountName) {
      throw new Error("Không tìm thấy account name");
    }

    const response = await apiClient.post("/Token/refresh-token", {
      accountName: accountName,
      refreshToken: refreshTokenRequest,
    });

    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra: ", error.response || error.message);
    throw error;
  }
};
