import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import LoadingToRedirect from "../components/Global/LoadingToRedirect";

export function PrivateRoutes({ children }) {
  const { user } = useSelector(selectAuth);

  return user ? children : <LoadingToRedirect />;
}
