import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../../store/slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logo, Input, Button } from "../index.js";
import LoginSkeleton from "../../skeleton/loginSkeleton.jsx";
// Login component
function Login() {
  // Use react-hook-form to manage form state and validation
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get loading state from Redux store
  const loading = useSelector((state) => state.auth?.loading);

  // Submit function to handle form submission
  const submit = async (data) => {
    try {
      // Check if username is an email or not
      const isEmail = data.username.includes("@");

      // Prepare login data based on whether username is an email or not
      const loginData = isEmail
        ? { email: data.username, password: data.password }
        : data;

      // Dispatch userLogin action to login user
      const response = await dispatch(userLogin(loginData));

      // Dispatch getCurrentUser action to get current user data
      const user = await dispatch(getCurrentUser());

      // If user is logged in successfully, navigate to home page
      if (user && response?.payload) {
        navigate("/");
      }
    } catch (error) {
      // Log any errors that occur during login
      console.error(error);
    }
  };

  // If loading state is true, render LoginSkeleton component
  if (loading) {
    return <LoginSkeleton />;
  }

  return (
    <div className="w-full min-h-screen text-white p-3 flex justify-center items-center bg-gray-900 md:items-start md:p-6 lg:p-12">
      <div className="flex max-w-md flex-col space-y-5 justify-center items-center border border-slate-600 p-3 md:p-6 lg:p-8 mt-10 md:mt-20 rounded-lg shadow-lg bg-gray-800 w-full">
        <div className="flex items-center gap-2 mt-5">
          <Logo />
        </div>
        <form onSubmit={handleSubmit(submit)} className="space-y-5 p-2 w-full">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Username / Email:</label>
            <Input
              type="text"
              placeholder="example@gmail.com"
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("username", {
                required: "username is required",
              })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Password:</label>
            <Input
              type="password"
              placeholder="1kd074fjw0"
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full p-3 rounded-lg bg-purple-500 hover:bg-purple-700 text-lg font-medium"
          >
            Login
          </Button>
          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              className="text-purple-400 cursor-pointer hover:text-purple-600"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
