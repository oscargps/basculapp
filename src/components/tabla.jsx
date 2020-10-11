import React from "react";
import "../styles/components/tabla.css";
import TablaItem from "./TablaItem";

const Tabla = ({ titulo_tabla, datos, titulo,subtitulo }) => {

  return (
    <div className="Tabla">
      <div className="card">
        <div className="card-header Tabla-header">{titulo_tabla}</div>
        <div className="card-body">
          {datos.length > 0 &&
            datos.map((res) => (
              <TablaItem key={res.id} titulo={res[titulo]} subtitulo={res[subtitulo]} />
            ))}
        </div>
        <div className="card-footer">
        <h5>Total: {datos.length}</h5>
        </div>
      </div>
    </div>
  );
};

export default Tabla;
