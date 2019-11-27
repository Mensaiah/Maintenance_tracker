import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
const Sidebar = () => {
  const show = useSelector(state => state.menu.show);

  return (
    <aside className={`sm-sidebar bg-primary ${show}`}>
      <div className={`menu ${show}`}>
        <Link className="side-link selected" to="/dashboard" id="selected">
          Dashboard{" "}
        </Link>
        <Link className="side-link" to="/request/create">
          Create
        </Link>
        <Link className="side-link" to="/request/pending">
          Pending
        </Link>
        <Link className="side-link" to="/request/approved">
          Approved
        </Link>
        <Link className="side-link" to="/request/disapproved">
          Disapproved
        </Link>
        <Link className="side-link" to="/request/resolved">
          Resolved
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
