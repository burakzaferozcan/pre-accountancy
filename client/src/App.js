import React from "react";
import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Partials/Header";
import Footer from "./components/Partials/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./slices/auth/AuthSlice";

function App() {
  const { user } = useSelector((state) => state.auth);
  const token = user && user.token;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    if (!token && location.pathname) {
      navigate("/login");
    }
  }, [navigate, user, location]);

  React.useEffect(() => {
    const expiretionTime = localStorage.getItem("expireTime");
    if (expiretionTime) {
      const currentTime = new Date().getTime();
      if (expiretionTime < currentTime) {
        dispatch(logout);
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="home-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
