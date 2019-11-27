import React from "react";
import { Link } from "react-router-dom";
import { NavbarLanding } from "../layouts/Navbar";

const LandingPage = () => {
  return (
    <div>
      <div className="landing">
        <div className="overlay">
          <NavbarLanding />
          <div className="landing-body">
            <h1 className="lg-heading">
              Let's help you <span>mendit</span>
            </h1>
            <p className="sm-heading">Facility Maintenance Just Got Better.</p>
            <Link to="/register" className="btn btn-mid landing-btn">
              Get Started{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
