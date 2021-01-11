import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/components/newlote.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import ChangePasswordScript from "../utils/changePassword";
const ChangePassword = (props) => {
const {usuario} = props
  const [form, setValues] = useState({
    oldpw: "",
    newpw: "",
    newpw2: "",
    usuario: usuario.id
  });
  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async() => {
    if (form.newpw != form.newpw2) {
      Swal.fire({ title: "Las contraseñas no coinciden", icon: "error" });
    } else {
      let resp = await ChangePasswordScript(form);
      if (resp) {
        Swal.fire({
          title: "¡Contraseña actualizada!",
          text: "Ingresa nuevamente a la plataforma.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            sessionStorage.clear();
            window.location.href = "/";
          }
        });
      } else {
        Swal.fire({
          title: "Algo salió mal, verifique la información ingresada.",
          text: "Si el error persiste, contacte a soporte.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };
  return (
    <div>
      <Form className="ChangePassword-Form">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Contraseña actual</Form.Label>
              <Form.Control
                className="input"
                type="password"
                value={form.oldpw}
                name="oldpw"
                onChange={handleInput}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                className="input"
                type="password"
                value={form.newpw}
                name="newpw"
                onChange={handleInput}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Repite nueva contraseña</Form.Label>
              <Form.Control
                className="input"
                type="password"
                value={form.newpw2}
                name="newpw2"
                onChange={handleInput}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <button
        className="btn btn-primary"
        onClick={handleSave}
        disabled={form.oldpw && form.newpw && form.newpw2 ? false : true}
      >
        Guardar cambios
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
   usuario : state.usuario
  }
}

export default connect(mapStateToProps, null)(ChangePassword);
