import React from 'react';
import '../styles/pages/dashboard.css'
import Tabla from '../components/tabla'

const Dashboard = ()=>{
    return(
        <div className="Dashboard">
            <Tabla titulo="Reses" />
            <Tabla titulo="Lotes" />
            <Tabla titulo="Registros de pesaje" />
        </div>
    )
}

export default Dashboard