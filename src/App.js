import React, {useEffect} from 'react';
import { connect } from "react-redux";
import axios from 'axios'
import { setInformation } from "./actions";
import Navbar from './components/navbar'
import Dashboard from './pages/dashboard'
import './App.css';

const App=(props)=> {
  const url = "http://basculapp.000webhostapp.com/api/getInfoCliente.php?cliente=100&finca=100_1"
  useEffect(() => {
    axios.get(url)
    .then((response) => {
      props.setInformation(response.data[0])
    })
    
  },[])
  return (
    <div className="App">
      <Navbar/>
      <Dashboard/>
    </div>
  );
}
const mapDispatchToProps = {
  setInformation,
};
export default connect(null, mapDispatchToProps) (App);
