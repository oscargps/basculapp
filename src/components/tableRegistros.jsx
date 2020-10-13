import React from "react";
import "../styles/components/tablepesaje.css";
const TableRegistros = ({ data }) => {
  return (
    <>
      <table className=" table TableRegistros-table">
        <thead>
          <tr>
            <th>Registro</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((peso) => {
              return (
                <tr key={peso.fecha}>
                  <td>{peso.registro}</td>
                  <td>{peso.fecha}</td>
                  <td>{peso.usuario}</td>
                  <td><button className="btn btn-secondary btn-sm">Ver</button></td>
                </tr>
              );
            })
          ) : (
            <tr>
              <p>No hay registros</p>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableRegistros;
