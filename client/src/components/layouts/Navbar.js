import React from "react";
import Sidebar from "./Sidebar";
import Brand from "./Brand";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleShow } from "../../actions/menu";
import { logOut } from "../../actions/user";
export const Navbar = () => {
  const dispatch = useDispatch();
  const showSidebar = () => {
    dispatch(handleShow("show"));
  };
  const logOutUser = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <nav className="nav">
        <Link to="/dashboard">
          <i className="logo fas fa-hammer"></i>
          <span className="nav-brand">mendit</span>
        </Link>
        <ul className="nav-items">
          <li className="nav-link">
            <i>
              <i className="fas fa-plus"></i>
            </i>
          </li>

          <li className="nav-link">
            <div className="menu-btn" onClick={showSidebar}>
              <i className="menu-line link"></i>
              <i className="menu-line link"></i>
              <i className="menu-line link"></i>
            </div>
          </li>
          <li className="nav-link" onClick={logOutUser}>
            <i>
              <i className="fa fa-sign-out-alt"></i>
            </i>
          </li>
        </ul>
      </nav>
      <Sidebar />
    </div>
  );
};

export const NavbarLanding = () => {
  return (
    <nav className="nav landing-nav">
      <Brand />
      <ul className="nav-items">
        <li className="nav-link">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-link">
          <Link to="/register">Register</Link>
        </li>
        <li className="nav-link">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};
