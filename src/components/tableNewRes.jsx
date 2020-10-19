import React, { useState, useEffect } from "react";
import { deleteNewRes } from "../actions";
import { connect } from "react-redux";

const TableNewRes = (props) => {
  const { newReses, onMove } = props;
  const handleDelete = (e) => {
    props.deleteNewRes(e.target.value);
  };
  return (
    <table className="table ingresados">
      <thead>
        <tr>
          <th>Lote</th>
          <th>Numero</th>
          <th>Raza</th>
          <th>Genero</th>
          <th>Subgenero</th>
          <th>Observacion</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {newReses.length > 0 ? (
          newReses.map((res) => (
            <tr key={res.numeroRes}>
              <td>{res.lote}</td>
              <td>{res.numeroRes}</td>
              <td>{res.raza}</td>
              <td>{res.genero}</td>
              <td>{res.subgenero}</td>
              <td>{res.obs}</td>
              <td>
                <button
                  value={res.numeroRes}
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  X
                </button>
              </td>
            </tr>
          ))
        ) : (
          <p>No hay registros</p>
        )}
      </tbody>
    </table>
  );
};
const mapDispatchToProps = {
  deleteNewRes,
};
const mapStateToProps = (state) => {
  return {
    newReses: state.newReses,
    modal2: state.modal2,
    onMove: state.onMove,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableNewRes);
