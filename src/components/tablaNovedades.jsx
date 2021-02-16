import React from "react";
import "../styles/components/tablepesaje.css";
import { connect } from "react-redux";
import { setDetail, setModal2 } from "../actions";
const TablaNovedades = (props) => {
  const { novedades } = props;
  const handleClick = (e) => {
    let novedad = JSON.parse(e.target.value);
    switch (novedad.tipo) {
      case "CL":
        props.setDetail({
          tipo: "lote",
          id: novedad.ref,
        });
        break;
      case "TR":
        props.setDetail({
          tipo: "res",
          id: novedad.ref,
        });
        break;
      case "VT":
        props.setDetail({
          tipo: "res",
          id: novedad.ref,
        });
        break;
      case "NP":
        props.setDetail({
          tipo: "registro",
          id: novedad.ref,
        });
        break;
    }
  };
  return (
    <>
      <table className=" table TableRegistros-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Usuario</th>
            <th>Tipo</th>
            <th>Referencia</th>
            <th>Fecha</th>
            <th>Obs</th>
          </tr>
        </thead>
        <tbody>
          {novedades.length > 0 ? (
            novedades.map((novedad) => {
              return (
                <tr key={novedad.id}>
                  <td>{novedad.id}</td>
                  <td>{novedad.usuario}</td>
                  <td>{novedad.tipo}</td>
                  <td>
                    <button
                      value={JSON.stringify(novedad)}
                      onClick={handleClick}
                      className="btn btn-secondary btn-sm"
                    >
                      {novedad.ref}
                    </button>
                  </td>
                  <td>{novedad.fecha}</td>
                  <td>{novedad.obs}</td>
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

const mapStateToProps = (state) => {
  return {
    novedades: state.novedades,
  };
};
const mapDispatchToProps = {
  setDetail,
  setModal2,
};

export default connect(mapStateToProps, mapDispatchToProps)(TablaNovedades);
