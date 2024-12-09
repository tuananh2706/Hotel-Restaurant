import { createContext, useContext, useEffect, useState } from "react";
import {
  authenticateUser,
  changeInformations,
  changePassword,
  deleteAccount,
  getAllCounts,
  getInforUser,
  registerAdmin,
  registerOwnerHotels,
  registerUser,
} from "../service/authService";
import { useGlobalContext } from ".";
import { refreshTokenfnc } from "../service/tokenService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, SetUser] = useState(null);
  const [isHavedAccount, setIsHavedAccount] = useState(false);
  const { setLoading, setNotification, isTokenExpired, handleExpiryDate } =
    useGlobalContext();

  useEffect(() => {
    const checkAuthenticaiton = async () => {
      const storeAccessToken = localStorage.getItem("AT");
      const storeExpiryDate = localStorage.getItem("ED");
      const expiryDate = new Date(storeExpiryDate);
      const currentDate = new Date();

      //Trường hợp kiểm tra chưa đăng nhập
      if (!storeAccessToken || !storeExpiryDate) {
        setIsHavedAccount(false);
        return;
      }
      // Trường hợp accessToken quá hạn
      if (expiryDate < currentDate) {
        setNotification("Vui lòng đăng nhập lại");
        localStorage.removeItem("AT");
        localStorage.removeItem("ED");
        localStorage.removeItem("accountName");
        Cookies.remove("token");
        setIsHavedAccount(false);
        return;
      }
      // Sau khi giải mã token thì nếu hết hạn sẽ gọi hàm refresh
      if (isTokenExpired(storeAccessToken)) {
        await getNewRefreshToken();
      }
      setIsHavedAccount(true);
      const accessToken = localStorage.getItem("AT");
      await fetchUser(accessToken);
    };
    checkAuthenticaiton();
  }, []);
  //Đăng nhập
  const login = async (loginRequest) => {
    try {
      setLoading(true);
      const response = await authenticateUser({
        emailOrUserName: loginRequest.emailOrUserName,
        password: loginRequest.password,
      });
      const { accessToken, refreshToken, expiryDate, account } = response;
      localStorage.setItem("AT", accessToken);
      localStorage.setItem("ED", expiryDate);
      localStorage.setItem("accountName", account.accountName);
      const expiryDateTime = handleExpiryDate(expiryDate);
      Cookies.set("token", refreshToken, {
        expires: expiryDateTime,
      });

      SetUser(account);
      setIsHavedAccount(true);
      return response;
    } catch (error) {
      console.error(
        "Đã có lỗi xảy ra trong quá trình đăng nhập: ",
        error.message
      );
    } finally {
      setLoading(false);
    }
  };
  //Đăng ký
  const register = async (registerRequest) => {
    try {
      setLoading(true);
      const response = await registerUser({
        accountName: registerRequest.userName,
        email: registerRequest.email,
        password: registerRequest.password,
        firstName:
          (registerRequest.firstName && registerRequest.firstName) || "",
        lastName: (registerRequest.lastName && registerRequest.lastName) || "",
      });
      setNotification(response);
      return response;
    } catch (error) {
      console.error("Đã có lỗi trong lúc đăng ký: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const registerAccountAdmin = async (registerAdminRequest) => {
    try {
      setLoading(true);
      await registerAdmin(registerAdminRequest);
      return true;
    } catch (error) {
      console.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const registerAccountOwner = async (registerRequest) => {
    try {
      setLoading(true);
      await registerOwnerHotels(registerRequest);
      return true;
    } catch (error) {
      console.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };
  // FetchUser
  const fetchUser = async (accessToken) => {
    try {
      if (accessToken) {
        const response = await getInforUser(accessToken);
        const { token, user } = response;
        SetUser(user);
        localStorage.setItem("AT", token);
      }
    } catch (error) {
      console.error(
        "Đã có lỗi xảy ra trong quá trình fetchUser: ",
        error.message
      );
    }
  };

  const getNewRefreshToken = async () => {
    try {
      const response = await refreshTokenfnc();
      const { refreshToken, token, expiryDate } = response;
      localStorage.setItem("AT", token);
      localStorage.setItem("ED", expiryDate);
      const expiryDateTime = handleExpiryDate(expiryDate);
      Cookies.set("token", refreshToken, {
        expires: expiryDateTime,
      });
      await fetchUser(token);
    } catch (err) {
      console.error("Đã có lỗi xảy ra: ", err.message);
    }
  };

  const changePasswordUser = async (changePasswordRequest) => {
    try {
      const accountName = localStorage.getItem("accountName");
      const accessToken = localStorage.getItem("AT");
      const response = await changePassword(
        changePasswordRequest,
        accountName,
        accessToken
      );
      setNotification(response);
      return response;
    } catch (error) {
      console.error("Đã có lỗi xảy ra ở thay đổi passowrd: ", error.message);
    }
  };

  const changeInformationsUser = async (request, account) => {
    try {
      let accountName = "";
      if (!account) {
        accountName = localStorage.getItem("accountName");
      } else {
        accountName = account;
      }
      const accessToken = localStorage.getItem("AT");
      const response = await changeInformations(
        request,
        accountName,
        accessToken
      );
      await fetchUser(accessToken);
      setNotification(response);
      return response;
    } catch (error) {
      console.error("Đã có lỗi xảy ra ở thay đổi passowrd: ", error.message);
    }
  };

  const fetchAccounts = async () => {
    try {
      const accessToken = localStorage.getItem("AT");
      const response = await getAllCounts(accessToken);
      return response;
    } catch (error) {
      console.error(
        "Đã có lỗi xảy ra khi thay đổi password: ",
        error.response || error.message
      );
    }
  };

  const removeAccount = async (accountName) => {
    try {
      const accessToken = localStorage.getItem("AT");
      await deleteAccount(accountName, accessToken);
      return true;
    } catch (error) {
      console.error(
        "Đã có lỗi xảy ra khi thay đổi password: ",
        error.response || error.message
      );
    }
  };

  const logOut = () => {
    setIsHavedAccount(false);
    SetUser(null);

    localStorage.removeItem("AT");
    localStorage.removeItem("ED");
    localStorage.removeItem("accountName");

    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isHavedAccount,
        register,
        fetchUser,
        login,
        changePasswordUser,
        changeInformationsUser,
        fetchAccounts,
        removeAccount,
        registerAccountAdmin,
        registerAccountOwner,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
