import React from "react";
import { handleShow } from "../../actions/menu";
import { useDispatch } from "react-redux";

const Container = ({ content }) => {
  const dispatch = useDispatch();
  const hideShow = () => {
    dispatch(handleShow());
  };
  return (
    <div className="container-page">
      <div className="container bg-light" onClick={hideShow}>
        {content}
      </div>
    </div>
  );
};

export default Container;
