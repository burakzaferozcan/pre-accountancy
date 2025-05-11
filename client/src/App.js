import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Partials/Header";
import Footer from "./components/Partials/Footer";

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
