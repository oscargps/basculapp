import React, { useState, useEffect } from "react";
import "../styles/components/tabla.css";
import TablaItem from "./TablaItem";

const Tabla = ({ titulo_tabla, data, titulo, subtitulo }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setSearchResults(data);
  }, [data]);
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
        {searchResults.length > 0 ? (
          <div className="card-body">
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
            {searchResults.length > 0 &&
              searchResults.map((res) => (
                <TablaItem
                  key={res.id}
                  titulo={res[titulo]}
                  subtitulo={res[subtitulo]}
                />
              ))}
          </div>
        ) : (
          <h5>No se encuentran registros</h5>
        )}
        <div className="card-footer">
          <h5>Total: {searchResults.length}</h5>
        </div>
      </div>
    </div>
  );
};

export default Tabla;
