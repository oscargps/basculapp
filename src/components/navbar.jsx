import React from "react";
import axios from "axios";
import "../styles/components/navbar.css";
import Logo from "../assets/img/logo.png";
import { connect } from "react-redux";
import { setFinca,setLoading,setInformation } from "../actions";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
const Navbar = (props) => {
  const { fincas,cliente } = props;

  const handleSelect = async (e) => {
   await props.setFinca(e);
    getInfo(e)
  };

  const getInfo = (e) => {
    props.setLoading(true);
    const url =
      "http://basculapp.000webhostapp.com/api/getInfoCliente.php?cliente=" +
      cliente.id +
      "&finca="+e;
    axios.get(url).then((response) => {
      props.setLoading(false);
      props.setInformation(response.data[0]);
    });
  };
  return (
    <div className="Navbar">
      <img className="Navbar-logo" src={Logo} alt="" />
      <h3 className="Navbar-title">BASCULAPP</h3>
      <div>
        <DropdownButton
          variant="secondary"
          title="Cambiar finca"
          id="dropdown-menu-align-right"
          onSelect={handleSelect}
        >
          {fincas.map((finca) => (
            <Dropdown.Item key={finca.id} eventKey={finca.id}>
              {finca.nombre}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  setFinca,setLoading,setInformation
};
const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    fincas: state.fincas,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
