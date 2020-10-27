import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setModal,
  setNewRes,
  setMoveSell,
  setModal2,
  setReset,
} from "../actions";
import "../styles/components/newres.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import TableNewRes from "../components/tableNewRes";
import newRes from "../utils/newRes";
import * as XLSX from "xlsx";
import getFecha from "../utils/getFecha";

const NewRes = (props) => {
  const { reses, cliente, fincaActual, usuario, newReses } = props;
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
  const { lotes } = props;
  const [Lote, setLote] = useState("");
  const [numeroRes, setnumeroRes] = useState("");
  const [raza, setraza] = useState("");
  const [fechanac, setfechanac] = useState(getToday);
  const [genero, setgenero] = useState("");
  const [subgenero, setsubgenero] = useState("");
  const [pesonac, setpesonac] = useState(0);
  const [fechaing, setfechaing] = useState(getToday);
  const [obs, setobs] = useState("");
  const [fileName, setFileName] = useState("Cargar archivo...");
  const [file, setFile] = useState({
    hoja: "",
    hojas: [],
    file: false,
  });

  const razas = [
    "Brahman",
    "Cebu",
    "Guzerat",
    "Girolanda",
    "Harton",
    "RomoSinuano",
    "Mezclada",
    "Otra",
  ];

  const subgeneros = [
    "Ceba",
    "Levante",
    "Toro",
    "Escotera",
    "Lechera",
    "Vientre",
    "Cria",
    "Otra",
  ];

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
      if (ingreso[item] === "" && item != "obs") {
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

  const addRes = () => {
    if (!Lote) {
      Swal.fire("Lote vacio!", "Selecciona un lote", "warning");
      return;
    }
    let ingreso = {
      id: fincaActual.id + "_" + numeroRes,
      numeroRes,
      cliente: cliente.id,
      finca: fincaActual.id,
      lote: Lote.id,
      raza,
      fechanac,
      genero,
      subgenero,
      pesonac,
      fechaing,
      obs,
    };
    if (validatedForm(ingreso)) {
      props.setNewRes(ingreso);
    }
  };
  const saveReses = async () => {
    if (newReses.length == 0) {
      Swal.fire("No hay registros", "No hay animales por ingresar.", "warning");
      return;
    }
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
    let resp = await newRes(header, newReses);
    if (resp) {
      Swal.fire(
        "¡Listo!",
        "Los animales han sido añadidos con exito",
        "success"
      );
      props.setReset(true);
    } else {
      Swal.fire("¡Error!", "Si el error persiste, contacte a soporte", "error");
    }
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFileName(value.split("\\")[2]);
    const name = target.name;
    setFile({
      [name]: value,
    });
    let hojas = [];
    if (name === "file") {
      let reader = new FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onloadend = async (e) => {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        workbook.SheetNames.map((sheetName) => {
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );
          hojas.push({
            data: XL_row_object,
            sheetName,
          });
        });
        setFile({
          selectedFileDocument: target.files[0],
          hojas,
          file: true,
        });
      };
    }
  };

  const LoadReses = () => {
    let data = file.hojas[0].data;
    if (!Lote) {
      Swal.fire("Lote vacio!", "Selecciona un lote", "warning");
      return;
    }
    data.map((res) => {
      try {
        let ingreso = {
          id: fincaActual.id + "_" + res["Numero"],
          numeroRes: res["Numero"].toString(),
          cliente: cliente.id,
          finca: fincaActual.id,
          lote: Lote.id,
          raza: res["Raza"],
          fechanac: res["Fecha Nacimiento"],
          genero: res["Genero"],
          subgenero: res["Subgenero"],
          pesonac: res["Peso Nacimiento"],
          fechaing,
          obs: res["Observacion"],
        };
        if (validatedForm(ingreso)) {
          props.setNewRes(ingreso);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    });
  };
  return (
    <div className="NewRes">
      <div className="NewRes-header">
        <div>
          <label htmlFor="">Lote de destino: </label>
          <DropdownButton
            variant="secondary"
            title={
              Lote ? Lote.id + "-" + Lote.ref : "Seleccionar lote destino.."
            }
            id="dropdown-menu-align-right"
            onSelect={(e) => setLote(JSON.parse(e))}
          >
            {lotes.map((lote) => (
              <Dropdown.Item key={lote.id} eventKey={JSON.stringify(lote)}>
                {lote.id}-{lote.ref}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className="NewRes-header__options">
          <a
            href="http://basculapp.000webhostapp.com/reses.xlsx"
            className="btn btn-success"
            download
          >
            Descargar plantilla
          </a>
          <form className="was-validated">
            <div class="input-group is-invalid">
              <div class="custom-file">
                <input
                  type="file"
                  name="file"
                  className="custom-file-input"
                  id="validatedInputGroupCustomFile"
                  required
                  onChange={handleInputChange}
                />
                <label
                  className="custom-file-label"
                  for="validatedInputGroupCustomFile"
                >
                  {fileName}
                </label>
              </div>
              <div class="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  onClick={LoadReses}
                  type="button"
                  disabled={file.file ? false : true}
                >
                  Cargar
                </button>
              </div>
            </div>
          </form>
        </div>
        <button
          onClick={() => {
            props.setMoveSell({
              tipo: "newReses",
              id: null,
            });
            props.setModal2(true);
          }}
          className="btn btn-success watchTable"
        >
          Ver Ingresados
        </button>
      </div>
      <div className="NewRes-content">
        <div className="NewRes-content__Form">
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Numero de identifiación</Form.Label>
                  <Form.Control
                    className="input"
                    type="text"
                    placeholder="123ABC"
                    onChange={(e) => setnumeroRes(e.target.value)}
                    value={numeroRes}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Raza</Form.Label>
                  <DropdownButton
                    variant="outline-dark"
                    title={raza ? raza : "Seleccionar raza.."}
                    id="dropdown-menu-align-right"
                    onSelect={(e) => setraza(e)}
                  >
                    {razas.map((raza) => (
                      <Dropdown.Item key={raza} eventKey={raza}>
                        {raza}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Fecha nacimiento (Opcional)</Form.Label>
              <Form.Control
                onChange={(e) => setfechanac(e.target.value)}
                value={fechanac}
                className="input"
                type="date"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Genero</Form.Label>
                  <DropdownButton
                    variant="outline-dark"
                    title={genero ? genero : "Seleccionar genero.."}
                    id="dropdown-menu-align-right"
                    onSelect={(e) => setgenero(e)}
                  >
                    <Dropdown.Item eventKey={"Macho"}>Macho</Dropdown.Item>
                    <Dropdown.Item eventKey={"Hembra"}>Hembra</Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Subgenero</Form.Label>
                  <DropdownButton
                    variant="outline-dark"
                    title={subgenero ? subgenero : "Seleccionar subgenero.."}
                    id="dropdown-menu-align-right"
                    onSelect={(e) => setsubgenero(e)}
                  >
                    {subgeneros.map((subgenero) => (
                      <Dropdown.Item key={subgenero} eventKey={subgenero}>
                        {subgenero}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Peso ingreso (Opcional)</Form.Label>
                  <Form.Control
                    onChange={(e) => setpesonac(e.target.value)}
                    value={pesonac}
                    className="input"
                    type="number"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Fecha de ingreso</Form.Label>
                  <Form.Control
                    onChange={(e) => setfechaing(e.target.value)}
                    value={fechaing}
                    className="input"
                    type="date"
                  />
                </Form.Group>
              </Col>
            </Row>
            <textarea
            maxlength="40"
              className="form-control"
              name="Text1"
              cols="40"
              rows="5"
              value={obs}
              placeholder="Observaciones adicionales.."
              onChange={(e) => setobs(e.target.value)}
            ></textarea>
          </Form>
        </div>
        <div className="NewRes-content__TableSave">
          <div id="ingresados" className="NewRes-content__Table ">
            <TableNewRes />
          </div>

          <div className="NewRes-content__Options">
            <button className="btn btn-primary" onClick={addRes}>
              Añadir
            </button>
            <button className="btn btn-success btn-block" onClick={saveReses}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  setNewRes,
  setModal,
  setModal2,
  setMoveSell,
  setReset,
};
const mapStateToProps = (state) => {
  return {
    cliente: state.cliente,
    usuario: state.usuario,
    fincaActual: state.fincaActual,
    reses: state.reses,
    lotes: state.lotes,
    modal: state.modal,
    newReses: state.newReses,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewRes);
