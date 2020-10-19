import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setInformation, setModal2 } from "../actions";
import "../styles/components/movesell.css";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import movesell from "../utils/movesell";
const MoveSell = (props) => {
  const { cliente, usuario, fincaActual, onMove, reses, lotes } = props;
  const [actual, setActual] = useState({});
  const [option, setOption] = useState("move");
  const [Lote, setLote] = useState(actual.lote);
  const [obs, setObs] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const result = reses.filter((res) => res.id === onMove.id);
    setActual(result.length > 0 ? result[0] : {});
  }, [onMove]);
  const handleCheck = (e) => {
    setOption(e.target.value);
    if (e.target.value === "move") {
      setDescripcion(
        `Traslado ${onMove.id} origen ${actual.lote} destino ${
          Lote ? Lote.id : "?"
        } /`
      );
    } else {
      let pesovt = actual["ultimo peso"];
      setDescripcion(
        `Venta ${onMove.id} del lote ${actual.lote} con peso ${pesovt} /`
      );
    }
  };
  const handleSelect = (e) => {
    setLote(JSON.parse(e));
    let loteDestino = JSON.parse(e);
    setDescripcion(
      `Traslado ${onMove.id} origen ${actual.lote} destino ${loteDestino.id} /`
    );
  };
  const handleObsChange = (e) => {
    setObs(e.target.value);
  };
  const getFecha = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let min = today.getMinutes();
    let ss = today.getSeconds();

    today = yyyy + mm + dd + "_" + hh + min + ss;
    return today;
  };
  const trasladarRes = async () => {
    let fecha = getFecha();
    let formData = new FormData();
    formData.append("id", cliente.id + "_" + fecha);
    formData.append("cliente", cliente.id);
    formData.append("usuario", usuario.id);
    formData.append("finca", fincaActual.id);
    formData.append("tipo", "TR");
    formData.append("tiporef", "res");
    formData.append("ref", onMove.id);
    formData.append("destino", Lote.id);
    formData.append("obs", descripcion + obs);
    let resp = await movesell(formData);
    if (resp) {
      Swal.fire({
        title: "Listo!",
        text: "Se ha registrado la novedad",
        icon: "success",
        onClose: () => {
          props.setModal2(false);
        },
      });
    } else {
      Swal.fire("Error!", "Si persiste, contacte a soporte", "error");
    }
  };
  const venderRes = async () => {
    let fecha = getFecha();
    let formData = new FormData();
    formData.append("id", cliente.id + "_" + fecha);
    formData.append("cliente", cliente.id);
    formData.append("usuario", usuario.id);
    formData.append("finca", fincaActual.id);
    formData.append("tipo", "VT");
    formData.append("tiporef", "res");
    formData.append("ref", onMove.id);
    formData.append("obs", descripcion + obs);
    let resp = await movesell(formData);
    if (resp) {
      Swal.fire("Listo!", "Se ha registrado la novedad", "success");
    } else {
      Swal.fire("Error!", "Si persiste, contacte a soporte", "error");
    }
  };
  const handleSave = () => {
    if (option === "move") {
      if (actual.lote === Lote.id) {
        Swal.fire({
          title: "¡Verifica!",
          text: "Ya se encuentra en este lote, selecciona uno diferente",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          title: "Confirmar traslado",
          text: `Trasladar la res ${actual.numero} del lote ${actual.lote} al lote ${Lote.id}`,
          showCancelButton: false,
          showDenyButton: true,
          confirmButtonText: `Confirmar traslado`,
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            trasladarRes();
          }
        });
      }
    } else {
      Swal.fire({
        title: "Confirmar venta",
        text: `Realizar la venta de la res ${actual.numero} del lote ${actual.lote}`,
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: `Confirmar venta`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          venderRes();
        }
      });
    }
  };

  return (
    <div className="moveSell">
      <table className="moveSella-data table">
        <tbody>
          <tr>
            <th className="moveSell-data__thead">Id Res: </th>
            <td>{actual.numero}</td>
          </tr>
          <tr>
            <th className="moveSell-data__thead">Lote Actual: </th>
            <td>{actual.lote}</td>
          </tr>
          <tr>
            <th className="moveSell-data__thead">Ultimo peso: </th>
            <td>{actual["ultimo peso"]}</td>
          </tr>
          <tr>
            <th className="moveSell-data__thead">Fecha: </th>
            <td>{actual["fecha ultimo peso"]}</td>
          </tr>
        </tbody>
      </table>
      <div className="moveSell-options">
        <Form.Check
          custom
          type="checkbox"
          id="moveCheckbox"
          label={<h5>Trasladar</h5>}
          value="move"
          onChange={handleCheck}
          checked={option === "move" ? true : false}
        />
        <Form.Check
          custom
          type="checkbox"
          id="sellCheckbox"
          label={<h5>Vender</h5>}
          value="sell"
          onChange={handleCheck}
          checked={option === "sell" ? true : false}
        />
      </div>
      {option === "sell" ? (
        <div className="moveSell-sellform"></div>
      ) : (
        <div className="moveSell-moveform">
          <DropdownButton
            variant="secondary"
            title={
              Lote ? Lote.id + "-" + Lote.ref : "Seleccionar lote destino.."
            }
            id="dropdown-menu-align-right"
            onSelect={handleSelect}
          >
            {lotes.map((lote) => (
              <Dropdown.Item key={lote.id} eventKey={JSON.stringify(lote)}>
                {lote.id}-{lote.ref}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      )}
      <input type="text" disabled class="form-control" value={descripcion} />
      <textarea
        className="form-control"
        name="Text1"
        cols="40"
        rows="5"
        value={obs}
        placeholder="Observaciones adicionales.."
        onChange={handleObsChange}
      ></textarea>
      <button
        disabled={Lote || option === "sell" ? false : true}
        onClick={handleSave}
        className="btn btn-info btn-block moveSell-moveform__button"
      >
        {option === "sell" ? "Vender" : "Trasladar"}
      </button>
    </div>
  );
};
const mapDispatchToProps = {
  setInformation,
  setModal2,
};
const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    usuario: state.usuario,
    fincaActual: state.fincaActual,
    reses: state.reses,
    lotes: state.lotes,
    modal2: state.modal2,
    onMove: state.onMove,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MoveSell);
