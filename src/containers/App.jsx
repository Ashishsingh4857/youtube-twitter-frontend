import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  SignUp,
  Layout,
  ProtectedRoute,
  PublicRoute,
  StudioLayout,
  EditProfile,
  VideoTable,
  EditVideo,
} from "../components/index.js";
import {
  HomePage,
  VideoDetail,
  Channel,
  ProfileCustomization,
  ContentManagement,
} from "../pages/index.js";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../store/slices/authSlice.js";
import { ToastContainer } from "react-toastify";

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
          <Route
            path="channel/:username"
            element={
              <ProtectedRoute>
                <Channel />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/watch/:videoId"
          element={
            <ProtectedRoute>
              <VideoDetail />
            </ProtectedRoute>
          }
        />
        {/* studio */}
        <Route path="/studio/:username" element={<StudioLayout />}>
          <Route path="customization" element={<ProfileCustomization />}>
            <Route path="profile" element={<EditProfile />} />
            <Route path="home-tab" element={<EditProfile />} />
          </Route>
          <Route path="content" element={<ContentManagement />}>
            <Route path="videos" element={<VideoTable />} />
            <Route path="videos/edit/:videoId" element={<EditVideo />} />
          </Route>
        </Route>

        {/* auth */}
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
      <ToastContainer
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: {
              borderRadius: "0",
              color: "green",
            },
          },
          duration: 2000,
        }}
      />
    </>
  );
}

export default App;
