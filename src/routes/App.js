import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
        </Switch>
    </BrowserRouter>
  );
};

export default (App);
