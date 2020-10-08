import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setInformation,setLoading } from "./actions";
import Navbar from "./components/navbar";
import Loader from "./components/loader";
import Dashboard from "./pages/dashboard";
import "./App.css";

const App = (props) => {
  const {loading} = props
  const url =
    "http://basculapp.000webhostapp.com/api/getInfoCliente.php?cliente=100&finca=100_1";
  useEffect(() => {
    axios.get(url).then((response) => {
      props.setLoading(loading);
      props.setInformation(response.data[0]);
    });
  }, []);

    return (
      <div className="App">
        <Navbar />
        {loading?<Loader />:<Dashboard />}
        
      </div>
    );
  
};
const mapDispatchToProps = {
  setInformation,setLoading
};
const mapStateToProps = (state) => {
  return {
    loading:state.loading
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
