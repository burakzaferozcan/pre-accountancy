import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const dispatvh = useDispatch();

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link to={"/"} className="navbar-brand">
        BZOSoft
      </Link>
      <div
        className="container collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent"
      >
        <div className="text-center">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={"/customer-definition"}>
                Müşteri Tanım
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/company-definition"}>
                Firma Tanım
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/stock-definition"}>
                Stok Tanım
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to={"/constant"}>
                İş yeri bilgileri
              </Link>
            </li>
          </ul>
        </div>
        <div className="cursor-pointer">
          <FaSignOutAlt color="white" />
        </div>
      </div>
    </div>
  );
}

export default Header;
