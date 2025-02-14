import { createSlice } from "@reduxjs/toolkit";
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null,
  userId: storedUser?.userId || null,
  accessToken: storedUser?.accessToken || null,
  refreshToken: storedUser?.refreshToken || null,
  email: storedUser?.email || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const updatedState = { ...state, ...action.payload };
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: updatedState.user,
          accessToken: updatedState.accessToken,
          refreshToken: updatedState.refreshToken,
        })
      );
      return updatedState;
    },

    logOut: (state) => {
      state.userId = null;
      state.user = null;
      state.email = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
