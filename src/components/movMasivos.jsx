import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import MultiSelect from "react-multi-select-component";
import { Collapse } from "react-collapse";
import { connect } from "react-redux";
import { setDetail, setReset } from "../actions";
import Swal from "sweetalert2";
import movesell from "../utils/movesell";

import "../styles/components/movmasivos.css";
const MovMasivos = (props) => {
  const { reses, lotes, onDetail, cliente, usuario, fincaActual } = props;
  const [resesLote, setResesLote] = useState([]);
  const [resesMov, setResesMove] = useState([]);
  const [option, setOption] = useState("");
  const [Lote, setLote] = useState("");
  const [maxmin, setmaxmin] = useState("");
  const [referencia1, setReferencia1] = useState(0);
  const [referencia2, setReferencia2] = useState(0);

  useEffect(() => {
    let result = reses.filter((res) => res.lote === onDetail.id);
    let temp = [];
    result.map((res) => {
      temp.push({ ...res, label: res.numero, value: res.id });
    });
    setResesLote(temp);
  }, [reses]);
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
  const trasladarRes = async (reses) => {
    let fecha = getFecha();
    let formData = new FormData();

    formData.append("id", cliente.id + "_" + fecha);
    formData.append("cliente", cliente.id);
    formData.append("usuario", usuario.id);
    formData.append("finca", fincaActual.id);
    formData.append("tipo", "TRM");
    formData.append("tiporef", "res");
    formData.append("destino", Lote.id);
    formData.append(
      "obs",
      `Traslado masivo de reses, origen ${onDetail.id} destino ${
        Lote ? Lote.id : "?"
      } /`
    );
    formData.append("data", JSON.stringify(reses));
    let resp = await movesell(formData);

    return resp;
  };
  const handleCheck = (e) => {
    setmaxmin(e.target.value);
  };
  const verifMaxMin = () => {
    if (maxmin === "max") {
      let result = resesLote.filter(
        (res) => parseInt(res["ultimo peso"]) > referencia1
      );
      setResesMove(result);
    } else {
      let result = resesLote.filter(
        (res) => parseInt(res["ultimo peso"]) < referencia1
      );
      setResesMove(result);
    }
  };
  const verifRango = () => {
    let result = resesLote.filter(
      (res) =>
        parseInt(res["ultimo peso"]) >= referencia1 &&
        parseInt(res["ultimo peso"]) <= referencia2
    );
    setResesMove(result);
  };
  const handleSave = () => {
    if (Lote.id === onDetail.id || Object.keys(Lote) <= 0) {
      Swal.fire({
        title: "¡Verifica!",
        text: "Ya se encuentra en este lote, selecciona uno diferente",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: "Confirmar traslado",
        text: `Trasladar ${resesMov.length} reses del lote ${onDetail.id} al lote ${Lote.id}`,
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: `Confirmar traslado`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          if (trasladarRes(resesMov)) {
            Swal.fire({
              title: "Listo!",
              text: "Se ha registrado la novedad",
              icon: "success",
              onClose: () => {
                props.setReset(true);
              },
            });
          } else {
            Swal.fire("Error!", "Si persiste, contacte a soporte", "error");
          }
        }
      });
    }
  };
  return (
    <div className="MovMasivos">
      <DropdownButton
        variant="secondary"
        title={Lote ? Lote.id + "-" + Lote.ref : "Seleccionar lote destino.."}
        id="dropdown-menu-align-right"
        onSelect={(e) => setLote(JSON.parse(e))}
      >
        {lotes.map((lote) => (
          <Dropdown.Item key={lote.id} eventKey={JSON.stringify(lote)}>
            {lote.id}-{lote.ref}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <div className="MovMasivos-options">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setOption("maxmin")}
        >
          Maximo - Minimo
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setOption("rango")}
        >
          Rango de pesos
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setOption("varios")}
        >
          Elegir varios
        </button>
      </div>
      <div className="MovMasivos-content">
        <Collapse isOpened={option === "maxmin" ? true : false}>
          <div className="MovMasivos-maxmin__form">
            <div>
              <Form.Check
                custom
                type="checkbox"
                id="moveCheckbox"
                label={<p>Mayor que:</p>}
                value="max"
                onChange={handleCheck}
                checked={maxmin === "max" ? true : false}
              />
              <Form.Check
                type="checkbox"
                custom
                id="sellCheckbox"
                label={<p>Menor que:</p>}
                value="min"
                onChange={handleCheck}
                checked={maxmin === "min" ? true : false}
              />
            </div>
            <input
              type="number"
              className="form-control"
              value={referencia1}
              onChange={(e) => {
                setReferencia1(e.target.value);
              }}
              placeholder="Peso de referencia..."
            />
          </div>
          <button className="btn btn-info btn-block" onClick={verifMaxMin}>
            Verificar
          </button>
        </Collapse>
        <Collapse isOpened={option === "rango" ? true : false}>
          <div className="MovMasivos-rango__form">
            <input
              type="number"
              className="form-control"
              value={referencia1}
              onChange={(e) => {
                setReferencia1(e.target.value);
              }}
              placeholder="Peso mínimo"
            />
            <h3> - </h3>
            <input
              type="number"
              className="form-control"
              value={referencia2}
              onChange={(e) => {
                setReferencia2(e.target.value);
              }}
              placeholder="Peso máximo"
            />
          </div>
          <button className="btn btn-info btn-block" onClick={verifRango}>
            Verificar
          </button>
        </Collapse>
        <Collapse isOpened={option === "varios" ? true : false}>
          <MultiSelect
            options={resesLote}
            value={resesMov}
            onChange={setResesMove}
            labelledBy={"Seleccionar reses..."}
            selectAllLabel="Seleccionar todos..."
          />
        </Collapse>
        <div className="MovMasivos-maxmin__list">
          {resesMov.length > 0
            ? resesMov.map((res) => (
                <h4 key={res.id}>
                  <Badge variant="secondary">{res.numero}</Badge>
                </h4>
              ))
            : null}
        </div>
        <p>Total: {resesMov.length}</p>
      </div>
      <div className="MovMasivos-send">
        <button onClick={handleSave} className="btn btn-success btn-block">
          Enviar cambios
        </button>
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  setReset,
  setDetail,
};
const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    fincaActual: state.fincaActual,
    reses: state.reses,
    lotes: state.lotes,
    modal2: state.modal2,
    onDetail: state.onDetail,
    onMove: state.onMove,
    usuario: state.usuario,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovMasivos);
