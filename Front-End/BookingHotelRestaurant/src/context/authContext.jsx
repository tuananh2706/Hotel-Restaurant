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
import { getNotifications } from "../service/notificationsService";
import {
  getFavoriteHotelsAsync,
  toggleFavoriteUserAsync,
} from "../service/favoriteService";
import { changeBankCard, getBankCard } from "../service/bankCardService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, SetUser] = useState(null);
  const [isHavedAccount, setIsHavedAccount] = useState(false);
  const [notificationUser, setNotificationUser] = useState([]);
  const [favoriteHotelsUser, setFavoriteHotelsUser] = useState([]);
  const [reviewsUser, setReviewsUser] = useState([]);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [bankCardUser, setBankCardUser] = useState([]);
  const [ownedHotelsUser, setOwnedHotelsUser] = useState([]);

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

  const fetchNotifications = async () => {
    try {
      const accessToken = localStorage.getItem("AT");
      if (!accessToken) {
        console.error("Không tìm thấy accessToken");
        return;
      }
      const data = await getNotifications(accessToken);
      setNotificationUser(data);
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
    }
  };

  useEffect(() => {
    if (isHavedAccount) {
      fetchNotifications();

      const intervalId = setInterval(fetchNotifications, 30000); // Định kì 10s 1 lần

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isHavedAccount]);

  useEffect(() => {
    const unRead = notificationUser?.filter((n) => !n.isRead).length || 0;
    setTotalNotifications(unRead);
  }, [notificationUser, totalNotifications]);
  //Đăng nhập
  const login = async (loginRequest) => {
    try {
      setLoading(true);
      const response = await authenticateUser({
        emailOrUserName: loginRequest.emailOrUserName,
        password: loginRequest.password,
      });
      const {
        accessToken,
        refreshToken,
        expiryDate,
        account,
        notification,
        favoriteHotels,
        reviews,
        bankCard,
        ownedHotels,
      } = response;
      localStorage.setItem("AT", accessToken);
      localStorage.setItem("ED", expiryDate);
      localStorage.setItem("accountName", account.accountName);
      const expiryDateTime = handleExpiryDate(expiryDate);
      Cookies.set("token", refreshToken, {
        expires: expiryDateTime,
      });

      SetUser(account);
      setIsHavedAccount(true);
      setNotificationUser(notification);
      setFavoriteHotelsUser(favoriteHotels);
      setReviewsUser(reviews);
      setBankCardUser(bankCard);
      setOwnedHotelsUser(ownedHotels);

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
        const {
          token,
          user,
          notification,
          favoriteHotels,
          reviews,
          bankCard,
          ownedHotels,
        } = response;
        SetUser(user);
        localStorage.setItem("AT", token);
        setNotificationUser(notification);
        setFavoriteHotelsUser(favoriteHotels);
        setReviewsUser(reviews);
        setBankCardUser(bankCard);
        setOwnedHotelsUser(ownedHotels);
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
    setTotalNotifications(0);
    setNotificationUser([]);

    localStorage.removeItem("AT");
    localStorage.removeItem("ED");
    localStorage.removeItem("accountName");

    Cookies.remove("token");
  };

  const fetchBankCard = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("AT");
      const response = await getBankCard(accessToken);
      setBankCardUser(response);
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const fetchFavoritesUser = async () => {
    try {
      const accessToken = localStorage.getItem("AT");
      const response = await getFavoriteHotelsAsync(accessToken);
      setFavoriteHotelsUser(response);
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
    }
  };

  const handleChangeBankCard = async (payload) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("AT");
      const response = await changeBankCard(accessToken, payload);
      return response;
    } catch (error) {
      console.error("Đã có lỗi xảy ra!");
    }
  };

  const toggleFavoriteUser = async (id) => {
    try {
      const accessToken = localStorage.getItem("AT");
      const response = await toggleFavoriteUserAsync(id, accessToken);
      await fetchFavoritesUser();
    } catch (error) {
      console.error("Đã có lỗi xảy ra!");
    }
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
        logOut,
        notificationUser,
        favoriteHotelsUser,
        reviewsUser,
        totalNotifications,
        setTotalNotifications,
        fetchNotifications,
        toggleFavoriteUser,
        fetchFavoritesUser,
        fetchBankCard,
        handleChangeBankCard,
        bankCardUser,
        ownedHotelsUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
