import React from "react";
import { FaSearch, FaBell, FaBookmark, FaLinkedin } from "react-icons/fa";

const talents = [
  {
    name: "Abdul Rahman",
    role: "Senior AI Developer",
    location: "Dhaka, Bangladesh",
    rate: "$850",
    skills: ["Python", "TensorFlow", "Machine Learning"],
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Chioma Okafor",
    role: "Full Stack Developer",
    location: "Lagos, Nigeria",
    rate: "$950",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Hassan Khan",
    role: "Project Manager",
    location: "Karachi, Pakistan",
    rate: "$975",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Amara Okonkwo",
    role: "AI Research Scientist",
    location: "Lagos, Nigeria",
    rate: "$925",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Kamal Hossain",
    role: "DevOps Engineer",
    location: "Dhaka, Bangladesh",
    rate: "$895",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Fatima Ahmed",
    role: "UI/UX Designer",
    location: "Lahore, Pakistan",
    rate: "$875",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

export const CompanyDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-blue-600 text-xl font-bold">UpShore</h1>
        <nav className="flex space-x-6 text-gray-600">
          <a
            href="#"
            className="hover:text-black"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-blue-500 font-medium"
          >
            Talents
          </a>
          <a
            href="#"
            className="hover:text-black"
          >
            Saved
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <FaBell className="text-gray-500 cursor-pointer" />
          <img
            src="https://randomuser.me/api/portraits/men/7.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </div>
      </header>

      {/* Search & Filters */}
      <div className="bg-white shadow-md p-4 flex flex-wrap justify-between items-center mt-4 mx-4 rounded-lg">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by skill, role, or location"
            className="w-full outline-none"
          />
        </div>

        <select className="border border-gray-300 rounded-lg px-3 py-2 md:w-1/6 w-full mt-2 md:mt-0">
          <option>All Roles</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-3 py-2 md:w-1/6 w-full mt-2 md:mt-0">
          <option>All Locations</option>
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 md:mt-0">
          More Filters
        </button>
      </div>

      {/* Talent List */}
      <div className="mt-6 mx-4 space-y-4">
        {talents.map((talent, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow rounded-lg flex items-center"
          >
            <img
              src={talent.image}
              alt={talent.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold">{talent.name}</h2>
              <p className="text-gray-500">{talent.role}</p>
              <p className="text-gray-400">{talent.location}</p>
              <p className="text-blue-500 font-medium">
                Monthly rate: {talent.rate}
              </p>
              {talent.skills && (
                <div className="flex space-x-2 mt-2">
                  {talent.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-3 items-center">
              <FaLinkedin className="text-blue-600 text-xl cursor-pointer" />
              <FaBookmark className="text-gray-400 text-xl cursor-pointer" />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
