import React, { useState, useEffect } from "react";
import "../styles/components/tabla.css";
import "../styles/components/maintable.css";
import Table from "react-bootstrap/Table";
import CalcTotales from "../utils/calcTotales";
import { setModal, setModal2, setMoveSell, setDetail } from "../actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MainTable = (props) => {
  const {
    reses,
    titulo_tabla,
    data,
    titulo,
    subtitulo,
    tipo,
    allowNew,
  } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const clickDetail = (id) => {
    props.setModal(true);
    props.setDetail({
      tipo,
      id: id,
    });
  };
  useEffect(() => {
    setSearchResults(data.length > 0 ? data : []);
  }, [data]);
  useEffect(() => {
    const results =
      data.length > 0
        ? data.filter((dato) => dato[titulo].toLowerCase().includes(searchTerm))
        : [];
    setSearchResults(results);
  }, [searchTerm]);

  const handleNew = () => {
    if (tipo === "lote") {
      props.setModal2(true);
      props.setMoveSell({
        tipo: "new" + tipo,
        id: null,
      });
    } else {
      props.setModal(true);
      props.setDetail({
        tipo: "new" + tipo,
        id: null,
      });
    }
  };
  return (
    <div className="mainTable">
      <div className="card">
        <div className="card-header Tabla-header">
          {titulo_tabla}
          {allowNew && (
            <button
              disabled={!allowNew}
              className="btn btn-dark Tabla-new"
              onClick={handleNew}
            >
              <FontAwesomeIcon icon="plus-circle" />
            </button>
          )}
        </div>
        <div className="Tabla-filter">
          <input
            type="text"
            value={searchTerm}
            placeholder="Buscar..."
            onChange={handleChange}
            className="form-control filter"
          />
        </div>
        <div className="card-body maintable-table">
          <Table striped bordered hover size="sm" className="">
            <thead className="maintable-table__header">
              <tr>
                <th>Lote</th>
                <th>Cantidad Animales</th>
                <th>Promedio actual</th>
                <th>Ultimo pesaje</th>
                <th>Peso Maximo</th>
                <th>Peso minimo</th>
                <th>Ver</th>
              </tr>
            </thead>
            <tbody className="maintable-table__body">
              {searchResults.length > 0 ? (
                searchResults.length > 0 &&
                searchResults.map((res) => {
                  let totales = CalcTotales(reses, res.id);
                  return (
                    <tr key={res.id}>
                      <td>{res[titulo]}</td>
                      <td>{res[subtitulo]}</td>
                      <td>{totales.promedio}</td>
                      <td>@mdo</td>
                      <td>{totales.max.valmax}</td>
                      <td>{totales.min.valmin}</td>
                      <td>
                        <button
                          onClick={() => {
                            clickDetail(res.id);
                          }}
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>
                    <h5>No se encuentran registros</h5>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="card-footer tabla-footer">
          Total: {searchResults.length}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setMoveSell,
  setDetail,
  setModal,
  setModal2,
};
const mapStateToProps = (state) => {
  return {
    reses: state.reses,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainTable);
