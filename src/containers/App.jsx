import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, SignUp, Layout } from "../components/index.js";
import { HomePage } from "../pages/index.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
