import React from "react";
import { connect } from "react-redux";
import { setDetail } from "../actions";
const TableRegDetalle = (props) => {
  const { data } = props;
  const handleClick = (e) => {
    props.setDetail({
      tipo: "res",
      id: e.target.value,
    });
  };
  return (
    <>
      <table id="table-to-xls" className=" table table-responsive-md">
        <thead>
          <tr>
            <th>Id</th>
            <th>Numero</th>
            <th>Peso</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((peso) => {
              return (
                <tr key={peso.ref}>
                  <td>{peso.ref}</td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      value={peso.ref}
                      onClick={handleClick}
                    >
                      {peso.numero}
                    </button>
                  </td>
                  <td>{peso.cantidad}</td>
                  <td>{peso.obs}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>
                <p>No hay pesajes registrados</p>
              </td>
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

export default connect(null, mapDispatchToProps)(TableRegDetalle);
