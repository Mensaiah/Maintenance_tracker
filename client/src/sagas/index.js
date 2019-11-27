import { takeEvery, call, put } from "redux-saga/effects";
import { getRequests } from "../actions/requests";

function* login({ payload }) {
  const response = yield call(loginUser, payload);
  yield call(loginSuccess, response);
}

export default function* watchData() {
  yield takeEvery("GET_REQUESTS", login);
}
