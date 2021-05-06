import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setDetail } from "../actions";
import "../styles/components/tablepesaje.css";
import DataTable from "react-data-table-component";

const TableReses = (props) => {
  const { reses, idLote, resultados, grafica } = props;
  const [resesLote, setResesLote] = useState([]);
  useEffect(() => {
    let result = reses.filter((res) => res.lote === idLote);
    setResesLote(result);
    getResults(result);
    graficar(result);
  }, [reses, idLote]);

  const getResults = (data) => {
    let cantidad = 0;
    let valmax = 0;
    let idMax = "";
    let idMin = "";
    let valmin = 100000;
    let total = 0;
    data.map((res) => {
      let peso = parseInt(res["ultimo peso"]);
      cantidad++;
      if (peso > valmax) {
        valmax = peso;
        idMax = res.numero;
      }
      if (peso < valmin && peso > 0) {
        valmin = peso;
        idMin = res.numero;
      }
      total += peso;
      return true
    });
    resultados({
      cantidad,
      total,
      max: { valmax, idMax },
      min: { valmin, idMin },
    });
  };
  const graficar = (data) => {
    let dato = [["0", 0]];
    if (data.length > 0) {
      dato = data.map((peso) => {
        let pesoNum = parseInt(peso["ultimo peso"]);
        return [peso.numero, pesoNum];
      });
    }
    grafica([["fecha", "peso"]].concat(dato));
  };

  const handleClick = (id) => {
    props.setDetail({
      tipo: "res",
      id: id,
    });
  };
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
      name: "Res",
      selector: "numero",
      sortable: true,
    },
    {
      name: "Ultimo peso",
      selector: "ultimo peso",
      sortable: true,
    },
    {
      name: "Fecha",
      selector: "fecha ultimo peso",
      sortable: true,
    },
    {
      name: "Observacion",
      selector: "obs",
      sortable: true,
    },
  ];
  return (
    <>
      {/* <table id="table-to-xls" className=" table  table-responsive-md TableReses-table">
        <thead>
          <tr>
            <th>Res</th>
            <th>Raza</th>
            <th>Genero</th>
            <th>Subgenero</th>
            <th>Último peso</th>
            <th>Fecha último peso</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {resesLote.length > 0 ? (
            resesLote.map((res) => (
              <tr key={res.id}>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    value={res.id}
                    onClick={handleClick}
                  >
                    {res.numero}
                  </button>
                </td>
                <td>{res.raza}</td>
                <td>{res.genero}</td>
                <td>{res.subgenero}</td>
                <td>{res["ultimo peso"]}</td>
                <td>{res["fecha ultimo peso"]}</td>
                <td>{res.obs}</td>
              </tr>
            ))
          ) : (
            <tr>
              <p>No hay reses en este lote</p>
            </tr>
          )}
        </tbody>
      </table> */}
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
            data={resesLote}
            onRowClicked={(row) => {
              handleClick(row.id);
            }}
          />
    </>
  );
};
const mapDispatchToProps = {
  setDetail,
};

export default connect(null, mapDispatchToProps)(TableReses);
