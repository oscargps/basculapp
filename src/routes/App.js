import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LogPage from "../pages/login";
import Dashboard from "../pages/dashboard";
import PrintableRes from "../pages/printableRes";
import PrintableLote from "../pages/printableLote";
import PrintableReg from "../pages/printableReg";
import Signup from "../pages/signup";
import "./App.css";

const App = () => {
  let loggedIn = sessionStorage.getItem("resp") ? true : false;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Dashboard /> : <LogPage />}
        </Route>
        <Route exact path="/printres" component={PrintableRes} />
        <Route exact path="/printlote" component={PrintableLote} />
        <Route exact path="/printreg" component={PrintableReg} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
