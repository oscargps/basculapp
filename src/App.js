import React, {  } from "react";
import { connect } from "react-redux";
import Dashboard from "./pages/dashboard";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
};

export default connect(null, null)(App);
