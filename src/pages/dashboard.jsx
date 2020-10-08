import React, {useEffect} from "react";
import { connect } from "react-redux";
import "../styles/pages/dashboard.css";
import Tabla from "../components/tabla";

const Dashboard = ({reses,lotes,registros}) => {


  return (
    <div className="Dashboard">
      <Tabla titulo="Reses" row="numero" datos={reses}/>
      <Tabla titulo="Lotes" row="ref" datos={lotes}/>
      <Tabla titulo="Registros de pesaje" row="fecha" datos={registros}/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
  };
};

export default connect(mapStateToProps,null) (Dashboard);
