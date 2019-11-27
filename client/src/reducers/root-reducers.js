import { combineReducers } from "redux";
import requests from "./requests";
import users from "./users";
import menu from "./menu";

const rootReducers = combineReducers({ requests, users, menu });

export default rootReducers;
