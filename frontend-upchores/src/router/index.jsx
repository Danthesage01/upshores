import { createBrowserRouter } from "react-router-dom";
import {
  PublicRoutesLayout,
  DashboardLayout,
  PrivateRoutes,
  PublicRoutes,
} from "../layout";

import {
  AdminDashboard,
  CompanyDashboard,
  LandingPage,
  LoginPage,
  RegistrationPage,
} from "../pages";

// function AdminOnlyRoute({ children }) {
//   const dispatch = useDispatch();

//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user?.user?.is_admin == 1) {
//     return <>{children}</>;
//   }
//   return dispatch(logOut());
// }
// function UserOnlyRoute({ children }) {
//   const dispatch = useDispatch();
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user?.user?.is_admin == 0) {
//     return <>{children}</>;
//   }
//   return dispatch(logOut());
// }
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
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
        errorElement: <Error />,
      },
      // {
      //   path: "/terms-of-use",
      //   element: <TermsOfUse />,
      //   errorElement: <Error />,
      // },
      // {
      //   path: "/privacy-policy",
      //   element: <PrivacyPolicy />,
      //   errorElement: <Error />,
      // },
      // {
      //   path: "/confirm-email",
      //   element: <ConfirmEmail />,
      //   errorElement: <Error />,
      // },
      // {
      //   path: "/forgot-password",
      //   element: <ForgotPassword />,
      //   errorElement: <Error />,
      // },
      // {
      //   path: "/reset-password",
      //   element: <ResetPassword />,
      //   errorElement: <Error />,
      // },
    ],
  },

  {
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "dashboard",
        element: (
          // <UserOnlyRoute>
          <CompanyDashboard />
          /* </UserOnlyRoute> */
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          // <AdminOnlyRoute>
          <AdminDashboard />
          // </AdminOnlyRoute>
        ),
      },
    ],
  },
]);
