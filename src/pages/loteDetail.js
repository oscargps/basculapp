import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DetailTable from "../components/detailTable";
import TableReses from "../components/tableReses";
import "../styles/pages/lotedetail.css";
import Chart from "react-google-charts";
import Loader from "../components/loader";
const LoteDetail = ({ cliente, reses, lotes, onDetail }) => {
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
  const graficar = (data) => {
    setDataGrafica(data);
  };
  return (
    <div className="loteDetail">
      <DetailTable data={actual} />
      <div className="loteDetail-data">
        <div className="loteDetail-data__table">
          <TableReses
            resultados={onConteo}
            grafica={graficar}
            reses={reses}
            idLote={onDetail.id}
          />
        </div>
        <div className="loteDetail-data__stadistics">
          <table className="table">
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
              width={"100%"}
              height={"100%"}
              chartType="ScatterChart"
              loader={
                <div>
                  <Loader />
                </div>
              }
              data={dataGrafica}
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
      </div>
      <div className="loteDetail--options">
              <button className="btn btn-warning">Movimientos masivos</button>
              <button className="btn btn-danger">Imprimir</button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
    onDetail: state.onDetail,
  };
};
export default connect(mapStateToProps, null)(LoteDetail);
