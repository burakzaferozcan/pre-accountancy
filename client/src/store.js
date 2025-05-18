import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/AuthSlice";
import customerReducer from "./slices/customer/CustomerSlice";
import salesReducer from "./slices/sales/SalesSlice";
import collectionsReducer from "./slices/collections/CollectionsSlice";
import stockReducer from "./slices/stock/stockSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    sales: salesReducer,
    collections: collectionsReducer,
    stock: stockReducer,
  },
});
