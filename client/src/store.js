import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/AuthSlice";
import customerReducer from "./slices/customer/CustomerSlice";
import salesReducer from "./slices/sales/SalesSlice";
import collectionsReducer from "./slices/collections/CollectionsSlice";
import stockReducer from "./slices/stock/StockSlice";
import companyReducer from "./slices/company/CompanySlice";
import purchaseReducer from "./slices/purchase/PurchaseSlice";
import paymentReducer from "./slices/payment/PaymentSlice";
import constantReducer from "./slices/constant/ConstantSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    sales: salesReducer,
    collections: collectionsReducer,
    stock: stockReducer,
    company: companyReducer,
    purchase: purchaseReducer,
    payment: paymentReducer,
    constant: constantReducer,
  },
});
