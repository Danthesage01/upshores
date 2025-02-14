import { Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "../Services/authApi";
import SmallLoader from "../components/Global/SmallLoader";
import { CompanyAuthNavbar } from "../components/AuthNavbar/CompanyAuthNavbar";
import { AdminAuthNavbar } from "../components/AuthNavbar/AdminAuthNavbar";

export const DashboardLayout = () => {
  const { data, isLoading, isFetching } = useGetCurrentUserQuery();

  if (isFetching || isLoading) {
    return (
      <div className="grid place-items-center h-[100vh]">
        <SmallLoader />
      </div>
    );
  }
  return data?.data?.role == "company" ? (
    <main>
      <CompanyAuthNavbar userData={data?.data} />
      <div>
        <Outlet />
      </div>
    </main>
  ) : (
    <main>
      <AdminAuthNavbar userData={data?.data} />
      <div>
        <Outlet />
      </div>
    </main>
  );
};
