import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import HomeScreen from "./components/Screens/HomeScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import RegisterScreen from "./components/Screens/RegisterScreen";
import CustomerDefinitionScreen from "./components/Screens/CustomerDefinitionScreen";
import EditCustomerScreen from "./components/Screens/EditCustomerScreen";
import AddCustomerScreen from "./components/Screens/AddCustomerScreen";
import EditCompanyScreen from "./components/Screens/EditCompanyScreen";
import AddCompanyScreen from "./components/Screens/AddCompanyScreen";
import CompanyDefinitionScreen from "./components/Screens/CompanyDefinitionScreen";
import StockDefinitionScreen from "./components/Screens/StockDefinitionScreen";
import EditStockScreen from "./components/Screens/EditStockScreen";
import AddStockScreen from "./components/Screens/AddStockScreen";
import CustomerSalesScreen from "./components/Screens/CustomerSalesScreen";
import CompanyPurchaseScreen from "./components/Screens/CompanyPurchaseScreen";
import CustomerSalesPrintScreen from "./components/Screens/CustomerSalesPrintScreen";
import CompanyPurchasePrintScreen from "./components/Screens/CompanyPurchasePrintScreen";
import ConstantScreen from "./components/Screens/ConstantScreen";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route index={true} element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/customer-definition"
          element={<CustomerDefinitionScreen />}
        />
        <Route
          path="/customer-definition:id"
          element={<EditCustomerScreen />}
        />
        <Route
          path="/customer-definition/add"
          element={<AddCustomerScreen />}
        />
        <Route
          path="/company-definition"
          element={<CompanyDefinitionScreen />}
        />
        <Route path="/company-definition:id" element={<EditCompanyScreen />} />
        <Route path="/company-definition/add" element={<AddCompanyScreen />} />
        <Route path="/stock-definition" element={<StockDefinitionScreen />} />
        <Route path="/stock-definition:id" element={<EditStockScreen />} />
        <Route path="/stock-definition/add" element={<AddStockScreen />} />
        <Route path="/customer-sales:id" element={<CustomerSalesScreen />} />
        <Route
          path="/customer-sales/print:id"
          element={<CustomerSalesPrintScreen />}
        />
        <Route
          path="/company-purchase:id"
          element={<CompanyPurchaseScreen />}
        />
        <Route
          path="/company-purchase/print:id"
          element={<CompanyPurchasePrintScreen />}
        />
        <Route path="/constant" element={<ConstantScreen />} />
      </Route>
    </Route>
  )
);
