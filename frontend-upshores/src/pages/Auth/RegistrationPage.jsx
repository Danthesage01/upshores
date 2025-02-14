import React, { useEffect, useState } from "react";
import InputField from "../../components/Global/InputField"; // Import the reusable input field
import CheckboxInput from "../../components/Global/Checkbox";
import SelectField from "../../components/Global/SelectField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../features/authSlice";
import { useRegisterUserMutation } from "../../Services/authApi";
import SmallLoader from "../../components/Global/SmallLoader";

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    companySize: "",
    agreedToTerms: false,
  });

  const [
    registerUser,
    {
      data: loginData,
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, companyName, companySize, agreedToTerms } =
      formData;
    if (!password || !email || !companyName || !companySize) {
      toast.error("Please fill all fields");
      return;
    }
    if (!agreedToTerms) {
      toast.error("Agree to T&C to create an account");
      return;
    }
    try {
      const payload = {
        email,
        password,
        companyName,
        companySize,
        acceptTermsAndConditions: agreedToTerms && "YES",
      };
      const response = await registerUser(payload);
      if (response.error) {
        const errMessage = response?.error?.data?.message;
        if (typeof errMessage === "string") {
          toast.error(errMessage);
        } else if (typeof errMessage === "object") {
          return Object.values(errMessage)
            .flat()
            .forEach((msg) => toast.error(msg));
        }
      }
    } catch (error) {
      console.log(error, "down here");
    }
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success("User created successfully");

      // localStorage.setItem("token", loginData?.data.token);

      console.log(loginData);

      navigate("/login");
    }
  }, [isRegisterSuccess]);

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
              Join UpShore
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
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                />
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
                <SelectField
                  label="Company Size"
                  name="companySize"
                  value={formData.companySize}
                  options={companySizeOptions}
                  onChange={handleChange}
                />
                <CheckboxInput
                  name="agreedToTerms"
                  label="I agree to UpShore's Terms of Service and Privacy Policy"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                {isRegisterLoading ? <SmallLoader /> : "Create Account"}
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 text-blue-600 hover:underline cursor-pointer"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
