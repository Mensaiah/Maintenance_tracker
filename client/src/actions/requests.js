import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
const BASE_URL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:7000/";

export const getRequests = async dispatch => {
  try {
    const res = await axios.get(`${BASE_URL}api/users/requests`);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    dispatch({
      type: "GET_REQUESTS",
      payload: res.data
    });
  } catch (error) {}
};
