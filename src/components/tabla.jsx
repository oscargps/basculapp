import React from 'react';
import '../styles/components/tabla.css'

const Tabla = (props) => {
    const { titulo } = props;
    return (

        <div className="Tabla">
            <div className="card">
                <div className="card-header Tabla-header">
                    {titulo}
                </div>
                <div className="card-body">

                </div>
            </div>
        </div>
    )
}

export default Tabla;