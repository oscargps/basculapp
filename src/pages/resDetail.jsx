import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Chart from "react-google-charts";
import "../styles/pages/resdetail.css";
import DetailTable from "../components/detailTable";
import TablePesajes from "../components/tablePesaje";
import getPesos from "../utils/getPesos";
const ResDetail = ({ cliente, reses, onDetail }) => {
  const [actual, setActual] = useState("");
  const [Pesos, setPesos] = useState([]);
  const [dataGrafica, setDataGrafica] = useState([]);

  useEffect(() => {
    const result = reses.filter((res) => res.id == onDetail.id);
    setActual(result[0]);
    fillPesos();
  }, [onDetail.id]);

  const fillPesos = async () => {
    let data = await getPesos(onDetail.id, cliente.id);
    setPesos(data);
    graficar(data);
  };

  const graficar = (data) => {
    let dato = [["0", 0]];
    if (data.length > 0) {
      dato = data.map((peso) => {
        let pesoNum = parseInt(peso.cantidad);
        return [`${peso.fecha}`, pesoNum];
      });
    }
    setDataGrafica([["fecha", "peso"]].concat(dato));
  };

  return (
    <div className="ResDetail">
      <DetailTable data={actual} />
      <div className="resDetail-data">
        <div className="resDetail-data__table">
          <TablePesajes pesos={Pesos} />
        </div>
        <div className="resDetail-data2">
          <div className="resDetail-data2__grafica">
            <Chart
              width={"100%"}
              height={"90%"}
              chartType="LineChart"
              loader={<div>Cargando gráfica...</div>}
              data={dataGrafica}
              options={{
                hAxis: {
                  title: "Tiempo",
                },
                vAxis: {
                  title: "Peso",
                },
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
          <div className="resDetail-data__info">
            <div></div>
            <div className="resDetail-chart__options">
              <button className="btn btn-info btn-md">test</button>
              <button className="btn btn-info btn-md">test</button>
              <button className="btn btn-info btn-md">test</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    fincaActual: state.fincaActual,
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
    modal: state.modal,
    onDetail: state.onDetail,
  };
};
export default connect(mapStateToProps, null)(ResDetail);
