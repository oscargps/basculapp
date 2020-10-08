import React from "react";
import "../styles/components/tablaItem.css";

const TablaItem = (props) => {
  const { titulo } = props;
  return (
    <div className="TablaItem">
      <div className="TablaItem-title"><h5>{titulo}</h5></div>
      <button className="btn btn-info btn-sm">Ver</button>
    </div>
  );
};

export default TablaItem;
