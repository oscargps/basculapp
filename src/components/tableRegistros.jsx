import React from "react";
import "../styles/components/tablepesaje.css";
import { connect } from "react-redux";
import { setDetail } from "../actions";
const TableRegistros = (props) => {
  const { data } = props;
  const handleClick = (e) => {
    props.setDetail({
      tipo:'registro',
      id: e.target.value,
    });
  };
  return (
    <>
      <table className=" table TableRegistros-table">
        <thead>
          <tr>
            <th>Registro</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th></th>
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
                  <td>
                    <button
                      value={peso.registro}
                      onClick={handleClick}
                      className="btn btn-secondary btn-sm"
                    >
                      Ver
                    </button>
                  </td>
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

const mapDispatchToProps = {
  setDetail,
};

export default connect(null, mapDispatchToProps)(TableRegistros);
