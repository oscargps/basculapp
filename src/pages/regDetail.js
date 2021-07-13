import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button, DropdownButton, Dropdown, Form } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import numeral from "numeral";
import Swal from "sweetalert2";
import { setPrintData, setNewRes, setReset, setDetail } from "../actions";
import DetailTable from "../components/detailTable";
import TableRegDetalles from "../components/tableRegDetalles";
import TablaItem from "../components/TablaItem";
import getRegistro from "../utils/getRegistro";
import getFecha from "../utils/getFecha";
import movesell from "../utils/movesell";
import newRes from "../utils/newRes";
import { setTransactions } from "../utils/transactions";
import "../styles/pages/regdetail.css";

const RegDetail = (props) => {
  const { onDetail, cliente, fincaActual, usuario, lotes, reses, newReses } =
    props;
  const [Encabezado, setEncabezado] = useState([]);
  const [Cantidades, setCantidades] = useState([]);
  const [resesToIn, setResesToIn] = useState([]);
  const [Totales, setTotales] = useState([]);
  const [textAction, setTextAction] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [Lote, setLote] = useState("");
  let result = {};
  const getToday = () => {
    let hoy = new Date();
    let año = hoy.getFullYear();
    let mes = hoy.getMonth() + 1;
    let dia = hoy.getDate();
    let fecha =
      año +
      "-" +
      (mes < 10 ? "0" + mes : mes) +
      "-" +
      (dia < 10 ? "0" + dia : dia);
    return fecha;
  };
  const getContenido = async () => {
    result = await getRegistro(onDetail.id);
    setEncabezado(result.encabezado);
    setCantidades(result.medidas);
    getValores(result.medidas);
  };
  const getValores = (medidas) => {
    let promedio;
    let ptotal = 0;
    medidas.map((peso) => {
      ptotal += parseInt(peso.cantidad);
    });
    promedio = ptotal / medidas.length;
    setTotales({ promedio, ptotal, cantidad: medidas.length });
  };
  useEffect(() => {
    getContenido();
  }, [onDetail.id]);
  const print = () => {
    props.setPrintData({
      type: "registro",
      Encabezado,
      Cantidades,
      Totales,
    });
  };

  const addReses1 = (loteId) => {
    let resesCantidad = Cantidades.map((res) => {
      return addRes(loteId,res);
    });
    setResesToIn(resesCantidad);
  };

  const addReses = () => {
    Swal.fire({
      title: "¿Desea continuar?",
      text: `Se hara el ingreso de ${resesToIn.length} reses nuevas`,
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonText: `Aprovar ingreso`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        saveReses();
      }
    });
  };
  const validatedForm = (ingreso) => {
    let result = true;
    let numerosReses = reses.filter((res) => res.numero === ingreso.numeroRes);
    let numerosIngresasos = newReses.filter(
      (res) => res.numeroRes === ingreso.numeroRes
    );
    if (numerosReses.length > 0 || numerosIngresasos.length > 0) {
      Swal.fire(
        "¡Numero duplicado!",
        "El numero del animal ya se encuentra en base de datos",
        "warning"
      );
      result = false;
      return;
    }
    Object.keys(ingreso).map((item) => {
      if (ingreso[item] === "" && item !== "obs") {
        Swal.fire(
          "¡Campo vacio!",
          "Verifica la información y reintenta",
          "warning"
        );
        result = false;
        return;
      }
    });
    return result;
  };
  const addRes = (loteId,res) => {
    let ingreso = {
      id: res.ref,
      numeroRes: res.numero,
      cliente: cliente.id,
      finca: fincaActual.id,
      lote: loteId,
      raza: "Mezclada",
      fechanac: getToday(),
      genero: "M",
      subgenero: "Ceba",
      pesonac: res.cantidad,
      fechaing: getToday(),
      obs: res.obs,
    };
    if (validatedForm(ingreso)) {
      return ingreso;
    }
  };

  const saveReses = async () => {
    if (resesToIn.length === 0) {
      Swal.fire("No hay registros", "No hay animales por ingresar.", "warning");
      return;
    }
    await setTransaction(true);
    let fecha = getFecha();
    let header = {
      id: cliente.id + "_" + fecha,
      usuario: usuario.id,
      cliente: cliente.id,
      finca: fincaActual.id,
      tipo: "CR",
      tiporef: "res",
      ref: "varios",
      obs: "Creación de reses ingresadas al lote " + Lote.id,
    };
    let resp = await newRes(header, resesToIn);
    if (resp) {
      Swal.fire(
        "¡Listo!",
        "Los animales han sido añadidos con exito",
        "success"
      );
      props.setReset();
    } else {
      Swal.fire("¡Error!", "Si el error persiste, contacte a soporte", "error");
    }
  };
  const setTransaction = async (isAprove) => {
    setShow(false);
    setShow2(false);
    let resp = false;
    let fecha = getFecha();
    let obs = `Transacción ${
      isAprove ? "Aprobada" : "Denegada"
    } con obs: ${textAction}`;
    let formData = new FormData();
    formData.append("id", cliente.id + "_" + fecha);
    formData.append("idReg", onDetail.id);
    formData.append("cliente", cliente.id);
    formData.append("usuario", usuario.id);
    formData.append("finca", fincaActual.id);
    formData.append("tipo", "VTM");
    formData.append("tiporef", "trans");
    formData.append("ref", onDetail.id);
    formData.append("action", isAprove ? "Aprobada" : "Denegada");
    formData.append("obs", obs);
    formData.append("data", JSON.stringify(Cantidades));
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    resp = await setTransactions(formData);
    if (isAprove) {
      resp = await movesell(formData);
    }
    if (resp) {
      Swal.fire({
        title: "Listo!",
        text: "Se ha enviado la respuesta de la transacción",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Algo salió mal, si el problema persiste , contacte a soporte",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <div className="regDetail">
      <div className="regDetail-detailTable">
        <DetailTable data={Encabezado} />
      </div>
      <div className="regDetail-content">
        <div className="regDetail-content__table">
          <TableRegDetalles data={Cantidades} />
        </div>
        <div className="regDetail-content__detail">
          <div>
            <table className="table loteDetail-data__stadistics-table">
              <tbody>
                <tr>
                  <th className="loteDetail-data__thead">Total de reses: </th>
                  <td>{Cantidades.length}</td>
                </tr>
                <tr>
                  <th className="loteDetail-data__thead">Promedio de peso: </th>
                  <td>{numeral(Totales.promedio).format("0,0.0")}Kg</td>
                </tr>
                <tr>
                  <th className="loteDetail-data__thead">Peso total: </th>
                  <td>{numeral(Totales.ptotal).format("0,0")}Kg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="regDetail-options">
            {Encabezado.Tipo == "Venta" && Encabezado.estado == "pendiente" ? (
              <button className="btn btn-primary" onClick={() => setShow(true)}>
                Aprovar/Denegar Venta
              </button>
            ) : null}
            {Encabezado.Tipo == "Compra" && Encabezado.estado == "pendiente" ? (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => setShow2(true)}
                >
                  Aprovar e Ingresar a sistema
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => setShow(true)}
                >
                  Denegar transacción de compra
                </button>
              </>
            ) : null}

            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className=" btn btn-success btn-md download-table-xls-button"
              table="table-to-xls"
              filename={onDetail.id}
              sheet="pesajes"
              buttonText="Descargar reporte"
            />
            <Link
              to="printreg"
              onClick={print}
              className="btn btn-danger btn-md"
            >
              Imprimir reporte
            </Link>
          </div>
        </div>
      </div>
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
            value={textAction}
          />
        </Modal.Body>
        <Modal.Footer>
          {Encabezado.Tipo == "Compra" ? null : (
            <Button variant="success" onClick={() => setTransaction(true)}>
              Aprobar
            </Button>
          )}
          <Button variant="danger" onClick={() => setTransaction(false)}>
            Denegar
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={() => setShow2(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar lote o rotacion de destino</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropdownButton
            variant="secondary"
            title={Lote ? Lote.id + "-" + Lote.ref : "Seleccionar..."}
            id="dropdown-menu-align-right"
            onSelect={(e) => {
              setLote(JSON.parse(e));
              addReses1(JSON.parse(e).id);
            }}
          >
            {lotes.map((lote) => (
              <Dropdown.Item key={lote.id} eventKey={JSON.stringify(lote)}>
                {lote.id}-{lote.ref}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <hr />
          <Form.Control
            as="textarea"
            placeholder="Observaciones adicionales..."
            style={{ height: "100px" }}
            onChange={(e) => {
              setTextAction(e.target.value);
            }}
            value={textAction}
          />
          <p>Cantidad: {resesToIn.length}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={Lote ? false : true}
            variant="primary"
            onClick={addReses}
          >
            Ingresar
          </Button>
          <Button variant="secondary" onClick={() => setShow2(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const mapDispatchToProps = {
  setPrintData,
  setNewRes,
  setReset,
  setDetail,
};
const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    usuario: state.usuario,
    modal: state.modal,
    onDetail: state.onDetail,
    fincaActual: state.fincaActual,
    lotes: state.lotes,
    reses: state.reses,
    newReses: state.newReses,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegDetail);
