import React, { useState, useEffect } from "react";
import "../styles/components/tabla.css";
import TablaItem from "./TablaItem";
import { setModal, setDetail } from "../actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Tabla = (props) => {
  const { titulo_tabla, data, titulo, subtitulo, tipo, allowNew } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const clickDetail = (e) => {
    props.setModal(true);
    props.setDetail({
      tipo,
      id: e.target.value,
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
    props.setModal(true);

    props.setDetail({
      tipo: "new" + tipo,
      id: null,
    });
  };
  return (
    <div className="Tabla">
      <div className="card">
        <div className="card-header Tabla-header">
          {titulo_tabla}
          <button disabled={!allowNew} className="btn btn-dark Tabla-new" onClick={handleNew}>
            <FontAwesomeIcon icon="plus-circle" />
          </button>
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
        <div className="card-body">
          <div className="tabla-content">
            {searchResults.length > 0 ? (
              searchResults.length > 0 &&
              searchResults.map((res) => (
                <TablaItem
                  key={res.id}
                  titulo={res[titulo]}
                  subtitulo={res[subtitulo]}
                  id={res.id}
                  select={clickDetail}
                />
              ))
            ) : (
              <h5>No se encuentran registros</h5>
            )}
          </div>
        </div>
        <div className="card-footer">
          <h5>Total: {searchResults.length}</h5>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setDetail,
  setModal,
};

export default connect(null, mapDispatchToProps)(Tabla);
