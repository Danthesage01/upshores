import React, { useState } from "react";
import InputField from "../../components/Global/InputField"; // Import the reusable input field
import CheckboxInput from "../../components/Global/Checkbox";
import SelectField from "../../components/Global/SelectField";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    companySize: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const companySizeOptions = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201+", label: "201+ employees" },
  ];

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
            <form className="space-y-6">
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
                Log in
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
