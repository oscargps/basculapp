import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setMoveSell, setReset } from "../actions";
import "../styles/components/newlote.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import newLote from "../utils/newLote";
import getFecha from "../utils/getFecha";

const NewLote = (props) => {
  const { lotes, cliente, fincaActual, usuario } = props;
  const [idNewLote, setIdNewLote] = useState("");
  const [NewLote, setNewLote] = useState("");
  const [obs, setobs] = useState("");
  const [LoteRepetido, setRepetido] = useState(false);

  const capitalize = (nombre) => {
    let nameSplitted = nombre.split(" ");
    let nameCapitalized = [];
    nameSplitted.map((word) => {
      nameCapitalized.push(word.charAt(0).toUpperCase() + word.slice(1));
    });
    return nameCapitalized.join(" ");
  };

  const getIniciales = (nombre) => {
    let nombreSeparado = nombre.split(" ");
    let id = [];
    switch (nombreSeparado.length) {
      case 1:
        return "L" + nombreSeparado[0].charAt(0).toUpperCase();
        break;
      default:
        nombreSeparado.map((palabra) => {
          id.push(palabra.charAt(0).toUpperCase());
        });
        return id.join("");
    }
  };
  const handleChange = (e) => {
    let nameLote = e.target.value;
    setNewLote(capitalize(nameLote));
    setIdNewLote(fincaActual.id + "_" + getIniciales(nameLote));
    let repetidos = lotes.filter(
      (lote) =>
        lote.id === fincaActual.id + "_" + getIniciales(nameLote) ||
        lote.ref.trim() == nameLote.trim()
    );
    setRepetido(repetidos.length > 0 ? true : false);
  };

  const handleClick = async () => {
    if (NewLote === "" || LoteRepetido) {
      Swal.fire(
        "Información errada o vacia",
        "Verifica los campos requeridos",
        "warning"
      );
    } else {
      let fecha = getFecha();
      let header = {
        id: cliente.id + "_" + fecha,
        usuario: usuario.id,
        cliente: cliente.id,
        finca: fincaActual.id,
        tipo: "CL",
        tiporef: "lote",
        ref: idNewLote,
        obs: "Creación del lote " + NewLote,
      };
      let data = {
        cliente: cliente.id,
        finca: fincaActual.id,
        id: idNewLote,
        lote: NewLote,
        obs,
      };
      let resp = await newLote(header, data);
      if (resp) {
        Swal.fire("¡Listo!", "El lote ha sido creado con exito", "success");
        props.setReset(true);
      } else {
        Swal.fire(
          "¡Error!",
          "Si el error persiste, contacte a soporte",
          "error"
        );
      }
    }
  };
  return (
    <div className="NewLote">
      <Form className="NewLote-Form">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Identifiación del lote</Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="000_1_AB"
                disabled
                value={idNewLote}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Nombre del lote</Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="El Charco"
                onChange={handleChange}
                value={NewLote}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <textarea
          maxlength="40"
          className="form-control"
          name="Text1"
          cols="40"
          rows="3"
          value={obs}
          placeholder="Observaciones del lote.."
          onChange={(e) => setobs(e.target.value)}
        ></textarea>
      </Form>
      {LoteRepetido && (
        <h5 style={{ color: "red" }}>Este lote ya se encuentra ingresado</h5>
      )}
      <button
        disabled={LoteRepetido}
        onClick={handleClick}
        className="btn btn-success btn-block NewLote-send"
      >
        Enviar
      </button>
    </div>
  );
};
const mapDispatchToProps = {
  setMoveSell,
  setReset,
};
const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    usuario: state.usuario,
    fincaActual: state.fincaActual,
    lotes: state.lotes,
    modal2: state.modal2,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewLote);
