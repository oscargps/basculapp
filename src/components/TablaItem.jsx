import React from 'react';
import '../styles/components/tablaItem.css'

const TablaItem = (props) => {
    const {titulo} = props
    return(
        <div className="TablaItem">
            {titulo}
            <button className="btn btn-success btn-sm">Ver</button>
        </div>
    )
}

export default TablaItem