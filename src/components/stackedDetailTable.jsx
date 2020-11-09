import React from "react";
import "../styles/components/detailtable.css";
const StackedDetailTable = ({ data }) => {
  const columns = Object.keys(data);

  return (
    <table className="table table-responsive-md detailTable">
      <tbody>
        {columns.length > 0 &&
          columns.map((col) =>
            data[col] != null ? (
              <tr key={col}>
                <th className="table-coltitle" key={col}>
                  {col.toUpperCase()}
                </th>
                <td>{data[col]}</td>
              </tr>
            ) : null
          )}
      </tbody>
    </table>
  );
};

export default StackedDetailTable;
