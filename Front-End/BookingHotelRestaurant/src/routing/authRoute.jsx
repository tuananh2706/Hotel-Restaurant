import { Navigate, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../context';  // Giả sử bạn đang dùng context để quản lý thông tin người dùng

// Route bảo vệ dành cho trang Login/Register
function AuthRoute({ children }) {
  const { getUserRole } = useGlobalContext();
  const role = getUserRole();
  const location = useLocation();

  // Nếu người dùng đã đăng nhập (có role), chuyển hướng về trang chủ
  if (role) {
    return <Navigate to="/" replace />;
  }

  return children;  // Nếu chưa đăng nhập, cho phép truy cập vào trang login/register
}

// Route bảo vệ cho các trang yêu cầu quyền (profile, admin)
function ProtectedRoute({ children, requiredRole }) {
  const { getUserRole } = useGlobalContext();
  const role = getUserRole();
  const location = useLocation();

  // Nếu người dùng chưa đăng nhập, chuyển hướng đến login
  if (!role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu người dùng không có quyền truy cập, chuyển hướng về trang chủ
  if (requiredRole && !requiredRole.includes(role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;  // Nếu người dùng có quyền hợp lệ, hiển thị trang con
}

export { AuthRoute, ProtectedRoute };
