// components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./usercontext";

const ProtectedRoute = ({ children }) => {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return <LoadingSpinner />; // or null
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
