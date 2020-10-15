import React, { useEffect, useState } from "react";
import getRegistro from "../utils/getRegistro";
import DetailTable from "../components/detailTable";
import Loader from "../components/loader";
import { connect } from "react-redux";
import TableRegDetalles from "../components/tableRegDetalles";
import "../styles/pages/regdetail.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const RegDetail = (props) => {
  const { onDetail } = props;
  const [Encabezado, setEncabezado] = useState([]);
  const [Cantidades, setCantidades] = useState([]);
  let result = {};

  const getContenido = async () => {
    result = await getRegistro(onDetail.id);
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
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className=" btn btn-success btn-md download-table-xls-button"
            table="table-to-xls"
            filename={onDetail.id}
            sheet="pesajes"
            buttonText="Descargar reporte"
          />
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
