import { createBrowserRouter } from "react-router-dom";
import {
  PublicRoutesLayout,
  DashboardLayout,
  PrivateRoutes,
  PublicRoutes,
} from "../layout";

import {
  CompaniesPage,
  Dashboard,
  ErrorPage,
  LandingPage,
  LoginPage,
  ProfilePage,
  RegistrationPage,
  SavedPage,
} from "../pages";
import { useDispatch } from "react-redux";

function AdminOnlyRoute({ children }) {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.user?.role == "super_admin") {
    return <>{children}</>;
  }
  return dispatch(logOut());
}

function CompanyOnlyRoute({ children }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.user?.role == "company") {
    return <>{children}</>;
  }
  return dispatch(logOut());
}
export const router = createBrowserRouter([
  {
    element: (
      <PublicRoutes>
        <PublicRoutesLayout />
      </PublicRoutes>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },

  {
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profile",
        element: (
          <CompanyOnlyRoute>
            <ProfilePage />
          </CompanyOnlyRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "saved",
        element: (
          <CompanyOnlyRoute>
            <SavedPage />
          </CompanyOnlyRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "companies",
        element: (
          <AdminOnlyRoute>
            <CompaniesPage />
          </AdminOnlyRoute>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
