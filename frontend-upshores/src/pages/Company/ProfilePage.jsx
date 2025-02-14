import React, { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useUpdateUserProfileMutation } from "../../Services/userApi";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/authSlice";
import { useGetTalentsQuery } from "../../Services/talentApi";
import { toast } from "react-toastify";
import SmallLoader from "../../components/Global/SmallLoader";
import { useGetCurrentUserQuery } from "../../Services/authApi";

export const ProfilePage = () => {
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useSelector(selectAuth);

  const { data, isLoading, isFetching, refetch } = useGetCurrentUserQuery();

  const [
    updateUserProfile,
    {
      data: updateData,
      isLoading: isUpdateProfileLoading,
      isSuccess: isUpdateProfileSuccess,
      isError: isUpdateProfileError,
      error: updateProfileError,
    },
  ] = useUpdateUserProfileMutation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upshore-images");
    formData.append("folder", "upshore/profile");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dyk76szsd/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
        await updateUserProfile({
          image: data.secure_url,
          userId: user?.user?.userId,
        });
        toast.success("Uploaded Image URL");
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (isUpdateProfileSuccess) {
      refetch();
    }
  }, [isUpdateProfileSuccess]);
  return (
    <div className="min-h-screen py-20 bg-gray-100">
      <div className="container mx-auto bg-white shadow-md p-4 flex flex-wrap gap-3 items-center rounded-lg">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full md:w-4/5 focus-within:ring-2 focus-within:ring-primary-600">
          <FaUpload className="text-gray-500 mr-2" />
          <label className="w-full text-gray-500 cursor-pointer">
            <span className="truncate">
              {file?.name || "Upload your profile picture"}
            </span>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <button
          className="bg-blue-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg w-full md:w-[18%]"
          onClick={() => handleImageUpload(file)}
        >
          {isUpdateProfileLoading ? <SmallLoader /> : "Upload"}
        </button>
      </div>

      <div className="container mx-auto pt-4 mt-6 grid grid-cols-1 gap-4">
        <h2 className="text-xl font-semibold px-4">Company's Profile</h2>
        {file && (
          <div className="container mx-auto mt-4 text-center">
            <p className="text-lg text-gray-700">
              Quick Preview Before Uploading:
            </p>
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded"
              className="w-32 h-32 mx-auto mt-2 rounded-full border-2 border-gray-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};
