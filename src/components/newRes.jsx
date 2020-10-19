import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setModal, setNewRes, setMoveSell, setModal2 } from "../actions";
import "../styles/components/newres.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import TableNewRes from "../components/tableNewRes";
const NewRes = (props) => {
  const getToday = () => {
    let hoy = new Date();
    let año = hoy.getFullYear();
    let mes = hoy.getMonth() + 1;
    let dia = hoy.getDate();
    let fecha = año + "-" + (mes < 10
    ? "0" + mes
    : mes) + "-" +( dia < 10
    ? "0" + dia
    : dia);
    return fecha
  };
  const { lotes } = props;
  const [Lote, setLote] = useState("");
  const [numeroRes, setnumeroRes] = useState("");
  const [raza, setraza] = useState("");
  const [fechanac, setfechanac] = useState(getToday);
  const [genero, setgenero] = useState("");
  const [subgenero, setsubgenero] = useState("");
  const [pesonac, setpesonac] = useState(0);
  const [fechaing, setfechaing] = useState(getToday);
  const [obs, setobs] = useState("");

  const razas = [
    "Brahman",
    "Cebu",
    "Guzerat",
    "Girolanda",
    "Harton",
    "RomoSinuano",
    "Mezclada",
    "Otra",
  ];

  const subgeneros = [
    "Ceba",
    "Levante",
    "Toro",
    "Escotera",
    "Lechera",
    "Vientre",
    "Cria",
    "Otra",
  ];

  const validarForm = (ingreso) => {
    let result = true;
    Object.keys(ingreso).map((item) => {
      if (ingreso[item] === "" && item != "obs") {
        Swal.fire(
          "¡Campo vacio!",
          "Verifica la información y reintenta",
          "warning"
        );
        result = false;
        return;
      }
    });
    return result;
  };

  const addRes = () => {
    let ingreso = {
      Lote,
      numeroRes,
      raza,
      fechanac,
      genero,
      subgenero,
      pesonac,
      fechaing,
      obs,
    };
    if (validarForm(ingreso)) {
      props.setNewRes(ingreso);
    }
  };
  return (
    <div className="NewRes">
      <div className="NewRes-header">
        <div>
          <label htmlFor="">Lote de destino: </label>
          <DropdownButton
            variant="secondary"
            title={
              Lote ? Lote.id + "-" + Lote.ref : "Seleccionar lote destino.."
            }
            id="dropdown-menu-align-right"
            onSelect={(e) => setLote(JSON.parse(e))}
          >
            {lotes.map((lote) => (
              <Dropdown.Item key={lote.id} eventKey={JSON.stringify(lote)}>
                {lote.id}-{lote.ref}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className="NewRes-header__options">
          <button className="btn btn-success">Descargar plantilla </button>
          <button className="btn btn-success">Cargar Reses </button>
        </div>
        <button
          onClick={() => {
            props.setMoveSell({
              tipo: "newReses",
              id: null,
            });
            props.setModal2(true);
          }}
          className="btn btn-success watchTable"
        >
          Ver Ingresados
        </button>
      </div>
      <div className="NewRes-content">
        <div className="NewRes-content__Form">
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Numero de identifiación</Form.Label>
                  <Form.Control
                    className="input"
                    type="text"
                    placeholder="123ABC"
                    onChange={(e) => setnumeroRes(e.target.value)}
                    value={numeroRes}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Raza</Form.Label>
                  <DropdownButton
                    variant="outline-dark"
                    title={raza ? raza : "Seleccionar raza.."}
                    id="dropdown-menu-align-right"
                    onSelect={(e) => setraza(e)}
                  >
                    {razas.map((raza) => (
                      <Dropdown.Item key={raza} eventKey={raza}>
                        {raza}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Fecha nacimiento (Opcional)</Form.Label>
              <Form.Control
                onChange={(e) => setfechanac(e.target.value)}
                value={fechanac}
                className="input"
                type="date"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Genero</Form.Label>
                  <DropdownButton
                    variant="outline-dark"
                    title={genero ? genero : "Seleccionar genero.."}
                    id="dropdown-menu-align-right"
                    onSelect={(e) => setgenero(e)}
                  >
                    <Dropdown.Item eventKey={"Macho"}>Macho</Dropdown.Item>
                    <Dropdown.Item eventKey={"Hembra"}>Hembra</Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Subgenero</Form.Label>
                  <DropdownButton
                    variant="outline-dark"
                    title={subgenero ? subgenero : "Seleccionar subgenero.."}
                    id="dropdown-menu-align-right"
                    onSelect={(e) => setsubgenero(e)}
                  >
                    {subgeneros.map((subgenero) => (
                      <Dropdown.Item key={subgenero} eventKey={subgenero}>
                        {subgenero}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Peso ingreso (Opcional)</Form.Label>
                  <Form.Control
                    onChange={(e) => setpesonac(e.target.value)}
                    value={pesonac}
                    className="input"
                    type="number"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Fecha de ingreso</Form.Label>
                  <Form.Control
                    onChange={(e) => setfechaing(e.target.value)}
                    value={fechaing}
                    className="input"
                    type="date"
                  />
                </Form.Group>
              </Col>
            </Row>
            <textarea
              className="form-control"
              name="Text1"
              cols="40"
              rows="5"
              value={obs}
              placeholder="Observaciones adicionales.."
              onChange={(e) => setobs(e.target.value)}
            ></textarea>
          </Form>
        </div>
        <div className="NewRes-content__TableSave">
          <div id="ingresados" className="NewRes-content__Table ">
            <TableNewRes />
          </div>

          <div className="NewRes-content__Options">
            <button className="btn btn-primary" onClick={addRes}>
              Añadir
            </button>
            <button className="btn btn-success btn-block" onClick={null}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  setNewRes,
  setModal,
  setModal2,
  setMoveSell,
};
const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    usuario: state.usuario,
    fincaActual: state.fincaActual,
    reses: state.reses,
    lotes: state.lotes,
    modal: state.modal,
    newReses: state.newReses,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewRes);
