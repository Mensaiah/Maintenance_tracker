import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import LandingPage from "./components/pages/LandingPage";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import "./scss/main.scss";
import "./App.css";
import configureStore from "./store/configureStore";
import setAuthToken from "./utils/setAuthToken";
import RequestPage from "./components/pages/RequestPage";

const store = configureStore();
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/request/:main" component={RequestPage} />
          {/* <Route exact path="/request/create" component={} />
          <Route exact path="/request/edit/:id" component={} /> */}
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
