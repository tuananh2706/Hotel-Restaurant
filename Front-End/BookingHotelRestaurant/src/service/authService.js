import { apiClient, setAuthorizationHeader } from "../api/apiClient";

// Login
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

// Đăng ký User
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
// Đăng ký admin
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
// Đăng ký owner Hotels
export const registerOwnerHotels = async (registerRequest) => {
  try {
    const response = await apiClient.post(
      "/Account/register-owner",
      JSON.stringify(registerRequest)
    );
    return response.data;
  } catch (error) {
    console.error("Đã có lỗi xảy ra: ", error.response || error.message);
    throw error;
  }
};

// Lấy thông tin của user
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

// đổi mật khẩu
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

//Thay đổi thông tin cá nhân
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
export const getAllCounts = async (accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.get("/Account/AllAccount");
    return response.data;
  } catch (error) {
    console.error(
      "Đã có lỗi xảy ra khi thay đổi password: ",
      error.response || error.message
    );
  }
};

// xóa tài khoản
export const deleteAccount = async (accountName, accessToken) => {
  try {
    setAuthorizationHeader(accessToken);
    const response = await apiClient.delete(`/Account/${accountName}`);
    return response.data;
  } catch (error) {
    console.error(
      "Đã có lỗi xảy ra khi thay đổi password: ",
      error.response || error.message
    );
  }
};