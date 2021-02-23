import React, { useState, useEffect } from "react";
import "../styles/pages/signup.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Logo from "../assets/img/logo.png";
import signup from "../utils/signup";
import Loader from "../components/loader";
import Swal from "sweetalert2";
import axios from "axios";
const Signup = () => {
  const initialState = {
    clienteCode: "",
    clienteName: "",
    clienteId: "",
    // clienteMail: "",
    clientePhone: "",
    clienteAddress: "",
    clienteObs: "registro por plataforma",
    fincaName: "",
    fincaObs: "",
    userName: "",
    userCode: "",
    userNickName: "",
    userPhone: "",
    userMail: "",
  };
  let checked = false;
  const [form, setform] = useState(initialState);
  const [loading, setloading] = useState(true);
  const [sendingData, setsendingData] = useState(true);
  useEffect(() => {
    const url =
      "https://basculapp.basculasyservicios.com/server/api/getLastUser.php";
    try {
      axios
        .get(url)
        .then((response) => {
          let data = response.data[0];
          setform({
            ...form,
            clienteCode: parseInt(data.cliente) + 1,
            userCode: parseInt(data.user) + 1,
          });
          setloading(false);
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
      checked = true;
      handleSetUserName(form.clienteName);
    } else {
      checked = false;
    }
  };
  const handleSetUserName = (inputName) => {
    let name = inputName.trim().split(" ");
    let username;
    if (name.length >= 2) {
      username =
        name[0].charAt(0) +
        (name[1].length > 2 ? name[1] : name[2] ? name[2] : name[1]) +
        "1";
    } else if (name.length < 2) {
      username = name[0] + "1";
    }
    checked
      ? setform({
          ...form,
          userNickName: username,
          userName: capitalize(inputName),
          userPhone: form.clientePhone,
        })
      : setform({
          ...form,
          userNickName: username,
          userName: capitalize(inputName),
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
    setform({
      ...form,
      [e.target.name]:
        e.target.type == "text" ? capitalize(e.target.value) : e.target.value,
    });
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify(form));
    setsendingData(true);
    let passwordOk = checkPassword() ? true : false;
    let resp = passwordOk ? await signup(form) : false;
    if (resp) {
      Swal.fire(
        "¡Listo!",
        "Tu información ha sido registrada con exito, pronto nos comunicaremos contigo.",
        "success"
      );
      setform(initialState);
    } else {
      Swal.fire("¡Error!", "Si el error persiste, contacte a soporte", "error");
    }
    setsendingData(false);
  };
  const checkPassword = () => {
    return form.password1 === form.password2 ? true : false;
  };
  return (
    <>
      <div className="Signup">
        <div className="Signup__title">
          <Row>
            <Col md={1}>
              <img className="Signup__logo" src={Logo} alt="" />
            </Col>
            <Col md={11}>
              <h2 className="">Formulario de registro Basculapp</h2>
            </Col>
          </Row>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={signupSubmit}>
            <div className="Signup__form">
              <br />
              <h4 className="Signup__subtitle">Información de cliente</h4>
              <div className="Signup__cliente">
                <Row>
                  <Col s={12} md={2}>
                    <Form.Group>
                      <Form.Label>Código de cliente</Form.Label>
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
                        name="clienteId"
                        value={form.clienteId}
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
                  {/* <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={handleInput}
                      name="clienteMail"
                      value={form.clienteMail}
                      className="input"
                      placeholder=""
                      required
                    />
                  </Form.Group>
                </Col> */}
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
                  <Col xs={12} md={8}>
                    <Form.Group>
                      <Form.Label>Dirección o Ubicación</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleInput}
                        name="clienteAddress"
                        value={form.clienteAddress}
                        className="input"
                        placeholder="Ciudad o pueblo"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <h4 className="Signup__subtitle">Registro de finca</h4>
              <div className="Signup__finca">
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Nombre de finca</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleInput}
                        name="fincaName"
                        value={form.fincaName}
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
                        className="textarea"
                        rows={2}
                        onChange={handleInput}
                        name="fincaObs"
                        value={form.fincaObs}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <h4 className="Signup__subtitle">Usuario de ingreso</h4>
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
                        onChange={(e) => handleSetUserName(e.target.value)}
                        name="userName"
                        value={form.userName}
                        className="input"
                        required
                      />
                      <input type="checkbox" onChange={handleCheck} /> Repetir
                      información del cliente
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
                        type="email"
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
            </div>
            <div className="Signup__form-footer">
              <Button
                variant="success"
                type="submit"
                size="lg"
                disabled={loading}
              >
                {sendingData ? "Cargando" : "Registrarse"}
              </Button>
              <div className="Signup-footer">
                Al dar click en "Registrarse", aceptas estar de acuerdo con los
                Terminos y condiciones y la Politica de privacidad
              </div>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default Signup;
