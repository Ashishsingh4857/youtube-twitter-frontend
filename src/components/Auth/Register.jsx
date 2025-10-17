import React from "react";
import { Logo, Button, Input, GetImagePreview } from "../index.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createAccount, userLogin } from "../../store/slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignUpSkeleton from "../../skeleton/SignUpSkeleton.jsx";
// signup component
function SignUp() {
  // Use react-hook-form to manage form state and validation
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get loading state from Redux store
  const loading = useSelector((state) => state.auth?.loading);

  // Submit function to handle form submission
  const submit = async (data) => {
    const response = await dispatch(createAccount(data));
    console.log(response);

    if (response?.payload?.success) {
      const username = data?.username;
      const password = data?.password;
      //if user registered successfully then logged in the user
      const loginResult = await dispatch(userLogin({ username, password }));

      if (loginResult?.type === "login/fulfilled") {
        navigate("/terms&conditions");
      } else {
        navigate("/login");
      }
    }
  };

  if (loading) {
    return <SignUpSkeleton />;
  }

  return (
    <div className="w-full min-h-screen text-white p-3 flex justify-center items-center bg-gray-900 md:items-start md:p-6 lg:p-12">
      <div className="flex max-w-md flex-col space-y-5 justify-center items-center border border-slate-600 p-3 md:p-6 lg:p-8 mt-10 md:mt-20 rounded-lg shadow-lg bg-gray-800 w-full">
        <div className="flex items-center gap-2 mt-5">
          <Logo />
        </div>
        <form onSubmit={handleSubmit(submit)} className="space-y-5 p-2 w-full">
          <div className="w-full relative h-28 bg-gray-700 rounded-lg">
            <div className="w-full h-full">
              <GetImagePreview
                name="coverImage"
                control={control}
                className="w-full h-28 object-cover border-none border-slate-900 rounded-lg"
                cameraIcon
              />
              <div className="text-sm absolute right-2 bottom-2 hover:text-purple-500 cursor-default">
                Cover Image
              </div>
            </div>
            <div className="absolute left-2 bottom-2 rounded-full border-2 -mt-20">
              <GetImagePreview
                name="avatar"
                control={control}
                className="object-cover rounded-full h-20 w-20 outline-none"
                cameraIcon={true}
                cameraSize={20}
              />
            </div>
          </div>

          {errors.avatar && (
            <div className="text-red-500">{errors.avatar.message}</div>
          )}
          <Input
            label="Username: "
            type="text"
            placeholder="Enter username"
            {...register("username", {
              required: "username is required",
            })}
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
          <Input
            label="Email: "
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "email is required",
            })}
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <Input
            label="Fullname: "
            type="text"
            placeholder="Enter fullname"
            {...register("fullName", {
              required: "fullName is required",
            })}
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.fullName && (
            <span className="text-red-500">{errors.fullName.message}</span>
          )}
          <Input
            label="Password: "
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "password is required",
            })}
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <Button
            type="submit"
            className="w-full p-3 rounded-lg bg-purple-500 hover:bg-purple-700 text-lg font-medium"
          >
            Signup
          </Button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-purple-400 cursor-pointer hover:text-purple-600"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
