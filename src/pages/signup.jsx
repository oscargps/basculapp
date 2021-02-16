import React, { useState, useEffect } from "react";
import "../styles/pages/signup.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import axios from 'axios'
const Signup = () => {
  const [form, setform] = useState({
    clienteCode: "",
    clienteName: "",
    id: "",
    clienteMail: "",
    clientePhone: "",
    address: "",
    finca: "",
    fincaObs: "",
    userName: "",
    userCode: "",
    userNickName: "",
    userPhone: "",
    userMail: "",
  });
  useEffect(() => {
    const url = "https://basculapp.basculasyservicios.com/server/api/getLastUser.php"
    try {
      axios
        .get(url)
        .then((response) => {
          let data = response.data[0];
          setform({
            ...form,
            clienteCode: parseInt(data.cliente)+ 1,
            userCode: parseInt(data.user) + 1,
          });
        })
        .catch((er) => {
          return {};
        });
    } catch (error) {
      return {};
    }
  }, []);
  const handleCheck = (e) => {
    if (e.target.checked) {
      setform({
        ...form,
        userName: form.clienteName,
        userPhone: form.clientePhone,
        userMail: form.clienteMail,
      });
    }
  }
  const handleSetUserName = (e) => {
    let name = e.target.value.trim().split(" ");
    let username;
    if (name.length >= 2) {
      username =
        name[0].charAt(0) +
        (name[1].length > 2 ? name[1] : name[2] ? name[2] : name[1]);
    } else if (name.length < 2) {
      username = name[0] + "1";
    }
    setform({
      ...form,
      userNickName: username,
      [e.target.name]: capitalize(e.target.value),
    });
  };
  const capitalize = (nombre) => {
    let nameSplitted = nombre.split(" ");
    let nameCapitalized = [];
    nameSplitted.map((word) => {
      nameCapitalized.push(word.charAt(0).toUpperCase() + word.slice(1));
    });
    return nameCapitalized.join(" ");
  };
  const handleInput = (e) => {
    if (e.target.type == "text") {
      setform({
        ...form,
        [e.target.name]: capitalize(e.target.value),
      });
    } else {
      setform({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const getIds = () => {
   
  }
  return (
    <>
      <div className="card container Signup">
        <div className="card-header Signup__title">
          <h1 className="">Registro Basculapp</h1>
        </div>
        <hr />
        <div className="card-body">
          <h4 className="Signup__title">Registro de cliente</h4>
          <div className="Signup__cliente">
            <Form>
              <Row>
                <Col s={12} md={2}>
                  <Form.Group>
                    <Form.Label>Código de usuario</Form.Label>
                    <Form.Control
                      type="text"
                      name="clienteCode"
                      value={form.clienteCode}
                      className="input"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={2}>
                  <Form.Group>
                    <Form.Label>Identificación</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleInput}
                      name="id"
                      value={form.id}
                      className="input"
                      placeholder="Nit o Cédula"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Group>
                    <Form.Label>Nombre de cliente</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleInput}
                      name="clienteName"
                      value={form.clienteName}
                      className="input"
                      placeholder="Empresa o Persona natural"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleInput}
                      name="clienteMail"
                      value={form.clienteMail}
                      className="input"
                      placeholder=""
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>Teléfono de contacto</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleInput}
                      name="clientePhone"
                      value={form.clientePhone}
                      className="input"
                      placeholder="0000000000"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>Dirección o Ubicación</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleInput}
                      name="address"
                      value={form.address}
                      className="input"
                      placeholder="Ciudad o pueblo"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <h4 className="Signup__title">Registro de finca</h4>
              <div className="Signup__finca">
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Nombre de finca</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleInput}
                        name="finca"
                        value={form.finca}
                        className="input"
                        placeholder="La Luz"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>
                        Observaciones de la finca (Opcional)
                      </Form.Label>
                      <Form.Control
                        placeholder="Ubicación, propósito, etc"
                        as="textarea"
                        rows={2}
                        onChange={handleInput}
                        name="fincaObs"
                        value={form.fincaObs}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <h4 className="Signup__title">Registro de usuario</h4>
              <div className="Signup__usuario">
                <Row>
                  <Col s={6} md={2}>
                    <Form.Group>
                      <Form.Label>Código de usuario</Form.Label>
                      <Form.Control
                        type="text"
                        name="userCode"
                        value={form.userCode}
                        className="input"
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col s={6} md={2}>
                    <Form.Group>
                      <Form.Label>Usuario de ingreso</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleInput}
                        name="userNickName"
                        value={form.userNickName}
                        className="input"
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={8}>
                    <Form.Group>
                      <Form.Label>Nombre de usuario</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleSetUserName}
                        name="userName"
                        value={form.userName}
                        className="input"
                        required
                      />
                      <input type="checkbox" onChange={handleCheck} /> Repetir información del cliente
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        onChange={handleInput}
                        name="password1"
                        value={form.password1}
                        className="input"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Repetir Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        onChange={handleInput}
                        name="password2"
                        value={form.password2}
                        className="input"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleInput}
                        name="userMail"
                        value={form.userMail}
                        className="input"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Telefono de contacto</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleInput}
                        name="userPhone"
                        value={form.userPhone}
                        className="input"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <hr />
              <Button variant="success" type="submit" size="lg">
                Registrarse
              </Button>
            </Form>
          </div>
        </div>
        <div className="card-footer">
          Al dar click en "Registrarse", acepta estar de acuerdo con los
          Terminos y condiciones
        </div>
      </div>
    </>
  );
};

export default Signup;
