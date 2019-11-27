import React from "react";
import RequestItem from "./RequestItem";

const Request = props => {
  const { size, request } = props;
  if (size === "small") {
    return <RequestItem className="sm-request" request={request} />;
  } else if (size === "mid") {
    return <RequestItem className="md-request" request={request} />;
  }
  return <RequestItem className="bg-request" request={request} />;
};

export default Request;
