// import { useSelector } from "react-redux";
// import { selectAuth } from "../features/authSlice";

export function PrivateRoutes({ children }) {
  // const { user } = useSelector(selectAuth);
  // console.log(!!user);
  return true ? children : "loading...";
}
