import React from "react";
import { useDispatch } from "react-redux";
import { resetError } from "../../actions/user";
import { Alert } from "antd";
const AlertError = ({ error }) => {
  const dispatch = useDispatch();

  let alertDiv = error && <Alert message={error} type="error" />;
  if (error) {
    setTimeout(() => {
      dispatch(resetError());
    }, 5000);
  }

  return alertDiv;
};

export default AlertError;
