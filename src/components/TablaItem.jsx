import React from 'react';
import '../styles/components/tablaItem.css'

const TablaItem = (props) => {
    const {titulo} = props
    return(
        <div className="TablaItem">
            {titulo}
            <button className="btn btn-info btn-sm">Ver</button>
        </div>
    )
}

export default TablaItem