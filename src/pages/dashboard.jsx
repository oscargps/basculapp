import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Navbar from "../components/navbar";
import Loader from "../components/loader";
import { setInformation, setLoading } from "../actions";
import "../styles/pages/dashboard.css";
import Tabla from "../components/tabla";

const Dashboard = (props) => {
  const { reses, lotes, registros, loading } = props;
  const url =
    "http://basculapp.000webhostapp.com/api/getInfoCliente.php?cliente=100&finca=100_1";
  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response);
      props.setLoading(loading);
      props.setInformation(response.data[0]);
    });
  }, []);

  return (
    <div className="Dashboard">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Tabla titulo="Reses" row="numero" datos={reses} />
          <Tabla titulo="Lotes" row="ref" datos={lotes} />
          <Tabla titulo="Registros de pesaje" row="fecha" datos={registros} />
        </>
      )}
    </div>
  );
};
const mapDispatchToProps = {
  setInformation,
  setLoading,
};
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
