import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user || user === null) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default RoleBasedRoute;
