import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setInformation,
  setLoading,
  setLogin,
  setModal,
  setModal2,
} from "../actions";
import Navbar from "../components/navbar";
import Loader from "../components/loader";
import "../styles/pages/dashboard.css";
import Tabla from "../components/tabla";
import Modal from "../components/modal";
import Modal2 from "../components/modal2";
import MoveSell from "../components/moveSell";
import ResDetail from "./resDetail";
import LoteDetail from "./loteDetail";
import RegDetail from "./regDetail";

const Dashboard = (props) => {
  const {
    fincaActual,
    reses,
    lotes,
    registros,
    loading,
    modal,
    modal2,
    onDetail,
    onMove,
  } = props;
  const toggleModal = () => {
    props.setModal(!modal);
  };

  const escFunction = (e) => {
    if (e.keyCode === 27) {
      console.log(modal);
      if (modal) {
        props.setModal2(false);
      } else {
        props.setModal(false);
      }
    }
  };
  const setDetailComponent = () => {
    switch (onDetail.tipo) {
      case "res":
        return <ResDetail id={onDetail.id} />;
      case "lote":
        return <LoteDetail id={onDetail.id} />;
      case "registro":
        return <RegDetail id={onDetail.id} />;
      default:
        return null;
    }
  };
  const setMoveComponent = () => {
    switch (onMove.tipo) {
      case "mv":
        return <MoveSell />;
      case "lote":
        return <LoteDetail id={onDetail.id} />;
      default:
        return null;
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("resp")) {
      let data = JSON.parse(sessionStorage.getItem("resp"));
      props.setLogin(data);
      document.addEventListener("keydown", escFunction, false);
    } else {
      props.history.push("/login");
    }
  }, []);

  useEffect(() => {
    window.onpopstate = (e) => {
      e.preventDefault();
      props.setModal(false);
    };
  });

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
      <Modal2 isOpen={modal2} onClose={null}>
        {setMoveComponent()}
      </Modal2>
    </>
  );
};
const mapDispatchToProps = {
  setLoading,
  setInformation,
  setLogin,
  setModal,
  setModal2,
};
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    cliente: state.cliente,
    fincaActual: state.fincaActual,
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
    novedades: state.novedades,
    modal: state.modal,
    modal2: state.modal2,
    onDetail: state.onDetail,
    onMove: state.onMove,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
