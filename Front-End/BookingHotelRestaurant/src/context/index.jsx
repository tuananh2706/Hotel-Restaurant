import { createContext, useContext, useEffect, useState } from "react";
import { AuthProvider } from "./authContext";
import { jwtDecode } from "jwt-decode";
import { HotelProvider, HotelsContext } from "./hotelsContext";
import { ReviewProvider } from "./reviewContext";

const GobalContext = createContext();
export const GobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const handleExpiryDate = (expiryDate) => {
    const now = Date.now();
    const expirationDate = Date(expiryDate);
    const timeDifference = now - expirationDate;
    const daysUntilExpiry = timeDifference / (1000 * 60 * 60 * 24);
    return daysUntilExpiry;
  };

  function formatCurrency(amount) {
    if (amount) {
      // Chuyển số thành chuỗi và thêm dấu phân cách mỗi 3 chữ số
      const formattedAmount = amount.toLocaleString("vi-VN");

      // Trả về kết quả với đơn vị "VNĐ"
      return `${formattedAmount} VNĐ`;
    } else {
      return 0;
    }
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo ngày có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, cần cộng thêm 1
    const year = String(date.getFullYear()); // Lấy 2 chữ số cuối của năm

    return `${day}/${month}/${year}`;
  }

  function formatDate2(date) {
    const converDate = new Date(date);
    const day = String(converDate.getUTCDate()).padStart(2, "0");
    const month = String(converDate.getUTCMonth() + 1).padStart(2, "0");
    const year = String(converDate.getUTCFullYear());

    return `${day}/${month}/${year}`;
  }

  const buildQueryString = (query) => {
    const queryParams = Object.entries(query)
      .filter(([key, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
    return queryParams.join("&");
  };

  // Hàm tính toán token
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Tính thời gian theo giây
      return decoded.exp < currentTime; // Kiểm tra nếu token hết hạn
    } catch (error) {
      return true;
    }
  };
  return (
    <GobalContext.Provider
      value={{
        loading,
        formatDate,
        setLoading,
        notification,
        setNotification,
        isTokenExpired,
        handleExpiryDate,
        formatCurrency,
        formatDate2,
        buildQueryString,
      }}
    >
      <AuthProvider>
        <HotelProvider>
          <ReviewProvider>{children}</ReviewProvider>
        </HotelProvider>
      </AuthProvider>
    </GobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GobalContext);
export const useHotels = () => useContext(HotelsContext);
export const getCookie = (name) => {
  const cookieArr = document.cookie.split(",");
  for (let cookie of cookieArr) {
    const [key, value] = cookie.trim().split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
};
