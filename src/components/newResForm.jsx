import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setModal, setNewRes, setMoveSell, setModal2 } from "../actions";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const NewResForm = (props) => {
    const {lote}  = props;
  const [numeroRes, setnumeroRes] = useState("");
  const [raza, setraza] = useState("");
  const [fechanac, setfechanac] = useState("");
  const [genero, setgenero] = useState("");
  const [subgenero, setsubgenero] = useState("");
  const [pesonac, setpesonac] = useState("");
  const [fechaing, setfechaing] = useState("");
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

  return (
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
  );
};

export default connect(null, null)(NewResForm);
