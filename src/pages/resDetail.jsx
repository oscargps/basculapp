import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Chart from "react-google-charts";
import "../styles/pages/resdetail.css";
import DetailTable from "../components/detailTable";
import TablePesajes from "../components/tablePesaje";
import TableRegistros from "../components/tableRegistros";
import getPesos from "../utils/getPesos";
import Loader from "../components/loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import Pdf from "react-to-pdf";

const ResDetail = ({ cliente, reses, onDetail, print }) => {
  const [actual, setActual] = useState("");
  const [Pesos, setPesos] = useState([]);
  const [dataGrafica, setDataGrafica] = useState([]);

  //   const ref = React.createRef();
  //   const options = {
  //     orientation: 'landscape',
  //     format: [1142,593]
  // };
  useEffect(() => {
    const result = reses.filter((res) => res.id == onDetail.id);
    setActual(result.length > 0 ? result[0] : {});
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
        let fecha = peso.fecha.split(' ')
        return [fecha[0], pesoNum];
      });
    }
    setDataGrafica([["fecha", "peso"]].concat(dato));
  };

  return (
    <div className="ResDetail" ref={null}>
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
              loader={
                <div>
                  <Loader />
                </div>
              }
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
              {/* <button className="btn btn-success btn-md"> */}
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className=" btn btn-success btn-md download-table-xls-button"
                  table="table-to-xls"
                  filename={onDetail.id}
                  sheet="pesajes"
                  buttonText="Descargar pesajes"
                />
              {/* </button> */}
              <button className="btn btn-info btn-md">Mover/Vender</button>
              <button onClick={print} className="btn btn-danger btn-md">
                Imprimir reporte
              </button>

              {/* <Pdf targetRef={ref} options={options} x={.5} y={.5}  filename="code-example.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
              </Pdf> */}
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
