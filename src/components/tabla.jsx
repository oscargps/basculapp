import React, { useState, useEffect } from "react";
import "../styles/components/tabla.css";
import TablaItem from "./TablaItem";
import { setModal, setModal2, setMoveSell, setDetail } from "../actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Tabla = (props) => {
  const { titulo_tabla, data, titulo, subtitulo, badge, tipo, allowNew } = props;
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
  const getTipoRef =(tipo)=>{
    switch (tipo) {
      case "VT":
        return "Venta"
      case "CP":
        return "Compra"
      case "LT":
        return "Lote"
      case "RM":
        return "Grupo de reses"
      case "RI":
        return "Res individual"
      default:
        return "Otro"
    }
  }
  return (
    <div className="Tabla">
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
        <div className="card-body">
          <div className="tabla-content">
            {searchResults.length > 0 ? (
              searchResults.length > 0 &&
              searchResults.map((res) => (
                <TablaItem
                  key={res.id}
                  titulo={res[titulo]}
                  subtitulo={
                    tipo == "lote"
                      ? "Cantidad: " + res[subtitulo]
                      : res[subtitulo]
                  }
                  id={res.id}
                  select={() => clickDetail(res.id)}
                  badge={tipo == "registro"
                      ? getTipoRef(res[badge])
                      : res[badge]}
                />
              ))
            ) : (
              <h5>No se encuentran registros</h5>
            )}
          </div>
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

export default connect(null, mapDispatchToProps)(Tabla);
