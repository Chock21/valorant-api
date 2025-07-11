import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function RankDetail() {
    const { id } = useParams();
    const HOST = "http://127.0.0.1:3000/api";
    const [msg, setMsg] = useState('');
    const [rank, setRank] = useState(null);
    const [editRankData, setEditRank] = useState({ _id: '', name: '', image: '' });
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    async function fetchRank() {
        try {
            const response = await fetch(`${HOST}/ranks/${id}`);
            const data = await response.json();
            setRank(data);
            setEditRank({
                _id: data._id,
                name: data.name,
                image: data.image.split('/uploads/ranks/')[1] || data.image
            });
        } catch (error) {
            setMsg("Error al cargar el rango");
        }
    }

    useEffect(() => {
        fetchRank();
    }, [id]);

    if (!rank) {
        return (
            <div className="text-center my-5">
                <p className="mt-2">Cargando rango...</p>
            </div>
        );
    }

    async function handleUpdate() {
        try {
            let body;
            let headers = {
                "Authorization": `Bearer ${token}`,
            };
            if (editRankData.image instanceof File) {
                const formData = new FormData();
                formData.append('name', editRankData.name);
                formData.append('image', editRankData.image);
                body = formData;
            } else {
                body = JSON.stringify({
                    name: editRankData.name,
                    image: editRankData.image
                });
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(`${HOST}/ranks/${id}`, {
                method: "PUT",
                headers,
                body
            });
            if (!response.ok) throw new Error('Error al actualizar');
            await fetchRank();
            setMsg('Rango Actualizado');
        } catch (error) {
            setMsg('Error al actualizar el rango');
        }
    }

    async function handleDelete() {
        if (!window.confirm("¿Estás seguro de eliminar este rango?")) return;
        try {
            const response = await fetch(`${HOST}/ranks/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) throw new Error('Error al eliminar');
            setMsg('Rango eliminado');
            navigate('/ranks');
        } catch (error) {
            setMsg('Error al eliminar el rango');
        }
    }

    return (
        <>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <div className="d-flex justify-content-center align-items-center">
                <div>
                    <div className="d-flex flex-row align-items-center card border bg-dark">
                        <img src={rank.image} alt={rank.name} className="imagen-rango"/>
                        <div>
                            <h1 className="border-bottom p-2 name-rango px-3">{rank.name}</h1>
                            <div className="p-2">
                                <h2 className=" ps-2">Acciones</h2>
                                <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editRankModal">Editar</button>
                                <button className="btn btn-danger ms-2" onClick={handleDelete}>Eliminar</button>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="editRankModal" tabIndex="-1" aria-labelledby="editRankModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark text-light">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editRankModalLabel">Editar Rango</h5>
                                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Nombre</label>
                                            <input
                                                type="text"
                                                className="form-control bg-dark text-white border"
                                                id="name"
                                                value={editRankData.name}
                                                onChange={(e) => setEditRank({ ...editRankData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="image" className="form-label">Imagen</label>
                                            <input
                                                type="file"
                                                className="form-control bg-dark text-white border"
                                                accept="image/*"
                                                id="image"
                                                onChange={(e) => setEditRank({ ...editRankData, image: e.target.files[0] })}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdate}>Guardar cambios</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RankDetail;