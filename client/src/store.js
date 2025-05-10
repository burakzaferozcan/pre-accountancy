import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/AuthSlice";
export const store = configureStore({
  reducer: { auth: authReducer },
});
