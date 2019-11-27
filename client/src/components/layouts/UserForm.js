import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Alert from "../layouts/AlertError";
import { NavbarLanding } from "./Navbar";
import Spinner from "./Spinner";
import { setLoading } from "../../actions/menu";
import { useDispatch } from "react-redux";
import { loadUser } from "../../actions/user";

const UserForm = ({ body }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      dispatch(setLoading());
      loadUser(dispatch);
    }
    //eslint-disable-next-line
  }, [loadUser, dispatch, setLoading]);
  const alert = useSelector(state => state.users.error);
  const loading = useSelector(state => state.menu.loading);

  return (
    <div className="form-body">
      <NavbarLanding />
      <div className="form">
        {alert && <Alert error={alert} />}
        {body}
      </div>
    </div>
  );
};

export default UserForm;
