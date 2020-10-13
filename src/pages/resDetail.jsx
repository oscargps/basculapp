import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Chart from "react-google-charts";
import "../styles/pages/resdetail.css";
import DetailTable from "../components/detailTable";
import TablePesajes from "../components/tablePesaje";
import TableRegistros from "../components/tableRegistros";
import getPesos from "../utils/getPesos";
import Loader from '../components/loader'
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
              loader={<div><Loader/></div>}
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
          <div className="resDetail-data2__info">
            <div className="resDetail-data2__info-registros">
            <h4>Listado de registros de pesaje</h4>
            <TableRegistros data={Pesos} />
            </div>
            <div className="resDetail-data2__info-options">
              <button className="btn btn-success btn-md">Descargar pesajes</button>
              <button className="btn btn-info btn-md">Mover/Vender</button>
              <button className="btn btn-danger btn-md">Imprimir reporte</button>
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
