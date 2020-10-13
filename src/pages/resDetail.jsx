import React, {useEffect,useState} from "react";
import { connect } from "react-redux";
import Chart from "react-google-charts";
import "../styles/pages/resdetail.css";
import DetailTable from "../components/detailTable";
const ResDetail = ({ cliente, reses, onDetail }) => {
  const [actual,setActual] = useState('')
  useEffect(()=>{
    const result = reses.filter((res)=>(
      res.id == onDetail.id
    ))
    setActual(result[0])
  },[onDetail.id])
  return (
    <div className="ResDetail">
      <div className="resDetail-data">
        <DetailTable data={actual} className="resDetail-data__detailTable" />
      </div>
      <div className="resDetail-chart">
        <Chart
          width={"90%"}
          height={"100%"}
          chartType="LineChart"
          loader={<div>Cargando gráfica...</div>}
          data={[
            ["x", "dogs"],
            [0, 0],
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
            [5, 9],
            [6, 11],
            [7, 27],
            [8, 33],
            [9, 40],
            [10, 32],
            [11, 35],
          ]}
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
        <div className="resDetail-chart__options">
          <button className="btn btn-info">test</button>
          <button className="btn btn-info">test</button>
          <button className="btn btn-info">test</button>
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
