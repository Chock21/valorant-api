//import { set } from "mongoose";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function  Ranks() {
    const HOST = 'http://127.0.0.1:3000/api';
    const [ ranks, setRanks ] = useState([]);
    const [msg, setMsg] = useState('');

    async function getRanks() {
        try {
            const response = await fetch(`${HOST}/ranks`)
            const data = await response.json()
            console.log(data);
            if (Array.isArray(data)) {
                setRanks(data);
            } else {
                setRanks([]);
            }
        } catch {
            console.error(error)
            setMsg('Tenemos un error en el Servidor');
        }
    }

    useEffect(()=> {
        getRanks();
    }, []);

    return (
        <>  
            {msg && <div className="alert alert-danger">{msg}</div>}
            <div className="d-flex justify-content-between mb-4 mx-5">
                <h1 className="">Rangos</h1>
                <a href="/ranks/create" className="btn btn-danger d-flex align-items-center justify-content-center">Agregar Rango</a>
            </div>
            {Array.isArray(ranks) && ranks.length === 0 && (
                <div className="text-center my-4">
                    <span>{msg || "No hay rangos :("}</span>
                </div>
            )}
            <div className="row">
            {Array.isArray(ranks) && ranks.map(rank =>
                <div key={rank._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <a className="card bg-dark card-rango border m-auto text-decoration-none text-white" href={`/ranks/${rank._id}`}>
                        <img src={rank.image} alt={rank.name} className="imagen-rango rounded-top"/>
                        <h1 className="text-center border-top rounded-bottom fs-4 bg-black m-0 py-2">{rank.name}</h1>
                    </a>
                </div>
            )}
            </div>
        </>
    )
}

export default Ranks