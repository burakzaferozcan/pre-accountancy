import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../slices/auth/AuthSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
          <ul
            className={`navbar-nav d- mr-auto ${
              user && user.token ? "d-block" : "d-none"
            }`}
          >
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
          {user && user.token ? (
            <>
              <span className="text-white" onClick={() => navigate("/profile")}>
                {user && user.userName}{" "}
              </span>
              <FaSignOutAlt color="white" onClick={() => dispatch(logout())} />
            </>
          ) : (
            <FaSignInAlt color="white" onClick={() => navigate("/login")} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
