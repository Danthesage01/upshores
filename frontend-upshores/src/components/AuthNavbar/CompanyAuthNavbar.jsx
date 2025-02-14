import React, { useState } from "react";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useLogoutUserMutation } from "../../Services/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logOut } from "../../features/authSlice";

export function CompanyAuthNavbar({ userData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (linkRoute) => {
    setIsMenuOpen(false);
    navigate(linkRoute);
  };

  const [logoutUser] = useLogoutUserMutation();

  const signOut = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        toast.error("No refresh token found!");
        return;
      }
      const res = await logoutUser({ refreshToken }).unwrap();
      toast.success(res.message);

      dispatch(logOut());

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <header
      id="header"
      className="fixed w-full top-0 bg-white/95 backdrop-blur-sm border-b border-tertiary-100 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <i className="fa-solid fa-ship text-primary-600 text-3xl mr-2"></i>
          <span className="text-2xl font-bold text-tertiary-800">UpShore</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {[
            { path: "/dashboard", label: "Dashboard" },
            { path: "/saved", label: "Saved" },
            { path: "/profile", label: "Profile" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-black ${
                location.pathname === item.path
                  ? "text-blue-500 font-medium"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Login and Get Started */}
        <div className="hidden md:flex items-center space-x-4">
          <FaBell className="text-gray-500 cursor-pointer" />
          <img
            src={
              userData?.image ||
              "https://res.cloudinary.com/dyk76szsd/image/upload/v1739497264/upshore/placeholder-image_bygumf.jpg"
            }
            alt="User Avatar"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
          <div
            onClick={signOut}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg text-gray-600 hover:text-primary-700 hover:bg-gray-100 transition"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-medium">Logout</span>
          </div>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center justify-center gap-4">
          <FaBell className="text-gray-500 cursor-pointer" />
          <img
            src={
              userData?.image ||
              "https://res.cloudinary.com/dyk76szsd/image/upload/v1739497264/upshore/placeholder-image_bygumf.jpg"
            }
            alt="User Avatar"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-tertiary-600 focus:outline-none"
          >
            <i
              className={`fa-solid ${
                isMenuOpen ? "fa-xmark" : "fa-bars"
              } text-2xl`}
            ></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white py-4 px-4`}
      >
        <nav className="space-y-4">
          {[
            { path: "/dashboard", label: "Dashboard" },
            { path: "/saved", label: "Saved" },
            { path: "/profile", label: "Profile" },
          ].map((item) => (
            <div
              key={item.path}
              onClick={() => handleMenuItemClick(item.path)}
              className={`block text-tertiary-600 hover:text-primary-600 ${
                location.pathname === item.path
                  ? "text-blue-500 font-medium"
                  : ""
              }`}
            >
              {item.label}
            </div>
          ))}
          <button
            onClick={signOut}
            className="block w-full bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 text-center"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
