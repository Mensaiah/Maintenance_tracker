import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setLoading } from "./menu";
const BASE_URL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:7000/";

export const loadUser = async dispatch => {
  try {
    dispatch(setLoading());
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.get(`${BASE_URL}api/users/auth`);
    dispatch({
      type: "USER_LOADED",
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error
    });
  }
};

export const loginUser = async data => {
  try {
    const res = await axios.post(`${BASE_URL}api/users/auth/signin`, data);
    return {
      type: "LOGIN_SUCCESS",
      payload: res.data.token
    };
  } catch (error) {
    return {
      type: "LOGIN_FAILED",
      payload: error.response.data.msg
    };
  }
};

export const signUp = async data => {
  try {
    const res = await axios.post(`${BASE_URL}api/users/auth/signup`, data);

    return {
      type: "REGISTER_SUCCESS",
      payload: res.data.token
    };
  } catch (error) {
    return {
      type: "REGISTER_FAILED",
      payload: error.response.data.errors[0].msg
    };
  }
};

export const logOut = () => {
  return {
    type: "LOGOUT",
    payload: null
  };
};

export const resetError = () => ({
  type: "RESET_ERROR"
});

export const setError = data => ({
  type: "SET_ERROR",
  payload: data
});
