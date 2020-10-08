import React from "react";
import "../styles/components/tabla.css";
import TablaItem from "./TablaItem";

const Tabla = ({ titulo, datos, row }) => {


  return (
    <div className="Tabla">
      <div className="card">
        <div className="card-header Tabla-header">{titulo}</div>
        <div className="card-body">
          {datos.length > 0 &&
            datos.map((res) => (
              <TablaItem key={res.id} titulo={res[row]} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tabla;
