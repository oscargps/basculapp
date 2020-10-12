import React from "react";
import "../styles/components/tablaItem.css";
import { setModal } from "../actions";
import { connect } from "react-redux";

const TablaItem = (props) => {
  const { titulo,subtitulo } = props;

  const handleClick=() => {
    props.setModal(true)
  }
  return (
    <div className="TablaItem">
      <div className="TablaItem-title">
        <p className="TablaItem-title__title">{titulo}</p>
        <p >{subtitulo}</p>
      </div>
      <button onClick={handleClick} className="TablaItem-button btn btn-secondary btn-sm">Ver</button>
    </div>
  );
};

const mapDispatchToProps = {

  setModal
};

export default connect(null, mapDispatchToProps)(TablaItem); 
