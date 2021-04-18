import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setMoveSell, setReset } from "../actions";
import "../styles/components/newlote.css";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import newTercero from "../utils/newTercero";

const NewTercero = (props) => {
  const { terceros, cliente, usuario, onMove } = props;
  let initialState =
    onMove.id.mode === "new"
      ? {
          mode: "new",
          id: "",
          identificacion: "",
          cliente: cliente.id,
          nombre: "",
          contacto: "",
          obs: "",
        }
      : onMove.id;
  const [tercero, setTercero] = useState(initialState);
  const [TerceroRepetido, setRepetido] = useState(false);

  useEffect(() => {
    if (tercero.mode === "delete") {
      Swal.fire({
        title: "¿Eliminar Tercero?",
        text: "¿Desea eliminar a " + tercero.nombre + "?",
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: `Eliminar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          handleClick()
        }
      });
    }
  }, []);
  const handleChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    let id = cliente.id + "_" + tercero.identificacion;
    let repetidos = terceros.filter(
      (ter) => tercero.identificacion === ter.identificacion
    );
    setRepetido(
      repetidos.length > 0 ? (tercero.mode == "update" ? false : true) : false
    );
    setTercero({ ...tercero, [key]: value, id });
  };

  const handleClick = async () => {
    if (
      tercero.identificacion === "" ||
      tercero.nombre === "" ||
      TerceroRepetido
    ) {
      Swal.fire(
        "Información errada o vacia",
        "Verifica los campos requeridos",
        "warning"
      );
    } else {
      let header = {
        id: tercero.id,
        usuario: usuario.id,
        cliente: cliente.id,
        tipo: "CT",
        tiporef: "tercero",
        ref: tercero.id,
        obs: tercero.nombre,
        mode: onMove.id.mode,
      };

      let resp = await newTercero(header, tercero);
      if (resp) {
        Swal.fire(
          "¡Listo!",
          tercero.mode === "delete"
            ? "Eliminado con exito"
            : "Se ha creado con exito",
          "success"
        );
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
      <h3>Creación y modificación de terceros</h3>
      <Form className="NewLote-Form">
        <Form.Group>
          <Form.Label>Identifiación</Form.Label>
          <Form.Control
            className="input"
            type="text"
            name="identificacion"
            placeholder="Nit o Cédula"
            onChange={handleChange}
            value={tercero.identificacion}
            disabled={tercero.mode === "update"}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nombre o Razon Social</Form.Label>
          <Form.Control
            className="input"
            type="text"
            name="nombre"
            placeholder=""
            onChange={handleChange}
            value={tercero.nombre}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contacto</Form.Label>
          <Form.Control
            className="input"
            type="text"
            name="contacto"
            placeholder="3100000000"
            onChange={handleChange}
            value={tercero.contacto}
            required
          />
        </Form.Group>
        <textarea
          maxLength="40"
          className="form-control"
          name="obs"
          cols="40"
          rows="3"
          value={tercero.obs}
          placeholder="Observaciones adicionales"
          onChange={handleChange}
        ></textarea>
      </Form>
      {TerceroRepetido && (
        <h5 style={{ color: "red" }}>Ya se encuentra en el sistema</h5>
      )}
      <button
        disabled={TerceroRepetido || tercero.mode === "delete"}
        onClick={handleClick}
        className="btn btn-success btn-block NewLote-send"
      >
        {tercero.mode === "new" ? "Crear" : "Actualizar"}
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
    terceros: state.terceros,
    modal2: state.modal2,
    onMove: state.onMove,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewTercero);
