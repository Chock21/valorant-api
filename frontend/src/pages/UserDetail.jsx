import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

function  UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState('');
    const HOST = "http://127.0.0.1:3000/api";

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`${HOST}/users/${id}`);
                if (!response.ok) {
                    throw new Error('Error al cargar el usuario');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setMsg("Error al cargar el usuario");
            }
        }
        fetchUser();
    }, [id]);

    return (
        <>
            {msg && <div className="alert alert-danger">{msg}</div>}
            {user ? (
                <div>
                    <h1>Detalles del Usuario {user.name}</h1>
                    <div className="card bg-dark text-white border">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Nombre: {user.name}</h5>
                            <p className="card-text">Email: {user.email}</p>
                            <p className="card-text">ID: {user._id}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Cargando usuario...</p>
            )}
        </>
    )
}

export default UserDetails