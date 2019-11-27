import { createStore, compose } from "redux";
import rootReducers from "../reducers/root-reducers";

export default () => {
  const store = createStore(
    rootReducers,
    compose(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  return store;
};
