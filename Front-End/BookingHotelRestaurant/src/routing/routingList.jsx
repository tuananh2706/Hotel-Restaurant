import { createBrowserRouter } from "react-router-dom";
import PageLayout from "./pageLayout";
import HomePage from "../pages/homePage";
import ProfilePage from "../pages/profile";
import Favourite from "../pages/profile/tabs/favourite";
import Booking from "../pages/profile/tabs/booking";
import Payment from "../pages/profile/tabs/payment";
import ReviewRaiting from "../pages/profile/tabs/reviewRaiting";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import ChangePassword from "../pages/profile/tabs/changePassword";
import ChangeInformations from "../pages/profile/tabs/changeInformations";
import Hotels from "../pages/hotels";
import HotelDetail from "../pages/hotels/hotelsDetail";
import AdminPage from "../pages/admin/mainAdmin";
import Dashboard from "../pages/admin/mainAdmin/dashboard";
import Accounts from "../pages/admin/mainAdmin/accounts";
import HotelsManagement from "../pages/admin/mainAdmin/hotelsManagement";
import Bookings from "../pages/admin/mainAdmin/bookings";
import ReviewsManagement from "../pages/admin/mainAdmin/reviewsManagement";
import HotelsManagementDetail from "../pages/admin/mainAdmin/hotelsManagement/hotelsManagementDetail";
import CreateHotelForm from "../pages/admin/mainAdmin/hotelsManagement/createHotel";
import { AuthRoute, ProtectedRoute } from "./authRoute";
import ErrorPage from "./errorPage";
import OwnerManagement from "../pages/admin/subAdmin";
import OwnerDashboard from "../pages/admin/mainAdmin/dashboard";
import OwnerHotelManagement from "../pages/admin/subAdmin/tabs/hotelManagement";
import OwnerBookingManagement from "../pages/admin/subAdmin/tabs/bookingManagement";
import OwnerChangeInformations from "../pages/admin/subAdmin/tabs/changleInfomation";
import OwnerChangePassword from "../pages/admin/subAdmin/tabs/changePassword";
import PendingHotels from "../pages/admin/mainAdmin/hotelsManagement/pendingHotels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute requiredRole={["Admin", "hotel_owner", "User"]}>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Favourite />,
          },
          { path: "favorite", element: <Favourite /> },
          {
            path: "booking",
            element: <Booking />,
          },
          {
            path: "payment",
            element: <Payment />,
          },
          {
            path: "review",
            element: <ReviewRaiting />,
          },
          {
            path: "changePassword",
            element: <ChangePassword />,
          },
          {
            path: "changeInformations",
            element: <ChangeInformations />,
          },
        ],
      },
      {
        path: "login",
        element: (
          <AuthRoute>
            <LoginPage />
          </AuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <AuthRoute>
            <RegisterPage />
          </AuthRoute>
        ),
      },
      {
        path: "hotels",
        element: <Hotels />,
      },
      {
        path: "hotels/:id",
        element: <HotelDetail />,
      },
      {
        path: "management",
        element: (
          <ProtectedRoute requiredRole={["Admin"]}>
            <AdminPage />,
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "accounts",
            element: <Accounts />,
          },
          {
            path: "hotels",
            element: <HotelsManagement />,
            children: [
              {
                path: ":id",
                element: (
                  <ProtectedRoute requiredRole={"Admin"}>
                    <HotelsManagementDetail />
                  </ProtectedRoute>
                ),
              },
              { path: "create-hotel", element: <CreateHotelForm /> },
            ],
          },
          { path: "hotels/pending-hotels", element: <PendingHotels /> },
          {
            path: "bookings",
            element: <Bookings />,
          },
          {
            path: "reviews",
            element: <ReviewsManagement />,
          },
        ],
      },
      {
        path: "ownerManagement",
        element: (
          <ProtectedRoute requiredRole={"hotel_owner"}>
            <OwnerManagement />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <OwnerDashboard /> },
          {
            path: "hotels",
            element: <OwnerHotelManagement />,
            children: [
              {
                path: ":id",
                element: (
                  <ProtectedRoute requiredRole={"hotel_owner"}>
                    <HotelsManagementDetail />
                  </ProtectedRoute>
                ),
              },
              { path: "create-hotel", element: <CreateHotelForm /> },
            ],
          },
          { path: "booking", element: <OwnerBookingManagement /> },
          { path: "infomation", element: <OwnerChangeInformations /> },
          { path: "changlePassword", element: <OwnerChangePassword /> },
        ],
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
