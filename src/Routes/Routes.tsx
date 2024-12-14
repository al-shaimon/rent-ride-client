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
import UserDashboard from "../pages/Dashboard/User/UserDashboard";

import ProtectedRoute from "../layout/ProtectedRoute";
import CarDetailsPage from "../pages/Cars/CarDetails";
import CarListingPage from "../pages/Cars/CarListing";
import ForgetPassword from "../Shared/Auth/ForgetPassword";
import ResetPassword from "../Shared/Auth/ResetPassword";
import UserOverview from "../pages/Dashboard/User/UserOverview";
import BookingManagement from "../pages/Dashboard/User/BookingManagement";
import PaymentManagement from "../pages/Dashboard/User/PaymentManagement";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import ManageCars from "../pages/Dashboard/Admin/ManageCars";
import ManageBookings from "../pages/Dashboard/Admin/ManageBookings";
import ManageReturnCars from "../pages/Dashboard/Admin/ManageReturnCars";
import UserManagement from "../pages/Dashboard/Admin/UserManagement";
import Booking from "../pages/Booking/Booking";
import BookingCarDetails from "../pages/Booking/BookingCarDetails";
import Confirmation from "../pages/Booking/Confirmation";

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
        path: "/booking",
        element: (
          <ProtectedRoute role={["user", "admin"]}>
            <Booking />
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking/:id",
        element: (
          <ProtectedRoute role={["user", "admin"]}>
            <BookingCarDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/confirmation",
        element: (
          <ProtectedRoute role={["user", "admin"]}>
            <Confirmation />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <UserOverview />,
          },
          {
            path: "bookings",
            element: <BookingManagement />,
          },
          {
            path: "payments",
            element: <PaymentManagement />,
          },
        ],
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <AdminOverview />,
          },
          {
            path: "manage-cars",
            element: <ManageCars />,
          },
          {
            path: "manage-bookings",
            element: <ManageBookings />,
          },
          {
            path: "manage-return-cars",
            element: <ManageReturnCars />,
          },
          {
            path: "user-management",
            element: <UserManagement />,
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
