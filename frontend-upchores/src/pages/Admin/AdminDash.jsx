import React, { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import {
  useGetTalentsQuery,
  useUploadTalentsFromExcelMutation,
} from "../../Services/talentApi";
import SmallLoader from "../../components/Global/SmallLoader";
import { TalentsComp } from "../../components/Global/TalentsComp";
import { toast } from "react-toastify";

export const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const [
    uploadTalents,
    {
      data: talentsUploadData,
      isLoading: isUploadLoading,
      isSuccess: isUploadSuccess,
      isError: isUploadError,
      error: uploadError,
    },
  ] = useUploadTalentsFromExcelMutation();

  const {
    data: talentData,
    isLoading: isTalentLoading,
    isFetching: isTalentFetching,
  } = useGetTalentsQuery();

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Only Excel files (.xlsx, .xls) are allowed!");
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an Excel file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadTalents(formData).unwrap();
      setFile(null); // Clear file after upload
      setFileName(""); // Reset filename
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  useEffect(() => {
    if (isUploadSuccess) {
      console.log(talentsUploadData);
      toast.success(
        talentsUploadData?.message || "Talents uploaded successfully!"
      );
      return;
    }
    if (isUploadError) {
      toast.error(uploadError?.data?.message || "Upload failed");
      return;
    }
  }, [isUploadSuccess, isUploadError]);

  if (isTalentFetching || isTalentLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-100">
        <SmallLoader favColor={true} />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen py-20 bg-gray-100">
        {/* File Upload */}
        <div className="container mx-auto mb-4 md:my-4 bg-white p-4 flex flex-wrap gap-3 items-center rounded-lg">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full md:w-4/5 focus-within:ring-2 focus-within:ring-primary-600">
            <FaUpload className="text-gray-500 mr-2" />
            <label className="w-full text-gray-500 cursor-pointer">
              <span className="truncate">
                {fileName || "Upload talents from excel (.xlsx)"}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <button
            className="bg-blue-500 hover:bg-primary-700 text-white px-4 py-2 rounded-lg w-full md:w-[18%] flex justify-center"
            onClick={handleUpload}
            disabled={isUploadLoading}
          >
            {isUploadLoading ? <SmallLoader /> : "Upload"}
          </button>
        </div>

        <TalentsComp
          isTalentFetching={isTalentFetching}
          isTalentLoading={isTalentLoading}
          talentData={talentData}
        />
      </div>
    </>
  );
};
