import React, { useState } from "react";
import "../styles/components/loginform.css";
import { connect } from "react-redux";
import {useHistory} from 'react-router-dom'
import { setLogin } from "../actions";
import Login from "../utils/login";
import Swal from "sweetalert2";
const LoginForm = (props) => {
  let history = useHistory();
;
  const [form, setValues] = useState({
    user: "",
    pw: "",
    cliente: "",
  });
  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp = await Login(form);
    if (resp) {
        props.setLogin(resp);
        history.push("/");
    } else {
      Swal.fire({
        title: "Información incorrecta",
        text: "Verifique y reintente",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleInput}
        className="form-control"
        name="user"
        placeholder="Usuario"
        required
      />
      <input
        type="password"
        onChange={handleInput}
        className="form-control"
        name="pw"
        placeholder="Contraseña"
        required
      />
      <input
        type="number"
        onChange={handleInput}
        className="form-control"
        name="cliente"
        placeholder="Codigo usuario"
        required
      />
      <input
        type="submit"
        value="Ingresar"
        className="btn btn-success btn-block"
      />
    </form>
  );
};
const mapDispatchToProps = {
  setLogin,
};
const mapStateToProps = (state) => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
