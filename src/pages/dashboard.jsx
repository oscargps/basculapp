import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setInformation, setLoading, setLogin } from "../actions";
import axios from "axios";
import Navbar from "../components/navbar";
import Loader from "../components/loader";

import "../styles/pages/dashboard.css";
import Tabla from "../components/tabla";
// import getInfo from "../utils/getInfo";

const Dashboard = (props) => {
  const { cliente, fincaActual, reses, lotes, registros, loading } = props;

  useEffect(() => {
    if (sessionStorage.getItem("resp")) {
      let data = JSON.parse(sessionStorage.getItem("resp"));
      props.setLogin(data);
      if (fincaActual) {
        getInfo();
      }
    } else {
      props.history.push("/login");
    }
  }, []);

  const getInfo = () => {
    props.setLoading(true);
    const url =
      "http://basculapp.000webhostapp.com/api/getInfoCliente.php?cliente=" +
      cliente.id +
      "&finca=" +
      fincaActual;
    axios.get(url).then((response) => {
      props.setLoading(false);
      props.setInformation(response.data[0]);
    });
  };

  return (
    <>
      <Navbar />
      <div className="Dashboard">
        {loading ? (
          <Loader />
        ) : (
          <>
            {fincaActual ? (
              <>
                <Tabla
                  titulo_tabla="Reses"
                  titulo="numero"
                  subtitulo="subgenero"
                  data={reses}
                />
                <Tabla
                  titulo_tabla="Lotes"
                  titulo="ref"
                  subtitulo="obs"
                  data={lotes}
                />
                <Tabla
                  titulo_tabla="Registros de pesaje"
                  titulo="id"
                  subtitulo="fecha"
                  data={registros}
                />
              </>
            ) : (
              <h4>Selecciona una finca..</h4>
            )}
          </>
        )}
      </div>
    </>
  );
};
const mapDispatchToProps = {
  setLoading,
  setInformation,
  setLogin,
};
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    cliente: state.cliente,
    fincaActual: state.fincaActual,
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
