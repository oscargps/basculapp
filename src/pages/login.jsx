import React, { useEffect } from "react";
import "../styles/pages/login.css";
import ImgJaula from "../assets/img/jaula.jpeg";
import Logo from "../assets/img/logo.png";

import LoginForm from "../components/loginform";
const LogPage = () => {
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  return (
    <div className="Login">
      <div className="Login-form">
        <img className="Login-form__img" src={Logo} alt="" />
        <LoginForm />
      </div>
      <img src={ImgJaula} className="Login-Imagen" alt="" />
    </div>
  );
};

export default LogPage;
