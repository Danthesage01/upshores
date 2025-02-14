import React from "react";
import { useGetCurrentUserQuery } from "../Services/authApi";
import { CompanyDashboard } from "./Company/CompanyDash";
import { AdminDashboard } from "./Admin/AdminDash";
import SmallLoader from "../components/Global/SmallLoader";

export function Dashboard() {
  const { data, isLoading, isFetching } = useGetCurrentUserQuery();

  if (isFetching || isLoading) {
    return (
      <div className="grid place-items-center  h-[100vh]">
        <SmallLoader />
      </div>
    );
  }

  return data?.data?.role == "company" ? (
    <CompanyDashboard />
  ) : (
    <AdminDashboard />
  );
}
