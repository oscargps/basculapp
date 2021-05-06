import React, { useState, useEffect } from "react";
import "../styles/components/tabla.css";
import "../styles/components/maintable.css";
import CalcTotales from "../utils/calcTotales";
import DataTable from "react-data-table-component";
import { setModal, setModal2, setMoveSell, setDetail } from "../actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MainTable = (props) => {
  const {
    reses,
    titulo_tabla,
    data,
    titulo,
    tipo,
    allowNew,
  } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  const customStyles = {
    headRow: {
      style: {
        fontSize: "28px",
        fontWeight: 400,
        backgroundColor: "#d3d3d3",
      },
    },
  };
  const columns = [
    {
      name: "Nombre",
      selector: "ref",
      sortable: true,
    },
    {
      name: "Cantidad",
      selector: "comp",
      sortable: true,
    },
    {
      name: "Promedio actual",
      selector: "promedio",
      sortable: true,
    },
    {
      name: "Ultimo pesaje",
      selector: "lote",
      sortable: true,
    },
    {
      name: "Peso Maximo",
      selector: "valmax",
      sortable: true,
    },
    {
      name: "Peso minimo",
      selector: "valmin",
      sortable: true,
    },
  ];
  const getTotales = () => {
    let lotes = [];
    data.map((result) => {
      let totales = CalcTotales(reses, result.id);
      lotes.push({...result, ...totales});
    });
    return lotes;
  };
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
    let dataTotal = getTotales();
    setSearchResults(dataTotal.length > 0 ? dataTotal : []);
  }, [data]);
  useEffect(() => {
    let dataTotal = getTotales();
    const results =
    dataTotal.length > 0
        ? dataTotal.filter((dato) => dato[titulo].toLowerCase().includes(searchTerm))
        : [];
    setSearchResults(results);
  }, [searchTerm]);

  const handleNew = () => {
      props.setModal2(true);
      props.setMoveSell({
        tipo: "newlote",
        id: null,
      });
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
          <DataTable
            fixedHeader
            striped
            highlightOnHover
            pagination={true}
            pointerOnHover
            noHeader
            customStyles={customStyles}
            paginationRowsPerPageOptions={[10, 20, 50]}
            columns={columns}
            data={searchResults}
            onRowClicked={(row) => {
              clickDetail(row.id);
            }}
          />
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
