import React, { useState } from "react";
import "../styles/components/navbar.css";
import Logo from "../assets/img/logo.png";
import { connect } from "react-redux";
import {
  setFinca,
  setLoading,
  setInformation,
  setDetail,
  setModal,
  setModal2,
  setMoveSell,
} from "../actions";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import getInfo from "../utils/getInfo";
import Swal from "sweetalert2";
import ChangePassword from "./changePassword";

const Navbar = (props) => {
  const { fincas, cliente, usuario, fincaActual } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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

  const verTerceros = () => {
    props.setModal(true);
    props.setDetail({
      tipo: "terceros",
      id: null,
    });
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
        window.location.href = "/";
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
  const handleCompra = () => {
    props.setModal(true);
    props.setDetail({
      tipo: "newres",
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
          size="sm"
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
          <>
            <button className="btn btn-success btn-sm">Ventas</button>
            <button className="btn btn-primary btn-sm" onClick={handleCompra}>
              Compras
            </button>
            <button className="btn btn-info btn-sm" onClick={handleNovedad}>
              Ultimas Novedades
            </button>
          </>
        ) : null}
        <DropdownButton
          variant="outline-light"
          size="sm"
          title={usuario.nombre}
          id="dropdown-menu-align-right"
        >
          <Dropdown.Item onClick={verTerceros} disabled={!fincaActual.id}>
            Terceros
          </Dropdown.Item>
          <Dropdown.Item disabled={!fincaActual.id}>
            Administrar Finca
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShow(true)}>
            Cambiar contraseña
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
        </DropdownButton>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cambiar contraseña</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ChangePassword />
          </Modal.Body>
        </Modal>
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
  setModal2,
  setMoveSell,
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
