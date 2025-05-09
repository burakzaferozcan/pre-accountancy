import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";

function App() {
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
