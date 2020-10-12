import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setInformation, setLoading, setLogin, setModal } from "../actions";
import axios from "axios";
import Navbar from "../components/navbar";
import Loader from "../components/loader";
import "../styles/pages/dashboard.css";
import Tabla from "../components/tabla";
import Modal from "../components/modal";
import ResDetail from "./resDetail";

const Dashboard = (props) => {
  const {
    cliente,
    fincaActual,
    reses,
    lotes,
    registros,
    loading,
    modal,
    onDetail,
  } = props;
  const toggleModal = () => {
    console.log("cerrando modal");
    props.setModal(!modal);
  };

  const setDetailComponent = () => {
    switch (onDetail.tipo) {
      case "res":
        return <ResDetail id={onDetail.id} />;
      case "lote":
        return <ResDetail id={onDetail.id} />;
      case "registro":
        return <ResDetail id={onDetail.id} />;
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("resp")) {
      let data = JSON.parse(sessionStorage.getItem("resp"));
      props.setLogin(data);
      if (Object.keys(fincaActual) > 0) {
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
      fincaActual.id;
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
            {fincaActual.id ? (
              <>
                <Tabla
                  titulo_tabla="Reses"
                  titulo="numero"
                  subtitulo="subgenero"
                  tipo="res"
                  data={reses}
                />
                <Tabla
                  titulo_tabla="Lotes"
                  titulo="ref"
                  subtitulo="obs"
                  tipo="lote"
                  data={lotes}
                />
                <Tabla
                  titulo_tabla="Registros de pesaje"
                  titulo="id"
                  subtitulo="fecha"
                  tipo="registro"
                  data={registros}
                />
              </>
            ) : (
              <h4>Selecciona una finca..</h4>
            )}
          </>
        )}
      </div>
      <Modal isOpen={modal} onClose={toggleModal}>
        {setDetailComponent()}
      </Modal>
    </>
  );
};
const mapDispatchToProps = {
  setLoading,
  setInformation,
  setLogin,
  setModal,
};
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    cliente: state.cliente,
    fincaActual: state.fincaActual,
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
    modal: state.modal,
    onDetail: state.onDetail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
