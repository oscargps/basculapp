import React from "react";
import "../styles/components/detailtable.css";
const DetailTable = ({ data }) => {
  const columns = Object.keys(data)

  return (
    <table className="table table-responsive-md detailTable">
      <thead>
        <tr>
          {columns.length>0 && columns.map((col) =>
            data[col] != null ? (
              <th className="table-coltitle" key={col}>
                {col.toUpperCase()}
              </th>
            ) : null
          )}
        </tr>
      </thead>
      <tbody>
        <tr>
          { columns.length>0 && columns.map((col) =>
            data[col] != null ? <td key={col}>{data[col]}</td> : null
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default DetailTable;
