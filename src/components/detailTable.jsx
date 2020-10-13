import React from "react";
import "../styles/components/detailtable.css";
const DetailTable = ({ data }) => {
  const columns = Object.keys(data);

  return (
    <table className="table">
      <tbody>
        {columns.map((col) =>
          data[col] != null ? (
            <tr key={col}>
              <td className="table-coltitle">{col.toUpperCase()}</td>
              <td>{data[col]}</td>
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  );
};

export default DetailTable;
