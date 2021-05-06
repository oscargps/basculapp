import React from "react";
import "../styles/components/tablaItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "react-bootstrap/Badge";
const TablaItem = (props) => {
  const { titulo, subtitulo, select, id, badge } = props;

  return (
    <div className="TablaItem"  onClick={select}>
      <Badge pill variant="info" className="badgetype">
        {badge}
      </Badge>
      <div className="TablaItem-title">
        <p className="TablaItem-title__title">{titulo}</p>
        <p>{subtitulo}</p>
      </div>

    </div>
  );
};

export default TablaItem;
