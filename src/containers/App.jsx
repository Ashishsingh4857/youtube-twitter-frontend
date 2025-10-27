import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  SignUp,
  Layout,
  ProtectedRoute,
  PublicRoute,
} from "../components/index.js";
import { HomePage } from "../pages/index.js";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../store/slices/authSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
