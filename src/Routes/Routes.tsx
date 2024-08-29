import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Login from "../Shared/Auth/Login";
import Signup from "../Shared/Auth/Signup";
import TermsOfService from "../Shared/Policies/TermsOfService";
import PrivacyPolicy from "../Shared/Policies/PrivacyPolicy";
import CookiePolicy from "../Shared/Policies/CookiePolicy";
import Error from "../pages/Error/Error";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ProtectedRoute from "../layout/ProtectedRoute";
import CarDetailsPage from "../pages/Booking/CarDetails";
import CarListingPage from "../pages/Booking/CarListing";
import ForgetPassword from "../Shared/Auth/ForgetPassword";
import ResetPassword from "../Shared/Auth/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cars",
        element: <CarListingPage />,
      },
      {
        path: "/car/:id",
        element: <CarDetailsPage />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/cookie-policy",
        element: <CookiePolicy />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
