import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleWare from "redux-saga";
import rootSaga from "../sagas/index";

import requests from "../reducers/requests";
import users from "../reducers/users";
import menu from "../reducers/menu";

export default () => {
  const sagaMiddleware = createSagaMiddleWare();

  const store = createStore(
    combineReducers({ requests, users, menu }),
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  sagaMiddleware.run(rootSaga);
  return store;
};
