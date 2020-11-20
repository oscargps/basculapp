import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setInformation,
  setLoading,
  setLogin,
  setModal,
  setModal2,
  setDetail,
} from "../actions";
import Navbar from "../components/navbar";
import Loader from "../components/loader";
import "../styles/pages/dashboard.css";
import Tabla from "../components/tabla";
import Modal from "../components/modal";
import Modal2 from "../components/modal2";
import MoveSell from "../components/moveSell";
import TablaNovedades from "../components/tablaNovedades";
import NewRes from "../components/newRes";
import ResDetail from "./resDetail";
import LoteDetail from "./loteDetail";
import RegDetail from "./regDetail";
import TableNewRes from "../components/tableNewRes";
import MovMasivos from "../components/movMasivos";
import NewLote from "../components/newLote";

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
    usuario
  } = props;

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
        return <ResDetail />;
      case "lote":
        return <LoteDetail />;
      case "registro":
        return <RegDetail />;
      case "novedad":
        return <TablaNovedades />;
      case "newres":
        return <NewRes />;
      default:
        return null;
    }
  };
  const setDetail2Component = () => {
    switch (onMove.tipo) {
      case "mv":
        return <MoveSell />;
      case "newReses":
        return <TableNewRes />;
      case "mm":
        return <MovMasivos />;
      case "newlote":
        return <NewLote />;
      default:
        return null;
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("resp")) {
      let data = JSON.parse(sessionStorage.getItem("resp"));
      props.setLogin(data);
      document.addEventListener("keydown", escFunction, false);}
    // } else {
    //   props.history.push("/login");
    // }
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
                <div className="Dashboard-tables">
                  <Tabla
                    titulo_tabla="Reses"
                    titulo="numero"
                    subtitulo="subgenero"
                    tipo="res"
                    data={reses}
                    allowNew={usuario.tipo==='operario'?false:true}
                  />
                  <Tabla
                    titulo_tabla="Lotes"
                    titulo="ref"
                    subtitulo="id"
                    tipo="lote"
                    data={lotes}
                    allowNew={usuario.tipo==='operario'?false:true}
                  />
                  <Tabla
                    titulo_tabla="Registros de pesaje"
                    titulo="id"
                    subtitulo="fecha"
                    tipo="registro"
                    data={registros}
                    allowNew={false}
                  />
                </div>
              </>
            ) : (
              <h4>Selecciona una finca..</h4>
            )}
          </>
        )}
        <Modal isOpen={modal}>{setDetailComponent()}</Modal>
        <Modal2 isOpen={modal2} onClose={null}>
          {setDetail2Component()}
        </Modal2>
      </div>
    </>
  );
};
const mapDispatchToProps = {
  setLoading,
  setInformation,
  setLogin,
  setModal,
  setModal2,
  setDetail,
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
    modal2: state.modal2,
    onDetail: state.onDetail,
    onMove: state.onMove,
    usuario: state.usuario
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
