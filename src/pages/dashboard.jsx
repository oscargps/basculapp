import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setInformation, setLoading } from "../actions";
import axios from "axios";
import Navbar from "../components/navbar";
import Loader from "../components/loader";

import "../styles/pages/dashboard.css";
import Tabla from "../components/tabla";
// import getInfo from "../utils/getInfo";

const Dashboard = (props) => {
  const {
    onLogin,
    cliente,
    usuario,
    fincaActual,
    reses,
    lotes,
    registros,
    loading,
  } = props;

  useEffect(() => {
    if (onLogin) {
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
      "&finca="+fincaActual;
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
                <Tabla titulo="Reses" row="numero" datos={reses} />
                <Tabla titulo="Lotes" row="ref" datos={lotes} />
                <Tabla
                  titulo="Registros de pesaje"
                  row="fecha"
                  datos={registros}
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
  setLoading,setInformation
};
const mapStateToProps = (state) => {
  return {
    onLogin: state.onLogin,
    loading: state.loading,
    usuario: state.usuario,
    cliente: state.cliente,
    fincaActual: state.fincaActual,
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
