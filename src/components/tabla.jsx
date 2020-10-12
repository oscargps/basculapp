import React, { useState, useEffect } from "react";
import "../styles/components/tabla.css";
import TablaItem from "./TablaItem";

const Tabla = ({ titulo_tabla, data, titulo, subtitulo }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(()=>{
    setSearchResults(data)
  },[data])
  useEffect(() => {
    const results = data.filter((dato) =>
      dato[titulo].toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className="Tabla">
      <div className="card">
        <div className="card-header Tabla-header">{titulo_tabla}</div>
        <div className="Tabla-filter">
          <input
            type="text"
            name=""
            value={searchTerm}
            placeholder="Buscar..."
            onChange={handleChange}
            className="form-control"
            id=""
          />
        </div>
        <div className="card-body">
          {searchResults.length > 0 &&
            searchResults.map((res) => (
              <TablaItem
                key={res.id}
                titulo={res[titulo]}
                subtitulo={res[subtitulo]}
              />
            ))}
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
};

export default Tabla;
