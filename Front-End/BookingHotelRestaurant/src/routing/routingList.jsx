import { createBrowserRouter } from "react-router-dom";
import PageLayout from "./pageLayout";
import HomePage from "../pages/homePage";
import ProfilePage from "../pages/profile";
import Favourite from "../pages/profile/tabs/favourite";
import Booking from "../pages/profile/tabs/booking";
import Payment from "../pages/profile/tabs/payment";
import ReviewRaiting from "../pages/profile/tabs/reviewRaiting";
import SavedAddress from "../pages/profile/tabs/savedAddress";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import ChangePassword from "../pages/profile/tabs/changePassword";
import ChangeInformations from "../pages/profile/tabs/changeInformations";

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
        element: <ProfilePage />,
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
            path: "addressSaved",
            element: <SavedAddress />,
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
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
