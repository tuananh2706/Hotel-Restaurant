import { apiClient, setAuthorizationHeader } from "../api/apiClient";

export const getBankCard = async (accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.get("/BankCard");
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở getBankCard: ", error.message);
  }
};

export const changeBankCard = async (accessToken, payload) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.put("/BankCard", JSON.stringify(payload));
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở changeBankCard: ", error.message);
  }
};

export const deleteBankCard = async (accessToken, id) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.delete(`/BankCard/${id}`);
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra ở changeBankCard: ", error.message);
  }
};
