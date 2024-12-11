import { Navigate, useLocation, useParams } from "react-router-dom";
import { useGlobalContext, useHotels } from "../context"; // Giả sử bạn đang dùng context để quản lý thông tin người dùng
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

// Route bảo vệ dành cho trang Login/Register
function AuthRoute({ children }) {
  const { getUserRole } = useGlobalContext();
  const role = getUserRole();

  if (role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Route bảo vệ cho các trang yêu cầu quyền (profile, admin)
function ProtectedRoute({ children, requiredRole }) {
  const { getUserRole } = useGlobalContext();
  const { ownedHotelsUser } = useAuth();
  const role = getUserRole();
  const location = useLocation();
  const { id } = useParams();
  const [userHotels, setUserHotels] = useState([]);
  useEffect(() => {
    if (ownedHotelsUser) {
      setUserHotels(ownedHotelsUser);
    }
  }, [ownedHotelsUser]);

  if (!role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !requiredRole.includes(role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (role === "hotel_owner" && id) {
    const hotelOwnerUser = userHotels.some(
      (hotel) => hotel.id === parseInt(id)
    );

    if (!hotelOwnerUser) {
      return (
        <Navigate
          to="/ownerManagement/hotels"
          state={{ from: location }}
          replace
        />
      );
    }
  }

  return children;
}

export { AuthRoute, ProtectedRoute };
