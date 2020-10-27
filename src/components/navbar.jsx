import React from "react";
import axios from "axios";
import "../styles/components/navbar.css";
import Logo from "../assets/img/logo.png";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  setFinca,
  setLoading,
  setInformation,
  setDetail,
  setModal,
} from "../actions";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import getInfo from "../utils/getInfo";
import Swal from "sweetalert2";

const Navbar = (props) => {
  let history = useHistory();
  const { fincas, cliente, usuario, fincaActual } = props;

  const handleSelect = async (e) => {
    let finca = JSON.parse(e);
    await props.setFinca(finca);
    props.setLoading(true);
    let data = await getInfo(cliente.id, finca.id);
    if (Object.keys(data).length > 0) {
      props.setInformation(data);
      props.setLoading(false);
    } else {
      Swal.fire("Error!", "Si persiste, contacte a soporte", "error");
    }
  };
  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Desea cerra la sesión actual?",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonText: `Salir`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        history.push("/login");
      }
    });
  };
  const handleNovedad = () => {
    props.setModal(true);
    props.setDetail({
      tipo: "novedad",
      id: null,
    });
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
        {fincaActual.id ? (
          <button className="btn btn-info btn-md" onClick={handleNovedad}>
            Ultimas Novedades
          </button>
        ) : null}
        <p className="Navbar-Menu__username">{usuario.nombre}</p>
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
  setDetail,
  setModal,
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
