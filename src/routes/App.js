import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import PrintableRes from "../pages/printableRes";
import PrintableLote from "../pages/printableLote";
import PrintableReg from "../pages/printableReg";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/printres" component={PrintableRes} />
          <Route exact path="/printlote" component={PrintableLote} />
          <Route exact path="/printreg" component={PrintableReg} />
        </Switch>
    </BrowserRouter>
  );
};

export default (App);
