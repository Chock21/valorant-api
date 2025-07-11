import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'

function  Agents() {
    const HOST = 'http://127.0.0.1:3000/api';
    const [ agents, setAgents ] = useState([]);
    const [msg, setMsg] = useState('');

    async function getAgents() {
        try {
            const response = await fetch(`${HOST}/agents`)
            const data = await response.json()
            console.log(data);
            if (Array.isArray(data)) {
                setAgents(data);
            } else {
                setAgents([]);
            }
        } catch {
            console.error(error)
            setMsg('Tenemos un error en el Servidor');
        }
    }

    useEffect(() => {
        getAgents();
    }, []);

    return (
        <>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <div className="d-flex justify-content-between mb-4">
                <h1 className="">Agentes</h1>
                <Link to="/agents/create" className="btn btn-danger d-flex align-items-center justify-content-center ">Agregar Agente</Link>
            </div>
            {Array.isArray(agents) && agents.length === 0 && (
                <div className="text-center my-4">
                    <span>{msg || "No hay agentes :("}</span>
                </div>
            )}
            <div className="row">
            {Array.isArray(agents) && agents.map( agent => 
                <div key={agent._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <a href={`/agents/${agent._id}`} className="card bg-dark border text-decoration-none text-white ">
                        <img src={agent.image} alt={agent.name} className="imagen-agent rounded-top"/>
                        <h1 className="text-center border-top rounded-bottom bg-black m-0 pt-2 pb-3">{agent.name}</h1>
                    </a>
                </div>
            )}
            </div>
        </>
    )
}

export default Agents