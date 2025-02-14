import React, { useEffect, useState } from "react";
import InputField from "../../components/Global/InputField"; // Import the reusable input field
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../Services/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authSlice";
import { toast } from "react-toastify";
import SmallLoader from "../../components/Global/SmallLoader";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    loginUser,
    {
      data: loginData,
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!password || !email) {
      toast.error("Please provide credentials");
      return;
    } else {
      const response = await loginUser({ email, password });
      if (response.error) {
        // console.log(response?.error?.data?.error, "new");
        const errMessage = response?.error?.data?.message;

        if (typeof errMessage === "string") {
          return toast.error(errMessage);
        } else if (typeof errMessage === "object") {
          return Object.values(errMessage)
            .flat()
            .forEach((msg) => toast.error(msg));
        }
      }
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("Login successful");

      localStorage.setItem("accessToken", loginData?.data.accessToken);
      localStorage.setItem("refreshToken", loginData?.data.refreshToken);

      dispatch(
        setUser({
          email: loginData.data.email,
          userId: loginData.data.userId,
          accessToken: loginData.data.accessToken,
          refreshToken: loginData.data.refreshToken,
          user: loginData?.data,
        })
      );

      navigate("/dashboard");
    }
  });

  return (
    <div
      id="registration-page"
      className="min-h-screen bg-gray-50"
    >
      <header
        id="header"
        className="fixed w-full bg-white shadow-sm z-50"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2"
          >
            <i className="fa-solid fa-ship text-blue-600 text-2xl"></i>
            <span className="text-xl font-bold text-gray-800">UpShore</span>
          </Link>
          {/* <span className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
            Back to Home
          </span> */}
        </div>
      </header>
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div
          id="registration-container"
          className="max-w-xl mx-auto"
        >
          <div
            id="registration-header"
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Log into UpShore
            </h1>
            <p className="text-gray-600">
              Access top global talent and transform your business today
            </p>
          </div>
          <div
            id="registration-form"
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-4">
                <InputField
                  label="Work Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  type="email" // Use 'email' type for email input
                />
                <InputField
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  type="password" // Use 'password' type for password input
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                {isLoginLoading ? <SmallLoader /> : "Log in"}
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account yet?
              <Link
                to="/register"
                className="ml-1 text-blue-600 hover:underline cursor-pointer"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
