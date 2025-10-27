import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// this components checks if the user is logged in and redirects them to the login page if not
function ProtectedRoute({ children }) {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [navigate, authStatus]);

  return <>{children}</>;
}

export default ProtectedRoute;
