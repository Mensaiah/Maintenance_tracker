import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const RequestItem = ({ className, request }) => {
  const name = `request bg-white ${className}`;
  const { title, description, date_created, req_uid } = request;
  const date = new moment(date_created);

  return (
    <Link to={`/request/${req_uid}`}>
      <div className={name}>
        <div className="content">
          <div className="title">
            {title}
            <span className="time"> {date.fromNow()}</span>
          </div>
          {description}
        </div>
      </div>
    </Link>
  );
};

export default RequestItem;
