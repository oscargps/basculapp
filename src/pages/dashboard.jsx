import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setInformation, setLoading, setLogin, setModal } from "../actions";
import axios from "axios";
import Navbar from "../components/navbar";
import Loader from "../components/loader";
import "../styles/pages/dashboard.css";
import Tabla from "../components/tabla";
import Modal from "../components/modal";

const Dashboard = (props) => {
  const { cliente, fincaActual, reses, lotes, registros, loading, modal } = props;
  const toggleModal = () => {
    props.setModal(!modal);
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
    console.log(url);
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
      <Modal isOpen={modal} onClose={toggleModal}>
        <h4>Hola este es un modal</h4>
      </Modal>
    </>
  );
};
const mapDispatchToProps = {
  setLoading,
  setInformation,
  setLogin,
  setModal
};
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    cliente: state.cliente,
    fincaActual: state.fincaActual,
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
    modal: state.modal
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
