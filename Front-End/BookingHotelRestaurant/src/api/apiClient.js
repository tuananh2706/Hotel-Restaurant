import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.1.211:5000/api", // Thay port khi thay đổi máy server
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthorizationHeader = (accessToken) => {
  if (accessToken) {
    apiClient.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete apiClient.defaults.headers["Authorization"];
  }
};

export { apiClient, setAuthorizationHeader };
