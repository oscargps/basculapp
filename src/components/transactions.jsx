import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setModal, setModal2, setMoveSell, setDetail } from "../actions";
import { getTransactions } from "../utils/transactions";
import Loader from "./loader";

const Transactions = (props) => {
  const { terceros, fincaActual } = props;
  const CustomObs = ({ row }) => (
    <div>
        <div data-tag="allowRowEvents" style={{overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipses' }}>
          {row.obs}
        </div>
    </div>
  );
  const conditionalRowStyles = [
    {
      when: row => row.estado != 'pendiente',
      style: row => ({
        backgroundColor: row.estado == 'Aprobada' ? 'rgba(59,155,22,0.25)' : 'rgba(205,38,22,0.25)',
      }),
    },
  ];
  const columns = [
    {
      name: "Fecha",
      selector: "fecha",
      sortable: true,
    },
    {
      name: "Cliente",
      selector: "terceroNombre",
      sortable: true,
    },
    {
      name: "Tipo",
      selector: "tipo",
      sortable: true,
    },
    {
      name: "Pesaje",
      selector: "registro",
      sortable: true,
    },
    {
      name: "Estado",
      selector: "estado",
      sortable: true,
    },
    {
      name: "Observacion",
      selector: "obs",
      sortable: false,
      maxWidth: '600px',
      cell: row => <CustomObs row={row} />,
    },
  ];
  const [Transacciones, setTransacciones] = useState([]);
  const [Loading, setLoading] = useState(true);

  const getData = async () => {
    let result = await getTransactions(fincaActual.id);
    ProcessData(result);
  };
  useEffect(() => {
    getData();
  }, [fincaActual.id]);
  const ProcessData = (data) => {
    let trans = data.map((transaccion) => {
      let tercero = terceros.filter((res) => res.id === transaccion.tercero);

      return { ...transaccion, terceroNombre: tercero[0].nombre };
    });
    console.log(trans);
    setTransacciones(trans);
    setLoading(false);
  };

  const handleInspect = (row) => {
    props.setModal(true);
    props.setDetail({
      tipo: "registro",
      id: row.registro,
    });
  };
  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <DataTable
          fixedHeader
          pagination={true}
          pointerOnHover
          highlightOnHover
          title="Procesos de venta"
          paginationRowsPerPageOptions={[10, 20, 50]}
          columns={columns}
          data={Transacciones}
          conditionalRowStyles={conditionalRowStyles}
          onRowClicked={(row) => {
            handleInspect(row);
          }}
        />
      )}
    </>
  );
};

const mapDispatchToProps = {
  setMoveSell,
  setDetail,
  setModal,
  setModal2,
};
const mapStateToProps = (state) => {
  return {
    terceros: state.terceros,
    fincaActual: state.fincaActual,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
