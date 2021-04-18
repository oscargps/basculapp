import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setModal, setModal2, setMoveSell, setDetail } from "../actions";
const Terceros = (props) => {
  const { terceros } = props;
  const columns = [
    {
      name: "Identificacion",
      selector: "identificacion",
      sortable: true,
    },
    {
      name: "Razon Social/Nombre",
      selector: "nombre",
      sortable: true,
    },
    {
      name: "Contacto",
      selector: "contacto",
      sortable: true,
    },
    {
      name: "Observacion",
      selector: "obs",
      sortable: true,
    },
    {
      name: "",
      button: true,
      sortable: false,
      cell: (row) => (
        <>
          <button className="btn btn-info btn-sm" onClick={()=>handleEditClick(row)}>
            <FontAwesomeIcon icon="pen" />
          </button>
          <button className="btn btn-danger btn-sm" onClick={()=>handleDeleteClick(row)}>
            <FontAwesomeIcon icon="trash" />
          </button>
        </>
      ),
    },
  ];
  const handleEditClick = (row) => {
    props.setModal2(true);
    props.setMoveSell({
      tipo: "newTercero",
      id: {...row, mode:'update'},
    });
  };
  const handleDeleteClick = (row) => {
    props.setModal2(true);
    props.setMoveSell({
      tipo: "newTercero",
      id: {...row, mode:'delete'},
    });
  };
  const handleNew = () => {
    props.setModal2(true);
    props.setMoveSell({
      tipo: "newTercero",
      id: {mode:'new'},
    });
  };
  return (
    <>
      <DataTable
        actions={
          <button className="btn btn-success" onClick={handleNew}>
            <FontAwesomeIcon icon="plus-circle" />
          </button>
        }
        fixedHeader
        pagination={true}
        pointerOnHover
        title="Listado de proveedores y clientes"
        paginationRowsPerPageOptions={[10, 20, 50]}
        columns={columns}
        data={terceros}
      />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terceros);
