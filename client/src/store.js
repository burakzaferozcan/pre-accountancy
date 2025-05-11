import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/AuthSlice";
import customerReducer from "./slices/customer/CustomerSlice";

export const store = configureStore({
  reducer: { auth: authReducer, customer: customerReducer },
});
