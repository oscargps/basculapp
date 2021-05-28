import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setModal, setModal2, setMoveSell, setDetail } from "../actions";
import getTransactions from "../utils/getTransactions";
import Loader from "./loader";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Transactions = (props) => {
  const { terceros, fincaActual } = props;
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
      name: "",
      button: true,
      sortable: false,
      cell: (row) => (
        <>
          <button
            className="btn btn-info btn-sm"
            onClick={() => handleInspect(row)}
          >
            <FontAwesomeIcon icon="eye" />
          </button>
          {row.estado == "pendiente" ? (
            <>
              <button
                className="btn btn-success btn-sm ml-1"
                onClick={() => handleAction(row, true)}
              >
                <FontAwesomeIcon icon="check-circle" />
              </button>
              <button
                className="btn btn-danger btn-sm ml-1"
                onClick={() => handleAction(row, false)}
              >
                <FontAwesomeIcon icon="times" />
              </button>
            </>
          ) : null}
        </>
      ),
    },
  ];
  const [Transacciones, setTransacciones] = useState([]);
  const [TextAction, setTextAction] = useState("");
  const [rowAction, setRowAction] = useState();
  const [Loading, setLoading] = useState(true);
  const [isAprove, setisAprove] = useState(false);
  const [show, setShow] = useState(false);

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
      return [{ ...transaccion, terceroNombre: tercero[0].nombre }];
    });
    setTransacciones(trans[0]);
    setLoading(false);
  };
  const handleAction = (row, mode) => {
    setisAprove(mode);
    setRowAction(row);
    setShow(true);
  };
  const handleSendAction = () => {
    setShow(false);
    console.log(rowAction, isAprove);
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
          title="Procesos de venta"
          paginationRowsPerPageOptions={[10, 20, 50]}
          columns={columns}
          data={Transacciones}
        />
      )}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Autorización de transacción de venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            placeholder="Observaciones adicionales..."
            style={{ height: "100px" }}
            onChange={(e) => {
              setTextAction(e.target.value);
            }}
            value={TextAction}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={isAprove ? "success" : "danger"}
            onClick={handleSendAction}
          >
            {isAprove ? "Aprobar" : "Denegar"} transacción
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
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
