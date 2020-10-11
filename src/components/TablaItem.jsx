import React from "react";
import "../styles/components/tablaItem.css";

const TablaItem = (props) => {
  const { titulo,subtitulo } = props;
  return (
    <div className="TablaItem">
      <div className="TablaItem-title">
        <p className="TablaItem-title__title">{titulo}</p>
        <p >{subtitulo}</p>
      </div>
      <button className="TablaItem-button btn btn-secondary btn-sm">Ver</button>
    </div>
  );
};

export default TablaItem;
