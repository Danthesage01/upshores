import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../Services/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 100,
      },
    }).concat(authApi.middleware),
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState;
setupListeners(store.dispatch);
