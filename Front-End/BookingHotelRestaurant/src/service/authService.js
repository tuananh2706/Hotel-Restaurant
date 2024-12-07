import { apiClient, setAuthorizationHeader } from "../api/apiClient";

export const authenticateUser = async (loginRequest) => {
  try {
    const response = await apiClient.post(
      "/Account/login",
      JSON.stringify(loginRequest)
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra: ", error.reponse || error.message);
  }
};

export const registerUser = async (registerRequest) => {
  try {
    const response = await apiClient.post(
      "/Account/register",
      JSON.stringify(registerRequest)
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra: ", error.response || error.message);
    throw error;
  }
};

export const registerAdmin = async (registerRequest) => {
  try {
    const response = await apiClient.post(
      "/Account/registerAdmin",
      JSON.stringify(registerRequest)
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra: ", error.response || error.message);
    throw error;
  }
};

export const getInforUser = async (accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.get("/Account/user");
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra: ", error.response || error.message);
    throw error;
  }
};

export const changePassword = async (
  changePasswordRequest,
  accountName,
  accessToken
) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.put(
      `/Account/${accountName}/changepassword`,
      JSON.stringify(changePasswordRequest)
    );
    return response.data;
  } catch (error) {
    console.error(
      "Đã có lỗi xảy ra khi thay đổi password: ",
      error.response || error.message
    );
  }
};

export const changeInformations = async (request, accountName, accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.put(
      `/Account/${accountName}`,
      JSON.stringify(request)
    );
    return response.data;
  } catch (error) {
    console.error(
      "Đã có lỗi xảy ra khi thay đổi password: ",
      error.response || error.message
    );
  }
};

// get all account for admin
export const getAllCounts = async () => {
  try {
    // setAuthorizationHeader(accessToken);
    const response = await apiClient.get("/Account/AllAccount");
    return response.data;
  } catch (error) {
    console.error(
      "Đã có lỗi xảy ra khi thay đổi password: ",
      error.response || error.message
    );
  }
};

export const deleteAccount = async (accountName) => {
  try {
    const response = await apiClient.delete(`/Account/${accountName}`);
    return response.data;
  } catch (error) {
    console.error(
      "Đã có lỗi xảy ra khi thay đổi password: ",
      error.response || error.message
    );
  }
};
