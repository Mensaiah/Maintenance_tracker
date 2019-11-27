import React from "react";
import { Spin } from "antd";

const Spinner = ({ loading }) => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
