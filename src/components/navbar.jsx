import React from "react";
import "../styles/components/navbar.css";
import Logo from "../assets/img/logo.png";
import { Dropdown } from "react-bootstrap";
const Navbar = () => {
  return (
    <div className="Navbar">
      <img className="Navbar-logo" src={Logo} alt="" />
      <h3 className="Navbar-title">BASCULAPP</h3>
      <div>
        {" "}
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Cambiar finca
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
