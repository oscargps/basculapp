import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {setDetail } from "../actions";
import "../styles/components/tablepesaje.css";
const TableReses = (props) => {
  const { reses, idLote, resultados,grafica } = props;
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
    let idMax=""
    let idMin=""
    let valmin = 100000;
    let total = 0;
    data.map((res) => {
      let peso = parseInt(res["ultimo peso"])
      cantidad++;
      if (peso > valmax) {
        valmax = peso;
        idMax = res.id
      }
      if (peso < valmin && peso > 0) {
        valmin = peso;
        idMin= res.id
      }
      total += peso;
    });
    resultados({cantidad, total, max:{valmax,idMax}, min:{valmin,idMin}});
  };
  const graficar = (data) => {
    let dato = [["0", 0]];
    if (data.length > 0) {
      dato = data.map((peso) => {
        let pesoNum = parseInt(peso["ultimo peso"]);
        return [peso.id, pesoNum];
      });
    }
    grafica([["fecha", "peso"]].concat(dato));
  };

  const handleClick = (e) => {
    props.setDetail({
      tipo:'res',
      id: e.target.value,
    });
  }
  return (
    <>
      <table className=" table  table-responsive-md TableReses-table">
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
                <td><button className="btn btn-secondary btn-sm" value={res.id} onClick={handleClick}>{res.numero}</button></td>
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
      </table>
    </>
  );
};
const mapDispatchToProps = {
  setDetail,
};

export default connect(null, mapDispatchToProps) (TableReses);
