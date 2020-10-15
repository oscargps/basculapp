import React from "react";
import "../styles/components/tablepesaje.css";
const TablePesajes = ({ pesos }) => {
  let pesoAnt = [];
  return (
    <>
      <table id="table-to-xls" className=" table TablePesajes-table">
        <thead>
          <tr>
            <th>Peso</th>
            <th>Fecha</th>
            <th>Ganancia</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {pesos.length > 0 ? (
            pesos.map((peso) => {

              pesoAnt.push(peso.cantidad);
              let ganancia =
                peso.cantidad - (pesoAnt.length >= 2
                  ? pesoAnt[pesoAnt.length - 2]
                  : 0);
              return (
                <tr key={peso.fecha}>
                  <td>{peso.cantidad}</td>
                  <td>{peso.fecha}</td>
                  <td>{ganancia}</td>
                  <td>{peso.obs}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <p>No hay pesajes registrados</p>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TablePesajes;
