import React from "react";
import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <Link to="/">
      <i className="logo fas fa-hammer"></i>
      <span className="nav-brand">mendit</span>
    </Link>
  );
};

export default Brand;
