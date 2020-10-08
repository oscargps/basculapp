import React from "react";
import "../styles/pages/dashboard.css";
import Tabla from "../components/tabla";

const Dashboard = (props) => {
  const Reses = [
    {
      id: "100_1_001",
      numero: "001",
      lote: "100_1_PR",
      genero: "M",
      subgenero: "Ceba",
      obs: null,
    },
    {
      id: "100_1_002",
      numero: "002",
      lote: "100_1_PR",
      genero: "M",
      subgenero: "Ceba",
      obs: null,
    },
    {
      id: "100_1_003",
      numero: "003",
      lote: "100_1_PR",
      genero: "M",
      subgenero: "Ceba",
      obs: null,
    },
    {
      id: "100_1_004",
      numero: "004",
      lote: "100_1_PR",
      genero: "M",
      subgenero: "Ceba",
      obs: null,
    },
    {
      id: "100_1_005",
      numero: "005",
      lote: "100_1_PR",
      genero: "M",
      subgenero: "Ceba",
      obs: null,
    },
  ];

  return (
    <div className="Dashboard">
      <Tabla titulo="Reses" datos={Reses}/>
      <Tabla titulo="Lotes" datos=""/>
      <Tabla titulo="Registros de pesaje" datos=""/>
    </div>
  );
};

export default Dashboard;
