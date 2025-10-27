// PublicRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const authStatus = useSelector((state) => state.auth.status);

  if (authStatus) {
    return <Navigate to="/" replace />; // redirect to home page if already logged in
  }

  return <>{children}</>;
}

export default PublicRoute;
