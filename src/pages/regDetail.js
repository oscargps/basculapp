import React, { useEffect, useState } from "react";
import getRegistro from "../utils/getRegistro";
import DetailTable from "../components/detailTable";
import Loader from "../components/loader";
import { connect } from "react-redux";
import TableRegDetalles from "../components/tableRegDetalles";
import "../styles/pages/regdetail.css";


const RegDetail = (props) => {
  const { cliente, usuario, onDetail } = props;
  const [Encabezado, setEncabezado] = useState([]);
  const [Cantidades, setCantidades] = useState([]);

  const getContenido = async () => {
    const result = await getRegistro(onDetail.id);
    setEncabezado(result.encabezado);
    setCantidades(result.medidas);
  };

  useEffect(() => {
    getContenido();
  }, [onDetail.id]);
  return (
    <div className="regDetail">
      <DetailTable data={Encabezado} />
      <div className="regDetail-content">
        <TableRegDetalles data={Cantidades} />
        <div className="regDetail-optiones">
          <button className="btn btn-success">Descargar</button>
          <button className="btn btn-danger">Imprimir</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    usuario: state.usuario,
    reses: state.reses,
    lotes: state.lotes,
    registros: state.registros,
    modal: state.modal,
    onDetail: state.onDetail,
  };
};
export default connect(mapStateToProps, null)(RegDetail);
