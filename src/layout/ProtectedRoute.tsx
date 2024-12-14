import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role: string | string[] | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user: TUser | null = null;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  const dispatch = useAppDispatch();

  if (!token || !user) {
    return <Navigate to="/login" replace={true} />;
  }

  // Check if the user's role matches the required role
  if (role && typeof role === "string" && role !== user.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  // Check if the user's role is within the allowed roles array
  if (role && Array.isArray(role) && !role.includes(user.role as string)) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
