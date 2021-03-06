import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./routes/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faPlusCircle,faEye,faPen,faTrash, faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faPlusCircle, faEye, faPen,faTrash,faCheckCircle, faTimes);
const InitialState = {
  onLogin: false,
  loading: false,
  cliente: {},
  usuario: {},
  fincaActual: {},
  fincas: [],
  reses: [],
  lotes: [],
  pesajes: [],
  registros: [],
  novedades: [],
  modal: false,
  modal2: false,
  onDetail: {},
  onMove: {},
  newReses: [],
  printData: {
    type: "",
    Pesos: [],
    Encabezado: [],
    actual: {},
    dataGrafica: [],
    Cantidades: [],
    Totales: [],
    reses: [],
    valores:[]
  },
  pagesToPrint: [],
};
const store = createStore(reducer, InitialState);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
