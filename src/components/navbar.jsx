import React from "react";
import axios from "axios";
import "../styles/components/navbar.css";
import Logo from "../assets/img/logo.png";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setFinca, setLoading, setInformation } from "../actions";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
const Navbar = (props) => {
  let history = useHistory();
  const { fincas, cliente, usuario, fincaActual } = props;

  const handleSelect = async (e) => {
    let finca = JSON.parse(e);
    await props.setFinca(finca);
    getInfo(finca.id);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    history.push("/login");
  };
  const getInfo = (e) => {
    props.setLoading(true);
    const url =
      "http://basculapp.000webhostapp.com/api/getInfoCliente.php?cliente=" +
      cliente.id +
      "&finca=" +
      e;
    try {
      axios.get(url).then((response) => {
        props.setLoading(false);
        props.setInformation(response.data[0]);
      }).catch((er)=>{
        props.setLoading(false);
        props.setInformation([]);
      })
    } catch (error) {
      props.setLoading(false);
      props.setInformation([]);
    }
  };
  return (
    <div className="Navbar">
      <img className="Navbar-logo" src={Logo} alt="" />
      <h3 className="Navbar-title">BASCULAPP</h3>
      <div className="Navbar-Menu">
        <DropdownButton
          variant="secondary"
          title={
            fincaActual.id
              ? fincaActual.id + "-" + fincaActual.nombre
              : "Seleccionar finca.."
          }
          id="dropdown-menu-align-right"
          onSelect={handleSelect}
        >
          {fincas.map((finca) => (
            <Dropdown.Item key={finca.id} eventKey={JSON.stringify(finca)}>
              {finca.id}-{finca.nombre}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <p className="Navbar-Menu__username">{usuario.username}</p>
        <button onClick={handleLogout} className=" btn btn-warning btn-sm">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  setFinca,
  setLoading,
  setInformation,
};
const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    fincas: state.fincas,
    usuario: state.usuario,
    fincaActual: state.fincaActual,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
