import React from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Partials/Header";
import Footer from "./components/Partials/Footer";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!(user && user.token)) {
      navigate("/login");
    }
  }, [navigate, user]);
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
