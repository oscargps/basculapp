import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DetailTable from "../components/detailTable";
import TableReses from "../components/tableReses";
import "../styles/pages/lotedetail.css";
import Chart from "react-google-charts";
import Loader from "../components/loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { setMoveSell, setModal2, setPrintData } from "../actions";
import { Link } from "react-router-dom";

const LoteDetail = (props) => {
  const { reses, lotes, onDetail } = props;
  const [actual, setActual] = useState("");
  const [totales, setTotales] = useState({});
  const [maximo, setMaximo] = useState({});
  const [minimo, setMinimo] = useState({});
  const [promedio, setpromedio] = useState(0);
  const [dataGrafica, setDataGrafica] = useState([]);
  useEffect(() => {
    const result = lotes.filter((res) => res.id === onDetail.id);
    setActual(result[0]);
  }, [onDetail.id]);
  const onConteo = (resultados) => {
    setTotales(resultados);
    setMaximo(resultados.max);
    setMinimo(resultados.min);
    setpromedio(resultados.total / resultados.cantidad);
  };
  const handleMove = () => {
    props.setMoveSell({
      tipo: "mm",
      id: onDetail.id,
    });
    props.setModal2(true);
  };
  const graficar = (data) => {
    setDataGrafica(data);
  };
  const print = () => {
    props.setPrintData({
      type: "lote",
      reses,
      actual,
      valores: { maximo:maximo.idMax, minimo:minimo.idMin, promedio, totales:totales.cantidad },
    });
  };
  return (
    <div className="loteDetail">
      <div className="loteDetail-detailTable">
        <DetailTable data={actual} />
      </div>
      <div className="loteDetail-data">
        <div className="loteDetail-data__stadistics">
          <table className="table loteDetail-data__stadistics-table">
            <tbody>
              <tr>
                <th className="loteDetail-data__thead">Total de reses: </th>
                <td>{totales.cantidad}</td>
              </tr>
              <tr>
                <th className="loteDetail-data__thead">Promedio de peso: </th>
                <td>{promedio}</td>
              </tr>
              <tr>
                <th className="loteDetail-data__thead">Mayor peso: </th>
                <td>{maximo.idMax}</td>
              </tr>
              <tr>
                <th className="loteDetail-data__thead">Menor peso: </th>
                <td>{minimo.idMin}</td>
              </tr>
            </tbody>
          </table>
          <div className="loteDetail-data__stadistics-chart">
            <Chart
              chartType="ScatterChart"
              loader={
                <div>
                  <Loader />
                </div>
              }
              data={dataGrafica.length > 0 ? dataGrafica : []}
              options={{
                title: "Relación de pesos de animales del lote",
                crosshair: { trigger: "both", orientation: "both" },
                trendlines: {
                  0: {
                    type: "polynomial",
                    degree: 3,
                    visibleInLegend: true,
                    labelInLegend: "Trend",
                  },
                },
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
        </div>
        <div className="loteDetail-data__table">
          <TableReses
            resultados={onConteo}
            grafica={graficar}
            reses={reses}
            idLote={onDetail.id}
          />
        </div>
      </div>
      <div className="loteDetail--options">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className=" btn btn-success btn-md download-table-xls-button"
          table="table-to-xls"
          filename={onDetail.id}
          sheet={onDetail.id}
          buttonText="Descargar Lote"
        />
        <button className="btn btn-warning" onClick={handleMove}>
          Movimientos masivos
        </button>
        <Link to="printlote" onClick={print} className="btn btn-danger btn-md">
          Imprimir reporte
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setMoveSell,
  setModal2,
  setPrintData,
};
const mapStateToProps = (state) => {
  return {
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
    onDetail: state.onDetail,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoteDetail);
