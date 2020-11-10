import React, { useEffect, useState } from "react";
import getRegistro from "../utils/getRegistro";
import DetailTable from "../components/detailTable";
import { setPrintData } from "../actions";
import { connect } from "react-redux";
import TableRegDetalles from "../components/tableRegDetalles";
import "../styles/pages/regdetail.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Link } from "react-router-dom";

const RegDetail = (props) => {
  const { onDetail } = props;
  const [Encabezado, setEncabezado] = useState([]);
  const [Cantidades, setCantidades] = useState([]);
  const [Totales, setTotales] = useState([]);
  let result = {};

  const getContenido = async () => {
    result = await getRegistro(onDetail.id);
    setEncabezado(result.encabezado);
    setCantidades(result.medidas);
    getValores(result.medidas);
  };

  const getValores = (medidas) => {
    let promedio;
    let ptotal = 0;
    medidas.map((peso) => {
      console.log(peso.cantidad);
      ptotal += parseInt(peso.cantidad);
    });
    console.log(ptotal);
    promedio = ptotal / medidas.length;
    setTotales({ promedio, ptotal, cantidad: medidas.length });
  };
  useEffect(() => {
    getContenido();
  }, [onDetail.id]);
  const print = () => {
    props.setPrintData({
      type: "registro",
      Encabezado,
      Cantidades,
      Totales
    });
  };
  return (
    <div className="regDetail">
      <div className="regDetail-detailTable">
        <DetailTable data={Encabezado} />
      </div>
      <div className="regDetail-content">
        <div className="regDetail-content__table">
          <TableRegDetalles data={Cantidades} />
        </div>
        <div className="regDetail-content__detail">
          <div>
            <table className="table loteDetail-data__stadistics-table">
              <tbody>
                <tr>
                  <th className="loteDetail-data__thead">Total de reses: </th>
                  <td>{Cantidades.length}</td>
                </tr>
                <tr>
                  <th className="loteDetail-data__thead">Promedio de peso: </th>
                  <td>{Totales.promedio}Kg</td>
                </tr>
                <tr>
                  <th className="loteDetail-data__thead">Peso total: </th>
                  <td>{Totales.ptotal}Kg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="regDetail-options">
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className=" btn btn-success btn-md download-table-xls-button"
              table="table-to-xls"
              filename={onDetail.id}
              sheet="pesajes"
              buttonText="Descargar reporte"
            />
            <Link
              to="printreg"
              onClick={print}
              className="btn btn-danger btn-md"
            >
              Imprimir reporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  setPrintData,
};
const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    usuario: state.usuario,
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
    modal: state.modal,
    onDetail: state.onDetail,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegDetail);
