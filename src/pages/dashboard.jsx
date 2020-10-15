import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setInformation, setLoading, setLogin, setModal } from "../actions";
import Navbar from "../components/navbar";
import Loader from "../components/loader";
import "../styles/pages/dashboard.css";
import Tabla from "../components/tabla";
import Modal from "../components/modal";
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
    onDetail,
  } = props;
  const toggleModal = () => {
    props.setModal(!modal);
  };

  const setDetailComponent = () => {
    switch (onDetail.tipo) {
      case "res":
        return <ResDetail  id={onDetail.id} />;
      case "lote":
        return <LoteDetail id={onDetail.id} />;
      case "registro":
        return <RegDetail id={onDetail.id} />;
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("resp")) {
      let data = JSON.parse(sessionStorage.getItem("resp"));
      props.setLogin(data);
    } else {
      props.history.push("/login");
    }
  }, []);

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
