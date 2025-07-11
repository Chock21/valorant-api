import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AgentCreate() {
    const HOST = 'http://127.0.0.1:3000/api';
    const [name, setName] = useState('');
    const [rol, setRol] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [image, setImage] = useState(null);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !rol || !descripcion || !image) {
            setMsg("Todos los campos son obligatorios");
            return;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("rol", rol);
        formData.append("descripcion", descripcion);
        formData.append("image", image);

        try {
            const response = await fetch(`${HOST}/agents`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setMsg("Agente creado correctamente");
                setTimeout(() => navigate("/"), 1000);
            } else {
                setMsg(data.msg || "Error al crear el agente");
            }
        } catch (error) {
            setMsg("Error en el servidor");
        }
    };

    return (
        <>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <h1 className="mb-4">Crear Agente</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control bg-dark text-white"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select
                        className="form-control bg-dark text-white"
                        value={rol}
                        onChange={e => setRol(e.target.value)}
                        required
                    >
                        <option className="bg-dark text-white" value="">Seleccione un rol</option>
                        <option className="bg-dark text-white" value="Duelista">Duelista</option>
                        <option className="bg-dark text-white" value="Centinela">Centinela</option>
                        <option className="bg-dark text-white" value="Controllador">Controllador</option>
                        <option className="bg-dark text-white" value="Iniciador">Iniciador</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control bg-dark text-white"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                        type="file"
                        className="form-control bg-dark text-white"
                        accept="image/*"
                        onChange={e => setImage(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-danger mt-2">Crear Agente</button>
                <Link to="/" className="btn btn-secondary ms-2 mt-2">Cancelar</Link>
            </form>
        </>
    );
}

export default AgentCreate;