import React, { useState } from "react";
import { FaSearch, FaBookmark, FaLinkedin } from "react-icons/fa";
import SmallLoader from "./SmallLoader";
import Pagination from "./Pagination";
import { formatCurrency } from "../../utils/utils";

export const TalentsComp = ({
  talentData,
  isTalentLoading,
  isTalentFetching,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleRoleChange = (e) => setSelectedRole(e.target.value);
  const handleLocationChange = (e) => setSelectedLocation(e.target.value);

  // **Filter talents based on search, role, and location**
  const filteredTalents =
    talentData?.data?.filter((talent) => {
      const matchesSearch =
        searchTerm === "" ||
        talent?.name?.toLowerCase().includes(searchTerm) ||
        talent?.role?.toLowerCase().includes(searchTerm) ||
        talent?.location.toLowerCase().includes(searchTerm) ||
        talent?.skills?.some((skill) =>
          skill.toLowerCase().includes(searchTerm)
        );

      const matchesRole =
        selectedRole === "All Roles" || talent.role === selectedRole;
      const matchesLocation =
        selectedLocation === "All Locations" ||
        talent.location === selectedLocation;

      return matchesSearch && matchesRole && matchesLocation;
    }) || [];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const displayedTalents = filteredTalents.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const totalPages = Math.ceil(filteredTalents.length / postsPerPage);
  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isTalentFetching || isTalentLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-100">
        <SmallLoader favColor={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 bg-gray-100">
      {/* Filters */}
      <div className="container mx-auto bg-white p-4 pr-6 flex flex-wrap gap-3 justify-between items-center rounded-lg">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 w-full md:w-1/3 focus-within:ring-2 focus-within:ring-primary-600">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by skill, role, or location"
            className="w-full outline-none border-0 focus:border-0 focus:ring-0"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <select
          className="border border-gray-300 rounded-lg px-3 py-2 md:w-1/6 w-full"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option>All Roles</option>
          {[...new Set(talentData?.data?.map((t) => t.role))].map(
            (role, index) => (
              <option
                key={index}
                value={role}
              >
                {role}
              </option>
            )
          )}
        </select>

        <select
          className="border border-gray-300 rounded-lg px-3 py-2 md:w-1/6 w-full"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          <option>All Locations</option>
          {[...new Set(talentData?.data?.map((t) => t.location))].map(
            (location, index) => (
              <option
                key={index}
                value={location}
              >
                {location}
              </option>
            )
          )}
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full md:w-auto">
          More Filters
        </button>
      </div>

      {/* Talent List */}
      {filteredTalents.length > 0 ? (
        <div className="container mx-auto pt-4 mt-6 grid grid-cols-1 gap-4">
          {displayedTalents.map((talent, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow rounded-lg flex flex-col sm:flex-row items-center"
            >
              <img
                src={talent.image}
                alt={talent.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-0 sm:ml-4 sm:mr-8 mt-2 sm:mt-0 flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold">{talent.name}</h2>
                <p className="text-gray-500">{talent.role}</p>
                <p className="text-gray-400">{talent.location}</p>
                <p className="text-blue-500 font-medium">
                  Monthly rate: {formatCurrency(talent.monthlyRate)}
                </p>
                {talent.skills && (
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
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
              <div className="flex space-x-3 items-center mt-3 sm:mt-0">
                <a
                  href={talent.linkedInUrl}
                  target="__blank"
                >
                  <FaLinkedin className="text-blue-600 text-xl cursor-pointer" />
                </a>
                <FaBookmark className="text-gray-400 text-xl cursor-pointer" />
                <a
                  href={`mailto:${talent.email}`}
                  className="bg-blue-500 px-2 py-1 cursor-pointer text-white md:px-4 rounded-lg"
                >
                  Contact
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container mx-auto p-4 m-4 rounded-lg min-h-[200px] grid place-items-center bg-white ">
          <div>No talents match your filters</div>
        </div>
      )}

      {/* Pagination */}
      <div className="relative mt-32">
        {filteredTalents.length > 0 && (
          <Pagination
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={currentPage}
            totalPosts={filteredTalents.length}
            postsPerPage={postsPerPage}
            paginate={paginate}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};
